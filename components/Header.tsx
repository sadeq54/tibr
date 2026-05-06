import { getLocale, getTranslations } from "next-intl/server";

import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";

export async function Header() {
  const t = await getTranslations("Header");
  const locale = await getLocale();
  const otherLocale = locale === "ar" ? "en" : "ar";
  const otherLabel = otherLocale === "ar" ? t("switchAr") : t("switchEn");

  const navItems = [
    { href: "/gold-price/24k", label: "24K" },
    { href: "/gold-price/21k", label: "21K" },
    { href: "/gold-price/18k", label: "18K" },
  ];

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <span
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-base font-extrabold tracking-tight text-black"
            style={{ background: "linear-gradient(135deg, #f5c518 0%, #d4a82a 60%, #8a6a18 100%)" }}
          >
            T
          </span>
          <span className="text-lg font-semibold tracking-tight text-[var(--color-gold)]">Tibr</span>
          <span className="ml-1 inline-flex items-center gap-1 rounded-full border border-[var(--color-up)]/40 bg-[var(--color-up)]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-up)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-up)]" />
            {t("live")}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[var(--color-text-muted)] md:flex">
          <Link href="/" className="hover:text-[var(--color-text)]">{t("home")}</Link>
          {navItems.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-[var(--color-text)]">
              {n.label}
            </Link>
          ))}
          <Link href="/historical-gold-prices/2026" className="hover:text-[var(--color-text)]">
            {t("historical")}
          </Link>
          <Link
            href="/"
            locale={otherLocale}
            className="theme-toggle rounded-md border border-[var(--color-border-strong)] px-3 py-1 text-xs text-[var(--color-text)]"
          >
            {otherLabel}
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
