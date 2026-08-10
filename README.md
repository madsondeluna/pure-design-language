# prussian

Design system for web and Python. Four modes, script-verified tokens, plotting themes included.

Derived from `madsondeluna.github.io`. Numeric token architecture in the format of `devouringdetails.com`. Easing curves from `motion.dev`.

Prussian 1.2.0.

## Use

```html
<link rel="stylesheet" href="web/tokens.css">
<link rel="stylesheet" href="web/patterns.css">
```

Tailwind v4: import `web/theme.css`, which already pulls `tokens.css` and the `@theme inline` block.

```python
from prussian import mpl, plotly
mpl.use("light")        # light | paper-like | deep-blue | dark
plotly.use("light")
```

Without the package: `plt.style.use("python/prussian-light.mplstyle")`.

Streamlit: copy `python/streamlit/config.toml` to `.streamlit/config.toml` and inject `app.css`.

## Files

```
tokens/tokens.json               source of truth
web/tokens.css                   variables, four modes
web/theme.css                    Tailwind v4 bridge
web/patterns.css                 components and the glass material
python/prussian/                 palette, mpl, plotly
python/prussian-{light,dark}.mplstyle
python/streamlit/                config.toml and app.css
preview/index.html               visual guide, everything live
tools/check.mjs                  verification
```

## Modes

| Class | Ramp | `--bg` | Use |
|---|---|---|---|
| `:root` | slate | `#F4F6F9` | default |
| `:root.paper-like` | paper | `#FAF8F1` | long reading, print |
| `:root.deep-blue` | slate | `#0D1321` | blue dark |
| `:root.dark` | graphite | `#0E0F13` | neutral dark |

Through 1.0 the `dark` class was the blue one. It is now graphite, and the blue is `deep-blue`. Migrating from `madsondeluna.github.io`: swap the class and the `localStorage` value.

## Colour

Two 15-step ramps: `--slate-*` (light, paper-like, deep-blue) and `--graphite-*` (dark). Every semantic token resolves to a step.

Slate keeps the Space Cadet anchors: `#0D1321`, `#1D2D44`, `#3E5C76`, `#748CAB`, `#F4F6F9`. Graphite is neutral by construction: OKLCH chroma between 0.007 and 0.012 at hue 265.

### Contrast per pair

WCAG 2.1 ratios, recomputed by `check.mjs` on every run.

| Pair | light | paper-like | deep-blue | dark |
|---|---|---|---|---|
| `--text` / `--bg` | 17.13 | 17.45 | 17.13 | 17.68 |
| `--muted` / `--bg` | 6.47 | 6.59 | 5.37 | 7.15 |
| `--muted` / `--surface` | 6.02 | 5.87 | 4.02 | 5.49 |
| `--accent` / `--bg` | 6.47 | 6.59 | 6.94 | 9.86 |
| `--secondary` / `--bg` | 3.19 | 3.25 | 2.65 | 5.53 |
| `--border` / `--bg` | 1.39 | 1.47 | 1.73 | 1.79 |

Usage rule: above 4.5 any text; 3 to 4.5 large text and UI components; below 3 decoration. `--secondary` is a border colour in light, paper-like and deep-blue.

Tags (`congress`, `conference`, `symposium`) sit between 7.7 and 11.6 in both dark modes.

Status sits between 5.54 and 8.62. Reserved meaning, never a series colour, always paired with a label or icon.

| Token | light | dark and deep-blue |
|---|---|---|
| `--status-good` | `#376E48` | `#82BB90` |
| `--status-warning` | `#79601B` | `#C9AE6D` |
| `--status-serious` | `#844E31` | `#D89B7C` |
| `--status-critical` | `#864544` | `#D18885` |

## Data colour

A family separate from the interface. The brand slate has OKLCH chroma 0.055, below the 0.10 floor: as a series it reads grey.

Eight slots, chroma between 0.105 and 0.115, fixed order, assigned in sequence, never cycled.

| Slot | Hex | Name |
|---|---|---|
| 1 | `#3973B1` | blue |
| 2 | `#9F8322` | gold |
| 3 | `#9E527F` | magenta |
| 4 | `#4C985F` | green |
| 5 | `#745BA5` | violet |
| 6 | `#BA6F3E` | orange |
| 7 | `#1990AD` | teal |
| 8 | `#AC5551` | red |

Order found by exhaustive search over the permutations, maximising the worst adjacent pair. Verified against all four surfaces:

