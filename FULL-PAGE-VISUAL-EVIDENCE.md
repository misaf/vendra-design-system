# Full-page visual comparison audit — stage 235

Reviewed 2026-11-04 against stage-234 `68df0d8e341a6714424f1421c60c84d4e2cd1652`.
This executes the default full-page suite on Darwin and Linux in dev and production. It records
failures and follow-ups; **full visual acceptance is not complete**.

## Scope and fixed policy

[pages.spec.mjs](apps/storefront/_e2e/pages.spec.mjs) registers 19 default views × English/Persian ×
mobile/desktop = **76 cases per target**. Mobile is non-touch 390×844; desktop is 1280×900.
The suite uses software rasterization, the fixed morning clock, font/image/height settling,
threshold 0 and maxDiffPixels 25. Existing map stubs and demo/guard behavior remain unchanged.
Account is seeded signed-in by the helper; an incomplete checkout URL redirects to delivery.
These are default direct-entry screenshots, not full state, routed interaction or device coverage.

All 152 platform-specific page expectations were present. No snapshot-update flag was supplied in
the four full sweeps; all 258 snapshot PNGs are verified unchanged afterward. The later three-case
serial rerun explicitly uses `--update-snapshots=none`. No baseline, tolerance, timeout, retry,
test, runtime or dependency changes are made. Passing means within the existing screenshot policy,
not raw pixel identity or complete accessibility acceptance.

Darwin uses installed Chrome. Linux AMD64 uses `mcr.microsoft.com/playwright:v1.64.1-noble`, a fresh
archive of the reviewed head, Linux dependencies verified against the current lockfile, and a
native task-owned volume. Both full sweeps run with two workers and no retries. Dev/production
runs are sequential on each platform; the platforms execute concurrently. This workload is not a
controlled latency benchmark. Each runner owns and tears down its preview.

## Complete first-run results

| Platform / target | Passed | Screenshot failures | Readiness failures before capture | Skipped / retries | Duration |
| --- | ---: | ---: | ---: | --- | --- |
| Darwin dev | 66 | 10 | 0 | 0 / 0 | 6.3 min |
| Darwin production | 66 | 10 | 0 | 0 / 0 | 4.3 min |
| Linux dev | 73 | 2 | 1 | 0 / 0 | 5.7 min |
| Linux production | **76** | **0** | **0** | 0 / 0 | 2.6 min |

There are **304 first-run invocations: 281 passed, 22 screenshot failures and one readiness
failure**. No outcome is classified as flaky by Playwright because retries are disabled. That does
not establish deterministic behavior; separate reruns below are not substituted for first-run results.
The stage-234 Linux policy corrections pass in all four sweeps. The Linux production sweep passes
all 76 comparisons, while Linux development is not a clean first-pass run.

## Persistent Darwin expectations

The same ten cases fail in both targets. Comparator counts below come from Playwright's failure
messages; raw counts are separately decoded RGBA measurements of the dev expected/actual images.
All failed image pairs have matching dimensions.

| Route / language / project | Comparator pixels dev / production | Dev raw pixels / max channel delta |
| --- | ---: | ---: |
| account EN mobile | 222 / 222 | 523 / 232 |
| account EN desktop | 222 / 222 | 523 / 232 |
| account FA mobile | 294 / 297 | 625 / 232 |
| account FA desktop | 294 / 294 | 625 / 232 |
| home FA mobile | 215 / 215 | 462 / 162 |
| home FA desktop | 799 / 799 | 1,692 / 162 |
| product FA mobile | 475 / 475 | 981 / 178 |
| product FA desktop | 629 / 629 | 1,282 / 228 |
| journal FA mobile | 4,322 / 4,322 | 8,614 / 163 |
| journal FA desktop | 4,223 / 4,223 | 8,617 / 163 |

The product FA mobile diff was viewed, along with expected/actual detail crops from account EN,
home FA, product FA and journal FA. The inspected differences include **visible text changes**:

- Account's cancelled order expects `VB-TEST-1`; current content is `VN-10187`.
- Persian home/journal metadata and product details expect middle-dot separators; current content
  uses the Persian comma. These changes can move adjacent glyphs within a metadata line.

Commit `646e5ab038f3fd12feddad6b25f5815eb71e97fb` intentionally changed both the cancelled demo-order
code and Persian separators at **2026-10-19 15:46 Iran time**. The relevant Darwin expectations were
captured by `bd7f880118e696bd28c2d5afb750fdbb7dbb2597` at **14:33 that day**. Current
[formatting.js](apps/storefront/_shared/domain/formatting.js), [catalog.js](apps/storefront/_shared/domain/catalog.js) and
[account-data.js](apps/storefront/_shared/domain/account-data.js) retain that intended content. Linux account
expectations were subsequently refreshed in `de9203f`; current Linux production passes these views.
Stage 220 already reviewed the separate Persian post expectations, not all these other views.

