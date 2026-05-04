import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.GOLDAPI_KEY;
  if (!key) return NextResponse.json({ error: "missing GOLDAPI_KEY" }, { status: 500 });

  const r = await fetch("https://www.goldapi.io/api/XAU/USD", {
    headers: { "x-access-token": key },
    next: { revalidate: 60 },
  });
  if (!r.ok) return NextResponse.json({ error: "upstream failed" }, { status: 502 });

  const data = await r.json();
  return NextResponse.json({ ...data, fetched_at: new Date().toISOString() });
}
