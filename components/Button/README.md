# Button

Pill-shaped action button; use primary for the one main action per view (Add to bag, Checkout).

```jsx
<Button iconEnd="arrow-right">Shop the collection</Button>
<Button variant="secondary" size="sm">Details</Button>
```

Variants: primary · secondary · soft · ghost. Sizes: sm 36 / md 46 / lg 56px. `block` for full-width.

`href` (+ `target`, `rel`) renders `<a>` for navigation ("Shop now", "View all"); without it, a `<button>` for actions. Disabled links drop the href and get `aria-disabled`.

## Usage

**Use when:** One `primary` per view for the main action; `secondary`/`soft`/`ghost` for the rest. `loading` while a request runs (keep the label; add `loadingLabel`). `disabled` only when the reason is visible nearby.

**Don’t use when:** Don’t use for navigation-heavy lists (NavLink, MenuList) or icon-only actions (IconButton). Don’t disable a submit button to hide validation — show the errors instead.
