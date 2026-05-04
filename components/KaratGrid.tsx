import { useTranslations } from "next-intl";

import type { GoldApiResponse } from "@/lib/goldapi";

const KARATS = [
  { key: "24K", field: "price_gram_24k" as const, purityNum: 1.0 },
  { key: "21K", field: "price_gram_21k" as const, purityNum: 0.875 },
  { key: "18K", field: "price_gram_18k" as const, purityNum: 0.75 },
  { key: "14K", field: "price_gram_14k" as const, purityNum: 0.583 },
];

const OZ_TO_GRAM = 31.1034768;

const RATES = { JOD: 0.709, SAR: 3.75, AED: 3.6725, EGP: 48.5 } as const;

export function KaratGrid({ spot }: { spot: GoldApiResponse | null }) {
  const t = useTranslations("KaratGrid");
  if (!spot) return null;

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

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {KARATS.map((k) => {
          const usd = spot[k.field];
          const oz = usd * OZ_TO_GRAM;
          const ch = spot.ch * k.purityNum;
          const up = ch >= 0;
          const trend = up ? "var(--color-up)" : "var(--color-down)";

          return (
            <div
              key={k.key}
              className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--color-gold)]/40"
            >
              <div
                aria-hidden
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-2xl transition group-hover:opacity-50"
                style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold text-black"
                    style={{
                      background: `linear-gradient(135deg, #f5c518 0%, #d4a82a ${k.purityNum * 100}%, #5a3a08 100%)`,
                    }}
                  >
                    {k.key.replace("K", "")}
                  </div>
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
                  {up ? "+" : ""}{ch.toFixed(2)}
                </div>
              </div>

              <div className="mt-4 font-mono text-2xl font-bold text-[var(--color-text)]">
                ${usd.toFixed(3)}
                <span className="ml-1 text-xs font-normal text-[var(--color-text-dim)]">
                  {t("perGramShort")}
                </span>
              </div>
              <div className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                ${oz.toFixed(2)}{" "}
                <span className="text-[var(--color-text-dim)]">{t("perTroyOz")}</span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1 border-t border-[var(--color-border)] pt-3 text-[11px]">
                {Object.entries(RATES).map(([cur, rate]) => (
                  <div key={cur} className="flex justify-between">
                    <dt className="text-[var(--color-text-dim)]">{cur}{t("perGramShort")}</dt>
                    <dd className="font-mono text-[var(--color-text-muted)]">{(usd * rate).toFixed(2)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </section>
  );
}
