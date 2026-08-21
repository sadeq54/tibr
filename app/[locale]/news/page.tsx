import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { Link } from "@/i18n/navigation";
import { localeMeta } from "@/i18n/routing";
import { getCachedNews } from "@/lib/cached-fetchers";
import { pick } from "@/lib/i18n-text";
import {
  buildAlternates,
  buildOpenGraph,
  canonicalPath,
  SITE_URL,
} from "@/lib/metadata";
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

  const items = await getCachedNews(30);
  const editorial = [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const pageUrl = canonicalPath(locale, "/news");

  // ItemList schema enriches the aggregated headlines as a curated list
  // of NewsArticle citations — gives Google a structured signal that
  // /news is a news hub, not generic content. Each item points to its
  // original source via `url`, so we explicitly do NOT claim authorship.
  const itemListSchema = items.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${SITE_URL}${pageUrl}#headlines`,
        name: pick(locale, {
          en: "Latest gold market headlines",
          ar: "آخر أخبار سوق الذهب",
          fr: "Dernières actualités du marché de l'or",
          tr: "Altın piyasasından son başlıklar",
          ur: "سونے کی مارکیٹ کی تازہ ترین سرخیاں",
          hi: "सोना बाज़ार की ताज़ा सुर्खियाँ",
        }),
        description: pick(locale, {
          en: "Aggregated real-time gold market headlines from Kitco, Mining.com, BullionVault, Yahoo Finance and CoinDesk",
          ar: "تجميع لحظي لعناوين أخبار الذهب من Kitco، Mining.com، BullionVault، Yahoo Finance، CoinDesk",
          fr: "Titres du marché de l'or agrégés en temps réel depuis Kitco, Mining.com, BullionVault, Yahoo Finance et CoinDesk",
          tr: "Kitco, Mining.com, BullionVault, Yahoo Finance ve CoinDesk'ten gerçek zamanlı derlenen altın piyasası başlıkları",
          ur: "Kitco، Mining.com، BullionVault، Yahoo Finance اور CoinDesk سے ریئل ٹائم جمع کردہ سونے کی مارکیٹ کی سرخیاں",
          hi: "Kitco, Mining.com, BullionVault, Yahoo Finance और CoinDesk से रीयल-टाइम संकलित सोना बाज़ार की सुर्खियाँ",
        }),
        inLanguage: locale,
        numberOfItems: items.length,
        itemListElement: items.slice(0, 10).map((n, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "NewsArticle",
            headline: n.title,
            url: n.link,
            datePublished: n.pubDate,
            publisher: { "@type": "Organization", name: n.source },
          },
        })),
      }
    : null;

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey="newsH1"
      introKey="newsIntro"
      showFaq={false}
    >
      {itemListSchema ? (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, "\\u003c") }}
        />
      ) : null}
      {editorial.length > 0 ? (
        <section className="mb-10">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)]">
            {pick(locale, {
              en: "Editorial articles",
              ar: "مقالات تحريرية",
              fr: "Articles de la rédaction",
              tr: "Editoryal yazılar",
              ur: "ادارتی مضامین",
              hi: "संपादकीय लेख",
            })}
          </h2>
          <ul className="space-y-3">
            {editorial.map((a) => (
              <li
                key={a.slug}
                className="rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-bg-card)] p-5 transition hover:border-[var(--color-gold)]/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                    {pick(locale, {
                      en: "Editorial",
                      ar: "تحرير",
                      fr: "Rédaction",
                      tr: "Editoryal",
                      ur: "ادارتی",
                      hi: "संपादकीय",
                    })}
                  </span>
                  <time
                    dateTime={a.publishedAt}
                    className="text-[10px] text-[var(--color-text-dim)]"
                  >
                    {formatDate(a.publishedAt, locale)}
                  </time>
                </div>
                <Link
                  href={`/news/${a.slug}` as never}
                  className="mt-1 block font-semibold text-[var(--color-text)] hover:text-[var(--color-gold)]"
                >
                  {pick(locale, { en: a.title_en, ar: a.title_ar })}
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {pick(locale, { en: a.description_en, ar: a.description_ar })}
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
        {pick(locale, {
          en: "From around the web",
          ar: "من حول الويب",
          fr: "Ailleurs sur le web",
          tr: "Web'den derlemeler",
          ur: "ویب سے منتخب",
          hi: "वेब से चुनिंदा",
        })}
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
                  {formatDate(n.pubDate, locale)}
                </time>
              </div>
              <a
                href={n.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
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
                rel="nofollow noopener noreferrer"
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
  return d.toLocaleDateString(localeMeta(locale).intl, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
