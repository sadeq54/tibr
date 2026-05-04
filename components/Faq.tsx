import { useTranslations } from "next-intl";

export function Faq() {
  const t = useTranslations("Faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;

  return (
    <section
      aria-labelledby="faq-heading"
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
    >
      <h2 id="faq-heading" className="text-xl font-semibold text-[var(--color-text)]">
        {t("heading")}
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t("subtitle")}</p>

      <dl className="mt-5 space-y-4">
        {items.map((item) => (
          <div
            key={item.q}
            className="border-t border-[var(--color-border)] pt-4 first:border-0 first:pt-0"
          >
            <dt className="text-base font-semibold text-[var(--color-gold)]">{item.q}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
