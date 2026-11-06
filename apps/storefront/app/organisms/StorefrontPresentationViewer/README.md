# StorefrontPresentationViewer

Storefront organism for the presentation lightbox, captions, size/extra choices and shortlist/order/send actions. Receives controlled items, active index, calm/price/options/playback flags, localized labels, a label renderer and navigation/close/options callbacks explicitly from the View.

Owns lightbox composition, active-quote versus base-price rendering, option visibility, selected chips and action wiring. The View retains the shared Label helper through `renderLabel`, dialogs and offline preparation. Presentation logic retains product identity, quote calculation, variant selection, stock checks, shortlist/order/share state, calm/playback state and item callbacks. The organism owns no state, browser effects or business rules and never imports storefront page logic.

Preserve classes, item IDs/images, accessible labels, sold-out action gating and callback wiring. Verify selected size/extras and quotes, add-to-order/shortlist, sharing, hidden prices, slideshow captions, keyboard navigation, close/focus return, bilingual accessibility and responsive/touch rendering.
