# StorefrontCheckoutLayout

Checkout Atomic Design template with React-node slots for notices, progress, heading, delivery review, payment, summary, bank status and success. The View controls payment visibility and conditionally constructs each slot. Notices stay outside the payment group so retry and persistence warnings remain available during bank/status transitions.

The layout owns the main focus target, payment columns, sticky summary and bank/success wrappers. The checkout View and logic retain all copy, payment-method controls, receipt inputs, review/confirmation actions, persistence, gateway callbacks and order submission. The mobile submission action remains a separate Shell slot.

Preserve existing classes and focus targets. Verify delivery review/edit continuity, card receipt validation, method selection, wallet/WhatsApp flows, bank returns/retry, duplicate-order protection, confirmation, hydration and English/Persian responsive layouts.
