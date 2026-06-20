# patchnotes-overview

A single-page documentation site summarising the class changes in the **first World of Warcraft: Midnight Patch 12.1 "Curse of Ula'tek" PTR build** ("DPS cooldowns nerfed").

Live: https://patchnotes-overview.pages.dev

## What it does

- Transcribes every class/spec change from Blizzard's official developer notes.
- Computes the **exact percentage change** for every numeric line in code, from the stated old -> new values, so the math cannot drift from the source.
- Adds a **cooldown-squish scorecard**, a **biggest buffs / biggest nerfs** breakdown, and a grounded **reroll guide**.

## Accuracy / math convention

Percentages are not typed by hand. For any change that states an old and new value, the page computes:

```
change = (new - old) / old * 100
```

So a shield that goes from 40% to 50% of damage is reported as **+25%** (not "+10 points"). Where the notes only give a relative figure ("increased by 20%"), that figure is used as-is. Direction (buff / nerf / neutral) is judged per line by gameplay impact, so a shorter cooldown or cheaper spell counts as a buff even though its number goes down.

We deliberately do **not** invent whole-spec net-DPS numbers, because real throughput depends on uptime, scaling and final tuning the notes do not provide. The "biggest buffs/nerfs" and reroll sections are an interpretation of the direction and size of the stated changes, not simulation output. This is a first PTR build; values will change.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The document page (curated sections + mount points). |
| `styles.css` | Styling. |
| `data.js` | Structured dataset of every change (`window.PATCH`, `window.CLASSES`). |
| `app.js` | Renders the data-driven tables and computes displayed percentages. |
| `verify.mjs` | Recomputes every percentage and runs integrity checks. |
| `SOURCE-blizzard-notes.txt` | Verbatim copy of the source notes (provenance). |

## Verify the math

```
node verify.mjs
```

Recomputes all percentages, checks every line has a valid direction/kind, and prints the largest-magnitude changes for eyeballing.

## Source

Blizzard developer notes for the first Patch 12.1 PTR build, via Wowhead:
https://www.wowhead.com/news/class-changes-for-first-patch-12-1-ptr-build-dps-cooldowns-nerfed-381912

Captured 2026-06-20. PTR data is subject to change.
