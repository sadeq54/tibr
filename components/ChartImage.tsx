import Image from "next/image";

import { SITE_URL, canonicalPath } from "@/lib/metadata";
import { currencyName } from "@/lib/seo";

export type ChartRange = "1m" | "3m" | "1y" | "5y" | "10y" | "max";

const RANGE_LABEL: Record<ChartRange, { en: string; ar: string }> = {
  "1m": { en: "1 month", ar: "شهر" },
  "3m": { en: "3 months", ar: "3 أشهر" },
  "1y": { en: "1 year", ar: "سنة" },
  "5y": { en: "5 years", ar: "5 سنوات" },
  "10y": { en: "10 years", ar: "10 سنوات" },
  max: { en: "since 2000", ar: "منذ 2000" },
};

/**
 * Server-rendered chart image (from /charts/gold/...) plus an "embed this
 * chart" snippet. The snippet carries a link back to the page that hosts the
 * chart — the same mechanism that built goldprice.org's backlink profile,
 * except ours is bilingual and branded.
 */
export function ChartImage({
  currency,
  locale,
  pagePath,
  range = "1y",
  unit = "oz",
}: {
  currency: string;
  locale: string;
  /** Locale-agnostic path of the hosting page (for the link-back). */
  pagePath: string;
  range?: ChartRange;
  unit?: "oz" | "g";
}) {
  const ar = locale === "ar";
  const cur = currencyName(currency, locale);
  const rangeLabel = ar ? RANGE_LABEL[range].ar : RANGE_LABEL[range].en;
  const unitLabel = unit === "g" ? (ar ? "للجرام" : "per gram") : ar ? "للأونصة" : "per troy ounce";
  const src = `/charts/gold/${currency.toLowerCase()}/${range}?lang=${locale}&unit=${unit}`;
  const alt = ar
    ? `رسم بياني لسعر الذهب بـ${cur} ${unitLabel} خلال ${rangeLabel}`
    : `Gold price chart in ${cur} ${unitLabel}, ${rangeLabel}`;
  const pageUrl = `${SITE_URL}${canonicalPath(locale, pagePath)}`;
  const embed =
    `<a href="${pageUrl}"><img src="${SITE_URL}${src}" width="1200" height="630" alt="${alt}" loading="lazy"></a>\n` +
    `<p style="font:12px sans-serif"><a href="${pageUrl}">${ar ? "المصدر: أسعار الذهب العربية" : "Source: Gold Prices Arabia"}</a></p>`;

  const ranges: ChartRange[] = ["1m", "1y", "5y", "10y", "max"];

  return (
    <figure className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={630}
        unoptimized
        loading="lazy"
        className="h-auto w-full"
      />
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] px-4 py-3 text-xs text-[var(--color-text-dim)]">
        <span>{alt}</span>
        <span className="flex items-center gap-1" dir="ltr">
          {ranges.map((r) => (
            <a
              key={r}
              href={`/charts/gold/${currency.toLowerCase()}/${r}?lang=${locale}&unit=${unit}`}
              target="_blank"
              rel="noopener"
              className={`num rounded-full px-2 py-0.5 font-mono ${r === range ? "bg-[var(--color-gold)]/15 text-[var(--color-gold)]" : "hover:text-[var(--color-text)]"}`}
            >
              {r.toUpperCase()}
            </a>
          ))}
        </span>
      </figcaption>
      <details className="border-t border-[var(--color-border)] px-4 py-3 text-xs">
        <summary className="cursor-pointer font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-gold)]">
          {ar ? "تضمين هذا الرسم في موقعك (مجانًا مع ذكر المصدر)" : "Embed this chart on your site (free, with attribution)"}
        </summary>
        <pre dir="ltr" className="mt-2 overflow-x-auto whitespace-pre-wrap break-all rounded-xl bg-[var(--color-bg)] p-3 font-mono text-[11px] leading-relaxed text-[var(--color-text-muted)]">
          <code>{embed}</code>
        </pre>
      </details>
    </figure>
  );
}
