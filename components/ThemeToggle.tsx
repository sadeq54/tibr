"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "tibr-theme";

type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => { finished: Promise<void> };
};

function readStored(): Theme | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "light" || v === "dark" ? v : null;
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "light") root.classList.add("light");
  else root.classList.remove("light");
  root.dataset.theme = theme;
}

function persistTheme(theme: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}

function applyThemeWithTransition(theme: Theme, origin?: { x: number; y: number }) {
  if (typeof window === "undefined") {
    applyTheme(theme);
    return;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as ViewTransitionDocument;

  if (reduced || typeof doc.startViewTransition !== "function") {
    applyTheme(theme);
    return;
  }

  const root = document.documentElement;
  if (origin) {
    root.style.setProperty("--vt-origin-x", `${origin.x}px`);
    root.style.setProperty("--vt-origin-y", `${origin.y}px`);
  } else {
    root.style.setProperty("--vt-origin-x", "50%");
    root.style.setProperty("--vt-origin-y", "50%");
  }

  doc.startViewTransition!(() => {
    applyTheme(theme);
  });
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = readStored();
    const prefersLight =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial: Theme = stored ?? (prefersLight ? "light" : "dark");
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next: Theme = theme === "dark" ? "light" : "dark";
    persistTheme(next);
    const rect = e.currentTarget.getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    setTheme(next);
    applyThemeWithTransition(next, origin);
  }

  const Icon = theme === "dark" ? Sun : Moon;
  const label = theme === "dark" ? "Switch to light" : "Switch to dark";

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      title={label}
      suppressHydrationWarning
      className="theme-toggle relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] text-[var(--color-text)]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 360, damping: 20 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted ? theme : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          {mounted ? <Icon size={16} /> : <Sun size={16} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
