/**
 * Inline copy for the global karat page (`/gold-price/[karat]`): FAQ list,
 * breadcrumb label and related-links block in all six locales. Kept next to
 * the page so `page.tsx` stays under the 500-line limit.
 */
import { pick, type LocaleText } from "@/lib/i18n-text";
import { karatLabel } from "@/lib/karat-label";

export type KaratFaq = { q: string; a: string };

type Ctx = {
  locale: string;
  /** "21k" */
  karat: string;
  /** "21K" */
  upper: string;
  /** "87.5%" */
  purity: string;
};

const USAGE_NOTE: Record<string, LocaleText> = {
  "24K": {
    en: "Used primarily for investment bullion bars.",
    ar: "يستخدم بشكل رئيسي للسبائك الاستثمارية.",
    fr: "Utilisé principalement pour les lingots d'investissement.",
    tr: "Ağırlıklı olarak yatırımlık külçe altında kullanılır.",
    ur: "بنیادی طور پر سرمایہ کاری کے سونے کے بار (بسکٹ) کے لیے استعمال ہوتا ہے۔",
    hi: "मुख्य रूप से निवेश के लिए सोने की बार (बिस्किट) में इस्तेमाल होता है।",
  },
  "22K": {
    en: "The jewellery standard in the UAE, Kuwait and India.",
    ar: "العيار السائد في مجوهرات الإمارات والكويت والهند.",
    fr: "Le standard de la bijouterie aux Émirats, au Koweït et en Inde.",
    tr: "BAE, Kuveyt ve Hindistan'da kuyumculuk standardıdır.",
    ur: "متحدہ عرب امارات، کویت اور بھارت میں زیورات کا معیاری قیراط۔",
    hi: "यूएई, कुवैत और भारत में आभूषणों का मानक कैरेट।",
  },
  "21K": {
    en: "The most popular karat across Gulf jewellery markets.",
    ar: "هو العيار الأكثر شيوعاً في المجوهرات الخليجية والشرق الأوسط.",
    fr: "Le titre le plus répandu sur les marchés de la bijouterie du Golfe.",
    tr: "Körfez kuyumculuk pazarlarında en yaygın ayardır.",
    ur: "خلیجی زیورات کی منڈیوں میں سب سے مقبول قیراط۔",
    hi: "खाड़ी देशों के आभूषण बाज़ारों में सबसे लोकप्रिय कैरेट।",
  },
  "18K": {
    en: "Common in European fine jewellery and gem-set pieces.",
    ar: "يستخدم للمجوهرات الفاخرة في أوروبا والمجوهرات المرصعة.",
    fr: "Courant en haute joaillerie européenne et pour les pièces serties.",
    tr: "Avrupa'da ince mücevherat ve taşlı takılarda yaygındır.",
    ur: "یورپی عمدہ زیورات اور نگ جڑے زیورات میں عام۔",
    hi: "यूरोपीय फाइन ज्वेलरी और नग-जड़ित गहनों में आम।",
  },
  "14K": {
    en: "Used in affordable everyday jewellery.",
    ar: "يستخدم في المجوهرات الأقل تكلفة والقابلة للارتداء يومياً.",
    fr: "Utilisé pour les bijoux abordables du quotidien.",
    tr: "Uygun fiyatlı günlük takılarda kullanılır.",
    ur: "سستے روزمرہ زیورات میں استعمال ہوتا ہے۔",
    hi: "किफ़ायती रोज़मर्रा के गहनों में इस्तेमाल होता है।",
  },
};

