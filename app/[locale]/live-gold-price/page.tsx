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

import { liveGoldFaqs } from "./faq.i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("livePriceH1"),
    description: t("livePriceIntro"),
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

  const metalsPromise = getCachedMetals();
  const fxPromise = getCachedFxRates();

  const pageUrl = canonicalPath(locale, "/live-gold-price");
  const liveFaqSchema = faqPageSchema(pageUrl, liveGoldFaqs(locale), locale);

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey="livePriceH1"
      introKey="livePriceIntro"
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(liveFaqSchema).replace(/</g, "\\u003c") }}
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
