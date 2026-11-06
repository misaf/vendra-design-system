# Checkbox

Square checkbox with ink fill; use for add-ons ("Add a vase") and consent.

```jsx
<Checkbox label="Add a handwritten card" defaultChecked />
```

`error` / `hint` render below the box (outside the label), linked with `aria-describedby`; `error` adds `aria-invalid`, `aria-errormessage` and a danger box border.

## Usage

**Use when:** Independent yes/no choices and agreements. `error` for required boxes left unchecked.

**Don’t use when:** Don’t use for settings that apply instantly (Switch) or one-of-many choices (Radio / ChoiceGroup).
