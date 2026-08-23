import { localeMeta } from "@/i18n/routing";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { karatLabel } from "@/lib/karat-label";
import { dateLabel } from "@/lib/seo";
import { ANCHOR_MARKETS, dailyTags, focusMarkets } from "@/lib/social-tags";
import { SOCIAL_PROFILES } from "@/lib/social";

/**
 * The carousel caption, built from the same numbers the cards are rendered
 * from, so the text can never quote a price the image contradicts.
 *
 * Shape, in priority order, because Instagram truncates at roughly 125
 * characters behind "… more":
 *
 *   1. the move (a headline, not a date — "gold is up 0.4%" earns the tap)
 *   2. date + what this post contains, in words that match how people search
 *   3. per-gram prices as **text** for the day's lead markets
 *   4. the remaining markets, so a follower sees their country and swipes
 *   5. one question, to earn comments
 *   6. the link
 *   7. the rotating tag block
 *
 * Step 3 matters more than the hashtags: Instagram search reads caption text,
 * so writing "سعر الذهب اليوم في السعودية" in prose is worth more than tagging
 * it. It also makes the post useful to anyone who never swipes.
 */

/** Karat headlined in the caption body — the jewellery standard in the Gulf and Egypt. */
const CAPTION_KARAT = "21k";

/** How many price lines the caption carries before it gets long. */
const LEAD_COUNT = 6;

const T = {
  headline: {
    en: "Gold today: ounce",
    ar: "الذهب اليوم: الأونصة",
    fr: "L'or aujourd'hui : l'once",
    tr: "Bugün altın: ons",
    ur: "آج سونا: اونس",
    hi: "आज सोना: औंस",
  },
  subline: {
    en: "gold price today, 24K/22K/21K/18K per gram in {n} countries",
    ar: "سعر الذهب اليوم عيار 24 و22 و21 و18 بالجرام في {n} {دولة}",
    fr: "prix de l'or aujourd'hui, 24/22/21/18 carats le gramme dans {n} pays",
    tr: "bugün altın fiyatı, gram başına 24/22/21/18 ayar, {n} ülkede",
    ur: "آج سونے کی قیمت، 24/22/21/18 قیراط فی گرام، {n} ممالک میں",
    hi: "आज सोने का भाव, 24/22/21/18 कैरेट प्रति ग्राम, {n} देशों में",
  },
  swipe: {
    en: "Swipe for your country:",
    ar: "اسحب لدولتك:",
    fr: "Faites défiler pour votre pays :",
    tr: "Ülkeniz için kaydırın:",
    ur: "اپنے ملک کے لیے سوائپ کریں:",
    hi: "अपने देश के लिए स्वाइप करें:",
  },
  ask: {
    en: "Which country do you want next? Name it in the comments.",
    ar: "اكتب اسم دولتك في التعليقات ونرد عليك بسعر اليوم.",
    fr: "Quel pays voulez-vous ? Dites-le en commentaire.",
    tr: "Hangi ülkeyi istersiniz? Yorumlara yazın.",
    ur: "کون سا ملک چاہیے؟ کمنٹ میں لکھیں۔",
    hi: "कौन सा देश चाहिए? कमेंट में लिखें।",
  },
  link: {
    en: "Every country, karat and currency:",
    ar: "كل الدول والعيارات والعملات:",
    fr: "Tous les pays, carats et devises :",
    tr: "Tüm ülkeler, ayarlar ve para birimleri:",
    ur: "تمام ممالک، قیراط اور کرنسیاں:",
    hi: "सभी देश, कैरेट और मुद्राएँ:",
  },
  inBio: {
    en: "link in bio",
    ar: "الرابط في البايو",
    fr: "lien dans la bio",
    tr: "bağlantı bioda",
    ur: "لنک بائیو میں",
    hi: "लिंक बायो में",
  },
  altCover: {
    en: "Cover card: gold price today, ounce in USD and the list of countries in this carousel.",
    ar: "صورة الغلاف: أسعار الذهب اليوم، سعر الأونصة بالدولار وقائمة الدول في المنشور.",
  },
  altCountry: {
    en: "Gold price card for {country}: 24K, 22K, 21K and 18K per gram in {currency}, the USD ounce and a 30-day chart.",
    ar: "بطاقة أسعار الذهب في {country}: عيار 24 و22 و21 و18 بالجرام بـ{currency}، سعر الأونصة بالدولار ورسم بياني لـ30 يوماً.",
  },
} satisfies Record<string, LocaleText>;

export type MarketPrice = {
  slug: string;
  /** Per-gram price of `CAPTION_KARAT` in the market's own currency. */
  gram: number | null;
  currency: string;
};

