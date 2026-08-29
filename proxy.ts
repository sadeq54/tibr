import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";
import { SITE_URL } from "./lib/metadata";
import { isKnownDynamicRoute } from "./lib/valid-routes";

const intlMiddleware = createMiddleware(routing);

const LOCALES = new Set<string>(routing.locales);

/**
 * The only hostnames a redirect of ours may point at. `x-forwarded-host` is an
 * ordinary request header — anyone can send one — so a value we have not
 * vouched for would turn this into an open redirect. Checking it against the
 * canonical domain means the Location we write is always our own site, whatever
 * the caller claims.
 */
const CANONICAL_HOSTNAME = new URL(SITE_URL).hostname;
const ALLOWED_HOSTNAMES = new Set([CANONICAL_HOSTNAME, `www.${CANONICAL_HOSTNAME}`]);

/** The public host serving this request, or null if no header names one we own. */
function publicHost(req: NextRequest): string | null {
  for (const header of ["x-forwarded-host", "host"]) {
    const host = first(req.headers.get(header));
    if (host && ALLOWED_HOSTNAMES.has(host.replace(/:\d+$/, "").toLowerCase())) return host;
  }
  return null;
}

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
 * Repoint a self-redirect at the origin the visitor actually asked for.
 *
 * next-intl builds an ABSOLUTE `Location` from `req.nextUrl`, and behind the
 * Coolify proxy that URL carries the container's own listening port — so
 * `/ar/saudi-arabia/gold-price/21k` 307'd to
 * `https://goldpricesarabia.com:3000/saudi-arabia/gold-price/21k`, a port
 * nothing listens on publicly. Every `/ar`-prefixed URL was a dead link for
 * readers and crawlers (Arabic is the unprefixed default, so the whole prefix
 * exists only to redirect away).
 *
 * The forwarded headers say what the visitor typed; trust those over the
 * socket, but only after `publicHost` confirms they name this site. Just
 * self-redirects are touched, so an outbound redirect elsewhere is left alone,
 * and in development no header names the canonical domain, so nothing changes.
 */
function withForwardedOrigin(req: NextRequest, res: NextResponse): NextResponse {
  const location = res.headers.get("location");
  if (!location) return res;

  try {
    const target = new URL(location, req.nextUrl.origin);
    // Local development: the Location is relative or points at the dev server.
    // Nothing to repair, and nothing a stranger can reach.
    if (isLoopback(target.hostname)) return res;

    const host = publicHost(req);
    const forwardedProto = first(req.headers.get("x-forwarded-proto"));
    const proto = forwardedProto === "http" ? "http" : "https";
    // A vouched-for header names the site. Anything else — an unrecognised
    // `Host`, a spoofed `x-forwarded-host` — falls back to the canonical
    // domain, so no request can steer a redirect off the site.
    const canonical = new URL(host ? `${proto}://${host}` : SITE_URL);
    if (target.host === canonical.host && target.protocol === canonical.protocol) return res;
    // Every Location reaching here was written by next-intl for one of OUR
    // routes — this middleware has no off-site redirect — so the origin is
    // ours to impose. That also disarms next-intl's own use of
    // `x-forwarded-host`, which would otherwise send a `//evil.com` or spoofed
    // header straight back to the visitor as a redirect.
    target.protocol = canonical.protocol;
    // `hostname` + `port`, never `host`: the URL host setter only touches the
    // port when the value it is given carries one, so assigning a bare
    // hostname leaves the stray `:3000` exactly where it was.
    target.hostname = canonical.hostname;
    target.port = canonical.port;
    res.headers.set("location", target.toString());
  } catch {
    // A Location we cannot parse is one we have no business rewriting.
  }
  return res;
}

/** Hostnames that only ever mean "this developer's own machine". */
function isLoopback(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  );
}

/** First entry of a possibly comma-joined forwarded header. */
function first(value: string | null): string | null {
  const head = value?.split(",")[0]?.trim();
  return head ? head : null;
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
  return withForwardedOrigin(req, res);
}

export const config = {
  matcher: [
    "/((?!api|charts|social|_next|_vercel|icon|apple-icon|opengraph-image|sitemap.xml|robots.txt|favicon.ico|.*\\..*).*)",
  ],
};
