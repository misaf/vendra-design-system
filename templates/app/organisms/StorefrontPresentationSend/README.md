# StorefrontPresentationSend

Storefront organism for the presentation send/share dialog. Receives a nullable send descriptor (title, body, code, URL, QR label, WhatsApp URL, length warning, copy availability/status and copy/print callbacks), localized action labels and a close callback explicitly from the View.

Owns dialog, memoized QR rendering, tag/code, warning/body and share/copy/print action composition. Presentation logic retains link construction, quoted options, customer/stock state, length validation, clipboard capability and copied timing, browser printing and closing. The existing shared `vfQrPath` helper remains the QR encoder. This organism owns no customer state or browser effects and never imports page logic.

Preserve classes, dialog width, safe external-link attributes, QR viewBox/path and oversized-link suppression. Verify product/shortlist/order links, selected options, copy feedback, clipboard absence, printable tags, oversized warnings, close/focus return, bilingual accessibility and responsive/touch rendering.
