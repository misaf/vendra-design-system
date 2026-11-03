# StorefrontSiteCheckoutNotice

Composes the informational checkout-completion Alert and secondary order-recovery link from explicit title/actionLabel/actionHref/onDismiss props, without adding a wrapper. Alert retains polite status semantics, decorative icon and locale-derived dismissal wording.

Site View retains visibility and prop mapping inside VendraProvider, before PageBoundary. Site logic retains late-checkout ownership, newer-bag preservation, localized copy, order URLs and dismissal state. Routing, live announcements, Suspense and page/reset boundaries stay at coordinator level. This organism owns no order, customer, bag or persistence state and has no browser effects.

Verify a late completion after bag edits, bilingual status/copy and native localized order URL, touch/Enter recovery and dismissal, preserved bag/customer state, history, responsive containment, tablet rotation, accessibility and screenshots against the previous version.
