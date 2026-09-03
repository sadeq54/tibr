import type { LocaleText } from "@/lib/i18n-text";

/**
 * Editorial copy explaining what each karat actually IS — the only body text
 * on `/[country]/gold-price/[karat]` that differs between the five karat
 * routes of a country.
 *
 * Why it was written: measured on production, `/saudi-arabia/gold-price/24k`
 * and `.../22k` shared 428 of 503 text lines, and every line that differed
 * was either a price or the same sentence with "24" swapped for "22" — 0%
 * unique prose across five indexable pages per country. The country
 * dimension already had hand-written commentary (`COUNTRY_NOTES`); the karat
 * dimension had none.
 *
 * Written in all six locales rather than the `{en, ar}` shape used elsewhere:
 * `pick()` falls back to English, so a two-locale object would have printed
 * three English paragraphs onto every Hindi, Urdu, Turkish and French page.
 * Mixed-language body copy is worse than no copy.
 *
 * Every claim is a stable property of the metal — millesimal fineness, alloy
 * behaviour, typical use — never a price or a tax rate, so it does not rot.
 */
export type KaratGuideEntry = {
  /** Millesimal fineness stamped inside the piece, e.g. "875". */
  hallmark: string;
  /** Purity as sold, e.g. "87.5%". */
  purity: string;
  /** Parts gold out of 24, e.g. "21/24". */
  parts: string;
  /** Three paragraphs: what it is, what it is for, what it is worth. */
  body: [LocaleText, LocaleText, LocaleText];
};

