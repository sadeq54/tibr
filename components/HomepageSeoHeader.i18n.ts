import { pick, pickList, type LocaleText } from "@/lib/i18n-text";

/**
 * Static homepage SEO copy in all six locales. `ar` / `en` are the original
 * SEO-tuned strings and stay byte-identical; fr/tr/ur/hi are native
 * translations. Kept beside HomepageSeoHeader.tsx to hold it under 500 lines.
 */

export const QUICK_LINKS: Array<{ href: string; label: LocaleText }> = [
  { href: "/gold-price/24k", label: { en: "24K" } },
  { href: "/gold-price/22k", label: { en: "22K" } },
  { href: "/gold-price/21k", label: { en: "21K" } },
  { href: "/gold-price/18k", label: { en: "18K" } },
  { href: "/gold-price/14k", label: { en: "14K" } },
  { href: "/spot-gold", label: { en: "Spot Gold", ar: "السعر الفوري", fr: "Or spot", tr: "Spot altın", ur: "اسپاٹ قیمت", hi: "स्पॉट भाव" } },
  { href: "/gold-price-chart", label: { en: "Chart", ar: "الرسم البياني", fr: "Graphique", tr: "Grafik", ur: "چارٹ", hi: "चार्ट" } },
  { href: "/gold-calculator", label: { en: "Calculator", ar: "الحاسبة", fr: "Calculateur", tr: "Hesaplayıcı", ur: "کیلکولیٹر", hi: "कैलकुलेटर" } },
  { href: "/gold-price", label: { en: "By country", ar: "أسعار حسب الدولة", fr: "Par pays", tr: "Ülkeye göre", ur: "ملک کے لحاظ سے", hi: "देश के अनुसार" } },
  { href: "/news", label: { en: "News", ar: "الأخبار", fr: "Actualités", tr: "Haberler", ur: "خبریں", hi: "समाचार" } },
  { href: "/research", label: { en: "Research", ar: "الأبحاث", fr: "Recherche", tr: "Araştırma", ur: "تحقیق", hi: "शोध" } },
  { href: "/methodology", label: { en: "Methodology", ar: "المنهجية", fr: "Méthodologie", tr: "Metodoloji", ur: "طریقۂ کار", hi: "कार्यप्रणाली" } },
];

export const MENA_COUNTRIES: Array<{ slug: string; cc: string; name: LocaleText }> = [
  { slug: "saudi-arabia", cc: "SA", name: { en: "Saudi Arabia", ar: "السعودية", fr: "Arabie saoudite", tr: "Suudi Arabistan", ur: "سعودی عرب", hi: "सऊदी अरब" } },
  { slug: "uae", cc: "AE", name: { en: "UAE", ar: "الإمارات", fr: "Émirats", tr: "BAE", ur: "امارات", hi: "यूएई" } },
  { slug: "egypt", cc: "EG", name: { en: "Egypt", ar: "مصر", fr: "Égypte", tr: "Mısır", ur: "مصر", hi: "मिस्र" } },
  { slug: "jordan", cc: "JO", name: { en: "Jordan", ar: "الأردن", fr: "Jordanie", tr: "Ürdün", ur: "اردن", hi: "जॉर्डन" } },
  { slug: "kuwait", cc: "KW", name: { en: "Kuwait", ar: "الكويت", fr: "Koweït", tr: "Kuveyt", ur: "کویت", hi: "कुवैत" } },
  { slug: "qatar", cc: "QA", name: { en: "Qatar", ar: "قطر", fr: "Qatar", tr: "Katar", ur: "قطر", hi: "क़तर" } },
  { slug: "bahrain", cc: "BH", name: { en: "Bahrain", ar: "البحرين", fr: "Bahreïn", tr: "Bahreyn", ur: "بحرین", hi: "बहरीन" } },
  { slug: "lebanon", cc: "LB", name: { en: "Lebanon", ar: "لبنان", fr: "Liban", tr: "Lübnan", ur: "لبنان", hi: "लेबनान" } },
  { slug: "morocco", cc: "MA", name: { en: "Morocco", ar: "المغرب", fr: "Maroc", tr: "Fas", ur: "مراکش", hi: "मोरक्को" } },
  { slug: "libya", cc: "LY", name: { en: "Libya", ar: "ليبيا", fr: "Libye", tr: "Libya", ur: "لیبیا", hi: "लीबिया" } },
];

