import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
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
  const affiliateUrl = process.env.NEXT_PUBLIC_AFFILIATE_URL ?? "https://kormzi.com";

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="space-y-8">
            <header>
              <Link href="/" className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-gold)]">
                ← Tibr
              </Link>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {t("h1", { year })}
              </h1>
            </header>

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

            <AffiliateBanner url={affiliateUrl} />
            <Faq />
          </section>
          <Sidebar adClient={adsClient} />
        </div>
      </main>
    </>
  );
}
