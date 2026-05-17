import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HeroSpot } from "@/components/HeroSpot";
import { KaratGrid } from "@/components/KaratGrid";
import { MetalsStrip } from "@/components/MetalsStrip";
import { PageShell } from "@/components/PageShell";
import {
  HeroSpotSkeleton,
  KaratGridSkeleton,
  MetalsStripSkeleton,
} from "@/components/skeletons";
import { getCachedFxRates, getCachedMetals } from "@/lib/cached-fetchers";
import { buildAlternates, buildOpenGraph, canonicalPath } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schemas";

// English title pivoted from the global "live gold price" head-term
// (dominated by Kitco, BullionVault, APMEX) to a MENA-modifier
// long-tail where this site has authority.
function localizedTitle(locale: string, t: (k: string) => string) {
  return locale === "en"
    ? "Live Gold Price MENA — XAU/SAR XAU/AED XAU/EGP Real-Time"
    : t("livePriceH1");
}
function localizedIntro(locale: string, t: (k: string) => string) {
  return locale === "en"
    ? "Live gold price across the MENA region in Saudi Riyal, UAE Dirham, Egyptian Pound, Jordanian Dinar and 40+ currencies. Real-time WebSocket median from Binance, Coinbase and Kraken."
    : t("livePriceIntro");
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
    alternates: buildAlternates(locale, "/live-gold-price"),
    openGraph: buildOpenGraph(locale, "/live-gold-price"),
  };
}

export default async function LiveGoldPricePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  const metalsPromise = getCachedMetals();
  const fxPromise = getCachedFxRates();

  const pageUrl = canonicalPath(locale, "/live-gold-price");
  const liveFaqs = locale === "ar"
    ? [
        {
          q: "ماذا يعني سعر الذهب المباشر؟",
          a: "السعر المباشر = سعر الذهب الفوري المُحدّث في الوقت الحقيقي (كل ثانية تقريباً) عبر اتصال WebSocket مع بورصات Binance، Coinbase، Kraken. مختلف عن الأسعار التاريخية أو أسعار الإغلاق اليومية — السعر المباشر يتحرك مع كل صفقة على البورصات العالمية.",
        },
        {
          q: "كم مرة يتم تحديث السعر المباشر للذهب؟",
          a: "السعر يُحدّث عند كل تيك (نبضة) من البورصات — عادة عدة مرات في الثانية. التطبيق يحسب المتوسط من 3 بورصات لكل تيك. الإطار الزمني المُعروض هو زمن آخر تحديث من المصدر.",
        },
        {
          q: "لماذا يختلف سعر الذهب المباشر بين المواقع؟",
          a: "أربعة أسباب: (1) كل موقع يستخدم مصادر مختلفة (بعضهم بورصة واحدة، نحن متوسط من 3)، (2) تأخير التحديث (1 ثانية مقابل 60 ثانية)، (3) عملة العرض (XAU/USD مقابل XAU/AED محسوب بسعر صرف مختلف)، (4) نسبة المضاربة (bid/ask spread). فروقات بضعة سنتات عادية.",
        },
        {
          q: "كيف أتتبّع سعر الذهب بالريال السعودي والدرهم الإماراتي؟",
          a: "هذه الصفحة تعرض السعر تلقائياً بـ40+ عملة. اختر العملة من القائمة المنسدلة في الحاسبة. السعر بـSAR/AED محسوب من XAU/USD × سعر الصرف اليومي (محدّث من بيانات البنوك المركزية المفتوحة).",
        },
        {
          q: "هل السعر المباشر هنا هو نفسه على Kitco أو Investing.com؟",
          a: "الفرق عادة سنت أو سنتين بسبب اختلاف مصادر التيكر. Kitco يستخدم تثبيت LBMA + COMEX، نحن نستخدم متوسط Binance/Coinbase/Kraken (PAXG). جميع هذه الأسعار تتحرك معاً ضمن نطاق ضيق جداً. للتحقق المُتقاطع، قارن مع Investing.com أو TradingView.",
        },
      ]
    : [
        {
          q: "What does 'live gold price' mean?",
          a: "Live price = the spot gold price updated in real time (roughly every second) via WebSocket from Binance, Coinbase and Kraken exchanges. Distinct from historical or daily-close prices — the live price moves with every trade on global exchanges.",
        },
        {
          q: "How often does the live gold price update?",
          a: "The price updates on every tick from the exchanges — typically multiple times per second. The app computes the median across 3 exchanges per tick. The timestamp shown reflects the last update from the source.",
        },
        {
          q: "Why does the live gold price differ across sites?",
          a: "Four reasons: (1) different sources (some sites use one exchange, we median across 3), (2) update lag (1 second vs 60 seconds), (3) display currency (XAU/USD vs XAU/AED computed at a different FX rate), (4) bid/ask spread treatment. Cents-level differences are normal.",
        },
        {
          q: "How do I track gold price in SAR and AED?",
          a: "This page displays the price in 40+ currencies automatically. Select your currency from the calculator dropdown. The SAR/AED price is computed from XAU/USD × the daily FX rate (updated from open central-bank data).",
        },
        {
          q: "Is the live price here the same as on Kitco or Investing.com?",
          a: "Differences are usually a cent or two due to different ticker sources. Kitco uses LBMA + COMEX, we use Binance/Coinbase/Kraken median (PAXG). All these prices move together within a very tight band. For cross-verification, compare with Investing.com or TradingView.",
        },
      ];
  const liveFaqSchema = faqPageSchema(pageUrl, liveFaqs, locale === "ar" ? "ar" : "en");

  return (
    <PageShell title={localizedTitle(locale, t)} intro={localizedIntro(locale, t)}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(liveFaqSchema) }}
      />
      <Suspense fallback={<HeroSpotSkeleton />}>
        {(async () => {
          const m = await metalsPromise;
          return <HeroSpot spot={m.XAU} />;
        })()}
      </Suspense>
      <Suspense fallback={<MetalsStripSkeleton />}>
        {(async () => <MetalsStrip metals={await metalsPromise} />)()}
      </Suspense>
      <Suspense fallback={<KaratGridSkeleton />}>
        {(async () => {
          const [m, fx] = await Promise.all([metalsPromise, fxPromise]);
          return <KaratGrid spot={m.XAU} fx={fx} />;
        })()}
      </Suspense>
    </PageShell>
  );
}
