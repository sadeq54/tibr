"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "next-intl";

import { currencyForCC } from "@/lib/countries";

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: Record<string, unknown>) => unknown;
    };
  }
}

type Interval = "1" | "5" | "15" | "30" | "60" | "240" | "D" | "W" | "M";

type Props = {
  symbol?: string;
  currency?: string;
  interval?: Interval;
  height?: number;
  watchlist?: string[];
  className?: string;
};

const DIRECT_XAU: Record<string, string> = {
  USD: "TVC:GOLD",
  EUR: "FX_IDC:XAUEUR",
  GBP: "FX_IDC:XAUGBP",
  JPY: "FX_IDC:XAUJPY",
  AUD: "FX_IDC:XAUAUD",
  CAD: "FX_IDC:XAUCAD",
  CHF: "FX_IDC:XAUCHF",
  HKD: "FX_IDC:XAUHKD",
  SGD: "FX_IDC:XAUSGD",
  CNY: "FX_IDC:XAUCNY",
  INR: "FX_IDC:XAUINR",
  THB: "FX_IDC:XAUTHB",
};

function symbolForCurrency(currency: string): string {
  const cc = currency.toUpperCase();
  if (DIRECT_XAU[cc]) return DIRECT_XAU[cc];
  return `(OANDA:XAUUSD)*(FX_IDC:USD${cc})`;
}

let scriptPromise: Promise<void> | null = null;
function loadTV(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.TradingView) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/tv.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("tv.js failed to load"));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

function readCountryCookie(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.split("; ").find((r) => r.startsWith("gpa-country="));
  return m ? decodeURIComponent(m.substring("gpa-country=".length)) : null;
}

function writeCountryCookie(cc: string) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + 90 * 86400_000).toUTCString();
  document.cookie = `gpa-country=${encodeURIComponent(cc)}; expires=${expires}; path=/; samesite=lax`;
}

let detectInflight: Promise<string | null> | null = null;
async function detectCountryOnce(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search).get("geo");
  if (q) return q.toUpperCase();
  if (detectInflight) return detectInflight;
  detectInflight = (async () => {
    const endpoints = ["https://ipapi.co/json/", "https://ipwho.is/", "https://api.country.is/"];
    for (const url of endpoints) {
      try {
        const r = await fetch(url, { cache: "no-store" });
        if (!r.ok) continue;
        const data = (await r.json()) as Record<string, unknown>;
        const code =
          (data.country_code as string | undefined) ||
          (data.country as string | undefined) ||
          (data.countryCode as string | undefined);
        if (code && typeof code === "string" && code.length === 2) return code.toUpperCase();
      } catch {
        // try next
      }
    }
    return null;
  })();
  return detectInflight;
}

function readTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  const t = document.documentElement.dataset.theme;
  if (t === "light" || t === "dark") return t;
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function clearChildren(node: HTMLElement) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function TradingViewChart({
  symbol,
  currency,
  interval = "D",
  height = 560,
  watchlist = ["TVC:GOLD", "TVC:SILVER", "TVC:PLATINUM", "TVC:PALLADIUM", "FX:EURUSD"],
  className,
}: Props) {
  const [autoCurrency, setAutoCurrency] = useState<string | null>(null);

  useEffect(() => {
    if (currency || symbol) return;
    let cancelled = false;
    const cached = readCountryCookie();
    if (cached) {
      const ccy = currencyForCC(cached);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (ccy) setAutoCurrency(ccy);
      return;
    }
    detectCountryOnce().then((cc) => {
      if (cancelled || !cc) return;
      writeCountryCookie(cc);
      const ccy = currencyForCC(cc);
      if (ccy) setAutoCurrency(ccy);
    });
    return () => {
      cancelled = true;
    };
  }, [currency, symbol]);

  const effectiveCurrency = currency ?? autoCurrency ?? undefined;
  const resolvedSymbol =
    symbol ?? (effectiveCurrency ? symbolForCurrency(effectiveCurrency) : "TVC:GOLD");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const idSuffix = useId().replace(/[^a-zA-Z0-9]/g, "");
  const containerId = useRef(`tv_${idSuffix}`);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(readTheme());
    const obs = new MutationObserver(() => setTheme(readTheme()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const node = ref.current;
    if (!node) return;

    loadTV()
      .then(() => {
        if (cancelled || !node || !window.TradingView) return;
        clearChildren(node);
        const inner = document.createElement("div");
        inner.id = containerId.current;
        inner.style.height = "100%";
        inner.style.width = "100%";
        node.appendChild(inner);
        new window.TradingView.widget({
          autosize: true,
          symbol: resolvedSymbol,
          interval,
          timezone: "Etc/UTC",
          theme,
          style: "1",
          locale: locale === "ar" ? "ar_AE" : "en",
          toolbar_bg: theme === "dark" ? "#0a0a0a" : "#f6f4ee",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: containerId.current,
          hide_side_toolbar: false,
          withdateranges: true,
          details: true,
          hotlist: false,
          calendar: false,
          watchlist,
          studies: [],
          support_host: "https://www.tradingview.com",
        });
      })
      .catch(() => {
        if (cancelled || !node) return;
        clearChildren(node);
        const msg = document.createElement("div");
        msg.style.cssText = "display:flex;align-items:center;justify-content:center;height:100%;color:#888;font-size:14px";
        msg.textContent = "Chart unavailable";
        node.appendChild(msg);
      });

    return () => {
      cancelled = true;
    };
  }, [resolvedSymbol, interval, theme, locale, watchlist]);

  return (
    <div
      ref={ref}
      className={
        className ??
        "tradingview-widget-container w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950"
      }
      style={{ height }}
    />
  );
}
