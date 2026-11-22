# Florist storefront

Start at the feature you want to change. Next.js route files in `src/app/` select the screen and handle route parameters and metadata. Screens, state, bilingual copy, styles, and browser component specs live with the owning capability.

| Change | Source |
| --- | --- |
| Home, shop, product, and search | `src/storefront/catalog/` |
| Bag and line items | `src/storefront/cart/` |
| Delivery choices, rules, and slots | `src/storefront/delivery/` |
| Totals, discounts, and order summary | `src/storefront/pricing/` |
| Checkout, payments, and recovery | `src/storefront/checkout/` |
| Sign-in, account, and saved products | `src/storefront/customer/` |
| Orders and tracking | `src/storefront/orders/` |
| Journal, policy, FAQ, contact, and weddings | `src/storefront/content/` |
| In-store presentation | `src/storefront/presentation/` |
| Header, footer, and navigation | `src/storefront/shell/` |
| State shared by cart, customer, and checkout across routes | `src/storefront/session/` |
| Laravel transport and browser integrations | `src/platform/` |

Each route folder corresponds to a URL segment. For example, `[locale]/bag/page.tsx` serves `/en/bag/` and `/fa/bag/`. The root document mounts the session coordinator above the locale segment, so draft state survives route and language changes.

## Editing a page

A route's `page.tsx` imports its screen. For checkout, `src/storefront/checkout/order-checkout/` owns `CheckoutScreen.jsx`, `useCheckout.js`, and `CheckoutView.jsx`. The hook owns effects and state, and the view composes its components. Shared controls come from `src/design-system/components/`.

Keep English and Persian keys and list shapes in sync in `copy.js`. Unit tests check parity.

Keep route composition beside the screen and hook, outside `components/`. For example, `CheckoutView.jsx` composes `shell/components/Shell.jsx` with checkout-owned components and `pricing/components/StorefrontOrderSummaryCard/`. Those components receive the data and callbacks assembled by the checkout hook through props.

### Page state and lifecycle

Hooks that use [`usePageLogic`](../src/storefront/shell/page-state.js) share a mutable page object. `page.setState(patch, done)` shallow-merges the patch into `page.state` synchronously and schedules a React render. A function patch receives the current state, including earlier updates from the same event. Code can read the merged state immediately. If the work needs the updated DOM, such as focusing a newly rendered button, pass a completion callback. React drains the queued callbacks in order from a passive effect after a render commits. React can batch multiple updates into one commit.

The [VM page harness](../tests/page-script.mjs) concatenates source files from its own lists after stripping imports and exports. Its React stand-in skips effects and drains completion callbacks inside `setState`. Tests can invoke lifecycle handlers and rerender the hook explicitly. Those tests cover stateful scenarios with controlled globals. Use a mounted React component or a storefront browser flow to verify commit timing, DOM work, and lifecycle behavior.

When migrating a consumer away from the page lifecycle, extract the pure state transitions first and test them with direct imports from their owning modules. For example, [the delivery rules suite](../src/storefront/delivery/delivery-rules.test.mjs) imports the same validation and scheduling modules as the app. Check both immediate state reads and post-commit callbacks in a browser before changing hook timing.

### Import boundaries

The checker in [`tools/app-dependencies.mjs`](../tools/app-dependencies.mjs) classifies UI by **directory**, not by a `View.jsx` suffix:

- Files under a capability's `components/` directory, including nested feature folders such as `checkout/order-checkout/components/`, are presentational UI.
- Under `shell/components/`, nested component folders such as `StorefrontStepProgress/` are presentational UI. Files directly in `shell/components/`, such as the `Shell.jsx` coordinator, are not; neither shared form may import `src/app/` route modules.
- Presentational UI may import React, reusable design-system UI (outside the gallery), `shell/ui/` helpers, and other presentational UI. It may not import capability rules, integration services, or route coordinators directly; pass their results and actions as props instead.
- `shell/ui/` helpers may also import capability rules and `qrcode-generator`, but not presentational UI or integration services.

An adjacent route-level file such as `CheckoutView.jsx` is not subject to the presentational import restriction. That is where the route composes the shell and feature components, not a reason to move business logic into a reusable component. Missing local imports, import cycles, and forbidden storefront globals are still checked across runtime modules.

Modules under `src/platform/browser/` and modules with a `'use client'` directive cannot reach
`src/platform/server/` or any module marked with `server-only` through runtime imports.
Storefront features cannot reach demo implementations under `src/demo/`. The route can select
an implementation and pass the result into the feature. The checker follows static re-exports and
literal dynamic imports, and reports the import chain. Type-only imports are erased before runtime.

