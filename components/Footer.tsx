import { Globe } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Flag } from "@/components/Flag";
import { InstallAppButton } from "@/components/InstallAppButton";
import { Link } from "@/i18n/navigation";
import { countryName, sortedCountries } from "@/lib/countries";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { SOCIAL_PROFILES } from "@/lib/social";

// Hardcoded copyright year — using `new Date().getFullYear()` would require
// either `connection()` (which forces the layout dynamic and poisons PPR
// site-wide) or a `"use cache"` scope (which can't reach getLocale /
// getTranslations). Bump annually at year boundary.
const COPYRIGHT_YEAR = 2026;

type LinkItem = { label: string; href: string; external?: boolean };

const BY_COUNTRY: LocaleText = {
  en: "Gold price by country →",
  ar: "أسعار الذهب حسب الدولة ←",
  fr: "Cours de l'or par pays →",
  tr: "Ülkeye göre altın fiyatı →",
  ur: "ملک کے لحاظ سے سونے کی قیمت ←",
  hi: "देश के अनुसार सोने का भाव →",
};

const RESEARCH: LocaleText = {
  en: "Academic gold research",
  ar: "أبحاث الذهب الأكاديمية",
  fr: "Recherche académique sur l'or",
  tr: "Akademik altın araştırmaları",
  ur: "سونے پر علمی تحقیق",
  hi: "सोने पर अकादमिक शोध",
};

const EDITORIAL: Array<{ href: string; label: LocaleText }> = [
  { href: "/about", label: { en: "About", ar: "عن الموقع", fr: "À propos", tr: "Hakkında", ur: "ہمارے بارے میں", hi: "हमारे बारे में" } },
  { href: "/about/sadeq", label: { en: "Founder", ar: "المؤسس", fr: "Fondateur", tr: "Kurucu", ur: "بانی", hi: "संस्थापक" } },
  { href: "/about/disclaimer", label: { en: "Disclaimer", ar: "إخلاء المسؤولية", fr: "Avertissement", tr: "Sorumluluk reddi", ur: "دستبرداری", hi: "अस्वीकरण" } },
  { href: "/methodology", label: { en: "Methodology", ar: "المنهجية", fr: "Méthodologie", tr: "Metodoloji", ur: "طریقۂ کار", hi: "कार्यप्रणाली" } },
  { href: "/editorial-standards", label: { en: "Editorial standards", ar: "معايير التحرير", fr: "Charte éditoriale", tr: "Editoryal standartlar", ur: "ادارتی معیارات", hi: "संपादकीय मानक" } },
  { href: "/about/privacy", label: { en: "Privacy", ar: "الخصوصية", fr: "Confidentialité", tr: "Gizlilik", ur: "رازداری", hi: "गोपनीयता" } },
  { href: "/advertise", label: { en: "Advertise", ar: "أعلن معنا", fr: "Publicité", tr: "Reklam verin", ur: "اشتہار دیں", hi: "विज्ञापन दें" } },
];

