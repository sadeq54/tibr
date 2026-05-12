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
    title: t("aboutH1"),
    description: t("aboutIntro"),
    alternates: buildAlternates(locale, "/about"),
    openGraph: buildOpenGraph(locale, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("InfoPage");
  const now = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-gold)]">
              {t("aboutH1")}
            </h1>
            <p className="mt-2 text-xs text-[var(--color-text-dim)]">
              {t("lastUpdated")}: <time dateTime={now}>{now}</time>
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text)]">
              {t("aboutIntro")}
            </p>
          </header>
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-[var(--color-text)]">
              {t("aboutMissionH2")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {t("aboutMission")}
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-[var(--color-text)]">
              {t("aboutTeamH2")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {t("aboutTeamBody")}
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-[var(--color-text)]">
              {t("aboutContactH2")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {t("aboutContact")}
            </p>
          </section>
          <nav className="mt-12 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-6 text-sm">
            <Link
              href="/about/sadeq"
              className="text-[var(--color-gold)] underline hover:no-underline"
            >
              {locale === "ar" ? "المؤسس: صادق سيد أحمد" : "Founder: Sadeq Sayed Ahmad"} →
            </Link>
            <Link
              href="/methodology"
              className="text-[var(--color-gold)] underline hover:no-underline"
            >
              {t("methodologyH1")} →
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
