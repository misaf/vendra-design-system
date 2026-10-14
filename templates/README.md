# Storefront templates

The maintained bilingual storefront: a Vite React app (`app/`) with 17 pages in `storefront-*`, wired together by `storefront-site` (the click-through router). Pages run on sample data in `_shared/`; its target shape is the Vendra API (see [API.md](API.md)). Feature map and integration boundaries: [MIGRATION.md](MIGRATION.md).

## Where to edit

| Change | File |
| --- | --- |
| Page markup | `storefront-<page>/View.jsx` (JSX inside the shared `Shell`) |
| Page behavior / copy / styles | `storefront-<page>/logic.js` / `copy.js` / `styles.css` |
| Store name, contact, hours, currency, map, payment, balance, announcement | [_shared/store-config.js](_shared/store-config.js) |
| Products, sizes, add-ons | [_shared/catalog.js](_shared/catalog.js) |
| Delivery zones, fees, cut-offs, days, slots, free delivery | [_shared/delivery.js](_shared/delivery.js) |
| Promo codes | [_shared/promotions.js](_shared/promotions.js) |
| Header, mobile menu, footer, consent banner, page shell | `app/Shell.jsx` (values in `_shared/navigation.js`) |
| Routes and URL helpers | [_shared/routing.js](_shared/routing.js) |
| Responsive state, focus, `<head>` | `_shared/page-lifecycle.js`, `page-focus.js`, `seo.js` |
| Shared translations | `_shared/translations/` |
| Maps: delivery pin and places (`LocationPicker`, `PlacesMap` components) | `../components/`; Leaflet loading and location text in `_shared/location.js` |
| Shared CSS: shell, page families, information pages | `_shared/shell.css`, `page-layouts.css`, `information-pages.css` |
| Tailwind entry and token aliases | [_shared/tailwind.css](_shared/tailwind.css) |
| Tokens and tenant themes | `../tokens/`, `../tokens/tenants/<slug>.json` |
| Number, currency and date formatting | `../components/utils/` (wrapped by `_shared/formatting.js`) |
| Delivery, totals, discount and API-adapter rules | `../components/utils/commerce.js` (wrapped by `_shared/delivery.js`, `promotions.js`, `wallet.js`, `catalog.js`, `account-data.js`) |

## Editing a page

Each page folder holds `View.jsx` (the page's JSX, rendered inside `app/Shell.jsx`, which takes the page content and the sticky mobile action), `logic.js` (the `usePage(props)` hook: the page's state, effects and the values its view renders), `copy.js` and `styles.css`; `Page.jsx` is the function component that renders `<View v={{...props, ...usePage(props)}} />`. A view reads everything from `v`. Page state lives on one page object from `usePageLogic` (`_shared/page-state.js`): `page.setState` applies at once and re-renders, `useLifecycle` runs didMount / didUpdate / willUnmount, and `useStorefrontPage` (`_shared/page-lifecycle.js`) handles the breakpoint, analytics and heading focus. `logic.js`, `copy.js` and the shared logic in `_shared/` are ES modules that import what they use; the integrations (`VF_API`, `VF_TRACK`, `VF_PAYMENT`) attach to `window`, imported once by `app/runtime.js`. `_shared/product-categories.js` holds the category data that catalog and category names both read, so it loads before either.

`copy.js` exports `vfCopy(S)`. English and Persian must have the same keys and list shapes (tested recursively).

**Adding a page:** copy a similar folder (keep `Page.jsx`, `View.jsx`, `logic.js`, `copy.js`, `styles.css`). `app/pages.js` finds it by folder name and loads it as its own chunk. Register the route in `_shared/routing.js` and the label in `translations/shell.js`. Add the menu entry in `navigation.js` if needed, the CSS import in `_shared/custom.css`, and the `lazyPage('<name>')` constant and route in `storefront-site/View.jsx`.

## Commands

Run from the repo root (Node 20.19+ or 22.12+):

```sh
npm ci                                   # first setup, at the repo root (templates is a workspace)
npm --prefix templates run dev           # Vite at http://127.0.0.1:5173/ → /templates/app/ (?lang=fa, ?page=<name> for one page)
npm --prefix templates run build         # Tailwind, custom CSS, tenant themes, shared logic, components, dist/
npm --prefix templates run check         # fails on stale generated output, unformatted code or a CSS lint error (raw colours, left/right sides: stylelint.config.mjs)
npm --prefix templates test              # typecheck, storefront logic, generation, copy parity, package
npm --prefix templates run test:e2e      # Playwright: axe, screenshots, cards, tenants
npm --prefix templates run build:app     # production build → templates/_app-build/ (same paths as dev)
npm --prefix templates run preview       # serve the build at http://127.0.0.1:4173/templates/app/
npm --prefix templates run test:e2e:build  # the storefront specs against the production build, plus the performance budgets
```

