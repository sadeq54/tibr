"use client";

import { Languages } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";

/**
 * Language switcher that preserves the current path. `usePathname()` from
 * next-intl returns the locale-stripped pathname (e.g. on `/en/spot-gold` it
 * returns `/spot-gold`), so we can hand it to <Link locale={otherLocale}> and
 * let next-intl re-apply the correct prefix.
 *
 * Lives in a client component so route changes don't require a server roundtrip.
 */
export function LanguageSwitcher({
  otherLocale,
  label,
  className,
}: {
  otherLocale: "ar" | "en";
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const href = (pathname || "/") as never;

  return (
    <Link
      href={href}
      locale={otherLocale}
      aria-label={label}
      title={label}
      className={
        className ??
        "theme-toggle inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] text-[var(--color-text)]"
      }
    >
      <Languages size={16} aria-hidden />
    </Link>
  );
}
