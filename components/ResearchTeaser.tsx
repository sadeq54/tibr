import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n-text";
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
          {pick(locale, {
            en: "What academic research says about gold",
            ar: "ماذا يقول البحث العلمي عن الذهب؟",
            fr: "Ce que dit la recherche académique sur l'or",
            tr: "Akademik araştırmalar altın hakkında ne diyor",
            ur: "علمی تحقیق سونے کے بارے میں کیا کہتی ہے؟",
            hi: "सोने पर अकादमिक शोध क्या कहता है",
          })}
        </h2>
        <Link
          href="/research"
          className="shrink-0 text-xs font-semibold text-[var(--color-gold)] transition-colors hover:underline"
        >
          {pick(locale, {
            en: "All studies →",
            ar: "كل الدراسات ←",
            fr: "Toutes les études →",
            tr: "Tüm çalışmalar →",
            ur: "تمام مطالعات ←",
            hi: "सभी अध्ययन →",
          })}
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
                {fmtCitations(p.citations)}{" "}
                {pick(locale, { en: "cited", ar: "استشهاد", fr: "citations", tr: "atıf", ur: "حوالے", hi: "उद्धरण" })}
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      <p className="mt-2 text-[11px] text-[var(--color-text-dim)]">
        {pick(locale, {
          en: "Citation-ranked from arXiv, OpenAlex, Crossref and Semantic Scholar, refreshed daily.",
          ar: "مرتبة حسب الاستشهادات من arXiv وOpenAlex وCrossref وSemantic Scholar، وتُحدّث يوميًا.",
          fr: "Classées par citations à partir d'arXiv, OpenAlex, Crossref et Semantic Scholar, actualisées chaque jour.",
          tr: "arXiv, OpenAlex, Crossref ve Semantic Scholar verilerine göre atıf sırasıyla, günlük güncellenir.",
          ur: "arXiv، OpenAlex، Crossref اور Semantic Scholar سے حوالوں کی بنیاد پر ترتیب، روزانہ اپ ڈیٹ۔",
          hi: "arXiv, OpenAlex, Crossref और Semantic Scholar से उद्धरण-क्रम में, प्रतिदिन अपडेट।",
        })}
      </p>
    </section>
  );
}
