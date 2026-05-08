"use client";

import dynamic from "next/dynamic";

import { PriceChartSkeleton } from "@/components/skeletons";

export const PriceChart = dynamic(
  () => import("./PriceChartClient").then((m) => ({ default: m.PriceChartClient })),
  { ssr: false, loading: () => <PriceChartSkeleton /> }
);
