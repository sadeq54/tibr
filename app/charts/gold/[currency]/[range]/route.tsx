import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { isRtl, routing } from "@/i18n/routing";
import { getCachedAllHistory, getCachedFxRates } from "@/lib/cached-fetchers";
import type { HistoryRange } from "@/lib/history";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { loadFontsFor, OG_FONT_FAMILY, rtlWords } from "@/lib/og-font";
import { OZ_G, currencyName, dateLabel, fmtNum } from "@/lib/seo";

/**
 * Branded gold-price chart PNG: /charts/gold/{currency}/{range}?lang=ar|en|fr|tr|ur|hi&unit=oz|g
 *
 * The same asset class goldprice.org built its backlink profile on (static
 * chart images embedded across the web), rendered live from our cached
 * history + FX and served with long CDN caching. Pages embed it with an
 * "embed this chart" snippet that links back to the source page.
 */
const RANGES: Record<string, { yahoo: HistoryRange; label: LocaleText }> = {
  "1m": { yahoo: "1mo", label: { en: "1 month", ar: "شهر", fr: "1 mois", tr: "1 ay", ur: "1 ماہ", hi: "1 माह" } },
  "3m": { yahoo: "3mo", label: { en: "3 months", ar: "3 أشهر", fr: "3 mois", tr: "3 ay", ur: "3 ماہ", hi: "3 माह" } },
  "1y": { yahoo: "1y", label: { en: "1 year", ar: "سنة", fr: "1 an", tr: "1 yıl", ur: "1 سال", hi: "1 वर्ष" } },
  "5y": { yahoo: "5y", label: { en: "5 years", ar: "5 سنوات", fr: "5 ans", tr: "5 yıl", ur: "5 سال", hi: "5 वर्ष" } },
  "10y": { yahoo: "10y", label: { en: "10 years", ar: "10 سنوات", fr: "10 ans", tr: "10 yıl", ur: "10 سال", hi: "10 वर्ष" } },
  max: { yahoo: "max", label: { en: "since 2000", ar: "منذ 2000", fr: "depuis 2000", tr: "2000'den beri", ur: "2000 سے", hi: "2000 से" } },
};

const W = 1200;
const H = 630;
const PAD = { l: 80, r: 48, t: 160, b: 72 };

