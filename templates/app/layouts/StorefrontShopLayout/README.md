# StorefrontShopLayout

Shop-page Atomic Design template with React-node slots for heading, sidebar, compact categories, results and the filter dialog. It preserves the main focus target, responsive columns, sticky sidebar and results section.

The shop View supplies category/filter controls, labels, sorting, result states, cards, pagination and the dialog. Shop logic retains URL state, filtering, delivery rules, sorting, favorites and paging. This layout owns no data, callbacks, persistence or browser effects.

Keep wrapper classes and slot order intact: responsive CSS and Shell's sticky/focus measurements depend on them. Verify category/filter URL recovery, sorting, compact filter dialog focus, responsive result cards, tablet rotation and hydration.
