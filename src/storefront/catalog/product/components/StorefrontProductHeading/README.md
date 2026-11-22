# StorefrontProductHeading

Product heading organism receiving the catalog product details model, subtitle, badge, unit-price label, stock descriptor, copy label and callback. Composes the code/copy action, category/badge, price/availability and description. View maps content; product/shared logic retains product identity, localization, price calculation, stock interpretation, clipboard fallback and toast feedback. Layout retains the details wrapper/sticky behavior.

Preserve h1 ID, wrapper classes/order, typography, copy-button icon/variant, badge tone, price size/class and StockStatus composition. No page model, state, effects or browser APIs live here. Verify English/Persian new/ready/low/returning-stock states, size-price updates with extras excluded from unit price, clipboard success/fallback/failure selection and feedback, touch/TV activation, rotation and accessibility.

The colocated fixture/spec covers supplied code/content/price updates, stable h1 ID, category/badge/description, independent pointer/Enter/Space copy callbacks and localized in/low/returning/out stock descriptors. Bilingual axe and compact containment cover availability states. Clipboard access/fallback/toasts, stock decisions and price calculations stay in page integration coverage; the fixture records copy intent without accessing the clipboard.
