# 04 · Same gram, two prices

> **Hook:** «نفس الجرام… سعرين مختلفين» — *Same gram, two different prices*
> **Cadence:** twice a week · **Length:** 8s · **Backdrop reuse:** monthly

---

## 1 · Why this reel

This is the only concept in the set that a single-market competitor
**structurally cannot copy**. @goldprice_bh has 66,500 followers and covers one
country; you cover 46. Comparison is your moat, and it is the one thing worth
saying loudly.

It also targets two documented mechanics at once:

- **Comments.** "Why is it cheaper there?" is an argument people want to have, and comment predictions appear in the Feed, Explore and Reels cards alike.
- **Profile visits.** Meta's Feed Recommendations card names *"the number of times other viewers went to the post author's profile page after viewing the post"* as an input signal. A comparison of two countries makes a viewer from a third country want to check whether you cover theirs — and that tap is the signal.

**Good pairings** (large diaspora and remittance corridors, so both audiences care):

| Pair | Why it works |
|---|---|
| Saudi ↔ Egypt | Largest Arab labour corridor |
| UAE ↔ India | Dubai gold souq is a major Indian purchase point |
| Kuwait ↔ Egypt | Long-standing expatriate population |
| Saudi ↔ Pakistan | Large workforce, active remittances |
| Turkey ↔ Germany | Big Turkish diaspora, currency contrast |

Rotate pairs. Never repeat a pair inside two weeks.

---

## 2 · On screen, second by second

| Time | Visual | Source |
|---|---|---|
| 0.0 – 1.0s | «نفس الجرام» — *the same gram* — centred, nothing else | text overlay |
| 1.0 – 4.0s | Split: 🇸🇦 price left, 🇪🇬 price right, both 21K per gram | two country cards |
| 4.0 – 6.5s | Both converted to USD, so the comparison is honest | computed |
| 6.5 – 8.0s | «دولتك كم؟» — *What's yours?* | text overlay |

**The USD line at 4 seconds is not optional.** SAR and EGP are different units;
putting 477 beside 6,483 without a common denominator is a misleading
comparison, and the whole value of this account is that its numbers are honest.
Show both in dollars and the difference becomes real rather than rhetorical.

---

## 3 · Master prompt

```
Vertical macro cinematography, perfectly symmetrical split composition. On the
left half of the frame a small gold bar lies flat on dark charcoal stone; on the
right half a coiled gold chain rests on the same stone. A narrow band of
untouched dark stone runs vertically down the exact centre of the frame,
separating the two halves. Both halves are lit identically and with equal
intensity, so neither side reads as more important than the other. Camera is
locked on a tripod and completely static, no push, no drift. Shot on a 100mm
macro lens at f/4 so both objects hold sharpness. Key light is a broad soft warm
source at 3400K directly overhead, producing a clean specular sheen on the bar
and hundreds of small glints across the links of the chain. Weak cool fill at
5600K from low front at one-tenth intensity. Over the duration a slow shallow
gradient of light drifts from the left half to the right half and back, so each
side takes its turn being marginally brighter, without either ever falling into
shadow. The stone surface is matte, cool grey-black, with fine visible grain.
Deep vignette at the frame edges. Colour palette limited to warm gold, cool
grey-black stone and near-black. Fine film grain, photorealistic, editorial
product photography. The upper half of the vertical frame stays empty and dark
throughout for a text overlay. One continuous take, no cuts.
```

---

## 4 · Prompt, broken down

| Clause | Why it is there |
|---|---|
| `narrow band of untouched dark stone… down the exact centre` | The physical divider your split overlay sits on. Without it the two halves bleed together and the split reads as an accident. |
| `bar on the left, chain on the right` | Two *different* gold objects, not two identical ones. Identical objects say "same"; different objects say "same metal, different form" — which is the point about the same gram costing differently. |
| `lit identically and with equal intensity` | Any lighting bias reads as editorial bias toward one country. |
| `completely static, no push, no drift` | Your overlay has two columns of numbers. Camera movement under a two-column layout is unreadable. |
| `f/4` | Deepest aperture in the set — two subjects at different depths must both stay sharp. |
| `gradient of light drifts… each side takes its turn` | This is the entire motion of the shot, and it is fair: neither side wins. Also keeps the frame alive without moving the camera. |
| `matte cool grey-black stone` | A cool ground makes warm gold pop harder than a warm ground does, and it stops the frame turning into an amber wash. |

