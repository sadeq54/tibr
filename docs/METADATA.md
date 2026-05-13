# Page Metadata — How It Works

This document explains how SEO metadata (title, description, canonical, hreflang, OpenGraph) is generated for every page in the `tibr/` Next.js App Router project.

Examples are taken from `app/[locale]/spot-gold/page.tsx` (static route) and `app/[locale]/precious-metals/[metal]/page.tsx` (dynamic route).

---

## 1. The Three Layers of Metadata

Metadata is composed from three sources that merge top-down:

| Layer | File | Scope | What It Sets |
|-------|------|-------|--------------|
| **Root layout** | `app/[locale]/layout.tsx` | Every page | `metadataBase`, default title template (`%s · Gold Prices Arabia`), description, keywords, icons, robots, Twitter, default OpenGraph (siteName, images, type), verification codes |
| **Shared helpers** | `lib/metadata.ts` | Any page that imports them | `buildAlternates()`, `buildOpenGraph()`, `canonicalPath()`, `buildBreadcrumb()` |
| **Per-page `generateMetadata`** | Each route's `page.tsx` | Single route | Page-specific title, description, canonical path, hreflang, OG URL |

Next.js merges per-page metadata **on top of** the root layout's `metadata` export, so each page only declares what changes.

---

## 2. The Root Layer (`app/[locale]/layout.tsx`)

The locale layout exports a static `metadata: Metadata` object that defines the defaults shared by every page:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),                          // resolves all relative URLs
  title: { default: TITLE_DEFAULT, template: "%s · Gold Prices Arabia" },
  description: DESCRIPTION,
  alternates: { ...buildAlternates("ar", "/"), types: { "application/rss+xml": [...] } },
  openGraph: { type: "website", siteName: SITE_NAME, images: [...], locale: "ar_AE", ... },
  twitter: { card: "summary_large_image", ... },
  robots: { index: true, follow: true, googleBot: { ... } },
  icons: { ... },
  verification: { google: env.GOOGLE_VERIFICATION, yandex: ..., other: { "msvalidate.01": ... } },
  // ...
};
```

Key points:

- **`metadataBase`** — hardcoded to `https://goldpricesarabia.com` (via `SITE_URL` in `lib/metadata.ts`). Forces canonicals + hreflang to point at production even on staging hosts.
- **`title.template`** — every per-page `title` is wrapped as `{page title} · Gold Prices Arabia`. Pass `title: { absolute: "..." }` from a page to skip the template.
- **Default OpenGraph** has `images`, `siteName`, `type`, `locale`. Per-page `openGraph` overrides only need to set the URL.

---

## 3. The Helper Layer (`lib/metadata.ts`)

Three pure functions build the locale-aware URL fields. All pages should use them so canonicals and hreflang stay consistent.

### `canonicalPath(locale, path)`

Builds the locale-prefixed path. The site uses next-intl's `localePrefix: "as-needed"` strategy — Arabic (the default locale) is served at the root, English is served under `/en`.

```ts
canonicalPath("ar", "/spot-gold")  // → "/spot-gold"
canonicalPath("en", "/spot-gold")  // → "/en/spot-gold"
canonicalPath("ar", "/")           // → "/"
canonicalPath("en", "/")           // → "/en"
```

### `buildAlternates(locale, path)`

Returns the `alternates` block for `Metadata`. Sets `canonical` for the current locale and emits hreflang entries for `ar`, `en`, and `x-default`.

```ts
buildAlternates("ar", "/spot-gold")
// {
//   canonical: "/spot-gold",
//   languages: {
//     ar: "/spot-gold",
//     en: "/en/spot-gold",
//     "x-default": "/spot-gold",
//   },
// }
```

`metadataBase` from the layout converts these relative paths into absolute `https://goldpricesarabia.com/...` URLs when Next.js renders the `<link rel="canonical">` and `<link rel="alternate" hreflang="...">` tags.

### `buildOpenGraph(locale, path)`

Returns only `{ url: canonicalPath(locale, path) }`. The rest of the OpenGraph block (siteName, images, type) is inherited from the layout. This keeps per-page overrides to a single line.

### `buildBreadcrumb(locale, homeLabel, crumbs)`

Used by `<JsonLd>` to emit a `BreadcrumbList` schema. Not part of the `Metadata` object — it feeds the JSON-LD component.

