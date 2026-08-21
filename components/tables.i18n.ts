import { pick, type LocaleText } from "@/lib/i18n-text";
import { karatLabel, karatNumber } from "@/lib/karat-label";

/**
 * Shared column labels and sentences for the price tables
 * (PriceTable, RecentPricesTable, CurrencyTable). Kept out of the
 * components so each stays well under the 500-line cap.
 */

export const TABLE_TEXT = {
  karat: { en: "Karat", ar: "العيار", fr: "Carat", tr: "Ayar", ur: "قیراط", hi: "कैरेट" },
  bid: { en: "Bid", ar: "شراء", fr: "Achat", tr: "Alış", ur: "خرید", hi: "खरीद" },
  ask: { en: "Ask", ar: "بيع", fr: "Vente", tr: "Satış", ur: "فروخت", hi: "बिक्री" },
  ounce: { en: "Ounce", ar: "الأونصة", fr: "Once", tr: "Ons", ur: "اونس", hi: "औंस" },
  tola: { en: "Tola", ar: "التولة", fr: "Tola", tr: "Tola", ur: "تولہ", hi: "तोला" },
  kilo: { en: "Kilo", ar: "الكيلو", fr: "Kilo", tr: "Kilo", ur: "کلو", hi: "किलो" },
  date: { en: "Date", ar: "التاريخ", fr: "Date", tr: "Tarih", ur: "تاریخ", hi: "तारीख" },
  currency: { en: "Currency", ar: "العملة", fr: "Devise", tr: "Para birimi", ur: "کرنسی", hi: "मुद्रा" },
  updated: { en: "Updated", ar: "آخر تحديث", fr: "Mis à jour", tr: "Güncellendi", ur: "آخری اپ ڈیٹ", hi: "अपडेट" },
  oz24k: { en: "24K oz", ar: "الأونصة 24", fr: "Once 24 carats", tr: "24 ayar ons", ur: "24 قیراط اونس", hi: "24 कैरेट औंस" },
  goldPound: {
    en: "Gold pound (8 g of 21K): ",
    ar: "الجنيه الذهب (8 جرام عيار 21): ",
    fr: "Livre d'or (8 g de 21 carats) : ",
    tr: "Altın lira (8 g 21 ayar): ",
    ur: "گولڈ پاؤنڈ (8 گرام 21 قیراط): ",
    hi: "गोल्ड पाउंड (8 ग्राम 21 कैरेट): ",
  },
  recentFootnote: {
    en: "Daily COMEX futures close converted to a per-gram price with the same purity and FX formula as the live table.",
    ar: "سعر الإغلاق اليومي لعقود COMEX الآجلة محوّلًا إلى سعر الجرام بنفس معادلة النقاء وسعر الصرف المستخدمة في الجدول المباشر.",
    fr: "Clôture quotidienne des contrats à terme COMEX convertie en prix du gramme avec la même formule de titre et de change que le tableau en direct.",
    tr: "Günlük COMEX vadeli işlem kapanışı, canlı tablodaki aynı saflık ve kur formülüyle gram fiyatına çevrilmiştir.",
    ur: "COMEX فیوچرز کی روزانہ بند قیمت، لائیو جدول والے خالصیت اور ایکسچینج ریٹ کے فارمولے سے فی گرام قیمت میں بدلی گئی۔",
    hi: "COMEX वायदा का दैनिक बंद भाव, लाइव तालिका वाले शुद्धता और विनिमय दर फ़ॉर्मूले से प्रति ग्राम भाव में बदला गया।",
  },
  currencyHeading: {
    en: "Gold price per gram in major currencies",
    ar: "سعر جرام الذهب بالعملات الرئيسية",
    fr: "Cours de l'or au gramme dans les principales devises",
    tr: "Başlıca para birimlerinde gram altın fiyatı",
    ur: "بڑی کرنسیوں میں فی گرام سونے کی قیمت",
    hi: "प्रमुख मुद्राओं में प्रति ग्राम सोने का भाव",
  },
  currencyCaption: {
    en: "Gold price per gram by karat in major currencies",
    ar: "سعر جرام الذهب حسب العيار في العملات الرئيسية",
    fr: "Cours de l'or au gramme par carat dans les principales devises",
    tr: "Başlıca para birimlerinde ayar bazında gram altın fiyatı",
    ur: "بڑی کرنسیوں میں قیراط کے لحاظ سے فی گرام سونے کی قیمت",
    hi: "प्रमुख मुद्राओं में कैरेट के अनुसार प्रति ग्राम सोने का भाव",
  },
} satisfies Record<string, LocaleText>;

