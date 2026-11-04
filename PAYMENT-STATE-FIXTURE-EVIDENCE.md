# Payment state fixture correction — stage 241

Reviewed 2026-11-04 against stage-240 `19a1ab811c9e867354b1b9a2d9918d361d9550a4`.
This closes the specific F01 coverage defect in the [state acceptance audit](STATE-INTEGRITY-ACCEPTANCE.md).
The failed-payment accessibility fixture now reaches and asserts the state it names. Application
behavior, public API and screenshot policy are unchanged; broader acceptance remains incomplete.

## Failing proof before setup correction

Add a failed-payment assertion to the old direct-checkout fixture first. All four Darwin dev
cases (EN/FA × mobile/desktop) fail: expected checkout URL, received `view=bag&step=delivery`.
The existing guard correctly redirects an incomplete checkout; axe had previously scanned delivery
without verifying that it was the intended state. These four failures and traces remain retained.
This is a test setup/coverage correction, not evidence of a broken actual payment-failure flow.

## Correct setup and state assertions

[states.spec.mjs](templates/_e2e/states.spec.mjs) reuses its valid delivery/payment setup:

1. Start at bag delivery, fill recipient/sender/address and map pin, then continue to payment.
2. Select the local online bank demo after setting its existing error-mode route input, as the
   established payment integration test does. Await a full demo-bank return with `payment=return`
   and `result=failed`; do not manufacture an internal payment state or bypass the checkout guard.
3. Before axe, require the checkout route, exact localized failed-payment heading, heading focus,
   and a visible/enabled localized retry button. The pending/unknown-return and completed states
   have different headings and cannot satisfy these assertions.

Only this failed fixture uses an explicit morning via `clock.setSystemTime`; Date continues moving
for map/payment animation and the simulated bank round trip. Other fixtures retain their existing
clock configuration. The bank-return wait uses the existing integration flow's 20-second navigation
budget; global helper/assertion timeouts, retries and capture tolerances remain unchanged. No sleep
is inserted. The fixture stops at failure: the existing integration case separately tests retry.

The nearby guarded checkout fixtures already begin with valid delivery. Their positive state checks
are strengthened without adding duplicate scenarios:

| Fixture / helper | Required state before axe |
| --- | --- |
| Shared `toPayment` (payment step, errors, done and failed setup) | Checkout URL, selected card-transfer method, visible card digits field. |
| Payment errors | Existing described-error checks plus `#vf-last4` explicitly invalid. |
| Checkout done | Localized thank-you heading, hidden card field and focused heading. |
| Payment failed | Localized failed heading/focus, checkout URL and usable retry after observed failed bank return. |

Bag delivery/errors are included in targeted regression verification. Other state fixtures are not
automatically declared verified by this checkout review. No state names or test counts change.

## Focused verification

| Target | Passed | Failed / skipped / retries | Duration |
| --- | ---: | --- | ---: |
| Darwin dev | 30 | 0 / 0 / 0 | 263.9 s |
| Darwin production | 30 | 0 / 0 / 0 | 201.2 s |
| Linux dev | 30 | 0 / 0 / 0 | 298.5 s |
| Linux production | 30 | 0 / 0 / 0 | 152.6 s |

**120 final browser cases pass.** The four pre-correction Darwin failures remain separate evidence;
they are not retried or included as final passes.

Each final target runs 30 cases at the default non-touch 390×844 mobile and 1280×900 desktop widths:
six bilingual states (failed payment, bag delivery, bag errors, payment step, payment errors, done)
= 24, plus three existing feature cases at both widths = 6 (paid return/reload, refused return/retry,
and unknown payment return). The feature cases are EN/EN/FA respectively; this is not an exhaustive
bilingual payment-method/state cross-product. Every selected state runs axe after setup/assertions.

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e -- states.spec.mjs features.spec.mjs --project=mobile --project=desktop --grep 'state: (checkout|bag delivery step|bag errors)|online payment goes to the bank|payment the bank refuses|return link for an order' --retries=0 --update-snapshots=none
# Use test:e2e:build for the same production selection.
```

Darwin uses installed Chrome. Linux uses cached AMD64 Playwright 1.64.1 Noble with current committed
source plus the tested spec override, matching Linux dependencies and a task-owned native volume.
One worker per target, zero retries/skips, snapshot updates disabled. Production runners build fresh
application previews. The source archive's tested spec is checked against the final worktree.

## Validation and remaining boundary

Root `npm run check`, fresh production app builds, local document links, diff and tested-source
consistency checks pass. All 258 baseline PNGs match the preceding-head source archive. Fresh
inventory remains 1,790 dev / 125 files and 1,391 production / 51 files: no registrations are added.
Only the state spec and documentation change. The task Linux volume is removed, and the VM is
restored to its original stopped / 3814 MiB settings.

No fresh root unit run is claimed for a test/documentation-only change; stage 240's unit evidence
is retained separately. No full state suite, full-page screenshot sweep, component, hydration,
dedicated touch/TV, physical/AT, backend or real bank execution is claimed. The fixture's local
bank return is a simulation. Existing broader CI reports its own result, not implied by local
selected passes. Leaflet source-map warnings remain in logs; console cleanliness is not claimed.

F01 is corrected for this failed-payment fixture and the specified adjacent payment states now
assert their identities before axe. Other state definitions, promo removal's numeric assertion gap,
client repeated-submit/remount and offline-write behavior remain separate follow-ups. Next: a real
same-origin two-tab customer switch/pending-response scenario, preserving the distinction between
source-proven local-storage limits and reproduced failures. Server reservation/idempotency/payment
transactions and physical/AT requirements stay in their own environments.

Local evidence under `/tmp/vendra-stage241*` includes pre-fix failed reports/traces, four final
JSON/log/result targets, source archive, check/discovery outputs and isolated Linux runner/cleanup
logs. Temporary local artifacts are not remote CI links. The permanent fixture code and assertions
are the reproducible review artifact.
