import { pick, type LocaleText } from "@/lib/i18n-text";

/**
 * Inline homepage copy (methodology summary, trust bullets, sources intro)
 * in all six locales. `ar` / `en` strings are the SEO-tuned originals and
 * must stay byte-identical; the other four are native translations.
 */

const HOW_H2: LocaleText = {
  en: "How we calculate gold prices",
  ar: "كيف نحسب سعر الذهب",
  fr: "Comment nous calculons le cours de l'or",
  tr: "Altın fiyatını nasıl hesaplıyoruz",
  ur: "ہم سونے کی قیمت کیسے نکالتے ہیں",
  hi: "हम सोने का भाव कैसे निकालते हैं",
};

const HOW_P1: LocaleText = {
  en: "Spot gold (XAU/USD) is the global price per troy ounce in US Dollars. We compute it as the per-tick median of three major exchanges — Binance, Coinbase, and Kraken — via the PAXG/USD pair. PAXG is a token backed 1:1 by physical London Good Delivery gold bars in Brink's vaults, tracking the LBMA fix within a few cents.",
  ar: "السعر الفوري للذهب (XAU/USD) هو السعر العالمي للأونصة الترويسية بالدولار الأمريكي. نحسبه كمتوسط لحظي من ثلاث بورصات رئيسية — Binance و Coinbase و Kraken — عبر زوج PAXG/USD. PAXG هو رمز مدعوم 1:1 بسبائك ذهب فيزيائية من فئة London Good Delivery موجودة في خزائن Brink's، ويتتبّع تثبيت LBMA بفارق سنتات قليلة.",
  fr: "L'or spot (XAU/USD) est le cours mondial de l'once troy en dollars américains. Nous le calculons comme la médiane, à chaque tick, de trois grandes places d'échange — Binance, Coinbase et Kraken — via la paire PAXG/USD. Le PAXG est un jeton adossé 1:1 à des lingots d'or physiques London Good Delivery conservés dans les coffres de Brink's, et il suit le fixing du LBMA à quelques cents près.",
  tr: "Spot altın (XAU/USD), troy ons başına ABD doları cinsinden küresel fiyattır. Bunu üç büyük borsanın — Binance, Coinbase ve Kraken — PAXG/USD paritesi üzerinden her tikteki medyanı olarak hesaplıyoruz. PAXG, Brink's kasalarındaki fiziksel London Good Delivery külçelerle 1:1 teminatlandırılmış bir tokendır ve LBMA fiyat sabitlemesini birkaç sent farkla izler.",
  ur: "اسپاٹ گولڈ (XAU/USD) امریکی ڈالر میں فی ٹرائے اونس عالمی قیمت ہے۔ ہم اسے تین بڑے ایکسچینجز — Binance، Coinbase اور Kraken — کے PAXG/USD جوڑے کی ہر ٹِک پر میڈین کے طور پر نکالتے ہیں۔ PAXG ایک ٹوکن ہے جس کی پشت پر Brink's کے والٹس میں رکھی London Good Delivery سونے کی اصل اینٹیں 1:1 موجود ہیں، اور یہ LBMA فکس کو چند سینٹ کے فرق سے ٹریک کرتا ہے۔",
  hi: "स्पॉट गोल्ड (XAU/USD) अमेरिकी डॉलर में प्रति ट्रॉय औंस का वैश्विक भाव है। हम इसे तीन बड़े एक्सचेंजों — Binance, Coinbase और Kraken — के PAXG/USD पेयर के हर टिक की माध्यिका के रूप में निकालते हैं। PAXG एक टोकन है जो Brink's की तिजोरियों में रखी London Good Delivery सोने की असली छड़ों से 1:1 समर्थित है और LBMA फिक्स को कुछ सेंट के अंतर से ट्रैक करता है।",
};

