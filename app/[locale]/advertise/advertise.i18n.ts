import { pick, type LocaleText } from "@/lib/i18n-text";

export const ADVERTISE_EMAIL = "support@goldpricesarabia.com";

const TITLE: LocaleText = {
  en: "Advertise on Gold Prices Arabia — reach gold buyers across the Arab world",
  ar: "أعلن معنا على أسعار الذهب العربية — الوصول إلى مشتري الذهب في العالم العربي",
  fr: "Annoncer sur Gold Prices Arabia — touchez les acheteurs d'or du monde arabe",
  tr: "Gold Prices Arabia'da reklam verin — Arap dünyasındaki altın alıcılarına ulaşın",
  ur: "گولڈ پرائسز عربیہ پر اشتہار دیں — عرب دنیا کے سونے کے خریداروں تک پہنچیں",
  hi: "Gold Prices Arabia पर विज्ञापन दें — अरब दुनिया के सोने के खरीदारों तक पहुँचें",
};
const DESCRIPTION: LocaleText = {
  en: "Sponsored placements for jewellers, bullion dealers and brokers on the live gold-price pages of 46 countries in six languages. Media kit and contact.",
  ar: "مساحات إعلانية للصاغة وتجار السبائك والوسطاء على صفحات أسعار الذهب المباشرة لـ46 دولة بست لغات. الملف التعريفي وبيانات التواصل.",
  fr: "Emplacements sponsorisés pour bijoutiers, négociants en or et courtiers sur les pages de cours de l'or de 46 pays en six langues.",
  tr: "46 ülkenin canlı altın fiyatı sayfalarında kuyumcular, külçe satıcıları ve aracı kurumlar için sponsorlu alanlar. Medya kiti ve iletişim.",
  ur: "46 ممالک کے لائیو گولڈ ریٹ صفحات پر جیولرز، بلین ڈیلرز اور بروکرز کے لیے اسپانسرڈ جگہیں۔ میڈیا کٹ اور رابطہ۔",
  hi: "46 देशों के लाइव सोने के भाव पेजों पर ज्वैलर्स, बुलियन डीलरों और ब्रोकरों के लिए प्रायोजित स्थान। मीडिया किट और संपर्क।",
};
const H1: LocaleText = {
  en: "Advertise with us",
  ar: "أعلن معنا",
  fr: "Annoncez avec nous",
  tr: "Bizimle reklam verin",
  ur: "ہمارے ساتھ اشتہار دیں",
  hi: "हमारे साथ विज्ञापन दें",
};
const INTRO: LocaleText = {
  en: "Gold Prices Arabia is a reference for people checking today's gold price before they buy, sell or trade — the highest-intent moment in the whole gold market. Our readers come from Google searches such as \"gold price today in Saudi Arabia\" and land directly on the price table of their country and karat.",
  ar: "أسعار الذهب العربية مرجع لمن يتابع سعر الذهب اليوم قبل الشراء أو البيع أو التداول — أعلى لحظة نيّة في سوق الذهب كله. يصل قرّاؤنا من عمليات بحث مثل «سعر الذهب اليوم في السعودية» مباشرة إلى جدول أسعار دولتهم وعيارهم.",
  fr: "Gold Prices Arabia est une référence pour ceux qui vérifient le cours de l'or avant d'acheter, de vendre ou de trader. Nos lecteurs arrivent de recherches Google telles que « prix de l'or aujourd'hui en Arabie saoudite » directement sur le tableau de prix de leur pays.",
  tr: "Gold Prices Arabia, almadan, satmadan veya işlem yapmadan önce günün altın fiyatına bakanların başvurduğu bir kaynaktır. Okuyucularımız \"bugün Suudi Arabistan altın fiyatı\" gibi aramalardan doğrudan ülkelerinin fiyat tablosuna gelir.",
  ur: "گولڈ پرائسز عربیہ ان لوگوں کا حوالہ ہے جو خریدنے، بیچنے یا ٹریڈ کرنے سے پہلے آج کا سونے کا ریٹ دیکھتے ہیں۔ ہمارے قارئین \"آج سعودی عرب میں سونے کی قیمت\" جیسی تلاشوں سے براہِ راست اپنے ملک کے ریٹ ٹیبل پر آتے ہیں۔",
  hi: "Gold Prices Arabia उन लोगों का संदर्भ है जो खरीदने, बेचने या ट्रेड करने से पहले आज का सोने का भाव देखते हैं। हमारे पाठक \"आज सऊदी अरब में सोने का भाव\" जैसी खोजों से सीधे अपने देश की भाव तालिका पर आते हैं।",
};