---

## 4. The Per-Page Layer — Static Route

`app/[locale]/spot-gold/page.tsx`:

```ts
import { getTranslations } from "next-intl/server";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SubPage" });
  return {
    title: t("spotGoldH1"),
    description: t("spotGoldIntro"),
    alternates: buildAlternates(locale, "/spot-gold"),
    openGraph: buildOpenGraph(locale, "/spot-gold"),
  };
}
```

What each line does:

1. **`params` is a Promise** — App Router (this Next version) passes route params as a Promise; you must `await` it. This is a breaking change from older Next versions.
2. **`getTranslations({ locale, namespace })`** — fetches the `SubPage` namespace from `messages/ar.json` or `messages/en.json` for the given locale. Returns a `t()` function bound to that namespace.
3. **`title: t("spotGoldH1")`** — translated H1 string. The layout's `title.template` will append `· Gold Prices Arabia`.
4. **`description: t("spotGoldIntro")`** — translated intro paragraph used as `<meta name="description">` and `og:description`.
5. **`alternates: buildAlternates(locale, "/spot-gold")`** — canonical + hreflang for this exact path.
6. **`openGraph: buildOpenGraph(locale, "/spot-gold")`** — overrides only `og:url`. siteName, images, etc. come from the layout.

The page-level `openGraph` and `alternates` objects are merged with the layout's — Next.js performs a shallow merge, so the layout's `openGraph.images` survives even though the page only sets `openGraph.url`.

---

## 5. The Per-Page Layer — Dynamic Route

`app/[locale]/precious-metals/[metal]/page.tsx`:

```ts
type MetalSlug = "gold" | "silver" | "platinum" | "palladium";

const METAL_MAP: Record<MetalSlug, { id: "XAU" | "XAG" | "XPT" | "XPD"; en: string; ar: string }> = {
  gold:      { id: "XAU", en: "Gold",      ar: "ذهب" },
  silver:    { id: "XAG", en: "Silver",    ar: "فضة" },
  platinum:  { id: "XPT", en: "Platinum",  ar: "بلاتين" },
  palladium: { id: "XPD", en: "Palladium", ar: "بالاديوم" },
};

export function generateStaticParams() {
  return Object.keys(METAL_MAP).map((metal) => ({ metal }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; metal: string }>;
}) {
  const { locale, metal } = await params;
  const m = METAL_MAP[metal as MetalSlug];
  if (!m) return {};
  const t = await getTranslations({ locale, namespace: "SubPage" });
  const name = locale === "ar" ? m.ar : m.en;
  return {
    title: t("metalH1", { metal: name }),
    description: t("metalIntro", { metal: name }),
    alternates: buildAlternates(locale, `/precious-metals/${metal}`),
    openGraph: buildOpenGraph(locale, `/precious-metals/${metal}`),
  };
}
```

The dynamic version adds four extra moves:

### 5.1. Whitelist the slugs (`METAL_MAP`)

`METAL_MAP` is the single source of truth for which slugs the route accepts. It maps:

- URL slug (`gold`) → external API id (`XAU`) + display names per locale.

The same map is used by `generateStaticParams`, `generateMetadata`, and the page component itself, so the slug list, API id, and translations stay in sync.

### 5.2. Pre-render every variant (`generateStaticParams`)

```ts
export function generateStaticParams() {
  return Object.keys(METAL_MAP).map((metal) => ({ metal }));
}
```

Tells Next.js to statically generate `/precious-metals/gold`, `/silver`, `/platinum`, `/palladium` at build time for both locales. Each combination calls `generateMetadata` once, so titles/descriptions are baked into the HTML — no client-side metadata.

### 5.3. Guard against invalid slugs

```ts
const m = METAL_MAP[metal as MetalSlug];
if (!m) return {};
```

If a request arrives for `/precious-metals/copper`, `generateMetadata` returns `{}` (the layout-level defaults still apply) and the page component itself calls `notFound()`. Returning `{}` instead of throwing keeps the 404 page from rendering broken metadata.

### 5.4. Inject slug-specific values into translations

```ts
const name = locale === "ar" ? m.ar : m.en;
title: t("metalH1", { metal: name }),
description: t("metalIntro", { metal: name }),
```

The translation strings contain ICU placeholders, e.g.:

