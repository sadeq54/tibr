import { Link } from "@/i18n/navigation";

const KARATS = ["24k", "21k", "18k", "14k"] as const;
const PURITY: Record<string, string> = {
  "24k": "99.9%",
  "21k": "87.5%",
  "18k": "75%",
  "14k": "58.3%",
};

/**
 * Sibling-karat switcher rendered on every karat-specific page. Links the
 * current page to each other karat at the same country (or global). Increases
 * internal link density + helps users compare directly.
 *
 *   <KaratSwitcher current="24k" basePath="/gold-price" locale={locale} />
 *   // → links to /gold-price/24k|21k|18k|14k
 *
 *   <KaratSwitcher current="21k" basePath="/saudi-arabia/gold-price" locale={locale} />
 *   // → links to /saudi-arabia/gold-price/24k|21k|18k|14k
 */
export function KaratSwitcher({
  current,
  basePath,
  locale,
}: {
  current: string;
  basePath: string;
  locale: string;
}) {
  const heading =
    locale === "ar" ? "تصفّح حسب العيار" : "Browse by karat";

  return (
    <section
      aria-labelledby="karat-switcher-heading"
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4"
    >
      <h2
        id="karat-switcher-heading"
        className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-dim)]"
      >
        {heading}
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {KARATS.map((k) => {
          const isActive = k === current.toLowerCase();
          return (
            <Link
              key={k}
              href={`${basePath}/${k}` as never}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-start gap-0.5 rounded-lg border p-3 transition ${
                isActive
                  ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                  : "border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] hover:border-[var(--color-gold)]/40"
              }`}
            >
              <span className="text-base font-bold uppercase tracking-wide">
                {k.toUpperCase()}
              </span>
              <span className="text-[10px] text-[var(--color-text-dim)]">
                {PURITY[k]} {locale === "ar" ? "نقاء" : "purity"}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
