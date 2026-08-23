# 05 · Five years ago

> **Hook:** «لو اشتريت ذهب بـ1000 دولار قبل 5 سنين…» — *If you'd bought $1,000 of gold five years ago…*
> **Cadence:** monthly, at most · **Length:** 8s · **Backdrop reuse:** quarterly

---

## 1 · Why this reel — and why it is rationed

Highest share potential in the set, and the highest risk. Read both halves
before using it.

**Why it works.** It converts an abstract price series into a number about *the
viewer's own money*. That is the difference between information people scroll
past and information people send to a friend. Resharing is a named prediction
in the Explore card, with *"the posts you've reshared previously and the authors
of those posts"* among its input signals.

**Why it is rationed to monthly.** This is regret content. Repeated weekly it
stops being a fact about gold and becomes a nudge to buy, and that is a line
this account must not cross:

- The site is a **YMYL price reference**, not an advisory service. `/about/disclaimer` exists for a reason.
- Instagram's Recommendations Guidelines exclude several categories of financial-adjacent promotion from recommendations. Hindsight-return content sits close enough to that boundary that frequency is itself a risk.
- Your credibility is your only real asset here. A price publisher that starts sounding like a gold salesman loses the thing that made it worth following.

Use it once a month. Never twice.

---

## 2 · On screen, second by second

| Time | Visual | Source |
|---|---|---|
| 0.0 – 1.0s | «1000$ قبل 5 سنين» — large, plain | text overlay |
| 1.0 – 3.5s | The grams that bought, at the 2021 price | `yearStats(hist, 2021)` |
| 3.5 – 6.0s | Same grams valued at today's price | live spot |
| 6.0 – 8.0s | «الأسعار التاريخية كاملة على الموقع» + the disclaimer line | text overlay |

**Show the grams, not just the two dollar figures.** "$1,000 became $X" is a
performance claim. "$1,000 bought Y grams; Y grams are worth $X today" is an
arithmetic fact about a metal price. Same number, completely different posture —
and the second one is defensible.

---

## 3 · Master prompt

```
Vertical macro cinematography looking straight down from directly overhead at a
small quantity of fine gold grain resting on rough black volcanic stone. Over
the duration the pile grows very gradually, grains accumulating from the edges
inward as if poured slowly from just outside the frame, the mound rising and
broadening in a natural conical shape. Camera is locked off in a true overhead
position and does not move at all. Shot on a 100mm macro lens at f/4, the top
surface of the mound sharp and the stone around it falling gently soft. Key
light is a broad soft warm source at 3400K from the upper left at a low grazing
angle, catching each individual grain as a distinct point of light, so the whole
mound glitters with hundreds of tiny specular highlights that shift as new
grains settle. Weak cool fill at 5600K from the lower right at one-tenth
intensity keeps the shadowed side of the mound readable. The volcanic stone is
matte, deeply textured, near-black, and absorbs light almost completely. Deep
vignette at the frame edges. Colour palette strictly limited to warm gold, amber
and near-black. Fine film grain, photorealistic, quiet, patient, editorial
still-life quality. The upper half of the vertical frame stays empty and dark
throughout for a text overlay. One continuous take, no cuts.
```

---

## 4 · Prompt, broken down

| Clause | Why it is there |
|---|---|
| `straight down from directly overhead` | Overhead is the most neutral angle available. A low hero angle would make the gold look aspirational — exactly the tone to avoid here. |
| `grain… accumulating from the edges inward` | Accumulation without any upward "growth chart" implication. Gold grain is a raw material, not a portfolio. |
| `poured slowly from just outside the frame` | Explains the motion physically so Veo does not invent a hand or a funnel. |
| `does not move at all` | This clip carries the most text of the five. Any camera motion under four lines of overlay is unreadable. |
| `low grazing angle… each individual grain as a distinct point of light` | Grazing light on a granular surface is what produces the glitter. Front light would render the mound as a flat yellow blob. |
| `rough black volcanic stone… absorbs light almost completely` | Maximum contrast against the gold, and the texture keeps the empty half of the frame from looking like a void. |
| `quiet, patient` | Tone words steer Veo away from the fast, glossy "wealth content" look this reel must not have. |

---

## 5 · Three variations

