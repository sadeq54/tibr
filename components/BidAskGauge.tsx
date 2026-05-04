import { useTranslations } from "next-intl";

import type { GoldApiResponse } from "@/lib/goldapi";

export function BidAskGauge({ spot }: { spot: GoldApiResponse | null }) {
  const t = useTranslations("BidAskGauge");

  if (!spot) return null;

  const range = spot.high_price - spot.low_price;
  const pos = range > 0 ? ((spot.price - spot.low_price) / range) * 100 : 50;
  const bidPos = range > 0 ? ((spot.bid - spot.low_price) / range) * 100 : 50;
  const askPos = range > 0 ? ((spot.ask - spot.low_price) / range) * 100 : 50;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text)]">{t("heading")}</h3>
        <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">XAU/USD</span>
      </div>

      <div className="mt-5 flex items-center justify-between text-[11px] text-[var(--color-text-dim)]">
        <span>{t("low", { value: spot.low_price.toFixed(2) })}</span>
        <span>{t("high", { value: spot.high_price.toFixed(2) })}</span>
      </div>

      <div className="relative mt-2 h-2 rounded-full bg-black/60">
        <div
          className="absolute inset-y-0 rounded-full"
          style={{
            left: `${Math.min(bidPos, askPos)}%`,
            width: `${Math.abs(askPos - bidPos)}%`,
            background: "linear-gradient(90deg, #22c55e, #f5c518, #ef4444)",
            opacity: 0.3,
          }}
        />
        <div
          className="absolute -top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-black"
          style={{
            left: `${Math.max(0, Math.min(100, pos))}%`,
            background: "#f5c518",
            boxShadow: "0 0 12px rgba(245,197,24,0.6)",
          }}
        />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
        <Stat label={t("bid")} value={`$${spot.bid.toFixed(2)}`} color="var(--color-up)" />
        <Stat label={t("mid")} value={`$${spot.price.toFixed(2)}`} color="var(--color-gold)" />
        <Stat label={t("ask")} value={`$${spot.ask.toFixed(2)}`} color="var(--color-down)" />
      </div>
      <div className="mt-2 text-center text-[11px] text-[var(--color-text-dim)]">
        {t("spread")}{" "}
        <span className="font-mono text-[var(--color-text-muted)]">${(spot.ask - spot.bid).toFixed(3)}</span>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-black/40 p-2 text-center">
      <div className="text-[9px] uppercase tracking-wider text-[var(--color-text-dim)]">{label}</div>
      <div className="mt-0.5 font-mono text-sm font-semibold" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
