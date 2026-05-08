import { Languages } from "lucide-react";
import { headers } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";

import { BrandMark } from "@/components/BrandMark";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { COUNTRY_BY_SLUG } from "@/lib/countries";

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
  const otherLocale = locale === "ar" ? "en" : "ar";
  const otherLabel = otherLocale === "ar" ? t("switchAr") : t("switchEn");

  const h = await headers();
  const path = h.get("x-pathname") ?? "";
  const country = extractCountrySlug(path);
  const base = country ? `/${country}/gold-price` : "/gold-price";

  const navItems = [
    { href: `${base}/24k`, label: "24K" },
    { href: `${base}/21k`, label: "21K" },
    { href: `${base}/18k`, label: "18K" },
  ];

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          dir="ltr"
          aria-label="Gold Prices Arabia"
          className="flex min-w-0 items-center gap-2 sm:gap-2.5"
        >
          <BrandMark size={72} className="flex-shrink-0" />
          <span className="ml-1 hidden items-center gap-1 rounded-full border border-[var(--color-up)]/40 bg-[var(--color-up)]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-up)] sm:inline-flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-up)]" />
            {t("live")}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[var(--color-text-muted)] md:flex">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href as never}
              className="hover:text-[var(--color-text)]"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/historical-gold-prices/2026" className="hover:text-[var(--color-text)]">
            {t("historical")}
          </Link>
          <Link
            href="/"
            locale={otherLocale}
            aria-label={otherLabel}
            title={otherLabel}
            className="theme-toggle inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] text-[var(--color-text)]"
          >
            <Languages size={16} aria-hidden />
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu
            navItems={navItems}
            homeLabel={t("home")}
            historicalLabel={t("historical")}
            switchLabel={otherLabel}
            switchLocale={otherLocale}
            liveLabel={t("live")}
          />
        </div>
      </div>
    </header>
  );
}
