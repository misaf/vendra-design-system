# Initial handover persistence — stage 247

Reviewed 2026-11-05 against master `ac6c46f489e48586ee1251db0ba37b2d7b8d16f0`.
This closes the initial shortlist durability observation retained in
[stage 246](SAVED-OFFLINE-RECOVERY-EVIDENCE.md).

## Confirmed defect and change

A counter shortlist link initializes the list and removes `ids` from the URL. Previously, the site
persisted only after a later state update. Reloading before any edit therefore restored the demo
list instead of the handed-over list. Corrected English and Persian mobile regressions both fail
against the original runtime with exactly that replacement. A new unit assertion also fails because
mount never writes the initialized session.

`storefront-site/logic.js` now shares one session serializer between mount and updates. Mount first
synchronizes the current customer, then saves the initialized visitor bag, shortlist and customer
partitions before starting live saved-list hydration. Update-time ownership checks remain in place.
Storage exceptions retain the existing non-crashing behavior. State ownership remains in site logic;
no UI component, layout, copy, CSS or screenshot baseline is changed.

## Checks

The browser test runs in EN/FA with fresh and existing visitor sessions. It requires:

- A valid handed-over product appears once; duplicates and an unknown product are discarded.
- Existing visitor saved items remain alongside the handed-over item.
- The consumed handover parameter is removed from the URL.
- Reload and a subsequent full document navigation to a product preserve the list, bag, delivery,
  payment draft, customer identity and order state, without any preceding UI edit.
- Persisted guest data matches the initial state and another customer's private address survives.
- The resulting product page has no page errors or axe violations.

Unit tests separately mount shortlist and bag handovers in both languages, reconstruct site logic
from the saved session, and require the exact original list and bag. A throwing sessionStorage write
does not crash mount. Existing customer-isolation and live hydration tests remain relevant controls.

The first exploratory browser fixture incorrectly combined `lines` with a saved-page route; routing
accepts bag lines only on the bag page. Those two exploratory failures concerned that invalid
fixture and are excluded from the corrected reproduction and final matrix. After removing that
assumption, both corrected original-runtime cases fail specifically on shortlist loss after reload.

## Validation

Darwin development: **12 passed**, zero failed/skipped/retries (128.8 s).
Darwin production: **12 passed**, zero failed/skipped/retries (80.3 s).
Linux development: **12 passed**, zero failed/skipped/retries (129.2 s).
Linux production: **12 passed**, zero failed/skipped/retries (36.5 s).

**48 selected cases pass** across all four targets, including 32 new handover executions.
All 32 JSON handover attachments match the expected local list, bag and preserved customer data.
The Linux task volume is removed and the VM restored to stopped / 3814 MiB.

Full root `npm test` and `npm run check` pass. Production validation builds a fresh storefront.
All 258 baseline PNGs remain byte-identical. Discovery is 1,820 dev / 125 files and
1,421 production / 51 files: eight new registrations per target in the existing spec.
The Linux source archive matches the tested local runtime and spec bytes.

```sh
E2E_WORKERS=1 npm --prefix apps/storefront run test:e2e -- customer-state-integrity.spec.mjs --project=mobile --project=desktop --grep 'initial handover|initial saved-list loading' --retries=0 --update-snapshots=none
# Repeat with test:e2e:build for production.
npm test
npm run check
```

Each browser target selects eight new handover cases and four existing saved-hydration controls.
Darwin uses installed Chrome; Linux uses the cached AMD64 Playwright 1.64.1 Noble image,
fresh lockfile npm ci and a native task volume. Runs use one worker, no retries and no snapshot
updates. No full browser, visual, touch-device or real-backend run is claimed. Existing Leaflet
source-map warnings remain. Local `/tmp/vendra-stage247*` logs, JSON/attachments, source archive and
runner are temporary evidence; the committed regression tests are reproducible.

## Boundaries

The guarantee begins after the mounted app initializes with writable sessionStorage. Storage denial,
quota exhaustion, or navigation before mount can still prevent durability; this stage does not add a
persistent-storage error UI. The URL is still consumed during initialization. Tests use local demo
state, not backend read-back. Live server reconciliation, same-account cross-tab read/modify/write
atomicity, other browser engines, physical devices and assistive technology remain separate checks.
The 390px mobile project is a non-touch browser viewport, not tablet or touch-phone evidence.

Next: scoped saved-sync error ownership and recovery, including the stale shared integration error
recorded by stage 246. This fix does not clear that error or change network retry behavior.
