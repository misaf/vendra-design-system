# Storefront migration checkpoints

Stages 201–249 record the earlier storefront migration and the verification performed at each stage. See the [storefront guide](./STOREFRONT.md) for the current layout and commands.

The stage-201 composition audit records remaining page content, valid
page-level infrastructure and app dependency-check gaps. Stage 202 completes the shop heading;
stage 203 completes product breadcrumbs. Stage 204 completes controlled bag headings; the contact
form heading is completed in stage 205. Stage 206 completes the site checkout notice; site
integration-error feedback is completed in stage 207. Stage 208 completes bag delivery-section
placement; stage 209 completes checkout progress placement. Stage 210 simplifies shop View
composition; stage 211 simplifies product View composition while retaining recent reset-boundary and
toast ownership. Stage 212 simplifies bag View composition, retaining multi-child groups and
controlled visibility. Stage 213 simplifies checkout View composition, retaining payment grouping and
all payment/bank/success guards. Stage 214 simplifies site View composition, retaining provider/live-
region/boundary/loading ownership, route guards and customer keys. Stage 215 wires app dependency
checks into `npm test`: UI layer/helper boundaries, missing literal relative targets and runtime
JS/JSX cycles, with thirty filesystem regression scenarios. Only collection-carousel and QR are
shared UI-helper allowances, and their own imports are constrained. See the stage-215 checkpoint
for scope and exclusions. Stage 216 records the package contract audit:
packed consumer imports/types/assets/SSR and no-alias tree shaking pass, with theme export/type
asymmetry and persistent consumer-test gaps documented. Stage 217 resolves theme parity additively:
RAMPS/shade are available through both entry forms and types, with runtime/type regressions.
Stage 218 automates actual packed consumers in package/size tests: public assets/private subpaths,
all root value types and JSX consumers, no-alias bundles including lowercase namespaces, and unused
import removal. Packing is offline with scripts disabled; peers are reused without installation.
Stage 219 records the acceptance evidence audit: device/TV execution,
focused visual/axe evidence, real-sticky and project coverage limits, and hardware/screen-reader gaps.
Stage 220 corrects two stale Darwin Persian post baselines after tracing their old raised-dot
separators to the earlier intentional comma change. Exact metadata regressions cover classic/block
articles and related stories. Stage 221 adds dedicated touch-phone/tablet core-route acceptance
(product, bag/delivery, checkout, contact): taps, normal-sticky control reachability, validation
focus, receipt recovery and portrait geometry. Content axe temporarily unsticks the bottom bar,
then restores it; it is separate from actual sticky geometry checks. Browsing/recovery routes are
next. Physical-device, soft-keyboard and assistive-technology acceptance remain open.

Stage 222 adds dedicated touch browsing/recovery acceptance: filtered shop/search/product state
restoration, saved latest-removal and empty-state undo, missing-page home navigation and error
retry/home recovery. Sixteen new bilingual cases reuse the stage-221 sticky reachability/content
axe policy via device-helpers.mjs. All 32 combined cases pass in dev and production. Customer routes
are next; physical-device, soft-keyboard and screen-reader acceptance remain open.

Stage 223 adds dedicated touch customer-route acceptance: bilingual phone/code validation and demo
sign-in, profile email recovery/save/reload/sign-out/history guard, and order lookup failure/retry/
reload/return. All twelve cases pass in dev and production with unchanged shared device helpers.
Automatic field focus is checked before corrective scrolling; content axe and portrait geometry
remain distinct evidence. Real SMS/WebOTP/backend identity and physical-device/soft-keyboard/AT
acceptance are unverified. Editorial/help-route touch coverage is next.

Stage 224 adds touch-phone/tablet editorial/help acceptance for journal filtering/pagination,
article return navigation, FAQ disclosures/contact navigation and policy switches/anchors. It
fixes phone contents-panel overlap by strengthening the existing compact static-position rule;
landscape-tablet side contents stay sticky. All sixteen bilingual cases pass in dev/production,
plus four policy screenshots and four policy axe checks. Two reviewed Darwin phone baselines are
refreshed for rasterization changes; the old-sticky counterfactual matches their original images
exactly. custom.css is regenerated; shared helpers and desktop/Linux baselines are unchanged.
Weddings/presentation touch flows are next; hardware/soft-keyboard/AT
acceptance and older observations remain unverified.

