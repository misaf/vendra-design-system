# StorefrontPresentationTools

Storefront organism for the presentation seller-tools drawer. Receives controlled open/close state, explicit localized labels, offline status/progress, online/photo/stock state, setup/device descriptors and action callbacks. Optional scan/start-over descriptors control action visibility. It receives neither the page model nor browser capabilities.

Owns the dialog, status/alert markup, setup and device information, and seller action order. View retains offline preparation and localized progress/device text; presentation logic retains capability checks, stock/display recovery, PIN gates, navigation, customer state and persistence. No state, effects or page-logic imports live here.

`StorefrontPresentationTools.spec.mjs` covers English/Persian supplied offline progress/status, stock timestamp isolation, device details, action order and isolated callbacks, offline retry suppression, independent warning/setup/capability branches, compact axe, keyboard containment, Escape/close dismissal and trigger focus restoration. Callbacks report actions without closing the controlled drawer.

Offline preparation, actual photo/stock recovery, setup/PIN gates, device capabilities, panel transitions and persistence remain page-level integration responsibilities. The package Dialog owns modal mechanics.
