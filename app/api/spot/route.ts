import { NextResponse } from "next/server";
import { cacheLife } from "next/cache";

import { fetchSpot } from "@/lib/goldapi";

async function getCachedSpot() {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 300 });
  return await fetchSpot("XAU");
}

export async function GET() {
  const data = await getCachedSpot();
  if (!data) return NextResponse.json({ error: "upstream failed" }, { status: 502 });
  return NextResponse.json({ ...data, fetched_at: new Date().toISOString() });
}
