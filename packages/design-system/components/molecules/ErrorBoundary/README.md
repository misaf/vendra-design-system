# ErrorBoundary

Keeps one part of a page from blanking the whole page. When something inside fails while rendering (a bad record from the API, a third-party map), that part becomes a short note with **Try again**, and the rest of the page carries on.

```jsx
<ErrorBoundary onError={reportError} resetKey={product.id}>
  <RecentlyViewed items={recent} />
</ErrorBoundary>
```

- The note is a neutral Alert (`role="status"`): announced politely, because the page around it still works. Its wording, "This part of the page didn’t load." and "Try again" («این بخش از صفحه بارگذاری نشد.»، «تلاش دوباره»), comes from `messages.js`, in the page's language; `title` and `retryLabel` change it.
- **Try again** renders the part afresh. `resetKey` does the same when it changes, so moving to another product or route clears an old failure.
- `onError(error, info)` reports it (your error log); without it the error goes to `console.error`. `fallback` replaces the note with your own element, or a function given `{error, retry}`.
- It catches errors while rendering, not in event handlers or async code (a failed fetch): handle those where they happen and show an Alert.
- Wrap secondary parts (recently viewed, recommendations, maps, reviews), not the whole page: a page that can't render needs the app's page-level error screen.

## Usage

**Use when:** A part of the page depends on data or code the rest doesn't need.

**Don’t use when:** Don’t wrap the page's main content (the app's page error screen covers that), or use it for a failed request (an Alert where the request was made).
