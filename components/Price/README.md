# Price

A price on one line with tabular digits. When it is reduced, the earlier price comes first, struck through and muted.

```jsx
const money = n => format.money(n, {lang, currency, currencies});

<Price value={money(2400000)} />
<Price value={money(490000)} compareAt={money(560000)} />
<Price value={money(unitPrice)} size="lg" />
```

- The app formats both amounts: `format.money` with the tenant's currency and the page's language, so Persian gets Persian digits and «تومان» after the number.
- Screen readers don't announce strikethrough, so a reduced price reads "Was 560,000 Toman Now 490,000 Toman" («قیمت قبلی … قیمت فعلی …»). The words come from `messages.js` (`Price.was`, `Price.now`).
- `size`: `sm`, `md` (1rem) or `lg` (the product page). Without it the size follows the surrounding text, as in LineItem.
- ProductCard (`price`, `compareAt`) and LineItem (`price`) render it; use it directly wherever else a product's price appears.
- The API has no earlier price yet (`templates/API.md` item 28), so the storefront doesn't show reductions until it does.

## Usage

**Use when:** A product's or line's price, wherever a customer compares or decides.

**Don’t use when:** Don’t use for order totals and summary rows (OrderSummary), or for a fee inside a sentence.
