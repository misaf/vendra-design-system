# StorefrontProductGallery

Product gallery organism receiving explicit product code, gallery images, lightbox items/index, localized labels and gallery/open/viewer/close callbacks. Composes Gallery, fullscreen action and controlled Lightbox. View maps props; product logic retains photo mapping, gallery/viewer selection, opening the current gallery photo, closing and route-change reset. The Gallery key remains the displayed product code. Layout retains gallery wrapper/grid.

Preserve fragment order, gallery aspect/sizes, product key, localized slide formatter and fullscreen button styling/icon. Shared Gallery/Lightbox retain scrolling, keyboard/pointer navigation, dialog and focus behavior. No page model, state, effects or page-logic imports live here. Verify selected-photo entry/reopen, dots, directional/RTL navigation and boundaries, both close paths/focus restoration, product-change reset, bilingual accessibility, touch/TV activation and rotation.
