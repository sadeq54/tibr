import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Header } from "@/components/Header";
import { getCachedResearch } from "@/lib/cached-fetchers";
import { buildPageMetadata, canonicalPath, SITE_URL } from "@/lib/metadata";
import { scholarUrl, type ResearchDigest, type ResearchPaper } from "@/lib/research";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const ar = locale === "ar";
  return buildPageMetadata({
    locale,
    path: "/research",
    title: ar
      ? "أبحاث سوق الذهب: دراسات علمية محكّمة عن التحوط والملاذ الآمن"
      : "Gold Market Research: Peer-Reviewed Studies on Hedging & Safe Havens",
    description: ar
      ? "ملخصات محدثة يوميًا لأكثر الأبحاث الأكاديمية استشهادًا عن الذهب: التحوط من التضخم، الملاذ الآمن، محددات السعر، وتنويع المحافظ. المصادر: arXiv وOpenAlex وCrossref وSemantic Scholar."
      : "Daily-refreshed digest of the most-cited academic research on gold: inflation hedging, safe-haven behaviour, price drivers and portfolio allocation. Sourced from arXiv, OpenAlex, Crossref and Semantic Scholar.",
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

function PaperRow({ p, ar }: { p: ResearchPaper; ar: boolean }) {
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
            {fmtCitations(p.citations)} {ar ? "استشهاد" : "cited"}
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
  const ar = locale === "ar";
  const papers = digest.topics.flatMap((t) => t.papers);
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: ar ? "أبحاث سوق الذهب" : "Gold Market Research",
    description: ar
      ? "ملخص محدث يوميًا لأبرز الدراسات الأكاديمية المحكّمة عن أسواق الذهب."
      : "Daily-refreshed digest of the most-cited peer-reviewed studies on gold markets.",
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
  const ar = locale === "ar";
  const total = digest.topics.reduce((n, t) => n + t.papers.length, 0);

  if (total === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 text-center">
        <p className="text-sm font-semibold text-[var(--color-text)]">
          {ar
            ? "تعذّر الوصول إلى المصادر الأكاديمية مؤقتًا."
            : "The academic sources are temporarily unreachable."}
        </p>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {ar
            ? "يُعاد تحميل الملخص تلقائيًا كل 24 ساعة. يمكنك البحث مباشرة عبر المصادر أدناه."
            : "The digest refreshes automatically every 24 hours. You can search the sources below directly."}
        </p>
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

  const updated = new Date(digest.fetchedAt).toLocaleDateString(ar ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ResearchJsonLd digest={digest} locale={locale} />
      <p className="mt-4 text-xs text-[var(--color-text-dim)]">
        {ar ? `آخر تحديث للملخص: ${updated}` : `Digest last refreshed: ${updated}`}
        {" · "}
        {ar ? `${total} دراسة` : `${total} studies`}
      </p>
      <div className="mt-8 space-y-12">
        {digest.topics.map((topic) =>
          topic.papers.length === 0 ? null : (
            <section key={topic.key} aria-labelledby={`topic-${topic.key}`}>
              <h2
                id={`topic-${topic.key}`}
                className="text-xl font-bold tracking-tight text-[var(--color-text)]"
              >
                {ar ? topic.ar : topic.en}
              </h2>
              <p className="mt-1 max-w-[70ch] text-sm text-[var(--color-text-muted)]">
                {ar ? topic.blurbAr : topic.blurbEn}
              </p>
              <ul
                dir="ltr"
                className="mt-4 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 text-left sm:p-6"
              >
                {topic.papers.map((p) => (
                  <PaperRow key={p.id} p={p} ar={ar} />
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
  const ar = locale === "ar";
  const digestPromise = getCachedResearch();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Breadcrumb
          locale={locale}
          items={[
            { name: ar ? "الرئيسية" : "Home", href: "/" },
            { name: ar ? "الأبحاث" : "Research", href: "/research" },
          ]}
        />

        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)] sm:text-4xl">
            {ar ? "ماذا يقول البحث العلمي عن الذهب؟" : "What academic research says about gold"}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {ar
              ? "قبل أي قرار شراء أو بيع، اقرأ ما توصلت إليه الدراسات المحكّمة. نجمع يوميًا أكثر الأوراق الأكاديمية استشهادًا عن الذهب من أربع قواعد بيانات علمية مفتوحة، ونرتبها حسب عدد الاستشهادات، مع رابط مباشر للنص الأصلي ورابط تحقق عبر Google Scholar لكل دراسة."
              : "Before you buy or sell, read what the peer-reviewed evidence actually says. Every day we aggregate the most-cited academic papers on gold from four open scholarly databases, rank them by citation count, and link each study to its original text plus a Google Scholar cross-check."}
          </p>
          <p className="mt-3 text-xs text-[var(--color-text-dim)]">
            {ar ? "المصادر: " : "Sources: "}
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
            {ar
              ? " · لا يوفر Google Scholar واجهة برمجية عامة، لذا نعرض رابط تحقق لكل دراسة بدلًا من ذلك."
              : " · Google Scholar has no public API, so we provide a per-study verification link instead."}
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
            {ar ? "كيف نضمن صحة البيانات" : "How we keep this data correct"}
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            <li>
              {ar
                ? "نقرأ البيانات الوصفية الرسمية فقط (العنوان، المؤلفون، سنة النشر، عدد الاستشهادات) من الواجهات البرمجية المفتوحة، ولا ننسخ نصوص الأبحاث."
                : "We read official metadata only (title, authors, year, citation count) from open APIs; we never republish paper text."}
            </li>
            <li>
              {ar
                ? "تُدمج النسخ المكررة عبر معرف DOI أو العنوان، وتُستبعد السجلات الناقصة، وتُرتب النتائج حسب الاستشهادات."
                : "Duplicates are merged by DOI or title, incomplete records are dropped, and results are ranked by citations."}
            </li>
            <li>
              {ar
                ? "كل دراسة تحمل رابطها الأصلي (DOI أو arXiv) ورابط تحقق عبر Google Scholar، فلا شيء يُعرض دون مصدر يمكن مراجعته."
                : "Every study carries its canonical link (DOI or arXiv) plus a Google Scholar cross-check, so nothing appears without a verifiable source."}
            </li>
            <li>
              {ar
                ? "هذه ملخصات معلوماتية وليست نصيحة استثمارية."
                : "These are informational digests, not investment advice."}
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
