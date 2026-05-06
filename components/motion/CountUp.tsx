"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

export function CountUp({
  value,
  decimals = 2,
  prefix = "",
  suffix = "",
  duration = 1.1,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // Initialize at final value so SSR + client first render match.
  const mv = useMotionValue(value);
  const ranOnce = useRef(false);

  const display = useTransform(mv, (latest) => {
    const n = Number.isFinite(latest) ? latest : 0;
    return `${prefix}${n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;
  });

  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    if (!ranOnce.current) {
      // First post-mount run: count up from 0 to value.
      ranOnce.current = true;
      mv.set(0);
    }
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [value, duration, mv, reduce]);

  return <motion.span className={className}>{display}</motion.span>;
}
