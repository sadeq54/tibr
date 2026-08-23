# 02 · Then and now

> **Hook:** «كم كان سعر الذهب في 2020؟ وكم صار اليوم؟» — *What did gold cost in 2020? And today?*
> **Cadence:** weekly · **Length:** 8s · **Backdrop reuse:** monthly

---

## 1 · Why this reel

This is the strongest evidence-backed concept in the set, and it comes from your
own data, not a guess.

Search Console shows the site ranks **page one on Google** for historical-year
queries — roughly 2,150 impressions across 28 days on questions like
«كم كان سعر الذهب في 2024». It does *not* rank for country "today" queries.
People are already asking you this exact question on another platform.

Instagram is a different surface with the same human curiosity. The comparison
also does something the daily reel cannot: it gives a reason to **watch to the
end**, because the payoff is the second number.

Pull the figures from `lib/year-stats.ts` — `yearStats(hist, 2020)` returns real
open, close, high, low and average. Never estimate.

---

## 2 · On screen, second by second

| Time | Visual | Source |
|---|---|---|
| 0.0 – 1.0s | «2020» huge, and the 2020 ounce price beneath it | year data |
| 1.0 – 3.5s | Price holds. Backdrop begins to build. | — |
| 3.5 – 6.0s | Cut to «2026» and today's price, same position, same type size | live spot |
| 6.0 – 8.0s | The percentage change, then «الرسم البياني كامل على الموقع» | computed |

**Keep both numbers in identical positions and identical size.** The whole
effect is the second number replacing the first in place. If they move or
resize, the comparison reads as two unrelated facts.

---

## 3 · Master prompt

```
Vertical macro cinematography of gold coins stacking upward one at a time on a
dark polished slate surface. The stack begins as two coins and grows steadily to
roughly twelve over the duration, each new coin settling with a small realistic
physical bounce and coming to rest. Camera is locked on a tripod and pulls back
very slowly, about fifteen percent over the whole shot, so the growing stack
stays the same apparent height in frame while more of the dark surface is
revealed around it. Shot on an 85mm lens at f/2.8, shallow depth of field, the
front of the stack sharp and the background falling into darkness. Key light is
a warm tungsten source at 3200K from camera left at a low raking angle, each new
coin catching a bright specular edge as it lands. Weak cool fill at 5600K from
camera right at one-eighth intensity. The polished slate produces a soft
reflection of the stack beneath it. Deep vignette, near-black unlit background,
colour palette limited to warm gold, amber and charcoal. Fine film grain,
photorealistic, unhurried, editorial. The upper half of the vertical frame stays
empty and dark throughout for a text overlay. No cuts, one continuous take.
```

---

## 4 · Prompt, broken down

| Clause | Why it is there |
|---|---|
| `stacking upward one at a time` | The visual metaphor *is* the content: accumulation over time. It carries meaning even with the sound off. |
| `two coins… grows to roughly twelve` | A count gives Veo a rate. Without it the stack either barely changes or explodes. |
| `small realistic physical bounce` | Veo 3.1 is described as excelling "in physics" — asking for physical settling is playing to the model's strength, and it is what makes the shot read as filmed rather than rendered. |
| `pulls back… stack stays the same apparent height` | Keeps the composition stable under your overlay while still giving the eye movement. |
| `polished slate produces a soft reflection` | A reflection adds depth cheaply and hides the empty background. |
| `upper half… empty and dark` | Reserved for the year and the price. Larger reserve than reel 01 because this one carries two lines. |
| `No cuts, one continuous take` | Veo will invent cuts if not told otherwise, and a cut mid-clip breaks your timed overlay. |

---

## 5 · Three variations

**A — Sand through the hourglass**
```
Vertical macro of fine gold-coloured sand falling in a thin steady stream from
above into a small conical pile on dark slate, the pile growing slowly and
evenly through the shot. Locked-off tripod camera, very slow fifteen percent
pull-back, 85mm at f/2.8. Warm 3200K key from camera left catching each falling
grain as a tiny point of light, cool fill at one-eighth from the right. Deep
vignette, near-black background, gold and charcoal palette only. Upper half of
the vertical frame empty and dark. Photorealistic, calm, editorial. One
continuous take, no cuts.
```

**B — The widening pool**
```
Vertical macro looking straight down at molten gold spreading very slowly across
dark stone, the pool widening from a small circle outward through the shot, its
surface rippling gently with heat. Locked-off overhead camera, no movement.
100mm macro at f/4, warm 3200K light from the upper left producing a moving
liquid highlight across the surface. Deep vignette, near-black surround,
strictly gold amber and charcoal. Upper half of the frame empty and dark.
Photorealistic, slow, premium. One continuous take.
```

**C — Two bars, one lit**
```
Vertical macro of two identical gold bars lying side by side on dark charcoal
fabric, the left bar in deep shadow and the right bar lit. Over the duration the
warm 3200K key light travels slowly from right to left across the frame so the
left bar gradually comes into full light while the right falls into shadow.
Locked-off tripod, 100mm macro at f/2.8, cool fill at one-eighth. Deep vignette,
near-black background, gold and charcoal only. Upper half of the vertical frame
empty and dark. Photorealistic, deliberate, editorial. One continuous take.
```

Variation **C** is the strongest match for the concept — the light physically
moving from one bar to the other *is* "then and now". Use it as the default and
keep A and B for rotation.

---

## 6 · Negative prompt

```
text, numbers, letters, Arabic script, dates, years, captions, watermarks,
logos, people, hands, faces, clocks, calendars, hourglass props, charts, graphs,
arrows, upward-trending line graphics, currency symbols, fast motion, time-lapse
flicker, cuts, transitions, zoom bursts, lens flares, oversaturated yellow,
plastic gold, CGI look, stock footage feel, visible studio equipment
```

Note the extra exclusions: **clocks, calendars and hourglass props**. Veo reads
"time passing" and reaches for the literal object. You want the metaphor
carried by accumulation, not by a prop.

---

## 7 · Caption

```
🟡 في 2020 كان سعر أونصة الذهب {السعر_2020} دولار
📈 اليوم: {السعر_اليوم} دولار — بفارق {النسبة}%

الرسم البياني الكامل لكل سنة من 2015 حتى اليوم على الموقع 👇
🔗 goldpricesarabia.com

💬 تتوقع وين يوصل السنة الجاية؟

{tag block}
```

**One caution on the closing question.** «تتوقع وين يوصل» invites forecasting,
and the site is a price reference, not investment advice. Asking the audience
their opinion is fine; never answer with your own prediction, in the caption or
in the replies. Keep the reply to "the historical range is on the site".

---

## Do not

- Do not use an estimated 2020 price — pull it from `yearStats()`
- Do not animate a rising line chart; it reads as a forecast
- Do not show a clock, calendar or hourglass
- Do not let the two numbers change position or size between halves
