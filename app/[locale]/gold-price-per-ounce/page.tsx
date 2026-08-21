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

import { perOunceFaqs } from "./faq.i18n";

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

  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();

  const pageUrl = canonicalPath(locale, "/gold-price-per-ounce");
  const perOzFaqSchema = faqPageSchema(pageUrl, perOunceFaqs(locale), locale);

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey="perOzH1"
      introKey="perOzIntro"
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(perOzFaqSchema).replace(/</g, "\\u003c") }}
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
