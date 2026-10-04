Photo tile linking to a product category (Bouquets, Flower boxes, Wedding car…); use in "Shop by category" grids of 4–6 across.
```jsx
<CategoryCard label="Flower boxes" count="8 designs" image="assets/placeholder.svg" onClick={open} />
```
Image zooms gently on hover; the arrow mirrors in RTL.

`href` renders `<a>` (navigation — preferred); without it a `<button>`.

## Usage
**Use when:** Top-level shop categories on Home and the shop landing.

**Don’t use when:** Don’t use for individual products, filters (Tag), or more than ~8 items in a row.
