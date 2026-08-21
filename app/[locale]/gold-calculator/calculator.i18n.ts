/**
 * Inline copy for `/gold-calculator`: FAQ list plus the WebApplication and
 * HowTo schema strings in all six locales. Sibling module so `page.tsx`
 * stays under the 500-line limit.
 */
import { pick, pickList, type LocaleText } from "@/lib/i18n-text";

export type CalcFaq = { q: string; a: string };

const FAQS: { en: CalcFaq[]; ar: CalcFaq[]; fr: CalcFaq[]; tr: CalcFaq[]; ur: CalcFaq[]; hi: CalcFaq[] } = {
  ar: [
    {
      q: "كيف أحسب سعر الذهب بالجرام؟",
      a: "اضرب وزن قطعة الذهب بالجرام في نسبة النقاء (24K=100%، 21K=87.5%، 18K=75%، 14K=58.3%) ثم في سعر الجرام الفوري بالدولار. حوّل الناتج إلى عملتك المحلية باستخدام سعر الصرف اليومي. حاسبتنا تفعل كل ذلك تلقائياً.",
    },
    {
      q: "ما الفرق بين الذهب عيار 21 و24؟",
      a: "عيار 24 ذهب صافٍ بنسبة 99.9% (سبائك الاستثمار)؛ عيار 21 ذهب 87.5% مع 12.5% معادن صلابة (الأكثر شيوعاً في المجوهرات الخليجية). السعر النسبي: 21K ≈ 87.5% من سعر 24K لنفس الوزن.",
    },
    {
      q: "هل تشمل الحاسبة المصنعية؟",
      a: "لا. الحاسبة تعرض القيمة الفعلية للذهب الخام (السعر الفوري × النقاء × الوزن). تضيف محلات الذهب مصنعية (5-30 ريال/جرام للمجوهرات) وضريبة القيمة المضافة المحلية. النتيجة هي الحد الأدنى قبل أي هامش تجزئة.",
    },
    {
      q: "ما هي العملات المدعومة؟",
      a: "أكثر من 40 عملة: USD، SAR، JOD، AED، EGP، EUR، GBP، JPY، CNY، INR، PKR وأكثر. أسعار الصرف تُحدّث يومياً من بيانات البنوك المركزية المفتوحة.",
    },
    {
      q: "كم مرة تُحدّث الأسعار؟",
      a: "السعر الفوري للذهب (XAU/USD) يُحدّث كل ثانية عبر WebSocket من Binance وCoinbase وKraken. أسعار صرف العملات تُحدّث كل ساعة من قاعدة بيانات fawazahmed0/currency-api.",
    },
  ],
  en: [
    {
      q: "How do I calculate the gold price per gram?",
      a: "Multiply the weight of your gold piece in grams by the purity ratio (24K=100%, 21K=87.5%, 18K=75%, 14K=58.3%), then by the spot price per gram in USD. Convert to your local currency using the day's mid-market FX rate. Our calculator does all of this automatically.",
    },
    {
      q: "What is the difference between 21K and 24K gold?",
      a: "24K is pure 99.9% gold (investment bullion); 21K is 87.5% gold alloyed with 12.5% hardening metals (the most common karat in Gulf jewelry). Price relationship: 21K equals approximately 87.5% of the 24K price for the same weight.",
    },
    {
      q: "Does the calculator include making charges?",
      a: "No. The calculator shows the raw spot-equivalent gold value (spot price × purity × weight). Jewellery shops add making charges (typically 5-30 SAR/gram for jewellery) and local VAT. The result is the floor price before any retail premium.",
    },
    {
      q: "Which currencies does the calculator support?",
      a: "Over 40 currencies including USD, SAR, JOD, AED, EGP, EUR, GBP, JPY, CNY, INR, PKR and more. Exchange rates update daily from open central-bank data.",
    },
    {
      q: "How often are gold prices updated?",
      a: "Spot gold (XAU/USD) updates every second via WebSocket from Binance, Coinbase and Kraken. Currency exchange rates refresh hourly from fawazahmed0/currency-api.",
    },
  ],
  fr: [
    {
      q: "Comment calculer le prix de l'or au gramme ?",
      a: "Multipliez le poids de votre pièce en grammes par le taux de pureté (24K=100%, 21K=87.5%, 18K=75%, 14K=58.3%), puis par le cours spot du gramme en USD. Convertissez ensuite dans votre devise au taux de change du jour. Notre calculateur fait tout cela automatiquement.",
    },
    {
      q: "Quelle est la différence entre l'or 21 carats et 24 carats ?",
      a: "Le 24 carats est de l'or pur à 99.9% (lingots d'investissement) ; le 21 carats contient 87.5% d'or et 12.5% de métaux durcissants (le titre le plus courant dans la bijouterie du Golfe). Rapport de prix : le 21K vaut environ 87.5% du prix du 24K à poids égal.",
    },
    {
      q: "Le calculateur inclut-il les frais de façon ?",
      a: "Non. Le calculateur affiche la valeur brute de l'or au cours spot (cours × pureté × poids). Les bijoutiers ajoutent des frais de façon (généralement 5 à 30 SAR/gramme) et la TVA locale. Le résultat est le prix plancher avant toute marge de détail.",
    },
    {
      q: "Quelles devises le calculateur prend-il en charge ?",
      a: "Plus de 40 devises : USD, SAR, JOD, AED, EGP, EUR, GBP, JPY, CNY, INR, PKR et d'autres. Les taux de change sont mis à jour chaque jour à partir de données ouvertes de banques centrales.",
    },
    {
      q: "À quelle fréquence les cours de l'or sont-ils mis à jour ?",
      a: "L'or spot (XAU/USD) est mis à jour chaque seconde via WebSocket depuis Binance, Coinbase et Kraken. Les taux de change sont rafraîchis toutes les heures depuis fawazahmed0/currency-api.",
    },
  ],
  tr: [
    {
      q: "Gram altın fiyatı nasıl hesaplanır?",
      a: "Altın parçanızın gram ağırlığını saflık oranıyla (24K=%100, 21K=%87.5, 18K=%75, 14K=%58.3), ardından USD cinsinden gram spot fiyatıyla çarpın. Sonucu günün piyasa kuruyla yerel para biriminize çevirin. Hesaplayıcımız bunların tümünü otomatik yapar.",
    },
    {
      q: "21 ayar ile 24 ayar altın arasındaki fark nedir?",
      a: "24 ayar %99.9 saf altındır (yatırımlık külçe); 21 ayar ise %87.5 altın ve %12.5 sertleştirici metalden oluşur (Körfez kuyumculuğunda en yaygın ayar). Fiyat ilişkisi: 21K, aynı ağırlıkta 24K fiyatının yaklaşık %87.5'idir.",
    },
    {
      q: "Hesaplayıcı işçiliği içeriyor mu?",
      a: "Hayır. Hesaplayıcı ham altının spot karşılığını gösterir (spot fiyat × saflık × ağırlık). Kuyumcular işçilik (genellikle gram başına 5-30 SAR) ve yerel KDV ekler. Sonuç, perakende primi öncesi taban fiyattır.",
    },
    {
      q: "Hesaplayıcı hangi para birimlerini destekliyor?",
      a: "USD, SAR, JOD, AED, EGP, EUR, GBP, JPY, CNY, INR, PKR dahil 40'tan fazla para birimi. Döviz kurları açık merkez bankası verilerinden günlük güncellenir.",
    },
    {
      q: "Altın fiyatları ne sıklıkla güncellenir?",
      a: "Spot altın (XAU/USD) Binance, Coinbase ve Kraken'den WebSocket ile her saniye güncellenir. Döviz kurları fawazahmed0/currency-api üzerinden saatlik yenilenir.",
    },
  ],
  ur: [
    {
      q: "سونے کی فی گرام قیمت کیسے نکالوں؟",
      a: "اپنے سونے کے وزن (گرام میں) کو خالصیت کے تناسب (24K=100%، 21K=87.5%، 18K=75%، 14K=58.3%) سے ضرب دیں، پھر ڈالر میں فی گرام اسپاٹ قیمت سے۔ نتیجے کو دن کے ایکسچینج ریٹ سے اپنی کرنسی میں بدلیں۔ ہمارا کیلکولیٹر یہ سب خودکار طور پر کرتا ہے۔",
    },
    {
      q: "21 قیراط اور 24 قیراط سونے میں کیا فرق ہے؟",
      a: "24 قیراط 99.9% خالص سونا ہے (سرمایہ کاری کے بار)؛ 21 قیراط میں 87.5% سونا اور 12.5% سخت کرنے والی دھاتیں ہوتی ہیں (خلیجی زیورات میں سب سے عام قیراط)۔ قیمت کا تناسب: 21K اسی وزن پر 24K کی قیمت کا تقریباً 87.5% ہوتا ہے۔",
    },
    {
      q: "کیا کیلکولیٹر میں بنوائی شامل ہے؟",
      a: "نہیں۔ کیلکولیٹر خام سونے کی اسپاٹ قیمت دکھاتا ہے (اسپاٹ قیمت × خالصیت × وزن)۔ سنار بنوائی (عموماً 5 تا 30 ریال فی گرام) اور مقامی ویٹ الگ سے لگاتے ہیں۔ نتیجہ کسی بھی ریٹیل منافع سے پہلے کی کم از کم قیمت ہے۔",
    },
    {
      q: "کیلکولیٹر کون سی کرنسیاں سپورٹ کرتا ہے؟",
      a: "40 سے زیادہ کرنسیاں: USD، SAR، JOD، AED، EGP، EUR، GBP، JPY، CNY، INR، PKR اور دیگر۔ ایکسچینج ریٹس مرکزی بینکوں کے اوپن ڈیٹا سے روزانہ اپڈیٹ ہوتے ہیں۔",
    },
    {
      q: "سونے کی قیمتیں کتنی بار اپڈیٹ ہوتی ہیں؟",
      a: "اسپاٹ گولڈ (XAU/USD) ہر سیکنڈ Binance، Coinbase اور Kraken سے WebSocket کے ذریعے اپڈیٹ ہوتا ہے۔ کرنسی ایکسچینج ریٹس ہر گھنٹے fawazahmed0/currency-api سے تازہ ہوتے ہیں۔",
    },
  ],
  hi: [
    {
      q: "सोने का प्रति ग्राम भाव कैसे निकालें?",
      a: "अपने सोने के वज़न (ग्राम में) को शुद्धता अनुपात (24K=100%, 21K=87.5%, 18K=75%, 14K=58.3%) से गुणा करें, फिर USD में प्रति ग्राम स्पॉट भाव से। नतीजे को दिन की विनिमय दर से अपनी मुद्रा में बदलें। हमारा कैलकुलेटर यह सब अपने आप करता है।",
    },
    {
      q: "21 कैरेट और 24 कैरेट सोने में क्या अंतर है?",
      a: "24 कैरेट 99.9% शुद्ध सोना है (निवेश बुलियन); 21 कैरेट में 87.5% सोना और 12.5% कठोर बनाने वाली धातुएँ होती हैं (खाड़ी देशों के आभूषणों में सबसे आम कैरेट)। भाव का संबंध: समान वज़न पर 21K का भाव 24K के भाव का लगभग 87.5% होता है।",
    },
    {
      q: "क्या कैलकुलेटर में मेकिंग चार्ज शामिल है?",
      a: "नहीं। कैलकुलेटर कच्चे सोने का स्पॉट-समतुल्य मूल्य दिखाता है (स्पॉट भाव × शुद्धता × वज़न)। ज्वेलर्स मेकिंग चार्ज (आमतौर पर 5-30 SAR/ग्राम) और स्थानीय VAT जोड़ते हैं। नतीजा किसी भी रिटेल प्रीमियम से पहले का न्यूनतम भाव है।",
    },
    {
      q: "कैलकुलेटर कौन-सी मुद्राएँ सपोर्ट करता है?",
      a: "40 से अधिक मुद्राएँ: USD, SAR, JOD, AED, EGP, EUR, GBP, JPY, CNY, INR, PKR और अन्य। विनिमय दरें केंद्रीय बैंकों के ओपन डेटा से रोज़ अपडेट होती हैं।",
    },
    {
      q: "सोने के भाव कितनी बार अपडेट होते हैं?",
      a: "स्पॉट गोल्ड (XAU/USD) हर सेकंड Binance, Coinbase और Kraken से WebSocket के ज़रिए अपडेट होता है। मुद्रा विनिमय दरें हर घंटे fawazahmed0/currency-api से रिफ्रेश होती हैं।",
    },
  ],
};

