import { pick, type LocaleText } from "@/lib/i18n-text";
import { karatLabel, karatPurity } from "@/lib/karat-label";

/**
 * Per-country tax notes spliced into the FAQ. Hand-verified facts; every
 * locale carries its own sentence so the FAQ answer never mixes languages.
 */
export const COUNTRY_VAT: Record<string, { rate: string } & LocaleText> = {
  "saudi-arabia": {
    rate: "15%",
    en: "Saudi Arabia applies 15% VAT on jewellery (not on investment bullion ≥99.5% purity)",
    ar: "تطبق المملكة العربية السعودية ضريبة قيمة مضافة 15% على المجوهرات (لا تُطبق على السبائك الاستثمارية ≥99.5%)",
    fr: "L'Arabie saoudite applique une TVA de 15 % sur les bijoux (pas sur les lingots d'investissement de pureté ≥ 99,5 %)",
    tr: "Suudi Arabistan mücevherde %15 KDV uygular (saflığı ≥%99,5 olan yatırım külçesine uygulanmaz)",
    ur: "سعودی عرب زیورات پر 15% VAT لگاتا ہے (≥99.5% خلوص کے سرمایہ کاری بلین پر نہیں)",
    hi: "सऊदी अरब गहनों पर 15% VAT लगाता है (≥99.5% शुद्धता के निवेश बुलियन पर नहीं)",
  },
  uae: {
    rate: "5%",
    en: "UAE applies 5% VAT on jewellery making charges (raw gold is zero-rated)",
    ar: "تطبق الإمارات ضريبة قيمة مضافة 5% على رسوم تصنيع المجوهرات (الذهب الخام معفى)",
    fr: "Les Émirats arabes unis appliquent une TVA de 5 % sur la façon des bijoux (l'or brut est taxé à 0 %)",
    tr: "BAE, mücevher işçiliğine %5 KDV uygular (ham altın sıfır oranlıdır)",
    ur: "متحدہ عرب امارات زیورات کی بناوائی پر 5% VAT لگاتا ہے (خام سونا صفر شرح پر ہے)",
    hi: "UAE गहनों के मेकिंग चार्ज पर 5% VAT लगाता है (कच्चा सोना शून्य-दर पर है)",
  },
  egypt: {
    rate: "14%",
    en: "Egypt applies 14% VAT on jewellery making-charges only (raw gold value is exempt)",
    ar: "تطبق مصر ضريبة قيمة مضافة 14% على رسوم تصنيع المجوهرات فقط (قيمة الذهب الخام معفاة)",
    fr: "L'Égypte applique une TVA de 14 % uniquement sur la façon des bijoux (la valeur de l'or brut est exonérée)",
    tr: "Mısır yalnızca mücevher işçiliğine %14 KDV uygular (ham altın değeri muaftır)",
    ur: "مصر صرف زیورات کی بناوائی پر 14% VAT لگاتا ہے (خام سونے کی قیمت مستثنیٰ ہے)",
    hi: "मिस्र सिर्फ़ गहनों के मेकिंग चार्ज पर 14% VAT लगाता है (कच्चे सोने का मूल्य छूट प्राप्त है)",
  },
  jordan: {
    rate: "16%",
    en: "Jordan applies 16% General Sales Tax on jewellery (investment bullion exempt)",
    ar: "تطبق الأردن ضريبة مبيعات عامة 16% على المجوهرات (السبائك الاستثمارية معفاة)",
    fr: "La Jordanie applique une taxe générale sur les ventes de 16 % sur les bijoux (lingots d'investissement exonérés)",
    tr: "Ürdün mücevherde %16 genel satış vergisi uygular (yatırım külçesi muaftır)",
    ur: "اردن زیورات پر 16% جنرل سیلز ٹیکس لگاتا ہے (سرمایہ کاری بلین مستثنیٰ)",
    hi: "जॉर्डन गहनों पर 16% सामान्य बिक्री कर लगाता है (निवेश बुलियन छूट प्राप्त)",
  },
  bahrain: {
    rate: "10%",
    en: "Bahrain applies 10% VAT on jewellery (investment-grade gold of 99% purity or more is exempt)",
    ar: "تطبق البحرين ضريبة قيمة مضافة 10% على المجوهرات (الذهب الاستثماري بنقاء 99% فأكثر معفى)",
    fr: "Bahreïn applique une TVA de 10 % sur les bijoux (l'or d'investissement de pureté ≥ 99 % est exonéré)",
    tr: "Bahreyn mücevherde %10 KDV uygular (saflığı %99 ve üzeri yatırım altını muaftır)",
    ur: "بحرین زیورات پر 10% VAT لگاتا ہے (99% یا زیادہ خلوص کا سرمایہ کاری سونا مستثنیٰ)",
    hi: "बहरीन गहनों पर 10% VAT लगाता है (99% या अधिक शुद्धता का निवेश सोना छूट प्राप्त)",
  },
  kuwait: {
    rate: "0%",
    en: "Kuwait levies no VAT on gold",
    ar: "لا تفرض الكويت ضريبة قيمة مضافة على الذهب",
    fr: "Le Koweït n'applique aucune TVA sur l'or",
    tr: "Kuveyt altına KDV uygulamaz",
    ur: "کویت سونے پر کوئی VAT نہیں لگاتا",
    hi: "कुवैत सोने पर कोई VAT नहीं लगाता",
  },
  qatar: {
    rate: "0%",
    en: "Qatar levies no VAT on gold (a 5% customs duty applies to imports)",
    ar: "لا تفرض قطر ضريبة قيمة مضافة على الذهب (تُطبق رسوم جمركية 5% على الواردات)",
    fr: "Le Qatar n'applique aucune TVA sur l'or (un droit de douane de 5 % s'applique aux importations)",
    tr: "Katar altına KDV uygulamaz (ithalatta %5 gümrük vergisi vardır)",
    ur: "قطر سونے پر کوئی VAT نہیں لگاتا (درآمد پر 5% کسٹم ڈیوٹی لاگو ہے)",
    hi: "क़तर सोने पर कोई VAT नहीं लगाता (आयात पर 5% सीमा शुल्क लागू है)",
  },
  uk: {
    rate: "20%",
    en: "The UK applies 20% VAT on jewellery (investment-grade gold of 99.5% purity or more is VAT-exempt)",
    ar: "تطبق المملكة المتحدة ضريبة قيمة مضافة 20% على المجوهرات (الذهب الاستثماري بنقاء 99.5% فأكثر معفى)",
    fr: "Le Royaume-Uni applique une TVA de 20 % sur les bijoux (l'or d'investissement de pureté ≥ 99,5 % est exonéré de TVA)",
    tr: "Birleşik Krallık mücevherde %20 KDV uygular (saflığı %99,5 ve üzeri yatırım altını KDV'den muaftır)",
    ur: "برطانیہ زیورات پر 20% VAT لگاتا ہے (99.5% یا زیادہ خلوص کا سرمایہ کاری سونا VAT سے مستثنیٰ)",
    hi: "UK गहनों पर 20% VAT लगाता है (99.5% या अधिक शुद्धता का निवेश सोना VAT-मुक्त है)",
  },
};

