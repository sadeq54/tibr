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

## 3. Profile assets

```bash
node scripts/brand-assets.mjs      # only when the brand changes
```

| File | Size | Use |
|---|---|---|
| `public/brand/instagram-avatar.png` | 1080×1080 | profile picture |
| `public/brand/highlight-prices.png` | 1080×1920 | highlight cover — **أسعار اليوم** |
| `public/brand/highlight-countries.png` | 1080×1920 | highlight cover — **الدول** |
| `public/brand/highlight-karats.png` | 1080×1920 | highlight cover — **العيارات** |
| `public/brand/highlight-chart.png` | 1080×1920 | highlight cover — **الرسم البياني** |
| `public/brand/highlight-change.png` | 1080×1920 | highlight cover — **التغير اليومي** |

The avatar is **`public/appIcone.png`** — the site's own PWA icon and favicon —
cropped to its artwork and squared into `public/brand/mark.png`. Nothing is
recoloured or redrawn.

This is the rule, not a detail: the brand already has a small-size identity, and
the Instagram avatar has to be the *same image* people see on the browser tab
and their home screen. Anything else, however close, splits the identity in two.
The wordmark cannot serve here either — Instagram draws the profile picture at
32 px in the feed, where "GOLD PRICES ARABIA" is an unreadable grey smear.

No ring or badge around it: the mark is already a circle, and a second one reads
as a badge rather than a logo.

Highlight covers carry an icon only: Instagram prints the highlight's name
underneath the circle, so Arabic inside the circle just repeats it smaller.

## 4. Bio

Instagram gives three separate fields. Only two of them are searchable, and the
bio is not one of them — **Instagram search matches the username and the Name
field, never the bio text**. That makes the Name field the most valuable 30
characters on the account.

**Name field** (30-character limit — this is the searchable one):
```
أسعار الذهب اليوم | 46 دولة
```
27 characters. It leads with the highest-volume query in the niche and follows
with the one thing no competitor in this space has: every market, not one. The
brand lives in the handle, `@goldpricearabia`, so it does not need to be here.

**Bio** (150-character limit, 120 used):
```
🌍 أسعار الذهب اليوم في 46 دولة
💰 عيار 24 · 22 · 21 · 18 بالجرام
📊 التغير اليومي + رسم بياني 30 يوم
🔗 goldpricesarabia.com
```

**Link:** `https://goldpricesarabia.com` — this is also what confirms the
`sameAs` relationship in the site's Organization schema (`lib/social.ts`).

**The link field can only be set from the phone.** On web the Website input is
served `disabled` and the form explains why: *"Editing your links is only
available on mobile."* Until someone opens the app and fills it in,
`external_url` stays null and the profile has no tappable link — which is why
the last bio line spells the domain out as text. Text in the bio is not
clickable, so this is a stopgap, not the fix.

Check it from the console on the profile page:

```js
fetch('/api/v1/users/web_profile_info/?username=goldpricearabia',
  { headers: { 'x-ig-app-id': '936619743392459' } })
  .then(r => r.json()).then(d => d.data.user.external_url)
```

**Category:** Product/service. **Account type:** Business, so Insights are
available — without them there is no way to tell whether any of this works.

## 5. Caption and hashtags

`scripts/social-daily.mjs` writes `captions.txt` next to the day's images:
the caption first, then per-slide alt text in swipe order. Both come from
`/social/data`, which reads the same cached prices the cards are rendered from,
so the caption can never quote a number its own carousel contradicts.

The caption is ordered by what survives truncation — Instagram hides everything
after roughly 125 characters behind "… more":

1. **the move** — "gold is up 0.30%", not a date. A date is not a reason to tap.
2. date + what the post contains, worded the way people search.
3. **per-gram prices as text** for the day's lead markets. This matters more
   than any hashtag: Instagram search reads caption text, so writing
   "سعر الذهب اليوم في السعودية" in prose beats tagging it. It also makes the
   post useful to someone who never swipes.
4. the remaining markets, so a follower spots their country and swipes.
5. one question, to earn comments.
6. the link, then the tag block.

**Hashtags** (`lib/social-tags.ts`) rotate on a day index:

- Four core tags plus one rotating spelling variant. Instagram does not fold the
  hamza or the underscore — `#أسعار_الذهب`, `#اسعار_الذهب` and `#اسعارالذهب`
  are three separate feeds, all in use.
- The three anchor markets (Saudi, UAE, Egypt) always ship their lead tag,
  because the caption always quotes their prices.
- Four rotating focus markets contribute three tags each, walking the full
  19-market list in five days.
- Then region, karat, buyer-community and English tags, each rotating.

Result: 23–28 tags a day, never the same block twice, every market covered
inside a week. Posting one identical 29-tag block every day — which is what this
replaced — is the clearest automated-account signal Instagram has.

Local-language tags where the market is local-language: `#altınfiyatları`,
`#hargaemas`, `#sonachandi`. The `#gold_india` style tags these replaced had
almost no posts behind them.

**Do not over-invest here.** Hashtags are a minor reach lever on Instagram now.
Consistency, the Name field, caption keywords and comments do more.

## 6. Rules

- Never post a price the site does not show — the images and the caption come
  from the same cached feed, so just don't hand-edit either.
- Keep the domain on every image; screenshots get reposted without credit.
- No trading advice or predictions — the site is a YMYL price reference and the
  disclaimer at `/about/disclaimer` is part of its credibility.
- Reply to every comment naming a country with that country's price. It is the
  cheapest engagement this account will ever get, and the caption asks for it.
