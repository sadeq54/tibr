# Google Flow prompts

Backdrops for @goldpricearabia reels. Every clip is silent, text-free and
reusable — prices are drawn on top afterwards by `scripts/reel.mjs`.

| File | Video | Cards exist? |
|---|---|---|
| [01-daily-price.md](./01-daily-price.md) | Rotating gold bar | ✅ ready to post |
| [02-history-2020.md](./02-history-2020.md) | Then vs now | ❌ needs a card route |
| [03-karat-21-vs-18.md](./03-karat-21-vs-18.md) | Two karats | ❌ needs a card route |
| [04-country-vs-country.md](./04-country-vs-country.md) | Split screen | ❌ needs a card route |
| [05-investment-hindsight.md](./05-investment-hindsight.md) | Overhead still life | ❌ needs a card route |
| [06-hook-backdrop.md](./06-hook-backdrop.md) | Clear centre, for the hook | ✅ ready to post |

Only 01 and 06 can be posted today. The other four render a backdrop with
nothing on it, because no route draws their numbers yet.

## The three rules

**No text.** Flow never renders text, numbers or Arabic — it invents prices and
mangles Arabic letter joining. Every word on a finished reel is drawn by our own
code from live data.

**No voiceover.** `reel.mjs` discards Flow's audio. The sound has to be a
trending track picked in the Instagram app: sound-on views and audio reuse are
both documented ranking signals, and a generated soundtrack wastes them.

**No assets.** Every prompt here is text-to-video. Do not attach a reference
image — it fights the framing instructions.

## Where the clear space goes

01–05 keep the subject central and leave the **top** clear, for the carousel
cover whose text sits at the top. 06 leaves the **centre** clear, for the reel
hook whose text sits in the middle. Using 01–05 under the hook puts a specular
highlight straight behind the percentage.

## Settings

Veo 3.1 · Quality · 9:16 vertical · 8s · x1.
Quality costs 100 credits, Fast 20. Quality is worth it here: the whole frame is
soft focus and specular highlight, where compression artefacts show.

## Building a reel

```bash
node scripts/reel.mjs --clip "path/to/clip.mp4" --scrim 0.30 --blur 3
```

Same clip every day; the numbers come from the live site. Generate a new clip
only when you want a different look, not daily.

Output: `social-out/reels/YYYY-MM-DD/9-countries.mp4`
