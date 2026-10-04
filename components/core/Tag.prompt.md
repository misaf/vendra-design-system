Outlined pill chip for filters (occasion, colour, flower type); toggles to ink fill when selected.
```jsx
<Tag selected onClick={toggle}>Dried</Tag>
<Tag onRemove={clear}>Under $60</Tag>
```

## Usage
**Use when:** Selectable filters and removable chips (shop filters, occasion picks).

**Don’t use when:** Don’t use for status (Badge) or for a single choice among options (ChoiceGroup).
