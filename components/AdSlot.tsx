"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "next-intl";

import { usePathname } from "@/i18n/navigation";
import { COUNTRY_XM_LANG } from "@/lib/countries";
import {
  bannersFor,
  xmClickUrl,
  xmImageUrl,
  type XmBanner,
  type XmLang,
} from "@/lib/xm-banners";

const ROTATE_MS = 8000;

/** Map a page locale to the closest XM banner language. */
function localeToXmLang(locale: string): XmLang {
  return locale === "ar" ? "ar" : "en";
}

/**
 * A 300x250 XM affiliate ad slot. Banners follow the country in the URL
 * (English fallback). `slot` staggers which banner each instance starts on,
 * so two slots on the same page never show the same creative at once.
 */
export function AdSlot({ slot = 0, label }: { slot?: number; label?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  // 300x250 banners for this country's language (English fallback).
  const banners = useMemo<XmBanner[]>(() => {
    const country = pathname.split("/").filter(Boolean)[0] ?? "";
    const lang = (COUNTRY_XM_LANG[country] ??
      localeToXmLang(locale)) as XmLang;
    const set = bannersFor(lang, 300, 250);
    return set.length > 0 ? set : bannersFor("en", 300, 250);
  }, [pathname, locale]);

  const [step, setStep] = useState(0);
  useEffect(() => setStep(0), [banners]);
  useEffect(() => {
    if (banners.length <= 1) return;
    const id = setInterval(() => setStep((s) => s + 1), ROTATE_MS);
    return () => clearInterval(id);
  }, [banners.length]);

  if (banners.length === 0) return null;
  const current = banners[(slot + step) % banners.length];

  return (
    <div className="affiliate-bg card-shadow flex justify-center overflow-hidden rounded-xl border border-[var(--color-border)] p-3">
      <AnimatePresence mode="wait">
        <motion.a
          key={current.id}
          href={xmClickUrl(current.id)}
          target="_blank"
          rel="sponsored noopener noreferrer"
          referrerPolicy="no-referrer-when-downgrade"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="block w-full"
          style={{ maxWidth: current.width }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={xmImageUrl(current.id)}
            width={current.width}
            height={current.height}
            alt={label ?? "Advertisement"}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-auto w-full rounded-lg"
          />
        </motion.a>
      </AnimatePresence>
    </div>
  );
}
