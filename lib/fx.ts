import { ALL_CURRENCIES } from "./countries";

export type FxRates = {
  USD: number;
  JOD: number;
  SAR: number;
  AED: number;
  EGP: number;
  fetched_at: string;
  source: string;
  [code: string]: number | string;
};

const PRIMARY = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
const FALLBACK = "https://latest.currency-api.pages.dev/v1/currencies/usd.json";

const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.79,
  JPY: 152,
  AUD: 1.51,
  NZD: 1.66,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.2,
  HKD: 7.81,
  SGD: 1.34,
  INR: 83,
  KRW: 1370,
  TWD: 32.5,
  THB: 36.2,
  MYR: 4.69,
  IDR: 16100,
  PHP: 57,
  VND: 25400,
  MMK: 2100,
  MOP: 8.04,
  TRY: 32.5,
  RUB: 92,
  RSD: 109,
  MKD: 57,
  HUF: 360,
  NOK: 10.8,
  SEK: 10.6,
  DKK: 6.95,
  JOD: 0.709,
  SAR: 3.75,
  AED: 3.6725,
  EGP: 48.5,
  KWD: 0.31,
  QAR: 3.64,
  BHD: 0.376,
  ILS: 3.7,
  LBP: 89500,
  LYD: 4.85,
  MXN: 17,
  ARS: 920,
  BRL: 5.05,
  COP: 4100,
  ZAR: 18.5,
  NGN: 1500,
  PKR: 280,
};

async function tryFetch(
  url: string,
): Promise<{ rates: Record<string, number>; date?: string } | null> {
  try {
    const r = await fetch(url, {
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(2500),
    });
    if (!r.ok) return null;
    const data = (await r.json()) as { date?: string; usd?: Record<string, number> };
    if (!data?.usd) return null;
    return { rates: data.usd, date: data.date };
  } catch {
    return null;
  }
}

export async function fetchFxRates(): Promise<FxRates> {
  const data = (await tryFetch(PRIMARY)) ?? (await tryFetch(FALLBACK));

  const out: Record<string, number> = { USD: 1 };
  for (const cur of ALL_CURRENCIES) {
    const apiVal = data?.rates?.[cur.toLowerCase()];
    if (typeof apiVal === "number" && Number.isFinite(apiVal)) {
      out[cur] = apiVal;
    } else {
      out[cur] = FALLBACK_RATES[cur] ?? 1;
    }
  }

  return {
    ...out,
    USD: 1,
    JOD: out.JOD ?? FALLBACK_RATES.JOD,
    SAR: out.SAR ?? FALLBACK_RATES.SAR,
    AED: out.AED ?? FALLBACK_RATES.AED,
    EGP: out.EGP ?? FALLBACK_RATES.EGP,
    fetched_at: data?.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    source: data ? "fawazahmed0/currency-api" : "fallback-static",
  } as FxRates;
}
