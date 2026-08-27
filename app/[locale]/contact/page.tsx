import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n-text";
import { buildPageMetadata, canonicalPath, SITE_URL } from "@/lib/metadata";

import { CONTACT_UPDATED, contactText } from "./contact.i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = contactText(locale);
  return buildPageMetadata({ locale, path: "/contact", title: t.title, description: t.description });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = contactText(locale);
  const tInfo = await getTranslations({ locale, namespace: "InfoPage" });
  const pageUrl = canonicalPath(locale, "/contact");
  const homeCrumb = {
    name: pick(locale, { en: "Home", ar: "الرئيسية", fr: "Accueil", tr: "Ana sayfa", ur: "ہوم", hi: "होम" }),
    href: canonicalPath(locale, "/"),
  };

  return (
    <>
      <JsonLd
        siteUrl={SITE_URL}
        pageType="ContactPage"
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
              {tInfo("lastUpdated")}: <time dateTime={CONTACT_UPDATED}>{CONTACT_UPDATED}</time>
            </p>
          </header>

          {/* One card per reason to write, each with the address that reads it —
              a reader should never have to guess which inbox their message lands in. */}
          {t.channels.map((c) => (
            <section
              key={c.h}
              className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <h2 className="text-lg font-semibold text-[var(--color-text)]">{c.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{c.body}</p>
              <a
                href={`mailto:${c.email}`}
                className="mt-4 inline-block text-sm font-medium text-[var(--color-gold)] underline hover:no-underline"
              >
                {t.emailCta}: {c.email}
              </a>
            </section>
          ))}

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">{t.whoH}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{t.whoBody}</p>
          </section>

          {/* Stated plainly because the site ranks for buying queries: readers
              arrive expecting a dealer, and impersonation scams trade on that. */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">{t.notH}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{t.notBody}</p>
          </section>

          <nav className="mt-12 flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-6 text-sm">
            <Link href="/about" className="text-[var(--color-gold)] underline hover:no-underline">
              {tInfo("aboutH1")}
            </Link>
            <Link href="/about/sadeq" className="text-[var(--color-gold)] underline hover:no-underline">
              {pick(locale, { en: "Founder", ar: "المؤسس", fr: "Fondateur", tr: "Kurucu", ur: "بانی", hi: "संस्थापक" })}
            </Link>
            <Link href="/editorial-standards" className="text-[var(--color-gold)] underline hover:no-underline">
              {tInfo("editorialH1")}
            </Link>
            <Link href="/about/privacy" className="text-[var(--color-gold)] underline hover:no-underline">
              {pick(locale, { en: "Privacy", ar: "الخصوصية", fr: "Confidentialité", tr: "Gizlilik", ur: "رازداری", hi: "गोपनीयता" })}
            </Link>
            <Link href="/terms" className="text-[var(--color-gold)] underline hover:no-underline">
              {pick(locale, { en: "Terms", ar: "شروط الاستخدام", fr: "Conditions", tr: "Kullanım şartları", ur: "شرائط", hi: "शर्तें" })}
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
