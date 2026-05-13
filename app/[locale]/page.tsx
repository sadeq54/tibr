import { Suspense } from "react";
import { connection } from "next/server";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { BidAskGauge } from "@/components/BidAskGauge";
import { Calculator } from "@/components/Calculator";
import { DebugConsole } from "@/components/DebugConsole";
import { Faq } from "@/components/Faq";
import { GeoRedirect } from "@/components/GeoRedirect";
import { Header } from "@/components/Header";
import { HeroSpot } from "@/components/HeroSpot";
import { JsonLd } from "@/components/JsonLd";
import { KaratGrid } from "@/components/KaratGrid";
import dynamic from "next/dynamic";

import { LazyMount } from "@/components/LazyMount";
import { MetalsStrip } from "@/components/MetalsStrip";
import { PriceChart } from "@/components/PriceChart";
import { Sidebar } from "@/components/Sidebar";
import { StoresMarquee } from "@/components/StoresMarquee";

// Heavy / below-the-fold widgets — defer JS to improve LCP/FCP/TTI.
// Wrapped in <LazyMount> below for IntersectionObserver-gated client mount.
const TradingViewChart = dynamic(() =>
  import("@/components/TradingViewChart").then((m) => m.TradingViewChart),
);
const LiveGoldStream = dynamic(() =>
  import("@/components/LiveGoldStream").then((m) => m.LiveGoldStream),
);
import {
  BidAskGaugeSkeleton,
  CalculatorSkeleton,
  HeroSpotSkeleton,
  KaratGridSkeleton,
  MetalsStripSkeleton,
  PriceChartSkeleton,
} from "@/components/skeletons";
import { Link } from "@/i18n/navigation";
import { fetchFxRates, type FxRates } from "@/lib/fx";
import { fetchMetals, type MetalsBundle } from "@/lib/goldapi";
import { fetchAllHistory, type MetalHistory } from "@/lib/history";
import { buildAlternates, buildOpenGraph, SITE_URL } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Page" });
  return {
    title: t("title"), description: t("description"),
    alternates: buildAlternates(locale, "/"),
    openGraph: buildOpenGraph(locale, "/"),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Streaming sections — each awaits its own promise, falls back to a skeleton
// while data resolves. Same fetch URL across sections is deduped by Next cache.
// ─────────────────────────────────────────────────────────────────────────────

async function HeroSpotSection({ promise }: { promise: Promise<MetalsBundle> }) {
  const m = await promise;
  return <HeroSpot spot={m.XAU} />;
}

async function MetalsStripSection({ promise }: { promise: Promise<MetalsBundle> }) {
  const m = await promise;
  return <MetalsStrip metals={m} />;
}

async function PriceChartSection({
  hPromise,
  fxPromise,
}: {
  hPromise: Promise<MetalHistory>;
  fxPromise: Promise<FxRates>;
}) {
  const [h, fx] = await Promise.all([hPromise, fxPromise]);
  return <PriceChart histories={h} fx={fx} />;
}

async function BidAskSection({ promise }: { promise: Promise<MetalsBundle> }) {
  const m = await promise;
  return <BidAskGauge spot={m.XAU} />;
}

async function KaratGridSection({
  mPromise,
  fxPromise,
}: {
  mPromise: Promise<MetalsBundle>;
  fxPromise: Promise<FxRates>;
}) {
  const [m, fx] = await Promise.all([mPromise, fxPromise]);
  return <KaratGrid spot={m.XAU} fx={fx} />;
}

async function CalculatorSection({
  mPromise,
  fxPromise,
}: {
  mPromise: Promise<MetalsBundle>;
  fxPromise: Promise<FxRates>;
}) {
  const [m, fx] = await Promise.all([mPromise, fxPromise]);
  const spot = m.XAU;
  const calcSpot = spot
    ? {
        price_gram_24k: spot.price_gram_24k,
        price_gram_21k: spot.price_gram_21k,
        price_gram_18k: spot.price_gram_18k,
        price_gram_14k: spot.price_gram_14k,
      }
    : { price_gram_24k: 0, price_gram_21k: 0, price_gram_18k: 0, price_gram_14k: 0 };
  return <Calculator spot={calcSpot} fx={fx} />;
}

async function MetaSection({
  mPromise,
  fxPromise,
}: {
  mPromise: Promise<MetalsBundle>;
  fxPromise: Promise<FxRates>;
}) {
  const [m, fx] = await Promise.all([mPromise, fxPromise]);
  return (
    <>
      <JsonLd spot={m.XAU} siteUrl={SITE_URL} pageOnly />
      <DebugConsole spot={m.XAU} metals={m} fx={fx} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  await connection();

  const t = await getTranslations("Page");

  // Kick off fetches in parallel; share promises with Suspense children.
  const metalsPromise = fetchMetals();
  const fxPromise = fetchFxRates();
  const historyPromise = fetchAllHistory("1y");

  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX";

  const countries = [
    { c: t("country.jordan"), url: "/jordan/gold-price/21k", note: t("country.jordanNote") },
    { c: t("country.saudi"), url: "/saudi-arabia/gold-price/21k", note: t("country.saudiNote") },
    { c: t("country.uae"), url: "/uae/gold-price/21k", note: t("country.uaeNote") },
    { c: t("country.egypt"), url: "/egypt/gold-price/21k", note: t("country.egyptNote") },
  ];

  return (
    <>
      <Suspense fallback={null}>
        <MetaSection mPromise={metalsPromise} fxPromise={fxPromise} />
      </Suspense>
      <GeoRedirect />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="min-w-0 space-y-8">
            <header>
              <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {t("h1")}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                {t.rich("intro", {
                  ar: (chunks) => (
                    <span lang={locale === "ar" ? "en" : "ar"} className="text-[var(--color-text)]">
                      {chunks}
                    </span>
                  ),
                })}
              </p>
              <nav
                aria-label={locale === "ar" ? "روابط سريعة" : "Quick links"}
                className="mt-4 flex flex-wrap gap-2 text-sm"
              >
                {[
                  { href: "/gold-price/24k", label: "24K" },
                  { href: "/gold-price/21k", label: "21K" },
                  { href: "/gold-price/18k", label: "18K" },
                  { href: "/gold-price/14k", label: "14K" },
                  { href: "/spot-gold", label: locale === "ar" ? "السعر الفوري" : "Spot Gold" },
                  { href: "/gold-price-chart", label: locale === "ar" ? "الرسم البياني" : "Chart" },
                  { href: "/gold-calculator", label: locale === "ar" ? "الحاسبة" : "Calculator" },
                  { href: "/saudi-arabia/gold-price/21k", label: `🇸🇦 ${locale === "ar" ? "السعودية" : "Saudi"}` },
                  { href: "/uae/gold-price/21k", label: `🇦🇪 ${locale === "ar" ? "الإمارات" : "UAE"}` },
                  { href: "/egypt/gold-price/21k", label: `🇪🇬 ${locale === "ar" ? "مصر" : "Egypt"}` },
                  { href: "/news", label: locale === "ar" ? "الأخبار" : "News" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as never}
                    className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5 px-4 py-2 font-medium text-[var(--color-gold)] transition hover:bg-[var(--color-gold)]/15"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </header>

            <LazyMount minHeight={120}>
              <LiveGoldStream />
            </LazyMount>

            <Suspense fallback={<HeroSpotSkeleton />}>
              <HeroSpotSection promise={metalsPromise} />
            </Suspense>

            <Suspense fallback={<MetalsStripSkeleton />}>
              <MetalsStripSection promise={metalsPromise} />
            </Suspense>

            <LazyMount minHeight={500}>
              <TradingViewChart />
            </LazyMount>

            <AffiliateBanner />

            <LazyMount minHeight={400} fallback={<PriceChartSkeleton />}>
              <Suspense fallback={<PriceChartSkeleton />}>
                <PriceChartSection hPromise={historyPromise} fxPromise={fxPromise} />
              </Suspense>
            </LazyMount>

            <LazyMount minHeight={200} fallback={<BidAskGaugeSkeleton />}>
              <Suspense fallback={<BidAskGaugeSkeleton />}>
                <BidAskSection promise={metalsPromise} />
              </Suspense>
            </LazyMount>

            <Suspense fallback={<KaratGridSkeleton />}>
              <KaratGridSection mPromise={metalsPromise} fxPromise={fxPromise} />
            </Suspense>

            <LazyMount minHeight={400} fallback={<CalculatorSkeleton />}>
              <Suspense fallback={<CalculatorSkeleton />}>
                <CalculatorSection mPromise={metalsPromise} fxPromise={fxPromise} />
              </Suspense>
            </LazyMount>

            <LazyMount minHeight={140}>
              <StoresMarquee />
            </LazyMount>

            <section aria-labelledby="about-heading">
              <h2 id="about-heading" className="text-xl font-semibold text-[var(--color-text)]">
                {t("aboutH2")}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <p>
                  {t.rich("aboutP1", {
                    b: (chunks) => <strong className="text-[var(--color-text)]">{chunks}</strong>,
                    ar: (chunks) => (
                      <span lang={locale === "ar" ? "en" : "ar"} className="text-[var(--color-gold)]">
                        {chunks}
                      </span>
                    ),
                  })}
                </p>
                <p>{t("aboutP2")}</p>
              </div>
            </section>

            <section
              aria-labelledby="how-it-works-heading"
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5"
            >
              <h2
                id="how-it-works-heading"
                className="text-xl font-semibold text-[var(--color-text)]"
              >
                {locale === "ar" ? "كيف نحسب سعر الذهب" : "How we calculate gold prices"}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <p>
                  {locale === "ar"
                    ? "السعر الفوري للذهب (XAU/USD) هو السعر العالمي للأونصة الترويسية بالدولار الأمريكي. نحسبه كمتوسط لحظي من ثلاث بورصات رئيسية — Binance و Coinbase و Kraken — عبر زوج PAXG/USD. PAXG هو رمز مدعوم 1:1 بسبائك ذهب فيزيائية من فئة London Good Delivery موجودة في خزائن Brink's، ويتتبّع تثبيت LBMA بفارق سنتات قليلة."
                    : "Spot gold (XAU/USD) is the global price per troy ounce in US Dollars. We compute it as the per-tick median of three major exchanges — Binance, Coinbase, and Kraken — via the PAXG/USD pair. PAXG is a token backed 1:1 by physical London Good Delivery gold bars in Brink's vaults, tracking the LBMA fix within a few cents."}
                </p>
                <p>
                  {locale === "ar"
                    ? "لتحويل السعر الفوري إلى سعر الجرام لكل عيار، نقسم على 31.1035 (جرامات الأونصة) ثم نضرب بنسبة النقاء: 99.9% للعيار 24، 87.5% للعيار 21، 75% للعيار 18، و 58.3% للعيار 14. ثم نضرب بسعر صرف العملة اليومي من بيانات البنوك المركزية المفتوحة للحصول على سعر الجرام بأكثر من 40 عملة محلية تشمل الريال السعودي، الدينار الأردني، الدرهم الإماراتي، والجنيه المصري."
                    : "To convert spot to per-gram per karat, we divide by 31.1035 (grams per ounce) and multiply by purity ratio: 99.9% for 24K, 87.5% for 21K, 75% for 18K, 58.3% for 14K. We then multiply by daily mid-market FX from open central-bank data, giving per-gram prices in 40+ retail currencies including SAR, JOD, AED, and EGP."}
                </p>
                <p>
                  {locale === "ar"
                    ? "النتيجة المعروضة هي السعر الفوري المكافئ — السعر الأرضي قبل أي هامش تجزئة. ستضيف محلات المجوهرات والصاغة المحليون مصنعية (5%-30%) وهامش بائع التجزئة (3%-10%) وضرائب القيمة المضافة المحلية (السعودية: 15%، الإمارات: 5%، مصر: لا ضريبة). راجع صفحة المنهجية للحصول على التفاصيل الكاملة وحدود البيانات."
                    : "The displayed value is the spot-equivalent — the floor price before any retail premium. Jewelry shops and local goldsmiths add workmanship (5%-30%), retailer margin (3%-10%), and local VAT (Saudi: 15%, UAE: 5%, Egypt: none). See our methodology page for full details and data limitations."}
                </p>
              </div>
            </section>

            <section aria-labelledby="why-trust-heading">
              <h2
                id="why-trust-heading"
                className="text-xl font-semibold text-[var(--color-text)]"
              >
                {locale === "ar" ? "لماذا تثق في Gold Prices Arabia" : "Why trust Gold Prices Arabia"}
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <li>
                  <strong className="text-[var(--color-text)]">
                    {locale === "ar" ? "بيانات شفافة: " : "Transparent data: "}
                  </strong>
                  {locale === "ar"
                    ? "كل حساب موثق في /methodology. لا أرقام مخفية، لا هوامش تسعير سرية."
                    : "Every calculation documented at /methodology. No hidden numbers, no secret pricing margins."}
                </li>
                <li>
                  <strong className="text-[var(--color-text)]">
                    {locale === "ar" ? "مؤلف معروف: " : "Named author: "}
                  </strong>
                  {locale === "ar"
                    ? "أسس الموقع صادق سيد أحمد. التواصل عبر LinkedIn متاح للتحقق من الهوية."
                    : "Site founded by Sadeq Sayed Ahmad. LinkedIn contact available for identity verification."}
                </li>
                <li>
                  <strong className="text-[var(--color-text)]">
                    {locale === "ar" ? "ليست نصيحة مالية: " : "Not financial advice: "}
                  </strong>
                  {locale === "ar"
                    ? "ننشر الأسعار، لا التوصيات. استشر مستشاراً مالياً مرخّصاً قبل اتخاذ قرارات الاستثمار."
                    : "We publish prices, not recommendations. Consult a licensed financial advisor before investment decisions."}
                </li>
                <li>
                  <strong className="text-[var(--color-text)]">
                    {locale === "ar" ? "تحديث مستمر: " : "Continuously updated: "}
                  </strong>
                  {locale === "ar"
                    ? "تجميع WebSocket لحظي للذهب — تحديث كل ثانية. الفضة والبلاتين والبلاديوم تحديث كل دقيقة."
                    : "WebSocket aggregation for gold — updated every second. Silver, platinum, palladium updated every minute."}
                </li>
                <li>
                  <strong className="text-[var(--color-text)]">
                    {locale === "ar" ? "مجاني للجميع: " : "Free for everyone: "}
                  </strong>
                  {locale === "ar"
                    ? "لا اشتراك، لا تسجيل دخول، لا حد للاستخدام. خدمة عامة لمنطقة الشرق الأوسط وشمال أفريقيا."
                    : "No subscription, no login, no rate limits. A public service for the MENA region."}
                </li>
              </ul>
            </section>

            <section aria-labelledby="countries-heading">
              <h2 id="countries-heading" className="text-xl font-semibold text-[var(--color-text)]">
                {t("countriesH2")}
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {countries.map((row) => (
                  <Link
                    key={row.url}
                    href={row.url}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 transition hover:border-[var(--color-gold)]/40"
                  >
                    <div className="text-sm font-semibold text-[var(--color-gold)]">{row.c}</div>
                    <div className="mt-1 text-xs text-[var(--color-text-muted)]">{row.note}</div>
                  </Link>
                ))}
              </div>
            </section>

            <Faq />

            <section
              aria-labelledby="sources-heading"
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5"
            >
              <h2
                id="sources-heading"
                className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-dim)]"
              >
                {locale === "ar" ? "مصادر البيانات والمراجع" : "Data sources & references"}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
                {locale === "ar"
                  ? "تأتي أسعارنا من تجميع لحظي عبر WebSocket من بورصات تنظيمية كبرى. تحقّق من مصداقية البيانات من المصادر التالية:"
                  : "Our prices are aggregated in real time from major regulated exchanges. Verify data authenticity at the following authoritative sources:"}
              </p>
              <ul className="mt-3 grid gap-1.5 text-xs sm:grid-cols-2 lg:grid-cols-3">
                <li>
                  <a
                    href="https://www.lbma.org.uk/prices-and-data/precious-metal-prices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    LBMA — London Bullion Market Association ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gold.org/goldhub/data/gold-prices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    World Gold Council ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://paxos.com/paxg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    Paxos — PAXG Trust ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.brinks.com/en-us/services/bullion-vault-services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    Brink's Vault Services ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cmegroup.com/markets/metals/precious/gold.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    COMEX Gold Futures (CME) ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.en.sge.com.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    Shanghai Gold Exchange ↗
                  </a>
                </li>
              </ul>
            </section>
          </section>

          <LazyMount minHeight={300} className="hidden lg:block">
            <Sidebar adClient={adsClient} />
          </LazyMount>
        </div>
      </main>

    </>
  );
}
