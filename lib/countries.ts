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

/** Return the country-specific note or null if no commentary exists yet. */
export function countryNote(slug: string, locale: string): string | null {
  const note = COUNTRY_NOTES[slug];
  if (!note) return null;
  return locale === "ar" ? note.ar : note.en;
}
