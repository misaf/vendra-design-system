# Storefront acceptance coverage — stage 227

Reviewed 2026-11-04 against stage-226 commit
`15eb9699988cefb026301e7607cf79aebe5cd9c0`. This is the stage-227 coverage snapshot,
with subsequent progress below;
[ACCEPTANCE-EVIDENCE.md](ACCEPTANCE-EVIDENCE.md) retains the frozen stage-219 audit and staged
follow-ups. Atomic Design migration acceptance is **not complete**. Route reach, state coverage,
content accessibility, visuals and physical-device/assistive-technology evidence remain distinct.

## Registered inventory at stage 227

Fresh Playwright discovery registers **1,737 invocations in 120 files**. Registration includes
conditional skips and is not an executed pass count.

| Project | Registered | Input / viewport | Scope |
| --- | ---: | --- | --- |
| mobile | 681 | Desktop Chromium, no touch, 390×844 | Broad storefront/visual specs; six dedicated route specs also register 40 cases but skip here. |
| desktop | 681 | Desktop Chromium, 1280×900 | Broad storefront/visual/hydration specs; the 40 dedicated route cases skip here. |
| touch-phone | 49 | Chromium touch emulation, 390×844 | 40 dedicated route cases plus nine original device cases. |
| tablet | 49 | Chromium touch emulation, 1180×820 | 40 dedicated route cases plus nine original device cases; selected controls rechecked at 768×1024. |
| tv | 23 | Chromium keyboard input, 1920×1080 | Original device and TV specs; dedicated touch-route specs are not selected. |
| components | 254 | Desktop Chromium fixture host | Component specs; excluded from production configuration. |

The six dedicated route specs define 20 scenarios × two languages × two touch projects = **80
executable cases**. Each dedicated project contributes 20 English and 20 Persian cases. Their 80
mobile/desktop registrations are deliberate skips, not additional device coverage. Original device
cases have further project/production conditionals; 49 registered does not mean 49 executable in
every target. Hydration still registers 24 mobile/desktop invocations, of which 12 desktop cases can
execute; it is excluded from production configuration. The frozen stage-219 counts are not current.

| Dedicated suite | Scenarios | EN/FA × phone/tablet | Main coverage |
| --- | ---: | ---: | --- |
| [device-routes.spec.mjs](templates/_e2e/device-routes.spec.mjs) | 4 | 16 | Product, bag/delivery, checkout, contact. |
| [device-browsing.spec.mjs](templates/_e2e/device-browsing.spec.mjs) | 4 | 16 | Search context, saved undo, missing/error recovery. |
| [device-customer.spec.mjs](templates/_e2e/device-customer.spec.mjs) | 3 | 12 | Demo sign-in, profile/sign-out, guest order lookup. |
| [device-editorial.spec.mjs](templates/_e2e/device-editorial.spec.mjs) | 4 | 16 | Journal, article, FAQ, policy. |
| [device-specialist.spec.mjs](templates/_e2e/device-specialist.spec.mjs) | 2 | 8 | Wedding draft/validation, presentation shortlist/tools. |
| [device-catalog.spec.mjs](templates/_e2e/device-catalog.spec.mjs) | 3 | 12 | Home discovery, shop sorting/paging/filters. |

## Route-to-flow checklist

All 19 entries of [`VF_ROUTES`](templates/_shared/routing.js) have selected dedicated bilingual touch coverage. These are user-flow
assertions, not a promise of a fresh content axe scan at each route's initial state. For example,
the bag case scans delivery validation, and sign-in scans incomplete-code validation.

