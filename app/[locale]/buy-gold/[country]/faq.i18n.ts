import { pick, pickList } from "@/lib/i18n-text";
import type { FaqQA } from "@/lib/schemas";

type BuyFaqVars = {
  /** Localized country name. */
  name: string;
  /** ISO currency code. */
  currency: string;
  /** Country-specific VAT answer from BUY_GOLD_EDITORIAL (en/ar only) — null when no editorial exists. */
  vatAnswer: { en: string; ar: string } | null;
};

const VAT_FALLBACK = {
  en: "Tax rules vary by country. Check local regulations.",
  ar: "تختلف الضرائب حسب البلد. تحقق من اللوائح المحلية.",
  fr: "Les règles fiscales varient selon le pays. Vérifiez la réglementation locale.",
  tr: "Vergi kuralları ülkeye göre değişir. Yerel mevzuatı kontrol edin.",
  ur: "ٹیکس کے قواعد ملک کے حساب سے مختلف ہیں۔ مقامی ضوابط دیکھیں۔",
  hi: "टैक्स नियम देश के अनुसार अलग हैं। स्थानीय नियम देखें।",
};

/**
 * FAQ copy for /buy-gold/[country] — feeds the FAQPage JSON-LD.
 * `en`/`ar` are SEO-tuned; keep byte-identical. The VAT answer comes from the
 * bilingual editorial when present (English fallback for fr/tr/ur/hi).
 */
