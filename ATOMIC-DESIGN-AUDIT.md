# Storefront composition audit

Stage 201 snapshot, 3 November 2026, on top of stage 200. This is a source audit; it does not
revalidate device behavior or certify migration completion.

## Scope and confidence

| Capability checked | Evidence and result | Confidence / limit |
| --- | --- | --- |
| Package placement | 26 atom, 33 molecule and 11 organism folders; VendraProvider and utils are foundations. No flat UI component folders remain. | Confirmed directory inventory; 72 named JSX components include VendraProvider and ChoiceTile within ChoiceGroup. |
| Page coverage | All 20 storefront Views inspected: 19 routed screens and the site coordinator. | Confirmed JSX inventory, including intrinsic elements rather than only DS imports. |
| App placement | 21 layout folders/JSX files; 143 organism folders containing 144 JSX files; one molecule folder/JSX file. | Snapshot counts, not a measure of completeness. |
| Relative dependencies | Parsed 400 JS/JSX sources across package UI, app, shared helpers and top-level storefront page modules. Literal relative imports/re-exports/dynamic imports have no missing targets or graph cycles. | Does not resolve computed imports, import.meta.glob, external dependencies, CSS or type declarations. |
| Layout ownership | All 21 layout JSX files import only React; source inspection found slot/visibility/placement composition without store access or persistence. | Confirmed current source; not an enforced app import rule. |
| Organism/service boundary | App UI imports seven shared-helper edges: six CollectionCarousel consumers and the send dialog's QR helper. Neither helper imports business services. | Source review: carousel has local overflow UI state; QR generation is pure. These are valid UI dependencies. |
| UI-local effects | PresentationDisplay owns reveal/pointer state, a timer with cleanup, and image-decode callbacks. CollectionCarousel owns measured overflow state. | Valid local UI ownership; playback, failure policy, offline lifecycle and business state remain outside these helpers. |
| Enforcement | atomic.test.cjs checks package relative static import/re-export layer direction and component names; storefront.test.cjs follows rendered layout imports for the main landmark. | No general app-layer import/cycle rule. Future additions could cross the boundary without these checks catching them. |
| Runtime and visuals | No runtime sources changed in this stage. | No new browser, screenshots, device, TV spatial-navigation or assistive-technology verification. Stage-192/197 residuals and stage-200 loading timeout remain documented. |

The package's layer placement is complete. The storefront still has focused composition work;
absence of DS imports alone does not establish that a View delegates all content markup.

## View inventory

| View | Remaining content or composition | Decision |
| --- | --- | --- |
| account | Organism/layout composition; explicit empty sticky slot. | Retain current ownership. |
| bag | Two conditional h1/accent blocks; delivery section wraps recipient/location organisms; nested branch fragments. | Extract controlled heading first; assess section placement separately with delivery/focus checks. |
| checkout | Progress div with spacing class and conditional single-child fragments. | Move placement only after checking the layout slot; preserve paying/retry states. |
| contact | Form h2 remains alongside controlled form/completion children. | Extract heading while preserving its lifetime and form/completion relationship. |
| error | Direct layout with message/actions organisms and explicit empty sticky slot. | Composition stage complete; behavior remains in logic. |
| faq | Organism/layout composition. | Retain current ownership. |
| home | Organism/layout composition. | Retain current ownership and collection UI helper. |
| journal | Organism/layout composition with multi-child feedback. | Retain required grouping. |
| notfound | Direct layout with message/actions/heading/products organisms. | Composition stage complete. |
| policy | Organism/layout composition. | Retain current ownership. |
| post | Organism/layout composition with multi-child sections. | Retain grouping and recorded screenshot residual. |
| presentation | DS.VendraProvider and DS.ToastRegion; offline effect and controlled organism descriptors. | Keep provider, toast queue and offline lifecycle in View/logic; local display UI state stays in organism. |
| product | DS.Breadcrumb content; DS.ErrorBoundary around recent content; DS.ToastRegion queue; single-child fragments. | Extract breadcrumb composition; preserve boundary resetKey and feedback ownership. |
| saved | Organism/layout composition. | Retain current ownership. |
| search | Organism/layout composition. | Retain current ownership and documented shared clear-control limitation. |
| shop | DS.SectionHeader heading; outer fragment; multi-child sidebar/feedback. | Extract heading next; remove only redundant grouping in a subsequent verified stage. |
| signin | Organism/layout composition with multi-child sections. | Retain required grouping. |
| site | Provider, live announcement, checkout notice Alert/Button, integration Alert; lazy route branches. | Extract focused notice content later; keep router, announcements, Suspense, PageBoundary and customer keys at coordinator level. |
| track | Organism/layout composition with multi-child sections. | Retain required grouping. |
| weddings | Organism/layout composition with multi-child sections. | Retain required grouping. |

Single-child fragment candidates remain in bag (12), checkout (7), contact (1), product (3), shop (1)
and site (21). These AST counts include fragments around text/expressions and conditional branches;
they are review candidates, not instructions to delete all of them. Empty sticky slots and required
multi-child groups must retain their contracts. Review keys, reset identity, state lifetime and focus
before removing branch wrappers.

