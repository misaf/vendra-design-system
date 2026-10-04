Checkout progress: numbered 26px dots — done = ink + check, current = ink + number, upcoming = outline. Wraps on mobile.
```jsx
<Stepper label="Checkout" steps={[{label:'Bag'},{label:'Delivery'},{label:'Payment'}]} current={1} onStepClick={go} formatNumber={n=>n.toLocaleString('fa-IR')} />
```
On phones use `compact`: circles only (labels stay for screen readers) plus an aria-hidden caption row. Circles keep a 44px target.
```jsx
<Stepper compact label="پرداخت" steps={[{label:'سبد'},{label:'زمان و کارت'},{label:'تأیید'}]} current={1} formatNumber={n=>n.toLocaleString('fa-IR')} captionFormat={(n,t,l)=>`مرحله ${n} از ${t} · ${l}`} />
```

## Usage
**Use when:** Checkout progress (Delivery → Details → Payment).

**Don’t use when:** Don’t use for order delivery status (OrderTimeline) or more than five steps.