- Lightness band and chroma floor: pass
- Colour vision deficiency: worst adjacent pair ΔE 10.0 (deuteranopia, Machado 2009 at severity 1.0), target 8
- Normal vision: worst adjacent pair ΔE 19.9, floor 15
- Mark contrast: minimum 3.31, floor 3

Scatter, bubble, map and small multiples: three-series cap. Beyond that, group or facet. `palette.series(n)` raises above eight.

Ramps: `SEQUENTIAL` continuous, nine steps; `ORDINAL_LIGHT` and `ORDINAL_DARK`, seven discrete steps validated separately; `DIVERGING` blue to amber with grey at the midpoint.

Never two y-axes on one chart.

## Typography

| Family | Role | Constraint |
|---|---|---|
| Cormorant Garamond 300 | section titles and names | tracking -0.02em, leading 1, never below 32px, never in running text |
| Geist | prose, labels, buttons, table cells | |
| Geist Mono | numbering, field labels, tabular values, code, identifiers | tracking 0.12em when used as a label |

Scale `--text-11` through `--text-56`; the name is the size. Two clamps sit outside it: `--text-display-section` and `--text-display-name`.

Measure: `--measure-prose` 480px. `.prose-justify` is opt-in, not base.

## Space, form, glass

Space: `--space-2` through `--space-96`, base 4 with half-steps at 2, 6 and 10.

Radius follows the role, not the taste. Nothing in the language has a live corner.

| Token | Value | Applies to |
|---|---|---|
| `--radius-surface` | 12px | card, panel, grid cell, sheet, state box, hairline grid |
| `--radius-field` | 8px | input, textarea, select, any text entry |
| `--radius-media` | 8px | image, video, thumbnail, avatar frame |
| `--radius-control` | full | button, pill, chip, tag |
| `--radius-mark` | 4px | native checkbox box, skeleton bar, anything under 20px |
| `--radius-circle` | 50% | avatar, dot, radio, round control |

The ladder is concentric: a child never rounds harder than its parent, so a field at 8 inside a card at 12 reads as one object. The numeric steps and `--radius-0` stay in the scale for imported components only.

Card grid: cells carry no border, `gap: 1px` over a `--border` background, radius and `overflow: hidden` on the grid rather than the cell. Class `.hairline-grid`.

### Glass

Five layers: vertical gradient fill, backdrop blur, saturation, specular highlight on the top edge, refraction on the bottom.

Base class `.glass`, valid on any shape. `.pill` is glass by default. `.pill-solid` for dense tables or already-translucent surfaces.

| Texture | Blur | Fill | Use |
|---|---|---|---|
| `.glass-thin` | 4px | 10% to 2% | overlay where the content behind must stay readable |
| `.glass` | 16px | 42% to 16% | default control: pill, chip, tooltip |
| `.glass-frost` | 30px | 82% to 62% plus grain | surfaces carrying their own text: toolbar, command palette, sheet, modal |
| `.glass-deep` | 56px | 58% to 34% | full-width chrome |
| `.glass-accent` | inherits | accent tint | one control per group |

`.glass-frost` is the only one with grain (desaturated `feTurbulence` in `mix-blend-mode: overlay`). Without it the result is translucent, not frosted.

Shapes: `.glass-sq` (surface radius, the name is kept for compatibility), `.glass-soft` (media), `.glass-round` (control), `.glass-circle`. `.glass-panel` builds an internal hairline grid. `.glass-lift` is the pointer reaction: rises 2px, edge lights up, shadow opens.

Blur radius follows surface size. A large radius on a short element makes Chrome sample beyond the box and paint a ghost block in the first of a row of glass siblings.

Text on glass uses `--text`, never `--muted`: the backdrop is unpredictable. `.card-glass` is exempt, since it sits on a known surface.

Glass does not go over a flat background (no effect, one compositing layer), over another translucent surface, or behind running text.

## Motion

| Token | Curve | Use |
|---|---|---|
| `--ease-standard` | `cubic-bezier(.4,0,.2,1)` | colour, background and border on hover |
| `--ease-out` | `cubic-bezier(0,0,.2,1)` | simple entrance |
| `--ease-out-soft` | `cubic-bezier(.25,0,0,1)` | content, tab transition, chart line drawing |
| `--ease-out-expo` | `cubic-bezier(.16,1,.3,1)` | slide, scale, bar growth |
| `--ease-swift` | `cubic-bezier(.23,.88,.26,.92)` | hover displacement |

Durations `--duration-1` (100ms) through `--duration-6` (500ms). Hover default 200ms. Glass 350ms with `--ease-out-soft`.