- **One page on its own:** `/templates/app/?page=checkout` renders that page with its default props.
- **Tenant list only:** `node _build/generate.cjs` rewrites `_runtime/tenant-slugs.js` from `tokens/tenants/`.
- **Port:** 5173 is fixed.

## Browser tests

`_e2e/` runs on the installed Google Chrome at 390px and 1280px, reusing a running dev server, in Tehran time (`timezoneId: 'Asia/Tehran'`) and `en-US` whatever the machine's settings.

- **`storefront`, `states`:** axe (WCAG 2.2 AA) on every view and on hidden states (menus, dialogs, validation, `?demo=loading|error`).
- **`pages`, `cards`:** screenshot comparisons, with the clock frozen at 2026-10-05. `cards` also checks the Contrast card for every tenant.
- **`components`, `components-in-use`, `features`:** component keyboard behavior, and storefront features end to end (promo codes, delivery pins, filters…).
- **`tenants`:** the seven contrast checks, and that each storefront loads only its own tenant file.

Performance budgets (`_e2e/performance.spec.mjs`, production build only, phone profile) cap the compressed JS, CSS and fonts a page loads before the site preloads the others (`vf-preload-pages` mark in `app/pages.js`), the layout shift while fonts load, and, on slow 4G with a 4x slower CPU, the largest paint and the main-thread blocking time of the home, shop and product pages. They sit just above today's numbers; raise one only on purpose.

Baselines are per platform (`-darwin.png`, `-linux.png`), compared at `threshold: 0` with up to 25 differing pixels. `_e2e/screenshot.css` hides only the text of native `<select>` elements, which the operating system draws a pixel or two differently between runs. Tests start with cookie consent given; use `NO_CONSENT` from `helpers.mjs` to test the banner. After an intended visual change, review `_e2e/playwright-report/`, then run `test:e2e:update`.

## Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request:

1. **Check and unit tests:** `npm ci`, `check` and `test` on Node 22. `test` includes the package's bundle-size budget (`_tests/size.test.mjs`): every export bundled alone and all of them together, with the peers left out, minified and gzipped. Small components must bundle without the rest; raise a budget only on purpose.
2. **Package on React 19:** `test:react19` installs React 19 and its types in a scratch app, runs the package test there (import, server render, wording, themes) and type-checks `dist/`'s declarations strictly. The workspace itself stays on React 18.3.1.
3. **Browser tests:** `test:e2e` inside Playwright's Linux image (`mcr.microsoft.com/playwright:v1.63.0-noble`), on its bundled Chromium (`CI` set: no Chrome channel, 2 workers, a fresh dev server), compared against the `-linux.png` baselines. Each component's own spec runs in the `components` project (see below); `package.spec.mjs` covers what holds for the whole package (reduced motion, cascade layers); `hydration.spec.mjs` server-renders every export from `dist/` in Node and hydrates it in the browser, in English and Persian, failing on any mismatch.
4. **Production build:** `test:e2e:build` in the same image, with the performance budgets.

Dependabot (`.github/dependabot.yml`) opens weekly, grouped pull requests for the pinned npm tools and GitHub Actions, two weeks after each release; CI tests them like any change. React's majors are left out (the React 19 job covers the next one), and a Playwright bump must also move the image tag in the workflows, which `assets.test.cjs` checks.

A failed browser run keeps `playwright-report/` and `test-results/` as the `e2e-report` artifact. After an intended visual change, update the macOS baselines locally with `test:e2e:update` and the Linux ones by running the **Update screenshots** workflow on the branch (Actions → Update screenshots → Run workflow); it commits the changed `-linux.png` files. Review both before merging. When `@playwright/test` is upgraded, change the image tag in both workflows to match, then refresh the Linux baselines.

## Component tests

Every folder in `components/` has its own browser test beside the component: `<Name>.spec.mjs` and `<Name>.fixture.jsx`.

