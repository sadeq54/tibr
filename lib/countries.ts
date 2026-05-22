export type Country = {
  slug: string;
  cc: string;
  name_en: string;
  name_ar: string;
  currency: string;
  flag: string;
};

export const COUNTRIES: Country[] = [
  { slug: "usa", cc: "US", name_en: "USA", name_ar: "الولايات المتحدة", currency: "USD", flag: "🇺🇸" },
  { slug: "europe", cc: "EU", name_en: "Europe", name_ar: "أوروبا", currency: "EUR", flag: "🇪🇺" },
  { slug: "argentina", cc: "AR", name_en: "Argentina", name_ar: "الأرجنتين", currency: "ARS", flag: "🇦🇷" },
  { slug: "australia", cc: "AU", name_en: "Australia", name_ar: "أستراليا", currency: "AUD", flag: "🇦🇺" },
  { slug: "bahrain", cc: "BH", name_en: "Bahrain", name_ar: "البحرين", currency: "BHD", flag: "🇧🇭" },
  { slug: "brazil", cc: "BR", name_en: "Brazil", name_ar: "البرازيل", currency: "BRL", flag: "🇧🇷" },
  { slug: "canada", cc: "CA", name_en: "Canada", name_ar: "كندا", currency: "CAD", flag: "🇨🇦" },
  { slug: "china", cc: "CN", name_en: "China", name_ar: "الصين", currency: "CNY", flag: "🇨🇳" },
  { slug: "colombia", cc: "CO", name_en: "Colombia", name_ar: "كولومبيا", currency: "COP", flag: "🇨🇴" },
  { slug: "croatia", cc: "HR", name_en: "Croatia", name_ar: "كرواتيا", currency: "EUR", flag: "🇭🇷" },
  { slug: "denmark", cc: "DK", name_en: "Denmark", name_ar: "الدنمارك", currency: "DKK", flag: "🇩🇰" },
  { slug: "egypt", cc: "EG", name_en: "Egypt", name_ar: "مصر", currency: "EGP", flag: "🇪🇬" },
  { slug: "hong-kong", cc: "HK", name_en: "Hong Kong", name_ar: "هونغ كونغ", currency: "HKD", flag: "🇭🇰" },
  { slug: "hungary", cc: "HU", name_en: "Hungary", name_ar: "المجر", currency: "HUF", flag: "🇭🇺" },
  { slug: "india", cc: "IN", name_en: "India", name_ar: "الهند", currency: "INR", flag: "🇮🇳" },
  { slug: "indonesia", cc: "ID", name_en: "Indonesia", name_ar: "إندونيسيا", currency: "IDR", flag: "🇮🇩" },
  { slug: "japan", cc: "JP", name_en: "Japan", name_ar: "اليابان", currency: "JPY", flag: "🇯🇵" },
  { slug: "jordan", cc: "JO", name_en: "Jordan", name_ar: "الأردن", currency: "JOD", flag: "🇯🇴" },
  { slug: "kuwait", cc: "KW", name_en: "Kuwait", name_ar: "الكويت", currency: "KWD", flag: "🇰🇼" },
  { slug: "lebanon", cc: "LB", name_en: "Lebanon", name_ar: "لبنان", currency: "LBP", flag: "🇱🇧" },
  { slug: "libya", cc: "LY", name_en: "Libya", name_ar: "ليبيا", currency: "LYD", flag: "🇱🇾" },
  { slug: "macau", cc: "MO", name_en: "Macau", name_ar: "ماكاو", currency: "MOP", flag: "🇲🇴" },
  { slug: "malaysia", cc: "MY", name_en: "Malaysia", name_ar: "ماليزيا", currency: "MYR", flag: "🇲🇾" },
  { slug: "mexico", cc: "MX", name_en: "Mexico", name_ar: "المكسيك", currency: "MXN", flag: "🇲🇽" },
  { slug: "morocco", cc: "MA", name_en: "Morocco", name_ar: "المغرب", currency: "MAD", flag: "🇲🇦" },
  { slug: "myanmar", cc: "MM", name_en: "Myanmar", name_ar: "ميانمار", currency: "MMK", flag: "🇲🇲" },
  { slug: "new-zealand", cc: "NZ", name_en: "New Zealand", name_ar: "نيوزيلندا", currency: "NZD", flag: "🇳🇿" },
  { slug: "nigeria", cc: "NG", name_en: "Nigeria", name_ar: "نيجيريا", currency: "NGN", flag: "🇳🇬" },
  { slug: "north-macedonia", cc: "MK", name_en: "North Macedonia", name_ar: "مقدونيا الشمالية", currency: "MKD", flag: "🇲🇰" },
  { slug: "norway", cc: "NO", name_en: "Norway", name_ar: "النرويج", currency: "NOK", flag: "🇳🇴" },
  { slug: "pakistan", cc: "PK", name_en: "Pakistan", name_ar: "باكستان", currency: "PKR", flag: "🇵🇰" },
  { slug: "philippines", cc: "PH", name_en: "Philippines", name_ar: "الفلبين", currency: "PHP", flag: "🇵🇭" },
  { slug: "qatar", cc: "QA", name_en: "Qatar", name_ar: "قطر", currency: "QAR", flag: "🇶🇦" },
  { slug: "russia", cc: "RU", name_en: "Russia", name_ar: "روسيا", currency: "RUB", flag: "🇷🇺" },
  { slug: "saudi-arabia", cc: "SA", name_en: "Saudi Arabia", name_ar: "السعودية", currency: "SAR", flag: "🇸🇦" },
  { slug: "serbia", cc: "RS", name_en: "Serbia", name_ar: "صربيا", currency: "RSD", flag: "🇷🇸" },
  { slug: "singapore", cc: "SG", name_en: "Singapore", name_ar: "سنغافورة", currency: "SGD", flag: "🇸🇬" },
  { slug: "south-africa", cc: "ZA", name_en: "South Africa", name_ar: "جنوب أفريقيا", currency: "ZAR", flag: "🇿🇦" },
  { slug: "south-korea", cc: "KR", name_en: "South Korea", name_ar: "كوريا الجنوبية", currency: "KRW", flag: "🇰🇷" },
  { slug: "sweden", cc: "SE", name_en: "Sweden", name_ar: "السويد", currency: "SEK", flag: "🇸🇪" },
  { slug: "switzerland", cc: "CH", name_en: "Switzerland", name_ar: "سويسرا", currency: "CHF", flag: "🇨🇭" },
  { slug: "taiwan", cc: "TW", name_en: "Taiwan", name_ar: "تايوان", currency: "TWD", flag: "🇹🇼" },
  { slug: "thailand", cc: "TH", name_en: "Thailand", name_ar: "تايلاند", currency: "THB", flag: "🇹🇭" },
  { slug: "turkey", cc: "TR", name_en: "Turkey", name_ar: "تركيا", currency: "TRY", flag: "🇹🇷" },
  { slug: "uk", cc: "GB", name_en: "United Kingdom", name_ar: "المملكة المتحدة", currency: "GBP", flag: "🇬🇧" },
  { slug: "uae", cc: "AE", name_en: "United Arab Emirates", name_ar: "الإمارات", currency: "AED", flag: "🇦🇪" },
  { slug: "vietnam", cc: "VN", name_en: "Vietnam", name_ar: "فيتنام", currency: "VND", flag: "🇻🇳" },
];

