# Permanent map label font readiness — stage 238

Reviewed 2026-11-04 against stage-237 `637a787cdc9430c246886ff76fbfe31995150ffb`.
[Stage 237](LINUX-CAPTURE-DIAGNOSTICS.md) reproduced the contact displacement and measured a
stale tooltip width during a later font-loading cycle. This stage corrects that component behavior.
It does not attribute the transient tiny viewport or resolve the separate post readiness timeout.

## Component ownership and correction

[PlacesMap](components/organisms/PlacesMap/PlacesMap.jsx) owns its Leaflet marker labels and mounted
map lifetime. It now refreshes existing tooltips on `document.fonts` `loadingdone`, in addition to
the initial `fonts.ready` update. The callback reads the current layer through the component ref,
so it does not retain an old layer from a previous draw. Removing the map removes the listener;
a pending initial-ready callback becomes a no-op after unmount. It does not reload the map, tiles
or markers, change route state, or alter zoom/animation policy. There are no new public props/types.

The package output is regenerated through `npm run build`; its PlacesMap module contains the same
correction. No CSS, screenshot mask, time, timeout, retry, tolerance or baseline is changed.

## Regressions before and after

Three new cases are added to the existing component spec, not a new test file:

- EN and FA each gate a real font request after the map's initial readiness. Labels first use
  a correctly positioned monospace fallback, then load a unique FontFace from the repository's
  Jost/Vazirmatn font. Width must change and labels must recenter within one pixel of their pins.
  Each case repeats a second distinct font-loading cycle, proving this is not just initial readiness.
- Unmount while a real font request is held, then release it, remount and unmount again. Observe
  the global font listener subscription's removal and single replacement, with no page errors.
  The fixture adds a mount toggle and FA label copy; no product control is introduced.

Before the runtime correction, both font tests fail their geometry check: maximum centre errors
10.4765625 px EN and 8.5703125 px FA. The third fails because the new listener does not yet exist on
remount (0 instead of 1); this is not evidence of a pre-existing listener leak. After the correction,
all six PlacesMap cases pass on Darwin and Linux, including the original pointer/keyboard and
bilingual axe coverage. No retry is used. Pending font gates release in `finally`.

## Original Linux capture probe

Run the stage-237 instrumented EN/FA desktop probe on current source in the same cached Linux
AMD64 Playwright 1.64.1 Noble image/native volume, fixed Date, software rasterization and CPU rate 4.
A fresh context is used per language. The temporary 1×1 viewport/font-loading condition occurs
again. This time the automatic callback records a second position with the loaded width:

| Language | During capture: width / tooltip x | After font load: width / tooltip x | First and second PNG vs unchanged baseline |
| --- | --- | --- | --- |
| EN | 106 / −53 | 107 / −54 | 1 raw pixel, max channel 1, at 131,831 |
| FA | 98 / −49 | 101 / −51 | 1 raw pixel, max channel 1, at 675,909 |

Both PNGs are captured **before** the diagnostic script's manual tooltip update; the automatic
component behavior already fixes the label displacement. The remaining pixel lies at the zoom
control, not the label. The probe's third/manual-update PNG retains the same one-pixel residual.
These are raw measurements, not an assertion of exact identity. Existing threshold 0/maxDiffPixels 25
comparisons separately validate contact pages below. No new baseline is adopted from these probes.

The CPU 4 reproduction is artificial scheduling evidence, not a hardware benchmark. It reproduces
the observed stale-width mechanism without proving that every original failure followed an identical
internal chronology or attributing the transient viewport to one particular browser/tool operation.

## Targeted browser verification

| Platform | Selection | Passed | Failed / skipped | Duration |
| --- | --- | ---: | --- | ---: |
| Darwin | components | 6 | 0 / 0 | 24.5 s |
| Darwin | dev-contact | 10 | 0 / 0 | 97.6 s |
| Darwin | dev-lifecycle | 4 | 0 / 0 | 71.6 s |
| Darwin | production-contact | 10 | 0 / 0 | 86.8 s |
| Darwin | production-lifecycle | 4 | 0 / 0 | 54.7 s |
| Linux | components | 6 | 0 / 0 | 18.2 s |
| Linux | dev-contact | 10 | 0 / 0 | 57.5 s |
| Linux | dev-lifecycle | 4 | 0 / 0 | 57.2 s |
| Linux | production-contact | 10 | 0 / 0 | 37.1 s |
| Linux | production-lifecycle | 4 | 0 / 0 | 32.9 s |

**68 final browser cases pass**: 34 per platform. The three pre-correction failures remain
retained as regression evidence, not retried or counted as final passes.

Component cases run only against dev fixtures. Contact comparison selection contains four default
page screenshots, four route axe cases and two Persian bidi checks per target. The map lifecycle
selection contains four EN/FA cases on dedicated touch-phone and tablet projects: actual test
viewports are 390×844 and 768×1000, with additional resize/enlargement, zoom, routed departure/
return, history and reload checks. These exercise map creation/removal, tile/marker readiness and
heading focus; they do not establish heap or physical-device behavior. Default 390px screenshot
projects are non-touch, distinct from the dedicated touch project.

All final suites use one worker and zero retries. Contact/lifecycle suites and Linux components
explicitly disable snapshot updates. Darwin's component run supplies no update flag and has no
screenshot assertion; all snapshot hashes are independently unchanged. Fresh production previews
build the application. No broader full-page sweep is claimed in this stage.

## Other validation and residuals

Root `npm test`, `npm run check` and package/application builds pass. Package checks cover SSR,
types, public exports and size limits. All 258 snapshot PNGs match the prior-head archive; five
tested implementation/fixture/spec/README/generated files match the Linux source input. Local
document links and diff checks pass. Fresh discovery is 1,786 dev registrations / 125 files and
1,387 production / 51 files: only the three new component cases increase the previous inventory.
The task Linux volume is removed and the VM restored to its original stopped / 3814 MiB state.

No fresh TV, hydration, complete routed/state, physical/AT or backend suite is claimed. The old
post scheduling/evaluation gap remains unresolved; font positioning does not explain it. Existing
Leaflet source-map warnings remain in logs, so this is not a console-clean claim. Broad PR CI
reports its own outcome, independently of local targeted results.

Next: isolate active post readiness/evaluation at the original deadline while retaining independent
background-loading controls. Keep article/payment variants, state/integrity coverage and physical/
AT/backend acceptance gates in [ACCEPTANCE-COVERAGE.md](ACCEPTANCE-COVERAGE.md) open.

Local evidence is retained under `/tmp/vendra-stage238*`: the original red component log/traces,
final Darwin and Linux JSON/log/results, the instrumented PNG/position observations, source archive,
unit/check/build logs and discovery reports. The source archive includes the five tested worktree
files over the preceding committed head; test-relevant file content is verified against the final
diff. These temporary files are not durable remote CI artifact links.
