# Storefront templates

The maintained bilingual storefront: a Vite React app (`app/`) with 17 pages in `storefront-*`, wired together by `storefront-site` (the click-through router). Pages run on sample data in `_shared/`; its target shape is the Vendra API (see [API.md](API.md)). Feature map and integration boundaries: [MIGRATION.md](MIGRATION.md).

The UI library is migrating to [Atomic Design](../ATOMIC-DESIGN.md). Migrated UI lives in
`../components/atoms/` and `../components/molecules/`; organisms follow in separate batches.
The app continues to import components through `app/ds.js`, and `storefront-*` remains the source
for routed pages.

## Where to edit

| Change | File |
| --- | --- |
| Page markup | `storefront-<page>/View.jsx` (JSX inside the shared `Shell`) |
| Page behavior / copy / styles | `storefront-<page>/logic.js` / `copy.js` / `styles.css` |
| Store name, contact, hours, currency, map, payment, balance, announcement | [_shared/store-config.js](_shared/store-config.js) |
| Products, sizes, add-ons | [_shared/catalog.js](_shared/catalog.js) |
| Delivery zones, fees, cut-offs, days, slots, free delivery | [_shared/delivery.js](_shared/delivery.js) |
| Promo codes | [_shared/promotions.js](_shared/promotions.js) |
| Header composition | `app/organisms/StorefrontHeader/StorefrontHeader.jsx` (explicit props and callbacks from Shell) |
| Footer composition | `app/organisms/StorefrontFooter/StorefrontFooter.jsx` (explicit content and consent callback from Shell) |
| Mobile menu composition | `app/organisms/StorefrontMenu/StorefrontMenu.jsx` (controlled state, content and callbacks from Shell) |
| Consent banner composition | `app/organisms/StorefrontConsent/StorefrontConsent.jsx` (visibility, content and callbacks from Shell; workflow in `_shared/navigation.js`) |
| Announcement composition | `app/organisms/StorefrontAnnouncement/StorefrontAnnouncement.jsx` (text, optional link and dismissal callback from Shell) |
| Bottom-bar layout | `app/layouts/StorefrontBottomBar/StorefrontBottomBar.jsx` (consent, sticky-action and navigation slots from Shell) |
| Presentation display | `app/organisms/StorefrontPresentationDisplay/StorefrontPresentationDisplay.jsx` (controlled products/mode/captions, localized labels and image/navigation/tool callbacks; local reveal/pointer UI state) |
| Presentation viewer | `app/organisms/StorefrontPresentationViewer/StorefrontPresentationViewer.jsx` (controlled lightbox, captions/options and customer actions; quotes, stock and seller state remain in View/logic) |
| Presentation send/share | `app/organisms/StorefrontPresentationSend/StorefrontPresentationSend.jsx` (send descriptor, localized labels and close callback; QR/tag, warning and share/copy/print composition) |
| Presentation shortlist | `app/organisms/StorefrontPresentationShortlist/StorefrontPresentationShortlist.jsx` (controlled items/open/prices, localized labels, label renderer and close/clear/send/item callbacks) |
| Presentation toolbar | `app/organisms/StorefrontPresentationToolbar/StorefrontPresentationToolbar.jsx` (controlled search, categories, status and explicit action descriptors from View) |
| Presentation catalog | `app/organisms/StorefrontPresentationCatalog/StorefrontPresentationCatalog.jsx` (tile data/callbacks, controlled empty/price visibility, localized labels, clear callback and label renderer from View) |
| Presentation outer layout | `app/layouts/StorefrontPresentationLayout/StorefrontPresentationLayout.jsx` (heading, bar, catalog, display, overlays and feedback slots; externally controlled density/catalog visibility) |
| Error layout | `app/layouts/StorefrontErrorLayout/StorefrontErrorLayout.jsx` (message and actions from error View) |
| Not-found layout | `app/layouts/StorefrontNotfoundLayout/StorefrontNotfoundLayout.jsx` (message, actions, recommendation heading and recommendations from not-found View) |
| Home layout | `app/layouts/StorefrontHomeLayout/StorefrontHomeLayout.jsx` (top, featured, occasions, arrivals, weddings, journal and newsletter slots from home View; externally controlled optional visibility) |
| Post layout | `app/layouts/StorefrontPostLayout/StorefrontPostLayout.jsx` (feedback, article, actions, recommendations and related slots from post View; externally controlled article visibility) |
| Journal layout | `app/layouts/StorefrontJournalLayout/StorefrontJournalLayout.jsx` (heading, search, feedback, featured, stories and pagination slots from journal View) |
| Policy layout | `app/layouts/StorefrontPolicyLayout/StorefrontPolicyLayout.jsx` (heading, policy navigation, notice, table of contents and document slots from policy View) |
| FAQ layout | `app/layouts/StorefrontFaqLayout/StorefrontFaqLayout.jsx` (heading, questions and contact slots from FAQ View) |
| Weddings layout | `app/layouts/StorefrontWeddingsLayout/StorefrontWeddingsLayout.jsx` (heading, hero media, services, story, inquiry introduction, inquiry and feedback slots from weddings View) |
| Contact layout | `app/layouts/StorefrontContactLayout/StorefrontContactLayout.jsx` (heading, details, form and feedback slots from contact View) |
| Search layout | `app/layouts/StorefrontSearchLayout/StorefrontSearchLayout.jsx` (heading, query, close, popular, results and empty slots from search View) |
| Saved-products layout | `app/layouts/StorefrontSavedLayout/StorefrontSavedLayout.jsx` (results/empty visibility, heading, notice, results and empty slots from saved View) |
| Tracking layout | `app/layouts/StorefrontTrackLayout/StorefrontTrackLayout.jsx` (order visibility, lookup, heading, details, summary and feedback/reorder-dialog slots from tracking View) |
| Sign-in layout | `app/layouts/StorefrontSigninLayout/StorefrontSigninLayout.jsx` (phone, code and feedback/continuation slots from sign-in View) |
| Account layout | `app/layouts/StorefrontAccountLayout/StorefrontAccountLayout.jsx` (heading, actions, notices, tabs, feedback and dialog slots from account View) |
| Checkout layout | `app/layouts/StorefrontCheckoutLayout/StorefrontCheckoutLayout.jsx` (payment visibility, notices, progress, heading, review, payment, summary and bank/success slots from checkout View) |
| Bag/delivery layout | `app/layouts/StorefrontBagLayout/StorefrontBagLayout.jsx` (visibility and notice, progress, heading, items/delivery, summary and empty slots from bag View) |
| Shop-page layout | `app/layouts/StorefrontShopLayout/StorefrontShopLayout.jsx` (heading, sidebar, compact categories, results and filter-dialog slots from shop View) |
| Product-page layout | `app/layouts/StorefrontProductLayout/StorefrontProductLayout.jsx` (breadcrumbs, gallery, details, related designs and feedback slots from product View) |
| Main storefront layout | `app/layouts/StorefrontLayout/StorefrontLayout.jsx` (section slots and tenant/language metadata from Shell) |
| Providers, bare presentation and sticky measurements | `app/Shell.jsx` (values in `_shared/navigation.js`) |
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

