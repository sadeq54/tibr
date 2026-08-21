import type { FxRates } from "@/lib/fx";
import type { GoldApiResponse } from "@/lib/goldapi";
import {
  GOLD_POUND_G,
  GOLD_POUND_MARKETS,
  KARAT_DEFS,
  KG_G,
  OZ_G,
  TOLA_G,
  TOLA_MARKETS,
  currencyName,
  dateLabel,
  fmtNum,
  spotDate,
  timeLabelUtc,
} from "@/lib/seo";

/**
 * Crawler- and AI-friendly price matrix: every karat (24/22/21/18/14) × every
 * retail unit, with spot bid/ask per gram. A real <table> (not cards) so
 * Google, Bing and LLM crawlers extract the numbers as structured facts —
 * the format the #1-ranking gold pages all share.
 */
export function PriceTable({
  spot,
  fx,
  currency,
  locale,
  countryName,
  slug,
  highlightKarat,
}: {
  spot: GoldApiResponse | null;
  fx?: FxRates | null;
  currency: string;
  locale: string;
  countryName?: string;
  slug?: string;
  highlightKarat?: string;
}) {
  const ar = locale === "ar";
  if (!spot) return null;

  const rawRate = currency === "USD" ? 1 : (fx?.[currency] as number | undefined);
  const rate = typeof rawRate === "number" && Number.isFinite(rawRate) && rawRate > 0 ? rawRate : null;
  if (!rate) return null;

  const cur = currencyName(currency, locale);
  const when = spotDate(spot);
  const showTola = slug ? TOLA_MARKETS.has(slug) : false;
  const showPound = slug ? GOLD_POUND_MARKETS.has(slug) : false;
  const hl = highlightKarat?.toLowerCase();

  const bidOz = spot.bid > 0 ? spot.bid : 0;
  const askOz = spot.ask > 0 ? spot.ask : 0;
  const frac = rate * spot.price_gram_24k > 500 ? 0 : 2;

  const rows = KARAT_DEFS.map((k) => {
    const gram = (spot[k.field] > 0 ? spot[k.field] : (spot.price / OZ_G) * k.purity) * rate;
    return {
      ...k,
      gram,
      bid: bidOz ? (bidOz / OZ_G) * k.purity * rate : 0,
      ask: askOz ? (askOz / OZ_G) * k.purity * rate : 0,
      oz: gram * OZ_G,
      kg: gram * KG_G,
      tola: gram * TOLA_G,
    };
  });
  const k21 = rows.find((r) => r.key === "21k");

  const heading = ar
    ? countryName
      ? `أسعار الذهب اليوم في ${countryName} حسب العيار`
      : "أسعار الذهب اليوم حسب العيار"
    : countryName
      ? `Gold prices today in ${countryName} by karat`
      : "Gold prices today by karat";

  const th = "px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]";
  const td = "num px-3 py-2.5 font-mono text-sm text-[var(--color-text)]";

  return (
    <section aria-labelledby="price-table-heading">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <h2 id="price-table-heading" className="text-xl font-semibold text-[var(--color-text)]">
          {heading}
        </h2>
        {when ? (
          <p className="text-xs text-[var(--color-text-dim)]">
            <time dateTime={when.toISOString()}>{dateLabel(locale, when, true)}</time>
            {" · "}
            {ar ? "آخر تحديث" : "Updated"} {timeLabelUtc(when)}
          </p>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <table className="w-full min-w-[560px] border-collapse text-start">
          <caption className="sr-only">
            {ar
              ? `جدول أسعار الذهب اليوم بـ${cur} لكل عيار ووحدة وزن`
              : `Gold price table today in ${cur} per karat and weight unit`}
          </caption>
          <thead className="border-b border-[var(--color-border)]">
            <tr className="text-start">
              <th scope="col" className={`${th} text-start`}>{ar ? "العيار" : "Karat"}</th>
              <th scope="col" className={`${th} text-end`}>{ar ? `الجرام (${currency})` : `Gram (${currency})`}</th>
              <th scope="col" className={`${th} text-end`}>{ar ? "شراء" : "Bid"}</th>
              <th scope="col" className={`${th} text-end`}>{ar ? "بيع" : "Ask"}</th>
              <th scope="col" className={`${th} text-end`}>{ar ? "الأونصة" : "Ounce"}</th>
              {showTola ? <th scope="col" className={`${th} text-end`}>{ar ? "التولة" : "Tola"}</th> : null}
              <th scope="col" className={`${th} text-end`}>{ar ? "الكيلو" : "Kilo"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {rows.map((r) => {
              const active = r.key === hl;
              return (
                <tr
                  key={r.key}
                  className={active ? "bg-[var(--color-gold)]/8" : undefined}
                  aria-current={active ? "true" : undefined}
                >
                  <th scope="row" className="px-3 py-2.5 text-start text-sm font-semibold text-[var(--color-text)]">
                    {ar ? `عيار ${r.label.replace("K", "")}` : r.label}
                    <span className="ms-2 text-[10px] font-medium text-[var(--color-text-dim)]">{r.pct}</span>
                  </th>
                  <td dir="ltr" className={`${td} text-end font-bold`}>{fmtNum(r.gram, frac)}</td>
                  <td dir="ltr" className={`${td} text-end text-[var(--color-up)]`}>{fmtNum(r.bid, frac)}</td>
                  <td dir="ltr" className={`${td} text-end text-[var(--color-down)]`}>{fmtNum(r.ask, frac)}</td>
                  <td dir="ltr" className={`${td} text-end`}>{fmtNum(r.oz, frac)}</td>
                  {showTola ? <td dir="ltr" className={`${td} text-end`}>{fmtNum(r.tola, frac)}</td> : null}
                  <td dir="ltr" className={`${td} text-end`}>{fmtNum(r.kg, 0)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showPound && k21 ? (
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {ar ? "الجنيه الذهب (8 جرام عيار 21): " : "Gold pound (8 g of 21K): "}
          <strong dir="ltr" className="num font-mono text-[var(--color-text)]">
            {fmtNum(k21.gram * GOLD_POUND_G, frac)} {currency}
          </strong>
        </p>
      ) : null}

      <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-dim)]">
        {ar
          ? `الأسعار هي السعر الفوري العالمي (وسيط Binance وCoinbase وKraken) محوّلًا إلى ${cur} بسعر صرف محدّث كل ساعة، قبل المصنعية وهامش المحل وأي ضريبة محلية. «شراء/بيع» هما سعرا العرض والطلب الفوريان.`
          : `Prices are the global spot (median of Binance, Coinbase and Kraken) converted to ${cur} at an hourly FX rate, before making charges, retailer margin and local tax. Bid/ask are the live spot quotes.`}
      </p>
    </section>
  );
}
