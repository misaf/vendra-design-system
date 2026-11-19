# StorefrontProductAdded

Controlled added-to-bag dialog receiving open/close, summary lines/sums, checkout href/callback and localized title/close/checkout/continue labels. Composes Dialog, OrderSummary and checkout/keep-shopping actions, plus an Undo action when an optional `undo` ({label, onClick}) is passed (the saved page uses it), preserving the 440px scaled maximum width, classes, checkout autofocus and native link semantics.

Product View/logic retain bag mutations, line/configuration/quantity details, subtotal calculations, dialog state, closing and checkout continuation. Dialog retains modal isolation, dismissal and focus management. No page model, state/effects, browser APIs, persistence or commerce rules move here.

Verify English/Persian default/configured summaries and subtotals, initial checkout focus, keyboard focus containment, keep-shopping/Escape/close-button dismissal and opener focus restoration, checkout navigation, touch/TV input, tablet rotation, unavailable-product closure and accessibility.

`StorefrontProductAdded.spec.mjs` covers configured summary content, checkout href/callback/autofocus, continue/close/Escape dismissal and focus return, optional Undo, keyboard focus containment and axe in English and Persian. The fixture records callbacks without navigating or mutating a bag. Run with `npm run test:e2e:dev --workspace apps/storefront -- --project=storefront-components StorefrontProductAdded`. Remaining organism coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
