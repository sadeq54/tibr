import { countryName, COUNTRY_BY_SLUG } from "@/lib/countries";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { SOCIAL_PROFILES } from "@/lib/social";

/**
 * "Follow for your country's price every morning."
 *
 * The site already links Instagram from the footer, but that is a bare word at
 * the bottom of the page with no reason attached — a reader who came from
 * Google for "سعر الذهب اليوم في سوريا" has no idea an account exists that
 * posts exactly that, daily. This says so, at the point they have just got
 * their answer and are deciding whether to leave.
 *
 * Placed after the price content and before the FAQ: early enough to be seen,
 * late enough that it never competes with the number the visitor came for.
 *
 * Deliberately plain markup — no client JS, no image. It costs nothing to a
 * page whose Core Web Vitals we spent the day repairing.
 */
const HEADLINE: LocaleText = {
  en: "Today's price, every morning",
  ar: "سعر اليوم، كل صباح",
  fr: "Le prix du jour, chaque matin",
  tr: "Günün fiyatı, her sabah",
  ur: "آج کی قیمت، ہر صبح",
  hi: "आज का भाव, हर सुबह",
};

const BODY: LocaleText = {
  en: "We post the gram price for {country} on Instagram every day — 24K, 22K, 21K and 18K, with the daily move.",
  ar: "ننشر سعر الجرام في {country} على إنستغرام كل يوم — عيار 24 و22 و21 و18، مع التغير اليومي.",
  fr: "Nous publions chaque jour le prix au gramme pour {country} sur Instagram — 24, 22, 21 et 18 carats, avec la variation du jour.",
  tr: "{country} için gram fiyatını her gün Instagram'da paylaşıyoruz — 24, 22, 21 ve 18 ayar, günlük değişimle.",
  ur: "ہم {country} کے لیے گرام کی قیمت روزانہ انسٹاگرام پر شائع کرتے ہیں — 24، 22، 21 اور 18 قیراط، روزانہ تبدیلی کے ساتھ۔",
  hi: "हम {country} के लिए ग्राम भाव रोज़ Instagram पर डालते हैं — 24, 22, 21 और 18 कैरेट, दैनिक बदलाव के साथ।",
};

/** Without a country in scope — the hubs and the homepage. */
const BODY_GLOBAL: LocaleText = {
  en: "We post gram prices across the Arab world on Instagram every day — 24K, 22K, 21K and 18K, with the daily move.",
  ar: "ننشر أسعار الجرام في الوطن العربي على إنستغرام كل يوم — عيار 24 و22 و21 و18، مع التغير اليومي.",
  fr: "Nous publions chaque jour les prix au gramme du monde arabe sur Instagram — 24, 22, 21 et 18 carats.",
  tr: "Arap dünyasındaki gram fiyatlarını her gün Instagram'da paylaşıyoruz — 24, 22, 21 ve 18 ayar.",
  ur: "ہم عرب دنیا میں گرام کی قیمتیں روزانہ انسٹاگرام پر شائع کرتے ہیں — 24، 22، 21 اور 18 قیراط۔",
  hi: "हम अरब जगत के ग्राम भाव रोज़ Instagram पर डालते हैं — 24, 22, 21 और 18 कैरेट।",
};

const CTA: LocaleText = {
  en: "Follow on Instagram",
  ar: "تابعنا على إنستغرام",
  fr: "Suivre sur Instagram",
  tr: "Instagram'da takip et",
  ur: "انسٹاگرام پر فالو کریں",
  hi: "Instagram पर फ़ॉलो करें",
};

export function FollowCta({
  locale,
  countrySlug,
}: {
  locale: string;
  countrySlug?: string;
}) {
  const profile = SOCIAL_PROFILES[0];
  if (!profile) return null;

  const country = countrySlug ? COUNTRY_BY_SLUG[countrySlug] : undefined;
  const body = country
    ? pick(locale, BODY).replace("{country}", countryName(country, locale))
    : pick(locale, BODY_GLOBAL);

  return (
    <section
      aria-labelledby="follow-cta"
      className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7"
    >
      <h2
        id="follow-cta"
        className="text-lg font-bold text-[var(--color-gold)] sm:text-xl"
      >
        {pick(locale, HEADLINE)}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
        {body}
      </p>
      <a
        href={profile.url}
        target="_blank"
        rel="me noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] transition-opacity hover:opacity-90"
      >
        {pick(locale, CTA)}
        <span aria-hidden="true">@{profile.handle}</span>
      </a>
    </section>
  );
}
