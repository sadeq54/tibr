/**
 * Country-specific "How to buy gold" editorial blocks for the 4 MENA
 * focus markets (Saudi Arabia, UAE, Egypt, Morocco). Bilingual HTML
 * snippets injected into /buy-gold/[country] hub pages.
 *
 * Content kept short (~250-400 words per locale) and structured around
 * the buyer-journey questions Google surfaces in PAA boxes:
 *  - Where to buy?
 *  - What VAT/duties apply?
 *  - What karats dominate?
 *  - How to verify authenticity?
 *
 * vatAnswer is reused inside the FAQ schema on the same page to avoid
 * duplicating tax facts in two places.
 */

export type BuyGoldEditorial = {
  en: {
    heading: string;
    body: string;
    vatAnswer: string;
  };
  ar: {
    heading: string;
    body: string;
    vatAnswer: string;
  };
};

export const BUY_GOLD_EDITORIAL: Record<string, BuyGoldEditorial> = {
  "saudi-arabia": {
    en: {
      heading: "How to Buy Gold in Saudi Arabia",
      vatAnswer:
        "Saudi Arabia applies 15% VAT on gold jewellery (including making charges). Investment-grade bullion of ≥99.5% purity is VAT-exempt. Always request a tax invoice — VAT is collected by ZATCA (Zakat, Tax and Customs Authority) and the invoice is your legal proof.",
      body: `
<p><strong>Market overview.</strong> Saudi Arabia is the largest retail gold market in the Gulf. The dominant karat is 21K (87.5% purity), favoured for everyday jewellery; 18K is common in fine jewellery and 24K in investment bullion. Prices are quoted per gram in Saudi Riyal (SAR).</p>
<p><strong>Where to buy.</strong> Three main channels: (1) <strong>traditional gold souks</strong> (Souq Al-Qaisariah in Riyadh, Souq Al-Zal, gold districts in Jeddah's Al-Balad) — best for jewellery, lowest making charges, in-person verification; (2) <strong>retail jewellers in malls</strong> (L'azurde, Damas, Lazurde) — branded designs, higher premiums, return policies; (3) <strong>banks and authorized bullion dealers</strong> (Al Rajhi Bank, NCB Direct, Sbaik, Ounce.com.sa) — investment bars and coins, full documentation, LBMA-certified.</p>
<p><strong>Hallmarks &amp; verification.</strong> All gold sold in Saudi Arabia must carry a hallmark stamp issued by SASO (Saudi Standards Authority). Look for: karat (e.g. "21K"), purity (e.g. "875"), manufacturer mark, and SASO logo. For bullion, demand the LBMA Good Delivery certificate plus the refinery serial number (PAMP, Valcambi, Argor-Heraeus).</p>
<p><strong>VAT &amp; making charges.</strong> 15% VAT applies to jewellery and making charges (mostly added on the labour, not the gold itself). Investment bullion ≥99.5% is exempt. Making charges typically range from 5 SAR/gram (simple bands) to 30+ SAR/gram (intricate designs, Arabic calligraphy).</p>
<p><strong>Negotiation tip.</strong> The spot gold price displayed above is your floor. Calculate fair retail price as: <em>(spot × purity ÷ 31.1035 × SAR rate) + VAT + making</em>. Anything significantly above this range is worth negotiating, especially in the traditional souks where margins are flexible.</p>
`,
    },
    ar: {
      heading: "كيفية شراء الذهب في المملكة العربية السعودية",
      vatAnswer:
        "تفرض المملكة العربية السعودية ضريبة قيمة مضافة 15% على المجوهرات الذهبية (بما في ذلك المصنعية). السبائك الاستثمارية بنقاء ≥99.5% معفاة من الضريبة. اطلب دائماً فاتورة ضريبية — الضريبة تُحصّل من هيئة الزكاة والضريبة والجمارك (ZATCA) والفاتورة هي إثباتك القانوني.",
      body: `
<p><strong>نظرة على السوق.</strong> المملكة العربية السعودية هي أكبر سوق ذهب للتجزئة في الخليج. العيار المهيمن هو 21 (نقاء 87.5%)، المفضل للمجوهرات اليومية. عيار 18 شائع في المجوهرات الراقية، وعيار 24 في السبائك الاستثمارية. الأسعار تُسعّر بالجرام بالريال السعودي.</p>
<p><strong>أين تشتري.</strong> ثلاث قنوات رئيسية: (1) <strong>أسواق الذهب التقليدية</strong> (سوق القيصرية في الرياض، سوق الزل، الحي الذهبي في جدة البلد) — الأفضل للمجوهرات، أقل مصنعية، تحقق شخصي؛ (2) <strong>محلات المجوهرات في المولات</strong> (لازوردي، داماس) — تصاميم مُسمّاة، هوامش أعلى، سياسات إرجاع؛ (3) <strong>البنوك وموزعو السبائك المعتمدون</strong> (مصرف الراجحي، NCB Direct، سبيك، Ounce.com.sa) — سبائك وعملات استثمارية، توثيق كامل، اعتماد LBMA.</p>
<p><strong>الهولمارك والتحقق.</strong> كل ذهب يُباع في السعودية يجب أن يحمل ختم هولمارك صادر من الهيئة السعودية للمواصفات (SASO). ابحث عن: العيار (مثل "21K")، نسبة النقاء (مثل "875")، علامة المُصنّع، وشعار SASO. للسبائك، اطلب شهادة LBMA Good Delivery مع الرقم التسلسلي للمُكرر (PAMP، Valcambi، Argor-Heraeus).</p>
<p><strong>الضريبة والمصنعية.</strong> ضريبة 15% تُطبّق على المجوهرات والمصنعية (مُضافة بشكل رئيسي على العمل، لا الذهب نفسه). السبائك الاستثمارية ≥99.5% معفاة. المصنعية تتراوح عادة من 5 ريال/جرام (الخواتم البسيطة) إلى 30+ ريال/جرام (التصاميم المعقدة، الخط العربي).</p>
<p><strong>نصيحة التفاوض.</strong> السعر الفوري للذهب أعلاه هو الحد الأدنى. احسب السعر العادل للتجزئة: <em>(السعر الفوري × النقاء ÷ 31.1035 × سعر صرف الريال) + ضريبة + مصنعية</em>. أي شيء أعلى بكثير من هذا النطاق يستحق التفاوض، خاصة في الأسواق التقليدية حيث الهوامش مرنة.</p>
`,
    },
  },
  uae: {
    en: {
      heading: "How to Buy Gold in the UAE",
      vatAnswer:
        "The UAE applies 5% VAT on gold jewellery making charges. Raw investment-grade gold (≥99% purity) is zero-rated. Dubai is a major regional refining and re-export hub — duty-free for tourists carrying gold within personal allowance limits.",
      body: `
<p><strong>Market overview.</strong> The UAE — particularly Dubai's Gold Souk — is one of the world's largest gold trading hubs. Karats sold: 24K (investment), 22K (popular for jewellery investment), 21K (Gulf-style jewellery), 18K (European/luxury designs). Prices quoted per gram in UAE Dirham (AED).</p>
<p><strong>Where to buy.</strong> (1) <strong>Dubai Gold Souk (Deira)</strong> — the world's most famous gold market, hundreds of shops, intense competition keeps margins thin; (2) <strong>Gold &amp; Diamond Park</strong> — wholesale-friendly, larger pieces, ZeroTax certificates; (3) <strong>major mall jewellers</strong> (Joyalukkas, Damas, Malabar Gold) — branded designs, fixed pricing, online ordering with home delivery; (4) <strong>licensed bullion dealers</strong> (Emirates Gold, ARY Refinery) — investment bars with LBMA certification.</p>
<p><strong>Hallmarks &amp; verification.</strong> All gold in the UAE must carry the Dubai Hallmark issued by Dubai Central Laboratory (DCL). Look for: karat stamp, fineness, manufacturer mark, and the distinctive Dubai Hallmark symbol. The DCL operates regular spot-check assays — counterfeits are rare in the regulated souk.</p>
<p><strong>VAT &amp; tourist refunds.</strong> 5% VAT applies on making charges (not on raw gold ≥99% purity). Tourists can claim VAT refunds at the airport via the Federal Tax Authority's "Planet" system — keep all original invoices and a Planet-tagged receipt. Personal allowance for outgoing travellers: typically 2 kg of gold without commercial documentation, subject to destination country rules.</p>
<p><strong>Negotiation tip.</strong> The souk is one of the few places where negotiation is expected — prices are typically quoted at 10-20% above spot for jewellery, and 30-40% reductions on the making charge component are common after polite negotiation. Always agree the price <em>before</em> the piece is weighed.</p>
`,
    },
    ar: {
      heading: "كيفية شراء الذهب في الإمارات",
      vatAnswer:
        "تفرض الإمارات ضريبة قيمة مضافة 5% على رسوم تصنيع المجوهرات الذهبية. الذهب الاستثماري الخام (نقاء ≥99%) معفى من الضريبة. دبي مركز إقليمي رئيسي للتكرير وإعادة التصدير — معفاة من الرسوم للسياح الذين يحملون الذهب ضمن حدود البدل الشخصي.",
      body: `
<p><strong>نظرة على السوق.</strong> الإمارات — خاصة سوق الذهب في دبي — واحدة من أكبر مراكز تداول الذهب في العالم. العيارات: 24 (استثمار)، 22 (شائع للمجوهرات الاستثمارية)، 21 (مجوهرات خليجية)، 18 (تصاميم أوروبية فاخرة). الأسعار بالجرام بالدرهم الإماراتي.</p>
<p><strong>أين تشتري.</strong> (1) <strong>سوق الذهب في دبي (ديرة)</strong> — أشهر سوق ذهب في العالم، مئات المحلات، المنافسة الشديدة تُبقي الهوامش ضيقة؛ (2) <strong>سوق الذهب والألماس</strong> — مناسب للجملة، قطع أكبر، شهادات معفاة من الضرائب؛ (3) <strong>محلات المولات الكبرى</strong> (جويلوكاس، داماس، مالابار) — تصاميم مُسمّاة، تسعير ثابت، طلب عبر الإنترنت مع توصيل منزلي؛ (4) <strong>موزعو السبائك المرخصون</strong> (Emirates Gold، ARY Refinery) — سبائك استثمارية معتمدة من LBMA.</p>
<p><strong>الهولمارك والتحقق.</strong> كل ذهب في الإمارات يجب أن يحمل ختم دبي الصادر من مختبر دبي المركزي (DCL). ابحث عن: ختم العيار، النقاء، علامة المُصنّع، وشعار ختم دبي المميز. مختبر DCL يُجري فحوصات عشوائية منتظمة — التزييف نادر في السوق المُنظّم.</p>
<p><strong>الضريبة والاسترداد للسياح.</strong> ضريبة 5% تُطبّق على المصنعية (لا على الذهب الخام ≥99% نقاء). السياح يمكنهم استرداد الضريبة في المطار عبر نظام "Planet" التابع للهيئة الاتحادية للضرائب — احتفظ بجميع الفواتير الأصلية والإيصال المُرفق بـPlanet. البدل الشخصي للمسافرين المغادرين: عادة 2 كيلوغرام من الذهب بدون توثيق تجاري، يخضع لقواعد بلد الوصول.</p>
<p><strong>نصيحة التفاوض.</strong> السوق من الأماكن القليلة حيث التفاوض متوقع — الأسعار عادة 10-20% فوق السعر الفوري للمجوهرات، وتخفيضات 30-40% على مكون المصنعية شائعة بعد تفاوض مهذب. اتفق دائماً على السعر <em>قبل</em> وزن القطعة.</p>
`,
    },
  },
  egypt: {
    en: {
      heading: "How to Buy Gold in Egypt",
      vatAnswer:
        "Egypt does not apply VAT on gold purchases — a major advantage for investors. However, a stamp duty (دمغة) of 1% of value applies on jewellery and is collected by the Stamp Office. Investment bullion is stamp-duty exempt.",
      body: `
<p><strong>Market overview.</strong> Egypt has one of the oldest gold trading cultures in the world. Dominant karats: 21K and 18K for everyday jewellery, 24K for investment. Prices quoted per gram in Egyptian Pound (EGP). The Cairo gold market — particularly Khan El Khalili and Sagha Street — has been operational for centuries.</p>
<p><strong>Where to buy.</strong> (1) <strong>Khan El Khalili and Sagha</strong> (Cairo Old City) — the historic gold district, hundreds of family-run jewellers, hand-crafted designs, negotiation expected; (2) <strong>retail jeweller chains</strong> (L'azurde Egypt, Damas Egypt, Lazurde) — branded designs, mall presence, fixed pricing; (3) <strong>licensed bullion dealers</strong> (Egyptian Gold Refinery, NBE Bullion) — investment bars with full hallmarks.</p>
<p><strong>Hallmarks &amp; verification.</strong> All gold sold in Egypt must carry an official stamp from the Hallmarks &amp; Weights General Authority (مصلحة الدمغة). The stamp specifies the karat (e.g. 21K stamp), and the piece must also carry the manufacturer's mark. Khan El Khalili pieces often carry both the official stamp and the family-jeweller's mark.</p>
<p><strong>Tax &amp; duty.</strong> No VAT applies to gold. A 1% stamp duty (دمغة) is added to jewellery — typically already included in the displayed price. Investment bullion (≥99.5%) is exempt from stamp duty. Egyptian Pound has experienced significant volatility recently, so the EGP price of gold has tracked the USD/EGP exchange rate closely.</p>
<p><strong>Currency &amp; FX consideration.</strong> Because EGP volatility against USD is high, gold has become a popular hedge for Egyptian savers. The EGP gold price shown above is computed daily from the official Central Bank of Egypt mid-rate. Black-market FX rates may produce different EGP prices in informal markets — verify with your jeweller which rate they use.</p>
<p><strong>Negotiation tip.</strong> In Khan El Khalili, the making charge is highly negotiable — often dropping 30-50% from the initial quote after polite back-and-forth. The raw gold weight × karat is non-negotiable (it's the global spot price). Negotiate only the labour and design premium.</p>
`,
    },
    ar: {
      heading: "كيفية شراء الذهب في مصر",
      vatAnswer:
        "مصر لا تطبق ضريبة قيمة مضافة على شراء الذهب — ميزة كبيرة للمستثمرين. لكن تُطبّق دمغة بقيمة 1% من القيمة على المجوهرات وتُحصّلها مصلحة الدمغة. السبائك الاستثمارية معفاة من الدمغة.",
      body: `
<p><strong>نظرة على السوق.</strong> مصر لديها واحدة من أقدم ثقافات تداول الذهب في العالم. العيارات السائدة: 21 و18 للمجوهرات اليومية، 24 للاستثمار. الأسعار بالجرام بالجنيه المصري. سوق الذهب في القاهرة — خاصة خان الخليلي وشارع الصاغة — يعمل منذ قرون.</p>
<p><strong>أين تشتري.</strong> (1) <strong>خان الخليلي والصاغة</strong> (وسط القاهرة القديمة) — الحي التاريخي للذهب، مئات الصاغة العائليين، تصاميم يدوية، التفاوض متوقع؛ (2) <strong>سلاسل محلات المجوهرات</strong> (لازوردي مصر، داماس مصر) — تصاميم مُسمّاة، حضور في المولات، تسعير ثابت؛ (3) <strong>موزعو السبائك المرخصون</strong> (مصنع الذهب المصري، البنك الأهلي للسبائك) — سبائك استثمارية بهولمارك كامل.</p>
<p><strong>الهولمارك والتحقق.</strong> كل ذهب يُباع في مصر يجب أن يحمل ختماً رسمياً من مصلحة الدمغة والموازين. الختم يُحدّد العيار (مثل ختم 21)، ويجب أن تحمل القطعة أيضاً علامة المُصنّع. قطع خان الخليلي عادة تحمل الختم الرسمي وعلامة الصائغ العائلي معاً.</p>
<p><strong>الضريبة والدمغة.</strong> لا توجد ضريبة قيمة مضافة على الذهب. تُضاف دمغة 1% على المجوهرات — عادة مُدرجة بالفعل في السعر المعروض. السبائك الاستثمارية (≥99.5%) معفاة من الدمغة. الجنيه المصري شهد تقلباً كبيراً مؤخراً، لذا سعر الذهب بالجنيه يتبع سعر صرف الدولار/الجنيه عن كثب.</p>
<p><strong>اعتبار العملة وسعر الصرف.</strong> بسبب التقلب العالي للجنيه مقابل الدولار، أصبح الذهب تحوطاً شائعاً للمدّخرين المصريين. سعر الذهب بالجنيه المعروض أعلاه يُحسب يومياً من السعر الرسمي للبنك المركزي المصري. الأسعار غير الرسمية للصرف قد تُنتج أسعار جنيه مختلفة في الأسواق غير الرسمية — تحقق مع الصائغ أي سعر يستخدم.</p>
<p><strong>نصيحة التفاوض.</strong> في خان الخليلي، المصنعية قابلة للتفاوض بشدة — غالباً تنخفض 30-50% عن العرض الأولي بعد تفاوض مهذب. وزن الذهب الخام × العيار غير قابل للتفاوض (هذا السعر الفوري العالمي). تفاوض فقط على هامش العمل والتصميم.</p>
`,
    },
  },
  morocco: {
    en: {
      heading: "How to Buy Gold in Morocco",
      vatAnswer:
        "Morocco applies 20% VAT (TVA) on retail jewellery purchases. Investment-grade bullion (≥99.5% purity) sold by licensed dealers can be VAT-exempt under specific conditions — verify with the dealer. Customs duty applies on gold imports above the personal allowance.",
      body: `
<p><strong>Market overview.</strong> Morocco's gold market is moderately sized but culturally significant — traditional jewellery is integral to weddings and family heirlooms. Dominant karats: 18K and 22K for jewellery, 24K for investment. Prices quoted per gram in Moroccan Dirham (MAD).</p>
<p><strong>Where to buy.</strong> (1) <strong>medina gold souks</strong> (Fes, Marrakech, Casablanca) — traditional designs, family jewellers, in-person inspection; (2) <strong>modern retail jewellers</strong> in major cities (Casablanca, Rabat) — branded designs, fixed pricing, modern showrooms; (3) <strong>banks and licensed bullion dealers</strong> (Attijariwafa Bank, Bank Al-Maghrib licensed dealers) — investment bars with documentation.</p>
<p><strong>Hallmarks &amp; verification.</strong> Moroccan gold carries the "Poinçon de Garantie" issued by the Direction Générale des Impôts (DGI). Look for the distinctive Moroccan stamp specifying karat. For bullion, demand a Bank Al-Maghrib certificate or LBMA documentation. Counterfeits are most common in unregulated souks — stick to established jewellers with permanent shops.</p>
<p><strong>VAT &amp; customs.</strong> 20% VAT (TVA) is the standard rate on retail jewellery purchases — among the highest in the region. This is one reason Moroccan gold buyers often acquire pieces in the UAE during travel. Personal allowance for incoming travellers is limited; declare gold over 1 kg on entry to avoid customs penalties.</p>
<p><strong>Currency &amp; pricing.</strong> The Moroccan Dirham is managed against a EUR/USD basket, so it's relatively stable. MAD gold prices closely track international USD gold movements. The MAD price shown above is computed from the Bank Al-Maghrib daily reference rate.</p>
<p><strong>Negotiation tip.</strong> Medina souks operate on negotiation — initial prices are typically 20-30% above the final agreed price. The making charge ("façon") is the negotiable component; the gold weight is fixed by global spot. Modern mall retailers operate on fixed pricing with no negotiation.</p>
`,
    },
    ar: {
      heading: "كيفية شراء الذهب في المغرب",
      vatAnswer:
        "يطبق المغرب ضريبة قيمة مضافة 20% (TVA) على شراء المجوهرات بالتجزئة. السبائك الاستثمارية (نقاء ≥99.5%) المُباعة من موزعين مرخصين يمكن أن تكون معفاة من الضريبة تحت شروط محددة — تحقق مع البائع. تُطبّق رسوم جمركية على واردات الذهب فوق البدل الشخصي.",
      body: `
<p><strong>نظرة على السوق.</strong> سوق الذهب المغربي متوسط الحجم لكنه ذو أهمية ثقافية — المجوهرات التقليدية جزء لا يتجزأ من الأعراس والموروث العائلي. العيارات السائدة: 18 و22 للمجوهرات، 24 للاستثمار. الأسعار بالجرام بالدرهم المغربي.</p>
<p><strong>أين تشتري.</strong> (1) <strong>أسواق الذهب في المدن العتيقة</strong> (فاس، مراكش، الدار البيضاء) — تصاميم تقليدية، صاغة عائليون، فحص شخصي؛ (2) <strong>محلات المجوهرات الحديثة</strong> في المدن الكبرى (الدار البيضاء، الرباط) — تصاميم مُسمّاة، تسعير ثابت، صالات عرض حديثة؛ (3) <strong>البنوك وموزعو السبائك المرخصون</strong> (التجاري وفا بنك، الموزعون المرخصون من بنك المغرب) — سبائك استثمارية مع توثيق.</p>
<p><strong>الهولمارك والتحقق.</strong> الذهب المغربي يحمل "Poinçon de Garantie" الصادر من المديرية العامة للضرائب (DGI). ابحث عن الختم المغربي المميز الذي يُحدّد العيار. للسبائك، اطلب شهادة بنك المغرب أو توثيق LBMA. التزييف أكثر شيوعاً في الأسواق غير المُنظّمة — التزم بالصاغة المُعتمدين بمحلات دائمة.</p>
<p><strong>الضريبة والجمارك.</strong> ضريبة قيمة مضافة 20% (TVA) هي المعدل القياسي على شراء المجوهرات بالتجزئة — من بين الأعلى في المنطقة. هذا أحد الأسباب التي تجعل المشترين المغاربة يقتنون قطعاً في الإمارات خلال السفر. البدل الشخصي للمسافرين القادمين محدود؛ صرّح عن الذهب الذي يزيد عن 1 كيلوغرام عند الدخول لتجنب الغرامات الجمركية.</p>
<p><strong>العملة والتسعير.</strong> الدرهم المغربي مُدار مقابل سلة EUR/USD، لذا فهو مستقر نسبياً. أسعار الذهب بالدرهم تتبع تحركات الذهب العالمية بالدولار عن كثب. سعر الدرهم المعروض أعلاه يُحسب من سعر الصرف المرجعي اليومي لبنك المغرب.</p>
<p><strong>نصيحة التفاوض.</strong> أسواق المدن العتيقة تعمل على التفاوض — الأسعار الأولية عادة 20-30% فوق السعر النهائي المتفق عليه. المصنعية ("façon") هي المكون القابل للتفاوض؛ وزن الذهب ثابت بالسعر الفوري العالمي. محلات المولات الحديثة تعمل بتسعير ثابت بدون تفاوض.</p>
`,
    },
  },
};
