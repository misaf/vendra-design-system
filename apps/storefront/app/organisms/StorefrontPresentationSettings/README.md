# StorefrontPresentationSettings

Storefront organism for the presentation settings/setup dialog. Receives controlled open/setup/start eligibility, explicit localized labels, home link, number formatter and close/start callbacks. Fullscreen, collection, display, toggle, transfer and PIN control descriptors carry only the values and callbacks this form uses; it receives neither the page model nor the stored PIN.

Owns dialog/footer, setup instructions, collection selection/search/preview/save controls, playback options, preference switches, transfer disclosure and PIN-draft/set controls. The View formats the eligible-count label. Presentation logic retains normalization/validation, collection membership and persistence, customer-shortlist application, display eligibility, import/export filtering, PIN storage/checks and fullscreen/wake-lock lifecycle. This organism owns no state or browser effects and never imports page logic.

Preserve markup/classes, field IDs, control order, option values, maximum lengths, Web OTP disablement, disabled/conditional controls and safe transfer-link attributes. Verify settings/setup titles, category/selected/empty collections, save/load/delete, shortlist reuse, playback/toggle persistence, valid/invalid transfer and PIN preservation, PIN save/remove, start/close/fullscreen callbacks, bilingual accessibility and responsive/touch rendering.
