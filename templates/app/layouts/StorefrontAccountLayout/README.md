# StorefrontAccountLayout

Account Atomic Design template with React-node slots for heading, actions, notices, tabs, feedback and dialog. It owns the main focus target, responsive header and heading wrappers, and slot order.

The account View composes heading/actions/tab controls, notices and account organisms, maps their presentation descriptors and chooses visibility. Account logic retains tab routing, customer isolation, drafts, persistence, validation, mutations and focus restoration. This layout owns no data, callbacks, persistence or browser effects.

Preserve existing wrapper classes and focus targets. Verify linked tabs and keyboard navigation, profile saves and recovery, address/reminder editor validation and focus return, saved-product synchronization, wallet continuity, sign-out isolation, hydration and English/Persian responsive layouts.

StorefrontAccountOrders composes order cards/tracking links from normalized presentation records. View retains the surrounding tab branch; account/shared logic retains history, customer isolation, formatting and destinations.

StorefrontAccountBalanceOverview composes the balance Card. View retains the balance panel, top-up/history sections and tab visibility; account/shared logic retains wallet reads, eligibility, formatting and mutations.

StorefrontAccountTopUp composes controlled top-up fields, presets and feedback. View retains checkout return/history; account/shared logic retains validation, focus, pending timer, wallet/storage mutations and persistence.

StorefrontAccountBalanceHistory composes empty/populated wallet history. View retains balance-tab visibility and normalization; account/shared logic retains customer scope, ordering, date/amount formatting and persistence.

StorefrontAccountSaved composes saved-product cards and empty recovery. View retains tab visibility/normalization; account/shared logic retains favorite synchronization/persistence, customer scope, mapping and destinations.

StorefrontAccountAddresses composes the saved map, address cards and add action. View retains tab visibility/normalization; account/shared logic retains map eligibility/failure, editor state, address mutations, validation/focus and persistence.

StorefrontAccountReminders composes reminder rows, actions and feedback. View retains tab visibility/normalization; account/shared logic retains date/calendar rules, ordering/upcoming selection, editor state, reminder mutations, validation/focus and persistence.

StorefrontAccountProfile composes controlled profile fields and save action. View retains tab visibility/descriptor mapping; account/shared logic retains drafts, changed-field merges, validation/focus, locale switching, save feedback and persistence.

StorefrontAccountAddressEditor composes controlled address fields and pin/fallback. View retains branch visibility/descriptor mapping; StorefrontAccountEditorDialog owns shared dialog/summary/actions; account/shared logic retains drafts, location rules, failure state, validation/focus, mutations and persistence.

StorefrontAccountReminderEditor composes controlled reminder/date fields. View retains branch visibility/descriptor mapping; StorefrontAccountEditorDialog owns shared dialog/summary/actions; account/shared logic retains drafts, calendar/occasion rules, validation/focus, mutations and persistence.

StorefrontAccountEditorDialog composes the shared controlled editor, error feedback, field slot and save/cancel actions. View retains field selection/mapping; account/shared logic retains drafts, validation/focus, mutations and persistence.
