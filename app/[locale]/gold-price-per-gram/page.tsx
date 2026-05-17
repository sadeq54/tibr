import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Calculator } from "@/components/Calculator";
import { KaratGrid } from "@/components/KaratGrid";
import { PageReviewer } from "@/components/PageReviewer";
import { PageShell } from "@/components/PageShell";
import {
  CalculatorSkeleton,
  KaratGridSkeleton,
} from "@/components/skeletons";
import { fetchFxRates } from "@/lib/fx";
import { fetchSpot } from "@/lib/goldapi";
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
    title: t("perGramH1"), description: t("perGramIntro"),
    alternates: buildAlternates(locale, "/gold-price-per-gram"),
    openGraph: buildOpenGraph(locale, "/gold-price-per-gram"),
  };
}

export default async function PerGramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();

  const pageUrl = canonicalPath(locale, "/gold-price-per-gram");
  const perGramFaqs = locale === "ar"
    ? [
        {
          q: "كم سعر جرام الذهب اليوم؟",
          a: "سعر جرام الذهب يختلف بحسب العيار. للذهب الخالص (24K): سعر الأونصة الفوري ÷ 31.1035. للذهب عيار 21 (الأكثر شيوعاً في الخليج): ضرب سعر 24K في 0.875. للذهب عيار 18: ضرب سعر 24K في 0.75. الجدول أعلاه يحدّث الأسعار كل ثانية لجميع العيارات بـ 40+ عملة.",
        },
        {
          q: "كيف يُحسب سعر الجرام من سعر الأونصة؟",
          a: "الأونصة الترويسية = 31.1035 جرام. السعر الفوري للذهب يُسعّر بالدولار للأونصة (XAU/USD). للحصول على سعر الجرام: السعر الفوري بالدولار ÷ 31.1035 × نسبة النقاء (1.0 لـ 24K) × سعر صرف العملة المحلية.",
        },
        {
          q: "لماذا يختلف سعر الجرام في المحلات عن السعر الفوري؟",
          a: "السعر الفوري هو سعر السوق العالمي للذهب الخام. تضيف محلات المجوهرات: مصنعية (5-30 ريال/جرام للقطع المعقدة)، هامش بائع التجزئة (3-10%)، وضريبة القيمة المضافة المحلية (15% في السعودية، 5% في الإمارات، صفر في مصر). السعر الفوري هو الحد الأدنى قبل أي إضافات.",
        },
        {
          q: "ما هو سعر جرام الذهب عيار 21 الآن؟",
          a: "يحدّث الجدول أعلاه سعر جرام عيار 21 في الوقت الفعلي بـ 40+ عملة. عيار 21 = 87.5% نقاء. السعر = (سعر 24K × 0.875). للحصول على السعر بالريال السعودي أو الدرهم الإماراتي أو الجنيه المصري، اختر العملة من الحاسبة.",
        },
        {
          q: "كم مرة يُحدّث سعر الجرام؟",
          a: "السعر يُحدّث كل ثانية عبر WebSocket من ثلاث بورصات (Binance، Coinbase، Kraken) باستخدام رمز PAXG/USD المدعوم 1:1 بسبائك ذهب فيزيائية من نوع London Good Delivery المعتمدة LBMA.",
        },
      ]
    : [
        {
          q: "How much is a gram of gold today?",
          a: "Per-gram gold price varies by karat. For pure 24K: spot ounce price / 31.1035. For 21K (the most popular karat in Gulf jewellery): multiply 24K price by 0.875. For 18K: multiply 24K price by 0.75. The live table above updates every second across all karats in 40+ currencies.",
        },
        {
          q: "How is the per-gram price calculated from the ounce price?",
          a: "One troy ounce = 31.1035 grams. Spot gold is quoted in USD per troy ounce (XAU/USD). To get per-gram price: spot USD / 31.1035 × purity ratio (1.0 for 24K) × local currency FX rate.",
        },
        {
          q: "Why does the in-shop per-gram price differ from the spot price?",
          a: "Spot price is the global market price for raw gold. Jewellery shops add: making charges (5-30 SAR/gram for complex pieces), retailer margin (3-10%), and local VAT (Saudi: 15%, UAE: 5%, Egypt: none). The spot price is the floor before any retail premium.",
        },
        {
          q: "What is the 21K gold price per gram right now?",
          a: "The live table above shows 21K per-gram price in real time across 40+ currencies. 21K = 87.5% purity. Formula: 24K price × 0.875. Select your currency from the calculator to see prices in SAR, AED, EGP, JOD, or any of 40+ supported currencies.",
        },
        {
          q: "How often is the per-gram price updated?",
          a: "The price updates every second via WebSocket from three exchanges (Binance, Coinbase, Kraken) using the PAXG/USD pair, backed 1:1 by London Good Delivery LBMA-certified gold bars in Brink's vaults.",
        },
      ];
  const perGramFaqSchema = faqPageSchema(pageUrl, perGramFaqs, locale === "ar" ? "ar" : "en");

  return (
    <PageShell title={t("perGramH1")} intro={t("perGramIntro")}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(perGramFaqSchema) }}
      />
      <PageReviewer locale={locale} />
      <Suspense fallback={<KaratGridSkeleton />}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          return <KaratGrid spot={s} fx={fx} />;
        })()}
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
