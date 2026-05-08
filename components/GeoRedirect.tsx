"use client";

import { useEffect, useRef } from "react";

import { useRouter } from "@/i18n/navigation";

const COUNTRY_TO_PATH: Record<string, string> = {
  JO: "/jordan/gold-price/21k",
  SA: "/saudi-arabia/gold-price/21k",
  AE: "/uae/gold-price/21k",
  EG: "/egypt/gold-price/21k",
};

const COOKIE = "gpa-geo";
const COUNTRY_COOKIE = "gpa-country";
const STORAGE_KEY = "gpa-geo-redirected";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return match ? decodeURIComponent(match.substring(name.length + 1)) : null;
}

function writeCookie(name: string, value: string, days = 30) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 86400_000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; samesite=lax`;
}

async function detectCountry(): Promise<string | null> {
  // Override via ?geo=JO for testing.
  if (typeof window !== "undefined") {
    const q = new URLSearchParams(window.location.search).get("geo");
    if (q) return q.toUpperCase();
  }

  const endpoints = [
    "https://ipapi.co/json/",
    "https://ipwho.is/",
    "https://api.country.is/",
  ];
  for (const url of endpoints) {
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) continue;
      const data = (await r.json()) as Record<string, unknown>;
      const code =
        (data.country_code as string | undefined) ||
        (data.country as string | undefined) ||
        (data.countryCode as string | undefined);
      if (code && typeof code === "string" && code.length === 2) {
        return code.toUpperCase();
      }
    } catch {
      // try next
    }
  }
  return null;
}

export function GeoRedirect() {
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const alreadyRedirected =
      readCookie(COOKIE) === "1" || sessionStorage.getItem(STORAGE_KEY) === "1";
    const haveCountry = !!readCookie(COUNTRY_COOKIE);

    if (alreadyRedirected && haveCountry) return;

    let cancelled = false;

    detectCountry().then((country) => {
      if (cancelled) return;
      sessionStorage.setItem(STORAGE_KEY, "1");

      if (!country) {
        writeCookie(COOKIE, "1");
        return;
      }

      writeCookie(COUNTRY_COOKIE, country, 90);

      if (alreadyRedirected) return;

      const path = COUNTRY_TO_PATH[country];
      if (!path) {
        writeCookie(COOKIE, "1");
        return;
      }

      writeCookie(COOKIE, "1");
      router.replace(path as never);
    });

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
