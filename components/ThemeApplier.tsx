"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/lib/store";

export function ThemeApplier() {
  const theme = useSelector((s: RootState) => s.theme.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
  }, [theme]);

  return null;
}
