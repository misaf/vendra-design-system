# RadioGroup

A list of Radios on React Aria's RadioGroup: one Tab stop, arrow keys move and select, mirrored in RTL (it follows the page's `lang`). Each Radio is a real radio input inside its label, so click the label in tests, as people do.

```jsx
<RadioGroup legend="Payment method" name="method" value={method} onChange={setMethod}>
  <Radio value="card" label="Card-to-card transfer" />
  <Radio value="cod" label="Pay on delivery" description="Karaj only" disabled />
</RadioGroup>
```

`legend` renders `<fieldset><legend>` (the legend labels the radiogroup); otherwise pass `label` or `labelledBy`. `hint` / `error` sit under the radios and are linked to the group (`aria-describedby`, `aria-invalid`, `aria-errormessage`). `onChange` gets the chosen value, not an event.

## Usage

**Use when:** One-of-many choices in a vertical list with descriptions: payment or delivery method.

**Don’t use when:** Don’t use for 2–4 short options better shown as tiles (ChoiceGroup) or long lists (Select).
