import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Calculator } from "@/components/Calculator";
import { KaratGrid } from "@/components/KaratGrid";
import { PageShell } from "@/components/PageShell";
import {
  CalculatorSkeleton,
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
    title: t("perGramH1"), description: t("perGramIntro"),
    alternates: buildAlternates(locale, "/gold-price-per-gram"),
    openGraph: buildOpenGraph(locale, "/gold-price-per-gram"),
  };
}

export default async function PerGramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();

  return (
    <PageShell title={t("perGramH1")} intro={t("perGramIntro")}>
      <Suspense fallback={<KaratGridSkeleton />}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          return <KaratGrid spot={s} fx={fx} />;
        })()}
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
