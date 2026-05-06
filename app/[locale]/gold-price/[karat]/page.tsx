import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { BidAskGauge } from "@/components/BidAskGauge";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { HeroSpot } from "@/components/HeroSpot";
import { KaratGrid } from "@/components/KaratGrid";
import { Sidebar } from "@/components/Sidebar";
import { PriceChart } from "@/components/PriceChart";
import {
  BidAskGaugeSkeleton,
  CalculatorSkeleton,
  HeroSpotSkeleton,
  KaratGridSkeleton,
  PriceChartSkeleton,
} from "@/components/skeletons";
import { Link } from "@/i18n/navigation";
import { fetchFxRates, type FxRates } from "@/lib/fx";
import { fetchSpot, type GoldApiResponse } from "@/lib/goldapi";
import { fetchAllHistory, type MetalHistory } from "@/lib/history";

const VALID_KARATS = ["24k", "21k", "18k", "14k"] as const;
type Karat = (typeof VALID_KARATS)[number];

export async function generateStaticParams() {
  return VALID_KARATS.map((karat) => ({ karat }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; karat: string }>;
}) {
  const { locale, karat } = await params;
  const t = await getTranslations({ locale, namespace: "KaratPage" });
  const upper = karat.toUpperCase();
  return { title: t("title", { karat: upper }), description: t("description", { karat: upper }) };
}

async function HeroSpotSection({ promise }: { promise: Promise<GoldApiResponse | null> }) {
  return <HeroSpot spot={await promise} />;
}

async function PriceChartSection({
  hPromise,
  fxPromise,
}: {
  hPromise: Promise<MetalHistory>;
  fxPromise: Promise<FxRates>;
}) {
  const [h, fx] = await Promise.all([hPromise, fxPromise]);
  return <PriceChart histories={h} fx={fx} />;
}

async function BidAskSection({ promise }: { promise: Promise<GoldApiResponse | null> }) {
  return <BidAskGauge spot={await promise} />;
}

async function KaratGridSection({
  sPromise,
  fxPromise,
}: {
  sPromise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
}) {
  const [s, fx] = await Promise.all([sPromise, fxPromise]);
  return <KaratGrid spot={s} fx={fx} />;
}

async function CalculatorSection({
  sPromise,
  fxPromise,
}: {
  sPromise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
}) {
  const [s, fx] = await Promise.all([sPromise, fxPromise]);
  const calcSpot = s
    ? {
        price_gram_24k: s.price_gram_24k,
        price_gram_21k: s.price_gram_21k,
        price_gram_18k: s.price_gram_18k,
        price_gram_14k: s.price_gram_14k,
      }
    : { price_gram_24k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };
  return <Calculator spot={calcSpot} fx={fx} />;
}

export default async function KaratPage({
  params,
}: {
  params: Promise<{ locale: string; karat: string }>;
}) {
  const { locale, karat } = await params;
  if (!VALID_KARATS.includes(karat as Karat)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("KaratPage");
  const upper = karat.toUpperCase();

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();
  const historyPromise = fetchAllHistory("1y");

  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX";
  const affiliateUrl = process.env.NEXT_PUBLIC_AFFILIATE_URL ?? "https://kormzi.com";

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="space-y-8">
            <header>
              <Link href="/" className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-gold)]">
                {t("backHome")}
              </Link>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {t("h1", { karat: upper })}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                {t("intro", { karat: upper })}
              </p>
            </header>

            <Suspense fallback={<HeroSpotSkeleton />}>
              <HeroSpotSection promise={spotPromise} />
            </Suspense>
            <Suspense fallback={<PriceChartSkeleton />}>
              <PriceChartSection hPromise={historyPromise} fxPromise={fxPromise} />
            </Suspense>
            <Suspense fallback={<BidAskGaugeSkeleton />}>
              <BidAskSection promise={spotPromise} />
            </Suspense>
            <Suspense fallback={<KaratGridSkeleton />}>
              <KaratGridSection sPromise={spotPromise} fxPromise={fxPromise} />
            </Suspense>
            <Suspense fallback={<CalculatorSkeleton />}>
              <CalculatorSection sPromise={spotPromise} fxPromise={fxPromise} />
            </Suspense>
            <AffiliateBanner url={affiliateUrl} />
            <Faq />
          </section>
          <Sidebar adClient={adsClient} />
        </div>
      </main>
    </>
  );
}
