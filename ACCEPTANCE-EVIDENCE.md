# Storefront acceptance evidence — stage 219

For the refreshed route matrix, current registration counts and combined production results, see
[Acceptance coverage — stage 233](ACCEPTANCE-COVERAGE.md). The original sections below remain a
historical checkpoint; later fixes and focused results are recorded in Follow-up progress.

Reviewed 2026-11-04 against stage-218 commit
`72db689e8b4ff5e3080a4eeeeeab7df4e1690a69`. This records current executable coverage, fresh
results and remaining acceptance work. The migration is not declared complete. Source inspection
and test registration counts are distinguished from executed checks.

## Capability checklist

| Capability | Evidence | Status / limit |
| --- | --- | --- |
| Test inventory | Local Playwright listing registers 1,569 tests in 113 files: mobile 637, desktop 637, touch-phone 9, tablet 9, TV 23, components 254. | Registration includes conditional skips; this stage does not execute the full inventory. |
| Route content accessibility | storefront.spec.mjs registers 19 routes × two languages × mobile/desktop = 76 axe invocations, using WCAG 2/2.1 A/AA and 2.2 AA tags. | Both projects use desktop Chromium; mobile is 390×844 with hasTouch=false. Dedicated device projects do not select this spec. |
| Axe geometry | scanAxe makes the shell bottom bar position:static before scanning. It waits finite animations and checks the page. | Valid content/semantic evidence, but does not establish reachability/occlusion with the normal sticky bar. |
| Full-page visuals | pages.spec.mjs registers 76 route/language/mobile/desktop screenshot cases. There are 152 page PNGs: 38 per mobile/desktop per Darwin/Linux. | No full-page tablet or TV project in this suite. Native select text is hidden by screenshot.css. |
| Visual comparison policy | GPU disabled in visual-browser.mjs; page clock fixed; fonts/images/page height settled; threshold 0, maxDiffPixels 25, fullPage=true. | Passing means within this policy, not byte-identical. settlePage waits image loads but does not explicitly await image.decode. |
| Touch phone | Dedicated Chromium project: 390×844, hasTouch=true; product purchase panels and 667×375 landscape→portrait behavior, presentation swipe and setup/offline flows. | Actual synthesized Chromium touch input; not a physical handset/Safari result or all-route coverage. |
| Tablet | Dedicated Chromium project: 1180×820, hasTouch=true; purchase test also uses 768×1024; presentation resizes to phone width. | Selected tablet layouts/input. Resizing presentation to 390px is not complete tablet rotation or all-route acceptance. |
| TV | Dedicated Chromium project: 1920×1080; tv.spec uses tv=1, checks home/shop/product target sizes, product arrows/Enter/focus ring, 1280×720 bag summaries and map entry/exit in both languages. | Chromium keyboard emulation; not Tizen/webOS/Android TV hardware, nor every route/dialog. |
| Production/offline | devices.spec includes cached collection loops, reconnect, service-worker update, open-display activation and shareable setup review. | Requires production target. Map tiles are stubbed. Device production results are recorded below. |
| Hydration/first layout | hydration.spec registers 24 invocations; beforeEach limits execution to desktop. Two bilingual component hydration cases plus ten shell-first-layout width/language cases can execute. | Registered and inspected; not freshly executed in this stage. Production config excludes this fixture spec. |
| CI | ci.yml runs both the dev suite and production suite, with browser/React-19 jobs after checks; screenshot update is a separate manually dispatched workflow. | Configuration inspected, not a claim of a completed full current-head CI run. Default retries can report flaky cases; fresh audit commands disable retries. |
| Physical devices | Intended iPad/Safari, WebOS, Tizen and Android TV checks are already called out in templates/README.md. | No fresh physical-device execution here. |
| Assistive technology | Axe tags, semantic checks, keyboard/focus tests and hydration are available. | No executed VoiceOver/NVDA/JAWS or other screen-reader session in this stage; they cannot be inferred from axe. |

## Fresh execution

The production device/TV run finishes with **33 passed and eight planned skips** (41 selected).
Touch-phone contributes eight passes/one skip; tablet six/three; TV nineteen/four. Skips are the
TV-only open-display worker activation on non-TV projects, phone-only landscape cases on tablet/TV,
and touch purchase-panel cases on TV. All selected TV reading-size, arrow/Enter/focus-ring, summary
and map-exit checks pass. Offline/reconnect, setup transfer and TV worker activation also pass;
those lifecycle/setup scenarios are English, while the layout/purchase/remote checks are bilingual.

