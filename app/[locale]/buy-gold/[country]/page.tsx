import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Calculator } from "@/components/Calculator";
import { HeroSpot } from "@/components/HeroSpot";
import { PageShell } from "@/components/PageShell";
import {
  CalculatorSkeleton,
  HeroSpotSkeleton,
} from "@/components/skeletons";
import { Link } from "@/i18n/navigation";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { fetchFxRates } from "@/lib/fx";
import { fetchSpot } from "@/lib/goldapi";

const SUPPORTED = ["usa", "uk", "canada", "australia"] as const;

export function generateStaticParams() {
  return SUPPORTED.map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country: slug } = await params;
  const c = COUNTRY_BY_SLUG[slug];
  if (!c) return {};
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("buyH1", { country: countryName(c, locale) }),
    description: t("buyIntro", { country: countryName(c, locale) }),
  };
}

export default async function BuyGoldCountryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country: slug } = await params;
  const c = COUNTRY_BY_SLUG[slug];
  if (!c) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");
  const name = countryName(c, locale);

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();

  return (
    <PageShell
      title={t("buyH1", { country: name })}
      intro={t("buyIntro", { country: name })}
      badge={`${c.flag} ${name}`}
    >
      <Suspense fallback={<HeroSpotSkeleton />}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          return <HeroSpot spot={s} fx={fx} displayCurrency={c.currency} />;
        })()}
      </Suspense>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <SubLink href={`/buy-gold/${slug}/coins`} label={t("buyCoinsH1", { country: name })} />
        <SubLink href={`/buy-gold/${slug}/small-coins`} label={t("buySmallH1", { country: name })} />
        <SubLink href={`/buy-gold/${slug}/bars`} label={t("buyBarsH1", { country: name })} />
      </ul>

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
          return <Calculator spot={calcSpot} fx={fx} defaultCurrency={c.currency} />;
        })()}
      </Suspense>
    </PageShell>
  );
}

function SubLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 text-sm font-semibold text-[var(--color-gold)] transition hover:border-[var(--color-gold)]/40"
      >
        {label}
      </Link>
    </li>
  );
}
