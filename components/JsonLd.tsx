import type { GoldApiResponse } from "@/lib/goldapi";

const KARAT_TO_NAME: Record<string, string> = {
  "24K": "24 Karat Gold",
  "21K": "21 Karat Gold",
  "18K": "18 Karat Gold",
  "14K": "14 Karat Gold",
};

const KARAT_PURITY: Record<string, string> = {
  "24K": "99.9%",
  "21K": "87.5%",
  "18K": "75%",
  "14K": "58.3%",
};

export function JsonLd({ spot, siteUrl }: { spot: GoldApiResponse | null; siteUrl: string }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#org`,
    name: "Gold Prices Arabia",
    alternateName: ["GoldPricesArabia", "أسعار الذهب العربية", "GPA"],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/appIcone.png`,
      width: 512,
      height: 512,
    },
    image: `${siteUrl}/opengraph-image`,
    description:
      "Live gold prices in real time across 46 countries and 40+ currencies. Track 24K, 21K, 18K and 14K gold per gram, ounce and kilogram.",
    foundingDate: "2026",
    knowsAbout: [
      "Gold price",
      "Silver price",
      "Platinum price",
      "Palladium price",
      "Precious metals",
      "Bullion",
      "Spot gold",
      "Gold karats",
      "Foreign exchange",
      "Cryptocurrency",
    ],
    areaServed: [
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Jordan" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Kuwait" },
      { "@type": "Country", name: "Bahrain" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@goldpricesarabia.com",
        availableLanguage: ["en", "ar"],
      },
      {
        "@type": "ContactPoint",
        contactType: "advertising",
        email: "ads@goldpricesarabia.com",
        availableLanguage: ["en", "ar"],
      },
    ],
    sameAs: [
      "https://twitter.com/goldpricesarabia",
      "https://www.facebook.com/goldpricesarabia",
      "https://www.linkedin.com/company/goldpricesarabia",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Gold Prices Arabia",
    alternateName: "أسعار الذهب العربية",
    description:
      "Live gold prices across 46 countries and 40+ currencies. Real-time WebSocket aggregation from Binance, Coinbase, Kraken.",
    inLanguage: ["en", "ar"],
    publisher: { "@id": `${siteUrl}/#org` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: { "@id": `${siteUrl}/#org` },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#service`,
    name: "Live Gold Price Tracking",
    serviceType: "FinancialService",
    provider: { "@id": `${siteUrl}/#org` },
    areaServed: [{ "@type": "Place", name: "MENA" }, { "@type": "Place", name: "Worldwide" }],
    description:
      "Real-time gold price aggregation via WebSocket from Binance, Coinbase and Kraken with median computation across exchanges.",
    audience: { "@type": "Audience", audienceType: "Investors, Jewellers, Traders" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
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
        "@id": `${siteUrl}/#product-${karat}`,
        name: KARAT_TO_NAME[karat] ?? `${karat} Gold`,
        description: `Live spot price of ${KARAT_TO_NAME[karat]} (${KARAT_PURITY[karat]} purity) per gram and per troy ounce, streamed in real time from Binance, Coinbase and Kraken.`,
        category: "Precious Metals / Gold",
        brand: { "@type": "Brand", name: "Gold Prices Arabia" },
        manufacturer: { "@id": `${siteUrl}/#org` },
        material: "Gold",
        additionalProperty: [
          { "@type": "PropertyValue", name: "Purity", value: KARAT_PURITY[karat] },
          { "@type": "PropertyValue", name: "Karat", value: karat },
        ],
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
          seller: { "@id": `${siteUrl}/#org` },
        },
      }))
    : [];

  const financialProduct = spot
    ? {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "@id": `${siteUrl}/#xau`,
        name: "Spot Gold (XAU/USD)",
        description: "Live spot gold price tracked via PAXG/USD WebSocket aggregation.",
        provider: { "@id": `${siteUrl}/#org` },
        category: "Commodity",
        feesAndCommissionsSpecification: "Free of charge",
        offers: {
          "@type": "Offer",
          price: spot.price.toFixed(2),
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: "USD",
            price: spot.price.toFixed(2),
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "ONZ" },
          },
        },
      }
    : null;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "How often are gold prices updated on Gold Prices Arabia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Live gold prices stream in real time via WebSocket from Binance, Coinbase and Kraken. The site computes a median across exchanges every tick (typically multiple updates per second), so visitors always see the freshest possible spot gold price.",
        },
      },
      {
        "@type": "Question",
        name: "Which gold karats does Gold Prices Arabia cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gold Prices Arabia covers 24K (99.9 percent pure), 21K (87.5 percent pure), 18K (75 percent pure), and 14K (58.3 percent pure) — the four most-traded karats across MENA jewellery markets and globally.",
        },
      },
      {
        "@type": "Question",
        name: "Which currencies does Gold Prices Arabia show?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "USD, JOD (Jordanian Dinar), SAR (Saudi Riyal), AED (UAE Dirham), EGP (Egyptian Pound), plus EUR, GBP, JPY, CHF, AUD, CAD and 30+ more — totalling 40+ currencies across 46 countries.",
        },
      },
      {
        "@type": "Question",
        name: "Where do the live prices come from?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Live spot gold streams from PAXG/USD WebSocket feeds across Binance, Coinbase and Kraken. PAXG (PAX Gold) is a token backed 1:1 by physical 1 oz London Good Delivery gold bars held in Brink's vaults and audited monthly by Withum.",
        },
      },
      {
        "@type": "Question",
        name: "Is Gold Prices Arabia free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Gold Prices Arabia is free for personal and informational use. Always confirm with a licensed jeweller or bullion dealer before buying or selling.",
        },
      },
      {
        "@type": "Question",
        name: "Does Gold Prices Arabia track silver, platinum and palladium?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Silver (XAG), Platinum (XPT) and Palladium (XPD) prices are tracked and updated every minute via STOOQ aggregated feeds. Gold (XAU) is the only metal currently streamed via real-time WebSocket.",
        },
      },
    ],
  };

  const payload: object[] = [organization, website, service, breadcrumb, ...products, faq];
  if (financialProduct) payload.push(financialProduct);
  const json = JSON.stringify(payload);

  return <script type="application/ld+json" suppressHydrationWarning>{json}</script>;
}
