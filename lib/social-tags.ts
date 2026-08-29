/**
 * Hashtag sets for the daily Instagram carousel.
 *
 * Three things drove this design:
 *
 * 1. **Rotation.** Posting the same 29-tag block every day is the single
 *    clearest "automated account" signal Instagram has. Everything below the
 *    core five rotates on a day index, so no two consecutive days ship the same
 *    block while every market still gets covered inside a week.
 *
 * 2. **Tiering.** A tag with millions of posts buries you in seconds; a tag with
 *    a few hundred has nobody reading it. The sets below deliberately mix a few
 *    broad tags, a majority of mid-size country/karat tags, and a handful of
 *    niche buyer tags (jewellery, bullion, souq) where this audience actually
 *    browses.
 *
 * 3. **Spelling variants are different tags.** Instagram does not fold the
 *    hamza, and does not fold spaces: `#أسعار_الذهب`, `#اسعار_الذهب` and
 *    `#اسعارالذهب` are three separate feeds, all of them used. `VARIANTS`
 *    rotates through them instead of spamming all three at once.
 *
 * Reality check, so nobody over-invests here: hashtags are a minor reach lever
 * on Instagram now. Ranking in search comes mostly from the account Name field
 * and from keywords in the caption body — which is why `lib/social-caption.ts`
 * writes country names and "سعر الذهب اليوم" as plain text, not only as tags.
 */

/** Always present: brand-defining, high intent. */
export const CORE_TAGS = [
  "#أسعار_الذهب",
  "#سعر_الذهب_اليوم",
  "#الذهب",
  "#goldprice",
] as const;

/** Spelling variants of the head term — one per day, never all at once. */
export const VARIANT_TAGS = [
  "#اسعار_الذهب",
  "#اسعارالذهب",
  "#سعرالذهب",
  "#اسعار_الذهب_اليوم",
  "#goldpricetoday",
] as const;

/**
 * Per-market tags. Local-language where the market is local-language: Turkish
 * users search `#altınfiyatları`, Malaysians `#hargaemas`, and the subcontinent
 * `#sonachandi` — the `#gold_india` style tags this replaces were near-empty.
 */
export const COUNTRY_TAGS: Record<string, readonly string[]> = {
  "saudi-arabia": ["#الذهب_في_السعودية", "#السعودية", "#الرياض", "#جدة", "#الدمام"],
  uae: ["#الذهب_في_الامارات", "#الامارات", "#دبي", "#ابوظبي", "#سوق_الذهب_دبي"],
  egypt: ["#الذهب_في_مصر", "#مصر", "#القاهرة", "#جنيه_الذهب", "#اسعار_الذهب_في_مصر"],
  // Never bare `#عمان` — it reads as both Amman and Oman, so the feed is noise,
  // and the disambiguated spellings are too thin to be worth a slot.
  jordan: ["#الذهب_في_الاردن", "#الاردن"],
  kuwait: ["#الذهب_في_الكويت", "#الكويت"],
  qatar: ["#الذهب_في_قطر", "#قطر", "#الدوحة"],
  bahrain: ["#الذهب_في_البحرين", "#البحرين", "#المنامة"],
  lebanon: ["#الذهب_في_لبنان", "#لبنان", "#بيروت"],
  morocco: ["#الذهب_في_المغرب", "#المغرب", "#الدار_البيضاء"],
  libya: ["#الذهب_في_ليبيا", "#ليبيا", "#طرابلس"],
  // The six markets added 2026-08-27. Without an entry here a reel made to rank
  // for Syria carries no Syrian tag at all — the caption named the country and
  // the hashtags did not, which is how the first per-country reel shipped.
  syria: ["#الذهب_في_سوريا", "#سوريا", "#دمشق", "#حلب", "#سوق_الذهب_دمشق"],
  iraq: ["#الذهب_في_العراق", "#العراق", "#بغداد", "#اربيل", "#البصرة"],
  yemen: ["#الذهب_في_اليمن", "#اليمن", "#صنعاء", "#عدن", "#تعز"],
  palestine: ["#الذهب_في_فلسطين", "#فلسطين", "#غزة", "#الخليل", "#نابلس"],
  algeria: ["#الذهب_في_الجزائر", "#الجزائر", "#وهران", "#قسنطينة"],
  tunisia: ["#الذهب_في_تونس", "#تونس", "#صفاقس", "#سوسة"],
  turkey: ["#altınfiyatları", "#gramaltın", "#çeyrekaltın", "#altin"],
  india: ["#goldrate", "#goldratetoday", "#sonachandi", "#goldrateindia"],
  pakistan: ["#goldrateinpakistan", "#goldpricepakistan", "#sonachandi"],
  malaysia: ["#hargaemas", "#emas916", "#emas"],
  usa: ["#spotgold", "#goldprices"],
  uk: ["#goldpriceuk", "#bullionuk"],
  europe: ["#goldpreis", "#prixdelor"],
  canada: ["#goldcanada"],
  australia: ["#goldaustralia"],
};

