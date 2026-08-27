import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n-text";
import { buildPageMetadata, canonicalPath, SITE_URL } from "@/lib/metadata";

import { TERMS_UPDATED, termsText } from "./terms.i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = termsText(locale);
  return buildPageMetadata({ locale, path: "/terms", title: t.title, description: t.description });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = termsText(locale);
  const tInfo = await getTranslations({ locale, namespace: "InfoPage" });
  const pageUrl = canonicalPath(locale, "/terms");
  const homeCrumb = {
    name: pick(locale, { en: "Home", ar: "الرئيسية", fr: "Accueil", tr: "Ana sayfa", ur: "ہوم", hi: "होम" }),
    href: canonicalPath(locale, "/"),
  };

  return (
    <>
      <JsonLd
        siteUrl={SITE_URL}
        pageType="WebPage"
        pageUrl={pageUrl}
        pageName={t.title}
        pageOnly
        breadcrumb={[
          { name: homeCrumb.name, url: homeCrumb.href },
          { name: t.title, url: pageUrl },
        ]}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb locale={locale} items={[homeCrumb, { name: t.title, href: pageUrl }]} />
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-gold)]">{t.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{t.intro}</p>
            <p className="mt-2 text-xs text-[var(--color-text-dim)]">
              {tInfo("lastUpdated")}: <time dateTime={TERMS_UPDATED}>{TERMS_UPDATED}</time>
            </p>
          </header>

          {t.sections.map((s) => (
            <section key={s.h} className="mt-8">
              <h2 className="text-xl font-semibold text-[var(--color-text)]">{s.h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{s.body}</p>
            </section>
          ))}

          <nav className="mt-12 flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-6 text-sm">
            <Link href="/about/privacy" className="text-[var(--color-gold)] underline hover:no-underline">
              {pick(locale, { en: "Privacy", ar: "الخصوصية", fr: "Confidentialité", tr: "Gizlilik", ur: "رازداری", hi: "गोपनीयता" })}
            </Link>
            <Link href="/about/disclaimer" className="text-[var(--color-gold)] underline hover:no-underline">
              {pick(locale, { en: "Disclaimer", ar: "إخلاء المسؤولية", fr: "Avertissement", tr: "Sorumluluk reddi", ur: "دستبرداری", hi: "अस्वीकरण" })}
            </Link>
            <Link href="/methodology" className="text-[var(--color-gold)] underline hover:no-underline">
              {tInfo("methodologyH1")}
            </Link>
            <Link href="/editorial-standards" className="text-[var(--color-gold)] underline hover:no-underline">
              {tInfo("editorialH1")}
            </Link>
            <Link href="/contact" className="text-[var(--color-gold)] underline hover:no-underline">
              {pick(locale, { en: "Contact", ar: "تواصل معنا", fr: "Contact", tr: "İletişim", ur: "رابطہ", hi: "संपर्क" })}
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
