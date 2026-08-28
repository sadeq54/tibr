# Backdrops

Flow clips, kept because they are **reusable inputs**, not daily output. Each is
silent and carries no text, so the same file works every day — only the prices
drawn on top change. Named for the prompt in `docs/flow-prompts/` that produced
it.

| File | From | Clear space | Use with |
|---|---|---|---|
| `06-hook-gold-bars.mp4` | [06](../../docs/flow-prompts/06-hook-backdrop.md) | centre | `--opener hook` (default) |
| `01-daily-rotating-bar.mp4` | [01](../../docs/flow-prompts/01-daily-price.md) | top | `--opener cover` |

Today's reel, in one command:

```bash
node scripts/reel.mjs --clip assets/backdrops/06-hook-gold-bars.mp4 --scrim 0.30 --blur 3
```

`social-out/` is gitignored because it is regenerated daily. These are not —
they cost credits to make and never go stale.

Generate a new one only for a different look: a seasonal backdrop, or a themed
clip for a big price move. Never daily.
