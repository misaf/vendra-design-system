# FilterBar

The filters that are on, above a product grid: each is a filled chip with an ×, and "Clear all" ends the row.

```jsx
<FilterBar
  filters={[
    {id: 'occasion', label: 'Anniversary', onRemove: () => setOccasion('all')},
    {id: 'stock', label: 'In stock', onRemove: () => setStock(false)}
  ]}
  onClearAll={clearFilters}
/>
```

- Each filter is a button named "Remove Anniversary" («حذف سالگرد»), not a toggle: pressing it removes the filter. The group is "Active filters" and the last button "Clear all"; all three come from `messages.js` (`FilterBar`), or pass `label` and `clearAllLabel`.
- After a removal, focus moves to the filter now in its place, or the one before, or "Clear all". When the last filter goes, or on "Clear all", the bar disappears: move focus yourself, as the shop does to its result count.
- It renders nothing when `filters` is empty, so it can sit in the layout unconditionally.
- The filters themselves (occasion chips, price range, delivery date) stay where they are set: Chip, RangeSlider, Select, Switch.

## Usage

**Use when:** Above results that filters narrow (shop, search), so customers see and undo what is on.

**Don’t use when:** Don’t use to pick filters (Chip) or for page-level tabs (Tabs).
