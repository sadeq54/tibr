import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { localeMeta } from "@/i18n/routing";
import { CRYPTO_BY_SLUG, CRYPTO_LIST, fetchCryptoBySlug } from "@/lib/crypto";
import { getCachedFxRates } from "@/lib/cached-fetchers";
import { pick } from "@/lib/i18n-text";
import { buildAlternates, buildOpenGraph, canonicalPath } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schemas";

import { cryptoFaqs } from "./faq.i18n";

export function generateStaticParams() {
  return CRYPTO_LIST.map((c) => ({ coin: c.slug }));
}

// Bitcoin English title pivoted to a winnable regional long-tail —
// the global "bitcoin price today" SERP is owned by CoinMarketCap and
// CoinGecko (DR 90+); "Bitcoin price in Saudi Riyals" has no dominant
// owner and aligns with the site's MENA authority moat.
function localizedTitle(locale: string, coin: string, fallback: string) {
  if (locale === "en" && coin === "bitcoin") {
    return "Bitcoin Price in Saudi Riyals (BTC/SAR Live)";
  }
  return fallback;
}
function localizedIntro(
  locale: string,
  coin: string,
  fallback: string,
) {
  if (locale === "en" && coin === "bitcoin") {
    return "Live Bitcoin price in Saudi Riyal, UAE Dirham, Egyptian Pound and 40+ currencies. Real-time BTC/USD converted at the daily exchange rate. Updated every minute.";
  }
  return fallback;
}

/** Coin names are proper nouns — CRYPTO_LIST carries en/ar only, other locales fall back to English. */
const coinName = (meta: { name_en: string; name_ar: string }, locale: string) =>
  pick(locale, { en: meta.name_en, ar: meta.name_ar });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; coin: string }>;
}) {
  const { locale, coin } = await params;
  const meta = CRYPTO_BY_SLUG[coin];
  if (!meta) return {};
  const t = await getTranslations({ locale, namespace: "SubPage" });
  const name = coinName(meta, locale);
  return {
    title: localizedTitle(locale, coin, t("cryptoH1", { coin: name })),
    description: localizedIntro(
      locale,
      coin,
      t("cryptoIntro", { coin: name, symbol: meta.symbol }),
    ),
    alternates: buildAlternates(locale, `/cryptocurrency/${coin}`),
    openGraph: buildOpenGraph(locale, `/cryptocurrency/${coin}`),
  };
}

export default async function CryptoCoinPage({
  params,
}: {
  params: Promise<{ locale: string; coin: string }>;
}) {
  const { locale, coin } = await params;
  const meta = CRYPTO_BY_SLUG[coin];
  if (!meta) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");
  const intl = localeMeta(locale).intl;
  const fmt = (n: number, opts: Intl.NumberFormatOptions = { maximumFractionDigits: 2 }) =>
    n.toLocaleString(intl, opts);

  const [quote, fx] = await Promise.all([
    fetchCryptoBySlug(coin),
    getCachedFxRates(),
  ]);
  const name = coinName(meta, locale);

  const pageUrl = canonicalPath(locale, `/cryptocurrency/${coin}`);
  const sarRate = fx ? (fx.SAR as number) : 3.75;
  const aedRate = fx ? (fx.AED as number) : 3.6725;
  const sarPrice = quote ? quote.price_usd * sarRate : 0;
  const aedPrice = quote ? quote.price_usd * aedRate : 0;

  const faqs = cryptoFaqs(locale, {
    name,
    symbol: meta.symbol,
    prices: quote ? { usd: fmt(quote.price_usd), sar: fmt(sarPrice), aed: fmt(aedPrice) } : null,
  });
  const cryptoFaqSchema = faqPageSchema(pageUrl, faqs, locale);

  const fallbackTitle = t("cryptoH1", { coin: name });
  const fallbackIntro = t("cryptoIntro", { coin: name, symbol: meta.symbol });
  const title = localizedTitle(locale, coin, fallbackTitle);
  const intro = localizedIntro(locale, coin, fallbackIntro);
  const money2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 } as const;

  return (
    <PageShell title={title} intro={intro}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cryptoFaqSchema).replace(/</g, "\\u003c") }}
      />
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
        {quote ? (
          <>
            <div className="flex items-baseline gap-3">
              <div className="font-mono text-4xl font-bold text-[var(--color-gold)]">
                $
                {fmt(quote.price_usd, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: quote.price_usd < 1 ? 6 : 2,
                })}
              </div>
              <div
                className="rounded px-2 py-0.5 font-mono text-sm font-semibold"
                style={{
                  color:
                    quote.change_24h >= 0 ? "var(--color-up)" : "var(--color-down)",
                  background:
                    quote.change_24h >= 0
                      ? "color-mix(in srgb, var(--color-up) 12%, transparent)"
                      : "color-mix(in srgb, var(--color-down) 12%, transparent)",
                }}
              >
                {quote.change_24h >= 0 ? "+" : ""}
                {quote.change_24h.toFixed(2)}%
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Item
                label={pick(locale, {
                  en: "In Saudi Riyal",
                  ar: "بالريال السعودي",
                  fr: "En riyal saoudien",
                  tr: "Suudi riyali",
                  ur: "سعودی ریال میں",
                  hi: "सऊदी रियाल में",
                })}
                value={`SR ${fmt(sarPrice, money2)}`}
              />
              <Item
                label={pick(locale, {
                  en: "In UAE Dirham",
                  ar: "بالدرهم الإماراتي",
                  fr: "En dirham émirati",
                  tr: "BAE dirhemi",
                  ur: "اماراتی درہم میں",
                  hi: "यूएई दिरहम में",
                })}
                value={`AED ${fmt(aedPrice, money2)}`}
              />
            </dl>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-4 text-sm md:grid-cols-3">
              <Item label={t("cryptoRank")} value={`#${quote.rank}`} />
              <Item
                label={t("cryptoMarketCap")}
                value={`$${(quote.market_cap / 1_000_000_000).toFixed(2)}B`}
              />
              <Item
                label={t("cryptoVolume")}
                value={`$${(quote.volume_24h / 1_000_000_000).toFixed(2)}B`}
              />
              <Item label={t("cryptoHigh")} value={`$${fmt(quote.high_24h)}`} />
              <Item label={t("cryptoLow")} value={`$${fmt(quote.low_24h)}`} />
              <Item label={t("cryptoAth")} value={`$${fmt(quote.ath)}`} />
            </dl>
          </>
        ) : (
          <div className="text-sm text-[var(--color-text-dim)]">
            {t("newsUnavailable")}
          </div>
        )}
      </section>
    </PageShell>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-base font-semibold text-[var(--color-text)]">
        {value}
      </dd>
    </div>
  );
}