export const tableText = (locale: string, key: keyof typeof TABLE_TEXT) => pick(locale, TABLE_TEXT[key]);

/** "Gram (USD)" column header. */
export function gramHeader(locale: string, currency: string): string {
  return pick(locale, {
    en: `Gram (${currency})`,
    ar: `الجرام (${currency})`,
    fr: `Gramme (${currency})`,
    tr: `Gram (${currency})`,
    ur: `گرام (${currency})`,
    hi: `ग्राम (${currency})`,
  });
}

export function priceTableHeading(locale: string, countryName?: string): string {
  if (countryName) {
    return pick(locale, {
      en: `Gold prices today in ${countryName} by karat`,
      ar: `أسعار الذهب اليوم في ${countryName} حسب العيار`,
      fr: `Cours de l'or aujourd'hui : ${countryName}, par carat`,
      tr: `Bugün altın fiyatları — ${countryName}, ayar bazında`,
      ur: `${countryName} میں آج سونے کی قیمتیں قیراط کے لحاظ سے`,
      hi: `${countryName} में आज सोने का भाव कैरेट के अनुसार`,
    });
  }
  return pick(locale, {
    en: "Gold prices today by karat",
    ar: "أسعار الذهب اليوم حسب العيار",
    fr: "Cours de l'or aujourd'hui par carat",
    tr: "Bugün ayar bazında altın fiyatları",
    ur: "آج سونے کی قیمتیں قیراط کے لحاظ سے",
    hi: "आज सोने का भाव कैरेट के अनुसार",
  });
}

export function priceTableCaption(locale: string, cur: string): string {
  return pick(locale, {
    en: `Gold price table today in ${cur} per karat and weight unit`,
    ar: `جدول أسعار الذهب اليوم بـ${cur} لكل عيار ووحدة وزن`,
    fr: `Tableau du cours de l'or aujourd'hui en ${cur} par carat et unité de poids`,
    tr: `Bugün ${cur} cinsinden ayar ve ağırlık birimine göre altın fiyat tablosu`,
    ur: `آج ${cur} میں فی قیراط اور وزن کی اکائی کے لحاظ سے سونے کی قیمتوں کا جدول`,
    hi: `आज ${cur} में प्रति कैरेट और वज़न इकाई के अनुसार सोने के भाव की तालिका`,
  });
}

export function priceTableFootnote(locale: string, cur: string): string {
  return pick(locale, {
    en: `Prices are the global spot (median of Binance, Coinbase and Kraken) converted to ${cur} at an hourly FX rate, before making charges, retailer margin and local tax. Bid/ask are the live spot quotes.`,
    ar: `الأسعار هي السعر الفوري العالمي (وسيط Binance وCoinbase وKraken) محوّلًا إلى ${cur} بسعر صرف محدّث كل ساعة، قبل المصنعية وهامش المحل وأي ضريبة محلية. «شراء/بيع» هما سعرا العرض والطلب الفوريان.`,
    fr: `Les prix correspondent au spot mondial (médiane de Binance, Coinbase et Kraken) converti en ${cur} au taux de change horaire, hors façon, marge du détaillant et taxes locales. Achat/vente sont les cotations spot en direct.`,
    tr: `Fiyatlar, küresel spotun (Binance, Coinbase ve Kraken medyanı) saatlik kurla ${cur} cinsine çevrilmiş hâlidir; işçilik, satıcı marjı ve yerel vergi dahil değildir. Alış/satış canlı spot kotasyonlarıdır.`,
    ur: `قیمتیں عالمی اسپاٹ (Binance، Coinbase اور Kraken کی میڈین) ہیں جو گھنٹہ وار ایکسچینج ریٹ سے ${cur} میں بدلی گئی ہیں، بنوائی، دکاندار کے منافع اور مقامی ٹیکس سے پہلے۔ خرید/فروخت لائیو اسپاٹ کوٹس ہیں۔`,
    hi: `भाव वैश्विक स्पॉट (Binance, Coinbase और Kraken की माध्यिका) हैं जो प्रति घंटा विनिमय दर से ${cur} में बदले गए हैं, मेकिंग चार्ज, विक्रेता मार्जिन और स्थानीय कर से पहले। खरीद/बिक्री लाइव स्पॉट कोट हैं।`,
  });
}

