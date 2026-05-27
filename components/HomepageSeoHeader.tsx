import type React from "react";
import { createTranslator } from "next-intl";

import arMessages from "@/messages/ar.json";
import enMessages from "@/messages/en.json";

import { Flag } from "@/components/Flag";
import { canonicalPath } from "@/lib/metadata";

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

const MENA_COUNTRIES: Array<{ slug: string; cc: string; en: string; ar: string }> = [
  { slug: "saudi-arabia", cc: "SA", en: "Saudi Arabia", ar: "السعودية" },
  { slug: "uae", cc: "AE", en: "UAE", ar: "الإمارات" },
  { slug: "egypt", cc: "EG", en: "Egypt", ar: "مصر" },
  { slug: "jordan", cc: "JO", en: "Jordan", ar: "الأردن" },
  { slug: "kuwait", cc: "KW", en: "Kuwait", ar: "الكويت" },
  { slug: "qatar", cc: "QA", en: "Qatar", ar: "قطر" },
  { slug: "bahrain", cc: "BH", en: "Bahrain", ar: "البحرين" },
  { slug: "lebanon", cc: "LB", en: "Lebanon", ar: "لبنان" },
  { slug: "morocco", cc: "MA", en: "Morocco", ar: "المغرب" },
  { slug: "libya", cc: "LY", en: "Libya", ar: "ليبيا" },
];

const STATIC_FAQS_EN = [
  {
    q: "What is the spot gold price?",
    a: "Spot gold (XAU/USD) is the live raw gold price per troy ounce (31.1035 g) on the global market. Gold Prices Arabia aggregates the median across Binance, Coinbase and Kraken via PAXG/USD, refreshed every second.",
  },
  {
    q: "How is gold priced per gram in local currency?",
    a: "Per-gram price = (XAU/USD ÷ 31.1035) × karat purity × USD-to-local FX. We compute this live for 46 countries across SAR, AED, EGP, JOD, KWD, QAR, BHD and 40+ currencies.",
  },
  {
    q: "Which karats does Gold Prices Arabia cover?",
    a: "24K (99.9% pure), 21K (87.5%), 18K (75%) and 14K (58.3%) — the four most-traded retail karats across MENA jewellery markets.",
  },
];

const STATIC_FAQS_AR = [
  {
    q: "ما هو السعر الفوري للذهب؟",
    a: "السعر الفوري للذهب (XAU/USD) هو سعر الذهب الخام للأونصة الترويسية (31.1035 جرام) في السوق العالمية. تجمع Gold Prices Arabia المتوسط من Binance و Coinbase و Kraken عبر زوج PAXG/USD، محدّث كل ثانية.",
  },
  {
    q: "كيف يُحسب سعر الجرام بالعملة المحلية؟",
    a: "سعر الجرام = (XAU/USD ÷ 31.1035) × نسبة نقاء العيار × سعر صرف الدولار للعملة المحلية. نحسبه لحظيًا لـ46 دولة بـSAR وAED وEGP وJOD وKWD وQAR وBHD وأكثر من 40 عملة.",
  },
  {
    q: "ما العيارات التي تغطيها Gold Prices Arabia؟",
    a: "عيار 24 (نقاء 99.9%) و21 (87.5%) و18 (75%) و14 (58.3%) — أكثر أربعة عيارات تداولًا في أسواق المجوهرات بالشرق الأوسط وشمال أفريقيا.",
  },
];