Run `node --test tests/app-dependencies.test.mjs` to check the runtime graph and the allowed/rejected import scenarios. Reusable design-system UI has its own stricter dependency policy; see [UI ownership](UI.md).

## Business capabilities

Use `src/storefront/<capability>/` for the rules, sample data, and shared bilingual copy a capability owns. For example, change cutoff and slot rules in `delivery/delivery-window.js`, the reference schedule in `delivery/delivery-schedule.js`, totals and discounts in `pricing/order-totals.js`, checkout payload assembly in `checkout/checkout-request.js`, and opening hours in `store/opening-hours.js`. Import rules and types from the owning capability. The guideline cards use `src/design-system/gallery/commerce-adapter.js` to access those same rules.

The import checker allows capability modules to use each other, platform helpers, pure design-system utilities, and generated tenant data. Browser services may use these capabilities. Reusable controls and presentational route components receive business data through props. `npm test` checks these import boundaries and detects cycles.

**Adding a page:** add a folder and `page.tsx` under `src/app/[locale]/`, matching the URL path. Keep the screen, state, copy, styles, and tests with the owning capability under `src/storefront/`. Place feature-owned UI in its `components/` directory. Register the storefront URL in `src/storefront/shell/routing.js`, and add its copy and SEO title. Add menu entries and CSS imports where needed.

## Commands

Run from the repo root with Node.js 22 (22.22.2 or later):

```sh
npm ci                                   # install from the root lockfile
npm run dev                             # Next.js at http://localhost:3000/ → /en/
npm run dev:gallery                     # storefront and design-system previews
npm run generate                        # tenant themes, design tokens and brand assets
npm run lint    # ESLint for Next.js routes and the source groups listed below
npm run check   # generated output, formatting, ESLint and CSS lint
npm test        # typecheck, storefront logic, generation, copy parity, design system
npm run test:e2e  # Playwright: axe, screenshots, cards, tenants
npm run build                           # build the Next.js server in .next/
npm start                               # start the server at http://localhost:3000/
npm run build:demo                      # export to .generated/export/
npm run preview:demo                    # serve the static export at http://127.0.0.1:3000/
npm run test:e2e:demo  # storefront specs and performance budgets against the static demo
```

`npm run check` runs `npm run lint` in CI. The lint command covers `src/app/`, JavaScript under
`src/platform/browser/` (including the integrations), `src/storefront/customer/account/`, the
presentation browsing viewer, camera scanner, display rotation and settings modules, the storefront
shell's consent, navigation and shell-props modules, and the design system's Button, Dialog, Input,
QuantityInput and Select directories. It also covers the server Laravel transport, catalog resource
adapters, shared product heading and screen, and checkout submission modules. The `lint` script in
`package.json` records the exact paths for this incremental rollout.

The ESLint preset checks React JSX and Hooks, including hook order and effect dependencies, plus
unused variables and expressions. JavaScript in the expanded areas also checks for undeclared names
and unreachable code. Type checks and import-boundary checks run through `npm test`.

- **One page on its own:** `/en/?page=checkout` renders that page with its default props.
- **Tenant list only:** `node tools/build/generate.mjs` from the repository root rewrites `.generated/tenant-slugs.js` from `src/design-system/tokens/tenants/`.

## Production integration

Use `npm run build` to build the Next.js server for the Vendra storefront image. The Vendra
deployment owns the Docker images, routing, and runtime configuration for the storefront and its
Laravel backend. Set `VF_API_BASE` to the backend origin when starting the storefront server with `npm start`.
See [API integration](API.md) for the backend URL format.

The localized route at `src/app/[locale]/product/[code]/page.tsx` selects the Laravel-backed
product page or calls the fixture reader in `src/demo/catalog.mjs`. The route passes the selected
demo product and localized details to the product screen. Both paths render the catalog's
`ProductDetailsData` model with the shared `ProductDetails` view. In the demo, changing size updates
the displayed unit price. The legacy product preview also uses the demo reader.

For a Laravel product payload change, follow the lookup in `src/storefront/catalog/laravel/catalog.mjs`
and the localized name and description mapping in `src/storefront/catalog/laravel/product-details.ts`.
`e2e/smoke/product-lookup.spec.mjs` covers live product lookup and retries with the Laravel fixture.
`e2e/smoke/export.spec.mjs` exercises the static demo in both languages.

The demo product screen uses `src/storefront/catalog/product/quote.js` for the displayed total and
the line added to the bag. The quote uses the cart's line and stock rules. Its colocated tests
cover option normalization, shared stock across configurations, and the quantity shown when no
stock can be added. The product hook owns the bag confirmation and toast queue in React state.
Selection changes from the route clear both, and leaving the page clears the queue.

