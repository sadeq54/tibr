import { getTranslations } from "next-intl/server";

import {
  BidAskGaugeSkeleton,
  CalculatorSkeleton,
  HeroSpotSkeleton,
  KaratGridSkeleton,
  MetalsStripSkeleton,
  PriceChartSkeleton,
  SidebarSkeleton,
  Skel,
} from "@/components/skeletons";

export default async function Loading() {
  const t = await getTranslations("Loading");

  return (
    <div className="mx-auto max-w-7xl px-6 py-8" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{t("label")}</span>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <header className="space-y-3">
            <Skel className="h-9 w-3/4 max-w-md" />
            <Skel className="h-4 w-full max-w-2xl" />
            <Skel className="h-4 w-1/2 max-w-xl" />
          </header>

          <HeroSpotSkeleton />
          <MetalsStripSkeleton />
          <PriceChartSkeleton />
          <BidAskGaugeSkeleton />
          <KaratGridSkeleton />
          <CalculatorSkeleton />
        </div>

        <SidebarSkeleton />
      </div>
    </div>
  );
}
