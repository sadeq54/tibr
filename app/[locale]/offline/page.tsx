import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n-text";

/**
 * Offline shell. `public/sw.js` precaches `/offline` (and `/{locale}/offline`)
 * on install and serves it when a navigation fails without a network.
 *
 * Must stay cacheable: no `headers()`, no `new Date()`, no data fetching.
 * Links are plain anchors so they work even if the JS chunks never loaded.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: pick(locale, {
      en: "You're offline",
      ar: "أنت غير متصل بالإنترنت",
      fr: "Vous êtes hors ligne",
      tr: "Çevrimdışısınız",
      ur: "آپ آف لائن ہیں",
      hi: "आप ऑफ़लाइन हैं",
    }),
    robots: { index: false, follow: false },
  };
}

export default async function OfflinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const links = [
    {
      href: "/",
      label: pick(locale, {
        en: "Home",
        ar: "الرئيسية",
        fr: "Accueil",
        tr: "Ana sayfa",
        ur: "ہوم",
        hi: "होम",
      }),
    },
    {
      href: "/live-gold-price",
      label: pick(locale, {
        en: "Live gold price",
        ar: "سعر الذهب المباشر",
        fr: "Cours de l'or en direct",
        tr: "Canlı altın fiyatı",
        ur: "لائیو سونے کی قیمت",
        hi: "लाइव सोने का भाव",
      }),
    },
    {
      href: "/gold-calculator",
      label: pick(locale, {
        en: "Gold calculator",
        ar: "حاسبة الذهب",
        fr: "Calculateur d'or",
        tr: "Altın hesaplayıcı",
        ur: "سونے کا کیلکولیٹر",
        hi: "सोना कैलकुलेटर",
      }),
    },
  ];

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
        Gold Prices Arabia
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
        {pick(locale, {
          en: "You're offline",
          ar: "أنت غير متصل بالإنترنت",
          fr: "Vous êtes hors ligne",
          tr: "Çevrimdışısınız",
          ur: "آپ آف لائن ہیں",
          hi: "आप ऑफ़लाइन हैं",
        })}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
        {pick(locale, {
          en: "Live gold prices need a connection. Reconnect and this page will pick up where you left off — prices refresh every second once you're back online.",
          ar: "أسعار الذهب الحية تحتاج إلى اتصال بالإنترنت. أعد الاتصال وستعود الصفحة للعمل — تتحدث الأسعار كل ثانية فور عودة الاتصال.",
          fr: "Le cours de l'or en direct nécessite une connexion. Reconnectez-vous et la page reprendra — les prix se rafraîchissent chaque seconde dès le retour en ligne.",
          tr: "Canlı altın fiyatları için bağlantı gerekir. Yeniden bağlanın; fiyatlar çevrimiçi olur olmaz her saniye güncellenir.",
          ur: "لائیو سونے کی قیمتوں کے لیے انٹرنیٹ کنکشن ضروری ہے۔ دوبارہ جڑیں — آن لائن ہوتے ہی قیمتیں ہر سیکنڈ اپ ڈیٹ ہوں گی۔",
          hi: "लाइव सोने के भाव के लिए कनेक्शन ज़रूरी है। दोबारा जुड़ें — ऑनलाइन होते ही भाव हर सेकंड अपडेट होंगे।",
        })}
      </p>
      <nav
        aria-label="Offline"
        className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm"
      >
        {links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            className={
              i === 0
                ? "rounded-full bg-[var(--color-gold)] px-4 py-2 font-semibold text-[var(--color-bg)] transition-opacity hover:opacity-90"
                : "rounded-full border border-[var(--color-border)] px-4 py-2 font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            }
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
