# prussian

Design system for web and Python. Four modes, script-verified tokens, plotting themes included.

Derived from `madsondeluna.github.io`. Numeric token architecture in the format of `devouringdetails.com`. Easing curves from `motion.dev`.

Prussian 1.1.0.

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

Radius:

- Surface: `--radius-0`. Card, panel, grid cell, field, table. Separation comes from the 1px rule.
- Control: `--radius-full` or `--radius-circle`.
- Media: `--radius-8`.
- Steps 2 to 16: only to approximate an imported component.

Card grid: cells carry no border, `gap: 1px` over a `--border` background. Class `.hairline-grid`.

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

Shapes: `.glass-sq`, `.glass-soft`, `.glass-round`, `.glass-circle`. `.glass-panel` builds an internal hairline grid. `.glass-lift` is the pointer reaction: rises 2px, edge lights up, shadow opens.

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

## Components

`patterns.css`: `.eyebrow`, `.display`, `.prose`, `.section-header`, `.surface`, `.hover-surface`, `.card-glass`, `.hairline-grid`, `.glass` and variants, `.pill`, `.pill-sm`, `.pill-solid`, `.link-cta`, `.link-muted`, `.hover-fade`, `.tag`, `.status`, `.media`, `.avatar`, `.control-round`, `.fade-up`, `.fade-scale`, `.stagger`.

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

## Visual guide

`preview/index.html` renders every token and component in all four modes, with the contrast table recomputed on mode change and a click on any colour copying its token. It loads `../web/*.css` on purpose, to test the files rather than a copy.

```
python3 -m http.server 8731
```

Guide layout rules, applicable to any page built on the language: two vertical axes (columns 1 and 9 of twelve), three spacing steps (24, 48, 96), sentence case, one size per control class.

## Migrating existing apps

`apps/biohub` and its subapps use Bootstrap colours. Import `web/tokens.css` at the top of each `style.css` and swap: `#0d6efd` to `var(--accent)`, `#198754` to `var(--status-good)`, `#dc3545` to `var(--status-critical)`, `#adb5bd` to `var(--muted)`, background greys to `var(--bg)` and `var(--surface)`. Charts move to the data palette.

## Keeping in sync

A change to the language updates three places in the same session: this repository, the "Design language: Prussian" section of `~/.claude/CLAUDE.md`, and the `prussian-design-system.md` memory file.
