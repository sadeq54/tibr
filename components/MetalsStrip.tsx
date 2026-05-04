import { useLocale, useTranslations } from "next-intl";

import type { MetalsBundle } from "@/lib/goldapi";
import { METAL_META } from "@/lib/goldapi";
import { fmtUSD } from "@/lib/format";

const METAL_KEY: Record<string, "gold" | "silver" | "platinum" | "palladium"> = {
  XAU: "gold",
  XAG: "silver",
  XPT: "platinum",
  XPD: "palladium",
};

export function MetalsStrip({ metals }: { metals: MetalsBundle }) {
  const t = useTranslations("MetalsStrip");
  const locale = useLocale();
  const cards = (["XAU", "XAG", "XPT", "XPD"] as const).map((m) => ({ key: m, data: metals[m] }));

  return (
    <section aria-labelledby="metals-heading">
      <h2 id="metals-heading" className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
        {t("heading")}
      </h2>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map(({ key, data }) => {
          const meta = METAL_META[key];
          const up = (data?.ch ?? 0) >= 0;
          const trendColor = up ? "var(--color-up)" : "var(--color-down)";
          const localizedName = t(METAL_KEY[key]);

          return (
            <div
              key={key}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 transition hover:border-[var(--color-gold)]/30"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-black"
                      style={{ background: meta.tint }}
                    >
                      {meta.symbol}
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-text)]">{localizedName}</span>
                  </div>
                  {locale === "en" && (
                    <div className="mt-0.5 text-[10px] text-[var(--color-text-dim)]" lang="ar">
                      {meta.nameAr}
                    </div>
                  )}
                </div>
              </div>

              {data ? (
                <>
                  <div className="mt-3 font-mono text-xl font-bold text-[var(--color-text)]">
                    {fmtUSD(data.price)}
                  </div>
                  <div
                    className="mt-1 inline-block rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold"
                    style={{ color: trendColor, background: `${trendColor}1a` }}
                  >
                    {up ? "+" : ""}{data.chp.toFixed(2)}%
                  </div>
                </>
              ) : (
                <div className="mt-3 text-xs text-[var(--color-text-dim)]">{t("unavailable")}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
