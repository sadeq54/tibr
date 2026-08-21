import { pickList } from "@/lib/i18n-text";
import type { FaqQA } from "@/lib/schemas";

/** FAQ copy for /spot-gold — feeds the FAQPage JSON-LD. `en`/`ar` are SEO-tuned; keep byte-identical. */
export function spotGoldFaqs(locale: string): FaqQA[] {
  return pickList<FaqQA>(locale, {
    en: [
      {
        q: "What is the spot gold price?",
        a: "Spot gold (XAU/USD) is the raw gold price in US Dollars per troy ounce (31.1035 grams) on the global market. It updates in real time via Binance, Coinbase and Kraken — median across three exchanges to prevent skew. It differs from jewellery shop prices which include making charges and VAT.",
      },
      {
        q: "How is the spot gold price determined?",
        a: "The spot price emerges from real-time supply/demand on commodity and crypto exchanges (PAXG is a token backed 1:1 by physical gold bars). The LBMA fix sets a reference price twice daily (10:30 and 15:00 London time), but the live spot price moves every second around this reference.",
      },
      {
        q: "What is the difference between spot price and jewellery price?",
        a: "Spot price = raw global gold (99.9% pure). Jewellery shops add: (1) making charges (5-30 SAR/gram for complex pieces), (2) retailer margin (3-10%), (3) local VAT (Saudi 15% on jewellery, UAE 5%, Egypt 0%). Spot is the floor before any additions.",
      },
      {
        q: "Why does the spot gold price change?",
        a: "Drivers: (1) Fed decisions (interest rates, inflation), (2) geopolitical events (gold as safe haven), (3) USD strength (inverse correlation), (4) central bank demand, (5) Indian/Chinese jewellery season. During crises, gold rises because investors seek safety.",
      },
      {
        q: "What is the difference between XAU/USD and PAXG?",
        a: "XAU/USD = the traditional gold spot symbol (an accounting unit, not directly traded). PAXG = a digital token backed 1:1 by London Good Delivery physical gold bars in Brink's vaults, audited monthly by Withum. PAXG trades 24/7 on Binance/Coinbase/Kraken at prices matching spot ± a few cents.",
      },
    ],
    ar: [
      {
        q: "ما هو السعر الفوري للذهب؟",
        a: "السعر الفوري للذهب (XAU/USD) هو سعر الذهب الخام بالدولار الأمريكي للأونصة الترويسية (31.1035 جرام) في السوق العالمي. يُحدّث لحظياً عبر بورصات Binance، Coinbase، Kraken — متوسط من ثلاث منصات لمنع الانحراف. يختلف عن السعر في محلات المجوهرات الذي يشمل مصنعية وضريبة.",
      },
      {
        q: "كيف يُحدّد السعر الفوري للذهب؟",
        a: "السعر الفوري ينتج من عرض/طلب لحظي على بورصات تداول السلع والسلع المشفرة (PAXG رمز مدعوم 1:1 بسبائك ذهب فيزيائية). تثبيت LBMA يُحدّد سعر مرجعي مرتين يومياً (10:30 و15:00 بتوقيت لندن) لكن السعر الفوري الحي يتحرك كل ثانية حول هذا المرجع.",
      },
      {
        q: "ما الفرق بين السعر الفوري وسعر محلات المجوهرات؟",
        a: "السعر الفوري = سعر الذهب العالمي الخام (99.9% نقاء). محلات المجوهرات تضيف: (1) المصنعية (5-30 ريال/جرام للقطع المعقدة)، (2) هامش بائع التجزئة (3-10%)، (3) ضريبة محلية (15% في السعودية على المجوهرات، 5% في الإمارات، صفر في مصر). السعر الفوري هو الحد الأدنى.",
      },
      {
        q: "لماذا يتغير السعر الفوري للذهب؟",
        a: "العوامل: (1) قرارات الفيدرالي الأمريكي (أسعار الفائدة، التضخم)، (2) الأحداث الجيوسياسية (الذهب ملاذ آمن)، (3) قوة الدولار (ارتباط عكسي)، (4) طلب البنوك المركزية، (5) موسمية المجوهرات في الهند والصين. خلال الأزمات، الذهب يرتفع لأن المستثمرين يبحثون عن الأمان.",
      },
      {
        q: "ما الفرق بين XAU/USD وPAXG؟",
        a: "XAU/USD = الرمز التقليدي لسعر الذهب الفوري (وحدة محاسبية، لا يُتداول مباشرة). PAXG = رمز رقمي مدعوم 1:1 بسبائك ذهب فيزيائية من فئة London Good Delivery موجودة في خزائن Brink's، مُدقّق شهرياً من Withum. PAXG يتداول 24/7 على Binance/Coinbase/Kraken بسعر مطابق للسعر الفوري ± سنتات قليلة.",
      },
    ],
    fr: [
      {
        q: "Qu'est-ce que le cours spot de l'or ?",
        a: "Le cours spot de l'or (XAU/USD) est le prix de l'or brut en dollars américains par once troy (31,1035 g) sur le marché mondial. Il est mis à jour en temps réel via Binance, Coinbase et Kraken — médiane de trois plateformes pour éviter tout biais. Il diffère du prix en bijouterie, qui inclut la façon et la TVA.",
      },
      {
        q: "Comment le cours spot de l'or est-il déterminé ?",
        a: "Le cours spot résulte de l'offre et de la demande en temps réel sur les bourses de matières premières et les plateformes crypto (le PAXG est un jeton adossé 1:1 à des lingots d'or physiques). Le fixing LBMA établit un prix de référence deux fois par jour (10 h 30 et 15 h, heure de Londres), mais le cours spot en direct évolue chaque seconde autour de cette référence.",
      },
      {
        q: "Quelle différence entre le cours spot et le prix en bijouterie ?",
        a: "Cours spot = or brut mondial (pureté 99,9 %). Les bijouteries ajoutent : (1) la façon (5 à 30 SAR/g pour les pièces complexes), (2) la marge du détaillant (3 à 10 %), (3) la TVA locale (15 % en Arabie saoudite sur les bijoux, 5 % aux Émirats, 0 % en Égypte). Le spot est le plancher avant tout ajout.",
      },
      {
        q: "Pourquoi le cours spot de l'or varie-t-il ?",
        a: "Facteurs : (1) décisions de la Fed (taux, inflation), (2) événements géopolitiques (l'or comme valeur refuge), (3) force du dollar (corrélation inverse), (4) demande des banques centrales, (5) saison de la bijouterie en Inde et en Chine. En période de crise, l'or monte car les investisseurs cherchent la sécurité.",
      },
      {
        q: "Quelle différence entre XAU/USD et PAXG ?",
        a: "XAU/USD = le symbole traditionnel du cours spot de l'or (unité de compte, non négociée directement). PAXG = jeton numérique adossé 1:1 à des lingots London Good Delivery conservés dans les coffres de Brink's, audités chaque mois par Withum. Le PAXG se négocie 24h/24 et 7j/7 sur Binance/Coinbase/Kraken à un prix égal au spot ± quelques cents.",
      },
    ],
    tr: [
      {
        q: "Spot altın fiyatı nedir?",
        a: "Spot altın (XAU/USD), küresel piyasada ham altının ons troy (31,1035 gram) başına ABD doları cinsinden fiyatıdır. Binance, Coinbase ve Kraken üzerinden gerçek zamanlı güncellenir — sapmayı önlemek için üç borsanın medyanı alınır. İşçilik ve KDV içeren kuyumcu fiyatlarından farklıdır.",
      },
      {
        q: "Spot altın fiyatı nasıl belirlenir?",
        a: "Spot fiyat, emtia ve kripto borsalarındaki anlık arz/talepten oluşur (PAXG, fiziksel altın külçeleriyle 1:1 teminatlı bir tokendır). LBMA fiksingi günde iki kez (Londra saatiyle 10:30 ve 15:00) referans fiyat belirler; canlı spot fiyat ise bu referans etrafında her saniye hareket eder.",
      },
      {
        q: "Spot fiyat ile kuyumcu fiyatı arasındaki fark nedir?",
        a: "Spot fiyat = küresel ham altın (%99,9 saflık). Kuyumcular şunları ekler: (1) işçilik (karmaşık parçalarda gram başına 5-30 SAR), (2) perakende marjı (%3-10), (3) yerel KDV (Suudi Arabistan'da takıda %15, BAE'de %5, Mısır'da %0). Spot, tüm eklemelerden önceki taban fiyattır.",
      },
      {
        q: "Spot altın fiyatı neden değişir?",
        a: "Etkenler: (1) Fed kararları (faiz, enflasyon), (2) jeopolitik olaylar (güvenli liman olarak altın), (3) doların gücü (ters korelasyon), (4) merkez bankası talebi, (5) Hindistan ve Çin'de takı sezonu. Kriz dönemlerinde yatırımcılar güvenlik aradığı için altın yükselir.",
      },
      {
        q: "XAU/USD ile PAXG arasındaki fark nedir?",
        a: "XAU/USD = geleneksel spot altın sembolü (hesap birimi, doğrudan işlem görmez). PAXG = Brink's kasalarındaki London Good Delivery fiziksel külçelerle 1:1 teminatlı, Withum tarafından aylık denetlenen dijital token. PAXG, Binance/Coinbase/Kraken'de 7/24, spot fiyata ± birkaç sent yakın işlem görür.",
      },
    ],
    ur: [
      {
        q: "سونے کی اسپاٹ قیمت کیا ہے؟",
        a: "اسپاٹ گولڈ (XAU/USD) عالمی منڈی میں خام سونے کی قیمت ہے جو امریکی ڈالر میں فی ٹرائے اونس (31.1035 گرام) بتائی جاتی ہے۔ یہ Binance، Coinbase اور Kraken سے ریئل ٹائم اپڈیٹ ہوتی ہے — تین ایکسچینجز کی میڈین لی جاتی ہے تاکہ انحراف نہ ہو۔ یہ زیورات کی دکان کی قیمت سے مختلف ہے جس میں بنوائی اور ٹیکس شامل ہوتے ہیں۔",
      },
      {
        q: "سونے کی اسپاٹ قیمت کیسے طے ہوتی ہے؟",
        a: "اسپاٹ قیمت کموڈٹی اور کرپٹو ایکسچینجز پر لمحہ بہ لمحہ طلب و رسد سے بنتی ہے (PAXG ایک ٹوکن ہے جس کی پشت پر 1:1 فزیکل سونے کی سلاخیں ہیں)۔ LBMA فکس دن میں دو بار (لندن وقت 10:30 اور 15:00) حوالہ قیمت مقرر کرتا ہے، مگر لائیو اسپاٹ قیمت اسی حوالے کے گرد ہر سیکنڈ حرکت کرتی ہے۔",
      },
      {
        q: "اسپاٹ قیمت اور زیورات کی قیمت میں کیا فرق ہے؟",
        a: "اسپاٹ قیمت = عالمی خام سونا (99.9% خالص)۔ زیورات کی دکانیں اس میں جوڑتی ہیں: (1) بنوائی (پیچیدہ ڈیزائن پر 5 تا 30 سعودی ریال فی گرام)، (2) دکاندار کا منافع (3 تا 10%)، (3) مقامی ٹیکس (سعودی عرب میں زیورات پر 15%، امارات میں 5%، مصر میں صفر)۔ اسپاٹ قیمت کسی بھی اضافے سے پہلے کی بنیادی قیمت ہے۔",
      },
      {
        q: "سونے کی اسپاٹ قیمت کیوں بدلتی ہے؟",
        a: "عوامل: (1) امریکی فیڈرل ریزرو کے فیصلے (شرح سود، مہنگائی)، (2) جغرافیائی سیاسی واقعات (سونا محفوظ پناہ گاہ)، (3) ڈالر کی مضبوطی (الٹا تعلق)، (4) مرکزی بینکوں کی طلب، (5) بھارت اور چین میں زیورات کا سیزن۔ بحران کے دوران سونا چڑھتا ہے کیونکہ سرمایہ کار تحفظ ڈھونڈتے ہیں۔",
      },
      {
        q: "XAU/USD اور PAXG میں کیا فرق ہے؟",
        a: "XAU/USD = سونے کی اسپاٹ قیمت کی روایتی علامت (حسابی اکائی، براہِ راست تجارت نہیں ہوتی)۔ PAXG = ڈیجیٹل ٹوکن جس کی پشت پر Brink's کے والٹس میں رکھی London Good Delivery فزیکل سلاخیں 1:1 ہیں، جن کا Withum ماہانہ آڈٹ کرتا ہے۔ PAXG Binance/Coinbase/Kraken پر 24/7 اسپاٹ کے برابر ± چند سینٹ پر ٹریڈ ہوتا ہے۔",
      },
    ],
    hi: [
      {
        q: "स्पॉट गोल्ड प्राइस क्या है?",
        a: "स्पॉट गोल्ड (XAU/USD) वैश्विक बाज़ार में कच्चे सोने का भाव है, जो अमेरिकी डॉलर में प्रति ट्रॉय औंस (31.1035 ग्राम) बताया जाता है। यह Binance, Coinbase और Kraken से रियल-टाइम अपडेट होता है — तीन एक्सचेंजों का मीडियन लिया जाता है ताकि विचलन न हो। यह ज्वेलरी दुकान के भाव से अलग है, जिसमें मेकिंग चार्ज और टैक्स शामिल होते हैं।",
      },
      {
        q: "स्पॉट गोल्ड प्राइस कैसे तय होता है?",
        a: "स्पॉट भाव कमोडिटी और क्रिप्टो एक्सचेंजों पर रियल-टाइम मांग-आपूर्ति से बनता है (PAXG एक टोकन है जो 1:1 भौतिक सोने की छड़ों से समर्थित है)। LBMA फिक्स दिन में दो बार (लंदन समय 10:30 और 15:00) संदर्भ भाव तय करता है, लेकिन लाइव स्पॉट भाव इसी संदर्भ के आसपास हर सेकंड बदलता है।",
      },
      {
        q: "स्पॉट भाव और ज्वेलरी भाव में क्या अंतर है?",
        a: "स्पॉट भाव = वैश्विक कच्चा सोना (99.9% शुद्ध)। ज्वेलरी दुकानें जोड़ती हैं: (1) मेकिंग चार्ज (जटिल डिज़ाइन पर 5-30 SAR/ग्राम), (2) रिटेलर मार्जिन (3-10%), (3) स्थानीय टैक्स (सऊदी अरब में ज्वेलरी पर 15%, यूएई 5%, मिस्र 0%)। स्पॉट भाव किसी भी जोड़ से पहले का न्यूनतम भाव है।",
      },
      {
        q: "स्पॉट गोल्ड प्राइस क्यों बदलता है?",
        a: "कारक: (1) फेड के फ़ैसले (ब्याज दर, महंगाई), (2) भू-राजनीतिक घटनाएँ (सोना सुरक्षित ठिकाना), (3) डॉलर की मज़बूती (उल्टा संबंध), (4) केंद्रीय बैंकों की मांग, (5) भारत और चीन में ज्वेलरी सीज़न। संकट के समय सोना चढ़ता है क्योंकि निवेशक सुरक्षा खोजते हैं।",
      },
      {
        q: "XAU/USD और PAXG में क्या अंतर है?",
        a: "XAU/USD = स्पॉट गोल्ड का पारंपरिक प्रतीक (लेखा इकाई, सीधे ट्रेड नहीं होता)। PAXG = डिजिटल टोकन, जो Brink's की तिजोरियों में रखी London Good Delivery भौतिक छड़ों से 1:1 समर्थित है और जिसका Withum हर महीने ऑडिट करता है। PAXG Binance/Coinbase/Kraken पर 24/7 स्पॉट के बराबर ± कुछ सेंट पर ट्रेड होता है।",
      },
    ],
  });
}
