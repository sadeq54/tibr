import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n-text";

const KARATS = ["24k", "22k", "21k", "18k", "14k"] as const;
const PURITY: Record<string, string> = {
  "24k": "99.9%",
  "22k": "91.7%",
  "21k": "87.5%",
  "18k": "75%",
  "14k": "58.3%",
};

/**
 * Sibling-karat switcher with a "luxury" treatment: brushed-gold gradient
 * borders, soft outer glow on hover, large display-weight karat numerals,
 * and a metallic-gradient active state. Optional 5th button links to the
 * historical OHLC year page when historicalHref is supplied.
 *
 *   <KaratSwitcher
 *     current="21k"
 *     basePath="/saudi-arabia/gold-price"
 *     locale={locale}
 *     historicalHref="/historical-gold-prices/2026"
 *   />
 */
export function KaratSwitcher({
  current,
  basePath,
  locale,
  historicalHref,
}: {
  current: string;
  basePath: string;
  locale: string;
  historicalHref?: string;
}) {
  const heading = pick(locale, {
    en: "Browse by Karat",
    ar: "تصفّح حسب العيار",
    fr: "Parcourir par carat",
    tr: "Ayara göre göz atın",
    ur: "قیراط کے لحاظ سے دیکھیں",
    hi: "कैरेट के अनुसार देखें",
  });
  const historicalLabel = pick(locale, {
    en: "Historical",
    ar: "السجل",
    fr: "Historique",
    tr: "Geçmiş",
    ur: "تاریخ",
    hi: "इतिहास",
  });
  const historicalSubLabel = pick(locale, {
    en: "OHLC by year",
    ar: "بيانات تاريخية",
    fr: "OHLC par année",
    tr: "Yıllık OHLC",
    ur: "سالانہ OHLC",
    hi: "वर्षवार OHLC",
  });
  const purityLabel = pick(locale, {
    en: "purity",
    ar: "نقاء",
    fr: "pureté",
    tr: "saflık",
    ur: "خلوص",
    hi: "शुद्धता",
  });
  const columns = historicalHref ? "sm:grid-cols-3 lg:grid-cols-6" : "sm:grid-cols-5";

  return (
    <section
      aria-labelledby="karat-switcher-heading"
      className="relative overflow-hidden rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-bg-card)] p-5 shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--color-gold)_25%,transparent)]"
      style={{
        backgroundImage:
          "radial-gradient(120% 80% at 0% 0%, color-mix(in srgb, var(--color-gold) 12%, transparent) 0%, transparent 55%), radial-gradient(80% 60% at 100% 100%, color-mix(in srgb, var(--color-gold) 6%, transparent) 0%, transparent 60%)",
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3
          id="karat-switcher-heading"
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]"
        >
          {heading}
        </h3>
        <span
          aria-hidden
          className="h-px flex-1 ms-4 bg-gradient-to-r from-[var(--color-gold)]/40 to-transparent"
        />
      </div>
      <div className={`grid grid-cols-2 gap-3 ${columns}`}>
        {KARATS.map((k) => {
          const isActive = k === current.toLowerCase();
          return (
            <Link
              key={k}
              href={`${basePath}/${k}` as never}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex flex-col items-start gap-1 overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                isActive
                  ? "border-[var(--color-gold)] text-[var(--color-gold)] shadow-[0_0_0_1px_var(--color-gold),0_8px_28px_-8px_color-mix(in_srgb,var(--color-gold)_45%,transparent)]"
                  : "border-[var(--color-border)] text-[var(--color-text)] hover:-translate-y-0.5 hover:border-[var(--color-gold)]/60 hover:shadow-[0_10px_28px_-12px_color-mix(in_srgb,var(--color-gold)_40%,transparent)]"
              }`}
              style={{
                backgroundImage: isActive
                  ? "linear-gradient(135deg, color-mix(in srgb, var(--color-gold) 18%, var(--color-bg-card)) 0%, color-mix(in srgb, var(--color-gold) 6%, var(--color-bg-card)) 100%)"
                  : undefined,
              }}
            >
              {/* Inner top highlight — gives the metallic sheen */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 top-0 h-px ${
                  isActive
                    ? "bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-90"
                    : "bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                }`}
              />
              {/* Corner shimmer on active */}
              {isActive ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in srgb, var(--color-gold) 60%, transparent) 0%, transparent 70%)",
                  }}
                />
              ) : null}
              <span className="num font-mono text-2xl font-bold tracking-wide sm:text-3xl">
                {k.toUpperCase()}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
                {PURITY[k]} {purityLabel}
              </span>
            </Link>
          );
        })}
        {historicalHref ? (
          <Link
            href={historicalHref as never}
            className="group relative flex flex-col items-start gap-1 overflow-hidden rounded-xl border border-[var(--color-border)] p-4 text-[var(--color-text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-gold)]/60 hover:shadow-[0_10px_28px_-12px_color-mix(in_srgb,var(--color-gold)_40%,transparent)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="font-mono text-2xl font-bold tracking-wide sm:text-3xl">
              {historicalLabel}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
              {historicalSubLabel}
            </span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
