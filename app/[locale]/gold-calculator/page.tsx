import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Calculator } from "@/components/Calculator";
import { PageShell } from "@/components/PageShell";
import { CalculatorSkeleton } from "@/components/skeletons";
import { getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { buildAlternates, buildOpenGraph, canonicalPath, SITE_URL } from "@/lib/metadata";
import { bundleSchemas, faqPageSchema, webApplicationSchema } from "@/lib/schemas";
import { calcFaqs, calcHowToText, calcWebAppText } from "./calculator.i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("calcH1"), description: t("calcIntro"),
    alternates: buildAlternates(locale, "/gold-calculator"),
    openGraph: buildOpenGraph(locale, "/gold-calculator"),
  };
}

export default async function GoldCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();

  const pageUrl = canonicalPath(locale, "/gold-calculator");

  const faqs = calcFaqs(locale);
  const webAppText = calcWebAppText(locale);
  const howTo = calcHowToText(locale);

  // `webApplicationSchema` / `faqPageSchema` still type `language` as
  // "ar" | "en"; the value is only forwarded to `inLanguage`, so the page
  // locale is the right thing to pass.
  const schemaLang = locale as "ar" | "en";

  const calcWebApp = webApplicationSchema({
    pageUrl,
    name: webAppText.name,
    description: webAppText.description,
    language: schemaLang,
    features: webAppText.features,
  });

  const calcFaqSchema = faqPageSchema(pageUrl, faqs, schemaLang);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}/gold-calculator#howto`,
    name: howTo.name,
    description: howTo.description,
    inLanguage: locale,
    totalTime: "PT30S",
    tool: [
      { "@type": "HowToTool", name: "Live spot gold price (XAU/USD)" },
      { "@type": "HowToTool", name: "Daily mid-market FX rates" },
    ],
    supply: [
      { "@type": "HowToSupply", name: "Weight of gold item (grams or ounces)" },
      { "@type": "HowToSupply", name: "Karat purity (24K, 21K, 18K, or 14K)" },
    ],
    step: howTo.steps.map((st, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: st.name,
      text: st.text,
      url: `${SITE_URL}/gold-calculator#${st.id}`,
    })),
  };

  const schemaPayload = bundleSchemas(howToSchema, calcWebApp, calcFaqSchema);

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey="calcH1"
      introKey="calcIntro"
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload).replace(/</g, "\\u003c") }}
      />
      <Suspense fallback={<CalculatorSkeleton />}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          const calcSpot = s
            ? {
                price_gram_24k: s.price_gram_24k,
                price_gram_21k: s.price_gram_21k,
                price_gram_18k: s.price_gram_18k,
                price_gram_14k: s.price_gram_14k,
              }
            : { price_gram_24k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };
          return <Calculator spot={calcSpot} fx={fx} />;
        })()}
      </Suspense>
    </PageShell>
  );
}