export const COUNTRY_BY_SLUG: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.slug, c])
);

export const COUNTRY_BY_CC: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.cc, c])
);

/**
 * Best-match XM affiliate-banner language per country slug. XM ships banners
 * in a fixed language set only; countries without a dedicated language fall
 * back to English. Language codes match XmLang in lib/xm-banners.ts.
 */
export const COUNTRY_XM_LANG: Record<string, string> = {
  argentina: "es",
  australia: "en",
  bahrain: "ar",
  brazil: "pt",
  canada: "en",
  china: "zh-hans",
  colombia: "es",
  croatia: "en",
  denmark: "en",
  egypt: "ar",
  europe: "en",
  "hong-kong": "zh-hant",
  hungary: "hu",
  india: "hi",
  indonesia: "id",
  japan: "en",
  jordan: "ar",
  kuwait: "ar",
  lebanon: "ar",
  libya: "ar",
  macau: "zh-hant",
  malaysia: "ms",
  mexico: "es",
  morocco: "ar",
  myanmar: "en",
  "new-zealand": "en",
  nigeria: "en",
  "north-macedonia": "en",
  norway: "en",
  pakistan: "ur",
  philippines: "tl",
  qatar: "ar",
  russia: "ru",
  "saudi-arabia": "ar",
  serbia: "en",
  singapore: "en",
  "south-africa": "en",
  "south-korea": "ko",
  sweden: "sv",
  switzerland: "de",
  taiwan: "zh-hant",
  thailand: "th",
  turkey: "tr",
  uae: "ar",
  uk: "en",
  usa: "en",
  vietnam: "vi",
};

export const ALL_CURRENCIES: string[] = Array.from(
  new Set(COUNTRIES.map((c) => c.currency)),
);

export function currencyForCC(cc: string | null | undefined): string | null {
  if (!cc) return null;
  return COUNTRY_BY_CC[cc.toUpperCase()]?.currency ?? null;
}

export function countryName(c: Country, locale: string): string {
  return locale === "ar" ? c.name_ar : c.name_en;
}

/**
 * Country-specific commentary on gold-buying — VAT, taxes, dominant karats,
 * cultural quirks. Surfaces under the H1 of /[country]/gold-price/[karat]
 * pages to break thin-content sameness across the 368 programmatic SEO
 * permutations. Each note is short (~80 words) and locale-pair-translated.
 *
 * Only flagship markets covered for now; long-tail countries fall back to the
 * generic intro.
 */
export type CountryNote = { en: string; ar: string };

