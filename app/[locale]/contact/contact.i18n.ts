import { ADS_EMAIL, CORRECTION_WINDOW_HOURS, DATA_REQUEST_DAYS, REPLY_WINDOW_HOURS, SUPPORT_EMAIL } from "@/lib/contact";
import { pick, type LocaleText } from "@/lib/i18n-text";

export const CONTACT_UPDATED = "2026-08-27";

export const TITLE: LocaleText = {
  en: "Contact",
  ar: "تواصل معنا",
  fr: "Contact",
  tr: "İletişim",
  ur: "رابطہ",
  hi: "संपर्क",
};

export const DESCRIPTION: LocaleText = {
  en: "Reach Gold Prices Arabia: report a wrong price, ask about our data, request a data deletion, or enquire about advertising. Who runs the site and how fast we reply.",
  ar: "تواصل مع أسعار الذهب العربية: بلّغ عن سعر خاطئ، أو اسأل عن بياناتنا، أو اطلب حذف بياناتك، أو استفسر عن الإعلان. من يدير الموقع وكم نستغرق للرد.",
  fr: "Contacter Gold Prices Arabia : signaler un prix erroné, poser une question sur nos données, demander une suppression de données ou une insertion publicitaire. Qui gère le site et sous quel délai nous répondons.",
  tr: "Gold Prices Arabia'ya ulaşın: yanlış fiyat bildirin, verilerimizi sorun, veri silme talep edin veya reklam için yazın. Siteyi kim yönetiyor ve ne kadar sürede yanıt veriyoruz.",
  ur: "گولڈ پرائسز عربیہ سے رابطہ: غلط قیمت کی اطلاع دیں، ہمارے ڈیٹا کے بارے میں پوچھیں، ڈیٹا حذف کرانے کی درخواست کریں، یا اشتہار کے بارے میں پوچھیں۔ سائٹ کون چلاتا ہے اور ہم کتنی جلدی جواب دیتے ہیں۔",
  hi: "Gold Prices Arabia से संपर्क करें: ग़लत भाव की सूचना दें, हमारे डेटा के बारे में पूछें, डेटा हटाने का अनुरोध करें, या विज्ञापन के बारे में पूछें। साइट कौन चलाता है और हम कितनी जल्दी उत्तर देते हैं।",
};

export const INTRO: LocaleText = {
  en: `Gold Prices Arabia is an independent price-tracking site, not a dealer. Every message below goes to a person, not a ticket queue. We answer within ${REPLY_WINDOW_HOURS} hours on working days; a reported price error is treated as urgent and corrected within ${CORRECTION_WINDOW_HOURS} hours.`,
  ar: `أسعار الذهب العربية موقع مستقل لتتبع الأسعار، وليس تاجراً. كل رسالة أدناه تصل إلى شخص حقيقي لا إلى نظام تذاكر. نرد خلال ${REPLY_WINDOW_HOURS} ساعة في أيام العمل، ويُعامل الإبلاغ عن خطأ في السعر على أنه عاجل ويُصحَّح خلال ${CORRECTION_WINDOW_HOURS} ساعة.`,
  fr: `Gold Prices Arabia est un site indépendant de suivi des cours, pas un négociant. Chaque message ci-dessous parvient à une personne, pas à une file de tickets. Nous répondons sous ${REPLY_WINDOW_HOURS} heures les jours ouvrés ; une erreur de prix signalée est traitée en urgence et corrigée sous ${CORRECTION_WINDOW_HOURS} heures.`,
  tr: `Gold Prices Arabia bağımsız bir fiyat takip sitesidir, bayi değildir. Aşağıdaki her mesaj bir bilet kuyruğuna değil, bir kişiye ulaşır. İş günlerinde ${REPLY_WINDOW_HOURS} saat içinde yanıtlıyoruz; bildirilen fiyat hatası acil sayılır ve ${CORRECTION_WINDOW_HOURS} saat içinde düzeltilir.`,
  ur: `گولڈ پرائسز عربیہ ایک آزاد قیمت ٹریکنگ سائٹ ہے، ڈیلر نہیں۔ نیچے دیا گیا ہر پیغام کسی ٹکٹ قطار کو نہیں بلکہ ایک شخص کو پہنچتا ہے۔ ہم کام کے دنوں میں ${REPLY_WINDOW_HOURS} گھنٹے میں جواب دیتے ہیں؛ قیمت کی غلطی کی اطلاع فوری سمجھی جاتی ہے اور ${CORRECTION_WINDOW_HOURS} گھنٹے میں درست کی جاتی ہے۔`,
  hi: `Gold Prices Arabia एक स्वतंत्र भाव-ट्रैकिंग साइट है, डीलर नहीं। नीचे दिया हर संदेश किसी टिकट क़तार को नहीं, एक व्यक्ति को पहुँचता है। हम कार्य-दिवसों में ${REPLY_WINDOW_HOURS} घंटे के भीतर उत्तर देते हैं; भाव की ग़लती की सूचना अत्यावश्यक मानी जाती है और ${CORRECTION_WINDOW_HOURS} घंटे में सुधारी जाती है।`,
};

