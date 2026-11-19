# Meter

How far a value is towards a target (`role="meter"`, with the value as `aria-valuetext`). It isn’t built on React Aria’s Meter, whose `meter progressbar` role fails axe. The label says what it measures, the value text sits beside it, and a thin bar shows the share. `done` turns the fill to the success colour once the target is reached.

```jsx
<Meter
  label={left > 0 ? `${format.money(left)} more for free delivery` : 'Free delivery in Karaj'}
  value={subtotal}
  maxValue={threshold}
  valueLabel={`${format.money(subtotal)} of ${format.money(threshold)}`}
  done={left <= 0}
/>
```

- Without `valueLabel` the value reads as a percentage in the page's language (Persian digits under `lang="fa"`).
- The value is clamped to the range, so a subtotal past the target shows a full bar.
- It doesn't announce changes. If the change matters right away, say it in a status line as well.
- Without a visible `label`, name it with `aria-label`.

## Usage

**Use when:** A quantity against a known target: spend left before free delivery, a balance towards a discount, characters left in a card message.

**Don’t use when:** Don’t use for a task in progress (Spinner, or LoadMore's bar for paging), or for steps in a flow (Stepper).
