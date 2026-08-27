import { SUPPORT_EMAIL } from "@/lib/contact";
import { pick, type LocaleText } from "@/lib/i18n-text";

export const TERMS_UPDATED = "2026-08-27";

export const TITLE: LocaleText = {
  en: "Terms of Use",
  ar: "شروط الاستخدام",
  fr: "Conditions d'utilisation",
  tr: "Kullanım Şartları",
  ur: "شرائطِ استعمال",
  hi: "उपयोग की शर्तें",
};

export const DESCRIPTION: LocaleText = {
  en: "The terms you accept by using Gold Prices Arabia: what the prices are and are not, no financial advice, limits of liability, how our data may be reused, and the governing law.",
  ar: "الشروط التي تقبلها باستخدام موقع أسعار الذهب العربية: ما تمثله الأسعار وما لا تمثله، عدم تقديم نصيحة مالية، حدود المسؤولية، كيفية إعادة استخدام بياناتنا، والقانون الحاكم.",
  fr: "Les conditions que vous acceptez en utilisant Gold Prices Arabia : ce que les prix sont et ne sont pas, absence de conseil financier, limites de responsabilité, réutilisation des données et droit applicable.",
  tr: "Gold Prices Arabia'yı kullanarak kabul ettiğiniz şartlar: fiyatların ne olduğu ve ne olmadığı, finansal tavsiye verilmemesi, sorumluluk sınırları, verilerimizin yeniden kullanımı ve geçerli hukuk.",
  ur: "گولڈ پرائسز عربیہ استعمال کرنے پر آپ جن شرائط سے اتفاق کرتے ہیں: قیمتیں کیا ہیں اور کیا نہیں، مالی مشورہ نہیں، ذمہ داری کی حدود، ہمارے ڈیٹا کا دوبارہ استعمال، اور قابلِ اطلاق قانون۔",
  hi: "Gold Prices Arabia का उपयोग करते हुए आप जिन शर्तों को स्वीकार करते हैं: भाव क्या हैं और क्या नहीं, कोई वित्तीय सलाह नहीं, दायित्व की सीमाएँ, हमारे डेटा का पुनःउपयोग, और लागू क़ानून।",
};

export const INTRO: LocaleText = {
  en: "Using goldpricesarabia.com means accepting the terms below. They are written plainly on purpose: this is an information site, and the most important thing you can know is exactly what the numbers on it mean and what they do not.",
  ar: "استخدامك لموقع goldpricesarabia.com يعني قبولك للشروط أدناه. وهي مكتوبة بلغة واضحة عن قصد: هذا موقع معلومات، وأهم ما ينبغي أن تعرفه هو ماذا تعني الأرقام المعروضة فيه بالضبط وماذا لا تعني.",
  fr: "Utiliser goldpricesarabia.com vaut acceptation des conditions ci-dessous. Elles sont volontairement rédigées en langage clair : ce site est un service d'information, et l'essentiel est de savoir précisément ce que ses chiffres signifient — et ce qu'ils ne signifient pas.",
  tr: "goldpricesarabia.com'u kullanmak aşağıdaki şartları kabul etmek demektir. Bilinçli olarak sade yazıldılar: burası bir bilgi sitesidir ve bilmeniz gereken en önemli şey, buradaki rakamların tam olarak ne anlama geldiği ve ne anlama gelmediğidir.",
  ur: "goldpricesarabia.com کا استعمال ذیل کی شرائط قبول کرنے کے مترادف ہے۔ یہ جان بوجھ کر سادہ زبان میں لکھی گئی ہیں: یہ ایک معلوماتی سائٹ ہے، اور سب سے اہم بات یہ جاننا ہے کہ اس پر موجود اعداد کا مطلب کیا ہے اور کیا نہیں۔",
  hi: "goldpricesarabia.com का उपयोग नीचे दी शर्तों को स्वीकार करना है। ये जानबूझकर सरल भाषा में लिखी गई हैं: यह एक सूचना साइट है, और सबसे ज़रूरी बात यह जानना है कि इस पर दिए अंक का अर्थ क्या है और क्या नहीं।",
};

type Section = { h: LocaleText; body: LocaleText };

