# Vendra Design System — working rules

**Atomic Design migration:** [ATOMIC-DESIGN.md](ATOMIC-DESIGN.md) defines the new layer boundaries
and migration order. New UI components live in `components/atoms/`, `components/molecules/` or
`components/organisms/`, one named folder per component; use `npm run new:component -- Name --level
atoms|molecules|organisms`. Existing flat component folders migrate incrementally. References below
to `components/<Name>/` mean the component's own folder, including its layer after migration.

Storefront-specific molecules live under `templates/app/molecules/<Name>/` for small app-owned
combinations. StorefrontPresentationLabel renders code/sold-out text from explicit props;
View/logic retain product data, localization and stock decisions.

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
StorefrontProductGallery composes product photos, fullscreen action and controlled lightbox;
View/logic retain photo mapping/selection, current-photo entry and product-change reset.
StorefrontProductHeading composes the code/copy action, category/badge, unit price, stock and description;
View/logic retain identity/localization, price/stock decisions and clipboard/toast behavior.
StorefrontProductConfiguration composes controlled size/add-on groups from explicit options/callbacks;
View/logic retain visibility, eligibility, selection/URL state, pricing and bag configuration.
StorefrontProductPurchase composes total/hint, quantity, save and responsive add controls;
View/logic retain quantities/URL state, totals, saved state, stock limits and bag actions.
StorefrontProductCare composes delivery text, optional inquiry link and care/delivery accordion;
View/logic retain delivery eligibility/wording, care fallback, localization and inquiry URLs.
StorefrontProductRecent composes the recent heading, carousel and cards from explicit records/labels;
View/logic retain visibility/error isolation, history, product mapping, links and favorites.
StorefrontProductAdded composes the controlled bag-confirmation summary and checkout/continue actions;
View/logic retain bag mutations, summary calculations, dialog state and checkout continuation.
StorefrontProductSticky composes the live total and add action inside Shell's sticky slot;
View/logic retain totals/stock/bag actions; Shell retains positioning/measurement/focus behavior.
StorefrontProductLayout arranges product slots; product View/logic retain controls, state and
purchase actions, and the sticky purchase action stays in Shell. StorefrontShopLayout arranges
shop slots; filtering, sorting, paging and URL state remain in the shop View/logic.
StorefrontShopCategories composes sidebar category buttons and compact chips from explicit records;
View/logic retain eligibility, filtered counts, selection/tracking, URL/paging and sorting.
StorefrontShopSidebarFilters composes controlled occasion/date/price/stock controls from explicit descriptors;
View/logic retain availability, price rules, filtering/tracking, URL/paging, sorting and results.
StorefrontShopFilterDialog composes controlled filter fields and Show/Clear footer actions;
View/logic retain dialog state, filter rules, result labels, URL/paging and clear semantics.
StorefrontShopToolbar composes compact filters/sort, active filters, quick chips and result count;
View/logic retain filtering, sorting, URL/paging, tracking and focus-scroll callbacks.
StorefrontShopResults composes product cards, paging and loading/error/empty feedback from explicit props;
View/logic retain state/visibility, mapping, favorites, recovery and navigation/paging focus.
StorefrontBagLayout arranges bag/delivery slots with externally controlled content visibility;
line edits, undo, delivery validation, totals and checkout actions stay in the bag View/logic.
StorefrontBagItems composes editable line items and stock warnings from explicit records/labels;
View/logic retain visibility, pricing/stock limits, quantity/remove/Undo and persistence/focus.
StorefrontBagSummary composes summary rows, free-delivery meter, controlled promo and navigation actions;
View/logic retain totals, promo validation/persistence, quote rules and delivery/payment validation.
StorefrontBagSticky composes total and controlled continuation actions inside Shell’s sticky slot;
View/logic retain visibility/totals/validation; Shell retains docking and focus measurements.
StorefrontBagFeedback composes removal notice/Undo and empty-state recovery in separate layout slots;
View/logic retain visibility, removed-line data, Undo/reset, persistence and focus restoration.
StorefrontBagProgress composes compact/wide Steppers from explicit steps/current/labels/formatters;
View/logic retain visibility, stage state, navigation and permitted-step callbacks.
StorefrontBagRecipient composes recipient heading, saved-address chips and controlled name/phone fields;
View/logic retain address mapping/selection, validation, persistence and the surrounding delivery/map flow.
StorefrontBagLocation composes controlled map/zone status, failed-map zone selection and address input;
View/logic retain map lifecycle callbacks, location/quote rules, fallback state, validation and persistence.
StorefrontBagSchedule composes preparation/review feedback and controlled day/time choices;
View/logic retain eligibility, cutoffs, date/slot state, confirmation, persistence and validation.
StorefrontBagCards composes per-item card messages/add controls and the controlled card-addition Undo notice;
View/logic retain eligibility, add/Undo mutations, prices, message validation/persistence and focus.
StorefrontBagSender composes controlled sender name/phone fields and their heading/hint;
View/logic retain signed-in prefill, validation, persistence and error-summary focus.
StorefrontBagDeliveryIntro composes controlled validation summary and guest sign-in prompt;
View/logic retain guest eligibility, problems, sign-in continuation, private drafts and validation state.
StorefrontCheckoutLayout arranges review, payment, summary and bank/success slots; checkout
View/logic retain payment controls, receipt confirmation, persistence and order submission.
StorefrontCheckoutDeliveryReview composes delivery details and edit navigation from explicit rows/labels;
View/logic retain delivery state, row formatting, payment drafts and edit/return navigation.
StorefrontCheckoutMethods composes controlled method choices, availability feedback and wallet context;
View/logic retain eligibility, balances/discounts, method drafts, top-up URLs and payment notices.
StorefrontCheckoutReceipt composes changed-amount confirmation, payment card/Sheba and receipt inputs;
View/logic retain amount validation, clipboard callbacks, digit normalization, drafts and confirmation.
StorefrontCheckoutSubmission composes WhatsApp, processing/failure feedback and wide place/back actions;
View/logic retain readiness, submission/deduplication, pending/errors, retries and navigation.
StorefrontCheckoutNotices composes independent retry-review and recovery-storage notices;
View/logic retain retry eligibility, storage, focus, record clearing and review navigation.
StorefrontCheckoutProgress composes compact/wide Steppers; StorefrontCheckoutHeading composes payment h1;
View/logic retain state visibility, current indices, labels/formatters, permitted navigation and focus.
StorefrontCheckoutBank composes bank progress and PaymentStatus from explicit descriptors;
View/logic retain recovery, redirect data, retry/method/check callbacks, verification and completion.
StorefrontCheckoutConfirmation composes completion progress, heading, details, account offer and links;
View/logic retain completion state, wording/formatting, customer eligibility, destinations and persistence.
StorefrontCheckoutSummary composes summary Card/rows; StorefrontCheckoutSticky composes compact total/place;
View/logic retain totals, visibility, validation/submission and pending/errors; Shell retains docking/focus.
StorefrontAccountLayout arranges heading, actions, notices, tabs, feedback and editor-dialog slots;
account View/logic retain tab controls, customer isolation, validation and account mutations.
StorefrontAccountOrders composes order cards/tracking links from explicit presentation records;
View/logic retain tab visibility, list normalization, history, customer isolation, formatting and routes.
StorefrontAccountBalanceOverview composes the balance Card from explicit title/amount/status;
View/logic retain visibility, wallet reads, discount eligibility, formatting and mutations.
StorefrontAccountTopUp composes controlled presets, amount, submit and payment feedback;
View/logic retain normalization, validation/focus, pending timer, wallet/storage changes and persistence.
StorefrontAccountBalanceHistory composes empty/populated history from explicit records/visibility;
View/logic retain normalization, wallet/customer scope, mapping, formatting and persistence.
StorefrontAccountSaved composes saved cards/empty recovery from explicit items/labels/visibility;
View/logic retain normalization, customer scope, product mapping and favorite synchronization/persistence.
StorefrontAccountAddresses composes the controlled saved map, address cards and add action;
View/logic retain normalization, map eligibility/failure, editor state, validation/focus and mutations.
StorefrontAccountReminders composes add/empty/upcoming feedback and controlled reminder rows;
View/logic retain normalization, date/calendar rules, ordering, editor state, mutations and persistence.
StorefrontAccountProfile composes controlled profile fields, error summary and save action;
View/logic retain drafts, changed-field merging, validation/focus, locale switching and persistence.
StorefrontAccountAddressEditor composes controlled label/zone/pin/address/recipient/phone fields;
View/logic retain field visibility/mapping, drafts, map failure, validation/focus, address rules and persistence.
StorefrontAccountReminderEditor composes controlled name/occasion/date/lead-time/channel fields;
View/logic retain field visibility/mapping, drafts, calendar rules, date locking, validation/focus and persistence.
StorefrontAccountEditorDialog composes the controlled shared dialog, storage alert, summary and actions;
View/logic retain field selection, drafts, validation/focus, save/error state, mutations and persistence.
StorefrontAccountHeading composes eyebrow and h1/accent from explicit text;
Layout retains its wrapper; View/logic retain localization, visibility and navigation/focus.
StorefrontAccountTabs composes controlled tab items and selected-panel children;
View/logic retain panel visibility/mapping, tab eligibility/fallback and state; package Tabs retains ARIA/keyboard behavior.
StorefrontAccountSessionAction composes the labelled sign-out button;
View retains placement/copy; account/shared logic retains session cleanup and home navigation.
StorefrontAccountFeedback composes the persistent status paragraph;
View retains placement; account/shared logic retains localized notice transitions and persistence.
StorefrontAccountNotices composes the page storage-error Alert;
View retains visibility/placement; account/shared logic retains error state, persistence and retry.
StorefrontAccountBalancePanel composes overview/top-up/checkout return/history;
View retains visibility and descriptor mapping; account/shared logic retains wallet rules and persistence.
Account View composes organisms directly in slots/tab/editor branches; its visibility conditions and
descriptor mapping remain in View, and the empty sticky-slot fragment is preserved.
StorefrontSigninLayout arranges phone, code and feedback slots; sign-in View/logic retain
validation, resend timing, authentication, customer synchronization and checkout continuation.
StorefrontSigninHeading composes phone/code step h1/accent and intro from explicit text;
View retains step visibility/copy mapping; sign-in/shared logic retains validation, focus and authentication.
StorefrontSigninPhoneControls composes controlled phone/error-summary/send controls;
View retains visibility/mapping; sign-in/shared logic retains validation, focus and step transitions.
StorefrontSigninCodeControls composes controlled code/error-summary/verify controls;
View retains visibility/mapping; sign-in/shared logic retains validation, focus and verification.
StorefrontSigninResend composes the package resend control and application status;
View retains visibility/mapping; package ResendCode retains timing and sign-in logic retains reset/focus.
StorefrontSigninPolicies composes localized text and native policy links;
View retains visibility/mapping; shared logic/router retains destinations, navigation and history.
StorefrontSigninCompletion composes success feedback and controlled continuation branches;
View retains visibility/mapping; sign-in/shared logic retains naming, eligibility, authentication and checkout callback.
StorefrontSigninChangeNumber composes the controlled change-number button;
View retains code-step visibility/copy; sign-in/shared logic retains phone retention and code/resent reset.
Sign-in View passes layout/completion elements directly; multi-child phone/code fragments and
the empty sticky-slot fragment remain, with existing conditions and mappings preserved.
StorefrontTrackLayout arranges lookup, order heading/details/summary and feedback slots; tracking
View/logic retain order lookup, status interpretation and reorder review/confirmation.
StorefrontTrackLookup composes controlled lookup fields, heading, failure and submit/browse actions;
View retains visibility/mapping; tracking/shared logic retains validation, normalization, matching and focus.
StorefrontTrackHeading composes the tracking order eyebrow, accented title and status introduction;
View retains visibility and mapping, and tracking logic retains status/payment interpretation.
StorefrontTrackPendingNotice composes the neutral payment alert; View retains order/pending visibility
and mapping, and tracking logic retains eligibility, localized messages and payment/contact formatting.
StorefrontTrackProgress composes the timeline card; View retains visibility/mapping, tracking logic
retains status/step interpretation and localized steps, and package OrderTimeline retains semantics.
StorefrontTrackDeliveryPhoto composes the delivered photo figure; View retains visibility/copy,
tracking logic selects the photo, and package ArchFrame retains image/fallback semantics.
StorefrontTrackOrderDetails composes the sunken details card; View retains visibility/mapping,
tracking/shared logic retain row formatting and package DetailList retains definition-list semantics.
StorefrontTrackOrderActions composes contact/repeat/lookup controls; View retains visibility/descriptors,
tracking/shared logic retain URLs, reorder/bag changes and lookup reset/focus.
Known-order repeat review uses a button; standalone samples without a review callback retain the bag link.
StorefrontTrackOrderSummary composes the summary card; View retains visibility/mapping, tracking/shared
logic retain line/totals formatting and StorefrontTrackLayout retains the responsive sticky aside.
StorefrontTrackReorderDialog composes controlled review choices/notices/actions; View maps descriptors,
tracking/shared logic retain reconciliation/mode/bag changes, and package Dialog retains modal focus.
Tracking View passes layout/lookup/pending notice/delivery photo/summary elements directly; multi-child
heading/details and the empty sticky-slot fragments retain their existing visibility and mappings.
StorefrontSavedLayout arranges heading, notice, results and empty-state slots with controlled
visibility; saved View/logic retain product links, remove/Undo, persistence and synchronization.
StorefrontSavedHeading composes the h1 SectionHeader; View maps localized props and saved/shared logic
retain list counts, remove/Undo, persistence and focus.
StorefrontSavedRemovalNotice composes removal feedback/Undo; View retains message visibility/mapping,
saved/shared logic retain additive restoration/persistence/focus, and layout preserves empty-state recovery.
StorefrontSavedResults composes product cards from explicit products/labels; View retains visibility/list
normalization, saved/shared logic retain descriptors/removal, and layout retains the product grid.
StorefrontSavedEmpty composes empty messaging/shop link; View retains visibility/localized mapping,
saved/shared logic retain list/removal state and layout keeps empty placement and notice recovery.
Saved View composes its layout/results/empty elements directly; visibility, descriptors, list
normalization and the empty sticky-slot fragment remain unchanged.
StorefrontSearchHeading composes the explicit localized title as the original display h1; View maps
copy and search/shared logic retain query, matching, reporting, navigation and focus.
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
StorefrontHomeCategories composes the home heading and category carousel from explicit records/labels;
View/logic retain normalization, count formatting, category order, localized names and filter URLs.
StorefrontHomeFeatured composes featured cards and responsive view-all links from explicit props;
View/logic retain selection/order, product mapping, prices/stock, favorites and filter URLs.
StorefrontHomeOccasions composes occasion navigation from explicit records, labels and frame;
View/logic retain normalization, order, counts, images and shop-filter URLs.
StorefrontHomeStudio composes studio cards and explore-all navigation from explicit props;
View/logic retain collection selection/fallback, product mapping, counts, URLs and favorites.
StorefrontHomeWeddings composes the wedding promotion from explicit labels and destination URLs;
View/logic retain content mapping, feature eligibility and localized navigation.
StorefrontHomeJournal composes journal previews from explicit posts, labels and journal URL;
View/logic retain feature eligibility, selection/order, localized metadata and article URLs.
StorefrontHomeNewsletter composes the controlled email form/status from explicit props/callbacks;
View/logic retain profile prefill, validation, submission, tracking, persistence and focus.
Its persistent submit-label span stays outside the conditional form so pending announcements retain
a valid accessible name after the button unmounts.
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
StorefrontPresentationDisplay owns quiet-display rendering, decode reporting, pointer tracking
and control-reveal UI state; View/logic retain collections, playback, failures and seller state.
StorefrontPresentationViewer composes controlled lightbox captions, options and customer actions;
View/logic retain label rendering, quotes, stock, selection, order/share state and callbacks.
StorefrontPresentationSend composes the share dialog, QR/tag and warning/actions from a send
descriptor; View/logic retain links, length checks, clipboard/print behavior and customer state.
StorefrontPresentationShortlist composes comparison cards, empty state and dialog actions;
View/logic retain label rendering, membership/order, viewer mapping, clear/Undo and sharing.
StorefrontPresentationOrder composes controlled order rows, optional total, empty state and actions;
View/logic retain quantity/order changes, stock eligibility, totals, clear/Undo and handoff.
StorefrontPresentationScan composes scan instructions, video and warning from explicit props;
View/logic retain the video ID contract, camera/decoder lifecycle, errors and viewer navigation.
StorefrontPresentationUnlock composes the controlled four-digit PIN dialog with Web OTP disabled;
View/logic retain PIN comparison/storage, error/reset state, settings access and cancellation.
StorefrontPresentationTools composes seller status and actions from explicit descriptors;
View/logic retain offline preparation and device decisions.
StorefrontPresentationSettings composes setup/settings controls from explicit grouped descriptors;
View/logic retain eligibility, validation/persistence, PIN checks and browser lifecycle operations.
Tailwind scans nested app JSX.

