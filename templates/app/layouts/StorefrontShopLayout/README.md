# StorefrontShopLayout

Shop-page Atomic Design template with React-node slots for heading, sidebar, compact categories, results and the filter dialog. It preserves the main focus target, responsive columns, sticky sidebar and results section.

StorefrontShopCategories composes sidebar category buttons and compact chips. StorefrontShopSidebarFilters composes controlled occasion/date/price/stock controls. StorefrontShopFilterDialog composes the controlled compact fields and Show/Clear footer. The shop View supplies category records/label/mode, sidebar/dialog descriptors and callbacks, labels, sorting, result states, cards and pagination. Shop logic retains URL state, filtering, delivery rules, sorting, favorites and paging. This layout owns no data, callbacks, persistence or browser effects.

Keep wrapper classes and slot order intact: responsive CSS and Shell's sticky/focus measurements depend on them. Verify category/filter URL recovery, sorting, compact filter dialog focus, responsive result cards, tablet rotation and hydration.
