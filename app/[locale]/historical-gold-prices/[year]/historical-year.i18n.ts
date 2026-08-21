import { localeMeta } from "@/i18n/routing";
import { pick } from "@/lib/i18n-text";
import { fmtNum } from "@/lib/seo";
import type { YearStats } from "@/lib/year-stats";

/**
 * Title / H1 / meta description.
 *
 * With `stats` the title leads with the query people actually type
 * ("سعر الذهب في 2024") and carries the answer (high / low), which is what the
 * Search Console data says these pages rank for. Without stats (data feed
 * down) it falls back to the neutral archive title.
 */
export function yearPageText(locale: string, year: string | number, stats?: YearStats | null) {
  const hi = stats ? fmtNum(stats.high, 0) : "";
  const lo = stats ? fmtNum(stats.low, 0) : "";
  const avg = stats ? fmtNum(stats.avg, 0) : "";
  const g21 = stats ? fmtNum(stats.gram["21k"] ?? 0, 1) : "";
  const h1 = pick(locale, {
    en: `Gold Price in ${year}`,
    ar: `سعر الذهب في ${year}`,
    fr: `Prix de l'or en ${year}`,
    tr: `${year} altın fiyatı`,
    ur: `${year} میں سونے کی قیمت`,
    hi: `${year} में सोने का भाव`,
  });
  const archive = pick(locale, {
    en: `Historical Gold Prices · ${year}`,
    ar: `سجل أسعار الذهب · ${year}`,
    fr: `Prix historiques de l'or · ${year}`,
    tr: `Geçmiş altın fiyatları · ${year}`,
    ur: `سونے کی تاریخی قیمتیں · ${year}`,
    hi: `सोने के ऐतिहासिक भाव · ${year}`,
  });
  const title = stats
    ? pick(locale, {
        en: `Gold Price in ${year}: High $${hi}, Low $${lo} per Ounce`,
        ar: `سعر الذهب في ${year}: أعلى ${hi}$ وأدنى ${lo}$ للأونصة`,
        fr: `Prix de l'or en ${year} : plus haut ${hi} $, plus bas ${lo} $ l'once`,
        tr: `${year} altın fiyatı: en yüksek ${hi} $, en düşük ${lo} $ (ons)`,
        ur: `${year} میں سونے کی قیمت: بلند ترین ${hi}$، کم ترین ${lo}$ فی اونس`,
        hi: `${year} में सोने का भाव: उच्चतम $${hi}, न्यूनतम $${lo} प्रति औंस`,
      })
    : archive;
  return {
    title,
    h1,
    description: stats
      ? pick(locale, {
          en: `Gold price in ${year}: yearly high $${hi}, low $${lo}, average $${avg} per troy ounce (about $${g21}/gram for 21K). Month-by-month open, high, low and close.`,
          ar: `سعر الذهب في ${year}: أعلى سعر ${hi}$ وأدنى سعر ${lo}$ ومتوسط ${avg}$ للأونصة (نحو ${g21}$ للجرام عيار 21). جدول شهري بالافتتاح والأعلى والأدنى والإغلاق.`,
          fr: `Prix de l'or en ${year} : plus haut ${hi} $, plus bas ${lo} $, moyenne ${avg} $ l'once troy (environ ${g21} $/gramme en 21 carats). Tableau mensuel complet.`,
          tr: `${year} altın fiyatı: yıl en yüksek ${hi} $, en düşük ${lo} $, ortalama ${avg} $ (troy ons); 21 ayar gramı yaklaşık ${g21} $. Aylık açılış, yüksek, düşük ve kapanış.`,
          ur: `${year} میں سونے کی قیمت: بلند ترین ${hi}$، کم ترین ${lo}$، اوسط ${avg}$ فی ٹرائے اونس (21 قیراط تقریباً ${g21}$ فی گرام)۔ ماہانہ اوپن، ہائی، لو اور کلوز۔`,
          hi: `${year} में सोने का भाव: वर्ष का उच्चतम $${hi}, न्यूनतम $${lo}, औसत $${avg} प्रति ट्रॉय औंस (21 कैरेट लगभग $${g21}/ग्राम)। महीनेवार ओपन, हाई, लो और क्लोज़।`,
        })
      : pick(locale, {
          en: `Historical gold prices for ${year} — daily OHLC data per karat across multiple currencies.`,
          ar: `سجل أسعار الذهب لعام ${year} — بيانات OHLC اليومية لكل عيار عبر عدة عملات.`,
          fr: `Prix historiques de l'or en ${year} — données OHLC quotidiennes par carat dans plusieurs devises.`,
          tr: `${year} yılı geçmiş altın fiyatları — birden fazla para biriminde ayar bazında günlük OHLC verileri.`,
          ur: `${year} کی سونے کی تاریخی قیمتیں — متعدد کرنسیوں میں فی قیراط روزانہ OHLC ڈیٹا۔`,
          hi: `${year} के सोने के ऐतिहासिक भाव — कई मुद्राओं में प्रति कैरेट दैनिक OHLC डेटा।`,
        }),
    noData: pick(locale, {
      en: `Historical data for ${year} is not available yet.`,
      ar: `لا تتوفر بيانات تاريخية لعام ${year} حالياً.`,
      fr: `Les données historiques pour ${year} ne sont pas encore disponibles.`,
      tr: `${year} yılına ait geçmiş veriler henüz mevcut değil.`,
      ur: `${year} کا تاریخی ڈیٹا ابھی دستیاب نہیں۔`,
      hi: `${year} का ऐतिहासिक डेटा अभी उपलब्ध नहीं है।`,
    }),
    monthlyHeading: pick(locale, {
      en: `Monthly XAU/USD · ${year} (USD / troy oz)`,
      ar: `سعر الذهب الشهري · ${year} (دولار أمريكي / أونصة)`,
      fr: `XAU/USD mensuel · ${year} (USD / once troy)`,
      tr: `Aylık XAU/USD · ${year} (USD / troy ons)`,
      ur: `ماہانہ XAU/USD · ${year} (USD / ٹرائے اونس)`,
      hi: `मासिक XAU/USD · ${year} (USD / ट्रॉय औंस)`,
    }),
  };
}

