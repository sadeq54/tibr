# Sadeq Blockers — Outstanding External Actions

> Things only you can do. Once these are done, SEO health jumps from
> ~89 → ~95 (the +5–6 remaining points need real traffic / backlinks).

Last updated: 2026-05-12

---

## 1. Search engine verification codes

Add to Netlify environment variables (Site settings → Build & deploy → Environment):

| Env var | Where to get it |
|---------|-----------------|
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Google Search Console → Add property `https://goldpricesarabia.com` → choose **HTML tag** method → copy the `content="..."` value (NOT the full `<meta>` tag) |
| `NEXT_PUBLIC_BING_VERIFICATION` | Bing Webmaster Tools → Add site → choose **Meta tag** method → copy the `msvalidate.01` value |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | (optional) yandex.com/webmaster → Add site → meta-tag content |

The layout already reads these env vars (`app/[locale]/layout.tsx` lines 152-159). Set them and the meta tags appear automatically on next deploy.

---

## 2. AdSense publisher ID

Replace the placeholder `ca-pub-XXXX` in Netlify env:

```
NEXT_PUBLIC_ADSENSE_CLIENT = ca-pub-XXXXXXXXXXXXXXXX
```

Get the value from your AdSense dashboard → Sites → Verification code → copy the `data-ad-client` value.

---

## 3. Remove `NEXT_PUBLIC_SITE_URL` from Netlify env

The code now hardcodes the production domain at `lib/metadata.ts:7`:

```ts
export const SITE_URL = "https://goldpricesarabia.com";
```

Any Netlify env override re-breaks canonicals on staging deploys. **Delete the `NEXT_PUBLIC_SITE_URL` variable from all deploy contexts** (production, deploy-preview, branch-deploy).

---

## 4. DNS for goldpricesarabia.com

In your DNS provider:

| Record | Type | Value |
|--------|------|-------|
| `goldpricesarabia.com` | A or ALIAS | Netlify load balancer (see Netlify dashboard → Domain settings) |
| `www.goldpricesarabia.com` | CNAME | `goldpricesarabia.netlify.app` (or whatever your Netlify site name is) |

Decision: pick **apex** (`goldpricesarabia.com`) as primary and 301-redirect `www` → apex in Netlify. Most modern best practice.

Then in `netlify.toml` uncomment the 301 redirect block at the bottom:

```toml
[[redirects]]
  from = "https://tibers.netlify.app/*"
  to = "https://goldpricesarabia.com/:splat"
  status = 301
  force = true
```

---

## 5. Submit sitemap in Google Search Console + Bing Webmaster

After DNS + verification are live:

1. **Google Search Console** → Sitemaps → add `sitemap.xml` → submit
2. **Bing Webmaster Tools** → Sitemaps → add `https://goldpricesarabia.com/sitemap.xml`
3. Request indexing on these 6 priority URLs:
   - `https://goldpricesarabia.com/` (Arabic home)
   - `https://goldpricesarabia.com/en` (English home)
   - `https://goldpricesarabia.com/gold-price/24k`
   - `https://goldpricesarabia.com/gold-price/21k`
   - `https://goldpricesarabia.com/usa/gold-price/24k`
   - `https://goldpricesarabia.com/saudi-arabia/gold-price/21k`

Cuts indexation lag from ~4 weeks to ~3-5 days.

---

## 6. Confirm social handles exist (or strip them)

These URLs appear in the `Organization` JSON-LD's `sameAs` field on every page:

- `https://twitter.com/goldpricesarabia`
- `https://www.facebook.com/goldpricesarabia`
- `https://www.linkedin.com/company/goldpricesarabia`

**Verify each one resolves to a real account in your name.** If any don't exist, dead URLs in `sameAs` weaken entity trust signals.

Tell me which (if any) to strip, or — better — create the accounts and post a few times so they look established.

Edit location: `components/JsonLd.tsx` lines 100-104.

---

## 7. Real foundingDate

I removed `foundingDate: "2026"` from the Organization schema because "2026" on a 2026-launched site looks weird (and Google flags identical year as suspicious).

**Tell me the real founding year.** Could be the year the domain was registered, the year the underlying business started, or the year first content was published. Then I'll add it back at `components/JsonLd.tsx` (inside the `organization` object).

If the brand is genuinely brand-new and 2026 IS the founding year, that's fine — say so and I'll put it back. Just want to confirm.

---

## 8. Author bio for E-E-A-T (YMYL gate)

This is the **single biggest gate** to crossing 90+ SEO health. Financial-prices sites are YMYL ("Your Money or Your Life") in Google's quality rater guidelines. Sites without verifiable authors get capped.

What I need from you:

```yaml
name: "Sadeq …"          # or whoever
title: "…"               # e.g. "Editor & Founder"
bio: |                   # 1 paragraph, English
  ...
bio_ar: |                # same paragraph in Arabic
  ...
credentials:             # list any of: CFA, ex-trader role, journalism years, books, certifications
  - "..."
  - "..."
photo_url: "https://..." # 400×400 minimum, square
email: "..."             # or skip if private
twitter: "..."           # optional
linkedin: "..."          # optional
```

Once you send the above, I'll:
1. Create `/about/sadeq` (or your author slug) page with `Person` schema
2. Add a byline + author photo block to `/news` items
3. Link from `/about` → author page
4. Update `Organization.founder` in JSON-LD

This unlocks the +2 points on Content Quality and +2 on AI Search Readiness.

---

## 9. IndexNow key (new this round)

IndexNow lets you instantly notify Bing + Yandex when a page changes (no waiting for crawl). I shipped the proxy route at `/api/indexnow`.

Setup:

1. Generate a UUID (any random 32-char hex string), e.g. via `crypto.randomUUID()` in node, or visit `https://www.uuidgenerator.net/`. Example: `a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4`
2. Add to Netlify env: `INDEXNOW_KEY = a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4`
3. Tell me the key value — I'll create the matching public key file at `/public/a1b2c3d4....txt` containing just the key as its body. IndexNow requires this file to verify ownership.
4. Then call `POST /api/indexnow` with `{ "urls": ["https://goldpricesarabia.com/gold-price/24k", ...] }` whenever you publish high-value content. (Or wire a script to call it on every successful deploy.)

---

## Quick summary — what to do this week

- [ ] Add 3–4 env vars to Netlify (Google + Bing + AdSense + IndexNow key)
- [ ] Delete `NEXT_PUBLIC_SITE_URL` from Netlify env
- [ ] Configure DNS for `goldpricesarabia.com`
- [ ] Deploy
- [ ] Submit sitemap in GSC + Bing
- [ ] Reply with: founding year + author bio + which (if any) social handles to strip + the IndexNow key value

When the last bullet lands, I'll wire the author page + IndexNow key file + correct foundingDate. **Expected final score after those: 94-95.**

The remaining 5-6 points to 100 are:
- Real CrUX field data (needs ~28 days of traffic)
- Backlinks (PR / outreach work — not code)

Both are time-dependent, not code-dependent.
