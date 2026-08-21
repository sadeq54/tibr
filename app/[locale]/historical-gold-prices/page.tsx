import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { Breadcrumb } from "@/components/Breadcrumb";
import { ChartImage } from "@/components/ChartImage";
import { Header } from "@/components/Header";
import { Link } from "@/i18n/navigation";
import { getCachedAllHistory } from "@/lib/cached-fetchers";
import type { HistoricalPoint } from "@/lib/history";
import { buildPageMetadata, canonicalPath, SITE_URL } from "@/lib/metadata";
import { fmtNum } from "@/lib/seo";

const FIRST_YEAR = 2000;
const CURRENT_YEAR = 2026;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const ar = locale === "ar";
  return buildPageMetadata({
    locale,
    path: "/historical-gold-prices",
    title: ar
      ? `تاريخ أسعار الذهب من ${FIRST_YEAR} إلى ${CURRENT_YEAR}: جدول سنوي وأعلى وأدنى سعر`
      : `Gold Price History ${FIRST_YEAR}-${CURRENT_YEAR}: Yearly Table, Highs and Lows`,
    description: ar
      ? `سعر الذهب لكل سنة منذ ${FIRST_YEAR}: الافتتاح والإغلاق والأعلى والأدنى ونسبة التغير السنوية للأونصة بالدولار، مع رسم بياني منذ 2000 وصفحة مفصلة لكل عام.`
      : `Gold price for every year since ${FIRST_YEAR}: open, close, high, low and yearly change per ounce in USD, a chart since 2000, and a detailed page for each year.`,
  });
}

type YearRow = {
  year: number;
  open: number;
  close: number;
  high: number;
  low: number;
  changePct: number;
  days: number;
};

function yearlyRows(points: HistoricalPoint[]): YearRow[] {
  const byYear = new Map<number, HistoricalPoint[]>();
  for (const p of points) {
    if (!Number.isFinite(p.close) || p.close <= 0) continue;
    const y = Number(p.date.slice(0, 4));
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  }
  return [...byYear.entries()]
    .filter(([y, pts]) => y >= FIRST_YEAR && pts.length > 5)
    .map(([year, pts]) => {
      const open = pts[0].open > 0 ? pts[0].open : pts[0].close;
      const close = pts[pts.length - 1].close;
      return {
        year,
        open,
        close,
        high: Math.max(...pts.map((p) => p.high || p.close)),
        low: Math.min(...pts.map((p) => p.low || p.close)),
        changePct: ((close - open) / open) * 100,
        days: pts.length,
      };
    })
    .sort((a, b) => b.year - a.year);
}

