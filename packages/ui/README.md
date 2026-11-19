# Vendra UI

Private npm workspace for the storefront's reusable controls and theme tokens.

- Import `@vendra/ui/Button`, `@vendra/ui/Input`, `@vendra/ui/Dialog`, or `@vendra/ui/DatePicker`.
- Wrap localized controls with `VendraProvider` from `@vendra/ui/VendraProvider`, and set the document's `lang` and `dir`.
- Load `@vendra/ui/styles.css` for the controls and base tokens, or `@vendra/ui/tokens.css` when composing your own styles. Load `@vendra/ui/tokens/tenants/<slug>.css` and set `data-tenant="<slug>"` for a tenant. Put the tenant attribute on the document so portalled controls inherit it.
- The theme generator is available at `@vendra/ui/tokens/theme`. Run `npm run build` from the repository root after changing tenant JSON. The build validates colours, contrast, and references to files in the repository's `assets/` directory.

Run `npm run dev` and open `/guidelines/ui-gallery.html` to exercise the controls in Clay and Fern in English and Persian. Checkout, catalog, and API rules live with the storefront.
