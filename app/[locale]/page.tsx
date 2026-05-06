import { Suspense } from "react";
import { connection } from "next/server";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { BidAskGauge } from "@/components/BidAskGauge";
import { Calculator } from "@/components/Calculator";
import { DebugConsole } from "@/components/DebugConsole";
import { Faq } from "@/components/Faq";
import { GeoRedirect } from "@/components/GeoRedirect";
import { Header } from "@/components/Header";
import { HeroSpot } from "@/components/HeroSpot";
import { JsonLd } from "@/components/JsonLd";
import { KaratGrid } from "@/components/KaratGrid";
import { MetalsStrip } from "@/components/MetalsStrip";
import { PriceChart } from "@/components/PriceChart";
import { Sidebar } from "@/components/Sidebar";
import { Reveal } from "@/components/motion/Reveal";
import {
  BidAskGaugeSkeleton,
  CalculatorSkeleton,
  HeroSpotSkeleton,
  KaratGridSkeleton,
  MetalsStripSkeleton,
  PriceChartSkeleton,
} from "@/components/skeletons";
import { Link } from "@/i18n/navigation";
import { fetchFxRates, type FxRates } from "@/lib/fx";
import { fetchMetals, type MetalsBundle } from "@/lib/goldapi";
import { fetchAllHistory, type MetalHistory } from "@/lib/history";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Page" });
  return { title: t("title"), description: t("description") };
}

// ─────────────────────────────────────────────────────────────────────────────
// Streaming sections — each awaits its own promise, falls back to a skeleton
// while data resolves. Same fetch URL across sections is deduped by Next cache.
// ─────────────────────────────────────────────────────────────────────────────

async function HeroSpotSection({ promise }: { promise: Promise<MetalsBundle> }) {
  const m = await promise;
  return <HeroSpot spot={m.XAU} />;
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
  siteUrl,
}: {
  mPromise: Promise<MetalsBundle>;
  fxPromise: Promise<FxRates>;
  siteUrl: string;
}) {
  const [m, fx] = await Promise.all([mPromise, fxPromise]);
  return (
    <>
      <JsonLd spot={m.XAU} siteUrl={siteUrl} />
      <DebugConsole spot={m.XAU} metals={m} fx={fx} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  await connection();

  const t = await getTranslations("Page");

  // Kick off fetches in parallel; share promises with Suspense children.
  const metalsPromise = fetchMetals();
  const fxPromise = fetchFxRates();
  const historyPromise = fetchAllHistory("1y");

  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX";
  const affiliateUrl = process.env.NEXT_PUBLIC_AFFILIATE_URL ?? "https://kormzi.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const countries = [
    { c: t("country.jordan"), url: "/jordan/gold-price/21k", note: t("country.jordanNote") },
    { c: t("country.saudi"), url: "/saudi-arabia/gold-price/21k", note: t("country.saudiNote") },
    { c: t("country.uae"), url: "/uae/gold-price/21k", note: t("country.uaeNote") },
    { c: t("country.egypt"), url: "/egypt/gold-price/21k", note: t("country.egyptNote") },
  ];

  return (
    <>
      <Suspense fallback={null}>
        <MetaSection mPromise={metalsPromise} fxPromise={fxPromise} siteUrl={siteUrl} />
      </Suspense>
      <GeoRedirect />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="space-y-8">
            <Reveal as="header">
              <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {t("h1")}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                {t.rich("intro", {
                  ar: (chunks) => (
                    <span lang={locale === "ar" ? "en" : "ar"} className="text-[var(--color-text)]">
                      {chunks}
                    </span>
                  ),
                })}
              </p>
            </Reveal>

            <Suspense fallback={<HeroSpotSkeleton />}>
              <HeroSpotSection promise={metalsPromise} />
            </Suspense>

            <Suspense fallback={<MetalsStripSkeleton />}>
              <MetalsStripSection promise={metalsPromise} />
            </Suspense>

            <Reveal>
              <Suspense fallback={<PriceChartSkeleton />}>
                <PriceChartSection hPromise={historyPromise} fxPromise={fxPromise} />
              </Suspense>
            </Reveal>

            <Suspense fallback={<BidAskGaugeSkeleton />}>
              <BidAskSection promise={metalsPromise} />
            </Suspense>

            <Suspense fallback={<KaratGridSkeleton />}>
              <KaratGridSection mPromise={metalsPromise} fxPromise={fxPromise} />
            </Suspense>

            <Reveal>
              <Suspense fallback={<CalculatorSkeleton />}>
                <CalculatorSection mPromise={metalsPromise} fxPromise={fxPromise} />
              </Suspense>
            </Reveal>

            <AffiliateBanner url={affiliateUrl} />

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

            <Reveal>
              <Faq />
            </Reveal>
          </section>

          <Sidebar adClient={adsClient} />
        </div>
      </main>

      <footer className="mt-12 border-t border-[var(--color-border)] py-6">
        <div className="mx-auto max-w-7xl px-6 text-xs text-[var(--color-text-dim)]">
          {t("footer", { year: new Date().getFullYear() })}
        </div>
      </footer>
    </>
  );
}
