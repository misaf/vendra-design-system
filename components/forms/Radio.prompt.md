Round radio; group by `name`. Use for bouquet size or delivery method.
```jsx
<Radio name="size" value="m" label="Medium" description="12–15 stems" defaultChecked />
```

Single radios take `hint`/`error` like Checkbox; for a group, put the error on ChoiceGroup / the fieldset instead.

## Usage
**Use when:** One-of-many choices in a vertical list with descriptions.

**Don’t use when:** Don’t use for 2–4 short options better shown as tiles (ChoiceGroup) or long lists (Select).
