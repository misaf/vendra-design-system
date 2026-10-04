Label / value details: order details (address · zone, day · slot, recipient, card, card-to-card reference) and confirmation rows. Put it in a `Card variant="sunken"`.
```jsx
<Card variant="sunken" padding={20}><DetailList rows={[
  {icon:'map-pin',label:'Deliver to',value:'Niavaran, Bahonar St., No. 8 · Tehran'},
  {icon:'clock',label:'Delivery',value:'Tuesday, 29 September 2026 · 16–20'},
  {icon:'receipt',label:'Transfer reference',value:<span dir="ltr">482913</span>}]}/></Card>
```
- `<dl>` → `<div>` → `<dt>` (icon + label) / `<dd>`. Icons are `aria-hidden`, `--text-accent`.
- Values wrap with `overflow-wrap:anywhere`; wrap phone numbers and references in `dir="ltr"`.
- Falsy rows are skipped, so optional rows can be written inline (`o.msg && {…}`).

## Usage
**Use when:** Label/value facts: order details, studio info, delivery info.

**Don’t use when:** Don’t use for editable fields (Input) or long prose.
