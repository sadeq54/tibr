import { getTranslations, setRequestLocale } from "next-intl/server";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { BidAskGauge } from "@/components/BidAskGauge";
import { Calculator } from "@/components/Calculator";
import { DebugConsole } from "@/components/DebugConsole";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { HeroSpot } from "@/components/HeroSpot";
import { JsonLd } from "@/components/JsonLd";
import { KaratGrid } from "@/components/KaratGrid";
import { MetalsStrip } from "@/components/MetalsStrip";
import { PriceChart } from "@/components/PriceChart";
import { Sidebar } from "@/components/Sidebar";
import { Link } from "@/i18n/navigation";
import { fetchFxRates } from "@/lib/fx";
import { fetchMetals } from "@/lib/goldapi";
import { fetchAllHistory } from "@/lib/history";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Page" });
  return { title: t("title"), description: t("description") };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Page");
  const [metals, fx, histories] = await Promise.all([fetchMetals(), fetchFxRates(), fetchAllHistory("1y")]);
  const spot = metals.XAU;

  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX";
  const affiliateUrl = process.env.NEXT_PUBLIC_AFFILIATE_URL ?? "https://kormzi.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const calcSpot = spot
    ? {
        price_gram_24k: spot.price_gram_24k,
        price_gram_21k: spot.price_gram_21k,
        price_gram_18k: spot.price_gram_18k,
        price_gram_14k: spot.price_gram_14k,
      }
    : { price_gram_24k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };

  const countries = [
    { c: t("country.jordan"), url: "/jordan/gold-price/21k", note: t("country.jordanNote") },
    { c: t("country.saudi"), url: "/saudi-arabia/gold-price/21k", note: t("country.saudiNote") },
    { c: t("country.uae"), url: "/uae/gold-price/21k", note: t("country.uaeNote") },
    { c: t("country.egypt"), url: "/egypt/gold-price/21k", note: t("country.egyptNote") },
  ];

  return (
    <>
      <JsonLd spot={spot} siteUrl={siteUrl} />
      <DebugConsole spot={spot} metals={metals} fx={fx} />
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="space-y-8">
            <header>
              <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {t("h1")}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                {t.rich("intro", {
                  ar: (chunks) => (
                    <span lang={locale === "ar" ? "en" : "ar"} className="text-[var(--color-text)]">
                      {chunks}
                    </span>
                  ),
                })}
              </p>
            </header>

            <HeroSpot spot={spot} />
            <MetalsStrip metals={metals} />
            <PriceChart histories={histories} fx={fx} />
            <BidAskGauge spot={spot} />
            <KaratGrid spot={spot} fx={fx} />
            <Calculator spot={calcSpot} fx={fx} />
            <AffiliateBanner url={affiliateUrl} />

            <section aria-labelledby="about-heading">
              <h2 id="about-heading" className="text-xl font-semibold text-[var(--color-text)]">
                {t("aboutH2")}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <p>
                  {t.rich("aboutP1", {
                    b: (chunks) => <strong className="text-[var(--color-text)]">{chunks}</strong>,
                    ar: (chunks) => (
                      <span lang={locale === "ar" ? "en" : "ar"} className="text-[var(--color-gold)]">
                        {chunks}
                      </span>
                    ),
                  })}
                </p>
                <p>{t("aboutP2")}</p>
              </div>
            </section>

            <section aria-labelledby="countries-heading">
              <h2 id="countries-heading" className="text-xl font-semibold text-[var(--color-text)]">
                {t("countriesH2")}
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {countries.map((row) => (
                  <Link
                    key={row.url}
                    href={row.url}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 transition hover:border-[var(--color-gold)]/40"
                  >
                    <div className="text-sm font-semibold text-[var(--color-gold)]">{row.c}</div>
                    <div className="mt-1 text-xs text-[var(--color-text-muted)]">{row.note}</div>
                  </Link>
                ))}
              </div>
            </section>

            <Faq />
          </section>

          <Sidebar adClient={adsClient} />
        </div>
      </main>

      <footer className="mt-12 border-t border-[var(--color-border)] py-6">
        <div className="mx-auto max-w-7xl px-6 text-xs text-[var(--color-text-dim)]">
          {t("footer", { year: new Date().getFullYear() })}
        </div>
      </footer>
    </>
  );
}