The focused run finishes with **22 passed and two screenshot failures**: all sixteen axe cases and
six screenshots pass, while Persian post fails at both widths. Separate unchanged-source mobile and desktop repeats each fail again with 1,303 comparator pixels.
Both initial/repeat actual RGBA buffers match. This establishes reproducibility of the sampled
mismatch, not its cause; these failures prevent a full visual acceptance claim.
`npm run check` passes; production build succeeds as part of the device runner's web-server setup.
No runtime source, style, baseline, screenshot policy or test configuration is changed by this audit.

The production command uses one worker and no retries:

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e:build -- devices.spec.mjs tv.spec.mjs --project=touch-phone --project=tablet --project=tv --retries=0 --output=/tmp/vendra-stage219-device-results --reporter=list
```

The focused run uses one worker, no retries and updates disabled:

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e -- pages.spec.mjs storefront.spec.mjs --project=mobile --project=desktop --retries=0 --update-snapshots=none --output=/tmp/vendra-stage219-focused-results --reporter=list --grep 'page: (post|notfound) |axe: (post|notfound|contact|error) '
```

This samples eight default post/not-found screenshots and sixteen post/not-found/contact/error axe
cases. It does not cover the block-article variant or a complete 76-case screenshot/axe sweep.
Local Chrome is 156.0.8078.80 on Darwin; CI uses the pinned Playwright Linux image. Matching local
baselines does not establish Linux or physical-device acceptance.

## Open observations

| Observation | Evidence / confidence | Remaining work |
| --- | --- | --- |
| Current Persian post visual mismatch | Initial focused run exceeds the existing 25-pixel policy at both widths: 1,303 comparator pixels each. Expected/actual dimensions match: 390×5095 mobile, 1280×4969 desktop. Raw RGBA differences are 2,332 pixels each, maximum channel delta 162; bounds are 228/198–341/4045 and 482/223–987/3985. Viewed mobile diff highlights metadata text in the header/related stories. | Both isolated repeats reproduce the same comparator count and identical actual RGBA output; root cause is not established. Raw counts include differences handled differently by the screenshot comparator. No baseline/tolerance change is justified by this observation alone. |
| Stage 192 post | Historical EN390 block article retains 75 differing pixels at delta≤1; an initial FA phone photo difference did not recur. | Repeatable block-article full-content comparison remains unestablished; default-article screenshots here are different evidence. |
| Stages 197/200/214 loading/focus | Historical not-found loading/focus stops and error/site initial main-landmark timeouts passed on unchanged-source repeats. | Targeted recovery/focus checks and repeated diagnostics; no proven common cause. |
| Stage 210 shop | Historical EN768 routed photos and EN1920 direct blank-photo captures differed; decoded-image targeted repeats matched. | Reproduce selected resource/decode/capture lifecycle; repeat success did not establish the original cause. |
| Stage 212 bag | Historical FA1280 bag/delivery thumbnail differences; targeted repeat exact. | Repeatable visual evidence remains open. |
| Stage 213 checkout | Historical thumbnails and a few phone stepper pixels differed; targeted repeats exact. | Preserve original measurements and establish repeatability; do not generalize to full payment acceptance. |
| Stage 214 contact map | Historical EN768 contact main markup contained an extra empty Leaflet zoom container on one side; a scratch stabilization wait timed out. | Reproduce map lifecycle independently. FAQ/policy comparisons and contact axe do not resolve it. |
| Stage 176 SearchField | Historical programmatic focus on its tabindex=-1 clear button plus Enter did not clear; touch/pointer/Escape worked. | Recheck intended keyboard contract before classifying or changing it; not a fresh failure from this stage. |

Historical observations come from the corresponding ATOMIC-DESIGN.md checkpoints; this audit does
not relabel them as current reproduced defects. Automated content checks, interaction checks,
visual comparisons and hardware/screen-reader acceptance answer different questions.

## Follow-up order and completion boundary

1. Diagnose the reproduced Persian post metadata screenshot mismatch before
   changing styles, screenshot baselines or tolerances. Preserve expected/actual/diff evidence.