- **Fixture:** exports `Fixture({lang})`, which renders the component in the states the spec needs, with plain `<output data-test=…>` elements for what callbacks report. The host page `_e2e/fixtures/component.html?component=<Name>&lang=en|fa` renders it inside `VendraProvider`, with the page's `lang` and `dir` set.
- **Spec:** imports `openComponent`, `expectAccessible` and the shared helpers from `_e2e/component-test.mjs`. It tests the component's role and name, keyboard use, built-in wording in both languages and its main props, and ends with `expectAccessible` (axe in English and Persian). Name things as a customer would see them; storefront flows stay in `_e2e/features.spec.mjs`.
- **Running:** `npx playwright test -c _e2e/playwright.config.mjs --project=components` runs them all; add the folder's path to run one (`../components/FilterBar`). They run in the `components` project on the dev server, at desktop width; a spec sets another viewport where it matters. The production-build run skips them.
- **Guard:** `npm test` fails when a component folder has no spec that opens its fixture. The build leaves `*.fixture.jsx` out of `dist/`, and `files: ["dist"]` keeps the specs out of the package.

## Runtime and export

`_runtime/` is generated; never edit it.

- **`app/index.html`:** only the root element and the app module, `app/main.jsx`.
- **`app/pages.js`:** each `storefront-*/Page.jsx` is a separate chunk, loaded when first shown; the site preloads the others once the browser is idle (`preloadPages`). The dev server warms them up at start. The site switches to a page once its code has loaded, so the current page (and its URL and scroll position) stays until then; a page whose code fails to load shows `app/PageError.jsx` (an alert with Reload), and a deploy that replaced the files reloads the tab once when a page is opened (never from a background preload).
- **`app/theme.js`:** imports `styles.css`, `_runtime/tailwind.css` and `_runtime/custom.css` (Vite bundles them with the fonts), sets `VF_ASSET_BASE` and loads the active tenant's stylesheet from `tokens/tenants/` on demand, keeping the page hidden until it arrives (at most 2s). The tenant comes from `store-config.js` or `?tenant=`.
- **Build:** `build:app` copies what pages load by URL at run time (`assets/`, the Leaflet files, `tokens/tenants/*.css`) to the same paths under `_app-build/`. CSS targets evergreen browsers and Safari 16+; list `-webkit-` properties before the standard one.
- **Components:** the app imports them from `../components/` through `app/ds.js`. The guideline cards (`guidelines/**/*.card.jsx`) import `guidelines/card-runtime.js`, which puts the components and helpers on `window.VendraDesignSystem` (and `AG_*`) for their scripts.
- **Dependencies:** `templates` is an npm workspace of the root package: one lockfile and one `node_modules` at the repo root, where the components and the app both resolve React (18.3.1) and React Aria.

## Styling rules

- **Tailwind 4.3.3, local build, `tw:` prefix:** spacing numbers follow Vendra's scale (`tw:gap-5` = `--space-5`). Use the named layout utilities (`max-w-page`, `px-gutter`, `h-tap`, `z-header`, `rounded-control`…) and the semantic colours (`bg-page`, `text-body`).
- **Utilities first:** use logical sides (`ps-`/`pe-`) and write complete class names. Add `!` only to beat unlayered component styles. Preflight is off.
- **Custom CSS** is for contextual selectors and component internals, in `_shared/*.css` or the page's `styles.css`. No inline styles. `vf-` classes may exist only as hooks.
- **Page families** (`page-layouts.css`): `vf-shopping` (1240px), `vf-form` and `vf-info` (1088px). Use `vf-product-grid` for product grids.
- **Mobile:** one primary action per mobile page, placed above the tab bar. Arch frames only on the wedding hero and the main product image. Check EN and FA at 320px, 390px and desktop width.

## Demo behavior

- **Products** have codes instead of names (`VF-7K2M4Q`). The code is the title everywhere and is searchable in any case or digits. URLs look like `?view=product&id=VF-7K2M4Q&cat=boxes`. Old slugs resolve through `legacy`.
- **Shop URLs** keep `cat`, `sort`, `filters`, `occasion`, `min`/`max`, `stock` and `page` through reload, Back and language switches. The shop shows `VF_STORE.shopPageSize` designs per "Show more" page (4 in the sample); a new filter or sort starts again from page 1.
- **Checkout** stores the finished order in session storage. Track shows it, and Order again refills the bag.
- **Account balance:** top-ups are simulated. Paying from a balance of at least `wallet.discountFrom` takes `discountPercent` off the products. A real store keeps the balance on its server.
- **Delivery pin:** a Leaflet map with OpenStreetMap tiles; point `VF_STORE.map.tiles` at another provider for real traffic. If the map fails, a typed address (`noMap`) replaces the pin.
- **Simulated, local only:** sign-in codes, payments, reminders, saved items, recently viewed, the newsletter flag and the consent choice (`vf-consent`). Only `_shared/integrations/api.js` talks to the backend, and only when `apiBase` is set.
- **Policies and contact:** policy text is sample copy that reads fees and areas from `delivery.js`, so it stays current. Replace it with the florist's own policies before launch.
