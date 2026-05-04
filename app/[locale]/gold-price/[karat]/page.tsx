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
import { Link } from "@/i18n/navigation";
import { fetchSpot } from "@/lib/goldapi";

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

export default async function KaratPage({
  params,
}: {
  params: Promise<{ locale: string; karat: string }>;
}) {
  const { locale, karat } = await params;
  if (!VALID_KARATS.includes(karat as Karat)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("KaratPage");
  const spot = await fetchSpot("XAU");
  const upper = karat.toUpperCase();

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
                {t("backHome")}
              </Link>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {t("h1", { karat: upper })}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                {t("intro", { karat: upper })}
              </p>
            </header>

            <HeroSpot spot={spot} />
            <BidAskGauge spot={spot} />
            <KaratGrid spot={spot} />
            <Calculator spot={calcSpot} />
            <AffiliateBanner url={affiliateUrl} />
            <Faq />
          </section>
          <Sidebar adClient={adsClient} />
        </div>
      </main>
    </>
  );
}
