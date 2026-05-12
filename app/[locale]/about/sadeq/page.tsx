import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { buildAlternates, buildOpenGraph, canonicalPath, SITE_URL } from "@/lib/metadata";

const LINKEDIN_URL = "https://www.linkedin.com/in/sadeq-sayed-ahmad-309101233/";
const AUTHOR_EMAIL = "support@goldpricesarabia.com";
const PHOTO_PATH = "/author/sadeq.jpeg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AuthorPage" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/about/sadeq"),
    openGraph: buildOpenGraph(locale, "/about/sadeq"),
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AuthorPage");
  const tInfo = await getTranslations("InfoPage");
  const now = new Date().toISOString().slice(0, 10);
  const pageUrl = canonicalPath(locale, "/about/sadeq");

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person-sadeq`,
    name: "Sadeq Sayed Ahmad",
    alternateName: "صادق سيد أحمد",
    jobTitle: t("role"),
    description: t("bio1"),
    url: `${SITE_URL}${pageUrl}`,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${PHOTO_PATH}`,
      width: 766,
      height: 1024,
    },
    sameAs: [LINKEDIN_URL],
    email: AUTHOR_EMAIL,
    worksFor: { "@id": `${SITE_URL}/#org` },
    knowsAbout: [
      "Gold price data",
      "Precious metals tracking",
      "Web development",
      "Arabic-language web",
      "MENA financial markets",
    ],
  };

  return (
    <>
      <JsonLd
        siteUrl={SITE_URL}
        pageType="WebPage"
        pageUrl={pageUrl}
        pageName={t("h1")}
        breadcrumb={[
          { name: locale === "en" ? "Home" : "الرئيسية", url: locale === "en" ? "/en" : "/" },
          { name: tInfo("aboutH1"), url: locale === "en" ? "/en/about" : "/about" },
          { name: t("h1"), url: pageUrl },
        ]}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <article>
          <header className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Image
              src={PHOTO_PATH}
              alt="Sadeq Sayed Ahmad"
              width={160}
              height={160}
              priority
              className="rounded-full border-2 border-[var(--color-gold)] object-cover shadow-lg"
              style={{ width: 160, height: 160 }}
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)] sm:text-4xl">
                {t("h1")}
              </h1>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-muted)]">
                {t("role")}
              </p>
              <p className="mt-2 text-xs text-[var(--color-text-dim)]">
                {tInfo("lastUpdated")}: <time dateTime={now}>{now}</time>
              </p>
            </div>
          </header>

          <section className="space-y-4 text-base leading-relaxed text-[var(--color-text)]">
            <p>{t("bio1")}</p>
            <p className="text-sm text-[var(--color-text-muted)]">{t("bio2")}</p>
            <p className="text-sm text-[var(--color-text-muted)]">{t("bio3")}</p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[var(--color-text)]">
              {t("expertiseH2")}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li className="border-r-2 border-[var(--color-gold)]/50 pr-4 rtl:border-l-2 rtl:border-r-0 rtl:pl-4 rtl:pr-0">
                {t("expertise1")}
              </li>
              <li className="border-r-2 border-[var(--color-gold)]/50 pr-4 rtl:border-l-2 rtl:border-r-0 rtl:pl-4 rtl:pr-0">
                {t("expertise2")}
              </li>
              <li className="border-r-2 border-[var(--color-gold)]/50 pr-4 rtl:border-l-2 rtl:border-r-0 rtl:pl-4 rtl:pr-0">
                {t("expertise3")}
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[var(--color-text)]">
              {t("connectH2")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {t("connectIntro")}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="font-medium text-[var(--color-gold)] underline hover:no-underline"
                >
                  {t("linkedinLabel")} ↗
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${AUTHOR_EMAIL}`}
                  className="font-medium text-[var(--color-gold)] underline hover:no-underline"
                >
                  {t("emailLabel")}: {AUTHOR_EMAIL}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-[var(--color-text-dim)]">
              {t("contactNote")}
            </p>
          </section>

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
          </nav>
        </article>
      </main>
    </>
  );
}
