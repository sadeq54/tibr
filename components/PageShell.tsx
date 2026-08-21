import { createTranslator } from "next-intl";

import { staticMessages } from "@/lib/static-messages";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { StoresMarquee } from "@/components/StoresMarquee";
import { TradingViewChart } from "@/components/TradingViewChart";

type PageShellBase = {
  badge?: React.ReactNode;
  children: React.ReactNode;
  showFaq?: boolean;
  showChart?: boolean;
  chartCurrency?: string;
};

/**
 * Legacy callers: pass pre-resolved `title` (string) + optional `intro` node.
 * The H1 renders inline in the dynamic page body — visible to JS-rendering
 * crawlers (Googlebot) but NOT to the static PPR shell (Seobility, Bing
 * fallback, AI bots, Lighthouse SEO).
 */
type PageShellLegacy = PageShellBase & {
  title: string;
  intro?: React.ReactNode;
  locale?: undefined;
  namespace?: undefined;
};

/**
 * Static-cached callers: pass `locale` + `namespace` + `titleKey` (+ optional
 * `introKey`, vars). PageShell renders the H1/intro via a `"use cache"` server
 * sub-component → lands in the static prerender that every crawler reads
 * first. Use this on every SEO-targeted page.
 */
type PageShellCached = PageShellBase & {
  locale: string;
  namespace: string;
  titleKey: string;
  introKey?: string;
  titleVars?: Record<string, string | number | Date>;
  introVars?: Record<string, string | number | Date>;
  title?: undefined;
  intro?: undefined;
};

type PageShellProps = PageShellLegacy | PageShellCached;

export function PageShell(props: PageShellProps) {
  const {
    badge,
    children,
    showFaq = true,
    showChart = true,
    chartCurrency,
  } = props;
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="min-w-0 space-y-8">
            {props.locale && props.namespace && props.titleKey ? (
              <CachedPageHero
                locale={props.locale}
                namespace={props.namespace}
                titleKey={props.titleKey}
                introKey={props.introKey}
                titleVars={props.titleVars}
                introVars={props.introVars}
                badge={badge}
              />
            ) : (
              <header>
                {badge ? (
                  <div className="mb-2 inline-block rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                    {badge}
                  </div>
                ) : null}
                <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                  {props.title}
                </h1>
                {props.intro ? (
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {props.intro}
                  </p>
                ) : null}
              </header>
            )}
            {showChart ? <TradingViewChart currency={chartCurrency} /> : null}
            <AffiliateBanner />
            {children}
            <StoresMarquee />
            {showFaq ? <Faq /> : null}
          </section>
          <Sidebar />
        </div>
      </main>
    </>
  );
}

/**
 * Static-cached H1 + intro + optional badge. Calls `getTranslations` inside
 * a `"use cache"` boundary so the rendered HTML lands in the PPR static shell
 * — non-JS crawlers see real H1 text instead of an empty <main>.
 */
function CachedPageHero({
  locale,
  namespace,
  titleKey,
  introKey,
  titleVars,
  introVars,
  badge,
}: {
  locale: string;
  namespace: string;
  titleKey: string;
  introKey?: string;
  titleVars?: Record<string, string | number | Date>;
  introVars?: Record<string, string | number | Date>;
  badge?: React.ReactNode;
}) {
  // SYNCHRONOUS. Async components get wrapped in implicit Suspense and stream
  // as hidden reveal payloads AFTER </main>, which non-JS crawlers (Seobility,
  // Bing fallback, AI bots) skip → "0 words / 0 H1". Sync server component =
  // inlined directly into the static prerender. Messages are static imports,
  // createTranslator is sync → zero perf cost.
  const t = createTranslator({ locale, namespace, messages: staticMessages(locale) });
  return (
    <header>
      {badge ? (
        <div className="mb-2 inline-block rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          {badge}
        </div>
      ) : null}
      <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)]">
        {t(titleKey, titleVars)}
      </h1>
      {introKey ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          {t(introKey, introVars)}
        </p>
      ) : null}
    </header>
  );
}
