# StorefrontCheckoutNotices

Composes independent retry-review warning and payment-recovery storage error notices from explicit review and saveError props. Preserves notice order, warning/danger tones, secondary review action, the vf-payment-review ID and tabIndex focus target. The layout keeps notices outside payment visibility, including bank status transitions.

View retains descriptor mapping. Checkout/shared logic retains retry eligibility, expiry/stock/customer checks, payment recovery storage, error state, focus requests, clearing pending records and review navigation. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual recovery-storage failure/recovery, retry-storage failure while bank status remains visible, expired retry focus/blocking, delivery and stock review navigation, independent notice visibility, touch/tablet rotation, keyboard activation, overflow and accessibility. Compare warning and error elements with the unchanged baseline.

`StorefrontCheckoutNotices.spec.mjs` covers independent review/storage-error visibility, notice order, the focusable review target and review callback in English and Persian, with axe on combined and individual notice states. Retry eligibility and storage recovery remain page-level tests. Run with `npm run test:e2e:dev --workspace apps/florist -- --project=storefront-components StorefrontCheckoutNotices`. Remaining coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
