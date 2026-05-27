import { cacheLife } from "next/cache";
import { createTranslator } from "next-intl";

import arMessages from "@/messages/ar.json";
import enMessages from "@/messages/en.json";

import { Flag } from "@/components/Flag";
import {
  COUNTRY_BY_SLUG,
  countryName,
  countryNote,
} from "@/lib/countries";

/**
 * Country×karat page header — H1, intro, currency note, and the country
 * market-note section, rendered with `"use cache"` so they land in the
 * static PPR prerender.
 *
 * Why: the surrounding `/[country]/gold-price/[karat]` page `await`s
 * `getTranslations()` at the top → Next 16 + cacheComponents treats the
 * whole page as dynamic → H1/intro stream via RSC, never appear in the
 * static HTML shell. Non-JS crawlers (Bing fallback, Seobility, AI bots,
 * Lighthouse SEO) see an empty <main> for all 188 country×karat routes.
 *
 * This component is fully deterministic in (locale, slug, karat), so the
 * cache covers every variant from one build.
 */
export async function CountryGoldPriceHeader({
  locale,
  slug,
  karat,
}: {
  locale: string;
  slug: string;
  karat: string;
}) {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 3600, expire: 86400 });

  const country = COUNTRY_BY_SLUG[slug];
  if (!country) return null;

  // `createTranslator` not `getTranslations` — request-free, safe in cache.
  const messages = (locale === "ar" ? arMessages : enMessages) as unknown as Record<
    string,
    Record<string, string>
  >;
  const tPage = createTranslator({ locale, namespace: "CountryPage", messages });
  const upper = karat.toUpperCase();
  const name = countryName(country, locale);
  const note = countryNote(slug, locale);

  return (
    <header>
      {/* Plain <a> not next-intl <Link> — Link reads request config (headers)
          to apply locale prefix, which Next 16 forbids inside "use cache". */}
      <a
        href={locale === "en" ? "/en" : "/"}
        className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-gold)]"
      >
        <Flag cc={country.cc} size={12} className="me-1" />
        {name}
      </a>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
        {tPage("h1", { karat: upper, country: name })}
      </h1>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
        {tPage("intro", {
          karat: upper,
          country: name,
          currency: country.currency,
        })}
      </p>
      <div className="mt-3 inline-block rounded-md border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1.5 text-xs text-[var(--color-gold)]">
        {tPage("currencyNote", { currency: country.currency })}
      </div>
      {note ? (
        <section
          aria-label={locale === "ar" ? "ملاحظات السوق المحلي" : "Local market notes"}
          className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
            {locale === "ar" ? `سوق الذهب في ${name}` : `${name} gold market`}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {note}
          </p>
        </section>
      ) : null}
    </header>
  );
}
