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
  const messages = (locale === "ar" ? arMessages : enMessages) as unknown as Record<
    string,
    Record<string, string>
  >;
  const tPage = createTranslator({ locale, namespace: "CountryPage", messages });
  const upper = karat.toUpperCase();
  // Arabic convention is "عيار 21" (no K suffix); English keeps "21K".
  const kAr = upper.replace("K", "");
  const kLabel = locale === "ar" ? kAr : upper;
  const name = countryName(country, locale);
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
        href={locale === "en" ? "/en" : "/"}
        className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-gold)]"
      >
        <Flag cc={country.cc} size={12} className="me-1" />
        {name}
      </a>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
        {tPage("h1", { karat: kLabel, country: name })}
      </h1>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
        {tPage("intro", {
          karat: kLabel,
          country: name,
          currency: country.currency,
        })}
      </p>
      <div className="mt-3 inline-block rounded-md border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1.5 text-xs text-[var(--color-gold)]">
        {tPage("currencyNote", { currency: country.currency })}
      </div>
      </header>
      ) : null}

      {showContent ? (
        <>
      {note ? (
        <section
          aria-label={locale === "ar" ? "ملاحظات السوق المحلي" : "Local market notes"}
          className="border-s-2 border-[var(--color-gold)]/50 ps-4"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
            {locale === "ar" ? `سوق الذهب في ${name}` : `${name} gold market`}
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
          {locale === "ar"
            ? `أسئلة شائعة عن سعر الذهب عيار ${kAr} في ${name}`
            : `Common questions about ${upper} gold in ${name}`}
        </h2>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-[var(--color-text)]">
              {locale === "ar"
                ? `كيف يُحسب سعر الذهب عيار ${kAr} في ${name}؟`
                : `How is the ${upper} gold price in ${name} calculated?`}
            </dt>
            <dd className="mt-1 leading-relaxed text-[var(--color-text-muted)]">
              {locale === "ar"
                ? `يُحسب سعر عيار ${kAr} للجرام في ${name} عبر معادلة: السعر الفوري للأونصة (XAU/USD) ÷ 31.1035 جرام × نسبة نقاء العيار × سعر صرف ${country.currency}/USD. السعر الفوري مأخوذ من Binance و Coinbase و Kraken عبر PAXG/USD، ومُحدّث كل ثانية تقريبًا.`
                : `The ${upper} per-gram price in ${name} is computed as: spot ounce price (XAU/USD) ÷ 31.1035 g × purity ratio × ${country.currency}/USD FX rate. The spot price is sourced from Binance, Coinbase and Kraken via PAXG/USD, refreshed every second.`}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[var(--color-text)]">
              {locale === "ar"
                ? `لماذا يختلف سعر الذهب بين محلات ${name}؟`
                : `Why does the gold price differ between shops in ${name}?`}
            </dt>
            <dd className="mt-1 leading-relaxed text-[var(--color-text-muted)]">
              {locale === "ar"
                ? `السعر الفوري متطابق لدى جميع المحلات. الفرق ينشأ من ثلاثة عوامل: (1) المصنعية (5-30 وحدة عملة محلية للجرام)، (2) هامش بائع التجزئة (3-10%)، (3) ضريبة محلية إن وجدت. السعر المعروض هنا هو الحد الأدنى المرجعي قبل أي إضافات.`
                : `The raw spot price is the same across all shops. Differences come from three factors: (1) making charges (5-30 local units per gram), (2) retailer margin (3-10%), (3) local tax if applicable. The price shown here is the floor reference before any add-ons.`}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[var(--color-text)]">
              {locale === "ar"
                ? `كم مرة يُحدّث سعر الذهب لـ${name}؟`
                : `How often is the ${name} gold price updated?`}
            </dt>
            <dd className="mt-1 leading-relaxed text-[var(--color-text-muted)]">
              {locale === "ar"
                ? `السعر الفوري للأونصة يُحدّث لحظيًا عبر WebSocket (عدة مرات بالثانية). سعر صرف ${country.currency}/USD يُحدّث كل ساعة من بيانات البنوك المركزية المفتوحة. الجدول أعلاه يعكس آخر سعر متاح.`
                : `The spot ounce price refreshes in real time via WebSocket (multiple times per second). The ${country.currency}/USD FX rate refreshes hourly from open central-bank data. The table above reflects the latest available price.`}
            </dd>
          </div>
        </dl>
      </section>
        </>
      ) : null}
    </>
  );
}
