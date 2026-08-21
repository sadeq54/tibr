import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { AuthorByline } from "@/components/AuthorByline";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Sidebar } from "@/components/Sidebar";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n-text";
import { buildAlternates, buildOpenGraph, canonicalPath, SITE_URL } from "@/lib/metadata";
import { ARTICLES, articleWordCount, getArticleBySlug, listArticleSlugs } from "@/content/news/articles";

export async function generateStaticParams() {
  return listArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const title = pick(locale, { en: article.title_en, ar: article.title_ar });
  const description = pick(locale, { en: article.description_en, ar: article.description_ar });
  return {
    title,
    description,
    alternates: buildAlternates(locale, `/news/${slug}`),
    openGraph: {
      ...buildOpenGraph(locale, `/news/${slug}`),
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: article.author ? [`${SITE_URL}${article.author.url}`] : undefined,
      tags: article.tags,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "SubPage" });

  // Article bodies exist in ar/en only; other locales read the English text.
  const title = pick(locale, { en: article.title_en, ar: article.title_ar });
  const description = pick(locale, { en: article.description_en, ar: article.description_ar });
  const body = pick(locale, { en: article.body_en, ar: article.body_ar });
  const bodyLang = locale === "ar" ? "ar" : "en";
  const pageUrl = canonicalPath(locale, `/news/${slug}`);
  const homeCrumb = {
    name: pick(locale, { en: "Home", ar: "الرئيسية", fr: "Accueil", tr: "Ana sayfa", ur: "ہوم", hi: "होम" }),
    href: canonicalPath(locale, "/"),
  };
  const newsCrumb = { name: t("newsH1"), href: canonicalPath(locale, "/news") };
  const author = article.author ?? {
    name: "Sadeq Sayed Ahmad",
    url: "/about/sadeq",
    image: "/author/sadeq.jpeg",
  };

  const wordCount = articleWordCount(article, locale);
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${SITE_URL}${pageUrl}#article`,
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${pageUrl}#webpage` },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: bodyLang,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person-sadeq`,
      name: author.name,
      url: `${SITE_URL}${author.url}`,
      image: `${SITE_URL}${author.image}`,
    },
    publisher: { "@id": `${SITE_URL}/#org` },
    keywords: article.tags.join(", "),
    articleSection: "Commodities",
    isAccessibleForFree: true,
    wordCount,
    timeRequired: `PT${Math.max(1, Math.round(wordCount / 200))}M`,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  };

  return (
    <>
      <JsonLd
        siteUrl={SITE_URL}
        pageType="WebPage"
        pageUrl={pageUrl}
        pageName={title}
        pageOnly
        breadcrumb={[
          { name: homeCrumb.name, url: homeCrumb.href },
          { name: newsCrumb.name, url: newsCrumb.href },
          { name: title, url: pageUrl },
        ]}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Breadcrumb
          locale={locale}
          items={[homeCrumb, newsCrumb, { name: title, href: pageUrl }]}
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <article className="min-w-0">
            <header className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-text-muted)]">
                {description}
              </p>
              <AuthorByline
                name={author.name}
                photo={author.image}
                profileUrl={author.url}
                publishedAt={article.publishedAt}
                updatedAt={article.updatedAt}
                locale={locale}
              />
            </header>

            <div className="prose-article" lang={bodyLang} dir={bodyLang === "ar" ? "rtl" : "ltr"}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children, ...props }) => (
                    <h2
                      {...props}
                      className="mt-10 text-2xl font-semibold text-[var(--color-text)]"
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children, ...props }) => (
                    <h3
                      {...props}
                      className="mt-6 text-xl font-semibold text-[var(--color-text)]"
                    >
                      {children}
                    </h3>
                  ),
                  p: (props) => (
                    <p
                      {...props}
                      className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]"
                    />
                  ),
                  ul: (props) => (
                    <ul
                      {...props}
                      className="mt-4 list-disc space-y-2 pl-6 text-base text-[var(--color-text-muted)] rtl:pl-0 rtl:pr-6"
                    />
                  ),
                  ol: (props) => (
                    <ol
                      {...props}
                      className="mt-4 list-decimal space-y-2 pl-6 text-base text-[var(--color-text-muted)] rtl:pl-0 rtl:pr-6"
                    />
                  ),
                  li: (props) => <li {...props} className="leading-relaxed" />,
                  a: ({ children, ...props }) => (
                    <a
                      {...props}
                      className="font-medium text-[var(--color-gold)] underline hover:no-underline"
                    >
                      {children}
                    </a>
                  ),
                  strong: (props) => (
                    <strong {...props} className="font-semibold text-[var(--color-text)]" />
                  ),
                  code: (props) => (
                    <code
                      {...props}
                      className="rounded bg-[var(--color-bg-card)] px-1.5 py-0.5 font-mono text-sm text-[var(--color-gold)]"
                    />
                  ),
                  pre: (props) => (
                    <pre
                      {...props}
                      className="mt-4 overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 text-sm leading-relaxed text-[var(--color-text-muted)]"
                    />
                  ),
                  table: (props) => (
                    <div className="mt-4 overflow-x-auto">
                      <table
                        {...props}
                        className="w-full border-collapse text-sm text-[var(--color-text-muted)]"
                      />
                    </div>
                  ),
                  th: (props) => (
                    <th
                      {...props}
                      className="border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-2 text-left font-semibold text-[var(--color-text)] rtl:text-right"
                    />
                  ),
                  td: (props) => (
                    <td
                      {...props}
                      className="border border-[var(--color-border)] px-3 py-2 text-left rtl:text-right"
                    />
                  ),
                  blockquote: (props) => (
                    <blockquote
                      {...props}
                      className="mt-4 border-l-4 border-[var(--color-gold)] bg-[var(--color-bg-card)] px-4 py-2 text-base italic text-[var(--color-text-muted)] rtl:border-l-0 rtl:border-r-4"
                    />
                  ),
                }}
              >
                {body}
              </ReactMarkdown>
            </div>

            <section className="mt-12 border-t border-[var(--color-border)] pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                {pick(locale, {
                  en: "Related articles",
                  ar: "مقالات ذات صلة",
                  fr: "Articles associés",
                  tr: "İlgili yazılar",
                  ur: "متعلقہ مضامین",
                  hi: "संबंधित लेख",
                })}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {ARTICLES.filter((a) => a.slug !== slug)
                  .slice(0, 3)
                  .map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/news/${a.slug}` as never}
                        className="text-[var(--color-gold)] underline hover:no-underline"
                      >
                        {pick(locale, { en: a.title_en, ar: a.title_ar })}
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          </article>
          <Sidebar />
        </div>
      </main>
    </>
  );
}
