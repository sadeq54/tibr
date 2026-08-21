import { Suspense } from "react";
import type React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AdSensePlacement } from "@/components/AdSensePlacement";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { BidAskGauge } from "@/components/BidAskGauge";
import { Calculator } from "@/components/Calculator";
import { CurrencyTable } from "@/components/CurrencyTable";
import { DebugConsole } from "@/components/DebugConsole";
import { Faq } from "@/components/Faq";
import { GeoRedirect } from "@/components/GeoRedirect";
import { Header } from "@/components/Header";
import { HeroBoard } from "@/components/HeroBoard";
import { HomepageSeoHeader } from "@/components/HomepageSeoHeader";
import { JsonLd } from "@/components/JsonLd";
import { KaratGrid } from "@/components/KaratGrid";
import dynamic from "next/dynamic";

import { LazyMount } from "@/components/LazyMount";
import { MetalsStrip } from "@/components/MetalsStrip";
import { PriceChart } from "@/components/PriceChart";
import { ResearchTeaser } from "@/components/ResearchTeaser";
import { Sidebar } from "@/components/Sidebar";
import { StoresMarquee } from "@/components/StoresMarquee";
import { TradeGoldCta } from "@/components/TradeGoldCta";

// Heavy / below-the-fold widgets — defer JS to improve LCP/FCP/TTI.
// Wrapped in <LazyMount> below for IntersectionObserver-gated client mount.
const TradingViewChart = dynamic(() =>
  import("@/components/TradingViewChart").then((m) => m.TradingViewChart),
);
import {
  BidAskGaugeSkeleton,
  CalculatorSkeleton,
  HeroSpotSkeleton,
  KaratGridSkeleton,
  MetalsStripSkeleton,
  PriceChartSkeleton,
} from "@/components/skeletons";
import { Link } from "@/i18n/navigation";
import {
  getCachedAllHistory,
  getCachedFxRates,
  getCachedMetals,
  getCachedResearch,
} from "@/lib/cached-fetchers";
import type { ResearchDigest } from "@/lib/research";
import type { FxRates } from "@/lib/fx";
import type { MetalsBundle } from "@/lib/goldapi";
import type { MetalHistory } from "@/lib/history";
import { buildAlternates, buildOpenGraph, SITE_URL } from "@/lib/metadata";