export type Faq = { q: string; a: string };

const FAQS: { en: Faq[]; ar: Faq[]; fr: Faq[]; tr: Faq[]; ur: Faq[]; hi: Faq[] } = {
  en: [
    {
      q: "What is the spot gold price?",
      a: "Spot gold (XAU/USD) is the live raw gold price per troy ounce (31.1035 g) on the global market. Gold Prices Arabia aggregates the median across Binance, Coinbase and Kraken via PAXG/USD, refreshed every second.",
    },
    {
      q: "How is gold priced per gram in local currency?",
      a: "Per-gram price = (XAU/USD ÷ 31.1035) × karat purity × USD-to-local FX. We compute this live for 46 countries across SAR, AED, EGP, JOD, KWD, QAR, BHD and 40+ currencies.",
    },
    {
      q: "Which karats does Gold Prices Arabia cover?",
      a: "24K (99.9% pure), 21K (87.5%), 18K (75%) and 14K (58.3%) — the four most-traded retail karats across MENA jewellery markets.",
    },
  ],
  ar: [
    {
      q: "ما هو السعر الفوري للذهب؟",
      a: "السعر الفوري للذهب (XAU/USD) هو سعر الذهب الخام للأونصة الترويسية (31.1035 جرام) في السوق العالمية. تجمع Gold Prices Arabia المتوسط من Binance و Coinbase و Kraken عبر زوج PAXG/USD، محدّث كل ثانية.",
    },
    {
      q: "كيف يُحسب سعر الجرام بالعملة المحلية؟",
      a: "سعر الجرام = (XAU/USD ÷ 31.1035) × نسبة نقاء العيار × سعر صرف الدولار للعملة المحلية. نحسبه لحظيًا لـ46 دولة بـSAR وAED وEGP وJOD وKWD وQAR وBHD وأكثر من 40 عملة.",
    },
    {
      q: "ما العيارات التي تغطيها Gold Prices Arabia؟",
      a: "عيار 24 (نقاء 99.9%) و21 (87.5%) و18 (75%) و14 (58.3%) — أكثر أربعة عيارات تداولًا في أسواق المجوهرات بالشرق الأوسط وشمال أفريقيا.",
    },
  ],
  fr: [
    {
      q: "Qu'est-ce que le cours spot de l'or ?",
      a: "L'or spot (XAU/USD) est le cours brut en direct de l'or par once troy (31,1035 g) sur le marché mondial. Gold Prices Arabia agrège la médiane de Binance, Coinbase et Kraken via PAXG/USD, actualisée chaque seconde.",
    },
    {
      q: "Comment l'or est-il coté au gramme en devise locale ?",
      a: "Prix du gramme = (XAU/USD ÷ 31,1035) × titre du carat × taux USD vers devise locale. Nous le calculons en direct pour 46 pays en SAR, AED, EGP, JOD, KWD, QAR, BHD et plus de 40 devises.",
    },
    {
      q: "Quels carats Gold Prices Arabia couvre-t-il ?",
      a: "24 carats (99,9 % pur), 21 carats (87,5 %), 18 carats (75 %) et 14 carats (58,3 %) — les quatre carats de détail les plus échangés sur les marchés de la bijouterie au MENA.",
    },
  ],
  tr: [
    {
      q: "Spot altın fiyatı nedir?",
      a: "Spot altın (XAU/USD), küresel piyasada troy ons (31,1035 g) başına canlı ham altın fiyatıdır. Gold Prices Arabia, Binance, Coinbase ve Kraken'in PAXG/USD üzerinden medyanını her saniye yenileyerek toplar.",
    },
    {
      q: "Gram altın yerel para biriminde nasıl fiyatlanır?",
      a: "Gram fiyatı = (XAU/USD ÷ 31,1035) × ayar saflığı × USD'den yerel kura. Bunu 46 ülke için SAR, AED, EGP, JOD, KWD, QAR, BHD ve 40'tan fazla para biriminde canlı hesaplıyoruz.",
    },
    {
      q: "Gold Prices Arabia hangi ayarları kapsıyor?",
      a: "24 ayar (%99,9 saf), 21 ayar (%87,5), 18 ayar (%75) ve 14 ayar (%58,3) — MENA kuyumculuk piyasalarında en çok işlem gören dört perakende ayar.",
    },
  ],
  ur: [
    {
      q: "اسپاٹ گولڈ کی قیمت کیا ہے؟",
      a: "اسپاٹ گولڈ (XAU/USD) عالمی منڈی میں فی ٹرائے اونس (31.1035 گرام) خام سونے کی لائیو قیمت ہے۔ Gold Prices Arabia PAXG/USD کے ذریعے Binance، Coinbase اور Kraken کی میڈین جمع کرتا ہے، جو ہر سیکنڈ تازہ ہوتی ہے۔",
    },
    {
      q: "مقامی کرنسی میں فی گرام سونے کی قیمت کیسے نکلتی ہے؟",
      a: "فی گرام قیمت = (XAU/USD ÷ 31.1035) × قیراط کی خالصیت × ڈالر سے مقامی کرنسی کا ریٹ۔ ہم یہ 46 ممالک کے لیے SAR، AED، EGP، JOD، KWD، QAR، BHD اور 40 سے زائد کرنسیوں میں لائیو نکالتے ہیں۔",
    },
    {
      q: "Gold Prices Arabia کون سے قیراط کور کرتا ہے؟",
      a: "24 قیراط (99.9% خالص)، 21 قیراط (87.5%)، 18 قیراط (75%) اور 14 قیراط (58.3%) — مشرقِ وسطیٰ و شمالی افریقہ کی زیورات کی منڈیوں میں سب سے زیادہ رائج چار قیراط۔",
    },
  ],
  hi: [
    {
      q: "स्पॉट गोल्ड भाव क्या है?",
      a: "स्पॉट गोल्ड (XAU/USD) वैश्विक बाज़ार में प्रति ट्रॉय औंस (31.1035 ग्राम) कच्चे सोने का लाइव भाव है। Gold Prices Arabia PAXG/USD के ज़रिए Binance, Coinbase और Kraken की माध्यिका लेता है, जो हर सेकंड ताज़ा होती है।",
    },
    {
      q: "स्थानीय मुद्रा में प्रति ग्राम सोने का भाव कैसे तय होता है?",
      a: "प्रति ग्राम भाव = (XAU/USD ÷ 31.1035) × कैरेट शुद्धता × USD से स्थानीय मुद्रा दर। हम इसे 46 देशों के लिए SAR, AED, EGP, JOD, KWD, QAR, BHD और 40+ मुद्राओं में लाइव निकालते हैं।",
    },
    {
      q: "Gold Prices Arabia किन कैरेट को कवर करता है?",
      a: "24 कैरेट (99.9% शुद्ध), 21 कैरेट (87.5%), 18 कैरेट (75%) और 14 कैरेट (58.3%) — MENA आभूषण बाज़ारों में सबसे अधिक प्रचलित चार खुदरा कैरेट।",
    },
  ],
};

