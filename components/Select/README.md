# Select

Pop-up list on React Aria's Select, styled like Input; use for delivery slot, size, sort order. The trigger is a button that opens a listbox: ↑/↓ or typing a letter move, Enter/Space choose, Esc closes and focus returns to the trigger. `onChange` still gets an event with the value on `event.target.value`; `name` keeps a hidden native select for forms and autofill.

```jsx
<Select label="Delivery window" options={['9–12', '12–15', '15–18']} />
```

Same field pattern as Input: a visible label naming the trigger, hint/error in `#{id}-hint` linked by `aria-describedby`; `error` marks the field invalid (`data-invalid`, danger border) and links the message; a form's "focus the first invalid field" should include `[data-invalid] > [aria-haspopup="listbox"]` (see `templates/_shared/page-focus.js`).

> Changed in 0.2: the native `<select>` became a React Aria pop-up. Its width no longer follows the longest option, so give its container a width.

## Usage

**Use when:** Choosing from 6+ known options: city, province, card bank.

**Don’t use when:** Don’t use for 2–5 options (ChoiceGroup / Radio), or for searching long lists.
