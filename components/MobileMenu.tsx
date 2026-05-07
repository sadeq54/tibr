"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Languages, Menu, X } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";

type NavItem = { href: string; label: string };

export function MobileMenu({
  navItems,
  homeLabel,
  historicalLabel,
  switchLabel,
  switchLocale,
  liveLabel,
}: {
  navItems: NavItem[];
  homeLabel: string;
  historicalLabel: string;
  switchLabel: string;
  switchLocale: "en" | "ar";
  liveLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change
  useEffect(() => {
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
            aria-label="Navigation menu"
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
                aria-label="Close menu"
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
                  href={item.href}
                  className="rounded-md px-3 py-3 text-base font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-gold)]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/historical-gold-prices/2026"
                className="rounded-md px-3 py-3 text-base font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-bg-card-hover)] hover:text-[var(--color-gold)]"
              >
                {historicalLabel}
              </Link>
            </nav>

            <div className="my-3 h-px bg-[var(--color-border)]" />

            <Link
              href="/"
              locale={switchLocale}
              aria-label={switchLabel}
              className="theme-toggle inline-flex items-center justify-center gap-2 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] px-3 py-2 text-sm font-semibold text-[var(--color-text)]"
            >
              <Languages size={16} aria-hidden />
              <span>{switchLabel}</span>
            </Link>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
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
