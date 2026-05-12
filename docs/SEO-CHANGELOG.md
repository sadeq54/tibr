# SEO Changelog — Production Setup

Track of SEO-related additions to the codebase. Update this file when adding new pages, schema, or indexing infrastructure.

---

## 2026-05-12 — E-E-A-T Founder Author Page

### What

Added named founder/author page to unlock E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals for YMYL gating. Replaces previous anonymous "editorial team" framing with verifiable identity tied to LinkedIn profile.

### Why

Site is YMYL (Your Money or Your Life — financial commodity prices). Google caps rank for anonymous YMYL sites. Named author with verifiable credentials = unlocks +4 SEO points + top-10 ranking potential.

### Files added

| File | Purpose |
|------|---------|
| `app/[locale]/about/sadeq/page.tsx` | Author profile page (Arabic + English, photo, bio, LinkedIn) |
| `public/author/sadeq.jpeg` | Author photo (766×1024, used in `Person` schema `ImageObject`) |

### Files modified

| File | Change |
|------|--------|
| `components/JsonLd.tsx` | Added `Organization.founder` (Person), `foundingDate: 2026`. Replaced dead Twitter/Facebook/LinkedIn-company URLs in `sameAs` with verified personal LinkedIn |
| `components/Footer.tsx` | Added "Founder" link in editorial nav row |
| `components/Header.tsx` | Added missing 14K karat link to nav (was 24K/21K/18K only) |
| `app/[locale]/about/page.tsx` | Added link to `/about/sadeq` from about page nav |
| `app/sitemap.ts` | Added `/about/sadeq` (priority 0.6, monthly) — emitted for both `ar` + `en` via `dual()` helper |
| `messages/en.json` | Added `AuthorPage` namespace (title, role, 3 bio paragraphs, expertise bullets, connect labels). Updated `InfoPage.aboutTeamBody` to reference founder |
| `messages/ar.json` | Arabic mirror of `AuthorPage` keys and updated `InfoPage.aboutTeamBody` |

### JSON-LD emitted

**Per-page (every page via `JsonLd.tsx`):**
```json
{
  "@type": "Organization",
  "@id": "https://goldpricesarabia.com/#org",
  "founder": {
    "@type": "Person",
    "@id": "https://goldpricesarabia.com/#person-sadeq",
    "name": "Sadeq Sayed Ahmad",
    "jobTitle": "Founder & Lead Developer",
    "url": "https://goldpricesarabia.com/about/sadeq",
    "image": "https://goldpricesarabia.com/author/sadeq.jpeg",
    "sameAs": ["https://www.linkedin.com/in/sadeq-sayed-ahmad-309101233/"]
  },
  "foundingDate": "2026",
  "sameAs": ["https://www.linkedin.com/in/sadeq-sayed-ahmad-309101233/"]
}
```

**On `/about/sadeq` (additional `Person` schema with full details):**
```json
{
  "@type": "Person",
  "@id": "https://goldpricesarabia.com/#person-sadeq",
  "name": "Sadeq Sayed Ahmad",
  "alternateName": "صادق سيد أحمد",
  "jobTitle": "Founder & Lead Developer",
  "description": "...",
  "url": "https://goldpricesarabia.com/about/sadeq",
  "image": { "@type": "ImageObject", "url": "...", "width": 766, "height": 1024 },
  "sameAs": ["https://www.linkedin.com/in/sadeq-sayed-ahmad-309101233/"],
  "email": "support@goldpricesarabia.com",
  "worksFor": { "@id": "https://goldpricesarabia.com/#org" },
  "knowsAbout": ["Software engineering", "Next.js", "TypeScript", ...]
}
```

### Submission

- Added to `seo-priority-urls.md` (Day 7, priority 0.6)
- IndexNow push pending after deploy:
  ```powershell
  $body = @{ urls = @(
    "https://goldpricesarabia.com/about/sadeq",
    "https://goldpricesarabia.com/en/about/sadeq"
  ) } | ConvertTo-Json
  Invoke-RestMethod -Uri "https://goldpricesarabia.com/api/indexnow" -Method Post -Body $body -ContentType "application/json"
  ```
- GSC manual request indexing after deploy

### Verification

After deploy:
1. Visit `https://goldpricesarabia.com/about/sadeq` — page renders with photo + bio
2. View source → search for `"@type":"Person"` → confirm Person schema present
3. Test on https://search.google.com/test/rich-results → paste any page URL → expect detected: `Organization`, `Person` (founder), `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`
4. Confirm LinkedIn `<a rel="me">` link present on `/about/sadeq` — establishes identity verification

---

## 2026-05-12 — Sitemap addition: `/about/sadeq`

Added to `app/sitemap.ts`:

```ts
out.push(...dual("about/sadeq", "monthly", 0.6));
```

`dual()` helper emits both locale variants (`/about/sadeq` and `/en/about/sadeq`) so both Arabic + English versions appear in sitemap.xml.

Priority: **0.6** (higher than `/about` at 0.5 — founder page is stronger E-E-A-T signal).

Change frequency: **monthly** (bio content rarely changes).

After next build, sitemap.xml will include 2 new URLs (one per locale). Verify at `https://goldpricesarabia.com/sitemap.xml`.

---

## 2026-05-12 — Indexing infrastructure (initial setup)

### Search engine verification

| Engine | Status | Method |
|--------|--------|--------|
| Google Search Console | ✅ Verified | HTML tag via `NEXT_PUBLIC_GOOGLE_VERIFICATION` env (`Cz5TnFFjw4YX5VyZ5z1ZoboscWVHMhXAdryZyXoMfbw`) |
| Bing Webmaster Tools | ✅ Verified | Auto-imported from GSC |
| Yandex | ⏳ Not configured | Optional |