export const SECTIONS: Section[] = [
  {
    h: {
      en: "What the prices are",
      ar: "ما تمثله الأسعار",
      fr: "Ce que sont les prix",
      tr: "Fiyatlar nedir",
      ur: "قیمتیں کیا ہیں",
      hi: "भाव क्या हैं",
    },
    body: {
      en: "Every figure on this site is derived: an international spot price for the metal, converted at a market exchange rate and divided down to the karat and weight shown. That is a reference value, not a quote. A jeweller in your city adds making charges, VAT and a retail margin, so what you pay at the counter is normally higher — often meaningfully so. Our methodology page sets out each step of the calculation.",
      ar: "كل رقم في هذا الموقع مشتق: سعر فوري عالمي للمعدن، محوَّل بسعر صرف السوق ومقسَّم إلى العيار والوزن المعروضين. هذه قيمة استرشادية وليست عرض سعر. الصائغ في مدينتك يضيف أجرة الصياغة وضريبة القيمة المضافة وهامش التجزئة، لذا فما تدفعه عند الشراء يكون عادةً أعلى، وبفارق ملموس غالباً. توضح صفحة المنهجية كل خطوة في الحساب.",
      fr: "Chaque chiffre du site est dérivé : un cours spot international, converti à un taux de change de marché puis ramené au carat et au poids affichés. C'est une valeur de référence, pas une offre. Un bijoutier ajoute façon, TVA et marge de détail : ce que vous payez au comptoir est normalement plus élevé, souvent nettement. La page méthodologie détaille chaque étape.",
      tr: "Bu sitedeki her rakam türetilmiştir: metalin uluslararası spot fiyatı, piyasa kuruyla çevrilir ve gösterilen ayar ile ağırlığa bölünür. Bu bir referans değerdir, teklif değil. Şehrinizdeki kuyumcu işçilik, KDV ve perakende marjı ekler; tezgâhta ödediğiniz normalde daha yüksektir, çoğu zaman belirgin şekilde. Metodoloji sayfası her adımı açıklar.",
      ur: "اس سائٹ کا ہر عدد اخذ کردہ ہے: دھات کی بین الاقوامی اسپاٹ قیمت، مارکیٹ کی شرحِ مبادلہ پر تبدیل کر کے دکھائے گئے کیرٹ اور وزن پر تقسیم کی جاتی ہے۔ یہ ایک حوالہ قیمت ہے، پیشکش نہیں۔ آپ کے شہر کا جوہری بنوائی، ویٹ اور خوردہ مارجن شامل کرتا ہے، اس لیے کاؤنٹر پر آپ جو ادا کرتے ہیں وہ عموماً زیادہ ہوتا ہے، اکثر نمایاں طور پر۔ طریقۂ کار کا صفحہ ہر مرحلہ بیان کرتا ہے۔",
      hi: "इस साइट का हर आँकड़ा व्युत्पन्न है: धातु का अंतरराष्ट्रीय स्पॉट भाव, बाज़ार विनिमय दर पर बदला और दिखाए गए कैरेट व वज़न पर विभाजित। यह एक संदर्भ मूल्य है, प्रस्ताव नहीं। आपके शहर का जौहरी मजदूरी, वैट और खुदरा मार्जिन जोड़ता है, इसलिए काउंटर पर आप जो चुकाते हैं वह सामान्यतः अधिक होता है, अक्सर काफ़ी। कार्यप्रणाली पेज हर चरण बताता है।",
    },
  },
  {
    h: {
      en: "No financial advice",
      ar: "لا نقدّم نصيحة مالية",
      fr: "Aucun conseil financier",
      tr: "Finansal tavsiye değildir",
      ur: "مالی مشورہ نہیں",
      hi: "कोई वित्तीय सलाह नहीं",
    },
    body: {
      en: "Nothing here is a recommendation to buy, sell or hold anything. We are not licensed advisers, we do not know your circumstances, and no chart or article should be read as a signal. Gold falls as well as rises. Decisions about your money are yours, and worth taking to a licensed professional in your own country first.",
      ar: "لا شيء هنا يُعد توصية بشراء أو بيع أو الاحتفاظ بأي شيء. لسنا مستشارين مرخّصين، ولا نعرف ظروفك، ولا ينبغي قراءة أي رسم بياني أو مقال على أنه إشارة. الذهب ينخفض كما يرتفع. القرارات المتعلقة بأموالك قرارك أنت، ويجدر عرضها أولاً على مختص مرخّص في بلدك.",
      fr: "Rien ici n'est une recommandation d'achat, de vente ou de conservation. Nous ne sommes pas conseillers agréés, nous ignorons votre situation, et aucun graphique ni article ne doit être lu comme un signal. L'or baisse autant qu'il monte. Les décisions concernant votre argent vous appartiennent : consultez d'abord un professionnel agréé dans votre pays.",
      tr: "Buradaki hiçbir şey alım, satım veya elde tutma tavsiyesi değildir. Lisanslı danışman değiliz, koşullarınızı bilmiyoruz ve hiçbir grafik ya da yazı sinyal olarak okunmamalıdır. Altın yükseldiği kadar düşer de. Paranızla ilgili kararlar sizindir; önce kendi ülkenizde lisanslı bir uzmana danışın.",
      ur: "یہاں کچھ بھی خریدنے، بیچنے یا رکھنے کی سفارش نہیں۔ ہم لائسنس یافتہ مشیر نہیں، آپ کے حالات نہیں جانتے، اور کسی چارٹ یا مضمون کو اشارہ نہ سمجھا جائے۔ سونا بڑھتا بھی ہے اور گرتا بھی۔ آپ کے پیسے کے فیصلے آپ کے ہیں؛ پہلے اپنے ملک کے لائسنس یافتہ ماہر سے مشورہ کریں۔",
      hi: "यहाँ कुछ भी ख़रीदने, बेचने या रखने की सिफ़ारिश नहीं है। हम लाइसेंसधारी सलाहकार नहीं हैं, आपकी परिस्थिति नहीं जानते, और किसी चार्ट या लेख को संकेत न समझें। सोना चढ़ता है तो गिरता भी है। आपके पैसे के निर्णय आपके हैं; पहले अपने देश के लाइसेंसधारी पेशेवर से सलाह लें।",
    },
  },
  {
    h: {
      en: "Accuracy and availability",
      ar: "الدقة وتوافر الخدمة",
      fr: "Exactitude et disponibilité",
      tr: "Doğruluk ve erişilebilirlik",
      ur: "درستگی اور دستیابی",
      hi: "सटीकता और उपलब्धता",
    },
    body: {
      en: "We take the numbers seriously and correct errors quickly, but the data comes from third-party feeds that can lag, gap or fail, and the site itself may be offline for maintenance. Prices are provided as they are, with no warranty that they are current, complete or fit for any particular purpose. Verify with a dealer before acting on a figure.",
      ar: "نتعامل مع الأرقام بجدية ونصحح الأخطاء سريعاً، لكن البيانات تأتي من تغذيات أطراف ثالثة قد تتأخر أو تنقطع أو تتعطل، وقد يتوقف الموقع نفسه للصيانة. تُقدَّم الأسعار كما هي، دون ضمان أنها محدَّثة أو كاملة أو صالحة لغرض بعينه. تحقّق من تاجر قبل التصرف بناءً على أي رقم.",
      fr: "Nous prenons les chiffres au sérieux et corrigeons vite, mais les données viennent de flux tiers susceptibles de retards, de trous ou de pannes, et le site peut être indisponible pour maintenance. Les prix sont fournis en l'état, sans garantie d'actualité, d'exhaustivité ou d'adéquation à un usage particulier. Vérifiez auprès d'un négociant avant d'agir.",
      tr: "Rakamları ciddiye alır, hataları hızla düzeltiriz; ancak veriler gecikebilen, boşluk verebilen veya kesilebilen üçüncü taraf akışlarından gelir ve site bakım için kapanabilir. Fiyatlar olduğu gibi sunulur; güncel, eksiksiz veya belirli bir amaca uygun olduğuna dair garanti verilmez. Bir rakama göre işlem yapmadan önce bayiden doğrulayın.",
      ur: "ہم اعداد کو سنجیدگی سے لیتے ہیں اور غلطیاں جلد درست کرتے ہیں، مگر ڈیٹا تھرڈ پارٹی فیڈز سے آتا ہے جو تاخیر کا شکار، نامکمل یا بند ہو سکتی ہیں، اور سائٹ بھی مرمت کے لیے بند ہو سکتی ہے۔ قیمتیں جوں کی توں فراہم کی جاتی ہیں، اس ضمانت کے بغیر کہ وہ تازہ، مکمل یا کسی خاص مقصد کے لیے موزوں ہیں۔ کسی عدد پر عمل سے پہلے ڈیلر سے تصدیق کریں۔",
      hi: "हम आँकड़ों को गंभीरता से लेते हैं और ग़लतियाँ जल्दी सुधारते हैं, पर डेटा थर्ड-पार्टी फ़ीड से आता है जो पिछड़ सकती, टूट सकती या बंद हो सकती हैं, और साइट भी रखरखाव के लिए बंद हो सकती है। भाव जैसे हैं वैसे दिए जाते हैं, बिना इस गारंटी के कि वे ताज़ा, पूर्ण या किसी विशेष उद्देश्य के लिए उपयुक्त हैं। किसी आँकड़े पर कार्य करने से पहले डीलर से पुष्टि करें।",
    },
  },
  {
    h: {
      en: "Limits of liability",
      ar: "حدود المسؤولية",
      fr: "Limites de responsabilité",
      tr: "Sorumluluğun sınırları",
      ur: "ذمہ داری کی حدود",
      hi: "दायित्व की सीमाएँ",
    },
    body: {
      en: "To the fullest extent the law allows, we are not liable for losses arising from use of this site — including a trade made on a stale price, a missed opportunity, or a downstream error in a figure republished elsewhere. Nothing here limits liability for fraud or for anything that cannot lawfully be excluded.",
      ar: "إلى أقصى حد يسمح به القانون، لا نتحمل مسؤولية أي خسائر ناشئة عن استخدام هذا الموقع — بما في ذلك صفقة تمت بناءً على سعر قديم، أو فرصة فائتة، أو خطأ لاحق في رقم أُعيد نشره في مكان آخر. ولا يحدّ أي مما سبق المسؤولية عن الاحتيال أو عن أي أمر لا يجوز قانوناً استبعاده.",
      fr: "Dans toute la mesure permise par la loi, nous déclinons toute responsabilité pour les pertes découlant de l'usage du site — y compris une opération fondée sur un prix périmé, une occasion manquée ou une erreur en aval dans un chiffre repris ailleurs. Rien ici ne limite la responsabilité en cas de fraude ou pour ce qui ne peut légalement être exclu.",
      tr: "Yasanın izin verdiği azami ölçüde, bu sitenin kullanımından doğan zararlardan sorumlu değiliz — eski bir fiyatla yapılan işlem, kaçırılan fırsat veya başka yerde yeniden yayımlanan bir rakamdaki hata dâhil. Buradaki hiçbir ifade dolandırıcılık sorumluluğunu veya yasal olarak hariç tutulamayacak durumları sınırlamaz.",
      ur: "قانون کی اجازت کی حد تک، ہم اس سائٹ کے استعمال سے پیدا ہونے والے نقصانات کے ذمہ دار نہیں — بشمول پرانی قیمت پر کیا گیا سودا، ضائع ہونے والا موقع، یا کہیں اور دوبارہ شائع کیے گئے عدد میں بعد کی غلطی۔ یہاں کچھ بھی دھوکہ دہی کی ذمہ داری یا ان امور کو محدود نہیں کرتا جنہیں قانوناً خارج نہیں کیا جا سکتا۔",
      hi: "क़ानून जितनी अनुमति दे, हम इस साइट के उपयोग से हुए नुक़सान के लिए उत्तरदायी नहीं — इसमें पुराने भाव पर किया सौदा, चूका अवसर, या कहीं और पुनःप्रकाशित आँकड़े में बाद की ग़लती शामिल है। यहाँ कुछ भी धोखाधड़ी के दायित्व या उन बातों को सीमित नहीं करता जिन्हें क़ानूनन बाहर नहीं किया जा सकता।",
    },
  },
  {
    h: {
      en: "Using our content",
      ar: "استخدام محتوانا",
      fr: "Utiliser notre contenu",
      tr: "İçeriğimizin kullanımı",
      ur: "ہمارا مواد استعمال کرنا",
      hi: "हमारी सामग्री का उपयोग",
    },
    body: {
      en: "Quote a figure, a chart or a paragraph with a visible link back to the page it came from — that is welcome and needs no permission. Republishing whole tables, scraping the site at volume, or passing our data off as your own is not permitted. The free embeddable widgets are the supported way to put our prices on your own site.",
      ar: "اقتباس رقم أو رسم بياني أو فقرة مع رابط ظاهر يعود إلى الصفحة المأخوذ منها أمر مرحَّب به ولا يحتاج إذناً. أما إعادة نشر جداول كاملة أو سحب الموقع آلياً بكثافة أو تقديم بياناتنا على أنها بياناتك فغير مسموح. الأدوات المجانية القابلة للتضمين هي الطريقة المدعومة لعرض أسعارنا على موقعك.",
      fr: "Citer un chiffre, un graphique ou un paragraphe avec un lien visible vers la page d'origine est bienvenu et ne requiert aucune autorisation. Republier des tableaux entiers, aspirer le site en volume ou présenter nos données comme les vôtres n'est pas autorisé. Les widgets intégrables gratuits sont la voie prévue pour afficher nos cours sur votre site.",
      tr: "Bir rakamı, grafiği veya paragrafı, alındığı sayfaya görünür bir bağlantı vererek alıntılamak serbesttir ve izin gerektirmez. Tabloların tamamını yeniden yayımlamak, siteyi toplu şekilde kazımak veya verilerimizi kendinizinmiş gibi sunmak yasaktır. Ücretsiz gömülebilir bileşenler, fiyatlarımızı kendi sitenizde göstermenin desteklenen yoludur.",
      ur: "کسی عدد، چارٹ یا پیراگراف کو اس صفحے کے واضح لنک کے ساتھ نقل کرنا خوش آئند ہے اور اجازت درکار نہیں۔ مکمل جدول دوبارہ شائع کرنا، سائٹ کو بڑے پیمانے پر اسکریپ کرنا، یا ہمارے ڈیٹا کو اپنا ظاہر کرنا ممنوع ہے۔ مفت ایمبیڈ ویجٹس ہماری قیمتیں آپ کی سائٹ پر دکھانے کا معاون طریقہ ہیں۔",
      hi: "किसी आँकड़े, चार्ट या अनुच्छेद को उस पेज के दृश्य लिंक के साथ उद्धृत करना स्वागतयोग्य है और इसके लिए अनुमति नहीं चाहिए। पूरी तालिकाएँ पुनःप्रकाशित करना, साइट को थोक में स्क्रैप करना, या हमारे डेटा को अपना बताना अनुमत नहीं है। मुफ़्त एम्बेड विजेट हमारे भाव आपकी साइट पर दिखाने का समर्थित तरीक़ा हैं।",
    },
  },
  {
    h: {
      en: "Advertising and affiliate links",
      ar: "الإعلانات وروابط الشركاء",
      fr: "Publicité et liens d'affiliation",
      tr: "Reklamlar ve ortaklık bağlantıları",
      ur: "اشتہارات اور ایفیلی ایٹ لنکس",
      hi: "विज्ञापन और एफ़िलिएट लिंक",
    },
    body: {
      en: "The site is funded by advertising and by affiliate links, which may pay us a commission. That money never moves a published price and never buys editorial coverage — the rule is written into our editorial standards. Advertisers are third parties: what they offer, and any account you open with them, is between you and them.",
      ar: "يُموَّل الموقع عبر الإعلانات وروابط الشركاء التي قد تدرّ علينا عمولة. هذا المال لا يحرّك أبداً سعراً منشوراً ولا يشتري تغطية تحريرية — والقاعدة مكتوبة في معايير التحرير لدينا. المعلنون أطراف ثالثة: ما يعرضونه وأي حساب تفتحه لديهم شأن بينك وبينهم.",
      fr: "Le site est financé par la publicité et par des liens d'affiliation pouvant nous rémunérer. Cet argent ne modifie jamais un prix publié ni n'achète de couverture éditoriale — la règle figure dans notre charte. Les annonceurs sont des tiers : leurs offres et tout compte ouvert chez eux relèvent de vous et d'eux.",
      tr: "Site, reklam ve komisyon ödeyebilen ortaklık bağlantılarıyla finanse edilir. Bu para yayımlanmış bir fiyatı asla değiştirmez ve editoryal içerik satın almaz — kural editoryal standartlarımızda yazılıdır. Reklamverenler üçüncü taraftır: sundukları ve onlarda açtığınız hesap sizinle onlar arasındadır.",
      ur: "سائٹ اشتہارات اور ایفیلی ایٹ لنکس سے چلتی ہے، جن سے ہمیں کمیشن مل سکتا ہے۔ یہ رقم کبھی کسی شائع شدہ قیمت کو نہیں بدلتی اور نہ ادارتی کوریج خریدتی ہے — یہ اصول ہمارے ادارتی معیارات میں درج ہے۔ اشتہار دہندگان تھرڈ پارٹی ہیں: ان کی پیشکش اور ان کے ساتھ کھولا گیا کوئی بھی اکاؤنٹ آپ کے اور ان کے درمیان معاملہ ہے۔",
      hi: "साइट विज्ञापन और एफ़िलिएट लिंक से चलती है, जिनसे हमें कमीशन मिल सकता है। यह पैसा किसी प्रकाशित भाव को कभी नहीं बदलता और न संपादकीय कवरेज ख़रीदता है — यह नियम हमारे संपादकीय मानकों में लिखा है। विज्ञापनदाता तृतीय पक्ष हैं: उनकी पेशकश और उनके साथ खोला कोई खाता आपके और उनके बीच है।",
    },
  },
  {
    h: {
      en: "Changes, governing law and contact",
      ar: "التعديلات والقانون الحاكم والتواصل",
      fr: "Modifications, droit applicable et contact",
      tr: "Değişiklikler, geçerli hukuk ve iletişim",
      ur: "تبدیلیاں، قابلِ اطلاق قانون اور رابطہ",
      hi: "परिवर्तन, लागू क़ानून और संपर्क",
    },
    body: {
      en: `These terms may change; the revision date at the top always shows the current version, and continued use means acceptance. They are governed by the laws of the Hashemite Kingdom of Jordan, where the site is operated, without affecting any consumer right you hold under the law of your own country. Questions: ${SUPPORT_EMAIL}.`,
      ar: `قد تتغير هذه الشروط؛ ويوضح تاريخ المراجعة في الأعلى النسخة السارية دائماً، ويعني استمرار استخدامك قبولها. تخضع هذه الشروط لقوانين المملكة الأردنية الهاشمية حيث يُدار الموقع، دون المساس بأي حق للمستهلك تكفله لك قوانين بلدك. للاستفسار: ${SUPPORT_EMAIL}.`,
      fr: `Ces conditions peuvent évoluer ; la date de révision en haut indique toujours la version en vigueur, et poursuivre la navigation vaut acceptation. Elles sont régies par le droit du Royaume hachémite de Jordanie, où le site est exploité, sans porter atteinte aux droits que vous tenez du droit de la consommation de votre pays. Questions : ${SUPPORT_EMAIL}.`,
      tr: `Bu şartlar değişebilir; üstteki revizyon tarihi her zaman yürürlükteki sürümü gösterir ve kullanmaya devam etmek kabul anlamına gelir. Sitenin işletildiği Ürdün Haşimi Krallığı hukukuna tabidir; kendi ülkenizin tüketici hukukundan doğan haklarınız saklıdır. Sorular: ${SUPPORT_EMAIL}.`,
      ur: `یہ شرائط بدل سکتی ہیں؛ اوپر دی گئی نظرثانی کی تاریخ ہمیشہ موجودہ نسخہ ظاہر کرتی ہے، اور استعمال جاری رکھنا قبولیت ہے۔ یہ اردن ہاشمی مملکت کے قوانین کے تابع ہیں، جہاں سائٹ چلائی جاتی ہے، بغیر اس کے کہ آپ کے اپنے ملک کے صارف قوانین کے تحت حاصل حقوق متاثر ہوں۔ سوالات: ${SUPPORT_EMAIL}۔`,
      hi: `ये शर्तें बदल सकती हैं; ऊपर दी संशोधन तिथि हमेशा वर्तमान संस्करण दिखाती है, और उपयोग जारी रखना स्वीकृति है। ये जॉर्डन के हाशमी साम्राज्य के क़ानूनों के अधीन हैं, जहाँ साइट संचालित होती है, बिना आपके अपने देश के उपभोक्ता अधिकारों को प्रभावित किए। प्रश्न: ${SUPPORT_EMAIL}।`,
    },
  },
];

export const termsText = (locale: string) => ({
  title: pick(locale, TITLE),
  description: pick(locale, DESCRIPTION),
  intro: pick(locale, INTRO),
  sections: SECTIONS.map((s) => ({ h: pick(locale, s.h), body: pick(locale, s.body) })),
});
