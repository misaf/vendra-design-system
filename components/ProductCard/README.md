# ProductCard

Catalogue tile: 4:5 arch-framed image, serif name, muted subtitle, price. Use in grids of 3–4. The name is the link (`href`) or, with only `onClick`, a React Aria button.

```jsx
<ProductCard
  name="Wild Meadow"
  subtitle="Seasonal · 15 stems"
  price="$68"
  badge="New"
  onFavorite={fav}
/>
```

`frame="soft"` for dense grids; pass pre-formatted, localized price strings.

Pass `href` (product URL): the name becomes `<a href>` stretched over the card; `onClick` goes on that link (never preventDefault-ed inside). `linkLabel` defaults to `name — price`, or `name — code — price` when an optional `code` is supplied. Without href, `onClick` renders a real `<button>`. Favourite stays clickable above the link; focus ring covers the card (8px radius).

Pass `code` for designs with a stable reference: the name becomes a compact body-face heading,
category/subtitle and an isolated left-to-right code share a wrapping row, and the price gets stronger weight.
Use the actual product description as `name`; keep routing and order identity on the code.

## Usage

**Use when:** Product grids, related products and Carousel rows. Sold out: `badge` + `badgeTone="neutral"`. Loading: `<Skeleton shape="card"/>` at the same size.

**Don’t use when:** Don’t use for bag rows (LineItem) or editorial images (ArchFrame).
