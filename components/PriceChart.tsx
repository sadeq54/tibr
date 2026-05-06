"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { FxRates } from "@/lib/fx";
import type { HistoricalPoint, MetalHistory } from "@/lib/history";

type Metal = "XAU" | "XAG" | "XPT" | "XPD";
type Currency = "USD" | "JOD" | "SAR" | "AED" | "EGP";
type Unit = "oz" | "g" | "kg";
type Period = "30D" | "60D" | "90D" | "180D" | "1Y";

const METALS: Array<{ id: Metal; label: string }> = [
  { id: "XAU", label: "Gold" },
  { id: "XAG", label: "Silver" },
  { id: "XPT", label: "Platinum" },
  { id: "XPD", label: "Palladium" },
];

const CURRENCIES: Currency[] = ["USD", "JOD", "SAR", "AED", "EGP"];

const UNIT_FACTOR: Record<Unit, number> = {
  oz: 1,
  g: 1 / 31.1034768,
  kg: 1000 / 31.1034768,
};

const UNIT_LABEL: Record<Unit, string> = {
  oz: "oz",
  g: "g",
  kg: "kg",
};

const PERIODS: Array<{ id: Period; days: number }> = [
  { id: "30D", days: 22 },
  { id: "60D", days: 44 },
  { id: "90D", days: 66 },
  { id: "180D", days: 132 },
  { id: "1Y", days: 260 },
];

const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: "$",
  JOD: "JD ",
  SAR: "SR ",
  AED: "AED ",
  EGP: "EGP ",
};

