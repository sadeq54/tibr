import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/metadata";

/**
 * Robots policy:
 * 1. Allow standard search crawlers globally except /api/ and /admin/.
 * 2. Explicitly allow AI / LLM training + retrieval crawlers (GPTBot,
 *    ClaudeBot, PerplexityBot, Google-Extended, etc.) so the site appears in
 *    AI Overviews, ChatGPT search, Perplexity, and Claude citations. Live
 *    gold prices are public data — there is no privacy reason to block them,
 *    and exclusion would hurt entity visibility in AI answers.
 * 3. Disallow the bad-citizen scraper bots that ignore Crawl-delay.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/widgets/embed/"],
      },
      // Explicit grants — redundant with `*` but documents intent and
      // protects against future toggling.
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Yandex", allow: "/" },
      { userAgent: "Baiduspider", allow: "/" },
      // AI / LLM crawlers — allow for AI search visibility (AI Overviews,
      // ChatGPT, Perplexity, Claude, Mistral). Public price data; not training
      // anything proprietary.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "Meta-ExternalFetcher", allow: "/" },
      { userAgent: "Mistral-AI-User", allow: "/" },
      // Scraper-bot deny-list. These ignore rate limits and rarely cite.
      { userAgent: "AhrefsBot", crawlDelay: 10 },
      { userAgent: "SemrushBot", crawlDelay: 10 },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      { userAgent: "PetalBot", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
