import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Next 16: top-level flag (replaces experimental.ppr).
  // Enables dynamic-by-default rendering w/ Suspense streaming so per-section
  // skeletons actually paint while server fetches resolve.
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
    ];
  },
};

export default withNextIntl(nextConfig);
