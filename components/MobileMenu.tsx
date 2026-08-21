"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Check, Languages, Menu, X } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { LOCALE_META, routing } from "@/i18n/routing";
import { pick } from "@/lib/i18n-text";

type NavItem = { href: string; label: string };

export function MobileMenu({
  navItems,
  siteLinks = [],
  homeLabel,
  historicalLabel,
  locale,
  languageLabel,
  liveLabel,
}: {
  navItems: NavItem[];
  siteLinks?: NavItem[];
  homeLabel: string;
  historicalLabel: string;
  /** Current locale — marked in the language list. */
  locale: string;
  /** Heading for the language list ("Language" / "اللغة" …). */
  languageLabel: string;
  liveLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const closeLabel = pick(locale, {
    en: "Close menu",
    ar: "إغلاق القائمة",
    fr: "Fermer le menu",
    tr: "Menüyü kapat",
    ur: "مینو بند کریں",
    hi: "मेनू बंद करें",
  });
  const openLabel = pick(locale, {
    en: "Open menu",
    ar: "فتح القائمة",
    fr: "Ouvrir le menu",
    tr: "Menüyü aç",
    ur: "مینو کھولیں",
    hi: "मेनू खोलें",
  });
  const menuLabel = pick(locale, {
    en: "Navigation menu",
    ar: "قائمة التنقل",
    fr: "Menu de navigation",
    tr: "Gezinme menüsü",
    ur: "نیویگیشن مینو",
    hi: "नेविगेशन मेनू",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Close on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const drawer = (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
            aria-hidden
          />
          <motion.aside
            id="mobile-menu-panel"
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={menuLabel}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-0 z-[110] flex w-screen flex-col gap-2 overflow-y-auto bg-[var(--color-bg)] p-6 shadow-2xl md:hidden"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-up)]/40 bg-[var(--color-up)]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-up)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-up)]" />
                  {liveLabel}
                </span>
              </span>
              <button
                type="button"
                aria-label={closeLabel}
                onClick={() => setOpen(false)}
                className="theme-toggle inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] text-[var(--color-text)]"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col">
              <Link
                href="/"
                className="rounded-md px-3 py-3 text-base font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-gold)]"
              >
                {homeLabel}
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as never}
                  className="rounded-md px-3 py-3 text-base font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-gold)]"
                >
                  {item.label}
                </Link>
              ))}
              {siteLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as never}
                  className="rounded-md px-3 py-3 text-base font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-gold)]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/historical-gold-prices"
                className="rounded-md px-3 py-3 text-base font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-gold)]"
              >
                {historicalLabel}
              </Link>
            </nav>

            <div className="my-3 h-px bg-[var(--color-border)]" />

            <section aria-label={languageLabel}>
              <h2 className="mb-2 flex items-center gap-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                <Languages size={14} aria-hidden />
                {languageLabel}
              </h2>
              <ul className="grid grid-cols-2 gap-1.5">
                {routing.locales.map((l) => {
                  const current = l === locale;
                  return (
                    <li key={l}>
                      <Link
                        href={(pathname || "/") as never}
                        locale={l}
                        hrefLang={l}
                        lang={l}
                        aria-current={current ? "true" : undefined}
                        className={`theme-toggle flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm font-semibold ${
                          current
                            ? "border-[var(--color-gold)]/60 bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                            : "border-[var(--color-border-strong)] bg-[var(--color-bg-card)] text-[var(--color-text)]"
                        }`}
                      >
                        <span dir="auto">{LOCALE_META[l].name}</span>
                        {current ? <Check size={14} aria-hidden /> : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        aria-label={open ? closeLabel : openLabel}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((v) => !v)}
        className="theme-toggle inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] text-[var(--color-text)] md:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}
