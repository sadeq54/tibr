# Instagram playbook — @goldpricearabia

Everything needed to run the account daily. The images are generated from the
live site, so a post can never disagree with the page it links to.

## 1. The generator

| Route | Size | Use |
|---|---|---|
| `/social/{country}/post?lang=ar` | 1080×1080 | feed post |
| `/social/{country}/story?lang=ar` | 1080×1920 | story (safe-area aware) |

Params: `lang=ar\|en\|fr\|tr\|ur\|hi`, `theme=0-6` (accent; defaults to a
per-day rotation so the profile grid becomes a colour mosaic).

Each card carries: the country as the hero, the date with weekday, 24/22/21/18K
**per gram in local currency**, the USD ounce with **daily change**, a **30-day
sparkline**, and the handle + domain. The change chip and the sparkline are the
two things the category leader's cards do not show.

Examples:
- `https://goldpricesarabia.com/social/saudi-arabia/post?lang=ar`
- `https://goldpricesarabia.com/social/uae/story?lang=ar`

## 2. Daily routine (2 minutes)

```bash
node scripts/social-daily.mjs --story
```

Writes `social-out/YYYY-MM-DD/{country}-post.png`, `-story.png` and
`captions.txt` (one ready-to-paste Arabic caption + hashtags per market).
Defaults to saudi-arabia, uae, egypt, jordan, kuwait, qatar, bahrain.

Options: `--countries saudi-arabia,uae` · `--lang en` · `--base http://localhost:3000`.

Suggested cadence, mirroring what works in this niche (the Bahrain leader has
2,148 posts / 66.5K followers — one dated card a day, for years):
- **1 feed post/day** — rotate the market, or post a carousel of all 7 Gulf+MENA cards.
- **1–2 stories/day** — morning price, and an evening one when the move is > 1%.
- Post at **09:00 local** (souk opening) and again if gold moves sharply.

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
