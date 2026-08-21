import { setRequestLocale } from "next-intl/server";

import { Flag } from "@/components/Flag";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Link } from "@/i18n/navigation";
import { localeMeta } from "@/i18n/routing";
import { getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { countriesInRegion, countryName, REGIONS } from "@/lib/countries";
import { pick } from "@/lib/i18n-text";
import {
  buildAlternates,
  buildOpenGraph,
  canonicalPath,
  SITE_URL,
} from "@/lib/metadata";

/**
 * Country hub — the internal-linking entry point for all 46 country markets.
 * Replaces the footer's flat, boilerplate-discounted country list with a
 * region-grouped, in-content link graph that Google treats as a real crawl
 * path. Country links use `prefetch={false}` so scrolling the (long) page does
 * not trigger 46 route-payload prefetches on mobile.
 */

const TITLE = {
  en: "Gold Price by Country — Live Rates",
  ar: "أسعار الذهب حسب الدولة — أسعار حية",
  fr: "Prix de l'or par pays — Cours en direct",
  tr: "Ülkelere Göre Altın Fiyatı — Canlı Kurlar",
  ur: "ملک کے لحاظ سے سونے کی قیمت — لائیو ریٹ",
  hi: "देश के अनुसार सोने का भाव — लाइव रेट",
};

const INTRO = {
  en: "Live 24K, 22K, 21K, 18K and 14K gold prices in local currency for every country we cover, grouped by region. Pick a country for per-gram and per-ounce rates updated in real time.",
  ar: "أسعار الذهب الحية لعيارات 24 و22 و21 و18 و14 بالعملة المحلية لكل دولة نغطيها، مرتبة حسب المنطقة. اختر دولة لعرض الأسعار للجرام وللأونصة محدّثة لحظيًا.",
  fr: "Prix de l'or 24, 22, 21, 18 et 14 carats en direct, en monnaie locale, pour chaque pays couvert, classés par région. Choisissez un pays pour les cours au gramme et à l'once mis à jour en temps réel.",
  tr: "Kapsadığımız her ülke için yerel para biriminde canlı 24, 22, 21, 18 ve 14 ayar altın fiyatları, bölgelere göre gruplanmış. Gerçek zamanlı güncellenen gram ve ons fiyatları için bir ülke seçin.",
  ur: "ہر اس ملک کے لیے جسے ہم کور کرتے ہیں، مقامی کرنسی میں 24، 22، 21، 18 اور 14 قیراط سونے کی لائیو قیمتیں، خطے کے لحاظ سے ترتیب شدہ۔ ریئل ٹائم اپڈیٹ ہونے والے فی گرام اور فی اونس ریٹ کے لیے کوئی ملک چنیں۔",
  hi: "हमारे कवर किए हर देश के लिए स्थानीय मुद्रा में 24, 22, 21, 18 और 14 कैरेट सोने का लाइव भाव, क्षेत्र के अनुसार व्यवस्थित। रियल-टाइम अपडेट होने वाले प्रति ग्राम और प्रति औंस भाव के लिए कोई देश चुनें।",
};

const HOME = { en: "Home", ar: "الرئيسية", fr: "Accueil", tr: "Ana sayfa", ur: "ہوم", hi: "होम" };
const CRUMB = {
  en: "Gold Price by Country",
  ar: "أسعار الذهب حسب الدولة",
  fr: "Prix de l'or par pays",
  tr: "Ülkelere göre altın fiyatı",
  ur: "ملک کے لحاظ سے سونے کی قیمت",
  hi: "देश के अनुसार सोने का भाव",
};
const PER_GRAM_24K = {
  en: "24K · per gram",
  ar: "عيار 24 · للجرام",
  fr: "24 carats · le gramme",
  tr: "24 ayar · gram",
  ur: "24 قیراط · فی گرام",
  hi: "24 कैरेट · प्रति ग्राम",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: pick(locale, TITLE),
    description: pick(locale, INTRO),
    alternates: buildAlternates(locale, "/gold-price"),
    openGraph: buildOpenGraph(locale, "/gold-price"),
  };
}

export default async function GoldPriceHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const intl = localeMeta(locale).intl;

  const [spot, fx] = await Promise.all([getCachedSpot("XAU"), getCachedFxRates()]);
  const pageUrl = canonicalPath(locale, "/gold-price");

  return (
    <>
      <JsonLd
        siteUrl={SITE_URL}
        pageOnly
        pageType="CollectionPage"
        pageUrl={pageUrl}
        pageName={pick(locale, TITLE)}
        breadcrumb={[
          { name: pick(locale, HOME), url: canonicalPath(locale, "/") },
          { name: pick(locale, CRUMB), url: pageUrl },
        ]}
      />
      <PageShell
        locale={locale}
        namespace="GoldPriceHub"
        titleKey="h1"
        introKey="intro"
        showFaq
      >
        <div className="space-y-10">
          {REGIONS.map((region) => {
            const list = [...countriesInRegion(region.id)].sort((a, b) =>
              countryName(a, locale).localeCompare(countryName(b, locale), intl),
            );
            if (list.length === 0) return null;

            return (
              <section key={region.id} aria-labelledby={`region-${region.id}`}>
                <h2
                  id={`region-${region.id}`}
                  className="flex items-baseline gap-2 text-sm font-bold uppercase tracking-wider text-[var(--color-gold)]"
                >
                  {/* REGIONS carries en/ar only — other locales fall back to English. */}
                  {pick(locale, region)}
                  <span className="text-xs font-normal text-[var(--color-text-dim)]">
                    {list.length}
                  </span>
                </h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((c) => {
                    const rate = (fx[c.currency] as number | undefined) ?? 1;
                    const perGram = (spot?.price_gram_24k ?? 0) * rate;
                    return (
                      <li key={c.slug}>
                        <Link
                          href={`/${c.slug}/gold-price/21k`}
                          prefetch={false}
                          className="group flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3 transition hover:border-[var(--color-gold)]/40"
                        >
                          <Flag cc={c.cc} size={18} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-[var(--color-gold)]">
                              {countryName(c, locale)}
                            </span>
                            <span className="block text-xs text-[var(--color-text-muted)]">
                              {pick(locale, PER_GRAM_24K)}
                            </span>
                          </span>
                          <span className="flex-shrink-0 text-end font-mono text-sm text-[var(--color-text)]">
                            {perGram.toLocaleString(intl, {
                              maximumFractionDigits: 2,
                            })}
                            <span className="ms-1 text-[10px] text-[var(--color-text-dim)]">
                              {c.currency}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </PageShell>
    </>
  );
}
