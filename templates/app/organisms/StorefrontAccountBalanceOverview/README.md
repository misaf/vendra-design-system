# StorefrontAccountBalanceOverview

Composes the account balance Card from explicit title, formatted amount and status text. Preserves padding 24, label/amount IDs and accessible label relationship, typography and status classes. Adds no wrapper.

View retains balance-tab visibility and surrounding top-up/history composition. Account/shared logic retains customer scope, wallet reads, formatting, discount eligibility, top-up validation, mutations and persistence. No state, effects, browser APIs or commerce rules belong here.

Verify English/Persian initial, below-threshold and topped-up balances, status changes, label relationship, reload/tab continuity, top-up checkout return and responsive/accessibility parity against the previous version.
