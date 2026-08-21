"use client";

import { useState } from "react";

import { isRtl } from "@/i18n/routing";
import { countryName, sortedCountries } from "@/lib/countries";
import { pick } from "@/lib/i18n-text";
import { canonicalPath } from "@/lib/metadata";

const SITE = "https://goldpricesarabia.com";

const T = {
  heading: {
    en: "Build your gold price widget",
    ar: "أنشئ أداة سعر الذهب",
    fr: "Créez votre widget de prix de l'or",
    tr: "Altın fiyatı widget'ınızı oluşturun",
    ur: "اپنا سونے کی قیمت کا ویجٹ بنائیں",
    hi: "अपना सोने का भाव विजेट बनाएं",
  },
  lede: {
    en: "Pick a country and theme, then copy the code into your site. Free, lightweight, auto-updating.",
    ar: "اختر الدولة والمظهر، ثم انسخ الكود والصقه في موقعك. مجاني، خفيف، ويُحدَّث تلقائيًا.",
    fr: "Choisissez le pays et le thème, puis copiez le code dans votre site. Gratuit, léger, mis à jour automatiquement.",
    tr: "Ülke ve temayı seçin, kodu kopyalayıp sitenize yapıştırın. Ücretsiz, hafif, otomatik güncellenir.",
    ur: "ملک اور تھیم منتخب کریں، پھر کوڈ کاپی کر کے اپنی ویب سائٹ میں لگائیں۔ مفت، ہلکا اور خودکار اپڈیٹ۔",
    hi: "देश और थीम चुनें, फिर कोड कॉपी करके अपनी साइट में लगाएं। मुफ़्त, हल्का, अपने-आप अपडेट।",
  },
  country: { en: "Country", ar: "الدولة", fr: "Pays", tr: "Ülke", ur: "ملک", hi: "देश" },
  theme: { en: "Theme", ar: "المظهر", fr: "Thème", tr: "Tema", ur: "تھیم", hi: "थीम" },
  light: { en: "Light", ar: "فاتح", fr: "Clair", tr: "Açık", ur: "لائٹ", hi: "लाइट" },
  dark: { en: "Dark", ar: "داكن", fr: "Sombre", tr: "Koyu", ur: "ڈارک", hi: "डार्क" },
  preview: { en: "Live preview", ar: "معاينة حية", fr: "Aperçu en direct", tr: "Canlı önizleme", ur: "لائیو پیش منظر", hi: "लाइव प्रीव्यू" },
  embed: { en: "Embed code", ar: "كود التضمين", fr: "Code d'intégration", tr: "Gömme kodu", ur: "ایمبیڈ کوڈ", hi: "एम्बेड कोड" },
  copied: { en: "Copied ✓", ar: "تم النسخ ✓", fr: "Copié ✓", tr: "Kopyalandı ✓", ur: "کاپی ہو گیا ✓", hi: "कॉपी हो गया ✓" },
  copy: { en: "Copy code", ar: "نسخ الكود", fr: "Copier le code", tr: "Kodu kopyala", ur: "کوڈ کاپی کریں", hi: "कोड कॉपी करें" },
  dofollow: {
    en: "The link under the frame is a dofollow backlink — it stays outside the iframe so link equity reaches us. Please keep it.",
    ar: "الرابط أسفل الإطار رابط متابَع (dofollow) — يبقى خارج الـ iframe كي تنتقل قوة الرابط إلى موقعنا. لا تحذفه.",
    fr: "Le lien sous le cadre est un backlink dofollow — il reste hors de l'iframe pour que l'autorité du lien nous parvienne. Merci de le conserver.",
    tr: "Çerçevenin altındaki bağlantı dofollow bir geri bağlantıdır — bağlantı değeri bize ulaşsın diye iframe dışında durur. Lütfen kaldırmayın.",
    ur: "فریم کے نیچے والا لنک ڈو فالو بیک لنک ہے — یہ iframe سے باہر رہتا ہے تاکہ لنک کی طاقت ہم تک پہنچے۔ براہ کرم اسے نہ ہٹائیں۔",
    hi: "फ़्रेम के नीचे का लिंक एक dofollow बैकलिंक है — यह iframe के बाहर रहता है ताकि लिंक की ताक़त हम तक पहुँचे। कृपया इसे न हटाएं।",
  },
};

/** Keyword-rich anchor text pointing at the country page ("<Country> gold prices"). */
function anchorText(locale: string, cName: string) {
  return pick(locale, {
    en: `${cName} gold prices — Gold Prices Arabia`,
    ar: `أسعار الذهب في ${cName} — Gold Prices Arabia`,
    fr: `Prix de l'or ${cName} — Gold Prices Arabia`,
    tr: `${cName} altın fiyatları — Gold Prices Arabia`,
    ur: `${cName} میں سونے کی قیمتیں — Gold Prices Arabia`,
    hi: `${cName} में सोने का भाव — Gold Prices Arabia`,
  });
}

