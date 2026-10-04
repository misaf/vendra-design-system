Catalogue tile: 4:5 arch-framed image, serif name, muted subtitle, price. Use in grids of 3–4.
```jsx
<ProductCard name="Wild Meadow" subtitle="Seasonal · 15 stems" price="$68" badge="New" onFavorite={fav} />
```
`frame="soft"` for dense grids; pass pre-formatted, localized price strings.

Pass `href` (product URL): the name becomes `<a href>` stretched over the card; `onClick` goes on that link (never preventDefault-ed inside). `linkLabel` defaults to `name — price`. Without href, `onClick` renders a real `<button>`. Favourite stays clickable above the link; focus ring covers the card (8px radius).

## Usage
**Use when:** Product grids, related products and SnapScroller rows. Sold out: `badge` + `badgeTone="neutral"`. Loading: `<Skeleton shape="card"/>` at the same size.

**Don’t use when:** Don’t use for bag rows (LineItem) or editorial images (ArchFrame).
