# CategoryCard

Photo tile linking to a product category (Bouquets, Flower boxes, Wedding car…); use in "Shop by category" grids of 4–6 across. With `href` it is a link; otherwise a React Aria button.

```jsx
<CategoryCard
  label="Flower boxes"
  count="8 designs"
  image="assets/placeholder.svg"
  onClick={open}
/>
```

Image zooms gently on hover; the arrow mirrors in RTL. `frame="circle"` makes a small round tile with the name centred under it (no arrow) for a quick row of categories; give it a narrow column (72–120px). The photo is 4:5 by default; `aspect` (a CSS aspect-ratio such as `"1/1"`) makes a shorter tile where the row shouldn't fill the screen.

`href` renders `<a>` (navigation — preferred); without it a `<button>`.

## Usage

**Use when:** Top-level shop categories on Home and the shop landing.

**Don’t use when:** Don’t use for individual products, filters (Chip), or more than ~8 items in a row.
