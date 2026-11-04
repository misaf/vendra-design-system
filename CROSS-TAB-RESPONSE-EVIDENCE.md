# Two-tab customer identity and checkout response ownership — stage 242

Reviewed 2026-11-04 against stage-241 `f90bc7406849195282f1e8dccabe99bbfd77831e`.
This fills the specific shared-origin identity-switch/pending-response coverage gap from the
[state audit](STATE-INTEGRITY-ACCEPTANCE.md). The existing runtime passes the new controls; no
application correction is needed for this tested path. Broader concurrency acceptance remains open.

## Actual two-tab scenario

Example: customer A submits a cash-on-delivery checkout in tab one. Its real checkout-adapter POST
is intercepted and held. Tab two signs A out and signs customer B in through the existing local
demo account UI. Tab one receives native storage events, switches to B, clears A's private delivery
fields, and allows B to edit the recipient/address. Releasing A's old response must preserve B's
current state. On success, the local order belongs to A and is available when A returns and reloads;
on failure, neither customer gets a completed order.

[customer-state-integrity.spec.mjs](templates/_e2e/customer-state-integrity.spec.mjs) adds success
and failure cases in both languages and default projects (eight new registrations per target):

| Phase | Required observation |
| --- | --- |
| Submit as A | One intercepted checkout POST, pending state true; response remains held. |
| Switch using tab two | Actual sign-out/code-sign-in UI changes shared localStorage. Tab one's customer becomes B; native identity events have expected old/new values and `isTrusted=true`. No synthetic StorageEvent or direct syncCustomer call is used. |
| Edit as B while A waits | Old recipient/address are blank; enter B's own recipient/address and retain a snapshot of B's bag, delivery, payment draft and empty order history. |
| Release success HTTP 200/null | Pending clears; exactly one POST; B's bag/delivery/draft/history stay equal to its newer snapshot, with null order/lastOrder/checkout notice. A's private partition contains exactly one order owned by A, with A's original address. B's main does not display it. |
| Release failure HTTP 503 | Pending clears; B's same private/current state survives; A's partition has no completed order. |
| Switch back to A in tab two | Tab one observes A before any navigation is used to inspect its account. Success order appears in A's account; reloading tab one preserves its order count and original address. Failure retains zero completed orders. |
| Cleanup/evidence | Gates release in finally, secondary tab closes, no page execution errors. A compact JSON attachment records outcome, trusted identity events, request count, owner order IDs and IDs restored after reload. |

Both pages are created within the same real BrowserContext/origin, sharing localStorage while
retaining separate sessionStorage. The submitting page seeds only initial test identity, once;
subsequent changes use the second tab's UI. The controller deliberately navigates to account with
`siteUrl`/goto: the general `openSite('account')` helper would seed a demo phone and invalidate this
identity control. The first tab already observes each identity change before account navigation
or reload; recovery is not obtained by manually forcing synchronization.

The API adapter sends a real browser POST to a task-only intercepted path. HTTP 200/null and 503
are controlled outcomes, not a deployed checkout service. Other requests to that task API are
fulfilled locally. Login accepts the demo code; no SMS or live authentication service is exercised.
Cash-on-delivery avoids a real payment or wallet debit. The order success record is client-owned
local demo data, not proof of server-issued ownership or transaction commit.

## Existing runtime ownership

[Site logic](templates/storefront-site/logic.js) listens for identity-key storage changes and
partitions delivery/payment/order state by customer. Its checkout completion path already stores
a mismatched-owner order in that owner's partition instead of replacing the current customer's
state. Pending request cleanup remains handled by the existing checkout send/finally path.
The new cases exercise these paths across two app instances rather than writing a newer storage
record in a single page. Visitor bag/saved-list state stays outside customer-private partitions in each tab; no cross-tab
cart synchronization is asserted. The checks require B's current bag to survive without changing
the existing per-visitor cart design.

## Verification

| Target | Passed | Failed / skipped / retries | Duration |
| --- | ---: | --- | ---: |
| Darwin dev | 24 | 0 / 0 / 0 | 219.7 s |
| Darwin production | 24 | 0 / 0 / 0 | 161.7 s |
| Linux dev | 24 | 0 / 0 / 0 | 299.4 s |
| Linux production | 24 | 0 / 0 / 0 | 98.9 s |

