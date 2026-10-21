# StorefrontErrorLayout

Error Atomic Design template with React-node slots for message and recovery actions. It owns the main focus target and centered message/actions wrappers.

The View retains the localized empty state and retry/home/phone controls. Error logic retains reload behavior and localized phone wording with bidi isolation; shared logic retains routing, locale, SEO and focus. This layout owns no data, state, effects or callbacks.

Preserve classes, landmarks and focus targets. Verify routed/standalone entry, retry reloads, home recovery, phone-link target/wording, English/Persian accessibility and responsive rendering. The lazy-page load-failure boundary remains a separate shared recovery mechanism.