function iframeTitleText(locale: string, cName: string) {
  return pick(locale, {
    en: `Live gold price in ${cName}`,
    ar: `سعر الذهب المباشر في ${cName}`,
    fr: `Cours de l'or en direct – ${cName}`,
    tr: `${cName} canlı altın fiyatı`,
    ur: `${cName} میں سونے کی لائیو قیمت`,
    hi: `${cName} में लाइव सोने का भाव`,
  });
}

/**
 * Widget builder — webmaster-facing configurator for the embeddable ticker.
 *
 * Picks a country + theme, generates the embed HTML, and shows a live preview.
 * The generated snippet pairs the <iframe> with a plain dofollow <a> placed
 * OUTSIDE the iframe so the host page passes link equity to us — the iframe
 * itself is `noindex` and passes nothing. The anchor is keyword-rich
 * ("<Country> gold prices") and points at the real country page, not the
 * homepage, so the equity lands where we want it indexed.
 */
export function WidgetBuilder({ locale }: { locale: string }) {
  const rtl = isRtl(locale);
  const [slug, setSlug] = useState("saudi-arabia");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [copied, setCopied] = useState(false);

  const sorted = sortedCountries(locale);
  const country = sorted.find((x) => x.slug === slug) ?? sorted[0];
  const cName = countryName(country, locale);

  const embedSrc = `${SITE}${canonicalPath(locale, "/embed/ticker")}?country=${country.slug}&theme=${theme}`;
  const backlinkHref = `${SITE}${canonicalPath(locale, `/${country.slug}/gold-price/21k`)}`;
  const anchor = anchorText(locale, cName);
  const iframeTitle = iframeTitleText(locale, cName);

  const code =
    `<iframe src="${embedSrc}" width="100%" height="140" frameborder="0" ` +
    `loading="lazy" title="${iframeTitle}" ` +
    `style="border:0;overflow:hidden;max-width:440px"></iframe>\n` +
    `<div style="max-width:440px;margin-top:4px;font:12px/1.4 sans-serif;` +
    `text-align:${rtl ? "right" : "left"}">` +
    `<a href="${backlinkHref}" target="_blank" rel="noopener" ` +
    `style="color:#9a7209;text-decoration:none">${anchor}</a></div>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — the user can still select the textarea manually.
    }
  };

  const label = "text-xs font-semibold uppercase tracking-wider text-[var(--color-text-dim)]";
  const field =
    "mt-1.5 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] px-3 py-2 text-sm text-[var(--color-text)]";

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">
        {pick(locale, T.heading)}
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        {pick(locale, T.lede)}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <span className={label}>{pick(locale, T.country)}</span>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={field}
          >
            {sorted.map((x) => (
              <option key={x.slug} value={x.slug}>
                {countryName(x, locale)} · {x.currency}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className={label}>{pick(locale, T.theme)}</span>
          <div className="mt-1.5 flex gap-2">
            {(["light", "dark"] as const).map((tOpt) => (
              <button
                key={tOpt}
                type="button"
                onClick={() => setTheme(tOpt)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  theme === tOpt
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg-card-hover)] text-[var(--color-text-muted)]"
                }`}
              >
                {pick(locale, tOpt === "light" ? T.light : T.dark)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <span className={label}>{pick(locale, T.preview)}</span>
        <div className="mt-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-4">
          <iframe
            key={`${slug}-${theme}-${locale}`}
            src={embedSrc}
            width="100%"
            height={140}
            loading="lazy"
            title={iframeTitle}
            style={{ border: 0, overflow: "hidden", maxWidth: 440 }}
          />
          <div
            style={{
              maxWidth: 440,
              marginTop: 4,
              font: "12px/1.4 sans-serif",
              textAlign: rtl ? "right" : "left",
            }}
          >
            <a
              href={backlinkHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#9a7209", textDecoration: "none" }}
            >
              {anchor}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <span className={label}>{pick(locale, T.embed)}</span>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-gold)] transition hover:bg-[var(--color-gold)]/20"
          >
            {pick(locale, copied ? T.copied : T.copy)}
          </button>
        </div>
        <textarea
          readOnly
          value={code}
          onFocus={(e) => e.currentTarget.select()}
          rows={5}
          dir="ltr"
          className="mt-1.5 w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-3 font-mono text-[12px] leading-relaxed text-[var(--color-text)]"
        />
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
          {pick(locale, T.dofollow)}
        </p>
      </div>
    </section>
  );
}
