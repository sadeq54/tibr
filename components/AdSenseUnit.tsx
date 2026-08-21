"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

import { pick } from "@/lib/i18n-text";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const LABEL = { en: "Advertisement", ar: "إعلان", fr: "Publicité", tr: "Reklam", ur: "اشتہار", hi: "विज्ञापन" };

/**
 * One responsive AdSense unit. The wrapper reserves height so the ad never
 * shifts the page (CLS), and the unit is requested exactly once per mount.
 * Render only when `client` and `slot` are real (the server decides — see
 * `lib/ads.ts`); this component never invents a placeholder.
 */
export function AdSenseUnit({
  client,
  slot,
  minHeight = 280,
  format = "auto",
  className = "",
}: {
  client: string;
  slot: string;
  /** Reserved height in px — match the typical fill for the placement. */
  minHeight?: number;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  className?: string;
}) {
  const locale = useLocale();
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blocker or script not loaded — the reserved box simply stays empty.
    }
  }, []);

  return (
    <div className={`overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] ${className}`} style={{ minHeight }}>
      <div className="px-2 pt-1 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
        {pick(locale, LABEL)}
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: minHeight - 18 }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
