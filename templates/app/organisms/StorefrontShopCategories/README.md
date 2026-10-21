# StorefrontShopCategories

Shop category navigation receiving normalized category records, the category label and an explicit compact presentation flag. Sidebar mode composes the label and selected/unselected native buttons; compact mode composes the named horizontal group and Chip controls. Records supply labels, formatted counts, on/off flags and individual pick callbacks.

View retains record normalization and placement. Shop/shared logic retains eligible-category rules (including an active empty category), counts under current filters, selection, tracking, URL updates, paging reset, sorting and product results. Preserve fragments, classes/order, native button types, pressed states, counts, compact group name and horizontal scrolling. No page model, state/effects, browser APIs or commerce rules move here.

Verify English/Persian sidebar/compact views, default/selected/filtered/empty categories, dependent counts and result pages, URL/reload, filter/sort preservation, selecting All, touch/TV input, tablet rotation, contained horizontal scrolling and accessibility.
