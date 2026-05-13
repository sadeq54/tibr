import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { BidAskGauge } from "@/components/BidAskGauge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { HeroSpot } from "@/components/HeroSpot";
import { KaratGrid } from "@/components/KaratGrid";
import { KaratSwitcher } from "@/components/KaratSwitcher";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Sidebar } from "@/components/Sidebar";
import { PriceChart } from "@/components/PriceChart";
import { StoresMarquee } from "@/components/StoresMarquee";
import { TradingViewChart } from "@/components/TradingViewChart";
import {
  BidAskGaugeSkeleton,
  CalculatorSkeleton,
  HeroSpotSkeleton,
  KaratGridSkeleton,
  PriceChartSkeleton,
} from "@/components/skeletons";
import { Link } from "@/i18n/navigation";
import { COUNTRIES, COUNTRY_BY_SLUG, countryName, countryNote } from "@/lib/countries";
import { fetchFxRates, type FxRates } from "@/lib/fx";
import { fetchSpot, type GoldApiResponse } from "@/lib/goldapi";
import { fetchAllHistory, type MetalHistory } from "@/lib/history";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

const VALID_KARATS = ["24k", "21k", "18k", "14k"] as const;
type Karat = (typeof VALID_KARATS)[number];

export async function generateStaticParams() {
  const params: { country: string; karat: string }[] = [];
  for (const c of COUNTRIES) {
    for (const k of VALID_KARATS) {
      params.push({ country: c.slug, karat: k });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string; karat: string }>;
}) {
  const { locale, country: slug, karat } = await params;
  const country = COUNTRY_BY_SLUG[slug];
  if (!country) return {};

  const tPage = await getTranslations({ locale, namespace: "CountryPage" });
  const upper = karat.toUpperCase();
  const name = countryName(country, locale);

  return {
    title: tPage("title", { karat: upper, country: name }),
    description: tPage("description", {
      karat: upper,
      country: name,
      currency: country.currency,
    }),
    alternates: buildAlternates(locale, `/${slug}/gold-price/${karat}`),
    openGraph: buildOpenGraph(locale, `/${slug}/gold-price/${karat}`),
  };
}

async function HeroSpotSection({
  promise,
  fxPromise,
  displayCurrency,
}: {
  promise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  displayCurrency: string;
}) {
  const [s, fx] = await Promise.all([promise, fxPromise]);
  return <HeroSpot spot={s} fx={fx} displayCurrency={displayCurrency} />;
}

async function PriceChartSection({
  hPromise,
  fxPromise,
  defaultCurrency,
}: {
  hPromise: Promise<MetalHistory>;
  fxPromise: Promise<FxRates>;
  defaultCurrency?: string;
}) {
  const [h, fx] = await Promise.all([hPromise, fxPromise]);
  return <PriceChart histories={h} fx={fx} defaultCurrency={defaultCurrency} />;
}

async function BidAskSection({
  promise,
  fxPromise,
  displayCurrency,
}: {
  promise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  displayCurrency: string;
}) {
  const [s, fx] = await Promise.all([promise, fxPromise]);
  return <BidAskGauge spot={s} fx={fx} displayCurrency={displayCurrency} />;
}

async function KaratGridSection({
  sPromise,
  fxPromise,
  displayCurrency,
}: {
  sPromise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  displayCurrency: string;
}) {
  const [s, fx] = await Promise.all([sPromise, fxPromise]);
  return <KaratGrid spot={s} fx={fx} displayCurrency={displayCurrency} />;
}

async function CalculatorSection({
  sPromise,
  fxPromise,
  defaultCurrency,
  defaultKarat,
}: {
  sPromise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  defaultCurrency: string;
  defaultKarat: "price_gram_24k" | "price_gram_21k" | "price_gram_18k" | "price_gram_14k";
}) {
  const [s, fx] = await Promise.all([sPromise, fxPromise]);
  const calcSpot = s
    ? {
        price_gram_24k: s.price_gram_24k,
        price_gram_21k: s.price_gram_21k,
        price_gram_18k: s.price_gram_18k,
        price_gram_14k: s.price_gram_14k,
      }
    : { price_gram_24k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };
  return (
    <Calculator
      spot={calcSpot}
      fx={fx}
      defaultCurrency={defaultCurrency}
      defaultKarat={defaultKarat}
    />
  );
}

