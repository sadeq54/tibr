import { pick, type LocaleText } from "@/lib/i18n-text";

export const PRIVACY_UPDATED = "2026-08-21";
export const SUPPORT_EMAIL = "support@goldpricesarabia.com";

export const TITLE: LocaleText = {
  en: "Privacy Policy",
  ar: "سياسة الخصوصية",
  fr: "Politique de confidentialité",
  tr: "Gizlilik Politikası",
  ur: "رازداری کی پالیسی",
  hi: "गोपनीयता नीति",
};

export const DESCRIPTION: LocaleText = {
  en: "How Gold Prices Arabia collects and uses data: analytics cookies, Google AdSense advertising, affiliate links, your choices and how to contact us.",
  ar: "كيف يجمع موقع أسعار الذهب العربية البيانات ويستخدمها: ملفات تعريف الارتباط التحليلية، إعلانات Google AdSense، روابط الشركاء، خياراتك وطريقة التواصل معنا.",
  fr: "Comment Gold Prices Arabia collecte et utilise les données : cookies d'analyse, publicité Google AdSense, liens d'affiliation, vos choix et contact.",
  tr: "Gold Prices Arabia verileri nasıl toplar ve kullanır: analitik çerezler, Google AdSense reklamları, ortaklık bağlantıları, seçenekleriniz ve iletişim.",
  ur: "گولڈ پرائسز عربیہ ڈیٹا کیسے جمع اور استعمال کرتا ہے: تجزیاتی کوکیز، Google AdSense اشتہارات، ایفیلی ایٹ لنکس، آپ کے اختیارات اور رابطہ۔",
  hi: "Gold Prices Arabia डेटा कैसे एकत्र और उपयोग करता है: एनालिटिक्स कुकीज़, Google AdSense विज्ञापन, एफ़िलिएट लिंक, आपके विकल्प और संपर्क।",
};

type Section = { h: LocaleText; body: LocaleText };