type Channel = { h: LocaleText; body: LocaleText; email: string };

export const CHANNELS: Channel[] = [
  {
    h: {
      en: "Wrong price, or a question about the data",
      ar: "سعر خاطئ أو سؤال عن البيانات",
      fr: "Prix erroné ou question sur les données",
      tr: "Yanlış fiyat veya veriyle ilgili soru",
      ur: "غلط قیمت یا ڈیٹا سے متعلق سوال",
      hi: "ग़लत भाव, या डेटा से जुड़ा प्रश्न",
    },
    body: {
      en: "Tell us the page, the country and the number you expected. Spot, karat and exchange rates come from live third-party feeds, so a mismatch is usually either an upstream outage or a local dealer premium we do not model — either way we want to know, and we say which it was.",
      ar: "أخبرنا بالصفحة والدولة والرقم الذي توقعته. تأتي أسعار الفوري والعيارات والصرف من تغذيات مباشرة لأطراف ثالثة، لذا فإن الاختلاف يكون عادةً إما انقطاعاً في المصدر أو هامش تاجر محلي لا نحسبه — في الحالتين نريد أن نعرف، ونوضح لك أيّهما كان.",
      fr: "Indiquez-nous la page, le pays et le chiffre attendu. Les cours spot, les carats et les taux de change proviennent de flux tiers en direct : un écart vient donc soit d'une panne en amont, soit d'une prime de détaillant local que nous ne modélisons pas — dans les deux cas nous voulons le savoir et nous vous disons laquelle.",
      tr: "Sayfayı, ülkeyi ve beklediğiniz rakamı yazın. Spot, ayar ve döviz kurları canlı üçüncü taraf akışlarından gelir; bu yüzden bir sapma genelde ya kaynaktaki kesintiden ya da modellemediğimiz yerel bayi primindendir — her iki durumda da bilmek isteriz ve hangisi olduğunu söyleriz.",
      ur: "ہمیں صفحہ، ملک اور وہ عدد بتائیں جس کی آپ کو توقع تھی۔ اسپاٹ، کیرٹ اور زرِ مبادلہ کی شرحیں لائیو تھرڈ پارٹی فیڈز سے آتی ہیں، اس لیے فرق عموماً یا تو اوپری سطح کی بندش ہوتا ہے یا مقامی ڈیلر کا وہ مارجن جسے ہم شامل نہیں کرتے — دونوں صورتوں میں ہم جاننا چاہتے ہیں اور بتاتے ہیں کہ کون سی وجہ تھی۔",
      hi: "हमें पेज, देश और अपेक्षित संख्या बताएँ। स्पॉट, कैरेट और विनिमय दरें लाइव थर्ड-पार्टी फ़ीड से आती हैं, इसलिए अंतर आमतौर पर या तो अपस्ट्रीम आउटेज होता है या स्थानीय डीलर का प्रीमियम जिसे हम शामिल नहीं करते — दोनों ही स्थिति में हम जानना चाहते हैं और बताते हैं कि कारण क्या था।",
    },
    email: SUPPORT_EMAIL,
  },
  {
    h: {
      en: "Your data, or a deletion request",
      ar: "بياناتك أو طلب حذفها",
      fr: "Vos données ou une demande de suppression",
      tr: "Verileriniz veya silme talebi",
      ur: "آپ کا ڈیٹا یا حذف کرنے کی درخواست",
      hi: "आपका डेटा, या हटाने का अनुरोध",
    },
    body: {
      en: `We keep no accounts and ask for no financial details. Under GDPR, Saudi PDPL and comparable laws you can ask what we hold about you and require it deleted; we reply within ${DATA_REQUEST_DAYS} days. What is collected, and for how long, is set out in the privacy policy.`,
      ar: `لا نحتفظ بحسابات ولا نطلب أي بيانات مالية. بموجب اللائحة الأوروبية GDPR ونظام حماية البيانات الشخصية السعودي PDPL والقوانين المماثلة، يحق لك معرفة ما نحتفظ به عنك وطلب حذفه؛ ونرد خلال ${DATA_REQUEST_DAYS} يوماً. تفاصيل ما يُجمع ومدة حفظه موضحة في سياسة الخصوصية.`,
      fr: `Nous ne tenons aucun compte et ne demandons aucune donnée financière. Au titre du RGPD, de la PDPL saoudienne et de lois comparables, vous pouvez demander quelles données nous détenons et exiger leur suppression ; réponse sous ${DATA_REQUEST_DAYS} jours. Le détail figure dans la politique de confidentialité.`,
      tr: `Hesap tutmuyor, finansal bilgi istemiyoruz. GDPR, Suudi PDPL ve benzeri yasalar kapsamında hakkınızda tuttuğumuz veriyi sorabilir ve silinmesini isteyebilirsiniz; ${DATA_REQUEST_DAYS} gün içinde yanıtlıyoruz. Neyin ne kadar süreyle toplandığı gizlilik politikasında yazılıdır.`,
      ur: `ہم کوئی اکاؤنٹ نہیں رکھتے اور نہ کوئی مالی تفصیل مانگتے ہیں۔ GDPR، سعودی PDPL اور اسی طرح کے قوانین کے تحت آپ پوچھ سکتے ہیں کہ ہمارے پاس آپ کا کیا ڈیٹا ہے اور اسے حذف کرانے کا مطالبہ کر سکتے ہیں؛ ہم ${DATA_REQUEST_DAYS} دن میں جواب دیتے ہیں۔ تفصیل رازداری کی پالیسی میں ہے۔`,
      hi: `हम कोई खाता नहीं रखते और न कोई वित्तीय विवरण माँगते हैं। GDPR, सऊदी PDPL और समान क़ानूनों के तहत आप पूछ सकते हैं कि हमारे पास आपका क्या डेटा है और उसे हटाने की माँग कर सकते हैं; हम ${DATA_REQUEST_DAYS} दिनों में उत्तर देते हैं। विवरण गोपनीयता नीति में है।`,
    },
    email: SUPPORT_EMAIL,
  },
  {
    h: {
      en: "Advertising and partnerships",
      ar: "الإعلانات والشراكات",
      fr: "Publicité et partenariats",
      tr: "Reklam ve iş birlikleri",
      ur: "اشتہارات اور شراکت داری",
      hi: "विज्ञापन और साझेदारी",
    },
    body: {
      en: "Rates, placements and audience figures are on the advertise page. Sponsored placements are labelled and never change a published price; that rule is written into our editorial standards.",
      ar: "الأسعار والمساحات وأرقام الجمهور موجودة في صفحة أعلن معنا. تُوسَم المساحات المدفوعة دائماً ولا تغيّر أبداً سعراً منشوراً؛ هذه القاعدة مكتوبة في معايير التحرير لدينا.",
      fr: "Tarifs, emplacements et audience figurent sur la page publicité. Les emplacements sponsorisés sont signalés et ne modifient jamais un prix publié ; cette règle est inscrite dans notre charte éditoriale.",
      tr: "Fiyatlar, alanlar ve kitle rakamları reklam sayfasındadır. Sponsorlu alanlar etiketlenir ve yayımlanmış bir fiyatı asla değiştirmez; bu kural editoryal standartlarımızda yazılıdır.",
      ur: "قیمتیں، جگہیں اور سامعین کے اعداد و شمار اشتہار والے صفحے پر ہیں۔ اسپانسر شدہ جگہوں پر لیبل لگتا ہے اور وہ کبھی کسی شائع شدہ قیمت کو تبدیل نہیں کرتیں؛ یہ اصول ہمارے ادارتی معیارات میں درج ہے۔",
      hi: "दरें, स्थान और ऑडियंस आँकड़े विज्ञापन पेज पर हैं। प्रायोजित स्थान लेबल किए जाते हैं और किसी प्रकाशित भाव को कभी नहीं बदलते; यह नियम हमारे संपादकीय मानकों में लिखा है।",
    },
    email: ADS_EMAIL,
  },
  {
    h: {
      en: "Press, corrections and republishing",
      ar: "الصحافة والتصحيحات وإعادة النشر",
      fr: "Presse, corrections et reprise",
      tr: "Basın, düzeltmeler ve yeniden yayın",
      ur: "پریس، تصحیحات اور دوبارہ اشاعت",
      hi: "प्रेस, सुधार और पुनःप्रकाशन",
    },
    body: {
      en: "Our charts and tables may be quoted with a link back. Ask before republishing a full table. Corrections we make are logged and the cached page is purged the same day.",
      ar: "يمكن اقتباس رسومنا وجداولنا مع رابط يعود إلينا. استأذن قبل إعادة نشر جدول كامل. تُسجَّل التصحيحات التي نجريها وتُمسح الصفحة المخزنة مؤقتاً في اليوم نفسه.",
      fr: "Nos graphiques et tableaux peuvent être cités avec un lien retour. Demandez avant de republier un tableau entier. Les corrections sont consignées et la page en cache est purgée le jour même.",
      tr: "Grafik ve tablolarımız geri bağlantı verilerek alıntılanabilir. Tam bir tabloyu yeniden yayımlamadan önce sorun. Yaptığımız düzeltmeler kayda geçer ve önbellekteki sayfa aynı gün temizlenir.",
      ur: "ہمارے چارٹ اور جدول لنک کے ساتھ نقل کیے جا سکتے ہیں۔ مکمل جدول دوبارہ شائع کرنے سے پہلے اجازت لیں۔ ہماری کی گئی تصحیحات درج ہوتی ہیں اور کیش شدہ صفحہ اسی دن صاف کر دیا جاتا ہے۔",
      hi: "हमारे चार्ट और तालिकाएँ बैक-लिंक के साथ उद्धृत की जा सकती हैं। पूरी तालिका पुनःप्रकाशित करने से पहले पूछें। हमारे किए सुधार दर्ज होते हैं और कैश पेज उसी दिन साफ़ किया जाता है।",
    },
    email: SUPPORT_EMAIL,
  },
];

