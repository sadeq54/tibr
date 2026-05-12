import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HeroSpot } from "@/components/HeroSpot";
import { KaratGrid } from "@/components/KaratGrid";
import { PageShell } from "@/components/PageShell";
import {
  HeroSpotSkeleton,
  KaratGridSkeleton,
} from "@/components/skeletons";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { fetchFxRates } from "@/lib/fx";
import { fetchSpot } from "@/lib/goldapi";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

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
  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();

  return (
    <PageShell
      title={t("bestPriceCountryH1", { country: name })}
      intro={t("bestPriceCountryIntro", { country: name, currency: c.currency })}
      badge={`${c.flag} ${name}`}
    >
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