Displacement: `--nudge-1` 2px, `--nudge-2` 3px, `--nudge-3` 4px.

Entrance stagger: 60ms per item, capped at six steps. Class `.stagger`.

Everything collapses under `prefers-reduced-motion: reduce`.

## Craft rules

Behaviour, not material. Must fails the build or the review, should is the default and leaving it needs a written reason, never has no exception. The binding column names the class or token that already implements the rule.

Five are script checked: `color-scheme` in all four modes, no `transition: all`, no transition of a layout property, the interaction tokens agreeing between `tokens.json` and `tokens.css`, and the presence of a focus ring.

### Interaction tokens

| Token | Value | Role |
|---|---|---|
| `--hit-min` | 24px | floor for a hit area |
| `--hit-min-touch` | 44px | same floor under `pointer: coarse` |
| `--focus-ring` | 2px | outline width, colour `--accent`, `--text` over glass |
| `--focus-offset` | 2px | outline offset |
| `--field-height` | 40px | minimum field height, 44px on touch |
| `--text-field` | 1rem | field text size, the one exception to one size per control class |
| `--scroll-offset` | 88px | `scroll-margin-top` under a fixed bar |
| `--stroke` | 2px | drawn stroke: spinner ring, checkbox mark |
| `--tap-highlight` | transparent | the native tap flash, replaced by `:active` |

### Keyboard and focus

| Rule | Level | Bound to |
|---|---|---|
| Every interactive element reachable and operable from the keyboard, following the authoring practice for its pattern | Must | native semantics |
| Focus ring visible on `:focus-visible`, group lit on `:focus-within` | Must | `--focus-ring` |
| Focus managed on open, close and delete: trapped in the panel, returned to the trigger | Must | `.modal`, `.overlay` |
| Outline removed without a visible replacement | Never | `check.mjs` |
| Ring switches to `--text` over glass, where the backdrop is unpredictable | Should | `.glass:focus-visible` |

### Target and input

| Rule | Level | Bound to |
|---|---|---|
| Hit area clears 24px, and 44px under a coarse pointer | Must | `--hit-min` |
| Visual size may go under the floor, the hit area may not | Must | `.hit` |
| Text field at 16px: below it iOS zooms the page on focus | Must | `--text-field` |
| Browser zoom disabled through `user-scalable` or `maximum-scale` | Never | viewport |
| Double tap delay removed | Must | `touch-action: manipulation` |
| Native tap flash replaced by the language's own pressed state | Should | `--tap-highlight` |

### Forms

| Rule | Level | Bound to |
|---|---|---|
| Paste blocked in a field | Never | any field |
| Free text accepted and validated after, never blocked while typing | Must | `.input` |
| Incomplete form submittable, so validation surfaces | Must | `novalidate` |
| Error next to its field, focus moved to the first one | Must | `.field-error` |
| Submit enabled until the request starts, then a ring and the same label | Must | `[data-loading]` |
| Enter submits a single line field, Cmd or Ctrl with Enter submits a textarea | Must | `.textarea` |
| `autocomplete`, a meaningful name, the right type and inputmode | Must | `.field` |
| Label and control share one hit target, no dead zone | Must | `.check` |
| Checkbox rounds at `--radius-mark` as a field, only the radio is a circle | Must | `.check input` |
| Password managers and one time codes work, pasted codes included | Must | `autocomplete` |
| Values trimmed before they are read | Must | submit handler |
| Unsaved changes warn before navigation | Must | `beforeunload` |
| Spellcheck off for email, code and username | Should | `spellcheck` |
| Placeholder shows the shape of the answer, ellipsis when it is an instruction | Should | `placeholder` |
| Autofocus on desktop with a single primary field, rarely on mobile | Should | `autofocus` |

### State, navigation and feedback

| Rule | Level | Bound to |
|---|---|---|
| URL carries the state: filter, tab, page, open panel, colour mode | Must | `history` |
| Back and forward restore the scroll position | Must | `scrollRestoration` |
| Navigation is an anchor, so modifier and middle click work | Must | `a href` |
| A div with a click handler used to navigate | Never | `a href` |
| Destructive action confirmed, or reversible inside a stated window | Must | `.modal` |
| Toast and inline validation announced through a polite live region | Must | `aria-live` |
| Every state offers the next step, a dead end is a defect | Must | `.empty` |
| Optimistic update reconciled on response, rolled back or undoable on failure | Should | app layer |
| An option that opens a follow up ends in an ellipsis | Should | copy |

### Motion, touch and drag

