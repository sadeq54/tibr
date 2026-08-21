import { pickList } from "@/lib/i18n-text";
import type { FaqQA } from "@/lib/schemas";

/** FAQ copy for /gold-price-per-gram — feeds the FAQPage JSON-LD. `en`/`ar` are SEO-tuned; keep byte-identical. */
export function perGramFaqs(locale: string): FaqQA[] {
  return pickList<FaqQA>(locale, {
    en: [
      {
        q: "How much is a gram of gold today?",
        a: "Per-gram gold price varies by karat. For pure 24K: spot ounce price / 31.1035. For 21K (the most popular karat in Gulf jewellery): multiply 24K price by 0.875. For 18K: multiply 24K price by 0.75. The live table above updates every second across all karats in 40+ currencies.",
      },
      {
        q: "How is the per-gram price calculated from the ounce price?",
        a: "One troy ounce = 31.1035 grams. Spot gold is quoted in USD per troy ounce (XAU/USD). To get per-gram price: spot USD / 31.1035 × purity ratio (1.0 for 24K) × local currency FX rate.",
      },
      {
        q: "Why does the in-shop per-gram price differ from the spot price?",
        a: "Spot price is the global market price for raw gold. Jewellery shops add: making charges (5-30 SAR/gram for complex pieces), retailer margin (3-10%), and local VAT (Saudi: 15%, UAE: 5%, Egypt: none). The spot price is the floor before any retail premium.",
      },
      {
        q: "What is the 21K gold price per gram right now?",
        a: "The live table above shows 21K per-gram price in real time across 40+ currencies. 21K = 87.5% purity. Formula: 24K price × 0.875. Select your currency from the calculator to see prices in SAR, AED, EGP, JOD, or any of 40+ supported currencies.",
      },
      {
        q: "How often is the per-gram price updated?",
        a: "The price updates every second via WebSocket from three exchanges (Binance, Coinbase, Kraken) using the PAXG/USD pair, backed 1:1 by London Good Delivery LBMA-certified gold bars in Brink's vaults.",
      },
    ],
    ar: [
      {
        q: "كم سعر جرام الذهب اليوم؟",
        a: "سعر جرام الذهب يختلف بحسب العيار. للذهب الخالص (24K): سعر الأونصة الفوري ÷ 31.1035. للذهب عيار 21 (الأكثر شيوعاً في الخليج): ضرب سعر 24K في 0.875. للذهب عيار 18: ضرب سعر 24K في 0.75. الجدول أعلاه يحدّث الأسعار كل ثانية لجميع العيارات بـ 40+ عملة.",
      },
      {
        q: "كيف يُحسب سعر الجرام من سعر الأونصة؟",
        a: "الأونصة الترويسية = 31.1035 جرام. السعر الفوري للذهب يُسعّر بالدولار للأونصة (XAU/USD). للحصول على سعر الجرام: السعر الفوري بالدولار ÷ 31.1035 × نسبة النقاء (1.0 لـ 24K) × سعر صرف العملة المحلية.",
      },
      {
        q: "لماذا يختلف سعر الجرام في المحلات عن السعر الفوري؟",
        a: "السعر الفوري هو سعر السوق العالمي للذهب الخام. تضيف محلات المجوهرات: مصنعية (5-30 ريال/جرام للقطع المعقدة)، هامش بائع التجزئة (3-10%)، وضريبة القيمة المضافة المحلية (15% في السعودية، 5% في الإمارات، صفر في مصر). السعر الفوري هو الحد الأدنى قبل أي إضافات.",
      },
      {
        q: "ما هو سعر جرام الذهب عيار 21 الآن؟",
        a: "يحدّث الجدول أعلاه سعر جرام عيار 21 في الوقت الفعلي بـ 40+ عملة. عيار 21 = 87.5% نقاء. السعر = (سعر 24K × 0.875). للحصول على السعر بالريال السعودي أو الدرهم الإماراتي أو الجنيه المصري، اختر العملة من الحاسبة.",
      },
      {
        q: "كم مرة يُحدّث سعر الجرام؟",
        a: "السعر يُحدّث كل ثانية عبر WebSocket من ثلاث بورصات (Binance، Coinbase، Kraken) باستخدام رمز PAXG/USD المدعوم 1:1 بسبائك ذهب فيزيائية من نوع London Good Delivery المعتمدة LBMA.",
      },
    ],
    fr: [
      {
        q: "Combien vaut un gramme d'or aujourd'hui ?",
        a: "Le prix du gramme d'or dépend du titre. Pour l'or pur 24 carats : prix spot de l'once ÷ 31,1035. Pour le 21 carats (le plus courant dans la bijouterie du Golfe) : prix 24 carats × 0,875. Pour le 18 carats : prix 24 carats × 0,75. Le tableau ci-dessus se met à jour chaque seconde pour tous les titres dans plus de 40 devises.",
      },
      {
        q: "Comment calcule-t-on le prix au gramme à partir du prix de l'once ?",
        a: "Une once troy = 31,1035 grammes. L'or spot est coté en USD par once troy (XAU/USD). Prix au gramme : spot USD ÷ 31,1035 × taux de pureté (1,0 pour le 24 carats) × taux de change de la devise locale.",
      },
      {
        q: "Pourquoi le prix au gramme en boutique diffère-t-il du prix spot ?",
        a: "Le prix spot est le prix du marché mondial pour l'or brut. Les bijouteries ajoutent : la façon (5 à 30 SAR/g pour les pièces complexes), la marge du détaillant (3 à 10 %) et la TVA locale (Arabie saoudite : 15 %, Émirats : 5 %, Égypte : aucune). Le prix spot est le plancher avant toute prime de détail.",
      },
      {
        q: "Quel est le prix du gramme d'or 21 carats en ce moment ?",
        a: "Le tableau ci-dessus affiche le prix du gramme 21 carats en temps réel dans plus de 40 devises. 21 carats = 87,5 % de pureté. Formule : prix 24 carats × 0,875. Sélectionnez votre devise dans le calculateur pour voir le prix en SAR, AED, EGP, JOD ou toute autre devise prise en charge.",
      },
      {
        q: "À quelle fréquence le prix au gramme est-il mis à jour ?",
        a: "Le prix est mis à jour chaque seconde via WebSocket depuis trois plateformes (Binance, Coinbase, Kraken) avec la paire PAXG/USD, adossée 1:1 à des lingots London Good Delivery certifiés LBMA dans les coffres de Brink's.",
      },
    ],
    tr: [
      {
        q: "Bugün bir gram altın ne kadar?",
        a: "Gram altın fiyatı ayara göre değişir. Saf 24 ayar için: spot ons fiyatı ÷ 31,1035. 21 ayar için (Körfez takısında en yaygın ayar): 24 ayar fiyatı × 0,875. 18 ayar için: 24 ayar fiyatı × 0,75. Yukarıdaki canlı tablo tüm ayarlar için 40'tan fazla para biriminde her saniye güncellenir.",
      },
      {
        q: "Gram fiyatı ons fiyatından nasıl hesaplanır?",
        a: "Bir ons troy = 31,1035 gram. Spot altın, ons troy başına USD cinsinden kote edilir (XAU/USD). Gram fiyatı: spot USD ÷ 31,1035 × saflık oranı (24 ayar için 1,0) × yerel para birimi kuru.",
      },
      {
        q: "Kuyumcudaki gram fiyatı spot fiyattan neden farklı?",
        a: "Spot fiyat, ham altının küresel piyasa fiyatıdır. Kuyumcular şunları ekler: işçilik (karmaşık parçalarda gram başına 5-30 SAR), perakende marjı (%3-10) ve yerel KDV (Suudi Arabistan: %15, BAE: %5, Mısır: yok). Spot fiyat, her türlü perakende priminden önceki taban fiyattır.",
      },
      {
        q: "Şu an 21 ayar gram altın fiyatı ne kadar?",
        a: "Yukarıdaki canlı tablo 21 ayar gram fiyatını 40'tan fazla para biriminde gerçek zamanlı gösterir. 21 ayar = %87,5 saflık. Formül: 24 ayar fiyatı × 0,875. SAR, AED, EGP, JOD veya desteklenen 40'tan fazla para biriminde fiyatı görmek için hesaplayıcıdan para biriminizi seçin.",
      },
      {
        q: "Gram fiyatı ne sıklıkla güncellenir?",
        a: "Fiyat, üç borsadan (Binance, Coinbase, Kraken) WebSocket ile PAXG/USD paritesi üzerinden her saniye güncellenir; PAXG, Brink's kasalarındaki LBMA sertifikalı London Good Delivery külçelerle 1:1 teminatlıdır.",
      },
    ],
    ur: [
      {
        q: "آج ایک گرام سونے کی قیمت کتنی ہے؟",
        a: "فی گرام سونے کی قیمت قیراط کے حساب سے بدلتی ہے۔ خالص 24 قیراط کے لیے: اسپاٹ اونس قیمت ÷ 31.1035۔ 21 قیراط (خلیجی زیورات میں سب سے عام) کے لیے: 24 قیراط کی قیمت × 0.875۔ 18 قیراط کے لیے: 24 قیراط کی قیمت × 0.75۔ اوپر کی لائیو جدول تمام قیراط کے لیے 40 سے زائد کرنسیوں میں ہر سیکنڈ اپڈیٹ ہوتی ہے۔",
      },
      {
        q: "اونس کی قیمت سے فی گرام قیمت کیسے نکالی جاتی ہے؟",
        a: "ایک ٹرائے اونس = 31.1035 گرام۔ اسپاٹ گولڈ کی قیمت ڈالر فی ٹرائے اونس (XAU/USD) میں بتائی جاتی ہے۔ فی گرام قیمت: اسپاٹ ڈالر ÷ 31.1035 × خالص پن کا تناسب (24 قیراط کے لیے 1.0) × مقامی کرنسی کی شرح تبادلہ۔",
      },
      {
        q: "دکان پر فی گرام قیمت اسپاٹ قیمت سے مختلف کیوں ہوتی ہے؟",
        a: "اسپاٹ قیمت خام سونے کی عالمی منڈی کی قیمت ہے۔ زیورات کی دکانیں اس میں جوڑتی ہیں: بنوائی (پیچیدہ ڈیزائن پر 5 تا 30 سعودی ریال فی گرام)، دکاندار کا منافع (3 تا 10%) اور مقامی ٹیکس (سعودی عرب: 15%، امارات: 5%، مصر: کوئی نہیں)۔ اسپاٹ قیمت کسی بھی ریٹیل پریمیم سے پہلے کی بنیادی قیمت ہے۔",
      },
      {
        q: "ابھی 21 قیراط سونے کی فی گرام قیمت کیا ہے؟",
        a: "اوپر کی لائیو جدول 21 قیراط کی فی گرام قیمت 40 سے زائد کرنسیوں میں ریئل ٹائم دکھاتی ہے۔ 21 قیراط = 87.5% خالص۔ فارمولا: 24 قیراط کی قیمت × 0.875۔ SAR، AED، EGP، JOD یا کسی بھی معاون کرنسی میں قیمت دیکھنے کے لیے کیلکولیٹر سے اپنی کرنسی چنیں۔",
      },
      {
        q: "فی گرام قیمت کتنی بار اپڈیٹ ہوتی ہے؟",
        a: "قیمت تین ایکسچینجز (Binance، Coinbase، Kraken) سے WebSocket کے ذریعے PAXG/USD جوڑے پر ہر سیکنڈ اپڈیٹ ہوتی ہے، جس کی پشت پر Brink's کے والٹس میں رکھی LBMA تصدیق شدہ London Good Delivery سلاخیں 1:1 ہیں۔",
      },
    ],
    hi: [
      {
        q: "आज एक ग्राम सोने का भाव कितना है?",
        a: "प्रति ग्राम सोने का भाव कैरेट के अनुसार बदलता है। शुद्ध 24 कैरेट के लिए: स्पॉट औंस भाव ÷ 31.1035। 21 कैरेट (खाड़ी की ज्वेलरी में सबसे आम) के लिए: 24 कैरेट भाव × 0.875। 18 कैरेट के लिए: 24 कैरेट भाव × 0.75। ऊपर की लाइव तालिका सभी कैरेट के लिए 40+ मुद्राओं में हर सेकंड अपडेट होती है।",
      },
      {
        q: "औंस भाव से प्रति ग्राम भाव कैसे निकाला जाता है?",
        a: "एक ट्रॉय औंस = 31.1035 ग्राम। स्पॉट गोल्ड का भाव USD प्रति ट्रॉय औंस (XAU/USD) में बताया जाता है। प्रति ग्राम भाव: स्पॉट USD ÷ 31.1035 × शुद्धता अनुपात (24 कैरेट के लिए 1.0) × स्थानीय मुद्रा की विनिमय दर।",
      },
      {
        q: "दुकान का प्रति ग्राम भाव स्पॉट भाव से अलग क्यों होता है?",
        a: "स्पॉट भाव कच्चे सोने का वैश्विक बाज़ार भाव है। ज्वेलरी दुकानें जोड़ती हैं: मेकिंग चार्ज (जटिल डिज़ाइन पर 5-30 SAR/ग्राम), रिटेलर मार्जिन (3-10%) और स्थानीय टैक्स (सऊदी अरब: 15%, यूएई: 5%, मिस्र: कोई नहीं)। स्पॉट भाव किसी भी रिटेल प्रीमियम से पहले का न्यूनतम भाव है।",
      },
      {
        q: "अभी 21 कैरेट सोने का प्रति ग्राम भाव क्या है?",
        a: "ऊपर की लाइव तालिका 21 कैरेट का प्रति ग्राम भाव 40+ मुद्राओं में रियल-टाइम दिखाती है। 21 कैरेट = 87.5% शुद्धता। फ़ॉर्मूला: 24 कैरेट भाव × 0.875। SAR, AED, EGP, JOD या किसी भी समर्थित मुद्रा में भाव देखने के लिए कैलकुलेटर से अपनी मुद्रा चुनें।",
      },
      {
        q: "प्रति ग्राम भाव कितनी बार अपडेट होता है?",
        a: "भाव तीन एक्सचेंजों (Binance, Coinbase, Kraken) से WebSocket के ज़रिये PAXG/USD जोड़ी पर हर सेकंड अपडेट होता है, जो Brink's की तिजोरियों में रखी LBMA-प्रमाणित London Good Delivery छड़ों से 1:1 समर्थित है।",
      },
    ],
  });
}
