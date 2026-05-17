import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Calculator } from "@/components/Calculator";
import { HeroSpot } from "@/components/HeroSpot";
import { PageShell } from "@/components/PageShell";
import {
  CalculatorSkeleton,
  HeroSpotSkeleton,
} from "@/components/skeletons";
import { getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { buildAlternates, buildOpenGraph, canonicalPath } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schemas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("perOzH1"), description: t("perOzIntro"),
    alternates: buildAlternates(locale, "/gold-price-per-ounce"),
    openGraph: buildOpenGraph(locale, "/gold-price-per-ounce"),
  };
}

export default async function PerOzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();

  const pageUrl = canonicalPath(locale, "/gold-price-per-ounce");
  const perOzFaqs = locale === "ar"
    ? [
        {
          q: "كم سعر أونصة الذهب اليوم؟",
          a: "سعر أونصة الذهب (XAU/USD) يُحدّث كل ثانية في الجدول أعلاه. الأونصة الترويسية = 31.1035 جرام. السعر مأخوذ كمتوسط لحظي من بورصات Binance وCoinbase وKraken عبر زوج PAXG/USD المدعوم 1:1 بسبائك ذهب فيزيائية من نوع London Good Delivery.",
        },
        {
          q: "لماذا يُسعّر الذهب بالأونصة الترويسية؟",
          a: "الأونصة الترويسية (31.1035 جرام) هي الوحدة المعيارية لتداول المعادن الثمينة منذ القرن السابع عشر. تختلف عن الأونصة العادية (28.35 جرام). جميع البورصات العالمية (COMEX، LBMA، Shanghai Gold Exchange) تستخدم الأونصة الترويسية.",
        },
        {
          q: "كيف أحوّل سعر الأونصة إلى جرام أو كيلوغرام؟",
          a: "للجرام: السعر بالأونصة ÷ 31.1035. للكيلوغرام: السعر بالأونصة × 32.1507. مثلاً، إذا كانت الأونصة 4500$، فالجرام = 144.68$ والكيلوغرام = 144,678$. استخدم الحاسبة أعلاه للتحويل التلقائي بأي عملة.",
        },
        {
          q: "ما الفرق بين سعر أونصة الذهب الفوري وسعر المجوهرات؟",
          a: "السعر الفوري للأونصة هو سعر السوق العالمي للذهب الخام (99.9% نقاء). المجوهرات تباع بسعر = (سعر الأونصة × نسبة النقاء حسب العيار / 31.1035) + مصنعية + هامش بائع التجزئة + ضريبة محلية. السعر الفوري هو الحد الأدنى قبل أي إضافات.",
        },
        {
          q: "هل تشمل أسعار الأونصة هنا الفضة والبلاتين؟",
          a: "هذه الصفحة تركز على الذهب (XAU). لأسعار الفضة بالأونصة، زر صفحة /precious-metals/silver. للبلاتين /precious-metals/platinum. للبلاديوم /precious-metals/palladium.",
        },
      ]
    : [
        {
          q: "How much is one ounce of gold today?",
          a: "Gold ounce price (XAU/USD) updates every second in the table above. One troy ounce = 31.1035 grams. The price is a real-time median across Binance, Coinbase and Kraken via the PAXG/USD pair, backed 1:1 by London Good Delivery gold bars.",
        },
        {
          q: "Why is gold priced per troy ounce?",
          a: "Troy ounce (31.1035g) has been the standard precious-metals trading unit since the 17th century. It differs from the regular ounce (28.35g). All global exchanges (COMEX, LBMA, Shanghai Gold Exchange) quote in troy ounces.",
        },
        {
          q: "How do I convert ounce price to per-gram or per-kilogram?",
          a: "Per gram: ounce price / 31.1035. Per kilogram: ounce price × 32.1507. For example, at 4500 USD/oz: gram = 144.68 USD, kilogram = 144,678 USD. Use the calculator above for automatic conversion in any currency.",
        },
        {
          q: "What is the difference between spot ounce price and jewellery price?",
          a: "The spot ounce price is the global market price for raw gold (99.9% pure). Jewellery is sold at (ounce price × purity ratio / 31.1035) + making charge + retailer margin + local VAT. The spot price is the floor before any additions.",
        },
        {
          q: "Does this page cover silver and platinum ounce prices?",
          a: "This page focuses on gold (XAU). For silver ounce prices visit /precious-metals/silver, platinum /precious-metals/platinum, palladium /precious-metals/palladium.",
        },
      ];
  const perOzFaqSchema = faqPageSchema(pageUrl, perOzFaqs, locale === "ar" ? "ar" : "en");

  return (
    <PageShell title={t("perOzH1")} intro={t("perOzIntro")}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(perOzFaqSchema) }}
      />
      <Suspense fallback={<HeroSpotSkeleton />}>
        {(async () => <HeroSpot spot={await spotPromise} />)()}
      </Suspense>
      <Suspense fallback={<CalculatorSkeleton />}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          const calcSpot = s
            ? {
                price_gram_24k: s.price_gram_24k,
                price_gram_21k: s.price_gram_21k,
                price_gram_18k: s.price_gram_18k,
                price_gram_14k: s.price_gram_14k,
              }
            : { price_gram_24k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };
          return <Calculator spot={calcSpot} fx={fx} />;
        })()}
      </Suspense>
    </PageShell>
  );
}
