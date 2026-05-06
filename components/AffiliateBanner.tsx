"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function AffiliateBanner({ url }: { url: string }) {
  const t = useTranslations("AffiliateBanner");

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="sponsored noopener"
      className="affiliate-bg card-shadow hover-gold-card-strong block overflow-hidden rounded-xl border border-[var(--color-border)] p-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -2,
        transition: { duration: 0.25 },
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
            {t("label")}
          </div>
          <div className="mt-1 text-base font-semibold text-[var(--color-text)]">{t("title")}</div>
          <div className="mt-1 text-xs text-[var(--color-text-muted)]">{t("subtitle")}</div>
        </div>
        <motion.span
          className="rounded-md bg-[var(--color-gold)] px-4 py-2 text-xs font-semibold text-black"
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
        >
          {t("cta")}
        </motion.span>
      </div>
    </motion.a>
  );
}