The server build and the demo export share Next.js's `.next/` build directory. If you run both
locally, test the server before building the demo, or run `npm run build` again before starting it.

## GitHub Pages demo

`.github/workflows/ci.yml` builds and deploys the Next.js export when CI passes on `master`.
Repository Settings → Pages → Source must be **GitHub Actions**. CI sets
`VF_BASE_PATH=/<repository-name>` so scripts, images and tenant themes use the repository path.
The uploaded artifact is `.generated/export/`.

The repository's Pages root opens the storefront; direct links can select a view and language:
`https://misaf.github.io/vendra-design-system/en/presentation/`. This hosts the
sample-data demo; live API services need their own backend.

### Prerendering and hydration

`tools/build/routes.mjs` lists the localized views, categories, products, journal posts and policies. The
Next.js App Router exports each one with its rendered HTML, title, canonical URL, language alternates,
share metadata, and JSON-LD. The shared React renderer provides the initial view and metadata to the
export. The browser hydrates the same markup for a first visit. Returning visitors and query-driven
flows render from the requested address and their saved state. The initial document holds the build
clock for hydration, then delivery days and cutoffs update to the visitor's current time.

The build writes `sitemap.xml` and `robots.txt` into the export. Its `404.html` lets the browser
resolve order tracking URLs with runtime IDs and old product and journal addresses. The export
also includes Brotli and gzip copies, which the local static preview can serve.

## Browser tests

`test:e2e` builds the static demo once and runs storefront tests against the Next.js export, then runs only source fixtures, component specs, guideline cards and gateway tests on the development server. Use `test:e2e:demo` or `test:e2e:dev` to run either suite alone. The development suite starts `dev:gallery`, which prepares its fixtures automatically. Reports are kept separately in `e2e/playwright-report/build/` and `e2e/playwright-report/dev/`. Tests run on Playwright's bundled Chromium at 390px and 1280px, in Tehran time (`timezoneId: 'Asia/Tehran'`) and `en-US` whatever the machine's settings.

Install the browser after `npm ci` (and after upgrading Playwright), then run the tests:

```sh
npm exec -- playwright install chromium
npm run test:e2e
```

- **`storefront`, `states`:** axe (WCAG 2.2 AA) on every view and on hidden states (menus, dialogs, validation, `?demo=loading|error`).
- **`pages`, `cards`:** screenshot comparisons, with the clock frozen at 2026-10-05. `cards` also checks the Contrast card for every tenant.
- The `components` project checks component keyboard behavior. Storefront flows include [shared components in use](../e2e/storefront/components-in-use.spec.mjs), [promo codes and delivery pins](../e2e/cart/bag-delivery.spec.mjs), and [catalog filters](../e2e/catalog/catalog-browsing.spec.mjs).
- **`tenants`:** production storefront theme loading and flash prevention. **`tenant-fixtures`:** token contrast, email palettes and the theme builder on the development server.

Browser specs live in capability folders such as `e2e/catalog/` and `e2e/checkout/`. Cross-page and device coverage lives in `e2e/storefront/` and `e2e/devices/`. Shared helpers stay at the root of `e2e/` and all browser screenshot baselines live in `e2e/__screenshots__/`.

The combined command routes `--project` filters to the suites that define them. For example, `npm run test:e2e -- --project=components` runs only development component tests; `--project=tv` runs only production TV tests. Repeated flags, multiple names and `*` wildcards are supported.

`openSite()` waits for the app to take control of prerendered content, then checks the routed main content and language after DOM readiness. Interaction tests then wait on the controls they use; background images and page preloads do not hold them up. Screenshot tests call `settlePage()` for fonts, images and stable layout. Performance tests explicitly wait for the resources their measurements require.

Performance budgets (`e2e/storefront/performance.spec.mjs`, production build only, phone profile) cap the compressed JS, CSS and fonts a page loads for the first route, the layout shift while fonts load, and, on slow 4G with a 4x slower CPU, the largest paint and the main-thread blocking time of the home, shop and product pages. They sit just above today's numbers; raise one only on purpose.

Screenshot comparison specs use software rasterization (`--disable-gpu`) so decoded WebP photos have repeatable colors across browser processes. This does not change storefront rendering in customers’ browsers. Baselines are per platform (`-darwin.png`, `-linux.png`), compared at `threshold: 0` with up to 25 differing pixels. `e2e/screenshot.css` hides only the text of native `<select>` elements, which the operating system draws a pixel or two differently between runs. Tests start with cookie consent given; use `NO_CONSENT` from `helpers.mjs` to test the banner. After an intended visual change, review `e2e/playwright-report/`, then run `test:e2e:update`.

