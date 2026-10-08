# Tooltip

Small ink hint on hover/focus for icon buttons and care symbols. The bubble is linked to its trigger with `aria-describedby`, stays open while the pointer is over it, and Esc dismisses it. Wrap a single element so the description lands on the focusable control.

```jsx
<Tooltip content="Save to favourites">
  <IconButton icon="heart" label="Save" />
</Tooltip>
```

## Usage

**Use when:** Short supplementary hints on icon-only controls.

**Don’t use when:** Don’t put essential information or interactive content in a tooltip — touch users rarely see it.
