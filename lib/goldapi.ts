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

async function callGoldapi<T>(path: string, revalidateSec = 60): Promise<T | null> {
  const key = process.env.GOLDAPI_KEY;
  if (!key) return null;
  try {
    const r = await fetch(`https://www.goldapi.io${path}`, {
      headers: { "x-access-token": key },
      next: { revalidate: revalidateSec },
    });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

export function fetchSpot(metal: "XAU" | "XAG" | "XPT" | "XPD" = "XAU") {
  return callGoldapi<GoldApiResponse>(`/api/${metal}/USD`, 60);
}

export async function fetchMetals(): Promise<MetalsBundle> {
  const [XAU, XAG, XPT, XPD] = await Promise.all([
    fetchSpot("XAU"),
    fetchSpot("XAG"),
    fetchSpot("XPT"),
    fetchSpot("XPD"),
  ]);
  return { XAU, XAG, XPT, XPD };
}

export function fetchHistoricalDay(metal: string, date: string) {
  return callGoldapi<{ price: number; price_gram_24k: number; date: string }>(
    `/api/${metal}/USD/${date}`,
    3600
  );
}
