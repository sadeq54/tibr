// Scholarly research aggregation — peer-indexed metadata only, no scraping.
// Built on lib/crawler.ts, the fetching core ported from arabi-kids' Asset
// Scout (same politeness, isolation and validation rules).
//
// Google Scholar exposes no public API (and blocks automated queries), so we
// aggregate the same corpus through the four open scholarly APIs that DO
// permit programmatic access:
//   - arXiv            official Atom API      export.arxiv.org
//   - OpenAlex         open scholarly catalog api.openalex.org
//   - Crossref         DOI registry           api.crossref.org
//   - Semantic Scholar AI2 academic graph     api.semanticscholar.org
//
// "Correct data" guarantees: every record is validated + normalized before
// display, deduplicated by DOI/title, ranked by citation count, and links to
// its canonical landing page (DOI / arXiv abs). The UI also renders a
// per-paper Google Scholar verification link so readers can cross-check.

export type ResearchSource = "arXiv" | "OpenAlex" | "Crossref" | "Semantic Scholar";

export type ResearchPaper = {
  id: string;
  title: string;
  authors: string[];
  year: number | null;
  venue: string;
  abstract: string;
  url: string;
  doi: string | null;
  citations: number | null;
  source: ResearchSource;
};

export type ResearchTopic = {
  key: "hedge" | "safe-haven" | "drivers" | "portfolio";
  query: string;
  en: string;
  ar: string;
  blurbEn: string;
  blurbAr: string;
  papers: ResearchPaper[];
};

export type ResearchDigest = {
  fetchedAt: string;
  topics: ResearchTopic[];
};

export const RESEARCH_TOPICS: Array<Omit<ResearchTopic, "papers">> = [
  {
    key: "hedge",
    query: "gold inflation hedge",
    en: "Gold as an inflation hedge",
    ar: "الذهب كتحوّط ضد التضخم",
    blurbEn: "Does gold actually protect purchasing power? What the evidence says across decades and markets.",
    blurbAr: "هل يحمي الذهب فعلًا القوة الشرائية؟ ما تقوله الأدلة عبر العقود والأسواق المختلفة.",
  },
  {
    key: "safe-haven",
    query: "gold safe haven asset",
    en: "Gold as a safe haven",
    ar: "الذهب كملاذ آمن",
    blurbEn: "How gold behaves in crises versus stocks, bonds and the dollar.",
    blurbAr: "كيف يتصرف الذهب في الأزمات مقارنة بالأسهم والسندات والدولار.",
  },
  {
    key: "drivers",
    query: "gold price determinants",
    en: "What drives the gold price",
    ar: "محددات سعر الذهب",
    blurbEn: "Real rates, the dollar, central-bank demand: the forces research links to gold's moves.",
    blurbAr: "الفائدة الحقيقية والدولار وطلب البنوك المركزية: القوى التي يربطها البحث بتحركات الذهب.",
  },
  {
    key: "portfolio",
    query: "gold portfolio diversification",
    en: "Gold in a portfolio",
    ar: "الذهب في المحفظة الاستثمارية",
    blurbEn: "Optimal allocations and diversification benefits of holding gold alongside other assets.",
    blurbAr: "النسب المُثلى وفوائد التنويع عند إضافة الذهب إلى الأصول الأخرى.",
  },
];

import { fetchJson, fetchText, gatherSettled, mapSequential } from "./crawler";

const REVALIDATE = 86400; // daily
const PER_SOURCE = 8;
const PER_TOPIC = 6;

const getText = (url: string) => fetchText(url, { revalidate: REVALIDATE });
const getJson = <T>(url: string) => fetchJson<T>(url, { revalidate: REVALIDATE });

