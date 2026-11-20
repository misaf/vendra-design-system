# Vendra UI

| Ownership | Location |
| --- | --- |
| Reusable design-system components | `ui/components/<Name>/` |
| Storefront components shared across routes | `components/storefront/` |
| Components owned by a route | That route's `_components/` directory |

Keep implementation, declarations, styles, fixture, spec and README together in the component's folder. Use `npm run new:component -- Name` to scaffold a reusable component.

Reusable UI composes other reusable components and takes storefront data through props or the provider. Shared storefront UI keeps route logic in the owning route and receives the values and callbacks it needs. The import checker enforces these boundaries and detects cycles.

- Import directly from the component folder, for example `ui/components/Button/Button.jsx`. The gallery uses the exports in `ui/index.js`.
- The root layout imports `ui/storefront.css`. `VendraProvider` supplies locale and navigation to controls.
- Edit tenant JSON under `ui/tokens/tenants/` and run `npm run build` to regenerate CSS and design tokens. The generator validates colours, contrast and asset references.
- Run `npm run dev` and open `/guidelines/ui-gallery.html` to exercise the controls in Clay and Fern in English and Persian.
