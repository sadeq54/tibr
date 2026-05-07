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
import { fetchFxRates } from "@/lib/fx";
import { fetchMetals } from "@/lib/goldapi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return { title: t("livePriceH1"), description: t("livePriceIntro") };
}

export default async function LiveGoldPricePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  const metalsPromise = fetchMetals();
  const fxPromise = fetchFxRates();

  return (
    <PageShell title={t("livePriceH1")} intro={t("livePriceIntro")}>
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
