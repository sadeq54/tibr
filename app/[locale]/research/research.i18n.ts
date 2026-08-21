import { pick, type LocaleText } from "@/lib/i18n-text";

type Topic = { key: string; en: string; ar: string; blurbEn: string; blurbAr: string };

/**
 * fr/tr/ur/hi headings for `RESEARCH_TOPICS` (`lib/research.ts` only ships
 * ar/en). Keyed by topic key; unknown keys fall back to English.
 */
const TOPIC_TEXT: Record<string, { title: Omit<LocaleText, "en" | "ar">; blurb: Omit<LocaleText, "en" | "ar"> }> = {
  hedge: {
    title: { fr: "L'or comme couverture contre l'inflation", tr: "Enflasyona karşı korunma aracı olarak altın", ur: "افراطِ زر کے خلاف تحفظ کے طور پر سونا", hi: "महंगाई से बचाव के रूप में सोना" },
    blurb: {
      fr: "L'or protège-t-il réellement le pouvoir d'achat ? Ce que disent les données sur plusieurs décennies et marchés.",
      tr: "Altın satın alma gücünü gerçekten koruyor mu? On yıllar ve piyasalar boyunca kanıtlar ne söylüyor.",
      ur: "کیا سونا واقعی قوتِ خرید کی حفاظت کرتا ہے؟ دہائیوں اور منڈیوں کے شواہد کیا کہتے ہیں۔",
      hi: "क्या सोना सचमुच क्रय शक्ति की रक्षा करता है? दशकों और बाज़ारों के साक्ष्य क्या कहते हैं।",
    },
  },
  "safe-haven": {
    title: { fr: "L'or comme valeur refuge", tr: "Güvenli liman olarak altın", ur: "محفوظ پناہ گاہ کے طور پر سونا", hi: "सुरक्षित ठिकाने के रूप में सोना" },
    blurb: {
      fr: "Comment l'or se comporte en période de crise face aux actions, aux obligations et au dollar.",
      tr: "Altının krizlerde hisse senetleri, tahviller ve dolara kıyasla nasıl davrandığı.",
      ur: "بحرانوں میں سونا اسٹاکس، بانڈز اور ڈالر کے مقابلے میں کیسا رویہ اختیار کرتا ہے۔",
      hi: "संकट में सोना शेयरों, बॉन्ड और डॉलर की तुलना में कैसा व्यवहार करता है।",
    },
  },
  drivers: {
    title: { fr: "Ce qui fait bouger le prix de l'or", tr: "Altın fiyatını ne belirliyor", ur: "سونے کی قیمت کو کیا چلاتا ہے", hi: "सोने के भाव को क्या चलाता है" },
    blurb: {
      fr: "Taux réels, dollar, demande des banques centrales : les forces que la recherche relie aux mouvements de l'or.",
      tr: "Reel faizler, dolar, merkez bankası talebi: araştırmaların altın hareketleriyle ilişkilendirdiği güçler.",
      ur: "حقیقی شرحِ سود، ڈالر، مرکزی بینکوں کی طلب: وہ قوتیں جنہیں تحقیق سونے کی حرکت سے جوڑتی ہے۔",
      hi: "वास्तविक ब्याज दरें, डॉलर, केंद्रीय बैंकों की मांग: वे ताक़तें जिन्हें शोध सोने की चाल से जोड़ता है।",
    },
  },
  portfolio: {
    title: { fr: "L'or dans un portefeuille", tr: "Portföyde altın", ur: "پورٹ فولیو میں سونا", hi: "पोर्टफ़ोलियो में सोना" },
    blurb: {
      fr: "Allocations optimales et bénéfices de diversification de l'or aux côtés d'autres actifs.",
      tr: "Diğer varlıkların yanında altın tutmanın optimal dağılımı ve çeşitlendirme faydaları.",
      ur: "دیگر اثاثوں کے ساتھ سونا رکھنے کی بہترین تقسیم اور تنوع کے فوائد۔",
      hi: "अन्य परिसंपत्तियों के साथ सोना रखने का इष्टतम आवंटन और विविधीकरण लाभ।",
    },
  },
};

