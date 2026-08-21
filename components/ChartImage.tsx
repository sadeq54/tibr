import Image from "next/image";

import { pick, type LocaleText } from "@/lib/i18n-text";
import { SITE_URL, canonicalPath } from "@/lib/metadata";
import { currencyName } from "@/lib/seo";

export type ChartRange = "1m" | "3m" | "1y" | "5y" | "10y" | "max";

const RANGE_LABEL: Record<ChartRange, LocaleText> = {
  "1m": { en: "1 month", ar: "شهر", fr: "1 mois", tr: "1 ay", ur: "1 ماہ", hi: "1 महीना" },
  "3m": { en: "3 months", ar: "3 أشهر", fr: "3 mois", tr: "3 ay", ur: "3 ماہ", hi: "3 महीने" },
  "1y": { en: "1 year", ar: "سنة", fr: "1 an", tr: "1 yıl", ur: "1 سال", hi: "1 साल" },
  "5y": { en: "5 years", ar: "5 سنوات", fr: "5 ans", tr: "5 yıl", ur: "5 سال", hi: "5 साल" },
  "10y": { en: "10 years", ar: "10 سنوات", fr: "10 ans", tr: "10 yıl", ur: "10 سال", hi: "10 साल" },
  max: { en: "since 2000", ar: "منذ 2000", fr: "depuis 2000", tr: "2000'den beri", ur: "2000 سے", hi: "2000 से" },
};

const UNIT_LABEL: Record<"oz" | "g", LocaleText> = {
  g: { en: "per gram", ar: "للجرام", fr: "au gramme", tr: "gram başına", ur: "فی گرام", hi: "प्रति ग्राम" },
  oz: { en: "per troy ounce", ar: "للأونصة", fr: "à l'once troy", tr: "troy ons başına", ur: "فی ٹرائے اونس", hi: "प्रति ट्रॉय औंस" },
};

const ATTRIBUTION: LocaleText = {
  en: "Source: Gold Prices Arabia",
  ar: "المصدر: أسعار الذهب العربية",
  fr: "Source : Gold Prices Arabia",
  tr: "Kaynak: Gold Prices Arabia",
  ur: "ماخذ: Gold Prices Arabia",
  hi: "स्रोत: Gold Prices Arabia",
};

const EMBED_SUMMARY: LocaleText = {
  en: "Embed this chart on your site (free, with attribution)",
  ar: "تضمين هذا الرسم في موقعك (مجانًا مع ذكر المصدر)",
  fr: "Intégrer ce graphique sur votre site (gratuit, avec attribution)",
  tr: "Bu grafiği sitenize ekleyin (ücretsiz, kaynak belirterek)",
  ur: "یہ چارٹ اپنی سائٹ پر لگائیں (مفت، ماخذ کے ذکر کے ساتھ)",
  hi: "यह चार्ट अपनी साइट पर लगाएं (मुफ़्त, स्रोत उल्लेख के साथ)",
};

function altText(locale: string, cur: string, unitLabel: string, rangeLabel: string): string {
  return pick(locale, {
    en: `Gold price chart in ${cur} ${unitLabel}, ${rangeLabel}`,
    ar: `رسم بياني لسعر الذهب بـ${cur} ${unitLabel} خلال ${rangeLabel}`,
    fr: `Graphique du cours de l'or en ${cur} ${unitLabel}, ${rangeLabel}`,
    tr: `${cur} cinsinden ${unitLabel} altın fiyat grafiği, ${rangeLabel}`,
    ur: `${cur} میں ${unitLabel} سونے کی قیمت کا چارٹ، ${rangeLabel}`,
    hi: `${cur} में ${unitLabel} सोने के भाव का चार्ट, ${rangeLabel}`,
  });
}

/**
 * Server-rendered chart image (from /charts/gold/...) plus an "embed this
 * chart" snippet. The snippet carries a link back to the page that hosts the
 * chart — the same mechanism that built goldprice.org's backlink profile,
 * except ours is multilingual and branded.
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
  const cur = currencyName(currency, locale);
  const rangeLabel = pick(locale, RANGE_LABEL[range]);
  const unitLabel = pick(locale, UNIT_LABEL[unit]);
  // `lang` is the page locale — the chart route renders its own labels per locale.
  const src = `/charts/gold/${currency.toLowerCase()}/${range}?lang=${locale}&unit=${unit}`;
  const alt = altText(locale, cur, unitLabel, rangeLabel);
  const pageUrl = `${SITE_URL}${canonicalPath(locale, pagePath)}`;
  const embed =
    `<a href="${pageUrl}"><img src="${SITE_URL}${src}" width="1200" height="630" alt="${alt}" loading="lazy"></a>\n` +
    `<p style="font:12px sans-serif"><a href="${pageUrl}">${pick(locale, ATTRIBUTION)}</a></p>`;

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
          {pick(locale, EMBED_SUMMARY)}
        </summary>
        <pre dir="ltr" className="mt-2 overflow-x-auto whitespace-pre-wrap break-all rounded-xl bg-[var(--color-bg)] p-3 font-mono text-[11px] leading-relaxed text-[var(--color-text-muted)]">
          <code>{embed}</code>
        </pre>
      </details>
    </figure>
  );
}