type Fact = { k: LocaleText; v: LocaleText };
const FACTS: Fact[] = [
  { k: { en: "Markets", ar: "الأسواق", fr: "Marchés", tr: "Pazarlar", ur: "مارکیٹس", hi: "बाज़ार" }, v: { en: "46 country pages × 5 karats, 40+ currencies", ar: "46 صفحة دولة × 5 عيارات، أكثر من 40 عملة", fr: "46 pages pays × 5 carats, 40+ devises", tr: "46 ülke sayfası × 5 ayar, 40+ para birimi", ur: "46 ملکی صفحات × 5 قیراط، 40+ کرنسیاں", hi: "46 देश पेज × 5 कैरेट, 40+ मुद्राएँ" } },
  { k: { en: "Languages", ar: "اللغات", fr: "Langues", tr: "Diller", ur: "زبانیں", hi: "भाषाएँ" }, v: { en: "Arabic, English, French, Turkish, Urdu, Hindi", ar: "العربية، الإنجليزية، الفرنسية، التركية، الأردية، الهندية", fr: "Arabe, anglais, français, turc, ourdou, hindi", tr: "Arapça, İngilizce, Fransızca, Türkçe, Urduca, Hintçe", ur: "عربی، انگریزی، فرانسیسی، ترکی، اردو، ہندی", hi: "अरबी, अंग्रेज़ी, फ़्रेंच, तुर्की, उर्दू, हिन्दी" } },
  { k: { en: "Core audience", ar: "الجمهور الأساسي", fr: "Audience principale", tr: "Ana kitle", ur: "بنیادی سامعین", hi: "मुख्य दर्शक" }, v: { en: "Saudi Arabia, UAE, Jordan, Egypt, Kuwait, Qatar — gold buyers, jewellery shoppers and traders", ar: "السعودية، الإمارات، الأردن، مصر، الكويت، قطر — مشترو الذهب ومتسوقو المجوهرات والمتداولون", fr: "Arabie saoudite, EAU, Jordanie, Égypte, Koweït, Qatar — acheteurs d'or, clients bijouterie et traders", tr: "Suudi Arabistan, BAE, Ürdün, Mısır, Kuveyt, Katar — altın alıcıları, mücevher müşterileri ve yatırımcılar", ur: "سعودی عرب، متحدہ عرب امارات، اردن، مصر، کویت، قطر — سونے کے خریدار، زیورات کے شاپرز اور ٹریڈرز", hi: "सऊदी अरब, UAE, जॉर्डन, मिस्र, कुवैत, क़तर — सोने के खरीदार, आभूषण ग्राहक और ट्रेडर" } },
  { k: { en: "Growth", ar: "النمو", fr: "Croissance", tr: "Büyüme", ur: "ترقی", hi: "वृद्धि" }, v: { en: "Google impressions +79% and clicks +101% month over month (Aug 2026); figures on request", ar: "ظهور في جوجل +79% ونقرات +101% شهرياً (أغسطس 2026)؛ الأرقام التفصيلية عند الطلب", fr: "Impressions Google +79 % et clics +101 % d'un mois sur l'autre (août 2026) ; chiffres sur demande", tr: "Google gösterimleri aylık +%79, tıklamalar +%101 (Ağustos 2026); rakamlar talep üzerine", ur: "گوگل امپریشنز +79% اور کلکس +101% ماہ بہ ماہ (اگست 2026)؛ اعداد و شمار درخواست پر", hi: "Google इंप्रेशन +79% और क्लिक +101% माह-दर-माह (अगस्त 2026); आँकड़े अनुरोध पर" } },
];

