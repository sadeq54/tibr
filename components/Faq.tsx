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

          <svg
            aria-hidden
            className="absolute bottom-0 left-0 w-full pointer-events-none opacity-90"
            height="133"
            viewBox="0 0 400 133"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="faq-gf" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="40%" stopColor="#D4A017" />
                <stop offset="100%" stopColor="#9A6E00" />
              </linearGradient>
              <filter id="faq-eg" x="-6%" y="-40%" width="112%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* row 1 — 1 bar */}
            <rect x="153" y="2" width="94" height="30" rx="3" fill="url(#faq-gf)" />
            <rect x="153" y="2" width="94" height="30" rx="3" fill="none" stroke="#B8860B" strokeWidth="0.5" />
            {/* row 2 — 2 bars */}
            <rect x="105" y="35" width="94" height="30" rx="3" fill="url(#faq-gf)" />
            <rect x="105" y="35" width="94" height="30" rx="3" fill="none" stroke="#B8860B" strokeWidth="0.5" />
            <rect x="202" y="35" width="94" height="30" rx="3" fill="url(#faq-gf)" />
            <rect x="202" y="35" width="94" height="30" rx="3" fill="none" stroke="#B8860B" strokeWidth="0.5" />
            {/* row 3 — 3 bars */}
            <rect x="56" y="68" width="94" height="30" rx="3" fill="url(#faq-gf)" />
            <rect x="56" y="68" width="94" height="30" rx="3" fill="none" stroke="#B8860B" strokeWidth="0.5" />
            <rect x="153" y="68" width="94" height="30" rx="3" fill="url(#faq-gf)" />
            <rect x="153" y="68" width="94" height="30" rx="3" fill="none" stroke="#B8860B" strokeWidth="0.5" />
            <rect x="250" y="68" width="94" height="30" rx="3" fill="url(#faq-gf)" />
            <rect x="250" y="68" width="94" height="30" rx="3" fill="none" stroke="#B8860B" strokeWidth="0.5" />
            {/* row 4 — 4 bars, edge to edge */}
            <rect x="8" y="101" width="94" height="30" rx="3" fill="url(#faq-gf)" />
            <rect x="8" y="101" width="94" height="30" rx="3" fill="none" stroke="#B8860B" strokeWidth="0.5" />
            <rect x="105" y="101" width="94" height="30" rx="3" fill="url(#faq-gf)" />
            <rect x="105" y="101" width="94" height="30" rx="3" fill="none" stroke="#B8860B" strokeWidth="0.5" />
            <rect x="202" y="101" width="94" height="30" rx="3" fill="url(#faq-gf)" />
            <rect x="202" y="101" width="94" height="30" rx="3" fill="none" stroke="#B8860B" strokeWidth="0.5" />
            <rect x="299" y="101" width="94" height="30" rx="3" fill="url(#faq-gf)" />
            <rect x="299" y="101" width="94" height="30" rx="3" fill="none" stroke="#B8860B" strokeWidth="0.5" />
            <path
              d="M8,133 L8,101 L56,101 L56,68 L105,68 L105,35 L153,35 L153,2 L247,2 L247,35 L296,35 L296,68 L344,68 L344,101 L393,101 L393,133"
              fill="none"
              stroke="#FFE066"
              strokeWidth="3"
              strokeLinejoin="miter"
              filter="url(#faq-eg)"
              opacity="0.95"
            />
          </svg>
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
