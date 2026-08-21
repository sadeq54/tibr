"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Radio } from "lucide-react";
import { useLocale } from "next-intl";

import { useLivePrice } from "@/components/LivePriceProvider";
import { HeroSpotSkeleton } from "@/components/skeletons";
import type { GoldApiResponse } from "@/lib/goldapi";
import { pick } from "@/lib/i18n-text";

const OZ_TO_GRAM = 31.1034768;
const EASE = [0.22, 1, 0.36, 1] as const;

const KARATS = [
  { k: "24K", purity: 1.0, pct: "99.9%" },
  { k: "22K", purity: 0.9167, pct: "91.7%" },
  { k: "21K", purity: 0.875, pct: "87.5%" },
  { k: "18K", purity: 0.75, pct: "75%" },
  { k: "14K", purity: 0.583, pct: "58.3%" },
] as const;

function usd(n: number, frac = 2): string {
  if (!Number.isFinite(n) || n === 0) return "—";
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  })}`;
}

/**
 * Homepage hero: one board answering the two questions every visitor has —
 * "what is gold at right now?" (big live XAU/USD median) and
 * "what does that make a gram?" (per-karat rail, above the fold).
 * Replaces the old stacked LiveGoldStream + HeroSpot cards.
 */
export function HeroBoard({ initialSpot }: { initialSpot: GoldApiResponse | null }) {
  const locale = useLocale();
  const live = useLivePrice();

  const xau = live.xau ?? initialSpot?.price ?? null;
  if (xau === null) return <HeroSpotSkeleton />;

  const spot = initialSpot;
  const ch = live.change24 ?? spot?.ch ?? 0;
  const chp = live.changePct24 ?? spot?.chp ?? 0;
  const bid = live.bid ?? spot?.bid ?? 0;
  const ask = live.ask ?? spot?.ask ?? 0;
  const high = live.high24 ?? spot?.high_price ?? 0;
  const low = live.low24 ?? spot?.low_price ?? 0;
  const open = spot?.open_price ?? 0;
  const prev = spot?.prev_close_price ?? 0;
  const spread = ask > 0 && bid > 0 ? ask - bid : 0;
  const connected = live.sources.filter((s) => s.connected).length;

  const up = ch >= 0;
  const trend = up ? "var(--color-up)" : "var(--color-down)";
  const TrendIcon = up ? ArrowUp : ArrowDown;

  const stats: Array<{ label: string; value: number; accent?: string }> = [
    {
      label: pick(locale, { en: "Open", ar: "الافتتاح", fr: "Ouverture", tr: "Açılış", ur: "افتتاح", hi: "ओपन" }),
      value: open,
    },
    {
      label: pick(locale, { en: "24h high", ar: "الأعلى 24س", fr: "Plus haut 24h", tr: "24s en yüksek", ur: "24 گھنٹے بلند", hi: "24 घं. उच्च" }),
      value: high,
      accent: "var(--color-up)",
    },
    {
      label: pick(locale, { en: "24h low", ar: "الأدنى 24س", fr: "Plus bas 24h", tr: "24s en düşük", ur: "24 گھنٹے کم", hi: "24 घं. निम्न" }),
      value: low,
      accent: "var(--color-down)",
    },
    {
      label: pick(locale, { en: "Prev close", ar: "الإغلاق السابق", fr: "Clôture préc.", tr: "Önceki kapanış", ur: "پچھلا اختتام", hi: "पिछला बंद" }),
      value: prev,
    },
  ];

  return (
    <motion.section
      aria-label={pick(locale, {
        en: "Live gold price board",
        ar: "لوحة سعر الذهب المباشر",
        fr: "Tableau du cours de l'or en direct",
        tr: "Canlı altın fiyatı panosu",
        ur: "براہ راست سونے کی قیمت کا بورڈ",
        hi: "लाइव सोने के भाव का बोर्ड",
      })}
      className="hero-board-bg card-shadow relative overflow-hidden rounded-2xl border border-[var(--color-border)]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      <div aria-hidden className="hero-grid-overlay pointer-events-none absolute inset-0" />

      <div className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1.55fr_1fr]">
        {/* ── Live spot ───────────────────────────────────────── */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
            <Radio
              size={12}
              aria-hidden
              className={connected > 0 ? "text-[var(--color-up)]" : "text-[var(--color-down)]"}
            />
            <span dir="ltr">XAU/USD</span>
            <span>·</span>
            <span>
              {pick(locale, {
                en: `live median of ${connected} exchanges`,
                ar: `وسيط ${connected} بورصات لحظيًا`,
                fr: `médiane en direct de ${connected} bourses`,
                tr: `${connected} borsanın canlı medyanı`,
                ur: `${connected} ایکسچینجز کا براہ راست میڈین`,
                hi: `${connected} एक्सचेंजों का लाइव माध्यिका`,
              })}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1" dir="ltr">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={`xau-${xau.toFixed(2)}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="num font-mono text-5xl font-bold leading-none tracking-tight text-[var(--color-text)] sm:text-6xl"
              >
                {usd(xau)}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm text-[var(--color-text-dim)]">
              {pick(locale, { en: "per troy oz", ar: "للأونصة", fr: "l'once", tr: "ons başına", ur: "فی اونس", hi: "प्रति औंस" })}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span
              dir="ltr"
              className="num inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[13px] font-semibold"
              style={{ color: trend, background: `color-mix(in srgb, ${trend} 13%, transparent)` }}
            >
              <TrendIcon size={13} aria-hidden />
              {up ? "+" : ""}
              {ch.toFixed(2)} ({up ? "+" : ""}
              {chp.toFixed(2)}%)
            </span>
            <span dir="ltr" className="num font-mono text-xs text-[var(--color-text-dim)]">
              {pick(locale, { en: "bid/ask ", ar: "شراء/بيع ", fr: "achat/vente ", tr: "alış/satış ", ur: "خرید/فروخت ", hi: "खरीद/बिक्री " })}
              {usd(bid)} / {usd(ask)}
              {spread > 0 ? ` · ±$${spread.toFixed(2)}` : ""}
            </span>
          </div>

          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--color-border)] pt-4">
            {stats.map((s) => (
              <div key={s.label} className="min-w-[5.5rem]">
                <dt className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
                  {s.label}
                </dt>
                <dd
                  dir="ltr"
                  className="num mt-0.5 font-mono text-sm font-semibold"
                  style={{ color: s.accent ?? "var(--color-text)" }}
                >
                  {usd(s.value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Per-gram rail: the answer above the fold ────────── */}
        <div className="lg:border-s lg:border-[var(--color-border)] lg:ps-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
            {pick(locale, {
              en: "Per gram right now · USD",
              ar: "سعر الجرام الآن · دولار",
              fr: "Le gramme en ce moment · USD",
              tr: "Şu an gram fiyatı · USD",
              ur: "ابھی فی گرام · USD",
              hi: "अभी प्रति ग्राम · USD",
            })}
          </h2>
          <ul className="mt-2">
            {KARATS.map((row) => {
              const gram = (xau / OZ_TO_GRAM) * row.purity;
              return (
                <li
                  key={row.k}
                  className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] py-3 last:border-b-0"
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold text-[#241c09]"
                      style={{
                        background: `linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-soft) ${row.purity * 100}%, #4a3a12 100%)`,
                      }}
                    >
                      {row.k.replace("K", "")}
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      {pick(locale, {
                        en: row.k,
                        ar: `عيار ${row.k.replace("K", "")}`,
                        fr: `${row.k.replace("K", "")} carats`,
                        tr: `${row.k.replace("K", "")} ayar`,
                        ur: `${row.k.replace("K", "")} قیراط`,
                        hi: `${row.k.replace("K", "")} कैरेट`,
                      })}
                      <span className="ms-2 text-[10px] font-medium text-[var(--color-text-dim)]">
                        {row.pct}
                      </span>
                    </span>
                  </span>
                  <span dir="ltr" className="num font-mono text-sm font-bold text-[var(--color-text)]">
                    {usd(gram)}
                  </span>
                </li>
              );
            })}
          </ul>
          <a
            href="#karat-heading"
            className="mt-3 inline-block text-xs font-semibold text-[var(--color-gold)] transition-colors hover:underline"
          >
            {pick(locale, {
              en: "All karats in 40+ currencies ↓",
              ar: "كل العيارات بأكثر من 40 عملة ↓",
              fr: "Tous les carats en 40+ devises ↓",
              tr: "Tüm ayarlar 40+ para biriminde ↓",
              ur: "تمام قیراط 40+ کرنسیوں میں ↓",
              hi: "सभी कैरेट 40+ मुद्राओं में ↓",
            })}
          </a>
        </div>

        {/* ── Exchange strip ──────────────────────────────────── */}
        <div className="lg:col-span-2">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-[var(--color-border)] pt-4">
            {live.sources.map((s) => {
              const srcUp = s.change_24h_pct >= 0;
              const srcTrend = srcUp ? "var(--color-up)" : "var(--color-down)";
              return (
                <li key={s.key} className="flex items-center gap-2 text-xs">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: s.connected ? "var(--color-up)" : "var(--color-down)" }}
                  />
                  <span className="font-semibold text-[var(--color-text-muted)]">{s.name}</span>
                  <span dir="ltr" className="num font-mono text-[var(--color-text)]">
                    {usd(s.last)}
                  </span>
                  <span dir="ltr" className="num font-mono" style={{ color: srcTrend }}>
                    {srcUp ? "+" : ""}
                    {s.change_24h_pct.toFixed(2)}%
                  </span>
                </li>
              );
            })}
            <li className="ms-auto text-[10px] text-[var(--color-text-dim)]">
              {pick(locale, {
                en: "PAXG/USD median · backed 1:1 by physical gold",
                ar: "وسيط PAXG/USD · مدعوم بذهب فيزيائي 1:1",
                fr: "Médiane PAXG/USD · adossée 1:1 à de l'or physique",
                tr: "PAXG/USD medyanı · 1:1 fiziksel altınla teminatlı",
                ur: "PAXG/USD میڈین · 1:1 حقیقی سونے سے محفوظ",
                hi: "PAXG/USD माध्यिका · 1:1 भौतिक सोने से समर्थित",
              })}
            </li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
