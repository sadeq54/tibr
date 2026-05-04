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
    <aside className="space-y-4">
      <AdSlot client={adClient} label={t("adTop")} adsenseLabel={t("adsense", { client: adClient })} />

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
          {t("quickLinks")}
        </h4>
        <nav className="flex flex-col gap-2 text-sm">
          {KARAT_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[var(--color-gold)] hover:underline">
              {t(l.key)}
            </Link>
          ))}
          <div className="my-2 h-px bg-[var(--color-border)]" />
          {COUNTRY_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[var(--color-gold)] hover:underline">
              {t(l.key)}
            </Link>
          ))}
        </nav>
      </div>

      <AdSlot client={adClient} label={t("adBottom")} adsenseLabel={t("adsense", { client: adClient })} />
    </aside>
  );
}

function AdSlot({ client, label, adsenseLabel }: { client: string; label: string; adsenseLabel: string }) {
  return (
    <div className="flex h-44 flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-card)] p-6 text-center">
      <Megaphone className="mb-3 h-6 w-6 text-[var(--color-gold)]" />
      <div className="text-sm font-medium text-[var(--color-text)]">{label}</div>
      <div className="mt-1 text-xs text-[var(--color-text-dim)]">{adsenseLabel}</div>
      <ins
        className="adsbygoogle mt-3 block h-0 w-full"
        data-ad-client={client}
        data-ad-format="auto"
      />
    </div>
  );
}