export const homeLabel = (locale: string) =>
  pick(locale, { en: "Home", ar: "الرئيسية", fr: "Accueil", tr: "Ana Sayfa", ur: "ہوم", hi: "होम" });

/** Breadcrumb leaf: "21K Gold Price" / "سعر الذهب عيار 21". */
export function karatCrumb(locale: string, karat: string) {
  const k = karatLabel(locale, karat);
  return pick(locale, {
    en: `${k} Gold Price`,
    ar: `سعر الذهب ${k}`,
    fr: `Prix de l'or ${k}`,
    tr: `${k} altın fiyatı`,
    ur: `${k} سونے کی قیمت`,
    hi: `${k} सोने का भाव`,
  });
}

export type FaqCtx = { karat: string; country: string; currency: string; slug: string };

/** Five-question FAQPage block (also emitted as JSON-LD). */
export function countryKaratFaqs(locale: string, { karat, country, currency, slug }: FaqCtx) {
  const k = karatLabel(locale, karat);
  const upper = karat.toUpperCase();
  const purity = karatPurity(karat);
  const vatNote = COUNTRY_VAT[slug];
  const vat = vatNote ? `${pick(locale, vatNote)}. ` : "";
  return [
    {
      q: pick(locale, {
        en: `What is the ${k} gold price today in ${country}?`,
        ar: `كم سعر الذهب ${k} اليوم في ${country}؟`,
        fr: `Quel est le prix de l'or ${k} aujourd'hui (${country}) ?`,
        tr: `${country} için bugün ${k} altın fiyatı ne kadar?`,
        ur: `آج ${country} میں ${k} سونے کی قیمت کیا ہے؟`,
        hi: `आज ${country} में ${k} सोने का भाव क्या है?`,
      }),
      a: pick(locale, {
        en: `${k} gold price in ${country} updates every second in the table above, denominated in ${currency}. The price is derived from the global spot ounce price (XAU/USD) sourced from Binance, Coinbase and Kraken, divided by 31.1035 grams per troy ounce, multiplied by the purity ratio (${purity}), and converted at the daily ${currency}/USD FX rate.`,
        ar: `سعر الذهب ${k} في ${country} يُحدّث كل ثانية في الجدول أعلاه بـ${currency}. السعر مشتق من السعر الفوري العالمي للأونصة (XAU/USD) من Binance وCoinbase وKraken، مقسوماً على 31.1035 جرام لكل أونصة، مضروباً بنسبة النقاء (${purity})، ثم مضروباً بسعر صرف ${currency}/USD اليومي.`,
        fr: `Le prix de l'or ${k} pour ${country} est actualisé chaque seconde dans le tableau ci-dessus, en ${currency}. Il est dérivé du prix spot mondial de l'once (XAU/USD) fourni par Binance, Coinbase et Kraken, divisé par 31,1035 grammes par once troy, multiplié par le taux de pureté (${purity}) et converti au taux de change quotidien ${currency}/USD.`,
        tr: `${country} ${k} altın fiyatı yukarıdaki tabloda ${currency} cinsinden her saniye güncellenir. Fiyat, Binance, Coinbase ve Kraken'den alınan küresel spot ons fiyatının (XAU/USD) troy ons başına 31,1035 grama bölünmesi, saflık oranıyla (${purity}) çarpılması ve günlük ${currency}/USD kuruyla çevrilmesiyle elde edilir.`,
        ur: `${country} میں ${k} سونے کی قیمت اوپر کے جدول میں ${currency} میں ہر سیکنڈ اپ ڈیٹ ہوتی ہے۔ قیمت Binance، Coinbase اور Kraken سے حاصل عالمی اسپاٹ اونس قیمت (XAU/USD) کو فی ٹرائے اونس 31.1035 گرام پر تقسیم، خلوص کے تناسب (${purity}) سے ضرب اور روزانہ ${currency}/USD شرحِ مبادلہ پر تبدیل کر کے نکالی جاتی ہے۔`,
        hi: `${country} में ${k} सोने का भाव ऊपर की तालिका में ${currency} में हर सेकंड अपडेट होता है। भाव Binance, Coinbase और Kraken से लिए गए वैश्विक स्पॉट औंस भाव (XAU/USD) को प्रति ट्रॉय औंस 31.1035 ग्राम से भाग देकर, शुद्धता अनुपात (${purity}) से गुणा करके और दैनिक ${currency}/USD विनिमय दर पर बदलकर निकाला जाता है।`,
      }),
    },
    {
      q: pick(locale, {
        en: `Does the ${country} gold price include making charges and VAT?`,
        ar: `هل سعر الذهب في ${country} يشمل المصنعية وضريبة القيمة المضافة؟`,
        fr: `Le prix de l'or (${country}) inclut-il la façon et la TVA ?`,
        tr: `${country} altın fiyatına işçilik ve KDV dahil mi?`,
        ur: `کیا ${country} کے سونے کی قیمت میں بناوائی اور VAT شامل ہے؟`,
        hi: `क्या ${country} के सोने के भाव में मेकिंग चार्ज और VAT शामिल है?`,
      }),
      a: pick(locale, {
        en: `No. The displayed price is the raw spot-equivalent gold value only. ${vat}Jewellery shops add making charges (typically 5-30 local currency units per gram for complex pieces) and retailer margin (3-10%).`,
        ar: `لا. السعر المعروض هو السعر الفوري للذهب الخام فقط. ${vat}تضيف محلات المجوهرات أيضاً مصنعية (تتراوح من 5 إلى 30 وحدة عملة محلية للجرام للقطع المعقدة) وهامش بائع التجزئة (3-10%).`,
        fr: `Non. Le prix affiché correspond uniquement à la valeur spot de l'or brut. ${vat}Les bijouteries ajoutent la façon (généralement 5 à 30 unités monétaires locales par gramme pour les pièces complexes) et une marge de détail (3 à 10 %).`,
        tr: `Hayır. Gösterilen fiyat yalnızca ham altının spot karşılığıdır. ${vat}Kuyumcular buna işçilik (karmaşık parçalarda genellikle gram başına 5-30 yerel para birimi) ve perakende marjı (%3-10) ekler.`,
        ur: `نہیں۔ دکھائی گئی قیمت صرف خام سونے کی اسپاٹ قیمت ہے۔ ${vat}جیولرز اس میں بناوائی (پیچیدہ زیورات کے لیے عموماً فی گرام 5-30 مقامی کرنسی یونٹ) اور خوردہ منافع (3-10%) شامل کرتے ہیں۔`,
        hi: `नहीं। दिखाया गया भाव सिर्फ़ कच्चे सोने का स्पॉट मूल्य है। ${vat}ज्वेलर्स इसमें मेकिंग चार्ज (जटिल गहनों के लिए आमतौर पर 5-30 स्थानीय मुद्रा इकाई प्रति ग्राम) और खुदरा मार्जिन (3-10%) जोड़ते हैं।`,
      }),
    },
    {
      q: pick(locale, {
        en: `Why does ${k} gold in ${country} differ from the global price?`,
        ar: `لماذا يختلف سعر ${k} في ${country} عن السعر العالمي؟`,
        fr: `Pourquoi l'or ${k} (${country}) diffère-t-il du prix mondial ?`,
        tr: `${country} ${k} altın küresel fiyattan neden farklı?`,
        ur: `${country} میں ${k} سونا عالمی قیمت سے مختلف کیوں ہے؟`,
        hi: `${country} में ${k} सोना वैश्विक भाव से अलग क्यों है?`,
      }),
      a: pick(locale, {
        en: `Global gold is priced in USD. The ${country} price shown here is the same global price converted to ${currency} at the daily FX rate, then divided to a per-gram value at the ${k} purity ratio. There is no real price difference — just unit and currency conversion.`,
        ar: `سعر الذهب العالمي بالدولار. سعر ${country} المعروض هو نفس السعر العالمي محوّلاً إلى ${currency} بسعر الصرف اليومي، ثم مقسوماً لكل جرام بنسبة النقاء ${upper}. لا يوجد فرق سعر حقيقي — فقط تحويل وحدات وعملة.`,
        fr: `L'or mondial est coté en USD. Le prix affiché pour ${country} est ce même prix mondial converti en ${currency} au taux de change du jour, puis ramené au gramme selon le taux de pureté ${k}. Il n'y a aucun écart de prix réel — seulement une conversion d'unité et de devise.`,
        tr: `Küresel altın USD ile fiyatlanır. Burada gösterilen ${country} fiyatı, aynı küresel fiyatın günlük kurla ${currency} cinsine çevrilip ${k} saflık oranıyla grama bölünmüş hâlidir. Gerçek bir fiyat farkı yoktur; yalnızca birim ve para birimi dönüşümü vardır.`,
        ur: `عالمی سونا USD میں قیمت پاتا ہے۔ یہاں دکھائی گئی ${country} کی قیمت وہی عالمی قیمت ہے جو روزانہ شرحِ مبادلہ پر ${currency} میں تبدیل کر کے ${k} خلوص کے تناسب سے فی گرام نکالی گئی ہے۔ قیمت میں کوئی حقیقی فرق نہیں — صرف یونٹ اور کرنسی کی تبدیلی ہے۔`,
        hi: `वैश्विक सोना USD में कोट होता है। यहाँ दिखाया गया ${country} का भाव वही वैश्विक भाव है जिसे दैनिक विनिमय दर पर ${currency} में बदलकर ${k} शुद्धता अनुपात से प्रति ग्राम निकाला गया है। भाव में कोई वास्तविक अंतर नहीं — सिर्फ़ इकाई और मुद्रा का रूपांतरण है।`,
      }),
    },
    {
      q: pick(locale, {
        en: `Where do I buy ${k} gold in ${country}?`,
        ar: `أين أشتري الذهب ${k} في ${country}؟`,
        fr: `Où acheter de l'or ${k} (${country}) ?`,
        tr: `${country} içinde ${k} altın nereden alınır?`,
        ur: `${country} میں ${k} سونا کہاں سے خریدیں؟`,
        hi: `${country} में ${k} सोना कहाँ से खरीदें?`,
      }),
      a: pick(locale, {
        en: `Gold is sold in ${country} at local gold souks and licensed goldsmiths. Always check the hallmark stamp to confirm karat, and obtain a documented receipt. The spot price shown here is your reference for evaluating the shop's price before making charges.`,
        ar: `الذهب يُباع في ${country} في أسواق الذهب المحلية ومحلات الصاغة المرخصة. تحقق دائماً من الختم (الهولمارك) للتأكد من العيار، واحصل على فاتورة موثقة. السعر الفوري المعروض هنا هو مرجعك لتقييم سعر المحل قبل المصنعية.`,
        fr: `${country} : l'or s'achète dans les souks de l'or locaux et chez les bijoutiers agréés. Vérifiez toujours le poinçon pour confirmer le titre et exigez une facture. Le prix spot affiché ici sert de référence pour évaluer le prix en boutique avant la façon.`,
        tr: `${country} içinde altın, yerel altın çarşılarında ve lisanslı kuyumcularda satılır. Ayarı doğrulamak için daima damgayı kontrol edin ve belgeli fatura alın. Burada gösterilen spot fiyat, işçilik öncesi kuyumcu fiyatını değerlendirmek için referansınızdır.`,
        ur: `${country} میں سونا مقامی صرافہ بازاروں اور لائسنس یافتہ سناروں سے ملتا ہے۔ قیراط کی تصدیق کے لیے ہمیشہ ہال مارک مہر دیکھیں اور باقاعدہ رسید لیں۔ یہاں دکھائی گئی اسپاٹ قیمت بناوائی سے پہلے دکان کی قیمت پرکھنے کا آپ کا حوالہ ہے۔`,
        hi: `${country} में सोना स्थानीय सर्राफ़ा बाज़ारों और लाइसेंस प्राप्त सुनारों के यहाँ मिलता है। कैरेट की पुष्टि के लिए हमेशा हॉलमार्क देखें और पक्की रसीद लें। यहाँ दिखाया गया स्पॉट भाव मेकिंग चार्ज से पहले दुकान के भाव को परखने का आपका संदर्भ है।`,
      }),
    },
    {
      q: pick(locale, {
        en: `How often is the ${country} gold price updated?`,
        ar: `كم مرة يُحدّث سعر الذهب في ${country}؟`,
        fr: `À quelle fréquence le prix de l'or (${country}) est-il mis à jour ?`,
        tr: `${country} altın fiyatı ne sıklıkla güncellenir?`,
        ur: `${country} میں سونے کی قیمت کتنی بار اپ ڈیٹ ہوتی ہے؟`,
        hi: `${country} में सोने का भाव कितनी बार अपडेट होता है?`,
      }),
      a: pick(locale, {
        en: `Spot price updates every second via WebSocket. The ${currency}/USD exchange rate updates hourly from open central-bank data. The price you see is the live global price converted to the local currency.`,
        ar: `السعر الفوري يُحدّث كل ثانية عبر WebSocket. سعر صرف ${currency}/USD يُحدّث كل ساعة من بيانات البنوك المركزية المفتوحة. السعر الذي تراه هو السعر اللحظي العالمي مُحوّلاً للعملة المحلية.`,
        fr: `Le prix spot est actualisé chaque seconde via WebSocket. Le taux ${currency}/USD est actualisé toutes les heures à partir des données ouvertes des banques centrales. Le prix affiché est le prix mondial en direct converti en devise locale.`,
        tr: `Spot fiyat WebSocket üzerinden her saniye güncellenir. ${currency}/USD kuru, merkez bankalarının açık verilerinden saatlik güncellenir. Gördüğünüz fiyat, yerel para birimine çevrilmiş canlı küresel fiyattır.`,
        ur: `اسپاٹ قیمت WebSocket کے ذریعے ہر سیکنڈ اپ ڈیٹ ہوتی ہے۔ ${currency}/USD شرحِ مبادلہ مرکزی بینکوں کے اوپن ڈیٹا سے ہر گھنٹے اپ ڈیٹ ہوتی ہے۔ جو قیمت آپ دیکھتے ہیں وہ مقامی کرنسی میں تبدیل شدہ لائیو عالمی قیمت ہے۔`,
        hi: `स्पॉट भाव WebSocket के ज़रिए हर सेकंड अपडेट होता है। ${currency}/USD विनिमय दर केंद्रीय बैंकों के ओपन डेटा से हर घंटे अपडेट होती है। जो भाव आप देखते हैं वह स्थानीय मुद्रा में बदला हुआ लाइव वैश्विक भाव है।`,
      }),
    },
  ];
}

