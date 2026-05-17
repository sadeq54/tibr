import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Calculator } from "@/components/Calculator";
import { Flag } from "@/components/Flag";
import { HeroSpot } from "@/components/HeroSpot";
import { PageShell } from "@/components/PageShell";
import {
  CalculatorSkeleton,
  HeroSpotSkeleton,
} from "@/components/skeletons";
import { Link } from "@/i18n/navigation";
import { getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { BUY_GOLD_EDITORIAL } from "@/lib/content/buy-gold-editorial";
import { buildAlternates, buildOpenGraph, canonicalPath } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schemas";

const SUPPORTED = [
  "usa", "uk", "canada", "australia",
  "saudi-arabia", "uae", "egypt", "morocco",
] as const;

export function generateStaticParams() {
  return SUPPORTED.map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country: slug } = await params;
  const c = COUNTRY_BY_SLUG[slug];
  if (!c) return {};
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("buyH1", { country: countryName(c, locale) }),
    description: t("buyIntro", { country: countryName(c, locale) }),
    alternates: buildAlternates(locale, `/buy-gold/${slug}`),
    openGraph: buildOpenGraph(locale, `/buy-gold/${slug}`),
  };
}

export default async function BuyGoldCountryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country: slug } = await params;
  const c = COUNTRY_BY_SLUG[slug];
  if (!c) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");
  const name = countryName(c, locale);

  const spotPromise = getCachedSpot("XAU");
  const fxPromise = getCachedFxRates();

  const pageUrl = canonicalPath(locale, `/buy-gold/${slug}`);
  const editorial = BUY_GOLD_EDITORIAL[slug];
  const buyFaqs = locale === "ar"
    ? [
        {
          q: `كيف أشتري الذهب في ${name}؟`,
          a: `الذهب يُباع في ${name} عبر: (1) محلات الذهب التقليدية والصاغة المرخصين، (2) البنوك (بعضها تبيع سبائك استثمارية)، (3) المتاجر الإلكترونية الموثقة. تأكد دائماً من: الهولمارك (ختم العيار)، فاتورة موثقة، شهادة LBMA للسبائك الاستثمارية.`,
        },
        {
          q: `ما الفرق بين شراء العملات والسبائك في ${name}؟`,
          a: `العملات: قطع صغيرة (1/10، 1/4، 1/2، 1 أونصة)، سيولة عالية، هامش premium أعلى (5-10% فوق السعر الفوري)، سهلة البيع لاحقاً. السبائك: من 1 جرام إلى 1 كيلو، هامش أقل (1-3% للكيلو)، تستهدف الاستثمار طويل المدى.`,
        },
        {
          q: `هل أحتاج لدفع ضريبة عند شراء الذهب في ${name}؟`,
          a: editorial?.ar.vatAnswer ?? `تختلف الضرائب حسب البلد. تحقق من اللوائح المحلية.`,
        },
        {
          q: `كيف أتأكد من أصالة الذهب المُشترى في ${name}؟`,
          a: `تحقق من: (1) ختم الهولمارك (يُحدد العيار)، (2) شهادة المختبر للسبائك (مثل PAMP، Valcambi، Argor)، (3) فاتورة من بائع مرخص، (4) اختبار حمضي بسيط في المحل، (5) للسبائك الكبيرة: تحقق من السيريال نومبر مع المُصنّع.`,
        },
        {
          q: `ما السعر العادل للذهب في ${name}؟`,
          a: `السعر العادل = السعر الفوري العالمي + (1) ضريبة محلية + (2) هامش بائع (3-10% للسبائك، 15-40% للمجوهرات شاملاً المصنعية). الجدول أعلاه يعرض السعر الفوري الحالي بـ${c.currency} — هذا مرجعك للتفاوض.`,
        },
      ]
    : [
        {
          q: `How do I buy gold in ${name}?`,
          a: `Gold is sold in ${name} via: (1) traditional gold shops and licensed goldsmiths, (2) banks (some sell investment bullion), (3) verified e-commerce platforms. Always verify: hallmark stamp, documented receipt, LBMA certification for investment bullion.`,
        },
        {
          q: `What is the difference between buying coins and bars in ${name}?`,
          a: `Coins: small denominations (1/10, 1/4, 1/2, 1 oz), high liquidity, higher premium (5-10% over spot), easy to sell later. Bars: from 1 gram to 1 kilo, lower premium (1-3% for kilo), target long-term investment.`,
        },
        {
          q: `Do I need to pay tax when buying gold in ${name}?`,
          a: editorial?.en.vatAnswer ?? `Tax rules vary by country. Check local regulations.`,
        },
        {
          q: `How do I verify gold authenticity in ${name}?`,
          a: `Check: (1) hallmark stamp (specifies karat), (2) assay certificate for bullion (PAMP, Valcambi, Argor), (3) receipt from a licensed dealer, (4) simple acid test in-shop, (5) for large bars: verify serial number with the refinery.`,
        },
        {
          q: `What is a fair gold price in ${name}?`,
          a: `Fair price = global spot price + (1) local VAT + (2) dealer margin (3-10% for bullion, 15-40% for jewellery including making charge). The table above shows the live spot price in ${c.currency} — your reference for negotiation.`,
        },
      ];
  const buyFaqSchema = faqPageSchema(pageUrl, buyFaqs, locale === "ar" ? "ar" : "en");

  return (
    <PageShell
      title={t("buyH1", { country: name })}
      intro={t("buyIntro", { country: name })}
      badge={<><Flag cc={c.cc} size={12} className="me-1" /> {name}</>}
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buyFaqSchema) }}
      />
      <Suspense fallback={<HeroSpotSkeleton />}>
        {(async () => {
          const [s, fx] = await Promise.all([spotPromise, fxPromise]);
          return <HeroSpot spot={s} fx={fx} displayCurrency={c.currency} />;
        })()}
      </Suspense>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <SubLink href={`/buy-gold/${slug}/coins`} label={t("buyCoinsH1", { country: name })} />
        <SubLink href={`/buy-gold/${slug}/small-coins`} label={t("buySmallH1", { country: name })} />
        <SubLink href={`/buy-gold/${slug}/bars`} label={t("buyBarsH1", { country: name })} />
      </ul>

      {editorial ? (
        <section
          aria-labelledby="buy-guide-heading"
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
        >
          <h2
            id="buy-guide-heading"
            className="text-xl font-semibold text-[var(--color-text)]"
          >
            {locale === "ar" ? editorial.ar.heading : editorial.en.heading}
          </h2>
          <div
            className="prose-article mt-3 space-y-3 text-sm leading-relaxed text-[var(--color-text-muted)]"
            dangerouslySetInnerHTML={{
              __html: locale === "ar" ? editorial.ar.body : editorial.en.body,
            }}
          />
        </section>
      ) : null}

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
          return <Calculator spot={calcSpot} fx={fx} defaultCurrency={c.currency} />;
        })()}
      </Suspense>
    </PageShell>
  );
}

function SubLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 text-sm font-semibold text-[var(--color-gold)] transition hover:border-[var(--color-gold)]/40"
      >
        {label}
      </Link>
    </li>
  );
}
