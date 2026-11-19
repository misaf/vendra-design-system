# Breadcrumb

Where a page sits in the site, on React Aria's Breadcrumbs: a labelled `<nav>` around an ordered list of links. The last item is the current page: it is marked `aria-current="page"` and isn't a link. The chevrons between items are decorative and mirror in RTL.

```jsx
<Breadcrumb
  items={[
    {label: 'Shop', href: '/shop'},
    {label: 'Bouquets', href: '/shop?cat=bouquets'},
    {label: 'Morning Peony'}
  ]}
/>
```

- `label` names the nav ("Breadcrumb" or «مسیر صفحه» by default). Give it the page's own word when there is one.
- `onClick` on an item handles in-place navigation; keep `href` so the link still works without JavaScript and opens in a new tab.
- Long current-page titles are cut with an ellipsis on one line; the links before them wrap.

## Usage

**Use when:** A page that sits deep in a hierarchy: a product inside a category, a journal post inside a topic.

**Don’t use when:** Don’t use for steps in a flow (Stepper), or on top-level pages where the header already shows where you are.