## Continuous integration

`.github/workflows/ci.yml` runs on pushes to `master`, on pull requests (a branch is tested through its pull request) and by hand. A push or pull request that changes only `.github/` skips the browser tests (2 and 3); after a workflow change those tests should prove, run CI by hand (Actions → CI → Run workflow). The browser jobs and screenshot updates run on GitHub-hosted Ubuntu 24.04 in the pinned Playwright image. The browser jobs stop after 75 minutes:

1. **Check and unit tests:** `npm ci`, `check` and `test` on Node 22. `test` includes the design system's bundle-size budget (`tests/size.test.mjs`): every export bundled alone and all of them together, with the peers left out, minified and gzipped. Small components must bundle without the rest; raise a budget only on purpose.
2. **Development fixtures and components:** Four parallel jobs run `test:e2e:dev` inside Playwright's Linux image (`mcr.microsoft.com/playwright:v1.65.0-noble`) against the `-linux.png` baselines. One job runs the `mobile` and `desktop` fixture projects, one runs `components`, and two shard `storefront-components` (see below). Each job starts a fresh dev server with two Playwright workers. Playwright stops after 65 minutes so the job has time to upload its report within the 75-minute runner timeout. Pages requires all four jobs and the production browser job to pass.
3. **Storefront smoke, visuals and performance:** `test:smoke:app` checks the production Next.js server in sample mode. `test:smoke:catalog` starts that build with `VF_API_BASE` pointing to a loopback Laravel fixture that checks the storefront origin and locale headers. It exercises English and Persian catalog listings and product details, including rich-text descriptions and referenced prices. `test:e2e:demo` runs storefront flows, screenshots, accessibility checks, device tests and performance budgets against the Next.js export. `test:smoke:demo` exercises the actual Pages artifact under the repository base path and checks bilingual checkout, tracking and offline display.

Dependabot (`.github/dependabot.yml`) opens weekly, grouped pull requests for the pinned npm tools and GitHub Actions, two weeks after each release; CI tests them like any change (an Actions-only bump runs the check jobs, not the browser tests). React's majors are left out: the storefront supports React 19 only, and a new major is a deliberate upgrade. The root manifest pins React and React Aria. `tests/dependencies.test.mjs` checks the lockfile for duplicate installations. A Playwright bump must also move the image tag in the workflows, which `assets.test.mjs` checks.

Each completed development browser job uploads its HTML report and any failure output as `e2e-dev-<group>-report`. The production browser job uploads `e2e-build-report` on failure. After an intended visual change, update the macOS baselines locally with `test:e2e:update` and the Linux ones by running the **Update screenshots** workflow on a non-default branch (Actions → Update screenshots → Run workflow → select your branch); it commits the changed `-linux.png` files to that branch. Runs on the repository's default branch (currently `master`) or a tag fail before the screenshot job starts. Review both sets of baselines in a pull request before merging. When `@playwright/test` is upgraded, change the image tag in both workflows to match, then refresh the Linux baselines.

## Component tests

Component folders in `src/design-system/components/` colocate `<Name>.spec.mjs` and `<Name>.fixture.jsx`. The ChoiceGroup fixture and spec also exercise ChoiceTile in its required group context.

- **Fixture:** exports `Fixture({lang})`, which renders the component in the states the spec needs, with plain `<output data-test=…>` elements for what callbacks report. The host page `e2e/fixtures/component.html?component=<Name>&lang=en|fa` renders it inside `VendraProvider`, with the page's `lang` and `dir` set.
- **Spec:** imports `openComponent`, `expectAccessible` and the shared helpers from `e2e/component-test.mjs`. It tests the component's role and name, keyboard use, built-in wording in both languages and its main props, and ends with `expectAccessible` (axe in English and Persian). Use customer-facing names for the tests. The [browser tests](#browser-tests) cover cross-component storefront flows.
- **Running:** `npm run test:e2e:dev -- --project=components` runs them all; add the folder's path to run one (`src/design-system/components/FilterBar`). They run in the `components` project on the dev server, at desktop width; a spec sets another viewport where it matters. The production-build run skips them.
- **Guard:** `npm test` fails when a component folder has no spec that opens its fixture. The development server compiles the fixtures for browser tests.

### Storefront component tests

