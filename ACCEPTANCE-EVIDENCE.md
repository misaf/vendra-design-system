# Storefront acceptance evidence — stage 219

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
