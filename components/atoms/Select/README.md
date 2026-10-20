# Select

Pop-up list on React Aria's Select, styled like Input; use for delivery slot, size, sort order. The trigger is a button that opens a listbox: ↑/↓ or typing a letter move, Enter/Space choose, Esc closes and focus returns to the trigger. `onChange` gets the chosen value; `name` keeps a hidden native select for forms and autofill.

```jsx
<Select label="Delivery window" options={['9–12', '12–15', '15–18']} />
```

Same field pattern as Input: a visible label naming the trigger, hint/error in `#{id}-hint` linked by `aria-describedby`; `error` marks the field invalid (`data-invalid`, danger border) and links the message; a form's "focus the first invalid field" should include `[data-invalid] > [aria-haspopup="listbox"]` (see `templates/_shared/page-focus.js`).


## Usage

**Use when:** Choosing from 6+ known options: city, province, card bank.

**Don’t use when:** Don’t use for 2–5 options (ChoiceGroup / Radio), or for searching long lists.