Storefront components may have the same pair beside them under their route or in `src/storefront/shell/components/` (`<Name>.spec.mjs` and `<Name>.fixture.jsx`). The fixture renders the component with controlled state and explicit English/Persian copy, the way a View would; the spec tests its prop and callback contract (controlled values, `onX` wiring, conditional branches) and ends with `expectStorefrontAccessible`.

- **Host:** `e2e/fixtures/storefront-component.html?component=<Name>&lang=en|fa` loads the storefront's Tailwind, design-system and page styles and renders the fixture inside `VendraProvider`. Specs open it with `openStorefrontComponent` from `e2e/component-test.mjs`.
- **Running:** `npm run test:e2e:dev -- --project=storefront-components` (dev server, desktop width; CI runs it with the development suite).
- **Covered:** StorefrontCheckoutMethods, StorefrontCheckoutReceipt, StorefrontCheckoutSubmission, StorefrontBagSchedule, StorefrontBagLocation, StorefrontBagCards, StorefrontAccountEditorDialog and StorefrontPresentationOrder. Remaining coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
- **Guard:** `tests/component-scaffolding.test.mjs` fails when a spec lacks its fixture (or the reverse), and tracks the existing storefront components awaiting coverage in `tests/storefront-components-without-specs.json`. Remove a name when you add its spec.

## Runtime and export

`.generated/` is generated; never edit it.

- **`src/app/[locale]/`** owns localized pages and layouts. Its folders follow the customer-facing URLs. `presentation/` serves the counter display. `src/app/_document/` owns the storefront document, session, screen wrapper, and page metadata markup. `src/app/_routing/` builds the initial route and metadata. `src/app/_live-catalog/` renders the request-scoped Laravel catalog.
- **Public URLs** use `/<locale>/` in links, canonical and alternate tags, and the sitemap.
- **Navigation:** [`src/app/_document/StorefrontSession.tsx`](../src/app/_document/StorefrontSession.tsx) owns the App Router adapter. Its `AppLink` supplies `next/link` through `StorefrontLinkContext` for internal page links; anchors, downloads, external targets, and runtime order-tracking links retain native anchors. The session's `navigate` callback uses the App Router for pathname changes by default. Order-tracking routes with an ID use full-page navigation through `location.assign` or `location.replace`. For query-only changes on the current pathname (search, filters, and form steps), it uses `history.pushState` or `history.replaceState` and immediately calls `values.receiveAddress`, updating controlled inputs without fetching route data. `SearchState` observes Next.js pathname/search changes and feeds the address back into the session. React Aria links receive the session navigation through `VendraProvider`.
- **Build** uses `npm run build` for the Node-hosted app and `npm run build:demo` for the static reference demo. The demo exports every known address through Next.js to `.generated/export/`. Turbopack bundles the storefront styles and fonts directly from source, runs Tailwind through PostCSS, and loads Leaflet on demand. The standalone fixtures compile their own stylesheet files when starting `dev:gallery`. The asset preparation step writes tenant stylesheets to `public/` and clears generated fixture files.
- **Components:** the app imports them from `src/design-system/` directly. The guideline cards (`src/design-system/gallery/**/*.card.jsx`) import `src/design-system/gallery/card-runtime.js`, which puts the components and helpers on `window.VendraDesignSystem` (and `AG_*`) for their scripts.
- **Tests** keep feature-specific tests next to the feature and put live-server and static-export smoke specs in [`e2e/smoke/`](../e2e/smoke/). The existing browser fixtures and screenshot baselines remain under `e2e/`.

## Styling rules

- **Tailwind 4.3.3, local build, `tw:` prefix:** spacing numbers follow Vendra's scale (`tw:gap-5` = `--space-5`). Use the named layout utilities (`max-w-page`, `px-gutter`, `h-tap`, `z-header`, `rounded-control`…) and the semantic colours (`bg-page`, `text-body`).
- **Utilities first:** use logical sides (`ps-`/`pe-`) and write complete class names. Add `!` only to beat unlayered component styles. Preflight is off.
- **Custom CSS** is for contextual selectors and component internals, in `src/app/_styles/*.css` or the page's `styles.css`. No inline styles. `vf-` classes may exist only as hooks.
- **Page families** (`page-layouts.css`): `vf-shopping` (1240px), `vf-form` and `vf-info` (1088px). Use `vf-product-grid` for product grids.
- **Breakpoints:** `@media` takes only 768px, 1024px and 1440px (`--breakpoint-md/lg/xl` in `src/design-system/tokens/spacing.css`), in range syntax (`(width < 768px)`); `lint:css` rejects any other width. Finer cases are container queries: the shell's `vf-page` is a container, so page CSS can write `@container (width < 360px)`, and components lay out by their own width.
- **Density:** `data-density="compact" | "comfortable" | "tv"` on a container rescales the spacing, control heights, tap minimum, focus ring and type inside it (comfortable is the default). Overlays open outside the page, so pair it with `<VendraProvider density="…">`, as the presentation does on a TV. Don't restyle `.ag-*` classes for a screen size; change the density.
- **Layout tiers:** phone (< 768px), tablet (768–1023px) and desktop (1024px up) are chosen in CSS, never in JavaScript: the shell and views render every structure and Tailwind's `md:`/`lg:` (or `max-md:`/`max-lg:`) variants show one, so the first paint is the final layout. Phones get the compact header, the tab bar and the page's sticky action; tablets the menu header with the language switch and account but no tab bar; desktops the full header. Hide a component root with the important form (`tw:max-md:hidden!`), since the package's layers sit above Tailwind's utilities. JavaScript reads `matchMedia` only inside effects, for behaviour such as closing the menu or the shop's Filters dialog when the window widens.
- **Mobile:** one primary action per mobile page, placed above the tab bar. Arch frames only on the wedding hero and the main product image. Check EN and FA at 320px, 390px, 768px and desktop width.

