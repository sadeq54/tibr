import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { BidAskGauge } from "@/components/BidAskGauge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { KaratSwitcher } from "@/components/KaratSwitcher";
import { RelatedLinks } from "@/components/RelatedLinks";
import { HeroSpot } from "@/components/HeroSpot";
import { KaratGrid } from "@/components/KaratGrid";
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
import { JsonLd } from "@/components/JsonLd";
import { SeoStaticHeader } from "@/components/SeoStaticHeader";
import { fetchFxRates, type FxRates } from "@/lib/fx";
import { fetchSpot, type GoldApiResponse } from "@/lib/goldapi";
import { fetchAllHistory, type MetalHistory } from "@/lib/history";
import { buildAlternates, canonicalPath, SITE_URL, buildOpenGraph } from "@/lib/metadata";

const VALID_KARATS = ["24k", "21k", "18k", "14k"] as const;
type Karat = (typeof VALID_KARATS)[number];

export async function generateStaticParams() {
  return VALID_KARATS.map((karat) => ({ karat }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; karat: string }>;
}) {
  const { locale, karat } = await params;
  const t = await getTranslations({ locale, namespace: "KaratPage" });
  const upper = karat.toUpperCase();
  return {
    title: t("title", { karat: upper }), description: t("description", { karat: upper }),
    alternates: buildAlternates(locale, `/gold-price/${karat}`),
    openGraph: buildOpenGraph(locale, `/gold-price/${karat}`),
  };
}

async function HeroSpotSection({ promise }: { promise: Promise<GoldApiResponse | null> }) {
  return <HeroSpot spot={await promise} />;
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
        price_gram_21k: s.price_gram_21k,
        price_gram_18k: s.price_gram_18k,
        price_gram_14k: s.price_gram_14k,
      }
    : { price_gram_24k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };
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

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();
  const historyPromise = fetchAllHistory("1y");

  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX";

  const pageUrl = canonicalPath(locale, `/gold-price/${karat}`);

  return (
    <>
      <JsonLd
        siteUrl={SITE_URL}
        pageType="ItemPage"
        pageUrl={pageUrl}
        pageName={t("h1", { karat: upper })}
        pageOnly
        breadcrumb={[
          { name: locale === "en" ? "Home" : "الرئيسية", url: locale === "en" ? "/en" : "/" },
          { name: locale === "en" ? `${upper} Gold Price` : `سعر الذهب ${upper}`, url: pageUrl },
        ]}
      />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Breadcrumb
          locale={locale}
          items={[
            { name: locale === "en" ? "Home" : "الرئيسية", href: locale === "en" ? "/en" : "/" },
            {
              name: locale === "en" ? `${upper} Gold Price` : `سعر الذهب ${upper}`,
              href: pageUrl,
            },
          ]}
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="min-w-0 space-y-8">
            <SeoStaticHeader
              locale={locale}
              namespace="KaratPage"
              titleKey="h1"
              introKey="intro"
              titleVars={{ karat: upper }}
              introVars={{ karat: upper }}
            />

            <KaratSwitcher current={karat} basePath="/gold-price" locale={locale} />

            <Suspense fallback={<HeroSpotSkeleton />}>
              <HeroSpotSection promise={spotPromise} />
            </Suspense>
            <TradingViewChart />
            <AffiliateBanner />
            <Suspense fallback={<PriceChartSkeleton />}>
              <PriceChartSection hPromise={historyPromise} fxPromise={fxPromise} />
            </Suspense>
            <Suspense fallback={<BidAskGaugeSkeleton />}>
              <BidAskSection promise={spotPromise} />
            </Suspense>
            <Suspense fallback={<KaratGridSkeleton />}>
              <KaratGridSection sPromise={spotPromise} fxPromise={fxPromise} />
            </Suspense>
            <Suspense fallback={<CalculatorSkeleton />}>
              <CalculatorSection sPromise={spotPromise} fxPromise={fxPromise} />
            </Suspense>
            <StoresMarquee />
            <Faq />

            <RelatedLinks
              heading={locale === "ar" ? "صفحات ذات صلة" : "Related pages"}
              items={[
                { href: "/spot-gold", label: locale === "ar" ? "السعر الفوري XAU/USD" : "Spot Gold (XAU/USD)", note: locale === "ar" ? "السعر الحي بالأونصة" : "Live per troy ounce" },
                { href: "/gold-price-per-gram", label: locale === "ar" ? "سعر الجرام" : "Price per gram", note: locale === "ar" ? "كل العيارات والعملات" : "All karats and currencies" },
                { href: "/gold-calculator", label: locale === "ar" ? "حاسبة الذهب" : "Gold calculator", note: locale === "ar" ? "احسب قيمة قطعتك" : "Calculate any weight" },
                { href: "/saudi-arabia/gold-price/21k", label: locale === "ar" ? "أسعار السعودية" : "Saudi Arabia prices", note: locale === "ar" ? "بالريال السعودي" : "In Saudi Riyal" },
                { href: "/news/spot-gold-vs-retail-jeweller-spread", label: locale === "ar" ? "هامش الصائغ" : "Spot vs retail spread", note: locale === "ar" ? "أين يذهب الفارق" : "Where the markup goes" },
                { href: "/methodology", label: locale === "ar" ? "المنهجية" : "Methodology", note: locale === "ar" ? "كيف نحسب الأسعار" : "How we calculate prices" },
              ]}
            />
          </section>
          <Sidebar adClient={adsClient} />
        </div>
      </main>
    </>
  );
}
