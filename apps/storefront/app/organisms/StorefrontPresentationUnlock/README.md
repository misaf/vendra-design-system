# StorefrontPresentationUnlock

Storefront organism for the presentation PIN-unlock dialog. Receives controlled open/value/error, localized title/hint labels and change/complete/close callbacks explicitly from the View.

Owns dialog and four-digit CodeInput composition, including the existing input ID, autofocus and disabled Web OTP. Presentation logic retains PIN storage/comparison, partial entry, error/reset state, settings access and cancellation. This organism owns no state, browser effects or credential checks and never imports page logic. Shared CodeInput retains digit normalization and completion behavior.

Preserve classes, dialog width, input ID, field labels, four-digit length, Web OTP disablement and callback wiring. Verify partial/localized-digit entry, wrong-PIN errors and recovery, correct completion, cancel/reset/focus return, repeated locking, unchanged device preferences, bilingual accessibility and responsive/touch rendering.
