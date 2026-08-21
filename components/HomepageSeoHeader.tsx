import { createTranslator } from "next-intl";

import { Flag } from "@/components/Flag";
import { pick } from "@/lib/i18n-text";
import { canonicalPath } from "@/lib/metadata";
import { staticMessages } from "@/lib/static-messages";

import { MENA_COUNTRIES, QUICK_LINKS, seoHeaderText } from "./HomepageSeoHeader.i18n";

/**
 * Homepage hero + content-rich static SEO block.
 *
 * Rendered with `"use cache"` so the full block — H1, intro, quick-link nav,
 * 4 H2 sections, ~300 words of body copy, MENA country grid, static FAQ —
 * lands in the PPR prerender. This is what Seobility, Bing's JS-fallback,
 * AI bots and Lighthouse SEO actually parse.
 *
 * `createTranslator` (not `getTranslations`) is request-free → safe in cache.
 * Plain `<a>` (not next-intl `<Link>`) for the same reason — Link reads
 * request config to resolve the locale prefix, which is forbidden in cache.
 */
export function HomepageSeoHeader({
  locale,
  part = "all",
}: {
  locale: string;
  /** "intro" = H1 + quick links only; "content" = the static SEO sections only. */
  part?: "intro" | "content" | "all";
}) {
  // SYNCHRONOUS. Async components stream as hidden Suspense reveals AFTER
  // </main>, which non-JS crawlers (Seobility, Bing fallback, AI bots) skip
  // → "0 words, 0 H1, 0 links". Sync = inlined directly in static prerender.
  const t = createTranslator({ locale, namespace: "Page", messages: staticMessages(locale) });
  const s = seoHeaderText(locale);

  const showIntro = part !== "content";
  const showContent = part !== "intro";

  return (
    <>
      {showIntro ? (
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)]">
          {t("h1")}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          {t.rich("intro", {
            // The <ar> tag wraps the *other* language: English inside the
            // Arabic intro, Arabic inside every other locale's intro.
            ar: (chunks) => (
              <span
                lang={locale === "ar" ? "en" : "ar"}
                className="text-[var(--color-text)]"
              >
                {chunks}
              </span>
            ),
          })}
        </p>
        <nav
          aria-label={s.quickLinks}
          className="mt-4 flex flex-wrap gap-2 text-sm"
        >
          {QUICK_LINKS.map((item) => (
            <a
              key={item.href}
              href={canonicalPath(locale, item.href)}
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5 px-4 py-2 font-medium text-[var(--color-gold)] transition hover:bg-[var(--color-gold)]/15"
            >
              {pick(locale, item.label)}
            </a>
          ))}
        </nav>
      </header>
      ) : null}

      {showContent ? (
        <>
      {/* Static SEO content — ensures Seobility, Bing's JS-fallback, AI bots
          and Lighthouse parse a content-rich homepage instead of an empty
          dynamic shell. Word count and structured headings here are the
          biggest lever on Page Quality + Page Structure scores. */}
      <section
        aria-labelledby="why-heading"
        className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
      >
        <h2
          id="why-heading"
          className="text-xl font-bold tracking-tight text-[var(--color-gold)]"
        >
          {s.deliversH2}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {s.delivers.map((seg, i) =>
            typeof seg === "string" ? seg : <strong key={i}>{seg.b}</strong>,
          )}
        </p>
      </section>

      <section
        aria-labelledby="coverage-heading"
        className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
      >
        <h2
          id="coverage-heading"
          className="text-xl font-bold tracking-tight text-[var(--color-gold)]"
        >
          {s.coverageH2}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {s.coverageP}
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {MENA_COUNTRIES.map((c) => (
            <li key={c.slug}>
              <a
                href={canonicalPath(locale, `/${c.slug}/gold-price/21k`)}
                className="flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] px-3 py-2 text-sm text-[var(--color-text)] hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]"
              >
                <Flag cc={c.cc} size={14} />
                <span>{pick(locale, c.name)}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="static-faq-heading"
        className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
      >
        <h2
          id="static-faq-heading"
          className="text-xl font-bold tracking-tight text-[var(--color-gold)]"
        >
          {s.faqH2}
        </h2>
        <dl className="mt-4 space-y-4">
          {s.faqs.map((f) => (
            <div key={f.q}>
              <dt className="text-sm font-semibold text-[var(--color-text)]">
                {f.q}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>
        </>
      ) : null}
    </>
  );
}
