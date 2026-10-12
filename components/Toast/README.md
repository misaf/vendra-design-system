# Toast

Dark ink notification for transient confirmations ("Added to your bag"), on React Aria's Toast. Queue real notifications with ToastQueue and show them with ToastRegion (timers, landmark, stacking); a Toast on its own renders in place, for previews: `role="alertdialog"` labelled by the title and described by the message, with its text in an atomic alert, so it is announced as it appears. It renders in place: position it yourself (bottom inline-end, z-index var(--z-toast)) and decide how long it stays (keep it while the pointer or focus is on it, WCAG 2.2.1).

```jsx
<Toast title="Added to your bag" message="Wild Meadow · Medium" onClose={hide} />
```

`action={{label:'View bag', href}}` adds a small ghost button. The toast itself is never the click target. It announces itself, so don't also send the message to a LiveRegion.

## Usage

**Use when:** Brief confirmation after an action: added to bag, reminder saved. Offer Undo where possible.

**Don’t use when:** Don’t use for errors that need fixing (Alert / field error) or anything the user must read.
