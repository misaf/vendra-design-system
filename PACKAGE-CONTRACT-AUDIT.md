# Package contract audit — stage 216

Audited 2026-11-03 against stage-215 commit
`d72ee38bf5c20fc4f995d74390051be218adff0e`. This is an evidence checkpoint;
no runtime, declaration, package manifest, dependency or generated output changes are made.
The Atomic Design migration is not declared complete.

## Capability checklist

| Contract | Evidence and result | Confidence / boundary |
| --- | --- | --- |
| Generated output | `npm run check` passes, including source-to-dist freshness, formatting and CSS checks. | Current checkout; does not prove every consumer build system. |
| Actual npm payload | `npm pack --ignore-scripts` produces 255 files: dist payload plus package.json and readme.md. All packed dist bytes equal the checked checkout. Tarball is 321,186 bytes; unpacked files total 748,746 bytes. | Observed local tarball, not registry publication. |
| Public root runtime | Extracted tarball into a disposable consumer, imported through `@vendra/design-system`, without a dist alias. All 93 root value exports import in Node without window. | React 18.3.1 and current pinned peers, Node 22.23.2. |
| Server rendering | All 72 component exports from the extracted package render through ReactDOMServer; grouped parts use their required parent and Icon/ToastRegion receive required props. | Smoke render, not browser interactions/hydration. |
| Public root types | A strict NodeNext consumer imports all 93 runtime names as values and compiles a Persian provider/Button/ProductCard example through the public package name. | TypeScript 7.0.2, React 18 types; does not prove every declared prop agrees with runtime behavior. |
| Theme conditions | ESM exposes 13 values; CommonJS provides all 13, plus RAMPS and shade. Default-theme token output agrees between entry forms. | Confirmed entry-shape asymmetry; see finding 1. |
| Theme types | Public ESM theme consumer and `.cts` import-equals consumer compile; resolution trace selects index.d.ts, theme.d.ts and theme.d.cts through package exports. | Declared theme contract passes; extra CommonJS members are not declared. |
| Exported assets | All 16 concrete string-export paths resolve via the installed package map: styles, aggregate/per-tenant CSS, base/per-tenant token JSON, fonts and package.json. Wildcard assets have concrete matches. | Resolution/file presence, not browser font rendering or CSS visual acceptance. |
| Private paths | Public package resolution rejects dist/index.js, a component deep path and an invented layer subpath with ERR_PACKAGE_PATH_NOT_EXPORTED. | Representative private-path checks; no new per-layer public entry points. |
| Full bundle | No-alias Rolldown consumer through the packed exports map: 40,515 gzip bytes, below unchanged 40,960-byte budget. No non-peer dependency was bundled. | Current Rolldown and explicit peer externalization, not every bundler/configuration. |
| Individual exports | All 93 root values bundle individually; the largest is LocationPicker at 12,566 gzip bytes, followed by DatePicker 11,830 and PaymentStatus 11,502. | Includes lowercase helper namespaces beyond the existing uppercase-only size loop. |
| Small-component isolation | Badge 209, Card 242, Chip 254, Skeleton 432, Switch 315, VendraProvider 295 and MenuList 296 gzip bytes; each below 1,024. Badge retains only Badge.js and cx.js. | Measurements include the small consumer wrapper. |
| Unused imports | A side-effect-only root import with a sentinel export retains no package modules; output is only the sentinel (52 gzip bytes). | Does not exercise CSS imports or CSS tree shaking. |
| Existing contracts | Full `npm test` and app production build pass: types, package layers, 408-module graph, 30 dependency guard scenarios, storefront logic, API, SSR, wording, assets and size checks. | Existing tests plus this audit; no new persistent package regression suite in this stage. |

## Findings and follow-up order

### 1. Confirmed theme export/type asymmetry

`templates/_shared/domain/tenant-theme.js` returns RAMPS and shade for its internal/browser/CommonJS
interface. `templates/_build/package.cjs` copies that entire implementation to dist/theme.cjs,
while its ESM wrapper lists thirteen exports and excludes those two. Both declaration files are
copied from tenant-theme.d.ts, which also excludes them.

