import { pick } from "@/lib/i18n-text";
import { karatLabel } from "@/lib/karat-label";

export type CountryPageCtx = {
  /** "21k" / "21K". */
  karat: string;
  /** Localized country name. */
  country: string;
  /** ISO currency code. */
  currency: string;
};

/**
 * H1, intro and currency chip for the country×karat page. Kept inline (not in
 * `messages/*.json`) so the sync, cache-friendly header can render every
 * locale without awaiting request config. `ar` and `en` reproduce the
 * `CountryPage` messages byte-for-byte.
 */
export function countryPageText(locale: string, { karat, country, currency }: CountryPageCtx) {
  const k = karatLabel(locale, karat);
  return {
    h1: pick(locale, {
      en: `Gold Price Today in ${country} (${k})`,
      ar: `سعر الذهب اليوم في ${country} ${k}`,
      fr: `Cours de l'or aujourd'hui – ${country} (${k})`,
      tr: `Bugün ${country} altın fiyatı (${k})`,
      ur: `آج ${country} میں سونے کی قیمت (${k})`,
      hi: `आज ${country} में सोने का भाव (${k})`,
    }),
    intro: pick(locale, {
      en: `Today's ${k} gold price in ${country} in ${currency}: the global spot ounce (live median of Binance, Coinbase and Kraken via PAXG/USD) converted to ${currency} at an hourly FX rate, divided by 31.1035 g and scaled by purity.`,
      ar: `سعر الذهب اليوم في ${country} بعملة ${currency} ل${k}: السعر الفوري العالمي للأونصة (وسيط لحظي من Binance وCoinbase وKraken عبر PAXG/USD) محوّلًا إلى ${currency} بسعر صرف محدّث كل ساعة، ثم مقسومًا على 31.1035 جرامًا ومضروبًا بنسبة النقاء.`,
      fr: `Prix de l'or ${k} aujourd'hui – ${country}, en ${currency} : l'once spot mondiale (médiane en direct de Binance, Coinbase et Kraken via PAXG/USD) convertie en ${currency} au taux de change horaire, divisée par 31,1035 g et pondérée par la pureté.`,
      tr: `${country} için bugünkü ${k} altın fiyatı (${currency}): küresel spot ons fiyatı (Binance, Coinbase ve Kraken'in PAXG/USD üzerinden canlı medyanı) saatlik kurla ${currency} cinsine çevrilir, 31,1035 grama bölünür ve saflık oranıyla çarpılır.`,
      ur: `${country} میں آج ${k} سونے کی قیمت ${currency} میں: عالمی اسپاٹ اونس (Binance، Coinbase اور Kraken کا PAXG/USD کے ذریعے لائیو میڈین) گھنٹہ وار شرحِ مبادلہ پر ${currency} میں تبدیل، پھر 31.1035 گرام پر تقسیم اور خلوص کے تناسب سے ضرب۔`,
      hi: `${country} में आज ${k} सोने का भाव ${currency} में: वैश्विक स्पॉट औंस (Binance, Coinbase और Kraken का PAXG/USD के ज़रिए लाइव मीडियन) प्रति घंटा विनिमय दर पर ${currency} में बदला गया, 31.1035 ग्राम से भाग देकर शुद्धता के अनुपात से गुणा।`,
    }),
    currencyNote: pick(locale, {
      en: `All prices in ${currency}. FX refreshes hourly from open data; the figure shown is the spot price before making charges and tax.`,
      ar: `كل الأسعار بـ${currency}. سعر الصرف يُحدَّث كل ساعة من بيانات مفتوحة؛ السعر المعروض هو السعر الفوري قبل المصنعية والضريبة.`,
      fr: `Tous les prix sont en ${currency}. Le taux de change est actualisé toutes les heures à partir de données ouvertes ; le montant affiché est le prix spot, hors façon et taxes.`,
      tr: `Tüm fiyatlar ${currency} cinsindendir. Kur, açık verilerden saatlik güncellenir; gösterilen rakam işçilik ve vergi öncesi spot fiyattır.`,
      ur: `تمام قیمتیں ${currency} میں۔ شرحِ مبادلہ اوپن ڈیٹا سے ہر گھنٹے اپ ڈیٹ ہوتی ہے؛ دکھائی گئی قیمت بناوائی اور ٹیکس سے پہلے کی اسپاٹ قیمت ہے۔`,
      hi: `सभी भाव ${currency} में। विनिमय दर ओपन डेटा से हर घंटे अपडेट होती है; दिखाया गया आंकड़ा मेकिंग चार्ज और टैक्स से पहले का स्पॉट भाव है।`,
    }),
  };
}

