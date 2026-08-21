import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Header } from "@/components/Header";
import { localeMeta } from "@/i18n/routing";
import { getCachedResearch } from "@/lib/cached-fetchers";
import { buildPageMetadata, canonicalPath, SITE_URL } from "@/lib/metadata";
import { scholarUrl, type ResearchDigest, type ResearchPaper } from "@/lib/research";

import { researchText, topicBlurb, topicTitle } from "./research.i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = researchText(locale);
  return buildPageMetadata({
    locale,
    path: "/research",
    title: t.title,
    description: t.description,
  });
}

const SOURCES = [
  { name: "arXiv", url: "https://arxiv.org/" },
  { name: "OpenAlex", url: "https://openalex.org/" },
  { name: "Crossref", url: "https://www.crossref.org/" },
  { name: "Semantic Scholar", url: "https://www.semanticscholar.org/" },
];

function fmtCitations(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function ResearchSkeleton() {
  return (
    <div className="mt-10 space-y-10">
      {[0, 1].map((s) => (
        <div key={s}>
          <div className="skeleton h-6 w-64" />
          <div className="mt-4 space-y-4">
            {[0, 1, 2].map((r) => (
              <div key={r} className="space-y-2">
                <div className="skeleton h-4 w-full max-w-xl" />
                <div className="skeleton h-3 w-72" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PaperRow({ p, cited }: { p: ResearchPaper; cited: string }) {
  const authors =
    p.authors.length > 3 ? `${p.authors.slice(0, 3).join(", ")} et al.` : p.authors.join(", ");
  const meta = [authors, p.year ? String(p.year) : "", p.venue].filter(Boolean).join(" · ");
  return (
    <li className="py-5 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] font-semibold leading-snug text-[var(--color-text)] transition-colors hover:text-[var(--color-gold)]"
        >
          {p.title}
        </a>
        {p.citations !== null ? (
          <span className="num shrink-0 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[var(--color-gold)]">
            {fmtCitations(p.citations)} {cited}
          </span>
        ) : null}
      </div>
      {meta ? <div className="mt-1 text-xs text-[var(--color-text-dim)]">{meta}</div> : null}
      {p.abstract ? (
        <p className="mt-2 line-clamp-2 max-w-[70ch] text-sm leading-relaxed text-[var(--color-text-muted)]">
          {p.abstract}
        </p>
      ) : null}
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--color-gold)] hover:underline"
        >
          {p.source} ↗
        </a>
        <a
          href={scholarUrl(p)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-gold)]"
        >
          Google Scholar ↗
        </a>
        {p.doi ? (
          <a
            href={`https://doi.org/${p.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-gold)]"
          >
            DOI ↗
          </a>
        ) : null}
      </div>
    </li>
  );
}

function ResearchJsonLd({ digest, locale }: { digest: ResearchDigest; locale: string }) {
  const t = researchText(locale);
  const papers = digest.topics.flatMap((topic) => topic.papers);
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.ldName,
    description: t.ldDescription,
    inLanguage: locale,
    url: `${SITE_URL}${canonicalPath(locale, "/research")}`,
    dateModified: digest.fetchedAt,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: papers.length,
      itemListElement: papers.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "ScholarlyArticle",
          headline: p.title,
          url: p.url,
          ...(p.year ? { datePublished: String(p.year) } : {}),
          ...(p.doi ? { sameAs: `https://doi.org/${p.doi}` } : {}),
          author: p.authors.map((name) => ({ "@type": "Person", name })),
        },
      })),
    },
  };
  return (
    <script
      type="application/ld+json"
      // External-API strings pass through stripMarkup() upstream; escaping "<"
      // here additionally guarantees no </script> breakout inside JSON-LD.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

async function ResearchBody({
  promise,
  locale,
}: {
  promise: Promise<ResearchDigest>;
  locale: string;
}) {
  const digest = await promise;
  const t = researchText(locale);
  const total = digest.topics.reduce((n, topic) => n + topic.papers.length, 0);

  if (total === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 text-center">
        <p className="text-sm font-semibold text-[var(--color-text)]">{t.unreachable}</p>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{t.refreshNote}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          {SOURCES.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--color-gold)] hover:underline"
            >
              {s.name} ↗
            </a>
          ))}
        </div>
      </div>
    );
  }

  const updated = new Date(digest.fetchedAt).toLocaleDateString(localeMeta(locale).intl, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ResearchJsonLd digest={digest} locale={locale} />
      <p className="mt-4 text-xs text-[var(--color-text-dim)]">
        {t.lastRefreshed(updated)}
        {" · "}
        {t.studies(total)}
      </p>
      <div className="mt-8 space-y-12">
        {digest.topics.map((topic) =>
          topic.papers.length === 0 ? null : (
            <section key={topic.key} aria-labelledby={`topic-${topic.key}`}>
              <h2
                id={`topic-${topic.key}`}
                className="text-xl font-bold tracking-tight text-[var(--color-text)]"
              >
                {topicTitle(locale, topic)}
              </h2>
              <p className="mt-1 max-w-[70ch] text-sm text-[var(--color-text-muted)]">
                {topicBlurb(locale, topic)}
              </p>
              <ul
                dir="ltr"
                className="mt-4 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 text-left sm:p-6"
              >
                {topic.papers.map((p) => (
                  <PaperRow key={p.id} p={p} cited={t.cited} />
                ))}
              </ul>
            </section>
          ),
        )}
      </div>
    </>
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = researchText(locale);
  const digestPromise = getCachedResearch();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Breadcrumb
          locale={locale}
          items={[
            { name: t.home, href: "/" },
            { name: t.crumb, href: "/research" },
          ]}
        />

        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)] sm:text-4xl">
            {t.h1}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{t.intro}</p>
          <p className="mt-3 text-xs text-[var(--color-text-dim)]">
            {t.sourcesLabel}
            {SOURCES.map((s, i) => (
              <span key={s.name}>
                {i > 0 ? " · " : ""}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--color-gold)] hover:underline"
                >
                  {s.name}
                </a>
              </span>
            ))}
            {t.scholarNote}
          </p>
        </header>

        <Suspense fallback={<ResearchSkeleton />}>
          <ResearchBody promise={digestPromise} locale={locale} />
        </Suspense>

        <section
          aria-labelledby="method-note"
          className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
        >
          <h2 id="method-note" className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-dim)]">
            {t.methodHeading}
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {t.method.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
