# StorefrontAccountFeedback

Composes the account status message from an explicit notice. Preserves the always-mounted paragraph, status role, text classes and notice fragment without adding a wrapper.

View retains feedback-slot placement. Account/shared logic retains localized messages, successful-save feedback, failure clearing and customer state. Page/editor error alerts retain their separate owners. No state, effects, browser APIs or persistence rules belong here.

Verify the initially empty status, successful save, clearing on storage failure, retry feedback, tab continuity and reload reset. Compare bilingual responsive appearance, accessibility and live-region markup against the previous version.
