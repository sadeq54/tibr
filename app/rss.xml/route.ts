/**
 * /rss.xml — editorial article feed. The root layout has advertised this URL
 * via `alternates.types["application/rss+xml"]` since launch; this route makes
 * that pointer real instead of a 404.
 */
import { ARTICLES } from "@/content/news/articles";
import { SITE_URL } from "@/lib/metadata";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const items = [...ARTICLES]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .map((a) => {
      const url = `${SITE_URL}/news/${a.slug}`;
      const date = new Date(a.updatedAt ?? a.publishedAt).toUTCString();
      const cats = a.tags.map((t) => `<category>${esc(t)}</category>`).join("");
      return (
        `<item>` +
        `<title>${esc(a.title_ar)}</title>` +
        `<link>${url}</link>` +
        `<guid isPermaLink="true">${url}</guid>` +
        `<pubDate>${date}</pubDate>` +
        `<description>${esc(a.description_ar)}</description>` +
        cats +
        `</item>`
      );
    })
    .join("\n    ");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gold Prices Arabia · أخبار سوق الذهب</title>
    <link>${SITE_URL}</link>
    <description>أخبار وتحليلات سوق الذهب من Gold Prices Arabia: الأسعار، العيارات، وأسواق الشرق الأوسط.</description>
    <language>ar</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
