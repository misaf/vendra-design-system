# Vendra Design System — working rules

**Atomic Design migration:** [ATOMIC-DESIGN.md](ATOMIC-DESIGN.md) defines the new layer boundaries
and migration order. New UI components live in `components/atoms/`, `components/molecules/` or
`components/organisms/`, one named folder per component; use `npm run new:component -- Name --level
atoms|molecules|organisms`. Existing flat component folders migrate incrementally. References below
to `components/<Name>/` mean the component's own folder, including its layer after migration.

Storefront-specific organisms live under `templates/app/organisms/<Name>/` and receive explicit
content props and callbacks from Shell or pages. StorefrontHeader owns the responsive header
markup; StorefrontFooter owns footer markup and responsive link groups. Shell owns their data,
menu state, desktop resize dismissal and shared layout effects. StorefrontMenu renders the compact
menu drawer from explicit content and callbacks. StorefrontConsent renders the privacy notice;
consent persistence, analytics gating and focus restoration remain in shared storefront logic.
StorefrontAnnouncement renders the responsive news strip; delivery rules and session dismissal
remain in shared storefront logic. Keep `vf-*` composition out of the published component package.
Atomic Design templates live under `templates/app/layouts/<Name>/` and receive React-node slots.
StorefrontBottomBar arranges consent, sticky action and navigation; Shell owns their content and
sticky-height/focus measurements. StorefrontLayout arranges the main section slots and tenant/
language wrappers; providers and the bare presentation branch stay in Shell.
StorefrontProductLayout arranges product slots; product View/logic retain controls, state and
purchase actions, and the sticky purchase action stays in Shell. StorefrontShopLayout arranges
shop slots; filtering, sorting, paging and URL state remain in the shop View/logic.
StorefrontBagLayout arranges bag/delivery slots with externally controlled content visibility;
line edits, undo, delivery validation, totals and checkout actions stay in the bag View/logic.
StorefrontCheckoutLayout arranges review, payment, summary and bank/success slots; checkout
View/logic retain payment controls, receipt confirmation, persistence and order submission.
StorefrontAccountLayout arranges heading, actions, notices, tabs, feedback and editor-dialog slots;
account View/logic retain tab controls, customer isolation, validation and account mutations.
StorefrontSigninLayout arranges phone, code and feedback slots; sign-in View/logic retain
validation, resend timing, authentication, customer synchronization and checkout continuation.
StorefrontTrackLayout arranges lookup, order heading/details/summary and feedback slots; tracking
View/logic retain order lookup, status interpretation and reorder review/confirmation.
StorefrontSavedLayout arranges heading, notice, results and empty-state slots with controlled
visibility; saved View/logic retain product links, remove/Undo, persistence and synchronization.
StorefrontSearchLayout arranges heading, query/close controls, popular searches, results and empty
feedback; search View/logic retain matching, URL/history state, navigation, reporting and focus.
StorefrontContactLayout arranges heading, details, form and feedback slots; contact View/logic
retain map fallback, prefill, validation, submission, draft retention and focus.
StorefrontWeddingsLayout arranges hero, services, story, inquiry and feedback slots; weddings
View/logic retain content, date constraints, field state, validation, submission and recovery.
StorefrontFaqLayout arranges heading, question-list and contact slots; FAQ View/logic retain
section labels, accordion controls, copy, delivery-rule interpolation and navigation.
StorefrontPolicyLayout arranges heading, policy navigation, notice, contents and document slots;
policy View/logic retain localized labels, document selection, section anchors and numbering.
StorefrontJournalLayout arranges heading, search, feedback, featured story, grid and pagination
slots; journal View/logic retain controls, category/query state, matching and page navigation.
StorefrontPostLayout arranges feedback, article, actions, recommendations and related slots with
controlled article visibility; post View/logic retain content mapping, copying, sharing and links.
StorefrontHomeLayout arranges top, featured, occasions, arrivals, weddings, journal and newsletter
slots with controlled optional visibility; home View/logic retain collections, controls and sign-up.
StorefrontNotfoundLayout arranges message, recovery actions, recommendation heading and product
slots; not-found View/logic retain localized content, product mapping and recovery links.
StorefrontErrorLayout arranges message and recovery-action slots; error View/logic retain
localized content, reload behavior, home navigation and bidi-isolated phone wording.
StorefrontPresentationLayout arranges heading, toolbar, catalog, display, overlays and feedback
slots with controlled density/catalog visibility; presentation View/logic retain device and seller flows.
StorefrontPresentationCatalog renders tiles and empty-state recovery from explicit data/labels/
callbacks; presentation View/logic retain label rendering, filtering, quotes and shortlist state.
StorefrontPresentationToolbar composes search, categories, status and customer tools from explicit
controlled descriptors; View/logic retain capability checks, count formatting, state and actions.
Tailwind scans nested app JSX.