/**
 * "What Gold Prices Arabia delivers" paragraph as text segments; `{ b }`
 * segments render in <strong>. Text is byte-identical to the former ar/en JSX.
 */
export type Segment = string | { b: string };

const DELIVERS: Record<"en" | "ar" | "fr" | "tr" | "ur" | "hi", Segment[]> = {
  en: [
    "We aggregate ", { b: "live gold prices" }, " for 46 countries and 40+ currencies, streamed in real time from ",
    { b: "Binance" }, ", ", { b: "Coinbase" }, " and ", { b: "Kraken" },
    " via the PAXG/USD pair — a token backed 1:1 by physical bullion in Brink's vaults. Prices refresh ",
    { b: "every second" },
    " and convert automatically into each country's currency. We cover the four most-traded karats — 24K, 21K, 18K, 14K — plus silver, platinum and palladium.",
  ],
  ar: [
    "نحن نوفر ", { b: "أسعار الذهب الحية" }, " لـ46 دولة و40+ عملة، مأخوذة لحظيًا من ",
    { b: "Binance" }, " و", { b: " Coinbase" }, " و", { b: " Kraken" },
    " عبر زوج PAXG/USD المدعوم 1:1 بسبائك ذهب فيزيائية في خزائن Brink's. يُحدّث السعر ",
    { b: "كل ثانية تقريبًا" },
    "، ويُحوَّل تلقائيًا للعملة المحلية لكل دولة. نُغطي العيارات الأربعة الرئيسية: 24 و21 و18 و14، وكذلك أسعار الفضة والبلاتين والبلاديوم.",
  ],
  fr: [
    "Nous agrégeons les ", { b: "cours de l'or en direct" }, " pour 46 pays et plus de 40 devises, diffusés en temps réel depuis ",
    { b: "Binance" }, ", ", { b: "Coinbase" }, " et ", { b: "Kraken" },
    " via la paire PAXG/USD — un jeton adossé 1:1 à de l'or physique conservé dans les coffres de Brink's. Les prix se rafraîchissent ",
    { b: "chaque seconde" },
    " et sont convertis automatiquement dans la devise de chaque pays. Nous couvrons les quatre carats les plus échangés — 24, 21, 18 et 14 carats — ainsi que l'argent, le platine et le palladium.",
  ],
  tr: [
    { b: "Canlı altın fiyatlarını" }, " 46 ülke ve 40'tan fazla para birimi için, PAXG/USD paritesi üzerinden ",
    { b: "Binance" }, ", ", { b: "Coinbase" }, " ve ", { b: "Kraken" },
    " borsalarından gerçek zamanlı olarak topluyoruz — PAXG, Brink's kasalarındaki fiziksel külçelerle 1:1 teminatlandırılmış bir tokendır. Fiyatlar ",
    { b: "her saniye" },
    " yenilenir ve her ülkenin para birimine otomatik çevrilir. En çok işlem gören dört ayarı — 24, 21, 18 ve 14 ayar — ayrıca gümüş, platin ve paladyumu kapsıyoruz.",
  ],
  ur: [
    "ہم 46 ممالک اور 40 سے زائد کرنسیوں کے لیے ", { b: "سونے کی لائیو قیمتیں" }, " فراہم کرتے ہیں، جو PAXG/USD جوڑے کے ذریعے ",
    { b: "Binance" }, "، ", { b: "Coinbase" }, " اور ", { b: "Kraken" },
    " سے حقیقی وقت میں لی جاتی ہیں — یہ ٹوکن Brink's کے والٹس میں موجود اصل سونے سے 1:1 محفوظ ہے۔ قیمتیں ",
    { b: "ہر سیکنڈ" },
    " تازہ ہوتی ہیں اور ہر ملک کی کرنسی میں خودکار طور پر بدل جاتی ہیں۔ ہم چار سب سے زیادہ رائج قیراط — 24، 21، 18 اور 14 — کے ساتھ چاندی، پلاٹینم اور پیلیڈیم کی قیمتیں بھی دکھاتے ہیں۔",
  ],
  hi: [
    "हम 46 देशों और 40+ मुद्राओं के लिए ", { b: "सोने का लाइव भाव" }, " उपलब्ध कराते हैं, जो PAXG/USD पेयर के ज़रिए ",
    { b: "Binance" }, ", ", { b: "Coinbase" }, " और ", { b: "Kraken" },
    " से रियल-टाइम में लिया जाता है — यह टोकन Brink's की तिजोरियों में रखे असली सोने से 1:1 समर्थित है। भाव ",
    { b: "हर सेकंड" },
    " ताज़ा होते हैं और हर देश की मुद्रा में अपने-आप बदल जाते हैं। हम चार सबसे प्रचलित कैरेट — 24, 21, 18 और 14 — के साथ चांदी, प्लैटिनम और पैलेडियम के भाव भी देते हैं।",
  ],
};

