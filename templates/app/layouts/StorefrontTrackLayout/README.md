# StorefrontTrackLayout

Tracking Atomic Design template with React-node slots for lookup, heading, details, summary and feedback, plus externally controlled order visibility. It owns the main focus target, order header, responsive columns and sticky summary. The feedback slot holds the reorder dialog outside main, preserving its original position.

The View retains conditional slot construction, lookup visibility/descriptor mapping, timeline, delivered photo, details, summary, contact/reorder controls and the controlled reorder dialog. Tracking logic retains order matching, phone normalization, status/payment interpretation, reorder reconciliation, bag mutations and focus. This layout owns no data, callbacks, persistence or browser effects.

Preserve classes, form submission semantics and focus targets. Verify lookup validation/failure/success, tracking another order, delivered and cancelled states, pending payment details, reorder cancel/confirm and bag preservation, hydration and English/Persian responsive layouts.

StorefrontTrackLookup composes the native lookup form, heading, warning, controlled fields and submit/browse actions. View retains lookup visibility and localized mapping; tracking/shared logic retains drafts, validation/focus, normalization, number/mobile matching, failure state and matched-order navigation.

StorefrontTrackHeading composes the order eyebrow, accented title and status introduction. View retains order visibility, localized mapping and the pending-payment notice; tracking logic retains order selection and status interpretation.

StorefrontTrackPendingNotice composes the neutral clock-icon payment alert. View retains order/pending visibility and localized mapping; tracking logic retains payment/status eligibility, message selection and contact formatting.

StorefrontTrackProgress composes the timeline card. View retains order visibility and prop mapping; tracking logic retains status/step interpretation and localized steps, and package OrderTimeline retains list/current/done semantics and cancelled suppression.

StorefrontTrackDeliveryPhoto composes the delivered photo figure. View retains order/delivered visibility and localized mapping; tracking logic selects the order photo, and package ArchFrame/Picture retain image/loading and missing-source placeholder semantics.
