import { localeMeta } from "@/i18n/routing";
import { pick } from "@/lib/i18n-text";

/** Title / H1 / meta description. ar + en mirror `HistoricalPage` messages. */
export function yearPageText(locale: string, year: string | number) {
  const title = pick(locale, {
    en: `Historical Gold Prices · ${year}`,
    ar: `سجل أسعار الذهب · ${year}`,
    fr: `Prix historiques de l'or · ${year}`,
    tr: `Geçmiş altın fiyatları · ${year}`,
    ur: `سونے کی تاریخی قیمتیں · ${year}`,
    hi: `सोने के ऐतिहासिक भाव · ${year}`,
  });
  return {
    title,
    h1: title,
    description: pick(locale, {
      en: `Historical gold prices for ${year} — daily OHLC data per karat across multiple currencies.`,
      ar: `سجل أسعار الذهب لعام ${year} — بيانات OHLC اليومية لكل عيار عبر عدة عملات.`,
      fr: `Prix historiques de l'or en ${year} — données OHLC quotidiennes par carat dans plusieurs devises.`,
      tr: `${year} yılı geçmiş altın fiyatları — birden fazla para biriminde ayar bazında günlük OHLC verileri.`,
      ur: `${year} کی سونے کی تاریخی قیمتیں — متعدد کرنسیوں میں فی قیراط روزانہ OHLC ڈیٹا۔`,
      hi: `${year} के सोने के ऐतिहासिक भाव — कई मुद्राओं में प्रति कैरेट दैनिक OHLC डेटा।`,
    }),
    noData: pick(locale, {
      en: `Historical data for ${year} is not available yet.`,
      ar: `لا تتوفر بيانات تاريخية لعام ${year} حالياً.`,
      fr: `Les données historiques pour ${year} ne sont pas encore disponibles.`,
      tr: `${year} yılına ait geçmiş veriler henüz mevcut değil.`,
      ur: `${year} کا تاریخی ڈیٹا ابھی دستیاب نہیں۔`,
      hi: `${year} का ऐतिहासिक डेटा अभी उपलब्ध नहीं है।`,
    }),
    monthlyHeading: pick(locale, {
      en: `Monthly XAU/USD · ${year} (USD / troy oz)`,
      ar: `سعر الذهب الشهري · ${year} (دولار أمريكي / أونصة)`,
      fr: `XAU/USD mensuel · ${year} (USD / once troy)`,
      tr: `Aylık XAU/USD · ${year} (USD / troy ons)`,
      ur: `ماہانہ XAU/USD · ${year} (USD / ٹرائے اونس)`,
      hi: `मासिक XAU/USD · ${year} (USD / ट्रॉय औंस)`,
    }),
  };
}

/** Year-summary stat labels. */
export function yearStatLabels(locale: string) {
  return {
    open: pick(locale, { en: "Year open", ar: "افتتاح السنة", fr: "Ouverture annuelle", tr: "Yıl açılışı", ur: "سال کا افتتاح", hi: "वर्ष ओपन" }),
    close: pick(locale, { en: "Year close", ar: "إغلاق السنة", fr: "Clôture annuelle", tr: "Yıl kapanışı", ur: "سال کا اختتام", hi: "वर्ष क्लोज़" }),
    high: pick(locale, { en: "Year high", ar: "أعلى سعر", fr: "Plus haut annuel", tr: "Yıl en yüksek", ur: "سال کی بلند ترین", hi: "वर्ष उच्च" }),
    low: pick(locale, { en: "Year low", ar: "أدنى سعر", fr: "Plus bas annuel", tr: "Yıl en düşük", ur: "سال کی کم ترین", hi: "वर्ष निम्न" }),
    avg: pick(locale, { en: "Year average", ar: "المتوسط", fr: "Moyenne annuelle", tr: "Yıl ortalaması", ur: "سالانہ اوسط", hi: "वार्षिक औसत" }),
    yoy: pick(locale, { en: "Year change", ar: "التغير السنوي", fr: "Variation annuelle", tr: "Yıllık değişim", ur: "سالانہ تبدیلی", hi: "वार्षिक बदलाव" }),
    points: pick(locale, { en: "Trading days", ar: "أيام التداول", fr: "jours de cotation", tr: "işlem günü", ur: "تجارتی دن", hi: "कारोबारी दिन" }),
  };
}

/** Monthly OHLC table headers. */
export function monthTableHeaders(locale: string) {
  return {
    month: pick(locale, { en: "Month", ar: "الشهر", fr: "Mois", tr: "Ay", ur: "مہینہ", hi: "महीना" }),
    open: pick(locale, { en: "Open", ar: "افتتاح", fr: "Ouverture", tr: "Açılış", ur: "افتتاح", hi: "ओपन" }),
    high: pick(locale, { en: "High", ar: "أعلى", fr: "Plus haut", tr: "En yüksek", ur: "بلند ترین", hi: "उच्च" }),
    low: pick(locale, { en: "Low", ar: "أدنى", fr: "Plus bas", tr: "En düşük", ur: "کم ترین", hi: "निम्न" }),
    close: pick(locale, { en: "Close", ar: "إغلاق", fr: "Clôture", tr: "Kapanış", ur: "اختتام", hi: "क्लोज़" }),
    change: pick(locale, { en: "Change", ar: "التغير", fr: "Variation", tr: "Değişim", ur: "تبدیلی", hi: "बदलाव" }),
  };
}

const MONTH_LABELS: Partial<Record<string, readonly string[]>> = {
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  ar: [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
  ],
};

const MONTH_FMT: Record<string, Intl.DateTimeFormat> = {};

/** Full month name for a 0-based index; fixed ar/en lists, Intl for the rest. */
export function monthName(locale: string, monthIdx: number): string {
  const fixed = MONTH_LABELS[locale];
  if (fixed) return fixed[monthIdx];
  const tag = localeMeta(locale).intl;
  MONTH_FMT[tag] ??= new Intl.DateTimeFormat(tag, { month: "long", timeZone: "UTC" });
  return MONTH_FMT[tag].format(new Date(Date.UTC(2000, monthIdx, 1)));
}
