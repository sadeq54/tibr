import type { Article } from "@/content/news/articles";

/**
 * Practical buying guides, kept separate from `articles.ts` so neither file
 * grows past the repo's size rule.
 *
 * Written because the site was ~2,280 programmatic price URLs against six
 * articles, all six published within hours of each other on 2026-05-13 —
 * the shape Google's spam policy calls "cookie-cutter templates with the
 * same or similar content replicated within the same site", and the reason
 * the AdSense application was declined on content. These answer questions
 * a price table cannot: what the shop adds on top, what it deducts when
 * buying back, and which number is real when a currency has two rates.
 *
 * Dates are spread across real weeks rather than stamped in one batch.
 */

const AUTHOR = {
  name: "Sadeq Sayed Ahmad",
  url: "/about/sadeq",
  image: "/author/sadeq.jpeg",
};

export const GUIDE_ARTICLES: Article[] = [
  {
    slug: "making-charges-explained",
    publishedAt: "2026-06-18T09:00:00Z",
    title_en: "Making Charges: The Part of the Gold Price Nobody Quotes You",
    title_ar: "المصنعية: الجزء من سعر الذهب الذي لا يذكره أحد",
    description_en:
      "The gram price on the board is not what you pay. Making charges add 5-30% depending on how a piece was made — machine-cast versus handmade, hollow versus solid. How they are calculated, and how to tell a fair one from a padded one.",
    description_ar:
      "سعر الجرام المعلن على اللوحة ليس ما تدفعه. تضيف المصنعية من 5% إلى 30% حسب طريقة تصنيع القطعة — مصبوبة آليًا أم مشغولة يدويًا، مجوّفة أم مصمتة. كيف تُحسب، وكيف تميّز العادلة من المبالَغ فيها.",
    tags: ["making-charges", "buying-guide", "retail", "education"],
    author: AUTHOR,
    body_en: `Every jeweller's window shows a gram price. Almost nobody pays it. The number on the board is the **gold value** — what the metal in the piece is worth at today's spot rate. What you actually hand over includes a second number that is rarely displayed and almost always negotiable: the making charge.

## What the making charge pays for

Gold does not arrive as a bracelet. Someone melts it, alloys it to the right karat, forms it, solders the joins, sets any stones, files the seams, and polishes it. The making charge — **المصنعية** in Arabic, *ujrat al-sana'a* — covers that labour, plus the metal lost as dust and filings during the work, plus the shop's margin.

Two pieces of identical weight and identical karat can carry very different making charges, and the reason is almost always **how they were made**:

- **Machine-cast chains and simple bands** — lowest charges. A casting machine produces hundreds of identical links with almost no skilled labour per unit.
- **Hollow pieces** — moderate. Hollow bangles use less gold for the same visual size, but the technique is fussier and more prone to denting.
- **Handmade and filigree work** — highest. A hand-drawn filigree cuff can take a craftsman days, and the charge reflects days of work.
- **Stone-set pieces** — highest again, and the stones are priced separately on top.

## How it is quoted, and why that matters

There are two conventions, and knowing which one you are being given changes the arithmetic completely.

**Per gram.** The shop says "twelve per gram." A 40-gram necklace carries 40 × 12 in making charges, added to the gold value. This is the common convention in Gulf and Levantine markets.

**As a percentage.** The shop says "fifteen percent." That is 15% of the gold value, so it scales with the gold price — the same necklace costs more to make on a day gold is expensive, which is worth noticing.

A worked example, using a gram price of 100 units of local currency for clarity:

| | Gold value | Making | Total |
|---|---|---|---|
| 40 g, machine chain, 8/g | 4,000 | 320 | 4,320 |
| 40 g, handmade, 25/g | 4,000 | 1,000 | 5,000 |

Same weight. Same karat. Same gold. A 16% difference in what you pay, entirely in labour.

## The part that costs you on resale

This is the single most useful thing to understand about making charges: **you do not get them back.**

When you sell a piece back, the shop weighs it and pays for the gold content at that day's rate, minus a deduction. The craftsmanship is not part of the offer — the buyer is going to melt the piece. Every unit you paid in making charges is spent the moment you walk out.

That has a practical consequence. If you are buying gold mainly as **savings**, minimise making charges: plain heavy chains, simple bangles, or bullion. If you are buying because you want to **wear something beautiful**, pay the charge happily — but do it knowing it is the price of the object, not an investment in metal.

## How to tell a fair charge from a padded one

- **Ask for the two numbers separately.** "What is the gram price, and what is the making?" A shop that will only quote a single blended figure is a shop where you cannot compare anything.
- **Compare like with like.** A handmade piece against a cast piece is not a comparison. Compare the same style across two shops.
- **Check the weight yourself.** Every reputable jeweller has a calibrated scale on the counter and will weigh a piece in front of you. One that is reluctant is telling you something.
- **Negotiate the making, not the gold.** The gold price is a world market number and nobody in the shop controls it. The making charge is the shop's own, and in most Arab markets it is genuinely expected that you will discuss it.

## What this site shows you

The per-gram prices on Gold Prices Arabia are the **spot value of the metal** — the global spot price converted into your currency and divided down to a gram at your karat. They are deliberately before making charges, shop margin and any local tax, because those vary by shop and by piece and no site can know them.

Use the number here as your floor. Whatever the shop quotes above it is the making charge, and now you know what you are being charged for.`,
    body_ar: `تعرض كل واجهة صائغ سعرًا للجرام. ولا يكاد أحد يدفعه. الرقم المعلن هو **قيمة الذهب** — ما يساويه المعدن في القطعة بسعر السوق اليوم. أما ما تدفعه فعليًا فيتضمن رقمًا ثانيًا نادرًا ما يُعرض وغالبًا ما يقبل التفاوض: المصنعية.

## ما الذي تدفع المصنعية ثمنه

لا يصل الذهب على هيئة سوار. لا بد أن يصهره أحد، ويخلطه ليبلغ العيار المطلوب، ويشكّله، ويلحم الوصلات، ويركّب الأحجار، ويبرد الحواف، ويصقله. المصنعية تغطي ذلك العمل، إضافة إلى المعدن المفقود غبارًا وبرادة أثناء الشغل، وهامش المحل.

قطعتان بالوزن نفسه والعيار نفسه قد تحملان مصنعية مختلفة تمامًا، والسبب دائمًا تقريبًا هو **طريقة التصنيع**:

- **السلاسل المصبوبة آليًا والخواتم البسيطة** — الأقل. تنتج آلة الصب مئات الحلقات المتطابقة بعمل ماهر يكاد لا يُذكر لكل وحدة.
- **القطع المجوّفة** — متوسطة. تستهلك الأساور المجوّفة ذهبًا أقل لحجم ظاهري مماثل، لكن تقنيتها أدق وأكثر عرضة للانبعاج.
- **الشغل اليدوي والمُخرَّم** — الأعلى. سوار مخرّم مسحوب باليد قد يستغرق الحرفي أيامًا، والأجرة تعكس تلك الأيام.
- **القطع المرصّعة** — الأعلى كذلك، وتُسعَّر الأحجار على حدة فوق ذلك.

## كيف تُذكر، ولماذا يهم ذلك

هناك عرفان اثنان، ومعرفة أيهما يُعرض عليك تغيّر الحساب كليًا.

**لكل جرام.** يقول المحل «اثنا عشر للجرام». فقلادة وزنها 40 جرامًا تحمل 40 × 12 مصنعية، تُضاف إلى قيمة الذهب. وهذا العرف الشائع في أسواق الخليج وبلاد الشام.

**كنسبة مئوية.** يقول المحل «خمسة عشر بالمئة». أي 15% من قيمة الذهب، فتتحرك مع سعر الذهب — القلادة نفسها تكلّف مصنعية أعلى في يوم يكون فيه الذهب غاليًا، وهذا جدير بالانتباه.

مثال محسوب، بسعر جرام قدره 100 وحدة من العملة المحلية للتوضيح:

| | قيمة الذهب | المصنعية | الإجمالي |
|---|---|---|---|
| 40 جم، سلسلة آلية، 8/جم | 4,000 | 320 | 4,320 |
| 40 جم، شغل يدوي، 25/جم | 4,000 | 1,000 | 5,000 |

الوزن نفسه. العيار نفسه. الذهب نفسه. وفارق 16% فيما تدفعه، كله عمل.

## الجزء الذي يكلّفك عند إعادة البيع

هذه أنفع نقطة يمكن فهمها عن المصنعية: **لا تستردها.**

حين تبيع قطعة، يزنها المحل ويدفع ثمن محتواها من الذهب بسعر ذلك اليوم، ناقصًا خصمًا. أما الحرفية فليست جزءًا من العرض — فالمشتري سيصهر القطعة. كل وحدة دفعتها مصنعية تُنفق لحظة خروجك من الباب.

ولهذا نتيجة عملية. إن كنت تشتري الذهب ادخارًا بالدرجة الأولى، فقلّل المصنعية: سلاسل ثقيلة سادة، أو أساور بسيطة، أو سبائك. وإن كنت تشتري لأنك تريد شيئًا جميلًا تلبسه، فادفع الأجرة راضيًا — لكن وأنت تعلم أنها ثمن القطعة لا استثمار في المعدن.

## كيف تميّز الأجرة العادلة من المبالَغ فيها

- **اطلب الرقمين منفصلين.** «كم سعر الجرام، وكم المصنعية؟» فالمحل الذي لا يذكر إلا رقمًا مدمجًا واحدًا هو محل لا يمكنك أن تقارن فيه شيئًا.
- **قارن المتماثل بالمتماثل.** مقارنة قطعة يدوية بأخرى مصبوبة ليست مقارنة. قارن الطراز نفسه بين محلين.
- **تحقق من الوزن بنفسك.** لدى كل صائغ محترم ميزان معاير على الطاولة وسيزن القطعة أمامك. وتردده في ذلك يخبرك بشيء.
- **فاوض على المصنعية لا على الذهب.** فسعر الذهب رقم سوق عالمي لا يتحكم فيه أحد داخل المحل. أما المصنعية فهي للمحل نفسه، ومن المتوقع فعلًا في معظم الأسواق العربية أن تناقشها.

## ما الذي يعرضه هذا الموقع

أسعار الجرام في «أسعار الذهب العربية» هي **قيمة المعدن الفورية** — السعر العالمي الفوري محوَّلًا إلى عملتك ومقسومًا إلى جرام بعيارك. وهي عمدًا قبل المصنعية وهامش المحل وأي ضريبة محلية، لأن هذه تختلف من محل إلى محل ومن قطعة إلى قطعة ولا يستطيع أي موقع أن يعرفها.

استعمل الرقم هنا حدًا أدنى. وكل ما يذكره المحل فوقه هو المصنعية، وقد صرت تعرف الآن ما الذي تدفع ثمنه.`,
  },
  {
    slug: "two-exchange-rates-gold-price",
    publishedAt: "2026-07-02T09:00:00Z",
    title_en: "When a Currency Has Two Rates, Which Gold Price Is Real?",
    title_ar: "حين يكون للعملة سعران، أي سعر ذهب هو الحقيقي؟",
    description_en:
      "In Syria, Iraq, Lebanon and at times Egypt, the official exchange rate and the rate the market actually uses are different numbers. That gap is the price. How to read a gold quote when the currency itself is contested.",
    description_ar:
      "في سوريا والعراق ولبنان وأحيانًا مصر، السعر الرسمي للصرف والسعر الذي تستعمله السوق فعليًا رقمان مختلفان. تلك الفجوة هي السعر. كيف تقرأ تسعيرة الذهب حين تكون العملة نفسها محل خلاف.",
    tags: ["exchange-rates", "syria", "iraq", "lebanon", "buying-guide"],
    author: AUTHOR,
    body_en: `Most gold pricing is arithmetic. Take the world spot price in dollars, divide by 31.1035 to get a gram, multiply by the purity of the karat, multiply by the exchange rate. Four operations, one answer.

That last step is where it breaks. **The exchange rate assumes there is one.**

## Where the assumption fails

In several of the markets this site covers, a currency has more than one rate at the same moment:

- **Syria.** The pound has an official central-bank rate and a parallel rate used in the souk. They have diverged for years, sometimes by multiples.
- **Iraq.** The dinar is managed against the dollar by the central bank, but exchange shops in Baghdad have traded above the official rate for extended periods.
- **Lebanon.** The pound went through a period where the official peg and the market rate were separated by more than an order of magnitude.
- **Egypt.** Since the pound was floated, official and parallel rates have converged and diverged repeatedly depending on dollar availability.

In each case the question "what is the gold price today" has more than one defensible answer, and the difference is not small.

## Why the gap exists at all

An official rate is a policy decision. A parallel rate is what someone will actually give you for a dollar right now. When a central bank does not have enough foreign currency to satisfy demand at the official rate, the official rate stops being a price and becomes a rationing device — available to some importers, some transactions, some people, and not to others.

Gold sits directly in that gap, and this is the important part: **gold is one of the few things an ordinary household can hold that is not denominated in the local currency at all.** A gram of 21K in Damascus is the same gram of 21K in Dubai. That is precisely why demand for it rises when a currency is under strain, and why the souk price tracks the parallel rate rather than the official one.

## How to read a quote in these markets

**Ask which rate the number uses.** A jeweller converting at the parallel rate and a website converting at the official rate will produce wildly different figures for the same piece of metal, and neither is lying.

**Watch the dollar price, not the local one.** In a market where the currency is moving faster than the metal, the local gold price mostly tells you about the currency. The dollar-per-gram figure tells you about gold. When the local price jumps 15% in a week and the dollar price is flat, nothing happened to gold — something happened to the money.

**Expect settlement to skip the currency entirely.** In the most strained markets, transactions are commonly settled in US dollars, or simply by weight — old gold traded against new with a payment covering the difference. When the unit of account is unreliable, people fall back on the metal itself.

**Treat any single published number with care.** Souks carry their own premiums. A reference price published by a chamber of commerce is a reference, not a guarantee that any given shop will honour it.

## What this site does, and does not, claim

Gold Prices Arabia converts the global spot price using **open-data market exchange rates, updated hourly**. For a currency with a single functioning rate, that produces a number you can take to a shop.

For a currency with two rates, you should read our figure as *a* conversion rather than *the* price, and check it against what exchange offices near you are actually quoting today. We say so on the country pages themselves rather than implying a precision the underlying data does not support.

That is also why the Syria, Iraq and Lebanon pages carry commentary about the rate regime instead of only a table. In those markets the exchange rate is not a footnote to the gold price. It very often *is* the gold price.`,
    body_ar: `معظم تسعير الذهب حساب بسيط. خذ السعر العالمي الفوري بالدولار، اقسمه على 31.1035 لتحصل على الجرام، اضربه في نقاء العيار، ثم اضربه في سعر الصرف. أربع عمليات ونتيجة واحدة.

وعند تلك الخطوة الأخيرة ينكسر الحساب. **إذ يفترض سعر الصرف أن هناك سعرًا واحدًا.**

## أين يسقط هذا الافتراض

في عدد من الأسواق التي يغطيها هذا الموقع، يكون للعملة أكثر من سعر في اللحظة نفسها:

- **سوريا.** لليرة سعر رسمي لدى المصرف المركزي وسعر موازٍ يُستعمل في السوق. وقد تباعدا سنوات، وأحيانًا بأضعاف.
- **العراق.** يدير المصرف المركزي الدينار مقابل الدولار، لكن مكاتب الصرافة في بغداد تداولت فوق السعر الرسمي لفترات ممتدة.
- **لبنان.** مرّت الليرة بمرحلة انفصل فيها السعر الرسمي المربوط عن سعر السوق بأكثر من مرتبة عشرية.
- **مصر.** منذ تعويم الجنيه، تقارب السعران الرسمي والموازي وتباعدا مرارًا بحسب توافر الدولار.

وفي كل حالة يصبح لسؤال «كم سعر الذهب اليوم» أكثر من إجابة وجيهة، والفارق ليس صغيرًا.

## لماذا توجد الفجوة أصلًا

السعر الرسمي قرار سياسة. والسعر الموازي هو ما يعطيك أحدهم فعلًا مقابل الدولار الآن. وحين لا يملك المصرف المركزي عملة أجنبية كافية لتلبية الطلب بالسعر الرسمي، يكف السعر الرسمي عن كونه سعرًا ويصير أداة تقنين — متاحًا لبعض المستوردين وبعض المعاملات وبعض الناس، دون غيرهم.

ويقع الذهب في تلك الفجوة مباشرة، وهنا الجزء المهم: **الذهب من الأشياء القليلة التي يستطيع بيت عادي أن يحوزها وهي غير مقوَّمة بالعملة المحلية إطلاقًا.** فجرام عيار 21 في دمشق هو جرام عيار 21 نفسه في دبي. ولهذا بالضبط يرتفع الطلب عليه حين تتعرض العملة لضغط، ولهذا يتبع سعر السوق السعر الموازي لا الرسمي.

## كيف تقرأ تسعيرة في هذه الأسواق

**اسأل أي سعر صرف استُعمل.** فالصائغ الذي يحوّل بالسعر الموازي والموقع الذي يحوّل بالسعر الرسمي سينتجان رقمين متباعدين جدًا لقطعة المعدن نفسها، ولا أحد منهما يكذب.

**راقب السعر بالدولار لا بالعملة المحلية.** ففي سوق تتحرك فيه العملة أسرع من المعدن، لا يخبرك سعر الذهب المحلي إلا عن العملة غالبًا. أما رقم الدولار للجرام فيخبرك عن الذهب. وحين يقفز السعر المحلي 15% في أسبوع بينما سعر الدولار ثابت، فلم يحدث شيء للذهب — بل حدث شيء للنقود.

**توقّع أن تتخطى التسوية العملة كلها.** ففي أشد الأسواق ضغطًا تُسوّى المعاملات عادة بالدولار الأمريكي، أو بالوزن ببساطة — ذهب قديم يُبادَل بجديد مع دفع الفارق. وحين تكون وحدة الحساب غير موثوقة، يعود الناس إلى المعدن نفسه.

**تعامل بحذر مع أي رقم منشور مفرد.** فللأسواق علاواتها الخاصة. والسعر المرجعي الذي تنشره غرفة تجارة هو مرجع، لا ضمان بأن أي محل بعينه سيلتزم به.

## ما الذي يدّعيه هذا الموقع وما لا يدّعيه

يحوّل «أسعار الذهب العربية» السعر العالمي الفوري باستعمال **أسعار صرف سوقية من بيانات مفتوحة، تُحدَّث كل ساعة**. وبالنسبة لعملة ذات سعر واحد فاعل، ينتج ذلك رقمًا يمكنك أخذه إلى المحل.

أما العملة ذات السعرين فينبغي أن تقرأ رقمنا فيها بوصفه *تحويلًا* لا *السعر*، وأن تقابله بما تذكره مكاتب الصرافة قربك اليوم فعلًا. ونحن نقول ذلك على صفحات الدول نفسها بدل الإيحاء بدقة لا تسندها البيانات.

ولهذا أيضًا تحمل صفحات سوريا والعراق ولبنان شرحًا عن نظام سعر الصرف لا جدولًا فحسب. ففي تلك الأسواق ليس سعر الصرف حاشية على سعر الذهب. بل هو في كثير من الأحيان **سعر الذهب نفسه**.`,
  },
  {
    slug: "reading-a-gold-hallmark",
    publishedAt: "2026-07-21T09:00:00Z",
    title_en: "How to Read the Tiny Numbers Stamped Inside Your Gold",
    title_ar: "كيف تقرأ الأرقام الصغيرة المطبوعة داخل ذهبك",
    description_en:
      "999, 916, 875, 750, 585 — the millesimal fineness stamp tells you exactly how much gold is in a piece. What each number means, where to find it, and what a missing or wrong stamp should tell you.",
    description_ar:
      "999 و916 و875 و750 و585 — ختم النقاء بالألف يخبرك بدقة كم فيها من ذهب. ما معنى كل رقم، وأين تجده، وماذا ينبغي أن يقول لك غياب الختم أو خطؤه.",
    tags: ["hallmark", "authentication", "buying-guide", "education"],
    author: AUTHOR,
    body_en: `Turn a gold ring over and look inside the band. Somewhere on that surface, usually in characters small enough to need good light, is a number. It is the most reliable single piece of information about what you are holding.

## The millesimal system

Modern hallmarks state purity in **parts per thousand**. Not carats, not percentages — thousandths. Once you know that, every stamp decodes itself:

| Stamp | Purity | Karat | Where it dominates |
|---|---|---|---|
| **999** or **9999** | 99.9% | 24K | Bars, coins, investment gold |
| **916** | 91.7% | 22K | India, parts of the Gulf |
| **875** | 87.5% | 21K | Egypt, Saudi Arabia, the Levant |
| **750** | 75% | 18K | Europe, designer and gem-set jewellery |
| **585** | 58.3% | 14K | United States, Eastern Europe |

The arithmetic is simply the karat over 24. 21 ÷ 24 = 0.875 = **875**. 18 ÷ 24 = 0.75 = **750**. Once you see it, you cannot unsee it, and you no longer need to memorise the table.

## Where to look

The stamp goes somewhere that will not be worn away by handling and will not spoil the design:

- **Rings** — inside the band
- **Chains and necklaces** — on the clasp, or on a small flat tag next to it
- **Bangles** — on the inner surface, often near the hinge or opening
- **Earrings** — on the post or the back of the fitting
- **Bars and coins** — struck into the face along with the refiner's name and often a serial number

Bring a loupe or use your phone camera zoomed in. These marks are frequently under a millimetre.

## What else may be stamped alongside

The fineness number is often not alone:

- **A maker's mark** — the workshop or brand that produced the piece.
- **An assay or country mark** — a national office's guarantee. Tunisia's ram's head is a well-known example in North Africa; several European countries have their own.
- **A date letter** — used in some hallmarking systems to record the year of assay.
- **"KDM" or "HM"** on older Indian pieces — KDM refers to a now-discouraged cadmium solder; **HM** with a BIS logo indicates modern hallmarked gold.

## What a missing stamp means — and does not mean

An unstamped piece is not automatically fake. Genuine reasons exist: it may be antique, from a period or place with no hallmarking requirement; it may be handmade by a small workshop; the mark may simply have worn away on a piece worn daily for thirty years; or a ring may have been resized and lost the stamped section.

But an unstamped piece is a piece with **no independent claim about its purity**, and you should treat it accordingly. Do not pay a stamped-gold price for unstamped gold on trust alone. Ask the shop to test it in front of you — an electronic conductivity tester takes seconds, and acid testing is standard practice on the counter.

The inverse deserves more caution than it usually gets: **a stamp is not proof.** Stamps can be forged, and a plated base metal can carry a convincing 750. The stamp is evidence, not a guarantee. On a significant purchase, evidence plus a test plus a receipt naming the karat and weight is what actually protects you.

## The check that costs nothing

Before you leave the shop, confirm three things match each other: the **stamp** on the piece, the **karat written on the receipt**, and the **karat the price was calculated from**. A piece sold to you as 21K should be stamped 875 and invoiced as 21K.

Those three agreeing is a good sign. Any two of them disagreeing is a conversation worth having before you pay, not after.

You can check the day's per-gram price for each karat in your own currency on this site before you go, so you walk in already knowing what the metal in the piece is worth.`,
    body_ar: `اقلب خاتمًا ذهبيًا وانظر داخل الحلقة. في مكان ما من ذلك السطح، بحروف صغيرة تحتاج غالبًا إلى ضوء جيد، يوجد رقم. وهو أوثق معلومة مفردة عمّا تمسك به.

## نظام النقاء بالألف

تذكر الأختام الحديثة النقاء **بالأجزاء من الألف**. لا بالقيراط ولا بالنسبة المئوية، بل بالأجزاء من ألف. ومتى عرفت ذلك فكّ كل ختم شفرته بنفسه:

| الختم | النقاء | العيار | أين يسود |
|---|---|---|---|
| **999** أو **9999** | 99.9% | 24 | السبائك والعملات والذهب الاستثماري |
| **916** | 91.7% | 22 | الهند وأجزاء من الخليج |
| **875** | 87.5% | 21 | مصر والسعودية وبلاد الشام |
| **750** | 75% | 18 | أوروبا والمجوهرات المصممة والمرصّعة |
| **585** | 58.3% | 14 | الولايات المتحدة وأوروبا الشرقية |

والحساب ببساطة هو العيار مقسومًا على 24. فـ21 ÷ 24 = 0.875 = **875**. و18 ÷ 24 = 0.75 = **750**. ومتى رأيتها لم تعد بحاجة إلى حفظ الجدول.

## أين تنظر

يوضع الختم في موضع لا يمحوه الاستعمال ولا يفسد التصميم:

- **الخواتم** — داخل الحلقة
- **السلاسل والقلائد** — على المشبك، أو على لسان مسطح صغير بجانبه
- **الأساور** — على السطح الداخلي، غالبًا قرب المفصل أو الفتحة
- **الأقراط** — على العمود أو ظهر التركيبة
- **السبائك والعملات** — مضروب على الوجه مع اسم المصفاة ورقم تسلسلي غالبًا

استعن بعدسة مكبرة أو بكاميرا هاتفك مقرَّبة. فهذه العلامات كثيرًا ما تقل عن مليمتر.

## ما قد يُختم إلى جانبه

نادرًا ما يكون رقم النقاء وحده:

- **علامة الصانع** — الورشة أو العلامة التجارية التي أنتجت القطعة.
- **علامة دمغة أو بلد** — ضمان من مكتب وطني. ورأس الكبش التونسي مثال معروف في شمال أفريقيا، ولعدة دول أوروبية علاماتها.
- **حرف تاريخ** — يُستعمل في بعض أنظمة الدمغ لتسجيل سنة الفحص.
- **«KDM» أو «HM»** على القطع الهندية الأقدم — فـKDM يشير إلى لحام كادميوم صار غير مستحسن، أما **HM** مع شعار BIS فتدل على ذهب مدموغ حديثًا.

## ماذا يعني غياب الختم — وماذا لا يعني

القطعة غير المختومة ليست مزيفة تلقائيًا. فثمة أسباب وجيهة: قد تكون أثرية من زمن أو مكان بلا إلزام بالدمغ، أو مشغولة يدويًا في ورشة صغيرة، أو قد تكون العلامة انمحت ببساطة على قطعة لُبست يوميًا ثلاثين سنة، أو قد يكون خاتم عُدّل مقاسه ففقد الجزء المختوم.

لكن القطعة غير المختومة قطعة **بلا ادعاء مستقل عن نقائها**، وينبغي أن تعاملها على هذا الأساس. لا تدفع ثمن ذهب مختوم مقابل ذهب غير مختوم اعتمادًا على الثقة وحدها. اطلب من المحل فحصها أمامك — فجهاز الفحص الكهربائي يستغرق ثوانٍ، وفحص الحمض ممارسة معتادة على الطاولة.

والعكس يستحق حذرًا أكثر مما يُعطى عادة: **الختم ليس دليلًا قاطعًا.** فالأختام تُزوَّر، وقد يحمل معدن مطليّ رقم 750 مقنعًا. الختم قرينة لا ضمانة. وفي عملية شراء كبيرة، فإن القرينة مع فحص مع فاتورة تذكر العيار والوزن هي ما يحميك فعلًا.

## الفحص الذي لا يكلّف شيئًا

قبل أن تغادر المحل، تأكد أن ثلاثة أمور متطابقة: **الختم** على القطعة، و**العيار المكتوب في الفاتورة**، و**العيار الذي حُسب منه السعر**. فالقطعة التي بيعت لك على أنها عيار 21 ينبغي أن تكون مختومة 875 ومفوترة عيار 21.

اتفاق الثلاثة علامة جيدة. واختلاف أي اثنين منها حديث يستحق أن يُجرى قبل الدفع لا بعده.

ويمكنك الاطلاع على سعر الجرام اليومي لكل عيار بعملتك على هذا الموقع قبل الذهاب، فتدخل وأنت تعرف مسبقًا كم يساوي المعدن في القطعة.`,
  },
];
