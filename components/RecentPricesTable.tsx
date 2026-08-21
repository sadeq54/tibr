import type { FxRates } from "@/lib/fx";
import type { HistoricalPoint } from "@/lib/history";
import { KARAT_DEFS, OZ_G, currencyName, dateLabel, fmtNum } from "@/lib/seo";

import { karatLabel } from "@/lib/karat-label";

import {
  changeHeader,
  recentCaption,
  recentHeading,
  recentRangeSentence,
  tableText,
} from "./tables.i18n";

const DAYS = 7;
const RANGE_DAYS = 30;

/**
 * "Previous days" table: daily closing gold price per gram for the last seven
 * trading days in the page currency, plus the 30-day high/low for the page's
 * karat. Answers "was gold higher yesterday?" in one glance — and gives
 * crawlers a dated, tabular history block (a fixture on every #1 gold page).
 * Source: daily COMEX (GC=F) closes via the history feed; converted with the
 * same purity × FX math as the live table.
 */
export function RecentPricesTable({
  history,
  fx,
  currency,
  locale,
  karat,
  countryName,
}: {
  history: HistoricalPoint[] | undefined;
  fx?: FxRates | null;
  currency: string;
  locale: string;
  karat: string;
  countryName?: string;
}) {
  if (!history || history.length < 2) return null;

  const rawRate = currency === "USD" ? 1 : (fx?.[currency] as number | undefined);
  const rate = typeof rawRate === "number" && Number.isFinite(rawRate) && rawRate > 0 ? rawRate : null;
  if (!rate) return null;

  const kDef = KARAT_DEFS.find((k) => k.key === karat.toLowerCase()) ?? KARAT_DEFS[0];
  const cols = KARAT_DEFS.filter((k) => k.key !== "14k"); // 24/22/21/18 keep the table readable
  const cur = currencyName(currency, locale);

  const valid = history.filter((p) => Number.isFinite(p.close) && p.close > 0);
  const recent = valid.slice(-(DAYS + 1));
  const rows = recent
    .map((p, i) => {
      const prev = i > 0 ? recent[i - 1] : null;
      const gram = (p.close / OZ_G) * kDef.purity * rate;
      const prevGram = prev ? (prev.close / OZ_G) * kDef.purity * rate : null;
      const d = new Date(p.date);
      return {
        key: p.date,
        date: Number.isFinite(d.getTime()) ? d : null,
        perKarat: cols.map((k) => (p.close / OZ_G) * k.purity * rate),
        change: prevGram ? gram - prevGram : null,
        changePct: prevGram ? ((gram - prevGram) / prevGram) * 100 : null,
      };
    })
    .slice(1)
    .reverse();

  if (rows.length === 0) return null;

  const last30 = valid.slice(-RANGE_DAYS).map((p) => (p.close / OZ_G) * kDef.purity * rate);
  const hi = Math.max(...last30);
  const lo = Math.min(...last30);
  const frac = rate * (valid[valid.length - 1].close / OZ_G) > 500 ? 0 : 2;
  const heading = recentHeading(locale, countryName);

  const th = "px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]";
  const td = "num px-3 py-2.5 font-mono text-sm";

  return (
    <section aria-labelledby="recent-prices-heading">
      <h2 id="recent-prices-heading" className="text-xl font-semibold text-[var(--color-text)]">
        {heading}
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        {recentRangeSentence(locale, {
          label: kDef.label,
          cur,
          hi: fmtNum(hi, frac),
          lo: fmtNum(lo, frac),
        })}
      </p>

      <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <table className="w-full min-w-[520px] border-collapse">
          <caption className="sr-only">
            {recentCaption(locale, cur, DAYS)}
          </caption>
          <thead className="border-b border-[var(--color-border)]">
            <tr>
              <th scope="col" className={`${th} text-start`}>{tableText(locale, "date")}</th>
              {cols.map((k) => (
                <th key={k.key} scope="col" className={`${th} text-end`}>
                  {karatLabel(locale, k.label)}
                </th>
              ))}
              <th scope="col" className={`${th} text-end`}>
                {changeHeader(locale, kDef.label)}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {rows.map((r) => {
              const up = (r.change ?? 0) >= 0;
              return (
                <tr key={r.key}>
                  <th scope="row" className="px-3 py-2.5 text-start text-sm font-medium text-[var(--color-text)]">
                    {r.date ? (
                      <time dateTime={r.key}>{dateLabel(locale, r.date)}</time>
                    ) : (
                      r.key
                    )}
                  </th>
                  {r.perKarat.map((v, i) => (
                    <td
                      key={cols[i].key}
                      dir="ltr"
                      className={`${td} text-end ${cols[i].key === kDef.key ? "font-bold text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}
                    >
                      {fmtNum(v, frac)}
                    </td>
                  ))}
                  <td
                    dir="ltr"
                    className={`${td} text-end font-semibold`}
                    style={{ color: up ? "var(--color-up)" : "var(--color-down)" }}
                  >
                    {r.change === null
                      ? "—"
                      : `${up ? "+" : ""}${fmtNum(Math.abs(r.change), frac).replace(/^/, up ? "" : "-")} (${up ? "+" : ""}${(r.changePct ?? 0).toFixed(2)}%)`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-[var(--color-text-dim)]">
        {tableText(locale, "recentFootnote")}
      </p>
    </section>
  );
}
