# Design language

The Fellowship site is printed like an atlas: cobalt ink on laid paper, with a few hand-tinted washes. Over that sits a drawn layer after Christophe Chemin: coloured-pencil vignettes, month plates, a taped collage and marginalia. This file records the system and where each idea came from, so changes stay coherent. Tokens live in `src/css/custom.css`.

## Sources

| Source | What we took |
|---|---|
| [SeldomSought atlas](https://seldomsought.com/expertise.html) | The base: engraved cobalt on paper, Cormorant Garamond for voice, DM Sans for wayfinding, hairlines and double-rule cartouches instead of shadows, numbered specimens, a night-chart inversion |
| Christophe Chemin (coloured pencil and ink; Prada prints 2016 to 2018; see [032c](https://032c.com/magazine/prada-undone-inside-artist-christophe-chemins-revolutionary-reference-system), [i-D](https://i-d.co/article/meet-christophe-chemin-the-creative-powerhouse-behind-pradas-newest-prints/), [BoF](https://www.businessoffashion.com/opinions/news-analysis/miuccia-prada-christophe-chemin-artist-collaboration/)) | Woven labels as a reference system; the French Republican calendar; "from far a pretty pattern, up close something else" (the loupe); coloured-pencil hatching |
| Hermès, 2026 relaunch ([Domus](https://domusweb.it/en/news/2026/01/07/herms-new-website.html)) | Treat the site as an editorial object, not a showcase; hand-drawn material that responds to the visitor |
| Aesop ([design notes](https://www.webdesignhot.com/design.md/aesop/)) | Restraint: one inversion only, square corners everywhere, short easing, microcopy that reads like a small-press journal rather than an ad |

## Colour

Cobalt is the voice. Everything else only marks, numbers or warms. All inks are at least 5:1 on paper.

| Token | Hex | Meaning |
|---|---|---|
| `--ink` | `#173A77` | Text, rules, the whole property |
| `--rust` | `#9A4222` | Warmth and emphasis; Main House |
| `--verdigris` | `#2C5F50` | West House; the land |
| `--plum` | `#5E3657` | East House |
| `--ochre` | `#80601A` | The grounds (yard, shed) |
| `--paper` | `#F3EEE3` | Ground |
| `--night` | `#0E2146` | The single inversion: CTA plate and lightboxes |
| `--peony` | `#A33A5C` | Flowers, Floréal; text-safe |
| `--leaf` | `#4D6B24` | Growth, meadows; text-safe |
| `--sky-wash` | `#6F9BB3` | Washes only (glass, water, tape). Never text |
| `--lemon-wash` | `#D9B23D` | Washes only (sun, light, tape, the hero underline). Never text |

**Colour means place.** A house's ink is the same on the map legend, the map labels, amenity cards and woven labels. If you add an amenity, give it a `house` in `src/data/features.json` and it inks itself.

## Type

- **Cormorant Garamond** for anything a person would say: headings, body, captions. Never below 17px.
- **DM Sans** for wayfinding: nav, labels, buttons, form hints. Never below 12px (woven labels are the one 10px exception, set in caps with wide tracking).
- Emphasis is italic, never bold colour blocks. One italic word in the hero, in rust.

## The drawn layer

- **Vignettes** (`src/components/Vignette`): original line drawings, one per amenity plus ornaments (peony, bloom, key, seed, wind). Each is a hatched colour wash under a pencil line in `currentColor`, run through the `#pencil` filter (wobble plus paper tooth). Hatch fills are `url(#h-<colour>)`. Both are defined once in `src/theme/Root.tsx`. To add a drawing, add an entry to `DRAWINGS` in the 64×64 box and give it a `vignette` key in the data.
- **Month plates** (`src/components/SectionPlate`): each homepage section opens with a drawing, a plate number and a Revolutionary month chosen for its meaning: Floréal (flowers) for what's here, Thermidor (summer heat) for the photos, Prairial (meadows) for the land, Germinal (seeds sprouting) for what's still planned, Vendémiaire (harvest, the new year) for joining. The italic word in each title takes the plate's colour.
- **Marginalia**: loose drawings in the hero margins, and on the night chart. Hidden below 996px.
- **Collage**: the homepage photos are mounted prints, turned a few degrees, overlapped and taped, with a pinned note leading to the full gallery. Row spans in `custom.css` are sized so no print covers another's caption; recheck that if you change the photos.
- **Pencil underline**: the hero's last word sits on a lemon hatch, like a coloured-pencil highlight.

## Devices

- **Woven labels** (`.woven-label`): small stitched jacquard tags, after Chemin's garment labels. They say where something lives (`data-house`) or what a photo shows (`data-tint`). Keep the text to a few words.
- **Numbered specimens**: amenity plates are numbered "No. 01" and gallery figures "01", generated in CSS, so data files stay clean.
- **The loupe**: the hero photo is an ink engraving at a distance; with a mouse, a lens shows the colour photograph. Touch devices just see the engraving.
- **Republican date**: the hero's edition line shows today's date in the French Republican calendar, with the month's meaning ("the grape harvest"). New year is taken as 22 September.
- **Pencil hatching**: the featured room card is washed with fine diagonal rust hatching instead of a flat tint. Use hatching, not fills, for any future "highlighted" state.
- **Ornaments**: a small rust diamond between hairlines marks section openings and dividers.

## Voice

Written like someone who lives there. Plain, specific, a little dry. No em dashes. No brochure words ("blazing", "premium", "ultimate", "seamless"). No health or performance claims. State what's there and how people use it.

## Don't

- Rounded corners, drop shadows, gradients on buttons (the one exception: collage prints cast a soft shadow, because they're paper lying on paper)
- A second inversion besides the night chart
- New colours without a meaning (a place, a category or a thing in a drawing)
- Stock illustration or clip art next to the drawings. Everything drawn should come from the same hand and toolkit
- Colour on photographs other than the loupe; gallery photos are lightly desaturated and return to full colour on hover