Stage 225 covers touch weddings validation/draft-preserving anchors and presentation seller tools,
shortlist removal/clear/undo and focus return. Eight bilingual phone/tablet cases pass in dev and
production; ten existing presentation cases also pass. Catalog buttons now use native visible-
caption names with separate full-screen descriptions and decorative photos, resolving axe label/
name mismatch. Presentation's bare sticky toolbar gets explicit geometry checks. No styles or
baselines change and new cases activate no valid inquiry/share/order handoff. Home/shop discovery
and filter/sort touch acceptance are next; physical-device/soft-keyboard/AT limits remain.

Stage 226 covers home category/product round-trips and shop price sorting, load-more/reload,
stock filters and quick-filter recovery with twelve bilingual dedicated touch-phone/tablet cases.
All twelve pass in dev and production. Normal sticky reachability, automatic focus, restored
content axe and portrait control geometry use unchanged helpers. No runtime UI or baselines
change. Every registered route now has selected touch coverage; a refreshed acceptance inventory
and remaining-gap checklist are next. Full combinations, gestures and hardware/soft-keyboard/AT
acceptance remain unverified.

Stage 227 refreshes the acceptance coverage inventory, separating
1,737 registered invocations from executable/conditional coverage and mapping selected assertions
and exclusions for all 19 routes. All 80 combined dedicated touch-route cases pass freshly against
production (two workers, no retries/skips). Content axe, normal sticky reachability and portrait
geometry remain separate evidence. Full visuals/hydration, original device/offline/TV refresh,
physical devices, soft keyboards, AT and deeper state combinations are not implied complete. The
historical contact-map lifecycle/markup observation is next for focused diagnosis.

Stage 228 diagnoses the contact-map markup observation. Three retained
original routed PNG pairs are pixel-exact; the extra empty outgoing tile level is reproduced as
Leaflet lifecycle DOM, not a demonstrated visual defect. Four dedicated bilingual phone/tablet
map-lifecycle cases pass in dev/production without runtime or baseline changes. Tests check loaded
current tiles, centered marker, completed zoom, resize, routed unload/remount/history and reload.
Discovery now registers 1,745 invocations in 121 files; the stage-227 inventory remains a snapshot.
Full map/network/heap/visual/platform acceptance is not implied. Shop image/decode diagnostics are next.

Stage 229 scopes the shop photo capture observation. Retained
residuals are confirmed; all four historical decoded repeats are exact, but the original cause is
not isolated. Four bilingual 768/1920 diagnostics pass in dev/production across direct, reload and
routed entry, attaching image readiness and repeated main captures. No runtime or visual-policy/
baseline changes. Discovery is 1,753/122 files; historical configurations are not dedicated device
acceptance. Bag/checkout thumbnail observations and broader visual/platform gates remain open.

Stage 230 scopes bag/checkout thumbnail observations. Retained
residuals and ten exact historical repeats are verified; original captures already decoded images,
and the cause remains unproven. Four new affected-combination regressions check exact thumbnails
through bag/delivery/payment navigation/reload; all four shop cases also pass after shared-helper
extraction, in dev/production without retries. Full tests/check/build pass. Exploratory two/three
phone-bag text pixels/max 1 remain documented; order full-main exactness is not claimed. No runtime,
baseline or policy changes. Discovery is 1,761/123 files. SearchField keyboard-clear audit is next.

Stage 231 scopes SearchField keyboard behavior: forced-focus
Enter follows inherited focus/press semantics, while actual Tab/Enter/Escape clearing works as
documented. Two new component cases check callback counts/focus; eight journal/search keyboard
cases check filtering and recovery. All 13 dev/eight production cases and full tests/check/build
pass without retries. README callback-focus wording is corrected; no runtime or baseline changes.
Discovery is 1,771/124 files. AT/IME/soft-keyboard acceptance remains separate. Historical route
loading/focus timeout diagnostics are next.

