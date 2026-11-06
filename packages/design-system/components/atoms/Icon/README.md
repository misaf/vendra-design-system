# Icon

Renders a Lucide line icon (bundled locally in icon-svgs.js, CSS mask, inherits currentColor); use for every glyph in the UI.

```jsx
<Icon name="flower-2" size={20} />
<Icon name="arrow-right" /> {/* auto-mirrors in RTL */}
```

- `label` makes it meaningful to screen readers.
- Directional icons flip under `dir="rtl"` automatically.
- In forced-colour modes (Windows High Contrast) it ignores `color` and takes the system text colour of its container (`Icon.css`).

## Usage

**Use when:** Lucide icons alongside text, sized 14–22px.

**Don’t use when:** Don’t use as the only label of a control — use IconButton with `label`. Don’t use emoji instead.