2. Add permanent route coverage for dedicated touch-phone/tablet projects, including checks of
   reachable controls/focus with the normal sticky bar. Start with product/bag/checkout/contact;
   keep content axe and sticky geometry evidence explicit.
3. Resolve or scope the older image/stepper/contact-map observations with targeted instrumentation,
   then run remaining full visual/browser/hydration and production checks on the reviewed head.
4. Record physical phone/tablet/TV and screen-reader scenarios on the intended platforms, covering
   bilingual navigation, dialogs, forms/error summaries, checkout recovery and remote controls.

Package export/type/tree-shaking and module-boundary work is covered by stages 215–218. It does
not close this UI acceptance checklist. A migration completion claim requires explicit results or
an accepted scope decision for the remaining items; no such acceptance is assumed here.

Logs and failure evidence use `/tmp/vendra-stage219-*` paths locally. They are temporary artifacts,
not durable CI evidence. The existing preview on port 5173 is retained; the production runner owns
and tears down its own preview. No external order, payment, message or live API action is needed.

## Follow-up progress

Stage 220 diagnoses the stage-219 Persian post mismatch as stale Darwin metadata punctuation.
The Darwin images predate the intentional vfSeparator change from raised dots to Persian commas
(commit 646e5ab); Linux images were updated after it and already contain commas. Only the two
Darwin Persian post baselines are refreshed, retaining the existing screenshot policy. Updated
RGBA buffers match the stable stage-219 actuals; restoring old separators in disposable pages
clears every originally differing pixel, although those diagnostic captures also have separate
photo differences. Exact bilingual metadata checks now cover classic/block articles and related
cards. A final update-disabled run passes all 32 selected checks: eight screenshots, eight metadata
cases and sixteen axe cases. Full npm tests, checks and app build also pass. The stage-219
checklist/results above remain a historical snapshot. Its first follow-up is
addressed; dedicated touch/tablet routes and normal-sticky reachability are next. Older visual/map/
loading observations and physical-device/screen-reader acceptance remain open.

Stage 221 adds sixteen dedicated touch-phone/tablet core-route cases (English/Persian product,
bag/delivery, checkout and contact). They check normal-sticky whole-control geometry, center hit
testing and touch taps, validation focus before corrective scrolling, map entry, receipt recovery
and tablet portrait reachability. Content axe uses the existing bottom-bar adjustment with opt-in
cleanup; original sticky positions are verified before/after and controls rechecked. It is not an
axe pass over every possible clipped scroll position. Exploratory target-size reports cleared when
the affected controls were fully scrolled into view; no UI size/rule exclusions were introduced.
The initial tablet width gets the content scan, while 768×1024 gets a geometry recheck. This begins
the second follow-up with four core routes; browsing/recovery routes, soft-keyboard behavior and
physical-device/assistive-technology acceptance remain open. All sixteen new cases pass in dev and production, plus sixteen legacy core-route axe checks,
with one worker and no retries. Unit/check/build validation passes. New cases use reduced motion,
essential consent and a fixed morning clock. The stage-219 inventory is historical.

Stage 222 extends dedicated touch-phone/tablet coverage with sixteen bilingual browsing/recovery
cases: filtered shop/search/product round-trip and no-result reload, saved latest-removal undo and
empty-state recovery/persistence, missing-page home navigation, and error retry/home recovery.
Shared unchanged device helpers retain stage-221 sticky hit testing, restored content axe and
portrait geometry policy. Saved automatic focus is checked before corrective scrolling. All 32
combined core/browsing cases pass in dev and production with one worker and no retries; unit/check/
production-build validation passes. Touch clear is exercised; this does not resolve the historical
programmatic-focus/Enter search-clear observation. The error route is the explicit demo recovery
page, not a simulated backend failure. Shop/home coverage here is navigation/state recovery, not
full catalog interaction acceptance. Customer routes, physical devices, soft keyboards, assistive
technology and earlier visual/map/loading observations remain open. Stage-219 counts are historical.

Stage 223 adds twelve bilingual touch-phone/tablet customer-route cases: phone/code validation and
demo sign-in, profile invalid-email recovery/save/reload/sign-out/history guard, and order lookup
mismatch/normalized-phone retry/reload/return. Automatic focus targets must already be unobscured;
profile deliberately focuses its single invalid email field, with a separately tested summary link.
The initial four profile failures were incorrect new summary-focus expectations, corrected without
runtime changes. All twelve final cases pass in dev and production with one worker and no retries;
full npm test/check and production build pass. Existing device helpers/content-axe/portrait policy
is unchanged. This covers local demo identity/orders, not real SMS/WebOTP, backend authentication
or authorization. Editorial/help routes, deeper account/order states, physical devices, soft keyboards,
assistive technology and older visual/map/loading observations remain open.

