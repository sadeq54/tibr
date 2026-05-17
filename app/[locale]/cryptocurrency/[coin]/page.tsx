import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { CRYPTO_BY_SLUG, CRYPTO_LIST, fetchCryptoBySlug } from "@/lib/crypto";
import { getCachedFxRates } from "@/lib/cached-fetchers";
import { buildAlternates, buildOpenGraph, canonicalPath } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schemas";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; coin: string }>;
}) {
  const { locale, coin } = await params;
  const meta = CRYPTO_BY_SLUG[coin];
  if (!meta) return {};
  const t = await getTranslations({ locale, namespace: "SubPage" });
  const name = locale === "ar" ? meta.name_ar : meta.name_en;
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

  const [quote, fx] = await Promise.all([
    fetchCryptoBySlug(coin),
    getCachedFxRates(),
  ]);
  const name = locale === "ar" ? meta.name_ar : meta.name_en;

  const pageUrl = canonicalPath(locale, `/cryptocurrency/${coin}`);
  const sarRate = fx ? (fx.SAR as number) : 3.75;
  const aedRate = fx ? (fx.AED as number) : 3.6725;
  const sarPrice = quote ? quote.price_usd * sarRate : 0;
  const aedPrice = quote ? quote.price_usd * aedRate : 0;

  const cryptoFaqs = locale === "ar"
    ? [
        {
          q: `كم سعر ${name} اليوم؟`,
          a: quote
            ? `سعر ${name} الآن ${quote.price_usd.toLocaleString("en-US", { maximumFractionDigits: 2 })} دولار، أو ${sarPrice.toLocaleString("en-US", { maximumFractionDigits: 2 })} ريال سعودي. السعر يُحدّث من بيانات CoinGecko.`
            : `سعر ${name} يُحدّث في الصندوق أعلاه من بيانات CoinGecko.`,
        },
        {
          q: `كيف أحوّل ${meta.symbol} إلى ريال سعودي؟`,
          a: `استخدم سعر الصرف الحالي: 1 ${meta.symbol} × سعر الصرف الدولار/الريال (≈3.75). نحن نُحدّث سعر الصرف يومياً من بيانات البنوك المركزية المفتوحة.`,
        },
        {
          q: `هل ${name} حلال؟`,
          a: `هذا موضوع نقاش بين علماء الفقه الإسلامي. بعض المجالس الإفتائية (الأزهر، دار الإفتاء المصرية) أصدروا فتاوى بحرمة العملات الرقمية للمضاربة. آخرون (هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية AAOIFI) يفصّلون بين الاستخدامات. استشر مرجعاً دينياً موثوقاً قبل التداول.`,
        },
        {
          q: `أين أشتري ${name} في المنطقة العربية؟`,
          a: `لا يوجد بائع رسمي مرخص في معظم دول الخليج. المنصات الدولية المعروفة (Binance، Coinbase، Kraken، OKX، Bybit) قابلة للوصول من المنطقة. تحقق من الحالة القانونية في بلدك قبل الشراء — التداول مقيد في السعودية، مسموح في الإمارات (مع تنظيم)، مقيد في المغرب.`,
        },
        {
          q: `كم مرة يُحدّث سعر ${name}؟`,
          a: `السعر يُحدّث كل دقيقة تقريباً من CoinGecko API. للأسعار اللحظية (تيك بتيك)، استخدم Binance أو CoinMarketCap مباشرة. نحن نوفر صورة دقيقة بما يكفي للقرارات اليومية، ليس للتداول عالي التردد.`,
        },
      ]
    : [
        {
          q: `What is the ${name} price today?`,
          a: quote
            ? `${name} is now ${quote.price_usd.toLocaleString("en-US", { maximumFractionDigits: 2 })} USD, or ${sarPrice.toLocaleString("en-US", { maximumFractionDigits: 2 })} SAR / ${aedPrice.toLocaleString("en-US", { maximumFractionDigits: 2 })} AED. Price sourced from CoinGecko.`
            : `${name} price updates in the box above, sourced from CoinGecko.`,
        },
        {
          q: `How do I convert ${meta.symbol} to Saudi Riyals or UAE Dirhams?`,
          a: `Multiply the ${meta.symbol}/USD price by the daily USD/SAR rate (~3.75) or USD/AED rate (~3.67). We refresh the FX rate daily from open central-bank data.`,
        },
        {
          q: `Is ${name} permissible (halal) under Islamic law?`,
          a: `This is debated among Islamic scholars. Some councils (Al-Azhar, Egypt's Dar Al-Ifta) have issued rulings against speculative crypto trading. Others (AAOIFI — the Accounting and Auditing Organization for Islamic Financial Institutions) differentiate by use case. Consult a trusted religious authority before trading.`,
        },
        {
          q: `Where can I buy ${name} in the MENA region?`,
          a: `No fully licensed local exchange exists in most Gulf states. International platforms (Binance, Coinbase, Kraken, OKX, Bybit) are accessible from the region. Verify the legal status in your country before buying — restricted in Saudi Arabia, regulated in UAE, restricted in Morocco.`,
        },
        {
          q: `How often is the ${name} price updated?`,
          a: `Price updates approximately every minute from CoinGecko's API. For real-time (tick-by-tick) prices, use Binance or CoinMarketCap directly. We provide a snapshot accurate enough for daily decisions, not for high-frequency trading.`,
        },
      ];
  const cryptoFaqSchema = faqPageSchema(pageUrl, cryptoFaqs, locale === "ar" ? "ar" : "en");

  const fallbackTitle = t("cryptoH1", { coin: name });
  const fallbackIntro = t("cryptoIntro", { coin: name, symbol: meta.symbol });
  const title = localizedTitle(locale, coin, fallbackTitle);
  const intro = localizedIntro(locale, coin, fallbackIntro);

  return (
    <PageShell title={title} intro={intro}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cryptoFaqSchema) }}
      />
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
        {quote ? (
          <>
            <div className="flex items-baseline gap-3">
              <div className="font-mono text-4xl font-bold text-[var(--color-gold)]">
                $
                {quote.price_usd.toLocaleString("en-US", {
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
                label={locale === "ar" ? "بالريال السعودي" : "In Saudi Riyal"}
                value={`SR ${sarPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
              <Item
                label={locale === "ar" ? "بالدرهم الإماراتي" : "In UAE Dirham"}
                value={`AED ${aedPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
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
              <Item
                label={t("cryptoHigh")}
                value={`$${quote.high_24h.toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
              />
              <Item
                label={t("cryptoLow")}
                value={`$${quote.low_24h.toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
              />
              <Item
                label={t("cryptoAth")}
                value={`$${quote.ath.toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
              />
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
