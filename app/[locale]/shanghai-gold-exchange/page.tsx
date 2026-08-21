import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HeroSpot } from "@/components/HeroSpot";
import { KaratGrid } from "@/components/KaratGrid";
import { PageShell } from "@/components/PageShell";
import {
  HeroSpotSkeleton,
  KaratGridSkeleton,
} from "@/components/skeletons";
import { fetchFxRates } from "@/lib/fx";
import { fetchSpot } from "@/lib/goldapi";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("sgeH1"), description: t("sgeIntro"),
    alternates: buildAlternates(locale, "/shanghai-gold-exchange"),
    openGraph: buildOpenGraph(locale, "/shanghai-gold-exchange"),
  };
}

export default async function ShanghaiGoldPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey="sgeH1"
      introKey="sgeIntro"
    >
      <Suspense fallback={<HeroSpotSkeleton />}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          return <HeroSpot spot={s} fx={fx} displayCurrency="CNY" />;
        })()}
      </Suspense>
      <Suspense fallback={<KaratGridSkeleton />}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          return <KaratGrid spot={s} fx={fx} displayCurrency="CNY" />;
        })()}
      </Suspense>
    </PageShell>
  );
}