export function recentHeading(locale: string, countryName?: string): string {
  if (countryName) {
    return pick(locale, {
      en: `Gold price in ${countryName}, previous days`,
      ar: `أسعار الذهب في ${countryName} خلال الأيام السابقة`,
      fr: `Cours de l'or : ${countryName}, jours précédents`,
      tr: `Altın fiyatı — ${countryName}, önceki günler`,
      ur: `${countryName} میں سونے کی قیمت، گزشتہ دن`,
      hi: `${countryName} में सोने का भाव, पिछले दिन`,
    });
  }
  return pick(locale, {
    en: "Gold price, previous days",
    ar: "أسعار الذهب خلال الأيام السابقة",
    fr: "Cours de l'or, jours précédents",
    tr: "Altın fiyatı, önceki günler",
    ur: "سونے کی قیمت، گزشتہ دن",
    hi: "सोने का भाव, पिछले दिन",
  });
}

export function recentRangeSentence(
  locale: string,
  i: { label: string; cur: string; hi: string; lo: string },
): string {
  const kl = karatLabel(locale, i.label);
  return pick(locale, {
    en: `30-day high for ${i.label} per gram: ${i.cur} ${i.hi}; 30-day low: ${i.cur} ${i.lo} (daily close).`,
    ar: `أعلى سعر لجرام ${kl} خلال 30 يومًا: ${i.hi} ${i.cur}، وأدنى سعر: ${i.lo} ${i.cur} (سعر الإغلاق اليومي).`,
    fr: `Plus haut sur 30 jours du gramme ${kl} : ${i.hi} ${i.cur} ; plus bas : ${i.lo} ${i.cur} (clôture quotidienne).`,
    tr: `${kl} gram için 30 günlük en yüksek: ${i.hi} ${i.cur}; en düşük: ${i.lo} ${i.cur} (günlük kapanış).`,
    ur: `${kl} فی گرام 30 دن کی بلند ترین قیمت: ${i.hi} ${i.cur}، کم ترین: ${i.lo} ${i.cur} (روزانہ بند قیمت)۔`,
    hi: `${kl} प्रति ग्राम का 30-दिन का उच्चतम: ${i.hi} ${i.cur}; न्यूनतम: ${i.lo} ${i.cur} (दैनिक बंद भाव)।`,
  });
}

export function recentCaption(locale: string, cur: string, days: number): string {
  return pick(locale, {
    en: `Daily closing gold price per gram in ${cur} for the last ${days} trading days by karat`,
    ar: `سعر إغلاق جرام الذهب بـ${cur} لآخر ${days} أيام تداول حسب العيار`,
    fr: `Cours de clôture quotidien du gramme d'or en ${cur} sur les ${days} derniers jours de bourse, par carat`,
    tr: `Son ${days} işlem günü için ${cur} cinsinden günlük gram altın kapanış fiyatı, ayar bazında`,
    ur: `گزشتہ ${days} تجارتی دنوں کے لیے ${cur} میں فی گرام سونے کی روزانہ بند قیمت، قیراط کے لحاظ سے`,
    hi: `पिछले ${days} कारोबारी दिनों के लिए ${cur} में प्रति ग्राम सोने का दैनिक बंद भाव, कैरेट के अनुसार`,
  });
}

/** "Change (21K)" column; Arabic keeps the bare numeral as before. */
export function changeHeader(locale: string, label: string): string {
  const n = karatNumber(label);
  const kl = karatLabel(locale, label);
  return pick(locale, {
    en: `Change (${label})`,
    ar: `التغير (${n})`,
    fr: `Variation (${kl})`,
    tr: `Değişim (${kl})`,
    ur: `تبدیلی (${kl})`,
    hi: `बदलाव (${kl})`,
  });
}

export function currencyIntro(locale: string, price: string): string {
  return pick(locale, {
    en: `From the live spot of $${price} per ounce at hourly FX rates. Pick a country for its full page.`,
    ar: `من السعر الفوري ${price} دولار للأونصة، بأسعار صرف محدّثة كل ساعة. اختر الدولة لصفحتها الكاملة.`,
    fr: `À partir du spot en direct de ${price} $ l'once, aux taux de change horaires. Choisissez un pays pour sa page complète.`,
    tr: `Ons başına ${price} $ canlı spot fiyatından, saatlik kurlarla. Tam sayfası için bir ülke seçin.`,
    ur: `فی اونس ${price} ڈالر کی لائیو اسپاٹ قیمت سے، گھنٹہ وار ایکسچینج ریٹ پر۔ مکمل صفحے کے لیے ملک منتخب کریں۔`,
    hi: `प्रति औंस $${price} के लाइव स्पॉट से, प्रति घंटा विनिमय दरों पर। पूरे पृष्ठ के लिए देश चुनें।`,
  });
}
