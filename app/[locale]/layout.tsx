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
  "Live gold prices in real time across 46 countries and 40+ currencies. Track 24K, 21K, 18K and 14K gold per gram, ounce and kilogram. Free, accurate, updated every second from Binance, Coinbase and Kraken WebSockets.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE_DEFAULT, template: "%s · Gold Prices Arabia" },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "finance",
  classification: "Finance, Commodities, Precious Metals",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  keywords: [
    "gold price",
    "gold price today",
    "live gold price",
    "spot gold",
    "gold price per gram",
    "gold price per ounce",
    "gold price per kilo",
    "24k gold price",
    "21k gold price",
    "18k gold price",
    "14k gold price",
    "Saudi gold price",
    "Jordan gold price",
    "UAE gold price",
    "Dubai gold souk",
    "Egypt gold price",
    "USA gold price",
    "UK gold price",
    "gold silver ratio",
    "Shanghai gold exchange",
    "PAXG",
    "XAU/USD",
    "أسعار الذهب",
    "سعر الذهب اليوم",
    "سعر الذهب",
    "سعر الذهب في السعودية",
    "سعر الذهب في الأردن",
    "سعر الذهب في الإمارات",
    "سعر الذهب في مصر",
    "Gold Prices Arabia",
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
            <Script
              id="gtm-base"
              strategy="worker"
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
              strategy="worker"
            />
            <Script id="ga-init" strategy="worker">
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
