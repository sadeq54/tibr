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
  // Next 16 PPR + dynamic-by-default. Required by `"use cache"` directives in
  // app/api/spot and app/api/metals. Note: the prerendered HTML shell still
  // streams dynamic content via RSC, so non-JS crawlers (some AI bots) only
  // see the static `<head>` (title/description/canonical/hreflang/JSON-LD) —
  // body content arrives in RSC flight chunks that Googlebot and Bingbot can
  // render. Migrating to fully static ISR would require dropping live
  // WebSocket data and is left as a separate task.
  cacheComponents: true,
  async headers() {
    return [
      {
        source: "/:locale/widgets/embed/:widget*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "X-Frame-Options", value: "ALLOWALL" },
        ],
      },
      {
        source: "/widgets/embed/:widget*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "X-Frame-Options", value: "ALLOWALL" },
        ],
      },
      {
        source: "/((?!widgets/embed).*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