export function PriceChart({
  histories,
  fx,
  initialMetal = "XAU",
}: {
  histories: MetalHistory;
  fx: FxRates;
  initialMetal?: Metal;
}) {
  const t = useTranslations("PriceChart");
  const [metal, setMetal] = useState<Metal>(initialMetal);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [unit, setUnit] = useState<Unit>("oz");
  const [period, setPeriod] = useState<Period>("60D");

  const points: HistoricalPoint[] = histories[metal] ?? [];

  const data = useMemo(() => {
    if (!points.length) return [];
    const days = PERIODS.find((p) => p.id === period)?.days ?? 60;
    const sliced = points.slice(-days);
    const fxRate = (fx[currency] as number | undefined) ?? 1;
    const factor = UNIT_FACTOR[unit];
    return sliced.map((p) => ({
      date: p.date,
      value: +(p.close * fxRate * factor).toFixed(unit === "oz" ? 2 : 4),
    }));
  }, [points, period, currency, unit, fx]);

  const stats = useMemo(() => {
    if (data.length < 2) return null;
    const first = data[0].value;
    const last = data[data.length - 1].value;
    const ch = last - first;
    const chp = (ch / first) * 100;
    const min = Math.min(...data.map((p) => p.value));
    const max = Math.max(...data.map((p) => p.value));
    return { ch, chp, min, max, last, first };
  }, [data]);

  const symbol = CURRENCY_SYMBOL[currency];
  const metalLabel = METALS.find((m) => m.id === metal)?.label ?? metal;
  const up = (stats?.ch ?? 0) >= 0;
  const trendColor = up ? "var(--color-up)" : "var(--color-down)";

  const [chartColors, setChartColors] = useState({
    line: "#f5c518",
    grid: "#1f1f1f",
    tooltipBg: "#0a0a0a",
    axis: "#8a8a8a",
    border: "#1f1f1f",
  });

  useEffect(() => {
    function readVars() {
      const cs = getComputedStyle(document.documentElement);
      setChartColors({
        line: cs.getPropertyValue("--color-gold").trim() || "#f5c518",
        grid: cs.getPropertyValue("--color-grid").trim() || "#1f1f1f",
        tooltipBg: cs.getPropertyValue("--color-tooltip-bg").trim() || "#0a0a0a",
        axis: cs.getPropertyValue("--color-axis").trim() || "#8a8a8a",
        border: cs.getPropertyValue("--color-border").trim() || "#1f1f1f",
      });
    }
    readVars();
    const observer = new MutationObserver(readVars);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => observer.disconnect();
  }, []);

  const lineColor = chartColors.line;
  const formatPrice = (v: number) => {
    if (!Number.isFinite(v)) return "—";
    return `${symbol}${v.toLocaleString("en-US", {
      minimumFractionDigits: unit === "oz" ? 2 : 3,
      maximumFractionDigits: unit === "oz" ? 2 : 4,
    })}`;
  };

  return (
    <section
      aria-labelledby="chart-heading"
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="chart-heading" className="text-base font-semibold text-[var(--color-text)]">
            {t("titleDynamic", {
              period,
              metal: metalLabel,
              currency,
              unit: UNIT_LABEL[unit],
            })}
          </h2>
          {stats ? (
            <div className="mt-1 flex items-center gap-3 text-xs">
              <span className="font-mono text-lg font-bold text-[var(--color-text)]">
                {formatPrice(stats.last)}
              </span>
              <span
                className="rounded px-1.5 py-0.5 font-mono font-semibold"
                style={{ color: trendColor, background: `${trendColor}1a` }}
              >
                {up ? "▲" : "▼"} {up ? "+" : ""}{stats.chp.toFixed(2)}%
              </span>
              <span className="text-[var(--color-text-dim)]">
                {t("rangeStats", {
                  low: formatPrice(stats.min),
                  high: formatPrice(stats.max),
                })}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        <Selector label={t("metal")} value={metal} onChange={(v) => setMetal(v as Metal)}>
          {METALS.map((m) => (
            <option key={m.id} value={m.id} className="bg-[var(--color-bg-card)] text-[var(--color-text)]">
              {m.label}
            </option>
          ))}
        </Selector>
        <Selector label={t("currency")} value={currency} onChange={(v) => setCurrency(v as Currency)}>
          {CURRENCIES.map((c) => (
            <option key={c} value={c} className="bg-[var(--color-bg-card)] text-[var(--color-text)]">
              {c}
            </option>
          ))}
        </Selector>
        <Selector label={t("unit")} value={unit} onChange={(v) => setUnit(v as Unit)}>
          {(Object.keys(UNIT_LABEL) as Unit[]).map((u) => (
            <option key={u} value={u} className="bg-[var(--color-bg-card)] text-[var(--color-text)]">
              {UNIT_LABEL[u]}
            </option>
          ))}
        </Selector>
        <Selector label={t("period")} value={period} onChange={(v) => setPeriod(v as Period)}>
          {PERIODS.map((p) => (
            <option key={p.id} value={p.id} className="bg-[var(--color-bg-card)] text-[var(--color-text)]">
              {p.id}
            </option>
          ))}
        </Selector>
      </div>

      <div className="relative mt-5" style={{ width: "100%", height: 360 }}>
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs text-[var(--color-text-dim)]">
            {t("unavailable")}
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={360}>
              <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: chartColors.axis }}
                  axisLine={{ stroke: chartColors.grid }}
                  tickLine={false}
                  tickFormatter={(v: string) => {
                    const d = new Date(v);
                    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  }}
                  minTickGap={48}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: chartColors.axis }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => {
                    if (Math.abs(v) >= 1000) return `${symbol}${(v / 1000).toFixed(1)}k`;
                    return `${symbol}${v.toFixed(unit === "oz" ? 0 : 2)}`;
                  }}
                  domain={["dataMin - dataMin*0.005", "dataMax + dataMax*0.005"]}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    background: chartColors.tooltipBg,
                    border: `1px solid ${chartColors.border}`,
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: chartColors.axis }}
                  itemStyle={{ color: lineColor }}
                  formatter={(v) => {
                    const n = typeof v === "number" ? v : Number(v);
                    return [formatPrice(n), t("close")];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={lineColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: lineColor, stroke: chartColors.tooltipBg, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-3 right-4 text-[10px] tracking-wide text-[var(--color-text-dim)]"
            >
              tibr.live
            </span>
          </>
        )}
      </div>

      <p className="mt-3 text-[10px] text-[var(--color-text-dim)]">{t("source")}</p>
    </section>
  );
}

function Selector({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-card-hover)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-gold)] focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}
