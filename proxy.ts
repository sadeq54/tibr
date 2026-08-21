import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";
import { isKnownDynamicRoute } from "./lib/valid-routes";

const intlMiddleware = createMiddleware(routing);

const LOCALES = new Set<string>(routing.locales);

/**
 * Reject unknown values in our dynamic routes with a real 404.
 *
 * Under `cacheComponents` (PPR) the prerendered shell is flushed with status
 * 200 before the page can call `notFound()`, and Next 16 forbids
 * `dynamicParams = false` with it — so `/en/lebanon/gold-price/21k-1` rendered
 * a 200 page titled "(21K-1)" with a self-canonical. Search Console counted 47
 * such soft 404s. Middleware runs before rendering, so the status is ours to
 * set here.
 */
function rejectUnknownRoute(req: NextRequest): NextResponse | null {
  const segments = req.nextUrl.pathname.split("/").filter(Boolean);
  const locale = segments.length && LOCALES.has(segments[0]) ? segments.shift()! : routing.defaultLocale;
  if (isKnownDynamicRoute(segments)) return null;
  // Rewrite to a path no route matches, but keep the locale segment so the
  // translated `app/[locale]/not-found.tsx` renders instead of the bare
  // fallback. The explicit status keeps it a hard 404 for crawlers.
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}/__not-found`;
  return NextResponse.rewrite(url, { status: 404 });
}

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
  const rejected = rejectUnknownRoute(req);
  if (rejected) return rejected;

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
