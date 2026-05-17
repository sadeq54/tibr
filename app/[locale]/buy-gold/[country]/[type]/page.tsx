import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Flag } from "@/components/Flag";
import { HeroSpot } from "@/components/HeroSpot";
import { PageShell } from "@/components/PageShell";
import { HeroSpotSkeleton } from "@/components/skeletons";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { fetchFxRates, type FxRates } from "@/lib/fx";
import { fetchSpot, type GoldApiResponse } from "@/lib/goldapi";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

const SUPPORTED_COUNTRIES = ["usa", "uk", "canada", "australia"] as const;
const SUPPORTED_TYPES = ["coins", "small-coins", "bars"] as const;
type Type = (typeof SUPPORTED_TYPES)[number];

const OZ_TO_GRAM = 31.1034768;

const DENOMS: Record<Type, Array<{ label_en: string; label_ar: string; oz?: number; g?: number; kg?: number }>> = {
  coins: [
    { label_en: "1 oz", label_ar: "1 أونصة", oz: 1 },
    { label_en: "1/2 oz", label_ar: "1/2 أونصة", oz: 0.5 },
    { label_en: "1/4 oz", label_ar: "1/4 أونصة", oz: 0.25 },
  ],
  "small-coins": [
    { label_en: "1/10 oz", label_ar: "1/10 أونصة", oz: 0.1 },
    { label_en: "1/20 oz", label_ar: "1/20 أونصة", oz: 0.05 },
    { label_en: "1 g", label_ar: "1 جم", g: 1 },
  ],
  bars: [
    { label_en: "1 g", label_ar: "1 جم", g: 1 },
    { label_en: "10 g", label_ar: "10 جم", g: 10 },
    { label_en: "100 g", label_ar: "100 جم", g: 100 },
    { label_en: "1 kg", label_ar: "1 كجم", kg: 1 },
  ],
};

export function generateStaticParams() {
  const params: Array<{ country: string; type: string }> = [];
  for (const country of SUPPORTED_COUNTRIES) {
    for (const type of SUPPORTED_TYPES) {
      params.push({ country, type });
    }
  }
  return params;
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

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();

  return (
    <PageShell
      title={titleFor(type as Type, t, name)}
      intro={introFor(type as Type, t, name)}
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
              {locale === "ar" ? "الفئة" : "Denomination"}
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
            const label = locale === "ar" ? d.label_ar : d.label_en;
            return (
              <tr
                key={label}
                className="border-b border-[var(--color-border)] last:border-b-0"
              >
                <td className="py-3 font-semibold text-[var(--color-text)]">{label}</td>
                <td className="py-3 text-right font-mono text-[var(--color-text)]">
                  ${usd.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                </td>
                <td className="py-3 text-right font-mono text-[var(--color-gold)]">
                  {local.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
