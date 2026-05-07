import { Globe, Mail, Smartphone, Megaphone } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

type Country = { code: string; name: string; href?: string };

const COUNTRIES: Country[] = [
  { code: "US", name: "USA" },
  { code: "EU", name: "Europe" },
  { code: "AR", name: "Argentina" },
  { code: "AU", name: "Australia" },
  { code: "BH", name: "Bahrain" },
  { code: "BR", name: "Brazil" },
  { code: "CA", name: "Canada" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "HR", name: "Croatia" },
  { code: "DK", name: "Denmark" },
  { code: "EG", name: "Egypt", href: "/egypt/gold-price/21k" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IL", name: "Israel" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan", href: "/jordan/gold-price/21k" },
  { code: "KW", name: "Kuwait" },
  { code: "LB", name: "Lebanon" },
  { code: "LY", name: "Libya" },
  { code: "MO", name: "Macau" },
  { code: "MY", name: "Malaysia" },
  { code: "MX", name: "Mexico" },
  { code: "MM", name: "Myanmar" },
  { code: "NZ", name: "New Zealand" },
  { code: "NG", name: "Nigeria" },
  { code: "MK", name: "North Macedonia" },
  { code: "NO", name: "Norway" },
  { code: "PK", name: "Pakistan" },
  { code: "PH", name: "Philippines" },
  { code: "QA", name: "Qatar" },
  { code: "RU", name: "Russia" },
  { code: "SA", name: "Saudi Arabia", href: "/saudi-arabia/gold-price/21k" },
  { code: "RS", name: "Serbia" },
  { code: "SG", name: "Singapore" },
  { code: "ZA", name: "South Africa" },
  { code: "KR", name: "South Korea" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TW", name: "Taiwan" },
  { code: "TH", name: "Thailand" },
  { code: "TR", name: "Turkey" },
  { code: "GB", name: "United Kingdom" },
  { code: "AE", name: "United Arab Emirates", href: "/uae/gold-price/21k" },
  { code: "VN", name: "Vietnam" },
];

function flag(code: string): string {
  if (code === "EU") return "🇪🇺";
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

type LinkItem = { label: string; href: string; external?: boolean };

function FooterColumn({ title, links }: { title: string; links: LinkItem[] }) {
  return (
    <div>
      <h3 className="mb-3 inline-block border-b border-[var(--color-gold)]/40 pb-1 text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {links.map((l) => (
          <li key={l.label}>
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
  const year = new Date().getFullYear();

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
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {COUNTRIES.map((c) => {
              const inner = (
                <>
                  <span className="text-base leading-none" aria-hidden>
                    {flag(c.code)}
                  </span>
                  <span className="text-xs font-medium">
                    {t("countryItem", { name: c.name })}
                  </span>
                </>
              );
              return (
                <li key={c.code} className="py-0.5">
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="group flex items-center gap-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold)]"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <span
                      className="flex cursor-default items-center gap-2 text-[var(--color-text-dim)]"
                      title={`${t("countryItem", { name: c.name })} — ${t("comingSoon")}`}
                    >
                      {inner}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
          <FooterColumn
            title={t("chartsHeading")}
            links={[
              { label: t("spotGold"), href: "/" },
              { label: t("livePrice"), href: "/" },
              { label: t("priceChart"), href: "/" },
              { label: t("perOz"), href: "/gold-price/24k" },
              { label: t("perGram"), href: "/gold-price/24k" },
              { label: t("perKilo"), href: "/gold-price/24k" },
              { label: t("history"), href: "/historical-gold-prices/2026" },
              { label: t("calculator"), href: "/" },
            ]}
          />
          <FooterColumn
            title={t("metalsHeading")}
            links={[
              { label: t("gold"), href: "/" },
              { label: t("silver"), href: "/" },
              { label: t("platinum"), href: "/" },
              { label: t("palladium"), href: "/" },
            ]}
          />
          <FooterColumn
            title={t("karatHeading")}
            links={[
              { label: t("karatLink", { karat: "24K" }), href: "/gold-price/24k" },
              { label: t("karatLink", { karat: "21K" }), href: "/gold-price/21k" },
              { label: t("karatLink", { karat: "18K" }), href: "/gold-price/18k" },
              { label: t("karatLink", { karat: "14K" }), href: "/gold-price/14k" },
            ]}
          />
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 inline-flex items-center gap-1.5 border-b border-[var(--color-gold)]/40 pb-1 text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                <Mail size={12} aria-hidden /> {t("contactHeading")}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">{t("contactBody")}</p>
              <a
                href="mailto:support@tibr.live"
                className="mt-2 inline-block text-sm text-[var(--color-gold)] underline transition-colors hover:no-underline"
              >
                support@tibr.live
              </a>
            </div>

            <div>
              <h3 className="mb-3 inline-flex items-center gap-1.5 border-b border-[var(--color-gold)]/40 pb-1 text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                <Smartphone size={12} aria-hidden /> {t("appsHeading")}
              </h3>
              <p className="text-sm text-[var(--color-text-dim)]">{t("appsSoon")}</p>
            </div>

            <div>
              <h3 className="mb-3 inline-flex items-center gap-1.5 border-b border-[var(--color-gold)]/40 pb-1 text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                <Megaphone size={12} aria-hidden /> {t("adsHeading")}
              </h3>
              <a
                href="mailto:ads@tibr.live"
                className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold)] hover:underline"
              >
                {t("adsLink")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[var(--color-border)] px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-7xl text-center text-xs text-[var(--color-text-dim)]">
          {tPage("footer", { year })}
        </div>
      </div>
    </footer>
  );
}
