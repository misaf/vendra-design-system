# Pending checkout submission and remount — stage 244

Reviewed 2026-11-05 against stage-243 `b81f26b3bdc0922c5b189fd1ecb82cf759f7a870`.
The [state audit](STATE-INTEGRITY-ACCEPTANCE.md) already had a unit remount/guard assertion,
but its browser case never attempted another submission or returned to checkout while pending.
This stage extends that existing bilingual late-response case, without a new test registration.

## Confirmed defect and fix

The extended flow exposed a real second submission. Initial unpatched selections finished:
Darwin dev 8 passed / 4 failed; Linux dev 9 passed / 3 failed; Linux production 10 passed / 2 failed.
Two failures were initial `#main` readiness timeouts (Darwin desktop FA two-tab success and Linux
mobile FA remount), before their relevant assertions. The other seven reached the remount flow
and failed after response completion. Keep those first outcomes; do not count them as clean passes.

A subsequent desktop FA input log records trusted pointerdown/up on the disabled pending button,
then an **untrusted click** on that same confirmation after pending clears, and two checkout POSTs.
A controlled clock diagnostic pauses before the remounted pointer attempts, releases the response,
then advances 100 ms after enabled UI; both desktop EN/FA cases record the same extra POST/click.
React Aria's installed `usePress` source includes an 80 ms fallback that calls the pointer target's
`click()` when its press is still active. This matches the captured delayed activation. Isolated
exploratory Button fixtures did not reproduce the complete checkout sequence; they are not retained
or counted as regression proof.

The decisive counterfactual uses the **exact final regression spec**, restoring only the old Button
source temporarily. All four Darwin dev EN/FA mobile/desktop cases fail: each attachment has two
POSTs and one untrusted confirmation click. The patched source is restored in `finally` and its
bytes match the tested Linux source archive. This is separate from exploratory fixture observations.

The [Button atom](components/atoms/Button/Button.jsx) now captures and stops pointerdown while
loading or disabled, before the library starts tracking a press. The generated package output is
updated as well. Enabled controls retain their existing pointer/keyboard behavior. No checkout
policy, endpoint, response handling, pricing, CSS, baseline or timing tolerance changes.

## Browser contract

[customer-state-integrity.spec.mjs](templates/_e2e/customer-state-integrity.spec.mjs) selects
pay on delivery through the UI and sends through the real `VF_API.checkout` fetch adapter.
A controlled route holds the checkout POST response; other task API calls return empty JSON.
While it waits, the test requires disabled confirmation UI and sends native pointer double-clicks
at the visible control. It does not force a locator click, invoke a private handler or replace
the checkout adapter with a stand-in function.

The customer leaves checkout through delivery and bag links, adds one unit to the first line,
then returns through delivery to checkout. The old button must be disconnected, the site root
must be the same instance, and the remounted confirmation remains disabled. More native pointer
clicks still leave exactly one checkout POST and no order while the response is held.

After controlled success, pending clears and confirmation becomes enabled. The test advances the
client clock by 100 ms to exercise delayed press work and requires the button to remain enabled. The current bag,
delivery, payment draft and customer identity equal their pre-response values. Current quantity
is two; exactly one history order retains the submitted quantity one and the same customer owner.
The last-order ID matches, the newer-intent notice opens tracking, and settled tracking passes axe.
JSON attachments record request count, remount, quantities, order IDs and trusted/untrusted input events. Page errors are checked
through response completion.

This covers successful delayed COD completion within one mounted app. Keyboard repeated activation,
full app reload during a request, failure/retry remount UI, cross-tab locking, backend idempotency,
server transactions and real authentication/payment remain separate boundaries. Stage 242's customer
switch success/failure cases, saved-list hydration and existing Button controls are selected as related
regressions; they do not close those boundaries.

## Verification

| Target | Passed | Failed / skipped / retries | Duration |
| --- | ---: | --- | ---: |
| Darwin dev | 24 | 0 / 0 / 0 | 267.2 s |
| Darwin production | 16 | 0 / 0 / 0 | 118.3 s |
| Linux dev | 24 | 0 / 0 / 0 | 336.0 s |
| Linux production | 16 | 0 / 0 / 0 | 113.1 s |

**80 final cases pass**. All 16 remount attachments contain one POST, current quantity two and
one history order of quantity one. Their input logs contain at least four trusted pointer starts
on disabled pending controls and no untrusted replay click. The task Linux volume is removed and
the VM restored to stopped / 3814 MiB.

The final selection uses one worker, zero retries/skips and snapshot updates disabled. Dev selects
24 cases: 16 storefront cases (four remount, eight two-tab customer/response, four saved-list loading),
seven Button controls and one IconButton bilingual axe case matched by the Button filename filter.
Production selects the same 16 storefront cases; component fixture hosts are dev-only. Mobile is
non-touch 390×844 and desktop is 1280×900; these are not dedicated touch-phone/tablet/TV results.

Darwin uses installed Chrome; Linux uses the cached AMD64 Playwright 1.64.1 Noble image, a fresh
lockfile npm ci and native task volume. The tested source archive includes the final spec, Button
source and generated package output, with byte equality checked against the worktree. No Darwin
native dependencies are used in Linux. Production targets build fresh app previews.

Full root `npm test` and `npm run check` pass, including typed/package/build/size contracts; the
focused storefront unit file also passed. Discovery remains 1,800 dev / 125 files and 1,401 production
/ 51 files. No registrations were added. All 258 baseline PNGs match the prior-head archive.
Local document links and diff checks pass. Existing Leaflet source-map warnings remain.

No full browser/visual/device/hydration suite, physical hardware, assistive technology or actual
backend transaction run is claimed. The first-run readiness timeouts remain separate residuals.
PR CI reports its own result.

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e -- customer-state-integrity.spec.mjs Button.spec.mjs --project=mobile --project=desktop --project=components --grep 'late checkout responses|two-tab|a button presses|loading keeps|disabled:|pending|passes axe' --retries=0 --update-snapshots=none
# Repeat with test:e2e:build, omitting --project=components, for production.
node templates/_tests/storefront.test.cjs
```

Next: offline mutation/reconnect controls with explicit operation/count/current-state assertions.
Same-account storage races, backend transactions and physical/AT/visual acceptance remain separate.

Local `/tmp/vendra-stage244*` files contain initial/exploratory/counterfactual and final logs,
JSON, result attachments, source archive and Linux runner/install/cleanup evidence. These are
local temporary artifacts, not durable CI links; the committed test is the reproducible check.