export function calcFaqs(locale: string): CalcFaq[] {
  return pickList(locale, FAQS);
}

const WEBAPP_NAME: LocaleText = {
  en: "Gold Price Calculator — by weight, karat and currency",
  ar: "حاسبة أسعار الذهب — بأي وزن وعيار وعملة",
  fr: "Calculateur du prix de l'or — par poids, titre et devise",
  tr: "Altın Fiyatı Hesaplayıcı — ağırlık, ayar ve para birimine göre",
  ur: "سونے کی قیمت کا کیلکولیٹر — وزن، قیراط اور کرنسی کے مطابق",
  hi: "सोने का भाव कैलकुलेटर — वज़न, कैरेट और मुद्रा के अनुसार",
};

const WEBAPP_DESC: LocaleText = {
  en: "Calculate the live spot-equivalent value of gold for any weight (gram/ounce/kilogram), karat (24/21/18/14) and currency (40+ supported) using real-time market prices.",
  ar: "احسب قيمة الذهب الفعلية لأي وزن (جرام/أونصة/كيلوغرام) وعيار (24/21/18/14) وعملة (40+ عملة) باستخدام السعر الفوري المباشر.",
  fr: "Calculez la valeur spot en direct de l'or pour n'importe quel poids (gramme/once/kilogramme), titre (24/21/18/14) et devise (40+ prises en charge) à partir des cours en temps réel.",
  tr: "Gerçek zamanlı piyasa fiyatlarıyla herhangi bir ağırlık (gram/ons/kilogram), ayar (24/21/18/14) ve para birimi (40+ destekli) için altının canlı spot karşılığını hesaplayın.",
  ur: "ریئل ٹائم مارکیٹ قیمتوں سے کسی بھی وزن (گرام/اونس/کلوگرام)، قیراط (24/21/18/14) اور کرنسی (40+ سپورٹڈ) کے لیے سونے کی لائیو اسپاٹ قیمت نکالیں۔",
  hi: "रीयल-टाइम बाज़ार भाव से किसी भी वज़न (ग्राम/औंस/किलोग्राम), कैरेट (24/21/18/14) और मुद्रा (40+ समर्थित) के लिए सोने का लाइव स्पॉट-समतुल्य मूल्य निकालें।",
};

