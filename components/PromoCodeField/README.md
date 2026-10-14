# PromoCodeField

A discount code: a field with Apply inside its end. Once the app accepts the code, the field gives way to a line saying what it does ("ROSES15 · 15% off") with Remove.

```jsx
const [error, setError] = useState();
<PromoCodeField
  onApply={code => {
    const check = commerce.promoCheck(code, subtotal, promos);
    if ('error' in check) setError(check.error === 'min' ? needsMin(check.min) : unknown);
    else applyCode(check.promo.code);
  }}
  onChange={() => setError(undefined)}
  error={error}
  applied={bag.promo && promoStatus}
  onRemove={() => applyCode('')}
/>;
```

- The app checks the code (`commerce.promoCheck` for the sample rules, or the server; set `busy` meanwhile) and says why it was refused in `error`. `onApply` gets the code trimmed, and only when there is one.
- It has no `<form>` of its own, so it can sit inside a checkout form: Enter in the field applies the code without submitting the outer form.
- Focus follows what happened: back to the field when a code is refused or removed, to Remove once one is applied. The applied line is a `role="status"`, so screen readers hear it.
- The field is left-to-right in Persian too (codes are Latin), with no autocomplete, spell check or autocorrect.
- Built-in wording: "Promo code", "Apply", "Remove code" («کد تخفیف»، «اعمال»، «حذف کد») from `messages.js`; `label`, `applyLabel` and `removeLabel` change them.
- Without `value` the field keeps what was typed itself.

## Usage

**Use when:** The bag or checkout takes discount codes.

**Don’t use when:** Don’t use for gift cards or store credit paid with the order (a payment method), or for a code the customer can't type (a link that applies it).