const HOW_P2: LocaleText = {
  en: "To convert spot to per-gram per karat, we divide by 31.1035 (grams per ounce) and multiply by purity ratio: 99.9% for 24K, 87.5% for 21K, 75% for 18K, 58.3% for 14K. We then multiply by daily mid-market FX from open central-bank data, giving per-gram prices in 40+ retail currencies including SAR, JOD, AED, and EGP.",
  ar: "لتحويل السعر الفوري إلى سعر الجرام لكل عيار، نقسم على 31.1035 (جرامات الأونصة) ثم نضرب بنسبة النقاء: 99.9% للعيار 24، 87.5% للعيار 21، 75% للعيار 18، و 58.3% للعيار 14. ثم نضرب بسعر صرف العملة اليومي من بيانات البنوك المركزية المفتوحة للحصول على سعر الجرام بأكثر من 40 عملة محلية تشمل الريال السعودي، الدينار الأردني، الدرهم الإماراتي، والجنيه المصري.",
  fr: "Pour passer du spot au prix du gramme par carat, nous divisons par 31,1035 (grammes par once) puis multiplions par le titre : 99,9 % pour le 24 carats, 87,5 % pour le 21 carats, 75 % pour le 18 carats et 58,3 % pour le 14 carats. Nous multiplions ensuite par le taux de change interbancaire quotidien issu des données ouvertes des banques centrales, ce qui donne le prix du gramme dans plus de 40 devises, dont le SAR, le JOD, l'AED et l'EGP.",
  tr: "Spot fiyatı ayar bazında gram fiyatına çevirmek için 31,1035'e (ons başına gram) bölüp saflık oranıyla çarpıyoruz: 24 ayar için %99,9, 21 ayar için %87,5, 18 ayar için %75, 14 ayar için %58,3. Ardından açık merkez bankası verilerinden alınan günlük orta piyasa kuruyla çarparak SAR, JOD, AED ve EGP dahil 40'tan fazla para biriminde gram fiyatı elde ediyoruz.",
  ur: "اسپاٹ قیمت کو فی گرام فی قیراط میں بدلنے کے لیے ہم 31.1035 (گرام فی اونس) پر تقسیم کرتے ہیں اور خالص پن کی شرح سے ضرب دیتے ہیں: 24 قیراط کے لیے 99.9%، 21 قیراط کے لیے 87.5%، 18 قیراط کے لیے 75% اور 14 قیراط کے لیے 58.3%۔ پھر مرکزی بینکوں کے کھلے ڈیٹا سے روزانہ کے مڈ مارکیٹ ایکسچینج ریٹ سے ضرب دے کر SAR، JOD، AED اور EGP سمیت 40 سے زائد کرنسیوں میں فی گرام قیمت نکالتے ہیں۔",
  hi: "स्पॉट भाव को प्रति ग्राम प्रति कैरेट में बदलने के लिए हम 31.1035 (ग्राम प्रति औंस) से भाग देते हैं और शुद्धता अनुपात से गुणा करते हैं: 24 कैरेट के लिए 99.9%, 21 कैरेट के लिए 87.5%, 18 कैरेट के लिए 75%, 14 कैरेट के लिए 58.3%। फिर केंद्रीय बैंकों के खुले डेटा से मिली दैनिक मिड-मार्केट विनिमय दर से गुणा करके SAR, JOD, AED और EGP सहित 40+ मुद्राओं में प्रति ग्राम भाव निकालते हैं।",
};

const HOW_P3: LocaleText = {
  en: "The displayed value is the spot-equivalent — the floor price before any retail premium. Jewelry shops and local goldsmiths add workmanship (5%-30%), retailer margin (3%-10%), and local VAT (Saudi: 15%, UAE: 5%, Egypt: none). See our methodology page for full details and data limitations.",
  ar: "النتيجة المعروضة هي السعر الفوري المكافئ — السعر الأرضي قبل أي هامش تجزئة. ستضيف محلات المجوهرات والصاغة المحليون مصنعية (5%-30%) وهامش بائع التجزئة (3%-10%) وضرائب القيمة المضافة المحلية (السعودية: 15%، الإمارات: 5%، مصر: لا ضريبة). راجع صفحة المنهجية للحصول على التفاصيل الكاملة وحدود البيانات.",
  fr: "La valeur affichée est l'équivalent spot — le prix plancher avant toute prime de détail. Les bijouteries et les orfèvres locaux ajoutent la façon (5 % à 30 %), la marge du détaillant (3 % à 10 %) et la TVA locale (Arabie saoudite : 15 %, Émirats : 5 %, Égypte : aucune). Consultez notre page méthodologie pour le détail complet et les limites des données.",
  tr: "Gösterilen değer spot eşdeğeridir — herhangi bir perakende primi öncesindeki taban fiyat. Kuyumcular ve yerel sarraflar işçilik (%5-30), satıcı marjı (%3-10) ve yerel KDV (Suudi Arabistan: %15, BAE: %5, Mısır: yok) ekler. Tüm ayrıntılar ve veri sınırlamaları için metodoloji sayfamıza bakın.",
  ur: "دکھائی گئی قیمت اسپاٹ کے مساوی ہے — کسی بھی ریٹیل پریمیم سے پہلے کی بنیادی قیمت۔ جیولرز اور مقامی سنار اس میں بنوائی (5%-30%)، دکاندار کا منافع (3%-10%) اور مقامی VAT (سعودی عرب: 15%، امارات: 5%، مصر: کوئی نہیں) شامل کرتے ہیں۔ مکمل تفصیل اور ڈیٹا کی حدود کے لیے ہمارا طریقۂ کار صفحہ دیکھیں۔",
  hi: "दिखाया गया मूल्य स्पॉट-समतुल्य है — किसी भी खुदरा प्रीमियम से पहले का न्यूनतम भाव। ज्वैलर्स और स्थानीय सुनार इसमें मेकिंग चार्ज (5%-30%), विक्रेता मार्जिन (3%-10%) और स्थानीय VAT (सऊदी: 15%, UAE: 5%, मिस्र: कोई नहीं) जोड़ते हैं। पूरी जानकारी और डेटा की सीमाओं के लिए हमारा कार्यप्रणाली पृष्ठ देखें।",
};

