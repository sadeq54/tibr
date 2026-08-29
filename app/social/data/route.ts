import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { routing } from "@/i18n/routing";
import { getCachedAllHistory, getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { COUNTRY_BY_SLUG } from "@/lib/countries";
import { SITE_URL } from "@/lib/metadata";
import { gramUsd } from "@/lib/seo";
import { buildAltText, buildCaption, type MarketPrice } from "@/lib/social-caption";
import { resolveMarkets } from "@/lib/social-markets";

/**
 * `/social/data?lang=ar&countries=slug,slug` — everything `scripts/social-daily.mjs`
 * needs to write the day's caption, built from the same cached feeds that render
 * the cards. The script fetches this instead of recomputing FX and karat maths,
 * so a caption can never quote a price its own carousel contradicts.
 *
 * One segment after `/social/`, so it does not collide with the two-segment
 * `/social/[country]/[format]` card route.
 */
const KARATS = ["24k", "22k", "21k", "18k"] as const;

export async function GET(req: NextRequest) {
  const langParam = req.nextUrl.searchParams.get("lang") ?? "ar";
  const locale = (routing.locales as readonly string[]).includes(langParam) ? langParam : "ar";
  const slugs = resolveMarkets(req.nextUrl.searchParams.get("countries"));

  const [spot, fx, hist] = await Promise.all([
    getCachedSpot("XAU"),
    getCachedFxRates(),
    getCachedAllHistory("1mo"),
  ]);
  if (!spot) return NextResponse.json({ error: "no spot data" }, { status: 503 });

  const series = (hist.XAU ?? []).map((p) => p.close).filter((n) => Number.isFinite(n) && n > 0);
  const prevClose = series.length > 1 ? series[series.length - 2] : null;
  const ounceUsd = spot.price;
  const changePct = prevClose ? ((ounceUsd - prevClose) / prevClose) * 100 : null;
  const when = new Date();

  const markets = slugs.map((slug) => {
    const country = COUNTRY_BY_SLUG[slug]!;
    const raw = country.currency === "USD" ? 1 : (fx[country.currency] as number | undefined);
    const rate = typeof raw === "number" && Number.isFinite(raw) && raw > 0 ? raw : 1;
    // Same fallback the cards use: an unresolved rate reports USD rather than
    // silently printing a USD figure under a local currency symbol.
    const currency = rate === 1 && country.currency !== "USD" ? "USD" : country.currency;
    return {
      slug,
      name_en: country.name_en,
      name_ar: country.name_ar,
      flag: country.flag,
      currency,
      grams: Object.fromEntries(KARATS.map((k) => [k, gramUsd(spot, k) * rate])) as Record<string, number>,
    };
  });

  const captionMarkets: MarketPrice[] = markets.map((m) => ({
    slug: m.slug,
    gram: Number.isFinite(m.grams["21k"]) ? m.grams["21k"] : null,
    currency: m.currency,
  }));
  // SITE_URL, never req.nextUrl.origin: on Netlify the request origin is the
  // deploy URL (master--tibers.netlify.app), which would print in the caption.
  // `?lead=syria` pins one market to the front of the caption and its hashtags,
  // for a single-country reel. Ignored unless the market is actually present.
  const leadParam = req.nextUrl.searchParams.get("lead") ?? undefined;
  const lead = leadParam && slugs.includes(leadParam) ? leadParam : undefined;
  const captionInput = { locale, when, ounceUsd, changePct, markets: captionMarkets, siteUrl: SITE_URL, lead };

  return NextResponse.json(
    {
      date: when.toISOString().slice(0, 10),
      locale,
      ounceUsd,
      changePct,
      markets,
      caption: buildCaption(captionInput),
      alts: buildAltText(captionInput),
    },
    // No CDN caching. Netlify's edge cached this route without varying on the
    // query string, so a request for nine markets was answered from a cached
    // nineteen-market response and the caption advertised countries the
    // carousel did not contain. The prices behind this are already cached
    // server-side (getCachedSpot / getCachedFxRates), so recomputing is cheap.
    { headers: { "Cache-Control": "no-store" } },
  );
}
