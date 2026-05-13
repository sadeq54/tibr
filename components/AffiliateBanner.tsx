"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

const ROTATE_MS = 5000;

type BannerItem = { title: string; subtitle: string };

export function AffiliateBanner() {
  const t = useTranslations("AffiliateBanner");
  const items = (t.raw("items") as BannerItem[]) ?? [];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % items.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, items.length]);

  if (items.length === 0) return null;
  const current = items[i];

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
      style={{ minHeight: 140 }}
    >
      <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
        {t("label")}
      </div>

      <div className="relative mt-1" style={{ minHeight: 64 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-base font-semibold text-[var(--color-text)]">
              {current.title}
            </div>
            <div className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">
              {current.subtitle}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center gap-1.5">
        {items.map((_, idx) => (
          <button
            key={idx}
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
    </motion.div>
  );
}
