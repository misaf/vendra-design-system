# Tooltip

Small ink hint for icon buttons and care symbols, on React Aria's TooltipTrigger. It shows on hover (after 300ms) and keyboard focus, is linked to its trigger with `aria-describedby` while shown, and Esc dismisses it. React Aria ignores touch, so a tap on the trigger toggles it and a tap elsewhere hides it. Wrap a single focusable element: a React Aria button (Button, IconButton) or a native one (it is wrapped in `Focusable`).

> Changed in 0.2: the bubble renders in a portal only while shown, so the trigger is described only then.

```jsx
<Tooltip content="Save to favourites">
  <IconButton icon="heart" label="Save" />
</Tooltip>
```

## Usage

**Use when:** Short supplementary hints on icon-only controls.

**Don’t use when:** Don’t put essential information or interactive content in a tooltip — touch users rarely see it.
