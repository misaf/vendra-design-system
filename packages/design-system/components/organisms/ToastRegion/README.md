# ToastRegion

Where a page's toasts appear: React Aria's toast region, fixed at the bottom inline-end corner. It is a landmark (F6 reaches it), each toast is an alertdialog announced as it appears, and timers pause while the pointer or focus is on it (WCAG 2.2.1).

```jsx
const toasts = new ToastQueue({maxVisibleToasts: 1});
toasts.add({title: 'Saved to your list', action: {label: 'View saved', href: '?view=saved'}}, {timeout: 6000});

<ToastRegion queue={toasts} closeLabel="Dismiss" className="my-toasts" />
```

Place it with `className` (for example `inset-block-end: calc(var(--vf-bottom-bar) + 12px)` above a sticky mobile bar). Each toast renders with Toast.

## Usage

**Use when:** Short confirmations after an action: saved, copied, added.

**Don’t use when:** Don’t use for errors that need action (Alert), or for content people must read before going on (Dialog).
