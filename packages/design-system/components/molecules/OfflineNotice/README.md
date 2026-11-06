# OfflineNotice

A slim band under the header while the visitor's connection is down, then "You’re back online." for a few seconds. Put it once in the app's layout.

```jsx
<header>…</header>
<OfflineNotice />
<main>…</main>
```

- It follows the browser's `online` and `offline` events. On the server and until the page is interactive it is empty, so it never flashes or breaks hydration.
- The band is a polite live region that stays in the page, empty and with no height while online, so screen readers hear both "You’re offline…" and "You’re back online.".
- Wording: "You’re offline. Pages you’ve opened still show; reconnect to order or send anything." and "You’re back online." in English and Persian from `messages.js`, in the page's language; `offlineText` and `onlineText` change them. `backFor` sets how long the second stays (4 s).
- It only tells the visitor. Forms still say what failed when a request does (an Alert with retry).

## Usage

**Use when:** Once per app, under the header.

**Don’t use when:** Don’t use for a failed request or a server error (an Alert where it happened), or more than once on a page.
