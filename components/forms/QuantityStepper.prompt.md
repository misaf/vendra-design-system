Pill − / value / + control for quantities in product page and bag.
```jsx
<QuantityStepper defaultValue={1} onChange={setQty} />
<QuantityStepper size="sm" format={n=>n.toLocaleString('fa-IR')} />
```

## Usage
**Use when:** Quantity in the bag and on product detail. `disabled` while an update saves.

**Don’t use when:** Don’t use for values above ~20 or non-integer amounts (Input).