---

## 5 · Three variations

**A — Two scales**
```
Vertical macro, perfectly symmetrical split composition. Two identical small
brass balance pans sit side by side on dark charcoal stone, a narrow band of
untouched stone running down the exact centre of the frame. Each pan holds a
small quantity of gold grain. Both pans are lit identically. The pans rock very
gently and settle, coming to rest level with each other. Locked-off static
tripod camera, 100mm macro at f/4, broad soft warm 3400K key from directly
overhead, weak cool fill from low front. Deep vignette, matte cool grey-black
stone, gold and near-black palette only. Upper half of the vertical frame empty
and dark. Photorealistic, editorial. One continuous take, no cuts.
```

**B — Mirrored halves**
```
Vertical macro, perfectly symmetrical split composition. A single gold bangle
lies on dark charcoal stone on the left half of the frame and its exact mirror
image lies on the right half, a narrow band of untouched stone down the exact
centre. Both halves lit identically. A slow shallow gradient of warm light
drifts from left to right across the frame and back over the duration. Static
locked-off tripod, 100mm macro at f/4, soft 3400K overhead key, weak cool fill.
Deep vignette, matte cool grey-black stone, gold and near-black only. Upper half
of the frame empty and dark. Photorealistic. One continuous take.
```

**C — Two stacks, different heights**
```
Vertical macro, symmetrical split composition on dark charcoal stone with a
narrow untouched band down the exact centre of the frame. On the left, a short
stack of four gold coins. On the right, a taller stack of seven identical coins.
Both stacks lit with equal intensity, neither favoured. Camera static and locked
off, 100mm macro at f/4, broad soft warm 3400K key from overhead producing a
crisp specular edge on every coin rim, weak cool fill at one-tenth from low
front. Deep vignette, matte grey-black stone, gold and near-black palette. Upper
half of the vertical frame empty and dark. Photorealistic, editorial. One
continuous take.
```

Use **C sparingly.** Two stacks of different heights implies one country is
"more" — which is true of the number but reads as a value judgement about the
country. Reserve it for pairs where the gap genuinely is the story, and keep
**A** as the default because balanced pans are the fairest possible image.

---

## 6 · Negative prompt

```
text, numbers, letters, Arabic script, country names, flags, maps, borders,
currency symbols, banknotes, price tags, captions, watermarks, logos, people,
hands, faces, charts, graphs, arrows, versus symbols, boxing imagery, tick or
cross marks, green and red colour coding, unequal lighting between halves,
asymmetric composition, camera movement, cuts, transitions, lens flares,
oversaturated yellow, plastic gold, CGI look, stock footage feel
```

**Flags and maps are excluded deliberately.** Veo will reach for them the moment
it reads two countries, and generated flags come out subtly wrong — wrong number
of stripes, mangled emblems, invented colours. Getting a national flag wrong in
front of a Gulf audience is a serious own goal. Use the flag *emoji* in your
overlay instead; it is rendered by the phone, not by a model.

---

## 7 · Caption

```
🟡 نفس الجرام. سعران مختلفان.

🇸🇦 السعودية · عيار 21: {السعر_1} ر.س. للجرام
🇪🇬 مصر · عيار 21: {السعر_2} ج.م. للجرام

بالدولار: {دولار_1}$ مقابل {دولار_2}$ للجرام.
الفرق يجي من الضريبة والمصنعية وسعر الصرف — مو من نقاوة الذهب.

💬 دولتك كم اليوم؟
🔗 46 دولة على الموقع: goldpricesarabia.com

{tag block}
```

The line explaining *why* prices differ — tax, workmanship, exchange rate — does
real work. Without it the comparison implies someone is being cheated, which
invites an argument you do not want to host. With it, you sound like the person
who actually knows the market.

---

## Do not

- Do not compare without converting to a common currency
- Do not let Flow generate flags, maps or borders — use emoji in the overlay
- Do not imply one country is overcharging
- Do not pair two countries with a live political dispute
- Do not repeat a pair within two weeks
