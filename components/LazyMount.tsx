"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mounts children only when the placeholder scrolls within `rootMargin` of the
 * viewport. Use for heavy below-fold widgets that don't need to be in the
 * initial JS bundle execution (TradingView, PriceChart, Calculator, WS streams).
 *
 * Significantly improves Lighthouse Speed Index + TBT by deferring widget
 * JS parsing/execution until the user is about to see the widget.
 *
 *   <LazyMount minHeight={400} rootMargin="200px">
 *     <TradingViewChart />
 *   </LazyMount>
 */
export function LazyMount({
  children,
  minHeight = 300,
  rootMargin = "300px",
  fallback,
  className,
}: {
  children: React.ReactNode;
  minHeight?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    // Fallback for browsers without IntersectionObserver (very rare).
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={visible ? undefined : { minHeight }}
    >
      {visible ? children : fallback ?? null}
    </div>
  );
}
