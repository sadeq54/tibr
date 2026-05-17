import { Globe } from "lucide-react";
import { connection } from "next/server";
import { getLocale, getTranslations } from "next-intl/server";

import { Flag } from "@/components/Flag";
import { Link } from "@/i18n/navigation";
import { COUNTRIES, countryName } from "@/lib/countries";

type LinkItem = { label: string; href: string; external?: boolean };

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
  await connection();
  const year = new Date().getFullYear();

  const sortedCountries = [...COUNTRIES].sort((a, b) =>
    locale === "ar"
      ? a.name_ar.localeCompare(b.name_ar, "ar")
      : a.name_en.localeCompare(b.name_en),
  );

  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)]">
      <section className="border-b border-[var(--color-border)] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <header className="mb-6 flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
            <Globe className="h-5 w-5 text-[var(--color-gold)]" aria-hidden />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text)]">
              {t("worldHeading")}
            </h2>
          </header>
          {/* Split countries into chunks of 50 to avoid the >60 children
              DOM-size penalty flagged by Lighthouse. */}
          {Array.from({ length: Math.ceil(sortedCountries.length / 50) }).map((_, chunkIdx) => (
            <ul
              key={chunkIdx}
              className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
              {sortedCountries.slice(chunkIdx * 50, (chunkIdx + 1) * 50).map((c) => (
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
              links={[{ label: t("newsLink"), href: "/news" }]}
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
                { label: t("history"), href: "/historical-gold-prices/2026" },
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
              title={t("buyUSAHeading")}
              links={[
                { label: t("coinPrices"), href: "/buy-gold/usa/coins" },
                { label: t("usaGoldPrices"), href: "/buy-gold/usa" },
                { label: t("smallCoins"), href: "/buy-gold/usa/small-coins" },
                { label: t("barPrices"), href: "/buy-gold/usa/bars" },
              ]}
            />
            <FooterColumn
              title={t("buyUKHeading")}
              links={[
                { label: t("ukPrices"), href: "/buy-gold/uk" },
                { label: t("ukCoins"), href: "/buy-gold/uk/coins" },
                { label: t("ukSmallCoins"), href: "/buy-gold/uk/small-coins" },
                { label: t("ukBars"), href: "/buy-gold/uk/bars" },
              ]}
            />
            <FooterColumn
              title={t("buyCAHeading")}
              links={[
                { label: t("caPrices"), href: "/buy-gold/canada" },
                { label: t("caCoins"), href: "/buy-gold/canada/coins" },
                { label: t("caSmallCoins"), href: "/buy-gold/canada/small-coins" },
                { label: t("caBars"), href: "/buy-gold/canada/bars" },
              ]}
            />
            <FooterColumn
              title={t("buyAUHeading")}
              links={[
                { label: t("auPrices"), href: "/buy-gold/australia" },
                { label: t("auCoins"), href: "/buy-gold/australia/coins" },
                { label: t("auSmallCoins"), href: "/buy-gold/australia/small-coins" },
                { label: t("auBars"), href: "/buy-gold/australia/bars" },
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
          <Link href="/about" className="transition-colors hover:text-[var(--color-gold)]">
            {locale === "ar" ? "عن الموقع" : "About"}
          </Link>
          <Link href="/about/sadeq" className="transition-colors hover:text-[var(--color-gold)]">
            {locale === "ar" ? "المؤسس" : "Founder"}
          </Link>
          <Link href="/about/disclaimer" className="transition-colors hover:text-[var(--color-gold)]">
            {locale === "ar" ? "إخلاء المسؤولية" : "Disclaimer"}
          </Link>
          <Link href="/methodology" className="transition-colors hover:text-[var(--color-gold)]">
            {locale === "ar" ? "المنهجية" : "Methodology"}
          </Link>
          <Link
            href="/editorial-standards"
            className="transition-colors hover:text-[var(--color-gold)]"
          >
            {locale === "ar" ? "معايير التحرير" : "Editorial standards"}
          </Link>
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
