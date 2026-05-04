import { NextResponse } from "next/server";

import { fetchMetals } from "@/lib/goldapi";

export const revalidate = 60;

export async function GET() {
  const metals = await fetchMetals();
  return NextResponse.json({ metals, fetched_at: new Date().toISOString() });
}
