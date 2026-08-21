import { BidAskGauge } from "@/components/BidAskGauge";
import { Calculator } from "@/components/Calculator";
import { CurrencyTable } from "@/components/CurrencyTable";
import { HeroSpot } from "@/components/HeroSpot";
import { KaratGrid } from "@/components/KaratGrid";
import { PriceChart } from "@/components/PriceChart";
import { PriceTable } from "@/components/PriceTable";
import { RecentPricesTable } from "@/components/RecentPricesTable";
import type { FxRates } from "@/lib/fx";
import type { GoldApiResponse } from "@/lib/goldapi";
import type { MetalHistory } from "@/lib/history";

/**
 * Streaming sections for the country × karat page. Each awaits its own
 * promises inside the page's Suspense boundaries so the static shell streams
 * first and every block fills in independently.
 */

export async function HeroSpotSection({
  promise,
  fxPromise,
  displayCurrency,
}: {
  promise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  displayCurrency: string;
}) {
  const [s, fx] = await Promise.all([promise, fxPromise]);
  return <HeroSpot spot={s} fx={fx} displayCurrency={displayCurrency} />;
}

export async function PriceTableSection({
  promise,
  fxPromise,
  currency,
  locale,
  countryName: cName,
  slug,
  karat,
}: {
  promise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  currency: string;
  locale: string;
  countryName: string;
  slug: string;
  karat: string;
}) {
  const [s, fx] = await Promise.all([promise, fxPromise]);
  return (
    <PriceTable
      spot={s}
      fx={fx}
      currency={currency}
      locale={locale}
      countryName={cName}
      slug={slug}
      highlightKarat={karat}
    />
  );
}

export async function RecentPricesSection({
  hPromise,
  fxPromise,
  currency,
  locale,
  karat,
  countryName: cName,
}: {
  hPromise: Promise<MetalHistory>;
  fxPromise: Promise<FxRates>;
  currency: string;
  locale: string;
  karat: string;
  countryName: string;
}) {
  const [h, fx] = await Promise.all([hPromise, fxPromise]);
  return (
    <RecentPricesTable
      history={h.XAU}
      fx={fx}
      currency={currency}
      locale={locale}
      karat={karat}
      countryName={cName}
    />
  );
}

export async function CurrencyTableSection({
  promise,
  fxPromise,
  locale,
  exclude,
}: {
  promise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  locale: string;
  exclude: string;
}) {
  const [s, fx] = await Promise.all([promise, fxPromise]);
  return <CurrencyTable spot={s} fx={fx} locale={locale} excludeCurrency={exclude} />;
}

export async function PriceChartSection({
  hPromise,
  fxPromise,
  defaultCurrency,
}: {
  hPromise: Promise<MetalHistory>;
  fxPromise: Promise<FxRates>;
  defaultCurrency?: string;
}) {
  const [h, fx] = await Promise.all([hPromise, fxPromise]);
  return <PriceChart histories={h} fx={fx} defaultCurrency={defaultCurrency} />;
}

export async function BidAskSection({
  promise,
  fxPromise,
  displayCurrency,
}: {
  promise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  displayCurrency: string;
}) {
  const [s, fx] = await Promise.all([promise, fxPromise]);
  return <BidAskGauge spot={s} fx={fx} displayCurrency={displayCurrency} />;
}

export async function KaratGridSection({
  sPromise,
  fxPromise,
  displayCurrency,
}: {
  sPromise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  displayCurrency: string;
}) {
  const [s, fx] = await Promise.all([sPromise, fxPromise]);
  return <KaratGrid spot={s} fx={fx} displayCurrency={displayCurrency} />;
}

export async function CalculatorSection({
  sPromise,
  fxPromise,
  defaultCurrency,
  defaultKarat,
}: {
  sPromise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  defaultCurrency: string;
  defaultKarat: "price_gram_24k" | "price_gram_21k" | "price_gram_18k" | "price_gram_14k";
}) {
  const [s, fx] = await Promise.all([sPromise, fxPromise]);
  const calcSpot = s
    ? {
        price_gram_24k: s.price_gram_24k,
        price_gram_22k: s.price_gram_22k,
        price_gram_21k: s.price_gram_21k,
        price_gram_18k: s.price_gram_18k,
        price_gram_14k: s.price_gram_14k,
      }
    : { price_gram_24k: 0, price_gram_22k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };
  return (
    <Calculator
      spot={calcSpot}
      fx={fx}
      defaultCurrency={defaultCurrency}
      defaultKarat={defaultKarat}
    />
  );
}
