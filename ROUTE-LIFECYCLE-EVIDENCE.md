# Route readiness and focus evidence — stage 232

Reviewed 2026-11-04 against stage-231 `1847709a176cc61f07d5e098ed5585118903c89a`.
This scopes historical stage-197/200/214 timeout observations and adds controlled lifecycle checks.

## Retained failures

The four retained Playwright traces from stages 200/214 failed in `openSite` while waiting for
`#main`, **before axe ran**. Their error snapshots contain only a status, with no main landmark.
Recorded network activity shows page-module work unfinished when the assertion completed:

| Historical case | Configured wait | Observed assertion duration | Unfinished app-module requests at assertion completion | Recorded HTTP status ≥400 |
| --- | ---: | ---: | ---: | ---: |
| Stage 214, EN mobile shop | 5,000 ms | 5,006 ms | 50 | 0 |
| Stage 214, EN mobile checkout | 5,000 ms | 6,009 ms | 50 | 0 |
| Stage 214, EN mobile account | 5,000 ms | 5,476 ms | 32 | 0 |
| Stage 200, FA desktop error | 5,000 ms | 5,012 ms | 19 | 0 |

Counts use recorded request start/duration against the assertion's completion timestamp; requests
with no completed response remain unfinished. Incomplete/teardown requests are not successful HTTP
responses, and zero recorded HTTP errors does not establish a healthy or complete load. Actual
assertion duration can exceed its configured timeout while the browser/test process is busy.

These traces substantiate a readiness-time budget overrun during module loading. They do not show
an already-rendered page losing its main landmark, establish why the module graph was slow, or
identify dev transformation, transport, CPU scheduling or another specific cause. They contain no
recorded console error establishing a render exception. The stage-200 single-case repeat passed;
the stage-214 three-case repeat passed. Those repeats do not erase the failures or establish a
performance guarantee.

Stage 197 is a separate scratch-probe record: one attempt timed out waiting for the notfound grid,
and another later attempt found the invalid-policy `h1` attached but inactive after 5 seconds.
The retained logs do not provide a browser event/focus trace for those failures. Later desktop
repeats passed. This stage does **not** reconstruct or claim to resolve that original focus race.

## Current ownership and diagnostic

[main.jsx](templates/app/main.jsx) awaits the site module before rendering its root.
[pages.js](templates/app/pages.js) shares module promises, records ready pages, retries failed loads
and preloads routes in the background. The [site router](templates/storefront-site/logic.js)
`vfShowRoute` keeps the current URL/page while a requested module loads and checks a navigation
sequence before committing it. A newer navigation owns the eventual visible route.

[page-lifecycle.js](templates/_shared/page-lifecycle.js) sets locale, waits for the heading and
schedules later-view focus; first-load focus is left at the top. Its delayed heading helper in
[page-focus.js](templates/_shared/page-focus.js) preserves explicitly focused fields/recovery
controls. [Shell](templates/app/Shell.jsx) adjusts focused content away from sticky bars on a later
frame. These delays have distinct owners; a test's navigation click is not itself proof that the
final heading is ready and focused.

[route-lifecycle.spec.mjs](templates/_e2e/route-lifecycle.spec.mjs) adds **12** cases: three scenarios ×
English/Persian × default mobile/desktop. Both projects are non-touch Chromium, at 390/1280px.
A request gate holds the actual site/shop/notfound module before navigation. Release waits for its
HTTP response and imports that same URL to await ESM evaluation, including dependencies, through the
browser's shared module cache. It does not replace module contents, loader options or app functions.
Two paint frames let already-scheduled microtask/frame work run; no arbitrary delay or larger global
readiness timeout is introduced. Gates release in `finally`.

- **Initial readiness:** hold the site module, observe no `#main`, release it, then require the shop
  grid, locale and `VF_VIEWED`. The heading is not focused on first load; the first Tab reaches Skip.
  This intentionally demonstrates pending module state, not a claim that the five-second historical
  delay was reproduced or that every startup completes within a latency budget.
- **Latest navigation:** use the real home-studio shop link while shop code is held. Home and its
  URL remain. Navigate through the real footer FAQ link, require its focused heading, then complete
  the stale shop module and require FAQ/heading ownership to persist. Back/Forward restores the
  expected home/FAQ headings. The document remains the same.
- **Invalid-policy recovery:** provide invalid route input through the site's existing navigation
  API while notfound code is held. Home remains until release; the final notfound heading is focused
  with correct locale, and the real home recovery link returns to a focused home heading. This is
  diagnostic invalid input, not an advertised broken UI link or a copy of the old injected anchor.

Each scenario attaches held/ready JSON snapshots with URL, main count, heading, focus, locale and
performance timestamp. These state observations do not constitute a statistical latency benchmark.
The new cases make no independent axe or screenshot assertion.

## Validation and remaining boundary

All **12 new dev cases** pass, followed by a separate **16-case dev** run of existing bilingual
shop/checkout/account/error axe checks at both widths. The combined production selection passes
**28 cases**, comprising the same 12 lifecycle and 16 existing route cases. All use one worker and
no retries. The legacy checkout URL is guarded to delivery without complete details; this is its
existing initial-route contract, not a payment-page assertion. Full `npm test`, `npm run check`
and production build pass. Runners own and tear down their previews.

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/vendra-stage232-dev.json E2E_WORKERS=1 npm --prefix templates run test:e2e -- route-lifecycle.spec.mjs --project=mobile --project=desktop --retries=0 --output=/tmp/vendra-stage232-dev-results --reporter=list,json
E2E_WORKERS=1 npm --prefix templates run test:e2e -- storefront.spec.mjs --project=mobile --project=desktop --grep 'axe: (shop|checkout|account|error) \(' --retries=0 --output=/tmp/vendra-stage232-initial-routes-results --reporter=list
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/vendra-stage232-production.json E2E_WORKERS=1 npm --prefix templates run test:e2e:build -- route-lifecycle.spec.mjs storefront.spec.mjs --project=mobile --project=desktop --grep 'module readiness|latest route wins|delayed invalid-policy|axe: (shop|checkout|account|error) \(' --retries=0 --output=/tmp/vendra-stage232-production-results --reporter=list,json
```

Discovery registers **1,783 invocations in 125 files**: mobile/desktop 701 each, phone/tablet 51 each,
TV 23, components 256. The new file adds six executions per default project, with no deliberate
skips. Prior inventories remain snapshots; no combined dedicated touch/map/capture suite is rerun.
Historical traces use `/tmp/vendra-stage200-browser-results` and `/tmp/vendra-stage214-browser-results`;
stage-197 logs and fresh `/tmp/vendra-stage232-*` analysis/results are temporary local artifacts,
not durable CI links.

No app/runtime/style/generated/dependency, timeout, retry, baseline or screenshot-policy changes.
Initial readiness performance and the original stage-197 focus failure remain unresolved gates;
current controlled success does not prove their causes. Complete cold-cache/CPU/network stress,
chunk rejection/stale-deploy combinations, all routes/guards/rapid transitions, physical devices,
soft keyboards, other browsers, TV navigation and AT remain separate acceptance work. Existing
content axe's static-bottom-bar adjustment remains distinct from normal sticky geometry. No order
or external messaging action is triggered.

Next: refresh the acceptance matrix and prioritized remaining gaps using stages 228–232, preserving
historical residuals and the distinction between sampled behavior and complete acceptance.
