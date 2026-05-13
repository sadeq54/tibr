import { getLocale, getTranslations } from "next-intl/server";

import { Header } from "@/components/Header";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("NotFound");

  const quickLinks: Array<{ href: string; label: string; note: string }> = [
    {
      href: "/gold-price/24k",
      label: locale === "ar" ? "سعر الذهب 24K" : "24K Gold Price",
      note: locale === "ar" ? "أعلى نقاء — استثمار" : "Highest purity — investment grade",
    },
    {
      href: "/gold-price/21k",
      label: locale === "ar" ? "سعر الذهب 21K" : "21K Gold Price",
      note: locale === "ar" ? "الأكثر تداولاً في الخليج" : "Most-traded in Gulf markets",
    },
    {
      href: "/gold-price/18k",
      label: locale === "ar" ? "سعر الذهب 18K" : "18K Gold Price",
      note: locale === "ar" ? "مجوهرات يومية" : "Daily-wear jewellery",
    },
    {
      href: "/spot-gold",
      label: locale === "ar" ? "السعر الفوري" : "Spot Gold",
      note: locale === "ar" ? "XAU/USD لحظي" : "Live XAU/USD",
    },
    {
      href: "/saudi-arabia/gold-price/21k",
      label: locale === "ar" ? "أسعار السعودية" : "Saudi Arabia Prices",
      note: locale === "ar" ? "بالريال السعودي" : "In Saudi Riyal",
    },
    {
      href: "/uae/gold-price/21k",
      label: locale === "ar" ? "أسعار الإمارات" : "UAE Prices",
      note: locale === "ar" ? "بالدرهم الإماراتي" : "In UAE Dirham",
    },
  ];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <section className="text-center">
          <div className="text-7xl font-extrabold text-[var(--color-gold)] sm:text-8xl">404</div>
          <h1 className="mt-4 text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
            {t("h1")}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {t("body")}
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-md bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
          >
            ← {t("home")}
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            {t("popularH2")}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href as never}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 transition hover:border-[var(--color-gold)]/40"
              >
                <div className="text-sm font-semibold text-[var(--color-gold)]">{l.label}</div>
                <div className="mt-1 text-xs text-[var(--color-text-muted)]">{l.note}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 border-t border-[var(--color-border)] pt-6">
          <h2 className="text-base font-semibold text-[var(--color-text)]">
            {t("exploreH2")}
          </h2>
          <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href="/gold-price-chart" className="text-[var(--color-gold)] underline hover:no-underline">
              {locale === "ar" ? "الرسم البياني" : "Price chart"}
            </Link>
            <Link href="/gold-calculator" className="text-[var(--color-gold)] underline hover:no-underline">
              {locale === "ar" ? "حاسبة الذهب" : "Calculator"}
            </Link>
            <Link href="/precious-metals" className="text-[var(--color-gold)] underline hover:no-underline">
              {locale === "ar" ? "المعادن النفيسة" : "Precious metals"}
            </Link>
            <Link href="/news" className="text-[var(--color-gold)] underline hover:no-underline">
              {locale === "ar" ? "الأخبار" : "News"}
            </Link>
            <Link href="/about/sadeq" className="text-[var(--color-gold)] underline hover:no-underline">
              {locale === "ar" ? "المؤسس" : "Founder"}
            </Link>
            <Link href="/methodology" className="text-[var(--color-gold)] underline hover:no-underline">
              {locale === "ar" ? "المنهجية" : "Methodology"}
            </Link>
          </nav>
        </section>
      </main>
    </>
  );
}
