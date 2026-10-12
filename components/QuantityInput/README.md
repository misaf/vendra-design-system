# QuantityInput

Pill − / value / + control for quantities in product page and bag, on React Aria's NumberField. The count is a text field (React Aria leaves out the spinbutton role, which VoiceOver can't focus): people can type a number or use ↑/↓, Home/End; the − and + buttons are for pointers and touch and stay out of the Tab order. Digits follow the page's `lang`.

```jsx
<QuantityInput defaultValue={1} onChange={setQty} labels={{dec: 'Fewer', inc: 'More', value: 'Quantity'}} />
<QuantityInput size="sm" />
```

> Changed in 0.2: `format` is ignored (digits follow the page language) and `labels.value` names the count.

## Usage

**Use when:** Quantity in the bag and on product detail. `disabled` while an update saves.

**Don’t use when:** Don’t use for values above ~20 or non-integer amounts (Input).
