import type { HistoricalPoint, MetalHistory } from "@/lib/history";
import { KARAT_DEFS, OZ_G } from "@/lib/seo";

/**
 * Year summary for `/historical-gold-prices/[year]`.
 *
 * Shared by the page and its `generateMetadata`, because the year queries this
 * page actually ranks for are answer-shaped — "كم كان سعر الذهب 2024",
 * "اعلى سعر للذهب في 2026", "اقل سعر للذهب في ٢٠٢٦", "سعر جرام الذهب عام 2024"
 * (~2,150 impressions/28d at positions 3.8-9.4 in Search Console). Putting the
 * real high/low/average in the title, the opening sentence and the FAQ is what
 * turns those impressions into clicks.
 */
export type YearStats = {
  year: number;
  points: number;
  open: number;
  close: number;
  high: number;
  low: number;
  avg: number;
  yoyPct: number;
  /** Per-gram USD at the year's average ounce price, by karat key. */
  gram: Record<string, number>;
};

export function pointsForYear(hist: MetalHistory, yearNum: number): HistoricalPoint[] {
  return hist.XAU.filter((p) => p.date.startsWith(`${yearNum}-`));
}

export function yearStats(hist: MetalHistory, yearNum: number): YearStats | null {
  const points = pointsForYear(hist, yearNum);
  if (points.length === 0) return null;

  const closes = points.map((p) => p.close);
  const open = points[0].open;
  const close = points[points.length - 1].close;
  const avg = closes.reduce((a, b) => a + b, 0) / closes.length;
  const gram: Record<string, number> = {};
  for (const k of KARAT_DEFS) gram[k.key] = (avg / OZ_G) * k.purity;

  return {
    year: yearNum,
    points: points.length,
    open,
    close,
    high: Math.max(...points.map((p) => p.high)),
    low: Math.min(...points.map((p) => p.low)),
    avg,
    yoyPct: ((close - open) / open) * 100,
    gram,
  };
}
