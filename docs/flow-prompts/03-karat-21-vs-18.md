# 03 · 21K or 18K

> **Hook:** «عيار 21 ولا عيار 18؟ الفرق بالسعر والنقاوة» — *21K or 18K? The difference in price and purity*
> **Cadence:** weekly · **Length:** 8s · **Backdrop reuse:** monthly

---

## 1 · Why this reel

Search Console shows **18K sitting at position 23** with around 366 impressions
per 28 days. That is real, measurable demand arriving at page three — people
are asking and you are not being found.

The concept also targets a documented mechanic. Comparisons provoke opinions,
opinions become comments, and *comment predictions appear in three separate
system cards* — Feed, Explore and Reels chaining. A reel that ends in a genuine
either/or question is engineered for the one signal all three surfaces share.

Purity figures come from `karatPurity()` in `lib/karat-label.ts`:

| Karat | Purity |
|---|---|
| 24K | 99.9% |
| 22K | 91.7% |
| 21K | 87.5% |
| 18K | 75% |

---

## 2 · On screen, second by second

| Time | Visual | Source |
|---|---|---|
| 0.0 – 1.0s | «21 ولا 18؟» — the question, large, nothing else | text overlay |
| 1.0 – 4.0s | Left: 21K price + 87.5%. Right: 18K price + 75%. Split screen. | your card data |
| 4.0 – 6.5s | The difference per gram, in the local currency | computed |
| 6.5 – 8.0s | «إنت أي عيار تشتري؟» — *Which karat do you buy?* | text overlay |

The split must be **exactly symmetrical** — same type size, same vertical
position, same colour. Any visual favouritism turns a question into an
argument, and you want the argument in the comments, not on the screen.

---

## 3 · Master prompt

```
Vertical macro cinematography of two gold rings resting side by side on dark
charcoal velvet, separated by a narrow gap running down the centre of the frame.
The ring on the left is a deeper, richer, more saturated yellow gold; the ring on
the right is noticeably paler and cooler in tone, closer to a soft champagne
gold. Both rings are identical in shape, thickness and finish, so the only
difference the eye can find is the colour of the metal. Camera is locked on a
tripod with an extremely slow push-in of about eight percent over the shot, no
handheld drift. Shot on a 100mm macro lens at f/3.5, depth of field shallow
enough to soften the velvet texture but deep enough that both rings stay sharp.
Key light is a broad soft warm source at 3400K positioned high and slightly
behind the rings, producing a clean specular arc along the top curve of each
band. A weak cool fill at 5600K from low front at one-tenth intensity opens the
shadow inside each ring. The velvet swallows light and reads almost black. Deep
vignette, colour palette limited to two distinct golds, charcoal and near-black.
Perfect left-right symmetry in the composition, the centre line of the frame
falling exactly in the gap between the rings. Fine grain, photorealistic,
jewellery-catalogue quality. Upper half of the vertical frame empty and dark for
a text overlay. One continuous take, no cuts.
```

---

## 4 · Prompt, broken down

| Clause | Why it is there |
|---|---|
| `separated by a narrow gap running down the centre` | The gap is where your dividing line and the two prices sit. Ask for it or the rings touch and there is nowhere to put the split. |
| `identical in shape, thickness and finish` | The comparison is purity, expressed as colour. Different shapes would introduce a second variable and muddy the point. |
| `deeper richer saturated yellow` vs `paler cooler champagne` | This is physically true: lower karat means more alloy, which lightens the colour. The shot teaches the difference without a word of explanation. |
| `high and slightly behind… specular arc along the top curve` | Backlight is what separates two similar objects on a dark ground. Front light would flatten both into discs. |
| `velvet swallows light and reads almost black` | Names the material behaviour rather than just the colour, which Veo renders far more reliably. |
| `Perfect left-right symmetry… centre line falling exactly in the gap` | Your overlay is symmetrical, so the plate under it must be too. |
| `f/3.5` not `f/2.8` | Slightly deeper than the other reels — both subjects must be sharp, not one. |

