export type GoldApiResponse = {
  timestamp: number;
  metal: string;
  currency: string;
  exchange: string;
  symbol: string;
  prev_close_price: number;
  open_price: number;
  low_price: number;
  high_price: number;
  open_time: number;
  price: number;
  ch: number;
  chp: number;
  ask: number;
  bid: number;
  price_gram_24k: number;
  price_gram_22k: number;
  price_gram_21k: number;
  price_gram_20k: number;
  price_gram_18k: number;
  price_gram_16k: number;
  price_gram_14k: number;
  price_gram_10k: number;
};

export type MetalsBundle = {
  XAU: GoldApiResponse | null;
  XAG: GoldApiResponse | null;
  XPT: GoldApiResponse | null;
  XPD: GoldApiResponse | null;
};

export const METAL_META: Record<string, { name: string; nameAr: string; tint: string; symbol: string }> = {
  XAU: { name: "Gold", nameAr: "ذهب", tint: "#f5c518", symbol: "Au" },
  XAG: { name: "Silver", nameAr: "فضة", tint: "#c0c0c0", symbol: "Ag" },
  XPT: { name: "Platinum", nameAr: "بلاتين", tint: "#a8c0d8", symbol: "Pt" },
  XPD: { name: "Palladium", nameAr: "بالاديوم", tint: "#7ec4ae", symbol: "Pd" },
};

const OZ_TO_GRAM = 31.1034768;

const PURITY = {
  k24: 1.0,
  k22: 0.917,
  k21: 0.875,
  k20: 0.833,
  k18: 0.75,
  k16: 0.667,
  k14: 0.583,
  k10: 0.417,
};

const STOOQ_QUOTE = "https://stooq.com/q/l/?s=xauusd+xagusd+xptusd+xpdusd&f=sd2t2ohlcpv&h&e=csv";
const SWISSQUOTE_XAU = "https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD";

type StooqRow = {
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  prev: number;
  ts: number;
};

type SwissquoteRow = { bid: number; ask: number };

async function fetchStooq(): Promise<Record<string, StooqRow>> {
  try {
    // 120s shared edge cache. Stooq updates per minute; 2-min lag tolerable
    // for SEO/auditor speed wins. Live WebSocket gives sub-second to logged-in
    // users via /api/spot anyway.
    const r = await fetch(STOOQ_QUOTE, {
      next: { revalidate: 120 },
      headers: { "User-Agent": "Mozilla/5.0 GoldPricesArabia/1.0" },
      signal: AbortSignal.timeout(2500),
    });
    if (!r.ok) return {};
    const text = await r.text();
    const lines = text.trim().split(/\r?\n/);
    const out: Record<string, StooqRow> = {};
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",");
      if (cols.length < 8) continue;
      const [symbol, date, time, open, high, low, close, prev] = cols;
      const ts = Math.floor(Date.parse(`${date}T${time}Z`) / 1000);
      const c = Number(close);
      if (!Number.isFinite(c)) continue;
      out[symbol] = {
        symbol,
        open: Number(open),
        high: Number(high),
        low: Number(low),
        close: c,
        prev: Number(prev) || c,
        ts: Number.isFinite(ts) ? ts : Math.floor(Date.now() / 1000),
      };
    }
    return out;
  } catch {
    return {};
  }
}

async function fetchSwissquoteXAU(): Promise<SwissquoteRow | null> {
  try {
    const r = await fetch(SWISSQUOTE_XAU, {
      next: { revalidate: 120 },
      headers: { "User-Agent": "Mozilla/5.0 GoldPricesArabia/1.0" },
      signal: AbortSignal.timeout(2500),
    });
    if (!r.ok) return null;
    const data = (await r.json()) as Array<{
      spreadProfilePrices: Array<{ bid: number; ask: number; spreadProfile: string }>;
    }>;
    for (const layer of data) {
      const std = layer.spreadProfilePrices?.find((s) => s.spreadProfile === "standard");
      if (std) return { bid: std.bid, ask: std.ask };
      const first = layer.spreadProfilePrices?.[0];
      if (first) return { bid: first.bid, ask: first.ask };
    }
    return null;
  } catch {
    return null;
  }
}

function buildResponse(
  metal: "XAU" | "XAG" | "XPT" | "XPD",
  row: StooqRow,
  bidAsk: SwissquoteRow | null
): GoldApiResponse {
  const close = row.close;
  const grams = close / OZ_TO_GRAM;
  const fallbackSpread = close * 0.0005;
  const bid = bidAsk?.bid ?? close - fallbackSpread;
  const ask = bidAsk?.ask ?? close + fallbackSpread;

  return {
    timestamp: row.ts,
    metal,
    currency: "USD",
    exchange: "STOOQ",
    symbol: `STOOQ:${metal}USD`,
    prev_close_price: row.prev,
    open_price: row.open,
    low_price: row.low,
    high_price: row.high,
    open_time: row.ts,
    price: close,
    ch: +(close - row.prev).toFixed(4),
    chp: row.prev ? +(((close - row.prev) / row.prev) * 100).toFixed(4) : 0,
    ask,
    bid,
    price_gram_24k: +(grams * PURITY.k24).toFixed(4),
    price_gram_22k: +(grams * PURITY.k22).toFixed(4),
    price_gram_21k: +(grams * PURITY.k21).toFixed(4),
    price_gram_20k: +(grams * PURITY.k20).toFixed(4),
    price_gram_18k: +(grams * PURITY.k18).toFixed(4),
    price_gram_16k: +(grams * PURITY.k16).toFixed(4),
    price_gram_14k: +(grams * PURITY.k14).toFixed(4),
    price_gram_10k: +(grams * PURITY.k10).toFixed(4),
  };
}

export async function fetchSpot(
  metal: "XAU" | "XAG" | "XPT" | "XPD" = "XAU"
): Promise<GoldApiResponse | null> {
  const [stooq, sq] = await Promise.all([
    fetchStooq(),
    metal === "XAU" ? fetchSwissquoteXAU() : Promise.resolve(null),
  ]);
  const row = stooq[`${metal}USD`];
  if (!row) return null;
  return buildResponse(metal, row, sq);
}

export async function fetchMetals(): Promise<MetalsBundle> {
  const [stooq, sq] = await Promise.all([fetchStooq(), fetchSwissquoteXAU()]);
  const get = (m: "XAU" | "XAG" | "XPT" | "XPD") => {
    const row = stooq[`${m}USD`];
    if (!row) return null;
    return buildResponse(m, row, m === "XAU" ? sq : null);
  };
  return { XAU: get("XAU"), XAG: get("XAG"), XPT: get("XPT"), XPD: get("XPD") };
}

export async function fetchHistoricalDay(_metal: string, _date: string) {
  return null;
}
