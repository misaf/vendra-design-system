# Post HTTP completion and evaluation readiness — stage 239

Reviewed 2026-11-04 against stage-238 `13a7cac89fea492f8932a3ed93f8392180e6ef1c`.
The [original Linux post timeout](LINUX-CAPTURE-DIAGNOSTICS.md) still has no established precise
scheduling cause. This stage adds a durable contract test separating successful module HTTP
completion from completed evaluation and first render. It does not introduce a runtime fix or
raise the helper's five-second main visibility timeout.

## Why this control is different

The original FA mobile trace records post Page/logic/View/copy responses as HTTP 200, but no main
at the deadline. Four unfinished background modules were not individually required for the active
post: stage 237 held all four while the article rendered. Successful fetches do not prove that
an ESM module finished evaluating or that React committed its route.

Existing [route-lifecycle.spec.mjs](templates/_e2e/route-lifecycle.spec.mjs) covers held site/page
requests, stale navigation completion and invalid-route focus recovery. Its new bilingual case
fulfils the real active post module's HTTP 200 response, retaining its imports/exports and appending
only a test-controlled top-level await. A promise installed before navigation blocks evaluation
after the body begins. Both dev Page.jsx and production page-post chunks use the same control.
No production source is edited; the interception exists only in the test context.

The new case:

1. Calls unchanged `openSite('post', lang)` and deliberately holds evaluation through its original
   5000ms `#main` check. It requires the expected missing-main/timeout failure, rather than treating
   a later repeat as a pass of that original expectation.
2. Verifies HTTP 200, completed response delivery before the observed helper failure, evaluation
   begun but unfinished, no main, and the initial EN document language. Captures status count,
   pending request paths and the original helper error in a JSON attachment.
3. Releases evaluation, requires the correct EN/FA article and locale, and verifies evaluation
   finished. First-load heading remains unfocused and the first Tab reaches the skip link.
   A second attachment records recovery. The gate releases in `finally`, including failed assertions.

These are intentionally held tests: the helper's expected deadline failure is caught and asserted
inside each passing case. There is no retry, arbitrary readiness sleep or increased global wait.
The test's timeout expectation still uses the existing helper policy; a policy change must now be
reviewed against this explicit boundary. Node completion times and renderer sample times have
different origins and are not directly subtracted. The test compares completion/deadline within
Node; the attached DOM is a sample after the helper returned its failure, not an instantaneous
sample at exactly 5000ms.

## Verification

| Target | Passed | Failed / skipped / retries | Duration |
| --- | ---: | --- | ---: |
| Darwin dev | 16 | 0 / 0 / 0 | 84.2 s |
| Darwin production | 16 | 0 / 0 / 0 | 87.0 s |
| Linux dev | 16 | 0 / 0 / 0 | 73.2 s |
| Linux production | 16 | 0 / 0 / 0 | 43.5 s |

**64 cases pass**, including 16 new controlled deadline/recovery cases. The new cases deliberately
assert a caught helper timeout before release; there are no unexpected suite failures.

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e -- route-lifecycle.spec.mjs --project=mobile --project=desktop --retries=0 --update-snapshots=none
E2E_WORKERS=1 npm --prefix templates run test:e2e:build -- route-lifecycle.spec.mjs --project=mobile --project=desktop --retries=0 --update-snapshots=none
```

Each target runs all 16 route lifecycle cases: four new post cases (EN/FA × non-touch 390px mobile /
1280px desktop) plus the 12 unchanged lifecycle cases. All use one worker, zero retries/skips and
snapshot updates disabled. Darwin uses installed Chrome; Linux uses cached AMD64 Playwright 1.64.1
Noble, current source plus the tested spec in a native task-owned volume and matching Linux deps.
The suite retains its existing reduced-motion/default browser configuration. This is a controlled
module evaluation hold, not a replay of stage 235's concurrent full-page/software-raster workload.
Production runners build a fresh app and apply the gate to the real emitted page-post chunk.

| Target | Renderer sample times after helper failure | Pending HTTP path counts at sample | Recovered article / locale |
| --- | ---: | ---: | ---: |
| Darwin dev | 5685–5797 ms | 0–0 | 4 / 4 |
| Darwin production | 5183–5507 ms | 0–0 | 4 / 4 |
| Linux dev | 5866–9913 ms | 0–0 | 4 / 4 |
| Linux production | 5130–5182 ms | 0–0 | 4 / 4 |

All 16 deadline samples show started/unfinished evaluation, main count 0, EN document language and
one live status region. All 16 recoveries show one main and no heading focus after Tab reaches the
skip link. Zero pending HTTP paths in these samples demonstrates why network idleness alone can
also misclassify route readiness. These renderer times are since navigation, not measured time spent
inside the helper assertion, and the sample is taken after its failure.

No original failure is retroactively erased. The controlled gate proves the loader waits correctly
for evaluation and recovers when it completes; it does not establish that the original module had
a top-level await or that ESM evaluation was the exact original bottleneck. The original product
module has no injected gate. Network request/response success alone is an insufficient readiness
criterion; a matching live-region-only DOM is not a unique diagnosis.

## Validation and remaining scope

Root `npm run check`, fresh production app builds, local document links and diff checks pass.
All 258 snapshot PNGs match the preceding-head archive. The spec in the Linux source archive matches
the final worktree. Fresh discovery is 1,790 dev registrations / 125 files and 1,391 production / 51
files: four cases are added to each target's existing spec. No fresh unit run is claimed for this
test/documentation-only change. The task volume is removed and Linux VM restored to stopped/3814 MiB.

Only the existing route spec and documentation change. No application, generated module,
dependency, snapshot, screenshot policy, timer, timeout or retry change. No fresh full-page,
component, axe, dedicated touch/TV, physical/AT or backend suite is claimed. Broad PR CI remains
separate from these local runs. Leaflet source-map warnings elsewhere are not resolved here;
these tests assert no page execution errors for their controlled post path.

The bounded loading/evaluation contract is now verified. Leave the original uninstrumented latency
observation open for future workload reproduction, without assuming a runtime defect or adding
waits based on later passes. Next: map existing state/integrity tests to an explicit acceptance
subset (stock, promo/quantity, payment retry/duplicate submission, customer concurrency and offline/
TV), then address proven gaps. See [ACCEPTANCE-COVERAGE.md](ACCEPTANCE-COVERAGE.md). Other article/
payment visuals, physical/AT and backend acceptance remain open.

Local JSON/logs/results live under `/tmp/vendra-stage239*`, including 32 new deadline/recovery
attachments across four targets, the original-state source archive plus tested spec override,
check/discovery reports and isolated Linux runner. These local files are temporary rather than
remote CI artifact links. The durable spec contains the complete interception and assertions.
