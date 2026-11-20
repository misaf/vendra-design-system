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

## Business capabilities

Use `src/storefront/<capability>/` for the rules, sample data, and shared bilingual copy a capability owns. For example, change cutoff and slot rules in `delivery/delivery-window.js`, the reference schedule in `delivery/delivery-schedule.js`, totals and discounts in `pricing/order-totals.js`, checkout payload assembly in `checkout/checkout-request.js`, and opening hours in `store/opening-hours.js`. Import rules and types from the owning capability. The guideline cards use `commerce/commerce.js` to access those same rules.

The import checker allows capability modules to use each other, platform helpers, pure design-system utilities, and generated tenant data. Browser services may use these capabilities. Reusable controls and presentational route components receive business data through props. `npm test` checks these import boundaries and detects cycles.

**Adding a page:** add a folder and `page.tsx` under `src/app/[locale]/`, matching the URL path. Keep the screen, state, copy, styles, and tests with the owning capability under `src/storefront/`. Place feature-owned UI in its `components/` directory. Register the storefront URL in `src/storefront/shell/routing.js`, and add its copy and SEO title. Add menu entries and CSS imports where needed.

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
npm run build:demo                      # export to .generated/export/
npm run preview:demo                    # serve the static export at http://127.0.0.1:3000/
npm run test:e2e:build  # the storefront specs against the production build, plus the performance budgets
npm run test:e2e:remote  # optional: the same tests on a Linux server over ssh (see Browser tests)
```

- **One page on its own:** `/en/?page=checkout` renders that page with its default props.
- **Tenant list only:** `node tools/build/generate.mjs` from the repository root rewrites `.generated/tenant-slugs.js` from `src/design-system/tokens/tenants/`.

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
- The `components` project checks component keyboard behavior. Storefront flows include [shared components in use](../e2e/components-in-use.spec.mjs), [promo codes and delivery pins](../e2e/bag-delivery.spec.mjs), and [catalog filters](../e2e/catalog-browsing.spec.mjs).
- **`tenants`:** production storefront theme loading and flash prevention. **`tenant-fixtures`:** token contrast, email palettes and the theme builder on the development server.

The combined command routes `--project` filters to the suites that define them. For example, `npm run test:e2e -- --project=components` runs only development component tests; `--project=tv` runs only production TV tests. Repeated flags, multiple names and `*` wildcards are supported.

`openSite()` waits for the app to take control of prerendered content, then checks the routed main content and language after DOM readiness. Interaction tests then wait on the controls they use; background images and page preloads do not hold them up. Screenshot tests call `settlePage()` for fonts, images and stable layout. Performance tests explicitly wait for the resources their measurements require.

Performance budgets (`e2e/performance.spec.mjs`, production build only, phone profile) cap the compressed JS, CSS and fonts a page loads for the first route, the layout shift while fonts load, and, on slow 4G with a 4x slower CPU, the largest paint and the main-thread blocking time of the home, shop and product pages. They sit just above today's numbers; raise one only on purpose.

Screenshot comparison specs use software rasterization (`--disable-gpu`) so decoded WebP photos have repeatable colors across browser processes. This does not change storefront rendering in customers’ browsers. Baselines are per platform (`-darwin.png`, `-linux.png`), compared at `threshold: 0` with up to 25 differing pixels. `e2e/screenshot.css` hides only the text of native `<select>` elements, which the operating system draws a pixel or two differently between runs. Tests start with cookie consent given; use `NO_CONSENT` from `helpers.mjs` to test the banner. After an intended visual change, review `e2e/playwright-report/`, then run `test:e2e:update`.

## Continuous integration

`.github/workflows/ci.yml` runs on pushes to `master`, on pull requests (a branch is tested through its pull request) and by hand. A push or pull request that changes only `.github/` skips the browser tests (2 and 3); after a workflow change those tests should prove, run CI by hand (Actions → CI → Run workflow). The browser jobs stop after 75 minutes:

1. **Check and unit tests:** `npm ci`, `check` and `test` on Node 22. `test` includes the design system's bundle-size budget (`tests/size.test.mjs`): every export bundled alone and all of them together, with the peers left out, minified and gzipped. Small components must bundle without the rest; raise a budget only on purpose.
2. **Development fixtures and components:** `test:e2e:dev` inside Playwright's Linux image (`mcr.microsoft.com/playwright:v1.64.1-noble`), on its bundled Chromium (`CI` set: 2 workers, a fresh dev server), compared against the `-linux.png` baselines. Each component's own spec runs in the `components` project and each storefront component spec in `storefront-components` (see below); `package.spec.mjs` covers what holds for the whole design system (reduced motion, cascade layers); `hydration.spec.mjs` server-renders every component directly from source in Node and hydrates it in the browser, in English and Persian, failing on any mismatch; `refs.spec.mjs` checks that every component hands its React 19 `ref` to its native control or its own element.
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

Component folders in `src/design-system/components/` colocate `<Name>.spec.mjs` and `<Name>.fixture.jsx`. The ChoiceGroup fixture and spec also exercise ChoiceTile in its required group context.

- **Fixture:** exports `Fixture({lang})`, which renders the component in the states the spec needs, with plain `<output data-test=…>` elements for what callbacks report. The host page `e2e/fixtures/component.html?component=<Name>&lang=en|fa` renders it inside `VendraProvider`, with the page's `lang` and `dir` set.
- **Spec:** imports `openComponent`, `expectAccessible` and the shared helpers from `e2e/component-test.mjs`. It tests the component's role and name, keyboard use, built-in wording in both languages and its main props, and ends with `expectAccessible` (axe in English and Persian). Use customer-facing names for the tests. The [browser tests](#browser-tests) cover cross-component storefront flows.
- **Running:** `npx playwright test -c e2e/playwright.config.mjs --project=components` runs them all; add the folder's path to run one (`src/design-system/components/FilterBar`). They run in the `components` project on the dev server, at desktop width; a spec sets another viewport where it matters. The production-build run skips them.
- **Guard:** `npm test` fails when a component folder has no spec that opens its fixture. The development server compiles the fixtures for browser tests.

### Storefront component tests

Storefront components may have the same pair beside them under their route or in `src/storefront/shell/components/` (`<Name>.spec.mjs` and `<Name>.fixture.jsx`). The fixture renders the component with controlled state and explicit English/Persian copy, the way a View would; the spec tests its prop and callback contract (controlled values, `onX` wiring, conditional branches) and ends with `expectStorefrontAccessible`.

- **Host:** `e2e/fixtures/storefront-component.html?component=<Name>&lang=en|fa` loads the storefront's Tailwind, design-system and page styles and renders the fixture inside `VendraProvider`. Specs open it with `openStorefrontComponent` from `e2e/component-test.mjs`.
- **Running:** `npx playwright test -c e2e/playwright.config.mjs --project=storefront-components` (dev server, desktop width; CI runs it with the development suite).
- **Covered:** StorefrontCheckoutMethods, StorefrontCheckoutReceipt, StorefrontCheckoutSubmission, StorefrontBagSchedule, StorefrontBagLocation, StorefrontBagCards, StorefrontAccountEditorDialog and StorefrontPresentationOrder. Remaining coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
- **Guard:** `tests/component-scaffolding.test.mjs` fails when a spec lacks its fixture (or the reverse), and tracks the existing storefront components awaiting coverage in `tests/storefront-components-without-specs.json`. Remove a name when you add its spec.

## Runtime and export

`.generated/` is generated; never edit it.

- **`src/app/[locale]/`** owns localized pages and layouts. Its folders follow the customer-facing URLs. `presentation/` serves the counter display. The root document keeps the session alive across routes and language switches. `src/app/_server/` builds the initial route and metadata and is the home for future request-scoped Laravel integration.
- **Public URLs** use `/<locale>/` in links, canonical and alternate tags, and the sitemap.
- **Navigation:** `tools/next/link` and the App Router handle page transitions. Search, filters, and form steps update the current URL through Next.js’s History API integration. React Aria links use the same App Router adapter.
- **Build** uses `build:app` for the Node-hosted app and `build:demo` for the static reference demo. The demo exports every known address through Next.js to `.generated/export/`. It serves the design system’s fonts and tenant CSS at their existing public paths.
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
  - **Offline and stock:** in a production build the page registers `src/platform/browser/service-worker.js`, so the tablet keeps working when the Wi-Fi drops. With a live API it refreshes stock every two minutes.
- **Checkout** stores the finished order in session storage. Track shows it, and Order again refills the bag.
- **Sign-out leaves no personal data:** the sample account (profile, addresses with recipients' names and mobiles, reminders, wallet) is kept under `vf-account:<mobile>` only while signed in. `vfAccountSignOut` (`src/storefront/customer/account-data.js`) removes every `vf-account*` key, the signed-in customers' `vf-online-payment:*` records, the saved-items id cache (`vendra-saved-map`) and the newsletter email, and the site session keeps only the guest's drafts and history. A tenant app connected to the API loads this data from the server per session (memory, or `sessionStorage` at most) and never writes addresses, recipients, reminders or wallet data to `localStorage` (`API.md`, B11).
- **Account balance:** top-ups are simulated. Paying from a balance of at least `wallet.discountFrom` takes `discountPercent` off the products. A real store keeps the balance on its server.
- **Delivery pin:** a Leaflet map with OpenStreetMap tiles; point `VF_STORE.map.tiles` at another provider for real traffic. If the map fails, a typed address (`noMap`) replaces the pin.
- **Simulated, local only:** sign-in codes, payments, reminders, saved items, recently viewed, the newsletter flag and the consent choice (`vf-consent`). The browser API client in `src/platform/browser/integrations/` talks to the backend when `apiBase` is set. Its endpoint modules share HTTP handling in `request.js` and submission retry keys in `idempotency.js`.
- **Policies and contact:** policy text is sample copy that reads fees and areas from `delivery/delivery-zones.js`, so it stays current. Replace it with the florist's own policies before launch.
- **Preview states:** add `?tenant=clay` (any tenant in `src/design-system/tokens/tenants/`) for another theme; `en/shop/?min=2000000&max=4000000&stock=1`; `fa/shop/?demo=loading` or `?demo=error` (Retry restores results); `en/journal/?demo=loading`; `fa/journal/missing-story/`; `en/track/VB-TEST-1/` (cancelled sample). Checkout takes `demo=error` for the online payment simulation; fill the bag's delivery form first, since an empty bag redirects to the bag page.
- **Store configuration** (`src/storefront/store/store-config.js`): payment methods (order, card/holder/Sheba, pay-on-delivery zones), optional `features`, `languages`, contact channels (`null` hides one), the payment demo result, currency and API base. Run `npm run build` after changing it.
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

The sample catalog uses locally stored AI-generated product photography; see `public/assets/products/README.md`.
It illustrates fictional products and is not evidence of a real shop's inventory.

The permanent `touch-phone`, `tablet` and `tv` Playwright projects exercise real Chromium touch input,
RTL swipes, orientation changes, cached collection loops, reconnect and service-worker updates:

```sh
npm run test:e2e:build -- devices.spec.mjs --project=touch-phone --project=tablet --project=tv
```

Physical iPad/Safari, WebOS, Tizen and Android TV still require checks on the intended hardware.

## Next.js development and static export

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
npm run build:app
npm run test:e2e:live
VF_BASE_PATH=/vendra-design-system VF_ORIGIN=https://misaf.github.io npm run build:demo
VF_BASE_PATH=/vendra-design-system npm run test:e2e:next
```

Both smoke commands write test results to `e2e/test-results/next/`. For a subpath deployment, use
the same `VF_BASE_PATH` when building, previewing and testing.
Set `VF_ORIGIN` to the public origin for absolute canonical, sitemap and share URLs. The export also
ships a service worker and manifest that cache each localized presentation document, its
Next.js assets and selected product photos for offline counter use.
