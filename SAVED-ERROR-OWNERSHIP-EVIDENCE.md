# Browser saved-error ownership — stage 249

Reviewed 2026-11-05 against master `ac6c46f489e48586ee1251db0ba37b2d7b8d16f0`.
This PR targets master and contains no implementation from pending
[PR #169](https://github.com/misaf/vendra-design-system/pull/169) or
[PR #113](https://github.com/misaf/vendra-design-system/pull/113).

## Purpose and scenarios

The recovery fix's ownership guards were previously unit-tested. This stage adds
[saved-error-ownership.spec.mjs](templates/_e2e/saved-error-ownership.spec.mjs), covering the browser
boundary with real client methods/fetch and controlled HTTP responses. Each scenario runs in EN/FA
at mobile and desktop widths. API initialization is observed with a test-only window property setter,
which calls the installed client's public setBase before mount. Client methods, fetch, and application
handlers are not replaced. All customer actions use visible remove and Undo controls.

| Scenario | Controlled outcome | Required unresolved feedback |
| --- | --- | --- |
| Two products | Initial GET succeeds; DELETE A and B each fail with 503; Undo B sends a held successful POST. | A's failure remains visible while B is pending and after B recovers; A remains locally removed, B is restored, unrelated C survives. |
| Failed initial load | GET fails with 503; DELETE B succeeds with 204. | Load error stays visible after the successful write; B's local handle is removed, A/C and private state survive. |
| Late successful load | Initial GET is held; DELETE B fails with 503; GET is released successfully. | Write error survives successful loading; in-flight edit merging keeps B locally removed and A/C present. |

Each flow preserves bag, delivery, payment draft, identity and order history. Exact DELETE handles,
POST product/102 metadata, request sequence, failure count and local mapping are checked. The
unresolved alert and settled reloaded page pass axe, with no page errors.

A full reload then receives a controlled successful GET, clears transient error feedback and sends
no additional writes. The fixture deliberately retains products whose DELETE failed, so they can
return on fresh hydration. The successful B POST handle 803 is retained in its subsequent read.
These are controlled server responses, not a live backend or proof of uniqueness/upsert behavior.
Reload clearing transient feedback is not evidence that the earlier failed mutation recovered.

## Relationship to pending fixes

Current master has sticky error feedback, so it can pass these unresolved-error preservation checks.
This stage deliberately does not require last-error clearing in the same mounted app: that belongs
to PR #169's implementation and offline recovery regressions. Passing master alone therefore does
not prove complete per-product recovery. The complementary compatibility and negative controls
below check that distinction. The handover persistence fix remains separate in PR #113.

The first six-case mobile probe passed before final read-back assertions were strengthened. It is
not included in the final matrix count. No product failure was inferred from that preliminary probe.

## Validation

| Master target | Passed | Failed / skipped / retries | Duration |
| --- | ---: | --- | ---: |
| Darwin dev | 16 | 0 / 0 / 0 | 152.2 s |
| Darwin production | 16 | 0 / 0 / 0 | 110.6 s |
| Linux dev | 16 | 0 / 0 / 0 | 171.6 s |
| Linux production | 16 | 0 / 0 / 0 | 88.2 s |

**64 selected master-based cases pass**, including 48 new ownership executions and 16 existing
hydration controls. All 48 ownership attachments match the expected unresolved error, local list,
controlled rehydrated list, exact write/read sequence and failure count.

The same 12 new EN/FA cases also pass on Darwin development with the site runtime copied from
PR #169's signed commit `3e308005763e5c692855039c59f651df73348ba8` (113.5 s,
zero skips/retries). All 12 compatibility attachments match the master matrix's ownership contract.
This adds **12 compatibility passes** to the 64 master-based cases; it is not another full platform matrix.

As a negative control, change only that runtime helper's successful error deletion to clear the
entire error set. All three EN mobile scenarios then fail exactly because the unresolved alert
is missing (64.6 s; zero retries). These are intentional fault-control
failures, not passing regressions or failures in the final source. The original master runtime is
restored in a finally block and verified byte-for-byte. No pending implementation is committed.

Full root `npm test` and `npm run check` pass. Production builds fresh previews. All 258 baseline
PNGs are byte-identical. Discovery increases by 12 registrations in one spec file to 1,824 dev /
126 files and 1,425 production / 52 files. Linux tested spec bytes match the archived local source.
The task native volume is removed and VM restored to stopped / 3814 MiB.

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e -- saved-error-ownership.spec.mjs customer-state-integrity.spec.mjs --project=mobile --project=desktop --grep 'saved error ownership|initial saved-list loading' --retries=0 --update-snapshots=none
# Repeat with test:e2e:build for production.
npm test
npm run check
```

All runs use one worker, zero retries, and disabled snapshot updates. Darwin uses installed Chrome;
Linux uses cached AMD64 Playwright 1.64.1 Noble, fresh lockfile npm ci, and a native task volume.
No full browser/visual/device or backend run is claimed. Local `/tmp/vendra-stage249*` logs,
JSON/attachments, archive and runner are temporary evidence; committed tests are reproducible.

## Boundaries and next stage

503 responses are controlled HTTP failures, not actual browser-offline mode. Initial server GETs
and post-reload reads are fixtures. No real credentials, backend transactions, deduplication,
lost-response recovery or same-account cross-tab atomicity is established. A fresh live read can
replace local intent from a failed write; this is distinct from stage 246's local demo reload.
No persistent queue, retry policy, app/runtime, UI, CSS or baseline changes are made.
The default 390px mobile project is non-touch; physical phone, tablet, TV and assistive-technology
coverage are not claimed. Initial-load retry UI remains absent and is a next UX stage after review
of the pending saved-state PRs.
