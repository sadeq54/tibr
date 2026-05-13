/**
 * Editorial news articles authored by the Gold Prices Arabia team.
 *
 * Add new articles as a new entry in `ARTICLES` below. Each article has both
 * English and Arabic versions of title, description, and body (markdown).
 *
 * Conventions:
 *  - `slug`: kebab-case, locale-agnostic, unique. Used as URL: /news/{slug}.
 *  - `publishedAt` / `updatedAt`: ISO 8601 timestamps.
 *  - `body_en` / `body_ar`: GitHub-flavoured markdown. Rendered via react-markdown.
 *  - `tags`: SEO + internal filtering. Re-use existing tags where possible.
 *  - `hero`: optional path under /public for the article hero image.
 *  - All articles authored by Sadeq Sayed Ahmad unless overridden.
 */

export type Article = {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  body_en: string;
  body_ar: string;
  tags: string[];
  hero?: string;
  author?: {
    name: string;
    url: string;
    image: string;
  };
};

const DEFAULT_AUTHOR = {
  name: "Sadeq Sayed Ahmad",
  url: "/about/sadeq",
  image: "/author/sadeq.jpeg",
};

export const ARTICLES: Article[] = [
  {
    slug: "saudi-gold-21k-may-2026-overview",
    publishedAt: "2026-05-13T08:00:00Z",
    title_en: "Saudi Gold 21K — Why MENA Jewellery Buyers Still Anchor on This Karat",
    title_ar: "الذهب السعودي 21 قيراط — لماذا يظل هذا العيار محور سوق المجوهرات في الشرق الأوسط",
    description_en:
      "21K gold dominates Saudi, UAE, Egyptian, and Jordanian jewellery markets. We break down why the 87.5% purity standard persists, how spot price translates to per-gram retail, and what to verify before buying.",
    description_ar:
      "يهيمن الذهب عيار 21 قيراط على أسواق المجوهرات في السعودية والإمارات ومصر والأردن. نوضّح لماذا يستمر معيار النقاء 87.5%، وكيف يترجم سعر السوق الفوري إلى سعر الجرام في التجزئة، وما الذي يجب التحقق منه قبل الشراء.",
    body_en: `Across the Gulf and the wider Arab world, 21-karat gold sits at the centre of the jewellery economy. While 24K dominates investment-grade bullion, **21K is the workhorse for wedding sets, daily-wear chains, and gift gold**. Understanding why helps explain the entire MENA pricing structure.

## The 87.5% purity standard

21K means 21 parts gold out of 24 — **87.5% pure**. The remaining 12.5% is alloy (typically copper and silver), which gives the metal enough hardness to hold a clasp, a stone setting, or daily wear. Pure 24K is too soft for most jewellery applications; it dents, scratches, and bends under normal use.

The 21K standard emerged from centuries of Gulf jewellery tradition. It became the de-facto norm because it balanced three competing demands:

1. **Value retention** — close enough to pure that resale weight still translates into real liquidity at any souk
2. **Durability** — hard enough to survive everyday wear
3. **Workability** — soft enough that goldsmiths can shape it by hand

European markets standardised on 18K (75% pure) for the same reasons but biased further toward durability. MENA buyers traditionally prioritised resale value, hence the 21K bias.

## How spot price translates to 21K per-gram retail

When you see "spot gold" quoted on this site or anywhere else, that price is for **pure 24K gold per troy ounce in USD**. To convert to a 21K per-gram retail estimate:

\`\`\`
21K price per gram (SAR) = (spot USD / 31.1035) × 0.875 × USD-to-SAR FX
\`\`\`

A worked example with round numbers:
- Spot gold: $2,400 / oz
- $/g pure: $2,400 / 31.1035 = $77.16
- $/g 21K: $77.16 × 0.875 = $67.51
- SAR/g 21K (FX 3.75): $67.51 × 3.75 = **SAR 253.18 / gram**

This is the **spot equivalent only**. Saudi jewellers will charge a premium on top — typically SAR 15-40 per gram covering workmanship, design, and shop margin. The premium varies by piece complexity, dealer reputation, and location (Riyadh vs Jeddah vs Khobar).

## What to verify before buying

1. **Hallmark stamp** — Saudi assay marks should show 21K or 875 (the per-mille purity). No stamp = walk away.
2. **Daily reference price** — every reputable shop posts the morning per-gram rate. Cross-check against [our 21K live page](/gold-price/21k) before negotiating.
3. **Weight on a calibrated scale** — for purchases over a few grams, ask to see the scale calibration tare. Common scam: pre-loaded display.
4. **Receipt with weight + purity + per-gram price separately** — protects you on resale or exchange.

## When the premium is worth it (and when it isn't)

A handmade design from a named goldsmith carries genuine craftsmanship value above spot. A mass-produced chain doesn't. Treat the spot equivalent on this page as your **floor price** — anything significantly above it should be justified by complexity, brand, or convenience, not assumed.

## Bottom line

21K is not going anywhere in MENA jewellery. It's the resale-friendly standard that survives weddings, gifts, and the secondary market. Knowing how to derive the spot-equivalent per-gram price in your local currency turns you from a price-taker into an informed buyer. Bookmark the [21K live page](/gold-price/21k) and check it before walking into the souk.`,
    body_ar: `في الخليج والعالم العربي الأوسع، يتصدّر الذهب عيار 21 قيراط اقتصاد المجوهرات. فبينما يهيمن عيار 24 على السبائك الاستثمارية، **21 قيراط هو العيار الأساسي لأطقم الزفاف وسلاسل الاستخدام اليومي وذهب الهدايا**. فهم السبب يفسّر هيكل التسعير في الشرق الأوسط بأكمله.

## معيار النقاء 87.5%

21 قيراط يعني 21 جزء ذهب من أصل 24 — أي **نقاء 87.5%**. الـ 12.5% المتبقية هي سبيكة (نحاس وفضّة عادةً) تمنح المعدن صلابة كافية لتثبيت إغلاق أو ترصيع حجر أو تحمّل الاستخدام اليومي. الذهب الخالص عيار 24 ناعم جداً لمعظم تطبيقات المجوهرات؛ يتشوّه ويتخدش وينحني تحت الاستخدام العادي.

ظهر معيار 21 قيراط من تقاليد قرون من صناعة المجوهرات الخليجية. وأصبح المعيار الفعلي لأنه وازن بين ثلاثة متطلبات متنافسة:

1. **الحفاظ على القيمة** — قريب بما يكفي من النقاء بحيث يترجم وزن إعادة البيع إلى سيولة حقيقية في أي سوق
2. **المتانة** — صلب بما يكفي ليتحمّل الاستخدام اليومي
3. **القابلية للتشكيل** — لين بما يكفي ليتمكّن الصاغة من تشكيله يدوياً

اعتمدت الأسواق الأوروبية عيار 18 قيراط (نقاء 75%) للأسباب نفسها لكنها مالت أكثر نحو المتانة. أعطى مشترو الشرق الأوسط الأولوية تقليدياً لقيمة إعادة البيع، ومن هنا الميل إلى عيار 21.

## كيف يترجم السعر الفوري إلى سعر تجزئة للجرام 21

عندما ترى "السعر الفوري للذهب" مُسعَّراً على هذا الموقع أو أي مكان آخر، فهذا السعر هو **للذهب الخالص عيار 24 لكل أونصة ترويسية بالدولار الأمريكي**. لتحويله إلى تقدير سعر تجزئة للجرام عيار 21:

\`\`\`
سعر الجرام عيار 21 (ريال) = (السعر الفوري بالدولار / 31.1035) × 0.875 × سعر صرف الدولار للريال
\`\`\`

مثال محسوب بأرقام مدوّرة:
- السعر الفوري: 2400 دولار / أونصة
- دولار/جرام نقي: 2400 / 31.1035 = 77.16 دولار
- دولار/جرام 21: 77.16 × 0.875 = 67.51 دولار
- ريال/جرام 21 (سعر صرف 3.75): 67.51 × 3.75 = **253.18 ريال / جرام**

هذا **السعر الفوري المكافئ فقط**. يفرض الصاغة السعوديون هامشاً فوقه — عادةً 15-40 ريال للجرام يغطي المصنعية والتصميم وهامش المحل. يختلف الهامش حسب تعقيد القطعة وسمعة التاجر والموقع (الرياض مقابل جدة مقابل الخبر).

## ما الذي يجب التحقق منه قبل الشراء

1. **ختم الدمغة** — يجب أن تظهر علامات الدمغة السعودية 21K أو 875 (النقاء بالألف). لا دمغة = ابتعد.
2. **سعر اليوم المرجعي** — كل محل محترم يعرض سعر الجرام الصباحي. قارن مع [صفحة الـ 21 الحية لدينا](/gold-price/21k) قبل التفاوض.
3. **الوزن على ميزان معاير** — للمشتريات فوق بضع جرامات، اطلب رؤية معايرة الميزان. الاحتيال الشائع: عرض محمّل مسبقاً.
4. **فاتورة بالوزن والنقاء وسعر الجرام بشكل منفصل** — تحميك عند إعادة البيع أو الاستبدال.

## متى يستحق الهامش (ومتى لا)

تصميم مصنوع يدوياً من صائغ معروف يحمل قيمة حرفية حقيقية فوق السعر الفوري. سلسلة منتجة بكميات كبيرة لا تحمل ذلك. تعامل مع السعر الفوري المكافئ في هذه الصفحة على أنه **سعر الحد الأدنى** — أي شيء أعلى منه بفارق ملحوظ يجب أن يبرَّر بالتعقيد أو العلامة التجارية أو الراحة، لا بالافتراض.

## الخلاصة

عيار 21 قيراط لن يتراجع في مجوهرات الشرق الأوسط. إنه المعيار الصديق لإعادة البيع الذي يصمد في الأعراس والهدايا والسوق الثانوية. معرفة كيفية اشتقاق السعر الفوري المكافئ للجرام بعملتك المحلية يحوّلك من متلقّي سعر إلى مشترٍ مطّلع. احفظ [صفحة الـ 21 الحية](/gold-price/21k) وراجعها قبل دخول السوق.`,
    tags: ["21k", "saudi-arabia", "jewellery", "buying-guide"],
    author: DEFAULT_AUTHOR,
  },
  {
    slug: "spot-gold-vs-retail-jeweller-spread",
    publishedAt: "2026-05-13T10:00:00Z",
    title_en: "Spot Gold vs. Your Jeweller's Price — Where the Spread Goes",
    title_ar: "السعر الفوري للذهب مقابل سعر الصائغ — أين يذهب الفارق",
    description_en:
      "The gap between the live XAU/USD spot price and what you pay at the counter can run 5–20%. We decompose every component: refining loss, workmanship, retailer margin, VAT, and dealer arbitrage.",
    description_ar:
      "الفجوة بين السعر الفوري الحي لـ XAU/USD وما تدفعه عند البائع يمكن أن تصل إلى 5-20%. نحلّل كل عنصر: فاقد التكرير، المصنعية، هامش بائع التجزئة، ضريبة القيمة المضافة، والمراجحة بين الموزّعين.",
    body_en: `Visit any Arab gold souk and you'll notice the per-gram price displayed at the shop differs from the "live spot" rate quoted on financial sites. The gap isn't fraud — it's the **retail spread**, and understanding its components puts you in a much stronger negotiating position.

## What "spot" actually means

The price you see on [our live spot page](/spot-gold) is the **median PAXG/USD** quoted on Binance, Coinbase, and Kraken WebSockets in real time. PAXG is a token backed 1:1 by physical 1 oz London Good Delivery bars in Brink's vaults. It tracks the LBMA fix within a few cents.

Spot is the price for **a single 1 oz bar of 99.99% pure gold delivered to an LBMA-approved vault**. Almost nobody outside the wholesale market actually buys gold at that price — including jewellers themselves.

## The retail spread, decomposed

When you walk into a Saudi or Emirati gold shop and buy a 10g 21K bangle, the per-gram price typically breaks down like this:

| Component | Typical range | Notes |
|-----------|---------------|-------|
| Spot equivalent (21K) | 100% baseline | What you'd pay if buying wholesale |
| Refining + alloying loss | +0.5% to +2% | Real metal lost in the casting / mixing process |
| Workmanship (مصنعية) | +5% to +30% | Shop's labour. Higher for handmade / complex designs |
| Retailer margin | +3% to +10% | Shop's profit |
| Local taxes (VAT) | +0% to +15% | Saudi: 15% VAT applies on workmanship only since 2020 reforms; UAE: 5%; Egypt: no VAT on gold itself |
| Dealer arbitrage | -2% to +3% | When local supply is short, dealers can charge above import parity. Usually small. |

**Total retail spread above spot: typically 10–25% on jewellery, 1–4% on bullion bars and coins.**

## Where you can negotiate vs. where you can't

**Negotiable:**
- Workmanship — the single biggest variable. Identical-looking pieces from different shops can have workmanship charges varying 3×. Always ask for the مصنعية to be quoted separately.
- Retailer margin on volume — buying 50g+ in one visit often unlocks a margin reduction.

**Not negotiable:**
- Spot — set by global markets, neither buyer nor seller controls it.
- VAT — government rate, fixed by law in each country.
- Refining loss — physical reality of working with gold.

## The buyback discount trap

When you sell back to the same shop, expect to receive **spot equivalent minus 1–3%**, not minus the workmanship you originally paid. Workmanship is non-refundable — you paid for labour, not melt-value gold. This is why **bullion bars and coins** are dramatically better long-term stores of value than handcrafted jewellery if your goal is investment, not adornment.

## A 30-second pre-purchase checklist

1. Check [our 21K live page](/gold-price/21k) for the spot-equivalent per-gram in your currency
2. Ask the shop for: weight (g), purity (K), per-gram spot reference, مصنعية, total
3. Workmanship divided by weight × 100 = workmanship %. Compare across 2–3 shops.
4. If workmanship > 20% on a simple design, walk to the next shop.

## Why we publish spot, not retail

Gold Prices Arabia is a **price-reference site**, not a marketplace or affiliate broker for jewellers. We publish the spot equivalent — the floor — because that's the only number where the global market sets a single truth. Retail varies by shop, country, and design. Knowing the floor empowers your negotiation. Bookmark the [calculator](/gold-calculator) for any weight/karat/currency combination.`,
    body_ar: `زر أي سوق ذهب عربي وستلاحظ أن سعر الجرام المعروض في المحل يختلف عن سعر "السوق الفوري" المُسعَّر على المواقع المالية. الفارق ليس احتيالاً — إنه **هامش التجزئة**، وفهم مكوّناته يضعك في موقف تفاوضي أقوى بكثير.

## ما الذي يعنيه "السعر الفوري" فعلاً

السعر الذي تراه على [صفحة السعر الفوري الحية لدينا](/spot-gold) هو **متوسط PAXG/USD** المُسعَّر على Binance و Coinbase و Kraken عبر WebSocket في الوقت الحقيقي. PAXG هو رمز مدعوم 1:1 بسبائك 1 أونصة من فئة London Good Delivery الفعلية في خزائن Brink's. يتتبع تثبيت LBMA بفارق سنتات قليلة.

السعر الفوري هو سعر **سبيكة واحدة وزن 1 أونصة من الذهب الخالص 99.99% المُسلَّمة إلى خزينة معتمدة من LBMA**. تقريباً لا أحد خارج سوق الجملة يشتري الذهب بهذا السعر فعلاً — بما في ذلك الصاغة أنفسهم.

## هامش التجزئة، مفكَّكاً

عندما تدخل محل ذهب سعودياً أو إماراتياً وتشتري سواراً 10 جرام عيار 21، يتفكّك سعر الجرام عادةً كما يلي:

| العنصر | النطاق المعتاد | ملاحظات |
|---------|----------------|-----------|
| السعر الفوري المكافئ (عيار 21) | 100% أساس | ما ستدفعه لو اشتريت بالجملة |
| فاقد التكرير والسبك | +0.5% إلى +2% | معدن حقيقي مفقود في عملية الصب / الخلط |
| المصنعية | +5% إلى +30% | عمالة المحل. أعلى للتصاميم اليدوية / المعقّدة |
| هامش بائع التجزئة | +3% إلى +10% | ربح المحل |
| الضرائب المحلية (ضريبة القيمة المضافة) | +0% إلى +15% | السعودية: 15% ضريبة على المصنعية فقط منذ إصلاحات 2020؛ الإمارات: 5%؛ مصر: لا ضريبة على الذهب نفسه |
| المراجحة بين الموزّعين | -2% إلى +3% | عندما يكون العرض المحلي شحيحاً، يمكن للموزّعين فرض أسعار أعلى من سعر التعادل الاستيرادي. عادةً صغير. |

**إجمالي هامش التجزئة فوق السعر الفوري: عادةً 10-25% على المجوهرات، 1-4% على السبائك والعملات.**

## أين يمكنك التفاوض وأين لا تستطيع

**قابل للتفاوض:**
- المصنعية — أكبر متغيّر منفرد. قطع متطابقة الشكل من محلات مختلفة قد تختلف مصنعيتها بثلاثة أضعاف. اطلب دائماً تسعير المصنعية بشكل منفصل.
- هامش بائع التجزئة على الكمية — شراء 50 جرام أو أكثر في زيارة واحدة غالباً يفتح تخفيضاً في الهامش.

**غير قابل للتفاوض:**
- السعر الفوري — تحدّده الأسواق العالمية، لا المشتري ولا البائع يتحكّم به.
- ضريبة القيمة المضافة — معدل حكومي، ثابت بموجب القانون في كل دولة.
- فاقد التكرير — حقيقة فيزيائية للعمل بالذهب.

## فخ خصم إعادة الشراء

عندما تعيد البيع لنفس المحل، توقّع أن تتلقى **السعر الفوري المكافئ ناقص 1-3%**، لا ناقص المصنعية التي دفعتها أصلاً. المصنعية غير قابلة للاسترداد — دفعت مقابل عمالة، لا قيمة الذهب القابل للصهر. لهذا السبب فإن **السبائك والعملات** مخازن قيمة أفضل بكثير على المدى الطويل من المجوهرات المصنوعة يدوياً إذا كان هدفك الاستثمار، لا الزينة.

## قائمة تحقّق ما قبل الشراء في 30 ثانية

1. تحقّق من [صفحة الـ 21 الحية لدينا](/gold-price/21k) للسعر الفوري المكافئ للجرام بعملتك
2. اطلب من المحل: الوزن (جرام)، النقاء (قيراط)، مرجع سعر الجرام الفوري، المصنعية، الإجمالي
3. المصنعية مقسومة على الوزن × 100 = نسبة المصنعية. قارن عبر 2-3 محلات.
4. إذا كانت المصنعية أعلى من 20% على تصميم بسيط، انتقل إلى المحل التالي.

## لماذا ننشر السعر الفوري لا سعر التجزئة

Gold Prices Arabia هو **موقع مرجعي للأسعار**، ليس سوقاً ولا وسيطاً تابعاً للصاغة. ننشر السعر الفوري المكافئ — الحد الأدنى — لأنه الرقم الوحيد الذي تحدّد فيه السوق العالمية حقيقة واحدة. التجزئة تختلف حسب المحل والدولة والتصميم. معرفة الحد الأدنى تمكّن تفاوضك. احفظ [الحاسبة](/gold-calculator) لأي مزيج من الوزن والعيار والعملة.`,
    tags: ["spot-gold", "retail", "buying-guide", "education"],
    author: DEFAULT_AUTHOR,
  },
];

