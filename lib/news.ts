export type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
};

const FEEDS: Array<{ source: string; url: string }> = [
  { source: "Kitco News", url: "https://www.kitco.com/rss/KitcoNews.xml" },
  { source: "Mining.com", url: "https://www.mining.com/feed/" },
  { source: "BullionVault", url: "https://www.bullionvault.com/news/rss" },
  // Yahoo Finance gold futures (GC=F) — high-frequency market headlines.
  { source: "Yahoo Finance", url: "https://feeds.finance.yahoo.com/rss/2.0/headline?s=GC=F&region=US&lang=en-US" },
  // CoinDesk gold-related crypto coverage (PAXG, gold-backed tokens).
  { source: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/category/markets/" },
];

export async function fetchNews(limit = 24): Promise<NewsItem[]> {
  const all: NewsItem[] = [];
  await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        const r = await fetch(feed.url, {
          next: { revalidate: 1800 },
          headers: { "User-Agent": "Mozilla/5.0 GoldPricesArabia/1.0" },
          signal: AbortSignal.timeout(5000),
        });
        if (!r.ok) return;
        const text = await r.text();
        const items = parseRss(text, feed.source);
        all.push(...items);
      } catch {
        return;
      }
    }),
  );
  return all
    .filter((n) => n.title && n.link)
    .sort((a, b) => safeTime(b.pubDate) - safeTime(a.pubDate))
    .slice(0, limit);
}

function safeTime(s: string): number {
  const t = Date.parse(s);
  return Number.isFinite(t) ? t : 0;
}

function parseRss(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];
  const matches = xml.matchAll(/<item[^>]*>([\s\S]*?)<\/item>/g);
  for (const m of matches) {
    const block = m[1];
    const title = extractTag(block, "title");
    const link = extractTag(block, "link");
    const pubDate = extractTag(block, "pubDate") || extractTag(block, "dc:date");
    let description = extractTag(block, "description") || extractTag(block, "content:encoded");
    description = description.replace(/<[^>]+>/g, "").trim().slice(0, 240);
    if (title && link) {
      items.push({ title, link, pubDate, description, source });
    }
  }
  return items;
}

function extractTag(xml: string, tag: string): string {
  const safe = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `<${safe}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${safe}>`,
    "i",
  );
  const m = xml.match(re);
  return m ? m[1].trim() : "";
}