/** Market-note section labels. */
export function marketNoteText(locale: string, country: string) {
  return {
    aria: pick(locale, {
      en: "Local market notes",
      ar: "ملاحظات السوق المحلي",
      fr: "Notes sur le marché local",
      tr: "Yerel piyasa notları",
      ur: "مقامی مارکیٹ نوٹس",
      hi: "स्थानीय बाज़ार नोट्स",
    }),
    heading: pick(locale, {
      en: `${country} gold market`,
      ar: `سوق الذهب في ${country}`,
      fr: `Marché de l'or – ${country}`,
      tr: `${country} altın piyasası`,
      ur: `${country} کی سونے کی مارکیٹ`,
      hi: `${country} का सोना बाज़ार`,
    }),
  };
}

/** Static FAQ block rendered inline on every country×karat page. */
export function headerFaq(locale: string, { karat, country, currency }: CountryPageCtx) {
  const k = karatLabel(locale, karat);
  return {
    heading: pick(locale, {
      en: `Common questions about ${k} gold in ${country}`,
      ar: `أسئلة شائعة عن سعر الذهب ${k} في ${country}`,
      fr: `Questions fréquentes sur l'or ${k} – ${country}`,
      tr: `${country} ${k} altın hakkında sık sorulan sorular`,
      ur: `${country} میں ${k} سونے کے بارے میں عام سوالات`,
      hi: `${country} में ${k} सोने से जुड़े आम सवाल`,
    }),
    items: [
      {
        q: pick(locale, {
          en: `How is the ${k} gold price in ${country} calculated?`,
          ar: `كيف يُحسب سعر الذهب ${k} في ${country}؟`,
          fr: `Comment le prix de l'or ${k} est-il calculé pour ${country} ?`,
          tr: `${country} ${k} altın fiyatı nasıl hesaplanır?`,
          ur: `${country} میں ${k} سونے کی قیمت کیسے نکالی جاتی ہے؟`,
          hi: `${country} में ${k} सोने का भाव कैसे निकाला जाता है?`,
        }),
        a: pick(locale, {
          en: `The ${k} per-gram price in ${country} is computed as: spot ounce price (XAU/USD) ÷ 31.1035 g × purity ratio × ${currency}/USD FX rate. The spot price is sourced from Binance, Coinbase and Kraken via PAXG/USD, refreshed every second.`,
          ar: `يُحسب سعر ${k} للجرام في ${country} عبر معادلة: السعر الفوري للأونصة (XAU/USD) ÷ 31.1035 جرام × نسبة نقاء العيار × سعر صرف ${currency}/USD. السعر الفوري مأخوذ من Binance و Coinbase و Kraken عبر PAXG/USD، ومُحدّث كل ثانية تقريبًا.`,
          fr: `Le prix au gramme de l'or ${k} pour ${country} se calcule ainsi : prix spot de l'once (XAU/USD) ÷ 31,1035 g × taux de pureté × taux de change ${currency}/USD. Le prix spot provient de Binance, Coinbase et Kraken via PAXG/USD et est actualisé chaque seconde.`,
          tr: `${country} için ${k} gram altın fiyatı şöyle hesaplanır: spot ons fiyatı (XAU/USD) ÷ 31,1035 g × saflık oranı × ${currency}/USD kuru. Spot fiyat Binance, Coinbase ve Kraken'den PAXG/USD üzerinden alınır ve her saniye yenilenir.`,
          ur: `${country} میں ${k} فی گرام قیمت یوں نکلتی ہے: اسپاٹ اونس قیمت (XAU/USD) ÷ 31.1035 گرام × خلوص کا تناسب × ${currency}/USD شرحِ مبادلہ۔ اسپاٹ قیمت Binance، Coinbase اور Kraken سے PAXG/USD کے ذریعے لی جاتی ہے اور ہر سیکنڈ تازہ ہوتی ہے۔`,
          hi: `${country} में ${k} प्रति ग्राम भाव इस तरह निकलता है: स्पॉट औंस भाव (XAU/USD) ÷ 31.1035 ग्राम × शुद्धता अनुपात × ${currency}/USD विनिमय दर। स्पॉट भाव Binance, Coinbase और Kraken से PAXG/USD के ज़रिए लिया जाता है और हर सेकंड अपडेट होता है।`,
        }),
      },
      {
        q: pick(locale, {
          en: `Why does the gold price differ between shops in ${country}?`,
          ar: `لماذا يختلف سعر الذهب بين محلات ${country}؟`,
          fr: `Pourquoi le prix de l'or varie-t-il d'une bijouterie à l'autre (${country}) ?`,
          tr: `${country} içinde altın fiyatı kuyumcudan kuyumcuya neden değişir?`,
          ur: `${country} میں دکانوں کے درمیان سونے کی قیمت مختلف کیوں ہوتی ہے؟`,
          hi: `${country} में दुकानों के बीच सोने का भाव अलग क्यों होता है?`,
        }),
        a: pick(locale, {
          en: `The raw spot price is the same across all shops. Differences come from three factors: (1) making charges (5-30 local units per gram), (2) retailer margin (3-10%), (3) local tax if applicable. The price shown here is the floor reference before any add-ons.`,
          ar: `السعر الفوري متطابق لدى جميع المحلات. الفرق ينشأ من ثلاثة عوامل: (1) المصنعية (5-30 وحدة عملة محلية للجرام)، (2) هامش بائع التجزئة (3-10%)، (3) ضريبة محلية إن وجدت. السعر المعروض هنا هو الحد الأدنى المرجعي قبل أي إضافات.`,
          fr: `Le prix spot brut est identique pour toutes les bijouteries. L'écart vient de trois facteurs : (1) la façon (5 à 30 unités monétaires locales par gramme), (2) la marge du détaillant (3 à 10 %), (3) la taxe locale le cas échéant. Le prix affiché ici est la référence plancher avant tout supplément.`,
          tr: `Ham spot fiyat tüm kuyumcularda aynıdır. Fark üç etkenden doğar: (1) işçilik (gram başına 5-30 yerel para birimi), (2) perakendeci marjı (%3-10), (3) varsa yerel vergi. Burada gösterilen fiyat, eklemeler öncesi taban referanstır.`,
          ur: `خام اسپاٹ قیمت تمام دکانوں پر یکساں ہے۔ فرق تین وجوہات سے آتا ہے: (1) بناوائی (فی گرام 5-30 مقامی کرنسی یونٹ)، (2) خوردہ فروش کا منافع (3-10%)، (3) اگر لاگو ہو تو مقامی ٹیکس۔ یہاں دکھائی گئی قیمت کسی بھی اضافے سے پہلے کی بنیادی حوالہ قیمت ہے۔`,
          hi: `कच्चा स्पॉट भाव सभी दुकानों पर एक जैसा है। फ़र्क़ तीन वजहों से आता है: (1) मेकिंग चार्ज (5-30 स्थानीय मुद्रा इकाई प्रति ग्राम), (2) खुदरा मार्जिन (3-10%), (3) लागू हो तो स्थानीय टैक्स। यहाँ दिखाया गया भाव किसी भी जोड़ से पहले का न्यूनतम संदर्भ है।`,
        }),
      },
      {
        q: pick(locale, {
          en: `How often is the ${country} gold price updated?`,
          ar: `كم مرة يُحدّث سعر الذهب لـ${country}؟`,
          fr: `À quelle fréquence le prix de l'or (${country}) est-il mis à jour ?`,
          tr: `${country} altın fiyatı ne sıklıkla güncellenir?`,
          ur: `${country} کے سونے کی قیمت کتنی بار اپ ڈیٹ ہوتی ہے؟`,
          hi: `${country} का सोने का भाव कितनी बार अपडेट होता है?`,
        }),
        a: pick(locale, {
          en: `The spot ounce price refreshes in real time via WebSocket (multiple times per second). The ${currency}/USD FX rate refreshes hourly from open central-bank data. The table above reflects the latest available price.`,
          ar: `السعر الفوري للأونصة يُحدّث لحظيًا عبر WebSocket (عدة مرات بالثانية). سعر صرف ${currency}/USD يُحدّث كل ساعة من بيانات البنوك المركزية المفتوحة. الجدول أعلاه يعكس آخر سعر متاح.`,
          fr: `Le prix spot de l'once est actualisé en temps réel via WebSocket (plusieurs fois par seconde). Le taux ${currency}/USD est actualisé toutes les heures à partir des données ouvertes des banques centrales. Le tableau ci-dessus reflète le dernier prix disponible.`,
          tr: `Spot ons fiyatı WebSocket üzerinden gerçek zamanlı (saniyede birkaç kez) yenilenir. ${currency}/USD kuru, merkez bankalarının açık verilerinden saatlik güncellenir. Yukarıdaki tablo mevcut son fiyatı yansıtır.`,
          ur: `اسپاٹ اونس قیمت WebSocket کے ذریعے حقیقی وقت میں (سیکنڈ میں کئی بار) تازہ ہوتی ہے۔ ${currency}/USD شرحِ مبادلہ مرکزی بینکوں کے اوپن ڈیٹا سے ہر گھنٹے اپ ڈیٹ ہوتی ہے۔ اوپر کا جدول تازہ ترین دستیاب قیمت دکھاتا ہے۔`,
          hi: `स्पॉट औंस भाव WebSocket के ज़रिए रियल-टाइम (सेकंड में कई बार) अपडेट होता है। ${currency}/USD विनिमय दर केंद्रीय बैंकों के ओपन डेटा से हर घंटे अपडेट होती है। ऊपर की तालिका नवीनतम उपलब्ध भाव दिखाती है।`,
        }),
      },
    ],
  };
}
