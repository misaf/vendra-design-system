# StorefrontAccountSessionAction

Composes the account sign-out button from an explicit label and callback. Preserves the ghost variant, leading log-out icon and label fragment without adding a wrapper.

View retains localized copy and action placement. Account/shared logic retains session cleanup and home navigation; package Button retains semantics, focus and activation. No state, effects, browser APIs or session rules belong here.

Verify bilingual label/icon/variant, keyboard and touch activation, session removal, home navigation and protected account access through history/direct routes. Compare responsive appearance with the previous version.
