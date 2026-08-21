import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { EmbedTicker } from "@/components/EmbedTicker";
import { getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";

/**
 * Isolated embed route — designed to be loaded inside a third-party <iframe>.
 *
 * Isolation: the locale layout detects `/embed/` (via `x-pathname`) and skips
 * the Footer, site JSON-LD and GTM/GA. `LivePriceProvider` skips its exchange
 * WebSockets when not the top window. So this route ships none of the site
 * chrome, analytics, or 3 live sockets into the host page.
 *
 * Data: server-rendered snapshot from the cached fetchers (one shared, cached
 * upstream call regardless of embed traffic) + a 60s client poll of `/api/spot`
 * inside <EmbedTicker>. No per-visitor WebSocket — see the recommendation note.
 *
 * `noindex` — the bare widget must not compete with the real country pages in
 * search; the dofollow backlink lives in the host page, outside this iframe.
 */
export const metadata: Metadata = {
  title: "Live Gold Price Ticker",
  robots: { index: false, follow: false },
};

export default async function EmbedTickerPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ country?: string; theme?: string }>;
}) {
  const { locale } = await params;
  const { country: countrySlug, theme: themeParam } = await searchParams;
  setRequestLocale(locale);

  const theme = themeParam === "dark" ? "dark" : "light";
  const country = countrySlug ? COUNTRY_BY_SLUG[countrySlug] : undefined;
  // Graceful fallback: unknown/missing country → global USD pricing.
  const currency = country?.currency ?? "USD";

  const [spot, fx] = await Promise.all([
    getCachedSpot("XAU"),
    getCachedFxRates(),
  ]);
  const rate =
    currency === "USD" ? 1 : ((fx[currency] as number | undefined) ?? 1);

  const name = country
    ? countryName(country, locale)
    : locale === "ar"
      ? "السعر العالمي"
      : "Global";

  return (
    <EmbedTicker
      locale={locale}
      theme={theme}
      countryName={name}
      currency={currency}
      fxRate={rate}
      initial={{
        g24: (spot?.price_gram_24k ?? 0) * rate,
        g21: (spot?.price_gram_21k ?? 0) * rate,
        g18: (spot?.price_gram_18k ?? 0) * rate,
        g14: (spot?.price_gram_14k ?? 0) * rate,
        changePct: spot?.chp ?? 0,
        // Per-request render timestamp for the widget's "updated" label —
        // intentional impurity, this dynamic embed renders per request.
        // eslint-disable-next-line react-hooks/purity
        updatedAt: Date.now(),
      }}
    />
  );
}
