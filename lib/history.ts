export type HistoricalPoint = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

const YAHOO_SYMBOL: Record<string, string> = {
  XAU: "GC=F",
  XAG: "SI=F",
  XPT: "PL=F",
  XPD: "PA=F",
};

const YAHOO_BASE = "https://query1.finance.yahoo.com/v8/finance/chart";

type YahooResponse = {
  chart: {
    result: Array<{
      timestamp: number[];
      indicators: {
        quote: Array<{
          open: (number | null)[];
          high: (number | null)[];
          low: (number | null)[];
          close: (number | null)[];
        }>;
      };
    }> | null;
    error: unknown;
  };
};

export type HistoryRange = "1mo" | "3mo" | "6mo" | "1y" | "5y";

export type MetalHistory = Record<"XAU" | "XAG" | "XPT" | "XPD", HistoricalPoint[]>;

export async function fetchAllHistory(range: HistoryRange = "1y"): Promise<MetalHistory> {
  const metals: Array<"XAU" | "XAG" | "XPT" | "XPD"> = ["XAU", "XAG", "XPT", "XPD"];
  const results = await Promise.all(metals.map((m) => fetchHistory(m, range)));
  return { XAU: results[0], XAG: results[1], XPT: results[2], XPD: results[3] };
}

export async function fetchHistory(
  metal: "XAU" | "XAG" | "XPT" | "XPD" = "XAU",
  range: HistoryRange = "1y"
): Promise<HistoricalPoint[]> {
  const sym = YAHOO_SYMBOL[metal];
  if (!sym) return [];

  try {
    const url = `${YAHOO_BASE}/${encodeURIComponent(sym)}?range=${range}&interval=1d`;
    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; GoldPricesArabiaBot/1.0)",
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
      // Cap upstream latency. Yahoo from some Netlify regions can hang
      // for >10s; without a timeout the whole chart Suspense boundary blocks.
      signal: AbortSignal.timeout(3000),
    });
    if (!r.ok) return [];
    const data = (await r.json()) as YahooResponse;
    const result = data.chart?.result?.[0];
    if (!result) return [];

    const ts = result.timestamp ?? [];
    const q = result.indicators?.quote?.[0];
    if (!q) return [];

    const points: HistoricalPoint[] = [];
    for (let i = 0; i < ts.length; i++) {
      const o = q.open[i];
      const h = q.high[i];
      const l = q.low[i];
      const c = q.close[i];
      if (
        o == null ||
        h == null ||
        l == null ||
        c == null ||
        !Number.isFinite(o) ||
        !Number.isFinite(c)
      ) {
        continue;
      }
      const date = new Date(ts[i] * 1000).toISOString().slice(0, 10);
      points.push({ date, open: o, high: h, low: l, close: c });
    }
    return points;
  } catch {
    return [];
  }
}
