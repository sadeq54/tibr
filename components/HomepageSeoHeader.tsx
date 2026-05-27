import type React from "react";
import { cacheLife } from "next/cache";
import { createTranslator } from "next-intl";

import arMessages from "@/messages/ar.json";
import enMessages from "@/messages/en.json";

import { Flag } from "@/components/Flag";
import { canonicalPath } from "@/lib/metadata";

/**
 * Homepage hero — H1 + intro + quick-links nav, rendered with `"use cache"`
 * so it lands in the static PPR prerender.
 *
 * Why: the homepage `await`s `getTranslations(...)` at the top, which Next 16
 * + `cacheComponents: true` treats as dynamic-by-default. Without this static
 * header, non-JS crawlers (Bing JS-fallback, Seobility, AI bots, Lighthouse
 * SEO check) parse an empty `<main>` and report 0 words / no H1 / no links —
 * which is exactly what Seobility's 27.05.2026 audit showed.
 *
 * Pre-rendering this header at build time per locale puts the H1, intro and
 * the quick-link nav into the HTML response every crawler reads first.
 */
export async function HomepageSeoHeader({ locale }: { locale: string }) {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 3600, expire: 86400 });
  // `createTranslator` not `getTranslations` — request-free, safe in cache.
  const messages = (locale === "ar" ? arMessages : enMessages) as unknown as Record<
    string,
    Record<string, string>
  >;
  const t = createTranslator({ locale, namespace: "Page", messages });

  const links: Array<{ href: string; label: React.ReactNode }> = [
    { href: "/gold-price/24k", label: "24K" },
    { href: "/gold-price/21k", label: "21K" },
    { href: "/gold-price/18k", label: "18K" },
    { href: "/gold-price/14k", label: "14K" },
    { href: "/spot-gold", label: locale === "ar" ? "السعر الفوري" : "Spot Gold" },
    {
      href: "/gold-price-chart",
      label: locale === "ar" ? "الرسم البياني" : "Chart",
    },
    {
      href: "/gold-calculator",
      label: locale === "ar" ? "الحاسبة" : "Calculator",
    },
    {
      href: "/saudi-arabia/gold-price/21k",
      label: (
        <>
          <Flag cc="SA" size={12} className="me-1" />{" "}
          {locale === "ar" ? "السعودية" : "Saudi"}
        </>
      ),
    },
    {
      href: "/uae/gold-price/21k",
      label: (
        <>
          <Flag cc="AE" size={12} className="me-1" />{" "}
          {locale === "ar" ? "الإمارات" : "UAE"}
        </>
      ),
    },
    {
      href: "/egypt/gold-price/21k",
      label: (
        <>
          <Flag cc="EG" size={12} className="me-1" />{" "}
          {locale === "ar" ? "مصر" : "Egypt"}
        </>
      ),
    },
    { href: "/news", label: locale === "ar" ? "الأخبار" : "News" },
  ];

  return (
    <header>
      <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)]">
        {t("h1")}
      </h1>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
        {t.rich("intro", {
          ar: (chunks) => (
            <span
              lang={locale === "ar" ? "en" : "ar"}
              className="text-[var(--color-text)]"
            >
              {chunks}
            </span>
          ),
        })}
      </p>
      <nav
        aria-label={locale === "ar" ? "روابط سريعة" : "Quick links"}
        className="mt-4 flex flex-wrap gap-2 text-sm"
      >
        {links.map((item) => (
          <a
            key={item.href}
            href={canonicalPath(locale, item.href)}
            className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5 px-4 py-2 font-medium text-[var(--color-gold)] transition hover:bg-[var(--color-gold)]/15"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