export type CaptionInput = {
  locale: string;
  when: Date;
  ounceUsd: number;
  changePct: number | null;
  markets: MarketPrice[];
  siteUrl: string;
};

/**
 * Arabic counted-noun agreement (التمييز). 3–10 take the plural in the
 * genitive — "9 دول" — while 11–99 take the singular — "19 دولة". Getting this
 * wrong is the kind of thing a native reader spots instantly, and the carousel
 * length changes with the upload target, so it cannot be hard-coded.
 */
function countryNoun(n: number): string {
  if (n === 1) return "دولة واحدة";
  if (n === 2) return "دولتان";
  if (n >= 3 && n <= 10) return "دول";
  return "دولة";
}

/** "412.35 ر.س." — the market's own symbol, Latin digits (see `localeMeta.intl`). */
export function money(locale: string, value: number, currency: string): string {
  try {
    return new Intl.NumberFormat(localeMeta(locale).intl, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      maximumFractionDigits: currency === "LBP" || currency === "IDR" ? 0 : 2,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

/** Order the price lines: the three anchors first, then today's rotation. */
function leadMarkets(when: Date, markets: MarketPrice[]): MarketPrice[] {
  const bySlug = new Map(markets.map((m) => [m.slug, m]));
  const order = [
    ...ANCHOR_MARKETS,
    ...focusMarkets(when, markets.map((m) => m.slug)),
  ];
  const seen = new Set<string>();
  const lead: MarketPrice[] = [];
  for (const slug of order) {
    const m = bySlug.get(slug);
    if (!m || seen.has(slug) || m.gram === null) continue;
    seen.add(slug);
    lead.push(m);
    if (lead.length === LEAD_COUNT) break;
  }
  return lead;
}

export function buildCaption(input: CaptionInput): string {
  const { locale, when, ounceUsd, changePct, markets, siteUrl } = input;
  // Always two decimals: a price that renders "$4,530" one day and "$4,530.18"
  // the next reads like two different feeds.
  const usd = ounceUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const move =
    changePct === null
      ? ""
      : ` ${changePct >= 0 ? "▲" : "▼"} ${changePct >= 0 ? "+" : "−"}${Math.abs(changePct).toFixed(2)}%`;

  const lead = leadMarkets(when, markets);
  const leadSlugs = new Set(lead.map((m) => m.slug));
  const karat = karatLabel(locale, CAPTION_KARAT);

  const priceLines = lead.map((m) => {
    const c = COUNTRY_BY_SLUG[m.slug];
    const name = c ? countryName(c, locale) : m.slug;
    const flag = c?.flag ?? "";
    return `${flag} ${name} · ${karat}: ${money(locale, m.gram!, m.currency)}`;
  });

  const rest = markets
    .filter((m) => !leadSlugs.has(m.slug))
    .map((m) => {
      const c = COUNTRY_BY_SLUG[m.slug];
      return c ? countryName(c, locale) : m.slug;
    });

  const handle = SOCIAL_PROFILES[0]?.handle ?? "goldpricearabia";
  const domain = siteUrl.replace(/^https?:\/\//, "").replace(/\/+$/, "");

  const lines = [
    `🟡 ${pick(locale, T.headline)} $${usd}${move}`,
    `📅 ${dateLabel(locale, when, true)} — ${pick(locale, T.subline)
      .replace("{n}", markets.length === 1 || markets.length === 2 ? "" : String(markets.length))
      .replace("{دولة}", countryNoun(markets.length))
      .replace(/\s+/g, " ")
      .trim()}`,
    "",
    ...priceLines,
    "",
    `➡️ ${pick(locale, T.swipe)} ${rest.join(" · ")}`,
    "",
    `💬 ${pick(locale, T.ask)}`,
    `🔗 ${pick(locale, T.link)} ${domain} — ${pick(locale, T.inBio)}`,
    `📲 @${handle}`,
    "",
    dailyTags(when, markets.map((m) => m.slug)).join(" "),
  ];
  return lines.join("\n");
}

/**
 * Per-slide alt text. Instagram lets you set it per image; it is the only part
 * of a picture a screen reader — or an image index — can read.
 */
export function buildAltText(input: CaptionInput): string[] {
  const { locale, markets } = input;
  const tpl = pick(locale, T.altCountry);
  return [
    pick(locale, T.altCover),
    ...markets.map((m) => {
      const c = COUNTRY_BY_SLUG[m.slug];
      const name = c ? countryName(c, locale) : m.slug;
      let currency = m.currency;
      try {
        currency = new Intl.DisplayNames(localeMeta(locale).intl, { type: "currency" }).of(m.currency) ?? m.currency;
      } catch {
        /* ISO code is a fine fallback */
      }
      return tpl.replace("{country}", name).replace("{currency}", currency);
    }),
  ];
}