| Route | Selected evidence | Important unclosed scope |
| --- | --- | --- |
| home | catalog: category link → shop → product → Back; category identity, heading focus, home content scan. | Every carousel/occasion, newsletter, consent and all entry links. |
| shop | catalog: low/high prices, load-more focus/reload, sort page reset, stock dialog/sidebar, clear and under-3M history; browsing: filtered search origin restored. | Range-slider gestures, all category/filter/date/sort combinations, loading/API failures. |
| product | core: add-to-bag dialog entry/close and inquiry reachability; catalog: identity and route focus. | Full size/add-on/gallery/stock combinations and touch purchase completion. |
| bag | core: bag → delivery, validation summary/linked field focus, recipient/map/sender entry. | Quantity/removal/promo/address combinations and complete bag visuals. |
| checkout | core: receipt digits/reference reload, order-button reachability without submission. | All payment methods, wallet, duplicate submission, failure/return states and real payment. |
| saved | browsing: two removals, latest-only undo, empty-state recovery, restored-list reload and focus. | All saved-list sources, remote synchronization and concurrent edits. |
| search | browsing: query/history, product/Back/reload, touch clear, no-result reload, close restores filtered origin. | Complete query/language combinations and historical keyboard-clear contract. |
| signin | customer: phone/incomplete-code errors, change-number retention/reset, local demo-code completion and account navigation. | Real SMS/WebOTP, resend timing, backend identity/security and all checkout-return paths. |
| account | customer: profile invalid-email link/focus, save/reload, sign-out/history guard. | Editors/maps/reminders, balance, other account tabs, cross-customer/concurrent scenarios. |
| track | customer: empty lookup, mismatched phone, international-phone retry, resolved order reload and return to lookup. | Every order/payment/delivery state and backend authorization. |
| contact | core: map zoom reachability, invalid email/message summary and linked-field focus. | Valid submission, live messages, map/decode lifecycle and all contact actions. |
| journal | editorial: page-two reload, search reset, touch clear, empty-category recovery. | Every filter/page/query combination, loading and missing content. |
| post | editorial: featured story entry, title focus, reload and return to journal. | All classic/block articles, media states and complete visual repeatability. |
| faq | editorial: first disclosure in each of three groups opens/closes, contact navigation/focus. | Every answer, external contact action and screen-reader announcements. |
| policy | editorial: terms → returns, current link, contents anchor landing and reload; static phone/sticky tablet contents. | All five documents, every anchor, print and keyboard/AT reading behavior. |
| notfound | browsing: missing-page state and home navigation/heading focus. | Every invalid input/path and delayed-code recovery. |
| error | browsing: explicit demo error retry/reload, noindex, reachable phone fallback, home navigation. | Backend outage simulation, offline recovery and external telephone handler. |
| weddings | specialist: required-field summary/link focus, inquiry anchor retains entered draft. | Valid inquiry, calendar/select combinations, retry/completion and live studio contact. |
| presentation | specialist: touch tools entry/close, search focus, shortlist remove/clear/undo, native caption names and own toolbar geometry. | Touch share/order handoff, all settings/collections, reload/offline/TV states and physical counter display. |

Stage-specific results outside these six specs remain useful but answer narrower/different questions.
For example, stage 225 ran ten existing presentation interaction cases and two description checks;
this table does not turn those mobile/desktop results into dedicated touch or hardware evidence.

## Geometry and content-scan contract

Sources: [project configuration](templates/_e2e/playwright.config.mjs),
[control geometry helpers](templates/_e2e/device-helpers.mjs),
[content/visual helpers](templates/_e2e/helpers.mjs),
[visual configuration](templates/_e2e/visual-browser.mjs), and
[CI jobs](.github/workflows/ci.yml).

- Actions use synthesized Chromium taps with normal Playwright actionability, without force or
  JavaScript click dispatch. Text entry uses fill after touch focus; this does not open or measure
  a real software keyboard. Scrolling generally uses programmatic scrollIntoView, not swipe physics.
- Whole selected controls must fit the viewport, clear storefront header/bottom-bar rectangles and
  receive the center hit test. Automatic validation/product/result/opener focus is checked before
  corrective scrolling where explicitly asserted. This is selected-control evidence, not every
  visible control at every scroll position.
- `scanAxe` checks WCAG 2/2.1 A/AA and 2.2 AA tags after finite animations. It temporarily makes the
  storefront bottom bar static, then the dedicated cases restore it and recheck normal geometry.
  No rule is excluded. The default legacy helper leaves its adjustment in place as before.
- Each case scans one selected content state at its initial device viewport. Tablet portrait
  gets selected-control geometry; it does not get a second axe scan or a complete rotation flow.
  Presentation is bare and explicitly checks its own sticky toolbar, not nonexistent storefront bars.
- Tests use essential-consent storage, reduced motion and an advancing morning clock. Maps use
  stubbed tiles. Sign-in/orders use local demo data. New touch cases do not send valid inquiries,
  submit checkout orders or activate external WhatsApp/telephone/payment handlers.