export function buyGoldFaqs(locale: string, { name, currency, vatAnswer }: BuyFaqVars): FaqQA[] {
  const vat = vatAnswer ? pick(locale, vatAnswer) : pick(locale, VAT_FALLBACK);
  return pickList<FaqQA>(locale, {
    en: [
      {
        q: `How do I buy gold in ${name}?`,
        a: `Gold is sold in ${name} via: (1) traditional gold shops and licensed goldsmiths, (2) banks (some sell investment bullion), (3) verified e-commerce platforms. Always verify: hallmark stamp, documented receipt, LBMA certification for investment bullion.`,
      },
      {
        q: `What is the difference between buying coins and bars in ${name}?`,
        a: `Coins: small denominations (1/10, 1/4, 1/2, 1 oz), high liquidity, higher premium (5-10% over spot), easy to sell later. Bars: from 1 gram to 1 kilo, lower premium (1-3% for kilo), target long-term investment.`,
      },
      {
        q: `Do I need to pay tax when buying gold in ${name}?`,
        a: vat,
      },
      {
        q: `How do I verify gold authenticity in ${name}?`,
        a: `Check: (1) hallmark stamp (specifies karat), (2) assay certificate for bullion (PAMP, Valcambi, Argor), (3) receipt from a licensed dealer, (4) simple acid test in-shop, (5) for large bars: verify serial number with the refinery.`,
      },
      {
        q: `What is a fair gold price in ${name}?`,
        a: `Fair price = global spot price + (1) local VAT + (2) dealer margin (3-10% for bullion, 15-40% for jewellery including making charge). The table above shows the live spot price in ${currency} — your reference for negotiation.`,
      },
    ],
    ar: [
      {
        q: `كيف أشتري الذهب في ${name}؟`,
        a: `الذهب يُباع في ${name} عبر: (1) محلات الذهب التقليدية والصاغة المرخصين، (2) البنوك (بعضها تبيع سبائك استثمارية)، (3) المتاجر الإلكترونية الموثقة. تأكد دائماً من: الهولمارك (ختم العيار)، فاتورة موثقة، شهادة LBMA للسبائك الاستثمارية.`,
      },
      {
        q: `ما الفرق بين شراء العملات والسبائك في ${name}؟`,
        a: `العملات: قطع صغيرة (1/10، 1/4، 1/2، 1 أونصة)، سيولة عالية، هامش premium أعلى (5-10% فوق السعر الفوري)، سهلة البيع لاحقاً. السبائك: من 1 جرام إلى 1 كيلو، هامش أقل (1-3% للكيلو)، تستهدف الاستثمار طويل المدى.`,
      },
      {
        q: `هل أحتاج لدفع ضريبة عند شراء الذهب في ${name}؟`,
        a: vat,
      },
      {
        q: `كيف أتأكد من أصالة الذهب المُشترى في ${name}؟`,
        a: `تحقق من: (1) ختم الهولمارك (يُحدد العيار)، (2) شهادة المختبر للسبائك (مثل PAMP، Valcambi، Argor)، (3) فاتورة من بائع مرخص، (4) اختبار حمضي بسيط في المحل، (5) للسبائك الكبيرة: تحقق من السيريال نومبر مع المُصنّع.`,
      },
      {
        q: `ما السعر العادل للذهب في ${name}؟`,
        a: `السعر العادل = السعر الفوري العالمي + (1) ضريبة محلية + (2) هامش بائع (3-10% للسبائك، 15-40% للمجوهرات شاملاً المصنعية). الجدول أعلاه يعرض السعر الفوري الحالي بـ${currency} — هذا مرجعك للتفاوض.`,
      },
    ],
    fr: [
      {
        q: `${name} : comment acheter de l'or ?`,
        a: `L'or s'achète via : (1) les bijouteries traditionnelles et orfèvres agréés, (2) les banques (certaines vendent des lingots d'investissement), (3) les plateformes e-commerce vérifiées. Vérifiez toujours : le poinçon, une facture en bonne et due forme, la certification LBMA pour les lingots d'investissement.`,
      },
      {
        q: `${name} : quelle différence entre acheter des pièces et des lingots ?`,
        a: `Pièces : petites unités (1/10, 1/4, 1/2, 1 oz), forte liquidité, prime plus élevée (5 à 10 % au-dessus du spot), faciles à revendre. Lingots : de 1 gramme à 1 kilo, prime plus faible (1 à 3 % pour le kilo), destinés à l'investissement de long terme.`,
      },
      {
        q: `${name} : faut-il payer une taxe à l'achat d'or ?`,
        a: vat,
      },
      {
        q: `${name} : comment vérifier l'authenticité de l'or acheté ?`,
        a: `Vérifiez : (1) le poinçon (indique le titre), (2) le certificat d'essai pour les lingots (PAMP, Valcambi, Argor), (3) une facture d'un vendeur agréé, (4) un test à l'acide simple en boutique, (5) pour les gros lingots : le numéro de série auprès de l'affineur.`,
      },
      {
        q: `${name} : quel est un prix juste pour l'or ?`,
        a: `Prix juste = cours spot mondial + (1) TVA locale + (2) marge du vendeur (3 à 10 % pour les lingots, 15 à 40 % pour les bijoux, façon comprise). Le tableau ci-dessus affiche le cours spot en ${currency} — votre référence pour négocier.`,
      },
    ],
    tr: [
      {
        q: `${name}: altın nasıl alınır?`,
        a: `Altın şu yollarla satılır: (1) geleneksel kuyumcular ve lisanslı sarraflar, (2) bankalar (bazıları yatırım külçesi satar), (3) doğrulanmış e-ticaret platformları. Her zaman kontrol edin: ayar damgası, belgeli fatura, yatırım külçesi için LBMA sertifikası.`,
      },
      {
        q: `${name}: sikke ile külçe almak arasındaki fark nedir?`,
        a: `Sikkeler: küçük birimler (1/10, 1/4, 1/2, 1 ons), yüksek likidite, daha yüksek prim (spotun %5-10 üzeri), sonradan satması kolay. Külçeler: 1 gramdan 1 kiloya, daha düşük prim (kiloda %1-3), uzun vadeli yatırıma yönelik.`,
      },
      {
        q: `${name}: altın alırken vergi ödemem gerekir mi?`,
        a: vat,
      },
      {
        q: `${name}: aldığım altının gerçekliğini nasıl doğrularım?`,
        a: `Kontrol edin: (1) ayar damgası (ayarı belirtir), (2) külçe için analiz sertifikası (PAMP, Valcambi, Argor), (3) lisanslı satıcıdan fatura, (4) dükkânda basit asit testi, (5) büyük külçelerde: seri numarasını rafineriden doğrulayın.`,
      },
      {
        q: `${name}: adil altın fiyatı nedir?`,
        a: `Adil fiyat = küresel spot fiyat + (1) yerel KDV + (2) satıcı marjı (külçede %3-10, işçilik dahil takıda %15-40). Yukarıdaki tablo canlı spot fiyatı ${currency} cinsinden gösterir — pazarlık için referansınız.`,
      },
    ],
    ur: [
      {
        q: `${name} میں سونا کیسے خریدوں؟`,
        a: `${name} میں سونا ان ذرائع سے بکتا ہے: (1) روایتی صرافہ دکانیں اور لائسنس یافتہ سنار، (2) بینک (کچھ سرمایہ کاری کی سلاخیں بیچتے ہیں)، (3) تصدیق شدہ آن لائن اسٹور۔ ہمیشہ جانچیں: ہال مارک (قیراط کی مہر)، باقاعدہ رسید، سرمایہ کاری کی سلاخوں کے لیے LBMA سرٹیفکیٹ۔`,
      },
      {
        q: `${name} میں سکے اور سلاخیں خریدنے میں کیا فرق ہے؟`,
        a: `سکے: چھوٹی اکائیاں (1/10، 1/4، 1/2، 1 اونس)، زیادہ لیکویڈیٹی، زیادہ پریمیم (اسپاٹ سے 5 تا 10% اوپر)، بعد میں بیچنا آسان۔ سلاخیں: 1 گرام سے 1 کلو تک، کم پریمیم (کلو پر 1 تا 3%)، طویل مدتی سرمایہ کاری کے لیے۔`,
      },
      {
        q: `کیا ${name} میں سونا خریدنے پر ٹیکس دینا ہوتا ہے؟`,
        a: vat,
      },
      {
        q: `${name} میں خریدے گئے سونے کی اصلیت کیسے جانچوں؟`,
        a: `جانچیں: (1) ہال مارک کی مہر (قیراط بتاتی ہے)، (2) سلاخوں کا اسے سرٹیفکیٹ (PAMP، Valcambi، Argor)، (3) لائسنس یافتہ دکاندار کی رسید، (4) دکان پر سادہ ایسڈ ٹیسٹ، (5) بڑی سلاخوں کے لیے: سیریل نمبر ریفائنری سے تصدیق کریں۔`,
      },
      {
        q: `${name} میں سونے کی مناسب قیمت کیا ہے؟`,
        a: `مناسب قیمت = عالمی اسپاٹ قیمت + (1) مقامی ٹیکس + (2) دکاندار کا منافع (سلاخوں پر 3 تا 10%، بنوائی سمیت زیورات پر 15 تا 40%)۔ اوپر کی جدول ${currency} میں لائیو اسپاٹ قیمت دکھاتی ہے — بھاؤ تاؤ کے لیے یہی آپ کا حوالہ ہے۔`,
      },
    ],
    hi: [
      {
        q: `${name} में सोना कैसे ख़रीदें?`,
        a: `${name} में सोना इन जगहों से मिलता है: (1) पारंपरिक सर्राफ़ा दुकानें और लाइसेंसधारी सुनार, (2) बैंक (कुछ निवेश बुलियन बेचते हैं), (3) सत्यापित ई-कॉमर्स प्लेटफ़ॉर्म। हमेशा जाँचें: हॉलमार्क मुहर, पक्की रसीद, निवेश बुलियन के लिए LBMA प्रमाणन।`,
      },
      {
        q: `${name} में सिक्के और छड़ें ख़रीदने में क्या अंतर है?`,
        a: `सिक्के: छोटी इकाइयाँ (1/10, 1/4, 1/2, 1 औंस), ऊँची तरलता, ज़्यादा प्रीमियम (स्पॉट से 5-10% ऊपर), बाद में बेचना आसान। छड़ें: 1 ग्राम से 1 किलो तक, कम प्रीमियम (किलो पर 1-3%), लंबी अवधि के निवेश के लिए।`,
      },
      {
        q: `क्या ${name} में सोना ख़रीदने पर टैक्स देना पड़ता है?`,
        a: vat,
      },
      {
        q: `${name} में ख़रीदे गए सोने की असलियत कैसे जाँचें?`,
        a: `जाँचें: (1) हॉलमार्क मुहर (कैरेट बताती है), (2) छड़ों का एसे प्रमाणपत्र (PAMP, Valcambi, Argor), (3) लाइसेंसधारी विक्रेता की रसीद, (4) दुकान पर साधारण एसिड टेस्ट, (5) बड़ी छड़ों के लिए: सीरियल नंबर रिफ़ाइनरी से जाँचें।`,
      },
      {
        q: `${name} में सोने का उचित भाव क्या है?`,
        a: `उचित भाव = वैश्विक स्पॉट भाव + (1) स्थानीय टैक्स + (2) विक्रेता मार्जिन (बुलियन पर 3-10%, मेकिंग चार्ज सहित ज्वेलरी पर 15-40%)। ऊपर की तालिका ${currency} में लाइव स्पॉट भाव दिखाती है — मोल-भाव के लिए यही आपका संदर्भ है।`,
      },
    ],
  });
}
