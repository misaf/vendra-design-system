# Storefront acceptance coverage — stage 233

Reviewed 2026-11-04 against stage-234 `68df0d8e341a6714424f1421c60c84d4e2cd1652`.
**Atomic Design migration acceptance remains incomplete.** The [stage-235 full-page audit](FULL-PAGE-VISUAL-EVIDENCE.md)
finds ten persistent Darwin expectations with stale text, plus three Linux dev failures that pass
separate serial reruns. Linux production passes all 76 default page comparisons. Stages 233/234's
historical Linux policy blocker and correction remain recorded below; no broad all-green claim
follows from these selected results.
The [stage-227 snapshot and stage-228–232 follow-ups](ACCEPTANCE-COVERAGE-HISTORY.md) are preserved
without rewriting their results. [ACCEPTANCE-EVIDENCE.md](ACCEPTANCE-EVIDENCE.md) retains the earlier
stage-219 audit. Counts below are fresh registration discovery; execution is labeled separately.

## Registered inventory

| Project | Dev registered | Production registered | Input / scope |
| --- | ---: | ---: | --- |
| mobile | 701 | 631 | Non-touch Chromium, normally 390×844; broad route/visual specs and intentional skips. |
| desktop | 701 | 631 | Chromium, normally 1280×900; broad specs plus explicit historical-width diagnostics. |
| touch-phone | 51 | 51 | Touch emulation, normally 390×844; 42 dedicated route/map cases and nine original device registrations. |
| tablet | 51 | 51 | Touch emulation, normally 1180×820; 42 dedicated route/map cases and nine original device registrations. |
| tv | 23 | 23 | Chromium keyboard, 1920×1080; original device/TV cases. |
| components | 256 | excluded | Component fixture host, including two added SearchField keyboard cases. |
| **Total / files** | **1,783 / 125** | **1,387 / 51** | Registrations include conditional skips; they are not pass counts. |

Production excludes component fixtures, cards, package and hydration specs. Hydration registers
24 dev invocations, with 12 desktop executions and 12 intentional mobile skips. The six dedicated
touch-route suites register 40 cases per dedicated project; contact-map lifecycle adds two each,
for **84 executable dedicated cases** (42 phone / 42 tablet, 21 EN / 21 FA per project). Their 84
mobile/desktop registrations deliberately skip. Shop/order capture diagnostics add four desktop
executions each and four deliberate mobile skips each. Original device tests have further target/
project conditionals; 51 registrations do not mean 51 executions in every configuration.

| Dedicated suite | Scenarios | EN/FA × phone/tablet | Scope |
| --- | ---: | ---: | --- |
| [device-routes](templates/_e2e/device-routes.spec.mjs) | 4 | 16 | Product, bag/delivery, checkout and contact. |
| [device-browsing](templates/_e2e/device-browsing.spec.mjs) | 4 | 16 | Search context, saved undo and missing/error recovery. |
| [device-customer](templates/_e2e/device-customer.spec.mjs) | 3 | 12 | Demo sign-in, profile/sign-out and guest lookup. |
| [device-editorial](templates/_e2e/device-editorial.spec.mjs) | 4 | 16 | Journal, article, FAQ and policy. |
| [device-specialist](templates/_e2e/device-specialist.spec.mjs) | 2 | 8 | Wedding draft/validation and presentation tools. |
| [device-catalog](templates/_e2e/device-catalog.spec.mjs) | 3 | 12 | Home discovery, shop sorting/paging/filters. |
| [contact-map-lifecycle](templates/_e2e/contact-map-lifecycle.spec.mjs) | 1 | 4 | Loaded active tiles/marker, zoom, resize and routed unload/remount/history/reload. |

Map tablet cases explicitly start at 768×1000; selected route helpers recheck portrait geometry at
768×1024. Historical capture tests override the desktop viewport/input explicitly. None of these
names or overrides establishes a physical phone, tablet or television result.

## Route-to-flow checklist

All 19 [`VF_ROUTES`](templates/_shared/routing.js) have selected dedicated bilingual touch coverage.
The following supplements that flow coverage with stages 228–232. It does not claim every route's
initial state was scanned by the dedicated cases or that every listed gap has no older test.

