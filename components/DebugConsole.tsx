"use client";

import { useEffect } from "react";

import type { GoldApiResponse, MetalsBundle } from "@/lib/goldapi";

export function DebugConsole({ spot, metals }: { spot: GoldApiResponse | null; metals: MetalsBundle }) {
  useEffect(() => {
    const stamp = new Date().toISOString();
    console.groupCollapsed(`%c[Tibr] data fetch @ ${stamp}`, "color:#f5c518;font-weight:600");
    console.log("%csource", "color:#888", "goldapi.io");
    console.log("%cendpoint XAU", "color:#888", "https://www.goldapi.io/api/XAU/USD");
    console.log("%cspot", "color:#888", spot);
    if (metals) {
      console.table(
        Object.entries(metals).map(([sym, m]) => ({
          metal: sym,
          price_oz: m?.price ?? null,
          ch: m?.ch ?? null,
          chp: m?.chp ?? null,
          exchange: m?.exchange ?? null,
        }))
      );
    }
    console.groupEnd();
  }, [spot, metals]);

  return null;
}