function downsample<T>(arr: T[], max: number): T[] {
  if (arr.length <= max) return arr;
  const step = arr.length / max;
  const out: T[] = [];
  for (let i = 0; i < max; i++) out.push(arr[Math.floor(i * step)]);
  out.push(arr[arr.length - 1]);
  return out;
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ currency: string; range: string }> },
) {
  const { currency: curRaw, range: rangeRaw } = await ctx.params;
  const cur = curRaw.toUpperCase();
  const range = RANGES[rangeRaw.toLowerCase()];
  if (!range || !/^[A-Z]{3}$/.test(cur)) return new Response("Not found", { status: 404 });

  const langParam = req.nextUrl.searchParams.get("lang") ?? "en";
  const lang = (routing.locales as readonly string[]).includes(langParam) ? langParam : "en";
  const rtl = isRtl(lang);
  const unit = req.nextUrl.searchParams.get("unit") === "g" ? "g" : "oz";

  const [hist, fx] = await Promise.all([getCachedAllHistory(range.yahoo), getCachedFxRates()]);
  const rawRate = cur === "USD" ? 1 : (fx[cur] as number | undefined);
  const rate = typeof rawRate === "number" && Number.isFinite(rawRate) && rawRate > 0 ? rawRate : null;
  if (!rate) return new Response("Unknown currency", { status: 404 });

  const mul = rate * (unit === "g" ? 1 / OZ_G : 1);
  const series = downsample(
    hist.XAU.filter((p) => Number.isFinite(p.close) && p.close > 0),
    420,
  ).map((p) => ({ date: p.date, v: p.close * mul }));
  if (series.length < 2) return new Response("No data", { status: 503 });

  const values = series.map((p) => p.v);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const x = (i: number) => PAD.l + (i / (series.length - 1)) * plotW;
  const y = (v: number) => PAD.t + plotH - ((v - min) / span) * plotH;

  const line = series.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(p.v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(series.length - 1).toFixed(1)} ${(PAD.t + plotH).toFixed(1)} L${PAD.l} ${(PAD.t + plotH).toFixed(1)} Z`;

  const first = series[0];
  const last = series[series.length - 1];
  const change = last.v - first.v;
  const changePct = (change / first.v) * 100;
  const up = change >= 0;
  const frac = last.v > 500 ? 0 : 2;
  const curName = currencyName(cur, lang);
  const unitLabel =
    unit === "g"
      ? pick(lang, { en: "per gram", ar: "للجرام", fr: "le gramme", tr: "gram başına", ur: "فی گرام", hi: "प्रति ग्राम" })
      : pick(lang, { en: "per troy oz", ar: "للأونصة", fr: "l'once troy", tr: "troy ons başına", ur: "فی ٹرائے اونس", hi: "प्रति ट्रॉय औंस" });
  const rangeLabel = pick(lang, range.label);
  const title = pick(lang, {
    en: `Gold price in ${curName} ${unitLabel} · ${rangeLabel}`,
    ar: `سعر الذهب بـ${curName} ${unitLabel} · ${rangeLabel}`,
    fr: `Prix de l'or en ${curName} ${unitLabel} · ${rangeLabel}`,
    tr: `${curName} cinsinden altın fiyatı ${unitLabel} · ${rangeLabel}`,
    ur: `${curName} میں سونے کی قیمت ${unitLabel} · ${rangeLabel}`,
    hi: `${curName} में सोने का भाव ${unitLabel} · ${rangeLabel}`,
  });
  const sub = `${dateLabel(lang, new Date(first.date))} → ${dateLabel(lang, new Date(last.date))}`;
  const gridYs = [0, 0.25, 0.5, 0.75, 1].map((f) => PAD.t + plotH * f);

  const fonts = await loadFontsFor(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0b0a08",
          color: "#f4efe4",
          fontFamily: OG_FONT_FAMILY,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 36,
            left: PAD.l,
            right: PAD.r,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: rtl ? "row-reverse" : "row",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: rtl ? "flex-end" : "flex-start", maxWidth: 780 }}>
            {/* Long titles (Urdu/Hindi currency names) shrink instead of pushing the price off-canvas. */}
            <div style={{ fontSize: title.length > 46 ? 22 : title.length > 36 ? 26 : 30, color: "#b9b2a1" }}>
              {rtlWords(title, rtl)}
            </div>
            <div style={{ fontSize: 20, color: "#8f8875", marginTop: 6 }}>{rtlWords(sub, rtl)}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: rtl ? "flex-start" : "flex-end", flexShrink: 0 }}>
            <div style={{ fontSize: 56, fontWeight: 600, color: "#e2b54e", lineHeight: 1 }}>{fmtNum(last.v, frac)}</div>
            <div style={{ fontSize: 22, color: up ? "#22c55e" : "#ef4444", marginTop: 6 }}>
              {`${up ? "+" : ""}${fmtNum(change, frac)} (${up ? "+" : ""}${changePct.toFixed(1)}%)`}
            </div>
          </div>
        </div>

        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", top: 0, left: 0 }}>
          {gridYs.map((gy) => (
            <line key={gy} x1={PAD.l} x2={W - PAD.r} y1={gy} y2={gy} stroke="#262217" strokeWidth={1} />
          ))}
          <path d={area} fill="#e2b54e" fillOpacity={0.14} />
          <path d={line} fill="none" stroke="#e2b54e" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={x(series.length - 1)} cy={y(last.v)} r={6} fill="#e2b54e" />
        </svg>

        <div style={{ position: "absolute", left: PAD.l, right: PAD.r, top: PAD.t - 26, display: "flex", justifyContent: "space-between", fontSize: 18, color: "#8f8875" }}>
          <div>{fmtNum(max, frac)}</div>
        </div>
        <div style={{ position: "absolute", left: PAD.l, right: PAD.r, top: PAD.t + plotH + 8, display: "flex", justifyContent: "space-between", fontSize: 18, color: "#8f8875" }}>
          <div>{fmtNum(min, frac)}</div>
          <div style={{ color: "#e2b54e" }}>goldpricesarabia.com</div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts,
      headers: {
        "Cache-Control": "public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400",
        "X-Robots-Tag": "all",
      },
    },
  );
}
