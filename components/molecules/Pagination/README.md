# Pagination

Numbered pages for a list split across pages, in a labelled `<nav>`: previous, the page numbers with `…` for gaps, next. The current page is filled and marked `aria-current="page"`. Numbers follow the page's language (Persian digits under `lang="fa"`), and the arrows mirror in RTL.

```jsx
// Links: every page has a URL (works without JavaScript; crawlers reach every page).
<Pagination page={page} pageCount={pageCount} href={number => `?page=${number}`} />

// In place: buttons that change the page.
<Pagination page={page} pageCount={pageCount} onChange={setPage} />
```

- `pageCount` comes from the API's total and `itemsPerPage` (`Math.ceil(total / itemsPerPage)`). Nothing renders for a single page.
- With both `href` and `onChange`, pages are real links and a plain click changes the page in place.
- After changing the page in place, move focus to the top of the list (or its heading) and scroll there. The component doesn't know where the list is.
- `siblings` sets how many pages show either side of the current one (default 1). `paginationRange(page, pageCount, siblings)` returns the same numbers for a custom layout.

## Usage

**Use when:** Lists people come back to or link to a place in: journal archives, order history.

**Don’t use when:** Don’t use for browsing products where people scroll on (LoadMore), or for steps in a flow (Stepper).
