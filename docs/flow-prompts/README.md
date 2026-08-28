# Google Flow prompts

Backdrops for @goldpricearabia reels. Every prompt renders a silent, text-free
vertical clip. Prices are overlaid afterwards from `social-out/stories/`.

| File | Clip |
|---|---|
| [01-daily-price.md](./01-daily-price.md) | Rotating gold bar |
| [02-history-2020.md](./02-history-2020.md) | Then and now |
| [03-karat-21-vs-18.md](./03-karat-21-vs-18.md) | Two karats side by side |
| [04-country-vs-country.md](./04-country-vs-country.md) | Symmetrical split |
| [05-investment-hindsight.md](./05-investment-hindsight.md) | Overhead still life |
| [06-hook-backdrop.md](./06-hook-backdrop.md) | Clear centre — for the reel hook frame |

Clips 01–05 keep their subject in the middle and leave the **top** clear, which
suits the carousel cover. The reel's opening frame sets its text in the
**centre**, so it needs 06: objects pushed to the top and bottom edges and the
middle forty percent left as unlit fabric. Using 01–05 under the hook puts a
specular highlight straight behind the percentage.

**Settings:** Veo 3.1 · 9:16 vertical · 8s · highest resolution · mute the export.

**Never** let Flow render text, numbers or Arabic — it invents prices and mangles
Arabic letter joining.

Once a clip is downloaded, build the reel:

```bash
node scripts/reel.mjs --clip "path/to/clip.mp4" --country saudi-arabia
```

It crops to 9:16, blurs and darkens the backdrop, lays today's live card over it
and strips Flow's audio. Output: `social-out/reels/YYYY-MM-DD/<country>.mp4`.
