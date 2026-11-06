# StorefrontJournalPagination

Composes journal Pagination from explicit page/pageCount/href/onChange props. Preserves its class, top margin and package semantics without adding a wrapper.

View retains paging prop mapping. Journal logic retains page count/clamping, slices, href generation, page-change callbacks and first-page filter/query resets. Pagination retains localized names/digits, disabled/current states and single-page visibility. StorefrontJournalLayout retains placement; shared logic retains routing, locale and focus. This organism owns no state, calculations, persistence or browser effects.

Verify first/last-page states, bilingual names/digits, real hrefs, touch/keyboard navigation, reloads, out-of-range clamping, filter/query reset, single-page/empty/loading absence, responsive containment, accessibility and screenshots against the previous version.
