import { AffiliateBanner } from "@/components/AffiliateBanner";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { StoresMarquee } from "@/components/StoresMarquee";
import { TradingViewChart } from "@/components/TradingViewChart";

export function PageShell({
  title,
  intro,
  badge,
  children,
  showFaq = true,
  showChart = true,
  chartCurrency,
}: {
  title: string;
  intro?: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  showFaq?: boolean;
  showChart?: boolean;
  chartCurrency?: string;
}) {
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXX";
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <section className="min-w-0 space-y-8">
            <header>
              {badge ? (
                <div className="mb-2 inline-block rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                  {badge}
                </div>
              ) : null}
              <h1 className="text-3xl font-bold tracking-tight text-[var(--color-gold)]">
                {title}
              </h1>
              {intro ? (
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {intro}
                </p>
              ) : null}
            </header>
            {showChart ? <TradingViewChart currency={chartCurrency} /> : null}
            <AffiliateBanner />
            {children}
            <StoresMarquee />
            {showFaq ? <Faq /> : null}
          </section>
          <Sidebar adClient={adsClient} />
        </div>
      </main>
    </>
  );
}