export const COUNTRY_NOTES: Record<string, CountryNote> = {
  "saudi-arabia": {
    en: "Saudi Arabia is the largest retail gold market in the Gulf. The dominant karat is 21K (87.5% purity), followed by 18K for jewellery and 24K for investment bars. Spot prices are typically quoted per gram in Saudi Riyal (SAR). A 15% Value Added Tax (VAT) applies to gold-jewellery making charges but NOT to investment-grade bullion (≥99.5% purity). Most jewellery is sold by weight at the day's spot plus a making-charge premium of 5–30 SAR per gram depending on craftsmanship.",
    ar: "المملكة العربية السعودية هي أكبر سوق ذهب للتجزئة في الخليج. العيار السائد هو 21 قيراطًا (نقاء 87.5%)، يليه 18 قيراطًا للمجوهرات و24 قيراطًا للسبائك الاستثمارية. تُسعَّر الأسعار الفورية عادة لكل جرام بالريال السعودي. تُطبَّق ضريبة القيمة المضافة 15% على رسوم تصنيع المجوهرات الذهبية ولكن ليس على السبائك ذات الجودة الاستثمارية (نقاء ≥ 99.5%). تُباع معظم المجوهرات بالوزن وفق سعر اليوم الفوري مضافًا إليه علاوة تصنيع تتراوح من 5 إلى 30 ريالاً لكل جرام حسب الحرفية.",
  },
  jordan: {
    en: "Jordan's gold market is dominated by 21K jewellery. The Jordanian Dinar (JOD) has been pegged to the US Dollar at ~0.709 JOD/USD since 1995, so gold prices in JOD move almost 1:1 with USD spot. Jordan imposes a 16% General Sales Tax (GST) on jewellery but exempts investment-grade gold. Amman's gold souk (Souk Al-Saqaf) publishes a daily 21K reference price that local jewellers track within ±0.5 JOD/g.",
    ar: "يُهيمن على سوق الذهب في الأردن مجوهرات عيار 21 قيراطًا. الدينار الأردني مرتبط بالدولار الأمريكي عند 0.709 تقريبًا منذ 1995، لذا تتحرك أسعار الذهب بالدينار تقريبًا 1:1 مع السعر الفوري بالدولار. يفرض الأردن ضريبة المبيعات العامة 16% على المجوهرات لكنه يعفي الذهب الاستثماري. يصدر سوق الذهب في عمّان (سوق الصاغة) سعرًا مرجعيًا يوميًا لعيار 21 يتتبعه الصاغة المحليون ضمن نطاق ±0.5 دينار/جرام.",
  },
  uae: {
    en: "The UAE — and specifically Dubai's Gold Souk in Deira — is one of the world's largest gold trading hubs by volume. Both 21K and 22K dominate jewellery; 24K is common for investment bars. The UAE introduced 5% VAT in 2018 but exempts investment-grade gold (≥99% purity); only the making charge on jewellery is taxed. The Dirham (AED) is pegged to USD at 3.6725, so AED gold prices mirror USD spot.",
    ar: "تُعدّ الإمارات — وتحديدًا سوق الذهب في ديرة دبي — من أكبر مراكز تداول الذهب في العالم من حيث الحجم. يهيمن عيارا 21 و22 على المجوهرات، بينما يشيع 24 للسبائك الاستثمارية. أدخلت الإمارات ضريبة القيمة المضافة 5% في 2018 لكنها تُعفي الذهب الاستثماري (نقاء ≥ 99%)؛ تُفرض الضريبة على رسوم التصنيع للمجوهرات فقط. الدرهم مرتبط بالدولار عند 3.6725، لذا تعكس أسعار الذهب بالدرهم السعر الفوري بالدولار.",
  },
  egypt: {
    en: "Egypt's gold market is driven by jewellery demand at 21K and 18K. The Egyptian Pound (EGP) has been under floating-exchange-rate pressure since 2022, making EGP gold prices a hedge against inflation — local demand spikes around currency-devaluation announcements. A 14% VAT applies to jewellery making-charges only. Egypt's largest gold-trading street is Khan el-Khalili in Cairo, with reference prices published daily by the Gold Division of the General Federation of Chambers of Commerce.",
    ar: "يقوده سوق الذهب في مصر طلب المجوهرات على عيارَي 21 و18. تعرّض الجنيه المصري لضغوط سعر الصرف العائم منذ 2022، مما يجعل سعر الذهب بالجنيه أداة تحوّط ضد التضخم — يرتفع الطلب المحلي حول إعلانات تخفيض قيمة العملة. تُفرض ضريبة القيمة المضافة 14% على رسوم التصنيع فقط. أكبر شارع لتجارة الذهب في مصر هو خان الخليلي في القاهرة، وتنشر الأسعار المرجعية يوميًا شعبة الذهب التابعة للاتحاد العام للغرف التجارية.",
  },
  qatar: {
    en: "Qatar's gold market favours 21K and 22K jewellery, with 24K bars for investment. The Qatari Riyal (QAR) is pegged to USD at 3.64, so QAR gold prices track spot USD tightly. Qatar imposes 5% Customs Duty on gold imports but no VAT (as of 2026). Doha's Souq Waqif and Gold Souq are the main retail hubs; pricing follows a daily reference set by the Qatar Chamber of Commerce.",
    ar: "يفضّل سوق الذهب في قطر مجوهرات عيارَي 21 و22، مع سبائك عيار 24 للاستثمار. الريال القطري مرتبط بالدولار عند 3.64، لذا تتتبع أسعار الذهب بالريال السعر الفوري بالدولار بدقة. تفرض قطر رسومًا جمركية بنسبة 5% على واردات الذهب لكن دون ضريبة قيمة مضافة (حتى 2026). يُعدّ سوق واقف وسوق الذهب في الدوحة المركزَين الرئيسيين للتجزئة؛ يتبع التسعير سعرًا مرجعيًا يوميًا تحدده غرفة تجارة قطر.",
  },
  kuwait: {
    en: "Kuwait's gold market is dominated by 22K and 24K — the Kuwaiti preference skews higher-karat than the wider GCC. The Kuwaiti Dinar (KWD) is the world's highest-valued currency (~0.31 KWD/USD), so gold prices in KWD are numerically the smallest in the Gulf. Kuwait has no VAT or customs duty on gold (as of 2026), making it one of the most tax-efficient retail markets in the region.",
    ar: "يُهيمن على سوق الذهب في الكويت عيارا 22 و24 — حيث يميل التفضيل الكويتي إلى عيارات أعلى من بقية دول مجلس التعاون. الدينار الكويتي هو الأعلى قيمة في العالم (نحو 0.31 دينار/دولار)، لذا فأسعار الذهب بالدينار هي الأصغر رقميًا في الخليج. لا تفرض الكويت ضريبة قيمة مضافة ولا رسومًا جمركية على الذهب (حتى 2026)، مما يجعلها من أكثر أسواق التجزئة كفاءة ضريبيًا في المنطقة.",
  },
  bahrain: {
    en: "Bahrain's gold market is small but historically significant — Manama hosts one of the oldest gold souks in the Gulf. 21K and 22K dominate jewellery sales. The Bahraini Dinar (BHD) is pegged to USD at 0.376. Bahrain introduced 10% VAT in 2022 but exempts investment-grade gold (≥99% purity). Customs duties on gold are zero under GCC free-trade rules.",
    ar: "سوق الذهب في البحرين صغير لكنه ذو أهمية تاريخية — تستضيف المنامة أحد أقدم أسواق الذهب في الخليج. يهيمن عيارا 21 و22 على مبيعات المجوهرات. الدينار البحريني مرتبط بالدولار عند 0.376. أدخلت البحرين ضريبة القيمة المضافة 10% في 2022 لكنها تُعفي الذهب الاستثماري (نقاء ≥ 99%). الرسوم الجمركية على الذهب صفر بموجب قواعد التجارة الحرة لدول مجلس التعاون.",
  },
  usa: {
    en: "In the US, gold prices are quoted per troy ounce in USD, with the COMEX (CME Group) GC futures contract setting the global reference. There is no federal VAT, but state-level sales tax may apply to bullion purchases below $1,000–$2,000 (varies by state — Texas, Florida and many others fully exempt investment-grade gold). Major retail bullion dealers (APMEX, JM Bullion, Money Metals) price coins and bars at spot + a 2–5% premium.",
    ar: "في الولايات المتحدة، يُسعَّر الذهب لكل أونصة بالدولار، وتحدّد عقود COMEX (CME Group) الآجلة GC السعر المرجعي العالمي. لا توجد ضريبة قيمة مضافة فيدرالية، لكن قد تنطبق ضريبة المبيعات على مستوى الولاية للمشتريات دون 1000-2000 دولار (تختلف بحسب الولاية — تكساس وفلوريدا وأخريات تُعفي الذهب الاستثماري بالكامل). يسعّر كبار تجار التجزئة (APMEX و JM Bullion و Money Metals) العملات والسبائك بسعر الفوري زائد علاوة 2-5%.",
  },
  uk: {
    en: "UK gold prices are quoted per troy ounce in GBP, anchored to the LBMA daily price fix in London. Investment-grade gold (≥99.5% purity) is VAT-exempt under UK tax law, and Royal Mint Britannia and Sovereign coins are also Capital Gains Tax-free for UK residents — the most tax-efficient bullion in Europe. Jewellery and non-investment gold attracts 20% VAT.",
    ar: "تُسعَّر أسعار الذهب في المملكة المتحدة لكل أونصة بالجنيه الإسترليني، مرتبطة بسعر LBMA المرجعي اليومي في لندن. الذهب ذو الجودة الاستثمارية (نقاء ≥ 99.5%) معفي من ضريبة القيمة المضافة بموجب قانون الضرائب البريطاني، كما أن عملتي Britannia و Sovereign الصادرتين عن Royal Mint معفيتان أيضًا من ضريبة الأرباح الرأسمالية للمقيمين في المملكة المتحدة — وهي أكثر السبائك كفاءة ضريبية في أوروبا. تخضع المجوهرات والذهب غير الاستثماري لضريبة قيمة مضافة 20%.",
  },
};

