# Storefront templates

The maintained bilingual storefront: 17 pages in `storefront-*`, wired together by `storefront-site` (the click-through router). Pages run on sample data in `_shared/`; its target shape is the Vendra API (see [API.md](API.md)). Feature map and integration boundaries: [MIGRATION.md](MIGRATION.md).

## Where to edit

| Change | File |
| --- | --- |
| Page markup | `storefront-<page>/Storefront*.dc.html`, inside the editable regions |
| Page behavior / copy / styles | `storefront-<page>/logic.js` / `copy.js` / `styles.css` |
| Store name, contact, hours, currency, map, payment, balance, announcement | [_shared/store-config.js](_shared/store-config.js) |
| Products, sizes, add-ons | [_shared/catalog.js](_shared/catalog.js) |
| Delivery zones, fees, cut-offs, days, slots, free delivery | [_shared/delivery.js](_shared/delivery.js) |
| Promo codes | [_shared/promotions.js](_shared/promotions.js) |
| Header, mobile menu, footer, consent banner, page shell | `_shared/*.html` (values in `navigation.js`) |
| Routes and URL helpers | [_shared/routing.js](_shared/routing.js) |
| Responsive state, focus, `<head>` | `_shared/page-lifecycle.js`, `page-focus.js`, `seo.js` |
| Shared translations | `_shared/translations/` |
| Maps (delivery pin, saved places) | `_shared/location.js`, `location.css` |
| Shared CSS: shell, page families, information pages | `_shared/shell.css`, `page-layouts.css`, `information-pages.css` |
| Tailwind entry and token aliases | [_shared/tailwind.css](_shared/tailwind.css) |
| Tokens and tenant themes | `../tokens/`, `../tokens/tenants/<slug>.json` |
| Number, currency and date formatting | `../components/utils/` (wrapped by `_shared/formatting.js`) |

## Editing a page

Edit only the marked regions of a `.dc.html` file: `PAGE CONTENT` (inside the shared shell) and `PAGE STICKY CONTENT` (above the mobile tab bar), plus the page's `@template` metadata and `data-props`. Behavior, copy and styles live in the adjacent source files. The build regenerates the `GENERATED SHELL`, `SHARED LOGIC`, `PAGE LOGIC` and `PAGE COPY` sections; never edit those.

`copy.js` exposes `vfCopy(S)`. English and Persian must have the same keys and list shapes (tested recursively). Shared logic loads once from `_runtime/shared-logic.js`.

**Adding a page:** copy a similar folder and rename its `.dc.html`. Register the route in `_shared/routing.js` and the label in `translations/shell.js`. Add the menu entry in `navigation.js` if needed, the CSS import in `_shared/custom.css`, and the import and `start` option in `storefront-site/StorefrontSite.dc.html`.

## Commands

Run from the repo root (Node 20.19+ or 22.12+):

```sh
npm --prefix templates ci                # first setup
npm --prefix templates run dev           # Vite at http://127.0.0.1:5173/ (?lang=fa), rebuilds and reloads on save
npm --prefix templates run build         # Tailwind, custom CSS, tenant themes, generated sections, components, dist/
npm --prefix templates run check         # fails on stale generated output or unformatted code
npm --prefix templates test              # typecheck, storefront logic, generation, copy parity, package
npm --prefix templates run test:e2e      # Playwright: axe, screenshots, cards, tenants
```

- **Static preview without Vite:** run the build, then `python3 -m http.server 8765 --bind 127.0.0.1` and open `/templates/storefront-site/StorefrontSite.dc.html?lang=en`.
- **Generation only:** `node _build/generate.cjs` propagates shared HTML and logic without compiling CSS.
- **Port:** 5173 is fixed.

## Browser tests

`_e2e/` runs on the installed Google Chrome at 390px and 1280px, reusing a running dev server.

- **`storefront`, `states`:** axe (WCAG 2.2 AA) on every view and on hidden states (menus, dialogs, validation, `?demo=loading|error`).
- **`pages`, `cards`:** screenshot comparisons, with the clock frozen at 2026-10-05. `cards` also checks the Contrast card for every tenant.
- **`components`, `components-in-use`, `features`:** component keyboard behavior, and storefront features end to end (promo codes, delivery pins, filters…).
- **`tenants`:** the seven contrast checks, and that each storefront loads only its own tenant file.

Baselines are per platform (`-darwin.png`, `-linux.png`), compared at `threshold: 0` with up to 25 differing pixels. Tests start with cookie consent given; use `NO_CONSENT` from `helpers.mjs` to test the banner. After an intended visual change, review `_e2e/playwright-report/`, then run `test:e2e:update`.

## Runtime and export

Pages share `_runtime/`; never edit it.

- **Page head:** loads `_shared/seo.js`, `_runtime/helpers.js` (`AG_FORMAT`, `AG_DATES`) and `_shared/page-focus.js` before `shared-logic.js`.
- **`_runtime/ds-base.js`:** loads `../styles.css`, then the active tenant's CSS, then `tailwind.css` and `custom.css`, each once. The tenant comes from `store-config.js` or `?tenant=`.
- **`_runtime/components.js`:** the component bundle, which loads after React.
- **Exporting:** copy `_runtime/`, the chosen `storefront-*` folders and the design-system root assets, keeping their relative paths, or change `base` in `ds-base.js`.

## Styling rules

- **Tailwind 4.3.3, local build, `tw:` prefix:** spacing numbers follow Vendra's scale (`tw:gap-5` = `--space-5`). Use the named layout utilities (`max-w-page`, `px-gutter`, `h-tap`, `z-header`, `rounded-control`…) and the semantic colours (`bg-page`, `text-body`).
- **Utilities first:** use logical sides (`ps-`/`pe-`) and write complete class names. Add `!` only to beat unlayered component styles. Preflight is off.
- **Custom CSS** is for contextual selectors and component internals, in `_shared/*.css` or the page's `styles.css`. No inline styles. `vf-` classes may exist only as hooks.
- **Page families** (`page-layouts.css`): `vf-shopping` (1240px), `vf-form` and `vf-info` (1088px). Use `vf-product-grid` for product grids.
- **Mobile:** one primary action per mobile page, placed above the tab bar. Arch frames only on the home or wedding hero and the main product image. Check EN and FA at 320px, 390px and desktop width.

## Demo behavior

- **Products** have codes instead of names (`VF-7K2M4Q`). The code is the title everywhere and is searchable in any case or digits. URLs look like `?view=product&id=VF-7K2M4Q&cat=boxes`. Old slugs resolve through `legacy`.
- **Shop URLs** keep `cat`, `sort`, `filters`, `occasion`, `min`/`max` and `stock` through reload, Back and language switches.
- **Checkout** stores the finished order in session storage. Track shows it, and Order again refills the bag.
- **Account balance:** top-ups are simulated. Paying from a balance of at least `wallet.discountFrom` takes `discountPercent` off the products. A real store keeps the balance on its server.
- **Delivery pin:** a Leaflet map with OpenStreetMap tiles; point `VF_STORE.map.tiles` at another provider for real traffic. If the map fails, a typed address (`noMap`) replaces the pin.
- **Simulated, local only:** sign-in codes, payments, reminders, saved items, recently viewed, the newsletter flag and the consent choice (`vf-consent`). Only `_shared/integrations/api.js` talks to the backend, and only when `apiBase` is set.
- **Policies and contact:** policy text is sample copy that reads fees and areas from `delivery.js`, so it stays current. Replace it with the florist's own policies before launch.
