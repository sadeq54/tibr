import { setRequestLocale } from "next-intl/server";

import { ChartEmbedGallery } from "@/components/ChartEmbedGallery";
import { PageShell } from "@/components/PageShell";
import { WidgetBuilder } from "@/components/WidgetBuilder";
import { pick } from "@/lib/i18n-text";
import { SITE_URL, buildAlternates, buildOpenGraph } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: pick(locale, {
      en: "Free Gold Price Widgets & Chart Embeds for Websites",
      ar: "ودجات ومخططات أسعار الذهب المجانية لمواقع الويب",
      fr: "Widgets et graphiques du cours de l'or gratuits pour sites web",
      tr: "Web siteleri için ücretsiz altın fiyatı widget'ları ve grafikleri",
      ur: "ویب سائٹس کے لیے مفت سونے کی قیمت کے وجیٹس اور چارٹس",
      hi: "वेबसाइटों के लिए मुफ़्त सोने के भाव विजेट और चार्ट",
    }),
    description: pick(locale, {
      en: "Embed a live gold price ticker or a branded chart image (PNG) on your site for free — 46 countries, 40+ currencies, Arabic and English. Plus a free JSON spot endpoint for developers.",
      ar: "أدرج شريط أسعار الذهب الحي أو صورة مخطط (PNG) في موقعك مجانًا — 46 دولة و40+ عملة بالعربية والإنجليزية، مع واجهة JSON مجانية للمطورين.",
      fr: "Intégrez gratuitement un ticker du cours de l'or en direct ou une image de graphique (PNG) sur votre site — 46 pays, 40+ devises, arabe et anglais. Plus un point d'accès JSON gratuit pour les développeurs.",
      tr: "Sitenize ücretsiz canlı altın fiyatı şeridi veya markalı grafik görseli (PNG) ekleyin — 46 ülke, 40+ para birimi, Arapça ve İngilizce. Geliştiriciler için ücretsiz JSON uç noktası da var.",
      ur: "اپنی سائٹ پر مفت لائیو سونے کی قیمت کا ٹکر یا چارٹ امیج (PNG) لگائیں — 46 ممالک، 40+ کرنسیاں، عربی اور انگریزی۔ ڈویلپرز کے لیے مفت JSON اینڈ پوائنٹ بھی۔",
      hi: "अपनी साइट पर मुफ़्त लाइव सोने के भाव का टिकर या चार्ट इमेज (PNG) लगाएँ — 46 देश, 40+ मुद्राएँ, अरबी और अंग्रेज़ी। डेवलपर्स के लिए मुफ़्त JSON एंडपॉइंट भी।",
    }),
    alternates: buildAlternates(locale, "/widgets"),
    openGraph: buildOpenGraph(locale, "/widgets"),
  };
}

/** "Free data for developers" — the two public endpoints + the one rule. */
function DeveloperData({ locale }: { locale: string }) {
  const rows = [
    {
      url: `${SITE_URL}/api/spot?symbol=XAU`,
      what: pick(locale, {
        en: "JSON — live spot price plus 24K/22K/21K/18K/14K gram prices in USD. Cached 60 s.",
        ar: "JSON — سعر الذهب الفوري مع أسعار الجرام لعيارات 24 و22 و21 و18 و14 بالدولار. يُحدَّث كل 60 ثانية.",
        fr: "JSON — cours spot en direct et prix du gramme 24K/22K/21K/18K/14K en USD. Cache 60 s.",
        tr: "JSON — canlı spot fiyat ve USD cinsinden 24K/22K/21K/18K/14K gram fiyatları. 60 sn önbellek.",
        ur: "JSON — لائیو اسپاٹ قیمت اور USD میں 24K/22K/21K/18K/14K فی گرام قیمتیں۔ 60 سیکنڈ کیش۔",
        hi: "JSON — लाइव स्पॉट भाव और USD में 24K/22K/21K/18K/14K प्रति ग्राम भाव। 60 से. कैश।",
      }),
    },
    {
      url: `${SITE_URL}/charts/gold/{currency}/{range}?lang=ar|en&unit=oz|g`,
      what: pick(locale, {
        en: "PNG 1200×630 — branded price chart. {currency} = ISO code (sar, aed, egp…), {range} = 1m, 3m, 1y, 5y, 10y or max.",
        ar: "PNG بمقاس 1200×630 — مخطط سعر بعلامة الموقع. {currency} = رمز ISO (sar، aed، egp…)، {range} = 1m أو 3m أو 1y أو 5y أو 10y أو max.",
        fr: "PNG 1200×630 — graphique de cours brandé. {currency} = code ISO (sar, aed, egp…), {range} = 1m, 3m, 1y, 5y, 10y ou max.",
        tr: "PNG 1200×630 — markalı fiyat grafiği. {currency} = ISO kodu (sar, aed, egp…), {range} = 1m, 3m, 1y, 5y, 10y veya max.",
        ur: "PNG 1200×630 — برانڈڈ قیمت چارٹ۔ {currency} = ISO کوڈ (sar، aed، egp…)، {range} = 1m، 3m، 1y، 5y، 10y یا max۔",
        hi: "PNG 1200×630 — ब्रांडेड भाव चार्ट। {currency} = ISO कोड (sar, aed, egp…), {range} = 1m, 3m, 1y, 5y, 10y या max।",
      }),
    },
  ];

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">
        {pick(locale, {
          en: "Free data for developers",
          ar: "بيانات مجانية للمطورين",
          fr: "Données gratuites pour les développeurs",
          tr: "Geliştiriciler için ücretsiz veri",
          ur: "ڈویلپرز کے لیے مفت ڈیٹا",
          hi: "डेवलपर्स के लिए मुफ़्त डेटा",
        })}
      </h2>
      <ul className="mt-4 space-y-4">
        {rows.map((r) => (
          <li key={r.url}>
            <code
              dir="ltr"
              className="block overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] px-3 py-2 font-mono text-[12px] text-[var(--color-text)]"
            >
              GET {r.url}
            </code>
            <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{r.what}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-[var(--color-text-muted)]">
        {pick(locale, {
          en: "One requirement: a visible link back to goldpricesarabia.com next to the data or chart. No key, no quota for fair use.",
          ar: "شرط واحد: رابط ظاهر إلى goldpricesarabia.com بجانب البيانات أو المخطط. بلا مفتاح، وبلا حد للاستخدام المعقول.",
          fr: "Une seule condition : un lien visible vers goldpricesarabia.com à côté des données ou du graphique. Sans clé, sans quota pour un usage raisonnable.",
          tr: "Tek şart: verinin veya grafiğin yanında goldpricesarabia.com'a görünür bir bağlantı. Anahtar yok, makul kullanım için kota yok.",
          ur: "ایک شرط: ڈیٹا یا چارٹ کے ساتھ goldpricesarabia.com کا نظر آنے والا لنک۔ نہ کوئی کلید، نہ مناسب استعمال پر کوئی حد۔",
          hi: "एक शर्त: डेटा या चार्ट के पास goldpricesarabia.com का दिखाई देने वाला लिंक। न कोई key, न उचित उपयोग पर कोई सीमा।",
        })}
      </p>
    </section>
  );
}

export default async function WidgetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey="widgetsH1"
      introKey="widgetsIntro"
      showFaq={false}
    >
      <WidgetBuilder locale={locale} />
      <ChartEmbedGallery locale={locale} />
      <DeveloperData locale={locale} />
    </PageShell>
  );
}
