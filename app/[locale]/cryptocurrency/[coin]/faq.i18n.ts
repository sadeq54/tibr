import { pickList } from "@/lib/i18n-text";
import type { FaqQA } from "@/lib/schemas";

type CryptoFaqVars = {
  /** Localized coin name (Bitcoin / بيتكوين). */
  name: string;
  symbol: string;
  /** Pre-formatted prices (already run through `localeMeta(locale).intl`) — null when the quote failed. */
  prices: { usd: string; sar: string; aed: string } | null;
};

/**
 * FAQ copy for /cryptocurrency/[coin] — feeds the FAQPage JSON-LD.
 * `en`/`ar` are SEO-tuned; keep byte-identical.
 */
export function cryptoFaqs(locale: string, { name, symbol, prices }: CryptoFaqVars): FaqQA[] {
  return pickList<FaqQA>(locale, {
    en: [
      {
        q: `What is the ${name} price today?`,
        a: prices
          ? `${name} is now ${prices.usd} USD, or ${prices.sar} SAR / ${prices.aed} AED. Price sourced from CoinGecko.`
          : `${name} price updates in the box above, sourced from CoinGecko.`,
      },
      {
        q: `How do I convert ${symbol} to Saudi Riyals or UAE Dirhams?`,
        a: `Multiply the ${symbol}/USD price by the daily USD/SAR rate (~3.75) or USD/AED rate (~3.67). We refresh the FX rate daily from open central-bank data.`,
      },
      {
        q: `Is ${name} permissible (halal) under Islamic law?`,
        a: `This is debated among Islamic scholars. Some councils (Al-Azhar, Egypt's Dar Al-Ifta) have issued rulings against speculative crypto trading. Others (AAOIFI — the Accounting and Auditing Organization for Islamic Financial Institutions) differentiate by use case. Consult a trusted religious authority before trading.`,
      },
      {
        q: `Where can I buy ${name} in the MENA region?`,
        a: `No fully licensed local exchange exists in most Gulf states. International platforms (Binance, Coinbase, Kraken, OKX, Bybit) are accessible from the region. Verify the legal status in your country before buying — restricted in Saudi Arabia, regulated in UAE, restricted in Morocco.`,
      },
      {
        q: `How often is the ${name} price updated?`,
        a: `Price updates approximately every minute from CoinGecko's API. For real-time (tick-by-tick) prices, use Binance or CoinMarketCap directly. We provide a snapshot accurate enough for daily decisions, not for high-frequency trading.`,
      },
    ],
    ar: [
      {
        q: `كم سعر ${name} اليوم؟`,
        a: prices
          ? `سعر ${name} الآن ${prices.usd} دولار، أو ${prices.sar} ريال سعودي. السعر يُحدّث من بيانات CoinGecko.`
          : `سعر ${name} يُحدّث في الصندوق أعلاه من بيانات CoinGecko.`,
      },
      {
        q: `كيف أحوّل ${symbol} إلى ريال سعودي؟`,
        a: `استخدم سعر الصرف الحالي: 1 ${symbol} × سعر الصرف الدولار/الريال (≈3.75). نحن نُحدّث سعر الصرف يومياً من بيانات البنوك المركزية المفتوحة.`,
      },
      {
        q: `هل ${name} حلال؟`,
        a: `هذا موضوع نقاش بين علماء الفقه الإسلامي. بعض المجالس الإفتائية (الأزهر، دار الإفتاء المصرية) أصدروا فتاوى بحرمة العملات الرقمية للمضاربة. آخرون (هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية AAOIFI) يفصّلون بين الاستخدامات. استشر مرجعاً دينياً موثوقاً قبل التداول.`,
      },
      {
        q: `أين أشتري ${name} في المنطقة العربية؟`,
        a: `لا يوجد بائع رسمي مرخص في معظم دول الخليج. المنصات الدولية المعروفة (Binance، Coinbase، Kraken، OKX، Bybit) قابلة للوصول من المنطقة. تحقق من الحالة القانونية في بلدك قبل الشراء — التداول مقيد في السعودية، مسموح في الإمارات (مع تنظيم)، مقيد في المغرب.`,
      },
      {
        q: `كم مرة يُحدّث سعر ${name}؟`,
        a: `السعر يُحدّث كل دقيقة تقريباً من CoinGecko API. للأسعار اللحظية (تيك بتيك)، استخدم Binance أو CoinMarketCap مباشرة. نحن نوفر صورة دقيقة بما يكفي للقرارات اليومية، ليس للتداول عالي التردد.`,
      },
    ],
    fr: [
      {
        q: `Quel est le prix du ${name} aujourd'hui ?`,
        a: prices
          ? `Le ${name} vaut actuellement ${prices.usd} USD, soit ${prices.sar} SAR / ${prices.aed} AED. Prix fourni par CoinGecko.`
          : `Le prix du ${name} est mis à jour dans l'encadré ci-dessus, à partir des données CoinGecko.`,
      },
      {
        q: `Comment convertir ${symbol} en riyals saoudiens ou en dirhams émiratis ?`,
        a: `Multipliez le prix ${symbol}/USD par le taux quotidien USD/SAR (~3,75) ou USD/AED (~3,67). Nous actualisons le taux de change chaque jour à partir des données ouvertes des banques centrales.`,
      },
      {
        q: `Le ${name} est-il licite (halal) en droit islamique ?`,
        a: `La question est débattue parmi les savants musulmans. Certaines instances (Al-Azhar, Dar Al-Ifta d'Égypte) ont émis des avis contre le trading spéculatif de cryptomonnaies. D'autres (AAOIFI — l'organisation de comptabilité et d'audit des institutions financières islamiques) distinguent selon l'usage. Consultez une autorité religieuse de confiance avant de trader.`,
      },
      {
        q: `Où acheter du ${name} dans la région MENA ?`,
        a: `Il n'existe pas de plateforme locale pleinement agréée dans la plupart des pays du Golfe. Les plateformes internationales (Binance, Coinbase, Kraken, OKX, Bybit) sont accessibles depuis la région. Vérifiez le statut légal dans votre pays avant d'acheter — restreint en Arabie saoudite, réglementé aux Émirats, restreint au Maroc.`,
      },
      {
        q: `À quelle fréquence le prix du ${name} est-il mis à jour ?`,
        a: `Le prix est mis à jour environ chaque minute via l'API CoinGecko. Pour des prix en temps réel (tick par tick), utilisez directement Binance ou CoinMarketCap. Nous fournissons un instantané suffisamment précis pour les décisions quotidiennes, pas pour le trading haute fréquence.`,
      },
    ],
    tr: [
      {
        q: `Bugün ${name} fiyatı ne kadar?`,
        a: prices
          ? `${name} şu an ${prices.usd} USD, yani ${prices.sar} SAR / ${prices.aed} AED. Fiyat kaynağı CoinGecko.`
          : `${name} fiyatı yukarıdaki kutuda CoinGecko verileriyle güncellenir.`,
      },
      {
        q: `${symbol} Suudi riyaline veya BAE dirhemine nasıl çevrilir?`,
        a: `${symbol}/USD fiyatını günlük USD/SAR (~3,75) veya USD/AED (~3,67) kuruyla çarpın. Döviz kurunu her gün açık merkez bankası verilerinden yeniliyoruz.`,
      },
      {
        q: `${name} İslam hukukuna göre helal mi?`,
        a: `Bu konu İslam âlimleri arasında tartışmalıdır. Bazı kurumlar (El-Ezher, Mısır Dar'ül-İfta) spekülatif kripto ticaretine karşı fetva verdi. Diğerleri (AAOIFI — İslami Finans Kuruluşları Muhasebe ve Denetim Kurumu) kullanım amacına göre ayrım yapar. İşlem yapmadan önce güvenilir bir dini otoriteye danışın.`,
      },
      {
        q: `MENA bölgesinde ${name} nereden alınır?`,
        a: `Körfez ülkelerinin çoğunda tam lisanslı yerel borsa yoktur. Uluslararası platformlara (Binance, Coinbase, Kraken, OKX, Bybit) bölgeden erişilebilir. Almadan önce ülkenizdeki yasal durumu doğrulayın — Suudi Arabistan'da kısıtlı, BAE'de düzenlenmiş, Fas'ta kısıtlı.`,
      },
      {
        q: `${name} fiyatı ne sıklıkla güncellenir?`,
        a: `Fiyat, CoinGecko API'sinden yaklaşık her dakika güncellenir. Gerçek zamanlı (tick bazlı) fiyatlar için doğrudan Binance veya CoinMarketCap kullanın. Günlük kararlar için yeterince doğru bir görüntü sunuyoruz, yüksek frekanslı işlem için değil.`,
      },
    ],
    ur: [
      {
        q: `آج ${name} کی قیمت کتنی ہے؟`,
        a: prices
          ? `${name} اس وقت ${prices.usd} ڈالر، یعنی ${prices.sar} سعودی ریال / ${prices.aed} اماراتی درہم ہے۔ قیمت کا ماخذ CoinGecko۔`
          : `${name} کی قیمت اوپر کے خانے میں CoinGecko کے ڈیٹا سے اپڈیٹ ہوتی ہے۔`,
      },
      {
        q: `${symbol} کو سعودی ریال یا اماراتی درہم میں کیسے بدلوں؟`,
        a: `${symbol}/USD قیمت کو یومیہ USD/SAR شرح (~3.75) یا USD/AED شرح (~3.67) سے ضرب دیں۔ ہم شرح تبادلہ روزانہ مرکزی بینکوں کے اوپن ڈیٹا سے اپڈیٹ کرتے ہیں۔`,
      },
      {
        q: `کیا ${name} اسلامی شریعت میں حلال ہے؟`,
        a: `یہ مسئلہ اسلامی علما کے درمیان زیرِ بحث ہے۔ کچھ ادارے (الازہر، دار الافتاء مصر) قیاس آرائی پر مبنی کرپٹو تجارت کے خلاف فتویٰ دے چکے ہیں۔ دیگر (AAOIFI — اسلامی مالیاتی اداروں کی اکاؤنٹنگ اور آڈیٹنگ تنظیم) استعمال کے لحاظ سے فرق کرتے ہیں۔ تجارت سے پہلے کسی معتبر دینی مرجع سے رجوع کریں۔`,
      },
      {
        q: `مشرق وسطیٰ میں ${name} کہاں سے خریدوں؟`,
        a: `بیشتر خلیجی ممالک میں مکمل لائسنس یافتہ مقامی ایکسچینج موجود نہیں۔ بین الاقوامی پلیٹ فارم (Binance، Coinbase، Kraken، OKX، Bybit) خطے سے قابلِ رسائی ہیں۔ خریدنے سے پہلے اپنے ملک میں قانونی حیثیت جانچیں — سعودی عرب میں محدود، امارات میں ریگولیٹڈ، مراکش میں محدود۔`,
      },
      {
        q: `${name} کی قیمت کتنی بار اپڈیٹ ہوتی ہے؟`,
        a: `قیمت CoinGecko API سے تقریباً ہر منٹ اپڈیٹ ہوتی ہے۔ ریئل ٹائم (ٹِک بہ ٹِک) قیمتوں کے لیے براہِ راست Binance یا CoinMarketCap استعمال کریں۔ ہم روزمرہ فیصلوں کے لیے کافی درست تصویر دیتے ہیں، ہائی فریکوئنسی ٹریڈنگ کے لیے نہیں۔`,
      },
    ],
    hi: [
      {
        q: `आज ${name} का भाव क्या है?`,
        a: prices
          ? `${name} अभी ${prices.usd} USD, यानी ${prices.sar} SAR / ${prices.aed} AED है। भाव का स्रोत CoinGecko।`
          : `${name} का भाव ऊपर के बॉक्स में CoinGecko डेटा से अपडेट होता है।`,
      },
      {
        q: `${symbol} को सऊदी रियाल या यूएई दिरहम में कैसे बदलें?`,
        a: `${symbol}/USD भाव को दैनिक USD/SAR दर (~3.75) या USD/AED दर (~3.67) से गुणा करें। हम विनिमय दर रोज़ केंद्रीय बैंकों के ओपन डेटा से अपडेट करते हैं।`,
      },
      {
        q: `क्या ${name} इस्लामी क़ानून में जायज़ (हलाल) है?`,
        a: `यह इस्लामी विद्वानों के बीच बहस का विषय है। कुछ संस्थाओं (अल-अज़हर, मिस्र के दार अल-इफ़्ता) ने सट्टा क्रिप्टो ट्रेडिंग के विरुद्ध फ़तवे दिए हैं। अन्य (AAOIFI — इस्लामी वित्तीय संस्थानों का लेखा एवं लेखा-परीक्षा संगठन) उपयोग के अनुसार भेद करते हैं। ट्रेड से पहले किसी विश्वसनीय धार्मिक प्राधिकारी से सलाह लें।`,
      },
      {
        q: `MENA क्षेत्र में ${name} कहाँ से ख़रीदें?`,
        a: `ज़्यादातर खाड़ी देशों में पूरी तरह लाइसेंस प्राप्त स्थानीय एक्सचेंज नहीं है। अंतरराष्ट्रीय प्लेटफ़ॉर्म (Binance, Coinbase, Kraken, OKX, Bybit) क्षेत्र से सुलभ हैं। ख़रीदने से पहले अपने देश में क़ानूनी स्थिति जाँचें — सऊदी अरब में प्रतिबंधित, यूएई में विनियमित, मोरक्को में प्रतिबंधित।`,
      },
      {
        q: `${name} का भाव कितनी बार अपडेट होता है?`,
        a: `भाव CoinGecko API से लगभग हर मिनट अपडेट होता है। रियल-टाइम (टिक-बाय-टिक) भाव के लिए सीधे Binance या CoinMarketCap इस्तेमाल करें। हम रोज़मर्रा के फ़ैसलों के लिए पर्याप्त सटीक तस्वीर देते हैं, हाई-फ़्रीक्वेंसी ट्रेडिंग के लिए नहीं।`,
      },
    ],
  });
}