Stage 224 adds sixteen bilingual dedicated touch-phone/tablet editorial/help cases: journal
pagination/filter/empty recovery, article entry/reload/return, FAQ disclosures/contact navigation,
and policy switching/anchors/reload. The first run passed fourteen and failed two phone policy
anchors: the contents panel remained sticky over the target because its generic fit rule outranked
the existing compact static rule. A stronger compact selector restores document flow; tests assert
phone static/tablet sticky positions and unobscured anchor headings before corrective scrolling.
All sixteen final cases pass in dev and production; four existing policy screenshots and four
policy axe checks pass with updates disabled after refreshing only the two reviewed Darwin phone
policy baselines (54/71 comparator-pixel changes). A disposable old-sticky counterfactual matches
both original baselines exactly. Desktop/Linux baselines are untouched; Linux is not locally
verified. Generated custom.css is rebuilt from the source. Full npm test/check and production build pass.
Device helper/content-scan/portrait policy is unchanged. Selected editorial/help states do not
establish complete content coverage, physical-device, soft-keyboard or assistive-technology
acceptance. Weddings/presentation touch flows and older visual/map/loading observations remain open.

Stage 225 adds eight bilingual dedicated touch-phone/tablet weddings/presentation cases: wedding
validation and draft-preserving inquiry anchors, seller-tools drawer/focus return, catalog entry,
shortlist removal and clear/undo. Presentation has its own sticky toolbar and no storefront bars;
its geometry is checked separately using the unchanged reachability helper. Initial presentation
axe failures revealed independently composed tile names that mismatched visible caption words.
Native caption names, decorative control photos, explicit word separators and separate full-screen
action descriptions remove that duplicate naming source. Every tile's name is checked against its
visible text, ignoring CSS uppercase. All eight final cases pass in dev/production, plus ten existing
presentation interaction cases at mobile/desktop sizes. Full npm test/check and production build
pass. No baselines or axe rules change. These checks do not activate valid inquiry submission,
sharing or order handoff. Home/shop discovery/filter coverage, deeper specialist states, physical
devices/soft keyboards/AT and older visual/map/loading observations remain open.

Stage 226 adds twelve bilingual dedicated touch-phone/tablet home/shop cases: category/product
round-trip identity and focus, displayed low/high price order, load-more focus, reload persistence,
sort pagination reset, stock filter/dialog-or-sidebar interaction, clear recovery and quick-filter
history behavior. The existing sticky hit-testing/content-axe/portrait policy is unchanged. All
twelve final cases pass in dev and production with one worker and no retries; full npm test/check
and production build pass. An exploratory failure was a wrongly scoped test locator, corrected
without runtime changes. No UI/styles/generated files/dependencies/baselines change. Selected
coverage now reaches all registered routes across stages 221–226, not every state or combination.
The next stage refreshes the inventory and open-gap checklist. Physical-device/soft-keyboard/AT,
price-range gestures, complete combinations and earlier visual/map/loading observations remain open.

Stage 228 scopes the old contact-map observation in [CONTACT-MAP-EVIDENCE.md](CONTACT-MAP-EVIDENCE.md).
The original three retained routed PNG pairs (EN390, FA390, EN768) are exactly equal as RGBA; the
extra empty outgoing Leaflet level is reproduced beside a loaded active level and can legitimately
persist. Four permanent bilingual phone/tablet lifecycle regressions pass in dev/production using
active-level/animation/marker and unload/remount checks rather than requiring every container to
have children. No runtime or baseline change is needed. The exact original scheduling asymmetry,
full visual/map/network/heap/device/AT acceptance and other observations remain separate limits.

Stage 229 [scopes the shop photo capture observation](SHOP-IMAGE-EVIDENCE.md). Retained
residuals are confirmed; all four historical decoded repeats are exact, but the original cause is
not isolated. Four bilingual 768/1920 diagnostics pass in dev/production across direct, reload and
routed entry, attaching image readiness and repeated main captures. No runtime or visual-policy/
baseline changes. Discovery is 1,753/122 files; historical configurations are not dedicated device
acceptance. Bag/checkout thumbnail observations and broader visual/platform gates remain open.

