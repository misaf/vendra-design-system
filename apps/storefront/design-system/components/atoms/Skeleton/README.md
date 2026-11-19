# Skeleton

Loading placeholder on --surface-sunken with a soft shimmer (off under reduced motion). Always aria-hidden — put `aria-busy="true"` on the wrapper that is loading.

```jsx
<div aria-busy="true" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:24}}>
  {[1,2,3,4].map(i=><Skeleton key={i} shape="card" />)}
</div>
<Skeleton shape="text" lines={3} />
```

## Usage

**Use when:** Placeholder at the final size while content loads — product cards, line items, text.

**Don’t use when:** Don’t use for actions in flight (Button `loading`) or for waits under ~300ms.
