import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Calculator } from "@/components/Calculator";
import { PageShell } from "@/components/PageShell";
import { CalculatorSkeleton } from "@/components/skeletons";
import { fetchFxRates } from "@/lib/fx";
import { fetchSpot } from "@/lib/goldapi";
import { buildAlternates, buildOpenGraph, SITE_URL } from "@/lib/metadata";

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

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();

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

  return (
    <PageShell title={t("calcH1")} intro={t("calcIntro")}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
