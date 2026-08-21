"use client";

import { useEffect, useRef } from "react";
import { Check, Languages } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { LOCALE_META, routing } from "@/i18n/routing";

/**
 * Six-language menu that preserves the current path. `usePathname()` from
 * next-intl returns the locale-stripped pathname (e.g. on `/en/spot-gold` it
 * returns `/spot-gold`), so every item is `<Link href={pathname} locale={l}>`
 * and next-intl re-applies the right prefix.
 *
 * Built on `<details>` so it opens, closes and navigates with JavaScript
 * disabled; the effects only add the conveniences (close on outside click,
 * Escape, and after navigation). Keyboard: Enter/Space on the trigger, Tab
 * through the items, Escape returns focus to the trigger.
 */
export function LanguageSwitcher({
  locale,
  label,
  className,
}: {
  locale: string;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const href = (pathname || "/") as never;
  const ref = useRef<HTMLDetailsElement>(null);

  // Close after a route change.
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onDocClick = (e: MouseEvent) => {
      if (el.open && !el.contains(e.target as Node)) el.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !el.open) return;
      el.open = false;
      el.querySelector<HTMLElement>("summary")?.focus();
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <details ref={ref} className={`relative ${className ?? ""}`}>
      <summary
        aria-label={label}
        title={label}
        className="theme-toggle inline-flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] text-[var(--color-text)] [&::-webkit-details-marker]:hidden"
      >
        <Languages size={16} aria-hidden />
        {/* Visually hidden but in DOM textContent — gives SF/Screaming Frog real
            anchor text (it doesn't read aria-label) and keeps SR users covered. */}
        <span className="sr-only">{label}</span>
      </summary>
      <ul
        aria-label={label}
        className="absolute end-0 top-full z-50 mt-2 min-w-[10.5rem] overflow-hidden rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] py-1 shadow-2xl"
      >
        {routing.locales.map((l) => {
          const current = l === locale;
          return (
            <li key={l}>
              <Link
                href={href}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={current ? "true" : undefined}
                className={`flex items-center justify-between gap-3 px-3 py-2 text-sm transition-colors ${
                  current
                    ? "font-semibold text-[var(--color-gold)]"
                    : "text-[var(--color-text)] hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-gold)]"
                }`}
              >
                <span dir="auto">{LOCALE_META[l].name}</span>
                {current ? <Check size={14} aria-hidden /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
