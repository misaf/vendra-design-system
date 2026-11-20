# ToastRegion

Where a page's toasts appear: React Aria's toast region, fixed at the bottom inline-end corner. It is a landmark (F6 reaches it), each toast is an alertdialog announced as it appears, and timers pause while the pointer or focus is on it (WCAG 2.2.1).

```jsx
const toasts = new ToastQueue({maxVisibleToasts: 1});
toasts.add({title: 'Code copied'}, {timeout: 10000});
toasts.add({title: 'Saved to your list', action: {label: 'View saved', href: '?view=saved'}});

<ToastRegion queue={toasts} closeLabel="Dismiss" className="my-toasts" />
```

## Timing (WCAG 2.2.1)

Hover and focus pause a toast's timer, but touch screen-reader users (VoiceOver, TalkBack) can't hover and rarely reach the region within a few seconds. So ToastQueue enforces two rules:

- **A toast with an `action` (Undo, View bag) never closes on its own.** Any `timeout` is ignored; it stays until the action is used, the toast is dismissed, or the page replaces it (`clear()`).
- **A timed toast without an action stays at least 10 s** (`TOAST_MIN_TIMEOUT`); a shorter `timeout` is raised to it. Leave `timeout` out to keep it until it is dismissed.

Place it with `className` (for example `inset-block-end: calc(var(--vf-bottom-bar) + 12px)` above a sticky mobile bar). Each toast renders with Toast.

## Usage

**Use when:** Short confirmations after an action: saved, copied, added.

**Don’t use when:** Don’t use for errors that need action (Alert), or for content people must read before going on (Dialog).
