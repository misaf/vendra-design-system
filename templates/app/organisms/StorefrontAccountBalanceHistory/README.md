# StorefrontAccountBalanceHistory

Composes the balance history section from explicit title, empty/list visibility flags, empty text and normalized entries. Preserves the heading ID/section label, empty paragraph, list/row classes, positional keys, label/date order, signed amount text and data-tone. Adds no wrapper.

View retains balance-tab visibility, list normalization and surrounding overview/top-up/checkout-return composition. Account/shared logic retains customer scope, wallet reads/writes, ordering, history mapping, localized dates/amounts, bidi isolation and persistence. No state, effects, browser APIs or wallet rules belong here.

Verify sample, empty and mixed top-up/payment history in English/Persian, sign/tone/bidi text, top-up insertion and reload, customer isolation, responsive rotation, overflow and accessibility against the previous version.