## TV mode

The storefront runs on a television, read from about 3 metres and driven by a remote's arrows and OK
(Enter). The storefront document decides before the first render (`src/platform/browser/tv.js` → `vfApplyTvMode`) and sets
`data-density="tv"` on `<html>`; the Shell passes the same density to `VendraProvider` for the overlays.
First match wins:

1. **`?tv=1` / `?tv=0`** in the address turns TV mode on or off and remembers it on this device
   (`localStorage` `vf-tv`). Open the store once with `?tv=1` on the TV, or bookmark it.
2. **The remembered choice** from an earlier visit.
3. **A TV browser:** a user agent naming a TV platform (Tizen, webOS, Android/Google TV, Fire TV,
   Bravia, HbbTV, consoles…), or a screen at least 1440px wide that reports no pointer at all.
   Many TV browsers report a coarse or fine pointer (a pointing remote), so the media query alone
   misses most sets; the user agent and `?tv=1` cover them.

In TV mode:

- **Sizes** come from the `tv` density (`src/design-system/tokens/spacing.css`, `typography.css`): 24px body text, 64px
  tap minimum, 1760px content width and 48px gutters. Controls with a fixed size (the shell's text
  links, LanguageSwitch, Breadcrumb links, Gallery dots, Checkbox and Switch rows, the QuantityInput
  count, RangeSlider thumbs) take at least `--control-h-xs` (48px), so nothing interactive is smaller.
- **Arrow keys** move focus to the nearest item in that direction (`useVfRemoteNavigation`, on
  `src/design-system/utils/spatial.js`): header, product grids, carousels, filters and the controls of an
  open dialog. Directions are physical, so Persian (RTL) needs no mirroring. Tab order and what
  screen readers announce don't change. Widgets that use the arrows themselves keep them: tabs,
  lists, menus, radio groups, sliders, the Lightbox, and the caret in text fields (up and down
  still leave a text field). With nothing in that direction, the arrow scrolls the page.
- **Focus** shows the thicker `tv` ring (`--focus-width`, `--focus-offset`) plus a glow of
  `--focus-ring` around the control, or around the card whose link has focus (`src/design-system/tokens/base.css`).

The `tv` Playwright project (1920×1080, no touch) runs `tv.spec.mjs`: home, shop and product in
both languages with no horizontal overflow and no control under 48px, and the arrow keys reaching
and pressing Add to bag.

## Demo behavior

