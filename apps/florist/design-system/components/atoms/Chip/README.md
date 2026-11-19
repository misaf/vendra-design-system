# Chip

Outlined pill chip for filters (occasion, colour, flower type); toggles to ink fill when selected. It is React Aria's ToggleButton (`aria-pressed` from `selected`) and takes `onClick` and the usual button props.

```jsx
<Chip selected onClick={toggle}>Dried</Chip>
```

## Usage

**Use when:** Selectable filters (shop filters, occasion picks). The filters that are on, removable, go in FilterBar.

**Don’t use when:** Don’t use for status (Badge) or for a single choice among options (ChoiceGroup).
