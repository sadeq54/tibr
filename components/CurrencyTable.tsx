import { Flag } from "@/components/Flag";
import { Link } from "@/i18n/navigation";
import { COUNTRIES } from "@/lib/countries";
import type { FxRates } from "@/lib/fx";
import type { GoldApiResponse } from "@/lib/goldapi";
import { OZ_G, currencyName, fmtNum, gramUsd } from "@/lib/seo";

import { karatLabel } from "@/lib/karat-label";

import { currencyIntro, tableText } from "./tables.i18n";

/** Currencies shown, in display order; each resolves to its country page. */
const MAJOR = [
  "USD", "SAR", "AED", "EGP", "JOD", "KWD", "QAR", "BHD",
  "GBP", "EUR", "TRY", "INR", "PKR", "MAD", "LYD", "LBP",
];

const COLS = ["24k", "22k", "21k", "18k"] as const;

/**
 * "Gold price in every currency" table — goldprice.org's core promise, done
 * as a real <table> with per-karat gram prices and a link into each market's
 * page. Unique numbers per page (converted from the live spot) and a dense
 * internal-link block for the programmatic country pages.
 */
export function CurrencyTable({
  spot,
  fx,
  locale,
  excludeCurrency,
}: {
  spot: GoldApiResponse | null;
  fx: FxRates;
  locale: string;
  excludeCurrency?: string;
}) {
  if (!spot) return null;

  const rows = MAJOR.filter((c) => c !== excludeCurrency)
    .map((code) => {
      const rate = code === "USD" ? 1 : (fx[code] as number | undefined);
      if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) return null;
      const country = COUNTRIES.find((c) => c.currency === code);
      return { code, rate, country };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  if (rows.length === 0) return null;

  const th = "px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]";

  return (
    <section aria-labelledby="currency-table-heading">
      <h2 id="currency-table-heading" className="text-xl font-semibold text-[var(--color-text)]">
        {tableText(locale, "currencyHeading")}
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        {currencyIntro(locale, fmtNum(spot.price, 2))}
      </p>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <table className="w-full min-w-[560px] border-collapse">
          <caption className="sr-only">
            {tableText(locale, "currencyCaption")}
          </caption>
          <thead className="border-b border-[var(--color-border)]">
            <tr>
              <th scope="col" className={`${th} text-start`}>{tableText(locale, "currency")}</th>
              {COLS.map((k) => (
                <th key={k} scope="col" className={`${th} text-end`}>
                  {karatLabel(locale, k)}
                </th>
              ))}
              <th scope="col" className={`${th} text-end`}>{tableText(locale, "oz24k")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {rows.map(({ code, rate, country }) => {
              const frac = rate * gramUsd(spot, "24k") > 500 ? 0 : 2;
              const label = (
                <span className="flex items-center gap-2">
                  {country ? <Flag cc={country.cc} size={14} /> : null}
                  <span className="font-semibold text-[var(--color-text)]">{code}</span>
                  <span className="hidden text-xs text-[var(--color-text-dim)] sm:inline">{currencyName(code, locale)}</span>
                </span>
              );
              return (
                <tr key={code}>
                  <th scope="row" className="px-3 py-2.5 text-start text-sm font-medium">
                    {country ? (
                      <Link
                        href={`/${country.slug}/gold-price/21k` as never}
                        className="transition-colors hover:text-[var(--color-gold)]"
                      >
                        {label}
                      </Link>
                    ) : (
                      label
                    )}
                  </th>
                  {COLS.map((k) => (
                    <td key={k} dir="ltr" className="num px-3 py-2.5 text-end font-mono text-sm text-[var(--color-text)]">
                      {fmtNum(gramUsd(spot, k) * rate, frac)}
                    </td>
                  ))}
                  <td dir="ltr" className="num px-3 py-2.5 text-end font-mono text-sm text-[var(--color-text-muted)]">
                    {fmtNum(gramUsd(spot, "24k") * rate * OZ_G, 0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
