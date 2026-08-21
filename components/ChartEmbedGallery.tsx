"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import { LOCALE_META, isRtl, localeMeta, routing } from "@/i18n/routing";
import { COUNTRIES, countryName, type Country } from "@/lib/countries";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { SITE_URL, canonicalPath } from "@/lib/metadata";

/** Currencies promoted to the top of the picker (same set as CurrencyTable). */
const MAJOR = [
  "USD", "SAR", "AED", "EGP", "JOD", "KWD", "QAR", "BHD",
  "GBP", "EUR", "TRY", "INR", "PKR", "MAD", "LYD", "LBP",
];

/** Languages the PNG route (`/charts/gold/...?lang=`) renders — all site locales. */
const CHART_LANGS = routing.locales;
type ChartLang = (typeof CHART_LANGS)[number];

const RANGES = ["1m", "3m", "1y", "5y", "10y", "max"] as const;
type Range = (typeof RANGES)[number];
type Unit = "oz" | "g";

const RANGE_LABEL: Record<Range, LocaleText> = {
  "1m": { en: "1 month", ar: "شهر", fr: "1 mois", tr: "1 ay", ur: "1 ماہ", hi: "1 महीना" },
  "3m": { en: "3 months", ar: "3 أشهر", fr: "3 mois", tr: "3 ay", ur: "3 ماہ", hi: "3 महीने" },
  "1y": { en: "1 year", ar: "سنة", fr: "1 an", tr: "1 yıl", ur: "1 سال", hi: "1 वर्ष" },
  "5y": { en: "5 years", ar: "5 سنوات", fr: "5 ans", tr: "5 yıl", ur: "5 سال", hi: "5 वर्ष" },
  "10y": { en: "10 years", ar: "10 سنوات", fr: "10 ans", tr: "10 yıl", ur: "10 سال", hi: "10 वर्ष" },
  max: { en: "since 2000", ar: "منذ 2000", fr: "depuis 2000", tr: "2000'den beri", ur: "2000 سے", hi: "2000 से" },
};

const UNIT_LABEL: Record<Unit, LocaleText> = {
  oz: { en: "per troy ounce", ar: "للأونصة", fr: "par once troy", tr: "ons başına", ur: "فی ٹرائے اونس", hi: "प्रति ट्रॉय औंस" },
  g: { en: "per gram", ar: "للجرام", fr: "par gramme", tr: "gram başına", ur: "فی گرام", hi: "प्रति ग्राम" },
};

const UNIT_SHORT: Record<Unit, LocaleText> = {
  oz: { en: "Troy ounce", ar: "أونصة", fr: "Once", tr: "Ons", ur: "اونس", hi: "औंस" },
  g: { en: "Gram", ar: "جرام", fr: "Gramme", tr: "Gram", ur: "گرام", hi: "ग्राम" },
};

/** Popular presets rendered as a thumbnail grid under the builder. */
const PRESETS: { slug: string; range: Range }[] = [
  { slug: "saudi-arabia", range: "1y" },
  { slug: "uae", range: "1y" },
  { slug: "egypt", range: "1y" },
  { slug: "jordan", range: "1y" },
  { slug: "usa", range: "10y" },
  { slug: "turkey", range: "5y" },
];

