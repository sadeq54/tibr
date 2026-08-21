import { pick, pickList } from "@/lib/i18n-text";
import type { FaqQA } from "@/lib/schemas";

export type MetalSlug = "gold" | "silver" | "platinum" | "palladium";
export const METAL_SLUGS: readonly MetalSlug[] = ["gold", "silver", "platinum", "palladium"];

/**
 * Per-locale grammatical forms: `name` is the display/H1 form; `low` a
 * mid-sentence form (tr); `de`/`le` French contracted articles; `obl` the
 * Urdu/Hindi oblique used before postpositions (سونے کی / सोने का).
 */
type MetalForms = {
  en: string;
  ar: string;
  fr: { name: string; de: string; le: string };
  tr: { name: string; low: string };
  ur: { name: string; obl: string };
  hi: { name: string; obl: string };
};

const METAL_FORMS: Record<MetalSlug, MetalForms> = {
  gold: {
    en: "Gold", ar: "ذهب",
    fr: { name: "Or", de: "de l'or", le: "l'or" },
    tr: { name: "Altın", low: "altın" },
    ur: { name: "سونا", obl: "سونے" },
    hi: { name: "सोना", obl: "सोने" },
  },
  silver: {
    en: "Silver", ar: "فضة",
    fr: { name: "Argent", de: "de l'argent", le: "l'argent" },
    tr: { name: "Gümüş", low: "gümüş" },
    ur: { name: "چاندی", obl: "چاندی" },
    hi: { name: "चांदी", obl: "चांदी" },
  },
  platinum: {
    en: "Platinum", ar: "بلاتين",
    fr: { name: "Platine", de: "du platine", le: "le platine" },
    tr: { name: "Platin", low: "platin" },
    ur: { name: "پلاٹینم", obl: "پلاٹینم" },
    hi: { name: "प्लैटिनम", obl: "प्लैटिनम" },
  },
  palladium: {
    en: "Palladium", ar: "بالاديوم",
    fr: { name: "Palladium", de: "du palladium", le: "le palladium" },
    tr: { name: "Paladyum", low: "paladyum" },
    ur: { name: "پیلیڈیم", obl: "پیلیڈیم" },
    hi: { name: "पैलेडियम", obl: "पैलेडियम" },
  },
};

/** Localized metal display name (used in H1/meta interpolation). */
export function metalName(slug: MetalSlug, locale: string): string {
  const f = METAL_FORMS[slug];
  return pick(locale, { en: f.en, ar: f.ar, fr: f.fr.name, tr: f.tr.name, ur: f.ur.name, hi: f.hi.name });
}