**Storefront product naming is fixed:** use `Product.token` (for example, `VF-7K2M4Q`) as the displayed product name in every language and viewport. Localized product descriptions may support search, but design changes must not replace product-code names with descriptions.

**Bag product configurations are fixed:** do not add size or add-on editors to bag rows. Keep choosing those options on the product page; bag rows may change quantity, remove an item, or undo its removal.

1. **Templates are the source of truth.** `templates/storefront-*` is the only maintained storefront. Keep page copy, behavior and styles with each template; shared examples and helpers live under `templates/`.
2. **Maintain shared storefront code in `templates/_shared/` and the app in `templates/app/`.** The storefront is a Vite React app: `app/index.html` → `app/main.jsx` renders the click-through site (`storefront-site`) or one page with `?page=<name>`; `app/pages.js` loads each page as its own chunk on demand (the site preloads the rest when idle). `app/Shell.jsx` holds the header, footer, mobile menu, consent and tab bar; `app/runtime.js` loads the integrations and the tenant theme; `app/ds.js` re-exports the components from `components/`. Each `storefront-*` folder holds `View.jsx` (the page's JSX inside `Shell`, reading `v`), `logic.js` (the `usePage(props)` hook, on `usePageLogic`/`useLifecycle` from `_shared/page-state.js` and `useStorefrontPage`), `copy.js` (bilingual copy, `vfCopy`), `styles.css` and `Page.jsx` (a function component). In `_shared/`, `routing.js` owns URL helpers, `navigation.js` owns shell/menu values, `page-lifecycle.js` owns focus/SEO (layout tiers are CSS breakpoints, never JavaScript), `seo.js` (`VF_SEO`) and `page-focus.js` (`VF_NAV`) hold the SEO and focus helpers, `formatting.js` wraps number/currency formatting, `catalog.js` owns sample products and `delivery.js` owns delivery rules — all ES modules that import what they use. Run `npm --prefix templates run build` after editing shared files, components or page logic. Install with `npm ci` at the repo root on first setup: `templates` is an npm workspace of the root package, so there is one lockfile and one `node_modules` (React pinned to 18.3.1 there). Use `npm --prefix templates run dev` for the Vite preview. Runtime assets in `templates/_runtime/` are generated; never edit them. Use Tailwind utilities first for storefront presentation; custom page CSS is reserved for contextual/component exceptions in the page's `styles.css` and builds into one shared runtime stylesheet. Genuinely shared translations stay in `_shared/translations/`. See `templates/README.md`; verify with `npm --prefix templates run check` and `npm --prefix templates test`.
3. **One folder per component.** Start one with `npm run new:component -- <Name> [--wording] [--no-css]` (see `CONTRIBUTING.md`). `components/<Name>/` holds `<Name>.jsx`, `<Name>.d.ts`, `<Name>.css` (its `.ag-*` classes; add it to `components/index.css`), `README.md`, its wording (`messages.js` + `messages.d.ts`) when it has built-in words, and its browser test: `<Name>.spec.mjs` with `<Name>.fixture.jsx` (see `templates/README.md` → Component tests; `npm test` fails without them) (a component that only reuses existing classes — `.ag-input` from `Field.css`, `.ag-check` from `Checkbox.css`, `.ag-sr-only`/`.ag-flip-rtl` from `tokens/base.css` — has no `.css`); only a tightly bound part (like `ChoiceGroup/ChoiceTile.jsx`) shares a folder. Build class names with `cx()` and form controls on `Field` (`useField`, `FieldMessage`). All code in `components/` and `templates/` (except generated files, vendored code and HTML pages) is formatted by Prettier: run `npm --prefix templates run format`; `check` fails otherwise. Use descriptive names (`fieldId`, `onKeyDown`, `selectedId`), not abbreviations. Prefixes say where a name comes from: `ag-` classes and `AG_*` globals (`AG_FORMAT`, `AG_DATES`, `AG_COMMERCE`) belong to the package in `components/`; `vf-` classes, `VF_*` globals and `vf*` functions belong to the Vendra Florist templates. One name per global, no aliases. Components are ES modules: they import React as a default (`import React from 'react'`), `react-aria-components` and `@internationalized/date` by name (interactive components are built on React Aria Components; the package lists them as peer dependencies, ranges starting at the exact versions pinned here, so an app shares one copy; its router and locale reach the components through `VendraProvider`), import each other by name with relative paths, and export with `export function`/`export const`. The storefront app and the guideline cards import the sources directly (cards through `guidelines/card-runtime.js`, which sets the `window.VendraDesignSystem` namespace their `.card.jsx` scripts read); Vite compiles them. Helpers (`format`, `dates`, `commerce`) import nothing. `npm --prefix templates run build` writes `dist/`, the `@vendra/design-system` package tenant storefronts install (ES modules + `.d.ts`, `styles.css`, tenant CSS, the theme API); never edit it, and keep it committed. Every exporting source needs a sibling `.d.ts`, must server-render without `window` at import time (touch `window`/`document` only inside effects and event handlers), and must take tenant data (copy, prices, currency, contact) as props, never hard-code it. The package CSS is in cascade layers (`vendra.tokens`, `vendra.base`, `vendra.components`, declared in `styles.css`); the storefront loads Tailwind first and puts its page CSS in `vendra.components` (`_build/custom-css.cjs`), so specificity between page CSS and components works as written. A component's own built-in wording (accessible names, small labels) goes in the component's own `components/<Name>/messages.js` (`export const messages = {en, fa}`, with its `messages.d.ts`; the package ships it but doesn't re-export it) in English and Persian and is read with `useMessages(name, messages, props)`, never as an English default prop; `VendraProvider` picks the language. Scratch scripts, generators, sample data and storefront-only helpers stay out of `components/` (those helpers live in `templates/_shared/`). Package helpers go in `components/utils/`; storefront rules that a tenant app also needs (delivery, totals, discounts, API adapters) go in `components/utils/commerce.js` as pure functions taking the tenant's data, and `templates/_shared/` only passes the sample store's data to them. There is one React install, at the repo root; never add another copy.
4. **Tenant themes must pass contrast.** Tenant themes are `tokens/tenants/*.json`; `npm --prefix templates run build` generates the matching `.css` (never edit it). Any new or changed tenant must pass all seven Theme builder checks (`guidelines/theme-builder.html`) and the Colors → Contrast card with `data-tenant` set, per `guidelines/tenant-onboarding.md`. Report results before calling it done.
5. **Check the cards after significant changes.** After edits to components, their CSS, tokens or `styles.css`, run `npm --prefix templates run build`, then `npm --prefix templates run test:e2e` (every @dsCard card in `guidelines/` and storefront view is screenshot-compared, with axe checks, and every component's own spec runs; it uses the installed Google Chrome). Look at any failing card's `-actual.png` before accepting it with `test:e2e:update`, and fix breakage before finishing. CI (`.github/workflows/ci.yml`) runs the same suites in Playwright's Linux image against the `-linux.png` baselines; after an intended visual change, refresh those with the **Update screenshots** workflow (see `templates/README.md`).
