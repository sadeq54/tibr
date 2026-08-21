import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { Breadcrumb } from "@/components/Breadcrumb";
import { ChartImage } from "@/components/ChartImage";
import { Header } from "@/components/Header";
import { Link } from "@/i18n/navigation";
import { getCachedAllHistory } from "@/lib/cached-fetchers";
import type { HistoricalPoint } from "@/lib/history";
import { pick } from "@/lib/i18n-text";
import { buildPageMetadata, canonicalPath, SITE_URL } from "@/lib/metadata";
import { fmtNum } from "@/lib/seo";

const FIRST_YEAR = 2000;
const CURRENT_YEAR = 2026;

/** Every fixed string on the page, resolved once per locale. */
function hubText(locale: string) {
  const F = FIRST_YEAR;
  const C = CURRENT_YEAR;
  return {
    title: pick(locale, {
      en: `Gold Price History ${F}-${C}: Yearly Table, Highs and Lows`,
      ar: `تاريخ أسعار الذهب من ${F} إلى ${C}: جدول سنوي وأعلى وأدنى سعر`,
      fr: `Historique du prix de l'or ${F}-${C} : tableau annuel, plus hauts et plus bas`,
      tr: `Altın fiyatı geçmişi ${F}-${C}: yıllık tablo, en yüksek ve en düşük`,
      ur: `سونے کی قیمت کی تاریخ ${F}-${C}: سالانہ جدول، بلند ترین اور کم ترین`,
      hi: `सोने के भाव का इतिहास ${F}-${C}: वार्षिक तालिका, उच्चतम और न्यूनतम`,
    }),
    description: pick(locale, {
      en: `Gold price for every year since ${F}: open, close, high, low and yearly change per ounce in USD, a chart since 2000, and a detailed page for each year.`,
      ar: `سعر الذهب لكل سنة منذ ${F}: الافتتاح والإغلاق والأعلى والأدنى ونسبة التغير السنوية للأونصة بالدولار، مع رسم بياني منذ 2000 وصفحة مفصلة لكل عام.`,
      fr: `Prix de l'or pour chaque année depuis ${F} : ouverture, clôture, plus haut, plus bas et variation annuelle par once en USD, un graphique depuis 2000 et une page détaillée par année.`,
      tr: `${F} yılından bu yana her yıl için altın fiyatı: ons başına USD cinsinden açılış, kapanış, en yüksek, en düşük ve yıllık değişim, 2000'den beri grafik ve her yıl için ayrıntılı sayfa.`,
      ur: `${F} سے ہر سال کی سونے کی قیمت: فی اونس USD میں افتتاح، اختتام، بلند ترین، کم ترین اور سالانہ تبدیلی، 2000 سے چارٹ اور ہر سال کا تفصیلی صفحہ۔`,
      hi: `${F} से हर साल का सोने का भाव: प्रति औंस USD में ओपन, क्लोज़, उच्च, निम्न और वार्षिक बदलाव, 2000 से चार्ट और हर साल का विस्तृत पेज।`,
    }),
    unavailable: pick(locale, {
      en: "Historical data is temporarily unavailable. Please try again shortly.",
      ar: "تعذّر تحميل البيانات التاريخية مؤقتًا. حاول مرة أخرى بعد قليل.",
      fr: "Les données historiques sont momentanément indisponibles. Réessayez dans un instant.",
      tr: "Geçmiş veriler geçici olarak kullanılamıyor. Lütfen kısa süre sonra tekrar deneyin.",
      ur: "تاریخی ڈیٹا عارضی طور پر دستیاب نہیں۔ براہ کرم تھوڑی دیر بعد دوبارہ کوشش کریں۔",
      hi: "ऐतिहासिक डेटा अस्थायी रूप से उपलब्ध नहीं है। कृपया थोड़ी देर बाद फिर कोशिश करें।",
    }),
    datasetName: pick(locale, {
      en: "Yearly gold prices since 2000",
      ar: "أسعار الذهب السنوية منذ 2000",
      fr: "Prix annuels de l'or depuis 2000",
      tr: "2000'den beri yıllık altın fiyatları",
      ur: "2000 سے سالانہ سونے کی قیمتیں",
      hi: "2000 से वार्षिक सोने के भाव",
    }),
    datasetDescription: pick(locale, {
      en: "Yearly open, close, high and low of the gold ounce price in USD since 2000, derived from daily COMEX futures closes.",
      ar: "الافتتاح والإغلاق والأعلى والأدنى السنوي لسعر أونصة الذهب بالدولار منذ عام 2000، مشتقة من إغلاقات عقود COMEX اليومية.",
      fr: "Ouverture, clôture, plus haut et plus bas annuels du prix de l'once d'or en USD depuis 2000, dérivés des clôtures quotidiennes des contrats à terme COMEX.",
      tr: "2000'den bu yana altın ons fiyatının USD cinsinden yıllık açılış, kapanış, en yüksek ve en düşük değerleri; günlük COMEX vadeli işlem kapanışlarından türetilmiştir.",
      ur: "2000 سے USD میں سونے کے اونس کی سالانہ افتتاحی، اختتامی، بلند ترین اور کم ترین قیمتیں، روزانہ COMEX فیوچرز کلوزنگ سے ماخوذ۔",
      hi: "2000 से USD में सोने के औंस भाव का वार्षिक ओपन, क्लोज़, उच्च और निम्न, दैनिक COMEX फ़्यूचर्स क्लोज़ से निकाला गया।",
    }),
    allTimeHigh: (year: number, price: string, years: number) =>
      pick(locale, {
        en: `The highest yearly price in this series was set in ${year} at $${price} per ounce. The table covers ${years} years of daily COMEX futures closes (GC=F); every year has its own month-by-month page.`,
        ar: `أعلى سعر سنوي على الإطلاق في هذه السلسلة سُجّل عام ${year} عند ${price} دولار للأونصة. الجدول يعرض ${years} سنة من بيانات الإغلاق اليومي لعقود COMEX الآجلة (GC=F)، وكل سنة لها صفحة مفصلة بالشهور.`,
        fr: `Le plus haut annuel de cette série a été atteint en ${year} à ${price} $ l'once. Le tableau couvre ${years} années de clôtures quotidiennes des contrats à terme COMEX (GC=F) ; chaque année dispose de sa propre page mois par mois.`,
        tr: `Bu serideki en yüksek yıllık fiyat ${year} yılında ons başına ${price} $ ile görüldü. Tablo, ${years} yıllık günlük COMEX vadeli işlem kapanışını (GC=F) kapsar; her yılın kendi ay ay sayfası vardır.`,
        ur: `اس سلسلے میں سب سے بلند سالانہ قیمت ${year} میں ${price} ڈالر فی اونس رہی۔ جدول COMEX فیوچرز (GC=F) کی ${years} سال کی روزانہ کلوزنگ پر مشتمل ہے؛ ہر سال کا اپنا ماہ بہ ماہ صفحہ ہے۔`,
        hi: `इस श्रृंखला में सबसे ऊँचा वार्षिक भाव ${year} में ${price} डॉलर प्रति औंस रहा। तालिका में COMEX फ़्यूचर्स (GC=F) के ${years} साल के दैनिक क्लोज़ शामिल हैं; हर साल का अपना माह-दर-माह पेज है।`,
      }),
    caption: pick(locale, {
      en: "Yearly gold prices in USD per ounce",
      ar: "أسعار الذهب السنوية بالدولار للأونصة",
      fr: "Prix annuels de l'or en USD par once",
      tr: "Ons başına USD cinsinden yıllık altın fiyatları",
      ur: "فی اونس USD میں سالانہ سونے کی قیمتیں",
      hi: "प्रति औंस USD में वार्षिक सोने के भाव",
    }),
    th: {
      year: pick(locale, { en: "Year", ar: "السنة", fr: "Année", tr: "Yıl", ur: "سال", hi: "वर्ष" }),
      open: pick(locale, { en: "Open", ar: "الافتتاح", fr: "Ouverture", tr: "Açılış", ur: "افتتاح", hi: "ओपन" }),
      close: pick(locale, { en: "Close", ar: "الإغلاق", fr: "Clôture", tr: "Kapanış", ur: "اختتام", hi: "क्लोज़" }),
      high: pick(locale, { en: "High", ar: "الأعلى", fr: "Plus haut", tr: "En yüksek", ur: "بلند ترین", hi: "उच्च" }),
      low: pick(locale, { en: "Low", ar: "الأدنى", fr: "Plus bas", tr: "En düşük", ur: "کم ترین", hi: "निम्न" }),
      change: pick(locale, { en: "Change", ar: "التغير", fr: "Variation", tr: "Değişim", ur: "تبدیلی", hi: "बदलाव" }),
    },
    home: pick(locale, { en: "Home", ar: "الرئيسية", fr: "Accueil", tr: "Ana Sayfa", ur: "ہوم", hi: "होम" }),
    crumb: pick(locale, {
      en: "Gold price history",
      ar: "تاريخ أسعار الذهب",
      fr: "Historique du prix de l'or",
      tr: "Altın fiyatı geçmişi",
      ur: "سونے کی قیمت کی تاریخ",
      hi: "सोने के भाव का इतिहास",
    }),
    h1: pick(locale, {
      en: `Gold price history, ${F} to ${C}`,
      ar: `تاريخ أسعار الذهب من ${F} إلى ${C}`,
      fr: `Historique du prix de l'or, de ${F} à ${C}`,
      tr: `Altın fiyatı geçmişi, ${F}-${C}`,
      ur: `سونے کی قیمت کی تاریخ، ${F} سے ${C} تک`,
      hi: `सोने के भाव का इतिहास, ${F} से ${C} तक`,
    }),
    intro: pick(locale, {
      en: "More than a quarter century of gold ounce prices in USD: a full chart since 2000, a yearly table of open, close, high and low, and a month-by-month page for every year. Data is from daily COMEX closes; the chart is free to embed with attribution.",
      ar: "أكثر من ربع قرن من أسعار أونصة الذهب بالدولار: رسم بياني كامل منذ عام 2000، وجدول سنوي بالافتتاح والإغلاق والأعلى والأدنى، وصفحة مفصلة بالشهور لكل سنة. البيانات من إغلاقات COMEX اليومية ويمكن تضمين الرسم البياني مجانًا مع ذكر المصدر.",
      fr: "Plus d'un quart de siècle de prix de l'once d'or en USD : un graphique complet depuis 2000, un tableau annuel avec ouverture, clôture, plus haut et plus bas, et une page mois par mois pour chaque année. Les données proviennent des clôtures quotidiennes du COMEX ; le graphique peut être intégré gratuitement avec attribution.",
      tr: "Çeyrek asrı aşkın süredir USD cinsinden altın ons fiyatları: 2000'den beri tam grafik, açılış, kapanış, en yüksek ve en düşük değerleriyle yıllık tablo ve her yıl için ay ay sayfa. Veriler günlük COMEX kapanışlarından alınır; grafik kaynak belirtilerek ücretsiz gömülebilir.",
      ur: "USD میں سونے کے اونس کی ربع صدی سے زائد قیمتیں: 2000 سے مکمل چارٹ، افتتاح، اختتام، بلند ترین اور کم ترین کا سالانہ جدول، اور ہر سال کا ماہ بہ ماہ صفحہ۔ ڈیٹا روزانہ COMEX کلوزنگ سے ہے؛ چارٹ حوالہ دے کر مفت ایمبیڈ کیا جا سکتا ہے۔",
      hi: "USD में सोने के औंस भाव की एक चौथाई सदी से ज़्यादा: 2000 से पूरा चार्ट, ओपन, क्लोज़, उच्च और निम्न की वार्षिक तालिका, और हर साल का माह-दर-माह पेज। डेटा दैनिक COMEX क्लोज़ से है; चार्ट श्रेय देकर मुफ़्त एम्बेड किया जा सकता है।",
    }),
    loading: pick(locale, { en: "Loading", ar: "جارٍ التحميل", fr: "Chargement", tr: "Yükleniyor", ur: "لوڈ ہو رہا ہے", hi: "लोड हो रहा है" }),
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = hubText(locale);
  return buildPageMetadata({
    locale,
    path: "/historical-gold-prices",
    title: t.title,
    description: t.description,
  });
}

type YearRow = {
  year: number;
  open: number;
  close: number;
  high: number;
  low: number;
  changePct: number;
  days: number;
};

function yearlyRows(points: HistoricalPoint[]): YearRow[] {
  const byYear = new Map<number, HistoricalPoint[]>();
  for (const p of points) {
    if (!Number.isFinite(p.close) || p.close <= 0) continue;
    const y = Number(p.date.slice(0, 4));
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  }
  return [...byYear.entries()]
    .filter(([y, pts]) => y >= FIRST_YEAR && pts.length > 5)
    .map(([year, pts]) => {
      const open = pts[0].open > 0 ? pts[0].open : pts[0].close;
      const close = pts[pts.length - 1].close;
      return {
        year,
        open,
        close,
        high: Math.max(...pts.map((p) => p.high || p.close)),
        low: Math.min(...pts.map((p) => p.low || p.close)),
        changePct: ((close - open) / open) * 100,
        days: pts.length,
      };
    })
    .sort((a, b) => b.year - a.year);
}

async function YearTable({ locale }: { locale: string }) {
  const t = hubText(locale);
  const hist = await getCachedAllHistory("max");
  const rows = yearlyRows(hist.XAU);
  if (rows.length === 0) {
    return (
      <p className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 text-sm text-[var(--color-text-muted)]">
        {t.unavailable}
      </p>
    );
  }
  const allTimeHigh = rows.reduce((m, r) => (r.high > m.high ? r : m), rows[0]);
  const th = "px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]";
  const td = "num px-3 py-2.5 text-end font-mono text-sm";

  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE_URL}${canonicalPath(locale, "/historical-gold-prices")}#dataset`,
    name: t.datasetName,
    description: t.datasetDescription,
    inLanguage: locale,
    url: `${SITE_URL}${canonicalPath(locale, "/historical-gold-prices")}`,
    creator: { "@id": `${SITE_URL}/#org` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    temporalCoverage: `${rows[rows.length - 1].year}/${rows[0].year}`,
    variableMeasured: ["open", "close", "high", "low", "yearly change"],
    distribution: rows.slice(0, 6).map((r) => ({
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: `${SITE_URL}/api/spot?symbol=XAU&year=${r.year}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dataset).replace(/</g, "\\u003c") }}
      />
      <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-[var(--color-text-muted)]">
        {t.allTimeHigh(allTimeHigh.year, fmtNum(allTimeHigh.high, 0), rows.length)}
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <table className="w-full min-w-[620px] border-collapse">
          <caption className="sr-only">{t.caption}</caption>
          <thead className="border-b border-[var(--color-border)]">
            <tr>
              <th scope="col" className={`${th} text-start`}>{t.th.year}</th>
              <th scope="col" className={`${th} text-end`}>{t.th.open}</th>
              <th scope="col" className={`${th} text-end`}>{t.th.close}</th>
              <th scope="col" className={`${th} text-end`}>{t.th.high}</th>
              <th scope="col" className={`${th} text-end`}>{t.th.low}</th>
              <th scope="col" className={`${th} text-end`}>{t.th.change}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {rows.map((r) => {
              const up = r.changePct >= 0;
              return (
                <tr key={r.year}>
                  <th scope="row" className="px-3 py-2.5 text-start text-sm font-semibold">
                    <Link
                      href={`/historical-gold-prices/${r.year}` as never}
                      className="text-[var(--color-gold)] hover:underline"
                    >
                      {r.year}
                    </Link>
                  </th>
                  <td dir="ltr" className={`${td} text-[var(--color-text-muted)]`}>{fmtNum(r.open, 0)}</td>
                  <td dir="ltr" className={`${td} font-bold text-[var(--color-text)]`}>{fmtNum(r.close, 0)}</td>
                  <td dir="ltr" className={`${td} text-[var(--color-up)]`}>{fmtNum(r.high, 0)}</td>
                  <td dir="ltr" className={`${td} text-[var(--color-down)]`}>{fmtNum(r.low, 0)}</td>
                  <td dir="ltr" className={`${td} font-semibold`} style={{ color: up ? "var(--color-up)" : "var(--color-down)" }}>
                    {up ? "+" : ""}
                    {r.changePct.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = hubText(locale);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Breadcrumb
          locale={locale}
          items={[
            { name: t.home, href: "/" },
            { name: t.crumb, href: "/historical-gold-prices" },
          ]}
        />
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)] sm:text-4xl">
            {t.h1}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {t.intro}
          </p>
        </header>

        <div className="mt-8">
          <ChartImage currency="USD" locale={locale} pagePath="/historical-gold-prices" range="max" />
        </div>

        <Suspense
          fallback={<div className="skeleton mt-8 h-96 w-full" role="status" aria-busy="true" aria-label={t.loading} />}
        >
          <YearTable locale={locale} />
        </Suspense>
      </main>
    </>
  );
}
