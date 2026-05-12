import { connection } from "next/server";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { Link } from "@/i18n/navigation";
import { CRYPTO_LIST, fetchCryptos } from "@/lib/crypto";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("cryptoListH1"), description: t("cryptoListIntro"),
    alternates: buildAlternates(locale, "/cryptocurrency"),
    openGraph: buildOpenGraph(locale, "/cryptocurrency"),
  };
}

export default async function CryptoListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");
  await connection();

  const quotes = await fetchCryptos();
  const byId: Record<string, typeof quotes[number]> = Object.fromEntries(
    quotes.map((q) => [q.id, q]),
  );

  return (
    <PageShell title={t("cryptoListH1")} intro={t("cryptoListIntro")} showFaq={false}>
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-left">
              <th className="py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                {t("cryptoRank")}
              </th>
              <th className="py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                {locale === "ar" ? "العملة" : "Coin"}
              </th>
              <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                USD
              </th>
              <th className="hidden py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)] sm:table-cell">
                24h
              </th>
              <th className="hidden py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)] md:table-cell">
                {t("cryptoMarketCap")}
              </th>
            </tr>
          </thead>
          <tbody>
            {CRYPTO_LIST.map((meta) => {
              const q = byId[meta.id];
              const up = (q?.change_24h ?? 0) >= 0;
              const trend = up ? "var(--color-up)" : "var(--color-down)";
              const name = locale === "ar" ? meta.name_ar : meta.name_en;
              return (
                <tr
                  key={meta.id}
                  className="border-b border-[var(--color-border)] last:border-b-0"
                >
                  <td className="py-3 font-mono text-[var(--color-text-dim)]">
                    {q?.rank ?? "—"}
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/cryptocurrency/${meta.slug}`}
                      className="font-semibold text-[var(--color-gold)] hover:underline"
                    >
                      {name}
                    </Link>
                    <span className="ms-2 text-[10px] text-[var(--color-text-dim)]">
                      {meta.symbol}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono text-[var(--color-text)]">
                    {q ? `$${q.price_usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: q.price_usd < 1 ? 6 : 2 })}` : "—"}
                  </td>
                  <td
                    className="hidden py-3 text-right font-mono sm:table-cell"
                    style={{ color: q ? trend : undefined }}
                  >
                    {q ? `${up ? "+" : ""}${q.change_24h.toFixed(2)}%` : "—"}
                  </td>
                  <td className="hidden py-3 text-right font-mono text-[var(--color-text-muted)] md:table-cell">
                    {q ? `$${(q.market_cap / 1_000_000_000).toFixed(2)}B` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </PageShell>
  );
}
