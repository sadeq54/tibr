/**
 * Reusable JSON-LD schema helpers — produce plain objects ready to be
 * JSON.stringify'd and dumped into a <script type="application/ld+json">.
 *
 * Keep page-specific schemas (FAQs targeting specific PAA queries,
 * WebApplication for the calculator, etc.) in here so each page just
 * imports and embeds — avoiding the giant JsonLd component growing
 * unbounded for every new page type.
 */

import { SITE_URL } from "./metadata";

export type FaqQA = { q: string; a: string };

/**
 * FAQPage schema. Use for page-specific FAQs that target PAA questions
 * observed in the SERP — these are additive to the global FAQPage that
 * the site-wide layout already emits.
 */
export function faqPageSchema(
  pageUrl: string,
  qa: FaqQA[],
  language: "en" | "ar" = "en",
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${pageUrl}#faq`,
    inLanguage: language,
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/**
 * WebApplication schema for tool pages (gold calculator, currency
 * converter, etc.). Google promotes pages with this schema in tool
 * SERPs and surfaces them in rich result cards.
 */
export function webApplicationSchema(opts: {
  pageUrl: string;
  name: string;
  description: string;
  language?: "en" | "ar";
  /** Free-text categories — e.g. ["Gold price calculator", "Karat converter"] */
  features?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${SITE_URL}${opts.pageUrl}#app`,
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.pageUrl}`,
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Currency / Commodity calculator",
    operatingSystem: "Web (any browser)",
    browserRequirements: "Requires JavaScript enabled.",
    inLanguage: opts.language ?? "en",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: opts.features?.join(", ") ?? undefined,
    provider: { "@id": `${SITE_URL}/#org` },
  };
}

/**
 * Wraps schemas into a single <script>-ready array payload. Embedding
 * multiple JSON-LD blocks inside one script tag is the documented
 * Google-supported pattern and reduces page weight vs N separate tags.
 */
export function bundleSchemas(...schemas: Array<object | null | undefined>) {
  return schemas.filter((s): s is object => Boolean(s));
}
