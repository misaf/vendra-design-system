# Saved-item offline writes and explicit recovery — stage 246

Reviewed 2026-11-05 against stage-245 `4326e0c15ab48feca59432ebd307a963fe88e8e7`.
The [state audit](STATE-INTEGRITY-ACCEPTANCE.md) and stage 245 left non-checkout offline writes open.
This stage adds EN/FA save/removal cases to the existing
[customer-state-integrity spec](apps/storefront/_e2e/customer-state-integrity.spec.mjs).
No application, policy, style or baseline change is made.

## Explicit checks

Seed a saved shortlist once in sessionStorage, before mounting the app. Seed the API saved-ID map
with an unrelated product handle (`VF-3HX9TP` → 702) and, for removal, the target's known handle
(`VF-7K2M4Q` → 701). Set the real API base only after mount so initial server hydration is outside
this write-recovery fixture. The API client, fetch and UI handlers are not replaced.

| Phase | Save case | Remove case |
| --- | --- | --- |
| Offline attempt | Product's Save this design control sends POST and stays locally pressed. | Saved card's remove control sends DELETE to handle 701; target disappears and Undo receives focus. |
| Network result | Real browser-context offline mode rejects fetch with `ERR_INTERNET_DISCONNECTED`. | Same browser failure; no route exists for this initial write. |
| Local state | Target stays saved; unrelated item stays saved. No target handle is invented. | Target stays removed locally, unrelated item stays saved, and failed DELETE retains handle 701. |
| Two reconnects | No new write, list/map unchanged. | No new write, list/map unchanged. |
| Explicit recovery | Toggle off locally (no handle means no DELETE), then on to send POST. | Click Undo to restore the item locally and send POST. |
| Held success | Require exact product body: product/101 with metadata slug `VF-7K2M4Q`. | Same body; the failed earlier write does not block the product queue. |
| Released success | Response handle 803 is stored, unrelated handle 702 survives. | Returned handle 803 replaces local handle 701; unrelated handle 702 survives. |
| Reload | Target appears once, both products and ID mappings persist. | Same; bag, delivery, payment draft, customer and order history are unchanged throughout. |

The successful POST is controlled by a route installed **after** the offline failure. Exactly two
write attempts occur: save is POST → POST; remove is DELETE(701) → POST. Only the first attempt
fails. Reconnect observations each advance the client clock one second and assert no new request;
they are bounded checks, not proof of indefinite background behavior. The settled saved page passes
axe and page errors are checked through reload. Gates are released and connectivity restored in
`finally`.

Reload checks local session/localStorage persistence with the app's default demo API base. It does
not read the saved list back from a real server. The POST response is a fixture, not a model of server
uniqueness/upsert behavior. In particular, this test does **not** assert that backend handle 701 was
deleted or deduplicated after the offline DELETE failed. Real authentication, backend duplicate
handling, lost-response ambiguity and live hydration after reload remain separate boundaries.

## Observed follow-ups

- All 32 final recovery executions retain the shared `integrationError` flag after successful recovery.
  Attachments record this without requiring stale feedback as intended behavior. Source sets the
  flag for both initial hydration and failed saved mutations, with no success-clearing ownership.
  Clearing the global flag on any success could hide a different unresolved failure. This needs a
  focused ownership/recovery change, not a blanket clear in this coverage stage.
- The first exploratory setup opened a handed-over shortlist then did a full product navigation
  before editing it. The handed-over unrelated item was replaced by the default list. Retain this
  as a separate initial-handover durability observation requiring a targeted reload/navigation
  reproduction; it is not closed by the new saved-write tests. The final setup seeds persisted
  session data once, avoiding reliance on handover behavior.
- Initial exploratory failures also used an incorrect exact heading selector: ProductCard's linked
  heading has an accessible name including price. Scope by the visible product-code text instead.
  That exploratory run ended with three failures and one unrun case after interruption; it is not
  a passing matrix. The corrected four-case mobile probe passes separately from final validation.

## Verification

| Target | Passed | Failed / skipped / retries | Duration |
| --- | ---: | --- | ---: |
| Darwin dev | 14 | 0 / 0 / 0 | 110.4 s |
| Darwin production | 14 | 0 / 0 / 0 | 81.9 s |
| Linux dev | 14 | 0 / 0 / 0 | 108.6 s |
| Linux production | 14 | 0 / 0 / 0 | 56.6 s |

**56 final cases pass**, including 32 new offline saved-write executions. All 32 attachments match
the expected method sequence and product payload, one disconnected failure, two reconnects without
replay, both saved codes and the final 702/803 ID map. Each records the still-set shared error flag.
All 258 baseline PNGs are unchanged. Discovery increases by eight registrations per target to
1,812 dev / 125 files and 1,413 production / 51 files. No new spec file is added.
Tested source bytes match the Linux archive; local document links and diff checks pass. The task
Linux volume is removed and the VM restored to stopped / 3814 MiB.

```sh
E2E_WORKERS=1 npm --prefix apps/storefront run test:e2e -- customer-state-integrity.spec.mjs features.spec.mjs --project=mobile --project=desktop --grep 'offline saved|initial saved-list loading|product page saves the design' --retries=0 --update-snapshots=none
# Repeat with test:e2e:build for production.
node apps/storefront/_tests/migration.test.cjs
node apps/storefront/_tests/storefront.test.cjs
```

Each target selects 14 cases: eight new save/removal cases (EN/FA × mobile/desktop), four existing
saved hydration controls and two EN product-save controls. Default mobile is non-touch 390×844;
desktop is 1280×900. One worker, zero retries and snapshot updates disabled are used. Production
builds fresh previews. Darwin uses installed Chrome. Linux uses cached AMD64 Playwright 1.64.1 Noble,
fresh lockfile npm ci, a native task volume and a source archive with the tested spec override.

Focused migration/storefront unit files and root `npm run check` pass. Migration unit coverage
includes DELETE-before-Undo ordering, other-product mapping preservation and failure recovery.
No fresh full root unit, full browser/visual/device/hydration suite, physical or assistive-technology
run is claimed. Existing Leaflet source-map warnings remain. Persistent offline queues, other write
families, live backend transactions and same-account cross-tab write atomicity remain separate.

Next: reproduce initial shortlist-handover persistence across immediate reload/full navigation,
then address saved-sync error ownership. Local `/tmp/vendra-stage246*` artifacts hold exploratory,
probe and final logs/JSON/attachments plus archive/runner/install/cleanup evidence. These are
local temporary artifacts, not durable CI links; the committed test is reproducible.
