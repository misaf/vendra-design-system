# StorefrontLayout

The main storefront Atomic Design template. It receives tenant/language/direction metadata and React-node slots for the skip link, live region, announcement, header, menu, notices, page content, footer and bottom bar.

The layout preserves the outer background, tenant container, content wrapper and section order. It owns no providers, copy, routing, callbacks, persistence or browser effects. Shell supplies each section and retains provider configuration, tracking callbacks, menu resize dismissal, sticky-height measurements and focus clearance. The bare counter presentation continues through Shell's existing separate branch.

Keep the wrapper classes and language/tenant attributes intact: shared CSS, container sizing and focus behavior depend on them. Tailwind scans nested app JSX. Verify with shell navigation and layout tests, menu/footer behavior, touch shopping/rotation, hydration and TV remote checks.
