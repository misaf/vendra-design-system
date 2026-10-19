# LineItem

Bag / order-summary row with an arch thumbnail. The name is the product code, set in `--font-code`. sizes is set to the thumb width automatically. The remove action is a React Aria button.

```jsx
<LineItem image={p.image} name="VF-8RD5WN" meta="Classic" price="2,400,000 Toman" quantity={1} onQuantityChange={setQty} onRemove={remove} />
<LineItem size="sm" image={p.image} name="VF-8RD5WN" price="2,400,000 Toman" quantity={2} />
```

## Usage

**Use when:** Bag rows (lg, editable) and order summaries (sm, read-only). Set `unavailable` when a product is sold out or discontinued; `busy` while a quantity change saves.

**Don’t use when:** Don’t use for product browsing (ProductCard) or wishlist grids.