export function karatFaqs({ locale, karat, upper, purity }: Ctx): KaratFaq[] {
  const kNum = upper.replace("K", "");
  const kl = karatLabel(locale, karat);
  const ratio = (parseFloat(purity) / 100).toFixed(3);
  const example = ((4500 / 31.1035) * (parseFloat(purity) / 100) * 3.75).toFixed(2);
  const note = pick(locale, USAGE_NOTE[upper] ?? USAGE_NOTE["14K"]);

  switch (locale) {
    case "ar":
      return [
        {
          q: `ما هو الذهب عيار ${kNum}؟`,
          a: `الذهب عيار ${kNum} يعني نقاء الذهب ${purity}. الباقي معادن صلابة (نحاس، فضة، أو زنك) تجعل القطعة أقوى للمجوهرات اليومية. ${note}`,
        },
        {
          q: `كيف يُحسب سعر جرام الذهب عيار ${kNum}؟`,
          a: `سعر الجرام = (السعر الفوري للأونصة بالدولار ÷ 31.1035) × نسبة النقاء (${purity}) × سعر صرف العملة. مثلاً، إذا كان السعر الفوري 4500$/أونصة وسعر الصرف 3.75 ريال/دولار، فإن سعر جرام ${upper} ≈ (4500/31.1035) × ${ratio} × 3.75 = ${example} ريال.`,
        },
        {
          q: `ما الفرق بين عيار ${kNum} والعيارات الأخرى؟`,
          a: `كل عيار له نسبة نقاء مختلفة: 24K=99.9%، 22K=91.7%، 21K=87.5%، 18K=75%، 14K=58.3%. كلما زادت النقاء، زاد السعر لنفس الوزن. عيار 21 هو الأكثر شيوعاً في المجوهرات الخليجية لتوازنه بين النقاء والصلابة والسعر.`,
        },
        {
          q: `هل سعر عيار ${kNum} المعروض هنا يشمل المصنعية؟`,
          a: `لا. السعر المعروض هو السعر الفوري للذهب الخام فقط (سعر السوق العالمي). تضيف محلات المجوهرات مصنعية (5-30 ريال/جرام للمجوهرات المعقدة)، وضريبة القيمة المضافة (15% في السعودية، 5% في الإمارات، صفر في مصر). راجع صفحة المنهجية للتفاصيل.`,
        },
        {
          q: `كم مرة يتم تحديث سعر عيار ${kNum}؟`,
          a: `يُحدّث السعر كل ثانية عبر WebSocket من Binance وCoinbase وKraken (متوسط من ثلاث بورصات لمنع الانحراف)، باستخدام رمز PAXG/USD المدعوم 1:1 بسبائك ذهب فيزيائية معتمدة من LBMA.`,
        },
      ];
    case "fr":
      return [
        {
          q: `Qu'est-ce que l'or ${kl} ?`,
          a: `L'or ${kl} contient ${purity} d'or pur. Le reste est constitué de métaux durcissants (cuivre, argent ou zinc) qui rendent l'alliage assez solide pour les bijoux portés au quotidien. ${note}`,
        },
        {
          q: `Comment le prix du gramme d'or ${kl} est-il calculé ?`,
          a: `Prix au gramme = (cours spot de l'once troy en USD ÷ 31.1035) × taux de pureté (${purity}) × taux de change local. Par exemple, avec un spot à 4500 USD/oz et un taux de 3.75 SAR/USD, le gramme ${kl} en SAR vaut environ (4500/31.1035) × ${ratio} × 3.75 = ${example} SAR.`,
        },
        {
          q: `Quelle différence entre l'or ${kl} et les autres titres ?`,
          a: `Chaque titre correspond à un taux de pureté différent : 24K=99.9%, 22K=91.7%, 21K=87.5%, 18K=75%, 14K=58.3%. Plus la pureté est élevée, plus le prix est élevé à poids égal. Le 21 carats est le plus répandu dans la bijouterie du Golfe pour son équilibre entre pureté, dureté et prix.`,
        },
        {
          q: `Le prix ${kl} affiché ici inclut-il les frais de façon ?`,
          a: `Non. Le prix affiché correspond uniquement à la valeur de l'or brut au cours spot (prix du marché mondial). Les bijoutiers ajoutent des frais de façon (généralement 5 à 30 SAR/gramme pour les pièces travaillées) et la TVA locale s'applique (Arabie saoudite : 15 %, Émirats : 5 %, Égypte : aucune). Voir la page méthodologie pour le détail.`,
        },
        {
          q: `À quelle fréquence le prix ${kl} est-il mis à jour ?`,
          a: `Le prix est mis à jour chaque seconde par agrégation WebSocket de Binance, Coinbase et Kraken (médiane des trois plateformes pour éviter les écarts), via la paire PAXG/USD adossée 1:1 à des lingots London Good Delivery.`,
        },
      ];
    case "tr":
      return [
        {
          q: `${kl} altın nedir?`,
          a: `${kl} altın, ${purity} saflıkta altın demektir. Kalan kısım, alaşımı günlük takı için yeterince dayanıklı kılan sertleştirici metallerdir (genellikle bakır, gümüş veya çinko). ${note}`,
        },
        {
          q: `${kl} gram altın fiyatı nasıl hesaplanır?`,
          a: `Gram fiyatı = (ons başına USD spot fiyat ÷ 31.1035) × saflık oranı (${purity}) × yerel döviz kuru. Örneğin 4500 USD/ons spot ve 3.75 SAR/USD kurunda ${kl} gram fiyatı yaklaşık (4500/31.1035) × ${ratio} × 3.75 = ${example} SAR olur.`,
        },
        {
          q: `${kl} ile diğer ayarlar arasındaki fark nedir?`,
          a: `Her ayarın saflık oranı farklıdır: 24K=%99.9, 22K=%91.7, 21K=%87.5, 18K=%75, 14K=%58.3. Saflık arttıkça aynı ağırlık için fiyat da artar. 21 ayar, saflık, sertlik ve fiyat dengesi nedeniyle Körfez kuyumculuğunda en yaygın ayardır.`,
        },
        {
          q: `Burada gösterilen ${kl} fiyatına işçilik dahil mi?`,
          a: `Hayır. Gösterilen fiyat yalnızca ham altının spot karşılığıdır (dünya piyasa fiyatı). Kuyumcular işçilik ekler (işlemeli parçalarda genellikle gram başına 5-30 SAR) ve yerel KDV uygulanır (Suudi Arabistan: %15, BAE: %5, Mısır: yok). Ayrıntılar için metodoloji sayfasına bakın.`,
        },
        {
          q: `${kl} fiyatı ne sıklıkla güncellenir?`,
          a: `Fiyat, Binance, Coinbase ve Kraken'den WebSocket ile her saniye güncellenir (sapmayı önlemek için üç borsanın medyanı) ve London Good Delivery külçelerle 1:1 teminatlı PAXG/USD paritesi kullanılır.`,
        },
      ];
    case "ur":
      return [
        {
          q: `${kl} سونا کیا ہوتا ہے؟`,
          a: `${kl} سونے کا مطلب ہے ${purity} خالص سونا۔ باقی حصہ سخت کرنے والی دھاتیں (عموماً تانبا، چاندی یا زنک) ہوتی ہیں جو زیور کو روزمرہ استعمال کے لیے مضبوط بناتی ہیں۔ ${note}`,
        },
        {
          q: `${kl} سونے کی فی گرام قیمت کیسے نکالی جاتی ہے؟`,
          a: `فی گرام قیمت = (فی ٹرائے اونس ڈالر میں اسپاٹ قیمت ÷ 31.1035) × خالصیت کا تناسب (${purity}) × مقامی کرنسی کا ایکسچینج ریٹ۔ مثلاً 4500 ڈالر/اونس اسپاٹ اور 3.75 ریال/ڈالر ریٹ پر ${kl} فی گرام تقریباً (4500/31.1035) × ${ratio} × 3.75 = ${example} سعودی ریال بنتا ہے۔`,
        },
        {
          q: `${kl} اور دوسرے قیراط میں کیا فرق ہے؟`,
          a: `ہر قیراط کی خالصیت مختلف ہوتی ہے: 24K=99.9%، 22K=91.7%، 21K=87.5%، 18K=75%، 14K=58.3%۔ جتنی زیادہ خالصیت، اتنی ہی زیادہ قیمت اسی وزن پر۔ 21 قیراط خالصیت، مضبوطی اور قیمت کے توازن کی وجہ سے خلیجی زیورات میں سب سے مقبول ہے۔`,
        },
        {
          q: `کیا یہاں دکھائی گئی ${kl} قیمت میں بنوائی شامل ہے؟`,
          a: `نہیں۔ دکھائی گئی قیمت صرف خام سونے کی اسپاٹ قیمت ہے (عالمی مارکیٹ ریٹ)۔ سنار بنوائی (پیچیدہ زیورات پر عموماً 5 تا 30 ریال فی گرام) اور مقامی ویٹ الگ سے لگاتے ہیں (سعودی عرب: 15%، امارات: 5%، مصر: کوئی نہیں)۔ تفصیل کے لیے طریقۂ کار کا صفحہ دیکھیں۔`,
        },
        {
          q: `${kl} کی قیمت کتنی بار اپڈیٹ ہوتی ہے؟`,
          a: `قیمت ہر سیکنڈ Binance، Coinbase اور Kraken سے WebSocket کے ذریعے اپڈیٹ ہوتی ہے (انحراف سے بچنے کے لیے تین ایکسچینجز کا میڈین)، اور PAXG/USD جوڑا استعمال ہوتا ہے جو London Good Delivery سونے کی سلاخوں سے 1:1 محفوظ ہے۔`,
        },
      ];
    case "hi":
      return [
        {
          q: `${kl} सोना क्या होता है?`,
          a: `${kl} सोने का मतलब है ${purity} शुद्ध सोना। बाकी हिस्सा कठोर बनाने वाली धातुएँ (आमतौर पर तांबा, चांदी या ज़िंक) होती हैं, जो मिश्रधातु को रोज़ पहनने लायक मज़बूत बनाती हैं। ${note}`,
        },
        {
          q: `${kl} सोने का प्रति ग्राम भाव कैसे निकाला जाता है?`,
          a: `प्रति ग्राम भाव = (प्रति ट्रॉय औंस USD स्पॉट भाव ÷ 31.1035) × शुद्धता अनुपात (${purity}) × स्थानीय मुद्रा की विनिमय दर। उदाहरण: 4500 USD/औंस स्पॉट और 3.75 SAR/USD दर पर ${kl} का प्रति ग्राम भाव लगभग (4500/31.1035) × ${ratio} × 3.75 = ${example} SAR होता है।`,
        },
        {
          q: `${kl} और अन्य कैरेट में क्या अंतर है?`,
          a: `हर कैरेट की शुद्धता अलग होती है: 24K=99.9%, 22K=91.7%, 21K=87.5%, 18K=75%, 14K=58.3%। शुद्धता जितनी ज़्यादा, उसी वज़न का दाम उतना ज़्यादा। शुद्धता, मज़बूती और दाम के संतुलन के कारण 21 कैरेट खाड़ी देशों के आभूषणों में सबसे लोकप्रिय है।`,
        },
        {
          q: `क्या यहाँ दिखाए गए ${kl} भाव में मेकिंग चार्ज शामिल है?`,
          a: `नहीं। दिखाया गया भाव सिर्फ़ कच्चे सोने का स्पॉट-समतुल्य मूल्य है (विश्व बाज़ार भाव)। ज्वेलर्स मेकिंग चार्ज जोड़ते हैं (जटिल गहनों पर आमतौर पर 5-30 SAR/ग्राम) और स्थानीय VAT लागू होता है (सऊदी अरब: 15%, UAE: 5%, मिस्र: शून्य)। विवरण के लिए कार्यप्रणाली पेज देखें।`,
        },
        {
          q: `${kl} का भाव कितनी बार अपडेट होता है?`,
          a: `भाव हर सेकंड Binance, Coinbase और Kraken से WebSocket के ज़रिए अपडेट होता है (विचलन रोकने के लिए तीनों एक्सचेंजों का मीडियन), और PAXG/USD जोड़ी का उपयोग होता है जो London Good Delivery सोने की छड़ों से 1:1 समर्थित है।`,
        },
      ];
    default:
      return [
        {
          q: `What is ${upper} gold?`,
          a: `${upper} gold means ${purity} pure gold. The remainder is hardening metals (typically copper, silver or zinc) that make the alloy strong enough for everyday jewellery. ${note}`,
        },
        {
          q: `How is the ${upper} gold price per gram calculated?`,
          a: `Per-gram price = (Spot price per troy ounce in USD / 31.1035) × purity ratio (${purity}) × local currency FX rate. For example, at a 4500 USD/oz spot and a 3.75 SAR/USD rate, ${upper} per gram in SAR is approximately (4500/31.1035) × ${ratio} × 3.75 = ${example} SAR.`,
        },
        {
          q: `What is the difference between ${upper} and other karats?`,
          a: `Each karat has a different purity ratio: 24K=99.9%, 22K=91.7%, 21K=87.5%, 18K=75%, 14K=58.3%. Higher purity equals higher price for the same weight. 21K is the most popular in Gulf jewellery for its balance of purity, hardness and price.`,
        },
        {
          q: `Does the ${upper} price shown here include making charges?`,
          a: `No. The displayed price is the spot-equivalent raw gold value only (world market price). Jewellery shops add making charges (typically 5-30 SAR/gram for complex pieces), and local VAT applies (Saudi: 15%, UAE: 5%, Egypt: none). See the methodology page for details.`,
        },
        {
          q: `How often is the ${upper} price updated?`,
          a: `The price updates every second via WebSocket aggregation from Binance, Coinbase and Kraken (median of three exchanges to prevent skew), using the PAXG/USD pair backed 1:1 by London Good Delivery gold bars.`,
        },
      ];
  }
}