Stage 230 [scopes bag/checkout thumbnail observations](ORDER-THUMBNAIL-EVIDENCE.md). Retained
residuals and ten exact historical repeats are verified; original captures already decoded images,
and the cause remains unproven. Four new affected-combination regressions check exact thumbnails
through bag/delivery/payment navigation/reload; all four shop cases also pass after shared-helper
extraction, in dev/production without retries. Full tests/check/build pass. Exploratory two/three
phone-bag text pixels/max 1 remain documented; order full-main exactness is not claimed. No runtime,
baseline or policy changes. Discovery is 1,761/123 files. SearchField keyboard-clear audit is next.

Stage 231 [scopes SearchField keyboard behavior](SEARCH-KEYBOARD-EVIDENCE.md): forced-focus
Enter follows inherited focus/press semantics, while actual Tab/Enter/Escape clearing works as
documented. Two new component cases check callback counts/focus; eight journal/search keyboard
cases check filtering and recovery. All 13 dev/eight production cases and full tests/check/build
pass without retries. README callback-focus wording is corrected; no runtime or baseline changes.
Discovery is 1,771/124 files. AT/IME/soft-keyboard acceptance remains separate. Historical route
loading/focus timeout diagnostics are next.

Stage 232 [scopes historical loading/focus failures](ROUTE-LIFECYCLE-EVIDENCE.md). Retained
readiness failures have unfinished modules before axe; their slow-load cause and the original
stage-197 focus race remain unproven. Twelve controlled module-delay/latest-navigation/final-focus
cases pass in dev, followed by 16 existing route axe cases; all 28 pass together in production,
with one worker and no retries. Full tests/check/build pass. No runtime, timeout, baseline or policy
changes. Discovery is 1,783/125 files. Acceptance matrix/prioritized-gap refresh is next.

Stage 233 replaces the current [acceptance matrix](ACCEPTANCE-COVERAGE.md) and preserves the prior
snapshot/follow-ups in [coverage history](ACCEPTANCE-COVERAGE-HISTORY.md). Fresh discovery is
1,783 dev/1,387 production registrations; the combined 84-case dedicated touch-route/map production
set passes without retries. Prior-head Linux CI ran broadly but fails EN/FA mobile policy screenshots
in both browser jobs. Those artifacts, not a speculative baseline refresh, are the next priority.
Other historical causes and physical/platform/state acceptance remain explicitly open. Docs/checks
only; no runtime, tests, baselines, tolerances or CI configuration changes.

Stage 234 [corrects stale Linux phone policy expectations](POLICY-LINUX-VISUAL-EVIDENCE.md).
The old sticky-rule counterfactual reproduces both old PNGs exactly in the CI-matched Linux image;
restoring static contents matches the common CI actuals exactly. Only two Linux mobile PNGs change.
Eight policy screenshot/axe cases pass per dev/production target on Linux and Darwin without
retries or snapshot updates; check/build pass. No runtime/tolerance changes. Original CI remains
historical red, with broad fresh PR CI separate. Full-page visual comparisons/residual review are
next; other state/platform/backend gates remain open.

Stage 235 [audits the full default page matrix](FULL-PAGE-VISUAL-EVIDENCE.md): 304 first-run
invocations; Darwin dev/production each 66 pass/10 screenshot fail, Linux dev 73 pass/three fail
(two screenshots/one readiness), Linux production 76 pass. Three Linux serial repeats pass, with
original failures/unknown causes retained. Ten Darwin stale-text expectations persist across both
targets; source/history and inspected crops support focused review next. All baseline PNGs remain
unchanged. Docs/check/build only; full visual/migration acceptance remains open.

Stage 236 [corrects ten stale Darwin content expectations](DARWIN-CONTENT-VISUAL-EVIDENCE.md).
All ten old-content counterfactuals pass the original policy. The product total's removed dot is
verified separately from the shared Persian separator. Adopted images are retained stage-235 dev
captures; all other 248 snapshots remain unchanged. Darwin dev and production each pass all 76 default page comparisons, with two workers,
zero skips/retries and snapshot updates explicitly disabled.
Linux development readiness/map causes and deeper state/platform/backend acceptance remain open.

