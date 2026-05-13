import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

type Item = { href: string; label: string; note?: string };

/**
 * Contextual related-page block. Renders 3–6 internal links with optional
 * one-line context. Boosts internal link density (key SEO signal) and helps
 * users discover sibling content.
 *
 *   <RelatedLinks
 *     heading={t("relatedH2")}
 *     items={[
 *       { href: "/gold-price/24k", label: "24K Gold", note: "99.9% purity" },
 *       ...
 *     ]}
 *   />
 */
export function RelatedLinks({
  heading,
  items,
}: {
  heading: string;
  items: Item[];
}) {
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="related-links-heading"
      className="mt-10 border-t border-[var(--color-border)] pt-6"
    >
      <h2
        id="related-links-heading"
        className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-dim)]"
      >
        {heading}
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href as never}
              className="group flex items-start gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3 text-sm transition hover:border-[var(--color-gold)]/40"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[var(--color-gold)]">
                  {item.label}
                </div>
                {item.note && (
                  <div className="mt-0.5 text-xs leading-relaxed text-[var(--color-text-muted)]">
                    {item.note}
                  </div>
                )}
              </div>
              <ArrowRight
                size={14}
                className="mt-0.5 flex-shrink-0 text-[var(--color-text-dim)] transition group-hover:text-[var(--color-gold)] rtl:rotate-180"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