/**
 * Return per-country market commentary. Prefers the hand-written long-form
 * COUNTRY_NOTES entry; otherwise falls back to a note composed from
 * COUNTRY_FACTS so every country gets unique copy — no thin/duplicate
 * programmatic pages. Returns null only when neither source has the slug.
 */
export function countryNote(slug: string, locale: string): string | null {
  const note = COUNTRY_NOTES[slug];
  if (note) return locale === "ar" ? note.ar : note.en;
  return composeCountryNote(slug, locale);
}

/** Karat → purity label, shared by composed country notes. */
const KARAT_PURITY: Record<string, string> = {
  "24K": "99.9%",
  "23K": "96.5%",
  "22K": "91.6%",
  "21K": "87.5%",
  "18K": "75%",
  "14K": "58.3%",
};

/**
 * Structured, stable market facts per country — data source for
 * `composeCountryNote`. Deliberately EXCLUDES volatile tax/VAT rates (those
 * live in the hand-verified COUNTRY_NOTES / COUNTRY_VAT). `karat`, the
 * currency-peg regime and the distinctive `note` are textbook-stable facts.
 *
 * NOTE: dominant-karat and market facts here are well-documented but should
 * be spot-checked by the site owner before any are promoted into a full
 * COUNTRY_NOTES entry or relied on as authoritative.
 */
export type CountryFacts = {
  /** Most-traded retail gold purity in this market. */
  karat: keyof typeof KARAT_PURITY;
  /** Currency-peg regime — drives the peg sentence. Omit for free-floating. */
  peg?: "usd" | "eur" | "hkd";
  /** One distinctive, verifiable market fact — locale-pair translated. */
  note: { en: string; ar: string };
};