Stage 232 scopes historical loading/focus failures. Retained
readiness failures have unfinished modules before axe; their slow-load cause and the original
stage-197 focus race remain unproven. Twelve controlled module-delay/latest-navigation/final-focus
cases pass in dev, followed by 16 existing route axe cases; all 28 pass together in production,
with one worker and no retries. Full tests/check/build pass. No runtime, timeout, baseline or policy
changes. Discovery is 1,783/125 files. Acceptance matrix/prioritized-gap refresh is next.

Stage 233 refreshes the acceptance matrix: 1,783 dev/1,387 production
registrations, with all 84 combined dedicated route/map production cases freshly passing. Completed
prior-head Linux CI remains red for EN/FA mobile policy screenshots in both broad jobs, despite
passing unit/React 19, route axe, hydration and other page comparisons. Expected/actual/diff artifact
diagnosis is next; no baseline refresh is assumed. Historical causes and hardware/backend acceptance
remain open. This stage changes documentation only and preserves history.

Stage 234 corrects stale Linux phone policy expectations.
The old sticky-rule counterfactual reproduces both old PNGs exactly in the CI-matched Linux image;
restoring static contents matches the common CI actuals exactly. Only two Linux mobile PNGs change.
Eight policy screenshot/axe cases pass per dev/production target on Linux and Darwin without
retries or snapshot updates; check/build pass. No runtime/tolerance changes. Original CI remains
historical red, with broad fresh PR CI separate. Full-page visual comparisons/residual review are
next; other state/platform/backend gates remain open.

Stage 235 audits the full default page matrix: 304 first-run
invocations; Darwin dev/production each 66 pass/10 screenshot fail, Linux dev 73 pass/three fail
(two screenshots/one readiness), Linux production 76 pass. Three Linux serial repeats pass, with
original failures/unknown causes retained. Ten Darwin stale-text expectations persist across both
targets; source/history and inspected crops support focused review next. All baseline PNGs remain
unchanged. Docs/check/build only; full visual/migration acceptance remains open.

Stage 236 corrects ten stale Darwin content expectations.
All ten old-content counterfactuals pass the original policy. The product total's removed dot is
verified separately from the shared Persian separator. Adopted images are retained stage-235 dev
captures; all other 248 snapshots remain unchanged. Darwin dev and production each pass all 76 default page comparisons, with two workers,
zero skips/retries and snapshot updates explicitly disabled.
Linux development readiness/map causes and deeper state/platform/backend acceptance remain open.

Stage 237 diagnoses Linux capture/readiness symptoms.
Fixed-clock CPU4 map probes reproduce the EN failure exactly and FA within one raw pixel; public
tooltip update restores both baselines exactly. FA callback instrumentation records a transient
1×1 viewport/font-loading phase measuring width98 instead of101, leaving the observed offset.
Six post controls show the four unfinished background modules can remain held while the post
renders; an active-post hold produces the old missing-main signature and recovers after release.
No source/policy/baseline changes; exact post scheduling cause and tiny-viewport origin remain open.
Next: test lifecycle-safe tooltip repositioning after later font loads, then a supported correction.

Stage 238 corrects map labels after later font loads.
PlacesMap refreshes current tooltips on FontFaceSet loading completion and removes the listener
on unmount. Three new component regressions fail before the correction and pass afterward.
The Linux CPU4 capture again measures temporary narrow widths, then automatically recenters labels;
first/second PNGs differ from old baselines by only one low-amplitude zoom-control pixel each.
All 68 targeted browser cases pass across Darwin/Linux dev/production, with no retries/skips;
unit/check/build, unchanged snapshot hashes and discovery checks pass. Inventory is 1,786 dev /
1,387 production. Contact/lifecycle comparisons use snapshot updates disabled.
No baseline or screenshot-policy changes. The post readiness deadline and tiny-viewport attribution
remain separate. Next: isolate active post load/evaluation timing; retain broader acceptance gates.

