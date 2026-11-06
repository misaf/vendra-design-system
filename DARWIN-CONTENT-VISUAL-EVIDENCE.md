# Darwin content expectation correction — stage 236

Reviewed 2026-11-04 against stage-235 `b7639ca16f281d6b26bbb7b5fadda40a0e53935e`.
The [stage-235 audit](FULL-PAGE-VISUAL-EVIDENCE.md) found ten persistent Darwin failures.
This stage isolates the intended content changes and refreshes only those ten expectations.
It does not close the Linux development readiness/map observations or complete migration acceptance.

## Source and counterfactual evidence

The ten old expectations were captured in `bd7f880` before intentional content commit `646e5ab`:

- Cancelled sample order: `VB-TEST-1` → `VN-10187`, in both languages.
- Persian detail/blog metadata: middle-dot separators → Persian commas.
- Persian product selection total: `جمع · ۱` → `جمع ۱` (the removed dot could read as zero).

The last item was not covered by stage 235's initial separator hypothesis. Source inspection of
`storefront-product/copy.js` identifies its independent literal change. Current source behavior
is retained. The old content is restored only in intercepted development module responses:

```js
// /apps/storefront/_shared/domain/formatting.js
body = body.replace("lang === true || lang === 'fa' ? '، ' : ' · '", "' · '");
// /apps/storefront/_shared/domain/account-data.js
body = body.replace("'VN-10187'", "'VB-TEST-1'");
// /apps/storefront/storefront-product/copy.js — old literals from the same source commit
body = body
  .replace("sub: 'رز، لیسیانتوس، ساتن'", "sub: 'رز · لیسیانتوس · ساتن'")
  .replace("count => 'جمع ' + S.n(count)", "count => 'جمع · ' + S.n(count)")
  .replace("'جمع سبد، {count} مورد'", "'جمع سبد · {count} مورد'");
```

Replay against the stage-235 checkout (with its old ten expectations). Use `route.fetch()` and
`route.fulfill({response, body})` on these module paths before `openSite`.
An isolated temporary copy of `pages.spec.mjs` selects account EN/FA and home/product/journal FA;
all other clock, viewport, helper and screenshot options stay unchanged. The final independent run
passes **10/10 old-content comparisons against the old expectations**, one worker, zero retries,
`--update-snapshots=none`, installed Chrome with GPU disabled. This is policy acceptance, not
byte-for-byte equivalence. The temporary spec is removed before final discovery and delivery.
No old CSS/control/font rules are restored to obtain these passes.

An earlier exploratory matcher run used a preview owned by the concurrently running raw probe;
that owner ended and desktop navigation failed. It also omitted the product total literal and
failed that comparison. Its artifacts remain retained, but it is not the final counterfactual run.
The final run has one preview owner and includes the independently identified product copy changes.

## Image review and narrowly selected captures

All ten complete expected/current page pairs were viewed side by side, alongside source history
and decoded RGBA measurements. Page dimensions match. The four account differences are the
cancelled order code; home/journal differences are Persian metadata; product differences cover
size details and the selection total. No broad layout change is approved by this refresh.

New raw probes captured current → partial old-content → restored-current in separate contexts.
Nine restored/current pairs are raw exact; FA mobile account differs by 19 pixels/max channel 1
at existing control edges. Partial product counterfactuals leave the total change until the final
matcher restores its literal too. Other raw counterfactual residuals include low-amplitude image/
control variation; these are not all assigned to the text change or treated as proven causes.

To avoid adopting those extra probe variations, the refreshed PNGs are the retained **stage-235
Darwin development actuals**, whose decoded differences from the old expectations are the reviewed
text regions. They are not the new raw-probe captures or production FA mobile account's wider
644-pixel observation. The final update-disabled suites below independently validate this choice.

| Case | Adopted capture vs old: raw pixels / max | Changed bounds (inclusive) | New probe vs adopted: raw pixels / max |
| --- | ---: | --- | ---: |
| account-en-mobile | 523 / 232 | [49, 936, 107, 949] | 21 / 19 |
| account-en-desktop | 523 / 232 | [153, 589, 211, 602] | 0 / 0 |
| account-fa-mobile | 625 / 232 | [283, 1022, 352, 1035] | 16 / 20 |
| account-fa-desktop | 625 / 232 | [1069, 628, 1138, 641] | 0 / 0 |
| home-fa-mobile | 462 / 162 | [260, 3275, 333, 3288] | 244 / 20 |
| home-fa-desktop | 1,692 / 162 | [294, 3604, 1203, 3617] | 339 / 7 |
| product-fa-mobile | 981 / 178 | [54, 733, 358, 1462] | 16 / 20 |
| product-fa-desktop | 1,282 / 228 | [73, 546, 592, 824] | 19 / 2 |
| journal-fa-mobile | 8,614 / 163 | [113, 682, 373, 3269] | 282 / 20 |
| journal-fa-desktop | 8,617 / 163 | [204, 626, 1159, 1708] | 158 / 6 |

