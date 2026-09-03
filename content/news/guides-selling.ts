import type { Article } from "@/content/news/articles";

/**
 * Second batch of practical guides — selling back, choosing a karat for wear,
 * and why neighbouring countries quote different prices for identical metal.
 * Split from `guides.ts` purely to keep each file under the repo size rule.
 */

const AUTHOR = {
  name: "Sadeq Sayed Ahmad",
  url: "/about/sadeq",
  image: "/author/sadeq.jpeg",
};

export const SELLING_ARTICLES: Article[] = [
  {
    slug: "selling-gold-back-what-you-actually-get",
    publishedAt: "2026-08-06T09:00:00Z",
    title_en: "Selling Gold Back: Why the Shop Pays Less Than the Board Says",
    title_ar: "بيع الذهب: لماذا يدفع المحل أقل من السعر المعلن",
    description_en:
      "You bought at the gram price plus making. You sell at the gram price minus a deduction. Where the difference goes, what a normal buy-back deduction looks like, and how to avoid selling at the worst possible moment.",
    description_ar:
      "اشتريت بسعر الجرام زائد المصنعية. وتبيع بسعر الجرام ناقص خصم. أين يذهب الفارق، وكيف يبدو خصم الشراء الطبيعي، وكيف تتجنب البيع في أسوأ لحظة ممكنة.",
    tags: ["selling", "buy-back", "buying-guide", "retail"],
    author: AUTHOR,
    body_en: `The moment that surprises people is not the buying. It is the selling.

You paid the gram price plus a making charge. Months or years later you take the piece back, the shop weighs it, and offers you a number noticeably below the gram price on the board that same morning. Nothing improper has necessarily happened. Here is where the difference goes.

## The three deductions

**1. The making charge is gone.** This is the largest single component and it disappeared the day you bought. The shop is buying metal to melt; the craftsmanship has no value to them. If you paid 20% over gold value in making, you were always going to be roughly 20% behind on day one.

**2. The refining loss.** Melting scrap gold to recover clean metal loses a little of it, and costs money. The buyer prices that in.

**3. The dealer's spread.** They buy below the market and sell above it. That gap is the business.

Together these mean a **buy-back offer below the day's quoted gram price is normal**, not a swindle. What varies — and what is worth shopping around for — is *how far* below.

## What a reasonable offer looks like

A fair buy-back is calculated from **weight × purity × the day's spot rate**, minus a modest deduction. The deduction is where markets differ:

- In deep, competitive gold markets with many buyers close together, the deduction tends to be small, because you can simply walk to the next shop.
- In markets with fewer buyers, or for karats the local trade does not normally handle, it can be considerably larger.

That last point matters. **14K in a 21K market is the classic example** — the local trade is not set up to melt and re-refine it, so shops either quote poorly or decline it outright. The same piece would trade normally in a market where 585 is standard.

## What to do before you sell

**Know the metal value first.** Weigh the piece, note the karat from the hallmark, and calculate: weight in grams × purity × today's per-gram price for pure gold. That figure is your baseline. This site gives you the per-gram price for your karat and currency, so you can arrive already knowing the number rather than discovering it at the counter.

**Get more than one offer.** Buy-back deductions are not standardised. Two shops on the same street can differ meaningfully, and the only way to know is to ask both.

**Bring the paperwork.** The original invoice naming karat and weight removes any argument about what the piece is.

**Separate the pieces.** Do not let different karats be weighed as one lot. A bag containing 21K and 14K weighed together and paid at the lower rate costs you real money. Sort by hallmark before you go.

**Ask them to weigh in front of you.** Standard practice at any reputable shop, and there is no reason to accept less.

## Timing, honestly

The temptation is to say "sell when the price is high." Truthfully, nobody reliably calls the top, and gold is held by most families in this region for reasons that are not really about market timing — it is savings, it is a wedding, it is the reserve you draw on when something urgent happens.

The more useful advice is narrower: **do not sell in a hurry if you can avoid it.** The worst prices are accepted by people who need cash today and will take the first offer. If you have even a few days, you can compare offers, and the difference between the first offer and the best of three is often larger than any week's move in the gold price itself.

## The structural takeaway

If your reason for holding gold is savings rather than adornment, the buy-back arithmetic argues for **minimising making charges at purchase** — plain heavy pieces or bullion, not intricate work. You will get a far higher fraction of your money back.

If your reason is that you want to own something beautiful, none of this should stop you. Just buy it knowing which part of the price is the metal and which part is the object.`,
    body_ar: `اللحظة التي تفاجئ الناس ليست الشراء. بل البيع.

دفعت سعر الجرام زائد المصنعية. وبعد شهور أو سنوات تعيد القطعة، فيزنها المحل ويعرض عليك رقمًا أدنى بوضوح من سعر الجرام المعلن في الصباح نفسه. ولم يحدث بالضرورة أي شيء غير سليم. وإليك أين يذهب الفارق.

## الخصومات الثلاثة

**1. المصنعية ذهبت.** وهي أكبر مكوّن مفرد، وقد اختفت يوم اشتريت. فالمحل يشتري معدنًا ليصهره، والحرفية لا قيمة لها عنده. فإن كنت دفعت 20% فوق قيمة الذهب مصنعية، فقد كنت متأخرًا بنحو 20% منذ اليوم الأول.

**2. فاقد التكرير.** فصهر الذهب الخردة لاستخلاص معدن نظيف يفقد شيئًا منه ويكلّف مالًا. والمشتري يحسب ذلك.

**3. هامش التاجر.** فهو يشتري دون السوق ويبيع فوقها. وتلك الفجوة هي التجارة.

ومعًا تعني هذه الثلاثة أن **عرض الشراء دون سعر الجرام المعلن أمر طبيعي**، لا احتيال. وما يختلف — وما يستحق أن تبحث عنه بين المحلات — هو *كم* دون ذلك.

## كيف يبدو العرض المعقول

يُحسب الشراء العادل من **الوزن × النقاء × السعر الفوري لليوم**، ناقصًا خصمًا معتدلًا. والخصم هو موضع اختلاف الأسواق:

- في أسواق الذهب العميقة التنافسية ذات المشترين الكثر المتقاربين، يميل الخصم إلى الصغر، لأنك تستطيع ببساطة أن تمشي إلى المحل التالي.
- وفي الأسواق الأقل مشترين، أو للعيارات التي لا تتعامل بها التجارة المحلية عادة، قد يكون أكبر بكثير.

وهذه النقطة الأخيرة مهمة. **عيار 14 في سوق عيار 21 هو المثال الكلاسيكي** — فالتجارة المحلية ليست مهيأة لصهره وإعادة تكريره، فتسعّره المحلات بضعف أو ترفضه صراحة. والقطعة نفسها كانت ستُتداول عاديًا في سوق معياره 585.

## ما تفعله قبل أن تبيع

**اعرف قيمة المعدن أولًا.** زِن القطعة، وسجّل العيار من الختم، ثم احسب: الوزن بالجرام × النقاء × سعر جرام الذهب الخالص اليوم. ذلك الرقم خط أساسك. ويعطيك هذا الموقع سعر الجرام لعيارك وعملتك، فتصل وأنت تعرف الرقم بدل أن تكتشفه عند الطاولة.

**احصل على أكثر من عرض.** فخصومات الشراء غير موحّدة. وقد يختلف محلان في الشارع نفسه اختلافًا معتبرًا، ولا سبيل للمعرفة إلا بسؤالهما معًا.

**أحضر الأوراق.** فالفاتورة الأصلية التي تذكر العيار والوزن تزيل أي جدال حول ماهية القطعة.

**افصل القطع.** لا تدع عيارات مختلفة تُوزن دفعة واحدة. فكيس فيه عيار 21 وعيار 14 يوزن معًا ويُدفع بالسعر الأدنى يكلّفك مالًا حقيقيًا. رتّبها بحسب الختم قبل الذهاب.

**اطلب الوزن أمامك.** ممارسة معتادة في أي محل محترم، ولا داعي لقبول أقل منها.

## التوقيت، بصراحة

الإغراء أن يقال «بِع حين يرتفع السعر». والحقيقة أن أحدًا لا يصيب القمة بانتظام، وأن معظم الأسر في هذه المنطقة تحتفظ بالذهب لأسباب لا علاقة لها فعلًا بتوقيت السوق — فهو ادخار، وهو عرس، وهو الاحتياطي الذي يُسحب منه حين يقع أمر عاجل.

والنصيحة الأنفع أضيق: **لا تبع على عجل إن استطعت.** فأسوأ الأسعار يقبلها من يحتاج النقد اليوم فيأخذ أول عرض. وإن كان لديك بضعة أيام أمكنك مقارنة العروض، والفارق بين أول عرض وأفضل ثلاثة كثيرًا ما يفوق حركة سعر الذهب في أسبوع كامل.

## الخلاصة البنيوية

إن كان سبب اقتنائك الذهب هو الادخار لا الزينة، فحساب إعادة البيع يرجّح **تقليل المصنعية عند الشراء** — قطع ثقيلة سادة أو سبائك، لا شغلًا معقدًا. وستسترد نسبة أعلى بكثير من مالك.

وإن كان سببك أنك تريد أن تملك شيئًا جميلًا، فلا ينبغي لشيء من هذا أن يمنعك. اشترِه فقط وأنت تعرف أي جزء من الثمن معدن وأي جزء منه القطعة نفسها.`,
  },
  {
    slug: "why-neighbouring-countries-differ",
    publishedAt: "2026-08-19T09:00:00Z",
    title_en: "Same Gold, Different Price: Why Neighbouring Countries Don't Match",
    title_ar: "الذهب نفسه بسعر مختلف: لماذا لا تتطابق الدول المتجاورة",
    description_en:
      "Gold has one world price. So why does a gram cost more in one country than the next one over? VAT, import duty, currency regime and market depth — the four things that pull a local price away from spot.",
    description_ar:
      "للذهب سعر عالمي واحد. فلماذا يكلّف الجرام في بلد أكثر من جاره؟ ضريبة القيمة المضافة والرسوم الجمركية ونظام العملة وعمق السوق — أربعة عوامل تبعد السعر المحلي عن السعر الفوري.",
    tags: ["pricing", "vat", "comparison", "education", "gulf"],
    author: AUTHOR,
    body_en: `Gold is close to a perfectly global commodity. A kilogram in Zurich is chemically identical to a kilogram in Dubai, it is easy to transport relative to its value, and it trades continuously worldwide. In theory the price should be the same everywhere.

In practice, cross a border and the number on the board changes. Four things explain almost all of it.

## 1. Tax

The most direct cause, and the easiest to check.

Some jurisdictions apply VAT to gold jewellery; many exempt investment-grade bullion above a purity threshold while still taxing ornament. That distinction can put a visible wedge between the price of a 999 bar and a 750 bracelet in the very same shop.

Where a country applies a consumption tax to jewellery, the retail price simply carries it. Comparing a tax-inclusive shelf price in one country against a tax-exclusive quote in another is not a like-for-like comparison, and it is the most common mistake people make when they conclude gold is "cheaper" somewhere.

## 2. Import duty and logistics

Very little gold is mined where it is sold. It is refined in a handful of places and shipped. Landing it involves freight, insurance, security, and in many countries an import duty.

Countries that position themselves as regional trading hubs tend to keep those frictions deliberately low, which is a large part of why certain Gulf markets are known for competitive gold pricing. Countries that levy meaningful import duty on gold push their retail prices structurally above the world price, and the gap persists because it is a policy, not a market inefficiency.

## 3. The currency regime

This one is invisible on the shelf but often the biggest factor of all.

If a currency is **pegged to the dollar**, the local gold price tracks the world spot price almost exactly, because the conversion factor barely moves. Several Gulf currencies work this way, which is why their gold prices look so stable in local terms even when the dollar price is moving.

If a currency **floats**, the local price reflects two things moving at once — the metal and the exchange rate. A local price can rise on a day gold fell, purely because the currency weakened.

And if a currency has **more than one effective rate**, the question of the "correct" local price genuinely has more than one answer. We wrote about that separately, because in those markets the exchange rate often matters more than the metal.

## 4. Market depth and the dominant karat

A market with hundreds of competing jewellers within walking distance prices differently from one with a handful of shops serving a wide area. Competition compresses margins on both the making charge and the buy-back deduction.

The dominant local karat matters too. Buying 22K in a market built around 21K, or 14K in a market built around 22K, usually costs more relative to gold content and fetches less on resale — not because the metal differs, but because the trade around you is not organised for it.

## What this means when comparing prices

- **Compare the same karat.** An 18K gram against a 21K gram is a comparison of two different quantities of gold.
- **Compare the same basis.** Our per-gram figures are spot value, before making charges, shop margin, and local tax. A shelf price includes all three.
- **Check whether tax is in or out** before concluding one country is cheaper.
- **Watch the currency**, especially over time. A local price series in a floating currency is partly a chart of that currency.

The country pages on this site show the same global spot price converted into each local currency at the same moment, which is the honest basis for comparison: it isolates the currency effect and tells you what the metal itself is worth where you are. What the shop adds on top is local, and that is exactly what these four factors explain.`,
    body_ar: `الذهب سلعة عالمية إلى حد قريب من الكمال. فالكيلوغرام في زيورخ مطابق كيميائيًا للكيلوغرام في دبي، ونقله سهل قياسًا بقيمته، ويُتداول باستمرار حول العالم. ونظريًا ينبغي أن يكون السعر واحدًا في كل مكان.

وعمليًا، تعبر حدودًا فيتغير الرقم على اللوحة. وأربعة عوامل تفسر ذلك كله تقريبًا.

## 1. الضريبة

السبب الأكثر مباشرة، والأسهل تحققًا.

تفرض بعض الولايات القضائية ضريبة قيمة مضافة على مجوهرات الذهب، وكثير منها يعفي السبائك الاستثمارية فوق عتبة نقاء معينة بينما يظل يفرض الضريبة على الحلي. وهذا التمييز قد يضع فارقًا مرئيًا بين سعر سبيكة 999 وسوار 750 في المحل نفسه.

وحيث تفرض دولة ضريبة استهلاك على المجوهرات، يحملها سعر التجزئة ببساطة. ومقارنة سعر رف شامل للضريبة في بلد بتسعيرة غير شاملة لها في بلد آخر ليست مقارنة متكافئة، وهي أشيع خطأ يقع فيه الناس حين يستنتجون أن الذهب «أرخص» في مكان ما.

## 2. الرسوم الجمركية واللوجستيات

قليل جدًا من الذهب يُستخرج حيث يُباع. بل يُكرَّر في أماكن معدودة ثم يُشحن. وإنزاله يتضمن شحنًا وتأمينًا وحراسة، وفي كثير من الدول رسمًا جمركيًا.

والدول التي تضع نفسها مراكز تجارية إقليمية تميل إلى إبقاء تلك الاحتكاكات منخفضة عمدًا، وهذا جزء كبير من سبب اشتهار أسواق خليجية بعينها بتسعير تنافسي للذهب. أما الدول التي تفرض رسمًا جمركيًا معتبرًا على الذهب فترفع أسعار تجزئتها بنيويًا فوق السعر العالمي، وتستمر الفجوة لأنها سياسة لا قصور سوق.

## 3. نظام العملة

هذا العامل غير مرئي على الرف لكنه غالبًا الأكبر أثرًا.

فإن كانت العملة **مربوطة بالدولار**، تبع سعر الذهب المحلي السعر العالمي الفوري بدقة كبيرة، لأن معامل التحويل بالكاد يتحرك. وهكذا تعمل عدة عملات خليجية، ولهذا تبدو أسعار ذهبها مستقرة جدًا بالعملة المحلية حتى حين يتحرك السعر بالدولار.

وإن كانت العملة **معوَّمة**، عكس السعر المحلي شيئين يتحركان معًا — المعدن وسعر الصرف. وقد يرتفع سعر محلي في يوم انخفض فيه الذهب، لمجرد ضعف العملة.

وإن كان للعملة **أكثر من سعر فاعل**، صار لسؤال السعر المحلي «الصحيح» أكثر من إجابة فعلًا. وقد كتبنا عن ذلك على حدة، لأن سعر الصرف في تلك الأسواق يهم أكثر من المعدن غالبًا.

## 4. عمق السوق والعيار السائد

السوق التي فيها مئات الصاغة المتنافسين على مسافة مشي تسعّر بشكل مختلف عن سوق فيها حفنة محلات تخدم مساحة واسعة. فالمنافسة تضغط الهوامش على المصنعية وعلى خصم إعادة الشراء معًا.

والعيار المحلي السائد يهم كذلك. فشراء عيار 22 في سوق قائمة على عيار 21، أو عيار 14 في سوق قائمة على عيار 22، يكلّف عادة أكثر قياسًا بمحتوى الذهب ويجلب أقل عند إعادة البيع — لا لأن المعدن يختلف، بل لأن التجارة من حولك ليست منظَّمة له.

## ماذا يعني هذا عند مقارنة الأسعار

- **قارن العيار نفسه.** فجرام عيار 18 مقابل جرام عيار 21 مقارنة بين كميتين مختلفتين من الذهب.
- **قارن الأساس نفسه.** فأرقامنا للجرام قيمة فورية، قبل المصنعية وهامش المحل والضريبة المحلية. أما سعر الرف فيشمل الثلاثة.
- **تحقق هل الضريبة داخلة أم خارجة** قبل أن تستنتج أن بلدًا أرخص.
- **راقب العملة**، خصوصًا عبر الزمن. فسلسلة أسعار محلية بعملة معوَّمة هي جزئيًا رسم بياني لتلك العملة.

تعرض صفحات الدول في هذا الموقع السعر العالمي الفوري نفسه محوَّلًا إلى كل عملة محلية في اللحظة ذاتها، وهو الأساس النزيه للمقارنة: إذ يعزل أثر العملة ويخبرك كم يساوي المعدن نفسه حيث أنت. أما ما يضيفه المحل فوق ذلك فمحلي، وهو بالضبط ما تفسّره هذه العوامل الأربعة.`,
  },
  {
    slug: "18k-or-21k-for-daily-wear",
    publishedAt: "2026-08-28T09:00:00Z",
    title_en: "18K or 21K? Choosing a Karat You'll Actually Wear Every Day",
    title_ar: "عيار 18 أم 21؟ اختيار عيار ترتديه فعلًا كل يوم",
    description_en:
      "Higher purity is not automatically the better buy. The practical trade-off between 18K and 21K comes down to how you will wear the piece, whether it holds stones, and whether you are buying jewellery or savings.",
    description_ar:
      "النقاء الأعلى ليس بالضرورة الشراء الأفضل. المفاضلة العملية بين عيار 18 و21 تتوقف على كيف ستلبس القطعة، وهل تحمل أحجارًا، وهل تشتري حليًا أم ادخارًا.",
    tags: ["18k", "21k", "buying-guide", "jewellery", "comparison"],
    author: AUTHOR,
    body_en: `The instinct is that more gold is better. Buyers often reach for the highest karat they can afford and treat anything lower as a compromise. For a piece you will wear every day, that instinct is frequently wrong — and the reason is metallurgy, not marketing.

## What the two actually are

**21K** is 87.5% gold, stamped 875, and it is the Middle East's own standard — dominant from Cairo to Kuwait, uncommon in Europe.

**18K** is 75% gold, stamped 750, and it is the international standard for fine jewellery, used by most European and designer houses.

The 12.5 percentage points between them are not a rounding difference. They change how the metal behaves.

## Hardness is the whole argument

Pure gold is soft. Every point of alloy added makes the finished piece harder and more resistant to scratching, bending and the slow deformation that comes from being worn against desks, steering wheels, keyboards and washing-up.

18K is meaningfully harder than 21K. In practice that means:

- **A daily ring** — 18K keeps its shape and finish longer. A 21K ring worn daily for years will show it.
- **A bracelet or watch-adjacent piece** — anything knocked against hard surfaces favours 18K.
- **An occasional necklace** — 21K is fine. It is not taking the same punishment.

## Stones settle the question

If a piece holds gemstones, the case for 18K is close to decisive. The prongs and settings that grip a stone have to be bent into place and then **stay** bent. Softer gold lets settings gradually open, and stones work loose and are lost.

This is why fine jewellery worldwide is overwhelmingly 18K, and why a jeweller who steers you toward 18K for a stone-set ring is giving you good advice rather than selling you less gold.

## Colour, if it matters to you

21K carries the deep warm yellow that most buyers in the region read as "real gold". 18K is slightly paler in its yellow form — noticeable side by side, easy to miss on its own.

18K is also the karat that carries colour variants, because there is enough alloy to work with. A copper-heavy mix produces rose gold; palladium or nickel produces white gold. If you want anything other than yellow, you are generally choosing 18K by default.

## The savings argument, stated honestly

If you are buying gold partly as a store of value, 21K holds more gold per gram and is the karat the regional trade is built around, which means a deeper and more predictable buy-back market close to home.

But be careful with the per-gram comparison. **18K looks cheaper per gram because it contains less gold — that is arithmetic, not a discount.** And when you sell, the shop pays on 75% of the weight rather than 87.5%. Compare the two by gold content, never by the sticker price.

## A simple way to decide

- **Everyday ring, especially with stones** → 18K
- **Occasional or ceremonial jewellery** → 21K
- **Buying primarily to store value** → 21K, or 24K bullion if you do not need to wear it
- **You want rose or white gold** → 18K
- **You want the deep yellow associated with Gulf gold** → 21K

There is no universally better karat, which is why both exist and why the same shop sells you both without contradicting itself. The right one depends on whether the piece is going to live in a box or on your hand.

You can compare today's per-gram price for both karats in your own currency on this site before you go, so the only thing left to decide in the shop is the piece itself.`,
    body_ar: `الحدس يقول إن الذهب الأكثر أفضل. وكثيرًا ما يقصد المشترون أعلى عيار يستطيعونه ويعدّون ما دونه تنازلًا. وبالنسبة لقطعة ستلبسها كل يوم، هذا الحدس خاطئ في أحيان كثيرة — والسبب علم المعادن لا الدعاية.

## ما هما فعليًا

**عيار 21** ذهب بنسبة 87.5%، يُختم 875، وهو معيار الشرق الأوسط الخاص — سائد من القاهرة إلى الكويت، نادر في أوروبا.

**عيار 18** ذهب بنسبة 75%، يُختم 750، وهو المعيار الدولي للمجوهرات الراقية، وتستعمله معظم البيوت الأوروبية ودور التصميم.

والنقاط المئوية الاثنتا عشرة ونصف بينهما ليست فرق تقريب. بل تغيّر سلوك المعدن.

## الصلابة هي الحجة كلها

الذهب الخالص ليّن. وكل قدر من السبيكة يُضاف يجعل القطعة النهائية أصلب وأقدر على مقاومة الخدش والانحناء والتشوّه البطيء الناتج عن الاحتكاك بالمكاتب ومقاود السيارات ولوحات المفاتيح وغسيل الصحون.

وعيار 18 أصلب بوضوح من عيار 21. وعمليًا يعني ذلك:

- **خاتم يومي** — يحفظ عيار 18 شكله ولمعته أطول. أما خاتم عيار 21 يُلبس يوميًا سنوات فسيظهر عليه ذلك.
- **سوار أو قطعة قريبة من الساعة** — كل ما يُطرق على أسطح صلبة يرجّح عيار 18.
- **قلادة للمناسبات** — عيار 21 مناسب. فهي لا تتعرض للإجهاد نفسه.

## الأحجار تحسم المسألة

إن كانت القطعة تحمل أحجارًا كريمة، فحجة عيار 18 تكاد تكون قاطعة. فالمخالب والتركيبات التي تمسك الحجر يجب أن تُثنى في موضعها ثم **تبقى** مثنية. والذهب الأليَن يترك التركيبات تنفتح تدريجيًا، فتتراخى الأحجار وتُفقد.

ولهذا فإن المجوهرات الراقية عالميًا من عيار 18 في الغالب الأعم، ولهذا فإن الصائغ الذي يوجّهك إلى عيار 18 لخاتم مرصّع يسدي إليك نصحًا جيدًا لا يبيعك ذهبًا أقل.

## اللون، إن كان يهمك

يحمل عيار 21 الصفرة الدافئة العميقة التي يقرأها معظم مشتري المنطقة «ذهبًا حقيقيًا». وعيار 18 أشحب قليلًا في صورته الصفراء — يُلحظ عند المقارنة جنبًا إلى جنب، ويسهل ألا يُلحظ منفردًا.

وعيار 18 هو أيضًا العيار الذي يحمل تنويعات اللون، لأن فيه سبيكة كافية للعمل. فالخلطة الغنية بالنحاس تنتج الذهب الوردي، والبلاديوم أو النيكل ينتج الذهب الأبيض. فإن أردت غير الأصفر فأنت تختار عيار 18 افتراضًا في الغالب.

## حجة الادخار، بصدق

إن كنت تشتري الذهب جزئيًا مخزنًا للقيمة، فعيار 21 يحمل ذهبًا أكثر لكل جرام وهو العيار الذي تقوم عليه التجارة الإقليمية، ما يعني سوق إعادة شراء أعمق وأكثر قابلية للتوقع قريبًا منك.

لكن احذر مقارنة سعر الجرام. **يبدو عيار 18 أرخص للجرام لأنه يحتوي ذهبًا أقل — وذلك حساب لا حسم.** وعند البيع يدفع المحل على 75% من الوزن لا 87.5%. فقارن بينهما بمحتوى الذهب لا بالسعر المعلن.

## طريقة بسيطة للاختيار

- **خاتم يومي، خصوصًا بأحجار** ← عيار 18
- **حلي للمناسبات أو للاحتفالات** ← عيار 21
- **شراء لتخزين القيمة أساسًا** ← عيار 21، أو سبائك عيار 24 إن لم تكن بحاجة إلى لبسه
- **تريد ذهبًا ورديًا أو أبيض** ← عيار 18
- **تريد الصفرة العميقة المرتبطة بذهب الخليج** ← عيار 21

لا يوجد عيار أفضل على الإطلاق، ولهذا يوجد الاثنان، ولهذا يبيعك المحل نفسه كليهما دون أن يناقض نفسه. والصحيح منهما يتوقف على ما إذا كانت القطعة ستعيش في علبة أم على يدك.

ويمكنك مقارنة سعر الجرام اليوم للعيارين بعملتك على هذا الموقع قبل الذهاب، فلا يبقى أمامك في المحل إلا اختيار القطعة نفسها.`,
  },
];
