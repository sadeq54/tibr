import { useTranslations } from "next-intl";

export function AffiliateBanner({ url }: { url: string }) {
  const t = useTranslations("AffiliateBanner");

  return (
    <a
      href={url}
      target="_blank"
      rel="sponsored noopener"
      className="affiliate-bg card-shadow block overflow-hidden rounded-xl border border-[var(--color-border)] p-5 transition hover:border-[var(--color-gold)]/40"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
            {t("label")}
          </div>
          <div className="mt-1 text-base font-semibold text-[var(--color-text)]">{t("title")}</div>
          <div className="mt-1 text-xs text-[var(--color-text-muted)]">{t("subtitle")}</div>
        </div>
        <span className="rounded-md bg-[var(--color-gold)] px-4 py-2 text-xs font-semibold text-black">
          {t("cta")}
        </span>
      </div>
    </a>
  );
}
