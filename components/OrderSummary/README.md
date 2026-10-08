# OrderSummary

Read-only order lines + totals (order page, confirmation). For editable bag lines use LineItem.

```jsx
<OrderSummary
  title="Your order"
  lines={[
    {
      name: 'Lavender Whisper',
      href: '?view=product&id=lavender-whisper',
      image: src,
      meta: 'Generous · × 1',
      note: '“Happy birthday, Mum”',
      total: '4,100,000 Toman'
    }
  ]}
  sums={[
    {label: 'Subtotal', value: '4,100,000 Toman'},
    {label: 'Delivery', value: '250,000 Toman'},
    {label: 'Total', value: '4,350,000 Toman', strong: true}
  ]}
/>
```

- The name is an `<a href>` only when `href` is given (navigation is always a link).
- All values arrive pre-formatted through `money()`; the note is italic in EN and upright in FA.

## Usage

**Use when:** Totals block in Bag, Checkout and the order page.

**Don’t use when:** Don’t use as a receipt substitute for payment details (PaymentCard).
