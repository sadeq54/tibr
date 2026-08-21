"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { pick } from "@/lib/i18n-text";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const noop = () => () => {};
const serverFalse = () => false;

/** Hydration-safe boolean computed on the client only (false during SSR). */
function useClientFlag(compute: () => boolean) {
  return useSyncExternalStore(noop, compute, serverFalse);
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/** iOS/iPadOS never fires `beforeinstallprompt`; install is manual via Share. */
function isIos() {
  const ua = navigator.userAgent;
  const ipad = /macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
  return /iphone|ipad|ipod/i.test(ua) || ipad;
}

/**
 * Compact "Install app" control for the footer. Shows a real install button
 * when the browser offers `beforeinstallprompt`, an "Add to Home Screen" hint
 * on iOS Safari, and nothing at all once the app is running standalone.
 */
export function InstallAppButton({ locale }: { locale: string }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const standalone = useClientFlag(isStandalone);
  const ios = useClientFlag(isIos);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferred(null);
      setInstalled(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || standalone) return null;

  const label = pick(locale, {
    en: "Install app",
    ar: "ثبّت التطبيق",
    fr: "Installer l'application",
    tr: "Uygulamayı yükle",
    ur: "ایپ انسٹال کریں",
    hi: "ऐप इंस्टॉल करें",
  });
  const cls =
    "inline-flex items-center gap-1 rounded-full border border-[var(--color-gold)]/40 px-2.5 py-0.5 font-semibold text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)]/10";

  if (deferred) {
    const install = async () => {
      const evt = deferred;
      setDeferred(null);
      try {
        await evt.prompt();
        const { outcome } = await evt.userChoice;
        if (outcome === "accepted") setInstalled(true);
      } catch {
        // Prompt refused/expired — the browser's own menu still offers install.
      }
    };
    return (
      <button type="button" onClick={install} className={cls}>
        <span aria-hidden="true">⤓</span>
        {label}
      </button>
    );
  }

  if (ios) {
    return (
      <details className="inline-block">
        <summary className={`${cls} cursor-pointer list-none`}>{label}</summary>
        <p className="mt-1 max-w-xs text-[11px] leading-snug text-[var(--color-text-muted)]">
          {pick(locale, {
            en: "On iPhone/iPad: tap Share, then “Add to Home Screen”.",
            ar: "على آيفون/آيباد: اضغط «مشاركة» ثم «إضافة إلى الشاشة الرئيسية».",
            fr: "Sur iPhone/iPad : touchez Partager, puis « Sur l'écran d'accueil ».",
            tr: "iPhone/iPad'de: Paylaş'a, ardından “Ana Ekrana Ekle”ye dokunun.",
            ur: "آئی فون/آئی پیڈ پر: شیئر دبائیں، پھر «ہوم اسکرین میں شامل کریں»۔",
            hi: "iPhone/iPad पर: Share दबाएँ, फिर “Add to Home Screen” चुनें।",
          })}
        </p>
      </details>
    );
  }

  return null;
}
