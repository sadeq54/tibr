import { Suspense } from "react";
import { withLocales } from "@/lib/static-params";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Calculator } from "@/components/Calculator";
import { Flag } from "@/components/Flag";
import { HeroSpot } from "@/components/HeroSpot";
import { PageShell } from "@/components/PageShell";
import {
  CalculatorSkeleton,
  HeroSpotSkeleton,
} from "@/components/skeletons";
import { Link } from "@/i18n/navigation";
import { getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { BUY_GOLD_EDITORIAL } from "@/lib/content/buy-gold-editorial";
import { pick } from "@/lib/i18n-text";
import { buildAlternates, buildOpenGraph, canonicalPath } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schemas";

import { buyGoldFaqs } from "./faq.i18n";

const SUPPORTED = [
  "usa", "uk", "canada", "australia",
  "saudi-arabia", "uae", "egypt", "morocco",
] as const;

export function generateStaticParams() {
  return withLocales(SUPPORTED.map((country) => ({ country })));
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
    alternates: buildAlternates(locale, `/buy-gold/${slug}`),
    openGraph: buildOpenGraph(locale, `/buy-gold/${slug}`),
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

  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();

  const pageUrl = canonicalPath(locale, `/buy-gold/${slug}`);
  // Editorial is bilingual (ar/en) only — fr/tr/ur/hi read the English copy via pick().
  const editorial = BUY_GOLD_EDITORIAL[slug];
  const buyFaqs = buyGoldFaqs(locale, {
    name,
    currency: c.currency,
    vatAnswer: editorial ? { en: editorial.en.vatAnswer, ar: editorial.ar.vatAnswer } : null,
  });
  const buyFaqSchema = faqPageSchema(pageUrl, buyFaqs, locale);

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey="buyH1"
      introKey="buyIntro"
      titleVars={{ country: name }}
      introVars={{ country: name }}
      badge={<><Flag cc={c.cc} size={12} className="me-1" /> {name}</>}
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buyFaqSchema).replace(/</g, "\\u003c") }}
      />
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

      {editorial ? (
        <section
          aria-labelledby="buy-guide-heading"
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
        >
          <h2
            id="buy-guide-heading"
            className="text-xl font-semibold text-[var(--color-text)]"
          >
            {pick(locale, { en: editorial.en.heading, ar: editorial.ar.heading })}
          </h2>
          <div
            className="prose-article mt-3 space-y-3 text-sm leading-relaxed text-[var(--color-text-muted)]"
            dangerouslySetInnerHTML={{
              __html: pick(locale, { en: editorial.en.body, ar: editorial.ar.body }),
            }}
          />
        </section>
      ) : null}

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
