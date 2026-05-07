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
import { fetchFxRates } from "@/lib/fx";
import { fetchSpot } from "@/lib/goldapi";
import { fetchAllHistory } from "@/lib/history";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return { title: t("spotGoldH1"), description: t("spotGoldIntro") };
}

export default async function SpotGoldPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();
  const historyPromise = fetchAllHistory("1y");

  return (
    <PageShell title={t("spotGoldH1")} intro={t("spotGoldIntro")}>
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