/** "Related {country} pages" link block. */
export function relatedPageLinks(locale: string, { country, currency, slug }: Omit<FaqCtx, "karat">) {
  return {
    heading: pick(locale, {
      en: `Related ${country} pages`,
      ar: `صفحات ذات صلة لـ ${country}`,
      fr: `Pages liées – ${country}`,
      tr: `${country} ile ilgili sayfalar`,
      ur: `${country} سے متعلق صفحات`,
      hi: `${country} से जुड़े पेज`,
    }),
    items: [
      {
        href: `/${slug}/gold-price/24k`,
        label: `${country} 24K`,
        note: pick(locale, { en: "Highest purity", ar: "أعلى نقاء", fr: "Pureté maximale", tr: "En yüksek saflık", ur: "سب سے زیادہ خلوص", hi: "सर्वोच्च शुद्धता" }),
      },
      {
        href: `/${slug}/gold-price/21k`,
        label: `${country} 21K`,
        note: pick(locale, { en: "Most traded", ar: "الأكثر تداولاً", fr: "Le plus négocié", tr: "En çok işlem gören", ur: "سب سے زیادہ رائج", hi: "सबसे ज़्यादा कारोबार" }),
      },
      {
        href: "/spot-gold",
        label: pick(locale, { en: "Spot Gold (XAU/USD)", ar: "السعر الفوري XAU/USD", fr: "Or spot (XAU/USD)", tr: "Spot altın (XAU/USD)", ur: "اسپاٹ گولڈ (XAU/USD)", hi: "स्पॉट गोल्ड (XAU/USD)" }),
        note: pick(locale, { en: "Global USD reference", ar: "السعر العالمي بالدولار", fr: "Référence mondiale en USD", tr: "Küresel USD referansı", ur: "عالمی USD حوالہ", hi: "वैश्विक USD संदर्भ" }),
      },
      {
        href: "/gold-calculator",
        label: pick(locale, { en: "Gold calculator", ar: "حاسبة الذهب", fr: "Calculateur d'or", tr: "Altın hesaplayıcı", ur: "سونے کا کیلکولیٹر", hi: "सोना कैलकुलेटर" }),
        note: inCurrency(locale, currency),
      },
      {
        href: "/news/spot-gold-vs-retail-jeweller-spread",
        label: pick(locale, { en: "Spot vs retail spread", ar: "هامش الصائغ", fr: "Écart spot / détail", tr: "Spot-perakende farkı", ur: "اسپاٹ بمقابلہ ریٹیل فرق", hi: "स्पॉट बनाम रिटेल अंतर" }),
        note: pick(locale, { en: "How prices are set", ar: "كيف يُحسب السعر", fr: "Comment les prix sont fixés", tr: "Fiyatlar nasıl belirlenir", ur: "قیمتیں کیسے طے ہوتی ہیں", hi: "भाव कैसे तय होते हैं" }),
      },
      {
        href: "/methodology",
        label: pick(locale, { en: "Methodology", ar: "المنهجية", fr: "Méthodologie", tr: "Metodoloji", ur: "طریقۂ کار", hi: "कार्यप्रणाली" }),
        note: pick(locale, { en: "Where prices come from", ar: "من أين تأتي الأسعار", fr: "D'où viennent les prix", tr: "Fiyatlar nereden geliyor", ur: "قیمتیں کہاں سے آتی ہیں", hi: "भाव कहाँ से आते हैं" }),
      },
    ],
  };
}

