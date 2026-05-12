import { Suspense } from "react";
import { connection } from "next/server";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { Link } from "@/i18n/navigation";
import { COUNTRIES, countryName } from "@/lib/countries";
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
    title: t("bestPriceH1"), description: t("bestPriceIntro"),
    alternates: buildAlternates(locale, "/best-gold-price"),
    openGraph: buildOpenGraph(locale, "/best-gold-price"),
  };
}

export default async function BestGoldPricePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");
  await connection();

  const [spot, fx] = await Promise.all([fetchSpot("XAU"), fetchFxRates()]);
  const lang = await getLocale();

  const rows = COUNTRIES.map((c) => {
    const rate = (fx[c.currency] as number | undefined) ?? 1;
    const perGram = (spot?.price_gram_24k ?? 0) * rate;
    const perOz = (spot?.price ?? 0) * rate;
    return { country: c, perGram, perOz };
  }).sort((a, b) =>
    lang === "ar"
      ? a.country.name_ar.localeCompare(b.country.name_ar, "ar")
      : a.country.name_en.localeCompare(b.country.name_en),
  );

  return (
    <PageShell title={t("bestPriceH1")} intro={t("bestPriceIntro")} showFaq={false}>
      <Suspense fallback={null}>
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 sm:p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left">
                <th className="py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                  {lang === "ar" ? "الدولة" : "Country"}
                </th>
                <th className="py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                  {lang === "ar" ? "العملة" : "Currency"}
                </th>
                <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                  {lang === "ar" ? "للجرام" : "Per gram"}
                </th>
                <th className="hidden py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)] sm:table-cell">
                  {lang === "ar" ? "للأونصة" : "Per oz"}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ country, perGram, perOz }) => (
                <tr
                  key={country.slug}
                  className="border-b border-[var(--color-border)] last:border-b-0"
                >
                  <td className="py-3">
                    <Link
                      href={`/best-gold-price/${country.slug}`}
                      className="flex items-center gap-2 font-semibold text-[var(--color-gold)] hover:underline"
                    >
                      <span aria-hidden>{country.flag}</span>
                      <span>{countryName(country, lang)}</span>
                    </Link>
                  </td>
                  <td className="py-3 font-mono text-[var(--color-text-dim)]">
                    {country.currency}
                  </td>
                  <td className="py-3 text-right font-mono text-[var(--color-text)]">
                    {perGram.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </td>
                  <td className="hidden py-3 text-right font-mono text-[var(--color-text-muted)] sm:table-cell">
                    {perOz.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Suspense>
    </PageShell>
  );
}
