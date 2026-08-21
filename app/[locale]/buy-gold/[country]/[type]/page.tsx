import { Suspense } from "react";
import { withLocales } from "@/lib/static-params";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Flag } from "@/components/Flag";
import { HeroSpot } from "@/components/HeroSpot";
import { PageShell } from "@/components/PageShell";
import { HeroSpotSkeleton } from "@/components/skeletons";
import { localeMeta } from "@/i18n/routing";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import type { FxRates } from "@/lib/fx";
import type { GoldApiResponse } from "@/lib/goldapi";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

const SUPPORTED_COUNTRIES = [
  "usa", "uk", "canada", "australia",
  "saudi-arabia", "uae", "egypt", "morocco",
] as const;
const SUPPORTED_TYPES = ["coins", "small-coins", "bars"] as const;
type Type = (typeof SUPPORTED_TYPES)[number];

const OZ_TO_GRAM = 31.1034768;

const oz = (n: string): LocaleText => ({
  en: `${n} oz`, ar: `${n} أونصة`, fr: `${n} once`, tr: `${n} ons`, ur: `${n} اونس`, hi: `${n} औंस`,
});
const g = (n: string): LocaleText => ({
  en: `${n} g`, ar: `${n} جم`, fr: `${n} g`, tr: `${n} g`, ur: `${n} گرام`, hi: `${n} ग्राम`,
});
const kg = (n: string): LocaleText => ({
  en: `${n} kg`, ar: `${n} كجم`, fr: `${n} kg`, tr: `${n} kg`, ur: `${n} کلو`, hi: `${n} किलो`,
});

const DENOMS: Record<Type, Array<{ label: LocaleText; oz?: number; g?: number; kg?: number }>> = {
  coins: [
    { label: oz("1"), oz: 1 },
    { label: oz("1/2"), oz: 0.5 },
    { label: oz("1/4"), oz: 0.25 },
  ],
  "small-coins": [
    { label: oz("1/10"), oz: 0.1 },
    { label: oz("1/20"), oz: 0.05 },
    { label: g("1"), g: 1 },
  ],
  bars: [
    { label: g("1"), g: 1 },
    { label: g("10"), g: 10 },
    { label: g("100"), g: 100 },
    { label: kg("1"), kg: 1 },
  ],
};

const DENOM_TH: LocaleText = {
  en: "Denomination", ar: "الفئة", fr: "Format", tr: "Gramaj", ur: "وزن", hi: "वज़न",
};

export function generateStaticParams() {
  const params: Array<{ country: string; type: string }> = [];
  for (const country of SUPPORTED_COUNTRIES) {
    for (const type of SUPPORTED_TYPES) {
      params.push({ country, type });
    }
  }
  return withLocales(params);
}

function titleFor(type: Type, t: (k: string, v: { country: string }) => string, country: string) {
  if (type === "coins") return t("buyCoinsH1", { country });
  if (type === "small-coins") return t("buySmallH1", { country });
  return t("buyBarsH1", { country });
}

function introFor(type: Type, t: (k: string, v: { country: string }) => string, country: string) {
  if (type === "coins") return t("buyCoinsIntro", { country });
  if (type === "small-coins") return t("buySmallIntro", { country });
  return t("buyBarsIntro", { country });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string; type: string }>;
}) {
  const { locale, country: slug, type } = await params;
  const c = COUNTRY_BY_SLUG[slug];
  if (!c || !SUPPORTED_TYPES.includes(type as Type)) return {};
  const t = await getTranslations({ locale, namespace: "SubPage" });
  const name = countryName(c, locale);
  return {
    title: titleFor(type as Type, t, name),
    description: introFor(type as Type, t, name),
    alternates: buildAlternates(locale, `/buy-gold/${slug}/${type}`),
    openGraph: buildOpenGraph(locale, `/buy-gold/${slug}/${type}`),
  };
}

export default async function BuyGoldTypePage({
  params,
}: {
  params: Promise<{ locale: string; country: string; type: string }>;
}) {
  const { locale, country: slug, type } = await params;
  const c = COUNTRY_BY_SLUG[slug];
  if (!c || !SUPPORTED_TYPES.includes(type as Type)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");
  const name = countryName(c, locale);

  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();

  const titleKey =
    type === "coins" ? "buyCoinsH1" : type === "small-coins" ? "buySmallH1" : "buyBarsH1";
  const introKey =
    type === "coins" ? "buyCoinsIntro" : type === "small-coins" ? "buySmallIntro" : "buyBarsIntro";

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey={titleKey}
      introKey={introKey}
      titleVars={{ country: name }}
      introVars={{ country: name }}
      badge={<><Flag cc={c.cc} size={12} className="me-1" /> {name}</>}
    >
      <Suspense fallback={<HeroSpotSkeleton />}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          return <HeroSpot spot={s} fx={fx} displayCurrency={c.currency} />;
        })()}
      </Suspense>
      <Suspense fallback={null}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          return (
            <DenomTable
              spot={s}
              fx={fx}
              type={type as Type}
              currency={c.currency}
              locale={locale}
              heading={t("denominationsTitle")}
            />
          );
        })()}
      </Suspense>
    </PageShell>
  );
}

function DenomTable({
  spot,
  fx,
  type,
  currency,
  locale,
  heading,
}: {
  spot: GoldApiResponse | null;
  fx: FxRates;
  type: Type;
  currency: string;
  locale: string;
  heading: string;
}) {
  const intl = localeMeta(locale).intl;
  const rate = (fx[currency] as number | undefined) ?? 1;
  const perGramUsd = spot?.price_gram_24k ?? 0;
  const denoms = DENOMS[type];

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
      <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">{heading}</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left">
            <th className="py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
              {pick(locale, DENOM_TH)}
            </th>
            <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
              USD
            </th>
            <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
              {currency}
            </th>
          </tr>
        </thead>
        <tbody>
          {denoms.map((d) => {
            const grams =
              (d.oz ?? 0) * OZ_TO_GRAM + (d.g ?? 0) + (d.kg ?? 0) * 1000;
            const usd = grams * perGramUsd;
            const local = usd * rate;
            const label = pick(locale, d.label);
            return (
              <tr
                key={d.label.en}
                className="border-b border-[var(--color-border)] last:border-b-0"
              >
                <td className="py-3 font-semibold text-[var(--color-text)]">{label}</td>
                <td className="py-3 text-right font-mono text-[var(--color-text)]">
                  ${usd.toLocaleString(intl, { maximumFractionDigits: 2 })}
                </td>
                <td className="py-3 text-right font-mono text-[var(--color-gold)]">
                  {local.toLocaleString(intl, { maximumFractionDigits: 2 })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
