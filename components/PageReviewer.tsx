import Image from "next/image";

import { Link } from "@/i18n/navigation";

/**
 * Compact "Reviewed by" byline for non-news money pages — gives Google
 * a named human responsible for the page's facts (E-E-A-T signal) without
 * the full "By + publish date + updated date" framing reserved for news
 * articles. Drops into any page with a single prop set:
 *
 *   <PageReviewer locale={locale} />
 *
 * Optional `lastReviewed` override (ISO YYYY-MM-DD) for pages with a
 * deliberate review cadence (methodology, editorial standards, etc.).
 */

const DEFAULT_LAST_REVIEWED = "2026-05-17";

function formatDate(iso: string, locale: string): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return iso;
  return new Date(t).toLocaleDateString(locale === "ar" ? "ar" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PageReviewer({
  locale,
  lastReviewed = DEFAULT_LAST_REVIEWED,
}: {
  locale: string;
  lastReviewed?: string;
}) {
  const reviewedLabel = locale === "ar" ? "راجعها" : "Reviewed by";
  const titleLabel = locale === "ar" ? "المؤسس · مطوّر رئيسي" : "Founder · Lead Developer";
  const dateLabel = locale === "ar" ? "آخر مراجعة" : "Last reviewed";
  return (
    <aside
      className="mt-6 flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 text-xs"
      aria-label={reviewedLabel}
    >
      <Image
        src="/author/sadeq.jpeg"
        alt="Sadeq Sayed Ahmad"
        width={32}
        height={32}
        className="rounded-full border border-[var(--color-gold)]/40 object-cover"
        style={{ width: 32, height: 32 }}
      />
      <div className="flex-1">
        <div className="text-[var(--color-text)]">
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
            {reviewedLabel}
          </span>{" "}
          <Link
            href="/about/sadeq"
            className="font-semibold text-[var(--color-gold)] hover:underline"
          >
            Sadeq Sayed Ahmad
          </Link>
          <span className="ms-1 text-[var(--color-text-dim)]">· {titleLabel}</span>
        </div>
        <div className="mt-0.5 text-[10px] text-[var(--color-text-dim)]">
          {dateLabel}: <time dateTime={lastReviewed}>{formatDate(lastReviewed, locale)}</time>
        </div>
      </div>
    </aside>
  );
}