For example, `require('@vendra/design-system/theme').shade` is a function at runtime, but the
corresponding named ESM import is unavailable and the CommonJS type contract has no shade member.
This is a confirmed public-entry shape difference, not evidence that the thirteen declared theme
exports fail. The first scratch parity assertion stopped on the two extra members; a separate
completed pass recorded the asymmetry and verified the common declared surface and remaining checks.

The guidelines theme builder consumes RAMPS through the internal theme API. The reviewed source
search found no other shade caller outside its own implementation. This does not establish that
external CommonJS consumers never use these members. Removing them could break such consumers.

**Next stage:** align theme export/type contracts while preserving existing CommonJS members and
internal theme-builder behavior. Add explicit parity/type regression coverage. Verify the exact
shape and behavior before deciding declarations; do not silently narrow the existing runtime API.

### 2. Confirmed automated consumer-coverage gaps

The existing `package.test.cjs` copies dist and package.json into a consumer instead of consuming an
npm tarball. Its wildcard asset checks inspect dist files but do not resolve every public wildcard
path through the installed exports map. `tsconfig.package.json` compiles all declarations; the
separate React-19 job has a representative consumer, but the normal React-18 test command does not
compile all root runtime names through public exports. `size.test.mjs` aliases the package name to
dist/index.js and loops uppercase names, so the manifest and lowercase namespaces are bypassed there.

These are confirmed test-coverage gaps. The independent packed-consumer audit passed the currently
sampled contracts; it did not reproduce a root export, packing, type-resolution or tree-shaking defect.
After theme parity, promote the packed-consumer asset/type/no-alias bundle checks to persistent CI
regressions, using the existing toolchain and offline peers. Preserve the current budgets.

### 3. Acceptance still open

No new React-19 installation/run, React 18.2 minimum-peer run, alternate TypeScript/bundler matrix,
registry install, React Server Components framework run, hydration/browser, physical phone/tablet/TV,
TV spatial navigation or assistive-technology acceptance was performed in this stage. Existing
React-19 test code and CI configuration were inspected, not treated as fresh execution evidence.

The stage-214 initial loading timeouts and unresolved contact-map comparison, plus earlier visual
and device observations, remain open. Passing package contracts does not resolve them or complete
the migration's UI acceptance.

## Evidence and reproduction boundary

Local toolchain: Node 22.23.2, npm 10.9.8, TypeScript 7.0.2, React 18.3.1 and Rolldown 1.2.14.
No network installation, registry publication or dependency change was required. The consumer
resolves peers from the existing workspace installation; it is not a clean dependency-install test.

The audit used an npm tarball, extracted it into a disposable consumer, resolved asset/private
paths with createRequire, imported root/theme by package name, compiled strict NodeNext consumers,
and bundled public imports without an alias. Its scratch consumer was removed afterward. Local
scratch results are in `/tmp/vendra-stage216-contract-results.json`, type-resolution output in
`/tmp/vendra-stage216-types.log`, and logs/tarball inventory use `/tmp/vendra-stage216-*` names.
These are temporary local evidence, not durable CI artifacts. The parity-stop log is retained as
`/tmp/vendra-stage216-initial-theme-shape.log`.

The normal checks can be repeated with `npm test`, `npm run check` and
`npm --prefix templates run build:app`. The additional packed-consumer checks are a one-time audit;
they are not yet automated by those commands. The tarball's recorded SHA-1 is
`f716d1c803f094e71b7683275c0d829a78f99a09` (an evidence identifier, not a security assertion).

## Follow-up progress

Stage 217 resolves finding 1 additively: the ESM theme wrapper now exposes RAMPS/shade, and both
declaration conditions describe them. All fifteen CommonJS members and the internal implementation
are preserved. Package regressions verify full key/value parity, palette generation and strict
ESM/CommonJS positive/negative type consumers. The checklist above remains the stage-216 snapshot;
packed-consumer automation (finding 2) and the acceptance limits (finding 3) remain open.

Stage 218 addresses finding 2 with permanent npm-test coverage: actual offline tarball consumers,
all payload bytes/files, public asset and private-subpath resolution, all root value types plus
JSX/negative consumers, and no-alias bundles for every root export including helper namespaces.
Explicit consumer package scopes, ESM resolution and module-provenance assertions prevent accidental
workspace self-resolution. Existing budgets and peer-app support remain. The historical checklist
above is not rewritten; registry/peer-version/hardware/assistive-technology limits remain open.
