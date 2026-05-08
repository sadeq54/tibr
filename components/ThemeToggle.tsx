"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "@/lib/store/themeSlice";
import type { AppDispatch, RootState } from "@/lib/store";

export function ThemeToggle() {
  const theme = useSelector((s: RootState) => s.theme.theme);
  const dispatch = useDispatch<AppDispatch>();

  const Icon = theme === "dark" ? Sun : Moon;
  const label = theme === "dark" ? "Switch to light" : "Switch to dark";

  return (
    <motion.button
      type="button"
      onClick={() => dispatch(toggleTheme())}
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
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          <Icon size={16} />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
