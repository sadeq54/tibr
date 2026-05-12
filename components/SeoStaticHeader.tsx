import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";

import { canonicalPath, SITE_URL } from "@/lib/metadata";

/**
 * Cached server-rendered SEO header — emits the page H1 + intro paragraph +
 * (optional) breadcrumb nav into the prerendered HTML shell.
 *
 * Why this exists: with Next 16 PPR + `cacheComponents: true`, pages that
 * `await getTranslations()` are treated as dynamic by default and their
 * markup streams via RSC. Crawlers without JS (most AI bots) only see the
 * static prerender — empty <main>, no H1.
 *
 * Marking this component with `"use cache"` tells the framework to render it
 * statically at build time per locale/param combo, so the H1 lands in the
 * HTML response that AI crawlers actually parse.
 */
export async function SeoStaticHeader({
  locale,
  namespace,
  titleKey,
  introKey,
  titleVars,
  introVars,
  breadcrumb,
}: {
  locale: string;
  namespace: string;
  titleKey: string;
  introKey?: string;
  titleVars?: Record<string, string | number>;
  introVars?: Record<string, string | number>;
  breadcrumb?: Array<{ name: string; path: string }>;
}) {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 3600, expire: 86400 });
  const t = await getTranslations({ locale, namespace });
  return (
    <header className="mb-6">
      {breadcrumb && breadcrumb.length > 0 ? (
        <nav aria-label="Breadcrumb" className="mb-2 text-xs text-[var(--color-text-dim)]">
          <ol className="flex flex-wrap items-center gap-1">
            {breadcrumb.map((b, i) => {
              const last = i === breadcrumb.length - 1;
              const href = canonicalPath(locale, b.path);
              return (
                <li key={`${b.name}-${b.path}`} className="flex items-center gap-1">
                  {last ? (
                    <span className="text-[var(--color-text-muted)]">{b.name}</span>
                  ) : (
                    <a
                      href={`${SITE_URL}${href}`}
                      className="text-[var(--color-text-dim)] hover:text-[var(--color-gold)] hover:underline"
                    >
                      {b.name}
                    </a>
                  )}
                  {last ? null : <span aria-hidden>›</span>}
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}
      <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)]">
        {t(titleKey, titleVars)}
      </h1>
      {introKey ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          {t(introKey, introVars)}
        </p>
      ) : null}
    </header>
  );
}