Stage 239 separates post HTTP completion from evaluation readiness.
Four new bilingual default-project cases hold real post module evaluation after HTTP200, assert
the original helper's five-second missing-main deadline, then verify article/locale and first-load
focus recovery on release. The source module is changed only by test interception.
All 64 route lifecycle cases pass on Darwin/Linux dev/production, with one worker, no skips/retries
and snapshot updates disabled. Check/build, unchanged baseline hashes and discovery pass; inventory
is 1,790 dev / 1,391 production.
No runtime/policy/baseline changes. This establishes the waiting/recovery contract, not the original
unobserved scheduling cause. Next: explicit state/integrity acceptance mapping; retain old latency
and other acceptance residuals without adding speculative waits.

Stage 240 maps the state/integrity acceptance subset.
Sixteen explicit frontend invariants are linked to actual browser/unit assertions and residuals.
A four-case dev probe confirms F01: the named payment-failure axe fixture is redirected to delivery
and still passes axe. This is a coverage defect, separate from the working refused-payment path.
All 96 selected browser cases pass on Darwin dev/production, including distinct TV controls, with
no skips/retries or snapshot updates. Fresh unit/check/build and unchanged baseline/inventory
checks pass. The four F01 observations are separate diagnostics, not added to the 96 cases.
No runtime/test/baseline changes. True cross-tab concurrency, server idempotency and offline writes
remain unproved. Next: repair F01's payment-state setup and assert the intended state before axe.

Stage 241 corrects the failed-payment state fixture.
Four pre-fix assertions fail because the old setup reaches delivery. The corrected fixture fills
valid delivery, exercises the local failed bank return and requires its heading/focus/retry state
before axe. Nearby payment step/errors/completion also gain explicit state assertions.
All 120 selected state/return-flow cases pass on Darwin/Linux dev/production with one worker,
no skips/retries and snapshot updates disabled. Check/build and consistency checks pass; all 258
baseline PNGs and 1,790 dev / 1,391 production registrations remain unchanged.
No application/baseline/policy changes or new registrations. F01 is closed for this fixture;
true two-tab behavior, repeated-submit UI, offline writes and other acceptance gaps remain open.
Next: shared-origin two-tab customer switch/pending-response coverage.

Stage 242 verifies two-tab customer/response ownership.
Real shared-origin tabs switch customer identity through the demo UI while a checkout POST waits.
Trusted storage events change the submitting tab to B; old success belongs to A, failure creates no
order, and B's newer private/current state survives. Returning to A and reloading retains its history.
All 96 selected cases pass on Darwin/Linux dev/production, including 32 two-tab executions, with
one worker and no skips/retries or snapshot updates. Check/build, unchanged baseline hashes and
input checks pass. Inventory increases by eight cases per target to 1,798 dev / 1,399 production.
Existing runtime passes these controls; no application/baseline changes. This does not establish
same-account write atomicity or backend guarantees. Next: numeric promo-removal amount assertion,
then repeated-submit/remount and offline-write controls.

Stage 243 asserts numeric promo total restoration.
The existing removal flow now runs EN/FA and requires 8,450,000 → 7,605,000 → 8,450,000 Toman in
the strong total row, with localized digits/currency, code normalization and restored input focus.
All 24 selected cases pass across Darwin/Linux dev/production, including 16 removal executions,
with no skips/retries or snapshot updates. Focused feature unit/check/build and consistency checks
pass; all 258 baselines are unchanged. Inventory is 1,800 dev / 1,401 production.
No runtime/baseline changes. The result covers visible sample totals, not backend discount authority.
Next: repeated-submit/remount UI coverage, followed by offline-write/reconnect controls.

