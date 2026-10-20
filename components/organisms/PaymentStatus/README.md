# PaymentStatus

The trip to a bank's payment page and back. Iranian card payments leave the store for a Shaparak gateway (Zarinpal, IDPay, a bank's own page) and return to a callback, so the customer passes through up to three screens the store has to get right: on the way out, while the store confirms with the bank, and the answer.

```jsx
// On the way out: the backend's checkout result says where the gateway expects the browser.
<PaymentStatus
  status="redirecting"
  amount={money(order.total)}
  orderNumber={order.number}
  gateway={lang === 'fa' ? 'زرین‌پال' : 'Zarinpal'}
  redirect={{url: payment.url, method: payment.method, fields: payment.fields}}
/>

// Back from the bank: verifying while the store asks its API, then the answer.
<PaymentStatus
  status={status} // 'verifying' → 'paid' | 'cancelled' | 'failed' | 'pending'
  amount={money(order.total)}
  orderNumber={order.number}
  reference={payment.reference}
  onRetry={payAgain}
  onOtherMethod={chooseAnotherMethod}
  onCheckAgain={verifyAgain}
  supportHref={'tel:' + store.phone}
  headingLevel={1}
/>
```

| Status        | Says                                                                                                | Actions                                                                                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `redirecting` | Taking you to the bank; keep this tab open                                                          | **Go to the bank's page** (a real form: POST fields as the gateway expects, or GET). It also submits by itself after `redirectDelay` (1.5 s; `null` waits for the button). |
| `verifying`   | Checking your payment; don't refresh or pay again                                                   | none; a spinner announces the wait                                                                                                                                         |
| `paid`        | Payment received                                                                                    | `children` (usually the page moves on to its order confirmation)                                                                                                           |
| `cancelled`   | Cancelled at the bank, nothing was taken, the bag is kept                                           | Pay again, Choose another method                                                                                                                                           |
| `failed`      | The bank didn't take it; money that left returns within 72 hours                                    | Pay again, Choose another method, Call us                                                                                                                                  |
| `pending`     | Not confirmed yet: **don't pay again**; the order is confirmed or the money returns within 72 hours | Check again, Call us                                                                                                                                                       |

- **Pending is the state that costs money.** The bank took the money but hasn't confirmed it to the store (a timeout, or a callback that never arrived). Customers who see "failed" here pay twice. Use `pending` whenever the store can't tell.
- When the status changes, focus moves to the new heading, so screen readers hear the answer; the first status (a page that just loaded) leaves focus to the page.
- `amount`, `orderNumber` and `reference` (the bank's tracking code) appear under the message. The app formats the amount (`format.money`).
- The wording comes from `messages.js` (`PaymentStatus`) in English and Persian; `{gateway}` is filled with `gateway` or "the bank".
- The storefront's checkout shows the whole trip with a simulated bank: choose **Online card demo** (`VF_STORE.paymentDemo.online` sets the bank's first answer). `templates/API.md` B30 lists what the backend needs for a real gateway.

## Usage

**Use when:** An online payment that leaves for a bank gateway: before leaving, and on the page the gateway returns to.

**Don’t use when:** Don’t use for card-to-card transfers or pay on delivery (nothing leaves the store), or for a form error before payment (Alert).
