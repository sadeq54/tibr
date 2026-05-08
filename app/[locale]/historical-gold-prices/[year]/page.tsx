import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { StoresMarquee } from "@/components/StoresMarquee";
import { TradingViewChart } from "@/components/TradingViewChart";
import { Link } from "@/i18n/navigation";

const VALID_YEARS = [2024, 2025, 2026];

export async function generateStaticParams() {
  return VALID_YEARS.map((y) => ({ year: String(y) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}) {
  const { locale, year } = await params;
  const t = await getTranslations({ locale, namespace: "HistoricalPage" });
  return { title: t("title", { year }), description: t("description", { year }) };
}

export default async function HistoricalPage({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}) {
  const { locale, year } = await params;
  const yearNum = Number(year);
  if (!VALID_YEARS.includes(yearNum)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("HistoricalPage");
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX";

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="min-w-0 space-y-8">
            <header>
              <Link href="/" className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-gold)]">
                ← Gold Prices Arabia
              </Link>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {t("h1", { year })}
              </h1>
            </header>

            <TradingViewChart />

            <AffiliateBanner />

            <div className="rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-card)] p-8 text-center">
              <div className="text-sm font-semibold text-[var(--color-gold)]">
                {t("comingSoon", { year })}
              </div>
              <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-[var(--color-text-muted)]">
                {t("comingSoonBody")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {VALID_YEARS.filter((y) => y !== yearNum).map((y) => (
                <Link
                  key={y}
                  href={`/historical-gold-prices/${y}`}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 text-center transition hover:border-[var(--color-gold)]/40"
                >
                  <div className="text-sm font-semibold text-[var(--color-gold)]">{y}</div>
                </Link>
              ))}
            </div>

            <StoresMarquee />
            <Faq />
          </section>
          <Sidebar adClient={adsClient} />
        </div>
      </main>
    </>
  );
}
