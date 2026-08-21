import { Link } from "@/i18n/navigation";
import type { ResearchDigest } from "@/lib/research";

function fmtCitations(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

/**
 * Homepage teaser: the three most-cited academic papers on gold, feeding the
 * full /research digest. Renders nothing if the digest is empty (sources down).
 */
export function ResearchTeaser({ digest, locale }: { digest: ResearchDigest; locale: string }) {
  const ar = locale === "ar";
  const top = digest.topics
    .flatMap((t) => t.papers)
    .sort((a, b) => (b.citations ?? -1) - (a.citations ?? -1))
    .slice(0, 3);

  if (top.length === 0) return null;

  return (
    <section aria-labelledby="research-teaser-heading">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h2
          id="research-teaser-heading"
          className="text-xl font-semibold text-[var(--color-text)]"
        >
          {ar ? "ماذا يقول البحث العلمي عن الذهب؟" : "What academic research says about gold"}
        </h2>
        <Link
          href="/research"
          className="shrink-0 text-xs font-semibold text-[var(--color-gold)] transition-colors hover:underline"
        >
          {ar ? "كل الدراسات ←" : "All studies →"}
        </Link>
      </div>

      <ul
        dir="ltr"
        className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 text-left"
      >
        {top.map((p) => (
          <li key={p.id} className="flex items-baseline justify-between gap-4 py-3.5">
            <div className="min-w-0">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="line-clamp-1 text-sm font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-gold)]"
              >
                {p.title}
              </a>
              <div className="mt-0.5 truncate text-xs text-[var(--color-text-dim)]">
                {p.authors.slice(0, 2).join(", ")}
                {p.authors.length > 2 ? " et al." : ""}
                {p.year ? ` · ${p.year}` : ""}
                {p.venue ? ` · ${p.venue}` : ""}
              </div>
            </div>
            {p.citations !== null ? (
              <span className="num shrink-0 font-mono text-xs font-semibold text-[var(--color-gold)]">
                {fmtCitations(p.citations)} {ar ? "استشهاد" : "cited"}
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      <p className="mt-2 text-[11px] text-[var(--color-text-dim)]">
        {ar
          ? "مرتبة حسب الاستشهادات من arXiv وOpenAlex وCrossref وSemantic Scholar، وتُحدّث يوميًا."
          : "Citation-ranked from arXiv, OpenAlex, Crossref and Semantic Scholar, refreshed daily."}
      </p>
    </section>
  );
}
