import { Suspense } from "react";
import { withLocales } from "@/lib/static-params";
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

import { bestPriceFaqs } from "./faq.i18n";

const SUPPORTED = ["usa", "canada", "singapore", "switzerland", "uk"] as const;

export function generateStaticParams() {
  return withLocales(SUPPORTED.map((country) => ({ country })));
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

  const name = countryName(c, locale);
  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();

  const pageUrl = canonicalPath(locale, `/best-gold-price/${slug}`);
  const bestFaqSchema = faqPageSchema(
    pageUrl,
    bestPriceFaqs(locale, name, c.currency),
    locale,
  );

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey="bestPriceCountryH1"
      introKey="bestPriceCountryIntro"
      titleVars={{ country: name }}
      introVars={{ country: name, currency: c.currency }}
      badge={<><Flag cc={c.cc} size={12} className="me-1" /> {name}</>}
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bestFaqSchema).replace(/</g, "\\u003c") }}
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
