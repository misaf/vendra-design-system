# StorefrontShopToolbar

Composes the compact filter opener and sort control, active FilterBar, quick-filter chips, live result count and desktop sort control. Receives explicit labels, a controlled sort descriptor, normalized active/quick-filter records and open/clear/focus callbacks. Returns a fragment to preserve existing wrappers, classes, responsive order, pressed states and the `vf-shop-count` focus target.

View retains normalization and the browser callback that scrolls focused quick filters into view. Shop/shared logic retains filtering, sorting, tracking, dialog state, clear/removal semantics, result labels, URL state and paging. No page model, browser APIs, state/effects or commerce rules belong here.

Verify bilingual default/filtered states on phone, touch tablet, desktop and TV; sorting and reload; quick-filter toggles and horizontal focus; removal/clear focus and counts; compact dialog entry/restoration; tablet rotation; overflow and accessibility. Compare existing toolbar regions against the unchanged baseline.
