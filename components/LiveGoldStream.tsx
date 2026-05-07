"use client";

import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, ArrowUp, Radio, Wifi, WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";

import { useLivePrice, type SourceState } from "@/components/LivePriceProvider";

function fmtUsd(n: number, frac = 2): string {
  if (!Number.isFinite(n) || n === 0) return "—";
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: frac, maximumFractionDigits: frac })}`;
}

function fmtPct(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
}

function fmtVol(n: number): string {
  if (!Number.isFinite(n) || n === 0) return "—";
  if (n > 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n > 1_000) return `${(n / 1_000).toFixed(2)}K`;
  return n.toFixed(2);
}

export function LiveGoldStream() {
  const t = useTranslations("LiveStream");
  const live = useLivePrice();
  const valid = live.sources.filter((s) => s.last > 0);
  const connected = live.sources.filter((s) => s.connected).length;
  const up = (live.changePct24 ?? 0) >= 0;
  const trend = up ? "var(--color-up)" : "var(--color-down)";

  return (
    <section
      aria-labelledby="livestream-heading"
      className="hero-spot-bg card-shadow relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
            <Radio
              size={12}
              className={connected > 0 ? "text-[var(--color-up)]" : "text-[var(--color-down)]"}
              aria-hidden
            />
            <span id="livestream-heading">{t("heading")}</span>
            <span className="text-[var(--color-text-dim)]">
              · {t("connected", { n: connected, total: live.sources.length })}
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-3">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`med-${(live.xau ?? 0).toFixed(2)}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
                className="font-mono text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl"
              >
                {fmtUsd(live.xau ?? 0)}
              </motion.div>
            </AnimatePresence>
            <span className="text-sm text-[var(--color-text-dim)]">{t("perOz")}</span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
            <span
              className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono font-semibold"
              style={{ color: trend, background: `${trend}1a` }}
            >
              {up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
              {fmtPct(live.changePct24 ?? 0)}
            </span>
            <span className="text-[var(--color-text-dim)]">
              {t("medianAcross", { n: valid.length })}
            </span>
            <span className="text-[var(--color-text-dim)]">
              · {t("totalTicks", { n: live.totalTicks })}
            </span>
            <span className="text-[var(--color-text-dim)]">· PAXG/USD</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {live.sources.map((s) => (
          <SourceCard key={s.key} state={s} />
        ))}
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-dim)]">{t("footnote")}</p>
    </section>
  );
}

function SourceCard({ state: s }: { state: SourceState }) {
  const t = useTranslations("LiveStream");
  const stale = s.ts > 0 && Date.now() - s.ts > 30_000;
  const spread = s.ask > 0 && s.bid > 0 ? s.ask - s.bid : 0;
  const trendColor = s.change_24h_pct >= 0 ? "var(--color-up)" : "var(--color-down)";

  return (
    <motion.div
      layout
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--color-text)]">{s.name}</span>
        <span
          className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider"
          style={{
            color: s.connected
              ? stale
                ? "var(--color-text-dim)"
                : "var(--color-up)"
              : "var(--color-down)",
          }}
        >
          {s.connected ? <Wifi size={10} /> : <WifiOff size={10} />}
          {s.connected ? (stale ? t("stale") : t("live")) : t("offline")}
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={s.last.toFixed(2)}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 3 }}
          transition={{ duration: 0.15 }}
          className="mt-2 font-mono text-xl font-bold text-[var(--color-text)]"
        >
          {fmtUsd(s.last)}
        </motion.div>
      </AnimatePresence>

      <div
        className="mt-1 inline-block rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold"
        style={{ color: trendColor, background: `${trendColor}1a` }}
      >
        {fmtPct(s.change_24h_pct)}
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-[var(--color-border)] pt-3 text-[10px]">
        <Row label={t("bid")} value={fmtUsd(s.bid)} accent="var(--color-up)" />
        <Row label={t("ask")} value={fmtUsd(s.ask)} accent="var(--color-down)" />
        <Row label={t("spread")} value={spread > 0 ? `$${spread.toFixed(2)}` : "—"} />
        <Row label={t("vol24")} value={fmtVol(s.volume_24h)} />
        <Row label={t("high24")} value={fmtUsd(s.high_24h)} />
        <Row label={t("low24")} value={fmtUsd(s.low_24h)} />
      </dl>

      <div className="mt-2 text-[9px] text-[var(--color-text-dim)]">
        {t("ticks", { n: s.tick_count })}
        {s.ts > 0 ? ` · ${t("lastTick", { n: Math.max(0, Math.floor((Date.now() - s.ts) / 1000)) })}` : ""}
      </div>
    </motion.div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[var(--color-text-dim)]">{label}</dt>
      <dd
        className="font-mono font-semibold"
        style={{ color: accent ?? "var(--color-text)" }}
      >
        {value}
      </dd>
    </div>
  );
}
