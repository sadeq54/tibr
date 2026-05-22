"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname } from "@/i18n/navigation";
import { COUNTRY_XM_LANG } from "@/lib/countries";
import {
  bannersFor,
  xmClickUrl,
  xmImageUrl,
  type XmBanner,
  type XmLang,
} from "@/lib/xm-banners";

const ROTATE_MS = 7000;

/** Map a page locale to the closest XM banner language. */
function localeToXmLang(locale: string): XmLang {
  return locale === "ar" ? "ar" : "en";
}

export function AffiliateBanner() {
  const t = useTranslations("AffiliateBanner");
  const locale = useLocale();
  const pathname = usePathname();

  // 600x90 leaderboard banners. On a /[country]/... page the banner follows
  // the country's language; elsewhere it follows the site locale. English
  // fallback when a language has no 600x90 banner.
  const banners = useMemo<XmBanner[]>(() => {
    const slug = pathname.split("/").filter(Boolean)[0] ?? "";
    const lang = (COUNTRY_XM_LANG[slug] ?? localeToXmLang(locale)) as XmLang;
    const set = bannersFor(lang, 600, 90);
    return set.length > 0 ? set : bannersFor("en", 600, 90);
  }, [pathname, locale]);

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // Reset to the first banner whenever the locale (banner set) changes.
  useEffect(() => setI(0), [banners]);

  useEffect(() => {
    if (paused || banners.length <= 1) return;
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % banners.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, banners.length]);

  if (banners.length === 0) return null;
  const current = banners[i % banners.length];

  return (
    <motion.div
      role="region"
      aria-label={t("label")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="affiliate-bg card-shadow relative overflow-hidden rounded-xl border border-[var(--color-border)] p-5"
    >
      <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
        {t("label")}
      </div>

      <div className="mt-2 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.a
            key={current.id}
            href={xmClickUrl(current.id, current.lang)}
            target="_blank"
            rel="sponsored noopener noreferrer"
            referrerPolicy="no-referrer-when-downgrade"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block w-full"
            style={{ maxWidth: current.width }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={xmImageUrl(current.id)}
              width={current.width}
              height={current.height}
              alt={t("label")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-auto w-full rounded-lg"
            />
          </motion.a>
        </AnimatePresence>
      </div>

      {banners.length > 1 && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          {banners.map((b, idx) => (
            <button
              key={b.id}
              type="button"
              aria-label={`Slide ${idx + 1}`}
              aria-current={idx === i}
              onClick={() => setI(idx)}
              className={`h-1 rounded-full transition-all ${
                idx === i
                  ? "w-6 bg-[var(--color-gold)]"
                  : "w-1.5 bg-[var(--color-border-strong)] hover:bg-[var(--color-text-dim)]"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
