import { Flag } from "@/components/Flag";
import {
  countryPageText,
  headerFaq,
  marketNoteText,
} from "@/components/CountryGoldPriceHeader.i18n";
import {
  COUNTRY_BY_SLUG,
  countryName,
  countryNote,
} from "@/lib/countries";
import { canonicalPath } from "@/lib/metadata";

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
 * cache covers every variant from one build. Strings come from the sibling
 * `.i18n.ts` module (all six locales) rather than `messages/*.json` so no
 * request-scoped config is needed.
 */
export function CountryGoldPriceHeader({
  locale,
  slug,
  karat,
  part = "all",
}: {
  locale: string;
  slug: string;
  karat: string;
  /** "intro" = flag + H1 + intro + currency chip; "content" = market note + FAQ. */
  part?: "intro" | "content" | "all";
}) {
  const country = COUNTRY_BY_SLUG[slug];
  if (!country) return null;

  // SYNCHRONOUS server component (no "use cache", no async). Async children
  // get wrapped in Suspense and stream as hidden reveal payloads after
  // </main>, which crawlers without JS skip → empty SEO. Sync = inlined.
  const name = countryName(country, locale);
  const ctx = { karat, country: name, currency: country.currency };
  const text = countryPageText(locale, ctx);
  const market = marketNoteText(locale, name);
  const faq = headerFaq(locale, ctx);
  const note = countryNote(slug, locale);

  const showIntro = part !== "content";
  const showContent = part !== "intro";

  return (
    <>
      {showIntro ? (
      <header>
      {/* Plain <a> not next-intl <Link> — Link reads request config (headers)
          to apply locale prefix, which Next 16 forbids inside "use cache". */}
      <a
        href={canonicalPath(locale, "/")}
        className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-gold)]"
      >
        <Flag cc={country.cc} size={12} className="me-1" />
        {name}
      </a>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
        {text.h1}
      </h1>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
        {text.intro}
      </p>
      <div className="mt-3 inline-block rounded-md border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1.5 text-xs text-[var(--color-gold)]">
        {text.currencyNote}
      </div>
      </header>
      ) : null}

      {showContent ? (
        <>
      {note ? (
        <section
          aria-label={market.aria}
          className="border-s-2 border-[var(--color-gold)]/50 ps-4"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
            {market.heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {note}
          </p>
        </section>
      ) : null}

      {/* Static SEO content — ensures non-JS crawlers (Seobility, Bing
          fallback, AI bots) see rich text on every one of the 188 country
          pages, not just an empty <main> + the prices that stream via RSC. */}
      <section
        aria-labelledby={`country-faq-heading-${slug}-${karat}`}
        className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
      >
        <h2
          id={`country-faq-heading-${slug}-${karat}`}
          className="text-lg font-semibold text-[var(--color-text)]"
        >
          {faq.heading}
        </h2>
        <dl className="mt-4 space-y-4 text-sm">
          {faq.items.map((item) => (
            <div key={item.q}>
              <dt className="font-semibold text-[var(--color-text)]">{item.q}</dt>
              <dd className="mt-1 leading-relaxed text-[var(--color-text-muted)]">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
        </>
      ) : null}
    </>
  );
}
