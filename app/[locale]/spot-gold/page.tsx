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

import { spotGoldFaqs } from "./faq.i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("spotGoldH1"),
    description: t("spotGoldIntro"),
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

  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();
  const historyPromise = getCachedAllHistory("1y");

  const pageUrl = canonicalPath(locale, "/spot-gold");
  const spotFaqSchema = faqPageSchema(pageUrl, spotGoldFaqs(locale), locale);

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey="spotGoldH1"
      introKey="spotGoldIntro"
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(spotFaqSchema).replace(/</g, "\\u003c") }}
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
