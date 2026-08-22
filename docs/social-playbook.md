# Instagram playbook — @goldpricearabia

Everything needed to run the account daily. The images are generated from the
live site, so a post can never disagree with the page it links to.

## 1. The generator

| Route | Size | Use |
|---|---|---|
| `/social/cover/post` | 1080×1080 | carousel slide 1 (cover) |
| `/social/{country}/post` | 1080×1080 | carousel slides 2-20 |
| `/social/cover/story`, `/social/{country}/story` | 1080×1920 | stories (safe-area aware) |

Params: `lang=ar|en|fr|tr|ur|hi`, `theme=0-6` (accent; defaults to a per-day
rotation so the profile grid becomes a colour mosaic), and on the cover
`countries=slug,slug,…`.

**Country card:** country as the hero, date with weekday, 24/22/21/18K **per
gram in local currency**, USD ounce with **daily change**, a **30-day
sparkline**, handle + domain. The change chip and the sparkline are what the
category leader's cards do not have.

**Cover:** today's date, the headline ounce price and move, **every market in
the carousel as a chip** (so a follower sees their country and swipes), four
feature chips (46 countries · all karats · 30-day chart · live), and a swipe
hint.

## 2. Daily routine (2 minutes)

```bash
node scripts/social-daily.mjs                # posts + stories
node scripts/social-daily.mjs --only posts   # carousel only
node scripts/social-daily.mjs --only stories # stories only
```

Output — one folder per kind per day:

```
social-out/
  posts/2026-08-22/     01-cover.png … 20-australia.png  + captions.txt
  stories/2026-08-22/   01-cover.png … 20-australia.png
```

Files are zero-padded so the folder **sorts in swipe order** — select all in the
Instagram uploader and the carousel comes out right. Instagram allows 20 slides:
1 cover + 19 markets.

The 19 markets (`lib/social-markets.ts`, mirrored in the script): Saudi Arabia,
UAE, Egypt, Jordan, Kuwait, Qatar, Bahrain, Lebanon, Morocco, Libya, Turkey,
India, Pakistan, Malaysia, USA, UK, Europe, Canada, Australia. Malaysia is in
because Search Console already shows it ranking for us (~190 impressions/28d at
position 9.1).

Options: `--countries saudi-arabia,uae` · `--lang en` · `--base http://localhost:3000`.

Cadence, mirroring what works in this niche (the Bahrain leader: 2,148 posts,
66.5K followers, one dated card a day for years):
- **1 carousel/day** — cover + 19 markets, posted ~09:00 local (souk opening).
- **1-2 stories/day** — the cover as a morning story, plus a country card when
  gold moves more than 1%.

## 3. Bio

Instagram gives you a 150-character bio, a searchable Name field, and one link.
Use all three.

**Name field** (this is what Instagram search matches — not the handle):
```
أسعار الذهب اليوم | Gold Prices Arabia
```

**Bio** (Arabic-first, benefit per line):
```
🟡 أسعار الذهب اليوم في الخليج ومصر والأردن
📊 عيار 24 و22 و21 و18 بالجرام — تحديث يومي
📉 أعلى وأدنى سعر + الرسم البياني لـ30 يوم
🔗 كل الدول والعملات على الموقع 👇
```

**Link:** `https://goldpricesarabia.com` — this is also what confirms the
`sameAs` relationship in the site's Organization schema (`lib/social.ts`).

**Category:** Product/service. **Contact:** the support email.

## 4. Highlights to create

- **الأسعار** — pin the daily cards.
- **عيار 21 / عيار 22** — the two karats people ask for most.
- **السجل** — screenshots of the year pages (`/historical-gold-prices/2024`),
  which are the site's strongest-ranking pages.
- **عن المنصة** — how prices are sourced (`/methodology`).

## 5. Caption template

```
أسعار الذهب اليوم في {الدولة} — {التاريخ}

الأسعار في الصورة لكل عيار بالجرام، محدثة من السوق العالمي.
التفاصيل الكاملة وكل العيارات والعملات: goldpricesarabia.com/{slug}/gold-price/21k

الرابط في البايو 🔗

#سعر_الذهب_اليوم #الذهب_في_{الدولة} #ذهب #عيار21
```

`scripts/social-daily.mjs` already writes this per market.

## 6. Rules

- Never post a price the site does not show — the images come from the same
  cached feed, so just don't hand-edit them.
- Keep the domain on every image; screenshots get reposted without credit.
- No trading advice or predictions — the site is a YMYL price reference and the
  disclaimer at `/about/disclaimer` is part of its credibility.
