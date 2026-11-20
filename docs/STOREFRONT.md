# Florist storefront

The repository root is the Next.js app. Start with the folder for the URL you want to edit. A route's screen, logic, copy, styles and tests live beside its `page.tsx`. Put route-specific UI in its `_components/` folder.

| Change | Source |
| --- | --- |
| Home, catalog, product, journal, contact, account and tracking | `app/[locale]/(storefront)/` |
| Bag, delivery form and checkout | `app/[locale]/(checkout)/` |
| In-store presentation | `app/[locale]/presentation/` |
| Storefront header, footer or cross-route UI such as the order summary | `components/storefront/` |
| Reusable controls, design-system patterns and tokens | `components/ui/` |
| Cart, order and sign-in state across routes and languages | `session/useStorefrontSession.js` |
| Product, delivery, pricing and promotion rules | `domain/` |
| Laravel API transport and response adapters | `server/vendra/` |
| Shared translations, routing and browser services | `i18n/` and `shared/` |

Next.js omits route groups from the public URL. For example, the checkout group serves `/en/bag/` and `/en/checkout/`. The root document keeps the session above the locale segment. Use the shared storefront components for page chrome and keep checkout-specific state in the checkout route.

## Editing a page

Checkout's `page.tsx` selects the screen in the same directory. `CheckoutScreen.jsx` combines `useCheckout.js` with `CheckoutView.jsx`. The hook owns state and effects, and the view composes the route's components. Import shared UI controls directly from their files in `components/ui/`.

The Next.js layout uses `app/_components/StorefrontDocument.jsx` to initialize browser integrations and keep `session/useStorefrontSession.js` mounted across page and language changes. The `usePageLogic` and `useLifecycle` helpers in `shared/services/page-state.js` support page-local state and effects. `useStorefrontPage` in `shared/services/page-lifecycle.js` handles analytics, document updates and heading focus.

`copy.js` exports `vfCopy(S)`. English and Persian must have the same keys and list shapes (tested recursively).

**Shared code layout:** `shared/` and its neighboring `i18n/` and `styles/` directories are split by role, and `npm test` (`tools/app-dependencies.mjs` at the repo root) enforces which folder may import which:

| Folder | Holds | May import |
| --- | --- | --- |
| `platform/` | `environment.js`: the page's address, asset base and clock, in the browser and the prerender | nothing |
| `domain/` | pure store rules and sample data: store config, brand, catalog, delivery, payments, wallet, promotions, account data, formatting, tenant theme | `domain/`, `i18n/`, `platform/`, `components/ui/patterns/utils/`, `_runtime/` |
| `i18n/` | genuinely shared bilingual copy | same as `domain/` |
| `services/` | routing, SEO, focus/lifecycle, page state, offline, TV mode, navigation, `integrations/` (API, analytics) | `services/`, `domain/`, `i18n/`, `platform/`, `components/ui/patterns/utils/`, `_runtime/`, React, React Aria |
| `ui/` | storefront UI helpers the app UI layers may import (collection carousel, QR) | `ui/`, `domain/`, `i18n/`, `components/ui/patterns/`, React, `qrcode-generator` |
| `styles/` | the Tailwind entry and the custom CSS entry with shared page CSS | CSS only |

A JS module loose in `shared/` or in any other folder fails the check: place a new module by what it does.

**Adding a page:** add a folder and `page.tsx` in the appropriate `app/[locale]/` route group. Keep the screen, state, copy, styles and tests in the route folder. Register the storefront URL in `shared/services/routing.js`, and add its copy and SEO title. Add menu entries and CSS imports where needed.

## Commands

Run from the repo root (Node 20.19+ or 22.12+):

```sh
npm ci                                   # install from the root lockfile
npm run dev                             # Next.js at http://localhost:3000/ → /en/
npm run build   # Tailwind, custom CSS, tenant themes, design tokens
npm run check   # fails on stale generated output, unformatted code or a CSS lint error (raw colours, left/right sides: stylelint.config.mjs)
npm test        # typecheck, storefront logic, generation, copy parity, design system
npm run test:e2e  # Playwright: axe, screenshots, cards, tenants
npm run build:app                       # build the Next.js server
npm run preview                         # start the server at http://localhost:3000/
npm run build:demo                      # export to next/out/
npm run preview:demo                    # serve the static export at http://127.0.0.1:3000/
npm run test:e2e:build  # the storefront specs against the production build, plus the performance budgets
npm run test:e2e:remote  # optional: the same tests on a Linux server over ssh (see Browser tests)
```

- **One page on its own:** `/en/?page=checkout` renders that page with its default props.
- **Tenant list only:** `node build/generate.mjs` from the repository root rewrites `_runtime/tenant-slugs.js` from `components/ui/tokens/tenants/`.

## GitHub Pages demo

`.github/workflows/ci.yml` builds and deploys the Next.js export when CI passes on `master`.
Repository Settings → Pages → Source must be **GitHub Actions**. CI sets
`VF_BASE_PATH=/<repository-name>` so scripts, images and tenant themes use the repository path.
The uploaded artifact is `next/out/`.

The repository's Pages root opens the storefront; direct links can select a view and language:
`https://misaf.github.io/vendra-design-system/en/presentation/`. This hosts the
sample-data demo; live API services need their own backend.

### Prerendering and hydration

`build/routes.mjs` lists the localized views, categories, products, journal posts and policies. The
Next.js App Router exports each one with its rendered HTML, title, canonical URL, language alternates,
share metadata, and JSON-LD. The shared React renderer provides the initial view and metadata to the
export. The browser hydrates the same markup for a first visit. Returning visitors and query-driven
flows render from the requested address and their saved state. The initial document holds the build
clock for hydration, then delivery days and cutoffs update to the visitor's current time.

