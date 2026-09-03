import { KARAT_GUIDE } from "@/content/karat-guide";
import { COUNTRY_FACTS } from "@/lib/countries";
import { pick } from "@/lib/i18n-text";

/**
 * Composes the karat-guide section for `/[country]/gold-price/[karat]`.
 *
 * The copy itself lives in `content/karat-guide.ts`; this module adds the one
 * sentence that makes the section differ per COUNTRY as well as per karat —
 * whether this karat is the one the local retail trade is built around.
 * Without it the five karat pages would differ from each other but the same
 * karat would read identically across all 53 countries.
 */
export function karatGuideText(locale: string, karat: string, countryName: string, slug: string) {
  const guide = KARAT_GUIDE[karat];
  if (!guide) return { heading: "", spec: null, local: null, paragraphs: [] as string[] };

  const k = karat.replace(/k$/i, "");
  const dominant = COUNTRY_FACTS[slug]?.karat; // e.g. "21K"
  const dominantK = dominant ? dominant.replace(/K$/i, "") : null;

  const heading = pick(locale, {
    en: `What ${k}K gold actually is`,
    ar: `ما هو ذهب عيار ${k} فعليًا`,
    fr: `Ce qu'est réellement l'or ${k} carats`,
    tr: `${k} ayar altın gerçekte nedir`,
    ur: `${k} قیراط سونا دراصل کیا ہے`,
    hi: `${k} कैरेट सोना वास्तव में क्या है`,
  });

  const spec = pick(locale, {
    en: `${guide.purity} pure · ${guide.parts} · hallmarked ${guide.hallmark}`,
    ar: `نقاء ${guide.purity} · ${guide.parts} · ختم ${guide.hallmark}`,
    fr: `pureté ${guide.purity} · ${guide.parts} · poinçon ${guide.hallmark}`,
    tr: `%${guide.purity.replace("%", "")} saf · ${guide.parts} · ${guide.hallmark} damgalı`,
    ur: `${guide.purity} خالص · ${guide.parts} · مہر ${guide.hallmark}`,
    hi: `${guide.purity} शुद्ध · ${guide.parts} · मुहर ${guide.hallmark}`,
  });

  let local: string | null = null;
  if (dominantK && dominantK === k) {
    local = pick(locale, {
      en: `In ${countryName}, ${k}K is the karat the retail trade is built around, so it is the one you will be quoted first and the one with the deepest buy-back market.`,
      ar: `في ${countryName} يمثّل عيار ${k} العيار الذي تقوم عليه تجارة التجزئة، لذا هو الأول الذي يُذكر لك وصاحب أوسع سوق لإعادة الشراء.`,
      fr: `${countryName} : le ${k} carats est le carat autour duquel le commerce de détail est organisé, c'est donc celui qu'on vous citera en premier et celui dont le marché de rachat est le plus profond.`,
      tr: `${countryName} ülkesinde perakende ticaret ${k} ayar üzerine kuruludur; size ilk söylenecek ve geri alım pazarı en derin olan ayar budur.`,
      ur: `${countryName} میں خوردہ تجارت ${k} قیراط پر قائم ہے، اس لیے یہی وہ عیار ہے جو آپ کو سب سے پہلے بتایا جائے گا اور جس کی واپس خریداری کی منڈی سب سے گہری ہے۔`,
      hi: `${countryName} में खुदरा व्यापार ${k} कैरेट पर टिका है, इसलिए यही वह कैरेट है जो आपको सबसे पहले बताया जाएगा और जिसका पुनर्खरीद बाज़ार सबसे गहरा है।`,
    });
  } else if (dominantK) {
    local = pick(locale, {
      en: `The dominant retail karat in ${countryName} is ${dominantK}K, so ${k}K is usually a deliberate choice here — bought for what it does better, not because it is what the shop happened to have.`,
      ar: `العيار السائد في تجارة التجزئة بـ${countryName} هو عيار ${dominantK}، لذا يكون عيار ${k} هنا اختيارًا مقصودًا عادة — يُشترى لما يجيده أكثر، لا لأنه ما توفّر في المحل.`,
      fr: `Le carat dominant au détail en ${countryName} est le ${dominantK} carats ; le ${k} carats y est donc généralement un choix délibéré — acheté pour ce qu'il fait mieux, non parce que c'est ce que la boutique avait.`,
      tr: `${countryName} ülkesinde perakendede egemen ayar ${dominantK} ayardır; dolayısıyla ${k} ayar burada genellikle bilinçli bir tercihtir — dükkânda o varmış diye değil, daha iyi yaptığı şey için alınır.`,
      ur: `${countryName} میں خوردہ سطح پر غالب عیار ${dominantK} قیراط ہے، اس لیے ${k} قیراط یہاں عموماً سوچا سمجھا انتخاب ہوتا ہے — اس خوبی کے لیے خریدا جاتا ہے جو یہ بہتر نبھاتا ہے، اس لیے نہیں کہ دکان میں یہی تھا۔`,
      hi: `${countryName} में खुदरा स्तर पर प्रमुख कैरेट ${dominantK} कैरेट है, इसलिए ${k} कैरेट यहां आमतौर पर सोचा-समझा चुनाव होता है — उस गुण के लिए खरीदा जाता है जो यह बेहतर निभाता है, इसलिए नहीं कि दुकान में यही था।`,
    });
  }

  return {
    heading,
    spec,
    local,
    paragraphs: guide.body.map((p) => pick(locale, p)),
  };
}
