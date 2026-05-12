import { getTranslations, setRequestLocale } from "next-intl/server";

import { Header } from "@/components/Header";
import { Link } from "@/i18n/navigation";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InfoPage" });
  return {
    title: t("methodologyH1"),
    description: t("methodologyIntro"),
    alternates: buildAlternates(locale, "/methodology"),
    openGraph: buildOpenGraph(locale, "/methodology"),
  };
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("InfoPage");
  const now = new Date().toISOString().slice(0, 10);

  const sections: Array<{ h2: string; body: string }> = [
    { h2: t("methodologySpotH2"), body: t("methodologySpot") },
    { h2: t("methodologyKaratH2"), body: t("methodologyKarat") },
    { h2: t("methodologyFxH2"), body: t("methodologyFx") },
    { h2: t("methodologyOtherH2"), body: t("methodologyOther") },
    { h2: t("methodologyHistoryH2"), body: t("methodologyHistory") },
    { h2: t("methodologyLimitsH2"), body: t("methodologyLimits") },
  ];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-gold)]">
              {t("methodologyH1")}
            </h1>
            <p className="mt-2 text-xs text-[var(--color-text-dim)]">
              {t("lastUpdated")}: <time dateTime={now}>{now}</time>
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
              {t("methodologyIntro")}
            </p>
          </header>
          {sections.map((s) => (
            <section key={s.h2} className="mt-8">
              <h2 className="text-xl font-semibold text-[var(--color-text)]">{s.h2}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {s.body}
              </p>
            </section>
          ))}
          <nav className="mt-12 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-6 text-sm">
            <Link href="/about" className="text-[var(--color-gold)] underline hover:no-underline">
              {t("aboutH1")} →
            </Link>
            <Link
              href="/editorial-standards"
              className="text-[var(--color-gold)] underline hover:no-underline"
            >
              {t("editorialH1")} →
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
