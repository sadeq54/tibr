"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Radio } from "lucide-react";
import { useLocale } from "next-intl";

import { useLivePrice } from "@/components/LivePriceProvider";
import { HeroSpotSkeleton } from "@/components/skeletons";
import type { GoldApiResponse } from "@/lib/goldapi";

const OZ_TO_GRAM = 31.1034768;
const EASE = [0.22, 1, 0.36, 1] as const;

const KARATS = [
  { k: "24K", purity: 1.0, pct: "99.9%" },
  { k: "22K", purity: 0.9167, pct: "91.7%" },
  { k: "21K", purity: 0.875, pct: "87.5%" },
  { k: "18K", purity: 0.75, pct: "75%" },
  { k: "14K", purity: 0.583, pct: "58.3%" },
] as const;

function usd(n: number, frac = 2): string {
  if (!Number.isFinite(n) || n === 0) return "—";
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  })}`;
}

/**
 * Homepage hero: one board answering the two questions every visitor has —
 * "what is gold at right now?" (big live XAU/USD median) and
 * "what does that make a gram?" (per-karat rail, above the fold).
 * Replaces the old stacked LiveGoldStream + HeroSpot cards.
 */
export function HeroBoard({ initialSpot }: { initialSpot: GoldApiResponse | null }) {
  const locale = useLocale();
  const ar = locale === "ar";
  const live = useLivePrice();

  const xau = live.xau ?? initialSpot?.price ?? null;
  if (xau === null) return <HeroSpotSkeleton />;

  const spot = initialSpot;
  const ch = live.change24 ?? spot?.ch ?? 0;
  const chp = live.changePct24 ?? spot?.chp ?? 0;
  const bid = live.bid ?? spot?.bid ?? 0;
  const ask = live.ask ?? spot?.ask ?? 0;
  const high = live.high24 ?? spot?.high_price ?? 0;
  const low = live.low24 ?? spot?.low_price ?? 0;
  const open = spot?.open_price ?? 0;
  const prev = spot?.prev_close_price ?? 0;
  const spread = ask > 0 && bid > 0 ? ask - bid : 0;
  const connected = live.sources.filter((s) => s.connected).length;

  const up = ch >= 0;
  const trend = up ? "var(--color-up)" : "var(--color-down)";
  const TrendIcon = up ? ArrowUp : ArrowDown;

  const stats: Array<{ label: string; value: number; accent?: string }> = [
    { label: ar ? "الافتتاح" : "Open", value: open },
    { label: ar ? "الأعلى 24س" : "24h high", value: high, accent: "var(--color-up)" },
    { label: ar ? "الأدنى 24س" : "24h low", value: low, accent: "var(--color-down)" },
    { label: ar ? "الإغلاق السابق" : "Prev close", value: prev },
  ];

  return (
    <motion.section
      aria-label={ar ? "لوحة سعر الذهب المباشر" : "Live gold price board"}
      className="hero-board-bg card-shadow relative overflow-hidden rounded-2xl border border-[var(--color-border)]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      <div aria-hidden className="hero-grid-overlay pointer-events-none absolute inset-0" />

      <div className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1.55fr_1fr]">
        {/* ── Live spot ───────────────────────────────────────── */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
            <Radio
              size={12}
              aria-hidden
              className={connected > 0 ? "text-[var(--color-up)]" : "text-[var(--color-down)]"}
            />
            <span dir="ltr">XAU/USD</span>
            <span>·</span>
            <span>
              {ar
                ? `وسيط ${connected} بورصات لحظيًا`
                : `live median of ${connected} exchanges`}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1" dir="ltr">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={`xau-${xau.toFixed(2)}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="num font-mono text-5xl font-bold leading-none tracking-tight text-[var(--color-text)] sm:text-6xl"
              >
                {usd(xau)}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm text-[var(--color-text-dim)]">
              {ar ? "للأونصة" : "per troy oz"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span
              dir="ltr"
              className="num inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[13px] font-semibold"
              style={{ color: trend, background: `color-mix(in srgb, ${trend} 13%, transparent)` }}
            >
              <TrendIcon size={13} aria-hidden />
              {up ? "+" : ""}
              {ch.toFixed(2)} ({up ? "+" : ""}
              {chp.toFixed(2)}%)
            </span>
            <span dir="ltr" className="num font-mono text-xs text-[var(--color-text-dim)]">
              {ar ? "شراء/بيع " : "bid/ask "}
              {usd(bid)} / {usd(ask)}
              {spread > 0 ? ` · ±$${spread.toFixed(2)}` : ""}
            </span>
          </div>

          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--color-border)] pt-4">
            {stats.map((s) => (
              <div key={s.label} className="min-w-[5.5rem]">
                <dt className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
                  {s.label}
                </dt>
                <dd
                  dir="ltr"
                  className="num mt-0.5 font-mono text-sm font-semibold"
                  style={{ color: s.accent ?? "var(--color-text)" }}
                >
                  {usd(s.value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Per-gram rail: the answer above the fold ────────── */}
        <div className="lg:border-s lg:border-[var(--color-border)] lg:ps-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
            {ar ? "سعر الجرام الآن · دولار" : "Per gram right now · USD"}
          </h2>
          <ul className="mt-2">
            {KARATS.map((row) => {
              const gram = (xau / OZ_TO_GRAM) * row.purity;
              return (
                <li
                  key={row.k}
                  className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] py-3 last:border-b-0"
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold text-[#241c09]"
                      style={{
                        background: `linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-soft) ${row.purity * 100}%, #4a3a12 100%)`,
                      }}
                    >
                      {row.k.replace("K", "")}
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      {ar ? `عيار ${row.k.replace("K", "")}` : row.k}
                      <span className="ms-2 text-[10px] font-medium text-[var(--color-text-dim)]">
                        {row.pct}
                      </span>
                    </span>
                  </span>
                  <span dir="ltr" className="num font-mono text-sm font-bold text-[var(--color-text)]">
                    {usd(gram)}
                  </span>
                </li>
              );
            })}
          </ul>
          <a
            href="#karat-heading"
            className="mt-3 inline-block text-xs font-semibold text-[var(--color-gold)] transition-colors hover:underline"
          >
            {ar ? "كل العيارات بأكثر من 40 عملة ↓" : "All karats in 40+ currencies ↓"}
          </a>
        </div>

        {/* ── Exchange strip ──────────────────────────────────── */}
        <div className="lg:col-span-2">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-[var(--color-border)] pt-4">
            {live.sources.map((s) => {
              const srcUp = s.change_24h_pct >= 0;
              const srcTrend = srcUp ? "var(--color-up)" : "var(--color-down)";
              return (
                <li key={s.key} className="flex items-center gap-2 text-xs">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: s.connected ? "var(--color-up)" : "var(--color-down)" }}
                  />
                  <span className="font-semibold text-[var(--color-text-muted)]">{s.name}</span>
                  <span dir="ltr" className="num font-mono text-[var(--color-text)]">
                    {usd(s.last)}
                  </span>
                  <span dir="ltr" className="num font-mono" style={{ color: srcTrend }}>
                    {srcUp ? "+" : ""}
                    {s.change_24h_pct.toFixed(2)}%
                  </span>
                </li>
              );
            })}
            <li className="ms-auto text-[10px] text-[var(--color-text-dim)]">
              {ar ? "وسيط PAXG/USD · مدعوم بذهب فيزيائي 1:1" : "PAXG/USD median · backed 1:1 by physical gold"}
            </li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
