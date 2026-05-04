import { NextResponse } from "next/server";

import { fetchSpot } from "@/lib/goldapi";

export const revalidate = 60;

export async function GET() {
  const data = await fetchSpot("XAU");
  if (!data) return NextResponse.json({ error: "upstream failed" }, { status: 502 });
  return NextResponse.json({ ...data, fetched_at: new Date().toISOString() });
}
