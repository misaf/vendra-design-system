# StorefrontTrackOrderActions

Composes tracking contact, repeat-order and lookup actions from explicit nullable contact and controlled repeat/lookup descriptors. Preserves the flex/wrap container, primary external contact link with message icon and rel/target, secondary repeat-order control with rotate icon and callback (button for review; bag link for a standalone sample without an order), and ghost lookup button with package-search icon. Adds no wrapper.

View retains order/contact visibility, review-button versus sample-link mapping and localized descriptors. Tracking/shared logic retain order-specific contact URL, repeat-order review/confirmation, bag changes and lookup reset/focus. Package Button and the shared router retain native activation/navigation semantics. This organism owns no state, rules, persistence or browser effects.

Verify bilingual destinations/labels, native link/button behavior, repeat-order review and cancellation without bag changes, confirmation, lookup reset/focus, wrapping and responsive markup against the previous version. Inspect external contact destinations without sending messages.

Known-order repeat actions are buttons: Enter and Space open review without navigation or bag changes. Cancellation restores trigger focus; only explicit review confirmation changes the bag. Standalone samples keep the bag link when no review callback exists.
