# Shop image capture evidence — stage 229

Reviewed 2026-11-04 against stage-228 `899df7c17fbea456e0e2205937faa08ad94f6854`.
This scopes the stage-210 photo observation; it does not establish full shop visual acceptance.

## Retained evidence

Fresh decoded-RGBA comparison of the retained stage-210 baseline/current PNGs confirms:

| English main capture | Dimensions | Different pixels | Maximum channel delta | Inclusive difference bounds |
| --- | --- | ---: | ---: | --- |
| Completed probe, 768px routed | 768×1149 | 58,613 | 30 | 24,285–495,564 |
| Completed probe, 1920px direct | 1760×2878 | 556,922 | 236 | 1054,1528–1723,2364 |
| Decoded repeat, 768px direct/routed | 768×1149 each | 0 each | 0 | none |
| Decoded repeat, 1920px direct/routed | 1760×2878 each | 0 each | 0 | none |

The wide current capture was viewed: the fourth photo is blank while its card, badge and favorite
control remain. The tablet differences are confined to photo regions. An earlier stopped attempt
recorded 90,330 differing pixels with maximum delta 33; that is a separate attempt, not the completed
probe's result. Original historical residuals remain recorded in [ATOMIC-DESIGN.md](ATOMIC-DESIGN.md).

The original scratch capture called [settlePage](templates/_e2e/helpers.mjs), waited for finite
animations and two frames, then took a main locator screenshot. `settlePage` makes images eager,
waits for load/error and stable document height, but does not call `HTMLImageElement.decode()` or
check positive natural dimensions. A complete image alone is not evidence of successful decode.
The historical repeat changed **both** viewport preparation and decoding: it enlarged the viewport
to main height plus 1000, checked unchanged main dimensions, decoded images, checked matching
selected resources and positive natural widths, and captured after painting. All four repeats match.
These simultaneous changes are not an experiment isolating decoding from viewport/paint behavior.

[Picture](components/atoms/Picture/Picture.jsx) uses native responsive sources, lazy/async loading for
nonpriority photos and a load/cache check for placeholder state. Comparing stage-209 `87dd7c5` to
stage-210 `0fad0be` finds no changes to Picture.jsx, ProductCard.jsx or the shared capture helper;
the shop change removed a redundant outer fragment. Historical failing captures did not retain
per-image currentSrc, decode outcome or paint state, so we cannot distinguish resource selection,
decode timing and capture/compositing from the PNGs alone. No current runtime defect or specific
browser cause is proven, and the exact original mismatch has not been reproduced by this stage.

## Permanent diagnostic

[shop-image-capture.spec.mjs](templates/_e2e/shop-image-capture.spec.mjs) runs four English/Persian ×
768/1920 cases in the desktop project, with touch enabled at 768 and TV mode at 1920. These are
historical capture configurations, not additional dedicated tablet or TV interaction coverage.
The mobile project registers the same four cases but deliberately skips them.

Each fresh context exercises direct shop entry, same-context reload and real home-studio shop-link
navigation, checking same-document routing and heading focus. Each of these twelve sampled states:

- Records four product photos after ordinary settling, including selected source, completion,
  natural/rendered dimensions, loading/decoding attributes, placeholder class and computed opacity.
- Enlarges the viewport before capture, checks unchanged main dimensions, explicitly decodes every
  product photo without swallowing failures, waits for finite animations and two paint frames,
  and requires positive dimensions, no waiting class and full opacity.
- Attaches before/after JSON and two consecutive main PNGs, requiring exact same-page PNG buffer
  equality. Selected resources and photo states also match across direct/reload/routed entry.
- Restores the initial viewport and checks no page errors. It changes no shared settling helper,
  runtime component, screenshot baseline, mask, threshold or retry policy.

In both final targets, all twelve ordinary-settled states already have complete photos with
positive natural widths and no waiting class; selected sources do not change during preparation.
The reviewed current English 1920 direct PNG shows all four photos, including the historical blank
fourth position. This does not recover the missing historical state.

Consecutive equality tests repeatability after explicit preparation on the current commit. They do
not compare against stage-209, refresh screenshot baselines, prove that `decode()` alone fixes the
historical observation, or prove every photo visually painted merely from natural dimensions.
Attached PNGs permit review of actual rendering. Reload is within the same browser context; no
claim about a particular HTTP cache hit is made. There is no new axe sweep in this diagnostic.

An exploratory run selected a hidden desktop header link at 768px and timed out; the final locator
uses the actual visible home-studio action. That was a test selector error, not an app navigation
failure. The interrupted exploratory run is excluded from final evidence.

## Validation and limits

Four final cases pass in development and production, one worker and no retries: twelve entry
states and twenty-four captured PNGs per target. Full `npm test`, `npm run check` and the production
build pass. Initial list-only successful runs discarded attachments; final JSON-reporter runs
retain them for review. Production owns its preview; the pre-existing development preview is preserved.

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/vendra-stage229-final-dev.json E2E_WORKERS=1 npm --prefix templates run test:e2e -- shop-image-capture.spec.mjs --project=desktop --retries=0 --output=/tmp/vendra-stage229-final-dev-results --reporter=list,json
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/vendra-stage229-final-production.json E2E_WORKERS=1 npm --prefix templates run test:e2e:build -- shop-image-capture.spec.mjs --project=desktop --retries=0 --output=/tmp/vendra-stage229-final-production-results --reporter=list,json
```

Discovery now registers 1,753 invocations in 122 files: mobile/desktop 687 each, dedicated
phone/tablet 51 each, TV 23, components 254. Earlier 80-route and four-map combined coverage was
not rerun. Diagnostics are local `/tmp/vendra-stage229-*` artifacts; original probes and images use
`/tmp/vendra-*stage210*`. Temporary files are not durable CI evidence.

The original photo residual remains a scoped, unreproduced capture observation. It is not silently
closed by exact later repeats. Full baseline/platform sweeps, slow/error/offline image behavior,
physical devices, TV spatial navigation, soft keyboards and assistive technology remain separate
acceptance gates. No external order or messaging action is activated.

Next: scope the remaining historical bag/checkout thumbnail capture differences using the same
retained-evidence-first approach, without relaxing visual policy.
