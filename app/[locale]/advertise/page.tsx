import { Mail } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata, canonicalPath, SITE_URL } from "@/lib/metadata";

import { ADVERTISE_EMAIL, advertiseText } from "./advertise.i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = advertiseText(locale);
  return buildPageMetadata({ locale, path: "/advertise", title: t.title, description: t.description });
}

export default async function AdvertisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = advertiseText(locale);
  const pageUrl = canonicalPath(locale, "/advertise");
  const homeCrumb = { name: t.home, href: canonicalPath(locale, "/") };
  const mailto = `mailto:${ADVERTISE_EMAIL}?subject=${encodeURIComponent("Advertising — goldpricesarabia.com")}`;

  return (
    <>
      <JsonLd
        siteUrl={SITE_URL}
        pageType="WebPage"
        pageUrl={pageUrl}
        pageName={t.h1}
        pageOnly
        breadcrumb={[
          { name: homeCrumb.name, url: homeCrumb.href },
          { name: t.h1, url: pageUrl },
        ]}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb locale={locale} items={[homeCrumb, { name: t.h1, href: pageUrl }]} />
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-gold)]">{t.h1}</h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">{t.intro}</p>
          </header>

          <dl className="grid gap-3 sm:grid-cols-2">
            {t.facts.map((f) => (
              <div key={f.k} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">{f.k}</dt>
                <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">{f.v}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">{t.formatsH}</h2>
            <div className="mt-4 space-y-4">
              {t.formats.map((f) => (
                <div key={f.h} className="rounded-xl border border-[var(--color-border)] p-4">
                  <h3 className="text-sm font-semibold text-[var(--color-gold)]">{f.h}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{f.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">{t.rulesH}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{t.rules}</p>
          </section>

          <section className="mt-10 rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-bg-card)] p-6">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">{t.contactH}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{t.contactBody}</p>
            <a
              href={mailto}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              <Mail size={16} aria-hidden />
              {ADVERTISE_EMAIL}
            </a>
          </section>
        </article>
      </main>
    </>
  );
}