export const KARAT_GUIDE: Record<string, KaratGuideEntry> = {
  "24k": {
    hallmark: "999",
    purity: "99.9%",
    parts: "24/24",
    body: [
      {
        en: "24K is gold with nothing meaningful added — 99.9% pure, stamped 999 or 9999. With no hardening alloy in it, it is genuinely soft: a 24K ring bends against a door handle and scratches against a car key, which is why almost nowhere sells it as everyday jewellery.",
        ar: "عيار 24 هو ذهب بلا إضافات تُذكر — نقاء 99.9%، ويُختم بـ999 أو 9999. ولأنه خالٍ من السبيكة التي تمنحه الصلابة فهو ليّن فعلًا: خاتم من عيار 24 ينثني عند مقبض الباب ويُخدش بمفتاح السيارة، ولهذا لا يكاد يُباع في أي مكان كحلي للاستعمال اليومي.",
        fr: "L'or 24 carats ne contient rien d'autre — 99,9 % pur, poinçonné 999 ou 9999. Sans alliage durcissant, il est réellement mou : une bague 24 carats se déforme contre une poignée de porte et se raye contre une clé de voiture, ce qui explique qu'on ne le vende presque nulle part en bijouterie quotidienne.",
        tr: "24 ayar, kayda değer hiçbir katkı içermeyen altındır — %99,9 saf, 999 veya 9999 damgalı. Sertleştirici alaşım içermediği için gerçekten yumuşaktır: 24 ayar bir yüzük kapı koluna değince eğilir, araba anahtarına sürtününce çizilir. Bu yüzden neredeyse hiçbir yerde günlük takı olarak satılmaz.",
        ur: "24 قیراط وہ سونا ہے جس میں کوئی قابلِ ذکر آمیزش نہیں — 99.9% خالص، اس پر 999 یا 9999 کی مہر ہوتی ہے۔ سختی دینے والی مصر دھات نہ ہونے کے سبب یہ واقعی نرم ہے: 24 قیراط کی انگوٹھی دروازے کے ہینڈل سے مڑ جاتی اور گاڑی کی چابی سے کھرچ جاتی ہے، اسی لیے یہ تقریباً کہیں بھی روزمرہ زیور کے طور پر نہیں بکتا۔",
        hi: "24 कैरेट वह सोना है जिसमें उल्लेखनीय कुछ भी मिला नहीं होता — 99.9% शुद्ध, जिस पर 999 या 9999 की मुहर होती है। कठोरता देने वाली मिश्र धातु न होने से यह वास्तव में नरम है: 24 कैरेट की अंगूठी दरवाज़े के हैंडल से मुड़ जाती है और गाड़ी की चाबी से खरोंच खा जाती है, इसीलिए इसे लगभग कहीं भी रोज़मर्रा के गहने के रूप में नहीं बेचा जाता।",
      },
      {
        en: "Its real home is investment: bars, minted coins and the heavy chains some families buy by weight as savings rather than as ornament. Buying 24K, you are buying metal — the only two numbers that matter are the weight in grams and the premium the dealer adds over spot.",
        ar: "موضعه الحقيقي هو الاستثمار: السبائك والعملات المسكوكة والسلاسل الثقيلة التي تشتريها بعض العائلات بالوزن ادخارًا لا زينة. حين تشتري عيار 24 فأنت تشتري معدنًا، والرقمان الوحيدان المهمان هما الوزن بالجرام والعلاوة التي يضيفها التاجر فوق السعر الفوري.",
        fr: "Sa vraie place est l'investissement : lingots, pièces frappées et ces chaînes lourdes que certaines familles achètent au poids comme épargne plutôt que comme parure. En achetant du 24 carats, vous achetez du métal — seuls comptent le poids en grammes et la prime que le négociant ajoute au cours spot.",
        tr: "Asıl yeri yatırımdır: külçeler, basılmış sikkeler ve bazı ailelerin süs olarak değil birikim olarak gramla aldığı ağır zincirler. 24 ayar alırken metal satın alıyorsunuz — önemli olan yalnızca gram cinsinden ağırlık ve satıcının spot fiyatın üzerine koyduğu primdir.",
        ur: "اس کا اصل مقام سرمایہ کاری ہے: بسکٹ، ڈھالے گئے سکے اور وہ بھاری زنجیریں جو بعض خاندان زیور کے بجائے بچت کے طور پر وزن سے خریدتے ہیں۔ 24 قیراط خریدتے وقت آپ دھات خرید رہے ہیں — اہم صرف دو عدد ہیں: گرام میں وزن اور وہ پریمیم جو ڈیلر سپاٹ قیمت پر بڑھاتا ہے۔",
        hi: "इसका असली स्थान निवेश है: बार, ढाले गए सिक्के और वे भारी चेनें जिन्हें कुछ परिवार आभूषण के बजाय बचत के रूप में वज़न से खरीदते हैं। 24 कैरेट खरीदते समय आप धातु खरीद रहे हैं — मायने केवल दो अंक रखते हैं: ग्राम में वज़न और वह प्रीमियम जो विक्रेता स्पॉट भाव के ऊपर जोड़ता है।",
      },
      {
        en: "That purity also makes it the easiest karat to resell. A bar from a recognised refiner with its assay intact trades close to spot anywhere in the world, while jewellery of any karat is bought back on gold content alone — the craftsmanship you paid for is not part of the offer.",
        ar: "وهذا النقاء يجعله أسهل العيارات في إعادة البيع. فالسبيكة الصادرة عن مصفاة معروفة بشهادتها سليمة تُتداول قريبًا من السعر الفوري في أي مكان بالعالم، بينما تُشترى الحلي بأي عيار على أساس محتواها من الذهب وحده — أما المصنعية التي دفعتها فليست جزءًا من العرض.",
        fr: "Cette pureté en fait aussi le carat le plus facile à revendre. Un lingot d'un affineur reconnu, essai intact, se négocie près du spot partout dans le monde, tandis qu'un bijou, quel que soit son carat, est repris sur son seul contenu en or — la façon que vous avez payée ne fait pas partie de l'offre.",
        tr: "Bu saflık onu satması en kolay ayar da yapar. Tanınmış bir rafineriden çıkmış, ayar belgesi bozulmamış bir külçe dünyanın her yerinde spota yakın işlem görür; oysa hangi ayarda olursa olsun takı yalnızca altın içeriği üzerinden geri alınır — ödediğiniz işçilik teklifin parçası değildir.",
        ur: "یہی خالص پن اسے دوبارہ بیچنے میں سب سے آسان عیار بھی بناتا ہے۔ کسی معروف ریفائنری کا بسکٹ، جس کی سند سلامت ہو، دنیا میں کہیں بھی سپاٹ کے قریب بکتا ہے، جبکہ کسی بھی عیار کا زیور صرف اس کے سونے کے مواد پر واپس خریدا جاتا ہے — جو بنوائی آپ نے دی وہ پیشکش کا حصہ نہیں۔",
        hi: "यही शुद्धता इसे दोबारा बेचने में सबसे आसान कैरेट भी बनाती है। किसी मान्यता प्राप्त रिफ़ाइनरी का बार, जिसका परख प्रमाण सुरक्षित हो, दुनिया में कहीं भी स्पॉट के पास बिकता है, जबकि किसी भी कैरेट का गहना केवल उसकी सोने की मात्रा पर वापस खरीदा जाता है — जो मज़दूरी आपने चुकाई वह प्रस्ताव का हिस्सा नहीं होती।",
      },
    ],
  },
  "22k": {
    hallmark: "916",
    purity: "91.7%",
    parts: "22/24",
    body: [
      {
        en: "22K is 91.7% gold — twenty-two parts gold to two parts alloy, stamped 916. That small amount of copper and silver is enough to hold a shape without dulling the deep yellow that buyers in South Asia and the Gulf associate with real gold.",
        ar: "عيار 22 ذهب بنسبة 91.7% — اثنان وعشرون جزءًا ذهبًا مقابل جزأين من السبيكة، ويُختم بـ916. وتلك الكمية الصغيرة من النحاس والفضة تكفي لتثبيت الشكل دون أن تُطفئ الصفرة العميقة التي يربطها المشترون في جنوب آسيا والخليج بالذهب الحقيقي.",
        fr: "L'or 22 carats est pur à 91,7 % — vingt-deux parts d'or pour deux d'alliage, poinçonné 916. Cette petite quantité de cuivre et d'argent suffit à tenir une forme sans ternir le jaune profond que les acheteurs d'Asie du Sud et du Golfe associent à l'or véritable.",
        tr: "22 ayar %91,7 altındır — yirmi iki pay altına iki pay alaşım, 916 damgalı. Bu az miktardaki bakır ve gümüş, formu korumaya yeter ama Güney Asya ve Körfez alıcılarının gerçek altınla özdeşleştirdiği koyu sarıyı soldurmaz.",
        ur: "22 قیراط 91.7% سونا ہے — بائیس حصے سونا اور دو حصے مصر دھات، مہر 916۔ تانبے اور چاندی کی یہ تھوڑی مقدار شکل قائم رکھنے کو کافی ہے مگر اس گہرے زرد رنگ کو مدھم نہیں کرتی جسے جنوبی ایشیا اور خلیج کے خریدار اصل سونے سے جوڑتے ہیں۔",
        hi: "22 कैरेट 91.7% सोना है — बाईस भाग सोना और दो भाग मिश्र धातु, मुहर 916। तांबे और चांदी की यह थोड़ी मात्रा आकार बनाए रखने के लिए पर्याप्त है पर उस गहरे पीले रंग को फीका नहीं करती जिसे दक्षिण एशिया और खाड़ी के खरीदार असली सोने से जोड़ते हैं।",
      },
      {
        en: "It is the wedding-and-inheritance karat: bangles, heavy necklaces and the sets given at marriage, bought as much for the weight they hold as for the design. India in particular prices most of its jewellery trade at 916, and the hallmark is checked as routine.",
        ar: "وهو عيار الأعراس والميراث: الأساور والقلائد الثقيلة والأطقم التي تُهدى عند الزواج، وتُشترى لأجل ما تحمله من وزن بقدر ما تُشترى لأجل تصميمها. والهند خاصة تُسعّر معظم تجارة حليّها على أساس 916، ويُتحقق من الختم بوصفه أمرًا معتادًا.",
        fr: "C'est le carat des mariages et des héritages : bracelets, colliers lourds et parures offertes lors des noces, achetés autant pour le poids qu'ils portent que pour leur dessin. L'Inde en particulier cote l'essentiel de sa bijouterie en 916, et le poinçon y est vérifié par habitude.",
        tr: "Düğün ve miras ayarıdır: bilezikler, ağır kolyeler ve nikâhta verilen takımlar; tasarımı kadar taşıdıkları ağırlık için de alınır. Özellikle Hindistan takı ticaretinin çoğunu 916 üzerinden fiyatlar ve damga rutin olarak denetlenir.",
        ur: "یہ شادی اور وراثت کا عیار ہے: کنگن، بھاری ہار اور شادی پر دیے جانے والے سیٹ، جو ڈیزائن کے ساتھ ساتھ اپنے وزن کے لیے بھی خریدے جاتے ہیں۔ خاص طور پر بھارت اپنی زیورات کی تجارت کا بیشتر حصہ 916 پر قیمت لگاتا ہے اور مہر کی جانچ معمول کی بات ہے۔",
        hi: "यह विवाह और विरासत का कैरेट है: कंगन, भारी हार और शादी में दिए जाने वाले सेट, जो डिज़ाइन जितना ही अपने वज़न के लिए भी खरीदे जाते हैं। विशेष रूप से भारत अपने आभूषण व्यापार का अधिकांश हिस्सा 916 पर आंकता है, और हॉलमार्क की जांच सामान्य बात है।",
      },
      {
        en: "The trade-off is durability. 22K still marks more easily than 18K, so it suits pieces worn on occasions rather than rings worn daily through washing-up and work — which is why the same shop will sell you a 22K necklace and an 18K ring without contradiction.",
        ar: "والمقابل هو المتانة. فعيار 22 لا يزال يتأثر أسرع من عيار 18، لذا يناسب القطع التي تُلبس في المناسبات لا الخواتم التي تُلبس يوميًا بين غسيل الصحون والعمل — ولهذا قد يبيعك المحل نفسه قلادة عيار 22 وخاتمًا عيار 18 دون تناقض.",
        fr: "La contrepartie est la résistance. Le 22 carats se marque encore plus facilement que le 18, il convient donc aux pièces portées en occasion plutôt qu'aux bagues portées chaque jour entre la vaisselle et le travail — d'où le fait qu'une même boutique vous vende un collier 22 et une bague 18 sans se contredire.",
        tr: "Bedeli dayanıklılıktır. 22 ayar hâlâ 18 ayardan daha kolay iz alır; bu yüzden bulaşık ve iş arasında her gün takılan yüzüklerden çok, özel günlerde takılan parçalara uygundur — aynı dükkânın size 22 ayar kolye ile 18 ayar yüzük satmasında çelişki yoktur.",
        ur: "اس کی قیمت پائیداری ہے۔ 22 قیراط اب بھی 18 قیراط سے جلد نشان لے لیتا ہے، اس لیے یہ روزانہ برتن دھوتے اور کام کرتے پہنی جانے والی انگوٹھیوں کے بجائے مواقع پر پہنے جانے والے زیور کے لیے موزوں ہے — یہی سبب ہے کہ ایک ہی دکان آپ کو 22 قیراط کا ہار اور 18 قیراط کی انگوٹھی بغیر تضاد کے بیچتی ہے۔",
        hi: "इसकी कीमत टिकाऊपन है। 22 कैरेट अब भी 18 कैरेट से जल्दी निशान ले लेता है, इसलिए यह रोज़ बर्तन धोते और काम करते पहनी जाने वाली अंगूठियों के बजाय अवसरों पर पहने जाने वाले गहनों के लिए उपयुक्त है — यही कारण है कि एक ही दुकान आपको 22 कैरेट का हार और 18 कैरेट की अंगूठी बिना विरोधाभास के बेचती है।",
      },
    ],
  },
  "21k": {
    hallmark: "875",
    purity: "87.5%",
    parts: "21/24",
    body: [
      {
        en: "21K is 87.5% gold, stamped 875, and it is the Middle East's own standard — uncommon in Europe or America, dominant from Cairo to Kuwait. The extra alloy over 22K buys enough hardness for daily wear while keeping the warm yellow that reads as gold rather than as pale metal.",
        ar: "عيار 21 ذهب بنسبة 87.5% ويُختم بـ875، وهو معيار الشرق الأوسط الخاص — نادر في أوروبا وأمريكا، سائد من القاهرة إلى الكويت. والزيادة في السبيكة عن عيار 22 تشتري صلابة تكفي للاستعمال اليومي مع الحفاظ على الصفرة الدافئة التي تُقرأ ذهبًا لا معدنًا شاحبًا.",
        fr: "L'or 21 carats titre 87,5 %, poinçonné 875, et c'est le standard propre au Moyen-Orient — rare en Europe ou en Amérique, dominant du Caire au Koweït. Le supplément d'alliage par rapport au 22 achète une dureté suffisante pour le port quotidien tout en gardant le jaune chaud qui se lit comme de l'or, non comme un métal pâle.",
        tr: "21 ayar %87,5 altındır, 875 damgalıdır ve Orta Doğu'nun kendi standardıdır — Avrupa ya da Amerika'da seyrek, Kahire'den Kuveyt'e egemen. 22 ayara göre fazladan alaşım, günlük kullanıma yetecek sertliği verirken solgun bir metal değil altın olarak okunan sıcak sarıyı korur.",
        ur: "21 قیراط 87.5% سونا ہے، مہر 875، اور یہ مشرقِ وسطیٰ کا اپنا معیار ہے — یورپ یا امریکہ میں کم یاب، قاہرہ سے کویت تک غالب۔ 22 قیراط کے مقابلے اضافی مصر دھات روزمرہ پہننے کے لیے کافی سختی دیتی ہے اور وہ گرم زرد رنگ بھی برقرار رکھتی ہے جو پھیکی دھات نہیں بلکہ سونا محسوس ہوتا ہے۔",
        hi: "21 कैरेट 87.5% सोना है, मुहर 875, और यह मध्य पूर्व का अपना मानक है — यूरोप या अमेरिका में कम, काहिरा से कुवैत तक प्रमुख। 22 कैरेट की तुलना में अतिरिक्त मिश्र धातु रोज़ पहनने लायक कठोरता देती है और वह गर्म पीला रंग भी बनाए रखती है जो फीकी धातु नहीं बल्कि सोना लगता है।",
      },
      {
        en: "It is the karat most Arab jewellers quote first, and the one most likely to be in the window with a per-gram price on a card. If you are comparing shops in this region, comparing their 21K gram price is the closest thing to a like-for-like test, because nearly all of them carry it.",
        ar: "وهو العيار الذي يذكره معظم الصاغة العرب أولًا، والأرجح وجودًا في الواجهة بسعر للجرام على بطاقة. وإذا كنت تقارن بين المحلات في هذه المنطقة فمقارنة سعر جرام عيار 21 لديها أقرب ما يكون إلى اختبار متكافئ، لأن جميعها تقريبًا يحمله.",
        fr: "C'est le carat que la plupart des bijoutiers arabes citent en premier, et le plus susceptible d'être en vitrine avec un prix au gramme sur une carte. Pour comparer des boutiques dans la région, comparer leur prix du gramme en 21 carats est ce qui se rapproche le plus d'un test équivalent, car presque toutes en proposent.",
        tr: "Arap kuyumcuların çoğunun ilk söylediği ayardır ve vitrinde gram fiyatı kartla durma ihtimali en yüksek olandır. Bu bölgede dükkân karşılaştırıyorsanız, 21 ayar gram fiyatını karşılaştırmak eşdeğer bir teste en yakın şeydir, çünkü neredeyse hepsinde bulunur.",
        ur: "یہ وہ عیار ہے جسے بیشتر عرب سنار پہلے بتاتے ہیں، اور جس کے شوکیس میں فی گرام قیمت کے کارڈ کے ساتھ ہونے کا امکان سب سے زیادہ ہے۔ اگر آپ اس خطے میں دکانوں کا موازنہ کر رہے ہیں تو ان کے 21 قیراط کے گرام کی قیمت کا موازنہ برابری کی جانچ کے سب سے قریب ہے، کیونکہ تقریباً سب کے پاس یہ موجود ہے۔",
        hi: "यह वह कैरेट है जिसे अधिकांश अरब सुनार सबसे पहले बताते हैं, और जिसके शोकेस में प्रति ग्राम भाव के कार्ड के साथ होने की संभावना सबसे अधिक है। यदि आप इस क्षेत्र में दुकानों की तुलना कर रहे हैं तो उनके 21 कैरेट के ग्राम भाव की तुलना समान-से-समान परीक्षण के सबसे निकट है, क्योंकि लगभग सभी के पास यह होता है।",
      },
      {
        en: "Because it is the regional default, it also has the deepest resale market here: a 21K piece sold back in Amman, Riyadh or Cairo is priced against a number the shop quotes every morning, with no need to convert from a standard the local trade does not use.",
        ar: "ولأنه العيار الافتراضي إقليميًا فهو أيضًا صاحب أعمق سوق لإعادة البيع هنا: فالقطعة من عيار 21 التي تُباع في عمّان أو الرياض أو القاهرة تُسعَّر مقابل رقم يذكره المحل كل صباح، دون حاجة إلى التحويل من معيار لا تستعمله التجارة المحلية.",
        fr: "Parce qu'il est la norme régionale, il a aussi ici le marché de revente le plus profond : une pièce en 21 carats revendue à Amman, Riyad ou Le Caire est évaluée face à un chiffre que la boutique annonce chaque matin, sans conversion depuis un standard que le commerce local n'emploie pas.",
        tr: "Bölgesel varsayılan olduğu için burada en derin ikinci el pazarına da sahiptir: Amman, Riyad ya da Kahire'de geri satılan 21 ayar bir parça, dükkânın her sabah verdiği bir rakama karşı fiyatlanır; yerel ticaretin kullanmadığı bir standarttan çevirmeye gerek kalmaz.",
        ur: "چونکہ یہ علاقائی طور پر طے شدہ عیار ہے، اس لیے یہاں اس کی دوبارہ فروخت کی منڈی بھی سب سے گہری ہے: عمان، ریاض یا قاہرہ میں واپس بیچی جانے والی 21 قیراط کی چیز اُس عدد کے مقابلے میں قیمت پاتی ہے جو دکان ہر صبح بتاتی ہے، اور کسی ایسے معیار سے تبدیلی کی ضرورت نہیں پڑتی جو مقامی تجارت استعمال ہی نہیں کرتی۔",
        hi: "क्योंकि यह क्षेत्रीय मानक है, यहां इसका पुनर्विक्रय बाज़ार भी सबसे गहरा है: अम्मान, रियाद या काहिरा में वापस बेची गई 21 कैरेट की वस्तु उस अंक के सामने आंकी जाती है जो दुकान हर सुबह बताती है, और ऐसे मानक से रूपांतरण की ज़रूरत नहीं पड़ती जिसे स्थानीय व्यापार इस्तेमाल ही नहीं करता।",
      },
    ],
  },
  "18k": {
    hallmark: "750",
    purity: "75%",
    parts: "18/24",
    body: [
      {
        en: "18K is three-quarters gold, stamped 750, and it is the international standard for fine jewellery — what most European and designer houses work in. A quarter of the metal is alloy, making it noticeably harder than 21K or 22K and far better at holding a polished edge.",
        ar: "عيار 18 ثلاثة أرباعه ذهب، ويُختم بـ750، وهو المعيار الدولي للمجوهرات الراقية — وما تعمل به معظم البيوت الأوروبية ودور التصميم. وربع المعدن سبيكة، ما يجعله أصلب بوضوح من عيار 21 أو 22 وأقدر بكثير على حفظ حافته المصقولة.",
        fr: "L'or 18 carats est aux trois quarts de l'or, poinçonné 750, et c'est le standard international de la joaillerie — celui dans lequel travaillent la plupart des maisons européennes et de création. Un quart du métal est de l'alliage, ce qui le rend nettement plus dur que le 21 ou le 22 et bien meilleur pour tenir un poli.",
        tr: "18 ayar dörtte üç altındır, 750 damgalıdır ve kuyumculukta uluslararası standarttır — Avrupa ve tasarım evlerinin çoğunun çalıştığı ayar. Metalin dörtte biri alaşımdır; bu da onu 21 ya da 22 ayardan belirgin biçimde sertleştirir ve parlak yüzeyi tutmakta çok daha başarılı kılar.",
        ur: "18 قیراط تین چوتھائی سونا ہے، مہر 750، اور یہ عمدہ زیورات کا بین الاقوامی معیار ہے — وہی جس میں یورپ کے بیشتر اور ڈیزائنر ادارے کام کرتے ہیں۔ دھات کا ایک چوتھائی حصہ مصر دھات ہے، جو اسے 21 یا 22 قیراط سے نمایاں طور پر سخت اور چمکدار سطح برقرار رکھنے میں کہیں بہتر بناتا ہے۔",
        hi: "18 कैरेट तीन-चौथाई सोना है, मुहर 750, और यह उत्कृष्ट आभूषणों का अंतरराष्ट्रीय मानक है — वही जिसमें यूरोप के अधिकांश और डिज़ाइनर घराने काम करते हैं। धातु का एक-चौथाई भाग मिश्र धातु है, जो इसे 21 या 22 कैरेट से स्पष्ट रूप से कठोर और पॉलिश टिकाए रखने में कहीं बेहतर बनाता है।",
      },
      {
        en: "That hardness is why gem-set pieces are usually 18K: prongs holding a diamond have to stay where they were bent, and softer gold lets stones work loose. It is also the karat that carries colour — a copper-heavy mix gives rose gold, palladium or nickel gives white gold.",
        ar: "وتلك الصلابة هي سبب كون القطع المرصّعة بالأحجار من عيار 18 عادة: فالمخالب التي تمسك ماسة يجب أن تبقى حيث ثُنيت، والذهب الأليَن يترك الأحجار تتراخى. وهو أيضًا العيار الذي يحمل اللون — فالخلطة الغنية بالنحاس تعطي الذهب الوردي، والبلاديوم أو النيكل يعطي الذهب الأبيض.",
        fr: "Cette dureté explique que les pièces serties soient généralement en 18 carats : les griffes qui tiennent un diamant doivent rester où on les a pliées, et un or plus mou laisse les pierres se desceller. C'est aussi le carat qui porte la couleur — un alliage riche en cuivre donne l'or rose, le palladium ou le nickel l'or blanc.",
        tr: "Bu sertlik, taşlı parçaların genelde 18 ayar olmasının nedenidir: pırlantayı tutan tırnaklar büküldükleri yerde kalmalıdır, daha yumuşak altın taşların gevşemesine izin verir. Renk taşıyan ayar da budur — bakırca zengin karışım pembe altını, paladyum ya da nikel beyaz altını verir.",
        ur: "یہی سختی وجہ ہے کہ نگینے جڑی چیزیں عموماً 18 قیراط کی ہوتی ہیں: ہیرے کو تھامنے والے پنجے وہیں رہنے چاہئیں جہاں موڑے گئے، اور نرم سونا نگوں کو ڈھیلا ہونے دیتا ہے۔ یہی وہ عیار بھی ہے جو رنگ اٹھاتا ہے — تانبے سے بھرپور آمیزہ گلابی سونا دیتا ہے، اور پیلیڈیم یا نکل سفید سونا۔",
        hi: "यही कठोरता कारण है कि नग जड़े गहने आमतौर पर 18 कैरेट के होते हैं: हीरे को थामने वाले पंजों को वहीं रहना चाहिए जहां वे मोड़े गए, और नरम सोना नगों को ढीला होने देता है। यही वह कैरेट भी है जो रंग धारण करता है — तांबे से भरपूर मिश्रण गुलाबी सोना देता है, पैलेडियम या निकल सफ़ेद सोना।",
      },
      {
        en: "Priced per gram it looks cheaper than 21K, but that is arithmetic, not a discount: you are buying a quarter less gold. Sold back, the shop pays on 75% of the weight — so compare 18K against 21K by gold content, never by the sticker.",
        ar: "وبسعر الجرام يبدو أرخص من عيار 21، لكن ذلك حساب لا حسم: فأنت تشتري ذهبًا أقل بالربع. وعند إعادة بيعه يدفع المحل على 75% من الوزن، لذا قارن عيار 18 بعيار 21 على أساس محتوى الذهب لا على أساس السعر المعلن.",
        fr: "Au prix du gramme il paraît moins cher que le 21 carats, mais c'est de l'arithmétique, pas une remise : vous achetez un quart d'or en moins. À la revente, la boutique paie sur 75 % du poids — comparez donc le 18 au 21 par le contenu en or, jamais par l'étiquette.",
        tr: "Gram fiyatıyla 21 ayardan ucuz görünür, ama bu bir indirim değil aritmetiktir: dörtte bir daha az altın alıyorsunuz. Geri satarken dükkân ağırlığın %75'i üzerinden öder — 18 ayarı 21 ayarla altın içeriğine göre karşılaştırın, etikete göre asla.",
        ur: "فی گرام قیمت میں یہ 21 قیراط سے سستا لگتا ہے، مگر یہ حساب ہے رعایت نہیں: آپ ایک چوتھائی کم سونا خرید رہے ہیں۔ واپس بیچتے وقت دکان وزن کے 75% پر ادائیگی کرتی ہے — لہٰذا 18 کا 21 سے موازنہ سونے کے مواد پر کریں، قیمت کی پرچی پر ہرگز نہیں۔",
        hi: "प्रति ग्राम भाव में यह 21 कैरेट से सस्ता लगता है, पर यह गणित है छूट नहीं: आप एक-चौथाई कम सोना खरीद रहे हैं। वापस बेचने पर दुकान वज़न के 75% पर भुगतान करती है — इसलिए 18 की तुलना 21 से सोने की मात्रा पर करें, कीमत की पर्ची पर कभी नहीं।",
      },
    ],
  },
  "14k": {
    hallmark: "585",
    purity: "58.3%",
    parts: "14/24",
    body: [
      {
        en: "14K is 58.3% gold, stamped 585 — a little over half the metal by weight. It is the workhorse karat of the United States and much of Eastern Europe, chosen for exactly the reason the Gulf tends to avoid it: hard, cheap to make in volume, and very difficult to damage.",
        ar: "عيار 14 ذهب بنسبة 58.3% ويُختم بـ585 — أي ما يزيد قليلًا عن نصف المعدن وزنًا. وهو عيار الشغل في الولايات المتحدة وكثير من أوروبا الشرقية، ويُختار للسبب نفسه الذي يجعل الخليج يتجنبه غالبًا: فهو صلب، ورخيص التصنيع بكميات، وعصيّ جدًا على التلف.",
        fr: "L'or 14 carats titre 58,3 %, poinçonné 585 — un peu plus de la moitié du métal en poids. C'est le carat de labeur des États-Unis et d'une grande partie de l'Europe de l'Est, choisi précisément pour la raison qui fait que le Golfe l'évite : dur, bon marché à produire en série, et très difficile à abîmer.",
        tr: "14 ayar %58,3 altındır, 585 damgalıdır — ağırlıkça metalin yarısından biraz fazlası. ABD'nin ve Doğu Avrupa'nın büyük bölümünün iş gören ayarıdır ve tam da Körfez'in ondan kaçınma nedeniyle seçilir: sert, seri üretimde ucuz ve zarar görmesi çok zor.",
        ur: "14 قیراط 58.3% سونا ہے، مہر 585 — وزن کے لحاظ سے دھات کے نصف سے کچھ زیادہ۔ یہ امریکہ اور مشرقی یورپ کے بیشتر حصے کا کام چلاؤ عیار ہے، اور بالکل اُسی سبب سے چنا جاتا ہے جس سبب خلیج اس سے گریز کرتا ہے: سخت، بڑی مقدار میں بنانے میں سستا، اور نقصان پہنچانا بہت مشکل۔",
        hi: "14 कैरेट 58.3% सोना है, मुहर 585 — वज़न के हिसाब से धातु का आधे से कुछ अधिक। यह अमेरिका और पूर्वी यूरोप के अधिकांश हिस्से का कामकाजी कैरेट है, और ठीक उसी कारण चुना जाता है जिस कारण खाड़ी इससे बचती है: कठोर, बड़ी मात्रा में बनाने में सस्ता, और नुकसान पहुंचाना बहुत कठिन।",
      },
      {
        en: "Everyday wedding bands, men's rings and chains meant to be worn and forgotten are commonly 14K, because a piece that spends its life against a keyboard or a steering wheel survives better at 585 than at 875. The colour is paler, and next to a 21K piece the difference is visible.",
        ar: "وخواتم الزواج اليومية وخواتم الرجال والسلاسل التي يُقصد لبسها ونسيانها تكون عادة من عيار 14، لأن القطعة التي تقضي عمرها ملاصقة للوحة مفاتيح أو مقود سيارة تصمد بـ585 أفضل من صمودها بـ875. ولونه أشحب، وبجانب قطعة من عيار 21 يكون الفرق مرئيًا.",
        fr: "Les alliances du quotidien, les chevalières et les chaînes faites pour être portées et oubliées sont couramment en 14 carats, car une pièce qui passe sa vie contre un clavier ou un volant survit mieux en 585 qu'en 875. La couleur est plus pâle, et à côté d'une pièce en 21 carats la différence se voit.",
        tr: "Gündelik alyanslar, erkek yüzükleri ve takılıp unutulmak üzere yapılmış zincirler çoğunlukla 14 ayardır; çünkü ömrünü klavyeye ya da direksiyona sürterek geçiren bir parça 585'te 875'e göre daha iyi dayanır. Rengi daha soluktur ve 21 ayar bir parçanın yanında fark görünür.",
        ur: "روزمرہ کی شادی کی انگوٹھیاں، مردانہ انگوٹھیاں اور وہ زنجیریں جو پہن کر بھول جانے کے لیے بنتی ہیں عموماً 14 قیراط کی ہوتی ہیں، کیونکہ جو چیز اپنی عمر کی بورڈ یا اسٹیئرنگ سے رگڑ کھاتے گزارے وہ 585 پر 875 کی نسبت بہتر ٹکتی ہے۔ اس کا رنگ پھیکا ہے، اور 21 قیراط کی چیز کے پہلو میں فرق نظر آتا ہے۔",
        hi: "रोज़मर्रा की शादी की अंगूठियां, पुरुषों की अंगूठियां और वे चेनें जो पहनकर भूल जाने के लिए बनी हैं आमतौर पर 14 कैरेट की होती हैं, क्योंकि जो वस्तु अपना जीवन कीबोर्ड या स्टीयरिंग से रगड़ खाते बिताए वह 585 पर 875 की तुलना में बेहतर टिकती है। इसका रंग फीका है, और 21 कैरेट की वस्तु के बगल में अंतर दिखाई देता है।",
      },
      {
        en: "As a store of value it is the weakest of the five: more than 40% of what you carry is not gold, and shops that buy gold back in gold-standard markets often quote poorly for it or decline it, because the local trade is not set up to melt and re-refine it.",
        ar: "وكمخزن للقيمة فهو الأضعف بين العيارات الخمسة: فأكثر من 40% مما تحمله ليس ذهبًا، والمحلات التي تشتري الذهب في الأسواق ذات المعيار الذهبي كثيرًا ما تُسعّره بضعف أو ترفضه، لأن التجارة المحلية ليست مهيأة لصهره وإعادة تكريره.",
        fr: "Comme réserve de valeur, c'est le plus faible des cinq : plus de 40 % de ce que vous portez n'est pas de l'or, et les boutiques qui rachètent l'or sur les marchés à fort titrage le cotent souvent mal ou le refusent, car le commerce local n'est pas équipé pour le fondre et le raffiner à nouveau.",
        tr: "Değer saklama aracı olarak beşlinin en zayıfıdır: taşıdığınızın %40'tan fazlası altın değildir ve yüksek ayar geleneği olan pazarlarda altın alan dükkânlar ona çoğu zaman düşük fiyat verir ya da hiç almaz, çünkü yerel ticaret onu eritip yeniden rafine etmeye göre kurulmamıştır.",
        ur: "قدر محفوظ رکھنے کے اعتبار سے یہ پانچوں میں سب سے کمزور ہے: جو آپ اٹھائے ہوئے ہیں اس کا 40% سے زیادہ سونا نہیں، اور اونچے عیار والی منڈیوں میں سونا واپس خریدنے والی دکانیں اکثر اس کی کم قیمت لگاتی ہیں یا لینے سے انکار کرتی ہیں، کیونکہ مقامی تجارت اسے پگھلا کر دوبارہ صاف کرنے کے لیے بنی ہی نہیں۔",
        hi: "मूल्य संचय के रूप में यह पांचों में सबसे कमज़ोर है: आप जो पहने हैं उसका 40% से अधिक सोना नहीं है, और ऊंचे कैरेट वाले बाज़ारों में सोना वापस खरीदने वाली दुकानें अक्सर इसका कम भाव लगाती हैं या लेने से मना कर देती हैं, क्योंकि स्थानीय व्यापार इसे गलाकर दोबारा शुद्ध करने के लिए बना ही नहीं है।",
      },
    ],
  },
};
