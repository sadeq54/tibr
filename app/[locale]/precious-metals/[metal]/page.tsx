import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HeroSpot } from "@/components/HeroSpot";
import { PageShell } from "@/components/PageShell";
import { PriceChart } from "@/components/PriceChart";
import {
  HeroSpotSkeleton,
  PriceChartSkeleton,
} from "@/components/skeletons";
import { fetchFxRates } from "@/lib/fx";
import { fetchSpot } from "@/lib/goldapi";
import { fetchAllHistory } from "@/lib/history";

type MetalSlug = "gold" | "silver" | "platinum" | "palladium";

const METAL_MAP: Record<MetalSlug, { id: "XAU" | "XAG" | "XPT" | "XPD"; en: string; ar: string }> = {
  gold: { id: "XAU", en: "Gold", ar: "ذهب" },
  silver: { id: "XAG", en: "Silver", ar: "فضة" },
  platinum: { id: "XPT", en: "Platinum", ar: "بلاتين" },
  palladium: { id: "XPD", en: "Palladium", ar: "بالاديوم" },
};

export function generateStaticParams() {
  return Object.keys(METAL_MAP).map((metal) => ({ metal }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; metal: string }>;
}) {
  const { locale, metal } = await params;
  const m = METAL_MAP[metal as MetalSlug];
  if (!m) return {};
  const t = await getTranslations({ locale, namespace: "SubPage" });
  const name = locale === "ar" ? m.ar : m.en;
  return {
    title: t("metalH1", { metal: name }),
    description: t("metalIntro", { metal: name }),
  };
}

export default async function MetalPage({
  params,
}: {
  params: Promise<{ locale: string; metal: string }>;
}) {
  const { locale, metal } = await params;
  const m = METAL_MAP[metal as MetalSlug];
  if (!m) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");
  const name = locale === "ar" ? m.ar : m.en;

  const spotPromise = fetchSpot(m.id);
  const fxPromise = fetchFxRates();
  const historyPromise = fetchAllHistory("1y");

  return (
    <PageShell
      title={t("metalH1", { metal: name })}
      intro={t("metalIntro", { metal: name })}
    >
      <Suspense fallback={<HeroSpotSkeleton />}>
        {(async () => <HeroSpot spot={await spotPromise} />)()}
      </Suspense>
      <Suspense fallback={<PriceChartSkeleton />}>
        {(async () => {
          const [h, fx] = await Promise.all([historyPromise, fxPromise]);
          return <PriceChart histories={h} fx={fx} initialMetal={m.id} />;
        })()}
      </Suspense>
    </PageShell>
  );
}
