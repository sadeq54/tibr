import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Flag } from "@/components/Flag";
import { PageShell } from "@/components/PageShell";
import { Link } from "@/i18n/navigation";
import { localeMeta } from "@/i18n/routing";
import { getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { countryName, sortedCountries } from "@/lib/countries";
import { pick } from "@/lib/i18n-text";
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

const TH = {
  country: { en: "Country", ar: "الدولة", fr: "Pays", tr: "Ülke", ur: "ملک", hi: "देश" },
  currency: { en: "Currency", ar: "العملة", fr: "Devise", tr: "Para birimi", ur: "کرنسی", hi: "मुद्रा" },
  perGram: { en: "Per gram", ar: "للجرام", fr: "Par gramme", tr: "Gram başına", ur: "فی گرام", hi: "प्रति ग्राम" },
  perOz: { en: "Per oz", ar: "للأونصة", fr: "Par once", tr: "Ons başına", ur: "فی اونس", hi: "प्रति औंस" },
};

export default async function BestGoldPricePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const intl = localeMeta(locale).intl;

  const [spot, fx] = await Promise.all([getCachedSpot("XAU"), getCachedFxRates()]);

  const rows = sortedCountries(locale).map((c) => {
    const rate = (fx[c.currency] as number | undefined) ?? 1;
    const perGram = (spot?.price_gram_24k ?? 0) * rate;
    const perOz = (spot?.price ?? 0) * rate;
    return { country: c, perGram, perOz };
  });

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey="bestPriceH1"
      introKey="bestPriceIntro"
      showFaq={false}
    >
      <Suspense fallback={null}>
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 sm:p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left">
                <th className="py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                  {pick(locale, TH.country)}
                </th>
                <th className="py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                  {pick(locale, TH.currency)}
                </th>
                <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                  {pick(locale, TH.perGram)}
                </th>
                <th className="hidden py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)] sm:table-cell">
                  {pick(locale, TH.perOz)}
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
                      <Flag cc={country.cc} size={14} />
                      <span>{countryName(country, locale)}</span>
                    </Link>
                  </td>
                  <td className="py-3 font-mono text-[var(--color-text-dim)]">
                    {country.currency}
                  </td>
                  <td className="py-3 text-right font-mono text-[var(--color-text)]">
                    {perGram.toLocaleString(intl, { maximumFractionDigits: 2 })}
                  </td>
                  <td className="hidden py-3 text-right font-mono text-[var(--color-text-muted)] sm:table-cell">
                    {perOz.toLocaleString(intl, { maximumFractionDigits: 2 })}
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
