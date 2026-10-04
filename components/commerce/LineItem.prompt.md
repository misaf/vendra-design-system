Bag / order-summary row with an arch thumbnail. sizes is set to the thumb width automatically.
```jsx
<LineItem image={p.image} name="Lavender Whisper" meta="Classic" price="2,400,000 Toman" quantity={1} onQuantityChange={setQty} onRemove={remove} />
<LineItem size="sm" image={p.image} name="Lavender Whisper" price="2,400,000 Toman" quantity={2} />
```

## Usage
**Use when:** Bag rows (lg, editable) and order summaries (sm, read-only). Set `unavailable` when a product is sold out or discontinued; `busy` while a quantity change saves.

**Don’t use when:** Don’t use for product browsing (ProductCard) or wishlist grids.
