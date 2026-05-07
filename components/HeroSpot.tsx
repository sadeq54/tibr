"use client";

import { Radio, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { useLivePrice } from "@/components/LivePriceProvider";
import { CountUp } from "@/components/motion/CountUp";
import { HeroSpotSkeleton } from "@/components/skeletons";
import type { FxRates } from "@/lib/fx";
import type { GoldApiResponse } from "@/lib/goldapi";

const EASE = [0.22, 1, 0.36, 1] as const;

const SYMBOL: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
  JOD: "JD ",
  SAR: "SR ",
  AED: "AED ",
  EGP: "EGP ",
};

export function HeroSpot({
  spot,
  displayCurrency,
  fx,
}: {
  spot: GoldApiResponse | null;
  displayCurrency?: string;
  fx?: FxRates;
}) {
  const t = useTranslations("HeroSpot");

  const live = useLivePrice();

  if (!spot) {
    return <HeroSpotSkeleton />;
  }

  // Overlay streaming values when available; fall back to SSR spot snapshot.
  const liveXau = live.xau ?? spot.price;
  const liveBid = live.bid ?? spot.bid;
  const liveAsk = live.ask ?? spot.ask;
  const liveHigh = live.high24 ?? spot.high_price;
  const liveLow = live.low24 ?? spot.low_price;
  const liveCh = live.change24 ?? spot.ch;
  const liveChp = live.changePct24 ?? spot.chp;

  const up = liveCh >= 0;
  const TrendIcon = up ? TrendingUp : TrendingDown;
  const trendColor = up ? "var(--color-up)" : "var(--color-down)";

  const useLocal = Boolean(displayCurrency && displayCurrency !== "USD" && fx);
  const rate = useLocal ? (fx?.[displayCurrency!] as number) ?? 1 : 1;
  const ccy = useLocal ? (displayCurrency as string) : "USD";
  const symbol = SYMBOL[ccy] ?? `${ccy} `;
  const localPrice = liveXau * rate;
  const localCh = liveCh * rate;
  const localPrev = spot.prev_close_price * rate;
  const localBid = liveBid * rate;
  const localAsk = liveAsk * rate;
  const localOpen = spot.open_price * rate;
  const localHigh = liveHigh * rate;
  const localLow = liveLow * rate;
  const localSpread = +(localAsk - localBid).toFixed(3);

  return (
    <motion.div
      className="hero-spot-bg card-shadow relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-6"
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <motion.div
        aria-hidden
        className="gold-glow absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.25, 0.18, 0.22], scale: [0.6, 1, 0.95, 1] }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          times: [0, 0.4, 0.7, 1],
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="flex items-start justify-between gap-6">
        <div>
          <motion.div
            className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {t("label", { exchange: `${live.isLive ? "LIVE" : spot.exchange} · ${ccy}` })}
            {live.isLive ? (
              <span className="ms-2 inline-flex items-center gap-1 rounded-full border border-[var(--color-up)]/40 bg-[var(--color-up)]/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-up)]">
                <Radio size={9} aria-hidden />
                {t("streamBadge")}
              </span>
            ) : null}
          </motion.div>

          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <CountUp
              value={localPrice}
              decimals={2}
              prefix={symbol}
              className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl md:text-5xl"
            />
            <div className="text-sm text-[var(--color-text-dim)]">{t("perOz")}</div>
          </div>

          {useLocal ? (
            <div className="mt-1 text-xs text-[var(--color-text-dim)]">
              ≈ ${liveXau.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </div>
          ) : null}

          <motion.div
            className="mt-2 flex flex-wrap items-center gap-2 text-sm"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
          >
            <span
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-semibold"
              style={{ color: trendColor, background: `${trendColor}1a` }}
            >
              <TrendIcon size={14} />
              {up ? "+" : ""}
              {localCh.toFixed(2)} ({up ? "+" : ""}
              {liveChp.toFixed(2)}%)
            </span>
            <span className="text-[var(--color-text-dim)]">
              {t("vsPrev", { value: localPrev.toFixed(2) })}
            </span>
          </motion.div>
        </div>

        <motion.div
          className="hidden text-right md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.55, ease: EASE }}
        >
          <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
            {t("bidAsk")}
          </div>
          <div className="mt-1 font-mono text-sm text-[var(--color-text)]">
            {symbol}{localBid.toFixed(2)}{" "}
            <span className="text-[var(--color-text-dim)]">/</span> {symbol}{localAsk.toFixed(2)}
          </div>
          <div className="mt-1 text-[10px] text-[var(--color-text-dim)]">
            {t("spread", { value: localSpread.toString() })}
          </div>
        </motion.div>
      </div>

      <motion.dl
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } },
        }}
      >
        <Stat label={t("open")} value={localOpen} prefix={symbol} />
        <Stat label={t("high")} value={localHigh} prefix={symbol} accent="var(--color-up)" />
        <Stat label={t("low")} value={localLow} prefix={symbol} accent="var(--color-down)" />
        <Stat label={t("prevClose")} value={localPrev} prefix={symbol} />
      </motion.dl>
    </motion.div>
  );
}

function Stat({
  label,
  value,
  prefix,
  accent,
}: {
  label: string;
  value: number;
  prefix: string;
  accent?: string;
}) {
  return (
    <motion.div
      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-3"
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      <dt className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">{label}</dt>
      <dd
        className="mt-1 font-mono text-sm font-semibold"
        style={{ color: accent ?? "var(--color-text)" }}
      >
        <CountUp value={value} decimals={2} prefix={prefix} duration={0.9} />
      </dd>
    </motion.div>
  );
}