| Rule | Level | Bound to |
|---|---|---|
| Reduced motion honoured with a reduced variant or with nothing | Must | `patterns.css` |
| Only `transform` and `opacity` animated | Must | `check.mjs` |
| A layout property animated: top, left, width, height | Never | `check.mjs` |
| `transition: all` | Never | `check.mjs` |
| Motion interruptible and driven by input, nothing autoplays | Must | `.viz` |
| `transform-origin` where the movement physically starts | Must | `.viz-grow` |
| SVG transform on a `g` wrapper with `transform-box: fill-box` | Must | svg |
| Overscroll contained in a sheet or drawer | Must | `.drawer` |
| First tooltip in a group waits, its neighbours open at once | Must | `.tip-group` |
| Text selection off during a drag, dragged element inert | Must | `[data-dragging]` |
| CSS first, then the animation API, then a library | Should | five curves |
| Curve matched to size and distance, controls settle rather than jump | Should | `--ease-out-soft` |

### Layout and content

| Rule | Level | Bound to |
|---|---|---|
| Checked on mobile, laptop and ultra wide, the last simulated at half zoom | Must | two axes |
| Safe areas respected | Must | `env(safe-area-inset-*)` |
| No unwanted scrollbar, overflow fixed where it appears | Must | `overflow` |
| Text container survives short, average and far too long content | Must | `.truncate`, `.clamp-2` |
| Flex child carries min-width zero before it can truncate | Must | `.min-w-0` |
| Empty string and empty array render a state, not a broken box | Must | `.empty` |
| Empty, sparse, dense and error are four designs | Must | `.empty`, `.skeleton` |
| Skeleton copies the box of the final content | Must | `.skeleton-line` |
| Contrast rises on hover, active and focus | Must | `--border-hover` |
| Alignment deliberate: grid, baseline or edge | Must | `.grid` |
| Optical alignment wins over geometry by a pixel where perception disagrees | Should | `.optical` |
| Grid and flex do the layout, not measurement in script | Should | `.grid` |
| Nested radius never exceeds the parent, the two stay concentric | Should | `--radius-field` |

### Text and accessibility

| Rule | Level | Bound to |
|---|---|---|
| Document title says where the reader is | Must | `title` |
| Heading levels in order, first keyboard stop skips to the content | Must | `.skip-link` |
| Anything an anchor lands on clears the fixed bar | Must | `--scroll-offset` |
| Numbers that will be compared use tabular figures | Must | `.num` |
| Status carries a second cue beyond colour, icons carry text labels | Must | `.status` |
| Icon only button carries a descriptive accessible name | Must | `.sr-only` |
| Decorative element hidden from the accessibility tree | Must | `aria-hidden` |
| Native element before an ARIA role | Must | semantics |
| Ellipsis is one character, non breaking space holds 10 MB and Cmd K | Must | copy |
| Dates, times and numbers formatted for the locale | Must | `Intl` |
| Curly quotes, short heading balanced across its lines | Should | `.balance` |
| Brand names, tokens and identifiers marked against machine translation | Should | `translate="no"` |
| Inline help first, tooltip last | Should | `.tip` |

### Delivery

| Rule | Level | Bound to |
|---|---|---|
| Mode declared to the browser | Must | `color-scheme` |
| Native select with explicit background colour and text colour | Must | `.select` |
| Mutation answers in under 500ms | Must | app layer |
| List past fifty items virtualised | Must | app layer |
| Above the fold images preloaded, the rest lazy, all declaring their size | Must | `img` |
| Layout reads and writes batched | Must | app layer |
| Profiling with CPU and network throttled, extensions off | Must | devtools |
| Contrast measured, not judged by eye | Must | `check.mjs` |
| Chart colour survives protanopia and deuteranopia at full severity | Must | `check.mjs` |
| Browser frame colour matches the page background | Should | `theme-color` |
| Preconnect for a CDN, preload with swap for a critical font | Should | `link rel` |
| Tested in low power mode and in Safari | Should | device |
| Layered shadows, ambient under direct, borders tinted toward the background | Should | `--shadow-glass-rest` |

Contrast method: `check.mjs` computes WCAG 2.1 ratios and every number published here comes from it. Perceptual contrast is advice on top of that floor, not a replacement: one measure in the build.

### Consuming apps

Framework layer, outside this repository.

| Rule | Level |
|---|---|
| Field keeps focus and value across hydration | Must |
| Field with a value needs a change handler, otherwise a default value | Must |
| Re-renders counted and cut down | Must |
| Date and time rendering guarded against a server and client mismatch | Should |
| Uncontrolled fields by default, a controlled one cheap per keystroke | Should |

