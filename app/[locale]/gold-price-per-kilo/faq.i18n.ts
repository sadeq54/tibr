import { pickList } from "@/lib/i18n-text";
import type { FaqQA } from "@/lib/schemas";

/** FAQ copy for /gold-price-per-kilo — feeds the FAQPage JSON-LD. `en`/`ar` are SEO-tuned; keep byte-identical. */
export function perKiloFaqs(locale: string): FaqQA[] {
  return pickList<FaqQA>(locale, {
    en: [
      {
        q: "How much is one kilo of gold today?",
        a: "Spot kilo gold price = (spot ounce price × 32.1507). The table above updates every second in 40+ currencies. For pure 24K gold, one kilo contains 32.15 troy ounces and 1000 grams at 99.9% purity.",
      },
      {
        q: "How many ounces in a kilo of gold?",
        a: "1 kilogram = 32.1507 troy ounces. This is the standard conversion ratio used across all global exchanges. To compute: ounce price × 32.1507 = kilogram price.",
      },
      {
        q: "Are 1-kg gold bars a good investment?",
        a: "Yes. 1-kilogram (KILO) bars from refineries like PAMP, Valcambi and Argor-Heraeus are the gold standard for serious investment. Typically 99.99% pure (Four Nines), LBMA Good Delivery certified. They trade at a lower premium than smaller bars — usually 1-3% over spot.",
      },
      {
        q: "How much is 1 kg of gold in SAR and AED?",
        a: "Use the currency converter in the calculator above. Approximate example: at 4500 USD/oz, 1 kg ≈ 144,678 USD ≈ 542,541 SAR ≈ 531,387 AED. Prices update in real time.",
      },
      {
        q: "Why does kilo gold price differ between UAE and Saudi Arabia?",
        a: "The global USD price is the same. Differences come from: (1) currency exchange rate, (2) VAT (Saudi 15% on non-investment gold, UAE 5%, zero for ≥99.5% bullion), (3) local dealer margin.",
      },
    ],
    ar: [
      {
        q: "كم سعر كيلو الذهب اليوم؟",
        a: "سعر كيلو الذهب الفوري = (السعر الفوري للأونصة × 32.1507). الجدول أعلاه يحدّث السعر كل ثانية بـ40+ عملة. للذهب الخالص (24K)، كيلو واحد يحتوي على 32.15 أونصة ترويسية و1000 جرام بنسبة نقاء 99.9%.",
      },
      {
        q: "كم أونصة في كيلو الذهب؟",
        a: "1 كيلوغرام = 32.1507 أونصة ترويسية. هذه نسبة التحويل المعيارية المستخدمة في جميع البورصات العالمية. للحساب: السعر بالأونصة × 32.1507 = السعر بالكيلوغرام.",
      },
      {
        q: "هل سبائك الذهب من كيلو واحد استثمار جيد؟",
        a: "نعم. سبائك 1 كيلوغرام (KILO bars) من معامل مثل PAMP وValcambi وArgor-Heraeus هي المعيار الذهبي للاستثمار الكبير. عادة بنقاء 99.99% (Four Nines)، معتمدة من LBMA Good Delivery. تباع بهامش (premium) أقل من السبائك الأصغر — عادة 1-3% فوق السعر الفوري.",
      },
      {
        q: "كم سعر كيلو الذهب بالريال السعودي والدرهم الإماراتي؟",
        a: "استخدم محوّل العملات في الحاسبة أعلاه. مثال تقديري: إذا كانت الأونصة 4500$، فكيلو الذهب ≈ 144,678$ ≈ 542,541 ريال سعودي ≈ 531,387 درهم إماراتي. الأسعار تُحدّث لحظياً.",
      },
      {
        q: "لماذا يختلف سعر كيلو الذهب في الإمارات عن السعودية؟",
        a: "السعر العالمي بالدولار هو نفسه. الفروقات تأتي من: (1) سعر الصرف بين العملتين، (2) ضريبة القيمة المضافة (السعودية 15% على الذهب غير الاستثماري، الإمارات 5%، صفر لذهب 99.5%+)، (3) هامش الموزع المحلي.",
      },
    ],
    fr: [
      {
        q: "Combien vaut un kilo d'or aujourd'hui ?",
        a: "Prix spot du kilo d'or = (prix spot de l'once × 32,1507). Le tableau ci-dessus se met à jour chaque seconde dans plus de 40 devises. Pour l'or pur 24 carats, un kilo contient 32,15 onces troy, soit 1 000 grammes à 99,9 % de pureté.",
      },
      {
        q: "Combien d'onces dans un kilo d'or ?",
        a: "1 kilogramme = 32,1507 onces troy. C'est le taux de conversion standard utilisé sur toutes les bourses mondiales. Calcul : prix de l'once × 32,1507 = prix du kilo.",
      },
      {
        q: "Les lingots d'or de 1 kg sont-ils un bon investissement ?",
        a: "Oui. Les lingots de 1 kilogramme (KILO bars) d'affineurs comme PAMP, Valcambi et Argor-Heraeus sont la référence pour l'investissement d'envergure. Généralement d'une pureté de 99,99 % (Four Nines), certifiés LBMA Good Delivery. Ils se négocient avec une prime inférieure à celle des petits lingots — en général 1 à 3 % au-dessus du spot.",
      },
      {
        q: "Combien vaut 1 kg d'or en SAR et en AED ?",
        a: "Utilisez le convertisseur de devises du calculateur ci-dessus. Exemple approximatif : à 4 500 USD/oz, 1 kg ≈ 144 678 USD ≈ 542 541 SAR ≈ 531 387 AED. Les prix sont mis à jour en temps réel.",
      },
      {
        q: "Pourquoi le prix du kilo d'or diffère-t-il entre les Émirats et l'Arabie saoudite ?",
        a: "Le prix mondial en USD est le même. Les écarts viennent : (1) du taux de change, (2) de la TVA (Arabie saoudite 15 % sur l'or non-investissement, Émirats 5 %, zéro pour les lingots ≥ 99,5 %), (3) de la marge du distributeur local.",
      },
    ],
    tr: [
      {
        q: "Bugün bir kilo altın ne kadar?",
        a: "Spot kilo altın fiyatı = (spot ons fiyatı × 32,1507). Yukarıdaki tablo 40'tan fazla para biriminde her saniye güncellenir. Saf 24 ayar altında bir kilo, %99,9 saflıkta 32,15 ons troy ve 1000 gram içerir.",
      },
      {
        q: "Bir kilo altında kaç ons var?",
        a: "1 kilogram = 32,1507 ons troy. Bu, tüm küresel borsalarda kullanılan standart dönüşüm oranıdır. Hesaplama: ons fiyatı × 32,1507 = kilogram fiyatı.",
      },
      {
        q: "1 kg altın külçe iyi bir yatırım mı?",
        a: "Evet. PAMP, Valcambi ve Argor-Heraeus gibi rafinerilerin 1 kilogramlık (KILO) külçeleri büyük yatırımın altın standardıdır. Genellikle %99,99 saflıkta (Four Nines), LBMA Good Delivery sertifikalıdır. Küçük külçelere göre daha düşük primle işlem görürler — genellikle spotun %1-3 üzerinde.",
      },
      {
        q: "1 kg altın SAR ve AED cinsinden ne kadar?",
        a: "Yukarıdaki hesaplayıcıdaki döviz çeviriciyi kullanın. Yaklaşık örnek: 4.500 USD/ons'ta 1 kg ≈ 144.678 USD ≈ 542.541 SAR ≈ 531.387 AED. Fiyatlar gerçek zamanlı güncellenir.",
      },
      {
        q: "Kilo altın fiyatı BAE ile Suudi Arabistan arasında neden farklı?",
        a: "Küresel USD fiyatı aynıdır. Farklar şunlardan kaynaklanır: (1) döviz kuru, (2) KDV (Suudi Arabistan'da yatırım dışı altında %15, BAE'de %5, ≥%99,5 külçede sıfır), (3) yerel bayi marjı.",
      },
    ],
    ur: [
      {
        q: "آج ایک کلو سونے کی قیمت کتنی ہے؟",
        a: "اسپاٹ کلو سونے کی قیمت = (اسپاٹ اونس قیمت × 32.1507)۔ اوپر کی جدول 40 سے زائد کرنسیوں میں ہر سیکنڈ اپڈیٹ ہوتی ہے۔ خالص 24 قیراط سونے کے ایک کلو میں 32.15 ٹرائے اونس اور 1000 گرام 99.9% خالص پن کے ساتھ ہوتے ہیں۔",
      },
      {
        q: "ایک کلو سونے میں کتنے اونس ہوتے ہیں؟",
        a: "1 کلوگرام = 32.1507 ٹرائے اونس۔ یہ معیاری تبدیلی کا تناسب ہے جو تمام عالمی ایکسچینجز میں استعمال ہوتا ہے۔ حساب: اونس کی قیمت × 32.1507 = کلوگرام کی قیمت۔",
      },
      {
        q: "کیا 1 کلو سونے کی سلاخیں اچھی سرمایہ کاری ہیں؟",
        a: "جی ہاں۔ PAMP، Valcambi اور Argor-Heraeus جیسی ریفائنریوں کی 1 کلوگرام (KILO) سلاخیں بڑی سرمایہ کاری کا معیار ہیں۔ عموماً 99.99% خالص (Four Nines)، LBMA Good Delivery تصدیق شدہ۔ چھوٹی سلاخوں کی نسبت کم پریمیم پر بکتی ہیں — عموماً اسپاٹ سے 1 تا 3% اوپر۔",
      },
      {
        q: "1 کلو سونا سعودی ریال اور اماراتی درہم میں کتنے کا ہے؟",
        a: "اوپر کیلکولیٹر میں کرنسی کنورٹر استعمال کریں۔ تخمینی مثال: 4500 ڈالر فی اونس پر 1 کلو ≈ 144,678 ڈالر ≈ 542,541 سعودی ریال ≈ 531,387 اماراتی درہم۔ قیمتیں ریئل ٹائم اپڈیٹ ہوتی ہیں۔",
      },
      {
        q: "کلو سونے کی قیمت امارات اور سعودی عرب میں مختلف کیوں ہے؟",
        a: "عالمی ڈالر قیمت ایک ہی ہے۔ فرق ان وجوہات سے آتا ہے: (1) دونوں کرنسیوں کی شرح تبادلہ، (2) ویلیو ایڈڈ ٹیکس (سعودی عرب میں غیر سرمایہ کاری سونے پر 15%، امارات 5%، 99.5%+ سلاخوں پر صفر)، (3) مقامی ڈیلر کا منافع۔",
      },
    ],
    hi: [
      {
        q: "आज एक किलो सोने का भाव कितना है?",
        a: "स्पॉट किलो सोने का भाव = (स्पॉट औंस भाव × 32.1507)। ऊपर की तालिका 40+ मुद्राओं में हर सेकंड अपडेट होती है। शुद्ध 24 कैरेट सोने के एक किलो में 32.15 ट्रॉय औंस और 1000 ग्राम 99.9% शुद्धता के साथ होते हैं।",
      },
      {
        q: "एक किलो सोने में कितने औंस होते हैं?",
        a: "1 किलोग्राम = 32.1507 ट्रॉय औंस। यह मानक रूपांतरण अनुपात है जो सभी वैश्विक एक्सचेंजों में इस्तेमाल होता है। गणना: औंस भाव × 32.1507 = किलोग्राम भाव।",
      },
      {
        q: "क्या 1 किलो सोने की छड़ें अच्छा निवेश हैं?",
        a: "हाँ। PAMP, Valcambi और Argor-Heraeus जैसी रिफ़ाइनरियों की 1 किलोग्राम (KILO) छड़ें बड़े निवेश का स्वर्ण मानक हैं। आमतौर पर 99.99% शुद्ध (Four Nines), LBMA Good Delivery प्रमाणित। ये छोटी छड़ों की तुलना में कम प्रीमियम पर बिकती हैं — आमतौर पर स्पॉट से 1-3% ऊपर।",
      },
      {
        q: "1 किलो सोना SAR और AED में कितने का है?",
        a: "ऊपर कैलकुलेटर में करेंसी कन्वर्टर इस्तेमाल करें। अनुमानित उदाहरण: 4500 USD/औंस पर 1 किलो ≈ 144,678 USD ≈ 542,541 SAR ≈ 531,387 AED। भाव रियल-टाइम अपडेट होते हैं।",
      },
      {
        q: "किलो सोने का भाव यूएई और सऊदी अरब में अलग क्यों है?",
        a: "वैश्विक USD भाव एक ही है। अंतर इनसे आता है: (1) दोनों मुद्राओं की विनिमय दर, (2) वैट (सऊदी अरब में गैर-निवेश सोने पर 15%, यूएई 5%, ≥99.5% बुलियन पर शून्य), (3) स्थानीय डीलर का मार्जिन।",
      },
    ],
  });
}
