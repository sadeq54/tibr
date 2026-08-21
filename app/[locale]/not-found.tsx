import { getLocale, getTranslations } from "next-intl/server";

import { Header } from "@/components/Header";
import { Link } from "@/i18n/navigation";
import { pick, type LocaleText } from "@/lib/i18n-text";

const QUICK_LINKS: Array<{ href: string; label: LocaleText; note: LocaleText }> = [
  {
    href: "/gold-price/24k",
    label: { en: "24K Gold Price", ar: "سعر الذهب 24K", fr: "Cours de l'or 24 carats", tr: "24 ayar altın fiyatı", ur: "24 قیراط سونے کی قیمت", hi: "24 कैरेट सोने का भाव" },
    note: { en: "Highest purity — investment grade", ar: "أعلى نقاء — استثمار", fr: "Pureté maximale — qualité investissement", tr: "En yüksek saflık — yatırımlık", ur: "سب سے زیادہ خالص — سرمایہ کاری کے لیے", hi: "सर्वोच्च शुद्धता — निवेश ग्रेड" },
  },
  {
    href: "/gold-price/21k",
    label: { en: "21K Gold Price", ar: "سعر الذهب 21K", fr: "Cours de l'or 21 carats", tr: "21 ayar altın fiyatı", ur: "21 قیراط سونے کی قیمت", hi: "21 कैरेट सोने का भाव" },
    note: { en: "Most-traded in Gulf markets", ar: "الأكثر تداولاً في الخليج", fr: "Le plus échangé dans le Golfe", tr: "Körfez piyasalarında en çok işlem gören", ur: "خلیجی منڈیوں میں سب سے زیادہ رائج", hi: "खाड़ी बाज़ारों में सबसे अधिक प्रचलित" },
  },
  {
    href: "/gold-price/18k",
    label: { en: "18K Gold Price", ar: "سعر الذهب 18K", fr: "Cours de l'or 18 carats", tr: "18 ayar altın fiyatı", ur: "18 قیراط سونے کی قیمت", hi: "18 कैरेट सोने का भाव" },
    note: { en: "Daily-wear jewellery", ar: "مجوهرات يومية", fr: "Bijoux du quotidien", tr: "Günlük takı", ur: "روزمرہ کے زیورات", hi: "रोज़ पहनने के आभूषण" },
  },
  {
    href: "/spot-gold",
    label: { en: "Spot Gold", ar: "السعر الفوري", fr: "Or spot", tr: "Spot altın", ur: "اسپاٹ گولڈ", hi: "स्पॉट गोल्ड" },
    note: { en: "Live XAU/USD", ar: "XAU/USD لحظي", fr: "XAU/USD en direct", tr: "Canlı XAU/USD", ur: "لائیو XAU/USD", hi: "लाइव XAU/USD" },
  },
  {
    href: "/saudi-arabia/gold-price/21k",
    label: { en: "Saudi Arabia Prices", ar: "أسعار السعودية", fr: "Prix en Arabie saoudite", tr: "Suudi Arabistan fiyatları", ur: "سعودی عرب کی قیمتیں", hi: "सऊदी अरब के भाव" },
    note: { en: "In Saudi Riyal", ar: "بالريال السعودي", fr: "En riyal saoudien", tr: "Suudi riyali cinsinden", ur: "سعودی ریال میں", hi: "सऊदी रियाल में" },
  },
  {
    href: "/uae/gold-price/21k",
    label: { en: "UAE Prices", ar: "أسعار الإمارات", fr: "Prix aux Émirats", tr: "BAE fiyatları", ur: "امارات کی قیمتیں", hi: "UAE के भाव" },
    note: { en: "In UAE Dirham", ar: "بالدرهم الإماراتي", fr: "En dirham des Émirats", tr: "BAE dirhemi cinsinden", ur: "اماراتی درہم میں", hi: "UAE दिरहम में" },
  },
];

const EXPLORE_LINKS: Array<{ href: string; label: LocaleText }> = [
  { href: "/gold-price-chart", label: { en: "Price chart", ar: "الرسم البياني", fr: "Graphique", tr: "Fiyat grafiği", ur: "قیمت کا چارٹ", hi: "भाव चार्ट" } },
  { href: "/gold-calculator", label: { en: "Calculator", ar: "حاسبة الذهب", fr: "Calculateur", tr: "Hesaplayıcı", ur: "کیلکولیٹر", hi: "कैलकुलेटर" } },
  { href: "/precious-metals", label: { en: "Precious metals", ar: "المعادن النفيسة", fr: "Métaux précieux", tr: "Değerli metaller", ur: "قیمتی دھاتیں", hi: "कीमती धातुएं" } },
  { href: "/news", label: { en: "News", ar: "الأخبار", fr: "Actualités", tr: "Haberler", ur: "خبریں", hi: "समाचार" } },
  { href: "/about/sadeq", label: { en: "Founder", ar: "المؤسس", fr: "Fondateur", tr: "Kurucu", ur: "بانی", hi: "संस्थापक" } },
  { href: "/methodology", label: { en: "Methodology", ar: "المنهجية", fr: "Méthodologie", tr: "Metodoloji", ur: "طریقۂ کار", hi: "कार्यप्रणाली" } },
];

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("NotFound");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <section className="text-center">
          <div className="text-7xl font-extrabold text-[var(--color-gold)] sm:text-8xl">404</div>
          <h1 className="mt-4 text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
            {t("h1")}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {t("body")}
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-md bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
          >
            ← {t("home")}
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            {t("popularH2")}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href as never}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 transition hover:border-[var(--color-gold)]/40"
              >
                <div className="text-sm font-semibold text-[var(--color-gold)]">{pick(locale, l.label)}</div>
                <div className="mt-1 text-xs text-[var(--color-text-muted)]">{pick(locale, l.note)}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 border-t border-[var(--color-border)] pt-6">
          <h2 className="text-base font-semibold text-[var(--color-text)]">
            {t("exploreH2")}
          </h2>
          <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {EXPLORE_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href as never}
                className="text-[var(--color-gold)] underline hover:no-underline"
              >
                {pick(locale, l.label)}
              </Link>
            ))}
          </nav>
        </section>
      </main>
    </>
  );
}
