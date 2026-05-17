import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { BidAskGauge } from "@/components/BidAskGauge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { Flag } from "@/components/Flag";
import { Header } from "@/components/Header";
import { HeroSpot } from "@/components/HeroSpot";
import { KaratGrid } from "@/components/KaratGrid";
import { KaratSwitcher } from "@/components/KaratSwitcher";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Sidebar } from "@/components/Sidebar";
import { PriceChart } from "@/components/PriceChart";
import { StoresMarquee } from "@/components/StoresMarquee";
import { TradingViewChart } from "@/components/TradingViewChart";
import {
  BidAskGaugeSkeleton,
  CalculatorSkeleton,
  HeroSpotSkeleton,
  KaratGridSkeleton,
  PriceChartSkeleton,
} from "@/components/skeletons";
import { Link } from "@/i18n/navigation";
import { COUNTRIES, COUNTRY_BY_SLUG, countryName, countryNote } from "@/lib/countries";
import { fetchFxRates, type FxRates } from "@/lib/fx";
import { fetchSpot, type GoldApiResponse } from "@/lib/goldapi";
import { fetchAllHistory, type MetalHistory } from "@/lib/history";
import { buildAlternates, buildOpenGraph, canonicalPath } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schemas";

const COUNTRY_VAT: Record<string, { rate: string; en: string; ar: string }> = {
  "saudi-arabia": { rate: "15%", en: "Saudi Arabia applies 15% VAT on jewellery (not on investment bullion ≥99.5% purity)", ar: "تطبق المملكة العربية السعودية ضريبة قيمة مضافة 15% على المجوهرات (لا تُطبق على السبائك الاستثمارية ≥99.5%)" },
  uae: { rate: "5%", en: "UAE applies 5% VAT on jewellery making charges (raw gold is zero-rated)", ar: "تطبق الإمارات ضريبة قيمة مضافة 5% على رسوم تصنيع المجوهرات (الذهب الخام معفى)" },
  egypt: { rate: "0%", en: "Egypt does not apply VAT on gold purchases", ar: "لا تطبق مصر ضريبة قيمة مضافة على شراء الذهب" },
  jordan: { rate: "16%", en: "Jordan applies 16% General Sales Tax on jewellery (investment bullion exempt)", ar: "تطبق الأردن ضريبة مبيعات عامة 16% على المجوهرات (السبائك الاستثمارية معفاة)" },
};

const VALID_KARATS = ["24k", "21k", "18k", "14k"] as const;
type Karat = (typeof VALID_KARATS)[number];

export async function generateStaticParams() {
  const params: { country: string; karat: string }[] = [];
  for (const c of COUNTRIES) {
    for (const k of VALID_KARATS) {
      params.push({ country: c.slug, karat: k });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string; karat: string }>;
}) {
  const { locale, country: slug, karat } = await params;
  const country = COUNTRY_BY_SLUG[slug];
  if (!country) return {};

  const tPage = await getTranslations({ locale, namespace: "CountryPage" });
  const upper = karat.toUpperCase();
  const name = countryName(country, locale);

  return {
    title: tPage("title", { karat: upper, country: name }),
    description: tPage("description", {
      karat: upper,
      country: name,
      currency: country.currency,
    }),
    alternates: buildAlternates(locale, `/${slug}/gold-price/${karat}`),
    openGraph: buildOpenGraph(locale, `/${slug}/gold-price/${karat}`),
  };
}

async function HeroSpotSection({
  promise,
  fxPromise,
  displayCurrency,
}: {
  promise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  displayCurrency: string;
}) {
  const [s, fx] = await Promise.all([promise, fxPromise]);
  return <HeroSpot spot={s} fx={fx} displayCurrency={displayCurrency} />;
}

async function PriceChartSection({
  hPromise,
  fxPromise,
  defaultCurrency,
}: {
  hPromise: Promise<MetalHistory>;
  fxPromise: Promise<FxRates>;
  defaultCurrency?: string;
}) {
  const [h, fx] = await Promise.all([hPromise, fxPromise]);
  return <PriceChart histories={h} fx={fx} defaultCurrency={defaultCurrency} />;
}

async function BidAskSection({
  promise,
  fxPromise,
  displayCurrency,
}: {
  promise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  displayCurrency: string;
}) {
  const [s, fx] = await Promise.all([promise, fxPromise]);
  return <BidAskGauge spot={s} fx={fx} displayCurrency={displayCurrency} />;
}

async function KaratGridSection({
  sPromise,
  fxPromise,
  displayCurrency,
}: {
  sPromise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  displayCurrency: string;
}) {
  const [s, fx] = await Promise.all([sPromise, fxPromise]);
  return <KaratGrid spot={s} fx={fx} displayCurrency={displayCurrency} />;
}

