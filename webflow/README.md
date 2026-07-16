# Capability-gap chart (`<gap-chart>`)

A self-contained web component that draws the "what models can do vs. what
businesses actually use" chart: an exponential line, a linear line, and the
shaded gap between them, annotated in place. No dependencies, no external
requests — one custom element rendering an inline SVG.

| File | What it is |
| --- | --- |
| `gap-chart-embed.html` | **The thing you paste into Webflow.** Element + script in one block (~7.7k chars, under Webflow's 10k embed limit). |
| `gap-chart.js` | Readable source of the component. Edit this, then rebuild the embed. |
| `build-embed.js` | `node webflow/build-embed.js` → regenerates `gap-chart-embed.html` from `gap-chart.js`. |
| `gap-chart.svg` | Static image export, identical look. Works anywhere an image works. |
| `gap-chart.png` | Transparent @2x PNG export (2400px wide). |
| `demo.html` | Local test page: several container widths + a gray-card background. |

## Using it in Webflow

1. In the blog post (or template), add an **Embed** element where the chart
   should go.
2. Paste the entire contents of `gap-chart-embed.html`.
3. Publish. The chart fills the width of whatever container it sits in.

Notes for a clean integration:

- **Typography is inherited.** The SVG text uses the page's font
  automatically, so it matches the blog's type out of the box.
- **Background is transparent.** It sits on white, a light-gray card, or any
  light section as-is. (It's designed for light backgrounds — see
  customization to recolor for dark.)
- Multiple embeds on one page are fine — the script guards itself and each
  instance renders independently.
- Rich-text limitation: Webflow doesn't allow Embeds inside a Rich Text
  block bound to a CMS field. Either split the post around it in the
  template, or use the image fallback below inside rich text.

### Using it as a plain image

Upload `gap-chart.svg` (or `gap-chart.png`) to Webflow Assets and place it
with a normal Image element. Same visuals, no interactivity. This is also
the graceful-degradation path: if you want a no-JS fallback inside the
embed, add the image inside the element —

```html
<gap-chart>
  <img src="https://your-site.webflow.io/assets/gap-chart.svg"
       alt="The widening gap between what models can do and what businesses actually use"
       style="width:100%">
</gap-chart>
```

Browsers show the image only if the script never runs; otherwise the live
chart replaces it.

## What it does

- **Interactivity** — hovering the dark line, the blue line, or the shaded
  gap (or their labels) highlights that element and quiets the rest; moving
  away restores. On touch, a tap pins the highlight and tapping elsewhere
  clears it. Transitions respect `prefers-reduced-motion`.
- **Responsive** — redraws to its container via `ResizeObserver`. Wide
  containers get the editorial 5:2 look; narrow ones get taller proportions.
  Below ~620px the two floating line labels (which no longer fit inside the
  wedge) become swatch-keyed rows in the top-left whitespace; the gap
  annotation stays inside the shaded area. Fonts stay ≥12px at every size.
- **Accessible** — the SVG carries `role="img"` and a full `aria-label`
  (override via the `alt` attribute); hover emphasis is decorative only, so
  nothing is gated behind it. Series identity is carried by position and
  direct labels, not color alone (line colors also differ strongly in
  lightness: ΔE ≥ 47 under all color-vision-deficiency simulations).

## Customization

Everything is optional; defaults reproduce the original graphic.

**Attributes** (edit text without touching code):

```html
<!-- today: marker position, 0–1 across the x-axis
     curve: exponential steepness
     ratio: force one height/width ratio at all sizes (default adapts)
     alt:   screen-reader description -->
<gap-chart
  label-top="What models can do"
  label-bottom="What businesses actually use"
  label-gap="The gap"
  label-gap-sub="is our opportunity"
  tick-start="2023" tick-today="Today" tick-end="2030"
  today="0.42" curve="2.4" ratio="0.4" alt="…">
</gap-chart>
```

**Colors** (CSS custom properties, e.g. in Webflow page/site custom code):

```css
gap-chart {
  --gap-chart-ink: #101a33;    /* exponential line, headline labels */
  --gap-chart-accent: #2e63e8; /* linear line, its label, gap fill */
  --gap-chart-muted: #5c6470;  /* secondary text, ticks */
  --gap-chart-axis: #e4e8ef;   /* baseline */
  --gap-chart-dash: #a9b2c2;   /* “Today” dashed marker */
}
```

After editing `gap-chart.js`, run `node webflow/build-embed.js` and re-paste
the refreshed `gap-chart-embed.html` (it prints the char count so you can
confirm it's still under Webflow's 10,000-character embed limit).
