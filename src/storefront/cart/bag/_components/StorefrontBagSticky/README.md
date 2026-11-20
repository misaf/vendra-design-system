# StorefrontBagSticky

Composes the compact total caption/Price and controlled delivery/payment buttons from explicit summary and action descriptors. Preserves wrapper classes/order, price styling, action variants/icons and independent visibility flags. Remains inside Shell's sticky slot.

View retains content visibility and descriptor mapping. Bag/shared logic retains totals, discounts, stock eligibility, delivery/payment validation and step/navigation callbacks. Shell and existing CSS retain responsive hiding, docking, measurements and focus clearance. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual totals after quantity/promo changes, delivery/payment actions, validation focus and back/reload, narrow/short-landscape appearance, rotation across the compact breakpoint, wider-layout hiding, empty-bag removal, overflow and accessibility. Compare bar regions with the unchanged baseline.

`StorefrontBagSticky.spec.mjs` covers supplied totals, independent action visibility/callbacks and compact delivery/payment states in English and Persian, with axe and overflow checks. Shell docking and responsive slot visibility remain page-level checks. Run with `npm run test:e2e:dev --workspace apps/florist -- --project=storefront-components StorefrontBagSticky`. Remaining coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