export const COUNTRY_FACTS: Record<string, CountryFacts> = {
  europe: {
    karat: "18K",
    note: {
      en: "Across the eurozone, 24K bars dominate investment while 18K is the jewellery norm, and pricing references the twice-daily LBMA auction in London.",
      ar: "في منطقة اليورو، تهيمن سبائك عيار 24 على الاستثمار بينما يُعد عيار 18 معيار المجوهرات، ويعتمد التسعير على مزاد LBMA في لندن مرتين يوميًا.",
    },
  },
  argentina: {
    karat: "18K",
    note: {
      en: "Chronic inflation makes gold a key store of value for Argentines, and local premiums over the world spot price can be unusually wide.",
      ar: "يجعل التضخم المزمن الذهب مخزنًا رئيسيًا للقيمة لدى الأرجنتينيين، وقد تكون العلاوات المحلية فوق السعر العالمي واسعة بشكل غير معتاد.",
    },
  },
  australia: {
    karat: "18K",
    note: {
      en: "The government-owned Perth Mint is one of the world's largest gold refiners and the source of the Australian Kangaroo bullion coin.",
      ar: "دار سك بيرث المملوكة للحكومة من أكبر مصافي الذهب في العالم وهي مصدر عملة الكنغر الأسترالية السبائكية.",
    },
  },
  brazil: {
    karat: "18K",
    note: {
      en: "Brazilian law sets 18K (750) as the minimum gold-jewellery standard, while investment gold trades on the B3 exchange in Sao Paulo.",
      ar: "يحدد القانون البرازيلي عيار 18 (750) كحد أدنى لمعيار مجوهرات الذهب، بينما يُتداول الذهب الاستثماري في بورصة B3 بساو باولو.",
    },
  },
  canada: {
    karat: "18K",
    note: {
      en: "The Royal Canadian Mint produces the Gold Maple Leaf, one of the purest bullion coins in the world at 99.99%.",
      ar: "تنتج دار سك العملة الملكية الكندية عملة ورقة القيقب الذهبية، إحدى أنقى عملات السبائك في العالم بنقاء 99.99%.",
    },
  },
  china: {
    karat: "24K",
    note: {
      en: "The Shanghai Gold Exchange sets the yuan-denominated Shanghai Gold Benchmark Price, and high-purity gold dominates retail demand.",
      ar: "تحدد بورصة شنغهاي للذهب السعر المرجعي لذهب شنغهاي المقوّم باليوان، ويهيمن الذهب عالي النقاء على طلب التجزئة.",
    },
  },
  colombia: {
    karat: "18K",
    note: {
      en: "Colombia is a major Latin American gold producer, and its domestic jewellery retail is built around 18K.",
      ar: "كولومبيا من كبار منتجي الذهب في أمريكا اللاتينية، وتقوم تجارة المجوهرات المحلية على عيار 18.",
    },
  },
  croatia: {
    karat: "18K",
    note: {
      en: "Croatia adopted the euro in 2023, so gold is now priced in EUR and tracks the wider eurozone market.",
      ar: "اعتمدت كرواتيا اليورو في 2023، لذا يُسعَّر الذهب الآن باليورو ويتتبع سوق منطقة اليورو الأوسع.",
    },
  },
  denmark: {
    karat: "18K",
    peg: "eur",
    note: {
      en: "Danish retail jewellery centres on 18K and 14K, and the krone's euro peg keeps gold prices aligned with the eurozone.",
      ar: "تتركز مجوهرات التجزئة الدنماركية على عيارَي 18 و14، ويبقي ربط الكرونة باليورو أسعار الذهب متوافقة مع منطقة اليورو.",
    },
  },
  "hong-kong": {
    karat: "24K",
    peg: "usd",
    note: {
      en: "The Chinese Gold & Silver Exchange Society, founded in 1910, trades 'four-nines' 99.99 gold at the heart of one of Asia's oldest bullion markets.",
      ar: "تتداول جمعية تبادل الذهب والفضة الصينية، التي تأسست عام 1910، ذهب التسع نقاط الأربع 99.99 في قلب أحد أقدم أسواق السبائك في آسيا.",
    },
  },
  hungary: {
    karat: "14K",
    note: {
      en: "Hungarian retail jewellery follows the Central European norm of 14K, with 18K and investment bars also available.",
      ar: "تتبع مجوهرات التجزئة المجرية المعيار الأوروبي الأوسط لعيار 14، مع توافر عيار 18 وسبائك الاستثمار أيضًا.",
    },
  },
  india: {
    karat: "22K",
    note: {
      en: "India is the world's second-largest gold consumer; 22K (916) jewellery dominates and is traditionally weighed by the tola, with Mumbai's Zaveri Bazaar setting influential regional rates.",
      ar: "الهند ثاني أكبر مستهلك للذهب في العالم؛ تهيمن مجوهرات عيار 22 (916) وتُوزن تقليديًا بالتولة، ويحدد سوق زافيري بازار في مومباي أسعارًا إقليمية مؤثرة.",
    },
  },
  indonesia: {
    karat: "22K",
    note: {
      en: "Indonesian jewellery spans 22K to 24K, and cast bars from state miner Antam are the benchmark investment product.",
      ar: "تتراوح المجوهرات الإندونيسية بين عيار 22 و24، وتُعد سبائك أنتام المصبوبة المملوكة للدولة المنتج الاستثماري المرجعي.",
    },
  },
  japan: {
    karat: "24K",
    note: {
      en: "Japan prizes pure 24K 'junkin'; Tanaka Kikinzoku, established in 1885, is the dominant bullion retailer and publishes a closely watched daily price.",
      ar: "تُقدّر اليابان الذهب الخالص عيار 24 'جونكين'؛ وتُعد تاناكا كيكينزوكو، المؤسسة عام 1885، أكبر بائع تجزئة للسبائك وتنشر سعرًا يوميًا يُتابَع عن كثب.",
    },
  },
  lebanon: {
    karat: "21K",
    note: {
      en: "Lebanon's gold trade, long centred on Beirut's souks, runs largely in cash and US dollars amid currency instability, with 21K the jewellery standard.",
      ar: "تجارة الذهب في لبنان، المتمركزة منذ زمن في أسواق بيروت، تجري غالبًا بالنقد والدولار الأمريكي وسط عدم استقرار العملة، وعيار 21 هو معيار المجوهرات.",
    },
  },
  libya: {
    karat: "21K",
    note: {
      en: "Libyan gold demand centres on 21K jewellery, with the dinar's value shaped by oil revenues and parallel exchange rates.",
      ar: "يتركز الطلب على الذهب في ليبيا على مجوهرات عيار 21، وتتشكل قيمة الدينار من عائدات النفط وأسعار الصرف الموازية.",
    },
  },
  macau: {
    karat: "24K",
    peg: "hkd",
    note: {
      en: "Macau's gold retail mirrors neighbouring Hong Kong, favouring 999.9 pure gold, and the pataca is pegged to the Hong Kong dollar.",
      ar: "تجارة الذهب بالتجزئة في ماكاو تعكس هونغ كونغ المجاورة، مع تفضيل الذهب النقي 999.9، والباتاكا مربوطة بدولار هونغ كونغ.",
    },
  },
  malaysia: {
    karat: "22K",
    note: {
      en: "Malaysian jewellery favours 22K and 24K, and Bank Negara's Kijang Emas bullion coin anchors the investment market.",
      ar: "تفضل المجوهرات الماليزية عيارَي 22 و24، وترسي عملة كيجانغ إيماس السبائكية الصادرة عن بنك نيجارا سوق الاستثمار.",
    },
  },
  mexico: {
    karat: "14K",
    note: {
      en: "Banco de Mexico issues the Centenario and Libertad gold coins, while retail jewellery centres on 14K and 18K.",
      ar: "يصدر بنك المكسيك عملتي سنتيناريو وليبرتاد الذهبيتين، بينما تتركز مجوهرات التجزئة على عيارَي 14 و18.",
    },
  },
  morocco: {
    karat: "18K",
    note: {
      en: "Moroccan gold markets in Casablanca and Fez trade mainly 18K and 21K, and the dirham is managed against a euro-and-dollar currency basket.",
      ar: "تتداول أسواق الذهب المغربية في الدار البيضاء وفاس عياري 18 و21 بشكل رئيسي، والدرهم مُدار مقابل سلة عملات من اليورو والدولار.",
    },
  },
  myanmar: {
    karat: "24K",
    note: {
      en: "Myanmar trades gold at very high purity, traditionally by the kyattha weight (about 16.6 g), with Yangon's market setting daily reference rates.",
      ar: "تتداول ميانمار الذهب بنقاء عالٍ جدًا، تقليديًا بوحدة الكياتثا (نحو 16.6 جم)، ويحدد سوق يانغون الأسعار المرجعية اليومية.",
    },
  },
  "new-zealand": {
    karat: "18K",
    note: {
      en: "New Zealand retail jewellery commonly uses 9K and 18K, while investment bullion follows the Australian and global markets.",
      ar: "تستخدم مجوهرات التجزئة في نيوزيلندا عادةً عيارَي 9 و18، بينما تتبع سبائك الاستثمار الأسواق الأسترالية والعالمية.",
    },
  },
  nigeria: {
    karat: "18K",
    note: {
      en: "Nigeria is a fast-growing gold producer, and the naira's volatility makes gold a popular hedge, with retail jewellery around 18K.",
      ar: "نيجيريا منتج للذهب سريع النمو، ويجعل تقلب النايرا الذهب أداة تحوّط شائعة، مع مجوهرات تجزئة قرب عيار 18.",
    },
  },
  "north-macedonia": {
    karat: "14K",
    note: {
      en: "Retail gold in North Macedonia follows Balkan and Central European norms, with 14K jewellery the most common.",
      ar: "تتبع تجارة الذهب بالتجزئة في مقدونيا الشمالية معايير البلقان وأوروبا الوسطى، وعيار 14 هو الأكثر شيوعًا في المجوهرات.",
    },
  },
  norway: {
    karat: "18K",
    note: {
      en: "Norway's central bank sold its entire gold reserves in 2004, and domestic demand now centres on 18K jewellery.",
      ar: "باع البنك المركزي النرويجي كامل احتياطياته من الذهب عام 2004، ويتركز الطلب المحلي الآن على مجوهرات عيار 18.",
    },
  },
  pakistan: {
    karat: "22K",
    note: {
      en: "Pakistan trades gold by the tola (about 11.66 g) with 22K dominant, and the All Pakistan Sarafa Association publishes daily rates.",
      ar: "تتداول باكستان الذهب بالتولة (نحو 11.66 جم) مع هيمنة عيار 22، وتنشر جمعية صرافة عموم باكستان الأسعار اليومية.",
    },
  },
  philippines: {
    karat: "18K",
    note: {
      en: "Philippine jewellery favours 18K and 21K, and the Bangko Sentral buys domestically mined gold to build its reserves.",
      ar: "تفضل المجوهرات الفلبينية عيارَي 18 و21، ويشتري المصرف المركزي الفلبيني الذهب المُعدَّن محليًا لبناء احتياطياته.",
    },
  },
  russia: {
    karat: "14K",
    note: {
      en: "Russian hallmarking uses the metric 585 (14K) and 750 (18K) standards, and the central bank is among the world's largest official gold buyers.",
      ar: "يستخدم الدمغ الروسي المعيارين المتريين 585 (عيار 14) و750 (عيار 18)، والبنك المركزي من أكبر مشتري الذهب الرسميين في العالم.",
    },
  },
  serbia: {
    karat: "14K",
    note: {
      en: "Serbian retail gold follows Central European 14K norms, with investment bars priced against the dinar.",
      ar: "تتبع تجارة الذهب بالتجزئة في صربيا معايير عيار 14 الأوروبية الوسطى، وتُسعَّر سبائك الاستثمار مقابل الدينار.",
    },
  },
  singapore: {
    karat: "24K",
    note: {
      en: "Singapore exempts investment-grade precious metals from GST, making it a regional bullion hub where 999 fine gold dominates investment demand.",
      ar: "تعفي سنغافورة المعادن الثمينة ذات الجودة الاستثمارية من ضريبة السلع والخدمات، مما يجعلها مركزًا إقليميًا للسبائك حيث يهيمن الذهب النقي 999 على الطلب الاستثماري.",
    },
  },
  "south-africa": {
    karat: "22K",
    note: {
      en: "South Africa's Krugerrand, minted since 1967 at 22K, was the world's first modern bullion coin, reflecting the country's deep gold-mining heritage.",
      ar: "كانت عملة الكروغراند الجنوب أفريقية، المسكوكة منذ 1967 بعيار 22، أول عملة سبائك حديثة في العالم، وتعكس إرث تعدين الذهب العريق في البلاد.",
    },
  },
  "south-korea": {
    karat: "24K",
    note: {
      en: "Korean gold is traditionally weighed by the 'don' (3.75 g), and pure 24K is favoured for both gifts and investment.",
      ar: "يُوزن الذهب الكوري تقليديًا بوحدة 'الدون' (3.75 جم)، ويُفضَّل الذهب الخالص عيار 24 للهدايا والاستثمار معًا.",
    },
  },
  sweden: {
    karat: "18K",
    note: {
      en: "Swedish retail jewellery centres on 18K, and the freely floating krona means local gold prices move with the SEK/USD rate.",
      ar: "تتركز مجوهرات التجزئة السويدية على عيار 18، ويعني التعويم الحر للكرونة أن أسعار الذهب المحلية تتحرك مع سعر صرف الكرونة/الدولار.",
    },
  },
  switzerland: {
    karat: "24K",
    note: {
      en: "Switzerland refines an estimated two-thirds of the world's gold, and bars from Valcambi, PAMP and Argor-Heraeus are a global investment standard.",
      ar: "تكرر سويسرا ما يُقدَّر بثلثي ذهب العالم، وتُعد سبائك Valcambi وPAMP وArgor-Heraeus معيارًا استثماريًا عالميًا.",
    },
  },
  taiwan: {
    karat: "24K",
    note: {
      en: "Taiwan favours 99.99 pure gold, traditionally traded by the tael, and the Bank of Taiwan offers gold passbook accounts and bars.",
      ar: "تفضل تايوان الذهب النقي 99.99، الذي يُتداول تقليديًا بوحدة التَيل، ويوفر بنك تايوان حسابات دفتر الذهب والسبائك.",
    },
  },
  thailand: {
    karat: "23K",
    note: {
      en: "Thai 'baht gold' is sold by the baht weight (15.244 g), and Bangkok's Yaowarat Chinatown is the trading centre where the Gold Traders Association sets daily prices.",
      ar: "يُباع 'ذهب الباهت' التايلاندي بوحدة وزن الباهت (15.244 جم)، وحي ياوارات الصيني في بانكوك هو مركز التداول حيث تحدد جمعية تجار الذهب الأسعار اليومية.",
    },
  },
  turkey: {
    karat: "22K",
    note: {
      en: "Turkey is among the world's top-five gold consumers; 22K is the cultural standard, and the Istanbul Grand Bazaar alongside the Borsa Istanbul gold market anchors pricing amid high lira inflation.",
      ar: "تركيا من أكبر خمسة مستهلكين للذهب في العالم؛ عيار 22 هو المعيار الثقافي، ويرسي البازار الكبير في إسطنبول إلى جانب سوق الذهب في بورصة إسطنبول التسعير وسط تضخم مرتفع في الليرة.",
    },
  },
  vietnam: {
    karat: "24K",
    note: {
      en: "Vietnamese gold trades mainly as SJC-branded bars by the tael ('cay', about 37.5 g), and SJC gold often carries a notable premium over the world spot price.",
      ar: "يُتداول الذهب الفيتنامي بشكل رئيسي كسبائك بعلامة SJC بوحدة التَيل ('كاي'، نحو 37.5 جم)، وغالبًا ما يحمل ذهب SJC علاوة ملحوظة فوق السعر العالمي الفوري.",
    },
  },
};

