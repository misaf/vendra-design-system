# Radio

Round radio on React Aria, always inside a `RadioGroup` (which holds the value, `name`, keyboard, hint and error). Use for payment or delivery method.

```jsx
<RadioGroup legend="Bouquet size" name="size" defaultValue="m">
  <Radio value="s" label="Small" description="7–9 stems" />
  <Radio value="m" label="Medium" description="12–15 stems" />
</RadioGroup>
```

Screen readers name the radio by `label` alone and read `description` after it as its description.

> Changed in 0.2: Radio no longer takes `name`, `checked`, `onChange` or `hint`/`error`; those move to RadioGroup. A Radio outside a RadioGroup still renders, in a group of its own.

## Usage

**Use when:** One-of-many choices in a vertical list with descriptions.

**Don’t use when:** Don’t use for 2–4 short options better shown as tiles (ChoiceGroup) or long lists (Select).
