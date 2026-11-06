# StorefrontCheckoutConfirmation

Composes noninteractive completion progress, success heading, payment-status Badge, DetailList, conditional account offer and track/shop links from explicit progress, heading, status, rows, account and links props. Preserves fragment order with no added wrapper, h1/check/accent semantics, detail/account wrappers, classes, Card variants/padding and button variants/icons. The layout retains the success wrapper.

View/logic retain completion visibility, localized copy/status, detail formatting, customer eligibility, account prefill, routing, order state and persistence. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual guest/account offer visibility, order details and payment status, completion focus/progress, tracking/shop/sign-in destinations and prefill, reload continuity, signed-in isolation, touch/tablet rotation, keyboard activation, overflow and accessibility. Compare confirmation elements with the unchanged baseline.
