import { setRequestLocale } from "next-intl/server";

import { Flag } from "@/components/Flag";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Link } from "@/i18n/navigation";
import { getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { countriesInRegion, countryName, REGIONS } from "@/lib/countries";
import {
  buildAlternates,
  buildOpenGraph,
  canonicalPath,
  SITE_URL,
} from "@/lib/metadata";

/**
 * Country hub — the internal-linking entry point for all 46 country markets.
 * Replaces the footer's flat, boilerplate-discounted country list with a
 * region-grouped, in-content link graph that Google treats as a real crawl
 * path. Country links use `prefetch={false}` so scrolling the (long) page does
 * not trigger 46 route-payload prefetches on mobile.
 */

const TITLE = {
  en: "Gold Price by Country — Live Rates",
  ar: "أسعار الذهب حسب الدولة — أسعار حية",
} as const;

const INTRO = {
  en: "Live 24K, 21K, 18K and 14K gold prices in local currency for every country we cover, grouped by region. Pick a country for per-gram and per-ounce rates updated in real time.",
  ar: "أسعار الذهب الحية لعيارات 24 و21 و18 و14 بالعملة المحلية لكل دولة نغطيها، مرتبة حسب المنطقة. اختر دولة لعرض الأسعار للجرام وللأونصة محدّثة لحظيًا.",
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = locale === "ar" ? "ar" : "en";
  return {
    title: TITLE[l],
    description: INTRO[l],
    alternates: buildAlternates(locale, "/gold-price"),
    openGraph: buildOpenGraph(locale, "/gold-price"),
  };
}

export default async function GoldPriceHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ar = locale === "ar";
  const l = ar ? "ar" : "en";

  const [spot, fx] = await Promise.all([getCachedSpot("XAU"), getCachedFxRates()]);
  const pageUrl = canonicalPath(locale, "/gold-price");

  return (
    <>
      <JsonLd
        siteUrl={SITE_URL}
        pageOnly
        pageType="CollectionPage"
        pageUrl={pageUrl}
        pageName={TITLE[l]}
        breadcrumb={[
          { name: ar ? "الرئيسية" : "Home", url: ar ? "/" : "/en" },
          {
            name: ar ? "أسعار الذهب حسب الدولة" : "Gold Price by Country",
            url: pageUrl,
          },
        ]}
      />
      <PageShell
        locale={locale}
        namespace="GoldPriceHub"
        titleKey="h1"
        introKey="intro"
        showFaq
      >
        <div className="space-y-10">
          {REGIONS.map((region) => {
            const list = [...countriesInRegion(region.id)].sort((a, b) =>
              ar
                ? a.name_ar.localeCompare(b.name_ar, "ar")
                : a.name_en.localeCompare(b.name_en),
            );
            if (list.length === 0) return null;

            return (
              <section key={region.id} aria-labelledby={`region-${region.id}`}>
                <h2
                  id={`region-${region.id}`}
                  className="flex items-baseline gap-2 text-sm font-bold uppercase tracking-wider text-[var(--color-gold)]"
                >
                  {ar ? region.ar : region.en}
                  <span className="text-xs font-normal text-[var(--color-text-dim)]">
                    {list.length}
                  </span>
                </h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((c) => {
                    const rate = (fx[c.currency] as number | undefined) ?? 1;
                    const perGram = (spot?.price_gram_24k ?? 0) * rate;
                    return (
                      <li key={c.slug}>
                        <Link
                          href={`/${c.slug}/gold-price/21k`}
                          prefetch={false}
                          className="group flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3 transition hover:border-[var(--color-gold)]/40"
                        >
                          <Flag cc={c.cc} size={18} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-[var(--color-gold)]">
                              {countryName(c, locale)}
                            </span>
                            <span className="block text-xs text-[var(--color-text-muted)]">
                              {ar ? "عيار 24 · للجرام" : "24K · per gram"}
                            </span>
                          </span>
                          <span className="flex-shrink-0 text-end font-mono text-sm text-[var(--color-text)]">
                            {perGram.toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })}
                            <span className="ms-1 text-[10px] text-[var(--color-text-dim)]">
                              {c.currency}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </PageShell>
    </>
  );
}
