# Storefront acceptance evidence — stage 219

For the refreshed route matrix, current registration counts and combined production results, see
[Acceptance coverage — stage 227](ACCEPTANCE-COVERAGE.md). The original sections below remain a
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