/** "In JOD" / "بعملة JOD" — note under currency-specific links. */
export const inCurrency = (locale: string, currency: string) =>
  pick(locale, {
    en: `In ${currency}`,
    ar: `بعملة ${currency}`,
    fr: `En ${currency}`,
    tr: `${currency} cinsinden`,
    ur: `${currency} میں`,
    hi: `${currency} में`,
  });

/** "{karat} gold price in nearby countries" block labels. */
export function nearbyText(locale: string, karat: string) {
  const k = karatLabel(locale, karat);
  return {
    heading: pick(locale, {
      en: `${k} gold price in nearby countries`,
      ar: `سعر الذهب ${k} في دول قريبة`,
      fr: `Prix de l'or ${k} dans les pays voisins`,
      tr: `Yakın ülkelerde ${k} altın fiyatı`,
      ur: `قریبی ممالک میں ${k} سونے کی قیمت`,
      hi: `पड़ोसी देशों में ${k} सोने का भाव`,
    }),
    allLabel: pick(locale, { en: "All countries", ar: "كل الدول", fr: "Tous les pays", tr: "Tüm ülkeler", ur: "تمام ممالک", hi: "सभी देश" }),
    allNote: pick(locale, { en: "Browse every market", ar: "تصفّح جميع الأسواق", fr: "Parcourir tous les marchés", tr: "Tüm piyasalara göz atın", ur: "تمام مارکیٹیں دیکھیں", hi: "सभी बाज़ार देखें" }),
  };
}
