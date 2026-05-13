import { connection } from "next/server";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { Link } from "@/i18n/navigation";
import { fetchNews } from "@/lib/news";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";
import { ARTICLES } from "@/content/news/articles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("newsH1"), description: t("newsIntro"),
    alternates: buildAlternates(locale, "/news"),
    openGraph: buildOpenGraph(locale, "/news"),
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");
  await connection();

  const items = await fetchNews(30);
  const lang = await getLocale();
  const editorial = [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <PageShell title={t("newsH1")} intro={t("newsIntro")} showFaq={false}>
      {editorial.length > 0 ? (
        <section className="mb-10">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)]">
            {lang === "ar" ? "مقالات تحريرية" : "Editorial articles"}
          </h2>
          <ul className="space-y-3">
            {editorial.map((a) => (
              <li
                key={a.slug}
                className="rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-bg-card)] p-5 transition hover:border-[var(--color-gold)]/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                    {lang === "ar" ? "تحرير" : "Editorial"}
                  </span>
                  <time
                    dateTime={a.publishedAt}
                    className="text-[10px] text-[var(--color-text-dim)]"
                  >
                    {formatDate(a.publishedAt, lang)}
                  </time>
                </div>
                <Link
                  href={`/news/${a.slug}` as never}
                  className="mt-1 block font-semibold text-[var(--color-text)] hover:text-[var(--color-gold)]"
                >
                  {lang === "ar" ? a.title_ar : a.title_en}
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {lang === "ar" ? a.description_ar : a.description_en}
                </p>
                <Link
                  href={`/news/${a.slug}` as never}
                  className="mt-2 inline-block text-xs text-[var(--color-gold)] hover:underline"
                >
                  {t("newsReadMore")} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
        {lang === "ar" ? "من حول الويب" : "From around the web"}
      </h2>

      {items.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 text-sm text-[var(--color-text-dim)]">
          {t("newsUnavailable")}
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => (
            <li
              key={n.link}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 transition hover:border-[var(--color-gold)]/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                  {n.source}
                </span>
                <time
                  dateTime={n.pubDate}
                  className="text-[10px] text-[var(--color-text-dim)]"
                >
                  {formatDate(n.pubDate, lang)}
                </time>
              </div>
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-semibold text-[var(--color-text)] hover:text-[var(--color-gold)]"
              >
                {n.title}
              </a>
              {n.description ? (
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {n.description}
                </p>
              ) : null}
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-[var(--color-gold)] hover:underline"
              >
                {t("newsReadMore")}
              </a>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}

function formatDate(s: string, locale: string): string {
  const t = Date.parse(s);
  if (!Number.isFinite(t)) return s;
  const d = new Date(t);
  return d.toLocaleDateString(locale === "ar" ? "ar" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
