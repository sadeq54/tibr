// Web-fetching core, ported from arabi-kids' Asset Scout
// (arabi-kids-frontend/apps/api/src/modules/asset-scout/*). Same rules:
//
//  1. Official/public APIs only — never raw HTML scraping of protected sites.
//  2. Identifying User-Agent so source operators can reach us.
//  3. Hard per-request timeout (AbortSignal.timeout), failures return null.
//  4. Parallel across DIFFERENT hosts; sequential + spaced within one host
//     (politeness — free APIs see a polite request rate).
//  5. Promise.allSettled isolation: one source failing never fails the batch,
//     it just contributes zero results (and logs a warning).
//  6. https-only, no credentials in URLs.
//
// Consumers: lib/research.ts (scholarly digest). lib/news.ts predates this
// module and keeps its own equivalent RSS pipeline.

export const CRAWLER_UA =
  "Mozilla/5.0 GoldPricesArabia-crawler/1.0 (+https://goldpricesarabia.com; mailto:contact@goldpricesarabia.com)";

export const DEFAULT_TIMEOUT_MS = 10_000;

/** Delay between sequential requests that hit the same host. */
export const POLITENESS_MS = 500;

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** https only, no embedded credentials — refuse anything else outright. */
export function isSafeApiUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

type FetchOpts = {
  headers?: Record<string, string>;
  /** Next data-cache revalidation window for the underlying fetch. */
  revalidate?: number;
  timeoutMs?: number;
};

export async function fetchJson<T>(url: string, opts: FetchOpts = {}): Promise<T | null> {
  if (!isSafeApiUrl(url)) return null;
  try {
    const r = await fetch(url, {
      headers: { "User-Agent": CRAWLER_UA, Accept: "application/json", ...opts.headers },
      next: { revalidate: opts.revalidate ?? 86400 },
      signal: AbortSignal.timeout(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS),
    });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchText(url: string, opts: FetchOpts = {}): Promise<string | null> {
  if (!isSafeApiUrl(url)) return null;
  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent": CRAWLER_UA,
        Accept: "application/xml, text/xml, text/plain, */*",
        ...opts.headers,
      },
      next: { revalidate: opts.revalidate ?? 86400 },
      signal: AbortSignal.timeout(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS),
    });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  }
}

/**
 * Run named per-source tasks in parallel (different hosts) with allSettled
 * isolation — a rejected source logs a warning and contributes nothing.
 */
export async function gatherSettled<T>(
  tasks: Array<[name: string, task: Promise<T[]>]>,
): Promise<T[]> {
  const settled = await Promise.allSettled(tasks.map(([, p]) => p));
  const out: T[] = [];
  settled.forEach((res, i) => {
    if (res.status === "fulfilled") out.push(...res.value);
    else console.warn(`[crawler] ${tasks[i]![0]} failed: ${(res.reason as Error)?.message}`);
  });
  return out;
}

/**
 * Sequential map with politeness spacing — for consecutive requests that hit
 * the SAME hosts (arabi-kids invariant: glosses sequential, sources parallel).
 */
export async function mapSequential<A, B>(
  items: readonly A[],
  fn: (item: A, index: number) => Promise<B>,
  spacingMs: number = POLITENESS_MS,
): Promise<B[]> {
  const out: B[] = [];
  for (let i = 0; i < items.length; i++) {
    out.push(await fn(items[i]!, i));
    if (i < items.length - 1) await sleep(spacingMs);
  }
  return out;
}
