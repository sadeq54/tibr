# Google Flow prompts for @goldpricearabia reels

Five reel concepts, one file each, written to be pasted straight into
[Google Flow](https://labs.google/fx/tools/flow). Every prompt produces a
**silent, text-free 6–8 second vertical backdrop**. Your own generated card
supplies the numbers on top.

| File | Hook | Cadence |
|---|---|---|
| [01-daily-price.md](./01-daily-price.md) | "Gold price today in {country}" | daily |
| [02-history-2020.md](./02-history-2020.md) | "What did gold cost in 2020 vs today?" | weekly |
| [03-karat-21-vs-18.md](./03-karat-21-vs-18.md) | "21K or 18K — which should you buy?" | weekly |
| [04-country-vs-country.md](./04-country-vs-country.md) | "Same gram, two prices" | 2× week |
| [05-investment-hindsight.md](./05-investment-hindsight.md) | "$1,000 of gold five years ago" | monthly |

---

## The one rule that matters

**Flow never renders a number, a word, or an Arabic character.**

Flow makes the background move. Every price, every karat label, every Arabic
word comes from `/social/{country}/story` — the same route that renders the
carousel cards. Two reasons, and both are hard constraints:

1. **Accuracy.** A video model will invent a plausible-looking gold price. Your
   entire product is that the number is correct.
2. **Arabic shaping.** Generative models mangle Arabic letter joining and
   diacritics. We spent real effort getting `lib/og-social.tsx` to space Arabic
   correctly per final letter; an AI-rendered caption throws that away and looks
   obviously wrong to a native reader.

Every prompt in these files therefore ends with `no text, no numbers, no logos,
no watermarks, no people`.

---

## Which model to pick in Flow

From Google's own description of the models available in Flow:

| Model | What Google says it does | Use it for |
|---|---|---|
| **Veo 3.1** | "expanded creative controls, native audio… excels in physics, realism and prompt adherence" | **Default.** All five backdrops. |
| **Gemini Omni** | "Create and edit videos from any input reference — real or generated" | Feeding your own card in as a reference for consistent styling |
| **Nano Banana** | "image generation and precise editing… subject consistency" | Still frames — a thumbnail or a cover still |

Google notes that "features may vary by Google AI subscription tier, platform
(web vs. mobile), and region", so not every control below will be present on
every account. Where a control is missing, put the instruction into the prompt
text instead — Veo 3.1 responds well to written camera and lighting direction.

---

## Standard settings for every clip

```
Aspect ratio     9:16 vertical
Duration         6–8 seconds
Audio            generate none, or mute on export
Style            photoreal / cinematic
Resolution       highest your tier offers (1080×1920 target)
```

**Audio:** Veo 3.1 generates native audio, but you do not want it. The reel's
sound must be the trending Instagram track you pick in the app — sound-on views
and audio reuse are both documented ranking signals, and a competing generated
soundtrack wastes them. Mute the Flow export.

---

## How a reel gets made, end to end

1. **Generate today's card**
   ```bash
   node scripts/social-daily.mjs --only stories
   ```
   Take `social-out/stories/YYYY-MM-DD/02-saudi-arabia.png` (1080×1920).

2. **Generate the backdrop in Flow** — paste the prompt from the relevant file.
   Render 2–3 takes and keep the steadiest one. Backdrops are reusable: one
   render serves a week of daily reels, so this step is not daily work.

3. **Composite** — card over backdrop, in any editor (CapCut, InShot, Premiere):
   - `0.0 – 1.0s` price block only, filling the frame, backdrop barely visible
   - `1.0 – 6.0s` full card at ~85% scale over the moving backdrop
   - `6.0 – 8.0s` closing question, backdrop continues

4. **Publish in the Instagram app** — Reel → pick a **trending** audio (the
   rising arrow beside the track) → share.

5. **Tick the AI label.** Instagram's composer states: *"We require you to
   label certain realistic content that's made with AI."* The backdrop is
   AI-generated and photoreal, so label it. On an account already under AdSense
   review this is not worth gambling.

---

## Why these five, and not five others

Three of the five are grounded in demand you can already measure:

- **02 (2020 vs today)** — the site's year pages rank page one on Google for
  exactly this question. Proven demand, different platform.
- **03 (21K vs 18K)** — 18K sits at position 23 in Search Console. Real
  impressions you are not converting.
- **04 (country vs country)** — 46 markets is the one thing no single-country
  competitor can copy.

**01** is the daily baseline. **05** is the share-bait, used sparingly.

---

## Reading a prompt file

Each file has the same seven sections:

1. **Why this reel** — the demand evidence
2. **On screen, second by second** — what the viewer sees
3. **Master prompt** — the copy-paste block
4. **Prompt, broken down** — every clause and why it is there, so you can edit
5. **Three variations** — for rotation, so the grid does not repeat
6. **Negative prompt** — what to exclude
7. **Caption** — Arabic caption skeleton

---

## Do not

- Do not let Flow write text of any kind
- Do not use generated audio
- Do not show people, hands, or faces — they add nothing and invite uncanny artefacts
- Do not imply a price forecast; the site is a price reference, not advice
- Do not put XM or any broker promotion in a reel
- Do not post the same backdrop two days running without changing the accent
