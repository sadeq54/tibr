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
    title: t("perKiloH1"), description: t("perKiloIntro"),
    alternates: buildAlternates(locale, "/gold-price-per-kilo"),
    openGraph: buildOpenGraph(locale, "/gold-price-per-kilo"),
  };
}

export default async function PerKiloPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();

  const pageUrl = canonicalPath(locale, "/gold-price-per-kilo");
  const perKiloFaqs = locale === "ar"
    ? [
        {
          q: "كم سعر كيلو الذهب اليوم؟",
          a: "سعر كيلو الذهب الفوري = (السعر الفوري للأونصة × 32.1507). الجدول أعلاه يحدّث السعر كل ثانية بـ40+ عملة. للذهب الخالص (24K)، كيلو واحد يحتوي على 32.15 أونصة ترويسية و1000 جرام بنسبة نقاء 99.9%.",
        },
        {
          q: "كم أونصة في كيلو الذهب؟",
          a: "1 كيلوغرام = 32.1507 أونصة ترويسية. هذه نسبة التحويل المعيارية المستخدمة في جميع البورصات العالمية. للحساب: السعر بالأونصة × 32.1507 = السعر بالكيلوغرام.",
        },
        {
          q: "هل سبائك الذهب من كيلو واحد استثمار جيد؟",
          a: "نعم. سبائك 1 كيلوغرام (KILO bars) من معامل مثل PAMP وValcambi وArgor-Heraeus هي المعيار الذهبي للاستثمار الكبير. عادة بنقاء 99.99% (Four Nines)، معتمدة من LBMA Good Delivery. تباع بهامش (premium) أقل من السبائك الأصغر — عادة 1-3% فوق السعر الفوري.",
        },
        {
          q: "كم سعر كيلو الذهب بالريال السعودي والدرهم الإماراتي؟",
          a: "استخدم محوّل العملات في الحاسبة أعلاه. مثال تقديري: إذا كانت الأونصة 4500$، فكيلو الذهب ≈ 144,678$ ≈ 542,541 ريال سعودي ≈ 531,387 درهم إماراتي. الأسعار تُحدّث لحظياً.",
        },
        {
          q: "لماذا يختلف سعر كيلو الذهب في الإمارات عن السعودية؟",
          a: "السعر العالمي بالدولار هو نفسه. الفروقات تأتي من: (1) سعر الصرف بين العملتين، (2) ضريبة القيمة المضافة (السعودية 15% على الذهب غير الاستثماري، الإمارات 5%، صفر لذهب 99.5%+)، (3) هامش الموزع المحلي.",
        },
      ]
    : [
        {
          q: "How much is one kilo of gold today?",
          a: "Spot kilo gold price = (spot ounce price × 32.1507). The table above updates every second in 40+ currencies. For pure 24K gold, one kilo contains 32.15 troy ounces and 1000 grams at 99.9% purity.",
        },
        {
          q: "How many ounces in a kilo of gold?",
          a: "1 kilogram = 32.1507 troy ounces. This is the standard conversion ratio used across all global exchanges. To compute: ounce price × 32.1507 = kilogram price.",
        },
        {
          q: "Are 1-kg gold bars a good investment?",
          a: "Yes. 1-kilogram (KILO) bars from refineries like PAMP, Valcambi and Argor-Heraeus are the gold standard for serious investment. Typically 99.99% pure (Four Nines), LBMA Good Delivery certified. They trade at a lower premium than smaller bars — usually 1-3% over spot.",
        },
        {
          q: "How much is 1 kg of gold in SAR and AED?",
          a: "Use the currency converter in the calculator above. Approximate example: at 4500 USD/oz, 1 kg ≈ 144,678 USD ≈ 542,541 SAR ≈ 531,387 AED. Prices update in real time.",
        },
        {
          q: "Why does kilo gold price differ between UAE and Saudi Arabia?",
          a: "The global USD price is the same. Differences come from: (1) currency exchange rate, (2) VAT (Saudi 15% on non-investment gold, UAE 5%, zero for ≥99.5% bullion), (3) local dealer margin.",
        },
      ];
  const perKiloFaqSchema = faqPageSchema(pageUrl, perKiloFaqs, locale === "ar" ? "ar" : "en");

  return (
    <PageShell title={t("perKiloH1")} intro={t("perKiloIntro")}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(perKiloFaqSchema) }}
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
