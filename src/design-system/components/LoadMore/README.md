# LoadMore

"Show more" paging under a long list: "Showing 4 of 6 designs", a progress bar, and a button for the next page. Pair it with `commerce.page(list, page, size)`.

```jsx
const {items, shown, total} = commerce.page(products, page, 12);

<LoadMore
  shown={shown}
  total={total}
  status={`Showing ${shown} of ${total} designs`}
  label="Show more"
  href={`?page=${page + 1}`}
  onClick={event => {
    event.preventDefault();
    setPage(page + 1);
  }}
/>
```

- `href` keeps the next page a real link: it works without JavaScript, can be opened in a new tab, and lets crawlers reach every product.
- When everything is showing, the button goes and only the status stays.
- The status is a polite live region, so screen readers hear the new count. After loading, move focus to the first new item; the component doesn’t know where the list is.

## Usage

**Use when:** Product grids and journal lists that come from a paginated API.

**Don’t use when:** Don’t use for short lists that fit on one page, or for steps in a flow (Stepper).