Stage 244 prevents pending pointer replay across checkout remount.
The extended bilingual flow exposed a delayed synthetic click after disabled confirmation became
available, producing a second POST. Button now blocks pointer starts while loading/disabled.
A held real-adapter request, repeated native clicks before/after remount, original order quantity,
newer current state and one POST are checked together. Existing initial failures and readiness
residuals were recorded separately (see git history). All 80 selected cases pass across
Darwin/Linux dev/production with zero skips/retries, plus full root unit/check and fresh builds.
All 258 baselines and 1,800 dev / 1,401 production registrations are unchanged. Restoring the old
Button makes all four exact remount regressions fail with two POSTs; the patch is restored afterward.
No CSS or baseline changes; client guarding does not establish backend exactly-once behavior.
Next: offline mutation/reconnect controls.

Stage 245 verifies offline checkout and explicit reconnect recovery.
Actual browser-offline fetch failure must preserve bag, delivery, payment draft and order state.
Two reconnects send nothing; Try again only re-enables confirmation. Explicit confirmation sends
one controlled successful retry with the same payload and produces one local order. The application
already passes this behavior; no runtime or baseline changes. All 40 selected cases pass across
Darwin/Linux dev/production with zero skips/retries; focused storefront unit/check/build pass.
All 258 baselines remain unchanged; inventory increases to 1,804 dev / 1,405 production.
This is not a persistent queue or a backend exactly-once guarantee.
Next: saved-item offline write/reconnect controls.

Stage 246 verifies saved-item offline writes and explicit recovery.
Real browser-offline POST/DELETE failures preserve local intent and unrelated saved data. Two
reconnects do not replay; explicit save toggles or Undo send a controlled successful POST, update
only the target handle and survive a local reload. No runtime or baseline changes.
All 56 selected cases pass across Darwin/Linux dev/production with zero skips/retries; focused
migration/storefront unit, check and fresh production builds pass. All 258 baselines are unchanged;
inventory is 1,812 dev / 1,413 production. Shared sync-error state remains set after successful recovery;
initial handover data loss across full navigation is retained as a separate observation.
Next: reproduce initial shortlist-handover persistence, then scoped saved-sync error recovery.


## Stage 247 checkpoint: initial handover durability

Stage 247 persists initial handovers before any customer edit.
A confirmed bilingual reload regression replaced a consumed shortlist with the demo defaults.
The site now uses the same session serializer on mount and subsequent updates, preserving customer
partitions. Browser coverage checks fresh and existing visitor lists, duplicate/invalid handover IDs,
reload and full product navigation without an edit; focused unit coverage also checks bag handovers
and blocked-storage mounts. All 48 selected Darwin/Linux dev/production cases, full root unit and
check pass; all 258 baselines are unchanged. This requires available sessionStorage and does not establish server
persistence or same-account cross-tab atomicity.
Next: scoped saved-sync error ownership and recovery.

## Stage 248 checkpoint: scoped saved-sync recovery

Stage 248 clears recovered saved-item errors without hiding unresolved failures.
Initial list-load failures and individual product failures have separate ownership. A confirmed
write clears only its product; pending retries, local no-ops and other unresolved failures keep
feedback visible. Versioned outcomes prevent stale responses from hiding or reviving newer errors.
Owned stale live announcements clear after recovery while unrelated announcements are preserved.
All 48 selected Darwin/Linux dev/production cases, full root unit and check pass; 258 baselines
are unchanged.
Next: browser coverage for independent product and initial-load failure ownership.

## Stage 249 checkpoint: browser saved-error ownership

Stage 249 checks unresolved saved-error ownership through the real browser client.
Independent product failures, a failed initial read followed by a successful write, and a successful
late read following a failed write retain the unresolved alert. A fresh successful read clears
transient feedback without replaying writes. Controlled read-back can restore failed removals;
it is not a permanent local-intent or backend reconciliation guarantee.
This coverage branches directly from master and complements the recovery-clearing fix in PR #169.
All 64 selected master-based Darwin/Linux dev/production cases, root unit and check pass;
258 baselines remain unchanged. All 12 compatibility cases pass on PR #169 runtime; all three
blanket-clear negative controls fail as expected. Original master runtime is restored.
Next: review the pending saved-state PRs, then initial-load retry UX.
