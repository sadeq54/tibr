# 01 · Daily price reel

> **Hook:** «سعر الذهب اليوم في السعودية» — *Gold price today in Saudi Arabia*
> **Cadence:** daily · **Length:** 8s · **Backdrop reuse:** one render lasts a week

---

## 1 · Why this reel

This is the baseline post, and it exists because of one documented fact: in
Instagram's Search system card, account ranking is scored *"compared to the
number of times those actions have been taken on all accounts by people
performing the same search **in your country**."*

Search competition is per-country. You are not fighting every gold account on
Instagram — in Jordan, Kuwait or Bahrain the field is small. So the daily reel
names **one country per day**, rotating through your nine markets, instead of
saying "the Gulf".

Rotate: Saudi → UAE → Egypt → Jordan → Kuwait → Qatar → Bahrain → Lebanon →
Morocco, then repeat.

---

## 2 · On screen, second by second

| Time | Visual | Source |
|---|---|---|
| 0.0 – 1.0s | The 21K price, huge, filling the frame. Backdrop at 20% opacity behind it. | your card, cropped |
| 1.0 – 6.0s | Full country card at ~85% scale, backdrop moving behind | `02-saudi-arabia.png` |
| 6.0 – 8.0s | «دولتك؟ اكتبها بالتعليقات» — *Your country? Comment it* | text overlay in the editor |

**The first second is the whole job.** Meta's Reels card names *"how many times
the post has been skipped within two seconds"* and *"watched at least 3 seconds"*
as separate signals. A logo animation at the top burns both.

---

## 3 · Master prompt

```
Extreme macro cinematography of a single polished 24-karat gold bar resting on
dark charcoal matte fabric. The bar rotates almost imperceptibly clockwise,
completing less than fifteen degrees across the whole shot. Camera is locked on
a tripod, no handheld movement, with a very slow push-in of roughly five percent
over the duration. Shot on a 100mm macro lens at f/2.8, shallow depth of field
so the front face of the bar is tack sharp and the background falls into soft
darkness. Key light is a warm tungsten source at 3200K raking from camera left
at a low angle, catching the milled texture of the gold surface and throwing a
long specular highlight that travels slowly along the bar as it turns. A dim
cool fill at 5600K from the right at one-eighth intensity separates the bar from
the background. Deep vignette. Background is pure near-black, unlit, with no
visible horizon or surface edge. Colour palette strictly limited to warm gold,
amber and near-black. Fine grain, subtle anamorphic character, no chromatic
aberration. Composition leaves the upper sixty percent of the vertical frame
empty and dark for a text overlay to be added later. Photorealistic, calm,
premium, editorial jewellery advertising quality. Seamless loop.
```

---

## 4 · Prompt, broken down

Edit these clauses, not the whole prompt.

| Clause | Why it is there |
|---|---|
| `rotates almost imperceptibly… less than fifteen degrees` | Fast motion competes with your price text. Slow motion reads as expensive. |
| `Camera is locked on a tripod, no handheld` | Veo defaults to drifting handheld. Say no explicitly or the frame wanders under your overlay. |
| `100mm macro at f/2.8` | Lens language gives Veo a concrete optical target. Macro plus shallow DOF hides the fact that nothing else is in the scene. |
| `warm tungsten 3200K from camera left` | Named colour temperature reproduces far more consistently than "warm light". |
| `specular highlight that travels slowly` | This is the actual motion of the shot. Gold reads as gold because light *moves across* it. |
| `cool fill 5600K at one-eighth intensity` | Stops the shadow side going pure black and flattening the bar. |
| `upper sixty percent… empty and dark` | **The most important clause.** Reserves the space your card occupies. Without it Veo centres the subject and your text lands on top of it. |
| `Seamless loop` | Reels loop. A visible cut on the loop point is the cheapest possible tell. |

---

## 5 · Three variations

Render all three once, then rotate them across the week so the profile grid does
not read as one repeated clip.

**A — Coins**
```
Extreme macro of a shallow pile of gold coins on dark charcoal fabric, one coin
at the top settling and coming to rest in the first second, then complete
stillness. Locked-off tripod camera, 100mm macro at f/2.8, warm 3200K key from
camera left, dim 5600K fill from the right. Near-black unlit background, deep
vignette, warm gold and amber palette only. Upper sixty percent of the vertical
frame empty and dark. Photorealistic, premium, editorial. Seamless loop.
```

**B — Bangles**
```
Extreme macro of three stacked gold bangles on dark charcoal fabric, rotating
together at an almost imperceptible rate, less than fifteen degrees total.
Locked-off tripod, 85mm at f/2.0, warm 3200K key raking from camera left picking
out the engraved pattern, dim cool fill from the right. Near-black background,
deep vignette, gold and amber only. Upper sixty percent of the frame empty and
dark. Photorealistic, calm, premium. Seamless loop.
```

**C — Grain**
```
Extreme macro of loose gold grain and small nuggets on dark slate, camera
craning down very slowly from a high angle to a three-quarter view over the
duration. 100mm macro at f/2.8, warm 3200K top-left key producing hundreds of
tiny specular glints that shift as the camera moves, cool fill at one-eighth.
Near-black background, deep vignette, gold and amber palette. Upper sixty
percent of the vertical frame empty and dark. Photorealistic, premium,
editorial. Seamless loop.
```

---

## 6 · Negative prompt

```
text, numbers, letters, Arabic script, captions, subtitles, watermarks, logos,
brand marks, people, hands, faces, jewellery models, price tags, currency
symbols, charts, graphs, arrows, fast camera movement, whip pans, zoom bursts,
lens flares, rainbow chromatic aberration, oversaturated yellow, plastic-looking
gold, CGI shine, stock-footage look, cluttered background, visible studio
equipment, reflections of a photographer
```

---

## 7 · Caption

```
🟡 الذهب اليوم في {الدولة}: عيار 21 بـ{السعر} {العملة} للجرام
📅 {التاريخ}

💬 دولتك وين؟ اكتبها بالتعليقات ونرد عليك بسعرها.
🔗 كل الدول والعيارات: goldpricesarabia.com

{tag block from captions.txt}
```

The closing question is not decoration. Comment predictions appear in the Feed,
Explore **and** Reels system cards — three separate surfaces model whether a
post earns a comment. Asking one is the cheapest way to trigger it, and you have
the answer to every reply already generated.

---

## Do not

- Do not animate the price itself — counters and odometer effects delay the number past the 2-second threshold
- Do not add generated audio; pick trending audio in the Instagram app
- Do not reuse the same variation two days running
- Do not name a country whose card you are not actually showing
