import { getTranslations, setRequestLocale } from "next-intl/server";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { buildAlternates, buildOpenGraph, canonicalPath, SITE_URL } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DisclaimerPage" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/about/disclaimer"),
    openGraph: buildOpenGraph(locale, "/about/disclaimer"),
  };
}

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DisclaimerPage");
  const tInfo = await getTranslations("InfoPage");
  const now = new Date().toISOString().slice(0, 10);
  const pageUrl = canonicalPath(locale, "/about/disclaimer");

  const sections: Array<{ h: string; body: string }> = [
    { h: t("introH2"), body: t("intro") },
    { h: t("natureH2"), body: t("nature") },
    { h: t("notAdviceH2"), body: t("notAdvice") },
    { h: t("accuracyH2"), body: t("accuracy") },
    { h: t("noLiabilityH2"), body: t("noLiability") },
    { h: t("affiliateH2"), body: t("affiliate") },
    { h: t("thirdPartyH2"), body: t("thirdParty") },
    { h: t("jurisdictionH2"), body: t("jurisdiction") },
    { h: t("contactH2"), body: t("contact") },
  ];

  return (
    <>
      <JsonLd
        siteUrl={SITE_URL}
        pageType="WebPage"
        pageUrl={pageUrl}
        pageName={t("h1")}
        pageOnly
        breadcrumb={[
          { name: locale === "en" ? "Home" : "الرئيسية", url: locale === "en" ? "/en" : "/" },
          { name: tInfo("aboutH1"), url: locale === "en" ? "/en/about" : "/about" },
          { name: t("h1"), url: pageUrl },
        ]}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-gold)]">
              {t("h1")}
            </h1>
            <p className="mt-2 text-xs text-[var(--color-text-dim)]">
              {tInfo("lastUpdated")}: <time dateTime={now}>{now}</time>
            </p>
          </header>

          {sections.map((s) => (
            <section key={s.h} className="mt-8">
              <h2 className="text-xl font-semibold text-[var(--color-text)]">
                {s.h}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {s.body}
              </p>
            </section>
          ))}

          <nav className="mt-12 flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-6 text-sm">
            <Link
              href="/about"
              className="text-[var(--color-gold)] underline hover:no-underline"
            >
              ← {tInfo("aboutH1")}
            </Link>
            <Link
              href="/methodology"
              className="text-[var(--color-gold)] underline hover:no-underline"
            >
              {tInfo("methodologyH1")} →
            </Link>
            <Link
              href="/editorial-standards"
              className="text-[var(--color-gold)] underline hover:no-underline"
            >
              {tInfo("editorialH1")} →
            </Link>
            <Link
              href="/about/sadeq"
              className="text-[var(--color-gold)] underline hover:no-underline"
            >
              {locale === "ar" ? "المؤسس" : "Founder"} →
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