function stripMarkup(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#?\w+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function xmlTag(block: string, tag: string): string {
  const safe = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<${safe}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${safe}>`, "i");
  const m = block.match(re);
  return m ? m[1].trim() : "";
}

// ── Sources ─────────────────────────────────────────────────────────────────

async function fromArxiv(query: string): Promise<ResearchPaper[]> {
  // arXiv's export host serves https; Atom <id> links come back as http and
  // are upgraded in tidy().
  const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(
    query,
  )}&start=0&max_results=${PER_SOURCE}&sortBy=relevance`;
  const xml = await getText(url);
  if (!xml) return [];
  const out: ResearchPaper[] = [];
  for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const block = m[1];
    const id = xmlTag(block, "id");
    const doi = xmlTag(block, "arxiv:doi") || null;
    out.push({
      id: `arxiv:${id}`,
      title: stripMarkup(xmlTag(block, "title")),
      authors: [...block.matchAll(/<name>([^<]+)<\/name>/g)].map((a) => a[1].trim()),
      year: Number.parseInt(xmlTag(block, "published").slice(0, 4), 10) || null,
      venue: "arXiv preprint",
      abstract: stripMarkup(xmlTag(block, "summary")),
      url: id,
      doi,
      citations: null,
      source: "arXiv",
    });
  }
  return out;
}

type OpenAlexWork = {
  id?: string;
  display_name?: string;
  publication_year?: number;
  cited_by_count?: number;
  doi?: string;
  primary_location?: { source?: { display_name?: string } };
  authorships?: Array<{ author?: { display_name?: string } }>;
  abstract_inverted_index?: Record<string, number[]>;
};

function fromInvertedIndex(inv?: Record<string, number[]>): string {
  if (!inv) return "";
  const words: Array<[number, string]> = [];
  for (const [w, positions] of Object.entries(inv)) {
    for (const p of positions) words.push([p, w]);
  }
  return words
    .sort((a, b) => a[0] - b[0])
    .map((x) => x[1])
    .join(" ");
}

async function fromOpenAlex(query: string): Promise<ResearchPaper[]> {
  const url = `https://api.openalex.org/works?search=${encodeURIComponent(
    query,
  )}&filter=type:article&per-page=${PER_SOURCE}&sort=cited_by_count:desc&mailto=contact@goldpricesarabia.com`;
  const json = await getJson<{ results?: OpenAlexWork[] }>(url);
  if (!json?.results) return [];
  return json.results.map((w) => ({
    id: `openalex:${w.id ?? w.display_name ?? ""}`,
    title: stripMarkup(w.display_name ?? ""),
    authors: (w.authorships ?? [])
      .map((a) => a.author?.display_name ?? "")
      .filter(Boolean),
    year: w.publication_year ?? null,
    venue: w.primary_location?.source?.display_name ?? "",
    abstract: stripMarkup(fromInvertedIndex(w.abstract_inverted_index)),
    url: w.doi ?? w.id ?? "",
    doi: w.doi ? w.doi.replace(/^https?:\/\/doi\.org\//i, "") : null,
    citations: w.cited_by_count ?? null,
    source: "OpenAlex",
  }));
}

type CrossrefItem = {
  DOI?: string;
  URL?: string;
  title?: string[];
  author?: Array<{ given?: string; family?: string }>;
  issued?: { "date-parts"?: number[][] };
  "container-title"?: string[];
  "is-referenced-by-count"?: number;
  abstract?: string;
};

async function fromCrossref(query: string): Promise<ResearchPaper[]> {
  const url = `https://api.crossref.org/works?query=${encodeURIComponent(
    query,
  )}&rows=${PER_SOURCE}&sort=is-referenced-by-count&order=desc&filter=type:journal-article`;
  const json = await getJson<{ message?: { items?: CrossrefItem[] } }>(url);
  const items = json?.message?.items;
  if (!items) return [];
  return items.map((it) => ({
    id: `crossref:${it.DOI ?? it.URL ?? ""}`,
    title: stripMarkup(it.title?.[0] ?? ""),
    authors: (it.author ?? [])
      .map((a) => [a.given, a.family].filter(Boolean).join(" "))
      .filter(Boolean),
    year: it.issued?.["date-parts"]?.[0]?.[0] ?? null,
    venue: it["container-title"]?.[0] ?? "",
    abstract: stripMarkup(it.abstract ?? ""),
    url: it.URL ?? (it.DOI ? `https://doi.org/${it.DOI}` : ""),
    doi: it.DOI ?? null,
    citations: it["is-referenced-by-count"] ?? null,
    source: "Crossref",
  }));
}

type S2Paper = {
  paperId?: string;
  title?: string;
  abstract?: string | null;
  year?: number | null;
  venue?: string | null;
  url?: string;
  citationCount?: number;
  authors?: Array<{ name?: string }>;
  externalIds?: { DOI?: string };
};

async function fromSemanticScholar(query: string): Promise<ResearchPaper[]> {
  const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(
    query,
  )}&limit=${PER_SOURCE}&fields=title,abstract,year,venue,authors,url,citationCount,externalIds`;
  const json = await getJson<{ data?: S2Paper[] }>(url);
  if (!json?.data) return [];
  return json.data.map((p) => ({
    id: `s2:${p.paperId ?? p.title ?? ""}`,
    title: stripMarkup(p.title ?? ""),
    authors: (p.authors ?? []).map((a) => a.name ?? "").filter(Boolean),
    year: p.year ?? null,
    venue: p.venue ?? "",
    abstract: stripMarkup(p.abstract ?? ""),
    url: p.url ?? (p.externalIds?.DOI ? `https://doi.org/${p.externalIds.DOI}` : ""),
    doi: p.externalIds?.DOI ?? null,
    citations: p.citationCount ?? null,
    source: "Semantic Scholar",
  }));
}

