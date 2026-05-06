import { TrendingDown, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

import type { GoldApiResponse } from "@/lib/goldapi";
import { fmtUSD } from "@/lib/format";

export function HeroSpot({ spot }: { spot: GoldApiResponse | null }) {
  const t = useTranslations("HeroSpot");

  if (!spot) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 text-sm text-[var(--color-text-dim)]">
        {t("unavailable")}
      </div>
    );
  }

  const up = spot.ch >= 0;
  const TrendIcon = up ? TrendingUp : TrendingDown;
  const trendColor = up ? "var(--color-up)" : "var(--color-down)";

  return (
    <div className="hero-spot-bg card-shadow relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-6">
      <div
        aria-hidden
        className="gold-glow absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-20 blur-3xl"
      />

      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
            {t("label", { exchange: spot.exchange })}
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="text-5xl font-bold tracking-tight text-[var(--color-text)]">
              {fmtUSD(spot.price)}
            </div>
            <div className="text-sm text-[var(--color-text-dim)]">{t("perOz")}</div>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <span
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-semibold"
              style={{ color: trendColor, background: `${trendColor}1a` }}
            >
              <TrendIcon size={14} />
              {up ? "+" : ""}{spot.ch.toFixed(2)} ({up ? "+" : ""}{spot.chp.toFixed(2)}%)
            </span>
            <span className="text-[var(--color-text-dim)]">
              {t("vsPrev", { value: spot.prev_close_price.toFixed(2) })}
            </span>
          </div>
        </div>

        <div className="hidden text-right md:block">
          <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">{t("bidAsk")}</div>
          <div className="mt-1 font-mono text-sm text-[var(--color-text)]">
            ${spot.bid.toFixed(2)} <span className="text-[var(--color-text-dim)]">/</span> ${spot.ask.toFixed(2)}
          </div>
          <div className="mt-1 text-[10px] text-[var(--color-text-dim)]">
            {t("spread", { value: (spot.ask - spot.bid).toFixed(3) })}
          </div>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label={t("open")} value={fmtUSD(spot.open_price)} />
        <Stat label={t("high")} value={fmtUSD(spot.high_price)} accent="var(--color-up)" />
        <Stat label={t("low")} value={fmtUSD(spot.low_price)} accent="var(--color-down)" />
        <Stat label={t("prevClose")} value={fmtUSD(spot.prev_close_price)} />
      </dl>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-3">
      <dt className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">{label}</dt>
      <dd className="mt-1 font-mono text-sm font-semibold" style={{ color: accent ?? "var(--color-text)" }}>
        {value}
      </dd>
    </div>
  );
}
