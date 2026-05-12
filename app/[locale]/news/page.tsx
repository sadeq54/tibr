import { connection } from "next/server";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { fetchNews } from "@/lib/news";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

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

  return (
    <PageShell title={t("newsH1")} intro={t("newsIntro")} showFaq={false}>
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
