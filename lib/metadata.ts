/**
 * Canonical site URL — hardcoded to production domain so staging deploys
 * (e.g. tibers.netlify.app) emit canonicals + hreflang pointing at the real
 * domain. Prevents accidental indexation of staging hosts under the wrong URL.
 */
export const SITE_URL = "https://goldpricesarabia.com";
export const SITE_METADATA_BASE = new URL(SITE_URL);

/** Locale → URL-prefix map for next-intl `localePrefix: "as-needed"` routing. */
export const LOCALES = ["ar", "en"] as const;
export type SiteLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: SiteLocale = "ar";

/**
 * Build the canonical path for a given locale + path. `path` is the
 * locale-agnostic path (e.g. `/gold-price/24k`, `/`, `/buy-gold/usa/coins`).
 */
export function canonicalPath(locale: string, path: string): string {
  const clean = path === "/" || path === "" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean === "" ? "/en" : `/en${clean}`;
  return clean === "" ? "/" : clean;
}

/**
 * Build the `alternates` block for Next `Metadata` — sets the canonical for
 * the current locale and emits hreflang entries for all supported locales.
 *
 *   alternates: buildAlternates("ar", "/gold-price/24k")
 */
export function buildAlternates(locale: string, path: string) {
  const clean = path === "/" || path === "" ? "" : path.startsWith("/") ? path : `/${path}`;
  return {
    canonical: canonicalPath(locale, path),
    languages: {
      ar: clean === "" ? "/" : clean,
      en: clean === "" ? "/en" : `/en${clean}`,
      "x-default": clean === "" ? "/" : clean,
    },
  } as const;
}

/**
 * Build the `openGraph` block override for a given locale + path. Spreads on
 * top of the layout-level openGraph (siteName, title, images, type) so each
 * page emits the right `og:url`.
 *
 *   openGraph: buildOpenGraph("ar", "/gold-price/24k")
 */
export function buildOpenGraph(locale: string, path: string) {
  return { url: canonicalPath(locale, path) } as const;
}

/**
 * Pair a path segment list with display labels to build a BreadcrumbList for
 * `<JsonLd>`. Always starts with a "Home" item pointing at the locale-aware
 * root.
 *
 *   buildBreadcrumb("ar", "/", [])
 *   → [{ name: "Home", url: "/" }]
 *
 *   buildBreadcrumb("ar", "/gold-price/24k", [
 *     { name: "Gold Price", url: "/spot-gold" },
 *     { name: "24K", url: "/gold-price/24k" },
 *   ])
 */
export function buildBreadcrumb(
  locale: string,
  homeLabel: string,
  crumbs: Array<{ name: string; url: string }>,
) {
  const home = locale === "en" ? "/en" : "/";
  return [
    { name: homeLabel, url: home },
    ...crumbs.map((c) => ({
      name: c.name,
      url: canonicalPath(locale, c.url),
    })),
  ];
}
