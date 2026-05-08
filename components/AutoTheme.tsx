"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAutoTheme } from "@/lib/store/themeSlice";
import type { AppDispatch } from "@/lib/store";

// 06:00 – 17:59 local = light, otherwise dark.
function pickTheme() {
  const h = new Date().getHours();
  return h >= 6 && h < 18 ? "light" : "dark";
}

export function AutoTheme() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setAutoTheme(pickTheme()));
    const ms = (60 - new Date().getMinutes()) * 60 * 1000;
    const t = window.setTimeout(() => dispatch(setAutoTheme(pickTheme())), ms);
    return () => window.clearTimeout(t);
  }, [dispatch]);
  return null;
}
