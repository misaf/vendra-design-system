# Vendra UI

`components/ui/` contains the storefront's reusable controls, patterns and design tokens.

- Import a control directly, such as `components/ui/components/Button/Button.jsx`. Reusable compositions live in `components/ui/patterns/`.
- The root layout imports `components/ui/storefront.css`. `VendraProvider` supplies locale and navigation to controls.
- Edit tenant JSON under `components/ui/tokens/tenants/` and run `npm run build` to regenerate CSS and design tokens. The generator validates colours, contrast and asset references.
- Run `npm run dev` and open `/guidelines/ui-gallery.html` to exercise the controls in Clay and Fern in English and Persian.
