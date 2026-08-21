import { ADSENSE_PUB_ID } from "@/lib/ads";

/**
 * /ads.txt — authorised-seller declaration AdSense requires. Derived from the
 * same env var as the script, so the two can never disagree. Returns 404
 * until the publisher id is configured (a wrong ads.txt is worse than none).
 */
export function GET() {
  if (!ADSENSE_PUB_ID) return new Response("Not configured", { status: 404 });
  const body = `google.com, ${ADSENSE_PUB_ID}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
