import { pickList } from "@/lib/i18n-text";
import type { FaqQA } from "@/lib/schemas";

/**
 * FAQ copy for /best-gold-price/[country] — feeds the FAQPage JSON-LD.
 * `name` is the localized country name, `currency` the ISO code.
 * `en`/`ar` are SEO-tuned; keep byte-identical.
 */
export function bestPriceFaqs(locale: string, name: string, currency: string): FaqQA[] {
  return pickList<FaqQA>(locale, {
    en: [
      {
        q: `Where do I find the best gold price in ${name}?`,
        a: `The best gold price depends on the retailer's margin over the spot price. The table above shows the spot price in ${currency} — this is the floor. Shop margins vary: large supermarkets 2-5%, traditional gold souks 5-10%, verified e-commerce 1-3%. Check three shops before buying.`,
      },
      {
        q: `Why do gold prices differ between shops in ${name}?`,
        a: `Three reasons: (1) making charges (5-30 local currency per gram by design), (2) retailer margin (3-10%), (3) operational costs (rent, staff). The spot price is the same across all shops. The difference is in the additions.`,
      },
      {
        q: `Is buying online cheaper in ${name}?`,
        a: `Usually yes by 2-7% due to lower overhead. But verify: (1) seller reputation, (2) return policy, (3) gold certification (LBMA, PAMP, Valcambi), (4) shipping/insurance fees, (5) any import duty.`,
      },
      {
        q: `How do I know if a quoted price is the best?`,
        a: `Compare against the spot price in the table above. Expected price = spot + 2-8% (for investment bullion) or + 15-40% (for jewellery with making charge). Anything higher is worth negotiating. Anything significantly lower may be counterfeit.`,
      },
      {
        q: `When is the best time to buy gold in ${name}?`,
        a: `Prices move daily with the global market. Optimal: (1) early in the week (less activity = lower margins), (2) pre-dawn London time (spot price at lowest activity), (3) outside wedding season (lower jewellery demand). Avoid: (1) during geopolitical crises (gold rises), (2) Indian/Chinese wedding season.`,
      },
    ],
    ar: [
      {
        q: `أين أجد أفضل سعر للذهب في ${name}؟`,
        a: `أفضل سعر للذهب يعتمد على نسبة هامش بائع التجزئة فوق السعر الفوري. الجدول أعلاه يعرض السعر الفوري بـ${currency} — هذا هو الحد الأدنى. تختلف هوامش المحلات: السوبر ماركت الكبرى عادة 2-5%، أسواق الذهب التقليدية 5-10%، التجارة الإلكترونية الموثقة 1-3%. تحقق من ثلاثة محلات قبل الشراء.`,
      },
      {
        q: `لماذا تختلف أسعار الذهب بين المحلات في ${name}؟`,
        a: `ثلاثة أسباب: (1) المصنعية (5-30 وحدة عملة محلية للجرام حسب التصميم)، (2) هامش البائع (3-10%)، (3) تكلفة العمليات (الإيجار، الموظفين). السعر الفوري نفسه عبر جميع المحلات. الفرق هو في الإضافات.`,
      },
      {
        q: `هل الشراء عبر الإنترنت أرخص في ${name}؟`,
        a: `عادة نعم بـ2-7% بسبب انخفاض التكاليف العامة. لكن تحقق من: (1) موثوقية البائع، (2) سياسة الإرجاع، (3) شهادة الذهب (LBMA، PAMP، Valcambi)، (4) رسوم الشحن والتأمين، (5) ضريبة الاستيراد إن وجدت.`,
      },
      {
        q: `كيف أتأكد أن السعر المعروض هو الأفضل؟`,
        a: `قارن مع السعر الفوري في الجدول أعلاه. السعر المُتوقع = السعر الفوري + 2-8% (للسبائك الاستثمارية) أو + 15-40% (للمجوهرات بالمصنعية). أي شيء أعلى يستحق التفاوض. أي شيء أقل بكثير قد يكون مزيفاً.`,
      },
      {
        q: `متى أفضل وقت لشراء الذهب في ${name}؟`,
        a: `السعر يتحرك يومياً مع السوق العالمي. أوقات مثالية: (1) أوائل الأسبوع (نشاط أقل = هوامش أقل)، (2) قبل الفجر بتوقيت لندن (السعر الفوري في أدنى نشاط)، (3) خارج موسم الزواج (انخفاض الطلب على المجوهرات). تجنب: (1) خلال الأزمات الجيوسياسية (الذهب يرتفع)، (2) موسم الزفاف في الهند والصين.`,
      },
    ],
    fr: [
      {
        q: `${name} : où trouver le meilleur prix de l'or ?`,
        a: `Le meilleur prix de l'or dépend de la marge du détaillant au-dessus du cours spot. Le tableau ci-dessus affiche le cours spot en ${currency} — c'est le plancher. Les marges varient : grandes enseignes 2 à 5 %, souks de l'or traditionnels 5 à 10 %, e-commerce vérifié 1 à 3 %. Comparez trois boutiques avant d'acheter.`,
      },
      {
        q: `${name} : pourquoi les prix de l'or varient-ils d'une boutique à l'autre ?`,
        a: `Trois raisons : (1) la façon (5 à 30 unités de monnaie locale par gramme selon le design), (2) la marge du détaillant (3 à 10 %), (3) les coûts d'exploitation (loyer, personnel). Le cours spot est identique partout. La différence tient aux suppléments.`,
      },
      {
        q: `${name} : acheter en ligne est-il moins cher ?`,
        a: `Généralement oui, de 2 à 7 %, grâce à des frais généraux plus faibles. Mais vérifiez : (1) la réputation du vendeur, (2) la politique de retour, (3) la certification de l'or (LBMA, PAMP, Valcambi), (4) les frais de livraison et d'assurance, (5) les éventuels droits d'importation.`,
      },
      {
        q: `Comment savoir si le prix proposé est le meilleur ?`,
        a: `Comparez-le au cours spot du tableau ci-dessus. Prix attendu = spot + 2 à 8 % (lingots d'investissement) ou + 15 à 40 % (bijoux avec façon). Au-delà, négociez. Nettement en dessous, méfiez-vous d'une contrefaçon.`,
      },
      {
        q: `${name} : quel est le meilleur moment pour acheter de l'or ?`,
        a: `Les prix bougent chaque jour avec le marché mondial. Moments favorables : (1) début de semaine (moins d'activité = marges plus faibles), (2) avant l'aube heure de Londres (cours spot au plus calme), (3) hors saison des mariages (moindre demande de bijoux). À éviter : (1) les crises géopolitiques (l'or monte), (2) la saison des mariages en Inde et en Chine.`,
      },
    ],
    tr: [
      {
        q: `${name}: en iyi altın fiyatını nerede bulurum?`,
        a: `En iyi altın fiyatı, perakendecinin spot fiyat üzerindeki marjına bağlıdır. Yukarıdaki tablo spot fiyatı ${currency} cinsinden gösterir — bu taban fiyattır. Marjlar değişir: büyük zincirler %2-5, geleneksel altın çarşıları %5-10, doğrulanmış e-ticaret %1-3. Almadan önce üç kuyumcuyu karşılaştırın.`,
      },
      {
        q: `${name}: altın fiyatları kuyumcular arasında neden farklı?`,
        a: `Üç neden: (1) işçilik (tasarıma göre gram başına 5-30 yerel para birimi), (2) perakende marjı (%3-10), (3) işletme maliyetleri (kira, personel). Spot fiyat tüm kuyumcularda aynıdır. Fark eklemelerdedir.`,
      },
      {
        q: `${name}: internetten almak daha mı ucuz?`,
        a: `Genellikle evet, düşük genel giderler sayesinde %2-7 daha ucuz. Ancak şunları doğrulayın: (1) satıcının itibarı, (2) iade politikası, (3) altın sertifikası (LBMA, PAMP, Valcambi), (4) kargo/sigorta ücretleri, (5) varsa ithalat vergisi.`,
      },
      {
        q: `Teklif edilen fiyatın en iyisi olduğunu nasıl anlarım?`,
        a: `Yukarıdaki tablodaki spot fiyatla karşılaştırın. Beklenen fiyat = spot + %2-8 (yatırım külçesi) veya + %15-40 (işçilikli takı). Daha yükseği pazarlığa değer. Belirgin şekilde düşüğü sahte olabilir.`,
      },
      {
        q: `${name}: altın almak için en iyi zaman ne zaman?`,
        a: `Fiyatlar küresel piyasayla her gün hareket eder. En uygun zamanlar: (1) haftanın başı (az hareket = düşük marj), (2) Londra saatiyle şafaktan önce (spot fiyatın en sakin olduğu an), (3) düğün sezonu dışı (düşük takı talebi). Kaçının: (1) jeopolitik krizler (altın yükselir), (2) Hindistan/Çin düğün sezonu.`,
      },
    ],
    ur: [
      {
        q: `${name} میں سونے کی بہترین قیمت کہاں ملے گی؟`,
        a: `سونے کی بہترین قیمت اسپاٹ قیمت پر دکاندار کے منافع پر منحصر ہے۔ اوپر کی جدول ${currency} میں اسپاٹ قیمت دکھاتی ہے — یہی بنیادی حد ہے۔ منافع مختلف ہوتا ہے: بڑے اسٹور 2 تا 5%، روایتی صرافہ بازار 5 تا 10%، تصدیق شدہ آن لائن اسٹور 1 تا 3%۔ خریدنے سے پہلے تین دکانوں سے پوچھیں۔`,
      },
      {
        q: `${name} میں سونے کی قیمت دکانوں کے درمیان مختلف کیوں ہوتی ہے؟`,
        a: `تین وجوہات: (1) بنوائی (ڈیزائن کے مطابق 5 تا 30 مقامی کرنسی فی گرام)، (2) دکاندار کا منافع (3 تا 10%)، (3) آپریٹنگ اخراجات (کرایہ، عملہ)۔ اسپاٹ قیمت ہر دکان پر ایک جیسی ہے۔ فرق اضافوں میں ہے۔`,
      },
      {
        q: `کیا ${name} میں آن لائن خریدنا سستا ہے؟`,
        a: `عموماً ہاں، کم اخراجات کی وجہ سے 2 تا 7% سستا۔ مگر تصدیق کریں: (1) بیچنے والے کی ساکھ، (2) واپسی کی پالیسی، (3) سونے کا سرٹیفکیٹ (LBMA، PAMP، Valcambi)، (4) شپنگ اور انشورنس فیس، (5) درآمدی ڈیوٹی اگر ہو۔`,
      },
      {
        q: `کیسے معلوم ہو کہ بتائی گئی قیمت بہترین ہے؟`,
        a: `اوپر کی جدول میں اسپاٹ قیمت سے موازنہ کریں۔ متوقع قیمت = اسپاٹ + 2 تا 8% (سرمایہ کاری کی سلاخوں کے لیے) یا + 15 تا 40% (بنوائی والے زیورات کے لیے)۔ اس سے زیادہ پر بھاؤ تاؤ کریں۔ بہت کم قیمت جعلی ہو سکتی ہے۔`,
      },
      {
        q: `${name} میں سونا خریدنے کا بہترین وقت کون سا ہے؟`,
        a: `قیمتیں عالمی منڈی کے ساتھ روزانہ بدلتی ہیں۔ بہترین وقت: (1) ہفتے کا آغاز (کم سرگرمی = کم منافع)، (2) لندن وقت کے مطابق فجر سے پہلے (اسپاٹ قیمت سب سے پرسکون)، (3) شادیوں کے سیزن سے باہر (زیورات کی کم طلب)۔ گریز کریں: (1) جغرافیائی سیاسی بحران (سونا چڑھتا ہے)، (2) بھارت اور چین کا شادیوں کا سیزن۔`,
      },
    ],
    hi: [
      {
        q: `${name} में सोने का सबसे अच्छा भाव कहाँ मिलेगा?`,
        a: `सबसे अच्छा भाव स्पॉट भाव पर रिटेलर के मार्जिन पर निर्भर करता है। ऊपर की तालिका ${currency} में स्पॉट भाव दिखाती है — यही न्यूनतम है। दुकानों का मार्जिन अलग-अलग है: बड़े स्टोर 2-5%, पारंपरिक सर्राफ़ा बाज़ार 5-10%, सत्यापित ई-कॉमर्स 1-3%। ख़रीदने से पहले तीन दुकानों से पूछें।`,
      },
      {
        q: `${name} में सोने का भाव दुकानों के बीच अलग क्यों होता है?`,
        a: `तीन कारण: (1) मेकिंग चार्ज (डिज़ाइन के अनुसार 5-30 स्थानीय मुद्रा प्रति ग्राम), (2) रिटेलर मार्जिन (3-10%), (3) संचालन लागत (किराया, स्टाफ़)। स्पॉट भाव हर दुकान पर एक जैसा है। अंतर जोड़े गए शुल्कों में है।`,
      },
      {
        q: `क्या ${name} में ऑनलाइन ख़रीदना सस्ता है?`,
        a: `आमतौर पर हाँ, कम ओवरहेड के कारण 2-7% सस्ता। लेकिन जाँचें: (1) विक्रेता की साख, (2) रिटर्न पॉलिसी, (3) सोने का प्रमाणपत्र (LBMA, PAMP, Valcambi), (4) शिपिंग और बीमा शुल्क, (5) आयात शुल्क, यदि कोई हो।`,
      },
      {
        q: `कैसे पता चले कि बताया गया भाव सबसे अच्छा है?`,
        a: `ऊपर की तालिका के स्पॉट भाव से तुलना करें। अपेक्षित भाव = स्पॉट + 2-8% (निवेश बुलियन) या + 15-40% (मेकिंग चार्ज वाली ज्वेलरी)। इससे ज़्यादा हो तो मोल-भाव करें। बहुत कम हो तो नक़ली हो सकता है।`,
      },
      {
        q: `${name} में सोना ख़रीदने का सबसे अच्छा समय कौन-सा है?`,
        a: `भाव वैश्विक बाज़ार के साथ रोज़ बदलते हैं। अच्छा समय: (1) हफ़्ते की शुरुआत (कम गतिविधि = कम मार्जिन), (2) लंदन समय भोर से पहले (स्पॉट भाव सबसे शांत), (3) शादी के सीज़न के बाहर (ज्वेलरी की कम मांग)। बचें: (1) भू-राजनीतिक संकट (सोना चढ़ता है), (2) भारत और चीन का शादी सीज़न।`,
      },
    ],
  });
}