## Execution in this audit

The combined production run selects only the six dedicated route suites. **80 passed, zero skipped,
zero failed, no retries**, with two workers: 40 touch-phone and 40 tablet. This is fresh execution
against the reviewed runtime head on local Darwin Chrome 156.0.8078.80 / Node 22.23.2. The production
runner builds the app, owns its preview on 4173 and tears it down; the existing dev preview on 5173
is preserved. `npm run check` also passes. Runtime/tests/styles/baselines are unchanged by the audit.

```sh
E2E_WORKERS=2 PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/vendra-stage227-production.json npm --prefix templates run test:e2e:build -- device-routes.spec.mjs device-browsing.spec.mjs device-customer.spec.mjs device-editorial.spec.mjs device-specialist.spec.mjs device-catalog.spec.mjs --project=touch-phone --project=tablet --retries=0 --output=/tmp/vendra-stage227-production-results --reporter=list,json
```

Discovery uses `npm --prefix templates run test:e2e -- --list --reporter=json`. Local results and
logs at `/tmp/vendra-stage227-*` are temporary evidence, not durable CI artifacts. This audit does
**not** freshly run the combined dev matrix, original device/TV/offline cases, component/hydration
suite or full repository browser suite. Dev and per-stage unit results remain the earlier staged
evidence. CI definitions select broad dev/production jobs, but inspection or this local run is not
a claim that all current-head CI/platform checks have completed.

## Remaining acceptance gates

| Gate | Current evidence / status | Next verification |
| --- | --- | --- |
| Selected touch routes | 19 routes reached/asserted by 80 bilingual cases; fresh combined production run above. | Preserve this regression set; do not relabel it complete state coverage. |
| Broad route content axe | 76 registered initial-route axe cases in storefront.spec.mjs (19 routes × two languages × mobile/desktop), not rerun here. | A fresh broad content scan is separate from selected touch states and normal-sticky reachability. |
| Full visual acceptance | 76 registered page screenshots; 152 page PNGs (76 Darwin/76 Linux), 258 total PNGs including other snapshots. Stage 220 resolved stale FA post punctuation; stage 224 refreshed two reviewed phone policy images. | No fresh full visual sweep here. Diagnose older image/stepper/map observations, then run update-disabled comparisons on the reviewed head. |
| Screenshot policy | GPU disabled, fixed clock, load/font/height settling, threshold 0/maxDiffPixels 25, native select text hidden. | Explicit image.decode/repeatability boundaries remain; no tolerance change or new baseline is justified by this audit. |
| Broader browser/hydration | Source/discovery includes them; prior stages have focused results. | Fresh dev/hydration/full browser and Linux CI evidence after remaining defects are scoped. |
| Original device/offline/TV | Stage-219 production evidence: 33 pass/eight planned skips, not rerun here. | Refresh lifecycle/offline/setup and intended TV input/viewport scenarios separately. |
| Deeper state combinations | Matrix above lists exclusions; separate historical specs exist for many of them. | Enumerate the required acceptance subset before claiming coverage of every state. |
| Physical devices and AT | No execution established by Chromium emulation or axe. | Phone/tablet Safari/Chrome, intended TV platforms, soft keyboards, VoiceOver/NVDA/JAWS with explicit EN/FA scenarios. |
| External/backend behavior | Demo data and stubbed resources bound these tests. | Separate controlled integration/security/payment evidence; never infer it from demo navigation. |

