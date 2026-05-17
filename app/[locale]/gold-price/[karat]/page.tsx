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
import { faqPageSchema } from "@/lib/schemas";

const KARAT_PURITY: Record<string, string> = {
  "24K": "99.9%",
  "21K": "87.5%",
  "18K": "75%",
  "14K": "58.3%",
};

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
  const purity = KARAT_PURITY[upper] ?? "";

  const karatFaqs = locale === "ar"
    ? [
        {
          q: `ما هو الذهب عيار ${upper}؟`,
          a: `الذهب عيار ${upper} يعني نقاء الذهب ${purity}. الباقي معادن صلابة (نحاس، فضة، أو زنك) تجعل القطعة أقوى للمجوهرات اليومية. ${upper === "24K" ? "يستخدم بشكل رئيسي للسبائك الاستثمارية." : upper === "21K" ? "هو العيار الأكثر شيوعاً في المجوهرات الخليجية والشرق الأوسط." : upper === "18K" ? "يستخدم للمجوهرات الفاخرة في أوروبا والمجوهرات المرصعة." : "يستخدم في المجوهرات الأقل تكلفة والقابلة للارتداء يومياً."}`,
        },
        {
          q: `كيف يُحسب سعر جرام الذهب عيار ${upper}؟`,
          a: `سعر الجرام = (السعر الفوري للأونصة بالدولار ÷ 31.1035) × نسبة النقاء (${purity}) × سعر صرف العملة. مثلاً، إذا كان السعر الفوري 4500$/أونصة وسعر الصرف 3.75 ريال/دولار، فإن سعر جرام ${upper} ≈ (4500/31.1035) × ${(parseFloat(purity)/100).toFixed(3)} × 3.75 = ${((4500/31.1035) * (parseFloat(purity)/100) * 3.75).toFixed(2)} ريال.`,
        },
        {
          q: `ما الفرق بين عيار ${upper} والعيارات الأخرى؟`,
          a: `كل عيار له نسبة نقاء مختلفة: 24K=99.9%، 22K=91.7%، 21K=87.5%، 18K=75%، 14K=58.3%. كلما زادت النقاء، زاد السعر لنفس الوزن. عيار 21 هو الأكثر شيوعاً في المجوهرات الخليجية لتوازنه بين النقاء والصلابة والسعر.`,
        },
        {
          q: `هل سعر عيار ${upper} المعروض هنا يشمل المصنعية؟`,
          a: `لا. السعر المعروض هو السعر الفوري للذهب الخام فقط (سعر السوق العالمي). تضيف محلات المجوهرات مصنعية (5-30 ريال/جرام للمجوهرات المعقدة)، وضريبة القيمة المضافة (15% في السعودية، 5% في الإمارات، صفر في مصر). راجع صفحة المنهجية للتفاصيل.`,
        },
        {
          q: `كم مرة يتم تحديث سعر عيار ${upper}؟`,
          a: `يُحدّث السعر كل ثانية عبر WebSocket من Binance وCoinbase وKraken (متوسط من ثلاث بورصات لمنع الانحراف)، باستخدام رمز PAXG/USD المدعوم 1:1 بسبائك ذهب فيزيائية معتمدة من LBMA.`,
        },
      ]
    : [
        {
          q: `What is ${upper} gold?`,
          a: `${upper} gold means ${purity} pure gold. The remainder is hardening metals (typically copper, silver or zinc) that make the alloy strong enough for everyday jewellery. ${upper === "24K" ? "Used primarily for investment bullion bars." : upper === "21K" ? "The most popular karat across Gulf jewellery markets." : upper === "18K" ? "Common in European fine jewellery and gem-set pieces." : "Used in affordable everyday jewellery."}`,
        },
        {
          q: `How is the ${upper} gold price per gram calculated?`,
          a: `Per-gram price = (Spot price per troy ounce in USD / 31.1035) × purity ratio (${purity}) × local currency FX rate. For example, at a 4500 USD/oz spot and a 3.75 SAR/USD rate, ${upper} per gram in SAR is approximately (4500/31.1035) × ${(parseFloat(purity)/100).toFixed(3)} × 3.75 = ${((4500/31.1035) * (parseFloat(purity)/100) * 3.75).toFixed(2)} SAR.`,
        },
        {
          q: `What is the difference between ${upper} and other karats?`,
          a: `Each karat has a different purity ratio: 24K=99.9%, 22K=91.7%, 21K=87.5%, 18K=75%, 14K=58.3%. Higher purity equals higher price for the same weight. 21K is the most popular in Gulf jewellery for its balance of purity, hardness and price.`,
        },
        {
          q: `Does the ${upper} price shown here include making charges?`,
          a: `No. The displayed price is the spot-equivalent raw gold value only (world market price). Jewellery shops add making charges (typically 5-30 SAR/gram for complex pieces), and local VAT applies (Saudi: 15%, UAE: 5%, Egypt: none). See the methodology page for details.`,
        },
        {
          q: `How often is the ${upper} price updated?`,
          a: `The price updates every second via WebSocket aggregation from Binance, Coinbase and Kraken (median of three exchanges to prevent skew), using the PAXG/USD pair backed 1:1 by London Good Delivery gold bars.`,
        },
      ];

  const karatFaqSchema = faqPageSchema(pageUrl, karatFaqs, locale === "ar" ? "ar" : "en");

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(karatFaqSchema) }}
      />
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

            <KaratSwitcher
              current={karat}
              basePath="/gold-price"
              locale={locale}
              historicalHref="/historical-gold-prices/2026"
            />

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
