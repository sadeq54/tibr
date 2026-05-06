import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function Faq() {
  const t = useTranslations("Faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;

  return (
    <section aria-labelledby="faq-heading" className="space-y-10">
      <div className="flex flex-col items-center text-center">
        <span className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          {t("badge")}
        </span>
        <h2
          id="faq-heading"
          className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl"
        >
          {t("heading")}
        </h2>
        <p className="mt-3 max-w-xl text-sm text-[var(--color-text-muted)] md:text-base">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-[5fr_7fr] md:gap-6">
        <aside className="faq-support-bg card-shadow relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] p-6 md:p-8">
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-[var(--color-text)] md:text-2xl">
              {t("supportTitle")}
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-text-muted)]">
              {t("supportBody")}
            </p>
          </div>

          <div
            aria-hidden
            className="faq-cone absolute -bottom-12 -right-12 opacity-90"
          />
        </aside>

        <div className="space-y-3">
          {items.map((item, i) => (
            <details key={item.q} className="faq-item group" open={i === 0}>
              <summary>
                <span>{item.q}</span>
                <span className="chev" aria-hidden>
                  <ChevronDown size={16} />
                </span>
              </summary>
              <div className="body">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
