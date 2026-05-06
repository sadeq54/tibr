import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Next 16: top-level flag (replaces experimental.ppr).
  // Enables dynamic-by-default rendering w/ Suspense streaming so per-section
  // skeletons actually paint while server fetches resolve.
  cacheComponents: true,
};

export default withNextIntl(nextConfig);
