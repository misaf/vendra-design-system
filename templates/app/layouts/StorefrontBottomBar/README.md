# StorefrontBottomBar

An Atomic Design template in the storefront app: a layout with React-node slots for `consent`, the page's `sticky` action, and `navigation`. Shell supplies all three; the layout owns no content, callbacks, state, routing or persistence.

Consent comes first, followed by the action and navigation inside the phone wrapper. Existing CSS controls visibility and docking, including the product action's tablet placement. Preserve the two wrapper classes: shared shell CSS and Shell's sticky-height/focus measurements depend on them. Keep measurements and focus effects in Shell.

This layout belongs under `templates/app/layouts/`, outside the published component package. Tailwind scans nested app JSX. Verify with shell tier/resize cases, touch tablet shopping, phone rotation and hydration checks.
