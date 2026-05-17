import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Flag } from "@/components/Flag";
import { HeroSpot } from "@/components/HeroSpot";
import { KaratGrid } from "@/components/KaratGrid";
import { PageShell } from "@/components/PageShell";
import {
  HeroSpotSkeleton,
  KaratGridSkeleton,
} from "@/components/skeletons";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { buildAlternates, buildOpenGraph, canonicalPath } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schemas";

const SUPPORTED = ["usa", "canada", "singapore", "switzerland", "uk"] as const;

export function generateStaticParams() {
  return SUPPORTED.map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country: slug } = await params;
  const c = COUNTRY_BY_SLUG[slug];
  if (!c) return {};
  const t = await getTranslations({ locale, namespace: "SubPage" });
  const name = countryName(c, locale);
  return {
    title: t("bestPriceCountryH1", { country: name }),
    description: t("bestPriceCountryIntro", { country: name, currency: c.currency }),
    alternates: buildAlternates(locale, `/best-gold-price/${slug}`),
    openGraph: buildOpenGraph(locale, `/best-gold-price/${slug}`),
  };
}

export default async function BestPriceCountryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country: slug } = await params;
  const c = COUNTRY_BY_SLUG[slug];
  if (!c) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");
  await connection();

  const name = countryName(c, locale);
  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();

  const pageUrl = canonicalPath(locale, `/best-gold-price/${slug}`);
  const bestFaqs = locale === "ar"
    ? [
        {
          q: `أين أجد أفضل سعر للذهب في ${name}؟`,
          a: `أفضل سعر للذهب يعتمد على نسبة هامش بائع التجزئة فوق السعر الفوري. الجدول أعلاه يعرض السعر الفوري بـ${c.currency} — هذا هو الحد الأدنى. تختلف هوامش المحلات: السوبر ماركت الكبرى عادة 2-5%، أسواق الذهب التقليدية 5-10%، التجارة الإلكترونية الموثقة 1-3%. تحقق من ثلاثة محلات قبل الشراء.`,
        },
        {
          q: `لماذا تختلف أسعار الذهب بين المحلات في ${name}؟`,
          a: `ثلاثة أسباب: (1) المصنعية (5-30 وحدة عملة محلية للجرام حسب التصميم)، (2) هامش البائع (3-10%)، (3) تكلفة العمليات (الإيجار، الموظفين). السعر الفوري نفسه عبر جميع المحلات. الفرق هو في الإضافات.`,
        },
        {
          q: `هل الشراء عبر الإنترنت أرخص في ${name}؟`,
          a: `عادة نعم بـ2-7% بسبب انخفاض التكاليف العامة. لكن تحقق من: (1) موثوقية البائع، (2) سياسة الإرجاع، (3) شهادة الذهب (LBMA، PAMP، Valcambi)، (4) رسوم الشحن والتأمين، (5) ضريبة الاستيراد إن وجدت.`,
        },
        {
          q: `كيف أتأكد أن السعر المعروض هو الأفضل؟`,
          a: `قارن مع السعر الفوري في الجدول أعلاه. السعر المُتوقع = السعر الفوري + 2-8% (للسبائك الاستثمارية) أو + 15-40% (للمجوهرات بالمصنعية). أي شيء أعلى يستحق التفاوض. أي شيء أقل بكثير قد يكون مزيفاً.`,
        },
        {
          q: `متى أفضل وقت لشراء الذهب في ${name}؟`,
          a: `السعر يتحرك يومياً مع السوق العالمي. أوقات مثالية: (1) أوائل الأسبوع (نشاط أقل = هوامش أقل)، (2) قبل الفجر بتوقيت لندن (السعر الفوري في أدنى نشاط)، (3) خارج موسم الزواج (انخفاض الطلب على المجوهرات). تجنب: (1) خلال الأزمات الجيوسياسية (الذهب يرتفع)، (2) موسم الزفاف في الهند والصين.`,
        },
      ]
    : [
        {
          q: `Where do I find the best gold price in ${name}?`,
          a: `The best gold price depends on the retailer's margin over the spot price. The table above shows the spot price in ${c.currency} — this is the floor. Shop margins vary: large supermarkets 2-5%, traditional gold souks 5-10%, verified e-commerce 1-3%. Check three shops before buying.`,
        },
        {
          q: `Why do gold prices differ between shops in ${name}?`,
          a: `Three reasons: (1) making charges (5-30 local currency per gram by design), (2) retailer margin (3-10%), (3) operational costs (rent, staff). The spot price is the same across all shops. The difference is in the additions.`,
        },
        {
          q: `Is buying online cheaper in ${name}?`,
          a: `Usually yes by 2-7% due to lower overhead. But verify: (1) seller reputation, (2) return policy, (3) gold certification (LBMA, PAMP, Valcambi), (4) shipping/insurance fees, (5) any import duty.`,
        },
        {
          q: `How do I know if a quoted price is the best?`,
          a: `Compare against the spot price in the table above. Expected price = spot + 2-8% (for investment bullion) or + 15-40% (for jewellery with making charge). Anything higher is worth negotiating. Anything significantly lower may be counterfeit.`,
        },
        {
          q: `When is the best time to buy gold in ${name}?`,
          a: `Prices move daily with the global market. Optimal: (1) early in the week (less activity = lower margins), (2) pre-dawn London time (spot price at lowest activity), (3) outside wedding season (lower jewellery demand). Avoid: (1) during geopolitical crises (gold rises), (2) Indian/Chinese wedding season.`,
        },
      ];
  const bestFaqSchema = faqPageSchema(pageUrl, bestFaqs, locale === "ar" ? "ar" : "en");

  return (
    <PageShell
      title={t("bestPriceCountryH1", { country: name })}
      intro={t("bestPriceCountryIntro", { country: name, currency: c.currency })}
      badge={<><Flag cc={c.cc} size={12} className="me-1" /> {name}</>}
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bestFaqSchema) }}
      />
      <Suspense fallback={<HeroSpotSkeleton />}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          return <HeroSpot spot={s} fx={fx} displayCurrency={c.currency} />;
        })()}
      </Suspense>
      <Suspense fallback={<KaratGridSkeleton />}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          return <KaratGrid spot={s} fx={fx} displayCurrency={c.currency} />;
        })()}
      </Suspense>
    </PageShell>
  );
}
