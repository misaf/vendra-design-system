# Linux mobile policy visual evidence — stage 234

Reviewed against stage-233 `159bfd2850344c448a638bd676ca5f6140732b8f` on 2026-11-04.
Scope: diagnose the two policy screenshot failures in reviewed-head PR #88 CI and verify a focused
correction. This does not establish complete storefront visual or physical-device acceptance.

## Retained CI artifacts

Downloaded `e2e-report` (artifact 13314842521) and `e2e-build-report` (13314136153) from
[run 41810373432](https://github.com/misaf/vendra-design-system/actions/runs/41810373432), reviewed
head `592448db743ccd3c9de9528bcbf9d487ee232287`. Both jobs fail English/Persian mobile policy pages,
including retry. All eight expected PNGs match the repository's Linux baselines byte-for-byte.

The English actual/diff and Persian diff were viewed. Differences cluster in contents-list text
and edges around the fixed bottom bar, with small footer-edge changes. The document body and
page dimensions are stable. Raw RGBA measurements are distinct from Playwright's comparator
(which can ignore antialiasing pixels even at threshold zero):

| Language / capture group | Dimensions | Raw differing pixels vs old expected | Maximum channel delta | Inclusive bounds |
| --- | --- | ---: | ---: | --- |
| EN, both jobs and both attempts | 390×3609 | 6,941 | 218 | 0,589–197,2971 |
| FA, browser initial/retry and production initial | 390×3884 | 5,158 | 214 | 218,677–387,3218 |
| FA, production retry | 390×3884 | 5,174 | 214 | 16,73–387,3218 |

All four EN actuals are raw pixel-identical. The first three FA actuals are identical; production
retry differs from them in **16 pixels/max 20**. CI's first browser-job comparator failures report
3,859 EN and 2,363 FA pixels. None of these measurements justifies relaxing threshold 0 or the
25-pixel budget.

## Source and baseline history

[Stage 224](ATOMIC-DESIGN.md) fixed phone contents links obscuring their target heading. Commit
`3309f347771f856b0d25215793aa2273976c1da4` changed the phone selector in
[information-pages.css](apps/storefront/_shared/information-pages.css) to
`.vf-page .vf-info-toc.vf-sticky-panel`, keeping it `position: static` below 768px. That outranks the
shared fit-based sticky-panel selector. The original phone selector lost that specificity contest.
Tablet/wide contents remain sticky when they fit.

That stage reviewed and refreshed **two Darwin mobile policy baselines only**. The Linux mobile
policy PNGs still come from `bd7f880118e696bd28c2d5afb750fdbb7dbb2597`, before the deliberate phone
positioning fix. The reviewed CI head includes the new source but those older Linux expectations.
The old and current rendering must be isolated before treating that history as sufficient cause.

## Counterfactual reproduction and correction

An isolated Linux AMD64 checkout used the same CI image,
`mcr.microsoft.com/playwright:v1.64.1-noble` (image config `a0d7b2b49ffa0e99787a00b7ec2af46eca58020082713f002ca9f0f1cfd1a017`).
The probe uses the existing fixed morning clock, consent, viewport 390×844, full-page capture,
software rasterization and screenshot stylesheet. It changes no app module or permanent CSS.

On the current page it injects only the former effective phone rule:

```css
@media (width < 768px) {
  .vf-page .vf-info-toc.vf-sticky-panel[data-vf-fits] {
    position: sticky;
    top: 6rem;
  }
}
```

| Language | Current capture vs old baseline | Old-rule capture vs old baseline | Static restored vs reviewed CI actual |
| --- | --- | --- | --- |
| EN | 6,962 raw pixels / max 218 | **0 pixels / max 0** | **0 pixels / max 0** |
| FA | 5,174 raw pixels / max 214 | **0 pixels / max 0** | **0 pixels / max 0** |

The first current capture differs from the canonical CI actual by 21 pixels/max 19 EN and
16 pixels/max 20 FA, within the unchanged 25-pixel policy. Removing the injected old rule returns
exactly to the canonical CI actual in both languages. The old-rule reproduction accounts for the
old expected PNGs, including their compositing/edge appearance; another runtime CSS fix is not
needed. It does not imply arbitrary pixel variation is acceptable outside the existing policy.

Refresh **only** these two reviewed Linux expectations from the common CI actuals, also matched by
the restored-static local capture:

- `page-policy-en-mobile-linux.png`
- `page-policy-fa-mobile-linux.png`

Both final images and their diffs were reviewed. Darwin, desktop and all other baselines remain
unchanged. No runtime/style/generated/dependency/test/config, mask, threshold or retry changes.
The existing full-page policy still includes fixed shell chrome; these captures do not certify
that every part of a long page is unobscured in every screenshot or scroll position.

## Verification

Final focused runs pass **eight cases per target on Linux AMD64 and Darwin**: four EN/FA mobile/
desktop policy screenshots and four corresponding existing axe cases, in both dev and production.
All use one worker, no retries and **no snapshot-update flag**. The production builds and root
`npm run check` pass. Linux candidates in the isolated checkout are byte-identical to the two
repository replacements. No new registrations are added: 1,783 dev/1,387 production invocations
remain the stage-233 inventory.

```sh
# Inside the CI Linux image, or the normal local Darwin environment:
CI=true E2E_WORKERS=1 npm --prefix apps/storefront run test:e2e -- pages.spec.mjs storefront.spec.mjs --project=mobile --project=desktop --grep 'page: policy|axe: policy' --retries=0
CI=true E2E_WORKERS=1 npm --prefix apps/storefront run test:e2e:build -- pages.spec.mjs storefront.spec.mjs --project=mobile --project=desktop --grep 'page: policy|axe: policy' --retries=0
```

On Darwin, omit `CI=true` to use the installed Chrome channel. Linux uses an isolated source copy
and Linux-installed dependencies, not Darwin node_modules. Initial VM/image setup attempts failed;
a later exploratory test invocation found the probe server still on port 5173 and ran no browser
cases. A production build on the macOS-shared mount hit EACCES while copying journal assets;
production verification moved to a task-owned native Linux volume with identical source, dependencies
and candidate PNGs. Final runs start clean and own/tear down their previews. The VM is returned to its original
stopped state and 3814 MiB setting. These setup failures are not product screenshot failures.

The original run remains red as historical evidence; this stage does not relabel it green. Its PR
triggers fresh CI, whose broad result is separate from the focused local platform results. Local
artifacts/logs use `/tmp/vendra-stage234-*`, with isolated Linux results in
`/tmp/vendra-stage234-linux/final-dev-tests.log` and `native-production-tests.log`; temporary files are not durable CI links.

Next: run update-disabled full-page comparisons on the reviewed head and assess the remaining
visual residuals. The other performance/state/physical/backend gates in
[ACCEPTANCE-COVERAGE.md](ACCEPTANCE-COVERAGE.md) remain open.
