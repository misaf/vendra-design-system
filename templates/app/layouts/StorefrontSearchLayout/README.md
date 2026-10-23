# StorefrontSearchLayout

Search Atomic Design template with React-node slots for heading, query/close controls, popular searches, results and empty-state feedback. It owns the main focus target and reading-width wrapper, preserving existing classes and slot order.

The View retains conditional content construction, localized heading mapping, query/close descriptor mapping, popular-term visibility/descriptor mapping, results visibility/count/descriptor mapping and empty-state recovery. Search and shared site logic retain matching, URL/history updates, search reporting, return context, navigation and focus. This layout owns no data, callbacks, persistence or browser effects.

Verify query and language URL recovery, product exploration/back, close-to-origin context, clear/Escape and no-result recovery focus, popular searches, readable codes/prices, touch-width overflow, hydration and English/Persian responsive layouts.

StorefrontSearchHeading composes the display h1 from an explicit title without adding a wrapper. This layout retains heading placement.

StorefrontSearchControls owns the existing responsive query/close row and controlled package controls. View maps localized descriptors and callbacks; this layout retains slot placement.

StorefrontSearchPopular composes the eyebrow and wrapping term chips. View retains empty-query visibility/list normalization; search/shared logic retain descriptors, query updates and reporting. This layout retains slot placement.

StorefrontSearchResults composes count/status and linked product rows. View retains visibility/count mapping/list normalization; search/shared logic retain matching and product descriptors. This layout retains slot placement.
