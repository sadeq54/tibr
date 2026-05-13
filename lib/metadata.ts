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

const SITE_NAME = "Gold Prices Arabia";
const TWITTER_HANDLE = "@goldpricesarabia"; // update if/when account created

type PageMetaInput = {
  locale: string;
  /** Locale-agnostic path, e.g. `/gold-price/24k`. */
  path: string;
  title: string;
  description: string;
  /** Override default OG image (e.g. dynamic per-page OG). */
  ogImage?: string;
  /** `true` → `<meta name="robots" content="noindex,follow">` (search results pages, deploy-previews). */
  noindex?: boolean;
  type?: "website" | "article" | "profile";
  /** ISO date for articles. */
  publishedAt?: string;
  modifiedAt?: string;
  /** Locale-agnostic path to author's profile page, e.g. `/about/sadeq`. */
  authorPath?: string;
};

/**
 * Unified Metadata factory — emits canonical, hreflang alternates, OG, Twitter
 * card, robots toggles in one call. Prefer this over manually composing
 * `alternates + openGraph + twitter` in each page.
 *
 *   export async function generateMetadata({ params }) {
 *     const { locale } = await params;
 *     const t = await getTranslations({ locale, namespace: "KaratPage" });
 *     return buildPageMetadata({
 *       locale,
 *       path: `/gold-price/${karat}`,
 *       title: t("title", { karat: karat.toUpperCase() }),
 *       description: t("description", { karat: karat.toUpperCase() }),
 *     });
 *   }
 */
export function buildPageMetadata(input: PageMetaInput): import("next").Metadata {
  const {
    locale,
    path,
    title,
    description,
    ogImage,
    noindex,
    type = "website",
    publishedAt,
    modifiedAt,
    authorPath,
  } = input;
  const canonical = canonicalPath(locale, path);
  const ogImageUrl = ogImage ?? `${SITE_URL}/opengraph-image`;
  const ogLocale = locale === "ar" ? "ar_SA" : "en_US";
  const ogAlt = locale === "ar" ? "en_US" : "ar_SA";

  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: type as "website",
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: ogLocale,
      alternateLocale: ogAlt,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(modifiedAt && { modifiedTime: modifiedAt }),
      ...(authorPath && { authors: [`${SITE_URL}${authorPath}`] }),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [ogImageUrl],
    },
  };
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