---

## 5 · Three variations

**A — Two bars, different alloys**
```
Vertical macro of two identical small gold bars side by side on dark charcoal
velvet with a narrow gap down the centre of the frame. The left bar is a deep
saturated yellow gold, the right bar a paler champagne gold, identical in every
other respect. Locked-off tripod, extremely slow eight percent push-in, 100mm
macro at f/3.5. Broad soft warm 3400K key from high and slightly behind creating
a specular line along each bar's top edge, weak cool fill from low front. Deep
vignette, near-black background, two golds and charcoal only. Perfect left-right
symmetry, centre line in the gap. Photorealistic, catalogue quality. Upper half
of the frame empty and dark. One continuous take.
```

**B — Chain detail**
```
Vertical macro of two gold chains of identical link pattern lying parallel on
dark charcoal velvet, a narrow gap between them down the centre of the frame.
The left chain is deep yellow gold, the right pale champagne gold. Camera locked
off, no movement; instead the warm 3400K key light drifts very slowly from left
to right, the specular highlight travelling along both chains link by link. Weak
cool fill at one-tenth from low front. 100mm macro at f/3.5, deep vignette,
near-black background, two golds and charcoal only. Perfect symmetry. Upper half
of the vertical frame empty and dark. Photorealistic, editorial. One continuous
take.
```

**C — Tilt reveal**
```
Vertical macro of two identical gold bangles standing on edge side by side on
dark charcoal velvet, narrow centre gap. The left bangle is deep saturated
yellow, the right pale champagne. Both rotate together very slowly, less than
twenty degrees total, so the light rolls across their curved surfaces and the
tonal difference between the two metals becomes unmistakable. Locked-off tripod,
100mm macro at f/3.5, broad warm 3400K key high and behind, weak cool fill.
Deep vignette, near-black background, two golds and charcoal. Perfect left-right
symmetry. Upper half of the frame empty and dark. Photorealistic. One continuous
take.
```

**C is the best of the three** — rotation is what makes the colour difference
undeniable, because gold's colour changes most as light rolls across a curve.

---

## 6 · Negative prompt

```
text, numbers, letters, Arabic script, karat stamps, hallmarks, engraved
numerals, price tags, captions, watermarks, logos, people, hands, fingers,
faces, models wearing jewellery, shop displays, velvet boxes, certificates,
scales, magnifying glasses, charts, arrows, tick marks, cross marks, green and
red colour coding, fast motion, cuts, transitions, lens flares, oversaturated
yellow, plastic gold, CGI look, asymmetric composition
```

Two exclusions worth understanding. **Karat stamps and hallmarks** — Veo will
happily engrave "18K" onto a ring, and it will be wrong, in the wrong font, on
the wrong side. **Green and red colour coding** — Veo reads "comparison" and
reaches for a right-answer/wrong-answer palette. There is no wrong karat here;
which one to buy depends on budget and on what the local souq stocks.

---

## 7 · Caption

```
🟡 عيار 21: {السعر_21} {العملة} للجرام — نقاوة 87.5%
🟡 عيار 18: {السعر_18} {العملة} للجرام — نقاوة 75%

الفرق: {الفرق} {العملة} في الجرام الواحد.
عيار 21 هو الأكثر انتشاراً في الخليج، وعيار 18 أخف على الجيب وأقوى في التصاميم الدقيقة.

💬 إنت أي عيار تشتري؟ وليش؟
🔗 كل العيارات وكل الدول: goldpricesarabia.com

{tag block}
```

The two-line explanation matters. It is factual, it is the kind of thing a
jeweller would tell you, and it gives the comment question something to disagree
with. A bare price comparison gets scrolled; a mild claim gets answered.

---

## Do not

- Do not declare one karat "better" — it is a budget and durability trade-off
- Do not use green/red or tick/cross iconography
- Do not let Flow engrave any karat stamp
- Do not quote purity from memory; use `karatPurity()`
- Do not answer "which should I buy?" in the replies with a recommendation — restate the trade-off
