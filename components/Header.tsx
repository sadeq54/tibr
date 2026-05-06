import { getLocale, getTranslations } from "next-intl/server";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";

export async function Header() {
  const t = await getTranslations("Header");
  const locale = await getLocale();
  const otherLocale = locale === "ar" ? "en" : "ar";
  const otherLabel = otherLocale === "ar" ? t("switchAr") : t("switchEn");

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-base font-extrabold tracking-tight text-black"
              style={{ background: "linear-gradient(135deg, #f5c518 0%, #d4a82a 60%, #8a6a18 100%)" }}
            >
              T
            </span>
            <span className="text-lg font-semibold tracking-tight text-[var(--color-gold)]">Tibr</span>
            <span className="hidden text-xs text-[var(--color-text-dim)] md:inline">— {t("tagline")}</span>
            <span className="ml-1 inline-flex items-center gap-1 rounded-full border border-[var(--color-up)]/40 bg-[var(--color-up)]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-up)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-up)]" />
              {t("live")}
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
          <Link href="/" className="hover:text-[var(--color-text)]">{t("home")}</Link>
          <Link href="/gold-price/24k" className="hover:text-[var(--color-text)]">24K</Link>
          <Link href="/gold-price/21k" className="hover:text-[var(--color-text)]">21K</Link>
          <Link href="/gold-price/18k" className="hover:text-[var(--color-text)]">18K</Link>
          <Link href="/historical-gold-prices/2026" className="hover:text-[var(--color-text)]">{t("historical")}</Link>
          <Link
            href="/"
            locale={otherLocale}
            className="rounded-md border border-[var(--color-border-strong)] px-3 py-1 text-xs text-[var(--color-text)] hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]"
          >
            {otherLabel}
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
