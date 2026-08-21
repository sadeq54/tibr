import { ArrowUpRight, TrendingUp } from "lucide-react";

import { isRtl } from "@/i18n/routing";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { bannersFor, xmAllowed, xmClickUrl, type XmLang } from "@/lib/xm-banners";

/**
 * Contextual XM affiliate CTA (text, not a banner) placed next to the bid/ask
 * gauge on price pages — the moment a reader is thinking "trade". Banner slots
 * suffer from blindness; a one-line offer with a clear button converts far
 * better. Carries the page as a sub-ID (`t=`) so the partner dashboard shows
 * which page/country produced the click. Hidden where XM does not onboard.
 */
const HEADING: LocaleText = {
  en: "Trade gold (XAUUSD) with XM",
  ar: "تداول الذهب (XAUUSD) مع XM",
  fr: "Tradez l'or (XAUUSD) avec XM",
  tr: "XM ile altın (XAUUSD) işlemi yapın",
  ur: "XM کے ساتھ سونے (XAUUSD) کی ٹریڈنگ کریں",
  hi: "XM के साथ सोने (XAUUSD) की ट्रेडिंग करें",
};
const BODY: LocaleText = {
  en: "Low spreads on gold, free demo account, deposits from $5. Regulated broker, Arabic support.",
  ar: "فروق أسعار منخفضة على الذهب، حساب تجريبي مجاني، إيداع يبدأ من 5 دولارات، دعم باللغة العربية.",
  fr: "Spreads réduits sur l'or, compte démo gratuit, dépôt dès 5 $. Courtier régulé.",
  tr: "Altında düşük spread, ücretsiz demo hesap, 5 $'dan başlayan yatırım. Lisanslı aracı kurum.",
  ur: "سونے پر کم اسپریڈ، مفت ڈیمو اکاؤنٹ، 5 ڈالر سے ڈپازٹ۔ لائسنس یافتہ بروکر۔",
  hi: "सोने पर कम स्प्रेड, मुफ़्त डेमो अकाउंट, $5 से जमा। विनियमित ब्रोकर।",
};
const BUTTON: LocaleText = {
  en: "Open a free account",
  ar: "افتح حساباً مجانياً",
  fr: "Ouvrir un compte gratuit",
  tr: "Ücretsiz hesap aç",
  ur: "مفت اکاؤنٹ کھولیں",
  hi: "मुफ़्त खाता खोलें",
};
const SPONSORED: LocaleText = { en: "Sponsored", ar: "إعلان برعاية", fr: "Sponsorisé", tr: "Sponsorlu", ur: "اشتہار", hi: "प्रायोजित" };
const RISK: LocaleText = {
  en: "Risk warning: CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. Gold Prices Arabia may earn a commission.",
  ar: "تحذير المخاطر: عقود الفروقات أدوات معقدة وتنطوي على مخاطر عالية لخسارة الأموال بسرعة بسبب الرافعة المالية. قد يحصل الموقع على عمولة.",
  fr: "Avertissement : les CFD sont des instruments complexes présentant un risque élevé de perte rapide en capital en raison de l'effet de levier. Le site peut percevoir une commission.",
  tr: "Risk uyarısı: CFD'ler karmaşık araçlardır ve kaldıraç nedeniyle hızla para kaybetme riski yüksektir. Site komisyon alabilir.",
  ur: "خطرے کی وارننگ: CFDs پیچیدہ آلات ہیں اور لیوریج کی وجہ سے تیزی سے رقم کھونے کا خطرہ زیادہ ہے۔ سائٹ کو کمیشن مل سکتا ہے۔",
  hi: "जोखिम चेतावनी: CFD जटिल साधन हैं और लीवरेज के कारण तेज़ी से पैसा खोने का जोखिम अधिक है। साइट को कमीशन मिल सकता है।",
};

const LOCALE_TO_XM: Record<string, XmLang> = { ar: "ar", en: "en", fr: "fr", tr: "tr", ur: "ur", hi: "hi" };

export function TradeGoldCta({
  locale,
  countrySlug,
  tag,
}: {
  locale: string;
  /** Country page slug — decides XM language and eligibility. */
  countrySlug?: string;
  /** Pathname or short label used as the sub-ID in the click URL. */
  tag: string;
}) {
  if (!xmAllowed(countrySlug)) return null;
  // Creative + landing page in the reader's language (the page locale), not the
  // country's — an Arabic reader on /india/... must not get a Hindi offer.
  const lang: XmLang = LOCALE_TO_XM[locale] ?? "en";
  const material = bannersFor(lang, 300, 250)[0] ?? bannersFor("en", 300, 250)[0];
  if (!material) return null;
  const href = xmClickUrl(material.id, material.lang, tag);
  const rtl = isRtl(locale);

  return (
    <aside
      aria-label={pick(locale, SPONSORED)}
      className="affiliate-bg card-shadow rounded-2xl border border-[var(--color-border)] p-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/15 text-[var(--color-gold)]">
          <TrendingUp size={20} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-[var(--color-text)]">{pick(locale, HEADING)}</h2>
            <span className="rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)] ring-1 ring-[var(--color-border)]">
              {pick(locale, SPONSORED)}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{pick(locale, BODY)}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          {pick(locale, BUTTON)}
          <ArrowUpRight size={14} aria-hidden className={rtl ? "-scale-x-100" : ""} />
        </a>
      </div>
      <p className="mt-3 text-[10px] leading-snug text-[var(--color-text-dim)]">{pick(locale, RISK)}</p>
    </aside>
  );
}