type Format = { h: LocaleText; body: LocaleText };
const FORMATS: Format[] = [
  { h: { en: "Country sponsorship", ar: "رعاية صفحة دولة", fr: "Sponsoring pays", tr: "Ülke sponsorluğu", ur: "ملکی اسپانسرشپ", hi: "देश प्रायोजन" }, body: { en: "Your brand on every karat page of one country (e.g. all Jordan pages): a fixed banner under the price table plus a \"prices by\" credit. Ideal for a jeweller or bullion dealer.", ar: "علامتك على كل صفحات عيارات دولة واحدة (مثل كل صفحات الأردن): لافتة ثابتة تحت جدول الأسعار مع إشارة «الأسعار برعاية». مثالي للصاغة وتجار السبائك.", fr: "Votre marque sur toutes les pages carat d'un pays : bannière fixe sous le tableau des prix et mention « prix présentés par ». Idéal pour un bijoutier ou un négociant.", tr: "Bir ülkenin tüm ayar sayfalarında markanız: fiyat tablosunun altında sabit banner ve \"fiyatlar ... sponsorluğunda\" ibaresi. Kuyumcular ve külçe satıcıları için ideal.", ur: "ایک ملک کے تمام قیراط صفحات پر آپ کا برانڈ: ریٹ ٹیبل کے نیچے مستقل بینر اور \"قیمتیں بشکریہ\" کریڈٹ۔ جیولرز اور بلین ڈیلرز کے لیے بہترین۔", hi: "एक देश के सभी कैरेट पेजों पर आपका ब्रांड: भाव तालिका के नीचे स्थायी बैनर और \"भाव प्रायोजक\" क्रेडिट। ज्वैलर या बुलियन डीलर के लिए आदर्श।" } },
  { h: { en: "Native text placement", ar: "إعلان نصي مدمج", fr: "Emplacement natif", tr: "Doğal metin alanı", ur: "نیٹو ٹیکسٹ پلیسمنٹ", hi: "नेटिव टेक्स्ट प्लेसमेंट" }, body: { en: "A clearly labelled sponsored card next to the live price, in the reader's language, with your offer and one call to action. Measured by clicks; no banner blindness.", ar: "بطاقة مدفوعة موسومة بوضوح بجانب السعر المباشر، بلغة القارئ، تحمل عرضك ودعوة واحدة للإجراء. تُقاس بالنقرات ولا تعاني من تجاهل اللافتات.", fr: "Une carte sponsorisée clairement signalée à côté du cours en direct, dans la langue du lecteur, avec votre offre et un appel à l'action. Mesurée au clic.", tr: "Canlı fiyatın yanında, okuyucunun dilinde, teklifiniz ve tek bir eylem çağrısıyla açıkça işaretlenmiş sponsorlu kart. Tıklamayla ölçülür.", ur: "لائیو ریٹ کے ساتھ قاری کی زبان میں واضح نشان زدہ اسپانسرڈ کارڈ، آپ کی پیشکش اور ایک کال ٹو ایکشن کے ساتھ۔ کلکس سے ناپا جاتا ہے۔", hi: "लाइव भाव के बगल में पाठक की भाषा में स्पष्ट रूप से चिह्नित प्रायोजित कार्ड, आपके ऑफ़र और एक कॉल-टू-एक्शन के साथ। क्लिक से मापा जाता है।" } },
  { h: { en: "Chart & widget sponsorship", ar: "رعاية الرسوم البيانية والأدوات", fr: "Sponsoring graphiques et widgets", tr: "Grafik ve widget sponsorluğu", ur: "چارٹ اور ویجیٹ اسپانسرشپ", hi: "चार्ट और विजेट प्रायोजन" }, body: { en: "Our free chart images and price widgets are embedded on other websites. Your name travels with them.", ar: "تُضمَّن صور الرسوم البيانية وأدوات الأسعار المجانية الخاصة بنا في مواقع أخرى، ويسافر اسمك معها.", fr: "Nos images de graphiques et widgets de prix gratuits sont intégrés sur d'autres sites. Votre nom voyage avec eux.", tr: "Ücretsiz grafik görsellerimiz ve fiyat widget'larımız başka sitelere gömülüyor. Adınız onlarla birlikte yolculuk eder.", ur: "ہمارے مفت چارٹ امیجز اور پرائس ویجیٹس دوسری ویب سائٹس پر ایمبیڈ ہوتے ہیں۔ آپ کا نام ان کے ساتھ جاتا ہے۔", hi: "हमारी मुफ़्त चार्ट छवियाँ और भाव विजेट अन्य वेबसाइटों पर एम्बेड होते हैं। आपका नाम उनके साथ जाता है।" } },
];

