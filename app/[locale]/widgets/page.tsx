import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("widgetsH1"), description: t("widgetsIntro"),
    alternates: buildAlternates(locale, "/widgets"),
    openGraph: buildOpenGraph(locale, "/widgets"),
  };
}

const SNIPPETS = [
  {
    label: "Live Gold Stream (real-time WebSocket)",
    code: `<iframe src="https://goldpricesarabia.com/en/widgets/embed/live-stream" width="640" height="380" frameborder="0" style="border:0"></iframe>`,
  },
  {
    label: "Spot Gold (HeroSpot card)",
    code: `<iframe src="https://goldpricesarabia.com/en/widgets/embed/spot-gold" width="640" height="320" frameborder="0" style="border:0"></iframe>`,
  },
  {
    label: "Karat Grid (24K, 21K, 18K, 14K)",
    code: `<iframe src="https://goldpricesarabia.com/en/widgets/embed/karat-grid" width="900" height="500" frameborder="0" style="border:0"></iframe>`,
  },
  {
    label: "1-Year Gold Price Chart",
    code: `<iframe src="https://goldpricesarabia.com/en/widgets/embed/chart" width="900" height="500" frameborder="0" style="border:0"></iframe>`,
  },
];

export default async function WidgetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  return (
    <PageShell title={t("widgetsH1")} intro={t("widgetsIntro")} showFaq={false}>
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          {t("widgetsTitle")}
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{t("widgetsHow")}</p>

        <div className="mt-6 space-y-6">
          {SNIPPETS.map((s) => (
            <div key={s.label}>
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                {s.label}
              </div>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-4 font-mono text-[12px] text-[var(--color-text)]">
                {s.code}
              </pre>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