Older observations are retained in [the historical audit](ACCEPTANCE-EVIDENCE.md#open-observations):
stage-192 block-article pixels; stages 197/200/214 loading/focus timeouts; stage-210 shop photo/decode
variation; stages 212/213 bag/checkout thumbnail/stepper differences; stage-214 contact Leaflet
markup; and the stage-176 programmatic-focus/Enter search-clear observation. Later successful
repeats or touch clear tests do not establish their original cause or resolve the keyboard contract.
They are historical observations, not all newly reproduced defects.

Stage 227 prioritized reproducing the contact-map lifecycle/markup observation before changing
rendering, waits or baselines; its follow-up is below. Remaining visual/hydration/platform
verification still requires explicit results or an accepted scope decision. No completion
acceptance is assumed from the route matrix.

## Stage 228 follow-up: contact-map lifecycle

[Contact map evidence](CONTACT-MAP-EVIDENCE.md) scopes the historical empty Leaflet level as internal
DOM variation: three retained original routed PNG pairs, including EN768, have zero RGBA differences.
Current traces reproduce the empty zoom-13 level beside loaded zoom-15 tiles; an all-levels-nonempty
wait is not a valid readiness predicate. Four new bilingual phone/tablet regressions check active
map/tile/marker state, resize, completed zoom, routed unload/remount, history and reload, passing in
dev and production with one worker and no retries. No runtime or baseline changes are needed.

Discovery is now 1,745 invocations in 121 files: mobile/desktop 683 each, phone/tablet 51 each, TV 23,
components 254. Counts above remain the stage-227 snapshot; its 80-case combined production result
is prior evidence, and this stage freshly executes only the four added cases in each target.
The precise historical scheduling difference, full map/visual/device/AT acceptance and other older
observations are not declared resolved. Shop photo/decode capture diagnostics are the next stage.

## Stage 229 follow-up: shop image capture

[SHOP-IMAGE-EVIDENCE.md](SHOP-IMAGE-EVIDENCE.md) confirms the retained photo residuals and exact
historical decoded repeats without declaring the original cause resolved. Four new desktop-project
diagnostics (English/Persian × 768/1920, touch at 768, TV mode at 1920) pass in dev/production,
one worker and no retries. Direct/reload/routed entry each record settled/decoded image state and
exact consecutive main captures; this is current same-page repeatability, not cross-commit parity.
No baseline, shared settling helper or tolerance changes. No new axe/device acceptance claim.

Discovery is now 1,753 invocations/122 files: mobile/desktop 687 each, phone/tablet 51 each, TV 23,
components 254. The new file adds four deliberate mobile skips and four desktop executions. Prior
stage-227/228 counts remain snapshots; earlier route/map suites were not rerun. Next: historical
bag/checkout thumbnail capture diagnostics. Other listed acceptance gates remain open.

## Stage 230 follow-up: order thumbnails

[ORDER-THUMBNAIL-EVIDENCE.md](ORDER-THUMBNAIL-EVIDENCE.md) separates retained thumbnail residuals
from phone progress-indicator pixels. Original captures already awaited decode; ten historical repeats
are exact but do not establish the original cause. Four new historical configurations (EN390,
FA390, EN768, FA1280; desktop project with touch through 768) pass exact thumbnail capture checks
across bag, delivery, payment navigation and reload. All four shop cases also pass after shared capture
helper extraction, in dev/production with one worker and no retries. Order full-main exactness is
not claimed: exploratory two/three text pixels/max 1 are retained. No visual-policy/baseline changes.

Discovery is 1,761 invocations/123 files: mobile/desktop 691 each, phone/tablet 51 each, TV 23,
components 254. The new file adds four deliberate mobile skips and four desktop executions. Prior
inventories remain snapshots; earlier route/map suites were not rerun. Next: stage-176 SearchField
keyboard-clear audit using actual keyboard reachability. Other acceptance gates remain open.

## Stage 231 follow-up: search keyboard contract

[SEARCH-KEYBOARD-EVIDENCE.md](SEARCH-KEYBOARD-EVIDENCE.md) reproduces the forced-focus Enter
sequence and accounts for it through React Aria's press-start/input-focus behavior. The documented
keyboard path uses Escape in the focused input. Two new component cases verify Tab order, submit/
clear counts and focus; eight journal/search route cases verify keyboard filtering and matched/
empty-result recovery at default mobile/desktop widths. All 13 final dev cases (including existing
component axe) and eight production route cases pass, one worker and no retries. README callback/
focus-order wording is corrected without runtime or visual-policy changes.

Discovery is 1,771 invocations/124 files: mobile/desktop 695 each, phone/tablet 51 each, TV 23,
components 256. Prior inventories and test runs remain snapshots. The historical stage-176 symptom
is accounted for in its forced-focus path; normal keyboard clear is now directly verified. This
does not establish screen-reader activation, IME, real soft keyboards or all-browser acceptance.
Other gates remain open. Next: historical route loading/focus timeout lifecycle diagnostics.
