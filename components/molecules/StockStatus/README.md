# StockStatus

A product's availability as an icon and a short line, from the API's own fields through `commerce.stockStatus(product)`:

| `stock.status` | When (API `Product`) | English | Persian |
| --- | --- | --- | --- |
| `in` | `inStock`, above `stockThreshold` (or no threshold) | In stock | موجود |
| `low` | `inStock`, `quantity` ≤ `stockThreshold` | Only 2 left | فقط ۲ عدد مانده |
| `soon` | not `inStock`, `availableSoon` | Back on 12 October (or Back soon) | موجود از ۲۰ مهر |
| `out` | not `inStock` | Sold out | ناموجود |

```jsx
const stock = commerce.stockStatus(apiProduct); // productFromApi also sets product.stock

<StockStatus stock={stock} />
<ProductCard name="VF-9FA2KE" price="2,200,000 Toman" stock={stock} />
```

- Only the icon takes the status colour (success, warning, info, muted); the words stay in the text colour, so they meet contrast on any tenant surface. Sold out is muted throughout.
- The date follows the page's language: Shamsi day and month in Persian, Gregorian in English. Counts use Persian digits under `fa`.
- `hideInStock` renders nothing for a product in stock. ProductCard uses it, so a grid only calls out the products that need attention.
- It isn't a live region. When stock changes while the page is open (another tab took the last one), say so in the page's status line too.

## Usage

**Use when:** Product pages and product cards, wherever a customer decides whether to buy.

**Don’t use when:** Don’t use for delivery days that are full (ChoiceTile's own sold-out state), or for an order's progress (OrderTimeline).