const WEBAPP_FEATURES = {
  en: ["Multi-currency", "Multi-karat", "Real-time pricing", "Zakat calculation"],
  ar: ["متعدد العملات", "متعدد العيارات", "تحديث لحظي", "حساب الزكاة"],
  fr: ["Multi-devises", "Multi-titres", "Cours en temps réel", "Calcul de la zakat"],
  tr: ["Çoklu para birimi", "Çoklu ayar", "Gerçek zamanlı fiyat", "Zekât hesabı"],
  ur: ["متعدد کرنسیاں", "متعدد قیراط", "ریئل ٹائم قیمت", "زکوٰۃ کا حساب"],
  hi: ["मल्टी-करेंसी", "मल्टी-कैरेट", "रीयल-टाइम भाव", "ज़कात गणना"],
};

export function calcWebAppText(locale: string) {
  return {
    name: pick(locale, WEBAPP_NAME),
    description: pick(locale, WEBAPP_DESC),
    features: pickList(locale, WEBAPP_FEATURES),
  };
}

const HOWTO_NAME: LocaleText = {
  en: "How to calculate gold value in any currency",
  ar: "كيفية حساب قيمة الذهب بأي عملة",
  fr: "Comment calculer la valeur de l'or dans n'importe quelle devise",
  tr: "Altının değeri herhangi bir para biriminde nasıl hesaplanır",
  ur: "کسی بھی کرنسی میں سونے کی قیمت کیسے نکالیں",
  hi: "किसी भी मुद्रा में सोने का मूल्य कैसे निकालें",
};