The build writes `sitemap.xml` from the same address list. A static host's `404.html` lets the browser
resolve order tracking URLs with runtime IDs and old product and journal addresses. The nginx
reference shows the fallback and cache headers. The export includes Brotli and gzip copies for
hosts that serve precompressed files.

## Browser tests

`test:e2e` builds the app once and runs storefront tests against the Next.js export, then runs only source fixtures, component specs, guideline cards and gateway tests on the development server. Use `test:e2e:build` or `test:e2e:dev` to run either suite alone. Reports are kept separately in `e2e/playwright-report/build/` and `e2e/playwright-report/dev/`. Tests run on Playwright's bundled Chromium at 390px and 1280px, in Tehran time (`timezoneId: 'Asia/Tehran'`) and `en-US` whatever the machine's settings.

Install the browser after `npm ci` (and after upgrading Playwright), then run the tests:

```sh
npm exec -- playwright install chromium
npm run test:e2e
```

- **`storefront`, `states`:** axe (WCAG 2.2 AA) on every view and on hidden states (menus, dialogs, validation, `?demo=loading|error`).
- **`pages`, `cards`:** screenshot comparisons, with the clock frozen at 2026-10-05. `cards` also checks the Contrast card for every tenant.
- **`components`, `components-in-use`, `features`:** component keyboard behavior, and storefront features end to end (promo codes, delivery pins, filters…).
- **`tenants`:** production storefront theme loading and flash prevention. **`tenant-fixtures`:** token contrast, email palettes and the theme builder on the development server.

The combined command routes `--project` filters to the suites that define them. For example, `npm run test:e2e -- --project=components` runs only development component tests; `--project=tv` runs only production TV tests. Repeated flags, multiple names and `*` wildcards are supported.

`openSite()` waits for the app to take control of prerendered content, then checks the routed main content and language after DOM readiness. Interaction tests then wait on the controls they use; background images and page preloads do not hold them up. Screenshot tests call `settlePage()` for fonts, images and stable layout. Performance tests explicitly wait for the resources their measurements require.

Performance budgets (`e2e/performance.spec.mjs`, production build only, phone profile) cap the compressed JS, CSS and fonts a page loads for the first route, the layout shift while fonts load, and, on slow 4G with a 4x slower CPU, the largest paint and the main-thread blocking time of the home, shop and product pages. They sit just above today's numbers; raise one only on purpose.

Screenshot comparison specs use software rasterization (`--disable-gpu`) so decoded WebP photos have repeatable colors across browser processes. This does not change storefront rendering in customers’ browsers. Baselines are per platform (`-darwin.png`, `-linux.png`), compared at `threshold: 0` with up to 25 differing pixels. `e2e/screenshot.css` hides only the text of native `<select>` elements, which the operating system draws a pixel or two differently between runs. Tests start with cookie consent given; use `NO_CONSENT` from `helpers.mjs` to test the banner. After an intended visual change, review `e2e/playwright-report/`, then run `test:e2e:update`.

## Continuous integration

`.github/workflows/ci.yml` runs on pushes to `master`, on pull requests (a branch is tested through its pull request) and by hand. A push or pull request that changes only `.github/` skips the browser tests (2 and 3); after a workflow change those tests should prove, run CI by hand (Actions → CI → Run workflow). The browser jobs stop after 75 minutes:

1. **Check and unit tests:** `npm ci`, `check` and `test` on Node 22. `test` includes the design system's bundle-size budget (`tests/size.test.mjs`): every export bundled alone and all of them together, with the peers left out, minified and gzipped. Small components must bundle without the rest; raise a budget only on purpose.
2. **Development fixtures and components:** `test:e2e:dev` inside Playwright's Linux image (`mcr.microsoft.com/playwright:v1.64.1-noble`), on its bundled Chromium (`CI` set: 2 workers, a fresh dev server), compared against the `-linux.png` baselines. Each component's own spec runs in the `components` project and each storefront organism spec in `storefront-components` (see below); `package.spec.mjs` covers what holds for the whole design system (reduced motion, cascade layers); `hydration.spec.mjs` server-renders every component directly from source in Node and hydrates it in the browser, in English and Persian, failing on any mismatch; `refs.spec.mjs` checks that every component hands its React 19 `ref` to its native control or its own element.
3. **Production storefront, visuals and performance:** `test:e2e:build` runs storefront flows, screenshots, accessibility checks, device tests and performance budgets against the Next.js export. `test:e2e:next` exercises the actual Pages artifact under the repository base path and checks bilingual checkout, tracking and offline display.

Dependabot (`.github/dependabot.yml`) opens weekly, grouped pull requests for the pinned npm tools and GitHub Actions, two weeks after each release; CI tests them like any change (an Actions-only bump runs the check jobs, not the browser tests). React's majors are left out: the storefront supports React 19 only, and a new major is a deliberate upgrade. The root manifest pins React and React Aria. `tests/dependencies.test.mjs` checks the lockfile for duplicate installations. A Playwright bump must also move the image tag in the workflows, which `assets.test.mjs` checks.

A failed browser run keeps `playwright-report/` and `test-results/` as the `e2e-report` artifact. After an intended visual change, update the macOS baselines locally with `test:e2e:update` and the Linux ones by running the **Update screenshots** workflow on a non-default branch (Actions → Update screenshots → Run workflow → select your branch); it commits the changed `-linux.png` files to that branch. Runs on the repository's default branch (currently `master`) or a tag fail before the screenshot job starts. Review both sets of baselines in a pull request before merging. When `@playwright/test` is upgraded, change the image tag in both workflows to match, then refresh the Linux baselines.

### On a remote server (optional)

`test:e2e:remote` runs the browser tests on a Linux server with Docker instead of this machine. It syncs the checkout with rsync (git-ignored files stay here), runs `test:e2e` there in the same Playwright image as CI (the tag follows the installed `@playwright/test`), then copies back `playwright-report/`, `test-results/` and any `-linux.png` files the run wrote. The local `test:e2e` is unchanged.