Each page folder holds `View.jsx` (the page's JSX, rendered inside `app/Shell.jsx`, which takes the page content and the sticky mobile action), `logic.js` (the `usePage(props)` hook: the page's state, effects and the values its view renders), `copy.js` and `styles.css`; `Page.jsx` is the function component that renders `<View v={{...props, ...usePage(props)}} />`. A view reads everything from `v`. Page state lives on one page object from `usePageLogic` (`_shared/page-state.js`): `page.setState` applies at once and re-renders, `useLifecycle` runs didMount / didUpdate / willUnmount, and `useStorefrontPage` (`_shared/page-lifecycle.js`) handles analytics and heading focus. `logic.js`, `copy.js` and the shared logic in `_shared/` are ES modules that import what they use; the integrations (`VF_API`, `VF_TRACK`, `VF_PAYMENT`) attach to `window`, imported once by `app/runtime.js`. `_shared/product-categories.js` holds the category data that catalog and category names both read, so it loads before either.

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
npm --prefix templates run test:e2e:remote # optional: the same tests on a Linux server over ssh (see Browser tests)
```

- **One page on its own:** `/templates/app/?page=checkout` renders that page with its default props.
- **Tenant list only:** `node _build/generate.cjs` rewrites `_runtime/tenant-slugs.js` from `tokens/tenants/`.
- **Port:** 5173 is fixed.

## GitHub Pages demo

`.github/workflows/pages.yml` builds and deploys the app on pushes to `master`, or when run manually
from Actions. Repository Settings → Pages → Source must be **GitHub Actions**. The workflow passes
`--base /<repository-name>/` to Vite, keeping local development at `/` while published scripts, images
and tenant themes use the repository path. The uploaded artifact is `templates/_app-build/`.

The repository's Pages root opens the storefront; direct links can select a view and language:
`https://misaf.github.io/vendra-design-system/templates/app/?view=presentation&lang=en`.
This hosts the sample-data demo; live API services need their own backend.