/**
 * One-paragraph answer placed directly under the H1 — written to be liftable
 * as a featured snippet for "كم كان سعر الذهب {year}" and its variants.
 */
export function yearAnswer(locale: string, s: YearStats): string {
  const hi = fmtNum(s.high, 0), lo = fmtNum(s.low, 0), avg = fmtNum(s.avg, 0);
  const g24 = fmtNum(s.gram["24k"] ?? 0, 1), g21 = fmtNum(s.gram["21k"] ?? 0, 1);
  const chg = `${s.yoyPct >= 0 ? "+" : ""}${s.yoyPct.toFixed(1)}%`;
  return pick(locale, {
    en: `In ${s.year} gold traded between $${lo} and $${hi} per troy ounce, averaging $${avg} — about $${g24} per gram of 24K and $${g21} per gram of 21K. The year opened at $${fmtNum(s.open, 0)} and closed at $${fmtNum(s.close, 0)}, a change of ${chg} across ${s.points} trading days.`,
    ar: `تراوح سعر الذهب في ${s.year} بين ${lo}$ و${hi}$ للأونصة، بمتوسط ${avg}$ — أي نحو ${g24}$ لجرام عيار 24 و${g21}$ لجرام عيار 21. افتتح العام عند ${fmtNum(s.open, 0)}$ وأغلق عند ${fmtNum(s.close, 0)}$، بتغير ${chg} خلال ${s.points} يوم تداول.`,
    fr: `En ${s.year}, l'or a évolué entre ${lo} $ et ${hi} $ l'once troy, avec une moyenne de ${avg} $ — soit environ ${g24} $ le gramme en 24 carats et ${g21} $ en 21 carats. L'année a ouvert à ${fmtNum(s.open, 0)} $ et clôturé à ${fmtNum(s.close, 0)} $, une variation de ${chg} sur ${s.points} séances.`,
    tr: `${s.year} yılında altın ons başına ${lo} $ ile ${hi} $ arasında işlem gördü, ortalama ${avg} $ — yani 24 ayar gramı yaklaşık ${g24} $, 21 ayar gramı ${g21} $. Yıl ${fmtNum(s.open, 0)} $ ile açıldı, ${fmtNum(s.close, 0)} $ ile kapandı; ${s.points} işlem gününde ${chg} değişim.`,
    ur: `${s.year} میں سونا فی ٹرائے اونس ${lo}$ اور ${hi}$ کے درمیان رہا، اوسط ${avg}$ — یعنی 24 قیراط تقریباً ${g24}$ فی گرام اور 21 قیراط ${g21}$ فی گرام۔ سال ${fmtNum(s.open, 0)}$ پر کھلا اور ${fmtNum(s.close, 0)}$ پر بند ہوا، ${s.points} تجارتی دنوں میں ${chg} تبدیلی۔`,
    hi: `${s.year} में सोना प्रति ट्रॉय औंस $${lo} से $${hi} के बीच रहा, औसत $${avg} — यानी 24 कैरेट लगभग $${g24}/ग्राम और 21 कैरेट $${g21}/ग्राम। वर्ष $${fmtNum(s.open, 0)} पर खुला और $${fmtNum(s.close, 0)} पर बंद हुआ, ${s.points} कारोबारी दिनों में ${chg} का बदलाव।`,
  });
}

