# SearchField

A search box on React Aria's SearchField, styled like Input: a search icon, the text, and a clear button that appears once there is text. Esc empties the field, Enter calls `onSubmit(value)`. The input is `type="search"`, so phones show a search key.

```jsx
<SearchField
  label="Search the shop"
  placeholder="Roses, peonies, a gift box…"
  value={query}
  onChange={setQuery}
  onSubmit={runSearch}
/>
```

- Same field pattern as Input: a visible label (or `aria-label`), hint or error in `#{id}-hint` linked by `aria-describedby`.
- The clear button is intentionally out of the tab order, like React Aria's: Tab moves from the input to the next control; keyboard users clear with Esc while the input is focused. Enter submits the current value when `onSubmit` is supplied. Its clear-button name is "Clear search" («پاک کردن جستجو») unless `clearLabel` says otherwise.
- `onClear` runs once for a clear-button activation or nonempty Escape clear; Escape on an empty field does not call it again. Focus remains in the input. Pointer activation focuses the input at press start, before the clear callback; React may commit the value update after the callback.
- Results that update as you type need a polite status line ("4 results") so screen readers hear the change.

Programmatically focusing the `tabIndex=-1` clear button and sending Enter is not the supported
keyboard path: React Aria moves focus to the input at press start, so keyup lands on the input
rather than completing the button press. Keep keyboard clearing on the focused input with Escape.
The component does not override React Aria's button context or add another Tab stop.

## Usage

**Use when:** Searching or filtering a list by text: the shop search, the journal, an order list.

**Don’t use when:** Don’t use for other free text (Input), or for picking one of a known set of options (Select).
