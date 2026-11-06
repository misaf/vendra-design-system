# Linux readiness and map capture diagnosis — stage 237

Reviewed 2026-11-04 against stage-236 `b8b38d30fbeb32c72f39560841051dea893a4ae5`.
The [stage-235 first-run failures](FULL-PAGE-VISUAL-EVIDENCE.md) remain retained. This stage
reproduces the contact capture displacement and separates active post readiness from unfinished
background requests. No runtime, test policy or expectation is changed. Acceptance remains open.

## Retained trace findings

The Persian mobile post's `goto` starts at trace monotonic 141303.488 ms; its `#main` visibility
expectation starts at 145319.503 and fails at 150370.918 with the configured 5000 ms timeout.
The final DOM has an empty live status inside `#root`, no `#main`, and `html lang=en`. There is no
recorded page-console error. There are 423 network records, four unfinished (`status=-1`):

- `apps/storefront/app/organisms/StorefrontAccountTopUp/StorefrontAccountTopUp.jsx`
- `apps/storefront/app/organisms/StorefrontAccountBalanceHistory/StorefrontAccountBalanceHistory.jsx`
- `apps/storefront/_shared/ui/collection-carousel.jsx`
- `apps/storefront/_shared/ui/qr.js`

These are unfinished observations, not HTTP errors. No completed network record ends after the
failed expectation. Post Page/logic/View/copy responses are recorded as 200, but HTTP completion
does not establish ESM evaluation or React commit. Source `pages.js` preloads other routes in the
background; `storefront-site/View.jsx` renders lazy routes within Suspense. Unfinished background
requests are not automatically dependencies blocking the active article.

Contact EN/FA traces show the normal settled label positions, then a changed layer origin and
label position after full-page capture. The EN pane changes from x=0 to x=247, label transform
193→−53 (net one pixel right); FA 196→−49 (net two pixels right). The map/marker remain visually
centred. These are post-API snapshots, not a complete event chronology inside the screenshot.
The old diffs and expected/actual label crops were inspected, including the small EN zoom-control
edge residual. Stage 228's empty tile-level DOM observation remains distinct from this pixel result.

## Controlled Linux environment

Use the cached Playwright 1.64.1 Noble Linux AMD64 image, current-head source archive, matching Linux
dependencies and a native task-owned volume. GPU disabled, same default locale/timezone, consent,
map stubs, screenshot stylesheet, font/image/height helpers and morning time as `pages.spec.mjs`.
Each sample has a fresh context. Dev Vite is owned by the diagnostic runner; samples are serial.
CDP `Emulation.setCPUThrottlingRate` uses rates 1 and 4. This is an artificial scheduling control,
not a hardware measurement. The fixed sequence also changes cache warmth, so CPU rate is not proved
to be necessary or the original workload's sole cause.

For maps, retain the original fixed Date (`clock.setFixedTime`) and separately compare an advancing
clock (`clock.install({time})`). Observe the Leaflet instance through its public init hook, without
changing creation options. After `openSite`/`settlePage`, collect canvas/marker/label/pane geometry,
font state and transforms; take two full-page PNGs, call public tooltip `update()` on existing
markers as a diagnostic intervention, and take a third. Compare decoded RGBA against both the
unchanged Linux baseline and retained stage-235 failure. These raw probes are not suite passes.

## Contact reproduction

| Clock / CPU | Language | Second capture vs baseline: raw pixels / max | Second vs retained failed actual | After diagnostic tooltip update vs baseline |
| --- | --- | ---: | ---: | ---: |
| fixed / 1 | en | 0 / 0 | 735 / 209 | 0 / 0 |
| fixed / 1 | fa | 0 / 0 | 949 / 209 | 0 / 0 |
| advancing / 1 | en | 144,887 / 31 | 144,887 / 211 | 144,887 / 31 |
| advancing / 1 | fa | 144,887 / 31 | 144,887 / 210 | 144,887 / 31 |
| fixed / 4 | en | 735 / 209 | 0 / 0 | 0 / 0 |
| fixed / 4 | fa | 950 / 209 | 1 / 1 | 0 / 0 |
| advancing / 4 | en | 144,887 / 31 | 144,887 / 211 | 144,887 / 31 |
| advancing / 4 | fa | 144,886 / 210 | 144,887 / 31 | 144,849 / 209 |

With fixed Date at CPU rate 4, EN reproduces the entire historical failed image **exactly**;
FA differs from its historical failed image by just one pixel/max channel 1 at the zoom control.
Both retain the shifted label across the first and second capture, so waiting for two equal PNGs
alone would accept this wrong position. Updating the tooltip restores both baseline images exactly
in this probe. EN label x=314→315 during capture and back to 314 on update; FA x=861→863 and back
to 861. Widths remain 107/101 at the recorded phase boundaries. This intervention localizes the
rendered difference; it does not yet prove which internal event originally measured/positioned it.

The advancing clock is deliberately a separate condition. It changes tile fade appearance over
almost the entire map, so its baseline deltas cannot be read as only tooltip movement. It also
has a non-exact FA CPU 4 repeated pair. Do not switch the suite clock or refresh map expectations
to conceal either condition. The original fixed-clock failure is reproduced without changing data,
fonts, CSS, tile stubs or tolerance.

### Width measurement during capture

A second, instrumented fixed-clock/CPU 4 run wraps Leaflet's internal tooltip `_setPosition` only
to record its input, measured width, font state, viewport and resulting transform; it calls the
original implementation unchanged. FA reproduces the displacement again (950 raw pixels/max 209,
including the one-pixel zoom-control residual). The captured sequence is:

