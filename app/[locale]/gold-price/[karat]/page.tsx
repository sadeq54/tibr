import { Suspense } from "react";
import { withLocales } from "@/lib/static-params";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AdSensePlacement } from "@/components/AdSensePlacement";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { BidAskGauge } from "@/components/BidAskGauge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Calculator } from "@/components/Calculator";
import { ChartImage } from "@/components/ChartImage";
import { CurrencyTable } from "@/components/CurrencyTable";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { KaratSwitcher } from "@/components/KaratSwitcher";
import { RelatedLinks } from "@/components/RelatedLinks";
import { HeroSpot } from "@/components/HeroSpot";
import { KaratGrid } from "@/components/KaratGrid";
import { Sidebar } from "@/components/Sidebar";
import { PriceChart } from "@/components/PriceChart";
import { PriceTable } from "@/components/PriceTable";
import { RecentPricesTable } from "@/components/RecentPricesTable";
import { StoresMarquee } from "@/components/StoresMarquee";
import { TradeGoldCta } from "@/components/TradeGoldCta";
import { TradingViewChart } from "@/components/TradingViewChart";
import {
  BidAskGaugeSkeleton,
  CalculatorSkeleton,
  HeroSpotSkeleton,
  KaratGridSkeleton,
  PriceChartSkeleton,
} from "@/components/skeletons";
import { JsonLd } from "@/components/JsonLd";
import { SeoStaticHeader } from "@/components/SeoStaticHeader";
import { fetchFxRates, type FxRates } from "@/lib/fx";
import { fetchSpot, type GoldApiResponse } from "@/lib/goldapi";
import { fetchAllHistory, type MetalHistory } from "@/lib/history";
import { pick } from "@/lib/i18n-text";
import { karatLabel } from "@/lib/karat-label";
import { buildAlternates, canonicalPath, SITE_URL, buildOpenGraph } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schemas";
import { getCachedSpot } from "@/lib/cached-fetchers";
import { gramUsd, priceDescription, priceTitle, spotDate } from "@/lib/seo";
import { HOME_LABEL, karatCrumbName, karatFaqs, RELATED_HEADING, relatedLinks } from "./karat.i18n";

const KARAT_PURITY: Record<string, string> = {
  "24K": "99.9%",
  "22K": "91.7%",
  "21K": "87.5%",
  "18K": "75%",
  "14K": "58.3%",
};

const VALID_KARATS = ["24k", "22k", "21k", "18k", "14k"] as const;
type Karat = (typeof VALID_KARATS)[number];

export async function generateStaticParams() {
  return withLocales(VALID_KARATS.map((karat) => ({ karat })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; karat: string }>;
}) {
  const { locale, karat } = await params;
  const upper = karat.toUpperCase();
  // Live USD per-gram price + today's date in the title (see lib/seo.ts).
  const spot = await getCachedSpot("XAU");
  const seo = {
    locale,
    karat: upper,
    currency: "USD",
    gram: spot ? gramUsd(spot, karat) : null,
    date: spotDate(spot),
  };
  return {
    title: priceTitle(seo),
    description: priceDescription(seo),
    alternates: buildAlternates(locale, `/gold-price/${karat}`),
    openGraph: buildOpenGraph(locale, `/gold-price/${karat}`),
  };
}

async function HeroSpotSection({ promise }: { promise: Promise<GoldApiResponse | null> }) {
  return <HeroSpot spot={await promise} />;
}

async function PriceTableSection({
  promise,
  fxPromise,
  locale,
  karat,
}: {
  promise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  locale: string;
  karat: string;
}) {
  const [s, fx] = await Promise.all([promise, fxPromise]);
  return <PriceTable spot={s} fx={fx} currency="USD" locale={locale} highlightKarat={karat} />;
}

async function RecentPricesSection({
  hPromise,
  fxPromise,
  locale,
  karat,
}: {
  hPromise: Promise<MetalHistory>;
  fxPromise: Promise<FxRates>;
  locale: string;
  karat: string;
}) {
  const [h, fx] = await Promise.all([hPromise, fxPromise]);
  return <RecentPricesTable history={h.XAU} fx={fx} currency="USD" locale={locale} karat={karat} />;
}