- **Products** have codes instead of names (`VF-7K2M4Q`). The code is the title everywhere and is searchable in any case or digits. URLs look like `en/product/VF-7K2M4Q/`. Old slugs resolve through `legacy`.
- **Shop URLs** keep the category (`en/shop/boxes/`), `sort`, `filters`, `occasion`, `min`/`max`, `stock` and `page` through reload, Back and language switches. The shop shows `VF_STORE.shopPageSize` designs per "Show more" page (12, a multiple of the 2-, 3- and 4-column grids so every page ends on a whole row; a tenant may raise it to 24 or another multiple of 12); a new filter or sort starts again from page 1. The six sample designs fit on one page, so `e2e/catalog/shop-paging.spec.mjs` serves the store config with four per page to exercise "Show more".
- **Counter presentation** (`en/presentation/`, noindex and not linked from the site): it fills the screen without the site's header or footer, so a seller can show a walk-in customer designs large on the shop's tablet.
  - **Display presets:** starts on a full-screen product. Tablet keeps browsing manual; TV plays immediately, pauses while seller dialogs are open or the tab is hidden, and remembers its preset on this device. Seller tools opens a focus-trapped side drawer; Browse designs opens the existing counter workflow; Return to display restores the product view.
  - **Product layout:** photos fit whole inside the screen with a separate caption row. An optional two-product layout uses wide landscape screens and falls back to one product in portrait; navigation advances by the number displayed.
  - **Collections:** save all designs, a category, or selected product codes on the device. A seller can also copy the current shortlist into the display collection. Subsequent customer searches and shortlist edits do not alter it; Ready/stock settings still apply.
  - **Playback:** choose 6, 10 (default), or 15 seconds. The next photos preload and decode before replacement; a slow or failed photo leaves the current product on screen. Transitions use a short fade and respect reduced motion.
  - **Captions:** Photo only, Photo and code (default), or Photo/code/price. The existing Show prices setting still overrides price captions. TV text scales for distance and stays inside a larger safe margin.
  - **Quiet navigation:** swipe or use arrow keys to change products without revealing controls (mirrored in Persian). Tap or press Enter to reveal controls for four seconds. Keyboard focus keeps the seller control visible.
  - **Finding a design:** by code, flower or kind (the same search as the search page), or by scanning the QR code on its printed tag with the camera, where the browser can read QR codes (`BarcodeDetector`).
  - **Full screen (`Lightbox`):** the design shows its sizes and extras with the price they come to. "Send to customer" includes those choices in the product link (`size`, `addons`), so the customer's phone opens the same configuration; unsupported choices are discarded by the catalog rules.
  - **Shortlist and order:** designs can be starred into a shortlist to compare side by side, or added to an order. The shortlist goes to the customer's phone as a QR code or WhatsApp link to `saved/?ids=…`; the order goes as one to `bag/?lines=…`. The site adds them to the visitor's own saved list or bag once, then drops them from the address.
  - **Settings:** show prices (including order lines and totals), Ready designs only, hide sold-out designs, keep the screen on, full screen, a slideshow after a minute untouched, and a PIN in front of the settings. They are kept on the device under `vf-presentation`. Clearing a search/category preserves these device settings. A rejected screen wake lock is retried only on a visibility change or a setting toggle.
  - **Quiet operation:** offline/reconnect notices, stock refresh failures and photo warnings stay in Seller tools while displaying products. A failed first photo uses a neutral placeholder; later failures retain the current product. The seller can retry photos from the drawer.
  - **Offline and stock:** in a production build the page registers `src/platform/browser/service-worker.js`, so the tablet keeps working when the Wi-Fi drops. With a live API it refreshes stock every two minutes.