**Storefront product naming is fixed:** use `Product.token` (for example, `VF-7K2M4Q`) as the displayed product name in every language and viewport. Localized product descriptions may support search, but design changes must not replace product-code names with descriptions.

**Bag product configurations are fixed:** do not add size or add-on editors to bag rows. Keep choosing those options on the product page; bag rows may change quantity, remove an item, or undo its removal.

1. **Templates are the source of truth.** `templates/storefront-*` is the only maintained storefront. Keep page copy, behavior and styles with each template; shared examples and helpers live under `templates/`.
2. **Maintain shared storefront code in `templates/_shared/` and the app in `templates/app/`.** The storefront is a Vite React app: `app/index.html` → `app/main.jsx` renders the click-through site (`storefront-site`) or one page with `?page=<name>`; `app/pages.js` loads each page as its own chunk on demand (the site preloads the rest when idle). `app/Shell.jsx` holds the header, footer, mobile menu, consent and tab bar; `app/runtime.js` loads the integrations and the tenant theme; `app/ds.js` re-exports the components from `components/`. Each `storefront-*` folder holds `View.jsx` (the page's JSX inside `Shell`, reading `v`), `logic.js` (the `usePage(props)` hook, on `usePageLogic`/`useLifecycle` from `_shared/page-state.js` and `useStorefrontPage`), `copy.js` (bilingual copy, `vfCopy`), `styles.css` and `Page.jsx` (a function component). In `_shared/`, `routing.js` owns URL helpers, `navigation.js` owns shell/menu values, `page-lifecycle.js` owns focus/SEO (layout tiers are CSS breakpoints, never JavaScript), `seo.js` (`VF_SEO`) and `page-focus.js` (`VF_NAV`) hold the SEO and focus helpers, `formatting.js` wraps number/currency formatting, `catalog.js` owns sample products and `delivery.js` owns delivery rules — all ES modules that import what they use. Run `npm --prefix templates run build` after editing shared files, components or page logic. Install with `npm ci` at the repo root on first setup: `templates` is an npm workspace of the root package, so there is one lockfile and one `node_modules` (React pinned to 18.3.1 there). Use `npm --prefix templates run dev` for the Vite preview. Runtime assets in `templates/_runtime/` are generated; never edit them. Use Tailwind utilities first for storefront presentation; custom page CSS is reserved for contextual/component exceptions in the page's `styles.css` and builds into one shared runtime stylesheet. Genuinely shared translations stay in `_shared/translations/`. See `templates/README.md`; verify with `npm --prefix templates run check` and `npm --prefix templates test`.
3. **One folder per component.** Start one with `npm run new:component -- <Name> [--wording] [--no-css]` (see `CONTRIBUTING.md`). `components/<Name>/` holds `<Name>.jsx`, `<Name>.d.ts`, `<Name>.css` (its `.ag-*` classes; add it to `components/index.css`), `README.md`, its wording (`messages.js` + `messages.d.ts`) when it has built-in words, and its browser test: `<Name>.spec.mjs` with `<Name>.fixture.jsx` (see `templates/README.md` → Component tests; `npm test` fails without them) (a component that only reuses existing classes — `.ag-input` from `Field.css`, `.ag-check` from `Checkbox.css`, `.ag-sr-only`/`.ag-flip-rtl` from `tokens/base.css` — has no `.css`); only a tightly bound part (like `ChoiceGroup/ChoiceTile.jsx`) shares a folder. Build class names with `cx()` and form controls on `Field` (`useField`, `FieldMessage`). All code in `components/` and `templates/` (except generated files, vendored code and HTML pages) is formatted by Prettier: run `npm --prefix templates run format`; `check` fails otherwise. Use descriptive names (`fieldId`, `onKeyDown`, `selectedId`), not abbreviations. Prefixes say where a name comes from: `ag-` classes and `AG_*` globals (`AG_FORMAT`, `AG_DATES`, `AG_COMMERCE`) belong to the package in `components/`; `vf-` classes, `VF_*` globals and `vf*` functions belong to the Vendra Florist templates. One name per global, no aliases. Components are ES modules: they import React as a default (`import React from 'react'`), `react-aria-components` and `@internationalized/date` by name (interactive components are built on React Aria Components; the package lists them as peer dependencies, ranges starting at the exact versions pinned here, so an app shares one copy; its router and locale reach the components through `VendraProvider`), import each other by name with relative paths, and export with `export function`/`export const`. The storefront app and the guideline cards import the sources directly (cards through `guidelines/card-runtime.js`, which sets the `window.VendraDesignSystem` namespace their `.card.jsx` scripts read); Vite compiles them. Helpers (`format`, `dates`, `commerce`) import nothing. `npm --prefix templates run build` writes `dist/`, the `@vendra/design-system` package tenant storefronts install (ES modules + `.d.ts`, `styles.css`, tenant CSS, the theme API); never edit it, and keep it committed. Every exporting source needs a sibling `.d.ts`, must server-render without `window` at import time (touch `window`/`document` only inside effects and event handlers), and must take tenant data (copy, prices, currency, contact) as props, never hard-code it. The package CSS is in cascade layers (`vendra.tokens`, `vendra.base`, `vendra.components`, declared in `styles.css`); the storefront loads Tailwind first and puts its page CSS in `vendra.components` (`_build/custom-css.cjs`), so specificity between page CSS and components works as written. A component's own built-in wording (accessible names, small labels) goes in the component's own `components/<Name>/messages.js` (`export const messages = {en, fa}`, with its `messages.d.ts`; the package ships it but doesn't re-export it) in English and Persian and is read with `useMessages(name, messages, props)`, never as an English default prop; `VendraProvider` picks the language. Scratch scripts, generators, sample data and storefront-only helpers stay out of `components/` (those helpers live in `templates/_shared/`). Package helpers go in `components/utils/`; storefront rules that a tenant app also needs (delivery, totals, discounts, API adapters) go in `components/utils/commerce.js` as pure functions taking the tenant's data, and `templates/_shared/` only passes the sample store's data to them. There is one React install, at the repo root; never add another copy.
4. **Tenant themes must pass contrast.** Tenant themes are `tokens/tenants/*.json`; `npm --prefix templates run build` generates the matching `.css` (never edit it). Any new or changed tenant must pass all seven Theme builder checks (`guidelines/theme-builder.html`) and the Colors → Contrast card with `data-tenant` set, per `guidelines/tenant-onboarding.md`. Report results before calling it done.
5. **Check the cards after significant changes.** After edits to components, their CSS, tokens or `styles.css`, run `npm --prefix templates run build`, then `npm --prefix templates run test:e2e` (every @dsCard card in `guidelines/` and storefront view is screenshot-compared, with axe checks, and every component's own spec runs; it uses the installed Google Chrome). Look at any failing card's `-actual.png` before accepting it with `test:e2e:update`, and fix breakage before finishing. CI (`.github/workflows/ci.yml`) runs the same suites in Playwright's Linux image against the `-linux.png` baselines; after an intended visual change, refresh those with the **Update screenshots** workflow (see `templates/README.md`).