Stage 237 [diagnoses Linux capture/readiness symptoms](LINUX-CAPTURE-DIAGNOSTICS.md).
Fixed-clock CPU4 map probes reproduce the EN failure exactly and FA within one raw pixel; public
tooltip update restores both baselines exactly. FA callback instrumentation records a transient
1×1 viewport/font-loading phase measuring width98 instead of101, leaving the observed offset.
Six post controls show the four unfinished background modules can remain held while the post
renders; an active-post hold produces the old missing-main signature and recovers after release.
No source/policy/baseline changes; exact post scheduling cause and tiny-viewport origin remain open.
Next: test lifecycle-safe tooltip repositioning after later font loads, then a supported correction.

Stage 238 [corrects map labels after later font loads](MAP-FONT-LOAD-EVIDENCE.md).
PlacesMap refreshes current tooltips on FontFaceSet loading completion and removes the listener
on unmount. Three new component regressions fail before the correction and pass afterward.
The Linux CPU4 capture again measures temporary narrow widths, then automatically recenters labels;
first/second PNGs differ from old baselines by only one low-amplitude zoom-control pixel each.
All 68 targeted browser cases pass across Darwin/Linux dev/production, with no retries/skips;
unit/check/build, unchanged snapshot hashes and discovery checks pass. Inventory is 1,786 dev /
1,387 production. Contact/lifecycle comparisons use snapshot updates disabled.
No baseline or screenshot-policy changes. The post readiness deadline and tiny-viewport attribution
remain separate. Next: isolate active post load/evaluation timing; retain broader acceptance gates.

Stage 239 [separates post HTTP completion from evaluation readiness](POST-EVALUATION-READINESS.md).
Four new bilingual default-project cases hold real post module evaluation after HTTP200, assert
the original helper's five-second missing-main deadline, then verify article/locale and first-load
focus recovery on release. The source module is changed only by test interception.
All 64 route lifecycle cases pass on Darwin/Linux dev/production, with one worker, no skips/retries
and snapshot updates disabled. Check/build, unchanged baseline hashes and discovery pass; inventory
is 1,790 dev / 1,391 production.
No runtime/policy/baseline changes. This establishes the waiting/recovery contract, not the original
unobserved scheduling cause. Next: explicit state/integrity acceptance mapping; retain old latency
and other acceptance residuals without adding speculative waits.

Stage 240 [maps the state/integrity acceptance subset](STATE-INTEGRITY-ACCEPTANCE.md).
Sixteen explicit frontend invariants are linked to actual browser/unit assertions and residuals.
A four-case dev probe confirms F01: the named payment-failure axe fixture is redirected to delivery
and still passes axe. This is a coverage defect, separate from the working refused-payment path.
All 96 selected browser cases pass on Darwin dev/production, including distinct TV controls, with
no skips/retries or snapshot updates. Fresh unit/check/build and unchanged baseline/inventory
checks pass. The four F01 observations are separate diagnostics, not added to the 96 cases.
No runtime/test/baseline changes. True cross-tab concurrency, server idempotency and offline writes
remain unproved. Next: repair F01's payment-state setup and assert the intended state before axe.

Stage 241 [corrects the failed-payment state fixture](PAYMENT-STATE-FIXTURE-EVIDENCE.md).
Four pre-fix assertions fail because the old setup reaches delivery. The corrected fixture fills
valid delivery, exercises the local failed bank return and requires its heading/focus/retry state
before axe. Nearby payment step/errors/completion also gain explicit state assertions.
All 120 selected state/return-flow cases pass on Darwin/Linux dev/production with one worker,
no skips/retries and snapshot updates disabled. Check/build and consistency checks pass; all 258
baseline PNGs and 1,790 dev / 1,391 production registrations remain unchanged.
No application/baseline/policy changes or new registrations. F01 is closed for this fixture;
true two-tab behavior, repeated-submit UI, offline writes and other acceptance gaps remain open.
Next: shared-origin two-tab customer switch/pending-response coverage.

