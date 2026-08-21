import { routing } from "@/i18n/routing";

/**
 * Cross a route's own static params with every locale.
 *
 * Paired with `export const dynamicParams = false`, this is what makes an
 * unknown segment (`/en/lebanon/gold-price/21k-1`) return a real 404 instead
 * of rendering a page: with PPR the static shell is flushed before a
 * `notFound()` inside the page body can set the status, so Google saw 200 +
 * a self-canonical for any junk suffix — an unbounded soft-404 factory
 * (47 of them in Search Console). Routing-level params are checked before
 * any rendering starts, so the status is correct.
 */
export function withLocales<T extends Record<string, string>>(
  rows: readonly T[],
): Array<T & { locale: string }> {
  return routing.locales.flatMap((locale) => rows.map((row) => ({ locale, ...row })));
}
