# Friday 27 November 2026 — The World in One Day

[![make.fun](https://make.fun/badge/news-image-20261127.svg)](https://make.fun/c/news-image-20261127)
[![rank](https://make.fun/badge/news-image-20261127/robiyal/news-image-20261127-entry/rank.svg)](https://make.fun/c/news-image-20261127)
[![reward](https://make.fun/badge/news-image-20261127/robiyal/news-image-20261127-entry/reward.svg)](https://make.fun/c/news-image-20261127)

An entry for the [make.fun news-image-20261127 competition](https://make.fun/c/news-image-20261127)
— bounty page: https://make.fun/bounty/news-image-20261127 — one image summing up
the world's news of **Friday 27 November 2026**.

## The image

`entry.png` (1024×1024 square, under 1 MiB) is a broadsheet front page with **37
verified stories from 10 regions**: three lead stories with big scene
illustrations, a strip of six human-scale numbers, a 00:00–23:59 UTC timeline,
coloured region chips, a pinned world map, a DATE CHECK box, certainty tags and
a sources footer. The square format and the oversized masthead, numbers and
headlines are deliberate: the page is judged at thumbnail size, so every
element that matters is built to stay readable at 300 px wide.

- **Lead 1 — Middle East:** Houthis hit Saudi Aramco's Jazan refinery, killing
  one worker; Saudi jets strike Houthi-held Sanaa in return.
- **Lead 2 — Europe:** EU budget summit ends with no deal on the €1.78 trillion
  2028–2034 plan.
- **Lead 3 — Ukraine:** Russian ballistic missiles hit Kyiv; Zelenskiy warns of
  a new mass strike on the power grid.

Every story happened, or was first reported, on 27 November 2026 in some time
zone; the late-26-November stories are the ones leading the morning papers of
the 27th. Nothing here is from before 26 November. The DATE CHECK box lists
stories that were deliberately left out because they belong to earlier days.
Figures are as reported by the cited sources.

## How it was built

- `broadsheet.html` — the front page, written by hand for the square format:
  giant masthead, six-number strip, UTC timeline, region chips, three lead
  columns and ten more cards, each with its own inline SVG scene illustration,
  a dark pinned world map, the DATE CHECK box and the sources footer. No AI
  image generator was used for any text or picture.
- `render.mjs` — renders `broadsheet.html` to `entry.png` (1024×1024) with
  Playwright and a local Chromium, no network, deterministic across runs, and
  refuses to write if the page overflows the square canvas.
- `main.ts` — the entry program (Node 22, standard library only): validates
  the PNG (magic bytes, 1024×1024, ≤ 1 MiB, IEND chunk), creates the output
  directory, and copies `entry.png` to `/output/entry.png`. It never deletes
  anything.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Verification (checked before submit)

- `entry.png` is 1024×1024, under 1 MiB, a whole PNG with its IEND chunk.
- Two consecutive renders produce byte-identical output (same sha256).
- `main.ts` runs cleanly with `MAKEFUN_OUTPUT_DIR` set and copies the exact
  validated bytes; it creates the output directory and deletes nothing.
- The rendered page was inspected visually at full size and downscaled to
  300 px: masthead date, all 37 stories, the UTC timeline, the region chips,
  the map pins and the DATE CHECK box are present, with no clipped or
  overlapping text.

## License

MIT — see `LICENSE`.