export const WHO_H: LocaleText = {
  en: "Who you are writing to",
  ar: "إلى من تكتب",
  fr: "À qui vous écrivez",
  tr: "Kime yazıyorsunuz",
  ur: "آپ کس کو لکھ رہے ہیں",
  hi: "आप किसे लिख रहे हैं",
};

export const WHO_BODY: LocaleText = {
  en: "The site is built and run by Sadeq Alsayed, its founder and sole editor. There is no newsroom behind this — one person reads the mail, fixes the code and issues the correction. His background, and why the site exists, are on the founder page.",
  ar: "الموقع من بناء وإدارة صادق السيد، مؤسسه ومحرره الوحيد. لا توجد غرفة أخبار خلف هذا — شخص واحد يقرأ البريد ويصلح الكود ويصدر التصحيح. خلفيته وسبب وجود الموقع موضحان في صفحة المؤسس.",
  fr: "Le site est conçu et géré par Sadeq Alsayed, son fondateur et unique rédacteur. Il n'y a pas de rédaction derrière : une seule personne lit le courrier, corrige le code et publie la correction. Son parcours et la raison d'être du site figurent sur la page du fondateur.",
  tr: "Site, kurucusu ve tek editörü Sadeq Alsayed tarafından yapıldı ve yönetiliyor. Arkada bir haber merkezi yok — tek kişi postaları okur, kodu düzeltir ve düzeltmeyi yayımlar. Geçmişi ve sitenin varlık nedeni kurucu sayfasındadır.",
  ur: "سائٹ اس کے بانی اور واحد مدیر صادق السید نے بنائی اور وہی چلاتے ہیں۔ اس کے پیچھے کوئی نیوز روم نہیں — ایک ہی شخص میل پڑھتا ہے، کوڈ ٹھیک کرتا ہے اور تصحیح جاری کرتا ہے۔ ان کا پس منظر اور سائٹ کی وجہ بانی کے صفحے پر ہے۔",
  hi: "साइट को इसके संस्थापक और एकमात्र संपादक Sadeq Alsayed ने बनाया है और वही चलाते हैं। इसके पीछे कोई न्यूज़रूम नहीं — एक ही व्यक्ति मेल पढ़ता है, कोड ठीक करता है और सुधार जारी करता है। उनकी पृष्ठभूमि और साइट के अस्तित्व का कारण संस्थापक पेज पर है।",
};