// ── Validation, dedupe, ranking ─────────────────────────────────────────────

function titleKey(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9؀-ۿ]+/g, "");
}

function isValid(p: ResearchPaper): boolean {
  return (
    p.title.length >= 10 &&
    /^https?:\/\//i.test(p.url) &&
    (p.year === null || (p.year >= 1950 && p.year <= 2100))
  );
}

function tidy(p: ResearchPaper): ResearchPaper {
  return {
    ...p,
    title: p.title.slice(0, 300),
    abstract: p.abstract.slice(0, 500),
    authors: p.authors.slice(0, 8),
    venue: p.venue.slice(0, 120),
    url: p.url.replace(/^http:\/\//i, "https://"),
  };
}

/** Merge duplicates (same DOI or normalized title), keeping the richest record. */
function dedupe(papers: ResearchPaper[]): ResearchPaper[] {
  const byKey = new Map<string, ResearchPaper>();
  for (const p of papers) {
    const key = p.doi ? `doi:${p.doi.toLowerCase()}` : `t:${titleKey(p.title)}`;
    const prev = byKey.get(key);
    if (!prev) {
      byKey.set(key, p);
      continue;
    }
    const better =
      (p.citations ?? -1) > (prev.citations ?? -1) ||
      ((p.citations ?? -1) === (prev.citations ?? -1) && p.abstract.length > prev.abstract.length);
    byKey.set(key, {
      ...(better ? p : prev),
      abstract: (better ? p : prev).abstract || (better ? prev : p).abstract,
      citations: Math.max(p.citations ?? -1, prev.citations ?? -1) >= 0
        ? Math.max(p.citations ?? 0, prev.citations ?? 0)
        : null,
      doi: p.doi ?? prev.doi,
    });
  }
  return [...byKey.values()];
}

function rank(papers: ResearchPaper[]): ResearchPaper[] {
  return papers
    .sort((a, b) => (b.citations ?? -1) - (a.citations ?? -1))
    .slice(0, PER_TOPIC);
}

async function fetchTopic(query: string): Promise<ResearchPaper[]> {
  // Sources run in PARALLEL — different hosts, per-host politeness holds
  // because topics run sequentially (Asset Scout invariant).
  const results = await gatherSettled<ResearchPaper>([
    ["openalex", fromOpenAlex(query)],
    ["crossref", fromCrossref(query)],
    ["semanticscholar", fromSemanticScholar(query)],
    ["arxiv", fromArxiv(query)],
  ]);
  return rank(dedupe(results.map(tidy).filter(isValid)));
}

/** Aggregate all topics; papers matching several topics stay in the first. */
export async function fetchResearch(): Promise<ResearchDigest> {
  // Topics hit the same four hosts → sequential with politeness spacing.
  const perTopic = await mapSequential(RESEARCH_TOPICS, (t) => fetchTopic(t.query));
  const seen = new Set<string>();
  const topics: ResearchTopic[] = RESEARCH_TOPICS.map((t, i) => {
    const papers = perTopic[i].filter((p) => {
      const key = p.doi ? `doi:${p.doi.toLowerCase()}` : `t:${titleKey(p.title)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return { ...t, papers };
  });
  return { fetchedAt: new Date().toISOString(), topics };
}

/** Cross-check link — lets readers verify any record on Google Scholar. */
export function scholarUrl(p: ResearchPaper): string {
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(p.title)}`;
}
