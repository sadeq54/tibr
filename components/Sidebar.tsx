import { Megaphone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const KARAT_LINKS = [
  { href: "/gold-price/24k", key: "linkKarat24" as const },
  { href: "/gold-price/21k", key: "linkKarat21" as const },
  { href: "/gold-price/18k", key: "linkKarat18" as const },
];

const COUNTRY_LINKS = [
  { href: "/jordan/gold-price/21k", key: "linkJordan" as const },
  { href: "/saudi-arabia/gold-price/21k", key: "linkSaudi" as const },
  { href: "/uae/gold-price/21k", key: "linkUAE" as const },
  { href: "/egypt/gold-price/21k", key: "linkEgypt" as const },
];

export function Sidebar({ adClient }: { adClient: string }) {
  const t = useTranslations("Sidebar");

  return (
    <aside className="space-y-4 lg:sticky lg:top-[72px] lg:self-start lg:max-h-[calc(100vh-88px)] lg:overflow-y-auto">
      <AdSlot client={adClient} label={t("adTop")} adsenseLabel={t("adsense", { client: adClient })} />

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
          {t("quickLinks")}
        </h4>
        <nav className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3 lg:grid-cols-1">
          {KARAT_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[var(--color-gold)] hover:underline">
              {t(l.key)}
            </Link>
          ))}
          <div className="col-span-full my-1 hidden h-px bg-[var(--color-border)] lg:block" />
          {COUNTRY_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[var(--color-gold)] hover:underline">
              {t(l.key)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="hidden lg:block">
        <AdSlot
          client={adClient}
          label={t("adBottom")}
          adsenseLabel={t("adsense", { client: adClient })}
        />
      </div>
    </aside>
  );
}

function AdSlot({
  client,
  label,
  adsenseLabel,
}: {
  client: string;
  label: string;
  adsenseLabel: string;
}) {
  return (
    <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-card)] p-4 text-center sm:h-44 sm:p-6">
      <Megaphone className="mb-2 h-5 w-5 text-[var(--color-gold)] sm:mb-3 sm:h-6 sm:w-6" />
      <div className="text-xs font-medium text-[var(--color-text)] sm:text-sm">{label}</div>
      <div className="mt-1 text-[10px] text-[var(--color-text-dim)] sm:text-xs">{adsenseLabel}</div>
      <ins
        className="adsbygoogle mt-2 block h-0 w-full sm:mt-3"
        data-ad-client={client}
        data-ad-format="auto"
      />
    </div>
  );
}