/** Regional umbrella tags — cheap reach across the whole Gulf audience. */
export const REGION_TAGS = ["#الخليج", "#دول_الخليج", "#GCC", "#الشرق_الاوسط"] as const;

/** Karat and unit tags: how buyers actually describe what they want. */
export const KARAT_TAGS = [
  "#عيار_21",
  "#عيار_22",
  "#عيار_24",
  "#عيار_18",
  "#عيار21",
  "#عيار22",
  "#ذهب_عيار_21",
  "#سبائك_ذهب",
  "#اونصة_الذهب",
] as const;

/** Where gold buyers browse when they are not looking at a price chart. */
export const COMMUNITY_TAGS = [
  "#مجوهرات",
  "#محلات_الذهب",
  "#سوق_الذهب",
  "#ذهب_للبيع",
  "#استثمار_الذهب",
  "#استثمار",
  "#ادخار",
  "#اقتصاد",
  "#مجوهرات_ذهب",
  "#خواتم_ذهب",
  "#طقم_ذهب",
  "#الذهب_والفضة",
] as const;

/** English / trading side. */
export const INTL_TAGS = [
  "#gold",
  "#xauusd",
  "#bullion",
  "#preciousmetals",
  "#goldmarket",
  "#goldinvestment",
  "#24kgold",
  "#22kgold",
  "#goldbars",
  "#investing",
] as const;

/**
 * The three markets that carry the audience. Their lead tag ships every day
 * whatever the rotation says — the caption always quotes their prices, so the
 * post would otherwise be tagged for countries it does not lead with.
 */
export const ANCHOR_MARKETS = ["saudi-arabia", "uae", "egypt"] as const;

/**
 * Instagram's hard cap is 30. We aim below it: hitting the ceiling every single
 * day is itself a pattern, and the last few tags are the weakest ones anyway.
 */
export const MAX_TAGS = 28;

/** Days since epoch: the rotation clock, shared with the card accent colour. */
function dayIndex(when: Date): number {
  return Math.floor(when.getTime() / 86_400_000);
}

/** Take `count` items starting at `offset`, wrapping around the list. */
function rotate<T>(list: readonly T[], offset: number, count: number): T[] {
  if (!list.length) return [];
  const n = Math.min(count, list.length);
  const start = ((offset % list.length) + list.length) % list.length;
  return Array.from({ length: n }, (_, i) => list[(start + i) % list.length]);
}

/**
 * The markets whose tags lead today. Four a day walks the full 19-market list
 * in five days, so every country gets a turn without any single day looking
 * like a country dump.
 */
export function focusMarkets(when: Date, markets: readonly string[], count = 4): string[] {
  const known = markets.filter((m) => COUNTRY_TAGS[m]?.length);
  return rotate(known, dayIndex(when) * count, count);
}

/**
 * Today's tag block. Deterministic for a given day, so re-running the generator
 * reproduces the same post rather than a different one.
 */
export function dailyTags(when: Date, markets: readonly string[], pinned?: string): string[] {
  const d = dayIndex(when);
  const out: string[] = [
    ...CORE_TAGS,
    ...rotate(VARIANT_TAGS, d, 1),
    // A pinned market takes every tag it has, ahead of the anchors. A reel made
    // to rank for Syria has to carry #الذهب_في_سوريا; the rotation alone would
    // drop it on most days.
    ...(pinned && markets.includes(pinned) ? (COUNTRY_TAGS[pinned] ?? []) : []),
    ...ANCHOR_MARKETS.filter((m) => markets.includes(m)).map((m) => COUNTRY_TAGS[m][0]),
    ...focusMarkets(when, markets).flatMap((m) => rotate(COUNTRY_TAGS[m] ?? [], d, 3)),
    ...rotate(REGION_TAGS, d, 2),
    ...rotate(KARAT_TAGS, d * 2, 3),
    ...rotate(COMMUNITY_TAGS, d * 3, 2),
    ...rotate(INTL_TAGS, d * 2, 2),
  ];
  // Country lists overlap (#sonachandi covers India and Pakistan), so dedupe
  // before trimming or a duplicate would eat one of the 30 slots.
  return Array.from(new Set(out)).slice(0, MAX_TAGS);
}
