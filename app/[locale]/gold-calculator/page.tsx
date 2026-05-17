import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Calculator } from "@/components/Calculator";
import { PageShell } from "@/components/PageShell";
import { CalculatorSkeleton } from "@/components/skeletons";
import { getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { buildAlternates, buildOpenGraph, canonicalPath, SITE_URL } from "@/lib/metadata";
import { bundleSchemas, faqPageSchema, webApplicationSchema } from "@/lib/schemas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("calcH1"), description: t("calcIntro"),
    alternates: buildAlternates(locale, "/gold-calculator"),
    openGraph: buildOpenGraph(locale, "/gold-calculator"),
  };
}

export default async function GoldCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();

  const pageUrl = canonicalPath(locale, "/gold-calculator");

  const calcFaqs = locale === "ar"
    ? [
        {
          q: "كيف أحسب سعر الذهب بالجرام؟",
          a: "اضرب وزن قطعة الذهب بالجرام في نسبة النقاء (24K=100%، 21K=87.5%، 18K=75%، 14K=58.3%) ثم في سعر الجرام الفوري بالدولار. حوّل الناتج إلى عملتك المحلية باستخدام سعر الصرف اليومي. حاسبتنا تفعل كل ذلك تلقائياً.",
        },
        {
          q: "ما الفرق بين الذهب عيار 21 و24؟",
          a: "عيار 24 ذهب صافٍ بنسبة 99.9% (سبائك الاستثمار)؛ عيار 21 ذهب 87.5% مع 12.5% معادن صلابة (الأكثر شيوعاً في المجوهرات الخليجية). السعر النسبي: 21K ≈ 87.5% من سعر 24K لنفس الوزن.",
        },
        {
          q: "هل تشمل الحاسبة المصنعية؟",
          a: "لا. الحاسبة تعرض القيمة الفعلية للذهب الخام (السعر الفوري × النقاء × الوزن). تضيف محلات الذهب مصنعية (5-30 ريال/جرام للمجوهرات) وضريبة القيمة المضافة المحلية. النتيجة هي الحد الأدنى قبل أي هامش تجزئة.",
        },
        {
          q: "ما هي العملات المدعومة؟",
          a: "أكثر من 40 عملة: USD، SAR، JOD، AED، EGP، EUR، GBP، JPY، CNY، INR، PKR وأكثر. أسعار الصرف تُحدّث يومياً من بيانات البنوك المركزية المفتوحة.",
        },
        {
          q: "كم مرة تُحدّث الأسعار؟",
          a: "السعر الفوري للذهب (XAU/USD) يُحدّث كل ثانية عبر WebSocket من Binance وCoinbase وKraken. أسعار صرف العملات تُحدّث كل ساعة من قاعدة بيانات fawazahmed0/currency-api.",
        },
      ]
    : [
        {
          q: "How do I calculate the gold price per gram?",
          a: "Multiply the weight of your gold piece in grams by the purity ratio (24K=100%, 21K=87.5%, 18K=75%, 14K=58.3%), then by the spot price per gram in USD. Convert to your local currency using the day's mid-market FX rate. Our calculator does all of this automatically.",
        },
        {
          q: "What is the difference between 21K and 24K gold?",
          a: "24K is pure 99.9% gold (investment bullion); 21K is 87.5% gold alloyed with 12.5% hardening metals (the most common karat in Gulf jewelry). Price relationship: 21K equals approximately 87.5% of the 24K price for the same weight.",
        },
        {
          q: "Does the calculator include making charges?",
          a: "No. The calculator shows the raw spot-equivalent gold value (spot price × purity × weight). Jewellery shops add making charges (typically 5-30 SAR/gram for jewellery) and local VAT. The result is the floor price before any retail premium.",
        },
        {
          q: "Which currencies does the calculator support?",
          a: "Over 40 currencies including USD, SAR, JOD, AED, EGP, EUR, GBP, JPY, CNY, INR, PKR and more. Exchange rates update daily from open central-bank data.",
        },
        {
          q: "How often are gold prices updated?",
          a: "Spot gold (XAU/USD) updates every second via WebSocket from Binance, Coinbase and Kraken. Currency exchange rates refresh hourly from fawazahmed0/currency-api.",
        },
      ];

  const calcWebApp = webApplicationSchema({
    pageUrl,
    name: locale === "ar"
      ? "حاسبة أسعار الذهب — بأي وزن وعيار وعملة"
      : "Gold Price Calculator — by weight, karat and currency",
    description: locale === "ar"
      ? "احسب قيمة الذهب الفعلية لأي وزن (جرام/أونصة/كيلوغرام) وعيار (24/21/18/14) وعملة (40+ عملة) باستخدام السعر الفوري المباشر."
      : "Calculate the live spot-equivalent value of gold for any weight (gram/ounce/kilogram), karat (24/21/18/14) and currency (40+ supported) using real-time market prices.",
    language: locale === "ar" ? "ar" : "en",
    features: locale === "ar"
      ? ["متعدد العملات", "متعدد العيارات", "تحديث لحظي", "حساب الزكاة"]
      : ["Multi-currency", "Multi-karat", "Real-time pricing", "Zakat calculation"],
  });

  const calcFaqSchema = faqPageSchema(pageUrl, calcFaqs, locale === "ar" ? "ar" : "en");

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}/gold-calculator#howto`,
    name: locale === "ar"
      ? "كيفية حساب قيمة الذهب بأي عملة"
      : "How to calculate gold value in any currency",
    description: locale === "ar"
      ? "احسب قيمة الذهب الفعلية بناءً على الوزن والعيار والعملة باستخدام أسعار السوق الحية."
      : "Calculate the real value of gold based on weight, karat purity, and target currency using live market prices.",
    totalTime: "PT30S",
    tool: [
      { "@type": "HowToTool", name: "Live spot gold price (XAU/USD)" },
      { "@type": "HowToTool", name: "Daily mid-market FX rates" },
    ],
    supply: [
      { "@type": "HowToSupply", name: "Weight of gold item (grams or ounces)" },
      { "@type": "HowToSupply", name: "Karat purity (24K, 21K, 18K, or 14K)" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: locale === "ar" ? "أدخل الوزن بالغرام" : "Enter the weight in grams",
        text: locale === "ar"
          ? "أدخل وزن قطعة الذهب بالغرام أو الأونصة الترويسية."
          : "Type the weight of the gold piece in grams or troy ounces.",
        url: `${SITE_URL}/gold-calculator#step-weight`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: locale === "ar" ? "اختر العيار" : "Select the karat",
        text: locale === "ar"
          ? "اختر 24K (نقاء 99.9%) أو 21K أو 18K أو 14K. كل عيار يعدّل السعر بناءً على نسبة النقاء."
          : "Pick 24K (99.9% pure), 21K (87.5%), 18K (75%), or 14K (58.3%). Each karat adjusts the price by purity ratio.",
        url: `${SITE_URL}/gold-calculator#step-karat`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: locale === "ar" ? "اختر العملة" : "Choose target currency",
        text: locale === "ar"
          ? "اختر من بين 40+ عملة مدعومة (USD، SAR، JOD، AED، EGP، EUR، GBP وغيرها)."
          : "Pick from 40+ supported currencies (USD, SAR, JOD, AED, EGP, EUR, GBP, etc).",
        url: `${SITE_URL}/gold-calculator#step-currency`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: locale === "ar" ? "اقرأ القيمة المحسوبة" : "Read the calculated value",
        text: locale === "ar"
          ? "تظهر القيمة فوراً. تذكّر: السعر هو سعر السوق الفوري — قد يضيف الصائغ هامشاً للتجزئة."
          : "The value appears instantly. Note: this is the spot equivalent — jewellers will add a retail premium.",
        url: `${SITE_URL}/gold-calculator#step-result`,
      },
    ],
  };

  const schemaPayload = bundleSchemas(howToSchema, calcWebApp, calcFaqSchema);

  return (
    <PageShell title={t("calcH1")} intro={t("calcIntro")}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }}
      />
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
