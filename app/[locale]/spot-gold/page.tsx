import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BidAskGauge } from "@/components/BidAskGauge";
import { HeroSpot } from "@/components/HeroSpot";
import { PageShell } from "@/components/PageShell";
import { PriceChart } from "@/components/PriceChart";
import {
  BidAskGaugeSkeleton,
  HeroSpotSkeleton,
  PriceChartSkeleton,
} from "@/components/skeletons";
import {
  getCachedAllHistory,
  getCachedFxRates,
  getCachedSpot,
} from "@/lib/cached-fetchers";
import { buildAlternates, buildOpenGraph, canonicalPath } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schemas";

// English title/intro pivoted from the global "spot gold price" head-term
// (dominated by Kitco / APMEX / BullionVault) toward a MENA-modifier
// long-tail where this domain has a defensible regional moat. The Arabic
// version keeps the original keyword which still ranks well in /ar SERPs.
function localizedTitle(locale: string, t: (k: string) => string) {
  return locale === "en"
    ? "Spot Gold Price in Saudi Arabia (XAU/SAR Live)"
    : t("spotGoldH1");
}
function localizedIntro(locale: string, t: (k: string) => string) {
  return locale === "en"
    ? "Live spot gold (XAU/USD) converted to Saudi Riyal and 40+ regional currencies. Median across Binance, Coinbase and Kraken via PAXG/USD — updated every second."
    : t("spotGoldIntro");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: localizedTitle(locale, t),
    description: localizedIntro(locale, t),
    alternates: buildAlternates(locale, "/spot-gold"),
    openGraph: buildOpenGraph(locale, "/spot-gold"),
  };
}

export default async function SpotGoldPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();
  const historyPromise = getCachedAllHistory("1y");

  const pageUrl = canonicalPath(locale, "/spot-gold");
  const spotFaqs = locale === "ar"
    ? [
        {
          q: "ما هو السعر الفوري للذهب؟",
          a: "السعر الفوري للذهب (XAU/USD) هو سعر الذهب الخام بالدولار الأمريكي للأونصة الترويسية (31.1035 جرام) في السوق العالمي. يُحدّث لحظياً عبر بورصات Binance، Coinbase، Kraken — متوسط من ثلاث منصات لمنع الانحراف. يختلف عن السعر في محلات المجوهرات الذي يشمل مصنعية وضريبة.",
        },
        {
          q: "كيف يُحدّد السعر الفوري للذهب؟",
          a: "السعر الفوري ينتج من عرض/طلب لحظي على بورصات تداول السلع والسلع المشفرة (PAXG رمز مدعوم 1:1 بسبائك ذهب فيزيائية). تثبيت LBMA يُحدّد سعر مرجعي مرتين يومياً (10:30 و15:00 بتوقيت لندن) لكن السعر الفوري الحي يتحرك كل ثانية حول هذا المرجع.",
        },
        {
          q: "ما الفرق بين السعر الفوري وسعر محلات المجوهرات؟",
          a: "السعر الفوري = سعر الذهب العالمي الخام (99.9% نقاء). محلات المجوهرات تضيف: (1) المصنعية (5-30 ريال/جرام للقطع المعقدة)، (2) هامش بائع التجزئة (3-10%)، (3) ضريبة محلية (15% في السعودية على المجوهرات، 5% في الإمارات، صفر في مصر). السعر الفوري هو الحد الأدنى.",
        },
        {
          q: "لماذا يتغير السعر الفوري للذهب؟",
          a: "العوامل: (1) قرارات الفيدرالي الأمريكي (أسعار الفائدة، التضخم)، (2) الأحداث الجيوسياسية (الذهب ملاذ آمن)، (3) قوة الدولار (ارتباط عكسي)، (4) طلب البنوك المركزية، (5) موسمية المجوهرات في الهند والصين. خلال الأزمات، الذهب يرتفع لأن المستثمرين يبحثون عن الأمان.",
        },
        {
          q: "ما الفرق بين XAU/USD وPAXG؟",
          a: "XAU/USD = الرمز التقليدي لسعر الذهب الفوري (وحدة محاسبية، لا يُتداول مباشرة). PAXG = رمز رقمي مدعوم 1:1 بسبائك ذهب فيزيائية من فئة London Good Delivery موجودة في خزائن Brink's، مُدقّق شهرياً من Withum. PAXG يتداول 24/7 على Binance/Coinbase/Kraken بسعر مطابق للسعر الفوري ± سنتات قليلة.",
        },
      ]
    : [
        {
          q: "What is the spot gold price?",
          a: "Spot gold (XAU/USD) is the raw gold price in US Dollars per troy ounce (31.1035 grams) on the global market. It updates in real time via Binance, Coinbase and Kraken — median across three exchanges to prevent skew. It differs from jewellery shop prices which include making charges and VAT.",
        },
        {
          q: "How is the spot gold price determined?",
          a: "The spot price emerges from real-time supply/demand on commodity and crypto exchanges (PAXG is a token backed 1:1 by physical gold bars). The LBMA fix sets a reference price twice daily (10:30 and 15:00 London time), but the live spot price moves every second around this reference.",
        },
        {
          q: "What is the difference between spot price and jewellery price?",
          a: "Spot price = raw global gold (99.9% pure). Jewellery shops add: (1) making charges (5-30 SAR/gram for complex pieces), (2) retailer margin (3-10%), (3) local VAT (Saudi 15% on jewellery, UAE 5%, Egypt 0%). Spot is the floor before any additions.",
        },
        {
          q: "Why does the spot gold price change?",
          a: "Drivers: (1) Fed decisions (interest rates, inflation), (2) geopolitical events (gold as safe haven), (3) USD strength (inverse correlation), (4) central bank demand, (5) Indian/Chinese jewellery season. During crises, gold rises because investors seek safety.",
        },
        {
          q: "What is the difference between XAU/USD and PAXG?",
          a: "XAU/USD = the traditional gold spot symbol (an accounting unit, not directly traded). PAXG = a digital token backed 1:1 by London Good Delivery physical gold bars in Brink's vaults, audited monthly by Withum. PAXG trades 24/7 on Binance/Coinbase/Kraken at prices matching spot ± a few cents.",
        },
      ];
  const spotFaqSchema = faqPageSchema(pageUrl, spotFaqs, locale === "ar" ? "ar" : "en");

  return (
    <PageShell title={localizedTitle(locale, t)} intro={localizedIntro(locale, t)}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(spotFaqSchema) }}
      />
      <Suspense fallback={<HeroSpotSkeleton />}>
        {(async () => <HeroSpot spot={await spotPromise} />)()}
      </Suspense>
      <Suspense fallback={<PriceChartSkeleton />}>
        {(async () => {
          const [h, fx] = await Promise.all([historyPromise, fxPromise]);
          return <PriceChart histories={h} fx={fx} />;
        })()}
      </Suspense>
      <Suspense fallback={<BidAskGaugeSkeleton />}>
        {(async () => <BidAskGauge spot={await spotPromise} />)()}
      </Suspense>
    </PageShell>
  );
}