```json
// messages/en.json
"SubPage": {
  "metalH1": "{metal} Price Today — Live Spot Quote",
  "metalIntro": "Track live {metal} prices..."
}
```

```json
// messages/ar.json
"SubPage": {
  "metalH1": "سعر {metal} اليوم — السعر الفوري المباشر",
  "metalIntro": "تابع أسعار {metal} المباشرة..."
}
```

`t("metalH1", { metal: name })` substitutes `{metal}` with the localized name from `METAL_MAP`, so Arabic pages get `سعر ذهب اليوم` and English pages get `Gold Price Today`.

### 5.5. Per-slug canonical + hreflang

```ts
alternates: buildAlternates(locale, `/precious-metals/${metal}`),
openGraph:  buildOpenGraph (locale, `/precious-metals/${metal}`),
```

The path is interpolated with the current slug, so each metal page emits its own canonical (`/precious-metals/silver`) and its own hreflang pair (`ar: /precious-metals/silver`, `en: /en/precious-metals/silver`).

---

## 6. End-to-End Example — What Ships in the HTML

For a request to `/en/precious-metals/silver`, the merged metadata produces approximately:

```html
<title>Silver Price Today — Live Spot Quote · Gold Prices Arabia</title>
<meta name="description" content="Track live Silver prices...">

<link rel="canonical"  href="https://goldpricesarabia.com/en/precious-metals/silver">
<link rel="alternate" hreflang="ar"        href="https://goldpricesarabia.com/precious-metals/silver">
<link rel="alternate" hreflang="en"        href="https://goldpricesarabia.com/en/precious-metals/silver">
<link rel="alternate" hreflang="x-default" href="https://goldpricesarabia.com/precious-metals/silver">

<meta property="og:type"        content="website">
<meta property="og:site_name"   content="Gold Prices Arabia">          <!-- from layout -->
<meta property="og:title"       content="Silver Price Today — ...">    <!-- from page -->
<meta property="og:description" content="Track live Silver prices...">  <!-- from page -->
<meta property="og:url"         content="https://goldpricesarabia.com/en/precious-metals/silver">
<meta property="og:image"       content="https://goldpricesarabia.com/opengraph-image">  <!-- from layout -->
<meta property="og:locale"      content="ar_AE">                       <!-- from layout -->
```

Three sources merged:
- Layout supplies the title **template**, default OG image, site name, robots, twitter, verification.
- `buildAlternates` / `buildOpenGraph` build the URL fields against `SITE_URL`.
- `generateMetadata` supplies the translated, slug-aware title and description.

---

## 7. Adding a New Page — Recipe

For any new public page:

1. **Import the helpers** at the top of `page.tsx`:
   ```ts
   import { getTranslations } from "next-intl/server";
   import { buildAlternates, buildOpenGraph } from "@/lib/metadata";
   ```

2. **Export an async `generateMetadata`** that awaits `params`, loads the `SubPage` (or page-specific) namespace, and returns title, description, alternates, openGraph.

3. **Use the actual URL path** as the second arg to `buildAlternates` / `buildOpenGraph` — locale prefix is added by the helper.

4. **For dynamic routes**, add a slug→data map (like `METAL_MAP`), `generateStaticParams`, and an `if (!record) return {}` guard.

5. **Add the new path to `app/sitemap.ts`** using the `dual()` helper so both `ar` and `en` URLs appear in the sitemap. Also add it to `seo-priority-urls.md` (see `tibr/CLAUDE.md`).

Do **not** hardcode `og:url`, canonical, or hreflang — always go through the helpers so a future change to the locale strategy or domain only touches `lib/metadata.ts`.

---

## 8. Related Files

| File | Role |
|------|------|
| `lib/metadata.ts` | `SITE_URL`, `canonicalPath`, `buildAlternates`, `buildOpenGraph`, `buildBreadcrumb` |
| `app/[locale]/layout.tsx` | Root `Metadata` export — defaults for every page |
| `app/sitemap.ts` | Emits both-locale URLs via `dual()` helper |
| `components/JsonLd.tsx` | Structured data (Organization, WebSite, BreadcrumbList, etc.) — independent of `Metadata` |
| `messages/ar.json`, `messages/en.json` | Translation strings consumed by `getTranslations` |
| `i18n/routing.ts` | next-intl routing config (`localePrefix: "as-needed"`) |