To verify the same paths locally:

```sh
npm --prefix templates run build:app -- --base /vendra-design-system/
npm --prefix templates run preview -- --base /vendra-design-system/
# http://127.0.0.1:4173/vendra-design-system/templates/app/?view=presentation&lang=en
```

## Browser tests

`_e2e/` runs on the installed Google Chrome at 390px and 1280px, reusing a running dev server, in Tehran time (`timezoneId: 'Asia/Tehran'`) and `en-US` whatever the machine's settings.

- **`storefront`, `states`:** axe (WCAG 2.2 AA) on every view and on hidden states (menus, dialogs, validation, `?demo=loading|error`).
- **`pages`, `cards`:** screenshot comparisons, with the clock frozen at 2026-10-05. `cards` also checks the Contrast card for every tenant.
- **`components`, `components-in-use`, `features`:** component keyboard behavior, and storefront features end to end (promo codes, delivery pins, filters…).
- **`tenants`:** the seven contrast checks, and that each storefront loads only its own tenant file.

Performance budgets (`_e2e/performance.spec.mjs`, production build only, phone profile) cap the compressed JS, CSS and fonts a page loads before the site preloads the others (`vf-preload-pages` mark in `app/pages.js`), the layout shift while fonts load, and, on slow 4G with a 4x slower CPU, the largest paint and the main-thread blocking time of the home, shop and product pages. They sit just above today's numbers; raise one only on purpose.

Screenshot comparison specs use software rasterization (`--disable-gpu`) so decoded WebP photos have repeatable colors across browser processes. This does not change storefront rendering in customers’ browsers. Baselines are per platform (`-darwin.png`, `-linux.png`), compared at `threshold: 0` with up to 25 differing pixels. `_e2e/screenshot.css` hides only the text of native `<select>` elements, which the operating system draws a pixel or two differently between runs. Tests start with cookie consent given; use `NO_CONSENT` from `helpers.mjs` to test the banner. After an intended visual change, review `_e2e/playwright-report/`, then run `test:e2e:update`.

## Continuous integration

`.github/workflows/ci.yml` runs on pushes to `master`, on pull requests (a branch is tested through its pull request) and by hand. A push or pull request that changes only `.github/` skips the browser tests (3 and 4); after a workflow change those tests should prove, run CI by hand (Actions → CI → Run workflow). The browser jobs stop after 75 minutes:

