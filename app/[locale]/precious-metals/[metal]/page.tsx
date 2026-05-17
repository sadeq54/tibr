import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HeroSpot } from "@/components/HeroSpot";
import { PageShell } from "@/components/PageShell";
import { PriceChart } from "@/components/PriceChart";
import {
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

const METAL_FAQ_DATA: Record<MetalSlug, { en: { drivers: string; uses: string }; ar: { drivers: string; uses: string } }> = {
  gold: {
    en: { drivers: "Fed decisions, USD strength, geopolitical risk, central bank demand, Indian/Chinese jewellery season", uses: "Jewellery, investment bullion, central bank reserves, electronics" },
    ar: { drivers: "قرارات الفيدرالي، قوة الدولار، المخاطر الجيوسياسية، طلب البنوك المركزية، موسم المجوهرات في الهند والصين", uses: "المجوهرات، السبائك الاستثمارية، احتياطيات البنوك المركزية، الإلكترونيات" },
  },
  silver: {
    en: { drivers: "Industrial demand (solar panels, electronics, 5G), gold/silver ratio, photographic film legacy, investment flows", uses: "Industrial (50% of demand: solar, electronics, medical), jewellery, silverware, investment coins" },
    ar: { drivers: "الطلب الصناعي (الألواح الشمسية، الإلكترونيات، 5G)، نسبة الذهب/الفضة، الاستخدام التصويري السابق، تدفقات الاستثمار", uses: "الصناعة (50% من الطلب: الطاقة الشمسية، الإلكترونيات، الطب)، المجوهرات، الأدوات الفضية، العملات الاستثمارية" },
  },
  platinum: {
    en: { drivers: "Auto catalyst demand (diesel engines), jewellery demand in China/Japan, mining supply from South Africa, hydrogen fuel cell adoption", uses: "Auto catalysts (40% of demand), jewellery, industrial catalysts, investment" },
    ar: { drivers: "طلب المحفزات في السيارات (محركات الديزل)، طلب المجوهرات في الصين/اليابان، إمدادات التعدين من جنوب أفريقيا، تبني خلايا الوقود الهيدروجيني", uses: "محفزات السيارات (40%)، المجوهرات، المحفزات الصناعية، الاستثمار" },
  },
  palladium: {
    en: { drivers: "Petrol auto catalyst demand, Russian/South African supply, EV transition reducing long-term demand, palladium-platinum substitution", uses: "Auto catalysts (85% of demand — petrol engines), electronics, jewellery, dental" },
    ar: { drivers: "طلب محفزات السيارات بالبنزين، إمدادات روسيا/جنوب أفريقيا، تحول السيارات الكهربائية يقلل الطلب طويل المدى، استبدال البلاديوم بالبلاتين", uses: "محفزات السيارات (85% — محركات البنزين)، الإلكترونيات، المجوهرات، طب الأسنان" },
  },
};

type MetalSlug = "gold" | "silver" | "platinum" | "palladium";

const METAL_MAP: Record<MetalSlug, { id: "XAU" | "XAG" | "XPT" | "XPD"; en: string; ar: string }> = {
  gold: { id: "XAU", en: "Gold", ar: "ذهب" },
  silver: { id: "XAG", en: "Silver", ar: "فضة" },
  platinum: { id: "XPT", en: "Platinum", ar: "بلاتين" },
  palladium: { id: "XPD", en: "Palladium", ar: "بالاديوم" },
};

export function generateStaticParams() {
  return Object.keys(METAL_MAP).map((metal) => ({ metal }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; metal: string }>;
}) {
  const { locale, metal } = await params;
  const m = METAL_MAP[metal as MetalSlug];
  if (!m) return {};
  const t = await getTranslations({ locale, namespace: "SubPage" });
  const name = locale === "ar" ? m.ar : m.en;
  return {
    title: t("metalH1", { metal: name }),
    description: t("metalIntro", { metal: name }),
    alternates: buildAlternates(locale, `/precious-metals/${metal}`),
    openGraph: buildOpenGraph(locale, `/precious-metals/${metal}`),
  };
}

export default async function MetalPage({
  params,
}: {
  params: Promise<{ locale: string; metal: string }>;
}) {
  const { locale, metal } = await params;
  const m = METAL_MAP[metal as MetalSlug];
  if (!m) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");
  const name = locale === "ar" ? m.ar : m.en;

  const spotPromise = getCachedSpot(m.id);
  const fxPromise = getCachedFxRates();
  const historyPromise = getCachedAllHistory("1y");

  const pageUrl = canonicalPath(locale, `/precious-metals/${metal}`);
  const data = METAL_FAQ_DATA[metal as MetalSlug];
  const metalFaqs = locale === "ar"
    ? [
        {
          q: `ما هو سعر ${name} اليوم؟`,
          a: `سعر ${name} يُحدّث في الوقت الفعلي في الجدول أعلاه. السعر بالدولار للأونصة الترويسية (XAU/USD مكافئ لـ${m.id}). للحصول على السعر بالعملة المحلية، استخدم الحاسبة لاختيار 40+ عملة.`,
        },
        {
          q: `ما العوامل التي تؤثر على سعر ${name}؟`,
          a: `${data?.ar.drivers ?? "الطلب والعرض العالمي، قوة الدولار، الأحداث الجيوسياسية، تدفقات الاستثمار."}`,
        },
        {
          q: `ما استخدامات ${name} الرئيسية؟`,
          a: data?.ar.uses ?? "صناعية، استثمارية، مجوهرات.",
        },
        {
          q: `كيف يُسعّر ${name}؟`,
          a: `يُسعّر ${name} بالأونصة الترويسية (31.1035 جرام) بالدولار الأمريكي. السعر العالمي يتشكل عبر البورصات الرئيسية (COMEX، LBMA، Shanghai). نحن نتتبع السعر اللحظي عبر مصادر STOOQ و forex aggregators.`,
        },
        {
          q: `هل ${name} استثمار جيد؟`,
          a: `كل معدن ثمين له ملف مخاطر مختلف. الذهب أكثر استقراراً (الملاذ الآمن). الفضة أكثر تقلباً وطلباً صناعياً. البلاتين/البلاديوم مرتبطان بصناعة السيارات. تنويع المحفظة عبر معادن متعددة يقلل المخاطر.`,
        },
      ]
    : [
        {
          q: `What is the ${name} price today?`,
          a: `${name} price updates in real time in the table above. Priced in USD per troy ounce (${m.id}/USD). Use the calculator to convert to 40+ local currencies.`,
        },
        {
          q: `What factors affect the ${name} price?`,
          a: data?.en.drivers ?? "Global supply and demand, USD strength, geopolitical events, investment flows.",
        },
        {
          q: `What are the main uses of ${name}?`,
          a: data?.en.uses ?? "Industrial, investment, jewellery.",
        },
        {
          q: `How is ${name} priced?`,
          a: `${name} is priced per troy ounce (31.1035 grams) in US Dollars. The global price forms on major exchanges (COMEX, LBMA, Shanghai). We track the live price via STOOQ and forex aggregators.`,
        },
        {
          q: `Is ${name} a good investment?`,
          a: `Each precious metal has a different risk profile. Gold is more stable (safe haven). Silver is more volatile with strong industrial demand. Platinum/palladium are tied to the auto industry. Diversifying across multiple metals reduces risk.`,
        },
      ];
  const metalFaqSchema = faqPageSchema(pageUrl, metalFaqs, locale === "ar" ? "ar" : "en");

  return (
    <PageShell
      title={t("metalH1", { metal: name })}
      intro={t("metalIntro", { metal: name })}
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(metalFaqSchema) }}
      />
      <Suspense fallback={<HeroSpotSkeleton />}>
        {(async () => <HeroSpot spot={await spotPromise} />)()}
      </Suspense>
      <Suspense fallback={<PriceChartSkeleton />}>
        {(async () => {
          const [h, fx] = await Promise.all([historyPromise, fxPromise]);
          return <PriceChart histories={h} fx={fx} initialMetal={m.id} />;
        })()}
      </Suspense>
    </PageShell>
  );
}