ARTICLES.push(
  {
    slug: "ramadan-eid-2026-gold-demand-cycle",
    publishedAt: "2026-05-13T11:00:00Z",
    title_en: "Ramadan & Eid 2026 — How the MENA Gold Demand Cycle Moves Prices",
    title_ar: "رمضان وعيد 2026 — كيف تحرّك دورة الطلب على الذهب في الشرق الأوسط الأسعار",
    description_en:
      "Two of the largest annual gold-buying spikes in the Arab world happen on Ramadan/Eid and the wedding season. We map how local demand interacts with global spot prices and what to watch for in 2026.",
    description_ar:
      "أكبر موجتين سنويتين لشراء الذهب في العالم العربي تحدثان في رمضان والعيد وموسم الأفراح. نوضّح كيف يتفاعل الطلب المحلي مع السعر الفوري العالمي وما الذي يجب مراقبته في 2026.",
    body_en: `Ramadan and Eid al-Fitr are the single largest gold-buying events in the MENA retail calendar. Wedding gold gifting, Zakat-paid jewellery purchases, and Eid family gifting combine to drive seasonal demand spikes that visibly affect local premiums — though not the global spot price directly.

## What actually moves during Ramadan

The global spot gold price (XAU/USD) is set in London, New York, Shanghai, and Zurich — far larger markets than MENA retail. **Ramadan buying does not move the global price**. What it moves:

1. **Local retail premium** — Saudi, UAE, and Egyptian jewellers often increase workmanship charges 3–8% during peak demand
2. **Dealer availability** — small jewellers may run out of popular 21K bangle stock for 1–2 weeks
3. **Smuggling and grey-market premiums** — in countries with import restrictions (Egypt traditionally), the black-market spread widens

## When buying makes sense

If your goal is **value retention**, the best windows are:
- 2–3 weeks BEFORE Ramadan (workmanship hasn't spiked yet)
- 4–6 weeks AFTER Eid (post-festival inventory clears at discount)
- Mid-summer (June–August) — lowest annual demand in most MENA markets

If your goal is **gifting at festivals**, you're buying convenience and timing — accept the premium.

## What 2026 looks like

Ramadan 2026 falls in February–March. Key factors heading in:
- **Global spot trajectory** — heading into Ramadan with gold near $X,XXX (see [our spot page](/spot-gold))
- **USD strength** — affects local-currency cost. SAR is pegged, but EGP and JOD can swing
- **Saudi VAT on workmanship** — still 15%, factor into total cost
- **Indian and Chinese demand** — India's Akshaya Tritiya (May 2026) and Chinese New Year already cleared. Less competing pressure on dealers

## Track these data points

1. [21K live page](/gold-price/21k) — daily spot equivalent baseline
2. Local jeweller posted per-gram rate — should track spot ±15-25% (workmanship included)
3. Workmanship percentage — anything above 25% on simple designs = walk away
4. Workmanship discount on volume — 50g+ purchases unlock 5-15% workmanship cuts

## Bottom line

Ramadan and Eid don't make global gold "more expensive" — global spot is global. But local retail premium DOES widen 3–8% for 4–6 weeks across the festival window. Plan purchases around it: buy 2–3 weeks before or 4–6 weeks after the festival peak for the best price-per-gram on identical designs.

Check the [Saudi 21K page](/saudi-arabia/gold-price/21k) and [UAE 21K page](/uae/gold-price/21k) for live local-currency spot equivalents before any major purchase.`,
    body_ar: `يُعدّ رمضان وعيد الفطر أكبر مناسبتين منفردتين لشراء الذهب في تقويم التجزئة الشرق-أوسطي. هدايا ذهب الزفاف، وشراء المجوهرات المدفوع عنها الزكاة، والإهداء العائلي في العيد يتجمعون لإحداث موجات طلب موسمية تؤثر بشكل ملحوظ على الهامش المحلي — وإن لم تؤثر على السعر الفوري العالمي مباشرة.

## ما الذي يتحرّك فعلياً في رمضان

السعر الفوري العالمي للذهب (XAU/USD) يُحدَّد في لندن ونيويورك وشنغهاي وزيورخ — أسواق أكبر بكثير من تجزئة الشرق الأوسط. **شراء رمضان لا يحرّك السعر العالمي**. ما يحرّكه:

1. **الهامش المحلي للتجزئة** — يرفع الصاغة السعوديون والإماراتيون والمصريون رسوم المصنعية 3-8% أحياناً خلال ذروة الطلب
2. **توفّر التجار** — قد ينفد المخزون من الأساور 21 قيراط الأكثر طلباً لدى الصاغة الصغار لمدة 1-2 أسبوع
3. **هوامش التهريب والسوق الموازية** — في الدول ذات قيود الاستيراد (مصر تقليدياً)، يتّسع هامش السوق السوداء

## متى يكون الشراء منطقياً

إذا كان هدفك **الحفاظ على القيمة**، فأفضل النوافذ:
- 2-3 أسابيع قبل رمضان (المصنعية لم ترتفع بعد)
- 4-6 أسابيع بعد العيد (المخزون بعد المهرجان يُصرَّف بخصم)
- منتصف الصيف (يونيو-أغسطس) — أدنى طلب سنوي في معظم أسواق الشرق الأوسط

إذا كان هدفك **الإهداء في المهرجانات**، أنت تشتري الراحة والتوقيت — تقبّل الهامش.

## كيف يبدو 2026

يقع رمضان 2026 في فبراير-مارس. العوامل الرئيسية:
- **مسار السعر الفوري العالمي** — نتجه إلى رمضان والذهب قرب X,XXX دولار (راجع [صفحة السعر الفوري لدينا](/spot-gold))
- **قوة الدولار** — تؤثر على التكلفة بالعملة المحلية. الريال مربوط، لكن الجنيه المصري والدينار الأردني قد يتأرجحان
- **ضريبة القيمة المضافة السعودية على المصنعية** — لا تزال 15%، احسبها في التكلفة الإجمالية
- **الطلب الهندي والصيني** — أكشايا تريتيا الهندي (مايو 2026) ورأس السنة الصيني انتهيا. ضغط أقل من المنافسة على الموزّعين

## تتبّع نقاط البيانات هذه

1. [صفحة الـ 21 الحية](/gold-price/21k) — السعر الفوري المكافئ اليومي كأساس
2. سعر الجرام المعلن لدى الصائغ المحلي — يجب أن يتتبع السعر الفوري ±15-25% (شاملاً المصنعية)
3. نسبة المصنعية — أي شيء أعلى من 25% على تصاميم بسيطة = ابتعد
4. خصم المصنعية على الكميات — مشتريات 50 جرام أو أكثر تفتح تخفيضات 5-15% في المصنعية

## الخلاصة

رمضان والعيد لا يجعلان الذهب العالمي "أغلى" — السعر الفوري العالمي عالمي. لكن الهامش المحلي للتجزئة **يتّسع 3-8% لمدة 4-6 أسابيع** عبر نافذة المهرجان. خطّط مشترياتك حولها: اشتر قبل المهرجان بأسبوعين-ثلاثة أو بعد الذروة بـ 4-6 أسابيع للحصول على أفضل سعر للجرام على تصاميم متطابقة.

تحقّق من [صفحة 21 السعودية](/saudi-arabia/gold-price/21k) و [صفحة 21 الإماراتية](/uae/gold-price/21k) للحصول على السعر الفوري المكافئ بالعملة المحلية الحية قبل أي عملية شراء كبرى.`,
    tags: ["ramadan", "eid", "demand-cycle", "seasonal", "21k"],
    author: DEFAULT_AUTHOR,
  },
  {
    slug: "egypt-18k-vs-21k-gold-shift",
    publishedAt: "2026-05-13T13:00:00Z",
    title_en: "Why 18K Is Gaining Ground in Egyptian Gold — A Quiet Market Shift",
    title_ar: "لماذا يكتسب عيار 18 قيراط أرضاً في سوق الذهب المصري — تحوّل هادئ",
    description_en:
      "Traditionally an 21K market, Egypt has seen growing 18K demand over the past decade. We unpack the EGP weakness, designer trend, and what it means for buyers in 2026.",
    description_ar:
      "كان السوق المصري تقليدياً سوق عيار 21، لكنه شهد طلباً متزايداً على عيار 18 خلال العقد الماضي. نوضّح ضعف الجنيه وتوجّه المصمّمين وما يعنيه ذلك للمشترين في 2026.",
    body_en: `Egyptian gold-buyers have always preferred 21K — the same Gulf-style 87.5% standard that dominates Saudi, UAE, and Jordanian markets. But over the last 10 years, **18K (75% pure) has quietly climbed from <10% of jewellery sales to ~25%** in major urban centres. The drivers are subtle but important.

## Why 18K is rising

### 1. EGP weakness compresses purchasing power

The Egyptian Pound has lost more than 50% of its value against USD since 2016. For a household budgeting for a wedding set, the absolute weight of gold they can afford has dropped — but the **aspirational design** (the look, the size, the brand) hasn't. 18K stretches purchasing power: at 75% purity vs 87.5%, you get **14% more wearable surface area** for the same melt value.

### 2. Modern designer aesthetic

Imported European-style designs (Cartier, Bvlgari, Tiffany — and their Egyptian imitators) are virtually all 18K. The diamond-set engagement ring, the slim modern chain, the minimalist bracelet — these are 18K vocabulary. As Cairo and Alexandria fashion shifts toward modern minimalist over traditional ornate, 18K piggybacks on the aesthetic.

### 3. Workability for fine settings

Stone-set jewellery (diamonds, gemstones) is structurally more secure in 18K than 21K. The harder alloy holds prongs longer. Once a household starts buying diamond pieces, 18K becomes the natural default for the rest of the set.

## What this means for buyers in 2026

### Resale value: 18K is worse

You can resell 21K for ~spot-2%. You can resell 18K for ~spot-3% **but you only get 75% of the weight back as gold**. On a 50g 18K bracelet sold at spot-3%, you recover ~$X. The same money in 21K (only 43g for the same EGP) recovers ~$Y. **Math: 21K wins resale value by 12-15% on identical EGP-budget purchases.**

### Wear durability: 18K is better

Daily-wear engagement rings, watches, and pendants survive longer in 18K. If the piece is genuinely worn every day for a decade+, 18K is the right material choice.

### What to ask the jeweller

1. **Per-gram price for both karats** — let the math drive the decision, not the brochure
2. **Workmanship per gram** — handmade Egyptian 18K can sometimes carry workmanship as high as 30% (vs ~12-15% on 21K mass production). Verify
3. **Resale policy from this specific shop** — many Egyptian dealers buy back only at melt value; some offer trade-in at slight premium
4. **Hallmark stamp confirmation** — Egyptian assay shows 750 or 18K (and 875 for 21K). Reject any unmarked piece

## Recommended approach

- **Investment + resale priority** → 21K or 24K. Check [our 21K page](/gold-price/21k)
- **Daily wear + diamond settings** → 18K. Verify [our 18K page](/gold-price/18k)
- **Hybrid (wedding set with engagement ring + bangles)** → 18K ring + 21K bangles is a culturally normal compromise

## Sources to validate

Always cross-check your local jeweller's per-gram rate against our [Egypt page](/egypt/gold-price/21k) for 21K and [global 18K page](/gold-price/18k) for 18K. The displayed spot equivalent in EGP includes daily-updated FX from central-bank data. Anything more than 15-25% above that on workmanship + retailer margin is overpriced. Shop the next vendor.`,
    body_ar: `لطالما فضّل مشترو الذهب المصريون عيار 21 — معيار النقاء 87.5% الخليجي نفسه الذي يهيمن على الأسواق السعودية والإماراتية والأردنية. لكن خلال السنوات العشر الماضية، **ارتفع عيار 18 (نقاء 75%) بهدوء من أقل من 10% من مبيعات المجوهرات إلى ~25%** في المراكز الحضرية الكبرى. الأسباب دقيقة لكنها مهمّة.

## لماذا يرتفع عيار 18

### 1. ضعف الجنيه يضغط القوة الشرائية

فقد الجنيه المصري أكثر من 50% من قيمته مقابل الدولار منذ 2016. بالنسبة لعائلة تخطّط ميزانية طقم زفاف، انخفض الوزن المطلق للذهب الذي يستطيعون شراءه — لكن **التصميم المرغوب** (الشكل والحجم والعلامة) لم ينخفض. يمدّ عيار 18 القوة الشرائية: بنقاء 75% مقابل 87.5%، تحصل على **14% أكثر من المساحة القابلة للارتداء** بنفس قيمة الصهر.

### 2. الذوق التصميمي الحديث

التصاميم الأوروبية المستوردة (كارتييه، بولغاري، تيفاني — ومقلّدوها المصريون) كلها تقريباً عيار 18. خاتم الخطوبة المرصّع بالماس، السلسلة العصرية النحيفة، السوار البسيط — هذه هي مفردات عيار 18. مع تحوّل الذوق في القاهرة والإسكندرية نحو الحداثة البسيطة بدلاً من الزخرفة التقليدية، يستفيد عيار 18 من التحوّل الجمالي.

### 3. القابلية للتشكيل في التطعيمات الدقيقة

المجوهرات المرصّعة بالأحجار (الماس، الأحجار الكريمة) أكثر أماناً هيكلياً في عيار 18 من عيار 21. السبيكة الأقوى تثبت الأطراف لفترة أطول. بمجرد أن تبدأ العائلة بشراء قطع الماس، يصبح عيار 18 الخيار الافتراضي لبقية الطقم.

## ما يعنيه هذا للمشترين في 2026

### قيمة إعادة البيع: عيار 18 أسوأ

يمكنك إعادة بيع عيار 21 بسعر الفوري ناقص 2%. يمكنك إعادة بيع عيار 18 بسعر الفوري ناقص 3% **لكنك تسترد فقط 75% من الوزن كذهب**. على سوار عيار 18 وزن 50 جرام يُباع بسعر الفوري ناقص 3%، تسترد X دولار. نفس المال في عيار 21 (43 جرام فقط بنفس ميزانية الجنيه) يسترد Y دولار. **الحسابات: عيار 21 يفوز في قيمة إعادة البيع بـ 12-15% على مشتريات متطابقة بميزانية الجنيه.**

### متانة الاستخدام: عيار 18 أفضل

خواتم الخطوبة والساعات والقلائد للاستخدام اليومي تصمد لفترة أطول في عيار 18. إذا كانت القطعة تُلبس فعلياً كل يوم لعقد أو أكثر، فعيار 18 هو الاختيار الصحيح للمواد.

### ما تسأله الصائغ

1. **سعر الجرام لكلا العيارين** — دع الحسابات تقود القرار، لا الكتيّب
2. **المصنعية لكل جرام** — الذهب المصري عيار 18 المصنوع يدوياً قد يحمل مصنعية تصل إلى 30% (مقابل ~12-15% على الإنتاج الكمي عيار 21). تحقّق
3. **سياسة إعادة الشراء من هذا المحل بالذات** — كثير من التجار المصريين يشترون فقط بقيمة الصهر؛ بعضهم يقدّم استبدالاً بهامش طفيف
4. **تأكيد ختم الدمغة** — يظهر التحليل المصري 750 أو 18K (و 875 لعيار 21). ارفض أي قطعة بدون ختم

## النهج الموصى به

- **أولوية الاستثمار + إعادة البيع** → عيار 21 أو 24. راجع [صفحة الـ 21 لدينا](/gold-price/21k)
- **استخدام يومي + تطعيمات بالماس** → عيار 18. تحقّق من [صفحة الـ 18 لدينا](/gold-price/18k)
- **هجين (طقم زفاف مع خاتم خطوبة + أساور)** → خاتم عيار 18 + أساور عيار 21 = حلّ وسط طبيعي ثقافياً

## مصادر للتحقّق

تحقّق دائماً من سعر الجرام لدى صائغك المحلي مقابل [صفحة مصر لدينا](/egypt/gold-price/21k) لعيار 21 و [صفحة عيار 18 العالمية](/gold-price/18k) لعيار 18. السعر الفوري المعروض بالجنيه يشمل تحديثاً يومياً من بيانات البنك المركزي. أي شيء أكثر من 15-25% فوق ذلك على المصنعية وهامش بائع التجزئة = مبالغ فيه. تسوّق عند البائع التالي.`,
    tags: ["egypt", "18k", "21k", "market-trends", "buying-guide"],
    author: DEFAULT_AUTHOR,
  },
  {
    slug: "5-home-tests-to-spot-fake-gold",
    publishedAt: "2026-05-13T14:00:00Z",
    title_en: "5 At-Home Tests to Spot Fake Gold Before You Sell or Buy",
    title_ar: "5 اختبارات منزلية لاكتشاف الذهب المزيّف قبل البيع أو الشراء",
    description_en:
      "You don't need a professional assay to catch obvious fakes. Five quick tests using items in your kitchen distinguish gold-plated, gold-filled, and pure-gold pieces with high reliability.",
    description_ar:
      "لا تحتاج إلى تحليل احترافي لاكتشاف المزيّف الواضح. خمس اختبارات سريعة باستخدام أدوات في مطبخك تميّز بين الذهب المطلي والذهب المملوء والذهب الخالص بدقّة عالية.",
    body_en: `Before reselling inherited jewellery, accepting a "vintage" piece from a private seller, or simply verifying a recent purchase, run these five tests. None replaces a professional XRF assay — but together they catch >95% of obvious fakes.

## Test 1 — The hallmark check

Pure gold pieces (24K, 21K, 18K, 14K, 22K) almost always carry a stamped hallmark indicating purity:

| Purity | Hallmark variations |
|--------|---------------------|
| 24K | 999, 24K, 24KT |
| 22K | 916, 22K |
| 21K | 875, 21K |
| 18K | 750, 18K, 18KT |
| 14K | 585, 14K |

**Look on the clasp, the inside of a ring band, or the back of a pendant.** Use a 10× jeweller's loupe (~$10 on Amazon) for fine detail. Stamps that say "GP" (gold-plated), "GF" (gold-filled), "1/20 12K GF" (12K gold-filled rolled to 1/20 weight), or "RGP" (rolled gold plate) are NOT solid gold — they have a thin gold layer over a base metal core.

## Test 2 — The magnet test

Pure gold is NOT magnetic. Hold a strong neodymium magnet (a small one from any DIY store) close to the piece:
- **No attraction at all** → consistent with gold (but doesn't prove gold; brass, copper, lead also non-magnetic)
- **Strong pull** → contains ferrous metal (iron, nickel) → not solid gold

This test rules out steel-core "gold" pieces popular in some grey markets. It doesn't catch gold-coloured brass or copper.

## Test 3 — The density test

Gold is heavy. Specific gravity: 19.3 g/cm³ for pure gold; ~15.5 g/cm³ for 21K; ~13.5 g/cm³ for 14K. Most fake metals (brass, copper, zinc alloys) sit at 7.5–8.9 g/cm³ — roughly **half** the density.

Method:
1. Weigh the piece on a kitchen scale, accurate to 0.1g (mass in grams = M)
2. Tie thin string around the piece, suspend in a glass of water — the water displaced equals the volume
3. Use a measuring cup: fill to 100ml, lower the piece, read the new level. Volume = new − 100ml = V cm³
4. Density = M / V

A 21K piece should land around 14.5–15.5 g/cm³. A brass fake will land near 8 g/cm³. **Half the density = fake.**

## Test 4 — The ceramic scratch test

Buy a small unglazed ceramic tile (a "streak plate" — $5 at lapidary supply or hardware). Drag the gold piece firmly across the tile:
- **Gold streak (yellowish)** → consistent with gold
- **Black streak** → pyrite ("fool's gold") or gold-plated brass
- **No streak at all** → too hard; could be steel, ceramic, or other non-gold metal

This is a destructive test on the surface of the jewellery (very minor scratch) — only use on pieces you intend to sell or are confident are fake.

## Test 5 — The nitric acid test (advanced)

The most reliable home test, but requires care. Nitric acid kits (~$15-30 online) include:
- Acid bottle (10N nitric acid)
- Pipette dropper
- Reference test stones

Method:
1. Lightly scratch the piece on the test stone, leaving a small gold streak
2. Drop one drop of nitric acid on the streak
3. **Streak stays gold-yellow** → real gold (the karat-specific acid in the kit will dissolve lower-purity gold; 18K acid leaves 24K/22K untouched)
4. **Streak turns green** → base metal (brass, copper alloys)
5. **Streak dissolves entirely** → gold-plated only (the thin gold layer dissolves once acid penetrates the plating)

**Safety:** wear gloves and eye protection. Work outside or in a well-ventilated area. Neutralise spilled acid with baking soda before disposal.

## When to walk to a professional

If two or more of the above tests fail OR if the piece is high-value (>$500 USD), get a professional XRF assay. Most jewellers offer this for $5-20 per piece. XRF takes 30 seconds and reads exact purity to ±0.5%.

## What you can do today

1. Loupe + hallmark check — 30 seconds, costs nothing
2. Magnet test — 10 seconds with a fridge magnet
3. Weigh on a kitchen scale, cross-check against [our calculator](/gold-calculator) for expected market value at the stated weight and karat

If the math doesn't match — if a "50g 21K" piece weighs 35g, or the seller wants 60% of spot value for a "guaranteed 24K" coin — walk away. Real gold transactions track the spot price within a tight retail spread, never miles outside it.

Bookmark [our 24K page](/gold-price/24k) for the daily reference, and check it before any private-market transaction.`,
    body_ar: `قبل إعادة بيع المجوهرات الموروثة أو قبول قطعة "أثرية" من بائع خاص أو ببساطة التحقق من شراء حديث، شغّل هذه الاختبارات الخمسة. لا أحد منها يحلّ محل تحليل XRF المهني — لكنها معاً تكتشف أكثر من 95% من المزيّف الواضح.

## الاختبار 1 — فحص الدمغة

قطع الذهب الخالص (عيار 24، 21، 18، 14، 22) تحمل دائماً تقريباً ختم دمغة يشير إلى النقاء:

| النقاء | اختلافات الدمغة |
|---------|------------------|
| عيار 24 | 999, 24K, 24KT |
| عيار 22 | 916, 22K |
| عيار 21 | 875, 21K |
| عيار 18 | 750, 18K, 18KT |
| عيار 14 | 585, 14K |

**ابحث على المشبك، أو داخل خاتم، أو خلف قلادة.** استخدم عدسة صائغ 10× (~10 دولارات على أمازون) للتفاصيل الدقيقة. الأختام التي تحمل "GP" (مطلي بالذهب)، "GF" (مملوء بالذهب)، "1/20 12K GF" (مملوء بذهب 12 قيراط مدلفن إلى 1/20 الوزن)، أو "RGP" (طلاء ذهب مدلفن) **ليست ذهباً صلباً** — لديها طبقة ذهب رقيقة فوق معدن أساسي.

## الاختبار 2 — اختبار المغناطيس

الذهب الخالص ليس مغناطيسياً. أمسك مغناطيس نيوديميوم قوي (مغناطيس صغير من أي محل أدوات منزلية) قرب القطعة:
- **لا انجذاب على الإطلاق** → متّسق مع الذهب (لكن لا يثبت الذهب؛ النحاس الأصفر والنحاس والرصاص أيضاً غير مغناطيسية)
- **سحب قوي** → يحتوي معدناً حديدياً (حديد، نيكل) → ليس ذهباً صلباً

هذا الاختبار يستبعد قطع الذهب ذات النواة الفولاذية الشائعة في بعض الأسواق الموازية. لا يكتشف النحاس الأصفر أو النحاسي بلون الذهب.

## الاختبار 3 — اختبار الكثافة

الذهب ثقيل. الكثافة النوعية: 19.3 جم/سم³ للذهب الخالص؛ ~15.5 جم/سم³ لعيار 21؛ ~13.5 جم/سم³ لعيار 14. معظم المعادن المزيّفة (النحاس الأصفر، النحاس، سبائك الزنك) تكون عند 7.5-8.9 جم/سم³ — تقريباً **نصف الكثافة**.

الطريقة:
1. زن القطعة على ميزان مطبخ، دقّة 0.1 جم (الكتلة بالجرامات = M)
2. اربط خيطاً رفيعاً حول القطعة، علّقها في كوب ماء — الماء المُزاح يساوي الحجم
3. استخدم كوب قياس: املأ إلى 100 مل، أنزل القطعة، اقرأ المستوى الجديد. الحجم = الجديد − 100 مل = V سم³
4. الكثافة = M / V

قطعة عيار 21 يجب أن تكون حوالي 14.5-15.5 جم/سم³. مزيّف من النحاس الأصفر سيكون قرب 8 جم/سم³. **نصف الكثافة = مزيّف.**

## الاختبار 4 — اختبار الخدش بالسيراميك

اشترِ بلاطة سيراميك صغيرة غير لامعة ("صفيحة خدش" — 5 دولارات في محلات النحت أو الأدوات). اسحب قطعة الذهب بقوة عبر البلاطة:
- **أثر ذهبي (أصفر)** → متّسق مع الذهب
- **أثر أسود** → بيريت ("ذهب الأحمق") أو نحاس مطلي بالذهب
- **لا أثر على الإطلاق** → صلب جداً؛ قد يكون فولاذ أو سيراميك أو معدن آخر غير الذهب

هذا اختبار يدمّر سطح المجوهرات (خدش صغير جداً) — استخدمه فقط على القطع التي تنوي بيعها أو واثق أنها مزيّفة.

## الاختبار 5 — اختبار حمض النيتريك (متقدّم)

أكثر اختبار منزلي موثوقية، لكنه يتطلب حذراً. أطقم حمض النيتريك (~15-30 دولار عبر الإنترنت) تشمل:
- زجاجة حمض (حمض نيتريك 10N)
- قطّارة
- أحجار اختبار مرجعية

الطريقة:
1. اخدش القطعة بخفّة على حجر الاختبار، تاركاً أثراً ذهبياً صغيراً
2. ضع قطرة واحدة من حمض النيتريك على الأثر
3. **يبقى الأثر أصفر ذهبياً** → ذهب حقيقي (الحمض المخصّص لعيار معيّن في الطقم يذيب الذهب الأقل نقاءً؛ حمض عيار 18 يترك عيار 24/22 بدون مساس)
4. **يتحوّل الأثر إلى أخضر** → معدن أساسي (نحاس أصفر، سبائك نحاسية)
5. **يذوب الأثر تماماً** → مطلي بالذهب فقط (الطبقة الذهبية الرقيقة تذوب حالما يخترق الحمض الطلاء)

**السلامة:** ارتدِ قفازات وواقي عين. اعمل في الخارج أو في منطقة جيّدة التهوية. حيّد الحمض المسكوب ببيكربونات الصودا قبل التخلّص منه.

## متى تذهب إلى محترف

إذا فشلت اثنان أو أكثر من الاختبارات أعلاه أو إذا كانت القطعة عالية القيمة (>500 دولار)، احصل على تحليل XRF احترافي. معظم الصاغة يقدّمونه بـ 5-20 دولار للقطعة. يستغرق XRF 30 ثانية ويقرأ النقاء الدقيق بـ ±0.5%.

## ما يمكنك فعله اليوم

1. عدسة + فحص الدمغة — 30 ثانية، لا تكلفة
2. اختبار المغناطيس — 10 ثوانٍ بمغناطيس ثلاجة
3. زن على ميزان مطبخ، قارن مع [حاسبتنا](/gold-calculator) للقيمة السوقية المتوقّعة بالوزن والعيار المُذكَر

إذا لم تتطابق الحسابات — إذا كانت قطعة "50 جرام عيار 21" تزن 35 جرام، أو يريد البائع 60% من قيمة السعر الفوري لـ "عملة 24 قيراط مضمونة" — ابتعد. صفقات الذهب الحقيقية تتتبع السعر الفوري ضمن هامش تجزئة ضيّق، ليس بعيداً عنه بأميال.

احفظ [صفحة عيار 24 لدينا](/gold-price/24k) كمرجع يومي، وراجعها قبل أي صفقة في السوق الخاصة.`,
    tags: ["fraud-prevention", "buying-guide", "authentication", "education"],
    author: DEFAULT_AUTHOR,
  },
  {
    slug: "silver-platinum-palladium-investment-comparison",
    publishedAt: "2026-05-13T15:00:00Z",
    title_en: "Silver vs Platinum vs Palladium — A Practical Investment Comparison",
    title_ar: "الفضة مقابل البلاتين مقابل البلاديوم — مقارنة استثمارية عملية",
    description_en:
      "Beyond gold, three other precious metals trade actively. We compare silver, platinum, and palladium on volatility, industrial demand, MENA availability, and long-term hold characteristics.",
    description_ar:
      "إلى جانب الذهب، تُتداول ثلاثة معادن نفيسة أخرى بنشاط. نقارن الفضة والبلاتين والبلاديوم على التقلّب والطلب الصناعي والتوفّر في الشرق الأوسط وخصائص الاحتفاظ طويل المدى.",
    body_en: `Gold gets the headlines, but **silver, platinum, and palladium** trade in deep international markets too. For MENA precious-metals investors looking to diversify beyond gold, here's how each metal compares on the factors that actually matter for long-term holding.

## Silver (XAG)

**Spot price range:** typically $15–35 / oz over the last decade. About 1/80th of gold's price per ounce.

**Volatility:** higher than gold. Silver can move 3–5% in a single trading day, vs gold's typical 0.5–1.5%. Industrial demand (electronics, solar panels) creates more price sensitivity to economic cycles than gold has.

**MENA availability:** common — most jewellers stock sterling silver (92.5% pure) and bullion bars. Saudi and UAE refiners produce 99.9% pure silver bars and coins at competitive premiums.

**Hold characteristics:**
- Storage volume: ~80× larger than equivalent gold value — meaningful at scale
- Insurance: lower per-dollar cost; less attractive to thieves
- VAT: applies in most MENA jurisdictions (15% in Saudi, 5% in UAE)
- Resale: tight markets exist; spread typically 3–8% from spot

**Best for:** investors who want precious-metals exposure with more potential upside and higher tolerance for volatility.

## Platinum (XPT)

**Spot price range:** $800–1,200 / oz typical, occasionally rallying above gold during industrial demand peaks (uncommon since 2015).

**Volatility:** similar to gold for the most part, with periodic industrial spikes.

**MENA availability:** rare in jewellery form outside premium designer brands (most "platinum" jewellery in MENA souks is actually rhodium-plated white gold — check the hallmark). Bullion bars and coins must usually be ordered from major refiners (PAMP Suisse, Valcambi).

**Hold characteristics:**
- Industrial demand: 80% of platinum is consumed in autocatalysts (gasoline engines), so demand correlates inversely with EV adoption — a long-term headwind
- Geographic risk: 75% of mining is in South Africa, vulnerable to political/labour disruption
- Premiums on bullion: typically higher than gold (3–6% over spot on small bars)
- Hallmark: 950 or 900 indicates platinum content

**Best for:** investors with strong views on internal-combustion automotive demand, or as a small portfolio diversifier (5-10%).

## Palladium (XPD)

**Spot price range:** wildly variable. Peaked above $3,000 / oz in 2022, often trades $800–1,800.

**Volatility:** highest of the three. Palladium can swing 10%+ in a single week. Russia produces ~40% of global palladium — sanctions and supply shocks dominate price action.

**MENA availability:** essentially zero in retail form. Investment-grade palladium requires direct purchase from major refiners or ETF exposure.

**Hold characteristics:**
- Industrial demand: 85% in gasoline autocatalysts — similar long-term EV headwind as platinum
- No meaningful jewellery market
- Refining/storage infrastructure is more limited than gold or silver
- High bid-ask spreads on physical bullion (5-15%)

**Best for:** specialised traders or industrial-metals positioning. Not recommended for most MENA retail investors.

## Comparison table

| Metal | Volatility | Industrial demand share | MENA retail availability | Recommended portfolio % |
|-------|------------|------------------------|---------------------------|------------------------|
| Silver | Medium-high | 50% | Strong | 10-20% of precious metals |
| Platinum | Medium | 80% (autos) | Weak | 5-10% |
| Palladium | Very high | 85% (autos) | Very weak | 0-5% (specialised) |
| Gold | Low-medium | 10% | Very strong | 70-80% (core hold) |

## How to track each metal

We publish live prices for all four via aggregated WebSocket feeds:
- [Gold](/precious-metals/gold) — XAU/USD, multiple per second
- [Silver](/precious-metals/silver) — XAG/USD, ~1 minute cadence
- [Platinum](/precious-metals/platinum) — XPT/USD, ~1 minute
- [Palladium](/precious-metals/palladium) — XPD/USD, ~1 minute

Silver/Platinum/Palladium update slower because their underlying markets are less liquid than gold — minute-cadence is sufficient for accurate display.

## Practical portfolio allocation

For a MENA precious-metals investor with $10,000 to allocate, a defensible split:
- **$7,000–8,000 in gold** (mix of 24K bullion bars + small 21K coins for liquidity)
- **$1,500–2,000 in silver** (1 oz Saudi or Pamp bars; high counts for small denominations)
- **$500–1,000 in platinum** (only if you have a strong macro view)
- **$0 in palladium** for most retail investors

Bookmark our [precious-metals hub](/precious-metals) to track all four with daily-updated currency conversion to SAR, JOD, AED, EGP, and 36+ other currencies.`,
    body_ar: `الذهب يحصل على العناوين، لكن **الفضة والبلاتين والبلاديوم** تُتداول في أسواق دولية عميقة أيضاً. لمستثمري المعادن النفيسة في الشرق الأوسط الذين يبحثون عن التنويع خارج الذهب، إليكم كيف يقارن كل معدن على العوامل التي تهمّ فعلاً للاحتفاظ طويل المدى.

## الفضة (XAG)

**نطاق السعر الفوري:** عادةً 15-35 دولار / أونصة خلال العقد الماضي. حوالي 1/80 من سعر الذهب للأونصة.

**التقلّب:** أعلى من الذهب. يمكن للفضة أن تتحرّك 3-5% في يوم تداول واحد، مقابل 0.5-1.5% للذهب عادةً. يخلق الطلب الصناعي (إلكترونيات، ألواح شمسية) حساسية سعرية أكبر للدورات الاقتصادية من الذهب.

**التوفّر في الشرق الأوسط:** شائع — معظم الصاغة يخزّنون الفضة الإسترلينية (نقاء 92.5%) والسبائك. ينتج المصافي السعودي والإماراتي سبائك وعملات فضّة نقاء 99.9% بهوامش تنافسية.

**خصائص الاحتفاظ:**
- حجم التخزين: ~80× أكبر من قيمة الذهب المكافئة — مهمّ على نطاق واسع
- التأمين: تكلفة أقل لكل دولار؛ أقل جاذبية للسرّاق
- الضريبة: تطبَّق في معظم دول الشرق الأوسط (15% في السعودية، 5% في الإمارات)
- إعادة البيع: توجد أسواق ضيّقة؛ الهامش عادةً 3-8% من السعر الفوري

**الأفضل لـ:** المستثمرين الذين يريدون انكشافاً على المعادن النفيسة مع إمكانية ارتفاع أكبر وتسامح أعلى مع التقلّب.

## البلاتين (XPT)

**نطاق السعر الفوري:** 800-1200 دولار / أونصة عادةً، أحياناً يرتفع فوق الذهب خلال ذروة الطلب الصناعي (غير شائع منذ 2015).

**التقلّب:** مشابه للذهب في معظم الوقت، مع ارتفاعات صناعية دورية.

**التوفّر في الشرق الأوسط:** نادر في شكل مجوهرات خارج العلامات التجارية المصمَّمة الفاخرة (معظم مجوهرات "البلاتين" في أسواق الشرق الأوسط هي فعلياً ذهب أبيض مطلي بالروديوم — تحقّق من الدمغة). يجب طلب السبائك والعملات عادةً من مصافي رئيسية (PAMP Suisse، Valcambi).

**خصائص الاحتفاظ:**
- الطلب الصناعي: 80% من البلاتين يُستهلَك في المحفّزات الذاتية (محرّكات البنزين)، لذا يرتبط الطلب عكسياً باعتماد السيارات الكهربائية — رياح معاكسة طويلة المدى
- المخاطر الجغرافية: 75% من التعدين في جنوب أفريقيا، عرضة للاضطراب السياسي/العمّالي
- هوامش على السبائك: عادةً أعلى من الذهب (3-6% فوق السعر الفوري على السبائك الصغيرة)
- الدمغة: 950 أو 900 تشير إلى محتوى البلاتين

**الأفضل لـ:** المستثمرين الذين لديهم آراء قوية حول الطلب على السيارات ذات الاحتراق الداخلي، أو كمنوّع محفظة صغير (5-10%).

## البلاديوم (XPD)

**نطاق السعر الفوري:** متغيّر بشدّة. ذروة فوق 3,000 دولار / أونصة في 2022، غالباً يتداول 800-1800.

**التقلّب:** الأعلى بين الثلاثة. يمكن للبلاديوم أن يتأرجح 10%+ في أسبوع واحد. تنتج روسيا ~40% من البلاديوم العالمي — العقوبات وصدمات الإمدادات تهيمن على حركة السعر.

**التوفّر في الشرق الأوسط:** صفر تقريباً في شكل تجزئة. يتطلب البلاديوم الاستثماري شراءً مباشراً من المصافي الرئيسية أو انكشافاً عبر صناديق ETF.

**خصائص الاحتفاظ:**
- الطلب الصناعي: 85% في محفّزات السيارات البنزينية — رياح معاكسة طويلة المدى مشابهة للسيارات الكهربائية مثل البلاتين
- لا سوق مجوهرات ذي معنى
- البنية التحتية للتكرير/التخزين أكثر محدودية من الذهب أو الفضة
- هوامش عرض-طلب عالية على السبائك الفعلية (5-15%)

**الأفضل لـ:** المتداولون المتخصّصون أو تموضع المعادن الصناعية. غير موصى به لمعظم مستثمري التجزئة في الشرق الأوسط.

## جدول المقارنة

| المعدن | التقلّب | حصّة الطلب الصناعي | توفّر التجزئة في الشرق الأوسط | نسبة المحفظة الموصى بها |
|---------|---------|----------------------|--------------------------------|---------------------------|
| الفضة | متوسط-عالي | 50% | قوي | 10-20% من المعادن النفيسة |
| البلاتين | متوسط | 80% (سيارات) | ضعيف | 5-10% |
| البلاديوم | عالي جداً | 85% (سيارات) | ضعيف جداً | 0-5% (متخصّص) |
| الذهب | منخفض-متوسط | 10% | قوي جداً | 70-80% (احتفاظ أساسي) |

## كيف تتتبّع كل معدن

ننشر أسعاراً حية لكل الأربعة عبر تغذيات WebSocket مُجمَّعة:
- [الذهب](/precious-metals/gold) — XAU/USD، عدّة مرّات في الثانية
- [الفضة](/precious-metals/silver) — XAG/USD، إيقاع ~1 دقيقة
- [البلاتين](/precious-metals/platinum) — XPT/USD، ~1 دقيقة
- [البلاديوم](/precious-metals/palladium) — XPD/USD، ~1 دقيقة

تُحدَّث الفضة والبلاتين والبلاديوم بشكل أبطأ لأن أسواقها الأساسية أقل سيولة من الذهب — إيقاع الدقيقة كافٍ للعرض الدقيق.

## توزيع المحفظة العملي

لمستثمر معادن نفيسة في الشرق الأوسط لديه 10,000 دولار للتخصيص، توزيع قابل للدفاع:
- **7,000-8,000 دولار في الذهب** (مزيج من سبائك عيار 24 + عملات صغيرة عيار 21 للسيولة)
- **1,500-2,000 دولار في الفضّة** (سبائك 1 أونصة سعودية أو Pamp؛ أعداد كبيرة من الفئات الصغيرة)
- **500-1,000 دولار في البلاتين** (فقط إذا كان لديك رأي اقتصادي قوي)
- **0 دولار في البلاديوم** لمعظم مستثمري التجزئة

احفظ [مركز المعادن النفيسة لدينا](/precious-metals) لتتبع الأربعة جميعاً مع تحويل عملة مُحدَّث يومياً إلى الريال السعودي والدينار الأردني والدرهم الإماراتي والجنيه المصري و 36+ عملة أخرى.`,
    tags: ["silver", "platinum", "palladium", "investment", "diversification"],
    author: DEFAULT_AUTHOR,
  },
);

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function listArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}

/** Word count for NewsArticle schema. Uses the locale-specific body. */
export function articleWordCount(article: Article, locale: string): number {
  const body = locale === "ar" ? article.body_ar : article.body_en;
  // Strip markdown syntax (headers, tables, code), then count whitespace-separated tokens.
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#*_>|\-]/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return text.split(/\s+/).filter(Boolean).length;
}
