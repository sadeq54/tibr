export type FxRates = {
  USD: number;
  JOD: number;
  SAR: number;
  AED: number;
  EGP: number;
  fetched_at: string;
  source: string;
};

const PRIMARY = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
const FALLBACK = "https://latest.currency-api.pages.dev/v1/currencies/usd.json";

const FALLBACK_RATES: FxRates = {
  USD: 1,
  JOD: 0.709,
  SAR: 3.75,
  AED: 3.6725,
  EGP: 48.5,
  fetched_at: new Date(0).toISOString(),
  source: "fallback-static",
};

async function tryFetch(url: string): Promise<{ jod: number; sar: number; aed: number; egp: number; date?: string } | null> {
  try {
    const r = await fetch(url, { next: { revalidate: 3600 } });
    if (!r.ok) return null;
    const data = (await r.json()) as { date?: string; usd: Record<string, number> };
    const usd = data.usd;
    if (!usd) return null;
    const jod = usd.jod;
    const sar = usd.sar;
    const aed = usd.aed;
    const egp = usd.egp;
    if (![jod, sar, aed, egp].every((v) => Number.isFinite(v))) return null;
    return { jod, sar, aed, egp, date: data.date };
  } catch {
    return null;
  }
}

export async function fetchFxRates(): Promise<FxRates> {
  const data = (await tryFetch(PRIMARY)) ?? (await tryFetch(FALLBACK));
  if (!data) return FALLBACK_RATES;
  return {
    USD: 1,
    JOD: data.jod,
    SAR: data.sar,
    AED: data.aed,
    EGP: data.egp,
    fetched_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    source: "fawazahmed0/currency-api",
  };
}