export const SECTIONS: Section[] = [
  {
    h: { en: "What this policy covers", ar: "نطاق هذه السياسة", fr: "Champ d'application", tr: "Bu politikanın kapsamı", ur: "اس پالیسی کا دائرہ", hi: "यह नीति किस पर लागू है" },
    body: {
      en: "This policy explains what information goldpricesarabia.com collects when you visit, why, and the choices you have. The site is an information service about gold prices; it does not sell gold, hold accounts, or process payments, so we never ask for financial details.",
      ar: "توضح هذه السياسة المعلومات التي يجمعها موقع goldpricesarabia.com عند زيارتك، وسبب جمعها، والخيارات المتاحة لك. الموقع خدمة معلومات عن أسعار الذهب؛ لا يبيع الذهب ولا يحتفظ بحسابات ولا يعالج مدفوعات، لذلك لا نطلب أي بيانات مالية.",
      fr: "Cette politique explique quelles informations goldpricesarabia.com collecte lors de votre visite, pourquoi, et vos choix. Le site est un service d'information sur le cours de l'or ; il ne vend pas d'or, ne tient aucun compte et ne traite aucun paiement.",
      tr: "Bu politika, goldpricesarabia.com'u ziyaret ettiğinizde hangi bilgilerin neden toplandığını ve seçeneklerinizi açıklar. Site altın fiyatları hakkında bir bilgi hizmetidir; altın satmaz, hesap tutmaz, ödeme işlemez.",
      ur: "یہ پالیسی بتاتی ہے کہ goldpricesarabia.com آپ کے دورے پر کون سی معلومات کیوں جمع کرتا ہے اور آپ کے پاس کیا اختیارات ہیں۔ سائٹ سونے کی قیمتوں کی معلوماتی سروس ہے؛ نہ سونا بیچتی ہے، نہ اکاؤنٹ رکھتی ہے، نہ ادائیگی پراسیس کرتی ہے۔",
      hi: "यह नीति बताती है कि goldpricesarabia.com आपकी विज़िट पर कौन सी जानकारी क्यों एकत्र करता है और आपके पास क्या विकल्प हैं। साइट सोने के भाव की सूचना सेवा है; यह सोना नहीं बेचती, खाते नहीं रखती, भुगतान प्रोसेस नहीं करती।",
    },
  },
  {
    h: { en: "Data we collect automatically", ar: "البيانات التي تُجمع تلقائياً", fr: "Données collectées automatiquement", tr: "Otomatik toplanan veriler", ur: "خودکار طور پر جمع ہونے والا ڈیٹا", hi: "स्वतः एकत्र डेटा" },
    body: {
      en: "Like most websites we receive standard technical data: IP address, browser and device type, language, pages viewed, referring site and timestamps. We use Google Analytics 4 with IP anonymisation to understand which pages are useful. A country cookie (gpa-country) remembers the market page you were sent to; a theme preference may be stored in your browser. None of this identifies you by name.",
      ar: "كمعظم المواقع، نستقبل بيانات تقنية قياسية: عنوان IP، نوع المتصفح والجهاز، اللغة، الصفحات المعروضة، الموقع المُحيل وتوقيت الزيارة. نستخدم Google Analytics 4 مع إخفاء عنوان IP لفهم الصفحات المفيدة. يحفظ ملف تعريف ارتباط (gpa-country) صفحة السوق التي وُجّهت إليها، وقد يُحفظ تفضيل المظهر في متصفحك. لا يحدد أي من ذلك هويتك بالاسم.",
      fr: "Comme la plupart des sites, nous recevons des données techniques standard : adresse IP, navigateur et appareil, langue, pages vues, site référent et horodatage. Nous utilisons Google Analytics 4 avec anonymisation de l'IP. Un cookie de pays (gpa-country) mémorise la page de marché vers laquelle vous avez été dirigé ; une préférence de thème peut être stockée dans votre navigateur.",
      tr: "Çoğu site gibi standart teknik veriler alırız: IP adresi, tarayıcı ve cihaz türü, dil, görüntülenen sayfalar, yönlendiren site ve zaman damgaları. IP anonimleştirmeli Google Analytics 4 kullanırız. Bir ülke çerezi (gpa-country) yönlendirildiğiniz piyasa sayfasını hatırlar; tema tercihi tarayıcınızda saklanabilir.",
      ur: "زیادہ تر ویب سائٹس کی طرح ہمیں معیاری تکنیکی ڈیٹا ملتا ہے: IP ایڈریس، براؤزر اور ڈیوائس کی قسم، زبان، دیکھے گئے صفحات، حوالہ دینے والی سائٹ اور وقت۔ ہم IP گمنامی کے ساتھ Google Analytics 4 استعمال کرتے ہیں۔ ایک ملکی کوکی (gpa-country) آپ کا مارکیٹ صفحہ یاد رکھتی ہے؛ تھیم کی ترجیح آپ کے براؤزر میں محفوظ ہو سکتی ہے۔",
      hi: "अधिकांश साइटों की तरह हमें मानक तकनीकी डेटा मिलता है: IP पता, ब्राउज़र और डिवाइस, भाषा, देखे गए पेज, रेफ़रिंग साइट और समय। हम IP गुमनामी के साथ Google Analytics 4 का उपयोग करते हैं। एक देश कुकी (gpa-country) आपका मार्केट पेज याद रखती है; थीम वरीयता आपके ब्राउज़र में सहेजी जा सकती है।",
    },
  },
  {
    h: { en: "Advertising (Google AdSense)", ar: "الإعلانات (Google AdSense)", fr: "Publicité (Google AdSense)", tr: "Reklamlar (Google AdSense)", ur: "اشتہارات (Google AdSense)", hi: "विज्ञापन (Google AdSense)" },
    body: {
      en: "We show ads served by Google AdSense to keep the site free. Google and its partners use cookies and similar identifiers to serve ads based on your prior visits to this and other websites, to limit how often you see an ad and to measure it. You can opt out of personalised advertising at www.google.com/settings/ads, and of many third-party vendors at www.aboutads.info/choices. Visitors in the EEA, UK and Switzerland are shown a consent banner before any advertising cookie is set and can change their choice at any time from the footer.",
      ar: "نعرض إعلانات تقدمها Google AdSense لإبقاء الموقع مجانياً. تستخدم Google وشركاؤها ملفات تعريف الارتباط ومعرّفات مشابهة لعرض إعلانات بناءً على زياراتك السابقة لهذا الموقع ومواقع أخرى، وللحد من تكرار الإعلان وقياسه. يمكنك إيقاف الإعلانات المخصصة عبر www.google.com/settings/ads، وإيقاف كثير من الموردين الخارجيين عبر www.aboutads.info/choices. يظهر لزوار المنطقة الاقتصادية الأوروبية والمملكة المتحدة وسويسرا شريط موافقة قبل وضع أي ملف إعلاني، ويمكن تغيير الاختيار في أي وقت من أسفل الصفحة.",
      fr: "Nous affichons des publicités diffusées par Google AdSense pour garder le site gratuit. Google et ses partenaires utilisent des cookies pour diffuser des annonces basées sur vos visites précédentes, limiter leur fréquence et les mesurer. Vous pouvez refuser la publicité personnalisée sur www.google.com/settings/ads et sur www.aboutads.info/choices. Les visiteurs de l'EEE, du Royaume-Uni et de la Suisse voient une bannière de consentement avant tout cookie publicitaire et peuvent modifier leur choix à tout moment.",
      tr: "Siteyi ücretsiz tutmak için Google AdSense reklamları gösteriyoruz. Google ve ortakları, önceki ziyaretlerinize göre reklam sunmak, sıklığını sınırlamak ve ölçmek için çerezler kullanır. Kişiselleştirilmiş reklamları www.google.com/settings/ads ve www.aboutads.info/choices adreslerinden kapatabilirsiniz. AEA, Birleşik Krallık ve İsviçre'deki ziyaretçilere herhangi bir reklam çerezi öncesinde onay bandı gösterilir.",
      ur: "سائٹ کو مفت رکھنے کے لیے ہم Google AdSense کے اشتہارات دکھاتے ہیں۔ Google اور اس کے شراکت دار آپ کے پچھلے دوروں کی بنیاد پر اشتہار دکھانے، ان کی تعداد محدود کرنے اور پیمائش کے لیے کوکیز استعمال کرتے ہیں۔ آپ ذاتی نوعیت کے اشتہارات www.google.com/settings/ads اور www.aboutads.info/choices پر بند کر سکتے ہیں۔ EEA، برطانیہ اور سوئٹزرلینڈ کے زائرین کو کسی بھی اشتہاری کوکی سے پہلے رضامندی کا بینر دکھایا جاتا ہے۔",
      hi: "साइट को मुफ़्त रखने के लिए हम Google AdSense के विज्ञापन दिखाते हैं। Google और उसके पार्टनर आपकी पिछली विज़िट के आधार पर विज्ञापन दिखाने, उनकी आवृत्ति सीमित करने और मापने के लिए कुकीज़ का उपयोग करते हैं। आप www.google.com/settings/ads और www.aboutads.info/choices पर वैयक्तिकृत विज्ञापन बंद कर सकते हैं। EEA, UK और स्विट्ज़रलैंड के विज़िटर को किसी भी विज्ञापन कुकी से पहले सहमति बैनर दिखाया जाता है।",
    },
  },
  {
    h: { en: "Affiliate links", ar: "روابط الشركاء", fr: "Liens d'affiliation", tr: "Ortaklık bağlantıları", ur: "ایفیلی ایٹ لنکس", hi: "एफ़िलिएट लिंक" },
    body: {
      en: "Some links to brokers such as XM are affiliate links: if you open an account through them we may earn a commission at no cost to you. These links carry only an anonymous identifier of the page you came from — never your personal data. They are always marked as sponsored and accompanied by a risk warning.",
      ar: "بعض الروابط إلى وسطاء مثل XM روابط شراكة: إذا فتحت حساباً عبرها فقد نحصل على عمولة دون أي تكلفة عليك. تحمل هذه الروابط معرّفاً مجهولاً للصفحة التي أتيت منها فقط، ولا تحمل أي بيانات شخصية. تُوسم دائماً بأنها برعاية ويرافقها تحذير من المخاطر.",
      fr: "Certains liens vers des courtiers comme XM sont des liens d'affiliation : si vous ouvrez un compte via ces liens, nous pouvons percevoir une commission sans frais pour vous. Ils ne transmettent qu'un identifiant anonyme de la page d'origine, jamais vos données personnelles.",
      tr: "XM gibi aracı kurumlara giden bazı bağlantılar ortaklık bağlantısıdır: bunlar üzerinden hesap açarsanız size maliyet olmadan komisyon kazanabiliriz. Bu bağlantılar yalnızca geldiğiniz sayfanın anonim bir kimliğini taşır, kişisel verinizi asla.",
      ur: "XM جیسے بروکرز کے کچھ لنکس ایفیلی ایٹ لنکس ہیں: ان کے ذریعے اکاؤنٹ کھولنے پر ہمیں بغیر آپ پر کسی خرچ کے کمیشن مل سکتا ہے۔ یہ لنکس صرف اس صفحے کی گمنام شناخت لے جاتے ہیں جہاں سے آپ آئے، آپ کا ذاتی ڈیٹا کبھی نہیں۔",
      hi: "XM जैसे ब्रोकरों के कुछ लिंक एफ़िलिएट लिंक हैं: उनके ज़रिए खाता खोलने पर हमें बिना आपकी लागत के कमीशन मिल सकता है। ये लिंक केवल उस पेज की गुमनाम पहचान ले जाते हैं जहाँ से आप आए, आपका व्यक्तिगत डेटा कभी नहीं।",
    },
  },
  {
    h: { en: "Your choices and rights", ar: "خياراتك وحقوقك", fr: "Vos choix et vos droits", tr: "Seçenekleriniz ve haklarınız", ur: "آپ کے اختیارات اور حقوق", hi: "आपके विकल्प और अधिकार" },
    body: {
      en: "You can block or delete cookies in your browser at any time; the site keeps working. Under GDPR, the Saudi PDPL and similar laws you may ask what data we hold about you and request its deletion. Email us and we will answer within 30 days. Analytics data is retained for 14 months; server logs for 30 days.",
      ar: "يمكنك حظر ملفات تعريف الارتباط أو حذفها من متصفحك في أي وقت، وسيبقى الموقع يعمل. بموجب اللائحة الأوروبية GDPR ونظام حماية البيانات الشخصية السعودي PDPL والقوانين المماثلة، يحق لك معرفة البيانات التي نحتفظ بها عنك وطلب حذفها. راسلنا وسنرد خلال 30 يوماً. تُحفظ بيانات التحليلات 14 شهراً وسجلات الخادم 30 يوماً.",
      fr: "Vous pouvez bloquer ou supprimer les cookies dans votre navigateur à tout moment. En vertu du RGPD et de lois similaires, vous pouvez demander quelles données nous détenons à votre sujet et leur suppression. Écrivez-nous ; réponse sous 30 jours. Données d'analyse conservées 14 mois ; journaux serveur 30 jours.",
      tr: "Çerezleri tarayıcınızdan istediğiniz zaman engelleyebilir veya silebilirsiniz. GDPR, Suudi PDPL ve benzeri yasalar kapsamında hakkınızda tuttuğumuz verileri sorabilir ve silinmesini isteyebilirsiniz. Bize e-posta gönderin; 30 gün içinde yanıtlarız. Analitik verileri 14 ay, sunucu günlükleri 30 gün saklanır.",
      ur: "آپ کسی بھی وقت اپنے براؤزر میں کوکیز بلاک یا حذف کر سکتے ہیں۔ GDPR، سعودی PDPL اور اسی طرح کے قوانین کے تحت آپ پوچھ سکتے ہیں کہ ہمارے پاس آپ کا کیا ڈیٹا ہے اور اسے حذف کرنے کی درخواست کر سکتے ہیں۔ ہمیں ای میل کریں؛ 30 دن میں جواب دیں گے۔ تجزیاتی ڈیٹا 14 ماہ، سرور لاگز 30 دن رکھے جاتے ہیں۔",
      hi: "आप कभी भी अपने ब्राउज़र में कुकीज़ ब्लॉक या हटा सकते हैं। GDPR, सऊदी PDPL और समान क़ानूनों के तहत आप पूछ सकते हैं कि हमारे पास आपका क्या डेटा है और उसे हटाने का अनुरोध कर सकते हैं। हमें ईमेल करें; 30 दिनों में उत्तर देंगे। एनालिटिक्स डेटा 14 महीने, सर्वर लॉग 30 दिन रखे जाते हैं।",
    },
  },
  {
    h: { en: "Contact", ar: "التواصل", fr: "Contact", tr: "İletişim", ur: "رابطہ", hi: "संपर्क" },
    body: {
      en: `Questions about this policy or a data request: ${SUPPORT_EMAIL}. This page is reviewed whenever our tools change; the date above is the last revision.`,
      ar: `للاستفسار عن هذه السياسة أو لطلب يخص بياناتك: ${SUPPORT_EMAIL}. تُراجع هذه الصفحة كلما تغيرت أدواتنا، والتاريخ أعلاه هو آخر تحديث.`,
      fr: `Questions sur cette politique ou demande concernant vos données : ${SUPPORT_EMAIL}. Cette page est révisée à chaque changement d'outil ; la date ci-dessus est celle de la dernière révision.`,
      tr: `Bu politika veya veri talepleri için: ${SUPPORT_EMAIL}. Araçlarımız değiştikçe bu sayfa gözden geçirilir; yukarıdaki tarih son revizyondur.`,
      ur: `اس پالیسی کے بارے میں سوال یا ڈیٹا کی درخواست: ${SUPPORT_EMAIL}۔ ہمارے ٹولز بدلنے پر یہ صفحہ نظرِ ثانی کیا جاتا ہے؛ اوپر دی گئی تاریخ آخری ترمیم ہے۔`,
      hi: `इस नीति के बारे में प्रश्न या डेटा अनुरोध: ${SUPPORT_EMAIL}। हमारे टूल बदलने पर यह पेज समीक्षा किया जाता है; ऊपर की तारीख अंतिम संशोधन है।`,
    },
  },
];

export const privacyText = (locale: string) => ({
  title: pick(locale, TITLE),
  description: pick(locale, DESCRIPTION),
  sections: SECTIONS.map((s) => ({ h: pick(locale, s.h), body: pick(locale, s.body) })),
});
