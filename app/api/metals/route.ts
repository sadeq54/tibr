import { NextResponse } from "next/server";
import { cacheLife } from "next/cache";

import { fetchMetals } from "@/lib/goldapi";

async function getCachedMetals() {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 300 });
  return await fetchMetals();
}

export async function GET() {
  const metals = await getCachedMetals();
  return NextResponse.json({ metals, fetched_at: new Date().toISOString() });
}
