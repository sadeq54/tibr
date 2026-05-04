"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const KARATS = [
  { key: "24K", field: "price_gram_24k" as const },
  { key: "21K", field: "price_gram_21k" as const },
  { key: "18K", field: "price_gram_18k" as const },
  { key: "14K", field: "price_gram_14k" as const },
];

const CURRENCIES = [
  { code: "USD", rate: 1, symbol: "$" },
  { code: "JOD", rate: 0.709, symbol: "JD" },
  { code: "SAR", rate: 3.75, symbol: "SR" },
  { code: "AED", rate: 3.6725, symbol: "AED" },
  { code: "EGP", rate: 48.5, symbol: "EGP" },
];

const UNITS = [
  { id: "g", factor: 1 },
  { id: "oz", factor: 31.1034768 },
  { id: "kg", factor: 1000 },
] as const;

type Spot = Record<string, number>;

export function Calculator({ spot }: { spot: Spot }) {
  const t = useTranslations("Calculator");
  const [karatField, setKaratField] = useState<typeof KARATS[number]["field"]>("price_gram_24k");
  const [unit, setUnit] = useState<typeof UNITS[number]["id"]>("g");
  const [currency, setCurrency] = useState("USD");
  const [qty, setQty] = useState(10);

  const result = useMemo(() => {
    const perGramUsd = spot[karatField] ?? 0;
    const factor = UNITS.find((u) => u.id === unit)?.factor ?? 1;
    const grams = qty * factor;
    const usd = grams * perGramUsd;
    const rate = CURRENCIES.find((c) => c.code === currency)?.rate ?? 1;
    return { usd, value: usd * rate, perGramUsd, grams };
  }, [karatField, unit, currency, qty, spot]);

  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "$";

  return (
    <section
      aria-labelledby="calc-heading"
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
    >
      <h2 id="calc-heading" className="text-xl font-semibold text-[var(--color-text)]">
        {t("heading")}
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t("subtitle")}</p>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <Field label={t("qty")}>
          <input
            type="number"
            min={0}
            step="0.01"
            value={qty}
            onChange={(e) => setQty(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-md border border-[var(--color-border-strong)] bg-black/40 px-3 py-2 font-mono text-sm text-[var(--color-text)] focus:border-[var(--color-gold)] focus:outline-none"
          />
        </Field>

        <Field label={t("unit")}>
          <Select
            value={unit}
            onChange={(v) => setUnit(v as typeof unit)}
            options={UNITS.map((u) => ({ value: u.id, label: t(`units.${u.id}` as "units.g") }))}
          />
        </Field>

        <Field label={t("karat")}>
          <Select
            value={karatField}
            onChange={(v) => setKaratField(v as typeof karatField)}
            options={KARATS.map((k) => ({
              value: k.field,
              label: t(`karatLabels.${k.key}` as "karatLabels.24K"),
            }))}
          />
        </Field>

        <Field label={t("currency")}>
          <Select
            value={currency}
            onChange={setCurrency}
            options={CURRENCIES.map((c) => ({ value: c.code, label: c.code }))}
          />
        </Field>
      </div>

      <div className="mt-5 rounded-lg border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 p-4">
        <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
          {t("estimated")}
        </div>
        <div className="mt-1 font-mono text-3xl font-bold text-[var(--color-gold)]">
          {symbol}{" "}
          {result.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="mt-1 text-xs text-[var(--color-text-muted)]">
          {t("breakdown", {
            grams: result.grams.toFixed(2),
            perG: result.perGramUsd.toFixed(4),
            usd: result.usd.toFixed(2),
          })}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-[var(--color-border-strong)] bg-black/40 px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-gold)] focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-black">
          {o.label}
        </option>
      ))}
    </select>
  );
}
