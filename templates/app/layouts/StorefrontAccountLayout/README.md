# StorefrontAccountLayout

Account Atomic Design template with React-node slots for heading, actions, notices, tabs, feedback and dialog. It owns the main focus target, responsive header and heading wrappers, and slot order.

The account View retains tab controls and panels, all copy, signed-in actions, profile and wallet fields, saved products, addresses, reminders and the controlled editor dialog. Account logic retains tab routing, customer isolation, persistence, validation, mutations and focus restoration. This layout owns no data, callbacks, persistence or browser effects.

Preserve existing wrapper classes and focus targets. Verify linked tabs and keyboard navigation, profile saves and recovery, address/reminder editor validation and focus return, saved-product synchronization, wallet continuity, sign-out isolation, hydration and English/Persian responsive layouts.
