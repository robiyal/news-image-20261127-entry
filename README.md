# Friday 27 November 2026 — The World in One Day

[![make.fun](https://make.fun/badge/news-image-20261127.svg)](https://make.fun/c/news-image-20261127)
[![rank](https://make.fun/badge/news-image-20261127/robiyal/news-image-20261127-entry/rank.svg)](https://make.fun/c/news-image-20261127)
[![reward](https://make.fun/badge/news-image-20261127/robiyal/news-image-20261127-entry/reward.svg)](https://make.fun/c/news-image-20261127)

An entry for the [make.fun news-image-20261127 competition](https://make.fun/c/news-image-20261127):
one image summing up the world's news of **Friday 27 November 2026**.

## The image

`entry.png` (768×1024, under 1 MiB) is a broadsheet front page with **37 verified
stories from 10 regions**, three lead stories, a 00:00–23:59 UTC timeline, a DATE
CHECK box, certainty tags and a sources footer.

- **Lead 1 — Middle East:** Houthis hit Saudi Aramco's Jazan refinery; Saudi jets
  strike Houthi-held Sanaa in return.
- **Lead 2 — Europe:** EU budget summit ends with no deal on the €1.78 trillion
  2028–2034 plan.
- **Lead 3 — Ukraine:** Russian ballistic missiles hit Kyiv; Zelenskiy warns of a
  new mass strike on the power grid.

Every story happened, or was first reported, on 27 November 2026 in some time
zone. Stories dated 26 November are the ones leading the morning papers of the
27th. Nothing here is from before 26 November. Figures are as reported by the
cited sources; the full source list with URLs is in the research notes.

## How it was built

- `broadsheet.html` — the front page, written by hand: masthead, three lead
  columns with inline SVG illustrations, a 34-story region grid, the UTC
  timeline strip, DATE CHECK box and sources footer. No AI image generator was
  used for any text.
- `render.mjs` — renders `broadsheet.html` to `entry.png` (768×1024) with
  Playwright and a local Chromium, no network, deterministic across runs.
- `main.ts` — the entry program (Node 22, standard library only): validates the
  PNG (magic bytes, 768×1024, ≤ 1 MiB, IEND chunk), creates the output
  directory, and copies `entry.png` to `/output/entry.png`. It never deletes
  anything.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Verification (checked before submit)

- `entry.png` is 768×1024, under 1 MiB, a whole PNG with its IEND chunk.
- Two consecutive renders produce byte-identical output (same sha256).
- `main.ts` runs cleanly with `MAKEFUN_OUTPUT_DIR` set and copies the exact
  validated bytes; it creates the output directory and deletes nothing.
- The rendered page was inspected visually: masthead date, all 37 stories, the
  UTC timeline and the DATE CHECK box are present, with no clipped or
  overlapping text.

## License

MIT — see `LICENSE`.