Raw counts include anti-aliasing; Playwright's matcher additionally classifies pixels. Its unchanged
threshold 0 / maxDiffPixels 25 is authoritative for suite results. Low-amplitude residuals above
are recorded rather than hidden by increasing tolerance or copying an unexplained full-page change.

## Verification and remaining gates

| Target | Passed | Failed / skipped / retries | Duration |
| --- | ---: | --- | --- |
| Darwin dev | **76** | 0 / 0 / 0 | 3.65 min |
| Darwin production | **76** | 0 / 0 / 0 | 2.31 min |

Both full-page runs use two workers, installed Chrome, the unchanged fixed clock/software-raster
policy, and `--update-snapshots=none --retries=0`. All 76 cases run per target; these are fresh
152 passes, independently of the ten old-content counterfactual passes. A passing comparison is
within the existing policy, not raw identity.

```sh
E2E_WORKERS=2 npm --prefix apps/storefront run test:e2e -- pages.spec.mjs --project=mobile --project=desktop --retries=0 --update-snapshots=none
E2E_WORKERS=2 npm --prefix apps/storefront run test:e2e:build -- pages.spec.mjs --project=mobile --project=desktop --retries=0 --update-snapshots=none
```

Only ten existing Darwin PNGs and documentation change. All other 248 snapshot hashes, including
all Linux expectations, remain unchanged. No application, generated output, dependency, test,
configuration, timeout, retry, mask or tolerance changes. The production runner performs a fresh
application build; root `npm run check` and diff/document consistency checks pass. The dev log
retains the existing missing `play` icon warning; this is not a console-clean claim.
No new unit, axe, hydration, dedicated touch/TV, physical/AT or backend suite is claimed. Registrations remain
1,783 dev / 1,387 production because the scratch counterfactual spec is removed.

These screenshots retain the default direct-entry, non-touch 390×844 / 1280×900 scope. They do not
cover every article/payment variant or routed state. Stage-235 Linux dev first-run failures and
separate passes remain historical evidence with unresolved causes; Linux is not rerun here.
Parent PR #91 CI was checked during this stage: unit/check, React 19, browser and production
budget jobs all succeeded. That separate Linux CI run does not establish the causes of the earlier
local failures. Fresh stage-236 PR CI has its own outcome and does not replace those originals.

Next: isolate Linux development readiness and contact-map capture failures using controlled module/
clock/map/concurrency observations. Keep historical latency/focus, deeper state, physical/AT and
backend gates in [ACCEPTANCE-COVERAGE.md](ACCEPTANCE-COVERAGE.md) open.

Local evidence is retained under `/tmp/vendra-stage236*`: raw probe `results.json`,
`canonical.json`, complete review pairs, counterfactual final JSON/log/results, and Darwin dev/
production JSON/log/results. The source counterfactual recipe above is durable; local temporary
artifacts are not remote CI artifact links.

## Adopted baseline SHA-256

- `page-account-en-mobile-darwin.png`: `7901213053923f93f730d5a2671b8dbc209ce6bd07dd3d9ab3cdc60567c24a2d`
- `page-account-en-desktop-darwin.png`: `6ce0535d2ff1fe08b642ba3fae8cca28df7f0b5ba4f6f07e5c8dccf4bf97a671`
- `page-account-fa-mobile-darwin.png`: `abd44ca1b10733dd4e6bed2aa7081d5fc93b77bed8f8f285540eb0814daa0cdd`
- `page-account-fa-desktop-darwin.png`: `46f99a1d34c355ce1984ae8f63c94d726071e6508892b2c8051f49e71c6fcc80`
- `page-home-fa-mobile-darwin.png`: `1fd54cf8c60f8783a2644aadb3270a85fc657a56d208c70e747cbd39856109dd`
- `page-home-fa-desktop-darwin.png`: `69221eed08e31f4320362fdd1f9a71d4861ea7d16b155960a37dd0bdb5312bf6`
- `page-product-fa-mobile-darwin.png`: `8065a57e3d43f0a6261126b8ec5558939e4b76e3af2e762f996ead3025765ef2`
- `page-product-fa-desktop-darwin.png`: `fd55f4b2cb46a5314671af816af935fac239301d553361a313bf736d881bcbb2`
- `page-journal-fa-mobile-darwin.png`: `bfd00b5038498c91a0f9ac816cb966078c5a17ebff9bf1565b5fca0a9b6d8782`
- `page-journal-fa-desktop-darwin.png`: `e7c903df2056fe60419d5d343b6dd9f53d9d7d345f004c6dd5a4f17445515365`
