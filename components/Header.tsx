import { headers } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";

import { BrandMark } from "@/components/BrandMark";
import { HeaderTicker } from "@/components/HeaderTicker";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { COUNTRY_BY_SLUG } from "@/lib/countries";
import { pick } from "@/lib/i18n-text";

function extractCountrySlug(path: string): string | null {
  const parts = path.split("/").filter(Boolean);
  let i = 0;
  if (parts[0] && (routing.locales as readonly string[]).includes(parts[0])) i = 1;
  const slug = parts[i];
  if (!slug) return null;
  return COUNTRY_BY_SLUG[slug] ? slug : null;
}

export async function Header() {
  const t = await getTranslations("Header");
  const locale = await getLocale();
  const languageLabel = pick(locale, {
    en: "Language",
    ar: "اللغة",
    fr: "Langue",
    tr: "Dil",
    ur: "زبان",
    hi: "भाषा",
  });

  const h = await headers();
  const path = h.get("x-pathname") ?? "";
  const country = extractCountrySlug(path);
  const base = country ? `/${country}/gold-price` : "/gold-price";

  const navItems = [
    { href: `${base}/24k`, label: "24K" },
    { href: `${base}/22k`, label: "22K" },
    { href: `${base}/21k`, label: "21K" },
    { href: `${base}/18k`, label: "18K" },
    { href: `${base}/14k`, label: "14K" },
  ];

  const siteLinks = [
    {
      href: "/gold-price-chart",
      label: pick(locale, { en: "Charts", ar: "الرسم البياني", fr: "Graphiques", tr: "Grafikler", ur: "چارٹس", hi: "चार्ट" }),
    },
    {
      href: "/gold-calculator",
      label: pick(locale, { en: "Calculator", ar: "الحاسبة", fr: "Calculateur", tr: "Hesaplayıcı", ur: "کیلکولیٹر", hi: "कैलकुलेटर" }),
    },
    {
      href: "/research",
      label: pick(locale, { en: "Research", ar: "الأبحاث", fr: "Recherche", tr: "Araştırma", ur: "تحقیق", hi: "शोध" }),
    },
    {
      href: "/news",
      label: pick(locale, { en: "News", ar: "الأخبار", fr: "Actualités", tr: "Haberler", ur: "خبریں", hi: "समाचार" }),
    },
  ];

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Gold Prices Arabia"
          className="flex min-w-0 shrink-0 items-center"
        >
          <BrandMark height={38} className="h-[38px] w-auto" />
        </Link>

        <span className="hidden items-center gap-1.5 rounded-full border border-[var(--color-up)]/40 bg-[var(--color-up)]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-up)] sm:inline-flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-up)]" />
          {t("live")}
        </span>

        <nav className="ms-auto hidden items-center md:flex" aria-label="Primary">
          <div
            dir="ltr"
            className="flex items-center gap-0.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] p-1"
          >
            {navItems.map((n) => (
              <Link
                key={n.href}
                href={n.href as never}
                className="num rounded-full px-2.5 py-1 font-mono text-xs font-semibold text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-gold)]/15 hover:text-[var(--color-gold)]"
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div className="ms-5 hidden items-center gap-5 text-sm text-[var(--color-text-muted)] lg:flex">
            {siteLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href as never}
                className="transition-colors hover:text-[var(--color-text)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/historical-gold-prices"
              className="hidden transition-colors hover:text-[var(--color-text)] xl:inline"
            >
              {t("historical")}
            </Link>
          </div>
        </nav>

        <div className="ms-auto flex items-center gap-2 md:ms-4">
          <HeaderTicker />
          <span className="hidden md:inline-flex">
            <LanguageSwitcher locale={locale} label={languageLabel} />
          </span>
          <ThemeToggle />
          <span className="md:hidden">
            <MobileMenu
              navItems={navItems}
              siteLinks={siteLinks}
              homeLabel={t("home")}
              historicalLabel={t("historical")}
              locale={locale}
              languageLabel={languageLabel}
              liveLabel={t("live")}
            />
          </span>
        </div>
      </div>
    </header>
  );
}
