# StorefrontSiteIntegrationFeedback

Composes site integration-error feedback through the package danger Alert from an explicit message prop, without adding a wrapper. Preserves interruptive alert semantics and the decorative error icon, with no action or dismissal control.

Site View retains visibility and placement inside VendraProvider before PageBoundary. Site logic retains sync-failure state, localized wording, live announcements and preservation of local data. Router, provider, lazy-loading boundaries and business/persistence effects remain at coordinator level. This organism owns no state or browser effects.

Verify bilingual failed saved-list synchronization, preserved local save changes, announcement text, unchanged page focus, conditional visibility, coexistence with checkout notice, responsive containment, tablet rotation, accessibility and screenshots against the previous version.