async function CurrencyTableSection({
  promise,
  fxPromise,
  locale,
}: {
  promise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  locale: string;
}) {
  const [s, fx] = await Promise.all([promise, fxPromise]);
  return <CurrencyTable spot={s} fx={fx} locale={locale} />;
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

async function BidAskSection({ promise }: { promise: Promise<GoldApiResponse | null> }) {
  return <BidAskGauge spot={await promise} />;
}

async function KaratGridSection({
  sPromise,
  fxPromise,
}: {
  sPromise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
}) {
  const [s, fx] = await Promise.all([sPromise, fxPromise]);
  return <KaratGrid spot={s} fx={fx} />;
}

async function CalculatorSection({
  sPromise,
  fxPromise,
}: {
  sPromise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
}) {
  const [s, fx] = await Promise.all([sPromise, fxPromise]);
  const calcSpot = s
    ? {
        price_gram_24k: s.price_gram_24k,
        price_gram_22k: s.price_gram_22k,
        price_gram_21k: s.price_gram_21k,
        price_gram_18k: s.price_gram_18k,
        price_gram_14k: s.price_gram_14k,
      }
    : { price_gram_24k: 0, price_gram_22k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };
  return <Calculator spot={calcSpot} fx={fx} />;
}

export default async function KaratPage({
  params,
}: {
  params: Promise<{ locale: string; karat: string }>;
}) {
  const { locale, karat } = await params;
  if (!VALID_KARATS.includes(karat as Karat)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("KaratPage");
  const upper = karat.toUpperCase();
  // `KaratPage.h1` in messages/ar.json already contains "عيار", so Arabic
  // interpolates the bare numeral ("21"); every other locale gets the full
  // label from karatLabel ("21K", "21 carats", "21 ayar", "21 قیراط", "21 कैरेट").
  const kLabel = locale === "ar" ? upper.replace("K", "") : karatLabel(locale, karat);

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();
  const historyPromise = fetchAllHistory("1y");


  const pageUrl = canonicalPath(locale, `/gold-price/${karat}`);
  const purity = KARAT_PURITY[upper] ?? "";

  const faqs = karatFaqs({ locale, karat, upper, purity });
  // `faqPageSchema` still types `language` as "ar" | "en"; the value is only
  // forwarded to `inLanguage`, so the page locale is the right thing to pass.
  const karatFaqSchema = faqPageSchema(pageUrl, faqs, locale as "ar" | "en");

  const homeCrumb = { name: pick(locale, HOME_LABEL), href: canonicalPath(locale, "/") };
  const karatCrumb = { name: karatCrumbName(locale, karat, upper), href: pageUrl };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(karatFaqSchema).replace(/</g, "\\u003c") }}
      />
      <JsonLd
        siteUrl={SITE_URL}
        pageType="ItemPage"
        pageUrl={pageUrl}
        pageName={t("h1", { karat: kLabel })}
        pageOnly
        breadcrumb={[
          { name: homeCrumb.name, url: homeCrumb.href },
          { name: karatCrumb.name, url: karatCrumb.href },
        ]}
      />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Breadcrumb
          locale={locale}
          items={[homeCrumb, karatCrumb]}
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="min-w-0 space-y-8">
            <KaratSwitcher
              current={karat}
              basePath="/gold-price"
              locale={locale}
              historicalHref="/historical-gold-prices"
            />

            <SeoStaticHeader
              locale={locale}
              namespace="KaratPage"
              titleKey="h1"
              introKey="intro"
              titleVars={{ karat: kLabel }}
              introVars={{ karat: kLabel }}
            />

            <Suspense fallback={<HeroSpotSkeleton />}>
              <HeroSpotSection promise={spotPromise} />
            </Suspense>
            <Suspense fallback={null}>
              <PriceTableSection
                promise={spotPromise}
                fxPromise={fxPromise}
                locale={locale}
                karat={karat}
              />
            </Suspense>
            <Suspense fallback={null}>
              <RecentPricesSection
                hPromise={historyPromise}
                fxPromise={fxPromise}
                locale={locale}
                karat={karat}
              />
            </Suspense>
            <AdSensePlacement name="inContent" />
            <ChartImage currency="USD" locale={locale} pagePath={`/gold-price/${karat}`} range="1y" />
            <Suspense fallback={null}>
              <CurrencyTableSection promise={spotPromise} fxPromise={fxPromise} locale={locale} />
            </Suspense>
            <Suspense fallback={<KaratGridSkeleton />}>
              <KaratGridSection sPromise={spotPromise} fxPromise={fxPromise} />
            </Suspense>
            <Suspense fallback={<PriceChartSkeleton />}>
              <PriceChartSection hPromise={historyPromise} fxPromise={fxPromise} />
            </Suspense>
            <AffiliateBanner />
            <Suspense fallback={<BidAskGaugeSkeleton />}>
              <BidAskSection promise={spotPromise} />
            </Suspense>
            <TradeGoldCta locale={locale} tag={`${locale}-${karat}`} />
            <TradingViewChart />
            <Suspense fallback={<CalculatorSkeleton />}>
              <CalculatorSection sPromise={spotPromise} fxPromise={fxPromise} />
            </Suspense>
            <StoresMarquee />
            <Faq />

            <RelatedLinks heading={pick(locale, RELATED_HEADING)} items={relatedLinks(locale)} />
          </section>
          <Sidebar />
        </div>
      </main>
    </>
  );
}
