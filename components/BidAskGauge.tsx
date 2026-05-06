"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { BidAskGaugeSkeleton } from "@/components/skeletons";
import type { FxRates } from "@/lib/fx";
import type { GoldApiResponse } from "@/lib/goldapi";

const SPRING = { type: "spring" as const, stiffness: 110, damping: 22 };

const SYMBOL: Record<string, string> = {
  USD: "$",
  JOD: "JD ",
  SAR: "SR ",
  AED: "AED ",
  EGP: "EGP ",
};

export function BidAskGauge({
  spot,
  displayCurrency,
  fx,
}: {
  spot: GoldApiResponse | null;
  displayCurrency?: keyof FxRates;
  fx?: FxRates;
}) {
  const t = useTranslations("BidAskGauge");

  if (!spot) return <BidAskGaugeSkeleton />;

  const useLocal = Boolean(displayCurrency && displayCurrency !== "USD" && fx);
  const rate = useLocal ? (fx?.[displayCurrency!] as number) ?? 1 : 1;
  const ccy = useLocal ? (displayCurrency as string) : "USD";
  const symbol = SYMBOL[ccy] ?? "$";

  const lo = spot.low_price * rate;
  const hi = spot.high_price * rate;
  const px = spot.price * rate;
  const bid = spot.bid * rate;
  const ask = spot.ask * rate;

  const range = hi - lo;
  const pos = range > 0 ? ((px - lo) / range) * 100 : 50;
  const bidPos = range > 0 ? ((bid - lo) / range) * 100 : 50;
  const askPos = range > 0 ? ((ask - lo) / range) * 100 : 50;
  const left = Math.max(0, Math.min(100, pos));
  const bandLeft = Math.min(bidPos, askPos);
  const bandWidth = Math.abs(askPos - bidPos);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <motion.div
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text)]">{t("heading")}</h3>
        <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
          XAU/{ccy}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between text-[11px] text-[var(--color-text-dim)]">
        <span>{t("low", { value: `${symbol}${fmt(lo)}` })}</span>
        <span>{t("high", { value: `${symbol}${fmt(hi)}` })}</span>
      </div>

      <div className="relative mt-2 h-2 rounded-full bg-[var(--color-border)]">
        <motion.div
          className="absolute inset-y-0 rounded-full"
          initial={{ left: "50%", width: 0, opacity: 0 }}
          animate={{ left: `${bandLeft}%`, width: `${bandWidth}%`, opacity: 0.3 }}
          transition={{ ...SPRING, delay: 0.15 }}
          style={{
            background: "linear-gradient(90deg, #22c55e, #f5c518, #ef4444)",
          }}
        />
        <motion.div
          className="absolute -top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[var(--color-bg-card)]"
          initial={{ left: "50%", scale: 0 }}
          animate={{ left: `${left}%`, scale: 1 }}
          transition={{ ...SPRING, delay: 0.25 }}
          style={{
            background: "#f5c518",
            boxShadow: "0 0 12px rgba(245,197,24,0.6)",
          }}
        />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
        <Stat label={t("bid")} value={`${symbol}${fmt(bid)}`} color="var(--color-up)" delay={0.35} />
        <Stat label={t("mid")} value={`${symbol}${fmt(px)}`} color="var(--color-gold)" delay={0.42} />
        <Stat label={t("ask")} value={`${symbol}${fmt(ask)}`} color="var(--color-down)" delay={0.49} />
      </div>
      <div className="mt-2 text-center text-[11px] text-[var(--color-text-dim)]">
        {t("spread")}{" "}
        <span className="font-mono text-[var(--color-text-muted)]">
          {symbol}
          {(ask - bid).toFixed(3)}
        </span>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, color, delay }: { label: string; value: string; color: string; delay: number }) {
  return (
    <motion.div
      className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-2 text-center"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-[9px] uppercase tracking-wider text-[var(--color-text-dim)]">{label}</div>
      <div className="mt-0.5 font-mono text-sm font-semibold" style={{ color }}>
        {value}
      </div>
    </motion.div>
  );
}
