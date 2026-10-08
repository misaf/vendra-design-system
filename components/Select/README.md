# Select

Native select styled like Input; use for delivery slot, size, sort order.

```jsx
<Select label="Delivery window" options={['9–12', '12–15', '15–18']} />
```

Same field pattern as Input: label text only in `<label>`, hint/error in `#{id}-hint` linked by `aria-describedby`; `error` adds `aria-invalid` + `aria-errormessage`.

## Usage

**Use when:** Choosing from 6+ known options: city, province, card bank.

**Don’t use when:** Don’t use for 2–5 options (ChoiceGroup / Radio), or for searching long lists.