type Facts = { drivers: string; uses: string };
const FACTS: Record<MetalSlug, Record<"en" | "ar" | "fr" | "tr" | "ur" | "hi", Facts>> = {
  gold: {
    en: { drivers: "Fed decisions, USD strength, geopolitical risk, central bank demand, Indian/Chinese jewellery season", uses: "Jewellery, investment bullion, central bank reserves, electronics" },
    ar: { drivers: "قرارات الفيدرالي، قوة الدولار، المخاطر الجيوسياسية، طلب البنوك المركزية، موسم المجوهرات في الهند والصين", uses: "المجوهرات، السبائك الاستثمارية، احتياطيات البنوك المركزية، الإلكترونيات" },
    fr: { drivers: "Décisions de la Fed, force du dollar, risque géopolitique, demande des banques centrales, saison de la bijouterie en Inde et en Chine", uses: "Bijouterie, lingots d'investissement, réserves des banques centrales, électronique" },
    tr: { drivers: "Fed kararları, doların gücü, jeopolitik risk, merkez bankası talebi, Hindistan/Çin takı sezonu", uses: "Takı, yatırım külçesi, merkez bankası rezervleri, elektronik" },
    ur: { drivers: "فیڈ کے فیصلے، ڈالر کی مضبوطی، جغرافیائی سیاسی خطرات، مرکزی بینکوں کی طلب، بھارت/چین میں زیورات کا سیزن", uses: "زیورات، سرمایہ کاری کی سلاخیں، مرکزی بینکوں کے ذخائر، الیکٹرانکس" },
    hi: { drivers: "फेड के फ़ैसले, डॉलर की मज़बूती, भू-राजनीतिक जोखिम, केंद्रीय बैंकों की मांग, भारत/चीन में ज्वेलरी सीज़न", uses: "ज्वेलरी, निवेश बुलियन, केंद्रीय बैंकों के भंडार, इलेक्ट्रॉनिक्स" },
  },
  silver: {
    en: { drivers: "Industrial demand (solar panels, electronics, 5G), gold/silver ratio, photographic film legacy, investment flows", uses: "Industrial (50% of demand: solar, electronics, medical), jewellery, silverware, investment coins" },
    ar: { drivers: "الطلب الصناعي (الألواح الشمسية، الإلكترونيات، 5G)، نسبة الذهب/الفضة، الاستخدام التصويري السابق، تدفقات الاستثمار", uses: "الصناعة (50% من الطلب: الطاقة الشمسية، الإلكترونيات، الطب)، المجوهرات، الأدوات الفضية، العملات الاستثمارية" },
    fr: { drivers: "Demande industrielle (panneaux solaires, électronique, 5G), ratio or/argent, héritage de la photographie argentique, flux d'investissement", uses: "Industrie (50 % de la demande : solaire, électronique, médical), bijouterie, argenterie, pièces d'investissement" },
    tr: { drivers: "Sanayi talebi (güneş panelleri, elektronik, 5G), altın/gümüş oranı, fotoğraf filmi mirası, yatırım akışları", uses: "Sanayi (talebin %50'si: güneş, elektronik, tıp), takı, gümüş eşya, yatırım sikkeleri" },
    ur: { drivers: "صنعتی طلب (سولر پینل، الیکٹرانکس، 5G)، سونا/چاندی تناسب، فوٹوگرافک فلم کا پرانا استعمال، سرمایہ کاری کا بہاؤ", uses: "صنعت (طلب کا 50%: سولر، الیکٹرانکس، طبی)، زیورات، چاندی کے برتن، سرمایہ کاری کے سکے" },
    hi: { drivers: "औद्योगिक मांग (सोलर पैनल, इलेक्ट्रॉनिक्स, 5G), सोना/चांदी अनुपात, फ़ोटोग्राफ़िक फ़िल्म की विरासत, निवेश प्रवाह", uses: "उद्योग (मांग का 50%: सोलर, इलेक्ट्रॉनिक्स, चिकित्सा), ज्वेलरी, चांदी के बर्तन, निवेश सिक्के" },
  },
  platinum: {
    en: { drivers: "Auto catalyst demand (diesel engines), jewellery demand in China/Japan, mining supply from South Africa, hydrogen fuel cell adoption", uses: "Auto catalysts (40% of demand), jewellery, industrial catalysts, investment" },
    ar: { drivers: "طلب المحفزات في السيارات (محركات الديزل)، طلب المجوهرات في الصين/اليابان، إمدادات التعدين من جنوب أفريقيا، تبني خلايا الوقود الهيدروجيني", uses: "محفزات السيارات (40%)، المجوهرات، المحفزات الصناعية، الاستثمار" },
    fr: { drivers: "Demande de catalyseurs automobiles (moteurs diesel), demande de bijoux en Chine et au Japon, offre minière d'Afrique du Sud, adoption des piles à hydrogène", uses: "Catalyseurs automobiles (40 % de la demande), bijouterie, catalyseurs industriels, investissement" },
    tr: { drivers: "Otomotiv katalizör talebi (dizel motorlar), Çin/Japonya takı talebi, Güney Afrika maden arzı, hidrojen yakıt hücresi kullanımı", uses: "Otomotiv katalizörleri (talebin %40'ı), takı, endüstriyel katalizörler, yatırım" },
    ur: { drivers: "گاڑیوں کے کیٹالسٹ کی طلب (ڈیزل انجن)، چین/جاپان میں زیورات کی طلب، جنوبی افریقہ سے کان کنی کی رسد، ہائیڈروجن فیول سیل کا فروغ", uses: "گاڑیوں کے کیٹالسٹ (طلب کا 40%)، زیورات، صنعتی کیٹالسٹ، سرمایہ کاری" },
    hi: { drivers: "ऑटो कैटेलिस्ट मांग (डीज़ल इंजन), चीन/जापान में ज्वेलरी मांग, दक्षिण अफ़्रीका से खनन आपूर्ति, हाइड्रोजन फ़्यूल सेल का प्रसार", uses: "ऑटो कैटेलिस्ट (मांग का 40%), ज्वेलरी, औद्योगिक कैटेलिस्ट, निवेश" },
  },
  palladium: {
    en: { drivers: "Petrol auto catalyst demand, Russian/South African supply, EV transition reducing long-term demand, palladium-platinum substitution", uses: "Auto catalysts (85% of demand — petrol engines), electronics, jewellery, dental" },
    ar: { drivers: "طلب محفزات السيارات بالبنزين، إمدادات روسيا/جنوب أفريقيا، تحول السيارات الكهربائية يقلل الطلب طويل المدى، استبدال البلاديوم بالبلاتين", uses: "محفزات السيارات (85% — محركات البنزين)، الإلكترونيات، المجوهرات، طب الأسنان" },
    fr: { drivers: "Demande de catalyseurs pour moteurs essence, offre russe et sud-africaine, transition vers l'électrique réduisant la demande à long terme, substitution palladium-platine", uses: "Catalyseurs automobiles (85 % de la demande — moteurs essence), électronique, bijouterie, dentaire" },
    tr: { drivers: "Benzinli araç katalizör talebi, Rusya/Güney Afrika arzı, uzun vadeli talebi azaltan elektrikli araç dönüşümü, paladyum-platin ikamesi", uses: "Otomotiv katalizörleri (talebin %85'i — benzinli motorlar), elektronik, takı, diş hekimliği" },
    ur: { drivers: "پٹرول گاڑیوں کے کیٹالسٹ کی طلب، روس/جنوبی افریقہ کی رسد، الیکٹرک گاڑیوں کی منتقلی سے طویل مدتی طلب میں کمی، پیلیڈیم-پلاٹینم کا تبادلہ", uses: "گاڑیوں کے کیٹالسٹ (طلب کا 85% — پٹرول انجن)، الیکٹرانکس، زیورات، دندان سازی" },
    hi: { drivers: "पेट्रोल ऑटो कैटेलिस्ट मांग, रूस/दक्षिण अफ़्रीका की आपूर्ति, EV बदलाव से दीर्घकालिक मांग में कमी, पैलेडियम-प्लैटिनम प्रतिस्थापन", uses: "ऑटो कैटेलिस्ट (मांग का 85% — पेट्रोल इंजन), इलेक्ट्रॉनिक्स, ज्वेलरी, दंत चिकित्सा" },
  },
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * FAQ copy for /precious-metals/[metal] — feeds the FAQPage JSON-LD.
 * `en`/`ar` are SEO-tuned; keep byte-identical. `id` is the ticker (XAU…).
 */
export function metalFaqs(slug: MetalSlug, id: string, locale: string): FaqQA[] {
  const f = METAL_FORMS[slug];
  const x = FACTS[slug];
  return pickList<FaqQA>(locale, {
    en: [
      { q: `What is the ${f.en} price today?`, a: `${f.en} price updates in real time in the table above. Priced in USD per troy ounce (${id}/USD). Use the calculator to convert to 40+ local currencies.` },
      { q: `What factors affect the ${f.en} price?`, a: x.en.drivers },
      { q: `What are the main uses of ${f.en}?`, a: x.en.uses },
      { q: `How is ${f.en} priced?`, a: `${f.en} is priced per troy ounce (31.1035 grams) in US Dollars. The global price forms on major exchanges (COMEX, LBMA, Shanghai). We track the live price via STOOQ and forex aggregators.` },
      { q: `Is ${f.en} a good investment?`, a: `Each precious metal has a different risk profile. Gold is more stable (safe haven). Silver is more volatile with strong industrial demand. Platinum/palladium are tied to the auto industry. Diversifying across multiple metals reduces risk.` },
    ],
    ar: [
      { q: `ما هو سعر ${f.ar} اليوم؟`, a: `سعر ${f.ar} يُحدّث في الوقت الفعلي في الجدول أعلاه. السعر بالدولار للأونصة الترويسية (XAU/USD مكافئ لـ${id}). للحصول على السعر بالعملة المحلية، استخدم الحاسبة لاختيار 40+ عملة.` },
      { q: `ما العوامل التي تؤثر على سعر ${f.ar}؟`, a: x.ar.drivers },
      { q: `ما استخدامات ${f.ar} الرئيسية؟`, a: x.ar.uses },
      { q: `كيف يُسعّر ${f.ar}؟`, a: `يُسعّر ${f.ar} بالأونصة الترويسية (31.1035 جرام) بالدولار الأمريكي. السعر العالمي يتشكل عبر البورصات الرئيسية (COMEX، LBMA، Shanghai). نحن نتتبع السعر اللحظي عبر مصادر STOOQ و forex aggregators.` },
      { q: `هل ${f.ar} استثمار جيد؟`, a: `كل معدن ثمين له ملف مخاطر مختلف. الذهب أكثر استقراراً (الملاذ الآمن). الفضة أكثر تقلباً وطلباً صناعياً. البلاتين/البلاديوم مرتبطان بصناعة السيارات. تنويع المحفظة عبر معادن متعددة يقلل المخاطر.` },
    ],
    fr: [
      { q: `Quel est le prix ${f.fr.de} aujourd'hui ?`, a: `Le prix ${f.fr.de} est mis à jour en temps réel dans le tableau ci-dessus. Coté en USD par once troy (${id}/USD). Utilisez le calculateur pour convertir dans plus de 40 devises locales.` },
      { q: `Quels facteurs influencent le prix ${f.fr.de} ?`, a: x.fr.drivers },
      { q: `Quelles sont les principales utilisations ${f.fr.de} ?`, a: x.fr.uses },
      { q: `Comment ${f.fr.le} est-il coté ?`, a: `${cap(f.fr.le)} est coté à l'once troy (31,1035 grammes) en dollars américains. Le prix mondial se forme sur les grandes bourses (COMEX, LBMA, Shanghai). Nous suivons le cours en direct via STOOQ et des agrégateurs forex.` },
      { q: `${cap(f.fr.le)} est-il un bon investissement ?`, a: `Chaque métal précieux a un profil de risque différent. L'or est plus stable (valeur refuge). L'argent est plus volatil, avec une forte demande industrielle. Le platine et le palladium sont liés à l'industrie automobile. Diversifier sur plusieurs métaux réduit le risque.` },
    ],
    tr: [
      { q: `Bugün ${f.tr.low} fiyatı ne kadar?`, a: `${f.tr.name} fiyatı yukarıdaki tabloda gerçek zamanlı güncellenir. Ons troy başına USD cinsinden kote edilir (${id}/USD). 40'tan fazla yerel para birimine çevirmek için hesaplayıcıyı kullanın.` },
      { q: `${f.tr.name} fiyatını hangi faktörler etkiler?`, a: x.tr.drivers },
      { q: `${f.tr.name} başlıca nerelerde kullanılır?`, a: x.tr.uses },
      { q: `${f.tr.name} nasıl fiyatlanır?`, a: `${f.tr.name}, ons troy (31,1035 gram) başına ABD doları cinsinden fiyatlanır. Küresel fiyat büyük borsalarda (COMEX, LBMA, Şanghay) oluşur. Canlı fiyatı STOOQ ve forex toplayıcıları üzerinden takip ediyoruz.` },
      { q: `${f.tr.name} iyi bir yatırım mı?`, a: `Her değerli metalin risk profili farklıdır. Altın daha istikrarlıdır (güvenli liman). Gümüş daha oynaktır ve güçlü sanayi talebi vardır. Platin/paladyum otomotiv sektörüne bağlıdır. Birden fazla metale dağıtmak riski azaltır.` },
    ],
    ur: [
      { q: `آج ${f.ur.obl} کی قیمت کیا ہے؟`, a: `${f.ur.obl} کی قیمت اوپر جدول میں ریئل ٹائم اپڈیٹ ہوتی ہے۔ قیمت ڈالر فی ٹرائے اونس (${id}/USD) میں ہے۔ 40 سے زائد مقامی کرنسیوں میں تبدیل کرنے کے لیے کیلکولیٹر استعمال کریں۔` },
      { q: `${f.ur.obl} کی قیمت پر کون سے عوامل اثر ڈالتے ہیں؟`, a: x.ur.drivers },
      { q: `${f.ur.obl} کے بنیادی استعمال کیا ہیں؟`, a: x.ur.uses },
      { q: `${f.ur.obl} کی قیمت کیسے طے ہوتی ہے؟`, a: `${f.ur.obl} کی قیمت فی ٹرائے اونس (31.1035 گرام) امریکی ڈالر میں طے ہوتی ہے۔ عالمی قیمت بڑی ایکسچینجز (COMEX، LBMA، شنگھائی) پر بنتی ہے۔ ہم لائیو قیمت STOOQ اور فاریکس ایگریگیٹرز کے ذریعے ٹریک کرتے ہیں۔` },
      { q: `کیا ${f.ur.name} اچھی سرمایہ کاری ہے؟`, a: `ہر قیمتی دھات کا رسک پروفائل مختلف ہے۔ سونا زیادہ مستحکم ہے (محفوظ پناہ گاہ)۔ چاندی زیادہ اتار چڑھاؤ والی ہے اور اس کی صنعتی طلب مضبوط ہے۔ پلاٹینم/پیلیڈیم گاڑیوں کی صنعت سے جڑے ہیں۔ کئی دھاتوں میں تقسیم کرنے سے رسک کم ہوتا ہے۔` },
    ],
    hi: [
      { q: `आज ${f.hi.obl} का भाव क्या है?`, a: `${f.hi.obl} का भाव ऊपर की तालिका में रियल-टाइम अपडेट होता है। भाव USD प्रति ट्रॉय औंस (${id}/USD) में है। 40+ स्थानीय मुद्राओं में बदलने के लिए कैलकुलेटर इस्तेमाल करें।` },
      { q: `${f.hi.obl} के भाव को कौन-से कारक प्रभावित करते हैं?`, a: x.hi.drivers },
      { q: `${f.hi.obl} के मुख्य उपयोग क्या हैं?`, a: x.hi.uses },
      { q: `${f.hi.obl} का भाव कैसे तय होता है?`, a: `${f.hi.obl} का भाव प्रति ट्रॉय औंस (31.1035 ग्राम) अमेरिकी डॉलर में तय होता है। वैश्विक भाव बड़े एक्सचेंजों (COMEX, LBMA, शंघाई) पर बनता है। हम लाइव भाव STOOQ और फ़ॉरेक्स एग्रीगेटर्स के ज़रिये ट्रैक करते हैं।` },
      { q: `क्या ${f.hi.name} अच्छा निवेश है?`, a: `हर कीमती धातु का जोखिम प्रोफ़ाइल अलग है। सोना ज़्यादा स्थिर है (सुरक्षित ठिकाना)। चांदी ज़्यादा अस्थिर है और उसकी औद्योगिक मांग मज़बूत है। प्लैटिनम/पैलेडियम ऑटो उद्योग से जुड़े हैं। कई धातुओं में बाँटने से जोखिम घटता है।` },
    ],
  });
}