## Components

`patterns.css`: `.eyebrow`, `.display`, `.prose`, `.section-header`, `.surface`, `.hover-surface`, `.card-glass`, `.hairline-grid`, `.glass` and variants, `.pill`, `.pill-sm`, `.pill-solid`, `.link-cta`, `.link-muted`, `.hover-fade`, `.tag`, `.status`, `.media`, `.avatar`, `.control-round`, `.fade-up`, `.fade-scale`, `.stagger`.

Interaction layer, new in 1.2: `.hit`, `.field`, `.field-label`, `.input`, `.textarea`, `.select`, `.select-shell`, `.check`, `.field-error`, `.form-actions`, `[data-loading]`, `.truncate`, `.clamp-2`, `.clamp-3`, `.break-words`, `.min-w-0`, `.num`, `.balance`, `.pretty`, `.empty`, `.skeleton`, `.skeleton-line`, `.overlay`, `.modal`, `.drawer`, `[data-dragging]`, `.tip`, `.tip-group`, `.sr-only`, `.skip-link`.

Visualisation layer: `.viz`, `.viz-crosshair`, `.viz-dot`, `.viz-mark`, `.viz-tip`, `.viz-legend`, `.viz-draw`, `.viz-grow`, `.viz-appear`.

## Python API

```python
from prussian import palette

palette.series(n)          # first n colours, raises above 8
palette.tokens(mode)       # semantic tokens for the mode
palette.status(mode)
palette.ordinal(n, mode)   # n steps sampled from the ramp
```

```python
from prussian import mpl

mpl.use(mode)              # applies globally, registers colormaps
mpl.context(mode)          # context manager
mpl.rc(mode)               # rcParams without applying
mpl.finish(ax, title=, subtitle=, xlabel=, ylabel=, mode=, legend=)
mpl.bar_gap(ax)            # surface gap between stacked segments
```

Registered colormaps: `prussian`, `prussian_r`, `prussian_div`, `prussian_div_r`.

`mpl.finish` turns the grid off on heatmaps, left-aligns the title, keeps labels in ink rather than series colour, and shows a legend only from two series up.

Plotly templates: `prussian`, `prussian_paper_like`, `prussian_deep_blue`, `prussian_dark`.

## Verification

```
node tools/check.mjs
```

No dependencies, exits 1 on any failure. It checks:

- categorical palette against all four surfaces: lightness band, chroma floor, protanopia and deuteranopia separation (Machado, Oliveira and Fernandes 2009 at severity 1.0), normal-vision floor, mark contrast
- ordinal ramps: monotonicity, minimum lightness step, end contrast
- semantic tokens in all four modes against the declared floor
- colour consistency across `tokens.json`, `web/tokens.css`, `python/prussian/palette.py` and `python/streamlit/app.css`
- version across `tokens.json`, `__init__.py`, the guide and this README
- absence of a ninth chart slot
- `color-scheme` declared in all four mode blocks
- no `transition: all` and no transition of a layout property in `web/` or the guide
- interaction tokens agreeing between `tokens.json` and `web/tokens.css`
- a focus ring that exists

## Visual guide

`preview/index.html` renders every token and component in all four modes, with the contrast table recomputed on mode change and a click on any colour copying its token. It loads `../web/*.css` on purpose, to test the files rather than a copy.

Nine chapters: colour, data colour, typography, space and form, glass, motion, craft, components, use. The craft chapter carries the rule tables above with live demonstrations: focus ring and hit area, a form that surfaces its errors on an empty submit, the three content lengths side by side, and the empty, loading and error states.

Serve from the repository root, not from `preview/`, or the `../web/*.css` imports return 404.

```
python3 -m http.server 8731
# http://localhost:8731/preview/index.html
```

Guide layout rules, applicable to any page built on the language: two vertical axes (columns 1 and 9 of twelve), three spacing steps (24, 48, 96), sentence case, one size per control class.

## Migrating existing apps

`apps/biohub` and its subapps use Bootstrap colours. Import `web/tokens.css` at the top of each `style.css` and swap: `#0d6efd` to `var(--accent)`, `#198754` to `var(--status-good)`, `#dc3545` to `var(--status-critical)`, `#adb5bd` to `var(--muted)`, background greys to `var(--bg)` and `var(--surface)`. Charts move to the data palette.

## Keeping in sync

A change to the language updates three places in the same session: this repository, the "Design language: Prussian" section of `~/.claude/CLAUDE.md`, and the `prussian-design-system.md` memory file.
