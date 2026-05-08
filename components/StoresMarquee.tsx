"use client";

import dynamic from "next/dynamic";

export const StoresMarquee = dynamic(
  () => import("./StoresMarqueeClient").then((m) => ({ default: m.StoresMarqueeClient })),
  { ssr: false, loading: () => null }
);
