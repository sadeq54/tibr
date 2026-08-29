import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Build output dir. Overridable so a locked/held `.next` (Windows file locks
  // from a stray shell or editor) can't block a verification build:
  //   NEXT_DIST_DIR=.next-check npm run build && NEXT_DIST_DIR=.next-check npx next start
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Self-host (Docker/Coolify): emit .next/standalone with a traced server.js
  // so the runtime image ships without full node_modules. Netlify's runtime
  // forces standalone internally anyway, so this is a no-op there.
  output: "standalone",
  // Next 16 PPR + dynamic-by-default. Required by `"use cache"` directives in
  // app/api/spot and app/api/metals. Note: the prerendered HTML shell still
  // streams dynamic content via RSC, so non-JS crawlers (some AI bots) only
  // see the static `<head>` (title/description/canonical/hreflang/JSON-LD) —
  // body content arrives in RSC flight chunks that Googlebot and Bingbot can
  // render. Migrating to fully static ISR would require dropping live
  // WebSocket data and is left as a separate task.
  cacheComponents: true,
  // Drop X-Powered-By: Next header — leaks framework info, flagged by SEO audits.
  poweredByHeader: false,
  // Run third-party scripts (GTM/GA/Pixel) in a Web Worker via Partytown.
  // Frees main thread → improves INP + LCP. Requires `@builder.io/partytown`
  // and `partytown copylib public/~partytown` (wired in `postinstall`).
  experimental: {
    nextScriptWorkers: true,
  },
  // Modern image formats (AVIF/WebP) + auto-sized device variants for LCP.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [16, 32, 64, 96, 128, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Smaller HTML + JS via React compiler + better tree-shaking for Next 16.
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  async redirects() {
    return [
      // Legacy WebSocket embed widgets were removed — they cannot run inside an
      // iframe after the LivePriceProvider iframe guard. 301 any old embed code
      // (grabbed during the dev phase) to the new polling ticker, never a 404.
      {
        source: "/widgets/embed/:path*",
        destination: "/embed/ticker",
        statusCode: 301,
      },
      {
        source: "/en/widgets/embed/:path*",
        destination: "/en/embed/ticker",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      // Embed routes must be iframable on ANY partner domain. `frame-ancestors *`
      // is the real control; X-Frame-Options is set permissive for old browsers.
      // CRITICAL: these routes must NOT receive the global X-Frame-Options:
      // SAMEORIGIN below, or cross-origin embedding breaks in production.
      {
        source: "/:locale(en)/embed/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "X-Frame-Options", value: "ALLOWALL" },
        ],
      },
      {
        source: "/embed/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "X-Frame-Options", value: "ALLOWALL" },
        ],
      },
      {
        // Strict security headers for everything EXCEPT the embed routes.
        source: "/((?!(?:en/)?embed/).*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