export const NOT_H: LocaleText = {
  en: "What we cannot help with",
  ar: "ما لا نستطيع المساعدة فيه",
  fr: "Ce que nous ne pouvons pas faire",
  tr: "Yardımcı olamayacağımız konular",
  ur: "جن معاملات میں ہم مدد نہیں کر سکتے",
  hi: "जिनमें हम मदद नहीं कर सकते",
};

export const NOT_BODY: LocaleText = {
  en: "We do not buy, sell, value or ship gold, and we hold nothing on your behalf. We cannot tell you whether to buy today, appraise a piece from a photograph, or intervene with a jeweller. If someone contacted you claiming to sell gold as this site, it was not us — report it and we will publish a warning.",
  ar: "نحن لا نشتري الذهب ولا نبيعه ولا نقيّمه ولا نشحنه، ولا نحتفظ بأي شيء نيابةً عنك. لا يمكننا أن نخبرك بالشراء اليوم من عدمه، ولا تقييم قطعة من صورة، ولا التدخل لدى صائغ. إذا تواصل معك أحد مدّعياً بيع الذهب باسم هذا الموقع فهو ليس نحن — أبلغنا وسننشر تحذيراً.",
  fr: "Nous n'achetons, ne vendons, n'évaluons ni n'expédions d'or, et nous ne détenons rien pour votre compte. Nous ne pouvons pas vous dire s'il faut acheter aujourd'hui, expertiser une pièce sur photo, ni intervenir auprès d'un bijoutier. Si quelqu'un vous a contacté en prétendant vendre de l'or au nom de ce site, ce n'était pas nous — signalez-le et nous publierons un avertissement.",
  tr: "Altın alıp satmıyor, değerlemesini yapmıyor, kargolamıyoruz ve sizin adınıza hiçbir şey tutmuyoruz. Bugün alım yapıp yapmayacağınızı söyleyemez, fotoğraftan ekspertiz yapamaz, bir kuyumcuya müdahale edemeyiz. Biri bu site adına altın sattığını söyleyerek size ulaştıysa o biz değiliz — bildirin, uyarı yayımlayalım.",
  ur: "ہم سونا نہ خریدتے ہیں، نہ بیچتے، نہ اس کی قیمت لگاتے، نہ بھیجتے ہیں، اور نہ آپ کی طرف سے کچھ رکھتے ہیں۔ ہم یہ نہیں بتا سکتے کہ آج خریدیں یا نہیں، تصویر سے کسی چیز کی قیمت نہیں لگا سکتے، اور نہ کسی جوہری سے معاملہ کر سکتے ہیں۔ اگر کسی نے اس سائٹ کے نام پر سونا بیچنے کا دعویٰ کرتے ہوئے آپ سے رابطہ کیا تو وہ ہم نہیں تھے — اطلاع دیں، ہم انتباہ شائع کریں گے۔",
  hi: "हम सोना न ख़रीदते हैं, न बेचते, न उसका मूल्यांकन करते, न भेजते हैं, और आपकी ओर से कुछ नहीं रखते। हम यह नहीं बता सकते कि आज ख़रीदें या नहीं, फ़ोटो से किसी वस्तु का मूल्यांकन नहीं कर सकते, न किसी जौहरी से हस्तक्षेप कर सकते हैं। यदि किसी ने इस साइट के नाम पर सोना बेचने का दावा करते हुए आपसे संपर्क किया, तो वह हम नहीं थे — बताएँ, हम चेतावनी प्रकाशित करेंगे।",
};

export const EMAIL_CTA: LocaleText = {
  en: "Email",
  ar: "راسلنا",
  fr: "Écrire",
  tr: "E-posta gönder",
  ur: "ای میل کریں",
  hi: "ईमेल करें",
};

export const contactText = (locale: string) => ({
  title: pick(locale, TITLE),
  description: pick(locale, DESCRIPTION),
  intro: pick(locale, INTRO),
  channels: CHANNELS.map((c) => ({ h: pick(locale, c.h), body: pick(locale, c.body), email: c.email })),
  whoH: pick(locale, WHO_H),
  whoBody: pick(locale, WHO_BODY),
  notH: pick(locale, NOT_H),
  notBody: pick(locale, NOT_BODY),
  emailCta: pick(locale, EMAIL_CTA),
});
