# StorefrontTrackLayout

Tracking Atomic Design template with React-node slots for lookup, heading, details, summary and feedback, plus externally controlled order visibility. It owns the main focus target, order header, responsive columns and sticky summary. The feedback slot holds the reorder dialog outside main, preserving its original position.

The View retains conditional slot construction, lookup form/validation, timeline, delivered photo, details, summary, contact/reorder controls and the controlled reorder dialog. Tracking logic retains order matching, phone normalization, status/payment interpretation, reorder reconciliation, bag mutations and focus. This layout owns no data, callbacks, persistence or browser effects.

Preserve classes, form submission semantics and focus targets. Verify lookup validation/failure/success, tracking another order, delivered and cancelled states, pending payment details, reorder cancel/confirm and bag preservation, hydration and English/Persian responsive layouts.
