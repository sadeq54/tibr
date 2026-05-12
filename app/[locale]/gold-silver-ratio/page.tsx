import { connection } from "next/server";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { fetchMetals } from "@/lib/goldapi";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("ratioH1"), description: t("ratioIntro"),
    alternates: buildAlternates(locale, "/gold-silver-ratio"),
    openGraph: buildOpenGraph(locale, "/gold-silver-ratio"),
  };
}

export default async function GoldSilverRatioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  await connection();
  const metals = await fetchMetals();
  const xau = metals.XAU?.price ?? 0;
  const xag = metals.XAG?.price ?? 0;
  const ratio = xag > 0 ? xau / xag : null;

  return (
    <PageShell title={t("ratioH1")} intro={t("ratioIntro")}>
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
          {t("ratioCurrent")}
        </div>
        <div className="mt-2 font-mono text-5xl font-bold text-[var(--color-gold)]">
          {ratio ? ratio.toFixed(2) : "—"}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-4 text-sm">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
              XAU/USD
            </div>
            <div className="font-mono text-lg font-semibold text-[var(--color-text)]">
              ${xau.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
              XAG/USD
            </div>
            <div className="font-mono text-lg font-semibold text-[var(--color-text)]">
              ${xag.toFixed(2)}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