## Follow-up order

1. Extract the shop heading into a storefront organism with explicit eyebrow/title/accent props.
2. Extract product breadcrumbs with explicit labels/items, retaining boundary and toast ownership.
3. Extract bag headings with controlled bag/delivery content; preserve h1 timing and focus.
4. Extract the contact form heading, then assess the site checkout notice and integration feedback.
5. Review bag delivery and checkout progress placement, then remaining single-child grouping in
   separate verified stages; preserve multi-child groups and branch identity.
6. Add app dependency/cycle checks with explicit allowances for UI helpers. Exercise forbidden
   business-service imports, missing relative targets and cycles, rather than mirroring current imports.
7. Revisit final export/type/tree-shaking and bilingual phone/tablet/TV/assistive-technology acceptance
   evidence, including unresolved historical observations, before declaring the migration complete.

This audit changes no UI or business behavior.

Stage 202 completes the shop heading extraction. The inventory above remains the stage-201 snapshot;
stage 203 completes product breadcrumbs with reset-boundary and toast ownership preserved.
Stage 204 completes controlled bag headings. Stage 205 completes the persistent contact form heading.
Stage 206 completes the site checkout notice. Stage 207 completes site integration-error feedback.
Stage 208 completes bag delivery-section placement. Stage 209 completes checkout progress placement.
Stage 210 simplifies shop View composition. Stage 211 simplifies product View composition, retaining
recent reset-boundary and toast ownership. Stage 212 simplifies bag View composition while retaining
items/delivery multi-child grouping and visibility guards. Stage 213 simplifies checkout View
composition, retaining payment grouping and payment/bank/success guards. Stage 214 simplifies site View
composition, retaining provider/live-region/boundary/loading ownership, route guards and customer keys.
Stage 215 adds app dependency/cycle enforcement to npm test, with explicit collection-carousel/QR
allowances and checks on those helpers and the DS bridge. Static imports, re-exports and literal
dynamic imports in the runtime JS/JSX graph are checked for missing targets, cycles and protected UI
boundary violations. Thirty filesystem regression scenarios exercise positive and negative graphs;
408 current modules pass. This closes the module-check gap identified in the frozen inventory,
within the documented JS/JSX/literal-import scope; it does not prove runtime state ownership.
Stage 216 records the [package contract audit](PACKAGE-CONTRACT-AUDIT.md): packed consumer root/types/
assets/SSR and no-alias tree shaking pass. CommonJS-only RAMPS/shade and automated packed-consumer
coverage gaps remain confirmed findings. Theme export/type parity with existing CommonJS members
preserved is completed by stage 217: fifteen theme values agree and both declaration forms cover
RAMPS/shade, with parity/palette and strict consumer-type regressions. Persistent packed-consumer
checks are completed in stage 218: package/size tests consume actual tarballs, resolve public assets,
compile all root values and JSX consumers, and bundle all root exports without aliases. Existing
budgets remain. Stage 219 records the [acceptance evidence audit](ACCEPTANCE-EVIDENCE.md), including
fresh device/TV and focused screenshot/axe evidence, project/geometry limits and open observations.
Stage 220 resolves its Persian post mismatch as stale Darwin separator baselines: two reviewed
images are refreshed and exact bilingual metadata regressions added. Dedicated touch/tablet route
acceptance starts in stage 221 with sixteen bilingual core-route cases, real sticky reachability,
validation focus and restored content scans. Browsing/recovery routes are next. Earlier visual/map/
loading and hardware/assistive-technology gaps remain open.

Stage 222 adds sixteen bilingual touch-phone/tablet browsing/recovery cases with shared unchanged
sticky/content-axe helpers: search origin restoration, saved latest-removal/empty-state undo and
persistence, missing-page home navigation, and error retry/home recovery. All 32 combined core/
browsing cases pass in dev and production. Customer routes are next; emulated touch acceptance
does not establish physical-device, soft-keyboard or assistive-technology acceptance.

Stage 223 adds twelve bilingual dedicated touch-phone/tablet sign-in, profile and order-lookup
cases, covering validation/focus, demo login, profile persistence/sign-out/history protection and
lookup mismatch/normalized-phone recovery. All twelve pass in dev and production using unchanged
shared sticky/content-axe/portrait helpers. Single profile errors intentionally focus the email
input. Real SMS/backend identity, deeper account/order states and physical-device/AT acceptance
remain unverified. Editorial/help-route touch coverage is next.

Stage 224 adds sixteen bilingual touch-phone/tablet editorial/help cases (journal, post, FAQ,
policy). It fixes the confirmed phone policy-anchor overlap by making the existing compact static
contents rule outrank the shared fit-based sticky rule. Normal anchor landing is checked without
corrective scrolling; wider side panels remain sticky. All sixteen pass in dev/production, plus
four policy screenshots and four policy axe checks. Two Darwin phone images are refreshed after
reviewed rasterization changes; old-sticky counterfactuals exactly match their original baselines. Weddings/presentation touch coverage
is next; physical-device/AT and earlier visual/map/loading gaps remain open.
