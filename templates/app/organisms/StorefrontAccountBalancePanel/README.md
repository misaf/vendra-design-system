# StorefrontAccountBalancePanel

Composes balance overview, top-up, optional checkout return and history from explicit presentation descriptors. Preserves the balance wrapper/classes, section order and secondary return link with leading arrow-left icon. Reuses the existing account balance organisms and adds no wrapper.

View retains balance-tab visibility, localized descriptor mapping, list normalization and checkout-return eligibility. Account/shared logic retains wallet reads, amounts, thresholds, validation, timers, storage, history ordering and checkout destinations. Child organisms retain their markup and package components retain interaction/accessibility. No state, effects, browser APIs or wallet rules belong here.

Verify bilingual overview/top-up/history, preset and manual amounts, invalid/pending/success states, persisted balance/history, optional checkout return and waiting checkout drafts. Compare touch/rotation, desktop/TV, containment and accessibility against the previous version.