/** FAQ mirroring the exact questions these pages rank for. */
export function yearFaqs(locale: string, s: YearStats): Array<{ q: string; a: string }> {
  const hi = fmtNum(s.high, 0), lo = fmtNum(s.low, 0), avg = fmtNum(s.avg, 0);
  const g21 = fmtNum(s.gram["21k"] ?? 0, 1), g24 = fmtNum(s.gram["24k"] ?? 0, 1), g18 = fmtNum(s.gram["18k"] ?? 0, 1);
  const y = s.year;
  const rows: Array<{ q: Record<string, string>; a: Record<string, string> }> = [
    {
      q: { en: `How much was gold in ${y}?`, ar: `كم كان سعر الذهب في ${y}؟`, fr: `Combien valait l'or en ${y} ?`, tr: `${y} yılında altın ne kadardı?`, ur: `${y} میں سونا کتنے کا تھا؟`, hi: `${y} में सोना कितने का था?` },
      a: { en: `Gold averaged $${avg} per troy ounce in ${y}, roughly $${g24} per gram of 24K gold.`, ar: `بلغ متوسط سعر الذهب في ${y} نحو ${avg}$ للأونصة، أي حوالي ${g24}$ لجرام عيار 24.`, fr: `En ${y}, l'or valait en moyenne ${avg} $ l'once troy, soit environ ${g24} $ le gramme en 24 carats.`, tr: `${y} yılında altın ons başına ortalama ${avg} $ oldu; 24 ayar gramı yaklaşık ${g24} $.`, ur: `${y} میں سونے کی اوسط قیمت ${avg}$ فی اونس رہی، یعنی 24 قیراط تقریباً ${g24}$ فی گرام۔`, hi: `${y} में सोने का औसत भाव $${avg} प्रति ट्रॉय औंस रहा, यानी 24 कैरेट लगभग $${g24}/ग्राम।` },
    },
    {
      q: { en: `What was the highest gold price in ${y}?`, ar: `ما أعلى سعر للذهب في ${y}؟`, fr: `Quel a été le plus haut de l'or en ${y} ?`, tr: `${y} yılında altının en yüksek fiyatı neydi?`, ur: `${y} میں سونے کی بلند ترین قیمت کیا تھی؟`, hi: `${y} में सोने का उच्चतम भाव क्या था?` },
      a: { en: `The highest gold price in ${y} was $${hi} per troy ounce.`, ar: `أعلى سعر للذهب في ${y} كان ${hi}$ للأونصة.`, fr: `Le plus haut de l'or en ${y} a été de ${hi} $ l'once troy.`, tr: `${y} yılında altının en yüksek fiyatı ons başına ${hi} $ oldu.`, ur: `${y} میں سونے کی بلند ترین قیمت ${hi}$ فی ٹرائے اونس تھی۔`, hi: `${y} में सोने का उच्चतम भाव $${hi} प्रति ट्रॉय औंस था।` },
    },
    {
      q: { en: `What was the lowest gold price in ${y}?`, ar: `ما أقل سعر للذهب في ${y}؟`, fr: `Quel a été le plus bas de l'or en ${y} ?`, tr: `${y} yılında altının en düşük fiyatı neydi?`, ur: `${y} میں سونے کی کم ترین قیمت کیا تھی؟`, hi: `${y} में सोने का न्यूनतम भाव क्या था?` },
      a: { en: `The lowest gold price in ${y} was $${lo} per troy ounce.`, ar: `أقل سعر للذهب في ${y} كان ${lo}$ للأونصة.`, fr: `Le plus bas de l'or en ${y} a été de ${lo} $ l'once troy.`, tr: `${y} yılında altının en düşük fiyatı ons başına ${lo} $ oldu.`, ur: `${y} میں سونے کی کم ترین قیمت ${lo}$ فی ٹرائے اونس تھی۔`, hi: `${y} में सोने का न्यूनतम भाव $${lo} प्रति ट्रॉय औंस था।` },
    },
    {
      q: { en: `How much was one gram of 21K gold in ${y}?`, ar: `كم كان سعر جرام الذهب عيار 21 في ${y}؟`, fr: `Combien valait un gramme d'or 21 carats en ${y} ?`, tr: `${y} yılında 21 ayar altının gramı ne kadardı?`, ur: `${y} میں 21 قیراط سونے کا ایک گرام کتنے کا تھا؟`, hi: `${y} में 21 कैरेट सोने का एक ग्राम कितने का था?` },
      a: { en: `At the ${y} average, one gram of 21K gold was about $${g21}; 18K was about $${g18} and 24K about $${g24}.`, ar: `بمتوسط عام ${y}، بلغ سعر جرام الذهب عيار 21 نحو ${g21}$، وعيار 18 نحو ${g18}$، وعيار 24 نحو ${g24}$.`, fr: `À la moyenne ${y}, un gramme d'or 21 carats valait environ ${g21} $ ; 18 carats environ ${g18} $ et 24 carats environ ${g24} $.`, tr: `${y} ortalamasına göre 21 ayar altının gramı yaklaşık ${g21} $, 18 ayar ${g18} $, 24 ayar ${g24} $ idi.`, ur: `${y} کی اوسط کے مطابق 21 قیراط سونے کا ایک گرام تقریباً ${g21}$، 18 قیراط ${g18}$ اور 24 قیراط ${g24}$ تھا۔`, hi: `${y} के औसत पर 21 कैरेट सोने का एक ग्राम लगभग $${g21}, 18 कैरेट $${g18} और 24 कैरेट $${g24} था।` },
    },
  ];
  return rows.map((r) => ({ q: pick(locale, r.q as never), a: pick(locale, r.a as never) }));
}

