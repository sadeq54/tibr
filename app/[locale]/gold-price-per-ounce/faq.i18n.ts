import { pickList } from "@/lib/i18n-text";
import type { FaqQA } from "@/lib/schemas";

/** FAQ copy for /gold-price-per-ounce — feeds the FAQPage JSON-LD. `en`/`ar` are SEO-tuned; keep byte-identical. */
export function perOunceFaqs(locale: string): FaqQA[] {
  return pickList<FaqQA>(locale, {
    en: [
      {
        q: "How much is one ounce of gold today?",
        a: "Gold ounce price (XAU/USD) updates every second in the table above. One troy ounce = 31.1035 grams. The price is a real-time median across Binance, Coinbase and Kraken via the PAXG/USD pair, backed 1:1 by London Good Delivery gold bars.",
      },
      {
        q: "Why is gold priced per troy ounce?",
        a: "Troy ounce (31.1035g) has been the standard precious-metals trading unit since the 17th century. It differs from the regular ounce (28.35g). All global exchanges (COMEX, LBMA, Shanghai Gold Exchange) quote in troy ounces.",
      },
      {
        q: "How do I convert ounce price to per-gram or per-kilogram?",
        a: "Per gram: ounce price / 31.1035. Per kilogram: ounce price × 32.1507. For example, at 4500 USD/oz: gram = 144.68 USD, kilogram = 144,678 USD. Use the calculator above for automatic conversion in any currency.",
      },
      {
        q: "What is the difference between spot ounce price and jewellery price?",
        a: "The spot ounce price is the global market price for raw gold (99.9% pure). Jewellery is sold at (ounce price × purity ratio / 31.1035) + making charge + retailer margin + local VAT. The spot price is the floor before any additions.",
      },
      {
        q: "Does this page cover silver and platinum ounce prices?",
        a: "This page focuses on gold (XAU). For silver ounce prices visit /precious-metals/silver, platinum /precious-metals/platinum, palladium /precious-metals/palladium.",
      },
    ],
    ar: [
      {
        q: "كم سعر أونصة الذهب اليوم؟",
        a: "سعر أونصة الذهب (XAU/USD) يُحدّث كل ثانية في الجدول أعلاه. الأونصة الترويسية = 31.1035 جرام. السعر مأخوذ كمتوسط لحظي من بورصات Binance وCoinbase وKraken عبر زوج PAXG/USD المدعوم 1:1 بسبائك ذهب فيزيائية من نوع London Good Delivery.",
      },
      {
        q: "لماذا يُسعّر الذهب بالأونصة الترويسية؟",
        a: "الأونصة الترويسية (31.1035 جرام) هي الوحدة المعيارية لتداول المعادن الثمينة منذ القرن السابع عشر. تختلف عن الأونصة العادية (28.35 جرام). جميع البورصات العالمية (COMEX، LBMA، Shanghai Gold Exchange) تستخدم الأونصة الترويسية.",
      },
      {
        q: "كيف أحوّل سعر الأونصة إلى جرام أو كيلوغرام؟",
        a: "للجرام: السعر بالأونصة ÷ 31.1035. للكيلوغرام: السعر بالأونصة × 32.1507. مثلاً، إذا كانت الأونصة 4500$، فالجرام = 144.68$ والكيلوغرام = 144,678$. استخدم الحاسبة أعلاه للتحويل التلقائي بأي عملة.",
      },
      {
        q: "ما الفرق بين سعر أونصة الذهب الفوري وسعر المجوهرات؟",
        a: "السعر الفوري للأونصة هو سعر السوق العالمي للذهب الخام (99.9% نقاء). المجوهرات تباع بسعر = (سعر الأونصة × نسبة النقاء حسب العيار / 31.1035) + مصنعية + هامش بائع التجزئة + ضريبة محلية. السعر الفوري هو الحد الأدنى قبل أي إضافات.",
      },
      {
        q: "هل تشمل أسعار الأونصة هنا الفضة والبلاتين؟",
        a: "هذه الصفحة تركز على الذهب (XAU). لأسعار الفضة بالأونصة، زر صفحة /precious-metals/silver. للبلاتين /precious-metals/platinum. للبلاديوم /precious-metals/palladium.",
      },
    ],
    fr: [
      {
        q: "Combien vaut une once d'or aujourd'hui ?",
        a: "Le prix de l'once d'or (XAU/USD) est mis à jour chaque seconde dans le tableau ci-dessus. Une once troy = 31,1035 grammes. Le prix est la médiane en temps réel de Binance, Coinbase et Kraken via la paire PAXG/USD, adossée 1:1 à des lingots d'or London Good Delivery.",
      },
      {
        q: "Pourquoi l'or est-il coté à l'once troy ?",
        a: "L'once troy (31,1035 g) est l'unité standard de négoce des métaux précieux depuis le XVIIe siècle. Elle diffère de l'once ordinaire (28,35 g). Toutes les bourses mondiales (COMEX, LBMA, Shanghai Gold Exchange) cotent en onces troy.",
      },
      {
        q: "Comment convertir le prix de l'once en prix au gramme ou au kilo ?",
        a: "Au gramme : prix de l'once ÷ 31,1035. Au kilo : prix de l'once × 32,1507. Par exemple, à 4 500 USD/oz : le gramme = 144,68 USD, le kilo = 144 678 USD. Utilisez le calculateur ci-dessus pour une conversion automatique dans n'importe quelle devise.",
      },
      {
        q: "Quelle différence entre le prix spot de l'once et le prix en bijouterie ?",
        a: "Le prix spot de l'once est le prix mondial de l'or brut (pureté 99,9 %). Les bijoux se vendent à (prix de l'once × taux de pureté ÷ 31,1035) + façon + marge du détaillant + TVA locale. Le prix spot est le plancher avant tout ajout.",
      },
      {
        q: "Cette page couvre-t-elle aussi l'argent et le platine à l'once ?",
        a: "Cette page est consacrée à l'or (XAU). Pour le prix de l'once d'argent, voir /precious-metals/silver ; platine /precious-metals/platinum ; palladium /precious-metals/palladium.",
      },
    ],
    tr: [
      {
        q: "Bugün bir ons altın ne kadar?",
        a: "Ons altın fiyatı (XAU/USD) yukarıdaki tabloda her saniye güncellenir. Bir ons troy = 31,1035 gram. Fiyat, London Good Delivery külçelerle 1:1 teminatlı PAXG/USD paritesi üzerinden Binance, Coinbase ve Kraken'in gerçek zamanlı medyanıdır.",
      },
      {
        q: "Altın neden ons troy ile fiyatlanır?",
        a: "Ons troy (31,1035 g), 17. yüzyıldan beri değerli metal ticaretinin standart birimidir. Normal onstan (28,35 g) farklıdır. Tüm küresel borsalar (COMEX, LBMA, Şanghay Altın Borsası) ons troy ile kote eder.",
      },
      {
        q: "Ons fiyatını gram veya kilogram fiyatına nasıl çeviririm?",
        a: "Gram başına: ons fiyatı ÷ 31,1035. Kilogram başına: ons fiyatı × 32,1507. Örneğin 4.500 USD/ons'ta: gram = 144,68 USD, kilogram = 144.678 USD. Herhangi bir para biriminde otomatik dönüşüm için yukarıdaki hesaplayıcıyı kullanın.",
      },
      {
        q: "Spot ons fiyatı ile kuyumcu fiyatı arasındaki fark nedir?",
        a: "Spot ons fiyatı, ham altının (%99,9 saflık) küresel piyasa fiyatıdır. Takı, (ons fiyatı × saflık oranı ÷ 31,1035) + işçilik + perakende marjı + yerel KDV üzerinden satılır. Spot fiyat, tüm eklemelerden önceki taban fiyattır.",
      },
      {
        q: "Bu sayfa gümüş ve platin ons fiyatlarını da kapsıyor mu?",
        a: "Bu sayfa altına (XAU) odaklanır. Gümüş ons fiyatı için /precious-metals/silver, platin için /precious-metals/platinum, paladyum için /precious-metals/palladium sayfasını ziyaret edin.",
      },
    ],
    ur: [
      {
        q: "آج ایک اونس سونے کی قیمت کتنی ہے؟",
        a: "سونے کی فی اونس قیمت (XAU/USD) اوپر جدول میں ہر سیکنڈ اپڈیٹ ہوتی ہے۔ ایک ٹرائے اونس = 31.1035 گرام۔ قیمت PAXG/USD جوڑے کے ذریعے Binance، Coinbase اور Kraken کی ریئل ٹائم میڈین ہے، جس کی پشت پر 1:1 London Good Delivery سونے کی سلاخیں ہیں۔",
      },
      {
        q: "سونے کی قیمت ٹرائے اونس میں کیوں بتائی جاتی ہے؟",
        a: "ٹرائے اونس (31.1035 گرام) سترہویں صدی سے قیمتی دھاتوں کی تجارت کی معیاری اکائی ہے۔ یہ عام اونس (28.35 گرام) سے مختلف ہے۔ تمام عالمی ایکسچینجز (COMEX، LBMA، شنگھائی گولڈ ایکسچینج) ٹرائے اونس میں قیمت بتاتے ہیں۔",
      },
      {
        q: "اونس کی قیمت کو فی گرام یا فی کلوگرام میں کیسے بدلوں؟",
        a: "فی گرام: اونس کی قیمت ÷ 31.1035۔ فی کلوگرام: اونس کی قیمت × 32.1507۔ مثلاً 4500 ڈالر فی اونس پر: گرام = 144.68 ڈالر، کلوگرام = 144,678 ڈالر۔ کسی بھی کرنسی میں خودکار تبدیلی کے لیے اوپر کیلکولیٹر استعمال کریں۔",
      },
      {
        q: "اسپاٹ اونس قیمت اور زیورات کی قیمت میں کیا فرق ہے؟",
        a: "اسپاٹ اونس قیمت خام سونے (99.9% خالص) کی عالمی منڈی کی قیمت ہے۔ زیورات (اونس قیمت × قیراط کے مطابق خالص پن ÷ 31.1035) + بنوائی + دکاندار کا منافع + مقامی ٹیکس پر بکتے ہیں۔ اسپاٹ قیمت کسی بھی اضافے سے پہلے کی بنیادی قیمت ہے۔",
      },
      {
        q: "کیا اس صفحے پر چاندی اور پلاٹینم کی فی اونس قیمت بھی ہے؟",
        a: "یہ صفحہ سونے (XAU) پر مرکوز ہے۔ چاندی کی فی اونس قیمت کے لیے /precious-metals/silver، پلاٹینم کے لیے /precious-metals/platinum، پیلیڈیم کے لیے /precious-metals/palladium دیکھیں۔",
      },
    ],
    hi: [
      {
        q: "आज एक औंस सोने का भाव कितना है?",
        a: "सोने का प्रति औंस भाव (XAU/USD) ऊपर की तालिका में हर सेकंड अपडेट होता है। एक ट्रॉय औंस = 31.1035 ग्राम। भाव PAXG/USD जोड़ी के ज़रिये Binance, Coinbase और Kraken का रियल-टाइम मीडियन है, जो 1:1 London Good Delivery सोने की छड़ों से समर्थित है।",
      },
      {
        q: "सोने का भाव ट्रॉय औंस में क्यों बताया जाता है?",
        a: "ट्रॉय औंस (31.1035 ग्राम) 17वीं सदी से कीमती धातुओं के व्यापार की मानक इकाई है। यह सामान्य औंस (28.35 ग्राम) से अलग है। सभी वैश्विक एक्सचेंज (COMEX, LBMA, शंघाई गोल्ड एक्सचेंज) ट्रॉय औंस में भाव बताते हैं।",
      },
      {
        q: "औंस के भाव को प्रति ग्राम या प्रति किलो में कैसे बदलें?",
        a: "प्रति ग्राम: औंस भाव ÷ 31.1035। प्रति किलोग्राम: औंस भाव × 32.1507। उदाहरण: 4500 USD/औंस पर ग्राम = 144.68 USD, किलोग्राम = 144,678 USD। किसी भी मुद्रा में अपने-आप बदलने के लिए ऊपर का कैलकुलेटर इस्तेमाल करें।",
      },
      {
        q: "स्पॉट औंस भाव और ज्वेलरी भाव में क्या अंतर है?",
        a: "स्पॉट औंस भाव कच्चे सोने (99.9% शुद्ध) का वैश्विक बाज़ार भाव है। ज्वेलरी (औंस भाव × कैरेट के अनुसार शुद्धता ÷ 31.1035) + मेकिंग चार्ज + रिटेलर मार्जिन + स्थानीय टैक्स पर बिकती है। स्पॉट भाव किसी भी जोड़ से पहले का न्यूनतम भाव है।",
      },
      {
        q: "क्या यह पेज चांदी और प्लैटिनम के औंस भाव भी बताता है?",
        a: "यह पेज सोने (XAU) पर केंद्रित है। चांदी के औंस भाव के लिए /precious-metals/silver, प्लैटिनम के लिए /precious-metals/platinum, पैलेडियम के लिए /precious-metals/palladium देखें।",
      },
    ],
  });
}