### Sitemaps submitted

- ✅ Google Search Console: `https://goldpricesarabia.com/sitemap.xml`
- ✅ Bing Webmaster Tools: `https://goldpricesarabia.com/sitemap.xml` (486 URLs discovered)

### IndexNow API (Bing + Yandex instant push)

- **Key**: `c9ccc8366a8143d36319ac6b62e6068c`
- **Env var**: `INDEXNOW_KEY` set in Netlify + `.env.local`
- **Public key file**: `public/c9ccc8366a8143d36319ac6b62e6068c.txt`
- **API route**: `/api/indexnow` (POST `{ urls: [...] }`)
- **First push**: 42 priority URLs (Bing returned 200 OK)

### DNS + hosting

- Domain: `goldpricesarabia.com` (Namecheap → Netlify DNS)
- Nameservers: `dns1-4.p08.nsone.net`
- SSL: Let's Encrypt, auto-renew (Aug 10)
- HTTPS forced
- Netlify site name: `tibers.netlify.app` (subdomain)
- TODO: `_redirects` file to 301 `tibers.netlify.app/*` → `goldpricesarabia.com/*` (prevent duplicate content)

---

## 2026-05-12 — Bug fixes: duplicate FAQPage + wrong host in JSON-LD

### Issue (from Google Rich Results test)

Two `FAQPage` entries detected on home page:
1. `@id: https://goldpricesarabia.com/#faq` (from layout-level `SiteJsonLd`)
2. `@id: https://tibers.netlify.app/#faq` (from page-level `MetaSection` reading `NEXT_PUBLIC_SITE_URL`)

Both flagged as "Duplicate field 'FAQPage'" errors.

### Root cause

- `app/[locale]/page.tsx` was reading `process.env.NEXT_PUBLIC_SITE_URL` for `siteUrl` prop. On Netlify build this picked up `tibers.netlify.app` instead of the hardcoded production domain.
- `JsonLd` component always emitted full schema set (Org + WebSite + Service + FAQ + WebPage + Breadcrumb + Products), so any page that also rendered `JsonLd` in addition to layout's `SiteJsonLd` got duplicates of global schemas.

### Fix

| Change | File |
|--------|------|
| Replaced `process.env.NEXT_PUBLIC_SITE_URL` with hardcoded `SITE_URL` import | `app/[locale]/page.tsx` |
| Added `pageOnly` prop to `JsonLd` — when `true`, skips Organization/WebSite/Service/FAQ. Still emits WebPage/Breadcrumb/Products/FinancialProduct | `components/JsonLd.tsx` |
| Set `pageOnly={true}` on all page-level callers | `app/[locale]/page.tsx`, `app/[locale]/gold-price/[karat]/page.tsx`, `app/[locale]/about/sadeq/page.tsx` |
| `app/[locale]/layout.tsx` (`SiteJsonLd`) keeps full schemas — emits globals once per page | unchanged |

Result: every page now emits each schema exactly once.

### Founder schema cleanup

- Removed Twitter / Facebook / company LinkedIn (dead URLs) from `Organization.sameAs`
- Added `Organization.founder` (Person) with personal LinkedIn in `Person.sameAs`
- `Organization.sameAs` now empty (no own social profiles yet — no fake URLs)
- Removed parent-org / Kormzi reference per user request

### Netlify production hostname redirect

Uncommented redirect block in `netlify.toml`:
```toml
[[redirects]]
  from = "https://tibers.netlify.app/*"
  to = "https://goldpricesarabia.com/:splat"
  status = 301
  force = true
```

Prevents subdomain from indexing as competing site.

---

## 2026-05-12 — Disclaimer page (`/about/disclaimer`)

### What

Added comprehensive YMYL disclaimer page with 9 sections covering:
1. Plain-language summary
2. Nature of the service
3. Not financial advice
4. Accuracy & timeliness
5. No liability
6. Affiliate disclosure
7. Third-party content
8. Jurisdiction & updates
9. Contact

Both Arabic and English versions. Original wording (not copied from any other site).

### Why

YMYL site (financial commodity prices) requires explicit legal disclaimer for:
- Liability protection (you not responsible for user trading losses)
- Google E-E-A-T transparency signal (+1 SEO trust point)
- Compliance with affiliate disclosure requirements
- GDPR / Saudi PDPL alignment (privacy reference)

### Files

| File | Action |
|------|--------|
| `app/[locale]/about/disclaimer/page.tsx` | ✅ NEW |
| `messages/en.json` | Added `DisclaimerPage` namespace (10 keys: title/description + 8 section bodies + contact) |
| `messages/ar.json` | Arabic mirror |
| `app/sitemap.ts` | Added `dual("about/disclaimer", "monthly", 0.5)` |
| `components/Footer.tsx` | Added "Disclaimer" link in bottom editorial nav |

### URLs added

- `https://goldpricesarabia.com/about/disclaimer` (Arabic)
- `https://goldpricesarabia.com/en/about/disclaimer` (English)

Both auto-listed in sitemap.xml at next deploy.

---

## Outstanding (from `sadeqblocker.md`)

1. **Rotate exposed API keys** — `GOLDAPI_KEY` and `NEWSDATA_KEY` (deferred by user)
2. **Delete `NEXT_PUBLIC_SITE_URL` from Netlify env** — now hardcoded in `lib/metadata.ts:7`
3. **AdSense placeholder fix** — replace `ca-pub-XXXXXXXXXXXXXXXX` with real client ID
4. **Add `_redirects`** — 301 subdomain → custom domain
5. Bing search engine verification via env var (`NEXT_PUBLIC_BING_VERIFICATION`) — currently using GSC import (no env needed)