**96 final cases pass**, including 32 new two-tab executions. Existing runtime handles the tested
ownership path, so only test coverage and documentation change.

Each target runs eight new two-tab cases plus sixteen related existing cases: late same-customer
checkout responses, failed profile/address saves, saved-list hydration and guest/customer switching,
each EN/FA at both widths. The initial exploratory mobile subset also passed four cases; it is not
added to the final totals below. All final suites use one worker, zero retries/skips, snapshot updates
disabled and default non-touch 390×844 / 1280×900 projects. No tablet, touch-phone or TV inference is
made from these browser widths.

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e -- customer-state-integrity.spec.mjs integrity-recovery-followups.spec.mjs --project=mobile --project=desktop --grep 'two-tab|late checkout responses|failed profile and address saves|initial saved-list loading|guest continuation and customer switches' --retries=0 --update-snapshots=none
# Repeat with test:e2e:build for production.
```

Darwin uses installed Chrome; production builds a fresh app. Linux uses the cached AMD64
Playwright 1.64.1 Noble image and a native task volume, with current source plus the tested spec
archive override. Earlier temporary runner/dependency files had been removed, so this stage rebuilds
the runner and uses fresh `npm ci` inside Linux, not Darwin node_modules. The initial missing-runner
attempt runs no Linux test and is not counted as a product/test failure or passing target.

| Target | Success-response cases | Failure-response cases | One POST each | Trusted events / matching restored order IDs |
| --- | ---: | ---: | ---: | ---: |
| Darwin dev | 4 | 4 | 8 / 8 | 8 / 8 |
| Darwin production | 4 | 4 | 8 / 8 | 8 / 8 |
| Linux dev | 4 | 4 | 8 / 8 | 8 / 8 |
| Linux production | 4 | 4 | 8 / 8 | 8 / 8 |

All 32 compact attachments confirm customer B at response completion, one intercepted checkout
POST, trusted identity events and exact owner/restored ID agreement (one on success, none on
failure). Source assertions additionally compare B's full current-state snapshot and visible fields.
These are explicit scoped outcomes, not a general concurrency or backend guarantee.

## Validation and remaining boundary

Root `npm run check`, fresh production app builds, document links, diff and tested-input checks
pass. All 258 snapshot PNGs match the preceding-head source archive. Fresh discovery is 1,798 dev
registrations / 125 files and 1,399 production / 51 files, adding eight default-project cases to each
target without a new file. The task Linux volume is removed; the VM is restored to stopped/3814 MiB.

Only the browser spec and documentation change. No application, generated output, dependency,
public API, snapshot, clock policy, timeout or retry change. The test submitting page uses its
existing advancing installed-clock pattern; the other tab uses its ordinary clock. A fresh root
unit run is not claimed for this test-only addition; prior unit evidence stays separate. Leaflet
source-map warnings remain in logs; this is not a console-clean claim. Broad PR CI is independent.

This verifies one outstanding cash-on-delivery request across an identity switch, successful/failed
acknowledgement and return/reload. It does not verify simultaneous checkouts by B, tab-close/crash
recovery, all saved-list/profile/wallet request races, same-account interleaved localStorage writes,
network-loss ambiguity, server authentication, reservation or exactly-once/idempotent transactions.
The read/change/write limitation from stage 240 remains; these are scoped positive controls, not
proof of general cross-tab transactional safety or an observed lost-update bug.

Next: add the missing numeric promo-removal total assertion from the audit, then address repeated
UI submission/remount and offline-write/reconnect controls. Keep actual service transactions,
physical/AT, visual variants and the historical readiness observations as separate acceptance gates.

Local evidence under `/tmp/vendra-stage242*` contains the exploratory and final reports/logs/results,
compact two-tab attachments, source archive, install/check/discovery and runner/cleanup logs. These
are temporary local artifacts rather than durable remote CI links. The permanent test is the
reproducible contract. No external message, payment or real customer account is used.
