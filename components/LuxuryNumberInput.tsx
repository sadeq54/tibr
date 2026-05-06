"use client";

import { Minus, Plus } from "lucide-react";
import { useRef } from "react";

export function LuxuryNumberInput({
  value,
  onChange,
  step = 1,
  min = 0,
  max,
  ariaLabel,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
  ariaLabel?: string;
  suffix?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const clamp = (v: number) => {
    let next = v;
    if (typeof min === "number") next = Math.max(min, next);
    if (typeof max === "number") next = Math.min(max, next);
    return next;
  };

  const decimals = (() => {
    const s = String(step);
    const dot = s.indexOf(".");
    return dot === -1 ? 0 : s.length - dot - 1;
  })();

  function nudge(dir: 1 | -1) {
    const next = clamp(Number((value + step * dir).toFixed(decimals)));
    onChange(next);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <div className="lux-number">
      <button
        type="button"
        className="lux-number-btn"
        aria-label="decrease"
        onClick={() => nudge(-1)}
      >
        <Minus size={14} />
      </button>
      <div className="lux-number-field">
        <input
          ref={inputRef}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : 0}
          step={step}
          min={min}
          max={max}
          aria-label={ariaLabel}
          onChange={(e) => {
            const n = Number(e.target.value);
            onChange(Number.isFinite(n) ? clamp(n) : 0);
          }}
          className="lux-number-input"
        />
        {suffix ? <span className="lux-number-suffix">{suffix}</span> : null}
      </div>
      <button
        type="button"
        className="lux-number-btn"
        aria-label="increase"
        onClick={() => nudge(1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