const T = {
  title: { en: "Free gold price chart images", ar: "صور مخططات أسعار الذهب مجانًا", fr: "Graphiques du cours de l'or gratuits (images)", tr: "Ücretsiz altın fiyatı grafik görselleri", ur: "مفت سونے کی قیمت کے چارٹ امیجز", hi: "मुफ़्त सोने के भाव चार्ट इमेज" },
  intro: {
    en: "Pick a currency, range and language. Copy the snippet — a live, branded PNG that updates itself — and paste it into any page. Free with attribution.",
    ar: "اختر العملة والمدة واللغة، ثم انسخ الكود — صورة PNG تتحدث تلقائيًا — والصقه في أي صفحة. مجاني مع ذكر المصدر.",
    fr: "Choisissez la devise, la période et la langue. Copiez l'extrait — un PNG qui se met à jour tout seul — et collez-le sur n'importe quelle page. Gratuit avec attribution.",
    tr: "Para birimi, aralık ve dil seçin. Kodu kopyalayın — kendini güncelleyen markalı bir PNG — ve herhangi bir sayfaya yapıştırın. Kaynak belirtilerek ücretsiz.",
    ur: "کرنسی، مدت اور زبان منتخب کریں۔ کوڈ کاپی کریں — خودکار اپ ڈیٹ ہونے والی PNG — اور کسی بھی صفحے پر پیسٹ کریں۔ حوالے کے ساتھ مفت۔",
    hi: "मुद्रा, अवधि और भाषा चुनें। स्निपेट कॉपी करें — अपने-आप अपडेट होने वाली PNG — और किसी भी पेज पर पेस्ट करें। श्रेय के साथ मुफ़्त।",
  },
  currency: { en: "Currency", ar: "العملة", fr: "Devise", tr: "Para birimi", ur: "کرنسی", hi: "मुद्रा" },
  majors: { en: "Major currencies", ar: "العملات الرئيسية", fr: "Devises principales", tr: "Başlıca para birimleri", ur: "اہم کرنسیاں", hi: "प्रमुख मुद्राएँ" },
  all: { en: "All countries", ar: "كل الدول", fr: "Tous les pays", tr: "Tüm ülkeler", ur: "تمام ممالک", hi: "सभी देश" },
  range: { en: "Range", ar: "المدة", fr: "Période", tr: "Aralık", ur: "مدت", hi: "अवधि" },
  lang: { en: "Chart language", ar: "لغة المخطط", fr: "Langue du graphique", tr: "Grafik dili", ur: "چارٹ کی زبان", hi: "चार्ट की भाषा" },
  unit: { en: "Unit", ar: "الوحدة", fr: "Unité", tr: "Birim", ur: "اکائی", hi: "इकाई" },
  preview: { en: "Live preview", ar: "معاينة حية", fr: "Aperçu en direct", tr: "Canlı önizleme", ur: "لائیو پیش منظر", hi: "लाइव पूर्वावलोकन" },
  openPng: { en: "Open PNG", ar: "فتح الصورة", fr: "Ouvrir le PNG", tr: "PNG'yi aç", ur: "PNG کھولیں", hi: "PNG खोलें" },
  code: { en: "Embed code", ar: "كود التضمين", fr: "Code d'intégration", tr: "Gömme kodu", ur: "ایمبیڈ کوڈ", hi: "एम्बेड कोड" },
  copy: { en: "Copy code", ar: "نسخ الكود", fr: "Copier le code", tr: "Kodu kopyala", ur: "کوڈ کاپی کریں", hi: "कोड कॉपी करें" },
  copied: { en: "Copied ✓", ar: "تم النسخ ✓", fr: "Copié ✓", tr: "Kopyalandı ✓", ur: "کاپی ہو گیا ✓", hi: "कॉपी हो गया ✓" },
  keep: {
    en: "The link under the chart is a dofollow backlink to the source page — the only thing we ask in return. Please keep it.",
    ar: "الرابط أسفل المخطط رابط متابَع (dofollow) إلى صفحة المصدر — هو كل ما نطلبه في المقابل. لا تحذفه.",
    fr: "Le lien sous le graphique est un backlink dofollow vers la page source — c'est tout ce que nous demandons en retour. Merci de le conserver.",
    tr: "Grafiğin altındaki bağlantı kaynak sayfaya giden dofollow bir geri bağlantıdır — karşılığında istediğimiz tek şey budur. Lütfen kaldırmayın.",
    ur: "چارٹ کے نیچے والا لنک ماخذ صفحے کا dofollow بیک لنک ہے — بدلے میں ہم بس یہی مانگتے ہیں۔ براہ کرم اسے نہ ہٹائیں۔",
    hi: "चार्ट के नीचे का लिंक स्रोत पेज का dofollow बैकलिंक है — बदले में हम बस यही चाहते हैं। कृपया इसे हटाएँ नहीं।",
  },
  popular: { en: "Popular charts", ar: "المخططات الأكثر طلبًا", fr: "Graphiques populaires", tr: "Popüler grafikler", ur: "مقبول چارٹس", hi: "लोकप्रिय चार्ट" },
  chartBy: { en: "chart by Gold Prices Arabia", ar: "رسم بياني من Gold Prices Arabia", fr: "graphique par Gold Prices Arabia", tr: "grafik: Gold Prices Arabia", ur: "چارٹ: Gold Prices Arabia", hi: "चार्ट: Gold Prices Arabia" },
  k24: { en: "24K gold price today", ar: "سعر الذهب عيار 24 اليوم", fr: "Cours de l'or 24 carats aujourd'hui", tr: "24 ayar altın fiyatı bugün", ur: "24 قیراط سونے کی آج کی قیمت", hi: "24 कैरेट सोने का भाव आज" },
} satisfies Record<string, LocaleText>;

/** Localized country name; ar/en keep the SEO-tuned names from COUNTRIES. */
function localCountryName(c: Country, locale: string): string {
  if (locale === "ar" || locale === "en") return countryName(c, locale);
  try {
    return new Intl.DisplayNames(localeMeta(locale).intl, { type: "region" }).of(c.cc) ?? c.name_en;
  } catch {
    return c.name_en;
  }
}

