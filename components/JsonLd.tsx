import type { GoldApiResponse } from "@/lib/goldapi";

const KARAT_TO_NAME: Record<string, string> = {
  "24K": "24 Karat Gold",
  "21K": "21 Karat Gold",
  "18K": "18 Karat Gold",
  "14K": "14 Karat Gold",
};

export function JsonLd({ spot, siteUrl }: { spot: GoldApiResponse | null; siteUrl: string }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#org`,
    name: "Tibr",
    alternateName: ["Tibr Live Gold"],
    url: siteUrl,
    logo: `${siteUrl}/icon`,
    description:
      "Tibr live gold prices for the Arab world. USD, JOD, SAR, AED, EGP across 24K, 21K, 18K, 14K karats.",
    sameAs: [],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Tibr",
    inLanguage: ["en", "ar"],
    publisher: { "@id": `${siteUrl}/#org` },
  };

  const products = spot
    ? (
        [
          { karat: "24K", grams: spot.price_gram_24k },
          { karat: "21K", grams: spot.price_gram_21k },
          { karat: "18K", grams: spot.price_gram_18k },
          { karat: "14K", grams: spot.price_gram_14k },
        ] as const
      ).map(({ karat, grams }) => ({
        "@context": "https://schema.org",
        "@type": "Product",
        name: KARAT_TO_NAME[karat] ?? `${karat} Gold`,
        description: `Live spot price of ${KARAT_TO_NAME[karat]} per gram and per troy ounce, updated every minute.`,
        category: "Precious Metals / Gold",
        brand: { "@type": "Brand", name: "Tibr" },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: grams.toFixed(4),
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: "USD",
            price: grams.toFixed(4),
            unitCode: "GRM",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "GRM" },
          },
          availability: "https://schema.org/InStock",
          validFrom: new Date(spot.timestamp * 1000).toISOString(),
        },
      }))
    : [];

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How often are gold prices updated on Tibr?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tibr updates live spot gold prices every minute from the FOREXCOM XAUUSD feed via goldapi.io.",
        },
      },
      {
        "@type": "Question",
        name: "Which karats does Tibr cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tibr covers 24K (pure gold), 21K (87.5 percent pure), 18K (75 percent pure), and 14K (58.3 percent pure).",
        },
      },
      {
        "@type": "Question",
        name: "Which currencies does Tibr show?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "USD, JOD (Jordanian Dinar), SAR (Saudi Riyal), AED (UAE Dirham), and EGP (Egyptian Pound).",
        },
      },
      {
        "@type": "Question",
        name: "Is Tibr free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Tibr is free for personal and informational use. Always confirm with your local jeweller before any transaction.",
        },
      },
    ],
  };

  const payload = [organization, website, ...products, faq];
  const json = JSON.stringify(payload);

  return <script type="application/ld+json" suppressHydrationWarning>{json}</script>;
}