| Route | Selected flow and follow-up evidence | Important remaining scope |
| --- | --- | --- |
| home | Category → shop → product → Back; selected category identity/focus/content scan; pending shop retains home and newer FAQ navigation owns completion. | Every entry/carousel/occasion, consent/newsletter and all rapid transitions. |
| shop | Low/high price ordering, paging/reload/focus, stock/quick-filter recovery; decoded direct/reload/routed main captures at EN/FA 768/1920; initial module gate. | Range gestures, all filter/date/sort combinations, slow/error API images and full cross-commit visuals. |
| product | Add dialog entry/close, inquiry reachability, identity and route focus. | Full size/add-on/gallery/stock combinations and purchase completion. |
| bag | Delivery validation/linked-field focus, recipient/map/sender entry; exact selected thumbnails through payment navigation/reload. | Quantity/removal/promo/address combinations and whole-main visual repeatability. |
| checkout | Receipt/reference retention and order-control reachability; exact thumbnails on initial/restored/reloaded payment. | Payment-method/backend combinations, duplicate submission and real payment; full progress/text visuals. |
| saved | Two removals, latest-only undo, empty recovery, reload and focus. | Remote sources/synchronization and concurrent edits. |
| search | Query/history/product round trip and touch clear; actual keyboard Tab/Enter/Escape filtering/recovery in EN/FA default projects. | Full queries/locales, IME, virtual activation and soft keyboards. |
| signin | Phone/code validation, number change and local demo-code account entry. | Real SMS/WebOTP/resend, identity/security and all checkout returns. |
| account | Invalid profile/email focus, persistence, sign-out/history guard; current initial-route axe. | Editors/maps/reminders/balance, all tabs and cross-customer concurrency. |
| track | Empty/mismatched lookup, normalized phone retry and resolved reload/return. | Every order/payment/delivery state and backend authorization. |
| contact | Invalid email/message summary and linked-field focus; active map/zoom/resize/routed cleanup regression. | Valid/live submission, real tiles/network, loader/heap/observer analysis and external actions. |
| journal | Paging/reload, touch clear/category recovery; sequential keyboard filtering/Enter/Escape. | Every page/query/category, missing content and real IME/AT behavior. |
| post | Featured entry, title focus/reload/journal return; stage-220 FA punctuation diagnosis. | All article/media states, older Darwin pixel observation and full visuals. |
| faq | First disclosure in each group, contact handoff; final heading/history ownership during stale shop completion. | Every answer, external contact and AT announcements. |
| policy | Terms/returns, current navigation/anchor landing/reload; static phone/sticky tablet contents. | Reviewed-head Linux EN/FA mobile failures have a stage-234 baseline correction pending broad CI; all documents/anchors, print and AT reading. |
| notfound | Home recovery; delayed invalid-policy module/final-heading focus and same-document recovery. | Original stage-197 inactive-heading cause and every invalid route/input. |
| error | Demo retry/reload/noindex, reachable call fallback and home recovery; current initial-route axe. | Backend/offline outage, external telephone and cold-load performance. |
| weddings | Required-field summary/link focus and anchor-preserved draft. | Valid inquiry/retry/completion, selects/calendar and live studio contact. |
| presentation | Touch tools/search/shortlist remove-clear-undo, native caption naming and own toolbar geometry. | All handoffs/settings/collections and physical counter/TV interaction. |

## Historical observations reconciled