const TRUST_H2: LocaleText = {
  en: "Why trust Gold Prices Arabia",
  ar: "لماذا تثق في Gold Prices Arabia",
  fr: "Pourquoi faire confiance à Gold Prices Arabia",
  tr: "Gold Prices Arabia'ya neden güvenmelisiniz",
  ur: "Gold Prices Arabia پر بھروسا کیوں کریں",
  hi: "Gold Prices Arabia पर भरोसा क्यों करें",
};

type Bullet = { label: LocaleText; text: LocaleText };

const TRUST_BULLETS: Bullet[] = [
  {
    label: {
      en: "Transparent data: ",
      ar: "بيانات شفافة: ",
      fr: "Données transparentes : ",
      tr: "Şeffaf veri: ",
      ur: "شفاف ڈیٹا: ",
      hi: "पारदर्शी डेटा: ",
    },
    text: {
      en: "Every calculation documented at /methodology. No hidden numbers, no secret pricing margins.",
      ar: "كل حساب موثق في /methodology. لا أرقام مخفية، لا هوامش تسعير سرية.",
      fr: "Chaque calcul est documenté sur /methodology. Aucun chiffre caché, aucune marge secrète.",
      tr: "Her hesaplama /methodology sayfasında belgelenmiştir. Gizli rakam yok, gizli fiyat marjı yok.",
      ur: "ہر حساب /methodology پر درج ہے۔ نہ کوئی چھپا ہوا عدد، نہ کوئی خفیہ مارجن۔",
      hi: "हर गणना /methodology पर दर्ज है। न कोई छिपा आंकड़ा, न कोई गुप्त मार्जिन।",
    },
  },
  {
    label: {
      en: "Named author: ",
      ar: "مؤلف معروف: ",
      fr: "Auteur identifié : ",
      tr: "Bilinen yazar: ",
      ur: "معلوم مصنف: ",
      hi: "ज्ञात लेखक: ",
    },
    text: {
      en: "Site founded by Sadeq Sayed Ahmad. LinkedIn contact available for identity verification.",
      ar: "أسس الموقع صادق سيد أحمد. التواصل عبر LinkedIn متاح للتحقق من الهوية.",
      fr: "Site fondé par Sadeq Sayed Ahmad. Contact LinkedIn disponible pour vérifier l'identité.",
      tr: "Site Sadeq Sayed Ahmad tarafından kuruldu. Kimlik doğrulaması için LinkedIn iletişimi mevcut.",
      ur: "یہ سائٹ صادق سید احمد نے قائم کی۔ شناخت کی تصدیق کے لیے LinkedIn رابطہ دستیاب ہے۔",
      hi: "साइट की स्थापना सादिक़ सैयद अहमद ने की। पहचान सत्यापन के लिए LinkedIn संपर्क उपलब्ध है।",
    },
  },
  {
    label: {
      en: "Not financial advice: ",
      ar: "ليست نصيحة مالية: ",
      fr: "Pas un conseil financier : ",
      tr: "Yatırım tavsiyesi değildir: ",
      ur: "مالی مشورہ نہیں: ",
      hi: "वित्तीय सलाह नहीं: ",
    },
    text: {
      en: "We publish prices, not recommendations. Consult a licensed financial advisor before investment decisions.",
      ar: "ننشر الأسعار، لا التوصيات. استشر مستشاراً مالياً مرخّصاً قبل اتخاذ قرارات الاستثمار.",
      fr: "Nous publions des prix, pas des recommandations. Consultez un conseiller financier agréé avant toute décision d'investissement.",
      tr: "Fiyat yayımlıyoruz, öneri değil. Yatırım kararlarından önce lisanslı bir finans danışmanına başvurun.",
      ur: "ہم قیمتیں شائع کرتے ہیں، سفارشات نہیں۔ سرمایہ کاری کے فیصلوں سے پہلے لائسنس یافتہ مالی مشیر سے رجوع کریں۔",
      hi: "हम भाव प्रकाशित करते हैं, सिफ़ारिशें नहीं। निवेश निर्णय से पहले लाइसेंस प्राप्त वित्तीय सलाहकार से परामर्श लें।",
    },
  },
  {
    label: {
      en: "Continuously updated: ",
      ar: "تحديث مستمر: ",
      fr: "Mise à jour continue : ",
      tr: "Sürekli güncel: ",
      ur: "مسلسل اپ ڈیٹ: ",
      hi: "लगातार अपडेट: ",
    },
    text: {
      en: "WebSocket aggregation for gold — updated every second. Silver, platinum, palladium updated every minute.",
      ar: "تجميع WebSocket لحظي للذهب — تحديث كل ثانية. الفضة والبلاتين والبلاديوم تحديث كل دقيقة.",
      fr: "Agrégation WebSocket pour l'or — actualisée chaque seconde. Argent, platine et palladium actualisés chaque minute.",
      tr: "Altın için WebSocket toplaması — her saniye güncellenir. Gümüş, platin ve paladyum her dakika güncellenir.",
      ur: "سونے کے لیے WebSocket ایگریگیشن — ہر سیکنڈ اپ ڈیٹ۔ چاندی، پلاٹینم اور پیلیڈیم ہر منٹ اپ ڈیٹ۔",
      hi: "सोने के लिए WebSocket एग्रीगेशन — हर सेकंड अपडेट। चांदी, प्लैटिनम और पैलेडियम हर मिनट अपडेट।",
    },
  },
  {
    label: {
      en: "Free for everyone: ",
      ar: "مجاني للجميع: ",
      fr: "Gratuit pour tous : ",
      tr: "Herkese ücretsiz: ",
      ur: "سب کے لیے مفت: ",
      hi: "सबके लिए मुफ़्त: ",
    },
    text: {
      en: "No subscription, no login, no rate limits. A public service for the MENA region.",
      ar: "لا اشتراك، لا تسجيل دخول، لا حد للاستخدام. خدمة عامة لمنطقة الشرق الأوسط وشمال أفريقيا.",
      fr: "Pas d'abonnement, pas de connexion, pas de limite d'usage. Un service public pour la région MENA.",
      tr: "Abonelik yok, giriş yok, kullanım sınırı yok. MENA bölgesi için bir kamu hizmeti.",
      ur: "نہ سبسکرپشن، نہ لاگ اِن، نہ استعمال کی حد۔ مشرقِ وسطیٰ اور شمالی افریقہ کے لیے ایک عوامی خدمت۔",
      hi: "न सब्सक्रिप्शन, न लॉगिन, न उपयोग की सीमा। MENA क्षेत्र के लिए एक सार्वजनिक सेवा।",
    },
  },
];

