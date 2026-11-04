# Bag and checkout thumbnail evidence — stage 230

Reviewed 2026-11-04 against stage-229 `02e4fe0bd608384fa6da07fc3b6454bbcb631956`.
This scopes retained stage-212/213 capture observations. It does not establish full visual acceptance.

## Retained comparisons

Fresh decoded-RGBA measurements confirm the original residuals below. Bounds are inclusive and
relative to the captured main element, rather than to the viewport.

| Historical capture | Different pixels | Maximum channel delta | Difference bounds |
| --- | ---: | ---: | --- |
| Stage 212, FA1280 bag | 8,223 | 9 | 335,265–1063,380 |
| Stage 212, FA1280 delivery | 2,099 | 6 | 335,321–382,380 |
| Stage 213, EN390 initial payment | 1,849 | 6 | 37,1900–84,1959 |
| Stage 213, EN390 restored payment | 1,974 | 6 | 25,34–266,1959 |
| Stage 213, FA390 restored payment | 63 | 1 | 123,49–364,57 |
| Stage 213, EN768 initial/restored payment | 3,948 each | 6 | 45,1435–92,1583 |
| Stage 213, FA1280 initial/restored payment | 3,948 each | 6 | 315,321–362,517 |

The EN390 restored residual separates into **125 pixels/max 1 above row 100**, in the progress indicator,
and **1,849 pixels/max 6 below row 100**, in a thumbnail. The FA390 restored residual is entirely
above row 100; its thumbnails match. FA390 initial payment is also exact. The bag original was
viewed: differences fall in its first line photo and summary photo regions. These small channel
variations are observations, not proof of a specific resampling or font-rendering cause.

All **ten** retained targeted-repeat pairs (two bag/delivery and eight initial/restored payment)
are exactly equal as RGBA. The original dimensions are unchanged: bag 1088×929, delivery
1088×2143, EN390 payment 390×2105, FA390 390×2247, EN768 768×1729 and FA1280 1088×1465.
The measurements do not replace the historical initial residuals recorded in
[ATOMIC-DESIGN.md](ATOMIC-DESIGN.md).

Unlike the earlier shop probe, these original captures **already enlarged the viewport, awaited
image decoding and two paint frames, and waited for finite animations**. Decode failures were
swallowed, and failing captures did not retain each selected resource/natural dimension/paint state.
A missing decode wait therefore does not explain this observation, and positive dimensions or
successful decode in a later repeat cannot reconstruct the earlier capture's state.

[LineItem](components/molecules/LineItem/LineItem.jsx) renders its photo through
[Picture](components/atoms/Picture/Picture.jsx); [OrderSummary](components/organisms/OrderSummary/OrderSummary.jsx)
uses [ArchFrame](components/atoms/ArchFrame/ArchFrame.jsx), which also uses Picture. Comparison of
stage-211→212 and stage-212→213 shows no changes in these four component directories. Those stages
removed redundant View fragments. The original asynchronous/browser raster state is not recoverable
from the retained PNGs. No runtime defect or particular browser cause is established by this stage.

## Current regression and scope

[order-thumbnail-capture.spec.mjs](templates/_e2e/order-thumbnail-capture.spec.mjs) adds the four
historically affected combinations: EN390, FA390, EN768 and FA1280. They execute in the desktop
project with touch enabled through 768px, at height 1000. The mobile project registers and skips
the same four cases. This is not a dedicated phone/tablet/TV or full bilingual-width matrix.

Each case captures bag photos, delivery-summary photos, initial payment-summary photos, restored
payment-summary photos after returning through delivery, and payment-summary photos after reload. It checks
real step controls, same-document continuity, heading focus after route changes, retained address
and receipt/reference, and no page errors. No order is submitted. Existing local map-tile stubbing
and the advancing morning clock are retained; the delivery pin helper uses keyboard pin placement.

The [shared capture helper](templates/_e2e/image-capture-helpers.mjs), extracted from stage 229:

- Records ordinary-settled and explicitly decoded image source/completion/natural/rendered dimensions,
  loading/decoding attributes, placeholder state and opacity.
- Enlarges the viewport, checks unchanged main size, decodes selected images **without swallowing
  failures**, awaits finite animations/two frames, and requires loaded photos with positive dimensions,
  no waiting class and full opacity. The viewport is restored afterward.
- Attaches state JSON and two consecutive captures per selected image and requires **exact PNG
  equality for each thumbnail**. Payment image state also matches across initial/restored/reload.
- Retains exact full-main comparisons for the four existing shop cases; default screenshot scope
  and their assertions are unchanged. Only the new order cases select image regions. Shared global
  settling, screenshot styles, baseline files, masks, thresholds and retry policy are unchanged.

An exploratory full-main version failed on the two phone bag cases: EN had **2 pixels/max 1** at
72,815–75,815; FA had **3 pixels/max 1** at 337,830–342,831. The English capture was viewed; these
coordinates are text below summary thumbnails. These are additional whole-main observations,
not recreated historical thumbnail differences. They are retained in the exploratory report rather
than hidden by tolerance changes. The final regression checks the requested photo regions separately
from text; it makes **no full-main exactness claim for bag/delivery/payment**. The exploratory run's
other six cases passed, but the final complete run is the validation evidence.

## Validation and remaining boundaries

Eight final cases pass in development and production, one worker and no retries: four new order
cases plus all four shop cases after helper extraction. The order set covers **20 state captures,
48 thumbnail pairs/96 PNGs** per target; shop contributes 12 state captures/24 main PNGs. Full
`npm test`, `npm run check` and the production build pass. JSON reporters retain all attachments
for inspection. Both final targets retain 32 state JSONs and 120 PNGs, with no selected-source
change during capture preparation; a current Persian desktop summary thumbnail was viewed.
List-only reporting would discard successful buffer attachments.

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/vendra-stage230-verified-dev.json E2E_WORKERS=1 npm --prefix templates run test:e2e -- shop-image-capture.spec.mjs order-thumbnail-capture.spec.mjs --project=desktop --retries=0 --output=/tmp/vendra-stage230-verified-dev-results --reporter=list,json
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/vendra-stage230-production.json E2E_WORKERS=1 npm --prefix templates run test:e2e:build -- shop-image-capture.spec.mjs order-thumbnail-capture.spec.mjs --project=desktop --retries=0 --output=/tmp/vendra-stage230-production-results --reporter=list,json
```

Discovery is 1,761 invocations in 123 files: mobile/desktop 691 each, dedicated phone/tablet 51 each,
TV 23, components 254. Older inventories remain snapshots. Earlier touch-route/map suites are not
rerun here. Temporary original artifacts use `/tmp/vendra-*stage212*` and `/tmp/vendra-*stage213*`;
fresh results use `/tmp/vendra-stage230-*`. These are not durable CI artifact URLs.

Exact current thumbnail repeats do not establish cross-commit parity, reproduce the original cause,
or close the original visual observations. Full-main text variation, complete baseline/platform
sweeps, offline/error/loading images, physical devices, TV navigation, soft keyboards and assistive
technology remain separate. No app/runtime/style/generated/dependency changes are made.

Next: audit the historical stage-176 SearchField keyboard-clear observation using actual keyboard
reachability and the intended clear/Escape contract. The wider gates remain in
[ACCEPTANCE-COVERAGE.md](ACCEPTANCE-COVERAGE.md).
