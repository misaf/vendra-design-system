# StorefrontProductSticky

Product sticky purchase organism receiving explicit summary label/total and add label/disabled/click callback. Composes the live total and purchase button while preserving the root classes, status/atomic semantics, small price presentation and button styling.

Product View/logic retain total/count formatting, pricing, configuration/quantity state, stock decisions, bag mutations and confirmation. The organism stays in Shell's sticky slot; Shell/layout/shared CSS retain positioning, responsive visibility, bottom-bar measurement and focus offsets. No page model, state/effects, browser APIs or commerce rules move here.

Verify English/Persian totals and quantity updates, single visible responsive action, native phone/tablet touch and rotation, consent/focus clearance, desktop/TV hiding, matching bag confirmation, stock exhaustion/unavailable disabled states, no document overflow and accessibility.

`StorefrontProductSticky.spec.mjs` covers supplied total/status changes, availability and add callbacks at a compact viewport in English and Persian, with axe on disabled/enabled states and an overflow check. Shell positioning and responsive slot visibility remain page-level checks. Run with `npm run test:e2e:dev --workspace apps/florist -- --project=storefront-components StorefrontProductSticky`. Remaining organism coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