function FooterColumn({ title, links }: { title: string; links: LinkItem[] }) {
  return (
    <div>
      <h3 className="mb-3 inline-block border-b border-[var(--color-gold)]/40 pb-1 text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {links.map((l) => (
          <li key={`${l.label}-${l.href}`}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-0.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold)] hover:underline"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="block py-0.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold)] hover:underline"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer() {
  const t = await getTranslations("Footer");
  const tPage = await getTranslations("Page");
  const locale = await getLocale();
  const year = COPYRIGHT_YEAR;

  const countries = sortedCountries(locale);

  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)]">
      <section className="border-b border-[var(--color-border)] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <header className="mb-6 flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
            <Globe className="h-5 w-5 text-[var(--color-gold)]" aria-hidden />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text)]">
              {t("worldHeading")}
            </h2>
            <Link
              href="/gold-price"
              className="ms-auto text-xs font-semibold text-[var(--color-gold)] transition-colors hover:underline"
            >
              {pick(locale, BY_COUNTRY)}
            </Link>
          </header>
          {/* Split countries into chunks of 50 to avoid the >60 children
              DOM-size penalty flagged by Lighthouse. */}
          {Array.from({ length: Math.ceil(countries.length / 50) }).map((_, chunkIdx) => (
            <ul
              key={chunkIdx}
              className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
              {countries.slice(chunkIdx * 50, (chunkIdx + 1) * 50).map((c) => (
                <li key={c.slug} className="py-0.5">
                  <Link
                    href={`/${c.slug}/gold-price/21k`}
                    className="group flex items-center gap-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold)]"
                    title={`${countryName(c, locale)} · ${c.currency}`}
                  >
                    <Flag cc={c.cc} size={14} />

                    <span className="truncate text-xs font-medium">
                      {t("countryItem", { name: countryName(c, locale) })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-6">
            <FooterColumn
              title={t("newsHeading")}
              links={[
                { label: t("newsLink"), href: "/news" },
                { label: pick(locale, RESEARCH), href: "/research" },
              ]}
            />
            <FooterColumn
              title={t("chartsHeading")}
              links={[
                { label: t("spotGold"), href: "/spot-gold" },
                { label: t("livePrice"), href: "/live-gold-price" },
                { label: t("priceChart"), href: "/gold-price-chart" },
                { label: t("perOz"), href: "/gold-price-per-ounce" },
                { label: t("perGram"), href: "/gold-price-per-gram" },
                { label: t("perKilo"), href: "/gold-price-per-kilo" },
                { label: t("history"), href: "/historical-gold-prices" },
                { label: t("goldSilverRatio"), href: "/gold-silver-ratio" },
                { label: t("sge"), href: "/shanghai-gold-exchange" },
                { label: t("calculator"), href: "/gold-calculator" },
                { label: t("widgets"), href: "/widgets" },
              ]}
            />
          </div>

          <div className="space-y-6">
            <FooterColumn
              title={t("metalsHeading")}
              links={[
                { label: t("gold"), href: "/precious-metals/gold" },
                { label: t("silver"), href: "/precious-metals/silver" },
                { label: t("platinum"), href: "/precious-metals/platinum" },
                { label: t("palladium"), href: "/precious-metals/palladium" },
              ]}
            />
            <FooterColumn
              title={t("bestPriceHeading")}
              links={[
                { label: t("bestPrice"), href: "/best-gold-price" },
                { label: t("bestUSA"), href: "/best-gold-price/usa" },
                { label: t("bestCanada"), href: "/best-gold-price/canada" },
                { label: t("bestSingapore"), href: "/best-gold-price/singapore" },
                { label: t("bestSwitzerland"), href: "/best-gold-price/switzerland" },
                { label: t("bestUK"), href: "/best-gold-price/uk" },
              ]}
            />
            <FooterColumn
              title={t("cryptoHeading")}
              links={[
                { label: t("bitcoin"), href: "/cryptocurrency/bitcoin" },
                { label: t("ethereum"), href: "/cryptocurrency/ethereum" },
                { label: t("tether"), href: "/cryptocurrency/tether" },
                { label: t("binance"), href: "/cryptocurrency/binancecoin" },
                { label: t("ripple"), href: "/cryptocurrency/ripple" },
                { label: t("usdc"), href: "/cryptocurrency/usd-coin" },
                { label: t("solana"), href: "/cryptocurrency/solana" },
                { label: t("tron"), href: "/cryptocurrency/tron" },
                { label: t("dogecoin"), href: "/cryptocurrency/dogecoin" },
                { label: t("moreCrypto"), href: "/cryptocurrency" },
              ]}
            />
          </div>

          <div className="space-y-6">
            <FooterColumn
              title={t("buySAHeading")}
              links={[
                { label: t("saPrices"), href: "/buy-gold/saudi-arabia" },
                { label: t("saCoins"), href: "/buy-gold/saudi-arabia/coins" },
                { label: t("saSmallCoins"), href: "/buy-gold/saudi-arabia/small-coins" },
                { label: t("saBars"), href: "/buy-gold/saudi-arabia/bars" },
              ]}
            />
            <FooterColumn
              title={t("buyAEHeading")}
              links={[
                { label: t("aePrices"), href: "/buy-gold/uae" },
                { label: t("aeCoins"), href: "/buy-gold/uae/coins" },
                { label: t("aeSmallCoins"), href: "/buy-gold/uae/small-coins" },
                { label: t("aeBars"), href: "/buy-gold/uae/bars" },
              ]}
            />
            <FooterColumn
              title={t("buyEGHeading")}
              links={[
                { label: t("egPrices"), href: "/buy-gold/egypt" },
                { label: t("egCoins"), href: "/buy-gold/egypt/coins" },
                { label: t("egSmallCoins"), href: "/buy-gold/egypt/small-coins" },
                { label: t("egBars"), href: "/buy-gold/egypt/bars" },
              ]}
            />
            <FooterColumn
              title={t("buyMAHeading")}
              links={[
                { label: t("maPrices"), href: "/buy-gold/morocco" },
                { label: t("maCoins"), href: "/buy-gold/morocco/coins" },
                { label: t("maSmallCoins"), href: "/buy-gold/morocco/small-coins" },
                { label: t("maBars"), href: "/buy-gold/morocco/bars" },
              ]}
            />
          </div>
        </div>
      </section>

      <div className="border-t border-[var(--color-border)] px-4 py-5 sm:px-6">
        <nav
          aria-label="Editorial"
          className="mx-auto mb-3 flex max-w-7xl flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-[var(--color-text-dim)]"
        >
          {EDITORIAL.map((l) => (
            <Link
              key={l.href}
              href={l.href as never}
              className="transition-colors hover:text-[var(--color-gold)]"
            >
              {pick(locale, l.label)}
            </Link>
          ))}
          {/* `rel="me"` ties the profile back to this domain — the same identity
              signal the founder's LinkedIn link uses, and it mirrors the
              Organization `sameAs` (both read from lib/social.ts). */}
          {SOCIAL_PROFILES.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="me noopener noreferrer"
              className="transition-colors hover:text-[var(--color-gold)]"
            >
              {s.name}
            </a>
          ))}
          <InstallAppButton locale={locale} />
        </nav>
        <div className="mx-auto max-w-7xl text-center text-xs text-[var(--color-text-dim)]">
          {tPage.rich("footer", {
            year,
            kormzi: (chunks) => (
              <a
                href="https://kormzi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-gold)] transition-colors hover:underline"
              >
                {chunks}
              </a>
            ),
          })}
        </div>
      </div>
    </footer>
  );
}
