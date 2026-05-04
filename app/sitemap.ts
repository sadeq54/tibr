import type { MetadataRoute } from "next";

const KARATS = ["24k", "21k", "18k", "14k"];
const COUNTRIES = ["jordan", "saudi-arabia", "uae", "egypt"];
const YEARS = [2024, 2025, 2026];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const root: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "hourly", priority: 1.0 },
    { url: `${base}/ar`, lastModified: now, changeFrequency: "hourly", priority: 1.0 },
  ];

  const karatRoutes = KARATS.flatMap((k) => [
    { url: `${base}/gold-price/${k}`, lastModified: now, changeFrequency: "hourly" as const, priority: 0.9 },
    { url: `${base}/ar/gold-price/${k}`, lastModified: now, changeFrequency: "hourly" as const, priority: 0.9 },
  ]);

  const countryRoutes = COUNTRIES.flatMap((c) =>
    KARATS.map((k) => ({
      url: `${base}/${c}/gold-price/${k}`,
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.85,
    }))
  );

  const arCountryRoutes = COUNTRIES.flatMap((c) =>
    KARATS.map((k) => ({
      url: `${base}/ar/${c}/gold-price/${k}`,
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.85,
    }))
  );

  const histRoutes = YEARS.flatMap((y) => [
    { url: `${base}/historical-gold-prices/${y}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.7 },
    { url: `${base}/ar/historical-gold-prices/${y}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.7 },
  ]);

  return [...root, ...karatRoutes, ...countryRoutes, ...arCountryRoutes, ...histRoutes];
}
