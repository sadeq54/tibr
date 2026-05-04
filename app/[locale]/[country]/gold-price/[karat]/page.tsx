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
import { Link } from "@/i18n/navigation";
import { fetchFxRates } from "@/lib/fx";
import { fetchSpot } from "@/lib/goldapi";
import { fetchAllHistory } from "@/lib/history";

const COUNTRY_META: Record<string, { currency: string; nameKey: "jordan" | "saudi" | "uae" | "egypt" }> = {
  jordan: { currency: "JOD", nameKey: "jordan" },
  "saudi-arabia": { currency: "SAR", nameKey: "saudi" },
  uae: { currency: "AED", nameKey: "uae" },
  egypt: { currency: "EGP", nameKey: "egypt" },
};

const VALID_KARATS = ["24k", "21k", "18k", "14k"] as const;

export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_META);
  const params: { country: string; karat: string }[] = [];
  for (const country of countries) {
    for (const karat of VALID_KARATS) {
      params.push({ country, karat });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string; karat: string }>;
}) {
  const { locale, country, karat } = await params;
  const meta = COUNTRY_META[country];
  if (!meta) return {};

  const tPage = await getTranslations({ locale, namespace: "CountryPage" });
  const tCountry = await getTranslations({ locale, namespace: "Page.country" });
  const upper = karat.toUpperCase();
  const countryName = tCountry(meta.nameKey);

  return {
    title: tPage("title", { karat: upper, country: countryName }),
    description: tPage("description", { karat: upper, country: countryName, currency: meta.currency }),
  };
}

export default async function CountryKaratPage({
  params,
}: {
  params: Promise<{ locale: string; country: string; karat: string }>;
}) {
  const { locale, country, karat } = await params;
  const meta = COUNTRY_META[country];
  if (!meta || !VALID_KARATS.includes(karat as (typeof VALID_KARATS)[number])) notFound();
  setRequestLocale(locale);

  const tPage = await getTranslations("CountryPage");
  const tCountry = await getTranslations("Page.country");
  const [spot, fx, histories] = await Promise.all([fetchSpot("XAU"), fetchFxRates(), fetchAllHistory("1y")]);
  const upper = karat.toUpperCase();
  const countryName = tCountry(meta.nameKey);

  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX";
  const affiliateUrl = process.env.NEXT_PUBLIC_AFFILIATE_URL ?? "https://kormzi.com";

  const calcSpot = spot
    ? {
        price_gram_24k: spot.price_gram_24k,
        price_gram_21k: spot.price_gram_21k,
        price_gram_18k: spot.price_gram_18k,
        price_gram_14k: spot.price_gram_14k,
      }
    : { price_gram_24k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="space-y-8">
            <header>
              <Link href="/" className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-gold)]">
                ← {countryName}
              </Link>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {tPage("h1", { karat: upper, country: countryName })}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                {tPage("intro", { karat: upper, country: countryName, currency: meta.currency })}
              </p>
              <div className="mt-3 inline-block rounded-md border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1.5 text-xs text-[var(--color-gold)]">
                {tPage("currencyNote", { currency: meta.currency })}
              </div>
            </header>

            <HeroSpot spot={spot} />
            <PriceChart histories={histories} fx={fx} />
            <BidAskGauge spot={spot} />
            <KaratGrid spot={spot} fx={fx} />
            <Calculator spot={calcSpot} fx={fx} />
            <AffiliateBanner url={affiliateUrl} />
            <Faq />
          </section>
          <Sidebar adClient={adsClient} />
        </div>
      </main>
    </>
  );
}
