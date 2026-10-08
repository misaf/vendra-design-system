# Toast

Dark ink notification for transient confirmations ("Added to your bag"). Position it yourself (bottom inline-end, z-index var(--z-toast)).

```jsx
<Toast title="Added to your bag" message="Wild Meadow · Medium" onClose={hide} />
```

`action={{label:'View bag', href}}` adds a small ghost button. The toast itself is never the click target. Pair with a LiveRegion so the message is announced.

## Usage

**Use when:** Brief confirmation after an action: added to bag, reminder saved. Offer Undo where possible.

**Don’t use when:** Don’t use for errors that need fixing (Alert / field error) or anything the user must read.
