# Spinner

A spinning ring in the current text colour, for a wait of unknown length. On its own it is a polite status (`role="status"`) that announces its `label` ("Loading" or «در حال بارگذاری» by default). Button's `loading` uses it as a decorative ring.

```jsx
<Spinner label="Loading delivery times" />

<span style={{color: 'var(--text-accent)'}}>
  <Spinner size={16} decorative />
</span>
```

- It inherits `color`, so it matches the text or button it sits in.
- With reduced motion it turns slowly instead of stopping, so it still reads as busy.
- `decorative` hides it from screen readers. Use it only when something else announces the wait, such as a status line or Button's `loadingLabel`.

## Usage

**Use when:** Waiting less than a few seconds for something with no known length: a button's action, a short fetch inside a panel.

**Don’t use when:** Don’t use for content that is about to appear in a known layout (Skeleton), or for a quantity against a target (Meter).