const HOWTO_DESC: LocaleText = {
  en: "Calculate the real value of gold based on weight, karat purity, and target currency using live market prices.",
  ar: "احسب قيمة الذهب الفعلية بناءً على الوزن والعيار والعملة باستخدام أسعار السوق الحية.",
  fr: "Calculez la valeur réelle de l'or selon le poids, le titre et la devise cible à partir des cours en direct.",
  tr: "Canlı piyasa fiyatlarını kullanarak ağırlık, ayar saflığı ve hedef para birimine göre altının gerçek değerini hesaplayın.",
  ur: "لائیو مارکیٹ قیمتوں سے وزن، قیراط اور مطلوبہ کرنسی کے مطابق سونے کی اصل قیمت نکالیں۔",
  hi: "लाइव बाज़ार भाव से वज़न, कैरेट शुद्धता और लक्षित मुद्रा के आधार पर सोने का वास्तविक मूल्य निकालें।",
};

const HOWTO_STEPS: { id: string; name: LocaleText; text: LocaleText }[] = [
  {
    id: "step-weight",
    name: {
      en: "Enter the weight in grams",
      ar: "أدخل الوزن بالغرام",
      fr: "Saisissez le poids en grammes",
      tr: "Ağırlığı gram olarak girin",
      ur: "وزن گرام میں درج کریں",
      hi: "वज़न ग्राम में दर्ज करें",
    },
    text: {
      en: "Type the weight of the gold piece in grams or troy ounces.",
      ar: "أدخل وزن قطعة الذهب بالغرام أو الأونصة الترويسية.",
      fr: "Indiquez le poids de la pièce d'or en grammes ou en onces troy.",
      tr: "Altın parçasının ağırlığını gram veya troy ons olarak yazın.",
      ur: "سونے کی چیز کا وزن گرام یا ٹرائے اونس میں لکھیں۔",
      hi: "सोने की वस्तु का वज़न ग्राम या ट्रॉय औंस में लिखें।",
    },
  },
  {
    id: "step-karat",
    name: {
      en: "Select the karat",
      ar: "اختر العيار",
      fr: "Choisissez le titre",
      tr: "Ayarı seçin",
      ur: "قیراط منتخب کریں",
      hi: "कैरेट चुनें",
    },
    text: {
      en: "Pick 24K (99.9% pure), 21K (87.5%), 18K (75%), or 14K (58.3%). Each karat adjusts the price by purity ratio.",
      ar: "اختر 24K (نقاء 99.9%) أو 21K أو 18K أو 14K. كل عيار يعدّل السعر بناءً على نسبة النقاء.",
      fr: "Choisissez 24K (pureté 99.9%), 21K (87.5%), 18K (75%) ou 14K (58.3%). Chaque titre ajuste le prix selon le taux de pureté.",
      tr: "24K (%99.9 saf), 21K (%87.5), 18K (%75) veya 14K (%58.3) seçin. Her ayar fiyatı saflık oranına göre ayarlar.",
      ur: "24K (99.9% خالص)، 21K (87.5%)، 18K (75%) یا 14K (58.3%) منتخب کریں۔ ہر قیراط خالصیت کے تناسب سے قیمت بدلتا ہے۔",
      hi: "24K (99.9% शुद्ध), 21K (87.5%), 18K (75%) या 14K (58.3%) चुनें। हर कैरेट शुद्धता अनुपात के हिसाब से भाव बदलता है।",
    },
  },
  {
    id: "step-currency",
    name: {
      en: "Choose target currency",
      ar: "اختر العملة",
      fr: "Choisissez la devise cible",
      tr: "Hedef para birimini seçin",
      ur: "مطلوبہ کرنسی منتخب کریں",
      hi: "लक्षित मुद्रा चुनें",
    },
    text: {
      en: "Pick from 40+ supported currencies (USD, SAR, JOD, AED, EGP, EUR, GBP, etc).",
      ar: "اختر من بين 40+ عملة مدعومة (USD، SAR، JOD، AED، EGP، EUR، GBP وغيرها).",
      fr: "Choisissez parmi plus de 40 devises prises en charge (USD, SAR, JOD, AED, EGP, EUR, GBP, etc.).",
      tr: "Desteklenen 40'tan fazla para biriminden birini seçin (USD, SAR, JOD, AED, EGP, EUR, GBP vb.).",
      ur: "40 سے زیادہ سپورٹڈ کرنسیوں میں سے منتخب کریں (USD، SAR، JOD، AED، EGP، EUR، GBP وغیرہ)۔",
      hi: "40+ समर्थित मुद्राओं में से चुनें (USD, SAR, JOD, AED, EGP, EUR, GBP आदि)।",
    },
  },
  {
    id: "step-result",
    name: {
      en: "Read the calculated value",
      ar: "اقرأ القيمة المحسوبة",
      fr: "Lisez la valeur calculée",
      tr: "Hesaplanan değeri okuyun",
      ur: "حساب شدہ قیمت دیکھیں",
      hi: "निकाला गया मूल्य देखें",
    },
    text: {
      en: "The value appears instantly. Note: this is the spot equivalent — jewellers will add a retail premium.",
      ar: "تظهر القيمة فوراً. تذكّر: السعر هو سعر السوق الفوري — قد يضيف الصائغ هامشاً للتجزئة.",
      fr: "La valeur s'affiche instantanément. Rappel : il s'agit de l'équivalent spot — les bijoutiers ajoutent une marge de détail.",
      tr: "Değer anında görünür. Not: bu spot karşılığıdır — kuyumcular perakende primi ekler.",
      ur: "قیمت فوراً ظاہر ہوتی ہے۔ یاد رکھیں: یہ اسپاٹ قیمت ہے — سنار ریٹیل منافع الگ سے لگاتے ہیں۔",
      hi: "मूल्य तुरंत दिखता है। ध्यान दें: यह स्पॉट-समतुल्य है — ज्वेलर्स रिटेल प्रीमियम जोड़ते हैं।",
    },
  },
];

export function calcHowToText(locale: string) {
  return {
    name: pick(locale, HOWTO_NAME),
    description: pick(locale, HOWTO_DESC),
    steps: HOWTO_STEPS.map((s) => ({
      id: s.id,
      name: pick(locale, s.name),
      text: pick(locale, s.text),
    })),
  };
}