export default async function CountryKaratPage({
  params,
}: {
  params: Promise<{ locale: string; country: string; karat: string }>;
}) {
  const { locale, country: slug, karat } = await params;
  const country = COUNTRY_BY_SLUG[slug];
  if (!country || !VALID_KARATS.includes(karat as Karat)) notFound();
  setRequestLocale(locale);

  const tPage = await getTranslations("CountryPage");
  const upper = karat.toUpperCase();
  const name = countryName(country, locale);
  const note = countryNote(slug, locale);

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();
  const historyPromise = fetchAllHistory("1y");

  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX";

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Breadcrumb
          locale={locale}
          items={[
            { name: locale === "en" ? "Home" : "الرئيسية", href: locale === "en" ? "/en" : "/" },
            { name: name, href: `/${slug}/gold-price/21k` },
            {
              name: locale === "en" ? `${upper} Gold Price` : `سعر الذهب ${upper}`,
              href: `/${slug}/gold-price/${karat}`,
            },
          ]}
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="min-w-0 space-y-8">
            <header>
              <Link
                href="/"
                className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-gold)]"
              >
                <span className="me-1" aria-hidden>
                  {country.flag}
                </span>
                {name}
              </Link>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {tPage("h1", { karat: upper, country: name })}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                {tPage("intro", { karat: upper, country: name, currency: country.currency })}
              </p>
              <div className="mt-3 inline-block rounded-md border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1.5 text-xs text-[var(--color-gold)]">
                {tPage("currencyNote", { currency: country.currency })}
              </div>
              {note ? (
                <section
                  aria-label={locale === "ar" ? "ملاحظات السوق المحلي" : "Local market notes"}
                  className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4"
                >
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                    {locale === "ar" ? `سوق الذهب في ${name}` : `${name} gold market`}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {note}
                  </p>
                </section>
              ) : null}
            </header>

            <Suspense fallback={<HeroSpotSkeleton />}>
              <HeroSpotSection
                promise={spotPromise}
                fxPromise={fxPromise}
                displayCurrency={country.currency}
              />
            </Suspense>
            <TradingViewChart currency={country.currency} />
            <AffiliateBanner />
            <Suspense fallback={<PriceChartSkeleton />}>
              <PriceChartSection
                hPromise={historyPromise}
                fxPromise={fxPromise}
                defaultCurrency={country.currency}
              />
            </Suspense>
            <Suspense fallback={<BidAskGaugeSkeleton />}>
              <BidAskSection
                promise={spotPromise}
                fxPromise={fxPromise}
                displayCurrency={country.currency}
              />
            </Suspense>
            <Suspense fallback={<KaratGridSkeleton />}>
              <KaratGridSection
                sPromise={spotPromise}
                fxPromise={fxPromise}
                displayCurrency={country.currency}
              />
            </Suspense>
            <Suspense fallback={<CalculatorSkeleton />}>
              <CalculatorSection
                sPromise={spotPromise}
                fxPromise={fxPromise}
                defaultCurrency={country.currency}
                defaultKarat={
                  `price_gram_${karat as "24k" | "21k" | "18k" | "14k"}` as "price_gram_24k"
                }
              />
            </Suspense>
            <KaratSwitcher current={karat} basePath={`/${slug}/gold-price`} locale={locale} />

            <StoresMarquee />
            <Faq />

            <RelatedLinks
              heading={locale === "ar" ? `صفحات ذات صلة لـ ${name}` : `Related ${name} pages`}
              items={[
                { href: `/${slug}/gold-price/24k`, label: locale === "ar" ? `${name} 24K` : `${name} 24K`, note: locale === "ar" ? "أعلى نقاء" : "Highest purity" },
                { href: `/${slug}/gold-price/21k`, label: locale === "ar" ? `${name} 21K` : `${name} 21K`, note: locale === "ar" ? "الأكثر تداولاً" : "Most traded" },
                { href: "/spot-gold", label: locale === "ar" ? "السعر الفوري XAU/USD" : "Spot Gold (XAU/USD)", note: locale === "ar" ? "السعر العالمي بالدولار" : "Global USD reference" },
                { href: "/gold-calculator", label: locale === "ar" ? "حاسبة الذهب" : "Gold calculator", note: locale === "ar" ? `بعملة ${country.currency}` : `In ${country.currency}` },
                { href: "/news/spot-gold-vs-retail-jeweller-spread", label: locale === "ar" ? "هامش الصائغ" : "Spot vs retail spread", note: locale === "ar" ? "كيف يُحسب السعر" : "How prices are set" },
                { href: "/methodology", label: locale === "ar" ? "المنهجية" : "Methodology", note: locale === "ar" ? "من أين تأتي الأسعار" : "Where prices come from" },
              ]}
            />
          </section>
          <Sidebar adClient={adsClient} />
        </div>
      </main>
    </>
  );
}
