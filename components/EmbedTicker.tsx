"use client";

import { useEffect, useState } from "react";

import { isRtl, localeMeta } from "@/i18n/routing";
import { pick } from "@/lib/i18n-text";

/**
 * Embed ticker — the client half of the iframe widget.
 *
 * Data strategy: starts from the server-rendered snapshot (`initial`) so the
 * widget paints instantly and is correct even with JS disabled, then polls
 * `/api/spot` every 60s (stale-while-revalidate). `/api/spot` is `use cache`
 * (60s) so a million embeds collapse onto one cached upstream call — no
 * WebSocket fan-out, no exchange rate-limit risk, minimal host-page weight.
 *
 * Styling is fully inline from a fixed palette so the widget is self-contained
 * — it never depends on the host page's CSS, and the theme is locked to the
 * webmaster's choice (not the site's time-of-day AutoTheme).
 */

type Snapshot = {
  g24: number;
  g21: number;
  g18: number;
  g14: number;
  changePct: number;
  updatedAt: number;
};

const PALETTE = {
  light: {
    bg: "#ffffff",
    fg: "#1a1a1a",
    dim: "#6b7280",
    border: "#e5e1d5",
    gold: "#9a7209",
    up: "#15803d",
    down: "#b91c1c",
  },
  dark: {
    bg: "#0e0e0e",
    fg: "#f5f5f5",
    dim: "#8a8a8a",
    border: "#272727",
    gold: "#d4af37",
    up: "#22c55e",
    down: "#ef4444",
  },
} as const;

export function EmbedTicker({
  locale,
  theme,
  countryName,
  currency,
  fxRate,
  initial,
}: {
  locale: string;
  theme: "light" | "dark";
  countryName: string;
  currency: string;
  /** USD→local multiplier — applied to the polled USD spot values. */
  fxRate: number;
  initial: Snapshot;
}) {
  const [data, setData] = useState<Snapshot>(initial);
  const c = PALETTE[theme];
  const rtl = isRtl(locale);
  const karat = (k: string) =>
    pick(locale, { en: `${k}K`, ar: `عيار ${k}`, fr: `${k} carats`, tr: `${k} ayar`, ur: `${k} قیراط`, hi: `${k} कैरेट` });

  useEffect(() => {
    let alive = true;

    const pull = async () => {
      try {
        const r = await fetch("/api/spot", { cache: "no-store" });
        if (!r.ok) return;
        const j = await r.json();
        if (!alive || typeof j.price_gram_24k !== "number") return;
        setData({
          g24: j.price_gram_24k * fxRate,
          g21: j.price_gram_21k * fxRate,
          g18: j.price_gram_18k * fxRate,
          g14: j.price_gram_14k * fxRate,
          changePct: typeof j.chp === "number" ? j.chp : 0,
          updatedAt: Date.now(),
        });
      } catch {
        // Network blip — keep the last good value, try again next tick.
      }
    };

    const id = setInterval(pull, 60_000);
    const onVis = () => {
      if (document.visibilityState === "visible") pull();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      alive = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [fxRate]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const up = data.changePct >= 0;
  const time = new Date(data.updatedAt).toLocaleTimeString(localeMeta(locale).intl, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "100%",
        minHeight: 116,
        background: c.bg,
        color: c.fg,
        border: `1px solid ${c.border}`,
        borderRadius: 10,
        padding: "12px 14px",
        fontFamily:
          "system-ui, -apple-system, 'Segoe UI', Tahoma, Arial, sans-serif",
        direction: rtl ? "rtl" : "ltr",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600 }}>
          {pick(locale, {
            en: `Gold price — ${countryName}`,
            ar: `سعر الذهب — ${countryName}`,
            fr: `Prix de l'or — ${countryName}`,
            tr: `Altın fiyatı — ${countryName}`,
            ur: `سونے کی قیمت — ${countryName}`,
            hi: `सोने का भाव — ${countryName}`,
          })}
        </span>
        <span style={{ fontSize: 10, color: c.dim, letterSpacing: 0.5 }}>
          {currency}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          marginTop: 6,
        }}
      >
        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: c.gold,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {fmt(data.g24)}
        </span>
        <span style={{ fontSize: 11, color: c.dim }}>
          {pick(locale, {
            en: "24K / gram",
            ar: "عيار 24 / جرام",
            fr: "24 carats / gramme",
            tr: "24 ayar / gram",
            ur: "24 قیراط / گرام",
            hi: "24 कैरेट / ग्राम",
          })}
        </span>
        <span
          style={{
            marginInlineStart: "auto",
            fontSize: 12,
            fontWeight: 600,
            color: up ? c.up : c.down,
          }}
        >
          {up ? "▲" : "▼"} {Math.abs(data.changePct).toFixed(2)}%
        </span>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
        {[
          { k: karat("21"), v: data.g21 },
          { k: karat("18"), v: data.g18 },
          { k: karat("14"), v: data.g14 },
        ].map((x) => (
          <span key={x.k} style={{ fontSize: 11, color: c.dim }}>
            {x.k}{" "}
            <span
              style={{
                color: c.fg,
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmt(x.v)}
            </span>
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8,
          fontSize: 9,
          color: c.dim,
        }}
      >
        <span>
          {pick(locale, {
            en: `Updated ${time}`,
            ar: `آخر تحديث ${time}`,
            fr: `Mis à jour ${time}`,
            tr: `Güncellendi ${time}`,
            ur: `اپ ڈیٹ ${time}`,
            hi: `अपडेट ${time}`,
          })}
        </span>
        <a
          href="https://goldpricesarabia.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: c.dim, textDecoration: "none" }}
        >
          goldpricesarabia.com
        </a>
      </div>
    </div>
  );
}
