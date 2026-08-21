import { Suspense } from "react";
import { withLocales } from "@/lib/static-params";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { PriceChartSkeleton } from "@/components/skeletons";
import { Sidebar } from "@/components/Sidebar";
import { StoresMarquee } from "@/components/StoresMarquee";
import { TradingViewChart } from "@/components/TradingViewChart";
import { Link } from "@/i18n/navigation";
import { isRtl } from "@/i18n/routing";
import { getCachedAllHistory } from "@/lib/cached-fetchers";
import type { HistoricalPoint, MetalHistory } from "@/lib/history";
import { pointsForYear, yearStats, type YearStats } from "@/lib/year-stats";
import { faqPageSchema } from "@/lib/schemas";
import { buildAlternates, buildOpenGraph, SITE_URL } from "@/lib/metadata";

import {
  monthName,
  monthTableHeaders,
  yearAnswer,
  yearFaqs,
  yearPageText,
  yearStatLabels,
} from "./historical-year.i18n";

const FIRST_YEAR = 2000;
const CURRENT_YEAR = 2026;
const VALID_YEARS = Array.from({ length: CURRENT_YEAR - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i);

export async function generateStaticParams() {
  return withLocales(VALID_YEARS.map((y) => ({ year: String(y) })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}) {
  const { locale, year } = await params;
  const yearNum = Number(year);
  // Same cached feed the page uses, so this costs nothing extra: the title
  // carries the year's real high/low, which is what these queries ask for.
  let stats: YearStats | null = null;
  try {
    const hist = await getCachedAllHistory(yearNum >= CURRENT_YEAR - 4 ? "5y" : "max");
    stats = yearStats(hist, yearNum);
  } catch {
    stats = null; // upstream down → neutral archive title
  }
  const t = yearPageText(locale, year, stats);
  return {
    title: t.title,
    description: t.description,
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

  const t = yearPageText(locale, year);

  // Recent years come from the 5y feed; older years from the full series (GC=F since 2000).
  const histPromise = getCachedAllHistory(yearNum >= CURRENT_YEAR - 4 ? "5y" : "max");

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="min-w-0 space-y-8">
            <header>
              <Link href="/" className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-gold)]">
                {isRtl(locale) ? "→" : "←"} Gold Prices Arabia
              </Link>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {t.h1}
              </h1>
            </header>

            <Suspense fallback={null}>
              <YearAnswer yearNum={yearNum} promise={histPromise} locale={locale} />
            </Suspense>

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
            <Suspense fallback={null}>
              <YearFaq yearNum={yearNum} promise={histPromise} locale={locale} year={year} />
            </Suspense>
            <Faq />
          </section>
          <Sidebar />
        </div>
      </main>
    </>
  );
}

/**
 * Opening answer paragraph. The year pages rank for answer-shaped queries
 * ("كم كان سعر الذهب 2024", "اعلى سعر للذهب في 2026"), so the page states the
 * numbers in a single liftable sentence before any table.
 */
async function YearAnswer({
  yearNum,
  promise,
  locale,
}: {
  yearNum: number;
  promise: Promise<MetalHistory>;
  locale: string;
}) {
  const stats = yearStats(await promise, yearNum);
  if (!stats) return null;
  return (
    <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
      {yearAnswer(locale, stats)}
    </p>
  );
}

/** Per-year FAQ + FAQPage schema, mirroring the ranked questions. */
async function YearFaq({
  yearNum,
  promise,
  locale,
  year,
}: {
  yearNum: number;
  promise: Promise<MetalHistory>;
  locale: string;
  year: string;
}) {
  const stats = yearStats(await promise, yearNum);
  if (!stats) return null;
  const faqs = yearFaqs(locale, stats);
  const schema = {
    ...faqPageSchema(`/historical-gold-prices/${year}`, faqs, locale),
    "@id": `${SITE_URL}/historical-gold-prices/${year}#year-faq`,
  };
  return (
    <section aria-labelledby="year-faq-heading" className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <h2 id="year-faq-heading" className="mb-4 text-lg font-semibold text-[var(--color-text)]">
        {yearNum}
      </h2>
      <dl className="space-y-4">
        {faqs.map((f) => (
          <div key={f.q}>
            <dt className="text-sm font-semibold text-[var(--color-text)]">{f.q}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
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

  const labels = yearStatLabels(locale);

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

  const headers = monthTableHeaders(locale);
  const heading = yearPageText(locale, yearNum).monthlyHeading;

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
                    {monthName(locale, r.monthIdx)}
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
  return (
    <div className="rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-card)] p-8 text-center">
      <p className="text-sm text-[var(--color-text-muted)]">{yearPageText(locale, yearNum).noData}</p>
    </div>
  );
}
