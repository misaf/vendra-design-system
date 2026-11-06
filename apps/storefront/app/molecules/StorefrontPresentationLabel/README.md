# StorefrontPresentationLabel

Storefront molecule combining the presentation product code and optional sold-out status. Receives only `code`, `soldOut`, localized `soldOutLabel` and the `large` visual variant. Catalog, viewer and shortlist retain their existing render-label slots, supplied by View with explicit props.

Owns the stacked label, LTR/nonwrapping code, display typography and compact/inverse sold-out variants. Product selection, eligibility, prices, stock interpretation, localization and callbacks remain with View/logic and parent organisms. No page model, state, effects, browser APIs or package exports are introduced.

Preserve DOM/classes, code naming and conditional status. Check English/Persian catalog, sold-out and available viewers, mixed shortlists, phone/tablet/TV density and direction, accessibility and stock updates.
