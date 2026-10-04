Labelled text field; use for checkout, search, and gift-card notes (`multiline`).
```jsx
<Input label="Recipient name" placeholder="e.g. Shirin" />
<Input label="Card message" multiline hint="Up to 200 characters" />
```

Markup: `.ag-field` → `<label for>` (label text only) → control → `<span id="{id}-hint">`. Hint/error → `aria-describedby`; error adds `aria-invalid` + `aria-errormessage`. On failed submit, focus the first `[aria-invalid=true]`.

## Usage
**Use when:** Text, phone, email and message fields. `error` with the fix in plain words; `disabled` only for values the user can’t change here.

**Don’t use when:** Don’t use placeholder text as the label, or for choices from a known list (Select / ChoiceGroup).
