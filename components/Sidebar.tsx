import { useTranslations } from "next-intl";

import { AdSensePlacement } from "@/components/AdSensePlacement";
import { AdSlot } from "@/components/AdSlot";
import { Link } from "@/i18n/navigation";

const KARAT_LINKS = [
  { href: "/gold-price/24k", key: "linkKarat24" as const },
  { href: "/gold-price/21k", key: "linkKarat21" as const },
  { href: "/gold-price/18k", key: "linkKarat18" as const },
];

const COUNTRY_LINKS = [
  { href: "/jordan/gold-price/21k", key: "linkJordan" as const },
  { href: "/saudi-arabia/gold-price/21k", key: "linkSaudi" as const },
  { href: "/uae/gold-price/21k", key: "linkUAE" as const },
  { href: "/egypt/gold-price/21k", key: "linkEgypt" as const },
];

/**
 * Right column: one XM affiliate slot on top, quick links, and (desktop only)
 * the tall AdSense unit — rendered only once the publisher id + slot id exist.
 */
export function Sidebar() {
  const t = useTranslations("Sidebar");

  return (
    <aside className="space-y-4 lg:sticky lg:top-[96px] lg:self-start">
      <AdSlot slot={0} label={t("adTop")} />

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
          {t("quickLinks")}
        </h2>
        <nav className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3 lg:grid-cols-1">
          {KARAT_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[var(--color-gold)] hover:underline"
            >
              {t(l.key)}
            </Link>
          ))}
          <div className="col-span-full my-1 hidden h-px bg-[var(--color-border)] lg:block" />
          {COUNTRY_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[var(--color-gold)] hover:underline"
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
      </div>

      <AdSensePlacement name="sidebar" />
    </aside>
  );
}