Stage 242 [verifies two-tab customer/response ownership](CROSS-TAB-RESPONSE-EVIDENCE.md).
Real shared-origin tabs switch customer identity through the demo UI while a checkout POST waits.
Trusted storage events change the submitting tab to B; old success belongs to A, failure creates no
order, and B's newer private/current state survives. Returning to A and reloading retains its history.
All 96 selected cases pass on Darwin/Linux dev/production, including 32 two-tab executions, with
one worker and no skips/retries or snapshot updates. Check/build, unchanged baseline hashes and
input checks pass. Inventory increases by eight cases per target to 1,798 dev / 1,399 production.
Existing runtime passes these controls; no application/baseline changes. This does not establish
same-account write atomicity or backend guarantees. Next: numeric promo-removal amount assertion,
then repeated-submit/remount and offline-write controls.

Stage 243 [asserts numeric promo total restoration](PROMO-TOTAL-RESTORATION-EVIDENCE.md).
The existing removal flow now runs EN/FA and requires 8,450,000 → 7,605,000 → 8,450,000 Toman in
the strong total row, with localized digits/currency, code normalization and restored input focus.
All 24 selected cases pass across Darwin/Linux dev/production, including 16 removal executions,
with no skips/retries or snapshot updates. Focused feature unit/check/build and consistency checks
pass; all 258 baselines are unchanged. Inventory is 1,800 dev / 1,401 production.
No runtime/baseline changes. The result covers visible sample totals, not backend discount authority.
Next: repeated-submit/remount UI coverage, followed by offline-write/reconnect controls.

Stage 244 [prevents pending pointer replay across checkout remount](PENDING-CHECKOUT-REMOUNT-EVIDENCE.md).
The extended bilingual flow exposed a delayed synthetic click after disabled confirmation became
available, producing a second POST. Button now blocks pointer starts while loading/disabled.
A held real-adapter request, repeated native clicks before/after remount, original order quantity,
newer current state and one POST are checked together. Existing initial failures and readiness
residuals are retained separately in the evidence document. All 80 selected cases pass across
Darwin/Linux dev/production with zero skips/retries, plus full root unit/check and fresh builds.
All 258 baselines and 1,800 dev / 1,401 production registrations are unchanged. Restoring the old
Button makes all four exact remount regressions fail with two POSTs; the patch is restored afterward.
No CSS or baseline changes; client guarding does not establish backend exactly-once behavior.
Next: offline mutation/reconnect controls.

Stage 245 [verifies offline checkout and explicit reconnect recovery](OFFLINE-CHECKOUT-RECOVERY-EVIDENCE.md).
Actual browser-offline fetch failure must preserve bag, delivery, payment draft and order state.
Two reconnects send nothing; Try again only re-enables confirmation. Explicit confirmation sends
one controlled successful retry with the same payload and produces one local order. The application
already passes this behavior; no runtime or baseline changes. All 40 selected cases pass across
Darwin/Linux dev/production with zero skips/retries; focused storefront unit/check/build pass.
All 258 baselines remain unchanged; inventory increases to 1,804 dev / 1,405 production.
This is not a persistent queue or a backend exactly-once guarantee.
Next: saved-item offline write/reconnect controls.

Stage 246 [verifies saved-item offline writes and explicit recovery](SAVED-OFFLINE-RECOVERY-EVIDENCE.md).
Real browser-offline POST/DELETE failures preserve local intent and unrelated saved data. Two
reconnects do not replay; explicit save toggles or Undo send a controlled successful POST, update
only the target handle and survive a local reload. No runtime or baseline changes.
All 56 selected cases pass across Darwin/Linux dev/production with zero skips/retries; focused
migration/storefront unit, check and fresh production builds pass. All 258 baselines are unchanged;
inventory is 1,812 dev / 1,413 production. Shared sync-error state remains set after successful recovery;
initial handover data loss across full navigation is retained as a separate observation.
Next: reproduce initial shortlist-handover persistence, then scoped saved-sync error recovery.


## Stage 248 checkpoint: scoped saved-sync recovery

Stage 248 [clears recovered saved-item errors without hiding unresolved failures](SAVED-SYNC-RECOVERY-EVIDENCE.md).
Initial list-load failures and individual product failures have separate ownership. A confirmed
write clears only its product; pending retries, local no-ops and other unresolved failures keep
feedback visible. Versioned outcomes prevent stale responses from hiding or reviving newer errors.
Owned stale live announcements clear after recovery while unrelated announcements are preserved.
All 48 selected Darwin/Linux dev/production cases, full root unit and check pass; 258 baselines
are unchanged. See the evidence document for validation and remaining boundaries.
Next: browser coverage for independent product and initial-load failure ownership.
