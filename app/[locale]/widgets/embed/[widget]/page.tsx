import { Suspense } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { HeroSpot } from "@/components/HeroSpot";
import { KaratGrid } from "@/components/KaratGrid";
import { LiveGoldStream } from "@/components/LiveGoldStream";
import { PriceChart } from "@/components/PriceChart";
import { fetchFxRates } from "@/lib/fx";
import { fetchSpot } from "@/lib/goldapi";
import { fetchAllHistory } from "@/lib/history";

const VALID = ["spot-gold", "karat-grid", "chart", "live-stream"] as const;
type Widget = (typeof VALID)[number];

export const metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return VALID.map((widget) => ({ widget }));
}

export default async function EmbedWidget({
  params,
}: {
  params: Promise<{ locale: string; widget: string }>;
}) {
  const { locale, widget } = await params;
  if (!VALID.includes(widget as Widget)) notFound();
  setRequestLocale(locale);

  const spotPromise = fetchSpot("XAU");
  const fxPromise = fetchFxRates();
  const historyPromise = fetchAllHistory("1y");

  return (
    <main
      className="min-h-screen bg-[var(--color-bg)] p-3"
      style={{ background: "var(--color-bg)" }}
    >
      {widget === "spot-gold" ? (
        <Suspense fallback={null}>
          {(async () => {
            const s = await spotPromise;
            return <HeroSpot spot={s} />;
          })()}
        </Suspense>
      ) : null}

      {widget === "karat-grid" ? (
        <Suspense fallback={null}>
          {(async () => {
            const [s, fx] = await Promise.all([spotPromise, fxPromise]);
            return <KaratGrid spot={s} fx={fx} />;
          })()}
        </Suspense>
      ) : null}

      {widget === "chart" ? (
        <Suspense fallback={null}>
          {(async () => {
            const [h, fx] = await Promise.all([historyPromise, fxPromise]);
            return <PriceChart histories={h} fx={fx} />;
          })()}
        </Suspense>
      ) : null}

      {widget === "live-stream" ? <LiveGoldStream /> : null}

      <div className="mt-3 text-center text-[10px] text-[var(--color-text-dim)]">
        <a
          href="https://goldpricesarabia.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-gold)]"
        >
          goldpricesarabia.com
        </a>
      </div>
    </main>
  );
}