| Observation | Current classification and evidence | Still open |
| --- | --- | --- |
| Stage 214 empty contact tile container | [Stage 228](CONTACT-MAP-EVIDENCE.md): legitimate outgoing Leaflet level; three retained routed PNG pairs are exact; active-map lifecycle passes. | Exact old scheduling asymmetry, real cartography/network and heap/observer acceptance. |
| Stage 210 shop photos | [Stage 229](SHOP-IMAGE-EVIDENCE.md): original blank/different photos retained; four historical decoded repeats exact; current prepared main repeats pass. | Original capture cause; decode and viewport preparation changed together. |
| Stages 212/213 order thumbnails/progress | [Stage 230](ORDER-THUMBNAIL-EVIDENCE.md): original pixels confirmed; ten historical repeats exact; current thumbnail pairs exact. | Original cause, progress pixels and whole-main text variation. Original captures already awaited decode. |
| Stage 176 forced-focus clear/Enter | [Stage 231](SEARCH-KEYBOARD-EVIDENCE.md): reproduced focus-at-press-start semantics account for the symptom; documented Tab/Enter/Escape contract verified. | AT/IME/other-browser activation; no extra Tab stop or runtime patch needed for the verified contract. |
| Stages 197/200/214 readiness/focus | [Stage 232](ROUTE-LIFECYCLE-EVIDENCE.md): retained readiness overruns have unfinished modules before axe; current controlled delay/ownership/focus paths pass. | Slow-load cause/performance budget and original stage-197 focus race. |
| Stage 192 block article / later photo pixels | Historical records remain in [the earlier audit](ACCEPTANCE-EVIDENCE.md#open-observations). | Current Darwin full-page comparisons and explicit artifact review. |

Successful later captures do not erase original failures. The contact DOM signature and forced-focus
keyboard sequence now have specific explanations; other causes remain unresolved. No new baseline,
mask, wait, timeout, retry or tolerance change is justified merely by this inventory.

## Execution and CI evidence

Stage 233's local production run on its reviewed runtime head passes **84/84 dedicated route/map cases**,
zero skips/failures/flaky outcomes, two workers and no retries: 42 phone and 42 tablet. This reruns
the six stage-227 route suites together with stage-228 map lifecycle, rather than adding separate
historical results. The runner builds/owns/tears down its preview. That stage also passes
`npm run check` and document-link/inventory consistency checks. No fresh combined dev set or full
local visual/hydration/device/browser run is claimed.

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/vendra-stage233-production.json E2E_WORKERS=2 npm --prefix templates run test:e2e:build -- device-routes.spec.mjs device-browsing.spec.mjs device-customer.spec.mjs device-editorial.spec.mjs device-specialist.spec.mjs device-catalog.spec.mjs contact-map-lifecycle.spec.mjs --project=touch-phone --project=tablet --retries=0 --output=/tmp/vendra-stage233-production-results --reporter=list,json
```

The completed [PR #88 CI run](https://github.com/misaf/vendra-design-system/actions/runs/41810373432)
is pinned to reviewed head `592448d`. It is **failed**, not a release acceptance:

| Linux CI job | Observed result |
| --- | --- |
| [Browser tests](https://github.com/misaf/vendra-design-system/actions/runs/41810373432/job/126508074012) | **1,508 passed / 273 skipped / 2 failed**. Logs include 76 passing route axe, 74 passing page screenshots and 12 passing desktop hydration cases. |
| [Production build/performance](https://github.com/misaf/vendra-design-system/actions/runs/41810373432/job/126508073628) | **1,188 passed / 197 skipped / 2 failed**. Logs include 76 passing route axe and 74 passing page screenshots; hydration is excluded. |
| Check/unit and React 19 package jobs | Passed on that reviewed head. This is prior-head CI evidence, not the yet-to-run stage-233 PR result. |

Both failing jobs name the same `page: policy (en/fa)` mobile Linux cases. The browser-job initial
failure measurements are **3,859 EN / 2,363 FA comparator pixels**; both cases also fail on retry.
Those log measurements are not a fresh RGBA analysis of downloaded artifacts. Reports `e2e-report`
and `e2e-build-report` are available on the run (14-day workflow retention). Artifacts were listed,
not downloaded/reviewed in this stage. Stage 224 changed phone TOC behavior and reviewed Darwin
baselines; Linux policy differences remain a concrete blocker, with their cause to be diagnosed.
A baseline update is not preapproved by this history.

Earlier local stage evidence remains scoped: stage 230 eight capture cases per target, stage 231
13 dev/eight production keyboard cases, stage 232 12 new dev plus separate 16 existing axe cases
and a combined 28 production cases. They are not freshly rerun here. Temporary local results,
discovery and downloaded CI logs use `/tmp/vendra-stage233-*`; the linked CI run is durable only
within its hosting/retention constraints. No current-head all-green claim is made.

## Geometry and visual contract

[Project configuration](templates/_e2e/playwright.config.mjs), [touch helpers](templates/_e2e/device-helpers.mjs),
[content/visual helpers](templates/_e2e/helpers.mjs), [visual browser](templates/_e2e/visual-browser.mjs)
and [CI workflow](.github/workflows/ci.yml) retain these boundaries:

- Selected touch controls fit the viewport, avoid sticky header/bottom bars and receive center hit
  tests. Some automatic focus is checked before corrective scroll. Fill/programmatic scrolling
  does not test software keyboards or swipe physics.
- Content axe temporarily makes the bottom bar static; dedicated cases restore it and recheck
  normal geometry. No rule is excluded. Portrait geometry is not a second axe scan. Presentation
  checks its own toolbar. These assertions do not cover every control or scroll position.
- Maps use stubbed tiles; customer/order flows use demo data. These route cases do not submit orders,
  valid inquiries, or external telephone/WhatsApp/payment actions.
- Page screenshots use a fixed clock, GPU disabled, font/load/height settling, threshold **0** and
  **maxDiffPixels 25**, with native select text hidden. Capture diagnostics' exact same-page pairs
  are distinct from baseline comparisons. There are **76 registered page cases**, **152 page PNGs**
  (76 Darwin/76 Linux) and **258 total snapshot PNGs** (129 per platform).

## Prioritized remaining gates

| Order | Gate / why it matters | Concrete next verification / completion evidence |
| --- | --- | --- |
| **1 — next stage** | Ten Darwin expectations fail persistently in dev/production; sampled text predates intentional content changes. | Isolate the October 19 order-code/separator differences, review all ten complete images, correct only proven stale expectations and rerun without snapshot updates. See [stage 235](FULL-PAGE-VISUAL-EVIDENCE.md). |
| **2** | Linux dev readiness/contact capture failures and older latency/focus observations have unresolved causes. | Preserve the 73/76 first run and three serial passes separately. Trace defined cache/CPU/module/clock/map states; do not infer a cause or refresh baselines from later passes. |
| **3** | Full visual acceptance includes more than the default page suite. | Linux production now passes 76/76, but Darwin remains blocked. After those expectations are scoped, verify required article variants/payment states and current-head broad CI; retain other historical residuals. |
| **4** | Selected routes are not complete state or integrity acceptance. | Map existing stock/promo/quantity, payment retry/duplicate submission, customer concurrency and offline/TV specs to an explicit required state subset; fill proven gaps rather than duplicate existing tests. |
| **5** | Physical devices, AT and real backend/external actions need separate evidence. | Execute agreed EN/FA phone/tablet/TV, soft-keyboard/IME and screen-reader scenarios in their actual environments; verify controlled backend/security/payment integration separately. Chromium/axe/demo success cannot close these gates. |

This ordering is an evidence-based work sequence, not a declaration that every historical
observation is a product defect. The stage-233 next step was Linux policy diagnosis. Stage 234 below records the supported
correction; full visual and other completion gates remain open.

## Stage 234 follow-up: Linux policy expectations

[Linux policy evidence](POLICY-LINUX-VISUAL-EVIDENCE.md) reproduces both old expectations exactly
by restoring only the former phone sticky rule in the CI-matched Linux AMD64 image. Restoring the
current static rule matches the common CI actuals exactly. Two Linux mobile baselines are refreshed;
no source behavior or tolerance changes. Eight focused screenshot/axe cases pass in each dev and
production target on Linux and Darwin, without retries or snapshot updates. Check/build pass.
The original CI run remains red; the new PR's broad CI result is separate and not claimed complete.
Registration counts are unchanged. Next: update-disabled full-page visual comparisons and remaining
residual review; other latency/focus, state, physical/AT and backend gates remain open.

## Stage 235 follow-up: full-page comparison matrix

[Full-page evidence](FULL-PAGE-VISUAL-EVIDENCE.md) executes all 76 default cases in four targets:
Darwin dev/production each 66 pass/10 screenshot fail; Linux dev 73 pass/two screenshot fail/one
readiness fail; Linux production 76 pass. No skips or retries. These are 304 first-run invocations,
not 304 passes. Three failed Linux dev cases pass separate one-worker reruns; initial failures and
unknown causes remain retained. The ten Darwin cases persist across targets; inspected metadata/
order-code text and source history support a focused stale-expectation review next.

All 258 baseline PNGs remain unchanged. No runtime/test/timeout/tolerance changes. Check/build and
baseline/document/inventory consistency pass; fresh discovery remains 1,783 dev/1,387 production.
This is a docs-only audit with open visual gates, not complete migration acceptance. Other physical,
state, backend and historical article/payment variants remain outside default screenshots.
