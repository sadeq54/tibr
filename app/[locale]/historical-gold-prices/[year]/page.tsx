import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { PriceChartSkeleton } from "@/components/skeletons";
import { Sidebar } from "@/components/Sidebar";
import { StoresMarquee } from "@/components/StoresMarquee";
import { TradingViewChart } from "@/components/TradingViewChart";
import { Link } from "@/i18n/navigation";
import { getCachedAllHistory } from "@/lib/cached-fetchers";
import type { HistoricalPoint, MetalHistory } from "@/lib/history";
import { buildAlternates, buildOpenGraph, SITE_URL } from "@/lib/metadata";

const VALID_YEARS = [2024, 2025, 2026];

const MONTH_LABELS = {
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  ar: [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
  ],
};

export async function generateStaticParams() {
  return VALID_YEARS.map((y) => ({ year: String(y) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}) {
  const { locale, year } = await params;
  const t = await getTranslations({ locale, namespace: "HistoricalPage" });
  return {
    title: t("title", { year }), description: t("description", { year }),
    alternates: buildAlternates(locale, `/historical-gold-prices/${year}`),
    openGraph: buildOpenGraph(locale, `/historical-gold-prices/${year}`),
  };
}

export default async function HistoricalPage({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}) {
  const { locale, year } = await params;
  const yearNum = Number(year);
  if (!VALID_YEARS.includes(yearNum)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("HistoricalPage");
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX";

  // 5y range from Yahoo Finance covers 2021-2026 — enough for any VALID_YEARS entry.
  const histPromise = getCachedAllHistory("5y");

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE_URL}/historical-gold-prices/${year}#dataset`,
    name: `Historical Gold Price ${year} — Daily OHLC`,
    description: `Daily open / high / low / close gold price (XAU/USD) data for ${year}, sourced from COMEX gold futures (GC=F) and LBMA spot equivalents. Aggregated by Gold Prices Arabia.`,
    url: `${SITE_URL}/historical-gold-prices/${year}`,
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    keywords: [
      "gold price history",
      "gold OHLC",
      "XAU/USD historical",
      `gold price ${year}`,
      "COMEX gold futures",
      "LBMA spot gold",
    ],
    temporalCoverage: `${year}-01-01/${year}-12-31`,
    variableMeasured: [
      { "@type": "PropertyValue", name: "Open", unitText: "USD per troy ounce" },
      { "@type": "PropertyValue", name: "High", unitText: "USD per troy ounce" },
      { "@type": "PropertyValue", name: "Low", unitText: "USD per troy ounce" },
      { "@type": "PropertyValue", name: "Close", unitText: "USD per troy ounce" },
      { "@type": "PropertyValue", name: "Volume", unitText: "contracts" },
    ],
    measurementTechnique:
      "COMEX gold futures (GC=F) daily settlement; cross-verified against LBMA AM/PM fix.",
    creator: { "@id": `${SITE_URL}/#org` },
    publisher: { "@id": `${SITE_URL}/#org` },
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/json",
        contentUrl: `${SITE_URL}/api/spot?symbol=XAU&year=${year}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="min-w-0 space-y-8">
            <header>
              <Link href="/" className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-gold)]">
                ← Gold Prices Arabia
              </Link>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {t("h1", { year })}
              </h1>
            </header>

            <Suspense fallback={<StatsSkeleton />}>
              <YearStats yearNum={yearNum} promise={histPromise} locale={locale} />
            </Suspense>

            <TradingViewChart />

            <AffiliateBanner />

            <Suspense fallback={<PriceChartSkeleton />}>
              <MonthlyTable yearNum={yearNum} promise={histPromise} locale={locale} />
            </Suspense>

            <div className="grid gap-3 sm:grid-cols-3">
              {VALID_YEARS.filter((y) => y !== yearNum).map((y) => (
                <Link
                  key={y}
                  href={`/historical-gold-prices/${y}`}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 text-center transition hover:border-[var(--color-gold)]/40"
                >
                  <div className="text-sm font-semibold text-[var(--color-gold)]">{y}</div>
                </Link>
              ))}
            </div>

            <StoresMarquee />
            <Faq />
          </section>
          <Sidebar adClient={adsClient} />
        </div>
      </main>
    </>
  );
}

function pointsForYear(hist: MetalHistory, yearNum: number): HistoricalPoint[] {
  return hist.XAU.filter((p) => p.date.startsWith(`${yearNum}-`));
}

async function YearStats({
  yearNum,
  promise,
  locale,
}: {
  yearNum: number;
  promise: Promise<MetalHistory>;
  locale: string;
}) {
  const hist = await promise;
  const points = pointsForYear(hist, yearNum);
  if (points.length === 0) return <NoData yearNum={yearNum} locale={locale} />;

  const closes = points.map((p) => p.close);
  const high = Math.max(...points.map((p) => p.high));
  const low = Math.min(...points.map((p) => p.low));
  const avg = closes.reduce((a, b) => a + b, 0) / closes.length;
  const open = points[0].open;
  const close = points[points.length - 1].close;
  const yoyPct = ((close - open) / open) * 100;
  const up = yoyPct >= 0;

  const labels = locale === "ar"
    ? { open: "افتتاح السنة", close: "إغلاق السنة", high: "أعلى سعر", low: "أدنى سعر", avg: "المتوسط", yoy: "التغير السنوي", points: "أيام التداول" }
    : { open: "Year open", close: "Year close", high: "Year high", low: "Year low", avg: "Year average", yoy: "Year change", points: "Trading days" };

  return (
    <section
      aria-labelledby="stats-heading"
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
    >
      <h2 id="stats-heading" className="mb-4 text-lg font-semibold text-[var(--color-text)]">
        XAU/USD · {yearNum}
        <span className="ms-2 text-xs font-normal text-[var(--color-text-dim)]">
          ({points.length} {labels.points})
        </span>
      </h2>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat label={labels.open} value={`$${open.toFixed(2)}`} />
        <Stat label={labels.close} value={`$${close.toFixed(2)}`} />
        <Stat label={labels.high} value={`$${high.toFixed(2)}`} accent="var(--color-up)" />
        <Stat label={labels.low} value={`$${low.toFixed(2)}`} accent="var(--color-down)" />
        <Stat label={labels.avg} value={`$${avg.toFixed(2)}`} />
        <Stat
          label={labels.yoy}
          value={`${up ? "+" : ""}${yoyPct.toFixed(2)}%`}
          accent={up ? "var(--color-up)" : "var(--color-down)"}
        />
      </dl>
    </section>
  );
}

async function MonthlyTable({
  yearNum,
  promise,
  locale,
}: {
  yearNum: number;
  promise: Promise<MetalHistory>;
  locale: string;
}) {
  const hist = await promise;
  const points = pointsForYear(hist, yearNum);
  if (points.length === 0) return null;

  const byMonth = new Map<number, HistoricalPoint[]>();
  for (const p of points) {
    const monthIdx = Number(p.date.slice(5, 7)) - 1;
    const arr = byMonth.get(monthIdx) ?? [];
    arr.push(p);
    byMonth.set(monthIdx, arr);
  }

  const monthNames = MONTH_LABELS[locale === "ar" ? "ar" : "en"];
  const headers = locale === "ar"
    ? { month: "الشهر", open: "افتتاح", high: "أعلى", low: "أدنى", close: "إغلاق", change: "التغير" }
    : { month: "Month", open: "Open", high: "High", low: "Low", close: "Close", change: "Change" };
  const heading = locale === "ar"
    ? `سعر الذهب الشهري · ${yearNum} (دولار أمريكي / أونصة)`
    : `Monthly XAU/USD · ${yearNum} (USD / troy oz)`;

  const rows = Array.from(byMonth.entries())
    .sort(([a], [b]) => a - b)
    .map(([monthIdx, pts]) => {
      const open = pts[0].open;
      const close = pts[pts.length - 1].close;
      const high = Math.max(...pts.map((p) => p.high));
      const low = Math.min(...pts.map((p) => p.low));
      const changePct = ((close - open) / open) * 100;
      return { monthIdx, open, close, high, low, changePct };
    });

  return (
    <section
      aria-labelledby="monthly-heading"
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
    >
      <h2
        id="monthly-heading"
        className="mb-4 text-lg font-semibold text-[var(--color-text)]"
      >
        {heading}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-left">
              <th className="py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                {headers.month}
              </th>
              <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                {headers.open}
              </th>
              <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                {headers.high}
              </th>
              <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                {headers.low}
              </th>
              <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                {headers.close}
              </th>
              <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                {headers.change}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const up = r.changePct >= 0;
              const color = up ? "var(--color-up)" : "var(--color-down)";
              return (
                <tr
                  key={r.monthIdx}
                  className="border-b border-[var(--color-border)] last:border-b-0"
                >
                  <td className="py-3 font-semibold text-[var(--color-text)]">
                    {monthNames[r.monthIdx]}
                  </td>
                  <td className="py-3 text-right font-mono text-[var(--color-text)]">
                    ${r.open.toFixed(2)}
                  </td>
                  <td className="py-3 text-right font-mono text-[var(--color-up)]">
                    ${r.high.toFixed(2)}
                  </td>
                  <td className="py-3 text-right font-mono text-[var(--color-down)]">
                    ${r.low.toFixed(2)}
                  </td>
                  <td className="py-3 text-right font-mono text-[var(--color-text)]">
                    ${r.close.toFixed(2)}
                  </td>
                  <td className="py-3 text-right font-mono font-semibold" style={{ color }}>
                    {up ? "+" : ""}
                    {r.changePct.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-3">
      <dt className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
        {label}
      </dt>
      <dd
        className="mt-1 font-mono text-sm font-semibold"
        style={{ color: accent ?? "var(--color-text)" }}
      >
        {value}
      </dd>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="skeleton h-32 w-full rounded-xl" aria-hidden />
  );
}

function NoData({ yearNum, locale }: { yearNum: number; locale: string }) {
  const msg = locale === "ar"
    ? `لا تتوفر بيانات تاريخية لعام ${yearNum} حالياً.`
    : `Historical data for ${yearNum} is not available yet.`;
  return (
    <div className="rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-card)] p-8 text-center">
      <p className="text-sm text-[var(--color-text-muted)]">{msg}</p>
    </div>
  );
}
