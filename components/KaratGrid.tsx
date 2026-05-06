"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { CountUp } from "@/components/motion/CountUp";
import { KaratGridSkeleton } from "@/components/skeletons";
import type { GoldApiResponse } from "@/lib/goldapi";
import type { FxRates } from "@/lib/fx";

const KARATS = [
  { key: "24K", field: "price_gram_24k" as const, purityNum: 1.0 },
  { key: "21K", field: "price_gram_21k" as const, purityNum: 0.875 },
  { key: "18K", field: "price_gram_18k" as const, purityNum: 0.75 },
  { key: "14K", field: "price_gram_14k" as const, purityNum: 0.583 },
];

const OZ_TO_GRAM = 31.1034768;

const EASE = [0.22, 1, 0.36, 1] as const;

export function KaratGrid({ spot, fx }: { spot: GoldApiResponse | null; fx: FxRates }) {
  const t = useTranslations("KaratGrid");
  if (!spot) {
    return (
      <section aria-labelledby="karat-heading">
        <div className="mb-3 flex items-end justify-between">
          <h2 id="karat-heading" className="text-xl font-semibold text-[var(--color-text)]">
            {t("heading")}
          </h2>
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
            {t("currencies")}
          </span>
        </div>
        <KaratGridSkeleton />
      </section>
    );
  }

  const fxList: Array<[keyof FxRates, number]> = [
    ["JOD", fx.JOD],
    ["SAR", fx.SAR],
    ["AED", fx.AED],
    ["EGP", fx.EGP],
  ];

  return (
    <section aria-labelledby="karat-heading">
      <div className="mb-3 flex items-end justify-between">
        <h2 id="karat-heading" className="text-xl font-semibold text-[var(--color-text)]">
          {t("heading")}
        </h2>
        <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
          {t("currencies")}
        </span>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.09 } },
        }}
      >
        {KARATS.map((k) => {
          const usd = spot[k.field];
          const oz = usd * OZ_TO_GRAM;
          const ch = spot.ch * k.purityNum;
          const up = ch >= 0;
          const trend = up ? "var(--color-up)" : "var(--color-down)";

          return (
            <motion.div
              key={k.key}
              className="hover-gold-card-strong group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 will-change-transform"
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: EASE },
              }}
            >
              <motion.div
                aria-hidden
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl"
                style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }}
                initial={{ opacity: 0.3 }}
                whileHover={{ opacity: 0.55 }}
                transition={{ duration: 0.3 }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold text-black"
                    style={{
                      background: `linear-gradient(135deg, #f5c518 0%, #d4a82a ${k.purityNum * 100}%, #5a3a08 100%)`,
                    }}
                    whileHover={{ scale: 1.08, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    {k.key.replace("K", "")}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-[var(--color-text)]">
                      {t("karatGold", { karat: k.key })}
                    </div>
                    <div className="text-[10px] text-[var(--color-text-dim)]">
                      {t(`purity.${k.key}` as `purity.24K`)}
                    </div>
                  </div>
                </div>
                <div
                  className="rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold"
                  style={{ color: trend, background: `${trend}1a` }}
                >
                  {up ? "+" : ""}
                  {ch.toFixed(2)}
                </div>
              </div>

              <div className="mt-4 font-mono text-2xl font-bold text-[var(--color-text)]">
                <CountUp value={usd} decimals={3} prefix="$" duration={1.1} />
                <span className="ml-1 text-xs font-normal text-[var(--color-text-dim)]">
                  {t("perGramShort")}
                </span>
              </div>
              <div className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                <CountUp value={oz} decimals={2} prefix="$" duration={1.1} />{" "}
                <span className="text-[var(--color-text-dim)]">{t("perTroyOz")}</span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1 border-t border-[var(--color-border)] pt-3 text-[11px]">
                {fxList.map(([cur, rate]) => (
                  <div key={cur} className="flex justify-between">
                    <dt className="text-[var(--color-text-dim)]">
                      {cur}
                      {t("perGramShort")}
                    </dt>
                    <dd className="font-mono text-[var(--color-text-muted)]">
                      {(usd * rate).toFixed(2)}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