export function HomepageSeoHeader({ locale }: { locale: string }) {
  // SYNCHRONOUS. Async components stream as hidden Suspense reveals AFTER
  // </main>, which non-JS crawlers (Seobility, Bing fallback, AI bots) skip
  // → "0 words, 0 H1, 0 links". Sync = inlined directly in static prerender.
  const messages = (locale === "ar" ? arMessages : enMessages) as unknown as Record<
    string,
    Record<string, string>
  >;
  const t = createTranslator({ locale, namespace: "Page", messages });
  const ar = locale === "ar";

  const links: Array<{ href: string; label: React.ReactNode }> = [
    { href: "/gold-price/24k", label: "24K" },
    { href: "/gold-price/21k", label: "21K" },
    { href: "/gold-price/18k", label: "18K" },
    { href: "/gold-price/14k", label: "14K" },
    { href: "/spot-gold", label: ar ? "السعر الفوري" : "Spot Gold" },
    { href: "/gold-price-chart", label: ar ? "الرسم البياني" : "Chart" },
    { href: "/gold-calculator", label: ar ? "الحاسبة" : "Calculator" },
    { href: "/gold-price", label: ar ? "أسعار حسب الدولة" : "By country" },
    { href: "/news", label: ar ? "الأخبار" : "News" },
    { href: "/methodology", label: ar ? "المنهجية" : "Methodology" },
  ];

  const faqs = ar ? STATIC_FAQS_AR : STATIC_FAQS_EN;

  return (
    <>
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)]">
          {t("h1")}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          {t.rich("intro", {
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
          aria-label={ar ? "روابط سريعة" : "Quick links"}
          className="mt-4 flex flex-wrap gap-2 text-sm"
        >
          {links.map((item) => (
            <a
              key={item.href}
              href={canonicalPath(locale, item.href)}
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5 px-4 py-2 font-medium text-[var(--color-gold)] transition hover:bg-[var(--color-gold)]/15"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

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
          {ar ? "ما الذي يقدمه Gold Prices Arabia" : "What Gold Prices Arabia delivers"}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {ar ? (
            <>
              نحن نوفر <strong>أسعار الذهب الحية</strong> لـ46 دولة و40+ عملة،
              مأخوذة لحظيًا من <strong>Binance</strong> و
              <strong> Coinbase</strong> و<strong> Kraken</strong> عبر زوج
              PAXG/USD المدعوم 1:1 بسبائك ذهب فيزيائية في خزائن Brink&apos;s.
              يُحدّث السعر <strong>كل ثانية تقريبًا</strong>، ويُحوَّل تلقائيًا
              للعملة المحلية لكل دولة. نُغطي العيارات الأربعة الرئيسية: 24
              و21 و18 و14، وكذلك أسعار الفضة والبلاتين والبلاديوم.
            </>
          ) : (
            <>
              We aggregate <strong>live gold prices</strong> for 46 countries
              and 40+ currencies, streamed in real time from{" "}
              <strong>Binance</strong>, <strong>Coinbase</strong> and{" "}
              <strong>Kraken</strong> via the PAXG/USD pair — a token backed
              1:1 by physical bullion in Brink&apos;s vaults. Prices refresh{" "}
              <strong>every second</strong> and convert automatically into each
              country&apos;s currency. We cover the four most-traded karats —
              24K, 21K, 18K, 14K — plus silver, platinum and palladium.
            </>
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
          {ar ? "تغطية لحظية في الشرق الأوسط وشمال أفريقيا" : "Live MENA coverage"}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {ar
            ? "تصفح أسعار الذهب الحية لأكبر أسواق المنطقة — السعودية والإمارات ومصر والأردن والكويت وقطر والبحرين ولبنان والمغرب وليبيا — مع تحويل تلقائي للعملة المحلية وعرض جميع العيارات للجرام وللأونصة."
            : "Browse live gold rates for the region's biggest markets — Saudi Arabia, UAE, Egypt, Jordan, Kuwait, Qatar, Bahrain, Lebanon, Morocco and Libya — with automatic local-currency conversion and every karat shown per gram and per troy ounce."}
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {MENA_COUNTRIES.map((c) => (
            <li key={c.slug}>
              <a
                href={canonicalPath(locale, `/${c.slug}/gold-price/21k`)}
                className="flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] px-3 py-2 text-sm text-[var(--color-text)] hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]"
              >
                <Flag cc={c.cc} size={14} />
                <span>{ar ? c.ar : c.en}</span>
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
          {ar ? "أسئلة شائعة" : "Frequently asked questions"}
        </h2>
        <dl className="mt-4 space-y-4">
          {faqs.map((f) => (
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
  );
}