export function topicTitle(locale: string, t: Topic): string {
  return pick(locale, { en: t.en, ar: t.ar, ...TOPIC_TEXT[t.key]?.title });
}

export function topicBlurb(locale: string, t: Topic): string {
  return pick(locale, { en: t.blurbEn, ar: t.blurbAr, ...TOPIC_TEXT[t.key]?.blurb });
}

/** Every fixed string on /research, resolved once per request. */
export function researchText(locale: string) {
  return {
    title: pick(locale, {
      en: "Gold Market Research: Peer-Reviewed Studies on Hedging & Safe Havens",
      ar: "أبحاث سوق الذهب: دراسات علمية محكّمة عن التحوط والملاذ الآمن",
      fr: "Recherche sur le marché de l'or : études évaluées par les pairs sur la couverture et les valeurs refuges",
      tr: "Altın piyasası araştırmaları: riskten korunma ve güvenli liman üzerine hakemli çalışmalar",
      ur: "سونے کی مارکیٹ پر تحقیق: ہیجنگ اور محفوظ پناہ گاہ پر ہم مرتبہ جائزہ شدہ مطالعات",
      hi: "सोना बाज़ार अनुसंधान: हेजिंग और सुरक्षित ठिकाने पर समकक्ष-समीक्षित अध्ययन",
    }),
    description: pick(locale, {
      en: "Daily-refreshed digest of the most-cited academic research on gold: inflation hedging, safe-haven behaviour, price drivers and portfolio allocation. Sourced from arXiv, OpenAlex, Crossref and Semantic Scholar.",
      ar: "ملخصات محدثة يوميًا لأكثر الأبحاث الأكاديمية استشهادًا عن الذهب: التحوط من التضخم، الملاذ الآمن، محددات السعر، وتنويع المحافظ. المصادر: arXiv وOpenAlex وCrossref وSemantic Scholar.",
      fr: "Synthèse quotidienne des recherches universitaires les plus citées sur l'or : couverture contre l'inflation, comportement de valeur refuge, déterminants du prix et allocation de portefeuille. Sources : arXiv, OpenAlex, Crossref et Semantic Scholar.",
      tr: "Altın üzerine en çok atıf alan akademik araştırmaların günlük güncellenen özeti: enflasyona karşı korunma, güvenli liman davranışı, fiyat belirleyicileri ve portföy dağılımı. Kaynaklar: arXiv, OpenAlex, Crossref ve Semantic Scholar.",
      ur: "سونے پر سب سے زیادہ حوالہ شدہ تعلیمی تحقیق کا روزانہ تازہ خلاصہ: افراطِ زر سے بچاؤ، محفوظ پناہ گاہ کا رویہ، قیمت کے محرکات اور پورٹ فولیو تقسیم۔ ماخذ: arXiv، OpenAlex، Crossref اور Semantic Scholar۔",
      hi: "सोने पर सबसे ज़्यादा उद्धृत अकादमिक शोध का रोज़ अपडेट होने वाला सार: महंगाई से बचाव, सुरक्षित ठिकाने का व्यवहार, भाव के कारक और पोर्टफ़ोलियो आवंटन। स्रोत: arXiv, OpenAlex, Crossref और Semantic Scholar।",
    }),
    cited: pick(locale, { en: "cited", ar: "استشهاد", fr: "citations", tr: "atıf", ur: "حوالے", hi: "उद्धरण" }),
    ldName: pick(locale, { en: "Gold Market Research", ar: "أبحاث سوق الذهب", fr: "Recherche sur le marché de l'or", tr: "Altın piyasası araştırmaları", ur: "سونے کی مارکیٹ پر تحقیق", hi: "सोना बाज़ार अनुसंधान" }),
    ldDescription: pick(locale, {
      en: "Daily-refreshed digest of the most-cited peer-reviewed studies on gold markets.",
      ar: "ملخص محدث يوميًا لأبرز الدراسات الأكاديمية المحكّمة عن أسواق الذهب.",
      fr: "Synthèse quotidienne des études évaluées par les pairs les plus citées sur les marchés de l'or.",
      tr: "Altın piyasaları üzerine en çok atıf alan hakemli çalışmaların günlük güncellenen özeti.",
      ur: "سونے کی منڈیوں پر سب سے زیادہ حوالہ شدہ ہم مرتبہ جائزہ شدہ مطالعات کا روزانہ تازہ خلاصہ۔",
      hi: "सोना बाज़ारों पर सबसे ज़्यादा उद्धृत समकक्ष-समीक्षित अध्ययनों का रोज़ अपडेट होने वाला सार।",
    }),
    unreachable: pick(locale, {
      en: "The academic sources are temporarily unreachable.",
      ar: "تعذّر الوصول إلى المصادر الأكاديمية مؤقتًا.",
      fr: "Les sources académiques sont momentanément inaccessibles.",
      tr: "Akademik kaynaklara geçici olarak ulaşılamıyor.",
      ur: "تعلیمی ماخذ عارضی طور پر دستیاب نہیں۔",
      hi: "अकादमिक स्रोत अस्थायी रूप से उपलब्ध नहीं हैं।",
    }),
    refreshNote: pick(locale, {
      en: "The digest refreshes automatically every 24 hours. You can search the sources below directly.",
      ar: "يُعاد تحميل الملخص تلقائيًا كل 24 ساعة. يمكنك البحث مباشرة عبر المصادر أدناه.",
      fr: "La synthèse est actualisée automatiquement toutes les 24 heures. Vous pouvez interroger directement les sources ci-dessous.",
      tr: "Özet her 24 saatte bir otomatik yenilenir. Aşağıdaki kaynaklarda doğrudan arama yapabilirsiniz.",
      ur: "خلاصہ ہر 24 گھنٹے بعد خودکار طور پر تازہ ہوتا ہے۔ آپ نیچے دیے گئے ماخذ میں براہِ راست تلاش کر سکتے ہیں۔",
      hi: "सार हर 24 घंटे में अपने आप अपडेट होता है। आप नीचे दिए स्रोतों में सीधे खोज सकते हैं।",
    }),
    lastRefreshed: (d: string) =>
      pick(locale, { en: `Digest last refreshed: ${d}`, ar: `آخر تحديث للملخص: ${d}`, fr: `Dernière actualisation : ${d}`, tr: `Son güncelleme: ${d}`, ur: `آخری اپ ڈیٹ: ${d}`, hi: `अंतिम अपडेट: ${d}` }),
    studies: (n: number) =>
      pick(locale, { en: `${n} studies`, ar: `${n} دراسة`, fr: `${n} études`, tr: `${n} çalışma`, ur: `${n} مطالعات`, hi: `${n} अध्ययन` }),
    home: pick(locale, { en: "Home", ar: "الرئيسية", fr: "Accueil", tr: "Ana Sayfa", ur: "ہوم", hi: "होम" }),
    crumb: pick(locale, { en: "Research", ar: "الأبحاث", fr: "Recherche", tr: "Araştırma", ur: "تحقیق", hi: "अनुसंधान" }),
    h1: pick(locale, {
      en: "What academic research says about gold",
      ar: "ماذا يقول البحث العلمي عن الذهب؟",
      fr: "Ce que dit la recherche académique sur l'or",
      tr: "Akademik araştırmalar altın hakkında ne diyor?",
      ur: "سونے کے بارے میں تعلیمی تحقیق کیا کہتی ہے",
      hi: "सोने के बारे में अकादमिक शोध क्या कहता है",
    }),
    intro: pick(locale, {
      en: "Before you buy or sell, read what the peer-reviewed evidence actually says. Every day we aggregate the most-cited academic papers on gold from four open scholarly databases, rank them by citation count, and link each study to its original text plus a Google Scholar cross-check.",
      ar: "قبل أي قرار شراء أو بيع، اقرأ ما توصلت إليه الدراسات المحكّمة. نجمع يوميًا أكثر الأوراق الأكاديمية استشهادًا عن الذهب من أربع قواعد بيانات علمية مفتوحة، ونرتبها حسب عدد الاستشهادات، مع رابط مباشر للنص الأصلي ورابط تحقق عبر Google Scholar لكل دراسة.",
      fr: "Avant d'acheter ou de vendre, lisez ce que disent réellement les études évaluées par les pairs. Chaque jour, nous agrégeons les articles académiques les plus cités sur l'or à partir de quatre bases de données scientifiques ouvertes, les classons par nombre de citations et relions chaque étude à son texte original ainsi qu'à une vérification croisée sur Google Scholar.",
      tr: "Almadan ya da satmadan önce hakemli kanıtların gerçekte ne söylediğini okuyun. Her gün dört açık bilimsel veri tabanından altın üzerine en çok atıf alan akademik makaleleri topluyor, atıf sayısına göre sıralıyor ve her çalışmayı özgün metnine ve bir Google Scholar çapraz kontrolüne bağlıyoruz.",
      ur: "خریدنے یا بیچنے سے پہلے پڑھیں کہ ہم مرتبہ جائزہ شدہ شواہد دراصل کیا کہتے ہیں۔ ہم روزانہ چار اوپن سائنسی ڈیٹا بیسز سے سونے پر سب سے زیادہ حوالہ شدہ تعلیمی مقالے جمع کرتے ہیں، انہیں حوالوں کی تعداد کے لحاظ سے ترتیب دیتے ہیں، اور ہر مطالعے کو اس کے اصل متن اور Google Scholar پر تصدیقی لنک سے جوڑتے ہیں۔",
      hi: "खरीदने या बेचने से पहले पढ़ें कि समकक्ष-समीक्षित साक्ष्य असल में क्या कहते हैं। हम रोज़ चार ओपन वैज्ञानिक डेटाबेस से सोने पर सबसे ज़्यादा उद्धृत अकादमिक पेपर जुटाते हैं, उन्हें उद्धरण संख्या के हिसाब से क्रम देते हैं, और हर अध्ययन को उसके मूल पाठ और Google Scholar क्रॉस-चेक से जोड़ते हैं।",
    }),
    sourcesLabel: pick(locale, { en: "Sources: ", ar: "المصادر: ", fr: "Sources : ", tr: "Kaynaklar: ", ur: "ماخذ: ", hi: "स्रोत: " }),
    scholarNote: pick(locale, {
      en: " · Google Scholar has no public API, so we provide a per-study verification link instead.",
      ar: " · لا يوفر Google Scholar واجهة برمجية عامة، لذا نعرض رابط تحقق لكل دراسة بدلًا من ذلك.",
      fr: " · Google Scholar n'a pas d'API publique ; nous fournissons donc un lien de vérification par étude.",
      tr: " · Google Scholar'ın herkese açık bir API'si yoktur; bunun yerine her çalışma için bir doğrulama bağlantısı sunuyoruz.",
      ur: " · Google Scholar کا کوئی عوامی API نہیں، اس لیے ہم ہر مطالعے کے لیے تصدیقی لنک فراہم کرتے ہیں۔",
      hi: " · Google Scholar का कोई सार्वजनिक API नहीं है, इसलिए हम हर अध्ययन के लिए सत्यापन लिंक देते हैं।",
    }),
    methodHeading: pick(locale, {
      en: "How we keep this data correct",
      ar: "كيف نضمن صحة البيانات",
      fr: "Comment nous garantissons l'exactitude des données",
      tr: "Bu verilerin doğruluğunu nasıl sağlıyoruz",
      ur: "ہم اس ڈیٹا کو درست کیسے رکھتے ہیں",
      hi: "हम इस डेटा को सही कैसे रखते हैं",
    }),
    method: [
      pick(locale, {
        en: "We read official metadata only (title, authors, year, citation count) from open APIs; we never republish paper text.",
        ar: "نقرأ البيانات الوصفية الرسمية فقط (العنوان، المؤلفون، سنة النشر، عدد الاستشهادات) من الواجهات البرمجية المفتوحة، ولا ننسخ نصوص الأبحاث.",
        fr: "Nous ne lisons que les métadonnées officielles (titre, auteurs, année, nombre de citations) via des API ouvertes ; nous ne republions jamais le texte des articles.",
        tr: "Açık API'lerden yalnızca resmî üst verileri (başlık, yazarlar, yıl, atıf sayısı) okuruz; makale metnini asla yeniden yayımlamayız.",
        ur: "ہم اوپن APIs سے صرف سرکاری میٹا ڈیٹا (عنوان، مصنفین، سال، حوالوں کی تعداد) پڑھتے ہیں؛ مقالوں کا متن کبھی دوبارہ شائع نہیں کرتے۔",
        hi: "हम ओपन API से सिर्फ़ आधिकारिक मेटाडेटा (शीर्षक, लेखक, वर्ष, उद्धरण संख्या) पढ़ते हैं; पेपर का पाठ कभी दोबारा प्रकाशित नहीं करते।",
      }),
      pick(locale, {
        en: "Duplicates are merged by DOI or title, incomplete records are dropped, and results are ranked by citations.",
        ar: "تُدمج النسخ المكررة عبر معرف DOI أو العنوان، وتُستبعد السجلات الناقصة، وتُرتب النتائج حسب الاستشهادات.",
        fr: "Les doublons sont fusionnés par DOI ou par titre, les fiches incomplètes sont écartées et les résultats sont classés par citations.",
        tr: "Yinelenen kayıtlar DOI veya başlığa göre birleştirilir, eksik kayıtlar çıkarılır ve sonuçlar atıfa göre sıralanır.",
        ur: "نقول DOI یا عنوان سے ضم کیے جاتے ہیں، نامکمل ریکارڈ ہٹا دیے جاتے ہیں، اور نتائج حوالوں کے لحاظ سے ترتیب دیے جاتے ہیں۔",
        hi: "डुप्लिकेट DOI या शीर्षक से मिलाए जाते हैं, अधूरे रिकॉर्ड हटाए जाते हैं, और नतीजे उद्धरणों के हिसाब से क्रमबद्ध होते हैं।",
      }),
      pick(locale, {
        en: "Every study carries its canonical link (DOI or arXiv) plus a Google Scholar cross-check, so nothing appears without a verifiable source.",
        ar: "كل دراسة تحمل رابطها الأصلي (DOI أو arXiv) ورابط تحقق عبر Google Scholar، فلا شيء يُعرض دون مصدر يمكن مراجعته.",
        fr: "Chaque étude comporte son lien canonique (DOI ou arXiv) et une vérification croisée Google Scholar ; rien n'apparaît sans source vérifiable.",
        tr: "Her çalışma, kanonik bağlantısını (DOI veya arXiv) ve bir Google Scholar çapraz kontrolünü taşır; doğrulanabilir kaynağı olmayan hiçbir şey görünmez.",
        ur: "ہر مطالعہ اپنا اصل لنک (DOI یا arXiv) اور Google Scholar تصدیقی لنک رکھتا ہے، اس لیے قابلِ تصدیق ماخذ کے بغیر کچھ نہیں دکھایا جاتا۔",
        hi: "हर अध्ययन के साथ उसका मूल लिंक (DOI या arXiv) और Google Scholar क्रॉस-चेक होता है, इसलिए बिना सत्यापन योग्य स्रोत के कुछ नहीं दिखता।",
      }),
      pick(locale, {
        en: "These are informational digests, not investment advice.",
        ar: "هذه ملخصات معلوماتية وليست نصيحة استثمارية.",
        fr: "Il s'agit de synthèses informatives, pas de conseils en investissement.",
        tr: "Bunlar bilgilendirme amaçlı özetlerdir, yatırım tavsiyesi değildir.",
        ur: "یہ معلوماتی خلاصے ہیں، سرمایہ کاری کا مشورہ نہیں۔",
        hi: "ये सूचनात्मक सार हैं, निवेश सलाह नहीं।",
      }),
    ],
  };
}
