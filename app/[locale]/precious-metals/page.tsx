import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { MetalsStrip } from "@/components/MetalsStrip";
import { PageShell } from "@/components/PageShell";
import { MetalsStripSkeleton } from "@/components/skeletons";
import { Link } from "@/i18n/navigation";
import { fetchMetals } from "@/lib/goldapi";

const METALS = [
  { slug: "gold", id: "XAU" as const, name_en: "Gold", name_ar: "ذهب" },
  { slug: "silver", id: "XAG" as const, name_en: "Silver", name_ar: "فضة" },
  { slug: "platinum", id: "XPT" as const, name_en: "Platinum", name_ar: "بلاتين" },
  { slug: "palladium", id: "XPD" as const, name_en: "Palladium", name_ar: "بالاديوم" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Footer" });
  return { title: t("metalsHeading") };
}

export default async function PreciousMetalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFooter = await getTranslations("Footer");
  const metalsPromise = fetchMetals();

  return (
    <PageShell title={tFooter("metalsHeading")} showFaq={false}>
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
                {locale === "ar" ? m.name_ar : m.name_en}
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