import { homeText } from "./page.i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Page" });
  return {
    title: t("title"), description: t("description"),
    alternates: buildAlternates(locale, "/"),
    openGraph: buildOpenGraph(locale, "/"),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Streaming sections — each awaits its own promise, falls back to a skeleton
// while data resolves. Same fetch URL across sections is deduped by Next cache.
// ─────────────────────────────────────────────────────────────────────────────

async function HeroBoardSection({ promise }: { promise: Promise<MetalsBundle> }) {
  const m = await promise;
  return <HeroBoard initialSpot={m.XAU} />;
}

async function CurrencyTableSection({
  mPromise,
  fxPromise,
  locale,
}: {
  mPromise: Promise<MetalsBundle>;
  fxPromise: Promise<FxRates>;
  locale: string;
}) {
  const [m, fx] = await Promise.all([mPromise, fxPromise]);
  return <CurrencyTable spot={m.XAU} fx={fx} locale={locale} />;
}

async function ResearchTeaserSection({
  promise,
  locale,
}: {
  promise: Promise<ResearchDigest>;
  locale: string;
}) {
  const digest = await promise;
  return <ResearchTeaser digest={digest} locale={locale} />;
}

async function MetalsStripSection({ promise }: { promise: Promise<MetalsBundle> }) {
  const m = await promise;
  return <MetalsStrip metals={m} />;
}

async function PriceChartSection({
  hPromise,
  fxPromise,
}: {
  hPromise: Promise<MetalHistory>;
  fxPromise: Promise<FxRates>;
}) {
  const [h, fx] = await Promise.all([hPromise, fxPromise]);
  return <PriceChart histories={h} fx={fx} />;
}

async function BidAskSection({ promise }: { promise: Promise<MetalsBundle> }) {
  const m = await promise;
  return <BidAskGauge spot={m.XAU} />;
}

async function KaratGridSection({
  mPromise,
  fxPromise,
}: {
  mPromise: Promise<MetalsBundle>;
  fxPromise: Promise<FxRates>;
}) {
  const [m, fx] = await Promise.all([mPromise, fxPromise]);
  return <KaratGrid spot={m.XAU} fx={fx} />;
}

async function CalculatorSection({
  mPromise,
  fxPromise,
}: {
  mPromise: Promise<MetalsBundle>;
  fxPromise: Promise<FxRates>;
}) {
  const [m, fx] = await Promise.all([mPromise, fxPromise]);
  const spot = m.XAU;
  const calcSpot = spot
    ? {
        price_gram_24k: spot.price_gram_24k,
        price_gram_21k: spot.price_gram_21k,
        price_gram_18k: spot.price_gram_18k,
        price_gram_14k: spot.price_gram_14k,
      }
    : { price_gram_24k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };
  return <Calculator spot={calcSpot} fx={fx} />;
}

async function MetaSection({
  mPromise,
  fxPromise,
}: {
  mPromise: Promise<MetalsBundle>;
  fxPromise: Promise<FxRates>;
}) {
  const [m, fx] = await Promise.all([mPromise, fxPromise]);
  return (
    <>
      <JsonLd spot={m.XAU} siteUrl={SITE_URL} pageOnly />
      <DebugConsole spot={m.XAU} metals={m} fx={fx} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Page");
  const h = homeText(locale);

  // Kick off fetches in parallel; share promises with Suspense children.
  // Cached wrappers ("use cache" + cacheLife) let Next prerender the shell
  // and reuse data across requests via ISR — critical on serverless where
  // raw fetch() caches don't persist across lambda instances.
  const metalsPromise = getCachedMetals();
  const fxPromise = getCachedFxRates();
  const historyPromise = getCachedAllHistory("1y");
  const researchPromise = getCachedResearch();


  const countries = [
    { c: t("country.jordan"), url: "/jordan/gold-price/21k", note: t("country.jordanNote") },
    { c: t("country.saudi"), url: "/saudi-arabia/gold-price/21k", note: t("country.saudiNote") },
    { c: t("country.uae"), url: "/uae/gold-price/21k", note: t("country.uaeNote") },
    { c: t("country.egypt"), url: "/egypt/gold-price/21k", note: t("country.egyptNote") },
  ];

  return (
    <>
      <Suspense fallback={null}>
        <MetaSection mPromise={metalsPromise} fxPromise={fxPromise} />
      </Suspense>
      <GeoRedirect />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="min-w-0 space-y-8">
            <HomepageSeoHeader locale={locale} part="intro" />

            <Suspense fallback={<HeroSpotSkeleton />}>
              <HeroBoardSection promise={metalsPromise} />
            </Suspense>

            <Suspense fallback={<MetalsStripSkeleton />}>
              <MetalsStripSection promise={metalsPromise} />
            </Suspense>

            <LazyMount minHeight={400} fallback={<PriceChartSkeleton />}>
              <Suspense fallback={<PriceChartSkeleton />}>
                <PriceChartSection hPromise={historyPromise} fxPromise={fxPromise} />
              </Suspense>
            </LazyMount>

            <AffiliateBanner />

            <LazyMount minHeight={500}>
              <TradingViewChart />
            </LazyMount>

            <LazyMount minHeight={200} fallback={<BidAskGaugeSkeleton />}>
              <Suspense fallback={<BidAskGaugeSkeleton />}>
                <BidAskSection promise={metalsPromise} />
              </Suspense>
            </LazyMount>

            <TradeGoldCta locale={locale} tag={`${locale}-home`} />

            <Suspense fallback={<KaratGridSkeleton />}>
              <KaratGridSection mPromise={metalsPromise} fxPromise={fxPromise} />
            </Suspense>

            <Suspense fallback={null}>
              <CurrencyTableSection mPromise={metalsPromise} fxPromise={fxPromise} locale={locale} />
            </Suspense>

            <AdSensePlacement name="inContent" />

            <LazyMount minHeight={400} fallback={<CalculatorSkeleton />}>
              <Suspense fallback={<CalculatorSkeleton />}>
                <CalculatorSection mPromise={metalsPromise} fxPromise={fxPromise} />
              </Suspense>
            </LazyMount>

            <Suspense fallback={null}>
              <ResearchTeaserSection promise={researchPromise} locale={locale} />
            </Suspense>

            <HomepageSeoHeader locale={locale} part="content" />

            <LazyMount minHeight={140}>
              <StoresMarquee />
            </LazyMount>

            <section aria-labelledby="about-heading">
              <h2 id="about-heading" className="text-xl font-semibold text-[var(--color-text)]">
                {t("aboutH2")}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <p>
                  {t.rich("aboutP1", {
                    b: (chunks) => <strong className="text-[var(--color-text)]">{chunks}</strong>,
                    ar: (chunks) => (
                      <span lang={locale === "ar" ? "en" : "ar"} className="text-[var(--color-gold)]">
                        {chunks}
                      </span>
                    ),
                  })}
                </p>
                <p>{t("aboutP2")}</p>
              </div>
            </section>

            <section
              aria-labelledby="how-it-works-heading"
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5"
            >
              <h2
                id="how-it-works-heading"
                className="text-xl font-semibold text-[var(--color-text)]"
              >
                {h.howH2}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <p>{h.howP1}</p>
                <p>{h.howP2}</p>
                <p>{h.howP3}</p>
              </div>
            </section>

            <section aria-labelledby="why-trust-heading">
              <h2
                id="why-trust-heading"
                className="text-xl font-semibold text-[var(--color-text)]"
              >
                {h.trustH2}
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {h.trustBullets.map((b) => (
                  <li key={b.label}>
                    <strong className="text-[var(--color-text)]">{b.label}</strong>
                    {b.text}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="countries-heading">
              <h2 id="countries-heading" className="text-xl font-semibold text-[var(--color-text)]">
                {t("countriesH2")}
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {countries.map((row) => (
                  <Link
                    key={row.url}
                    href={row.url}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 transition hover:border-[var(--color-gold)]/40"
                  >
                    <div className="text-sm font-semibold text-[var(--color-gold)]">{row.c}</div>
                    <div className="mt-1 text-xs text-[var(--color-text-muted)]">{row.note}</div>
                  </Link>
                ))}
              </div>
            </section>

            <Faq />

            <section
              aria-labelledby="sources-heading"
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5"
            >
              <h2
                id="sources-heading"
                className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-dim)]"
              >
                {h.sourcesH2}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
                {h.sourcesP}
              </p>
              <ul className="mt-3 grid gap-1.5 text-xs sm:grid-cols-2 lg:grid-cols-3">
                <li>
                  <a
                    href="https://www.lbma.org.uk/prices-and-data/precious-metal-prices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    LBMA — London Bullion Market Association ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gold.org/goldhub/data/gold-prices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    World Gold Council ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://paxos.com/paxg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    Paxos — PAXG Trust ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cmegroup.com/markets/metals/precious/gold.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    COMEX Gold Futures (CME) ↗
                  </a>
                </li>
                <li>
                  <Link
                    href="/shanghai-gold-exchange"
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    Shanghai Gold Exchange
                  </Link>
                </li>
              </ul>
            </section>
          </section>

          <LazyMount minHeight={300} className="hidden lg:block">
            <Sidebar />
          </LazyMount>
        </div>
      </main>

    </>
  );
}
