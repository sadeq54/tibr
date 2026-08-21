import { pickList } from "@/lib/i18n-text";
import type { FaqQA } from "@/lib/schemas";

/** FAQ copy for /live-gold-price — feeds the FAQPage JSON-LD. `en`/`ar` are SEO-tuned; keep byte-identical. */
export function liveGoldFaqs(locale: string): FaqQA[] {
  return pickList<FaqQA>(locale, {
    en: [
      {
        q: "What does 'live gold price' mean?",
        a: "Live price = the spot gold price updated in real time (roughly every second) via WebSocket from Binance, Coinbase and Kraken exchanges. Distinct from historical or daily-close prices — the live price moves with every trade on global exchanges.",
      },
      {
        q: "How often does the live gold price update?",
        a: "The price updates on every tick from the exchanges — typically multiple times per second. The app computes the median across 3 exchanges per tick. The timestamp shown reflects the last update from the source.",
      },
      {
        q: "Why does the live gold price differ across sites?",
        a: "Four reasons: (1) different sources (some sites use one exchange, we median across 3), (2) update lag (1 second vs 60 seconds), (3) display currency (XAU/USD vs XAU/AED computed at a different FX rate), (4) bid/ask spread treatment. Cents-level differences are normal.",
      },
      {
        q: "How do I track gold price in SAR and AED?",
        a: "This page displays the price in 40+ currencies automatically. Select your currency from the calculator dropdown. The SAR/AED price is computed from XAU/USD × the daily FX rate (updated from open central-bank data).",
      },
      {
        q: "Is the live price here the same as on Kitco or Investing.com?",
        a: "Differences are usually a cent or two due to different ticker sources. Kitco uses LBMA + COMEX, we use Binance/Coinbase/Kraken median (PAXG). All these prices move together within a very tight band. For cross-verification, compare with Investing.com or TradingView.",
      },
    ],
    ar: [
      {
        q: "ماذا يعني سعر الذهب المباشر؟",
        a: "السعر المباشر = سعر الذهب الفوري المُحدّث في الوقت الحقيقي (كل ثانية تقريباً) عبر اتصال WebSocket مع بورصات Binance، Coinbase، Kraken. مختلف عن الأسعار التاريخية أو أسعار الإغلاق اليومية — السعر المباشر يتحرك مع كل صفقة على البورصات العالمية.",
      },
      {
        q: "كم مرة يتم تحديث السعر المباشر للذهب؟",
        a: "السعر يُحدّث عند كل تيك (نبضة) من البورصات — عادة عدة مرات في الثانية. التطبيق يحسب المتوسط من 3 بورصات لكل تيك. الإطار الزمني المُعروض هو زمن آخر تحديث من المصدر.",
      },
      {
        q: "لماذا يختلف سعر الذهب المباشر بين المواقع؟",
        a: "أربعة أسباب: (1) كل موقع يستخدم مصادر مختلفة (بعضهم بورصة واحدة، نحن متوسط من 3)، (2) تأخير التحديث (1 ثانية مقابل 60 ثانية)، (3) عملة العرض (XAU/USD مقابل XAU/AED محسوب بسعر صرف مختلف)، (4) نسبة المضاربة (bid/ask spread). فروقات بضعة سنتات عادية.",
      },
      {
        q: "كيف أتتبّع سعر الذهب بالريال السعودي والدرهم الإماراتي؟",
        a: "هذه الصفحة تعرض السعر تلقائياً بـ40+ عملة. اختر العملة من القائمة المنسدلة في الحاسبة. السعر بـSAR/AED محسوب من XAU/USD × سعر الصرف اليومي (محدّث من بيانات البنوك المركزية المفتوحة).",
      },
      {
        q: "هل السعر المباشر هنا هو نفسه على Kitco أو Investing.com؟",
        a: "الفرق عادة سنت أو سنتين بسبب اختلاف مصادر التيكر. Kitco يستخدم تثبيت LBMA + COMEX، نحن نستخدم متوسط Binance/Coinbase/Kraken (PAXG). جميع هذه الأسعار تتحرك معاً ضمن نطاق ضيق جداً. للتحقق المُتقاطع، قارن مع Investing.com أو TradingView.",
      },
    ],
    fr: [
      {
        q: "Que signifie « cours de l'or en direct » ?",
        a: "Cours en direct = cours spot de l'or actualisé en temps réel (environ chaque seconde) via WebSocket depuis les plateformes Binance, Coinbase et Kraken. À distinguer des cours historiques ou de clôture quotidienne — le cours en direct bouge à chaque transaction sur les bourses mondiales.",
      },
      {
        q: "À quelle fréquence le cours de l'or en direct est-il mis à jour ?",
        a: "Le cours est mis à jour à chaque tick des plateformes — généralement plusieurs fois par seconde. L'application calcule la médiane de 3 plateformes à chaque tick. L'horodatage affiché correspond à la dernière mise à jour de la source.",
      },
      {
        q: "Pourquoi le cours de l'or en direct diffère-t-il d'un site à l'autre ?",
        a: "Quatre raisons : (1) sources différentes (certains sites utilisent une seule plateforme, nous prenons la médiane de 3), (2) latence de mise à jour (1 seconde contre 60 secondes), (3) devise d'affichage (XAU/USD contre XAU/AED calculé à un taux de change différent), (4) traitement du spread bid/ask. Des écarts de quelques cents sont normaux.",
      },
      {
        q: "Comment suivre le cours de l'or en SAR et en AED ?",
        a: "Cette page affiche automatiquement le cours dans plus de 40 devises. Sélectionnez votre devise dans le menu déroulant du calculateur. Le prix en SAR/AED est calculé à partir de XAU/USD × le taux de change quotidien (mis à jour à partir des données ouvertes des banques centrales).",
      },
      {
        q: "Le cours en direct ici est-il le même que sur Kitco ou Investing.com ?",
        a: "Les écarts sont généralement d'un ou deux cents, dus à des sources de cotation différentes. Kitco utilise LBMA + COMEX, nous utilisons la médiane Binance/Coinbase/Kraken (PAXG). Tous ces prix évoluent ensemble dans une fourchette très étroite. Pour une vérification croisée, comparez avec Investing.com ou TradingView.",
      },
    ],
    tr: [
      {
        q: "'Canlı altın fiyatı' ne anlama gelir?",
        a: "Canlı fiyat = Binance, Coinbase ve Kraken borsalarından WebSocket ile gerçek zamanlı (yaklaşık her saniye) güncellenen spot altın fiyatı. Geçmiş veya günlük kapanış fiyatlarından farklıdır — canlı fiyat küresel borsalardaki her işlemle hareket eder.",
      },
      {
        q: "Canlı altın fiyatı ne sıklıkla güncellenir?",
        a: "Fiyat, borsalardan gelen her tick'te güncellenir — genellikle saniyede birkaç kez. Uygulama her tick için 3 borsanın medyanını hesaplar. Gösterilen zaman damgası kaynaktan gelen son güncellemeyi yansıtır.",
      },
      {
        q: "Canlı altın fiyatı siteler arasında neden farklı?",
        a: "Dört neden: (1) farklı kaynaklar (bazı siteler tek borsa kullanır, biz 3 borsanın medyanını alırız), (2) güncelleme gecikmesi (1 saniye ile 60 saniye), (3) gösterim para birimi (XAU/USD ile farklı kurdan hesaplanan XAU/AED), (4) alış/satış farkının ele alınışı. Birkaç sentlik farklar normaldir.",
      },
      {
        q: "Altın fiyatını SAR ve AED cinsinden nasıl takip ederim?",
        a: "Bu sayfa fiyatı otomatik olarak 40'tan fazla para biriminde gösterir. Hesaplayıcıdaki açılır menüden para biriminizi seçin. SAR/AED fiyatı, XAU/USD × günlük döviz kuru (açık merkez bankası verilerinden güncellenir) ile hesaplanır.",
      },
      {
        q: "Buradaki canlı fiyat Kitco veya Investing.com ile aynı mı?",
        a: "Farklı veri kaynakları nedeniyle fark genellikle bir iki senttir. Kitco LBMA + COMEX kullanır, biz Binance/Coinbase/Kraken medyanını (PAXG) kullanırız. Tüm bu fiyatlar çok dar bir bantta birlikte hareket eder. Çapraz doğrulama için Investing.com veya TradingView ile karşılaştırın.",
      },
    ],
    ur: [
      {
        q: "'لائیو سونے کی قیمت' کا کیا مطلب ہے؟",
        a: "لائیو قیمت = سونے کی اسپاٹ قیمت جو Binance، Coinbase اور Kraken ایکسچینجز سے WebSocket کے ذریعے ریئل ٹائم (تقریباً ہر سیکنڈ) اپڈیٹ ہوتی ہے۔ یہ تاریخی یا یومیہ بند ہونے والی قیمتوں سے الگ ہے — لائیو قیمت عالمی ایکسچینجز پر ہر سودے کے ساتھ حرکت کرتی ہے۔",
      },
      {
        q: "سونے کی لائیو قیمت کتنی بار اپڈیٹ ہوتی ہے؟",
        a: "قیمت ایکسچینجز کے ہر ٹِک پر اپڈیٹ ہوتی ہے — عموماً سیکنڈ میں کئی بار۔ ایپ ہر ٹِک پر 3 ایکسچینجز کی میڈین نکالتی ہے۔ دکھایا گیا وقت ماخذ سے آخری اپڈیٹ کا ہے۔",
      },
      {
        q: "سونے کی لائیو قیمت مختلف ویب سائٹس پر الگ کیوں ہوتی ہے؟",
        a: "چار وجوہات: (1) مختلف ماخذ (کچھ سائٹس ایک ایکسچینج استعمال کرتی ہیں، ہم 3 کی میڈین لیتے ہیں)، (2) اپڈیٹ کی تاخیر (1 سیکنڈ بمقابلہ 60 سیکنڈ)، (3) ڈسپلے کرنسی (XAU/USD بمقابلہ مختلف شرح تبادلہ پر حساب کیا گیا XAU/AED)، (4) بِڈ/آسک اسپریڈ کا طریقہ۔ چند سینٹ کا فرق معمول ہے۔",
      },
      {
        q: "سعودی ریال اور اماراتی درہم میں سونے کی قیمت کیسے دیکھوں؟",
        a: "یہ صفحہ خودکار طور پر 40 سے زائد کرنسیوں میں قیمت دکھاتا ہے۔ کیلکولیٹر کے ڈراپ ڈاؤن سے اپنی کرنسی چنیں۔ SAR/AED قیمت XAU/USD × یومیہ شرح تبادلہ (مرکزی بینکوں کے اوپن ڈیٹا سے اپڈیٹ) سے نکالی جاتی ہے۔",
      },
      {
        q: "کیا یہاں کی لائیو قیمت Kitco یا Investing.com جیسی ہے؟",
        a: "ٹِکر کے مختلف ماخذ کی وجہ سے عموماً ایک دو سینٹ کا فرق ہوتا ہے۔ Kitco LBMA + COMEX استعمال کرتا ہے، ہم Binance/Coinbase/Kraken کی میڈین (PAXG) استعمال کرتے ہیں۔ یہ سب قیمتیں ایک بہت تنگ دائرے میں ساتھ چلتی ہیں۔ تصدیق کے لیے Investing.com یا TradingView سے موازنہ کریں۔",
      },
    ],
    hi: [
      {
        q: "'लाइव गोल्ड प्राइस' का क्या मतलब है?",
        a: "लाइव भाव = Binance, Coinbase और Kraken एक्सचेंजों से WebSocket के ज़रिये रियल-टाइम (लगभग हर सेकंड) अपडेट होने वाला स्पॉट गोल्ड भाव। यह ऐतिहासिक या दैनिक क्लोज़िंग भाव से अलग है — लाइव भाव वैश्विक एक्सचेंजों पर हर ट्रेड के साथ बदलता है।",
      },
      {
        q: "लाइव गोल्ड प्राइस कितनी बार अपडेट होता है?",
        a: "भाव एक्सचेंजों के हर टिक पर अपडेट होता है — आमतौर पर सेकंड में कई बार। ऐप हर टिक पर 3 एक्सचेंजों का मीडियन निकालता है। दिखाया गया समय स्रोत से आख़िरी अपडेट का है।",
      },
      {
        q: "लाइव गोल्ड प्राइस अलग-अलग साइटों पर अलग क्यों होता है?",
        a: "चार कारण: (1) अलग स्रोत (कुछ साइटें एक एक्सचेंज इस्तेमाल करती हैं, हम 3 का मीडियन लेते हैं), (2) अपडेट में देरी (1 सेकंड बनाम 60 सेकंड), (3) डिस्प्ले मुद्रा (XAU/USD बनाम अलग विनिमय दर पर गिना गया XAU/AED), (4) बिड/आस्क स्प्रेड का तरीक़ा। कुछ सेंट का अंतर सामान्य है।",
      },
      {
        q: "SAR और AED में सोने का भाव कैसे देखें?",
        a: "यह पेज अपने-आप 40+ मुद्राओं में भाव दिखाता है। कैलकुलेटर के ड्रॉपडाउन से अपनी मुद्रा चुनें। SAR/AED भाव XAU/USD × दैनिक विनिमय दर (केंद्रीय बैंकों के ओपन डेटा से अपडेट) से निकाला जाता है।",
      },
      {
        q: "क्या यहाँ का लाइव भाव Kitco या Investing.com जैसा ही है?",
        a: "टिकर स्रोत अलग होने से आमतौर पर एक-दो सेंट का अंतर रहता है। Kitco LBMA + COMEX इस्तेमाल करता है, हम Binance/Coinbase/Kraken का मीडियन (PAXG) इस्तेमाल करते हैं। ये सभी भाव बहुत संकरे दायरे में साथ चलते हैं। क्रॉस-चेक के लिए Investing.com या TradingView से तुलना करें।",
      },
    ],
  });
}