/**
 * Compose a unique ~3-sentence market note from COUNTRY_FACTS. Combines the
 * dominant karat, the currency-peg regime and a distinctive per-country fact
 * so each programmatic country×karat page carries non-duplicate copy.
 * Returns null when no facts entry exists for the slug.
 */
export function composeCountryNote(slug: string, locale: string): string | null {
  const country = COUNTRY_BY_SLUG[slug];
  const facts = COUNTRY_FACTS[slug];
  if (!country || !facts) return null;

  const ar = locale === "ar";
  const name = ar ? country.name_ar : country.name_en;
  const cur = country.currency;
  const purity = KARAT_PURITY[facts.karat];
  const k = facts.karat.replace("K", "");

  const karatSentence = ar
    ? `يتركز سوق الذهب بالتجزئة في ${name} على عيار ${k} (نقاء ${purity})، ويُسعَّر محليًا لكل جرام بعملة ${cur}.`
    : `${name}'s retail gold market centres on ${facts.karat} gold (${purity} pure), quoted locally per gram in ${cur}.`;

  let pegSentence: string;
  if (facts.peg === "usd") {
    pegSentence = ar
      ? `ولأن ${cur} مربوط بالدولار الأمريكي، تتبع تلك الأسعار السعر الفوري العالمي بدقة كبيرة.`
      : `Because the ${cur} is pegged to the US dollar, those prices track the international spot rate almost exactly.`;
  } else if (facts.peg === "eur") {
    pegSentence = ar
      ? `${cur} مربوط باليورو، لذا تتبع الأسعار السوق المقوّمة باليورو.`
      : `The ${cur} is pegged to the euro, so prices follow the euro-denominated market.`;
  } else if (facts.peg === "hkd") {
    pegSentence = ar
      ? `${cur} مربوط بدولار هونغ كونغ، مما يبقي الأسعار قريبة من السعر العالمي الفوري.`
      : `The ${cur} is pegged to the Hong Kong dollar, which keeps prices close to global spot.`;
  } else {
    pegSentence = ar
      ? `وبما أن ${cur} عملة حرة التعويم، تعكس الأسعار أيضًا تحركات صرف ${cur}/الدولار اليومية.`
      : `As a free-floating currency, the ${cur} means prices also reflect daily ${cur}/USD exchange-rate moves.`;
  }

  const note = ar ? facts.note.ar : facts.note.en;
  return `${karatSentence} ${pegSentence} ${note}`;
}