/** Breadcrumb / JSON-LD page label, e.g. "21K Gold Price" / "سعر الذهب عيار 21". */
export function karatCrumbName(locale: string, karat: string, upper: string): string {
  const kNum = upper.replace("K", "");
  const kl = karatLabel(locale, karat);
  return pick(locale, {
    en: `${upper} Gold Price`,
    ar: `سعر الذهب عيار ${kNum}`,
    fr: `Prix de l'or ${kl}`,
    tr: `${kl} altın fiyatı`,
    ur: `${kl} سونے کی قیمت`,
    hi: `${kl} सोने का भाव`,
  });
}

export const HOME_LABEL: LocaleText = {
  en: "Home",
  ar: "الرئيسية",
  fr: "Accueil",
  tr: "Ana sayfa",
  ur: "ہوم",
  hi: "होम",
};

export const RELATED_HEADING: LocaleText = {
  en: "Related pages",
  ar: "صفحات ذات صلة",
  fr: "Pages associées",
  tr: "İlgili sayfalar",
  ur: "متعلقہ صفحات",
  hi: "संबंधित पेज",
};

type RelatedDef = { href: string; label: LocaleText; note: LocaleText };

const RELATED: RelatedDef[] = [
  {
    href: "/spot-gold",
    label: { en: "Spot Gold (XAU/USD)", ar: "السعر الفوري XAU/USD", fr: "Or spot (XAU/USD)", tr: "Spot altın (XAU/USD)", ur: "اسپاٹ گولڈ (XAU/USD)", hi: "स्पॉट गोल्ड (XAU/USD)" },
    note: { en: "Live per troy ounce", ar: "السعر الحي بالأونصة", fr: "Cours en direct par once troy", tr: "Troy ons başına canlı fiyat", ur: "فی ٹرائے اونس لائیو قیمت", hi: "प्रति ट्रॉय औंस लाइव भाव" },
  },
  {
    href: "/gold-price-per-gram",
    label: { en: "Price per gram", ar: "سعر الجرام", fr: "Prix au gramme", tr: "Gram fiyatı", ur: "فی گرام قیمت", hi: "प्रति ग्राम भाव" },
    note: { en: "All karats and currencies", ar: "كل العيارات والعملات", fr: "Tous les titres et devises", tr: "Tüm ayarlar ve para birimleri", ur: "تمام قیراط اور کرنسیاں", hi: "सभी कैरेट और मुद्राएँ" },
  },
  {
    href: "/gold-calculator",
    label: { en: "Gold calculator", ar: "حاسبة الذهب", fr: "Calculateur d'or", tr: "Altın hesaplayıcı", ur: "سونے کا کیلکولیٹر", hi: "गोल्ड कैलकुलेटर" },
    note: { en: "Calculate any weight", ar: "احسب قيمة قطعتك", fr: "Calculez n'importe quel poids", tr: "Herhangi bir ağırlığı hesaplayın", ur: "کسی بھی وزن کی قیمت نکالیں", hi: "किसी भी वज़न का मूल्य निकालें" },
  },
  {
    href: "/saudi-arabia/gold-price/21k",
    label: { en: "Saudi Arabia prices", ar: "أسعار السعودية", fr: "Prix en Arabie saoudite", tr: "Suudi Arabistan fiyatları", ur: "سعودی عرب کی قیمتیں", hi: "सऊदी अरब के भाव" },
    note: { en: "In Saudi Riyal", ar: "بالريال السعودي", fr: "En riyal saoudien", tr: "Suudi riyali cinsinden", ur: "سعودی ریال میں", hi: "सऊदी रियाल में" },
  },
  {
    href: "/news/spot-gold-vs-retail-jeweller-spread",
    label: { en: "Spot vs retail spread", ar: "هامش الصائغ", fr: "Écart spot / bijoutier", tr: "Spot ve perakende farkı", ur: "اسپاٹ اور سنار کی قیمت کا فرق", hi: "स्पॉट बनाम ज्वेलर भाव का अंतर" },
    note: { en: "Where the markup goes", ar: "أين يذهب الفارق", fr: "Où va la marge", tr: "Fark nereye gidiyor", ur: "فرق کہاں جاتا ہے", hi: "मार्जिन कहाँ जाता है" },
  },
  {
    href: "/methodology",
    label: { en: "Methodology", ar: "المنهجية", fr: "Méthodologie", tr: "Metodoloji", ur: "طریقۂ کار", hi: "कार्यप्रणाली" },
    note: { en: "How we calculate prices", ar: "كيف نحسب الأسعار", fr: "Comment nous calculons les prix", tr: "Fiyatları nasıl hesaplıyoruz", ur: "ہم قیمتیں کیسے نکالتے ہیں", hi: "हम भाव कैसे निकालते हैं" },
  },
];

export function relatedLinks(locale: string) {
  return RELATED.map((r) => ({
    href: r.href,
    label: pick(locale, r.label),
    note: pick(locale, r.note),
  }));
}
