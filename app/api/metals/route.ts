import { NextResponse } from "next/server";

const METALS = ["XAU", "XAG", "XPT", "XPD"] as const;

async function fetchMetal(symbol: string, key: string) {
  const r = await fetch(`https://www.goldapi.io/api/${symbol}/USD`, {
    headers: { "x-access-token": key },
    next: { revalidate: 60 },
  });
  if (!r.ok) return null;
  return r.json();
}

export async function GET() {
  const key = process.env.GOLDAPI_KEY;
  if (!key) return NextResponse.json({ error: "missing GOLDAPI_KEY" }, { status: 500 });

  const results = await Promise.all(METALS.map((m) => fetchMetal(m, key)));
  const out = METALS.reduce<Record<string, unknown>>((acc, m, i) => {
    acc[m] = results[i];
    return acc;
  }, {});

  return NextResponse.json({ metals: out, fetched_at: new Date().toISOString() });
}