const SOURCES_H2: LocaleText = {
  en: "Data sources & references",
  ar: "مصادر البيانات والمراجع",
  fr: "Sources de données et références",
  tr: "Veri kaynakları ve referanslar",
  ur: "ڈیٹا کے ذرائع اور حوالہ جات",
  hi: "डेटा स्रोत और संदर्भ",
};

const SOURCES_P: LocaleText = {
  en: "Our prices are aggregated in real time from major regulated exchanges. Verify data authenticity at the following authoritative sources:",
  ar: "تأتي أسعارنا من تجميع لحظي عبر WebSocket من بورصات تنظيمية كبرى. تحقّق من مصداقية البيانات من المصادر التالية:",
  fr: "Nos prix sont agrégés en temps réel à partir de grandes places d'échange réglementées. Vérifiez l'authenticité des données auprès des sources de référence suivantes :",
  tr: "Fiyatlarımız büyük, düzenlemeye tabi borsalardan gerçek zamanlı olarak toplanır. Verilerin doğruluğunu aşağıdaki yetkili kaynaklardan teyit edin:",
  ur: "ہماری قیمتیں بڑے ریگولیٹڈ ایکسچینجز سے حقیقی وقت میں جمع کی جاتی ہیں۔ ڈیٹا کی صداقت درج ذیل مستند ذرائع سے جانچیں:",
  hi: "हमारे भाव बड़े विनियमित एक्सचेंजों से रियल-टाइम में एकत्र किए जाते हैं। डेटा की प्रामाणिकता निम्न आधिकारिक स्रोतों पर जांचें:",
};

/** Resolve every inline homepage string for one locale. */
export function homeText(locale: string) {
  return {
    howH2: pick(locale, HOW_H2),
    howP1: pick(locale, HOW_P1),
    howP2: pick(locale, HOW_P2),
    howP3: pick(locale, HOW_P3),
    trustH2: pick(locale, TRUST_H2),
    trustBullets: TRUST_BULLETS.map((b) => ({
      label: pick(locale, b.label),
      text: pick(locale, b.text),
    })),
    sourcesH2: pick(locale, SOURCES_H2),
    sourcesP: pick(locale, SOURCES_P),
  };
}
