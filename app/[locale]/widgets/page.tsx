import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageShell } from "@/components/PageShell";
import { WidgetBuilder } from "@/components/WidgetBuilder";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("widgetsH1"),
    description: t("widgetsIntro"),
    alternates: buildAlternates(locale, "/widgets"),
    openGraph: buildOpenGraph(locale, "/widgets"),
  };
}

export default async function WidgetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SubPage");

  return (
    <PageShell
      locale={locale}
      namespace="SubPage"
      titleKey="widgetsH1"
      introKey="widgetsIntro"
      showFaq={false}
    >
      <WidgetBuilder locale={locale} />
    </PageShell>
  );
}
