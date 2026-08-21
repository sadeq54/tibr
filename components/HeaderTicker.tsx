"use client";

import { useLivePrice } from "@/components/LivePriceProvider";

/**
 * Glanceable live XAU/USD chip for the site header.
 * Renders a shimmer placeholder until the first WebSocket tick lands,
 * so there is no hydration flash and no layout shift.
 */
export function HeaderTicker() {
  const live = useLivePrice();
  const xau = live.xau;
  const chp = live.changePct24;

  if (xau === null) {
    return <span aria-hidden className="skeleton hidden h-7 w-32 rounded-full lg:block" />;
  }

  const up = (chp ?? 0) >= 0;
  const trend = up ? "var(--color-up)" : "var(--color-down)";

  return (
    <span
      dir="ltr"
      className="num hidden items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] py-1 ps-2.5 pe-1.5 font-mono text-xs lg:inline-flex"
      title="XAU/USD live"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: trend }}
        />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: trend }} />
      </span>
      <span className="font-semibold text-[var(--color-text)]">
        ${xau.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span
        className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
        style={{ color: trend, background: `color-mix(in srgb, ${trend} 12%, transparent)` }}
      >
        {up ? "+" : ""}
        {(chp ?? 0).toFixed(2)}%
      </span>
    </span>
  );
}
