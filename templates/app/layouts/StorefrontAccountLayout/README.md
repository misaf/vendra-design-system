# StorefrontAccountLayout

Account Atomic Design template with React-node slots for heading, actions, notices, tabs, feedback and dialog. It owns the main focus target, responsive header and heading wrappers, and slot order.

The account View retains tab controls and panels, all copy, signed-in actions, profile and wallet fields, saved products, addresses, reminders and the controlled editor dialog. Account logic retains tab routing, customer isolation, persistence, validation, mutations and focus restoration. This layout owns no data, callbacks, persistence or browser effects.

Preserve existing wrapper classes and focus targets. Verify linked tabs and keyboard navigation, profile saves and recovery, address/reminder editor validation and focus return, saved-product synchronization, wallet continuity, sign-out isolation, hydration and English/Persian responsive layouts.

StorefrontAccountOrders composes order cards/tracking links from normalized presentation records. View retains the surrounding tab branch; account/shared logic retains history, customer isolation, formatting and destinations.

StorefrontAccountBalanceOverview composes the balance Card. View retains the balance panel, top-up/history sections and tab visibility; account/shared logic retains wallet reads, eligibility, formatting and mutations.

StorefrontAccountTopUp composes controlled top-up fields, presets and feedback. View retains checkout return/history; account/shared logic retains validation, focus, pending timer, wallet/storage mutations and persistence.

StorefrontAccountBalanceHistory composes empty/populated wallet history. View retains balance-tab visibility and normalization; account/shared logic retains customer scope, ordering, date/amount formatting and persistence.

StorefrontAccountSaved composes saved-product cards and empty recovery. View retains tab visibility/normalization; account/shared logic retains favorite synchronization/persistence, customer scope, mapping and destinations.

StorefrontAccountAddresses composes the saved map, address cards and add action. View retains tab visibility/normalization; account/shared logic retains map eligibility/failure, editor state, address mutations, validation/focus and persistence.
