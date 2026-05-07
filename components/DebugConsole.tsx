"use client";

import { useEffect } from "react";

import type { FxRates } from "@/lib/fx";
import type { GoldApiResponse, MetalsBundle } from "@/lib/goldapi";

export function DebugConsole({
  spot,
  metals,
  fx,
}: {
  spot: GoldApiResponse | null;
  metals: MetalsBundle;
  fx?: FxRates;
}) {
  useEffect(() => {
    const stamp = new Date().toISOString();
    console.groupCollapsed(`%c[GPA] data fetch @ ${stamp}`, "color:#f5c518;font-weight:600");
    console.log("%csources", "color:#888", {
      metals: "stooq.com (CSV) + swissquote.com (bid/ask XAU)",
      historical: "Yahoo Finance futures (GC=F, SI=F, PL=F, PA=F)",
      fx: fx?.source ?? "unknown",
    });
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
    if (fx) {
      console.table([
        { code: "USD", rate: fx.USD },
        { code: "JOD", rate: fx.JOD },
        { code: "SAR", rate: fx.SAR },
        { code: "AED", rate: fx.AED },
        { code: "EGP", rate: fx.EGP },
      ]);
    }
    console.groupEnd();
  }, [spot, metals, fx]);

  return null;
}