const RULES: LocaleText = {
  en: "We keep the data independent: sponsors never influence prices, rankings or editorial content, every paid placement is labelled, and we decline offers that conflict with our readers' interests (unregulated brokers, guaranteed-return schemes).",
  ar: "نحافظ على استقلال البيانات: لا يؤثر الرعاة على الأسعار أو الترتيب أو المحتوى التحريري، وكل مساحة مدفوعة موسومة، ونرفض العروض التي تتعارض مع مصلحة القراء (الوسطاء غير المرخصين، مخططات العوائد المضمونة).",
  fr: "Les données restent indépendantes : les sponsors n'influencent ni les prix, ni les classements, ni le contenu ; chaque emplacement payant est signalé ; nous refusons les offres contraires à l'intérêt des lecteurs.",
  tr: "Verileri bağımsız tutarız: sponsorlar fiyatları, sıralamaları veya içeriği etkilemez, her ücretli alan işaretlenir ve okuyucularımızın çıkarına aykırı teklifleri reddederiz (lisanssız aracılar, garantili getiri vaatleri).",
  ur: "ہم ڈیٹا کو آزاد رکھتے ہیں: اسپانسرز قیمتوں، درجہ بندی یا ادارتی مواد پر اثر نہیں ڈالتے، ہر ادا شدہ جگہ نشان زد ہوتی ہے، اور ہم قارئین کے مفاد سے متصادم پیشکشیں مسترد کرتے ہیں۔",
  hi: "हम डेटा को स्वतंत्र रखते हैं: प्रायोजक भाव, रैंकिंग या संपादकीय सामग्री को प्रभावित नहीं करते, हर सशुल्क स्थान चिह्नित होता है, और हम पाठकों के हित के विरुद्ध प्रस्ताव अस्वीकार करते हैं।",
};
const CONTACT_H: LocaleText = { en: "Get the media kit", ar: "اطلب الملف التعريفي", fr: "Demander le kit média", tr: "Medya kitini isteyin", ur: "میڈیا کٹ حاصل کریں", hi: "मीडिया किट प्राप्त करें" };
const CONTACT_BODY: LocaleText = {
  en: "Email us with your market (country), goal and budget. We reply within two business days with current traffic by country, available placements and prices.",
  ar: "راسلنا بذكر سوقك (الدولة) وهدفك وميزانيتك. نرد خلال يومي عمل بأرقام الزيارات الحالية حسب الدولة والمساحات المتاحة والأسعار.",
  fr: "Écrivez-nous en précisant votre marché (pays), votre objectif et votre budget. Réponse sous deux jours ouvrés avec le trafic actuel par pays, les emplacements disponibles et les tarifs.",
  tr: "Pazarınızı (ülke), hedefinizi ve bütçenizi belirterek bize e-posta gönderin. İki iş günü içinde ülke bazlı güncel trafik, mevcut alanlar ve fiyatlarla yanıtlarız.",
  ur: "اپنی مارکیٹ (ملک)، مقصد اور بجٹ کے ساتھ ہمیں ای میل کریں۔ ہم دو کاروباری دنوں میں ملک کے لحاظ سے موجودہ ٹریفک، دستیاب جگہوں اور قیمتوں کے ساتھ جواب دیتے ہیں۔",
  hi: "अपने बाज़ार (देश), लक्ष्य और बजट के साथ हमें ईमेल करें। हम दो कार्यदिवसों में देश-वार वर्तमान ट्रैफ़िक, उपलब्ध स्थान और कीमतों के साथ उत्तर देते हैं।",
};

export const advertiseText = (locale: string) => ({
  title: pick(locale, TITLE),
  description: pick(locale, DESCRIPTION),
  h1: pick(locale, H1),
  intro: pick(locale, INTRO),
  facts: FACTS.map((f) => ({ k: pick(locale, f.k), v: pick(locale, f.v) })),
  formats: FORMATS.map((f) => ({ h: pick(locale, f.h), body: pick(locale, f.body) })),
  rules: pick(locale, RULES),
  contactH: pick(locale, CONTACT_H),
  contactBody: pick(locale, CONTACT_BODY),
  formatsH: pick(locale, { en: "Formats", ar: "الصيغ المتاحة", fr: "Formats", tr: "Biçimler", ur: "فارمیٹس", hi: "प्रारूप" }),
  rulesH: pick(locale, { en: "Our rules", ar: "قواعدنا", fr: "Nos règles", tr: "Kurallarımız", ur: "ہمارے اصول", hi: "हमारे नियम" }),
  home: pick(locale, { en: "Home", ar: "الرئيسية", fr: "Accueil", tr: "Ana sayfa", ur: "ہوم", hi: "होम" }),
});
