# Scoped saved-sync recovery — stage 248

Reviewed 2026-11-05 against master `ac6c46f489e48586ee1251db0ba37b2d7b8d16f0`.
This independently based PR excludes unmerged [stage 247](https://github.com/misaf/vendra-design-system/pull/113).
It addresses the persistent shared error reported by [stage 246](SAVED-OFFLINE-RECOVERY-EVIDENCE.md).

## Confirmed defect and implementation

The initial saved-list read and every saved mutation previously set the same boolean on failure.
Successful recovery never cleared it. Both EN/FA mobile offline-save regressions fail against the
original runtime because the alert remains after a confirmed successful retry. A focused unit
regression also fails when the last unresolved product recovers.

Site logic now tracks initial-load and per-product errors separately, projecting them into the
existing integrationError boolean. A successful non-null adapter result clears only that product's
failure. A local no-op, demo operation, missing server handle or empty response does not establish
recovery. Pending retries preserve feedback. An initial-load failure stays visible despite successful
writes, and successful loading does not clear failed writes.

Each product has an invocation version and a last settled outcome version. Older success/failure
cannot replace a newer confirmed outcome. No-op completions do not advance the settled version, so
they cannot suppress an unresolved earlier request failure. Existing API serialization is unchanged.
The failure live announcement is cleared only when all saved sync errors have recovered and the
current announcement still belongs to this error handler. Another action's announcement survives.

Ownership remains in View logic; components, layout, text, styles, API request contracts, retry
policy and screenshot baselines are unchanged. No background retry or persistent queue is added.

## Verification coverage

Existing bilingual offline saved-write browser cases now require the alert to remain during a
pending retry and after a local-only unsave, then disappear after confirmed recovery. They continue
to check real browser-offline POST/DELETE failures, two reconnects without replay, exact retry body,
unrelated local data and server-handle preservation, local reload, page errors and axe. The recovery
attachment now requires integrationErrorAfterSuccess to be false.

New unit scenarios run in EN/FA:

- Two failed products recover independently; only the last recovery clears the alert.
- Pending and null-result writes preserve unresolved feedback.
- Older failure after newer success cannot revive an error; older success after newer failure cannot hide it.
- A newer no-op cannot suppress an earlier request failure.
- Recovery clears its stale live announcement and preserves another action's announcement.
- Successful writes preserve initial-load failure; successful initial loading preserves write failure.

The ownership race controls use deferred adapter doubles in unit tests. The browser cases use the
real adapter and controlled HTTP responses after a genuine offline rejection. Independent-product
and hydration-failure ownership have not yet been tested together through browser UI.

## Validation

| Target | Passed | Failed / skipped / retries | Duration |
| --- | ---: | --- | ---: |
| Darwin dev | 12 | 0 / 0 / 0 | 108.2 s |
| Darwin production | 12 | 0 / 0 / 0 | 80.5 s |
| Linux dev | 12 | 0 / 0 / 0 | 101.7 s |
| Linux production | 12 | 0 / 0 / 0 | 44.2 s |

**48 selected cases pass**, including 32 offline saved recovery executions. All 32 attachments
require cleared recovery feedback, two request attempts, one genuine offline failure, two reconnects
without replay and the preserved 702/803 handle map. Four existing saved-hydration controls run on
each target. Both original-runtime regression failures are retained separately, not counted as passes.

Full root `npm test` and `npm run check` pass. Production targets build fresh previews. All 258
baseline PNGs are byte-identical. Discovery remains 1,812 dev / 125 files and 1,413 production /
51 files; no new browser registrations or spec files. Linux archive runtime/spec/unit bytes match
local tested source. The task volume is removed; VM restored to stopped / 3814 MiB.

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e -- customer-state-integrity.spec.mjs --project=mobile --project=desktop --grep 'offline saved|initial saved-list loading' --retries=0 --update-snapshots=none
# Repeat with test:e2e:build for production.
npm test
npm run check
```

One worker and zero retries are used; snapshot updates are disabled. Darwin uses installed Chrome;
Linux uses cached AMD64 Playwright 1.64.1 Noble, fresh lockfile npm ci and a native task volume.
No full browser/visual/device suite, physical device, assistive-technology or backend run is claimed.
Local `/tmp/vendra-stage248*` logs, JSON/attachments, archive, runner and cleanup files are temporary
evidence, not durable CI links; committed tests are reproducible.

## Remaining boundaries

These errors describe this mounted client's observed outcomes. Reload resets transient error
ownership; it does not prove server read-back or repair missing data. Empty successful response
bodies intentionally keep earlier failure feedback because the current adapter also returns null
for local no-ops. Live backend reconciliation, duplicate handling, lost-response ambiguity and
same-account cross-tab write atomicity remain separate. Initial-load retry UI is not added here.
Default mobile is a non-touch 390px browser viewport, not physical phone or tablet evidence.
The separate initial handover persistence fix remains in PR #113.

Next: browser controls for independently failed products and initial-load failure ownership.
