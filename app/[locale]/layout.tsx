import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { LivePriceProvider } from "@/components/LivePriceProvider";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { routing } from "@/i18n/routing";

import "../globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://goldpricesarabia.com";
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
    canonical: "/",
    languages: {
      ar: "/",
      en: "/en",
      "x-default": "/",
    },
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
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script src="/theme-init.js" suppressHydrationWarning />
        <link rel="preconnect" href="https://stream.binance.com" />
        <link rel="preconnect" href="https://ws-feed.exchange.coinbase.com" />
        <link rel="preconnect" href="https://ws.kraken.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://stooq.com" />
        <link rel="dns-prefetch" href="https://query1.finance.yahoo.com" />
        <link rel="dns-prefetch" href="https://api.coingecko.com" />
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body>
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
      </body>
    </html>
  );
}
