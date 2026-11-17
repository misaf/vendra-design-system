# StorefrontAccountSaved

Composes populated/empty saved products from explicit visibility flags, normalized items, labels and shop destination. Preserves grid/empty classes, positional keys, ProductCard image/name/subtitle/price/stock/badge props, accent badge/soft frame, favorite state/removal callbacks, product links and heart empty-state/browse action. Adds no wrapper.

View retains tab visibility and list normalization. Account/shared logic retains customer scope, favorite synchronization/persistence, product mapping, availability, localized text/formatting and destinations. No state, effects, browser APIs or product/favorite rules belong here.

Verify bilingual populated/single/empty states, product links and removal, reload/tab continuity, saved-page synchronization, browse recovery, customer isolation, touch/keyboard use, rotation, overflow and accessibility against the previous version.

Isolated fixture/spec coverage exercises bilingual product content/images/placeholder, explicit product destinations, per-card removal with single/empty transitions, independent populated/empty flags, browse recovery, axe and compact containment. Customer scope, favorite synchronization and persistence remain in page integration coverage.
