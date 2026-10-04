Order progress for the order page. Map the API order status to a step index yourself (received 0 · arranging 1 · ready 2 · on its way 3 · delivered 4); the maintained storefront maps statuses in `templates/storefront-track/logic.js` (cancelled/refunded → show an Alert instead).
```jsx
<OrderTimeline label="Order progress" current={2} status="active" doneLabel="done"
  steps={[{label:'Order received',time:'09:12'},{label:'Being arranged',time:'10:05'},{label:'Ready — photo sent'},{label:'On its way'},{label:'Delivered'}]}/>
```
- `<ol>`; the current step has `aria-current="step"`; completed steps carry a visually hidden "done".
- `status="done"` fills every dot; `status="cancelled"` renders nothing — show an `Alert tone="danger"` instead.
- Times arrive pre-localized (Persian digits for fa).

## Usage
**Use when:** Delivery progress on the order page.

**Don’t use when:** Don’t use for checkout steps (Stepper) or cancelled orders (show an Alert instead).