1. **Check and unit tests:** `npm ci`, `check` and `test` on Node 22. `test` includes the package's bundle-size budget (`_tests/size.test.mjs`): every export bundled alone and all of them together, with the peers left out, minified and gzipped. Small components must bundle without the rest; raise a budget only on purpose.
2. **Package on React 19:** `test:react19` installs React 19 and its types in a scratch app, runs the package test there (import, server render, wording, themes) and type-checks `dist/`'s declarations strictly. The workspace itself stays on React 18.3.1.
3. **Browser tests:** `test:e2e` inside Playwright's Linux image (`mcr.microsoft.com/playwright:v1.64.0-noble`), on its bundled Chromium (`CI` set: no Chrome channel, 2 workers, a fresh dev server), compared against the `-linux.png` baselines. Each component's own spec runs in the `components` project (see below); `package.spec.mjs` covers what holds for the whole package (reduced motion, cascade layers); `hydration.spec.mjs` server-renders every export from `dist/` in Node and hydrates it in the browser, in English and Persian, failing on any mismatch.
4. **Production build:** `test:e2e:build` in the same image, with the performance budgets.

Dependabot (`.github/dependabot.yml`) opens weekly, grouped pull requests for the pinned npm tools and GitHub Actions, two weeks after each release; CI tests them like any change (an Actions-only bump runs the check jobs, not the browser tests). React's majors are left out (the React 19 job covers the next one), and a Playwright bump must also move the image tag in the workflows, which `assets.test.cjs` checks.

A failed browser run keeps `playwright-report/` and `test-results/` as the `e2e-report` artifact. After an intended visual change, update the macOS baselines locally with `test:e2e:update` and the Linux ones by running the **Update screenshots** workflow on the branch (Actions → Update screenshots → Run workflow); it commits the changed `-linux.png` files. Review both before merging. When `@playwright/test` is upgraded, change the image tag in both workflows to match, then refresh the Linux baselines.

### On a remote server (optional)

`test:e2e:remote` runs the browser tests on a Linux server with Docker instead of this machine. It syncs the checkout with rsync (git-ignored files stay here), runs `test:e2e` there in the same Playwright image as CI (the tag follows the installed `@playwright/test`), then copies back `playwright-report/`, `test-results/` and any `-linux.png` files the run wrote. The local `test:e2e` is unchanged.

```bash
VENDRA_E2E_HOST=me@build-box npm --prefix templates run test:e2e:remote
VENDRA_E2E_HOST=me@build-box npm --prefix templates run test:e2e:remote -- pages.spec.mjs --update-snapshots
```

`VENDRA_E2E_HOST` is the ssh destination (key login; an `~/.ssh/config` alias works). `VENDRA_E2E_DIR` sets the folder on the server (default `vendra-e2e`), `E2E_WORKERS` the worker count (default 8 there; the config also reads it locally), and `E2E_TARGET=build` runs `test:e2e:build`. The server needs `rsync`, and Docker usable by the ssh user without sudo. `node_modules` lives in the `vendra-e2e-node-modules` volume and is reinstalled only when `package-lock.json` changes. Keep screenshot runs in the container: outside it the server's fonts and Chromium draw differently from the `-linux.png` baselines.

### CI on a self-hosted runner (optional)

The browser jobs in `ci.yml` (`e2e`, `e2e-build`) and **Update screenshots** can run on your own server instead of GitHub's machines; the `check` and React 19 jobs stay on GitHub. Nothing changes until the repository variable `E2E_RUNS_ON` is set.

