# Contact map lifecycle evidence — stage 228

Reviewed 2026-11-04 against stage-227 commit
`bf692b2005fe6fc1960ac812ad98ce667bcee565`. This scopes the stage-214 contact-map markup observation;
it does not establish complete contact-page, live-map, visual or physical-device acceptance.

## Finding

The historical mismatch was an **empty outgoing Leaflet tile-level container**, not a demonstrated
rendering difference. The retained original routed-main PNG pairs are exactly equal as decoded
RGBA, including the English 768px case whose strict markup comparison stopped the probe:

| Original routed pair (baseline port 5174 / stage-214 port 5173) | Dimensions | Differing RGBA pixels | Maximum channel difference |
| --- | --- | ---: | ---: |
| English phone | 390×1656 | 0 | 0 |
| Persian phone | 390×1789 | 0 | 0 |
| English tablet-width | 768×993 | 0 | 0 |

The original log identifies `768 en routed markup` and an extra childless div with z-index 17 and
`translate3d(-740px, -375px, 0px) scale(4)`, beside the populated z-index-19 current level. The
English 768px retained image was also viewed. These are historical main captures with stubbed
blank map tiles, not a fresh screenshot sweep or real cartographic imagery. There is no retained
Persian 768px paired result from that stopped run to generalize to.

## Source and trace

- [maps.create](components/utils/maps.js) creates the map at the store-configured zoom **13**, then
  adds the tile layer. [PlacesMap.draw](components/organisms/PlacesMap/PlacesMap.jsx) centers a single
  studio place at zoom **15**. The [contact adapter](templates/storefront-contact/logic.js) supplies
  the studio place and configured defaults. The shared resize observer invalidates size and restores
  the current center/zoom; tiny pixel-rounding changes are possible.
- Vendored [Leaflet 1.9.4](templates/_vendor/leaflet/leaflet.js) creates a DOM level per tile zoom.
  `_pruneTiles` removes tile elements, while `_updateLevels` removes empty noncurrent levels on a
  later level update. A level can therefore become empty after the update and remain after loading
  has finished. It need not gain children again to be a ready map.
- Local traces of English/Persian, direct/routed entry at **768×1000**, reproduce the exact old
  empty-level transform while the map is at zoom 15, its current tiles are loaded and its layer is
  not loading. The empty level also survives the historical capture-height enlargement and a
  1024×768 → 768×1000 resize. Current populated levels change tile counts legitimately with resize.
- Source comparison between stage-213 `cb244f3` and stage-214 `eb0ea7d` shows no change to
  PlacesMap.jsx, maps.js or the Leaflet loader. This supports treating the observed internal DOM
  topology as map lifecycle state, not a proven fragment-refactor defect.

The exact asynchronous schedule that made only one historical side retain the empty level was
not reconstructed. The same DOM signature is reproduced and its lack of pixel impact in the
retained pair is established. The old scratch wait requiring **every** tile container to have
children is invalid as a readiness condition; its timeout is not evidence that the active map
failed to load. No runtime cleanup, delayed rendering or baseline/tolerance change is required by
this observation.

## Permanent regression

[contact-map-lifecycle.spec.mjs](templates/_e2e/contact-map-lifecycle.spec.mjs) adds four executable
English/Persian × touch-phone/tablet cases. Tablet starts at the historical 768×1000; phone starts
at 390×844. Both enlarge to the full-main capture height, resize to 1024×768 and restore their
initial viewport before using actual zoom controls. Existing blank-tile stubbing is retained.

The tests observe public Leaflet creation/unload hooks and check:

- One live map, tile pane, zoom control, marker, tooltip, loader script and stylesheet.
- Expected public zoom, one nonloading grid layer, loaded images in the highest-z current tile
  level, no active Leaflet zoom-animation class, and a marker centered within two pixels of its map.
  Outgoing empty level counts are intentionally not constrained.
- Zoom 15 → 16 → 15, repeated FAQ/contact navigation, history return and fresh initialization on
  reload. Each routed-away map emits unload and leaves zero active tracked instances; resizing
  does not create another map. Reload resets the instrumentation, so it does not prove old-document
  heap reclamation. No page errors occur in these sampled paths.

Exploratory versions of the new test clicked a second zoom control while Leaflet's first animation
was still running, and one rapid route-link attempt raced the shell's heading-focus adjustment.
The final tests wait for observable zoom-animation completion and for route heading focus plus its
next paint adjustment. They add no fixed sleep or global stabilization wait and do not change app
behavior. This does not explain the older, separately documented loading/focus timeout observations.

All four final cases pass in **dev and production**, one worker, no retries. Full npm tests,
`npm run check` and the production build pass. Production owns and tears down its preview; the
existing development preview is preserved. No application/component/vendor/style/generated-file,
package dependency, screenshot policy or baseline changes are made.

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e -- contact-map-lifecycle.spec.mjs --project=touch-phone --project=tablet --retries=0 --output=/tmp/vendra-stage228-final-dev-results --reporter=list
E2E_WORKERS=1 npm --prefix templates run test:e2e:build -- contact-map-lifecycle.spec.mjs --project=touch-phone --project=tablet --retries=0 --output=/tmp/vendra-stage228-production-results --reporter=list
```

Fresh discovery registers **1,745 invocations in 121 files**: mobile/desktop 683 each, dedicated
phone/tablet 51 each, TV 23, components 254. The new file registers two deliberately skipped cases
in each mobile/desktop project and two executable cases in each dedicated touch project. The six
stage-227 route suites still contribute 80 dedicated cases; their combined run is prior evidence,
not rerun in this stage. The new lifecycle set contributes four more, not a fresh 84-case sweep.

Diagnostic logs/traces use `/tmp/vendra-stage228-*`; the original probe/log/PNG files use
`/tmp/vendra-*stage214*`. These are temporary local artifacts. Relevant source behavior and observed
results are recorded here; they do not imply durable CI storage of those files.

## Remaining boundary

The particular historical empty-container observation is scoped as internal DOM variation with
identical retained pixels and successful sampled lifecycle behavior. Other map concerns remain
separate: delayed/rejected loader or fonts, real tile errors/offline/network behavior, all place
configurations, full visual repeatability, memory/observer leak analysis, keyboard/AT and physical
map interaction. No external directions, call, WhatsApp or contact-message action is activated.

Next: reproduce and scope the historical shop photo/decode capture variation with focused image
instrumentation and unchanged screenshot policy. The broader acceptance gates remain in
[ACCEPTANCE-COVERAGE.md](ACCEPTANCE-COVERAGE.md).