/* ----------------------------- Region grouping ---------------------------- *
 * Geographic / economic clusters used by the country hub page and RelatedLinks
 * cross-linking. Turns the footer's flat 47-country list into a structured
 * internal-link graph so every country×karat page gains contextual inbound
 * links — the signal that makes programmatic pages index and stay indexed.
 * -------------------------------------------------------------------------- */

export type Region =
  | "gcc"
  | "levant"
  | "north-africa"
  | "africa"
  | "asia"
  | "europe"
  | "americas"
  | "oceania";

export type RegionMeta = { id: Region; en: string; ar: string };

/** Hub display order — MENA-first to match the site's primary audience. */
export const REGIONS: RegionMeta[] = [
  { id: "gcc", en: "Gulf (GCC)", ar: "دول الخليج" },
  { id: "levant", en: "Levant", ar: "بلاد الشام" },
  { id: "north-africa", en: "North Africa", ar: "شمال أفريقيا" },
  { id: "africa", en: "Sub-Saharan Africa", ar: "أفريقيا جنوب الصحراء" },
  { id: "asia", en: "Asia", ar: "آسيا" },
  { id: "europe", en: "Europe", ar: "أوروبا" },
  { id: "americas", en: "Americas", ar: "الأمريكتان" },
  { id: "oceania", en: "Oceania", ar: "أوقيانوسيا" },
];

