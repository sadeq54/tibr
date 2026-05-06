"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export type LuxOption = { value: string; label: string; hint?: string };

export function LuxurySelect({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: LuxOption[];
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number>(() =>
    Math.max(0, options.findIndex((o) => o.value === value))
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  useEffect(() => {
    setHighlight(Math.max(0, options.findIndex((o) => o.value === value)));
  }, [value, options]);

  useEffect(() => {
    if (!open) return;
    function handlePointer(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => (h + 1) % options.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => (h - 1 + options.length) % options.length);
      } else if (e.key === "Home") {
        e.preventDefault();
        setHighlight(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setHighlight(options.length - 1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const opt = options[highlight];
        if (opt) {
          onChange(opt.value);
          setOpen(false);
          buttonRef.current?.focus();
        }
      }
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, options, onChange, highlight]);

  const current = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className="lux-select">
      <button
        ref={buttonRef}
        type="button"
        className="lux-trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lux-current">{current?.label ?? value}</span>
        <ChevronDown size={14} className={"lux-chev " + (open ? "lux-chev-open" : "")} />
      </button>
      {open && (
        <ul id={listboxId} className="lux-popover" role="listbox">
          {options.map((o, i) => {
            const selected = o.value === value;
            const active = i === highlight;
            return (
              <li
                key={o.value}
                role="option"
                aria-selected={selected}
                className={
                  "lux-option" +
                  (active ? " lux-option-active" : "") +
                  (selected ? " lux-option-selected" : "")
                }
                onMouseEnter={() => setHighlight(i)}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                <span className="lux-option-text">
                  <span>{o.label}</span>
                  {o.hint && <span className="lux-hint">{o.hint}</span>}
                </span>
                {selected ? <Check size={14} className="lux-check" /> : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
