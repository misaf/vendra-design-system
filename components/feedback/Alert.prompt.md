Inline, persistent message with a soft tone fill (no side stripe). error/warning announce as role="alert", others as role="status". Message wraps; the action stays on one line.
```jsx
<Alert tone="error" title="We couldn't load the shop" action={<Button size="sm" variant="secondary">Try again</Button>}>Check your connection.</Alert>
```

## Usage
**Use when:** Inline messages tied to a section: payment failed, cancelled order, delivery notes. `error` for failures with a way forward in `action`.

**Don’t use when:** Don’t use for transient confirmations (Toast) or whole-page empties (EmptyState).
