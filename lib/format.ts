export function fmtUSD(n: number, frac = 2) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: frac, maximumFractionDigits: frac })}`;
}

export function fmtCurrency(prefix: string, n: number, frac = 2) {
  return `${prefix} ${n.toLocaleString("en-US", { minimumFractionDigits: frac, maximumFractionDigits: frac })}`;
}

export function fmtChange(n: number) {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}`;
}
