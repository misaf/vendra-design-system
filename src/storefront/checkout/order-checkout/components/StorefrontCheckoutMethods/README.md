# StorefrontCheckoutMethods

Composes payment intro, controlled method RadioGroup, unavailable-method contact Alert, wallet discount/top-up/remaining-balance context and payment notice from explicit descriptors. Preserves fragment order, classes, group name/legend, option labels/descriptions/disabled state, button/link semantics and wallet visibility flags.

View retains mapping/normalized options. Checkout/shared logic retains method eligibility, zone rules, balance/discount calculations, draft selection/persistence, top-up URLs and payment wording. No page model, state/effects, browser APIs or commerce rules belong here. Receipt controls remain separate.

Verify bilingual guest wallet disabling, method selection and persistence, wallet context/top-up links, one-method hiding, no-usable-method fallback, delivery round trips, touch/tablet rotation, keyboard selection, overflow and accessibility. Compare method/feedback regions with the unchanged baseline.
