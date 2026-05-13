import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { AutoTheme } from "@/components/AutoTheme";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LivePriceProvider } from "@/components/LivePriceProvider";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { ReduxProvider } from "@/components/ReduxProvider";
import { ThemeApplier } from "@/components/ThemeApplier";
import { routing } from "@/i18n/routing";
import { SITE_URL, buildAlternates } from "@/lib/metadata";

import "../globals.css";

const SITE_NAME = "Gold Prices Arabia";
const TITLE_DEFAULT = "Gold Prices Arabia — Live Gold Prices Today (USD, JOD, SAR, AED, EGP)";
const DESCRIPTION =
  "Live gold prices for 46 countries + 40 currencies. Track 24K, 21K, 18K, 14K per gram, ounce, kilo. Free, real-time, updated every minute.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE_DEFAULT, template: "%s · Gold Prices Arabia" },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",
  category: "finance",
  classification: "Finance, Commodities, Precious Metals",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  keywords: [
    // ─── Brand ──────────────────────────────────────────
    "Gold Prices Arabia",
    "goldpricesarabia",
    "goldpricesarabia.com",

    // ─── Core EN — generic ───────────────────────────────
    "gold price",
    "gold price today",
    "gold price live",
    "live gold price",
    "current gold price",
    "real-time gold price",
    "gold rate today",
    "today gold rate",
    "today gold price",
    "spot gold",
    "spot gold price",
    "gold spot price",
    "gold value",
    "gold worth today",
    "how much is gold worth",
    "what is gold price right now",
    "what is gold price today",

    // ─── EN — per unit ───────────────────────────────────
    "gold price per gram",
    "gold price per ounce",
    "gold price per kilo",
    "gold price per kg",
    "gold price per oz",
    "1g gold price",
    "1 gram gold price",
    "5g gold price",
    "10g gold price",
    "20g gold price",
    "50g gold price",
    "100g gold price",
    "1 oz gold price",
    "1 ounce gold price",
    "1kg gold price",
    "how much is 1 gram of gold",
    "how much is 1 oz of gold",
    "how much is 10 grams of gold",
    "how much is 50 grams of gold",
    "price of gold per gram",
    "price of gold per ounce",

    // ─── EN — karat / carat (US + UK) ────────────────────
    "24k gold price",
    "24 karat gold price",
    "24ct gold price",
    "22k gold price",
    "22 karat gold price",
    "22ct gold price",
    "22 carat gold per gram",
    "21k gold price",
    "21 karat gold price",
    "21 carat gold price",
    "18k gold price",
    "18 karat gold price",
    "18ct gold per gram",
    "18 carat gold price",
    "14k gold price",
    "14 karat gold price",
    "14ct gold price",
    "9k gold price",
    "9ct gold price",
    "9ct gold per gram today",
    "9 carat gold today",
    "scrap 9ct gold price",

    // ─── EN — purity hallmarks ──────────────────────────
    "999 gold price",
    "916 gold price",
    "875 gold price",
    "750 gold price",
    "585 gold price",
    "375 gold price",
    "what does 375 mean on gold",
    "375 gold worth",
    "999 fine gold",

    // ─── EN — countries (MENA + global) ──────────────────
    "Saudi Arabia gold price",
    "Saudi gold price",
    "gold price in Saudi Arabia",
    "gold price Riyadh",
    "gold price Jeddah",
    "UAE gold price",
    "Dubai gold price",
    "Dubai gold souk",
    "gold price in Dubai",
    "Abu Dhabi gold price",
    "Egypt gold price",
    "gold price in Egypt",
    "Cairo gold price",
    "Jordan gold price",
    "gold price in Jordan",
    "Amman gold price",
    "Qatar gold price",
    "Doha gold price",
    "Kuwait gold price",
    "Bahrain gold price",
    "Oman gold price",
    "Lebanon gold price",
    "Syria gold price",
    "Iraq gold price",
    "Yemen gold price",
    "Palestine gold price",
    "Morocco gold price",
    "Algeria gold price",
    "Tunisia gold price",
    "Libya gold price",
    "Sudan gold price",
    "USA gold price",
    "US gold price",
    "America gold price",
    "UK gold price",
    "United Kingdom gold price",
    "London gold price",
    "Canada gold price",
    "Australia gold price",
    "India gold price",
    "Pakistan gold price",
    "Turkey gold price",
    "Singapore gold price",
    "Hong Kong gold price",
    "China gold price",
    "Japan gold price",
    "Europe gold price",
    "Germany gold price",
    "France gold price",
    "Switzerland gold price",

    // ─── EN — currencies ────────────────────────────────
    "gold price USD",
    "gold price SAR",
    "gold price AED",
    "gold price EGP",
    "gold price JOD",
    "gold price KWD",
    "gold price QAR",
    "gold price BHD",
    "gold price OMR",
    "gold price GBP",
    "gold price EUR",
    "gold price INR",
    "gold price TRY",

    // ─── EN — investment / trading ──────────────────────
    "buy gold",
    "where to buy gold",
    "best place to buy gold",
    "sell gold",
    "where to sell gold",
    "best place to sell gold",
    "gold investment",
    "invest in gold",
    "gold bullion",
    "bullion price",
    "gold bullion price",
    "gold bar price",
    "gold coin price",
    "1 oz gold coin",
    "American gold eagle",
    "Canadian maple leaf gold",
    "South African krugerrand",
    "British sovereign gold",
    "gold sovereign price",
    "gold ETF",
    "gold futures",
    "XAU USD",
    "XAU/USD",
    "PAXG",
    "PAX Gold",

    // ─── EN — chart / analysis ──────────────────────────
    "gold price chart",
    "gold price history",
    "historical gold price",
    "gold price trend",
    "gold price forecast",
    "gold price prediction",
    "gold price 2026",
    "gold price 2025",
    "will gold go up",
    "is gold going up or down",
    "gold price next week",
    "gold price next month",
    "gold trend",
    "gold market",
    "gold market analysis",
    "highest gold price",
    "lowest gold price",
    "all time high gold",

    // ─── EN — jewelry ───────────────────────────────────
    "gold jewelry price",
    "gold jewellery price",
    "wedding gold",
    "bridal gold",
    "dowry gold",
    "gold dowry price",
    "engagement ring gold",
    "gold bangle price",
    "gold chain price",
    "gold necklace price",

    // ─── EN — other metals ──────────────────────────────
    "silver price",
    "silver price today",
    "spot silver",
    "platinum price",
    "platinum price today",
    "palladium price",
    "palladium price today",
    "precious metals",
    "precious metals price",
    "gold silver ratio",

    // ─── EN — reference / institutions ──────────────────
    "LBMA gold price",
    "London gold fix",
    "Shanghai gold exchange",
    "COMEX gold price",
    "COMEX gold futures",
    "gold ounce price COMEX",

    // ─── EN — tools ─────────────────────────────────────
    "gold calculator",
    "gold price calculator",
    "gold weight calculator",
    "gold value calculator",
    "gold to USD converter",

    // ─── AR — generic ───────────────────────────────────
    "أسعار الذهب",
    "أسعار الذهب اليوم",
    "أسعار الذهب الآن",
    "سعر الذهب",
    "سعر الذهب اليوم",
    "سعر الذهب الآن",
    "سعر الذهب المباشر",
    "سعر الذهب الفوري",
    "سعر الجرام الذهب",
    "سعر جرام الذهب",
    "سعر الأونصة",
    "سعر أوقية الذهب",
    "سعر كيلو الذهب",

    // ─── AR — karat ─────────────────────────────────────
    "سعر الذهب عيار 24",
    "سعر الذهب عيار 22",
    "سعر الذهب عيار 21",
    "سعر الذهب عيار 18",
    "سعر الذهب عيار 14",
    "سعر جرام عيار 24",
    "سعر جرام عيار 21",
    "سعر جرام عيار 18",
    "ذهب عيار 24",
    "ذهب عيار 21",
    "ذهب عيار 18",
    "ذهب عيار 14",

    // ─── AR — countries ─────────────────────────────────
    "سعر الذهب في السعودية",
    "سعر الذهب اليوم في السعودية",
    "سعر الذهب في الرياض",
    "سعر الذهب في جدة",
    "سعر الذهب في الإمارات",
    "سعر الذهب في دبي",
    "سعر الذهب في أبوظبي",
    "سعر الذهب في مصر",
    "سعر الذهب اليوم في مصر",
    "سعر الذهب في القاهرة",
    "سعر الذهب في الأردن",
    "سعر الذهب اليوم في الأردن",
    "سعر الذهب في عمان",
    "سعر الذهب في قطر",
    "سعر الذهب في الدوحة",
    "سعر الذهب في الكويت",
    "سعر الذهب في البحرين",
    "سعر الذهب في عمان (سلطنة)",
    "سعر الذهب في لبنان",
    "سعر الذهب في العراق",
    "سعر الذهب في اليمن",
    "سعر الذهب في فلسطين",
    "سعر الذهب في المغرب",
    "سعر الذهب في الجزائر",
    "سعر الذهب في تونس",
    "سعر الذهب في ليبيا",
    "سعر الذهب في السودان",
    "سعر الذهب في تركيا",

    // ─── AR — investment ────────────────────────────────
    "شراء الذهب",
    "بيع الذهب",
    "أين أشتري الذهب",
    "أين أبيع الذهب",
    "الاستثمار في الذهب",
    "سبائك الذهب",
    "ليرة ذهب",
    "جنيه ذهب",
    "ذهب للاستثمار",
    "ذهب 24 قيراط",

    // ─── AR — chart / analysis ──────────────────────────
    "مخطط أسعار الذهب",
    "تاريخ أسعار الذهب",
    "توقعات أسعار الذهب",
    "أسعار الذهب 2026",
    "أسعار الذهب 2025",
    "هل سيرتفع الذهب",
    "اتجاه الذهب",

    // ─── AR — jewelry ───────────────────────────────────
    "ذهب العرس",
    "ذهب الزفاف",
    "ذهب الشبكة",
    "سعر ذهب المهر",
    "سوار ذهب",
    "خاتم ذهب",
    "سلسلة ذهب",
    "قلادة ذهب",

    // ─── AR — other metals ──────────────────────────────
    "سعر الفضة",
    "سعر البلاتين",
    "سعر البلاديوم",
    "المعادن النفيسة",
    "نسبة الذهب الفضة",

    // ─── AR — tools ─────────────────────────────────────
    "حاسبة الذهب",
    "حاسبة سعر الذهب",
    "محول الذهب",
  ],
  manifest: "/manifest.webmanifest",
  alternates: {
    ...buildAlternates("ar", "/"),
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: "Gold market news" }],
    },
  },
  icons: {
    icon: [
      { url: "/appIcone.ico", sizes: "any" },
      { url: "/appIcone.png", sizes: "192x192", type: "image/png" },
      { url: "/appIcone.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/appIcone.ico"],
    apple: [{ url: "/appIcone.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "apple-touch-icon-precomposed", url: "/appIcone.png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "ar_AE",
    alternateLocale: ["en_US", "ar_SA", "ar_JO", "ar_AE", "ar_EG"],
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Gold Prices Arabia — Live gold for MENA",
      },
      {
        url: "/appIcone.png",
        width: 512,
        height: 512,
        alt: "Gold Prices Arabia logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@goldpricesarabia",
    creator: "@goldpricesarabia",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Gold Prices Arabia",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
  formatDetection: { telephone: false, email: false, address: false },
  verification: {
    // Replace with actual codes once provisioned in Google Search Console / Bing.
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
      "facebook-domain-verification":
        process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION ?? "",
    },
  },
  other: {
    "google-adsense-account":
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX",
    "msapplication-TileColor": "#0a0a0a",
    "msapplication-TileImage": "/appIcone.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f6f4ee" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function I18nProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}

async function FooterGate() {
  const h = await headers();
  const path = h.get("x-pathname") ?? "";
  const isEmbed = /\/widgets\/embed\//.test(path);
  return isEmbed ? null : <Footer />;
}

/**
 * Site-wide structured data. Emits Org + WebSite + Service + Breadcrumb +
 * WebPage + FAQ on every route. Page-level live-price schema (Product /
 * FinancialProduct) is added separately by data-bearing pages inside their
 * own Suspense boundaries.
 */
async function SiteJsonLd({ locale }: { locale: string }) {
  const h = await headers();
  const path = h.get("x-pathname") ?? "/";
  // Don't emit on embeddable widgets — they're meant to live in third-party
  // pages and shouldn't pollute the host's schema graph.
  if (/\/widgets\/embed\//.test(path)) return null;
  const pageUrl = path.startsWith("/") ? path : `/${path}`;
  return (
    <JsonLd
      siteUrl={SITE_URL}
      pageUrl={pageUrl}
      pageName={locale === "en" ? "Gold Prices Arabia" : "أسعار الذهب العربية"}
      pageType="WebPage"
    />
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <Script id="auto-theme" strategy="beforeInteractive">
          {"(function(){try{var h=new Date().getHours();var t=h>=6&&h<18?'light':'dark';var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.setAttribute('data-theme',t);}catch(e){}})();"}
        </Script>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        <link rel="preconnect" href="https://stream.binance.com" />
        <link rel="preconnect" href="https://ws-feed.exchange.coinbase.com" />
        <link rel="preconnect" href="https://ws.kraken.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://stooq.com" />
        <link rel="dns-prefetch" href="https://query1.finance.yahoo.com" />
        <link rel="dns-prefetch" href="https://api.coingecko.com" />
      </head>
      <body>
        {/*
          Tag Manager / Analytics. Prefer GTM (one container, configure GA + Ads
          + Pixel inside GTM dashboard). Falls back to direct GA4 if no GTM.
          Both load via `strategy="worker"` (Partytown) when nextScriptWorkers
          is enabled — off main thread, no INP / LCP cost.
        */}
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <>
            {/*
              GTM uses `afterInteractive` (not `worker`/Partytown) because Tag
              Assistant, GA4 Realtime debug, and most Google debug tools require
              GTM on the main thread. `afterInteractive` runs after hydration so
              LCP/FCP are unaffected. Marginal INP cost (~30-80ms) is acceptable
              for analytics flexibility.
            */}
            <Script
              id="gtm-base"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="GTM"
              />
            </noscript>
          </>
        ) : process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}
        <Suspense fallback={null}>
          <SiteJsonLd locale={locale} />
        </Suspense>
        <ReduxProvider>
          <AutoTheme />
          <ThemeApplier />
          <MotionRoot>
            <LivePriceProvider>
              <Suspense fallback={null}>
                <I18nProvider locale={locale}>
                  {children}
                  <Suspense fallback={null}>
                    <FooterGate />
                  </Suspense>
                </I18nProvider>
              </Suspense>
            </LivePriceProvider>
          </MotionRoot>
        </ReduxProvider>
      </body>
    </html>
  );
}