function localCurrencyName(code: string, locale: string): string {
  try {
    return new Intl.DisplayNames(localeMeta(locale).intl, { type: "currency" }).of(code) ?? code;
  } catch {
    return code;
  }
}

function goldPriceIn(country: string, locale: string): string {
  return pick(locale, {
    en: `Gold price in ${country} today`,
    ar: `سعر الذهب اليوم في ${country}`,
    fr: `Cours de l'or aujourd'hui — ${country}`,
    tr: `${country} bugün altın fiyatı`,
    ur: `آج ${country} میں سونے کی قیمت`,
    hi: `${country} में सोने का भाव आज`,
  });
}

/**
 * Chart-embed gallery — the backlink engine. Every snippet wraps a live PNG
 * from `/charts/gold/{cur}/{range}` in a plain dofollow anchor to the country
 * page for that currency (USD → the global 24K page), plus a keyword-rich
 * attribution line outside the image. Same play that built goldprice.org's
 * link profile, but bilingual and branded.
 */
export function ChartEmbedGallery({ locale }: { locale: string }) {
  const rtl = isRtl(locale);
  const [slug, setSlug] = useState("saudi-arabia");
  const [range, setRange] = useState<Range>("1y");
  const [lang, setLang] = useState<ChartLang>(
    (CHART_LANGS as readonly string[]).includes(locale) ? (locale as ChartLang) : "en",
  );
  const [unit, setUnit] = useState<Unit>("oz");
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const { majors, rest } = useMemo(() => {
    const majors = MAJOR.map((cur) => COUNTRIES.find((c) => c.currency === cur)).filter((c): c is Country => Boolean(c));
    const majorSlugs = new Set(majors.map((c) => c.slug));
    const rest = COUNTRIES.filter((c) => !majorSlugs.has(c.slug)).sort((a, b) =>
      localCountryName(a, locale).localeCompare(localCountryName(b, locale), localeMeta(locale).intl),
    );
    return { majors, rest };
  }, [locale]);

  const country = COUNTRIES.find((c) => c.slug === slug) ?? COUNTRIES[0];
  const cur = country.currency;
  const cName = localCountryName(country, locale);
  const pagePath = cur === "USD" ? "/gold-price/24k" : `/${country.slug}/gold-price/21k`;
  const pageUrl = `${SITE_URL}${canonicalPath(locale, pagePath)}`;
  const imgPath = `/charts/gold/${cur.toLowerCase()}/${range}?lang=${lang}&unit=${unit}`;
  const imgUrl = `${SITE_URL}${imgPath}`;

  const alt = pick(locale, {
    en: `Gold price chart in ${localCurrencyName(cur, "en")} ${UNIT_LABEL[unit].en}, ${RANGE_LABEL[range].en}`,
    ar: `رسم بياني لسعر الذهب بـ${localCurrencyName(cur, "ar")} ${UNIT_LABEL[unit].ar} خلال ${RANGE_LABEL[range].ar}`,
    fr: `Graphique du cours de l'or en ${localCurrencyName(cur, "fr")} ${UNIT_LABEL[unit].fr}, ${RANGE_LABEL[range].fr}`,
    tr: `${localCurrencyName(cur, "tr")} cinsinden altın fiyatı grafiği, ${UNIT_LABEL[unit].tr}, ${RANGE_LABEL[range].tr}`,
    ur: `${localCurrencyName(cur, "ur")} میں سونے کی قیمت کا چارٹ، ${UNIT_LABEL[unit].ur}، ${RANGE_LABEL[range].ur}`,
    hi: `${localCurrencyName(cur, "hi")} में सोने के भाव का चार्ट, ${UNIT_LABEL[unit].hi}, ${RANGE_LABEL[range].hi}`,
  });
  const anchor = `${cur === "USD" ? pick(locale, T.k24) : goldPriceIn(cName, locale)} — ${pick(locale, T.chartBy)}`;

  const code =
    `<a href="${pageUrl}" rel="noopener"><img src="${imgUrl}" alt="${alt.replace(/"/g, "&quot;")}" width="1200" height="630" loading="lazy" style="max-width:100%;height:auto"></a>\n` +
    `<p dir="${rtl ? "rtl" : "ltr"}" style="font:12px/1.4 sans-serif;margin:4px 0"><a href="${pageUrl}" rel="noopener">${anchor}</a></p>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard API blocked (http, permissions) — fall back to select + execCommand.
      const el = codeRef.current;
      if (!el) return;
      el.select();
      try {
        document.execCommand("copy");
      } catch {
        return;
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const label = "text-xs font-semibold uppercase tracking-wider text-[var(--color-text-dim)]";
  const field =
    "mt-1.5 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] px-3 py-2 text-sm text-[var(--color-text)]";
  const pill = (on: boolean) =>
    `rounded-lg border px-3 py-2 text-sm font-medium transition ${
      on
        ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
        : "border-[var(--color-border)] bg-[var(--color-bg-card-hover)] text-[var(--color-text-muted)]"
    }`;

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">{pick(locale, T.title)}</h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{pick(locale, T.intro)}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>{pick(locale, T.currency)}</span>
          <select value={slug} onChange={(e) => setSlug(e.target.value)} className={field}>
            <optgroup label={pick(locale, T.majors)}>
              {majors.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {localCountryName(c, locale)} · {c.currency}
                </option>
              ))}
            </optgroup>
            <optgroup label={pick(locale, T.all)}>
              {rest.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {localCountryName(c, locale)} · {c.currency}
                </option>
              ))}
            </optgroup>
          </select>
        </label>

        <label className="block">
          <span className={label}>{pick(locale, T.range)}</span>
          <select value={range} onChange={(e) => setRange(e.target.value as Range)} className={field}>
            {RANGES.map((r) => (
              <option key={r} value={r}>
                {pick(locale, RANGE_LABEL[r])} ({r.toUpperCase()})
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className={label}>{pick(locale, T.lang)}</span>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {CHART_LANGS.map((l) => (
              <button key={l} type="button" onClick={() => setLang(l)} className={pill(lang === l)}>
                {LOCALE_META[l].name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className={label}>{pick(locale, T.unit)}</span>
          <div className="mt-1.5 flex gap-2">
            {(["oz", "g"] as const).map((u) => (
              <button key={u} type="button" onClick={() => setUnit(u)} className={`flex-1 ${pill(unit === u)}`}>
                {pick(locale, UNIT_SHORT[u])}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <span className={label}>{pick(locale, T.preview)}</span>
          <a
            href={imgPath}
            target="_blank"
            rel="noopener"
            className="text-xs font-semibold text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold)]"
          >
            {pick(locale, T.openPng)} ↗
          </a>
        </div>
        <figure className="mt-1.5 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]">
          <Image
            key={imgPath}
            src={imgPath}
            alt={alt}
            width={1200}
            height={630}
            unoptimized
            loading="lazy"
            className="h-auto w-full"
          />
          <figcaption className="px-3 py-2 text-xs text-[var(--color-text-dim)]">
            <a href={pageUrl} rel="noopener" className="hover:text-[var(--color-gold)]">
              {anchor}
            </a>
          </figcaption>
        </figure>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <span className={label}>{pick(locale, T.code)}</span>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-gold)] transition hover:bg-[var(--color-gold)]/20"
          >
            {copied ? pick(locale, T.copied) : pick(locale, T.copy)}
          </button>
        </div>
        <textarea
          ref={codeRef}
          readOnly
          value={code}
          onFocus={(e) => e.currentTarget.select()}
          rows={4}
          dir="ltr"
          aria-label={pick(locale, T.code)}
          className="mt-1.5 w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-3 font-mono text-[12px] leading-relaxed text-[var(--color-text)]"
        />
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">{pick(locale, T.keep)}</p>
      </div>

      <div className="mt-8">
        <span className={label}>{pick(locale, T.popular)}</span>
        <ul className="mt-1.5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PRESETS.map((p) => {
            const c = COUNTRIES.find((x) => x.slug === p.slug);
            if (!c) return null;
            const src = `/charts/gold/${c.currency.toLowerCase()}/${p.range}?lang=${lang}&unit=${unit}`;
            const active = p.slug === slug && p.range === range;
            return (
              <li key={`${p.slug}-${p.range}`}>
                <button
                  type="button"
                  onClick={() => {
                    setSlug(p.slug);
                    setRange(p.range);
                  }}
                  aria-pressed={active}
                  className={`block w-full overflow-hidden rounded-lg border text-start transition ${
                    active ? "border-[var(--color-gold)]" : "border-[var(--color-border)] hover:border-[var(--color-gold)]/60"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${localCountryName(c, locale)} · ${c.currency} · ${pick(locale, RANGE_LABEL[p.range])}`}
                    width={600}
                    height={315}
                    unoptimized
                    loading="lazy"
                    className="h-auto w-full"
                  />
                  <span className="block px-2 py-1.5 text-[11px] text-[var(--color-text-muted)]">
                    {localCountryName(c, locale)} · {c.currency} · {pick(locale, RANGE_LABEL[p.range])}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
