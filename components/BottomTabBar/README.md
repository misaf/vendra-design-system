# BottomTabBar

Mobile tab bar (4 items). Fix it to the bottom yourself; it adds safe-area padding.

```jsx
<BottomTabBar
  label="Main"
  items={[
    {id: 'home', icon: 'house', label: 'Home', current: true},
    {id: 'shop', icon: 'flower-2', label: 'Shop'},
    {id: 'saved', icon: 'heart', label: 'Saved'},
    {id: 'bag', icon: 'shopping-bag', label: 'Bag', count: 2}
  ]}
/>
```

Items take `href` / `target` (e.g. WhatsApp with `_blank`) and render `<a>`, keeping `aria-current="page"`.

## Usage

**Use when:** Primary mobile navigation, 4–5 destinations.

**Don’t use when:** Don’t use on desktop, for actions, or with more than five items.
