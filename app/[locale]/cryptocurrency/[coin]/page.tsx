import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { CRYPTO_BY_SLUG, CRYPTO_LIST, fetchCryptoBySlug } from "@/lib/crypto";

export function generateStaticParams() {
  return CRYPTO_LIST.map((c) => ({ coin: c.slug }));
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
    title: t("cryptoH1", { coin: name }),
    description: t("cryptoIntro", { coin: name, symbol: meta.symbol }),
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
  await connection();

  const quote = await fetchCryptoBySlug(coin);
  const name = locale === "ar" ? meta.name_ar : meta.name_en;

  return (
    <PageShell
      title={t("cryptoH1", { coin: name })}
      intro={t("cryptoIntro", { coin: name, symbol: meta.symbol })}
    >
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