| Phase | Viewport | Fonts | Tooltip measured width | Layer point x | Result transform x |
| --- | --- | --- | ---: | ---: | ---: |
| Settled, before capture | 1280×900 | loaded | 101 | 247 | 196 |
| During first capture, 4089 ms | **1×1** | **loading** | **98** | 0 | **−49** |
| Explicit update, 4700 ms | 1280×900 | loaded | 101 | 0 | **−51** |

With the pane at x=247, the stale −49 transform yields the observed two-pixel shift. The actual
post-capture label is 101 pixels wide, but retains the position calculated using width 98. Leaflet's
vendored `_setPosition` derives top-tooltip centring from `container.offsetWidth / 2` and rounds
that offset. Its public `update()` measures again and restores the expected image exactly.
`PlacesMap.draw` currently schedules one update on the then-current `document.fonts.ready`; it
does not observe later font-loading cycles. The probe records a later cycle during capture.

This establishes a stale width measurement in the reproduced FA failure, beyond the earlier
phase-boundary observations. It does not establish which browser/capture operation caused the
transient 1×1 viewport, nor instrument the original stage-235 chronology. The instrumented EN run
passes without a transient resize, although the earlier uninstrumented EN run reproduced exactly;
observing callbacks can alter timing. No claim is made that all captures always take this path.
A focused correction should first test lifecycle-safe repositioning after subsequent font loads,
including cleanup and viewport changes, rather than alter the global clock or screenshot budget.

## Post readiness controls

Only FA non-touch mobile (390×844), matching the retained post failure, is sampled here. At each
CPU rate run normal loading, all four original unfinished background module responses held, and
the active `storefront-post/Page.jsx` held. Gates release in `finally`. The active control uses the
real module loader and awaits its request; it does not replace its component or insert a sleep.
Normal/background cases use the unchanged `openSite` helper's five-second `#main` expectation.

| CPU | Condition | First `#main` mutation, ms since document navigation | Observation |
| --- | --- | ---: | --- |
| 1 | normal | 1270 | Post renders; unchanged helper passes. |
| 1 | background-held | 755 | All four exact requests held/pending while FA post renders. |
| 1 | post-held | absent while held | No main and EN locale while held; correct FA post after release. |
| 4 | normal | 2666 | Post renders; unchanged helper passes. |
| 4 | background-held | 2908 | All four exact requests held/pending while FA post renders. |
| 4 | post-held | absent while held | No main and EN locale while held; correct FA post after release. |

All six bounded diagnostics complete their assertions. In both background-held cases the article
heading and FA locale are present while all four exact module requests are still held/pending.
The active-module-held cases have no main and `lang=en`; after release, the correct FA article
appears. This shows that the four background requests are not individually required for post
readiness and that an outstanding active route can produce the old DOM signature. It does not
reconstruct the original CPU/resource scheduling, prove all original active dependencies evaluated,
or exclude background work competing for resources. Timings are observations, not latency budgets;
normal samples follow different cache states. The old 5-second timeout remains unexplained.

## Validation and next boundary

Eight map condition samples and two instrumented samples complete, plus six post gate/control
cases with the expected assertions. These diagnostic counts are not full-suite pass counts.
Root `npm run check`, diff/document links and all 258 PNG hashes against the HEAD source archive
pass. The docs-only diff adds no test registrations (existing 1,783 dev / 1,387 production).
All three task volumes are verified absent; the Linux VM is restored to stopped / 3814 MiB.
No native host preview is started. The vendored Leaflet source computes tile fade from elapsed
Date time, consistent with the advancing-clock map-wide raster change; it is not a tooltip-only
counterfactual. Local logs retain Leaflet source-map warnings; console cleanliness is not claimed.

No screenshot baseline is refreshed, no arbitrary delay/timeout/retry is added, and no source
behavior is changed. Raw map baseline differences above are observations, not suppressed failures
or all-green screenshot claims. No fresh full-page, production, unit, axe, hydration or dedicated
phone/tablet/TV suite runs here; this is a focused Linux development diagnostic stage. Existing
stage-235 and stage-236 outcomes remain separate. PR CI must report its own result.

Next: isolate the capture-triggered tooltip positioning path, with a lifecycle-safe subsequent-font-load
repositioning experiment, then validate any narrow correction against viewport resizes and original
screenshots. The transient tiny-viewport origin needs separate attribution. Retain the separate
post scheduling/evaluation gap and other historical/state/physical/AT/backend gates in [ACCEPTANCE-COVERAGE.md](ACCEPTANCE-COVERAGE.md).

Local evidence under `/tmp/vendra-stage237*` includes the read-only source archive, raw map PNGs,
`map-results.json`, tooltip-position instrumentation, six-case `post-results.json`, logs and runner
scripts. These are temporary local artifacts, not remote CI links. Reproduce the map experiment
with the three-phase recipe above; retain failed originals before trying any intervention. The
post gate paths are enumerated above so the active/background distinction can be repeated.

## Stage 238 correction

[Map font readiness](MAP-FONT-LOAD-EVIDENCE.md) adds a mounted font-loading completion listener and
regressions for later font cycles and cleanup. The original CPU4 probe now automatically corrects
the temporary width before its first/second PNG; each differs by only one low-amplitude control
pixel. Original observations above are preserved, including the separate post timeout uncertainty.

## Stage 239 post readiness follow-up

[Post evaluation controls](POST-EVALUATION-READINESS.md) return HTTP200 for the real module, then
hold evaluation past the existing helper deadline and verify correct recovery on release. This
strengthens the active/background distinction without assigning the old trace's exact scheduling
cause or introducing a runtime change. The bounded contract is verified; state/integrity acceptance
mapping is next, with the historical latency observation retained separately.