1. On the server (Linux, with Docker usable by the runner's user), add a runner under **Settings → Actions → Runners → New self-hosted runner**, give it the label `vendra-e2e`, and install it as a service (`sudo ./svc.sh install && sudo ./svc.sh start`). A second runner with the same label in another folder lets `e2e` and `e2e-build` run at the same time.
2. Under **Settings → Secrets and variables → Actions → Variables**, set `E2E_RUNS_ON` to `["self-hosted","vendra-e2e"]`, and optionally `E2E_WORKERS` (Playwright workers, for example `8`) and `E2E_CPUS` (cores the job's container may use, for example `8`). On the self-hosted runner the container is also capped at 5 GB of memory, so the server's other services keep the rest.
3. Under **Settings → Actions → General**, keep "Require approval for all external contributors" for fork pull requests.

The jobs still run in the pinned Playwright image, so the `-linux.png` baselines are the same as on GitHub's machines. Pull requests from forks always run on GitHub's runners (the `runner` job in `ci.yml` decides), because this repository is public and a fork's code must never run on the server. Unset `E2E_RUNS_ON` to go back to GitHub's runners.

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
- **Breakpoints:** `@media` takes only 768px, 1024px and 1440px (`--breakpoint-md/lg/xl` in `tokens/spacing.css`), in range syntax (`(width < 768px)`); `lint:css` rejects any other width. Finer cases are container queries: the shell's `vf-page` is a container, so page CSS can write `@container (width < 360px)`, and components lay out by their own width.
- **Density:** `data-density="compact" | "comfortable" | "tv"` on a container rescales the spacing, control heights, tap minimum, focus ring and type inside it (comfortable is the default). Overlays open outside the page, so pair it with `<DS.VendraProvider density="…">`, as the presentation does on a TV. Don't restyle `.ag-*` classes for a screen size; change the density.
- **Layout tiers:** phone (< 768px), tablet (768–1023px) and desktop (1024px up) are chosen in CSS, never in JavaScript: the shell and views render every structure and Tailwind's `md:`/`lg:` (or `max-md:`/`max-lg:`) variants show one, so the first paint is the final layout. Phones get the compact header, the tab bar and the page's sticky action; tablets the menu header with the language switch and account but no tab bar; desktops the full header. Hide a component root with the important form (`tw:max-md:hidden!`), since the package's layers sit above Tailwind's utilities. JavaScript reads `matchMedia` only inside effects, for behaviour such as closing the menu or the shop's Filters dialog when the window widens.
- **Mobile:** one primary action per mobile page, placed above the tab bar. Arch frames only on the wedding hero and the main product image. Check EN and FA at 320px, 390px, 768px and desktop width.

## TV mode

The storefront runs on a television, read from about 3 metres and driven by a remote's arrows and OK
(Enter). `main.jsx` decides before the first render (`_shared/tv.js` → `vfApplyTvMode`) and sets
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

- **Sizes** come from the `tv` density (`tokens/spacing.css`, `typography.css`): 24px body text, 64px
  tap minimum, 1760px content width and 48px gutters. Controls with a fixed size (the shell's text
  links, LanguageSwitch, Breadcrumb links, Gallery dots, Checkbox and Switch rows, the QuantityInput
  count, RangeSlider thumbs) take at least `--control-h-xs` (48px), so nothing interactive is smaller.
- **Arrow keys** move focus to the nearest item in that direction (`useVfRemoteNavigation`, on
  `components/utils/spatial.js`): header, product grids, carousels, filters and the controls of an
  open dialog. Directions are physical, so Persian (RTL) needs no mirroring. Tab order and what
  screen readers announce don't change. Widgets that use the arrows themselves keep them: tabs,
  lists, menus, radio groups, sliders, the Lightbox, and the caret in text fields (up and down
  still leave a text field). With nothing in that direction, the arrow scrolls the page.
- **Focus** shows the thicker `tv` ring (`--focus-width`, `--focus-offset`) plus a glow of
  `--focus-ring` around the control, or around the card whose link has focus (`tokens/base.css`).

The `tv` Playwright project (1920×1080, no touch) runs `tv.spec.mjs`: home, shop and product in
both languages with no horizontal overflow and no control under 48px, and the arrow keys reaching
and pressing Add to bag.

## Demo behavior

- **Products** have codes instead of names (`VF-7K2M4Q`). The code is the title everywhere and is searchable in any case or digits. URLs look like `?view=product&id=VF-7K2M4Q&cat=boxes`. Old slugs resolve through `legacy`.
- **Shop URLs** keep `cat`, `sort`, `filters`, `occasion`, `min`/`max`, `stock` and `page` through reload, Back and language switches. The shop shows `VF_STORE.shopPageSize` designs per "Show more" page (4 in the sample); a new filter or sort starts again from page 1.
- **Counter presentation** (`?view=presentation`, noindex and not linked from the site): it fills the screen without the site's header or footer, so a seller can show a walk-in customer designs large on the shop's tablet.
  - **Display presets:** starts on a full-screen product. Tablet keeps browsing manual; TV plays immediately, pauses while seller dialogs are open or the tab is hidden, and remembers its preset on this device. Seller tools opens a focus-trapped side drawer; Browse designs opens the existing counter workflow; Return to display restores the product view.
  - **Product layout:** photos fit whole inside the screen with a separate caption row. An optional two-product layout uses wide landscape screens and falls back to one product in portrait; navigation advances by the number displayed.
  - **Collections:** save all designs, a category, or selected product codes on the device. A seller can also copy the current shortlist into the display collection. Subsequent customer searches and shortlist edits do not alter it; Ready/stock settings still apply.
  - **Playback:** choose 6, 10 (default), or 15 seconds. The next photos preload and decode before replacement; a slow or failed photo leaves the current product on screen. Transitions use a short fade and respect reduced motion.
  - **Captions:** Photo only, Photo and code (default), or Photo/code/price. The existing Show prices setting still overrides price captions. TV text scales for distance and stays inside a larger safe margin.
  - **Quiet navigation:** swipe or use arrow keys to change products without revealing controls (mirrored in Persian). Tap or press Enter to reveal controls for four seconds. Keyboard focus keeps the seller control visible.
  - **Finding a design:** by code, flower or kind (the same search as the search page), or by scanning the QR code on its printed tag with the camera, where the browser can read QR codes (`BarcodeDetector`).
  - **Full screen (`Lightbox`):** the design shows its sizes and extras with the price they come to. "Send to customer" includes those choices in the product link (`size`, `addons`), so the customer's phone opens the same configuration; unsupported choices are discarded by the catalog rules.
  - **Shortlist and order:** designs can be starred into a shortlist to compare side by side, or added to an order. The shortlist goes to the customer's phone as a QR code or WhatsApp link to `?view=saved&ids=…`; the order goes as one to `?view=bag&lines=…`. The site adds them to the visitor's own saved list or bag once, then drops them from the address.
  - **Settings:** show prices (including order lines and totals), Ready designs only, hide sold-out designs, keep the screen on, full screen, a slideshow after a minute untouched, and a PIN in front of the settings. They are kept on the device under `vf-presentation`. Clearing a search/category preserves these device settings. A rejected screen wake lock is retried only on a visibility change or a setting toggle.
  - **Quiet operation:** offline/reconnect notices, stock refresh failures and photo warnings stay in Seller tools while displaying products. A failed first photo uses a neutral placeholder; later failures retain the current product. The seller can retry photos from the drawer.
  - **Offline and stock:** in a production build the page registers `app/sw.js`, so the tablet keeps working when the Wi-Fi drops. With a live API it refreshes stock every two minutes.
- **Checkout** stores the finished order in session storage. Track shows it, and Order again refills the bag.
- **Account balance:** top-ups are simulated. Paying from a balance of at least `wallet.discountFrom` takes `discountPercent` off the products. A real store keeps the balance on its server.
- **Delivery pin:** a Leaflet map with OpenStreetMap tiles; point `VF_STORE.map.tiles` at another provider for real traffic. If the map fails, a typed address (`noMap`) replaces the pin.
- **Simulated, local only:** sign-in codes, payments, reminders, saved items, recently viewed, the newsletter flag and the consent choice (`vf-consent`). Only `_shared/integrations/api.js` talks to the backend, and only when `apiBase` is set.
- **Policies and contact:** policy text is sample copy that reads fees and areas from `delivery.js`, so it stays current. Replace it with the florist's own policies before launch.


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
npm --prefix templates run test:e2e:build -- devices.spec.mjs --project=touch-phone --project=tablet --project=tv
```

Physical iPad/Safari, WebOS, Tizen and Android TV still require checks on the intended hardware.