**A — The single bar**
```
Vertical macro looking straight down from directly overhead at one small gold
bar resting on rough black volcanic stone. The bar remains completely still. Over
the duration a broad soft warm 3400K light source drifts very slowly across the
frame from upper left to upper right, the specular highlight travelling the full
length of the bar and revealing the milled texture of its surface. Locked-off
overhead camera, no movement whatsoever, 100mm macro at f/4, weak cool fill at
one-tenth from lower right. Matte near-black volcanic stone, deep vignette, warm
gold and near-black palette only. Upper half of the vertical frame empty and
dark. Photorealistic, quiet, editorial still life. One continuous take.
```

**B — Weight in the hand's place**
```
Vertical macro looking straight down at a set of small gold weights arranged in
a neat row on rough black volcanic stone, largest to smallest, perfectly aligned.
Nothing moves. A broad soft warm 3400K key from the upper left drifts slowly to
directly overhead across the duration, the shadows beneath each weight shortening
smoothly as it moves. Locked-off overhead camera, 100mm macro at f/4, weak cool
fill from lower right. Matte near-black stone, deep vignette, gold and near-black
only. Upper half of the frame empty and dark. Photorealistic, precise, quiet.
One continuous take.
```

**C — Slow settle**
```
Vertical macro looking straight down at fine gold grain settling into a shallow
round depression in rough black volcanic stone. The grain arrives in the first
two seconds and then comes completely to rest, the surface smoothing out and
staying still for the remainder of the shot. Locked-off overhead camera, 100mm
macro at f/4, broad soft warm 3400K grazing light from upper left producing
hundreds of tiny glints across the grain, weak cool fill from lower right. Matte
near-black stone, deep vignette, warm gold and near-black. Upper half of the
vertical frame empty and dark. Photorealistic, calm. One continuous take.
```

**B is the most defensible.** Calibration weights read as *measurement* rather
than *wealth*, which is exactly the register this reel should sit in. Prefer it.

---

## 6 · Negative prompt

```
text, numbers, letters, Arabic script, currency symbols, dollar signs,
banknotes, cash, wallets, credit cards, safes, vaults, luxury cars, watches,
mansions, charts, graphs, upward arrows, rocket imagery, fire emoji styling,
percentage signs, people, hands, faces, celebration, confetti, fast motion,
snap zooms, dramatic lighting swells, lens flares, oversaturated yellow, plastic
gold, CGI shine, crypto-bro aesthetic, stock-footage wealth montage, cuts,
transitions
```

This is the longest negative prompt in the set, and every entry earns its place.
Veo has clearly seen a great deal of "investment content", and given a prompt
about money and gold it will drift toward banknotes, rockets and upward arrows
within one or two generations. Every one of those pushes this reel from *price
reference* toward *financial promotion* — the exact category that risks
recommendation eligibility.

---

## 7 · Caption

```
🟡 قبل 5 سنوات، 1000 دولار كانت تشتري {الجرامات} جرام ذهب عيار 24.
📊 اليوم نفس الكمية تساوي {القيمة_اليوم} دولار.

الأرقام من بيانات الأسعار التاريخية، من {تاريخ_البداية} إلى {تاريخ_اليوم}.

⚠️ هذا عرض لأسعار تاريخية فقط، وليس نصيحة استثمارية. أداء الماضي لا يضمن المستقبل.

🔗 كل سنة من 2015 حتى اليوم: goldpricesarabia.com

{tag block}
```

**The disclaimer line is mandatory on this reel and only this reel.** Include it
in the caption *and* on screen in the last two seconds. It costs two seconds of
a reel and protects the thing that makes the account worth anything.

Note there is no closing question here. Every other reel in the set asks for a
comment; this one deliberately does not. "Do you wish you'd bought?" is
manufactured regret, and inviting that conversation into your comments means
hosting it — including the replies asking whether they should buy now, which you
cannot answer.

---

## Do not

- Do not run this more than once a month
- Do not use estimated prices — pull both ends from `yearStats()`
- Do not omit the disclaimer, on screen or in the caption
- Do not ask a question that invites "should I buy now?"
- Do not answer "should I buy?" in the replies — point to the historical data and stop
- Do not pair this reel with any XM or broker link
- Do not let Flow generate banknotes, arrows, rockets or any wealth iconography
