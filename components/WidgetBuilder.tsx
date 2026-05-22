"use client";

import { useMemo, useState } from "react";

import { COUNTRIES, countryName } from "@/lib/countries";

const SITE = "https://goldpricesarabia.com";

/**
 * Widget builder — webmaster-facing configurator for the embeddable ticker.
 *
 * Picks a country + theme, generates the embed HTML, and shows a live preview.
 * The generated snippet pairs the <iframe> with a plain dofollow <a> placed
 * OUTSIDE the iframe so the host page passes link equity to us — the iframe
 * itself is `noindex` and passes nothing. The anchor is keyword-rich
 * ("<Country> gold prices") and points at the real country page, not the
 * homepage, so the equity lands where we want it indexed.
 */
export function WidgetBuilder({ locale }: { locale: string }) {
  const ar = locale === "ar";
  const [slug, setSlug] = useState("saudi-arabia");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [copied, setCopied] = useState(false);

  const sorted = useMemo(
    () =>
      [...COUNTRIES].sort((a, b) =>
        ar
          ? a.name_ar.localeCompare(b.name_ar, "ar")
          : a.name_en.localeCompare(b.name_en),
      ),
    [ar],
  );

  const country = COUNTRIES.find((x) => x.slug === slug) ?? COUNTRIES[0];
  const prefix = locale === "en" ? "/en" : "";
  const cName = countryName(country, locale);

  const embedSrc = `${SITE}${prefix}/embed/ticker?country=${country.slug}&theme=${theme}`;
  const backlinkHref = `${SITE}${prefix}/${country.slug}/gold-price/21k`;
  const anchor = ar
    ? `أسعار الذهب في ${cName} — Gold Prices Arabia`
    : `${cName} gold prices — Gold Prices Arabia`;
  const iframeTitle = ar
    ? `سعر الذهب المباشر في ${cName}`
    : `Live gold price in ${cName}`;

  const code =
    `<iframe src="${embedSrc}" width="100%" height="140" frameborder="0" ` +
    `loading="lazy" title="${iframeTitle}" ` +
    `style="border:0;overflow:hidden;max-width:440px"></iframe>\n` +
    `<div style="max-width:440px;margin-top:4px;font:12px/1.4 sans-serif;` +
    `text-align:${ar ? "right" : "left"}">` +
    `<a href="${backlinkHref}" target="_blank" rel="noopener" ` +
    `style="color:#9a7209;text-decoration:none">${anchor}</a></div>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — the user can still select the textarea manually.
    }
  };

  const label = "text-xs font-semibold uppercase tracking-wider text-[var(--color-text-dim)]";
  const field =
    "mt-1.5 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] px-3 py-2 text-sm text-[var(--color-text)]";

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">
        {ar ? "أنشئ أداة سعر الذهب" : "Build your gold price widget"}
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        {ar
          ? "اختر الدولة والمظهر، ثم انسخ الكود والصقه في موقعك. مجاني، خفيف، ويُحدَّث تلقائيًا."
          : "Pick a country and theme, then copy the code into your site. Free, lightweight, auto-updating."}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <span className={label}>{ar ? "الدولة" : "Country"}</span>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={field}
          >
            {sorted.map((x) => (
              <option key={x.slug} value={x.slug}>
                {countryName(x, locale)} · {x.currency}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className={label}>{ar ? "المظهر" : "Theme"}</span>
          <div className="mt-1.5 flex gap-2">
            {(["light", "dark"] as const).map((tOpt) => (
              <button
                key={tOpt}
                type="button"
                onClick={() => setTheme(tOpt)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  theme === tOpt
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg-card-hover)] text-[var(--color-text-muted)]"
                }`}
              >
                {tOpt === "light"
                  ? ar
                    ? "فاتح"
                    : "Light"
                  : ar
                    ? "داكن"
                    : "Dark"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <span className={label}>{ar ? "معاينة حية" : "Live preview"}</span>
        <div className="mt-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-4">
          <iframe
            key={`${slug}-${theme}-${locale}`}
            src={embedSrc}
            width="100%"
            height={140}
            loading="lazy"
            title={iframeTitle}
            style={{ border: 0, overflow: "hidden", maxWidth: 440 }}
          />
          <div
            style={{
              maxWidth: 440,
              marginTop: 4,
              font: "12px/1.4 sans-serif",
              textAlign: ar ? "right" : "left",
            }}
          >
            <a
              href={backlinkHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#9a7209", textDecoration: "none" }}
            >
              {anchor}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <span className={label}>{ar ? "كود التضمين" : "Embed code"}</span>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-gold)] transition hover:bg-[var(--color-gold)]/20"
          >
            {copied
              ? ar
                ? "تم النسخ ✓"
                : "Copied ✓"
              : ar
                ? "نسخ الكود"
                : "Copy code"}
          </button>
        </div>
        <textarea
          readOnly
          value={code}
          onFocus={(e) => e.currentTarget.select()}
          rows={5}
          dir="ltr"
          className="mt-1.5 w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-3 font-mono text-[12px] leading-relaxed text-[var(--color-text)]"
        />
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
          {ar
            ? "الرابط أسفل الإطار رابط متابَع (dofollow) — يبقى خارج الـ iframe كي تنتقل قوة الرابط إلى موقعنا. لا تحذفه."
            : "The link under the frame is a dofollow backlink — it stays outside the iframe so link equity reaches us. Please keep it."}
        </p>
      </div>
    </section>
  );
}