async function YearTable({ locale }: { locale: string }) {
  const ar = locale === "ar";
  const hist = await getCachedAllHistory("max");
  const rows = yearlyRows(hist.XAU);
  if (rows.length === 0) {
    return (
      <p className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 text-sm text-[var(--color-text-muted)]">
        {ar ? "تعذّر تحميل البيانات التاريخية مؤقتًا. حاول مرة أخرى بعد قليل." : "Historical data is temporarily unavailable. Please try again shortly."}
      </p>
    );
  }
  const allTimeHigh = rows.reduce((m, r) => (r.high > m.high ? r : m), rows[0]);
  const th = "px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]";
  const td = "num px-3 py-2.5 text-end font-mono text-sm";

  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE_URL}${canonicalPath(locale, "/historical-gold-prices")}#dataset`,
    name: ar ? "أسعار الذهب السنوية منذ 2000" : "Yearly gold prices since 2000",
    description: ar
      ? "الافتتاح والإغلاق والأعلى والأدنى السنوي لسعر أونصة الذهب بالدولار منذ عام 2000، مشتقة من إغلاقات عقود COMEX اليومية."
      : "Yearly open, close, high and low of the gold ounce price in USD since 2000, derived from daily COMEX futures closes.",
    url: `${SITE_URL}${canonicalPath(locale, "/historical-gold-prices")}`,
    creator: { "@id": `${SITE_URL}/#org` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    temporalCoverage: `${rows[rows.length - 1].year}/${rows[0].year}`,
    variableMeasured: ["open", "close", "high", "low", "yearly change"],
    distribution: rows.slice(0, 6).map((r) => ({
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: `${SITE_URL}/api/spot?symbol=XAU&year=${r.year}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dataset).replace(/</g, "\\u003c") }}
      />
      <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-[var(--color-text-muted)]">
        {ar
          ? `أعلى سعر سنوي على الإطلاق في هذه السلسلة سُجّل عام ${allTimeHigh.year} عند ${fmtNum(allTimeHigh.high, 0)} دولار للأونصة. الجدول يعرض ${rows.length} سنة من بيانات الإغلاق اليومي لعقود COMEX الآجلة (GC=F)، وكل سنة لها صفحة مفصلة بالشهور.`
          : `The highest yearly price in this series was set in ${allTimeHigh.year} at $${fmtNum(allTimeHigh.high, 0)} per ounce. The table covers ${rows.length} years of daily COMEX futures closes (GC=F); every year has its own month-by-month page.`}
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <table className="w-full min-w-[620px] border-collapse">
          <caption className="sr-only">{ar ? "أسعار الذهب السنوية بالدولار للأونصة" : "Yearly gold prices in USD per ounce"}</caption>
          <thead className="border-b border-[var(--color-border)]">
            <tr>
              <th scope="col" className={`${th} text-start`}>{ar ? "السنة" : "Year"}</th>
              <th scope="col" className={`${th} text-end`}>{ar ? "الافتتاح" : "Open"}</th>
              <th scope="col" className={`${th} text-end`}>{ar ? "الإغلاق" : "Close"}</th>
              <th scope="col" className={`${th} text-end`}>{ar ? "الأعلى" : "High"}</th>
              <th scope="col" className={`${th} text-end`}>{ar ? "الأدنى" : "Low"}</th>
              <th scope="col" className={`${th} text-end`}>{ar ? "التغير" : "Change"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {rows.map((r) => {
              const up = r.changePct >= 0;
              return (
                <tr key={r.year}>
                  <th scope="row" className="px-3 py-2.5 text-start text-sm font-semibold">
                    <Link
                      href={`/historical-gold-prices/${r.year}` as never}
                      className="text-[var(--color-gold)] hover:underline"
                    >
                      {r.year}
                    </Link>
                  </th>
                  <td dir="ltr" className={`${td} text-[var(--color-text-muted)]`}>{fmtNum(r.open, 0)}</td>
                  <td dir="ltr" className={`${td} font-bold text-[var(--color-text)]`}>{fmtNum(r.close, 0)}</td>
                  <td dir="ltr" className={`${td} text-[var(--color-up)]`}>{fmtNum(r.high, 0)}</td>
                  <td dir="ltr" className={`${td} text-[var(--color-down)]`}>{fmtNum(r.low, 0)}</td>
                  <td dir="ltr" className={`${td} font-semibold`} style={{ color: up ? "var(--color-up)" : "var(--color-down)" }}>
                    {up ? "+" : ""}
                    {r.changePct.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ar = locale === "ar";

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Breadcrumb
          locale={locale}
          items={[
            { name: ar ? "الرئيسية" : "Home", href: "/" },
            { name: ar ? "تاريخ أسعار الذهب" : "Gold price history", href: "/historical-gold-prices" },
          ]}
        />
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)] sm:text-4xl">
            {ar ? `تاريخ أسعار الذهب من ${FIRST_YEAR} إلى ${CURRENT_YEAR}` : `Gold price history, ${FIRST_YEAR} to ${CURRENT_YEAR}`}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {ar
              ? "أكثر من ربع قرن من أسعار أونصة الذهب بالدولار: رسم بياني كامل منذ عام 2000، وجدول سنوي بالافتتاح والإغلاق والأعلى والأدنى، وصفحة مفصلة بالشهور لكل سنة. البيانات من إغلاقات COMEX اليومية ويمكن تضمين الرسم البياني مجانًا مع ذكر المصدر."
              : "More than a quarter century of gold ounce prices in USD: a full chart since 2000, a yearly table of open, close, high and low, and a month-by-month page for every year. Data is from daily COMEX closes; the chart is free to embed with attribution."}
          </p>
        </header>

        <div className="mt-8">
          <ChartImage currency="USD" locale={locale} pagePath="/historical-gold-prices" range="max" />
        </div>

        <Suspense
          fallback={<div className="skeleton mt-8 h-96 w-full" role="status" aria-busy="true" aria-label={ar ? "جارٍ التحميل" : "Loading"} />}
        >
          <YearTable locale={locale} />
        </Suspense>
      </main>
    </>
  );
}
