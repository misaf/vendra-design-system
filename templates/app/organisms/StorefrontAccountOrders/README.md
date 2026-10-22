# StorefrontAccountOrders

Composes order cards from explicit, normalized presentation records. Preserves grid/body/number/meta/total classes, LTR order numbers, Card padding 20, Badge tone/text and secondary small tracking links. Keeps record order, positional keys and the existing empty grid behavior.

View retains tab visibility and list normalization. Account/shared logic retains customer isolation, order selection/history, status interpretation, localization/formatting, tracking URLs, loading and persistence. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual IDs/status/meta/totals and tracking destinations, older-order navigation and reload, tab continuity, sample-history fallback, sign-out/customer isolation, touch/tablet rotation, keyboard activation, overflow and accessibility. Compare sample-only and populated history with the unchanged baseline. An empty presentation array still produces an empty grid; account logic continues to append sample orders.
