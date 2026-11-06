# StorefrontSearchResults

Composes the result count/status and linked product rows from explicit countLabel and normalized results descriptors. Preserves result order, indexed fragment keys, product hrefs, soft thumbnail frames, image alt/sizes, LTR product codes, localized subtitles, prices and responsive classes without adding a wrapper.

View retains results visibility, count mapping and list normalization. Search/shared logic retain matching, image/link/subtitle/price descriptors, query and language URL/history state, reporting, navigation and focus. Package ArchFrame/Price retain media and price rendering. StorefrontSearchLayout retains slot placement. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual single/multiple results and count status, readable codes/prices at touch widths, exact-code matching, product navigation/back and reload query recovery, no-result absence and responsive markup against the previous version.