/** Year-summary stat labels. */
export function yearStatLabels(locale: string) {
  return {
    open: pick(locale, { en: "Year open", ar: "افتتاح السنة", fr: "Ouverture annuelle", tr: "Yıl açılışı", ur: "سال کا افتتاح", hi: "वर्ष ओपन" }),
    close: pick(locale, { en: "Year close", ar: "إغلاق السنة", fr: "Clôture annuelle", tr: "Yıl kapanışı", ur: "سال کا اختتام", hi: "वर्ष क्लोज़" }),
    high: pick(locale, { en: "Year high", ar: "أعلى سعر", fr: "Plus haut annuel", tr: "Yıl en yüksek", ur: "سال کی بلند ترین", hi: "वर्ष उच्च" }),
    low: pick(locale, { en: "Year low", ar: "أدنى سعر", fr: "Plus bas annuel", tr: "Yıl en düşük", ur: "سال کی کم ترین", hi: "वर्ष निम्न" }),
    avg: pick(locale, { en: "Year average", ar: "المتوسط", fr: "Moyenne annuelle", tr: "Yıl ortalaması", ur: "سالانہ اوسط", hi: "वार्षिक औसत" }),
    yoy: pick(locale, { en: "Year change", ar: "التغير السنوي", fr: "Variation annuelle", tr: "Yıllık değişim", ur: "سالانہ تبدیلی", hi: "वार्षिक बदलाव" }),
    points: pick(locale, { en: "Trading days", ar: "أيام التداول", fr: "jours de cotation", tr: "işlem günü", ur: "تجارتی دن", hi: "कारोबारी दिन" }),
  };
}

/** Monthly OHLC table headers. */
export function monthTableHeaders(locale: string) {
  return {
    month: pick(locale, { en: "Month", ar: "الشهر", fr: "Mois", tr: "Ay", ur: "مہینہ", hi: "महीना" }),
    open: pick(locale, { en: "Open", ar: "افتتاح", fr: "Ouverture", tr: "Açılış", ur: "افتتاح", hi: "ओपन" }),
    high: pick(locale, { en: "High", ar: "أعلى", fr: "Plus haut", tr: "En yüksek", ur: "بلند ترین", hi: "उच्च" }),
    low: pick(locale, { en: "Low", ar: "أدنى", fr: "Plus bas", tr: "En düşük", ur: "کم ترین", hi: "निम्न" }),
    close: pick(locale, { en: "Close", ar: "إغلاق", fr: "Clôture", tr: "Kapanış", ur: "اختتام", hi: "क्लोज़" }),
    change: pick(locale, { en: "Change", ar: "التغير", fr: "Variation", tr: "Değişim", ur: "تبدیلی", hi: "बदलाव" }),
  };
}

const MONTH_LABELS: Partial<Record<string, readonly string[]>> = {
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  ar: [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
  ],
};

const MONTH_FMT: Record<string, Intl.DateTimeFormat> = {};

/** Full month name for a 0-based index; fixed ar/en lists, Intl for the rest. */
export function monthName(locale: string, monthIdx: number): string {
  const fixed = MONTH_LABELS[locale];
  if (fixed) return fixed[monthIdx];
  const tag = localeMeta(locale).intl;
  MONTH_FMT[tag] ??= new Intl.DateTimeFormat(tag, { month: "long", timeZone: "UTC" });
  return MONTH_FMT[tag].format(new Date(Date.UTC(2000, monthIdx, 1)));
}