This establishes stale text in the inspected Darwin crops and strong source/history support for a
focused expectation correction. It does **not** assign every changed pixel to that commit: full
counterfactual rendering and review of all ten complete images remain the next stage. For example,
production FA mobile account has 644 raw differing pixels across a wider area than dev's 625; the
small additional difference is not silently assigned to the order-code change. No image is refreshed
merely because the text history is known, and this audit does not roll back intended content.

## Linux development failures and separate reruns

| Case | First-run observation | Follow-up |
| --- | --- | --- |
| FA post, mobile | `#main` absent after the helper's 5-second visibility wait. No screenshot assertion ran. Error snapshot shows a status. | One serial dev rerun passes, same policy/timeout and no retry. |
| EN contact, desktop | 385 comparator pixels; 735 raw pixels/max 209, bounds 131,831–422,950. | Serial dev rerun passes. |
| FA contact, desktop | 579 comparator pixels; 949 raw pixels/max 209, bounds 860,1000–964,1028. | Serial dev rerun passes. |

The English contact diff was viewed: the visible difference is concentrated around the map label,
with a small zoom-control edge difference. Persian raw bounds cover the label region. This is a
new sampled rendered-pixel observation, distinct from stage 228's empty Leaflet-container DOM
signature whose retained paired pixels were equal. The precise map capture/raster/lifecycle cause
is not established. Neither the passing production sweep nor the repeats justifies a contact
baseline refresh or additional arbitrary settling delay.

After the four sweeps completed, rerun only the three failed Linux dev cases with **one worker,
no retries and snapshot updates explicitly disabled**: one post case, then two contact cases.
All three pass. Original failed images/traces and first-run results remain retained. The repeat
changes concurrency and run timing, so it does not reproduce or explain the original failures.
The post readiness symptom resembles the earlier stage-232 observations; its original cause is
not proved by that resemblance.

## Reproduction and validation boundary

Each full target uses this selection with its platform's configured browser; production uses
`test:e2e:build`. JSON reporting retains result/error details and image/trace paths.

```sh
E2E_WORKERS=2 PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/vendra-stage235-darwin-dev.json npm --prefix apps/storefront run test:e2e -- pages.spec.mjs --project=mobile --project=desktop --retries=0 --output=/tmp/vendra-stage235-darwin-dev-results --reporter=list,json
# Linux serial repeats (inside the same image/native filesystem):
CI=true E2E_WORKERS=1 npm --prefix apps/storefront run test:e2e -- pages.spec.mjs --project=mobile --grep 'page: post \(fa\)' --update-snapshots=none --retries=0
CI=true E2E_WORKERS=1 npm --prefix apps/storefront run test:e2e -- pages.spec.mjs --project=desktop --grep 'page: contact' --update-snapshots=none --retries=0
```

The builds, root `npm run check`, baseline-hash and local document-link checks pass. Full screenshot
sweeps have the failures above; this is not an all-green test claim. No fresh unit, axe, component,
hydration, dedicated touch/TV or full-state suite is executed by this docs-only stage. Discovery
remains 1,783 dev/1,387 production registrations. The Linux volumes are removed and VM restored to
its original stopped state/3814 MiB; native Linux filesystems avoid the prior shared-mount build issue.

Local result roots are `/tmp/vendra-stage235-darwin-{dev,production}-results` and
`/tmp/vendra-stage235-linux/{dev,production}-results`, with JSON/logs beside them. Early evidence was
copied out while production ran; final reports and measurements are retained under the same stage
prefix. These temporary local files are not durable CI artifact links. Fresh PR CI is separate from
this local platform matrix and must report its own outcome.

Next: isolate and review the ten Darwin content expectations against the intentional October 19
changes, then correct only proven stale baselines and rerun comparisons without snapshot updates.
Keep Linux readiness/map capture causes and other gates in
[ACCEPTANCE-COVERAGE.md](ACCEPTANCE-COVERAGE.md) open. These default screenshots do not cover the
historical block-article variant, every payment/progress state, real cartography/network, physical
input/soft keyboards, AT or backend/external actions.

## Stage 236 follow-up

[Darwin content evidence](DARWIN-CONTENT-VISUAL-EVIDENCE.md) completes the ten-case counterfactual
review, including the separate product total literal, and corrects those ten expectations using
the retained stage-235 dev captures. Darwin dev and production each pass all 76 default page comparisons, with two workers,
zero skips/retries and snapshot updates explicitly disabled.
This follow-up does not rewrite the original 304 outcomes above or explain the Linux dev failures.

## Stage 237 follow-up

[Linux diagnostics](LINUX-CAPTURE-DIAGNOSTICS.md) reproduce the contact label pixels and record a
stale tooltip width during a transient tiny-viewport/font-loading phase. Post gate controls rule
out the four unfinished background modules as required dependencies of the active article.
No runtime or baseline correction is made here; original failures and post scheduling uncertainty
remain retained. A subsequent-font-load tooltip correction is the next experiment.
