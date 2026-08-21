import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * next-intl handles locale routing. We additionally expose the original
 * pathname to Server Components (Header country detection, SiteJsonLd,
 * FooterGate / AnalyticsGate embed checks) via `headers().get("x-pathname")`.
 *
 * Setting the header on the RESPONSE only reaches the browser. To reach the
 * request pipeline we must use Next's middleware request-header override
 * protocol: list every forwarded header name in `x-middleware-override-headers`
 * and supply values as `x-middleware-request-<name>`. This is what
 * `NextResponse.next({ request: { headers } })` does under the hood — we apply
 * it to next-intl's response so its rewrite/redirect decision is preserved.
 */
export default function middleware(req: NextRequest) {
  const res = intlMiddleware(req);
  if (!res) return res;

  const pathname = req.nextUrl.pathname;
  const names = new Set<string>();
  req.headers.forEach((_v, k) => names.add(k.toLowerCase()));
  const existing = res.headers.get("x-middleware-override-headers");
  if (existing) for (const n of existing.split(",")) names.add(n.trim().toLowerCase());
  names.add("x-pathname");

  res.headers.set("x-middleware-override-headers", [...names].join(","));
  res.headers.set("x-middleware-request-x-pathname", pathname);
  // Keep the response header too — harmless, and handy for debugging.
  res.headers.set("x-pathname", pathname);
  return res;
}

export const config = {
  matcher: [
    "/((?!api|charts|_next|_vercel|icon|apple-icon|opengraph-image|sitemap.xml|robots.txt|favicon.ico|.*\\..*).*)",
  ],
};
