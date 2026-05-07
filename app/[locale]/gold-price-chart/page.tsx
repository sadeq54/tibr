import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { PriceChart } from "@/components/PriceChart";
import { PriceChartSkeleton } from "@/components/skeletons";
import { fetchFxRates } from "@/lib/fx";
import { fetchAllHistory } from "@/lib/history";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return { title: t("priceChartH1"), description: t("priceChartIntro") };
}

export default async function GoldPriceChartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  const fxPromise = fetchFxRates();
  const historyPromise = fetchAllHistory("1y");

  return (
    <PageShell title={t("priceChartH1")} intro={t("priceChartIntro")}>
      <Suspense fallback={<PriceChartSkeleton />}>
        {(async () => {
          const [h, fx] = await Promise.all([historyPromise, fxPromise]);
          return <PriceChart histories={h} fx={fx} />;
        })()}
      </Suspense>
    </PageShell>
  );
}
