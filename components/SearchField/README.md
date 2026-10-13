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
- The clear button is out of the tab order, like React Aria's: keyboard users press Esc. Its name is "Clear search" («پاک کردن جستجو») unless `clearLabel` says otherwise.
- `onClear` runs after the clear button or Esc empties the field, before focus returns to the input.
- Results that update as you type need a polite status line ("4 results") so screen readers hear the change.

## Usage

**Use when:** Searching or filtering a list by text: the shop search, the journal, an order list.

**Don’t use when:** Don’t use for other free text (Input), or for picking one of a known set of options (Select).
