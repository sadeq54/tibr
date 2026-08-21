import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { MetalsStrip } from "@/components/MetalsStrip";
import { PageShell } from "@/components/PageShell";
import { MetalsStripSkeleton } from "@/components/skeletons";
import { Link } from "@/i18n/navigation";
import { fetchMetals } from "@/lib/goldapi";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

const METALS: Array<{ slug: string; id: "XAU" | "XAG" | "XPT" | "XPD"; name: LocaleText }> = [
  { slug: "gold", id: "XAU", name: { en: "Gold", ar: "ذهب", fr: "Or", tr: "Altın", ur: "سونا", hi: "सोना" } },
  { slug: "silver", id: "XAG", name: { en: "Silver", ar: "فضة", fr: "Argent", tr: "Gümüş", ur: "چاندی", hi: "चांदी" } },
  { slug: "platinum", id: "XPT", name: { en: "Platinum", ar: "بلاتين", fr: "Platine", tr: "Platin", ur: "پلاٹینم", hi: "प्लैटिनम" } },
  { slug: "palladium", id: "XPD", name: { en: "Palladium", ar: "بالاديوم", fr: "Palladium", tr: "Paladyum", ur: "پیلیڈیم", hi: "पैलेडियम" } },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Footer" });
  return {
    title: t("metalsHeading"),
    alternates: buildAlternates(locale, "/precious-metals"),
    openGraph: buildOpenGraph(locale, "/precious-metals"),
  };
}

export default async function PreciousMetalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const metalsPromise = fetchMetals();

  return (
    <PageShell
      locale={locale}
      namespace="Footer"
      titleKey="metalsHeading"
      showFaq={false}
    >
      <Suspense fallback={<MetalsStripSkeleton />}>
        {(async () => <MetalsStrip metals={await metalsPromise} />)()}
      </Suspense>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {METALS.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/precious-metals/${m.slug}`}
              className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 transition hover:border-[var(--color-gold)]/40"
            >
              <div className="text-sm font-semibold text-[var(--color-gold)]">
                {pick(locale, m.name)}
              </div>
              <div className="mt-1 text-[10px] text-[var(--color-text-dim)]">
                {m.id}/USD
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
