export type CryptoMeta = {
  id: string;
  symbol: string;
  name_en: string;
  name_ar: string;
  slug: string;
};

export const CRYPTO_LIST: CryptoMeta[] = [
  { id: "bitcoin", symbol: "BTC", name_en: "Bitcoin", name_ar: "بيتكوين", slug: "bitcoin" },
  { id: "ethereum", symbol: "ETH", name_en: "Ethereum", name_ar: "إيثيريوم", slug: "ethereum" },
  { id: "tether", symbol: "USDT", name_en: "Tether", name_ar: "تيثر", slug: "tether" },
  { id: "binancecoin", symbol: "BNB", name_en: "Binance Coin", name_ar: "بينانس كوين", slug: "binancecoin" },
  { id: "ripple", symbol: "XRP", name_en: "Ripple", name_ar: "ريبل", slug: "ripple" },
  { id: "usd-coin", symbol: "USDC", name_en: "USD Coin", name_ar: "يو إس دي كوين", slug: "usd-coin" },
  { id: "solana", symbol: "SOL", name_en: "Solana", name_ar: "سولانا", slug: "solana" },
  { id: "tron", symbol: "TRX", name_en: "TRON", name_ar: "ترون", slug: "tron" },
  { id: "dogecoin", symbol: "DOGE", name_en: "Dogecoin", name_ar: "دوجكوين", slug: "dogecoin" },
];

export const CRYPTO_BY_SLUG: Record<string, CryptoMeta> = Object.fromEntries(
  CRYPTO_LIST.map((c) => [c.slug, c]),
);

export type CryptoQuote = {
  id: string;
  symbol: string;
  name: string;
  price_usd: number;
  change_24h: number;
  market_cap: number;
  rank: number;
  volume_24h: number;
  high_24h: number;
  low_24h: number;
  ath: number;
  image?: string;
};

const CG_BASE = "https://api.coingecko.com/api/v3";

export async function fetchCryptos(): Promise<CryptoQuote[]> {
  const ids = CRYPTO_LIST.map((c) => c.id).join(",");
  try {
    const r = await fetch(
      `${CG_BASE}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`,
      {
        next: { revalidate: 300 },
        headers: { "User-Agent": "Mozilla/5.0 GoldPricesArabia/1.0" },
      },
    );
    if (!r.ok) return [];
    const data = (await r.json()) as Array<{
      id: string;
      symbol: string;
      name: string;
      current_price: number;
      price_change_percentage_24h: number | null;
      market_cap: number;
      market_cap_rank: number;
      total_volume: number;
      high_24h: number;
      low_24h: number;
      ath: number;
      image: string;
    }>;
    return data.map((c) => ({
      id: c.id,
      symbol: c.symbol.toUpperCase(),
      name: c.name,
      price_usd: c.current_price,
      change_24h: c.price_change_percentage_24h ?? 0,
      market_cap: c.market_cap,
      rank: c.market_cap_rank,
      volume_24h: c.total_volume,
      high_24h: c.high_24h,
      low_24h: c.low_24h,
      ath: c.ath,
      image: c.image,
    }));
  } catch {
    return [];
  }
}

export async function fetchCryptoBySlug(slug: string): Promise<CryptoQuote | null> {
  const meta = CRYPTO_BY_SLUG[slug];
  if (!meta) return null;
  const all = await fetchCryptos();
  return all.find((c) => c.id === meta.id) ?? null;
}