- **Checkout** stores the finished order in session storage. Track shows it, and Order again refills the bag.
- **Sign-out leaves no personal data:** the sample account (profile, addresses with recipients' names and mobiles, reminders, wallet) is kept under `vf-account:<mobile>` only while signed in. `vfAccountSignOut` (`src/storefront/customer/account-data.js`) removes every `vf-account*` key, the signed-in customers' `vf-online-payment:*` records, the saved-items id cache (`vendra-saved-map`) and the newsletter email, and the site session keeps only the guest's drafts and history. A tenant app connected to the API loads this data from the server per session (memory, or `sessionStorage` at most) and never writes addresses, recipients, reminders or wallet data to `localStorage` (`API.md`, B11).
- **Account balance:** top-ups are simulated. Paying from a balance of at least `wallet.discountFrom` takes `discountPercent` off the products. A real store keeps the balance on its server.
- **Delivery pin:** a Leaflet map with OpenStreetMap tiles; point `VF_STORE.map.tiles` at another provider for real traffic. If the map fails, a typed address (`noMap`) replaces the pin.
- **Simulated, local only:** sign-in codes, payments, reminders, saved items, recently viewed, the newsletter flag and the consent choice (`vf-consent`). The browser API client in `src/platform/browser/integrations/` talks to the backend when `apiBase` is set. Its endpoint modules share HTTP handling in `request.js` and submission retry keys in `idempotency.js`.
- **Policies and contact:** policy text is sample copy that reads fees and areas from `delivery/delivery-zones.js`, so it stays current. Replace it with the florist's own policies before launch.
- **Preview states:** add `?tenant=clay` (any tenant in `src/design-system/tokens/tenants/`) for another theme; `en/shop/?min=2000000&max=4000000&stock=1`; `fa/shop/?demo=loading` or `?demo=error` (Retry restores results); `en/journal/?demo=loading`; `fa/journal/missing-story/`; `en/track/VB-TEST-1/` (cancelled sample). Checkout takes `demo=error` for the online payment simulation; fill the bag's delivery form first, since an empty bag redirects to the bag page.
- **Store configuration** (`src/storefront/store/store-config.js`): payment methods (order, card/holder/Sheba, pay-on-delivery zones), optional `features`, `languages`, contact channels (`null` hides one), the payment demo result, currency and API base. Run `npm run generate` after changing it.
- **Integration boundaries:** authentication and payment services come from the consuming project. Reminders are stored locally and send nothing; communication renderers return strings; WhatsApp links open only when clicked. Analytics keep a small local log and reach `vfRuntime.track.subscribe` listeners only after consent, without contact details. `page_view` and `purchase` also say where the visit came from: the landing link's `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `utm_term` and the referring site's host (`vfRuntime.track.attribution()`), kept for the tab in session storage (`vf-attribution`) only after the visitor accepts analytics. A tagged landing replaces it; an untagged one (including a return from the bank) keeps the tab's first source. Tag the links the store shares so each channel shows up: the Instagram bio (`?utm_source=instagram&utm_medium=social`), WhatsApp messages (`utm_source=whatsapp&utm_medium=message`) and the presentation's send links (`utm_source=counter&utm_medium=qr`).


## Shop display setup

Presentation opens directly on a product. Tap the screen (or use OK on a TV remote) to open Seller
tools, then **Set up this display**. Choose manual phone/tablet operation or automatic TV playback,
a collection, layout, captions, dwell time and optional full screen. **Start display** validates that
there is an eligible product. Device readiness stays inside seller tools: actual wake-lock state,
full screen, cached offline readiness and the last live stock update.

Select products using thumbnails and codes; search narrows the picker without clearing selections.
A preview and count show the eligible collection. Save up to 20 named display collections on this
device. Saving an existing name replaces its preferences; deleting a saved collection leaves the
current display unchanged. These profiles preserve the device's PIN when loaded.

**Transfer display setup** exports versioned JSON or a shareable link. Open a setup link on another
device, enter seller tools, review it and apply it. Only validated display preferences transfer;
PINs, customer orders, shortlists, personal details and named collection storage are excluded.
Imports preserve the destination device's PIN. Invalid data is rejected visibly.

The production build prepares its app shell and sample imagery on the first visit. Wait for
**Ready offline** in seller tools before disconnecting. Missing photos keep the last good product
and are skipped with bounded retry backoff; the seller can retry immediately. The service worker
retains versioned files for open displays during updates, with a bounded cache scoped to this app.
Photo-only mode excludes sold-out designs; other caption modes label them when included.

The sample catalog uses locally stored AI-generated product photography; see `public/assets/products/README.md`.
It illustrates fictional products and is not evidence of a real shop's inventory.

The permanent `touch-phone`, `tablet` and `tv` Playwright projects exercise real Chromium touch input,
RTL swipes, orientation changes, cached collection loops, reconnect and service-worker updates:

```sh
npm run test:e2e:demo -- devices.spec.mjs --project=touch-phone --project=tablet --project=tv
```

Physical iPad/Safari, WebOS, Tizen and Android TV still require checks on the intended hardware.

## Next.js development and static export

Development, the live server build, and the demo export share the strict root `tsconfig.json`.
Next.js points `next-env.d.ts` at the current mode's generated route types. `npm run typecheck`
also checks legacy storefront JavaScript and JSX with `tsconfig.storefront.json`.

```sh
npm run dev
npm run build:demo
npm run preview:demo
```

The dev and demo preview servers open on port 3000. The demo build exports every address
in `tools/build/routes.mjs` to `.generated/export/` with the existing React view HTML, metadata and structured data.
The browser takes over the shopping flow and restores the visitor's bag and checkout state. The
export's `404.html` lets tracking links with runtime order IDs and older product or journal links
boot the storefront at the requested address.

Run the smoke suites from the repo root after their corresponding builds.

```sh
npm run build
npm run test:smoke:app
npm run test:smoke:catalog
VF_BASE_PATH=/vendra-design-system VF_ORIGIN=https://misaf.github.io npm run build:demo
VF_BASE_PATH=/vendra-design-system VF_ORIGIN=https://misaf.github.io npm run test:smoke:demo
```

Each smoke command writes test results to `e2e/test-results/next/`. For a subpath deployment, use
the same `VF_BASE_PATH` when building, previewing and testing.
For the demo, use the same `VF_ORIGIN` for the build and smoke test so the sitemap check expects the public URLs.
The export also ships a service worker and manifest that cache each localized presentation document, its
Next.js assets and selected product photos for offline counter use.
