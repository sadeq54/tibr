import { ChevronRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

type Crumb = { name: string; href: string };

/**
 * Visible breadcrumb navigation. The matching `BreadcrumbList` JSON-LD is
 * emitted by `<JsonLd breadcrumb={...} />` — pass the same array to both.
 *
 * RTL-aware: chevron flips direction via Tailwind `rtl:` modifier.
 */
export function Breadcrumb({ items, locale }: { items: Crumb[]; locale: string }) {
  if (items.length < 2) return null;

  return (
    <nav
      aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"}
      className="mb-4 overflow-x-auto"
    >
      <ol className="flex items-center gap-1.5 whitespace-nowrap text-xs text-[var(--color-text-dim)]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.href}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight
                  size={12}
                  className="text-[var(--color-text-dim)] rtl:rotate-180"
                  aria-hidden
                />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-medium text-[var(--color-text)]"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href as never}
                  className="hover:text-[var(--color-gold)]"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
