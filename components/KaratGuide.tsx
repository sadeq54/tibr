import { karatGuideText } from "@/lib/karat-guide";

/**
 * The "what this karat actually is" section on `/[country]/gold-price/[karat]`.
 *
 * SYNCHRONOUS server component on purpose, matching `CountryGoldPriceHeader`:
 * an async child would be wrapped in Suspense and stream after `</main>`, so
 * crawlers that do not run JS would miss it — which would defeat the entire
 * point of adding it. Sync means it is inlined into the static PPR shell and
 * is present in the raw HTML.
 */
export function KaratGuide({
  locale,
  slug,
  karat,
  countryName,
}: {
  locale: string;
  slug: string;
  karat: string;
  countryName: string;
}) {
  const guide = karatGuideText(locale, karat, countryName, slug);
  if (guide.paragraphs.length === 0) return null;

  return (
    <section
      aria-labelledby={`karat-guide-${slug}-${karat}`}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2
          id={`karat-guide-${slug}-${karat}`}
          className="text-lg font-semibold text-[var(--color-text)]"
        >
          {guide.heading}
        </h2>
        {guide.spec ? (
          <span className="text-xs text-[var(--color-gold)]">{guide.spec}</span>
        ) : null}
      </div>

      <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
        {guide.paragraphs.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
        {guide.local ? <p className="text-[var(--color-text)]">{guide.local}</p> : null}
      </div>
    </section>
  );
}