const TEXT = {
  quickLinks: { en: "Quick links", ar: "روابط سريعة", fr: "Liens rapides", tr: "Hızlı bağlantılar", ur: "فوری لنکس", hi: "त्वरित लिंक" },
  deliversH2: {
    en: "What Gold Prices Arabia delivers",
    ar: "ما الذي يقدمه Gold Prices Arabia",
    fr: "Ce que propose Gold Prices Arabia",
    tr: "Gold Prices Arabia ne sunar",
    ur: "Gold Prices Arabia کیا فراہم کرتا ہے",
    hi: "Gold Prices Arabia क्या देता है",
  },
  coverageH2: {
    en: "Live MENA coverage",
    ar: "تغطية لحظية في الشرق الأوسط وشمال أفريقيا",
    fr: "Couverture MENA en direct",
    tr: "Canlı MENA kapsamı",
    ur: "مشرقِ وسطیٰ و شمالی افریقہ کی لائیو کوریج",
    hi: "MENA की लाइव कवरेज",
  },
  coverageP: {
    en: "Browse live gold rates for the region's biggest markets — Saudi Arabia, UAE, Egypt, Jordan, Kuwait, Qatar, Bahrain, Lebanon, Morocco and Libya — with automatic local-currency conversion and every karat shown per gram and per troy ounce.",
    ar: "تصفح أسعار الذهب الحية لأكبر أسواق المنطقة — السعودية والإمارات ومصر والأردن والكويت وقطر والبحرين ولبنان والمغرب وليبيا — مع تحويل تلقائي للعملة المحلية وعرض جميع العيارات للجرام وللأونصة.",
    fr: "Parcourez les cours de l'or en direct des plus grands marchés de la région — Arabie saoudite, Émirats, Égypte, Jordanie, Koweït, Qatar, Bahreïn, Liban, Maroc et Libye — avec conversion automatique en devise locale et chaque carat affiché au gramme et à l'once troy.",
    tr: "Bölgenin en büyük piyasaları — Suudi Arabistan, BAE, Mısır, Ürdün, Kuveyt, Katar, Bahreyn, Lübnan, Fas ve Libya — için canlı altın fiyatlarına göz atın; otomatik yerel para birimi dönüşümü ve her ayar gram ve troy ons bazında gösterilir.",
    ur: "خطے کی سب سے بڑی منڈیوں — سعودی عرب، امارات، مصر، اردن، کویت، قطر، بحرین، لبنان، مراکش اور لیبیا — کے لیے سونے کی لائیو قیمتیں دیکھیں، مقامی کرنسی میں خودکار تبدیلی کے ساتھ اور ہر قیراط فی گرام اور فی ٹرائے اونس دکھایا جاتا ہے۔",
    hi: "क्षेत्र के सबसे बड़े बाज़ारों — सऊदी अरब, यूएई, मिस्र, जॉर्डन, कुवैत, क़तर, बहरीन, लेबनान, मोरक्को और लीबिया — के लिए सोने का लाइव भाव देखें, स्थानीय मुद्रा में स्वचालित रूपांतरण के साथ और हर कैरेट प्रति ग्राम व प्रति ट्रॉय औंस में।",
  },
  faqH2: {
    en: "Frequently asked questions",
    ar: "أسئلة شائعة",
    fr: "Questions fréquentes",
    tr: "Sık sorulan sorular",
    ur: "عام سوالات",
    hi: "अक्सर पूछे जाने वाले प्रश्न",
  },
} satisfies Record<string, LocaleText>;

export function seoHeaderText(locale: string) {
  return {
    quickLinks: pick(locale, TEXT.quickLinks),
    deliversH2: pick(locale, TEXT.deliversH2),
    delivers: pickList(locale, DELIVERS),
    coverageH2: pick(locale, TEXT.coverageH2),
    coverageP: pick(locale, TEXT.coverageP),
    faqH2: pick(locale, TEXT.faqH2),
    faqs: pickList(locale, FAQS),
  };
}