```bash
VENDRA_E2E_HOST=me@build-box npm run test:e2e:remote
VENDRA_E2E_HOST=me@build-box npm run test:e2e:remote -- pages.spec.mjs --update-snapshots
```

`VENDRA_E2E_HOST` is the ssh destination (key login; an `~/.ssh/config` alias works). `VENDRA_E2E_DIR` sets the folder on the server (default `vendra-e2e`), `E2E_WORKERS` the worker count (default 8 there; the config also reads it locally), and `E2E_TARGET=build` or `E2E_TARGET=dev` selects just that suite (the default runs both). The server needs `rsync`, and Docker usable by the ssh user without sudo. `node_modules` lives in the `vendra-e2e-node-modules` volume and is reinstalled only when `package-lock.json` changes. Keep screenshot runs in the container: outside it the server's fonts and Chromium draw differently from the `-linux.png` baselines.

### CI on a self-hosted runner (optional)

The browser jobs in `ci.yml` (`e2e`, `e2e-build`) and **Update screenshots** can run on your own server instead of GitHub's machines; the `check` job stays on GitHub. Nothing changes until the repository variable `E2E_RUNS_ON` is set.

1. On the server (Linux, with Docker usable by the runner's user), add a runner under **Settings → Actions → Runners → New self-hosted runner**, give it the label `vendra-e2e`, and install it as a service (`sudo ./svc.sh install && sudo ./svc.sh start`). A second runner with the same label in another folder lets `e2e` and `e2e-build` run at the same time.
2. Under **Settings → Secrets and variables → Actions → Variables**, set `E2E_RUNS_ON` to `["self-hosted","vendra-e2e"]`, and optionally `E2E_WORKERS` (Playwright workers, for example `8`) and `E2E_CPUS` (cores the job's container may use, for example `8`). On the self-hosted runner the container is also capped at 5 GB of memory, so the server's other services keep the rest.
3. Under **Settings → Actions → General**, keep "Require approval for all external contributors" for fork pull requests.

The jobs still run in the pinned Playwright image, so the `-linux.png` baselines are the same as on GitHub's machines. Pull requests from forks always run on GitHub's runners (the `runner` job in `ci.yml` decides), because this repository is public and a fork's code must never run on the server. Unset `E2E_RUNS_ON` to go back to GitHub's runners.

## Component tests

Every folder in `components/ui/patterns/` has its own browser test beside the component: `<Name>.spec.mjs` and `<Name>.fixture.jsx`.

- **Fixture:** exports `Fixture({lang})`, which renders the component in the states the spec needs, with plain `<output data-test=…>` elements for what callbacks report. The host page `e2e/fixtures/component.html?component=<Name>&lang=en|fa` renders it inside `VendraProvider`, with the page's `lang` and `dir` set.
- **Spec:** imports `openComponent`, `expectAccessible` and the shared helpers from `e2e/component-test.mjs`. It tests the component's role and name, keyboard use, built-in wording in both languages and its main props, and ends with `expectAccessible` (axe in English and Persian). Name things as a customer would see them; storefront flows stay in `e2e/features.spec.mjs`.
- **Running:** `npx playwright test -c e2e/playwright.config.mjs --project=components` runs them all; add the folder's path to run one (`../components/FilterBar`). They run in the `components` project on the dev server, at desktop width; a spec sets another viewport where it matters. The production-build run skips them.
- **Guard:** `npm test` fails when a component folder has no spec that opens its fixture. The development server compiles the fixtures for browser tests.

### Storefront organism tests

Storefront components may have the same pair beside them under their route or in `components/storefront/` (`<Name>.spec.mjs` and `<Name>.fixture.jsx`). The fixture renders the component with controlled state and explicit English/Persian copy, the way a View would; the spec tests its prop and callback contract (controlled values, `onX` wiring, conditional branches) and ends with `expectStorefrontAccessible`.

- **Host:** `e2e/fixtures/storefront-component.html?component=<Name>&lang=en|fa` loads the storefront's Tailwind, design-system and page styles and renders the fixture inside `VendraProvider`. Specs open it with `openStorefrontComponent` from `e2e/component-test.mjs`.
- **Running:** `npx playwright test -c e2e/playwright.config.mjs --project=storefront-components` (dev server, desktop width; CI runs it with the development suite).
- **Covered:** StorefrontCheckoutMethods, StorefrontCheckoutReceipt, StorefrontCheckoutSubmission, StorefrontBagSchedule, StorefrontBagLocation, StorefrontBagCards, StorefrontAccountEditorDialog and StorefrontPresentationOrder. Remaining coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
- **Guard:** `tests/atomic.test.mjs` fails when a spec lacks its fixture (or the reverse), and tracks the existing storefront components awaiting coverage in `tests/organisms-without-specs.json`. Remove a name when you add its spec.

## Runtime and export

`_runtime/` is generated; never edit it.

- **`app/[locale]/`** owns localized pages and layouts. The `(storefront)` group covers home, catalog, account, tracking and content, `(checkout)` covers bag and checkout, and `presentation/` serves the counter display. The root document keeps the session alive across groups and language switches. `server/` builds the initial route and metadata and is the home for future request-scoped Laravel integration.
- **Public URLs** use `/<locale>/` in links, canonical and alternate tags, and the sitemap.
- **Navigation:** `next/link` and the App Router handle page transitions. Search, filters, and form steps update the current URL through Next.js’s History API integration. React Aria links use the same App Router adapter.
- **Build** uses `build:app` for the Node-hosted app and `build:demo` for the static reference demo. The demo exports every known address through Next.js to `next/out/`. It serves the design system’s fonts and tenant CSS at their existing public paths.
- **Components:** the app imports them from `components/ui/` directly. The guideline cards (`guidelines/**/*.card.jsx`) import `guidelines/card-runtime.js`, which puts the components and helpers on `window.VendraDesignSystem` (and `AG_*`) for their scripts.
- **Tests** keep feature-specific tests next to the feature and put live-server and static-export browser coverage in `tests/e2e/`. The existing browser fixtures and screenshot baselines remain under `e2e/`.

## Styling rules

- **Tailwind 4.3.3, local build, `tw:` prefix:** spacing numbers follow Vendra's scale (`tw:gap-5` = `--space-5`). Use the named layout utilities (`max-w-page`, `px-gutter`, `h-tap`, `z-header`, `rounded-control`…) and the semantic colours (`bg-page`, `text-body`).
- **Utilities first:** use logical sides (`ps-`/`pe-`) and write complete class names. Add `!` only to beat unlayered component styles. Preflight is off.
- **Custom CSS** is for contextual selectors and component internals, in `styles/*.css` or the page's `styles.css`. No inline styles. `vf-` classes may exist only as hooks.
- **Page families** (`page-layouts.css`): `vf-shopping` (1240px), `vf-form` and `vf-info` (1088px). Use `vf-product-grid` for product grids.
- **Breakpoints:** `@media` takes only 768px, 1024px and 1440px (`--breakpoint-md/lg/xl` in `components/ui/tokens/spacing.css`), in range syntax (`(width < 768px)`); `lint:css` rejects any other width. Finer cases are container queries: the shell's `vf-page` is a container, so page CSS can write `@container (width < 360px)`, and components lay out by their own width.
- **Density:** `data-density="compact" | "comfortable" | "tv"` on a container rescales the spacing, control heights, tap minimum, focus ring and type inside it (comfortable is the default). Overlays open outside the page, so pair it with `<VendraProvider density="…">`, as the presentation does on a TV. Don't restyle `.ag-*` classes for a screen size; change the density.
- **Layout tiers:** phone (< 768px), tablet (768–1023px) and desktop (1024px up) are chosen in CSS, never in JavaScript: the shell and views render every structure and Tailwind's `md:`/`lg:` (or `max-md:`/`max-lg:`) variants show one, so the first paint is the final layout. Phones get the compact header, the tab bar and the page's sticky action; tablets the menu header with the language switch and account but no tab bar; desktops the full header. Hide a component root with the important form (`tw:max-md:hidden!`), since the package's layers sit above Tailwind's utilities. JavaScript reads `matchMedia` only inside effects, for behaviour such as closing the menu or the shop's Filters dialog when the window widens.
- **Mobile:** one primary action per mobile page, placed above the tab bar. Arch frames only on the wedding hero and the main product image. Check EN and FA at 320px, 390px, 768px and desktop width.

## TV mode

The storefront runs on a television, read from about 3 metres and driven by a remote's arrows and OK
(Enter). `main.jsx` decides before the first render (`shared/services/tv.js` → `vfApplyTvMode`) and sets
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

- **Sizes** come from the `tv` density (`components/ui/tokens/spacing.css`, `typography.css`): 24px body text, 64px
  tap minimum, 1760px content width and 48px gutters. Controls with a fixed size (the shell's text
  links, LanguageSwitch, Breadcrumb links, Gallery dots, Checkbox and Switch rows, the QuantityInput
  count, RangeSlider thumbs) take at least `--control-h-xs` (48px), so nothing interactive is smaller.
- **Arrow keys** move focus to the nearest item in that direction (`useVfRemoteNavigation`, on
  `components/ui/patterns/utils/spatial.js`): header, product grids, carousels, filters and the controls of an
  open dialog. Directions are physical, so Persian (RTL) needs no mirroring. Tab order and what
  screen readers announce don't change. Widgets that use the arrows themselves keep them: tabs,
  lists, menus, radio groups, sliders, the Lightbox, and the caret in text fields (up and down
  still leave a text field). With nothing in that direction, the arrow scrolls the page.
- **Focus** shows the thicker `tv` ring (`--focus-width`, `--focus-offset`) plus a glow of
  `--focus-ring` around the control, or around the card whose link has focus (`components/ui/tokens/base.css`).

The `tv` Playwright project (1920×1080, no touch) runs `tv.spec.mjs`: home, shop and product in
both languages with no horizontal overflow and no control under 48px, and the arrow keys reaching
and pressing Add to bag.

## Demo behavior

- **Products** have codes instead of names (`VF-7K2M4Q`). The code is the title everywhere and is searchable in any case or digits. URLs look like `en/product/VF-7K2M4Q/`. Old slugs resolve through `legacy`.
- **Shop URLs** keep the category (`en/shop/boxes/`), `sort`, `filters`, `occasion`, `min`/`max`, `stock` and `page` through reload, Back and language switches. The shop shows `VF_STORE.shopPageSize` designs per "Show more" page (12, a multiple of the 2-, 3- and 4-column grids so every page ends on a whole row; a tenant may raise it to 24 or another multiple of 12); a new filter or sort starts again from page 1. The six sample designs fit on one page, so `e2e/shop-paging.spec.mjs` serves the store config with four per page to exercise "Show more".
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
  - **Offline and stock:** in a production build the page registers `app/sw.js`, so the tablet keeps working when the Wi-Fi drops. With a live API it refreshes stock every two minutes.
- **Checkout** stores the finished order in session storage. Track shows it, and Order again refills the bag.
- **Sign-out leaves no personal data:** the sample account (profile, addresses with recipients' names and mobiles, reminders, wallet) is kept under `vf-account:<mobile>` only while signed in. `vfAccountSignOut` (`domain/account-data.js`) removes every `vf-account*` key, the signed-in customers' `vf-online-payment:*` records, the saved-items id cache (`vendra-saved-map`) and the newsletter email, and the site session keeps only the guest's drafts and history. A tenant app connected to the API loads this data from the server per session (memory, or `sessionStorage` at most) and never writes addresses, recipients, reminders or wallet data to `localStorage` (`API.md`, B11).
- **Account balance:** top-ups are simulated. Paying from a balance of at least `wallet.discountFrom` takes `discountPercent` off the products. A real store keeps the balance on its server.
- **Delivery pin:** a Leaflet map with OpenStreetMap tiles; point `VF_STORE.map.tiles` at another provider for real traffic. If the map fails, a typed address (`noMap`) replaces the pin.
- **Simulated, local only:** sign-in codes, payments, reminders, saved items, recently viewed, the newsletter flag and the consent choice (`vf-consent`). Only `shared/services/integrations/api.js` talks to the backend, and only when `apiBase` is set.
- **Policies and contact:** policy text is sample copy that reads fees and areas from `delivery.js`, so it stays current. Replace it with the florist's own policies before launch.
- **Preview states:** add `?tenant=clay` (any tenant in `components/ui/tokens/tenants/`) for another theme; `en/shop/?min=2000000&max=4000000&stock=1`; `fa/shop/?demo=loading` or `?demo=error` (Retry restores results); `en/journal/?demo=loading`; `fa/journal/missing-story/`; `en/track/VB-TEST-1/` (cancelled sample). Checkout takes `demo=error` for the online payment simulation; fill the bag's delivery form first, since an empty bag redirects to the bag page.
- **Store configuration** (`domain/store-config.js`): payment methods (order, card/holder/Sheba, pay-on-delivery zones), optional `features`, `languages`, contact channels (`null` hides one), the payment demo result, currency and API base. Run `npm run build` after changing it.
- **Integration boundaries:** authentication and payment services come from the consuming project. Reminders are stored locally and send nothing; communication renderers return strings; WhatsApp links open only when clicked. Analytics keep a small local log and reach `vfRuntime.track.subscribe` listeners only after consent, without contact details. `page_view` and `purchase` also say where the visit came from: the landing link's `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `utm_term` and the referring site's host (`vfRuntime.track.attribution()`), kept for the tab in session storage (`vf-attribution`) only after the visitor accepts analytics. A tagged landing replaces it; an untagged one (including a return from the bank) keeps the tab's first source. Tag the links the store shares so each channel shows up: the Instagram bio (`?utm_source=instagram&utm_medium=social`), WhatsApp messages (`utm_source=whatsapp&utm_medium=message`) and the presentation's send links (`utm_source=counter&utm_medium=qr`). `deployment/` files use `example.test`: update paths, domain and sitemap entries for the real host.


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

The sample catalog uses locally stored AI-generated product photography; see `assets/products/README.md`.
It illustrates fictional products and is not evidence of a real shop's inventory.

The permanent `touch-phone`, `tablet` and `tv` Playwright projects exercise real Chromium touch input,
RTL swipes, orientation changes, cached collection loops, reconnect and service-worker updates:

```sh
npm run test:e2e:build -- devices.spec.mjs --project=touch-phone --project=tablet --project=tv
```

Physical iPad/Safari, WebOS, Tizen and Android TV still require checks on the intended hardware.

The stage-201 composition audit records remaining page content, valid
page-level infrastructure and app dependency-check gaps. Stage 202 completes the shop heading;
stage 203 completes product breadcrumbs. Stage 204 completes controlled bag headings; the contact
form heading is completed in stage 205. Stage 206 completes the site checkout notice; site
integration-error feedback is completed in stage 207. Stage 208 completes bag delivery-section
placement; stage 209 completes checkout progress placement. Stage 210 simplifies shop View
composition; stage 211 simplifies product View composition while retaining recent reset-boundary and
toast ownership. Stage 212 simplifies bag View composition, retaining multi-child groups and
controlled visibility. Stage 213 simplifies checkout View composition, retaining payment grouping and
all payment/bank/success guards. Stage 214 simplifies site View composition, retaining provider/live-
region/boundary/loading ownership, route guards and customer keys. Stage 215 wires app dependency
checks into `npm test`: UI layer/helper boundaries, missing literal relative targets and runtime
JS/JSX cycles, with thirty filesystem regression scenarios. Only collection-carousel and QR are
shared UI-helper allowances, and their own imports are constrained. See the stage-215 checkpoint
for scope and exclusions. Stage 216 records the package contract audit:
packed consumer imports/types/assets/SSR and no-alias tree shaking pass, with theme export/type
asymmetry and persistent consumer-test gaps documented. Stage 217 resolves theme parity additively:
RAMPS/shade are available through both entry forms and types, with runtime/type regressions.
Stage 218 automates actual packed consumers in package/size tests: public assets/private subpaths,
all root value types and JSX consumers, no-alias bundles including lowercase namespaces, and unused
import removal. Packing is offline with scripts disabled; peers are reused without installation.
Stage 219 records the acceptance evidence audit: device/TV execution,
focused visual/axe evidence, real-sticky and project coverage limits, and hardware/screen-reader gaps.
Stage 220 corrects two stale Darwin Persian post baselines after tracing their old raised-dot
separators to the earlier intentional comma change. Exact metadata regressions cover classic/block
articles and related stories. Stage 221 adds dedicated touch-phone/tablet core-route acceptance
(product, bag/delivery, checkout, contact): taps, normal-sticky control reachability, validation
focus, receipt recovery and portrait geometry. Content axe temporarily unsticks the bottom bar,
then restores it; it is separate from actual sticky geometry checks. Browsing/recovery routes are
next. Physical-device, soft-keyboard and assistive-technology acceptance remain open.

Stage 222 adds dedicated touch browsing/recovery acceptance: filtered shop/search/product state
restoration, saved latest-removal and empty-state undo, missing-page home navigation and error
retry/home recovery. Sixteen new bilingual cases reuse the stage-221 sticky reachability/content
axe policy via device-helpers.mjs. All 32 combined cases pass in dev and production. Customer routes
are next; physical-device, soft-keyboard and screen-reader acceptance remain open.

Stage 223 adds dedicated touch customer-route acceptance: bilingual phone/code validation and demo
sign-in, profile email recovery/save/reload/sign-out/history guard, and order lookup failure/retry/
reload/return. All twelve cases pass in dev and production with unchanged shared device helpers.
Automatic field focus is checked before corrective scrolling; content axe and portrait geometry
remain distinct evidence. Real SMS/WebOTP/backend identity and physical-device/soft-keyboard/AT
acceptance are unverified. Editorial/help-route touch coverage is next.

Stage 224 adds touch-phone/tablet editorial/help acceptance for journal filtering/pagination,
article return navigation, FAQ disclosures/contact navigation and policy switches/anchors. It
fixes phone contents-panel overlap by strengthening the existing compact static-position rule;
landscape-tablet side contents stay sticky. All sixteen bilingual cases pass in dev/production,
plus four policy screenshots and four policy axe checks. Two reviewed Darwin phone baselines are
refreshed for rasterization changes; the old-sticky counterfactual matches their original images
exactly. custom.css is regenerated; shared helpers and desktop/Linux baselines are unchanged.
Weddings/presentation touch flows are next; hardware/soft-keyboard/AT
acceptance and older observations remain unverified.

Stage 225 covers touch weddings validation/draft-preserving anchors and presentation seller tools,
shortlist removal/clear/undo and focus return. Eight bilingual phone/tablet cases pass in dev and
production; ten existing presentation cases also pass. Catalog buttons now use native visible-
caption names with separate full-screen descriptions and decorative photos, resolving axe label/
name mismatch. Presentation's bare sticky toolbar gets explicit geometry checks. No styles or
baselines change and new cases activate no valid inquiry/share/order handoff. Home/shop discovery
and filter/sort touch acceptance are next; physical-device/soft-keyboard/AT limits remain.

Stage 226 covers home category/product round-trips and shop price sorting, load-more/reload,
stock filters and quick-filter recovery with twelve bilingual dedicated touch-phone/tablet cases.
All twelve pass in dev and production. Normal sticky reachability, automatic focus, restored
content axe and portrait control geometry use unchanged helpers. No runtime UI or baselines
change. Every registered route now has selected touch coverage; a refreshed acceptance inventory
and remaining-gap checklist are next. Full combinations, gestures and hardware/soft-keyboard/AT
acceptance remain unverified.

Stage 227 refreshes the acceptance coverage inventory, separating
1,737 registered invocations from executable/conditional coverage and mapping selected assertions
and exclusions for all 19 routes. All 80 combined dedicated touch-route cases pass freshly against
production (two workers, no retries/skips). Content axe, normal sticky reachability and portrait
geometry remain separate evidence. Full visuals/hydration, original device/offline/TV refresh,
physical devices, soft keyboards, AT and deeper state combinations are not implied complete. The
historical contact-map lifecycle/markup observation is next for focused diagnosis.

Stage 228 diagnoses the contact-map markup observation. Three retained
original routed PNG pairs are pixel-exact; the extra empty outgoing tile level is reproduced as
Leaflet lifecycle DOM, not a demonstrated visual defect. Four dedicated bilingual phone/tablet
map-lifecycle cases pass in dev/production without runtime or baseline changes. Tests check loaded
current tiles, centered marker, completed zoom, resize, routed unload/remount/history and reload.
Discovery now registers 1,745 invocations in 121 files; the stage-227 inventory remains a snapshot.
Full map/network/heap/visual/platform acceptance is not implied. Shop image/decode diagnostics are next.

Stage 229 scopes the shop photo capture observation. Retained
residuals are confirmed; all four historical decoded repeats are exact, but the original cause is
not isolated. Four bilingual 768/1920 diagnostics pass in dev/production across direct, reload and
routed entry, attaching image readiness and repeated main captures. No runtime or visual-policy/
baseline changes. Discovery is 1,753/122 files; historical configurations are not dedicated device
acceptance. Bag/checkout thumbnail observations and broader visual/platform gates remain open.

Stage 230 scopes bag/checkout thumbnail observations. Retained
residuals and ten exact historical repeats are verified; original captures already decoded images,
and the cause remains unproven. Four new affected-combination regressions check exact thumbnails
through bag/delivery/payment navigation/reload; all four shop cases also pass after shared-helper
extraction, in dev/production without retries. Full tests/check/build pass. Exploratory two/three
phone-bag text pixels/max 1 remain documented; order full-main exactness is not claimed. No runtime,
baseline or policy changes. Discovery is 1,761/123 files. SearchField keyboard-clear audit is next.

Stage 231 scopes SearchField keyboard behavior: forced-focus
Enter follows inherited focus/press semantics, while actual Tab/Enter/Escape clearing works as
documented. Two new component cases check callback counts/focus; eight journal/search keyboard
cases check filtering and recovery. All 13 dev/eight production cases and full tests/check/build
pass without retries. README callback-focus wording is corrected; no runtime or baseline changes.
Discovery is 1,771/124 files. AT/IME/soft-keyboard acceptance remains separate. Historical route
loading/focus timeout diagnostics are next.

Stage 232 scopes historical loading/focus failures. Retained
readiness failures have unfinished modules before axe; their slow-load cause and the original
stage-197 focus race remain unproven. Twelve controlled module-delay/latest-navigation/final-focus
cases pass in dev, followed by 16 existing route axe cases; all 28 pass together in production,
with one worker and no retries. Full tests/check/build pass. No runtime, timeout, baseline or policy
changes. Discovery is 1,783/125 files. Acceptance matrix/prioritized-gap refresh is next.

Stage 233 refreshes the acceptance matrix: 1,783 dev/1,387 production
registrations, with all 84 combined dedicated route/map production cases freshly passing. Completed
prior-head Linux CI remains red for EN/FA mobile policy screenshots in both broad jobs, despite
passing unit/React 19, route axe, hydration and other page comparisons. Expected/actual/diff artifact
diagnosis is next; no baseline refresh is assumed. Historical causes and hardware/backend acceptance
remain open. This stage changes documentation only and preserves history.

Stage 234 corrects stale Linux phone policy expectations.
The old sticky-rule counterfactual reproduces both old PNGs exactly in the CI-matched Linux image;
restoring static contents matches the common CI actuals exactly. Only two Linux mobile PNGs change.
Eight policy screenshot/axe cases pass per dev/production target on Linux and Darwin without
retries or snapshot updates; check/build pass. No runtime/tolerance changes. Original CI remains
historical red, with broad fresh PR CI separate. Full-page visual comparisons/residual review are
next; other state/platform/backend gates remain open.

Stage 235 audits the full default page matrix: 304 first-run
invocations; Darwin dev/production each 66 pass/10 screenshot fail, Linux dev 73 pass/three fail
(two screenshots/one readiness), Linux production 76 pass. Three Linux serial repeats pass, with
original failures/unknown causes retained. Ten Darwin stale-text expectations persist across both
targets; source/history and inspected crops support focused review next. All baseline PNGs remain
unchanged. Docs/check/build only; full visual/migration acceptance remains open.

Stage 236 corrects ten stale Darwin content expectations.
All ten old-content counterfactuals pass the original policy. The product total's removed dot is
verified separately from the shared Persian separator. Adopted images are retained stage-235 dev
captures; all other 248 snapshots remain unchanged. Darwin dev and production each pass all 76 default page comparisons, with two workers,
zero skips/retries and snapshot updates explicitly disabled.
Linux development readiness/map causes and deeper state/platform/backend acceptance remain open.

Stage 237 diagnoses Linux capture/readiness symptoms.
Fixed-clock CPU4 map probes reproduce the EN failure exactly and FA within one raw pixel; public
tooltip update restores both baselines exactly. FA callback instrumentation records a transient
1×1 viewport/font-loading phase measuring width98 instead of101, leaving the observed offset.
Six post controls show the four unfinished background modules can remain held while the post
renders; an active-post hold produces the old missing-main signature and recovers after release.
No source/policy/baseline changes; exact post scheduling cause and tiny-viewport origin remain open.
Next: test lifecycle-safe tooltip repositioning after later font loads, then a supported correction.

Stage 238 corrects map labels after later font loads.
PlacesMap refreshes current tooltips on FontFaceSet loading completion and removes the listener
on unmount. Three new component regressions fail before the correction and pass afterward.
The Linux CPU4 capture again measures temporary narrow widths, then automatically recenters labels;
first/second PNGs differ from old baselines by only one low-amplitude zoom-control pixel each.
All 68 targeted browser cases pass across Darwin/Linux dev/production, with no retries/skips;
unit/check/build, unchanged snapshot hashes and discovery checks pass. Inventory is 1,786 dev /
1,387 production. Contact/lifecycle comparisons use snapshot updates disabled.
No baseline or screenshot-policy changes. The post readiness deadline and tiny-viewport attribution
remain separate. Next: isolate active post load/evaluation timing; retain broader acceptance gates.

Stage 239 separates post HTTP completion from evaluation readiness.
Four new bilingual default-project cases hold real post module evaluation after HTTP200, assert
the original helper's five-second missing-main deadline, then verify article/locale and first-load
focus recovery on release. The source module is changed only by test interception.
All 64 route lifecycle cases pass on Darwin/Linux dev/production, with one worker, no skips/retries
and snapshot updates disabled. Check/build, unchanged baseline hashes and discovery pass; inventory
is 1,790 dev / 1,391 production.
No runtime/policy/baseline changes. This establishes the waiting/recovery contract, not the original
unobserved scheduling cause. Next: explicit state/integrity acceptance mapping; retain old latency
and other acceptance residuals without adding speculative waits.

Stage 240 maps the state/integrity acceptance subset.
Sixteen explicit frontend invariants are linked to actual browser/unit assertions and residuals.
A four-case dev probe confirms F01: the named payment-failure axe fixture is redirected to delivery
and still passes axe. This is a coverage defect, separate from the working refused-payment path.
All 96 selected browser cases pass on Darwin dev/production, including distinct TV controls, with
no skips/retries or snapshot updates. Fresh unit/check/build and unchanged baseline/inventory
checks pass. The four F01 observations are separate diagnostics, not added to the 96 cases.
No runtime/test/baseline changes. True cross-tab concurrency, server idempotency and offline writes
remain unproved. Next: repair F01's payment-state setup and assert the intended state before axe.

Stage 241 corrects the failed-payment state fixture.
Four pre-fix assertions fail because the old setup reaches delivery. The corrected fixture fills
valid delivery, exercises the local failed bank return and requires its heading/focus/retry state
before axe. Nearby payment step/errors/completion also gain explicit state assertions.
All 120 selected state/return-flow cases pass on Darwin/Linux dev/production with one worker,
no skips/retries and snapshot updates disabled. Check/build and consistency checks pass; all 258
baseline PNGs and 1,790 dev / 1,391 production registrations remain unchanged.
No application/baseline/policy changes or new registrations. F01 is closed for this fixture;
true two-tab behavior, repeated-submit UI, offline writes and other acceptance gaps remain open.
Next: shared-origin two-tab customer switch/pending-response coverage.

Stage 242 verifies two-tab customer/response ownership.
Real shared-origin tabs switch customer identity through the demo UI while a checkout POST waits.
Trusted storage events change the submitting tab to B; old success belongs to A, failure creates no
order, and B's newer private/current state survives. Returning to A and reloading retains its history.
All 96 selected cases pass on Darwin/Linux dev/production, including 32 two-tab executions, with
one worker and no skips/retries or snapshot updates. Check/build, unchanged baseline hashes and
input checks pass. Inventory increases by eight cases per target to 1,798 dev / 1,399 production.
Existing runtime passes these controls; no application/baseline changes. This does not establish
same-account write atomicity or backend guarantees. Next: numeric promo-removal amount assertion,
then repeated-submit/remount and offline-write controls.

Stage 243 asserts numeric promo total restoration.
The existing removal flow now runs EN/FA and requires 8,450,000 → 7,605,000 → 8,450,000 Toman in
the strong total row, with localized digits/currency, code normalization and restored input focus.
All 24 selected cases pass across Darwin/Linux dev/production, including 16 removal executions,
with no skips/retries or snapshot updates. Focused feature unit/check/build and consistency checks
pass; all 258 baselines are unchanged. Inventory is 1,800 dev / 1,401 production.
No runtime/baseline changes. The result covers visible sample totals, not backend discount authority.
Next: repeated-submit/remount UI coverage, followed by offline-write/reconnect controls.

Stage 244 prevents pending pointer replay across checkout remount.
The extended bilingual flow exposed a delayed synthetic click after disabled confirmation became
available, producing a second POST. Button now blocks pointer starts while loading/disabled.
A held real-adapter request, repeated native clicks before/after remount, original order quantity,
newer current state and one POST are checked together. Existing initial failures and readiness
residuals were recorded separately (see git history). All 80 selected cases pass across
Darwin/Linux dev/production with zero skips/retries, plus full root unit/check and fresh builds.
All 258 baselines and 1,800 dev / 1,401 production registrations are unchanged. Restoring the old
Button makes all four exact remount regressions fail with two POSTs; the patch is restored afterward.
No CSS or baseline changes; client guarding does not establish backend exactly-once behavior.
Next: offline mutation/reconnect controls.

Stage 245 verifies offline checkout and explicit reconnect recovery.
Actual browser-offline fetch failure must preserve bag, delivery, payment draft and order state.
Two reconnects send nothing; Try again only re-enables confirmation. Explicit confirmation sends
one controlled successful retry with the same payload and produces one local order. The application
already passes this behavior; no runtime or baseline changes. All 40 selected cases pass across
Darwin/Linux dev/production with zero skips/retries; focused storefront unit/check/build pass.
All 258 baselines remain unchanged; inventory increases to 1,804 dev / 1,405 production.
This is not a persistent queue or a backend exactly-once guarantee.
Next: saved-item offline write/reconnect controls.

Stage 246 verifies saved-item offline writes and explicit recovery.
Real browser-offline POST/DELETE failures preserve local intent and unrelated saved data. Two
reconnects do not replay; explicit save toggles or Undo send a controlled successful POST, update
only the target handle and survive a local reload. No runtime or baseline changes.
All 56 selected cases pass across Darwin/Linux dev/production with zero skips/retries; focused
migration/storefront unit, check and fresh production builds pass. All 258 baselines are unchanged;
inventory is 1,812 dev / 1,413 production. Shared sync-error state remains set after successful recovery;
initial handover data loss across full navigation is retained as a separate observation.
Next: reproduce initial shortlist-handover persistence, then scoped saved-sync error recovery.


## Stage 247 checkpoint: initial handover durability

Stage 247 persists initial handovers before any customer edit.
A confirmed bilingual reload regression replaced a consumed shortlist with the demo defaults.
The site now uses the same session serializer on mount and subsequent updates, preserving customer
partitions. Browser coverage checks fresh and existing visitor lists, duplicate/invalid handover IDs,
reload and full product navigation without an edit; focused unit coverage also checks bag handovers
and blocked-storage mounts. All 48 selected Darwin/Linux dev/production cases, full root unit and
check pass; all 258 baselines are unchanged. This requires available sessionStorage and does not establish server
persistence or same-account cross-tab atomicity.
Next: scoped saved-sync error ownership and recovery.

## Stage 248 checkpoint: scoped saved-sync recovery

Stage 248 clears recovered saved-item errors without hiding unresolved failures.
Initial list-load failures and individual product failures have separate ownership. A confirmed
write clears only its product; pending retries, local no-ops and other unresolved failures keep
feedback visible. Versioned outcomes prevent stale responses from hiding or reviving newer errors.
Owned stale live announcements clear after recovery while unrelated announcements are preserved.
All 48 selected Darwin/Linux dev/production cases, full root unit and check pass; 258 baselines
are unchanged.
Next: browser coverage for independent product and initial-load failure ownership.

## Stage 249 checkpoint: browser saved-error ownership

Stage 249 checks unresolved saved-error ownership through the real browser client.
Independent product failures, a failed initial read followed by a successful write, and a successful
late read following a failed write retain the unresolved alert. A fresh successful read clears
transient feedback without replaying writes. Controlled read-back can restore failed removals;
it is not a permanent local-intent or backend reconciliation guarantee.
This coverage branches directly from master and complements the recovery-clearing fix in PR #169.
All 64 selected master-based Darwin/Linux dev/production cases, root unit and check pass;
258 baselines remain unchanged. All 12 compatibility cases pass on PR #169 runtime; all three
blanket-clear negative controls fail as expected. Original master runtime is restored.
Next: review the pending saved-state PRs, then initial-load retry UX.

## Next.js development and static export

```sh
npm run dev
npm run build:demo
npm run preview:demo
npm run test:e2e:next
```

The dev and demo preview servers open on port 3000. The demo build exports every address
in `build/routes.mjs` to `next/out/` with the existing React view HTML, metadata and structured data.
The browser takes over the shopping flow and restores the visitor's bag and checkout state. The
export's `404.html` lets tracking links with runtime order IDs and older product or journal links
boot the storefront at the requested address.

For a subpath deployment, set `VF_BASE_PATH=/repository-name` when building, previewing and testing.
Set `VF_ORIGIN` to the public origin for absolute canonical, sitemap and share URLs. The export also
ships a service worker and manifest that cache each localized presentation document, its
Next.js assets and selected product photos for offline counter use.
