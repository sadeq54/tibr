/**
 * /api/indexnow — proxy endpoint for the IndexNow protocol (Bing + Yandex
 * push-indexing). Call POST /api/indexnow with `{ urls: ["https://..."] }`
 * after publishing or updating high-value content. Set INDEXNOW_KEY in env;
 * the matching key file is also exposed at /{INDEXNOW_KEY}.txt.
 *
 * IndexNow docs: https://www.indexnow.org/
 */
import { NextResponse } from "next/server";

import { SITE_URL } from "@/lib/metadata";

const KEY = process.env.INDEXNOW_KEY ?? "";
const HOST = new URL(SITE_URL).hostname;

export async function POST(req: Request) {
  if (!KEY) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY env var not set" },
      { status: 500 },
    );
  }
  let body: { urls?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON" }, { status: 400 });
  }
  const urls = Array.isArray(body.urls) ? body.urls.filter((u) => typeof u === "string") : [];
  if (urls.length === 0) {
    return NextResponse.json({ error: "Provide urls: string[]" }, { status: 400 });
  }
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList: urls,
  };
  const upstream = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return NextResponse.json(
    { submitted: urls.length, upstream_status: upstream.status },
    { status: upstream.ok ? 200 : 502 },
  );
}