/** Country slug → region. Every COUNTRIES entry is mapped exactly once. */
export const COUNTRY_REGION: Record<string, Region> = {
  "saudi-arabia": "gcc",
  uae: "gcc",
  qatar: "gcc",
  kuwait: "gcc",
  bahrain: "gcc",
  jordan: "levant",
  lebanon: "levant",
  egypt: "north-africa",
  libya: "north-africa",
  morocco: "north-africa",
  nigeria: "africa",
  "south-africa": "africa",
  china: "asia",
  "hong-kong": "asia",
  macau: "asia",
  taiwan: "asia",
  japan: "asia",
  "south-korea": "asia",
  india: "asia",
  pakistan: "asia",
  indonesia: "asia",
  malaysia: "asia",
  singapore: "asia",
  thailand: "asia",
  vietnam: "asia",
  philippines: "asia",
  myanmar: "asia",
  europe: "europe",
  uk: "europe",
  croatia: "europe",
  denmark: "europe",
  hungary: "europe",
  "north-macedonia": "europe",
  norway: "europe",
  russia: "europe",
  serbia: "europe",
  sweden: "europe",
  switzerland: "europe",
  turkey: "europe",
  usa: "americas",
  canada: "americas",
  mexico: "americas",
  brazil: "americas",
  argentina: "americas",
  colombia: "americas",
  australia: "oceania",
  "new-zealand": "oceania",
};

/** All countries in a region, in COUNTRIES declaration order (deterministic). */
export function countriesInRegion(region: Region): Country[] {
  return COUNTRIES.filter((c) => COUNTRY_REGION[c.slug] === region);
}

/** Region for a slug, or null if unmapped. */
export function regionOf(slug: string): Region | null {
  return COUNTRY_REGION[slug] ?? null;
}

/** Adjacency used to top up RelatedLinks when a region is too small (Levant
 *  and Oceania have only 2 members) so every page still gets a full set. */
const REGION_NEIGHBOURS: Record<Region, Region[]> = {
  gcc: ["levant", "north-africa", "asia"],
  levant: ["gcc", "north-africa"],
  "north-africa": ["levant", "gcc", "africa"],
  africa: ["north-africa", "europe"],
  asia: ["gcc", "oceania", "europe"],
  europe: ["levant", "asia", "africa"],
  americas: ["europe", "asia"],
  oceania: ["asia"],
};

/**
 * Up to `count` sibling countries for cross-linking — same region first, then
 * topped up from neighbouring regions. Excludes the source country. Output is
 * deterministic (declaration order) so the static build stays stable.
 */
export function relatedCountries(slug: string, count = 4): Country[] {
  const region = COUNTRY_REGION[slug];
  if (!region) return [];
  const seen = new Set<string>([slug]);
  const out: Country[] = [];
  const take = (list: Country[]) => {
    for (const c of list) {
      if (out.length >= count) break;
      if (seen.has(c.slug)) continue;
      seen.add(c.slug);
      out.push(c);
    }
  };
  take(countriesInRegion(region));
  for (const nb of REGION_NEIGHBOURS[region]) {
    if (out.length >= count) break;
    take(countriesInRegion(nb));
  }
  return out.slice(0, count);
}
