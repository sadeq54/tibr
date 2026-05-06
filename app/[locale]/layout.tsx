import type { Metadata } from "next";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Tibr — Live Gold Prices for the Arab World",
    template: "%s · Tibr",
  },
  description:
    "Tibr (تبر) tracks live gold prices in USD, JOD, SAR, AED, EGP for 24K, 21K, 18K, 14K karats. Updated every minute.",
  keywords: [
    "gold price",
    "live gold",
    "Tibr",
    "تبر",
    "سعر الذهب",
    "Saudi gold",
    "Jordan gold",
    "UAE gold",
    "Egypt gold",
    "24K",
    "21K",
    "18K",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ar: "/ar",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    title: "Tibr — Live Gold Prices",
    description: "Live gold from the source. USD, JOD, SAR, AED, EGP.",
    siteName: "Tibr",
    locale: "en_US",
    alternateLocale: ["ar_AE", "ar_SA", "ar_JO", "ar_EG"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tibr — Live Gold Prices",
    description: "Live gold from the source. USD, JOD, SAR, AED, EGP.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "finance",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <Script id="tibr-theme-init" strategy="beforeInteractive">
          {`(function(){try{var s=localStorage.getItem('tibr-theme');var p=window.matchMedia('(prefers-color-scheme: light)').matches;var t=s||(p?'light':'dark');if(t==='light')document.documentElement.classList.add('light');document.documentElement.dataset.theme=t;}catch(e){}})();`}
        </Script>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
