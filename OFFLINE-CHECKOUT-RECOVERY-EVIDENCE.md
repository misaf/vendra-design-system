# Offline checkout and explicit reconnect recovery — stage 245

Reviewed 2026-11-05 against stage-244 `6dc736008a367ef567066ea696b1eb8363ef5eea`.
The [state audit](STATE-INTEGRITY-ACCEPTANCE.md) previously checked offline notice text, without
attempting a checkout write. This stage adds one bilingual browser family to the existing
[customer-state-integrity spec](templates/_e2e/customer-state-integrity.spec.mjs).
The existing application passes; no application, policy, style or baseline change is needed.

## Asserted behavior

Fill valid delivery and select pay on delivery, then configure the real fetch checkout adapter.
Capture bag, delivery, payment draft, customer identity and order/history state before going offline.
Use actual browser-context offline mode. No route intercept exists for the first attempt: the
browser must emit `requestfailed` with `ERR_INTERNET_DISCONNECTED`. Require the localized failure
alert, disabled confirmation, cleared pending flag and exact preservation of the captured state.
No order is created. This exercises a client network failure, rather than replacing checkout with
a rejected stand-in function or supplying an HTTP error response.

Install a controlled response route only after that failure. Reconnect twice, asserting the
localized connection band and advancing the client clock one second after each reconnect. The
failure remains visible, confirmation stays disabled, captured state is unchanged and the request
count remains one. This bounded observation agrees with the source: checkout has no online-event
resend listener or persistent write queue. It does not establish indefinite or background delivery.

Clicking **Try again** only clears failure and enables confirmation; it sends nothing. A separate
confirmation click sends the explicit retry. Hold that HTTP response and require pending/disabled
UI, unchanged state and an identical COD request payload. Release controlled success, then require
one local history order, matching current/last-order IDs and customer ownership, original line
quantities and recipient address, plus a cleared bag and successful localized heading. The settled
page passes axe. Exactly two fetch attempts are observed: one rejected offline, one controlled
successful retry. Only the first fails, and no page errors occur through completion.

Each `offline-checkout-recovery` JSON attachment contains the two request bodies, the browser
failure, two reconnect observations and the sole resulting order ID. The test restores connectivity
and releases the response gate in `finally`, including on assertion failure.

## Verification

| Target | Passed | Failed / skipped / retries | Duration |
| --- | ---: | --- | ---: |
| Darwin dev | 10 | 0 / 0 / 0 | 116.2 s |
| Darwin production | 10 | 0 / 0 / 0 | 82.3 s |
| Linux dev | 10 | 0 / 0 / 0 | 87.2 s |
| Linux production | 10 | 0 / 0 / 0 | 53.1 s |

**40 final cases pass**, including 16 new offline checkout executions. All 16 recovery attachments
have two matching COD request payloads, one `ERR_INTERNET_DISCONNECTED` failure, two reconnects
without replay and one resulting local order ID. Initial mobile EN/FA probes passed before the
explicit error-string assertion was added; they are separate from this matrix.

All 258 baseline PNGs are unchanged. Fresh discovery is 1,804 dev / 125 files and 1,405 production
/ 51 files: four registrations added per target, no new spec file. Tested spec bytes match the
Linux source archive; local document links and diff checks pass. The task Linux volume is removed
and the VM restored to stopped / 3814 MiB.

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e -- customer-state-integrity.spec.mjs features.spec.mjs --project=mobile --project=desktop --grep 'offline checkout|late checkout responses|site says when the connection' --retries=0 --update-snapshots=none
# Repeat with test:e2e:build for production.
node templates/_tests/storefront.test.cjs
```

Each final target selects ten cases: four new EN/FA offline checkout executions, four stage-244
pending/remount regressions and two existing FA connection-band checks. Default mobile is non-touch
390×844; desktop is 1280×900. One worker, zero retries and snapshot updates disabled are used.
Production targets build fresh app previews. Darwin uses installed Chrome. Linux uses the cached
AMD64 Playwright 1.64.1 Noble image, fresh lockfile npm ci, a native task volume and a source archive
with the tested spec override; Darwin native dependencies are not reused.

The focused storefront unit file and root `npm run check` pass. A fresh full root unit or full
browser/visual/device/hydration suite is not claimed. Existing Leaflet source-map warnings remain.
The result does not test a real backend order transaction, payment provider, offline reload,
persistent queue, lost-response ambiguity, service-worker write replay, saved-item/profile/contact
mutations, other payment methods or physical/assistive-technology behavior. The controlled success
uses the sample adapter payload; backend cart, pricing and idempotency guarantees remain separate.

Next: saved-item offline write/reconnect controls. Same-account storage races and actual backend
transaction tests remain separate gates; the checkout test does not close all offline mutation work.

Local `/tmp/vendra-stage245*` logs, JSON, result attachments, source archive and Linux runner/install/
cleanup evidence are temporary artifacts, not durable CI links. The committed test is reproducible.