async function CalculatorSection({
  sPromise,
  fxPromise,
  defaultCurrency,
  defaultKarat,
}: {
  sPromise: Promise<GoldApiResponse | null>;
  fxPromise: Promise<FxRates>;
  defaultCurrency: string;
  defaultKarat: "price_gram_24k" | "price_gram_21k" | "price_gram_18k" | "price_gram_14k";
}) {
  const [s, fx] = await Promise.all([sPromise, fxPromise]);
  const calcSpot = s
    ? {
        price_gram_24k: s.price_gram_24k,
        price_gram_21k: s.price_gram_21k,
        price_gram_18k: s.price_gram_18k,
        price_gram_14k: s.price_gram_14k,
      }
    : { price_gram_24k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };
  return (
    <Calculator
      spot={calcSpot}
      fx={fx}
      defaultCurrency={defaultCurrency}
      defaultKarat={defaultKarat}
    />
  );
}

export default async function CountryKaratPage({
  params,
}: {
  params: Promise<{ locale: string; country: string; karat: string }>;
}) {
  const { locale, country: slug, karat } = await params;
  const country = COUNTRY_BY_SLUG[slug];
  if (!country || !VALID_KARATS.includes(karat as Karat)) notFound();
  setRequestLocale(locale);

  const tPage = await getTranslations("CountryPage");
  const upper = karat.toUpperCase();
  const name = countryName(country, locale);
  const note = countryNote(slug, locale);

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();
  const historyPromise = fetchAllHistory("1y");

  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX";

  const pageUrl = canonicalPath(locale, `/${slug}/gold-price/${karat}`);
  const vat = COUNTRY_VAT[slug];
  const ckFaqs = locale === "ar"
    ? [
        {
          q: `كم سعر الذهب عيار ${upper} اليوم في ${name}؟`,
          a: `سعر الذهب عيار ${upper} في ${name} يُحدّث كل ثانية في الجدول أعلاه بـ${country.currency}. السعر مشتق من السعر الفوري العالمي للأونصة (XAU/USD) من Binance وCoinbase وKraken، مقسوماً على 31.1035 جرام لكل أونصة، مضروباً بنسبة النقاء (${upper === "24K" ? "99.9%" : upper === "21K" ? "87.5%" : upper === "18K" ? "75%" : "58.3%"})، ثم مضروباً بسعر صرف ${country.currency}/USD اليومي.`,
        },
        {
          q: `هل سعر الذهب في ${name} يشمل المصنعية وضريبة القيمة المضافة؟`,
          a: `لا. السعر المعروض هو السعر الفوري للذهب الخام فقط. ${vat ? vat.ar + ". " : ""}تضيف محلات المجوهرات أيضاً مصنعية (تتراوح من 5 إلى 30 وحدة عملة محلية للجرام للقطع المعقدة) وهامش بائع التجزئة (3-10%).`,
        },
        {
          q: `لماذا يختلف سعر عيار ${upper} في ${name} عن السعر العالمي؟`,
          a: `سعر الذهب العالمي بالدولار. سعر ${name} المعروض هو نفس السعر العالمي محوّلاً إلى ${country.currency} بسعر الصرف اليومي، ثم مقسوماً لكل جرام بنسبة النقاء ${upper}. لا يوجد فرق سعر حقيقي — فقط تحويل وحدات وعملة.`,
        },
        {
          q: `أين أشتري الذهب عيار ${upper} في ${name}؟`,
          a: `الذهب يُباع في ${name} في أسواق الذهب المحلية ومحلات الصاغة المرخصة. تحقق دائماً من الختم (الهولمارك) للتأكد من العيار، واحصل على فاتورة موثقة. السعر الفوري المعروض هنا هو مرجعك لتقييم سعر المحل قبل المصنعية.`,
        },
        {
          q: `كم مرة يُحدّث سعر الذهب في ${name}؟`,
          a: `السعر الفوري يُحدّث كل ثانية عبر WebSocket. سعر صرف ${country.currency}/USD يُحدّث كل ساعة من بيانات البنوك المركزية المفتوحة. السعر الذي تراه هو السعر اللحظي العالمي مُحوّلاً للعملة المحلية.`,
        },
      ]
    : [
        {
          q: `What is the ${upper} gold price today in ${name}?`,
          a: `${upper} gold price in ${name} updates every second in the table above, denominated in ${country.currency}. The price is derived from the global spot ounce price (XAU/USD) sourced from Binance, Coinbase and Kraken, divided by 31.1035 grams per troy ounce, multiplied by the purity ratio (${upper === "24K" ? "99.9%" : upper === "21K" ? "87.5%" : upper === "18K" ? "75%" : "58.3%"}), and converted at the daily ${country.currency}/USD FX rate.`,
        },
        {
          q: `Does the ${name} gold price include making charges and VAT?`,
          a: `No. The displayed price is the raw spot-equivalent gold value only. ${vat ? vat.en + ". " : ""}Jewellery shops add making charges (typically 5-30 local currency units per gram for complex pieces) and retailer margin (3-10%).`,
        },
        {
          q: `Why does ${upper} gold in ${name} differ from the global price?`,
          a: `Global gold is priced in USD. The ${name} price shown here is the same global price converted to ${country.currency} at the daily FX rate, then divided to a per-gram value at the ${upper} purity ratio. There is no real price difference — just unit and currency conversion.`,
        },
        {
          q: `Where do I buy ${upper} gold in ${name}?`,
          a: `Gold is sold in ${name} at local gold souks and licensed goldsmiths. Always check the hallmark stamp to confirm karat, and obtain a documented receipt. The spot price shown here is your reference for evaluating the shop's price before making charges.`,
        },
        {
          q: `How often is the ${name} gold price updated?`,
          a: `Spot price updates every second via WebSocket. The ${country.currency}/USD exchange rate updates hourly from open central-bank data. The price you see is the live global price converted to the local currency.`,
        },
      ];
  const ckFaqSchema = faqPageSchema(pageUrl, ckFaqs, locale === "ar" ? "ar" : "en");

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ckFaqSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Breadcrumb
          locale={locale}
          items={[
            { name: locale === "en" ? "Home" : "الرئيسية", href: locale === "en" ? "/en" : "/" },
            { name: name, href: `/${slug}/gold-price/21k` },
            {
              name: locale === "en" ? `${upper} Gold Price` : `سعر الذهب ${upper}`,
              href: `/${slug}/gold-price/${karat}`,
            },
          ]}
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="min-w-0 space-y-8">
            <KaratSwitcher
              current={karat}
              basePath={`/${slug}/gold-price`}
              locale={locale}
              historicalHref="/historical-gold-prices/2026"
            />

            <header>
              <Link
                href="/"
                className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-gold)]"
              >
                <Flag cc={country.cc} size={12} className="me-1" />
                {name}
              </Link>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {tPage("h1", { karat: upper, country: name })}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                {tPage("intro", { karat: upper, country: name, currency: country.currency })}
              </p>
              <div className="mt-3 inline-block rounded-md border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1.5 text-xs text-[var(--color-gold)]">
                {tPage("currencyNote", { currency: country.currency })}
              </div>
              {note ? (
                <section
                  aria-label={locale === "ar" ? "ملاحظات السوق المحلي" : "Local market notes"}
                  className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4"
                >
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                    {locale === "ar" ? `سوق الذهب في ${name}` : `${name} gold market`}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {note}
                  </p>
                </section>
              ) : null}
            </header>

            <Suspense fallback={<HeroSpotSkeleton />}>
              <HeroSpotSection
                promise={spotPromise}
                fxPromise={fxPromise}
                displayCurrency={country.currency}
              />
            </Suspense>
            <TradingViewChart currency={country.currency} />
            <AffiliateBanner />
            <Suspense fallback={<PriceChartSkeleton />}>
              <PriceChartSection
                hPromise={historyPromise}
                fxPromise={fxPromise}
                defaultCurrency={country.currency}
              />
            </Suspense>
            <Suspense fallback={<BidAskGaugeSkeleton />}>
              <BidAskSection
                promise={spotPromise}
                fxPromise={fxPromise}
                displayCurrency={country.currency}
              />
            </Suspense>
            <Suspense fallback={<KaratGridSkeleton />}>
              <KaratGridSection
                sPromise={spotPromise}
                fxPromise={fxPromise}
                displayCurrency={country.currency}
              />
            </Suspense>
            <Suspense fallback={<CalculatorSkeleton />}>
              <CalculatorSection
                sPromise={spotPromise}
                fxPromise={fxPromise}
                defaultCurrency={country.currency}
                defaultKarat={
                  `price_gram_${karat as "24k" | "21k" | "18k" | "14k"}` as "price_gram_24k"
                }
              />
            </Suspense>
            <StoresMarquee />
            <Faq />

            <RelatedLinks
              heading={locale === "ar" ? `صفحات ذات صلة لـ ${name}` : `Related ${name} pages`}
              items={[
                { href: `/${slug}/gold-price/24k`, label: locale === "ar" ? `${name} 24K` : `${name} 24K`, note: locale === "ar" ? "أعلى نقاء" : "Highest purity" },
                { href: `/${slug}/gold-price/21k`, label: locale === "ar" ? `${name} 21K` : `${name} 21K`, note: locale === "ar" ? "الأكثر تداولاً" : "Most traded" },
                { href: "/spot-gold", label: locale === "ar" ? "السعر الفوري XAU/USD" : "Spot Gold (XAU/USD)", note: locale === "ar" ? "السعر العالمي بالدولار" : "Global USD reference" },
                { href: "/gold-calculator", label: locale === "ar" ? "حاسبة الذهب" : "Gold calculator", note: locale === "ar" ? `بعملة ${country.currency}` : `In ${country.currency}` },
                { href: "/news/spot-gold-vs-retail-jeweller-spread", label: locale === "ar" ? "هامش الصائغ" : "Spot vs retail spread", note: locale === "ar" ? "كيف يُحسب السعر" : "How prices are set" },
                { href: "/methodology", label: locale === "ar" ? "المنهجية" : "Methodology", note: locale === "ar" ? "من أين تأتي الأسعار" : "Where prices come from" },
              ]}
            />
          </section>
          <Sidebar adClient={adsClient} />
        </div>
      </main>
    </>
  );
}
