# Atomic Design migration

Build the architecture from the foundations upward, in small working steps. Each step keeps the
storefront usable and carries its existing accessibility, English/Persian wording, tenant tokens,
customer state and checkout rules forward.

## Layers

| Layer | Responsibility | Source | Dependencies |
| --- | --- | --- | --- |
| Foundations | Tokens, themes, shared utilities, locale/router/density context | `tokens/`, `components/utils/`, `components/VendraProvider/` | External libraries and foundations |
| Atoms | A basic control or visual primitive: Icon, Spinner, Button | `components/atoms/<Name>/` | Foundations and atoms |
| Molecules | A small reusable combination with one purpose: SearchField, PromoCodeField | `components/molecules/<Name>/` | Foundations, atoms and molecules |
| Organisms | A substantial reusable section: Gallery, OrderSummary | `components/organisms/<Name>/` | Foundations, atoms, molecules and organisms |
| Templates | Layout and slots for page sections | `templates/app/layouts/<Name>/`; composed by Shell and pages | UI layers; no account, catalog or payment persistence |
| Pages | Routed screens that supply content, state and actions | `templates/storefront-*/` | Layouts, UI layers and storefront services |

Classify by responsibility, not line count. Button can contain Icon and Spinner and still be a
basic action primitive. Keep tightly coupled parts in one folder (for example ChoiceGroup and
ChoiceTile). Do not split a React Aria widget just to make more layers. Components in one layer
may compose each other; avoid dependency cycles.

Storefront-specific molecules live in `templates/app/molecules/<Name>/` for small app-owned
combinations with explicit content props. They follow the same ownership boundaries as organisms.

Storefront-specific organisms live in `templates/app/organisms/<Name>/`. They compose the package
UI with explicit content props and callbacks, retaining storefront `vf-*` styles and copy ownership.
They do not belong in the published package or import store state and persistence. Shell and page
logic supply their data and actions. Tailwind scans nested app JSX.

Layout templates live under `templates/app/layouts/<Name>/`. They arrange React-node slots supplied
by Shell or pages, keeping content, callbacks and state outside the layout.

Store data, delivery policy, customer identity, payment recovery and API effects stay in the
storefront's `logic.js` and `_shared/`. Reusable pure commerce calculations remain in
`components/utils/commerce.js`. Atomic Design organizes UI; it does not replace those boundaries.

## Steps and checkpoints

1. **Tooling and rules.** Teach the package builder, fixture host, tests and generator about nested
   component folders. Add layer checks to `npm test`. **Complete.**
2. **First atoms.** Move Icon, Spinner and Button with their types, CSS, wording, documentation,
   fixtures and tests. Update their consumers and regenerate `dist/`. **Complete.**
3. **Remaining primitives.** Inspect the dependency graph and migrate small batches, starting with
   non-form primitives, then Field and the accessible form controls that use it. Decide the layer
   from the actual responsibility before moving each batch. The non-form batch now lives under
   `components/atoms/`: IconButton, Badge, Chip, Card, Picture, ArchFrame, Price, Skeleton, Meter,
   SkipLink and LiveRegion. The basic form batch has also moved: Field, Input, Checkbox, Radio,
   RadioGroup, Switch and Select. The specialized form batch has moved too: PhoneInput, CodeInput,
   QuantityInput, RangeSlider and ChoiceGroup with its ChoiceTile part. **The planned primitive
   batches are complete: 26 atom folders.**
4. **Molecules.** Migrate focused combinations such as SearchField, PromoCodeField and the smaller
   commerce cards. Reuse the atoms; extract repeated markup only when it has a clear shared role.
   SearchField, PromoCodeField and ResendCode are the first batch in `components/molecules/`.
   Alert, EmptyState, ErrorSummary and ErrorBoundary form the feedback batch. NavLink, Breadcrumb,
   Pagination and LoadMore form the navigation batch. FilterBar, LanguageSwitch, MenuList and
   SectionHeader form the browsing and menu batch. StockStatus, TrustSeal, DetailList, PaymentCard
   and OrderTimeline form the commerce display batch. ProductCard, CategoryCard and BlogCard form
   the catalog and editorial card batch. AddressCard and ReminderRow form the account batch.
   Tabs and Stepper form the tab and step navigation batch. AnnouncementBar, OfflineNotice, Toast
   and Tooltip form the notices and tooltip batch. Accordion and LineItem form the disclosure and
   bag-row batch: **the planned molecule batches are complete, with 33 molecule folders.**
5. **Organisms.** Migrate substantial sections such as Gallery and OrderSummary. Extract shared
   header/footer sections from Shell with explicit props and callbacks.
   Dialog, Lightbox and ToastRegion form the first batch. Gallery and Carousel form the media
   browsing batch. OrderSummary and PaymentStatus form the order and payment batch, followed by
   DatePicker as the calendar organism. LocationPicker and PlacesMap form the map batch, followed
   by BottomTabBar: **all existing package UI folders are now layered, with 11 organism folders.**
   VendraProvider remains a foundation. StorefrontHeader is extracted under
   `templates/app/organisms/StorefrontHeader/` with explicit content props and callbacks.
   StorefrontFooter and its FooterLinks now live under
   `templates/app/organisms/StorefrontFooter/` with explicit content and consent callbacks.
   StorefrontMenu now composes the compact menu drawer under
   `templates/app/organisms/StorefrontMenu/` with controlled state and explicit content/callbacks.
   StorefrontConsent now renders the privacy notice under
   `templates/app/organisms/StorefrontConsent/` with visibility, content and action callbacks.
   StorefrontAnnouncement now renders the responsive news strip under
   `templates/app/organisms/StorefrontAnnouncement/` with explicit text, link and close callback.
6. **Templates and pages.** Separate layout slots from state, starting with product browsing,
   then bag/delivery, payment, account and the remaining information/display flows. Keep routed
   page names and the maintained `storefront-*` source folders. StorefrontBottomBar is the first
   layout under `templates/app/layouts/`, with consent, sticky-action and navigation slots.
   StorefrontLayout now arranges the main section slots and tenant/language wrappers.
   StorefrontProductLayout now arranges product breadcrumbs, gallery, details, related designs and
   feedback; product state and purchase actions stay in the View/logic.
   StorefrontShopLayout now arranges shop heading, sidebar, compact categories, results and filter
   dialog slots; shop controls and URL/filter/sort state stay in the View/logic.
   StorefrontBagLayout now arranges bag/delivery notices, progress, heading, items/delivery fields,
   summary and empty state; bag/delivery rules and actions remain in the View/logic.
   StorefrontCheckoutLayout now arranges notices, progress, heading, review, payment, summary and
   bank/success slots; payment rules and order submission stay in the View/logic.
   StorefrontAccountLayout now arranges heading, actions, notices, tabs, feedback and dialog slots;
   account controls and mutations remain in the View/logic.
   StorefrontSigninLayout now arranges phone, code and feedback/continuation slots; authentication,
   validation, resend timing and customer synchronization stay in the View/logic.
   StorefrontTrackLayout now arranges lookup, heading, details, summary and reorder-feedback slots;
   order matching, status interpretation and reorder rules stay in the View/logic.
   StorefrontSavedLayout now arranges heading, notice, results and empty slots with controlled
   visibility; saved-list state, remove/Undo and synchronization remain in the View/logic.
   StorefrontSearchLayout now arranges heading, query/close, popular, results and empty slots;
   search matching, URL/history state and return context remain in the View/logic.
   StorefrontContactLayout now arranges heading, details, form and feedback slots; contact state,
   map fallback, validation and submission remain in the View/logic.
   StorefrontWeddingsLayout now arranges hero, services, story, inquiry and feedback slots;
   weddings content, validation, submission and recovery remain in the View/logic.
   StorefrontFaqLayout now arranges heading, questions and contact slots; FAQ content, accordion
   controls, section labels and navigation remain in the View/logic.
   StorefrontPolicyLayout now arranges heading, policy navigation, notice, contents and document
   slots; document mapping, section anchors, localized numbering and navigation stay in the View/logic.
   StorefrontJournalLayout now arranges heading, search, feedback, featured, stories and pagination
   slots; category/query state, matching, story mapping and pagination remain in the View/logic.
   StorefrontPostLayout now arranges feedback, article, actions, recommendations and related slots
   with controlled article visibility; content mapping, copying, sharing and links stay in the View/logic.
   StorefrontHomeLayout now arranges its seven section slots and optional-section visibility;
   collections, carousels, favorites and newsletter state/actions remain in the View/logic.
   StorefrontNotfoundLayout now arranges message, actions, recommendation heading and product
   slots; localized content, product mapping and recovery links remain in the View/logic.
   StorefrontErrorLayout now arranges message and recovery-action slots; localized content,
   reload behavior, home navigation and phone wording stay in the View/logic.
   StorefrontPresentationLayout now arranges heading, toolbar, catalog, display, overlays and
   feedback slots; providers, offline effects, device state and seller workflows stay in the View/logic.
   StorefrontPresentationCatalog now composes tile/empty states from explicit props; filtering,
   label rendering, quotes, shortlist state and callbacks stay in the View/logic.
   StorefrontPresentationToolbar now composes controlled search, categories, status and actions;
   capability checks, counts, query/customer state and panel actions stay in the View/logic.
   StorefrontPresentationDisplay now composes controlled display/preload content and owns its
   local reveal/pointer UI state; collections, playback and failure rules stay in the View/logic.
   StorefrontPresentationViewer now composes controlled captions, options and customer actions;
   label rendering, quotes, stock, selection and order/share state stay in the View/logic.
   StorefrontPresentationSend now composes the send/share dialog, QR/tag and warning/actions;
   link construction, clipboard/print behavior and customer state stay in the View/logic.
   Presentation tag printing now uses a lower-specificity hide rule and removes non-tag roots
   from print layout; the visible QR/product code prints without catalog-generated extra pages.
   StorefrontPresentationShortlist now composes controlled comparison cards, empty state and
   dialog actions; membership/order, viewer mapping, clear/Undo and sharing stay in the View/logic.
   StorefrontPresentationOrder now composes controlled rows, total, empty state and actions;
   quantity/order mutations, stock eligibility, clear/Undo and handoff stay in the View/logic.
   StorefrontPresentationScan now composes controlled instructions, video and warning;
   camera/decoder lifecycle, errors and viewer navigation stay in the View/logic.
   StorefrontPresentationUnlock now composes the controlled four-digit PIN dialog;
   PIN comparison/storage, error/reset state and settings access stay in the View/logic.
   StorefrontPresentationSettings now composes setup/settings controls from explicit descriptors;
   validation, persistence, PIN checks and browser operations stay in the View/logic.
   StorefrontPresentationTools now composes seller status and actions from explicit descriptors.
   StorefrontPresentationLabel now composes the shared code/sold-out label as an app molecule.
   StorefrontHomeCategories now composes the home heading and category carousel from explicit records/labels.
   StorefrontHomeFeatured now composes featured cards, carousel and responsive view-all links.
   StorefrontHomeOccasions now composes the occasion heading, description and carousel.
   StorefrontHomeStudio now composes studio cards, carousel and explore-all navigation.
   StorefrontHomeWeddings now composes the wedding-promotion text and links.
   StorefrontHomeJournal now composes journal previews, carousel and read-journal navigation.
   **Next stage: extract the home newsletter section into a storefront organism.**
7. **Finish.** Remove the remaining flat UI folders and obsolete glue. Check package exports,
   tree shaking, types, English/Persian accessibility, screenshots and phone/tablet/TV flows.

Each batch gets a separate local commit after its checks. The flat component folders are the
remaining migration backlog, not an alternative location for new components. Migrated components
must not import from that backlog. Checkpoints describe completed work, not a promise that a
folder move alone finishes a redesign.

**First checkpoint verified:** build, generated-file/format/CSS checks, the full unit/type/package
suite and production app build pass. All 27 focused atom/package/hydration browser tests and the
core/feedback guideline screenshot comparisons pass. A broad browser run passed 38 tests before
being stopped to keep this stage focused; the full 1,530-test browser suite is not verified.
Proceed one verified stage per reply.

**Second checkpoint verified:** the 11 non-form primitives listed above have moved with their
types, wording, fixtures and specs; all consumers and the published package use the new paths.
Implementation bodies and CSS rules are unchanged. Build, generated-file/format/CSS checks,
the full unit/type/package suite and production app build pass. All 63 atom/package/hydration
browser tests and six core/feedback/density visual checks pass. The two commerce card screenshot
checks fail on both this stage and the preceding commit (`62ab49e`); matching screenshots from
both versions confirm the mismatch predates this stage. No baselines or tolerances were changed.
The full browser suite was not rerun.

**Third checkpoint verified:** Field, Input, Checkbox, Radio, RadioGroup, Switch and Select moved
with their declarations, fixtures and specs. Their consumers and the published package use the
new atom paths; component bodies and CSS rules are unchanged. Build, generated-file/format/CSS
checks, the full unit/type/package suite and production app build pass. All 86 browser tests for
atoms, package behavior and hydration, plus six forms/density/bilingual visual checks, pass. The two validation-state
card screenshot checks fail on both this stage and the preceding commit (`130f6fe`), with
byte-for-byte identical actual images in normal and forced-color modes. No baselines or tolerances
were changed. The full browser suite was not rerun.

**Fourth checkpoint verified:** PhoneInput, CodeInput, QuantityInput, RangeSlider and ChoiceGroup
with ChoiceTile moved with their types, wording, fixtures and specs. All consumers and the
published package use the new atom paths. Component bodies and CSS rules are unchanged. Build,
generated-file/format/CSS checks, the full unit/type/package suite and production app build pass.
All 102 atom/package/hydration browser tests and six forms/density/bilingual visual checks pass,
including normal and forced-color screenshots. No baselines or tolerances were changed. The
previously documented commerce and validation-state snapshot failures were not rerun, and the
full browser suite remains unverified. The next stage starts the molecule layer.

**Fifth checkpoint verified:** SearchField, PromoCodeField and ResendCode are the first three
molecule folders. Their types, wording, fixtures and specs moved with them; the app and published
package use the new paths. They depend only on atoms and foundations, and their implementations
and CSS rules are unchanged. Build, generated-file/format/CSS checks, the full unit/type/package
suite and production app build pass. All 28 focused molecule/package/hydration browser tests and
both wayfinding visual checks pass. This includes promo-code focus, a narrow touch layout, resend
timing and English/Persian accessibility. No baselines or tolerances were changed. The previously
documented commerce and validation-state snapshot failures were not rerun, and the full browser
suite remains unverified.

**Sixth checkpoint verified:** Alert, EmptyState, ErrorSummary and ErrorBoundary moved together
into the molecule layer, bringing it to seven folders. Their types, wording, fixtures and specs
moved with them; consumers, the page-load fallback and the published package use the new paths.
Implementations and CSS rules are unchanged. Build, generated-file/format/CSS checks, the full
unit/type/package suite and production app build pass. All 44 molecule/package/hydration browser
tests and both feedback visual checks pass. Coverage includes alert dismissal, field-focus links,
error isolation, retry/reset behavior and English/Persian accessibility. No baselines or tolerances
were changed. The known commerce and validation-state snapshot failures were not rerun, and the
full browser suite remains unverified.

**Seventh checkpoint verified:** NavLink, Breadcrumb, Pagination and LoadMore moved with their
types, wording, fixtures and specs, bringing the molecule layer to 11 folders. Consumers and the
published package use the new paths; implementations and CSS rules are unchanged. Build,
generated-file/format/CSS checks, the full unit/type/package suite and production app build pass.
All 57 molecule/package/hydration browser tests, four provider integration tests and four
navigation/wayfinding visual checks pass. Coverage includes client-side routing, current-page
markers, pagination bounds, loading states, RTL behavior and English/Persian accessibility.
No baselines or tolerances were changed. Known commerce and validation-state snapshot failures
were not rerun, and the full browser suite remains unverified.

**Eighth checkpoint verified:** FilterBar, LanguageSwitch, MenuList and SectionHeader moved with
their types, wording, fixtures and specs, bringing the molecule layer to 15 folders. Consumers and
the published package use the new paths; implementations and CSS rules are unchanged. Build,
generated-file/format/CSS checks, the full unit/type/package suite and production app build pass.
All 32 focused component/provider/package/hydration browser tests and four navigation/wayfinding
visual checks pass. Coverage includes filter-removal focus, language selection and analytics,
menu semantics, section-arrow bounds and English/Persian accessibility. No baselines or tolerances
were changed. Known commerce and validation-state snapshot failures were not rerun, and the full
browser suite remains unverified.

**Ninth checkpoint verified:** StockStatus, TrustSeal, DetailList, PaymentCard and OrderTimeline
moved with their types, wording, fixtures and specs, bringing the molecule layer to 20 folders.
ProductCard, PaymentStatus, app exports and the published package use the new paths; component
bodies and CSS rules are unchanged. Build, generated-file/format/CSS checks, the full
unit/type/package suite and production app build pass. All 43 focused component/consumer/package/
hydration browser tests and both DetailList visual checks pass. Coverage includes Persian stock
digits and dates, seal referrer policies and image fallbacks, clipboard copying, order progress,
payment states and English/Persian accessibility. The four commerce/order screenshot checks fail
in normal and forced-color modes on both this stage and the preceding commit (`a1085bc`); all
eight actual/retry images match preceding-commit captures byte for byte. No baselines or tolerances
were changed. The known validation-state snapshot failures were not rerun, and the full browser
suite remains unverified.

**Tenth checkpoint verified:** ProductCard, CategoryCard and BlogCard moved with their types,
wording, styles, fixtures and specs, bringing the molecule layer to 23 folders. App exports and
the published package use the new paths; ProductCard composes the StockStatus molecule directly.
Component bodies and CSS rules are unchanged. Build, generated-file/format/CSS checks, the full
unit/type/package suite and production app build pass. All 27 focused card/package/hydration
browser tests pass, including favorite toggles, link/button semantics, category aspect and circle
frames, Persian arrow direction and English/Persian accessibility. Both commerce screenshot checks
fail in normal and forced-color modes on this stage and the preceding commit (`6ddacf4`); all four
actual/retry images match fresh preceding-commit captures byte for byte. No baselines or tolerances
were changed. Known order and validation-state snapshot failures were not rerun, and the full
browser suite remains unverified.

**Eleventh checkpoint verified:** AddressCard and ReminderRow moved with their types, wording,
styles, fixtures and specs, bringing the molecule layer to 25 folders. App exports and the
published package use the new paths; component bodies and CSS rules are unchanged. Build,
generated-file/format/CSS checks, the full unit/type/package suite and production app build pass.
All 22 focused account-component/package/hydration browser tests and both account visual checks
pass. Coverage includes address edit/delete/default callbacks, phone direction, reminder pausing,
person-specific control names, English/Persian accessibility and narrow/wide reminder layouts in
normal and forced-color screenshots. No baselines or tolerances were changed. Known commerce,
order and validation-state snapshot failures were not rerun, and the full browser suite remains
unverified.

**Twelfth checkpoint verified:** Tabs and Stepper moved with their types, styles, fixtures and
specs, bringing the molecule layer to 27 folders. App exports and the published package use the
new paths; component bodies and CSS rules are unchanged. Build, generated-file/format/CSS checks,
the full unit/type/package suite and production app build pass. All 23 focused component/package/
hydration browser tests and six navigation/density/bilingual visual checks pass. Coverage includes
English/Persian arrow keys, Home/End selection, roving focus and tab-panel links, completed-step
callbacks, compact captions, Persian digits and accessibility in both languages. Normal and
forced-color screenshots pass without baseline or tolerance changes. Known commerce, order and
validation-state snapshot failures were not rerun, and the full browser suite remains unverified.

**Thirteenth checkpoint verified:** AnnouncementBar, OfflineNotice, Toast and Tooltip moved with
their types, wording, styles, fixtures and specs, bringing the molecule layer to 31 folders.
ToastRegion, app exports and the published package use the new paths; component bodies and CSS
rules are unchanged. Build, generated-file/format/CSS checks, the full unit/type/package suite and
production app build pass. All 32 focused component/ToastRegion/package/hydration browser tests
and four feedback/bilingual visual checks pass. Coverage includes dismissal, offline/reconnect
transitions, toast queue integration, focus-ring contrast, tooltip hover/keyboard/Escape/touch
behavior and English/Persian accessibility. Normal and forced-color screenshots pass without
baseline or tolerance changes. Known commerce, order and validation-state snapshot failures were
not rerun, and the full browser suite remains unverified.

**Fourteenth checkpoint verified:** Accordion and LineItem moved with their types, wording,
styles, fixtures and specs, completing the planned molecule batches with 33 folders. App exports
and the published package use the new paths; component bodies and CSS rules are unchanged.
Build, generated-file/format/CSS checks, the full unit/type/package suite and production app build
pass. All 22 focused component/package/hydration browser tests and both navigation visual checks
pass. Coverage includes keyboard disclosure toggles, panel names and heading levels, multiple-open
panels, quantity limits, removal callbacks, summary quantities, unavailable/busy states and
English/Persian accessibility. Both commerce screenshot checks still fail their stored baselines;
all four normal/forced-color actual/retry images match the previously verified captures from
checkpoints nine and ten byte for byte. No baselines or tolerances were changed. Known order and
validation-state snapshot failures were not rerun, and the full browser suite remains unverified.
The next stage begins the organism layer.

**Fifteenth checkpoint verified:** Dialog, Lightbox and ToastRegion moved with their types,
wording, styles, fixtures and specs into the first three organism folders. App exports and the
published package use the new paths; component bodies and CSS rules are unchanged. Build,
generated-file/format/CSS checks, the full unit/type/package suite and production app build pass.
All 25 focused organism/package/hydration browser tests and four feedback/bilingual visual checks
pass. Coverage includes modal focus trapping and restoration, Escape/close actions, photo and item
navigation, Persian digits and mirrored arrow keys, simulated pointer swipes, queued toast
dismissal and English/Persian accessibility. Normal and forced-color screenshots pass without
baseline or tolerance changes. Known commerce, order and validation-state snapshot failures were
not rerun, and the full browser and device suites remain unverified.

**Sixteenth checkpoint verified:** Gallery and Carousel moved with their types, wording, styles,
fixtures and specs, bringing the organism layer to five folders. The shared CollectionCarousel,
app exports and the published package use the new paths; component bodies and CSS rules are
unchanged. Build, generated-file/format/CSS checks, the full unit/type/package suite and production
app build pass. All 23 focused organism/package/hydration browser tests, two storefront collection
resize tests and four navigation/bilingual visual checks pass. Coverage includes photo-dot
selection, scroll bounds, keyboard scrolling, print layout, English/Persian accessibility and
reading direction, plus touch navigation and keyboard reachability after narrow/wide resizing.
Normal and forced-color screenshots pass without baseline or tolerance changes. Known commerce,
order and validation-state snapshot failures were not rerun, and the full browser and device
suites remain unverified.

**Seventeenth checkpoint verified:** OrderSummary and PaymentStatus moved with their types,
wording, styles, fixtures and specs, bringing the organism layer to seven folders. App exports and
the published package use the new paths; component bodies and CSS rules are unchanged. Build,
generated-file/format/CSS checks, the full unit/type/package suite and production app build pass.
All 24 focused organism/package/hydration browser tests pass. Coverage includes linked order lines
and totals, gateway GET/POST redirects, automatic redirect timing, pending/failed payment actions,
status-change focus and English/Persian accessibility. The four commerce/order screenshot checks
still fail their stored baselines; all eight normal/forced-color actual/retry images match the
previously verified captures from checkpoints nine and ten byte for byte. No baselines or
tolerances were changed. Known validation-state snapshot failures were not rerun, and the full
browser and device suites remain unverified.

**Eighteenth checkpoint verified:** DatePicker moved with its types, wording, styles, fixture and
spec into the organism layer, bringing it to eight folders. App exports and the published package
use the new paths; the component body and CSS rules are unchanged. Build, generated-file/format/
CSS checks, the full unit/type/package suite and production app build pass. All 19 focused
DatePicker/package/hydration browser tests and four DatePicker/forms visual checks pass. Coverage
includes keyboard day selection, Gregorian and Persian grids and digits, minimum-date restrictions,
calendar switching while preserving the ISO date and English/Persian accessibility. Normal and
forced-color screenshots pass without baseline or tolerance changes. Known commerce, order and
validation-state snapshot failures were not rerun, and the full browser and device suites remain
unverified.

**Nineteenth checkpoint verified:** LocationPicker and PlacesMap moved with their types, styles,
fixtures and specs, bringing the organism layer to ten folders. App exports and the published
package use the new paths; component bodies and CSS rules are unchanged. Fixture imports still
load the local Leaflet runtime and use stubbed map tiles. Build, generated-file/format/CSS checks,
the full unit/type/package suite and production app build pass. All 21 focused map/package/
hydration browser tests and both forms visual checks pass. Coverage includes map names and
status/error descriptions, left-to-right map canvases, keyboard pin movement, labelled markers,
pointer/Enter selection and English/Persian accessibility. Normal and forced-color screenshots
pass without baseline or tolerance changes. Known commerce, order and validation-state snapshot
failures were not rerun, and the full browser and device suites remain unverified.

**Twentieth checkpoint verified:** BottomTabBar moved with its types, styles, fixture and spec,
bringing the organism layer to 11 folders. All 70 existing package UI folders now live in atomic
layers: 26 atoms, 33 molecules and 11 organisms. VendraProvider remains a foundation. App exports
and the published package use the new path; the component body and CSS rules are unchanged.
Build, generated-file/format/CSS checks, the full unit/type/package suite and production app build
pass. All 17 focused BottomTabBar/package/hydration browser tests and both navigation visual checks
pass. Coverage includes the named navigation landmark, links and action buttons, current-page
markers, count badges, menu callbacks and English/Persian accessibility. Normal and forced-color
screenshots pass without baseline or tolerance changes. Known commerce, order and validation-state
snapshot failures were not rerun, and the full browser and device suites remain unverified.
The next stage extracts the storefront header from Shell; header/footer composition, templates
and pages still need migration work.

**Twenty-first checkpoint verified:** StorefrontHeader is the first storefront-specific organism,
under `templates/app/organisms/StorefrontHeader/`. Shell passes explicit brand, navigation, tool,
bag and language content plus callbacks. Feature availability, state, routing, the menu drawer and
shared layout effects remain in Shell and storefront logic. Header markup keeps its existing
classes and CSS-selected layouts. Tailwind now scans nested app JSX, and the JavaScript-breakpoint
guard covers extracted app components. Published package contents and generated styles are
unchanged. Build, generated-file/format/CSS checks, the full unit/type/package suite and production
app build pass. Twelve touch-enabled responsive/menu/resize tests, three language/keyboard
navigation tests and 12 hydration/first-paint tests pass; one duplicate mobile keyboard test is
skipped by its existing desktop-only guard. Six header captures at 375, 768 and 1280 pixels in
English and Persian match the preceding commit (`8512de2`) byte for byte and were visually
inspected at representative phone/desktop sizes. No screenshot baselines or tolerances changed.
The full browser/device suites and known unrelated snapshot failures were not rerun. Footer,
menu composition, templates and page migration work remains.

**Twenty-second checkpoint verified:** StorefrontFooter and its FooterLinks are extracted under
`templates/app/organisms/StorefrontFooter/`. Shell supplies explicit brand, navigation, social,
contact, seal and credit content plus the consent settings callback. Storefront routing, feature
filtering, consent state and focus restoration stay in Shell and shared logic. Existing markup,
classes, link attributes, disclosure state and consent trigger IDs are preserved. The component
usage guard now scans nested storefront JSX and recognizes named imports through `ds.js`.
Build, generated-file/format/CSS checks, the full unit/type/package suite and production app build
pass. Eight footer browser tests pass in English and Persian at 390, 768, 1280 and 1920 pixels,
including touch disclosures, rotation, consent focus, links, accessibility and overflow. Twelve
hydration/first-paint tests pass. Eight footer captures across those widths and languages match
the preceding commit (`8f68d28`) byte for byte; representative phone/desktop captures were visually
inspected. Published package contents and generated styles are unchanged. No screenshot baselines
or tolerances changed. The full browser/device suites and known unrelated snapshot failures were
not rerun. The next stage extracts the storefront mobile menu from Shell.

**Twenty-third checkpoint verified:** StorefrontMenu is extracted under
`templates/app/organisms/StorefrontMenu/`. Shell supplies controlled open/close state, navigation,
optional language content and its callback, and the optional WhatsApp link. Routing, feature
filtering, language/menu state and desktop resize dismissal remain in Shell and storefront logic.
The organism composes the existing package Dialog, MenuList, NavLink, LanguageSwitch and Button;
markup, start placement, classes and bilingual content are preserved. Navigation now invokes the
close callback: previously, a link within the current route could leave the drawer open. Four
new touch phone/tablet regression tests cover that fix, current-page markers, WhatsApp link
attributes, focus trapping, Escape/close-button focus restoration, language context and axe.
Twelve shell tier/resize tests and 12 hydration/first-paint tests also pass. Build,
generated-file/format/CSS checks, the full unit/type/package suite and production app build pass.
Four open-menu captures at 390 and 768 pixels in English and Persian match the preceding commit
(`fc0c3d0`) byte for byte; representative phone/tablet captures were visually inspected. A direct
before/after browser probe confirms same-page navigation retained the old drawer and closes the
new one in all four cases. Published package contents and generated styles are unchanged; no
screenshot baselines or tolerances changed. The full browser/device suites and known unrelated
snapshot failures were not rerun. The next stage extracts the storefront consent banner.

**Twenty-fourth checkpoint verified:** StorefrontConsent is extracted under
`templates/app/organisms/StorefrontConsent/`. Shell supplies visibility, bilingual content,
the policy URL and close/accept/essential callbacks, and retains placement in the bottom bar.
Consent persistence, session dismissal, analytics gating and footer focus restoration remain
in the existing shared workflow. Markup, focus IDs, accessible labels, action attributes and
responsive docking classes are preserved. Build, generated-file/format/CSS checks, the full
unit/type/package suite and production app build pass. Eight first-visit checks, eight bilingual
footer checks, 12 hydration/first-paint checks and two real touch-phone rotation checks pass;
four duplicate cases are skipped by their existing project guards. Coverage includes persistence,
closing without choosing, analytics blocking before consent, accepting visit counts, essential-only
choices, modal overlay priority and footer focus restoration. Eight consent captures at 390, 768,
1280 and 1920 pixels in English and Persian match the preceding commit (`ddf7a03`) byte for byte;
representative phone/desktop captures were visually inspected. Published package contents and
generated styles are unchanged; no screenshot baselines or tolerances changed. The full browser/
device suites and known unrelated snapshot failures were not rerun. The next stage extracts the
storefront announcement composition from Shell.

**Twenty-fifth checkpoint verified:** StorefrontAnnouncement is extracted under
`templates/app/organisms/StorefrontAnnouncement/`. Shell supplies full/phone text, accessible
labels, the optional action link and the dismissal callback. Delivery cut-offs, bilingual copy,
link availability and session dismissal remain in shared storefront logic. Existing markup,
CSS-selected text, link styling and RTL arrow behavior are preserved. The dismissal browser test
now fixes its clock to a known morning so its same-day assertion does not depend on the run time.
Build, generated-file/format/CSS checks, the full unit/type/package suite and production app build
pass. Four announcement behavior checks, 12 touch-enabled shell tier/resize checks and 12
hydration/first-paint checks pass. Coverage includes dismissal across navigation, phone/full copy,
same-day links and their removal after the delivery cut-off. Eight announcement captures at 390,
768, 1280 and 1920 pixels in English and Persian match the preceding commit (`33d00bc`) byte for
byte; representative phone/tablet captures were visually inspected. Published package contents
and generated styles are unchanged; no screenshot baselines or tolerances changed. The full
browser/device suites and known unrelated snapshot failures were not rerun. The next stage
extracts the bottom-bar layout with its sticky-action slot.

**Twenty-sixth checkpoint verified:** StorefrontBottomBar is the first layout template under
`templates/app/layouts/StorefrontBottomBar/`. It arranges React-node slots for consent, the page's
sticky action and navigation, without owning content, callbacks, state, routing or persistence.
Shell composes those slots and retains sticky-height/focus measurements. Existing wrapper classes,
slot order and CSS-controlled docking/visibility are preserved. Build, generated-file/format/CSS
checks, the full unit/type/package suite and production app build pass. Twelve touch-enabled shell
tier/resize checks, 12 hydration/first-paint checks, six touch tablet shopping checks and two real
touch-phone rotation checks pass; two duplicate rotation cases are skipped by their existing
project guard. Coverage includes product configuration retention, focused controls clearing
consent/purchase bars, tablet sorting and short-landscape sticky measurements. Eight bottom-bar
captures with consent shown at 390, 768, 1280 and 1920 pixels in English and Persian match
the preceding commit (`9e57899`) byte for byte; the capture URL omitted the product ID and does
not establish visual coverage of the product action slot; representative phone/tablet captures
were visually inspected. Published package contents and generated styles are unchanged; no
screenshot baselines or tolerances changed. The full browser/device suites and known unrelated
snapshot failures were not rerun. The next stage extracts the main storefront layout with header,
content, footer and bottom-bar slots.

**Twenty-seventh checkpoint verified:** StorefrontLayout is extracted under
`templates/app/layouts/StorefrontLayout/`. It owns the background, tenant/language container,
content wrapper and section order, receiving React-node slots for skip link, live region,
announcement, header, menu, notices, content, footer and bottom bar. Shell retains providers,
tracking callbacks, menu resize dismissal, sticky-height/focus effects and the separate bare
presentation branch. Build, generated-file/format/CSS checks, the full unit/type/package suite
and production app build pass. Forty-eight focused browser checks pass: 12 shell tier/resize,
12 hydration/first-paint, six touch tablet shopping, two touch-phone rotation, four menu, eight
footer and four shell keyboard/language checks. Six duplicate cases are skipped by existing
project guards. The two TV arrow-navigation checks fail in both languages; direct before/after
probes against the preceding commit (`3aa1dcf`) reproduce identical 30-step focus sequences that
do not reach the purchase button. These failures predate the extraction; TV navigation remains
an unresolved check. Sixteen complete FAQ and valid-product layout comparisons at 390, 768, 1280
and 1920 pixels in both languages meet the existing 25-pixel screenshot budget: 14 are byte-identical,
and the two 1280px product captures differ by 23/17 control-edge pixels. Representative phone and
desktop captures were visually inspected. The preceding checkpoint's capture description is
corrected: its URL omitted the product ID and did not prove product-action visual coverage.
Published package contents and generated styles are unchanged; no screenshot baselines or
tolerances changed. The full browser/device suites and known unrelated snapshot failures were
not rerun. The next stage extracts the product page layout with gallery and details slots.

**Twenty-eighth checkpoint verified:** StorefrontProductLayout is extracted under
`templates/app/layouts/StorefrontProductLayout/`. It receives breadcrumbs, gallery, details,
related-design and feedback slots, preserving the main focus target, responsive grid, gallery
wrapper and sticky details wrapper. Product View/logic retain controls, gallery/lightbox state,
recent-history ErrorBoundary, purchase feedback, configuration, totals and purchase actions;
the sticky purchase action stays in its separate Shell slot. The skip-link unit guard now follows
rendered named imports into app layouts, rather than requiring the main landmark in View itself.
Build, generated-file/format/CSS checks, the full unit/type/package suite and production app build
pass. Fifty-two focused browser checks pass: 12 hydration/first-paint, six product-code/clipboard,
eight orchid content, ten responsive panel, four pricing, six touch tablet, four gallery/bag-feedback
and two real touch-phone rotation checks; two duplicate rotation cases are skipped by existing
guards. Eight valid-product captures across 390, 768, 1280 and 1920 pixels in both languages were
compared with the preceding commit (`c06d458`). Seven are byte-identical directly. The 768px English
comparison and repeat each differ at 29 control-edge pixels, exceeding the existing 25-pixel budget,
but the initial before image matches the repeat after image byte for byte, and vice versa. Both
commits produce exactly the same two raster variants; the strict single-capture comparison remains
variable rather than proving a layout regression. Representative phone/desktop captures were
visually inspected. No baselines or tolerances changed. Published package contents and generated
styles are unchanged. The full browser/device suites, known TV arrow-navigation failures and
unrelated snapshot failures were not rerun. The next stage extracts the shop page layout with
heading, sidebar and results slots.

**Twenty-ninth checkpoint verified:** StorefrontShopLayout is extracted under
`templates/app/layouts/StorefrontShopLayout/`. It receives heading, sidebar, compact-category,
results and filter-dialog slots, preserving the main focus target, responsive columns, sticky
sidebar and results wrapper. Shop View/logic retain controls, labels, result states, cards,
favorites, paging, filtering, delivery rules, sorting and URL state. The existing layout-aware
skip-link guard validates the delegated main landmark without a shop-specific exception.
Build, generated-file/format/CSS checks, the full unit/type/package suite and production app build
pass. Forty-two focused browser checks pass: 12 hydration/first-paint, six touch filter-dialog,
two portrait-tablet filtering/rotation, two touch tablet sorting/rotation, two bilingual search
return-context and 18 phone/desktop shop flow checks. Coverage includes dialog action visibility,
Escape/close focus restoration, paging and reload recovery, individual/all filter removal and
focus, delivery/occasion filtering, ready-made designs, category names and empty categories.
Eight complete shop captures at 390, 768, 1280 and 1920 pixels in English and Persian match the
preceding commit (`b6c8280`) byte for byte; representative phone/desktop captures were visually
inspected. No screenshot baselines or tolerances changed. Published package contents and generated
styles are unchanged. The full browser/device suites, known TV arrow-navigation failures and
unrelated snapshot failures were not rerun. The next stage extracts the bag page layout with item
and summary slots.

**Thirtieth checkpoint verified:** StorefrontBagLayout is extracted under
`templates/app/layouts/StorefrontBagLayout/`. It receives externally controlled content visibility
and notice, progress, heading, items/delivery, summary and empty-state slots. The main focus target,
columns and sticky summary wrappers are preserved. Notices remain outside the populated-content
group so Undo still works after the final line is removed. The View retains conditional slot
construction and all controls/callbacks; bag logic retains persistence, stock limits, delivery
validation and totals. The sticky purchase/continue action remains a separate Shell slot; no size
or add-on editors were added to bag rows. Build, generated-file/format/CSS checks, the full
unit/type/package suite and production app build pass. Sixty focused browser cases pass across
responsive bag rows, hydration/first paint, delivery/payment continuity, stock and address checks,
short-phone field focus, configured-line/empty-bag Undo, step navigation, delivery timing, card
messages, error-summary links, promos and free-delivery totals. The stale meter test now asserts
absence before a destination is quoted, sets a real pin and returns to the bag before checking
the meter; both phone and desktop checks pass. Sixteen complete bag/delivery captures at 390,
768, 1280 and 1920 pixels in both languages match the preceding commit (`e41027e`) byte for byte
after explicit image-decoding waits and deterministic map tiles. Initial delivery differences
were unloaded/undecoded summary thumbnails; the stabilized repeat resolves them without changing
tolerances. Representative phone/desktop captures were visually inspected. No screenshot baselines
or tolerances changed; published package contents and generated styles are unchanged. The full
browser/device suites, known TV arrow-navigation failures and unrelated snapshot failures were
not rerun. The next stage extracts the checkout layout with review and payment slots.

**Thirty-first checkpoint verified:** StorefrontCheckoutLayout is extracted under
`templates/app/layouts/StorefrontCheckoutLayout/`. It receives externally controlled payment
visibility and notices, progress, heading, delivery review, payment, summary, bank-status and
success slots. The main focus target, payment columns, sticky summary and bank/success wrappers
are preserved. Notices remain outside the payment group. The View retains conditional slot
construction, all controls/callbacks, receipt fields and confirmation targets; checkout logic
retains method availability, persistence, gateway recovery and order submission. The mobile
submission action remains a separate Shell slot. Build, generated-file/format/CSS checks, the full
unit/type/package suite and production app build pass. Forty-six focused browser cases pass:
English/Persian delivery-edit continuity, receipt-total confirmation, delayed-response bag
preservation, order history, wallet top-up return, recovery-storage failure, expired payment retry,
WhatsApp details, hydration/first paint, plus phone/desktop promo carryover, card confirmation,
online success/refusal/retry, unknown bank returns, wallet checkout/sign-in and true-touch
short-phone receipt-field focus/accessibility. Twenty-four complete payment-entry, unconfirmed
bank-return and card-order success captures at 390, 768, 1280 and 1920 pixels in both languages
match the preceding commit (`6784b9a`) byte for byte. Captures wait for image decoding and use a
deterministic clock that advances during map pin placement before freezing order timestamps;
initial harness attempts stopped during pin placement and produced no accepted comparisons.
Representative phone payment and desktop bank-return captures were visually inspected. No
screenshot baselines/tolerances, production rules or test expectations changed; published package
contents and generated styles are unchanged.
The full browser/device suites, known TV arrow-navigation failures and unrelated snapshot failures
were not rerun. The next stage extracts the account layout with heading, tabs and dialog slots.

**Thirty-second checkpoint verified:** StorefrontAccountLayout is extracted under
`templates/app/layouts/StorefrontAccountLayout/`. It receives heading, actions, notices, tabs,
feedback and dialog slots. The main focus target, responsive header and heading wrappers, and
slot order are preserved. The View retains tab controls/panels, fields, notices and the controlled
address/reminder editor; account logic retains customer isolation, persistence, validation,
mutations and focus restoration. An existing reminder validation focus defect was confirmed on
both the preceding commit and the extracted layout: the shared helper defaults to main, while
the editor is portaled outside it. Account validation now passes the open dialog as its focus
root, retaining the main fallback for profile errors. No account data rules or copy changed. Build,
generated-file/format/CSS checks, the full unit/type/package suite and production app build pass.
Fifty focused browser cases pass across linked keyboard tabs, profile/address
save recovery, preservation of newer wallet/account data, customer switching, order history,
saved-product synchronization, mapped addresses, editor error summaries, profile persistence and
sign-out isolation, wallet top-up/discount checkout and hydration/first paint. Four new reminder
regressions cover invalid-field focus, accessibility, save, opener focus return and reload
persistence in both languages on phone/desktop; the four profile/address recovery cases were
rerun after the focus correction. Thirty-six tab/dialog captures in both languages match the
pre-stage commit (`8541636`) byte for byte: all six tabs and both editor dialogs at 390/1280
pixels, plus profile at 768/1920 pixels. Dialog cancellation restores opener focus. Completed
default-state captures were retained across the focus-only correction; the new regression cases
separately verify the corrected error state. Captures use deterministic time/map tiles and image
decoding waits. Representative Persian phone orders and English desktop reminder-dialog captures
were visually inspected. No screenshot baselines/tolerances, package contents or generated styles
changed. The full browser/device suites, known TV arrow-navigation failures and unrelated
snapshot failures were not rerun. The next stage extracts the sign-in layout with phone, code
and feedback slots.

**Thirty-third checkpoint verified:** StorefrontSigninLayout is extracted under
`templates/app/layouts/StorefrontSigninLayout/`. It receives phone, code and
feedback/continuation slots and preserves the main focus target, narrow form wrapper and slot
order. The View retains conditional step construction, all fields and validation summaries,
headings, policy links, resend feedback and continuation controls. Sign-in logic retains validation,
resend configuration, code completion, authentication, customer synchronization and checkout
return. No sign-in rules, controls, copy or callbacks changed. Build, generated-file/format/CSS
checks, the full unit/type/package suite and production app build pass. Thirty focused browser
cases pass across checkout sign-in/return, resend expiry, SMS autofill,
wallet sign-in, sign-out isolation, phone-error focus, policy links and English/Persian customer
switching, hydration and responsive first paint. Twenty-eight captures match the preceding
commit (`09fe852`) byte for byte: phone, code and success states at 390, 768, 1280 and 1920 pixels
in both languages, plus phone/code error states at 390 pixels in both languages. Capture probes
also verify invalid-field focus and returning to phone entry with its number retained. Captures
use fixed time (including the resend countdown), deterministic map tiles and image-decoding
waits. Representative Persian phone-entry and English desktop code-entry captures were visually
inspected. No screenshot baselines/tolerances, package contents or generated styles changed.
The full browser/device suites, known TV arrow-navigation failures and unrelated snapshot
failures were not rerun. The next stage extracts the tracking layout with lookup, order and
feedback slots.

**Thirty-fourth checkpoint verified:** StorefrontTrackLayout is extracted under
`templates/app/layouts/StorefrontTrackLayout/`. It receives externally controlled order visibility
and lookup, heading, details, summary and feedback slots. The main focus target, order header,
responsive columns and sticky summary wrappers are preserved; reorder feedback remains outside
main. The View retains conditional slot construction, lookup form semantics, validation,
timeline/photo/details content, order summary, contact and reorder controls, and the controlled
reorder dialog. Tracking logic retains order matching, phone normalization, status/payment
interpretation, reorder reconciliation and bag mutations. No tracking rules, copy or callbacks
changed. Build, generated-file/format/CSS checks, the full unit/type/package suite and production
app build pass. Twenty-six focused browser cases pass across order lookup, failed
match/field focus, phone normalization, tracking another order, delivered photos, pending payment,
order history/reload, English/Persian reorder cancel/confirm with bag preservation, hydration
and responsive first paint. Twenty-eight captures match the preceding commit (`f548001`) byte
for byte: lookup/active/delivered/cancelled states at 390/1280 pixels in both languages, active
orders at 768/1920 pixels, and invalid/failed lookup, pending payment and reorder review at
390 pixels in both languages. Capture probes verify validation/failure focus, tracking another
order and reorder-dialog cancellation focus return. Captures use fixed time, deterministic map
tiles and image-decoding waits. Representative Persian phone lookup-failure and English desktop
delivered-order captures were visually inspected. No screenshot baselines/tolerances, package
contents or generated styles changed. The full browser/device suites, known TV arrow-navigation
failures and unrelated snapshot failures were not rerun. The next stage extracts the saved-products
layout with heading, results and empty slots.

**Thirty-fifth checkpoint verified:** StorefrontSavedLayout is extracted under
`templates/app/layouts/StorefrontSavedLayout/`. It receives heading, notice, results and empty
slots with externally controlled results/empty visibility. The main focus target, heading,
responsive product grid, empty-state wrapper and `data-vf-keep-focus` are preserved. The Undo
notice remains outside both conditional groups so removing the final product still exposes it.
The View retains conditional slot construction, count/copy, cards, product links and remove/Undo
controls; saved-page and shared site logic retain persistence, customer synchronization, additive
Undo and focus restoration. No saved-list rules, copy or callbacks changed. Build,
generated-file/format/CSS checks, the full unit/type/package suite and production app build pass.
Twenty-four focused browser cases pass across English/Persian removal/Undo, preservation
of other removals, final-product empty recovery, focus restoration, reload persistence,
account/product synchronization, late saved-list loading, accessibility, hydration and responsive
first paint. Twenty-eight captures match the preceding commit (`7e6b322`) byte for byte:
populated, removed and empty-with-Undo states at 390, 768, 1280 and 1920 pixels in both languages,
plus empty lists after reload at 390/1280 pixels in both languages. Capture probes also verify
Undo restoration/focus and phone product navigation/back continuity. Captures use fixed time,
deterministic map tiles and image-decoding waits. Representative Persian phone removal and
English desktop empty-with-Undo captures were visually inspected. No screenshot baselines/
tolerances, package contents or generated styles changed. The full browser/device suites, known
TV arrow-navigation failures and unrelated snapshot failures were not rerun. The next stage
extracts the search layout with query, results and empty slots.

**Thirty-sixth checkpoint verified:** StorefrontSearchLayout is extracted under
`templates/app/layouts/StorefrontSearchLayout/`. It receives heading, query, close, popular,
results and empty slots. The main focus target, reading-width wrapper, query/close row and input
wrapper are preserved. The View retains conditional content construction, all controls, result
rows/count/links and empty-state recovery. Search and shared site logic retain matching,
URL/history changes, reporting, return context, navigation and focus. No search rules, copy or
callbacks changed. Build, generated-file/format/CSS checks, the full unit/type/package suite and
production app build pass. Forty focused browser cases pass across product-code
matching, clear/Escape, English/Persian product exploration/back/forward/reload, query/language
recovery without history churn, popular terms and close-to-filtered-shop/delivery context.
True-touch checks at 320, 390 and 768 pixels in both languages verify readable codes/prices,
contained rows, clear/close tap targets, result navigation/back and accessibility. Hydration
and responsive first-paint checks also pass. Twenty-eight captures match the preceding commit
(`7973542`) byte for byte: popular, multi-result and no-result states at 390, 768, 1280 and 1920
pixels in both languages, plus single-code results at 390/1280 pixels in both languages. Capture
probes verify no-result recovery focus, popular-term/clear taps and product navigation/back.
Captures use fixed time, deterministic map tiles and image-decoding waits. Representative Persian
tablet results and English desktop no-result captures were visually inspected. No screenshot
baselines/tolerances, package contents or generated styles changed. The full browser/device suites,
known TV arrow-navigation failures and unrelated snapshot failures were not rerun. The next stage
extracts the contact layout with details, form and feedback slots.

**Thirty-seventh checkpoint verified:** StorefrontContactLayout is extracted under
`templates/app/layouts/StorefrontContactLayout/`. It receives heading, details, form and feedback
slots. The main focus target, header, responsive contact columns and detail/form wrappers are
preserved; API feedback remains after the columns. The View retains contact actions, map/error
boundary, directions, fields, error summary, submission controls and success/edit content.
Contact logic retains customer prefill, reply-channel/message validation, map fallback,
submission, busy/error state, draft retention and focus. No contact rules, copy or callbacks
changed. Build, generated-file/format/CSS checks, the full unit/type/package suite and production
app build pass. Twenty-two focused browser cases pass across studio map/directions,
reply-channel validation, success focus, linked error summaries, customer/guest prefill,
English/Persian validation accessibility, hydration and responsive first paint. Twenty-eight
capture pairs match the preceding commit (`1005b43`) byte for byte: form, validation and success
states at 390, 768, 1280 and 1920 pixels in both languages, plus stubbed API-error and map-failure
states at 390 pixels in both languages. Initial desktop validation/success differences came from
scroll-dependent sticky/fixed elements in full-page captures. Repeating those eight pairs after
normalizing scroll to zero resolves them without changing code or tolerances; the other twenty
completed pairs are retained. Capture probes verify summary links, success/edit draft retention,
stubbed inquiry failure/retry and payload, and map-fallback directions. No real inquiry was sent.
Captures use fixed time, deterministic map tiles and image-decoding waits. Representative desktop
validation and phone form captures were visually inspected. No screenshot baselines/tolerances,
package contents or generated styles changed. The full browser/device suites, known TV
arrow-navigation failures and unrelated snapshot failures were not rerun. The next stage extracts
the weddings layout with details, inquiry and feedback slots.

**Thirty-eighth checkpoint verified:** StorefrontWeddingsLayout is extracted under
`templates/app/layouts/StorefrontWeddingsLayout/`. It receives heading, hero media, services,
story, inquiry introduction, inquiry and feedback slots. The main focus target, section order,
hero/services grids and responsive inquiry section/anchor are preserved. The View retains actions,
media, cards, gallery/process content, fields, validation, conditional form/success content and
API feedback. Weddings logic retains field/date state, validation, submission payload, busy/error
state, draft retention and focus. A pre-existing hero-anchor defect was confirmed on the
pre-stage preview: the React Aria router discarded URL fragments. The router now delegates
fragment navigation to the browser, matching the plain-link handler. The shell's queued focus
adjustment now checks that its element remains focused, so it does not override the browser's
fragment scroll after focus moves. A bilingual phone/desktop regression verifies reaching the
inquiry section, retained draft values and no document reload. Inquiry validation/submission
rules and copy are unchanged. Build,
generated-file/format/CSS checks, the full unit/type/package suite and production app build pass.
Thirty focused browser cases pass across linked validation summaries, English/Persian
error accessibility, hydration, responsive first paint, fragment navigation and existing shell
keyboard focus checks. Twenty-eight before/after capture pairs are byte-identical with zero
changed pixels: form, validation and success at 390/768/1280/1920 pixels in both languages,
plus stubbed API errors at 390/1280 pixels in both languages. Capture probes verify date/select
controls, summary links, success/edit draft retention, failure/retry and the assembled payload.
No real inquiry was sent. Captures use fixed time, image-decoding waits and normalized scroll;
representative Persian phone validation/tablet form and English phone error/desktop success
captures were visually inspected. Initial capture retries corrected selector assumptions; the
hero-anchor probe exposed the existing router/focus defect described above. No screenshot
baselines/tolerances, package contents or generated styles changed. The full browser/device
suites, known TV arrow-navigation failures and unrelated snapshot failures were not rerun.
The next stage extracts the FAQ layout with heading, questions and contact slots.

**Thirty-ninth checkpoint verified:** StorefrontFaqLayout is extracted under
`templates/app/layouts/StorefrontFaqLayout/`. It receives heading, questions and contact slots
and owns the main focus target, page header, responsive information columns, question-list
wrapper and contact aside. The View retains grouped sections and accessible headings, Accordion
controls/default expansion, copy, help card, contact/WhatsApp links and sample-content note.
FAQ logic retains category/answer mapping and delivery-rule interpolation; shared page logic
retains navigation, locale, SEO and focus. No page behavior, copy or styles changed. Build,
generated-file/format/CSS checks, the full unit/type/package suite and production app build pass.
Eighteen focused browser cases pass: bilingual FAQ expansion/accessibility on phone and desktop,
printing, package hydration and responsive first paint. Twenty-eight before/after capture pairs
are byte-identical: initial, expanded and collapsed accordions at 390/768/1280/1920 pixels in
English/Persian, plus print at 390/1280 pixels in both languages. Capture probes verify initial
expansion, single-open behavior, Space/Enter toggling, contact navigation, Back-navigation heading
focus and WhatsApp link attributes without opening the external destination. The first probe
retry corrected a temporary main-focus assertion to the existing heading-focus contract.
Captures use fixed time, decoded images and normalized scroll. Representative Persian phone and
English desktop captures were visually inspected. No screenshot baselines/tolerances, package
contents or generated styles changed. The full browser/device suites, known TV arrow-navigation
failures and unrelated snapshot failures were not rerun. The next stage extracts the policy page
layout with heading, document and navigation slots.

**Fortieth checkpoint verified:** StorefrontPolicyLayout is extracted under
`templates/app/layouts/StorefrontPolicyLayout/`. It receives heading, policy navigation, notice,
table of contents and document slots. It owns the main focus target, page header, notice spacing,
responsive policy columns and document wrapper. The View retains localized navigation labels,
policy links/current state, sample notice, sticky contents navigation, section anchors and
document headings/paragraphs/lists. Policy logic retains document selection/fallback, section
mapping and Persian numbering; shared logic retains routing, locale, SEO, focus and sticky
measurements. No page behavior, copy or styles changed. Build, generated-file/format/CSS checks,
the full unit/type/package suite and production app build pass. Twenty-two focused browser cases
pass across policy switching, accessibility, delivery-rule content, unknown routes, sign-in links,
package hydration and responsive first paint. Twenty-eight before/after capture pairs are
byte-identical: all five policies at 390/1280 pixels in English/Persian, shipping at 768/1920
pixels in both languages, and shipping print at 390/1280 pixels in both languages. Capture probes
verify one active policy link, matching contents/section headings, native section navigation
without a document reload and retained policy selection after reloading phone routes. Captures
use fixed time, decoded images and normalized scroll; representative Persian phone shipping and
English desktop privacy captures were visually inspected. No screenshot baselines/tolerances,
package contents or generated styles changed. The full browser/device suites, known TV
arrow-navigation failures and unrelated snapshot failures were not rerun. The next stage extracts
the journal page layout with heading, search, stories and pagination slots.

**Forty-first checkpoint verified:** StorefrontJournalLayout is extracted under
`templates/app/layouts/StorefrontJournalLayout/`. It receives heading, search, feedback, featured,
stories and pagination slots and owns the main focus target, header/search wrappers and responsive
article grid. The View retains category chips and focus scrolling, search controls, empty/loading
feedback, conditional featured card, article cards and pagination controls. Journal logic retains
category/query state, matching, page clamping, first-page resets, URL navigation, story mapping
and localized metadata; shared page logic retains locale, SEO and focus. No page behavior, copy
or styles changed. Build, generated-file/format/CSS checks, the full unit/type/package suite and
production app build pass. Eighteen focused browser cases pass across pagination URLs/reloads,
search reset, bilingual loading/accessibility, package hydration and responsive first paint.
Twenty-eight before/after capture pairs are byte-identical: first/second pages at
390/768/1280/1920 pixels in both languages, plus search-result, empty and loading states at
390/1280 pixels in both languages. Capture probes verify article navigation without reloading,
Back-navigation heading focus, page-two reloads, category reset to page one and empty-state clear
recovery. Captures use fixed time, decoded images and normalized scroll. Representative Persian
phone first-page and English desktop search-result captures were visually inspected. No
screenshot baselines/tolerances, package contents or generated styles changed. The full
browser/device suites, known TV arrow-navigation failures and unrelated snapshot failures were
not rerun. The next stage extracts the post page layout with article, actions and related-story
slots.

**Forty-second checkpoint verified:** StorefrontPostLayout is extracted under
`templates/app/layouts/StorefrontPostLayout/`. It receives feedback, article, actions,
recommendations and related-story slots with externally controlled article visibility. It owns
the main focus target, reading-width wrapper, article/actions wrappers and recommendation/related
sections. The View retains loading/missing feedback, back link, headings/metadata, block/classic
content, copy/shop actions, social links, product cards and related-story cards. Post logic
retains article selection, block/product/related mapping, localized metadata, share URLs, copy
state and timer cleanup; shared logic retains routing, locale, SEO and focus. No page behavior,
copy or styles changed. Build, generated-file/format/CSS checks, the full unit/type/package suite
and production app build pass. Twenty focused browser cases pass across bilingual post loading
accessibility, product-code identity across collections, package hydration and responsive first
paint. Twenty-eight before/after capture pairs are byte-identical: classic and block articles at
390/768/1280/1920 pixels in both languages, plus a second block article, missing and loading states
at 390/1280 pixels in both languages. Capture probes verify copy payload/feedback/reset with a
stubbed clipboard, share URL/target attributes, shop/product/related links, heading focus and
journal recovery; external social destinations were not opened. Captures use fixed time, decoded
images and normalized scroll. Representative Persian phone classic and English desktop block
captures were visually inspected. No screenshot baselines/tolerances, package contents or
generated styles changed. The full browser/device suites, known TV arrow-navigation failures
and unrelated snapshot failures were not rerun. The next stage extracts the home page layout
with its storefront section slots.

**Forty-third checkpoint verified:** StorefrontHomeLayout is extracted under
`templates/app/layouts/StorefrontHomeLayout/`. It receives top/categories, featured, occasions,
arrivals, weddings, journal and newsletter slots with externally controlled optional visibility.
It owns the main focus target, ordered sections, static labelled-by targets, spacing and the
featured/wedding/newsletter bands. The View retains headings, collection carousels, controls,
cards, favorite callbacks, wedding actions and newsletter form/feedback. Home logic retains
collection ordering/mapping, product identity, feature availability and newsletter validation,
submission, persistence and focus; shared logic retains navigation, locale, SEO and carousel
behavior. No page behavior, copy or styles changed. Build, generated-file/format/CSS checks,
the full unit/type/package suite and production app build pass. Twenty-eight focused browser
cases pass across home collections/carousels/links, newsletter validation/persistence/prefill,
product-code identity, package hydration and responsive first paint. Thirty-two before/after
capture pairs are byte-identical: normal, newsletter validation and demo success at
390/768/1280/1920 pixels in both languages, plus stubbed newsletter failure and optional sections
disabled at 390/1280 pixels in both languages. Capture probes verify retry payload, draft/error
focus, success persistence, favorite toggle/restoration, native touch carousel swipes and
phone/tablet rotation without document overflow. Feature-off previews override only the served
configuration response; source configuration is unchanged. No real subscription was sent.
An initial probe assumed the first featured item was unsaved; correcting it to respect the demo's
saved defaults required no app change. The eight completed failure/visibility pairs were retained
while the remaining captures/probes reran. Captures use fixed time, decoded images and normalized
scroll; the representative English desktop normal capture was visually inspected. No screenshot
baselines/tolerances, package contents or generated styles changed. The full browser/device
suites, known TV arrow-navigation failures and unrelated snapshot failures were not rerun.
The next stage extracts the not-found page layout with recovery and recommendation slots.

**Forty-fourth checkpoint verified:** StorefrontNotfoundLayout is extracted under
`templates/app/layouts/StorefrontNotfoundLayout/`. It receives message, recovery actions,
recommendation heading and recommendation slots. It owns the main focus target, centered
message/actions wrappers, recommendation section and responsive product grid. The View retains
localized empty-state content, home/search links, recommendation heading and product cards.
Not-found logic retains product selection/order, product-code identity and image/price/stock
mapping; shared logic retains invalid-route handling, routing, locale, SEO and focus. No page
behavior, copy or styles changed. Build, generated-file/format/CSS checks, the full
unit/type/package suite and production app build pass. Eighteen focused browser cases pass across
invalid-policy entry, product-code identity, package hydration and responsive first paint.
Twenty before/after capture pairs are byte-identical: direct entry at 390/768/1280/1920 pixels
in English/Persian, plus invalid-policy, invalid-product and unknown-view entry at 390/1280 pixels
in both languages. Capture probes verify home/search recovery, query entry, Back-navigation
heading focus, recommendation links and navigation without document reload. Direct phone/desktop
entries pass bilingual axe scans. The initial probe corrected a temporary search-field focus
assumption to the existing heading-focus contract without changing app behavior. Captures use
fixed time, decoded images and normalized scroll; representative Persian phone direct and
English desktop invalid-policy captures were visually inspected. No screenshot baselines/
tolerances, package contents or generated styles changed. The full browser/device suites, known
TV arrow-navigation failures and unrelated snapshot failures were not rerun. The next stage
extracts the error page layout with message and recovery-action slots.

**Forty-fifth checkpoint verified:** StorefrontErrorLayout is extracted under
`templates/app/layouts/StorefrontErrorLayout/`. It receives message and recovery-action slots
and owns the main focus target and centered message/actions wrappers. The View retains the
localized empty state and retry/home/phone controls. Error logic retains reload behavior and
localized phone wording with bidi isolation; shared logic retains routing, locale, SEO and
focus. The shared lazy-page load-failure boundary remains separate. No page behavior, copy or
styles changed. Build, generated-file/format/CSS checks, the full unit/type/package suite and
production app build pass. Fourteen focused browser cases pass across retry, home/phone links,
noindex metadata, package hydration and responsive first paint. Sixteen before/after capture
pairs are byte-identical: routed pages at 390/768/1280/1920 pixels in English/Persian, standalone
English previews at the same four widths, and print at 390/1280 pixels in both languages.
Capture probes verify actual retry reloads with the URL retained, home recovery with the existing
routed/standalone document behavior, phone-link attributes/bidi isolation and noindex metadata.
Routed phone/desktop entries pass bilingual axe scans. No phone link was opened. Captures use
fixed time, decoded images and normalized scroll; the representative Persian phone routed
capture was visually inspected. No screenshot baselines/tolerances, package contents or generated
styles changed. The full browser/device suites, known TV arrow-navigation failures and unrelated
snapshot failures were not rerun. The next stage extracts the presentation page's outer layout
and major region slots.

**Forty-sixth checkpoint verified:** StorefrontPresentationLayout is extracted under
`templates/app/layouts/StorefrontPresentationLayout/`. It receives hidden heading, toolbar,
catalog, display, overlays and feedback slots with externally controlled density and catalog
visibility. It owns the main focus target, density attribute, hidden heading, sticky toolbar
and catalog wrappers. The View retains the bare Shell, density provider, offline preparation
effect, Display/Label/QR helpers, controls, catalog tiles, dialogs, viewer and toast region.
Presentation logic retains device/display/playback state, search, collections, seller workflows,
stock, persistence and callbacks. No page behavior, copy or styles changed. Build, generated-file/
format/CSS checks, the full unit/type/package suite and production app build pass. Sixty-two
focused browser cases pass: all 44 presentation cases on phone/desktop, six dedicated bilingual
phone/tablet/TV input and responsive cases, plus package hydration/responsive first paint.
Thirty-two before/after capture pairs are byte-identical: quiet display/catalog at
390/768/1280/1920 pixels in both languages, paired display at 1280/1920 pixels in both languages,
and seller tools/viewer/empty states at 390/1280 pixels in both languages. Capture probes verify
catalog resume, seller/viewer focus restoration, empty-state clear and paired-to-portrait layout.
One full-page viewer capture differed in an inert lazy image below the fixed modal viewport;
repeating the four viewer pairs as viewport captures resolves it without code or tolerance
changes. The other 28 completed pairs are retained. Captures use fixed time, decoded images,
normalized scroll, controlled display preferences and the existing software-rendering path.
Representative Persian TV quiet-display and English phone viewer captures were visually
inspected. No screenshot baselines/tolerances, package contents or generated styles changed.
The full browser/device suites, production offline/service-worker checks, known storefront TV
add-to-bag arrow failures and unrelated snapshot failures were not rerun. The next stage extracts
the presentation catalog composition into a storefront organism.

**Forty-seventh checkpoint verified:** StorefrontPresentationCatalog is extracted under
`templates/app/organisms/StorefrontPresentationCatalog/`. It receives tile data/callbacks,
controlled empty/price visibility, localized labels, clear callback and label renderer. It owns
tile list/buttons, pictures, Ready badges, optional prices, shortlist controls and empty-state
composition. The View retains the shared Label helper through the renderer, toolbar, viewer/
dialogs, density provider and offline preparation. Presentation logic retains filtering, tile
ordering, product-code identity, quoted prices, shortlist state, viewer actions and device
persistence. No page behavior, copy or styles changed. Build, generated-file/format/CSS checks,
the full unit/type/package suite and production app build pass. Forty focused browser cases
pass across counter search/quotes/handoff, sharing, price visibility, PIN-protected search recovery,
narrow controls, tile labels, sold-out handling, shortlist Undo, seller tools/collections,
package hydration and responsive first paint. Thirty-two before/after capture pairs are
byte-identical: catalog and code-filtered results at 390/768/1280/1920 pixels in both languages,
plus empty, hidden-price, starred and viewer states at 390/1280 pixels in both languages. Capture
probes verify native touch tile opening, viewer focus return, phone/tablet rotation without
document overflow, shortlist toggle/restoration and empty recovery preserving protected filters.
Catalog phone/desktop entries pass bilingual axe scans. Three initial phone pairs differed by
88–130 pixels confined to the unchanged category toolbar; repeating those three resolves the
differences without code or tolerance changes. The other 29 completed pairs are retained.
Captures use fixed time, decoded images, normalized scroll and the existing software-rendering
path; the representative Persian phone filtered capture was visually inspected. No screenshot
baselines/tolerances, package contents or generated styles changed. The full browser/device
suites, production offline checks, known storefront TV add-to-bag arrow failures and unrelated
snapshot failures were not rerun. The next stage extracts the presentation toolbar composition
into a storefront organism.

**Forty-eighth checkpoint verified:** StorefrontPresentationToolbar is extracted under
`templates/app/organisms/StorefrontPresentationToolbar/`. It receives a controlled search
descriptor, category label/items, result-count text and explicit resume/scan/shortlist/order/
start-over/settings action descriptors. It owns search/category/status/control composition,
existing IDs/classes, accessible labels and callback wiring. Layout sticky/density/visibility
wrappers remain unchanged. View/logic retain query/category state, capability checks, count
formatting, customer state, submission, panel actions and resume/reset behavior. No page behavior,
copy or styles changed. Build, generated-file/format/CSS checks, the full unit/type/package suite
and production app build pass. Forty-two focused browser cases pass across query/filter recovery,
narrow controls, quotes/handoff, scanning, PIN access, shortlist/customer Undo, seller tools,
TV keyboard controls, collections, package hydration and responsive first paint. Thirty-two
before/after comparisons are byte-identical: normal/query toolbars at 390/768/1280/1920 pixels
in both languages, category/customer/scan-unavailable toolbars at 390/1280 pixels in both languages,
and settings viewports at 390/1280 pixels in both languages. Capture probes verify native touch
settings access, focus return, rotation without overflow, query submission, category reset,
customer reset/Undo and resume display. Normal phone/desktop entries pass bilingual axe scans;
scan capability is controlled by a browser test double. Three initial phone pairs differed by
1–130 pixels with channel differences at most 2/255 at edges/blurred background. Repeating those
three with scroll normalized to zero resolves them without code or tolerance changes; matching
geometry was confirmed and the other 29 completed pairs retained. Captures use fixed time,
decoded images and the existing software-rendering path. Representative Persian phone normal
and English phone settings captures were visually inspected. No screenshot baselines/tolerances,
package contents or generated styles changed. The full browser/device suites, production offline
checks, known storefront TV add-to-bag arrow failures and unrelated snapshot failures were not
rerun. The next stage extracts the presentation display composition into a storefront organism.

**Forty-ninth checkpoint verified:** StorefrontPresentationDisplay is extracted under
`templates/app/organisms/StorefrontPresentationDisplay/`. It receives controlled mode/direction,
visible/preload products, caption/price visibility, localized labels and image/navigation/tools
callbacks. It owns display/paired/empty/fallback composition, captions, preload pictures, seller
controls, image-decode reporting, pointer tracking and the existing four-second control-reveal
timer with cleanup. View/logic retain collection selection, product identity, slide scheduling,
failure interpretation/retry, persistence, device state and seller panels. No page behavior,
copy or styles changed. Build, generated-file/format/CSS checks, the full unit/type/package suite
and production app build pass. Sixty-two focused browser cases pass: all 44 presentation cases,
six dedicated bilingual phone/tablet/TV input and responsive cases, plus package hydration and
responsive first paint. Thirty-two before/after capture pairs are byte-identical: code captions
at 390/768/1280/1920 pixels in both languages, paired display at 1280/1920 pixels in both languages,
price/hidden-price/fallback/empty states at 390/1280 pixels in both languages, photo-only TV
captions and revealed phone controls in both languages. Capture probes verify native touch
navigation without revealing controls, paired-to-portrait layout, next-design callbacks and
bilingual photo retry after controlled image failures. Captures use fixed time, decoded images,
normalized scroll, controlled preferences and the existing software-rendering path; representative
English desktop pair and Persian phone controls captures were visually inspected. No screenshot
baselines/tolerances, package contents or generated styles changed. The full browser/device
suites, production offline checks, known storefront TV add-to-bag arrow failures and unrelated
snapshot failures were not rerun. The next stage extracts the presentation viewer composition
into a storefront organism.

**Fiftieth checkpoint verified:** StorefrontPresentationViewer is extracted under
`templates/app/organisms/StorefrontPresentationViewer/`. It receives controlled items/index,
calm/price/options/playback flags, localized labels, a label renderer and navigation/close/options
callbacks. It owns lightbox captions, active-quote/base-price rendering, size/extra choices and
shortlist/order/send action composition. View/logic retain the shared label, quote calculation,
variant selection, stock checks, customer state, sharing and playback/calm state. No page behavior,
copy or styles changed. Build, generated-file/format/CSS checks, the full unit/type/package suite
and production app build pass. Thirty distinct focused browser cases pass across quoting,
shortlist/order handoff, sharing selected options, hidden prices, sold-out restrictions, live stock,
slideshow/calm captions, scanning, package hydration and responsive first paint. The initial calm
case needed one retry after `#main` failed to appear during page startup; its subsequent separate
run passes with retries disabled. Thirty-two before/after viewport pairs are byte-identical:
normal/options-open viewers at 390/768/1280/1920 pixels in both languages, plus configured quotes,
added-to-order, sold-out and hidden-price viewers at 390/1280 pixels in both languages. Capture
probes verify touch opening/options, selected chips, focus return and tablet rotation without
overflow; bilingual phone/desktop options pass axe scans. Six additional bilingual phone/tablet/
large-screen probes verify native touch swipes or keyboard navigation and close/focus return.
Captures use fixed time, decoded images, normalized scroll and the existing software-rendering
path; representative Persian phone options and English desktop configured captures were visually
inspected. No screenshot baselines/tolerances, package contents or generated styles changed.
The full browser/device suites, production offline checks, known storefront TV add-to-bag arrow
failures and unrelated snapshot failures were not rerun. The next stage extracts the presentation
send/share dialog into a storefront organism.

**Fifty-first checkpoint verified:** StorefrontPresentationSend is extracted under
`templates/app/organisms/StorefrontPresentationSend/`. It receives a nullable send descriptor,
localized action labels and a close callback. It owns dialog/QR/tag, warning/body and share/copy/
print composition, retaining the existing memoized shared QR encoder. View/logic retain link
construction and quoted options, stock/customer state, length validation, clipboard capability,
copied timing and browser printing. No page behavior, copy or styles changed. Build, generated-
file/format/CSS checks, the full unit/type/package suite and production app build pass. Twenty-four
focused browser cases pass across quotes, shortlist/order handoff, customer-phone sharing, hidden
prices, live stock, handed-shortlist clearing, package hydration and responsive first paint.
Thirty-six before/after viewport pairs cover: product sharing at 390/768/1280/1920
pixels in both languages, plus shortlist/order sharing, copied feedback, clipboard absence,
oversized shortlist/order warnings and print-media product dialogs at 390/1280 pixels in both languages. Thirty-five pairs are
byte-identical; one Persian desktop oversized-order pair retains 119 differing pixels at most
1/255 in the blurred catalog background, outside the unchanged dialog. Three initial warning
pairs differed; two resolved on focused rechecks, retaining all other completed pairs. No
tolerances were changed.
Probes verify exact QR viewBox/path against each customer URL, quoted size/extra parameters,
shortlist/order payloads, safe link attributes, copy/print callbacks, suppression of invalid handoff
links, touch opening and close returning focus within the restored viewer. Bilingual phone/desktop
product/shortlist/order dialogs pass axe scans. Clipboard/print use browser test doubles and
oversized states use controlled presentation data through a test-only response hook. The pre-change
preview is proxied through the same visible origin so QR payloads remain identical; no maintained
source is modified by these fixtures. Captures use fixed time, decoded images, normalized scroll
and the existing software-rendering path; representative Persian phone product sharing, Persian desktop warning and English
print/PDF captures were visually inspected. Print verification exposed an existing defect in both
versions: the more specific `body:has(.vf-presentation-tag) *` visibility rule overrides the tag
visibility rule, leaving print screenshots and the rendered PDF blank. Print callbacks and parity
are verified; successful printed tag output is not. No screenshot baselines/tolerances, package contents
or generated styles changed. The full browser/device suites, production offline checks, known
storefront TV add-to-bag arrow failures and unrelated snapshot failures were not rerun. The next
stage fixes blank tag printing before extracting the presentation shortlist dialog.

**Fifty-second checkpoint verified:** Presentation tag printing is repaired in
`templates/storefront-presentation/styles.css`, with its runtime CSS regenerated by the build.
The page-hiding selector now uses `:where()` so the tag/descendant visibility rule wins. Non-tag
body roots leave print layout, preventing the hidden catalog from generating additional pages.
The six-centimeter tag, QR payload, product-code identity, language direction and screen styles
remain unchanged. Four bilingual phone/desktop regression cases reproduced the blank tag before
the fix and pass afterward. They verify the print callback, visible QR/code and every tag
descendant, unchanged QR path, physical width and inline-start placement, hidden controls/catalog,
compact print layout and return to the share/viewer/catalog screens. Test locators explicitly
retain the surrounding dialog while its own print visibility is intentionally hidden. Six focused
existing cases for ordinary page printing, quotes/order handoff and customer-phone sharing also
pass. The full unit/type/package suite, production app build and generated-file/format/CSS checks
pass. Eight before/after screen comparisons are byte-identical at 390/768/1280/1920 pixels in both
languages; capture probes retain quoted size/extras and check QR paths and bilingual phone/desktop
accessibility. Sixteen A4/Letter PDF exports across those widths/languages each contain one page.
Rendered English phone A4, English desktop Letter and Persian large-screen Letter samples were
visually inspected: QR and code are visible without clipping or background catalog content.
The capture harness was corrected to wait for pending route handlers before context cleanup,
retaining its first three successful pairs; Chrome PDF export is not treated as proof of keyboard
focus restoration or physical-printer output. No screenshot baselines/tolerances or published
package contents changed. The full browser/device suites, production offline checks, known
storefront TV add-to-bag arrow failures and unrelated snapshot failures were not rerun. The next
stage extracts the presentation shortlist dialog into a storefront organism.

**Fifty-third checkpoint verified:** StorefrontPresentationShortlist is extracted under
`templates/app/organisms/StorefrontPresentationShortlist/`. It receives controlled open/items/
price visibility, localized labels, a label renderer and close/clear/send callbacks, with explicit
show/remove callbacks on each item. It owns comparison cards, pictures, optional prices, item
controls, dialog/footer and empty-state composition. View/logic retain shared labels, product
identity and stock, shortlist membership/order, viewer source/index, clear/Undo, customer reset
and sharing/handoff state. No behavior, copy or styles changed. The full unit/type/package suite,
production app build and generated-file/format/CSS checks pass. Fourteen focused browser cases
pass across quotes/order handoff, shortlist clear/Undo, next-customer reset, handed-shortlist
clearing, price visibility and sold-out restrictions. Sixteen before/after viewport pairs are
byte-identical: populated shortlists containing ordinary/Ready/sold-out products at 390/768/1280/
1920 pixels in both languages, plus empty and hidden-price states at 390/1280 pixels in both
languages. Bilingual probes verify native touch opening/actions, removal followed by the correct
viewer mapping, customer links containing the remaining ordered IDs, clear/Undo, remove-to-empty,
close/focus return and tablet rotation without document overflow. Populated/empty phone/desktop
dialogs pass bilingual axe scans. One initial empty desktop pair differed by 149 pixels at most
1/255 in the blurred catalog background; a focused recheck is exact, retaining the other 15 pairs
without code or tolerance changes. Captures use fixed time, decoded images, normalized scroll and
the existing software-rendering path; representative Persian phone and English desktop populated
captures were visually inspected. No screenshot baselines/tolerances, package contents or generated
styles changed. The full browser/device suites, production offline checks, known storefront TV
add-to-bag arrow failures and unrelated snapshot failures were not rerun. The next stage extracts
the presentation order dialog into a storefront organism.

**Fifty-fourth checkpoint verified:** StorefrontPresentationOrder is extracted under
`templates/app/organisms/StorefrontPresentationOrder/`. It receives controlled open/lines/price
visibility/total/handoff eligibility, localized labels, a quantity formatter and close/clear/handoff
callbacks, with quantity-change/removal callbacks on each line. It owns dialog/footer, LineItem
mapping, optional prices/total and empty-state composition. View/logic retain quoted configurations,
quantity/order mutations, stock interpretation, available-line totals, handoff eligibility/payloads,
clear/Undo and customer isolation. Size/extra choice remains in the viewer. No behavior, copy or
styles changed. The full unit/type/package suite, production app build and generated-file/format/
CSS checks pass. Fourteen focused browser cases pass across quotes/order handoff, customer-phone
sharing, hidden prices, live stock revalidation, sold-out restrictions and next-customer reset.
Twenty-four before/after viewport pairs cover populated orders at 390/768/1280/1920 pixels in both
languages plus empty, hidden-price, mixed-stock and all-sold-out orders at 390/1280 pixels in both
languages. Twenty-three pairs are byte-identical. Three initial pairs differed by 1–127 pixels at
most 1/255 in background rendering; focused rechecks resolve both phone pairs. The empty desktop
pair retains three pixels at most 1/255 in the blurred catalog background; an additional capture
of the dialog itself is byte-identical. The other 21 original exact pairs are retained; no code,
baseline or tolerance changes were made to address capture noise. Bilingual probes verify native
touch opening/quantity/removal, expected localized totals, removal followed by the correct handoff
payload, clear/Undo, remove-to-empty, close/focus return and tablet rotation without document
overflow. Stock captures use controlled in-page catalog fixtures; the existing browser stock
regression separately verifies live API refresh. Mixed-stock totals/payloads exclude unavailable
lines; all-sold-out totals are zero and handoff is absent. Populated/empty/all-sold-out phone/desktop
dialogs pass bilingual axe scans. Captures use fixed time, decoded images, normalized scroll and
the existing software-rendering path; representative Persian phone populated and English desktop
all-sold-out captures were visually inspected. No screenshot baselines/tolerances, package contents
or generated styles changed. The full browser/device suites, production offline checks, known
storefront TV add-to-bag arrow failures and unrelated snapshot failures were not rerun. The next
stage extracts the presentation tag-scanning dialog into a storefront organism.

**Fifty-fifth checkpoint verified:** StorefrontPresentationScan is extracted under
`templates/app/organisms/StorefrontPresentationScan/`. It receives controlled open state,
localized title/body labels, warning text, the existing video ID and a close callback. It owns
scan-dialog instructions, muted inline video and optional warning composition. View/logic retain
the video ID contract, capability checks, camera acquisition/attachment/playback, QR polling and
interpretation, viewer navigation, errors and stream/timer cleanup. No behavior, copy or styles
changed. The full unit/type/package suite, production app build and generated-file/format/CSS
checks pass. Ten focused browser cases pass across successful tag scanning, bilingual narrow
customer tools and seller-dialog accessibility/focus. Sixteen before/after viewport pairs cover
active scanning at 390/768/1280/1920 pixels in both languages plus unknown-code and blocked-camera
warnings at 390/1280 pixels in both languages. Fifteen full viewports are byte-identical. Three
initial desktop captures differed by 3–74 pixels at most 1/255 in blurred background rendering;
focused recaptures resolve both Persian pairs. The English active desktop viewport retains three
pixels at most 1/255 in the background; all three affected dialog-region comparisons are exact.
The other 13 original exact pairs are retained without code, baseline or tolerance changes.
Bilingual probes verify the existing video ID and muted/playsInline attributes, environment-facing
video-only constraints, stream attachment/playback, close/focus return, stopped tracks/polling,
fresh streams after reopening, successful scans from active/unknown/blocked states, recovery after
camera denial, late-permission cleanup after closing, and cleanup when navigating away. Tablet
rotation produces no document overflow; active/warning phone/desktop dialogs pass bilingual axe
scans. Camera/decoder behavior uses canvas streams and test doubles; no hardware camera or native
permission UI was tested. Captures use fixed time, decoded images, normalized scroll and the
existing software-rendering path; representative Persian phone active and English desktop blocked
captures were visually inspected. No screenshot baselines/tolerances, package contents or generated
styles changed. The full browser/device suites, production offline checks, known storefront TV
add-to-bag arrow failures and unrelated snapshot failures were not rerun. The next stage extracts
the presentation PIN-unlock dialog into a storefront organism.

**Fifty-sixth checkpoint verified:** StorefrontPresentationUnlock is extracted under
`templates/app/organisms/StorefrontPresentationUnlock/`. It receives controlled open/value/error,
localized title/hint labels and change/complete/close callbacks. It owns dialog and four-digit
CodeInput composition, preserving the input ID, autofocus and disabled Web OTP. View/logic retain
PIN storage/comparison, entry/error/reset state, settings access and cancellation; shared CodeInput
retains digit normalization/completion. No behavior, copy or styles changed. The full unit/type/
package suite, production app build and generated-file/format/CSS checks pass. Ten focused browser
cases pass across PIN setup/wrong/correct entry, bilingual PIN-protected filter recovery and seller
focus/accessibility. Sixteen before/after viewport pairs cover locked dialogs at 390/768/1280/1920
pixels in both languages plus partial and wrong-PIN states at 390/1280 pixels in both languages.
Fifteen full viewports are byte-identical. Three initial captures differed by 3–103 pixels at most
1/255 in blurred background rendering; focused recaptures resolve partial phone and wrong desktop
pairs. The locked English phone retains 103 pixels at most 1/255 in the background; all three
affected dialog-region comparisons are exact. The other 13 original exact pairs are retained
without code, baseline or tolerance changes. Bilingual probes verify autofocus, numeric/LTR/four-
digit attributes, partial entry, Persian-digit normalization, wrong-PIN rejection and cleared entry,
error removal on editing, correct completion, cancel/reset/focus return and repeated locking.
Device preferences/PIN/filter data remain unchanged across cancel and unlock. A credentials test
double verifies zero Web OTP requests, including when the API is available. Tablet rotation causes
no document overflow; locked/partial/error phone/desktop dialogs pass bilingual axe scans. Captures
use fixed time, decoded images, normalized scroll and the existing software-rendering path;
representative Persian phone locked and English desktop wrong-PIN captures were visually inspected.
No screenshot baselines/tolerances, package contents or generated styles changed. The full browser/
device suites, production offline checks, known storefront TV add-to-bag arrow failures and unrelated
snapshot failures were not rerun. The next stage extracts the presentation settings dialog into a
storefront organism.

**Fifty-seventh checkpoint verified:** StorefrontPresentationSettings is extracted under
`templates/app/organisms/StorefrontPresentationSettings/`. It receives controlled open/setup/start
eligibility, explicit localized labels, home link, number formatter, close/start callbacks and
fullscreen/collection/display/toggle/transfer/PIN control descriptors. Neither the page model nor
the stored PIN is passed. It owns dialog/footer, setup instructions, collection selection/search/
preview/save controls, playback preferences, switches, transfer disclosure and PIN-draft/set UI.
The View formats eligible-count text; logic retains validation, normalization, eligibility,
persistence, shortlist application, import/export filtering, PIN checks and browser operations.
No behavior, copy or styles changed. The full unit/type/package suite, production app build and
generated-file/format/CSS checks pass. All 48 presentation browser cases and 14 additional focused
PIN/filter/price/narrow-tool cases pass without retries. Twenty-four before/after viewport pairs
are byte-identical: ordinary settings at 390/768/1280/1920 pixels in both languages, setup and empty
collections at 390 pixels, category and saved/PIN states at 1280 pixels, and selected collections
and invalid transfer states at 390/1280 pixels, all bilingual. Three nonidentical captures were
independently rechecked: a one-pixel background difference at 1/255, 18 textarea-edge pixels at
1/255 and an initially different saved-PIN viewport. Recaptured full viewports and separate visible-
modal captures are exact without source, baseline or tolerance changes. Actual PNG bytes were
checked against every final comparison record. Probe corrections target visible native-control
labels and change saved selections between two collections; a resume-script mistake was stopped,
completed records recovered from logs, and only unfinished cases resumed. The completed functional
probes verify touch control activation, persistence/reload of presets/layout/captions/timing and all
preference switches, fullscreen enter/exit and start-fullscreen callbacks, wake requests, setup
completion/start, category/selected/shortlist selection and search, checkbox eligibility/empty-state
recovery, collection save/load/delete, PIN save/remove, invalid/valid import, unchanged local PIN
on import and exclusion of PIN/customer data from exports/share links. Web OTP makes zero requests.
Fullscreen/wake/credentials use browser test doubles. Tablet rotation has no document overflow;
settings/setup/selected/empty/transfer/PIN phone/desktop dialogs pass bilingual axe scans. Captures
use fixed time, decoded images, normalized page scroll and the existing software-rendering path;
representative Persian phone settings/transfer and English desktop saved-PIN captures were visually
inspected. No screenshot baselines/tolerances, package contents or generated styles changed. The
full browser/device suites, production offline checks, known storefront TV add-to-bag arrow failures
and unrelated snapshot failures were not rerun. The next stage extracts the presentation seller-
tools dialog into a storefront organism.

**Fifty-eighth checkpoint verified:** StorefrontPresentationTools is extracted under
`templates/app/organisms/StorefrontPresentationTools/`. It receives controlled open/close state,
explicit labels, offline progress/status, online/photo/stock state, setup/device descriptors and
seller action callbacks. Optional scan/start-over descriptors preserve conditional actions.
Dialog structure, width/placement, live status/data attribute, alerts, stock timestamp isolation,
retry disabled state, icons and action order are preserved. View retains offline preparation and
localized progress/device text; logic retains capability decisions, PIN gates, stock/photo recovery,
customer state, navigation and persistence. No state, browser effects or page-model imports move
into the organism. Unit/type/package tests, production app build and generated/format/CSS checks
pass, along with all 48 presentation browser cases without retries. These cover bilingual focus
restoration and connections, photo retry, setup/settings, TV remote navigation and playback pause.
Sixteen bilingual before/after viewport and visible-dialog pairs are byte-identical: ordinary tools
at 390/768/1280/1920 pixels and preparing/offline states at 390/1280 pixels. All compared states pass
axe checks; phone rotation has no document overflow and setup actions open the correct dialog.
Offline preparation states use a browser-only helper response fixture; connection warnings use real
browser offline mode. A synthetic offline event initially left navigator.onLine unchanged; only
unfinished comparisons were resumed with browser offline mode, preloading fonts/images before
disconnecting. Actual PNG bytes were checked for every comparison record. Representative Persian desktop and
phone captures were visually inspected. No baselines, tolerances, generated styles or published
package contents changed. The full browser/device suites and production service-worker preparation
were not rerun. Next: extract the shared presentation product-label composition into a storefront
molecule.

**Fifty-ninth checkpoint verified:** StorefrontPresentationLabel is extracted under
`templates/app/molecules/StorefrontPresentationLabel/`, establishing the app molecule location for
small storefront-owned combinations. Catalog, viewer and shortlist keep their existing renderer
slots; View supplies only code, sold-out state, localized sold-out label and the large variant.
The molecule preserves stacked markup, LTR/nonwrapping product code, display typography and
compact/inverse status classes. Product selection, pricing, stock interpretation, localization and
actions remain in View/logic and parent organisms. No page model, browser effects, package exports,
styles or generated files changed. Unit/type/package tests, production app build and generated/
format/CSS checks pass. Ten focused desktop/mobile browser cases pass without retries, covering
catalog accessible names, sold-out viewer purchase restrictions, stock changes before handoff and
shortlist clear/Undo. Bilingual before/after probes cover catalog, sold-out viewer and mixed
available/sold-out shortlists at 390/768/1280/1920 pixels, with touch at narrow widths, LTR and
nonwrapping code assertions, available-viewer status removal, tablet rotation and axe scans.
All 24 label crops are byte-identical; 23 of 24 full viewport pairs are exact after a focused
recapture of two catalog cases. The remaining Persian TV catalog capture differs at 104 image-edge
pixels by at most 6/255; its extracted label is exact. The initial Persian desktop catalog difference
(78 pixels, at most 6/255) recaptured exactly. All final PNG bytes were verified against the recorded
results. Representative Persian phone viewer and desktop/TV catalog captures were visually inspected.
No screenshot baselines or tolerances changed. The full presentation/browser/device suites and
production offline preparation were not rerun.
Next: extract the home category-navigation section into a storefront organism.

**Sixtieth checkpoint verified:** StorefrontHomeCategories is extracted under
`templates/app/organisms/StorefrontHomeCategories/`. It composes the home h1 and circular category
carousel from explicit category records and heading, region, count and previous/next labels.
View retains normalization and count formatting; home logic retains category order, localized
names, image mapping and filter URLs. Existing CollectionCarousel retains measurement, scroll
state, RTL behavior and resizing. Fragment/card order, responsive settings, image sizes, classes,
heading level and labels are preserved. No page model, new state/effects, styles, package exports
or generated files move into the organism. Unit/type/package tests, production app build and
generated/format/CSS checks pass. Six existing desktop/mobile browser cases pass without retries,
covering home section order, category links, adjacent occasion filters and carousel navigation.
Bilingual before/after probes cover initial and advanced category rows at 390/768/1280/1920 pixels,
with touch activation at narrow widths and keyboard link activation on TV. They verify all twelve
localized links, accessible count/region, previous/next disabled states, forward/back scrolling,
category-filter URL navigation, rendered shop products, no document overflow, tablet rotation and
axe accessibility. All sixteen final section screenshot pairs are byte-identical, checked from actual
PNG bytes. Three initial scrolled captures differed only over a navigation button (at most 6/255);
focused recaptures after settling controls are exact without source, baseline or tolerance changes.
The probe also corrected query-relative URL resolution to use the current page URL. Representative
Persian phone scrolled and English TV initial captures were visually inspected. The full browser/
device suites and unrelated newsletter/product flows were not rerun.
Next: extract the home featured-design section into a storefront organism.

**Sixty-first checkpoint verified:** StorefrontHomeFeatured is extracted under
`templates/app/organisms/StorefrontHomeFeatured/`. It receives explicit product records, localized
labels, ready-filter URL and card frame, composing heading, responsive view-all links, description
and ProductCard carousel. View retains normalization/count formatting; home/shared logic retains
featured selection/order, product identity, prices, stock, images, links and favorite state/actions.
Layout retains optional visibility and section/band wrappers. Fragments, classes, responsive link
names/visibility, card/image sizing, badges and callbacks are preserved. No page model, new state,
browser effects, styles, published package contents or generated files changed. Unit/type/package
tests, production app build and generated/format/CSS checks pass. Four focused desktop/mobile
browser cases pass without retries, covering home section order/cards and ready-filter links/badges.
Bilingual before/after probes cover initial and favorite states at 390/768/1280/1920 pixels. They
verify four cards/badges, product-code naming, accessible counts, exactly one responsive view-all
link, localized ready-filter URLs, favorite add/reload/remove without navigation, carousel forward/
back behavior where overflowing, product detail navigation, four ready-filter results, touch taps,
TV Enter activation, tablet rotation, no document overflow and axe checks. The demo initially saves
the first featured design; probes normalize that state through the UI before testing transitions.
All sixteen section screenshot pairs are byte-identical, verified from actual PNG bytes. Probes
respect hidden arrows when all cards fit; only unfinished cases resumed after that correction.
Representative Persian phone favorite and English TV initial captures were visually inspected.
No screenshot baselines or tolerances changed. The full browser/device suites and unrelated
newsletter/payment flows were not rerun.
Next: extract the home occasion-navigation section into a storefront organism.

**Sixty-second checkpoint verified:** StorefrontHomeOccasions is extracted under
`templates/app/organisms/StorefrontHomeOccasions/`. It receives explicit occasion records, localized
heading/description/count/carousel labels and frame, composing the heading, description and square
CategoryCard carousel. View retains normalization and row-count formatting; home/shared logic
retains occasion order, localized names, per-occasion product counts, images and filter URLs.
Layout retains wrappers and the heading's labelled-by relationship; existing CollectionCarousel
retains measurement, RTL scrolling and resize behavior. Heading ID, fragments, classes, responsive
settings, image sizes, card counts/frame/aspect and callbacks are preserved. No page model, new
state/effects, styles, published package contents or generated files changed. Unit/type/package
tests, production app build and generated/format/CSS checks pass. Eight focused desktop/mobile
browser cases pass without retries, covering occasion links, carousel behavior, shop filtering and
home section order. Bilingual before/after probes verify four ordered labels/counts/filter URLs,
localized region/count, heading association, forward/back scroll and disabled states when
overflowing, hidden controls and no overflow when fitted, sympathy-filter navigation with two
products, touch taps, TV Enter activation, tablet rotation, no document overflow and axe checks.
All twelve section screenshot pairs are byte-identical, checked from actual PNG bytes: initial rows
at 390/768/1280/1920 pixels and advanced rows at 390/768 pixels, all in English/Persian. Representative
Persian phone advanced and English TV initial captures were visually inspected. No baselines or
tolerances changed. The full browser/device suites and unrelated newsletter/payment flows were
not rerun.
Next: extract the home studio-design section into a storefront organism.

**Sixty-third checkpoint verified:** StorefrontHomeStudio is extracted under
`templates/app/organisms/StorefrontHomeStudio/`. It receives explicit product records, localized
labels, shop URL and frame, composing heading, explore-all link, description and ProductCard
carousel. View retains normalization/count formatting; home/shared logic retains collection
selection/order and small-catalog fallback, product identity, prices, stock, images, URLs and
favorite state/actions. Layout retains section wrappers and heading association. Heading ID,
fragments, classes, responsive image/card sizing, first-two image priority, badges and callbacks
are preserved. No page model, new state/effects, styles, package exports or generated files changed.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Four focused
desktop/mobile browser cases pass without retries, covering home composition and existing featured/
ready-product flows. Bilingual before/after probes cover initial/favorite studio states at
390/768/1280/1920 pixels and verify five ordered product-code cards, badges/counts, heading ID,
first-two high-priority images, favorite add/reload/remove without navigation, forward/back
carousel behavior, product detail links, unfiltered shop navigation, touch taps, TV Enter
activation, tablet rotation, no document overflow and axe checks. The shop-navigation assertion
was corrected to respect its existing four-product first page rather than expect all six at once.
Fourteen of sixteen section screenshot pairs are byte-identical, verified against actual PNG bytes.
Two 1280-pixel favorite-state captures retain tiny image-edge differences after one focused recapture:
8 pixels up to 15/255 in English and 15 pixels up to 13/255 in Persian. Initial states and every
phone/tablet/TV pair are exact. No baselines or tolerances changed. Representative Persian phone
favorite and English TV initial captures were visually inspected. The full browser/device suites
and unrelated newsletter/payment flows were not rerun.
Next: extract the home wedding-promotion section into a storefront organism.

**Sixty-fourth checkpoint verified:** StorefrontHomeWeddings is extracted under
`templates/app/organisms/StorefrontHomeWeddings/`. It receives explicit localized labels and wedding/
contact destination URLs, composing eyebrow, associated heading/accent, description and navigation
links. View/logic retain content mapping, feature eligibility and localized URLs; layout retains
optional visibility, section wrappers and inverse band. Heading ID, fragments, flex wrapping,
typography/colors, primary-button icon and contact-link semantics/classes are preserved. No page
model, new state/effects, styles, package exports or generated files changed. Unit/type/package
tests, production app build and generated/format/CSS checks pass. Four focused desktop/mobile
browser cases pass without retries, covering the existing home composition/wedding link and
wedding inquiry validation/focus. Bilingual before/after probes at 390/768/1280/1920 pixels verify
heading association, localized link names/URLs, both wedding/contact destinations and arrival
forms, touch taps, TV Enter activation, tablet rotation, no document overflow and axe checks.
Feature-disabled desktop probes remove weddings through a browser-only store-config response
fixture and verify the promotion disappears while the studio section remains. Contact map tiles
use the existing test stub; no forms are submitted. The full browser/device suites and unrelated
payment/newsletter flows were not rerun. All eight section screenshot pairs are byte-identical,
verified from actual PNG bytes; representative Persian phone and English TV captures were visually
inspected. No screenshot baselines or tolerances changed.
Next: extract the home journal-preview section into a storefront organism.

**Sixty-fifth checkpoint verified:** StorefrontHomeJournal is extracted under
`templates/app/organisms/StorefrontHomeJournal/`. It receives explicit post records, localized
labels and journal URL, composing heading, read-journal link, description and stacked BlogCard
carousel. View retains normalization/count formatting; home/shared logic retains feature
eligibility, selection/order, images, localized titles/excerpts/metadata and article destinations.
Layout retains optional visibility, wrappers and heading association; shared CollectionCarousel
retains measurement, RTL navigation and resizing. Heading ID, fragments/classes, responsive
settings and BlogCard layout/frame/aspect/heading levels are preserved. The now-unused View
carousel import is removed. No page model, new state/effects, styles, published package contents
or generated files changed. Unit/type/package tests, production app build and generated/format/CSS
checks pass. Four focused desktop/mobile browser cases pass without retries, covering home article
navigation and journal pagination/search/language behavior. Bilingual before/after probes cover
initial/advanced journal rows at 390/768/1280/1920 pixels where scrolling applies. They verify three
ordered titles/excerpts/metadata records and localized article URLs, heading association, region/
count, carousel scroll/disabled states, hidden arrows on fitted rows, article title on arrival,
journal's seven-card first page, touch taps, TV Enter activation, tablet rotation, no document
overflow and axe checks. Feature-disabled desktop probes use a browser-only store-config response
fixture and verify the preview disappears while studio content remains. The full browser/device
suites and unrelated newsletter/payment flows were not rerun. All twelve section screenshot pairs
are byte-identical, verified from actual PNG bytes: initial rows at all four widths and advanced
rows at 390/768 pixels, all bilingual. Representative Persian phone advanced and English TV initial
captures were visually inspected. No screenshot baselines or tolerances changed.
Next: extract the home newsletter section into a storefront organism.

## Adding components

```sh
npm run new:component -- Name --level atoms
npm run new:component -- Name --level molecules --wording
npm run new:component -- Name --level organisms --no-css
```

One source folder holds the implementation, declarations, CSS (when needed), README, built-in
wording and browser fixture/spec. Use direct relative imports between components. The app imports
through `templates/app/ds.js`; package consumers still import named exports from
`@vendra/design-system`. There are no new per-layer package entry points.

The generator requires a layer and rejects duplicate component names. `npm test` checks that
foundations never depend on UI, lower layers never import higher layers or unmigrated components,
and migrated components do not import storefront code. Browser fixture lookup and package wording
checks discover nested components.

## Validating a batch

```sh
npm run build
npm run check
npm test
npm --prefix templates run build:app
npm --prefix templates run test:e2e -- --workers=2
```

Run the migrated components' own browser specs first for fast feedback, then the broader suite.
After moving component folders, restart an existing Vite preview before browser verification;
its cached CSS import graph can retain paths from before the move.
Review visual differences before changing baselines. Record the exact scope and failures; a
focused run does not prove the complete screenshot or device suite. Never edit generated `dist/`
or `_runtime/` files directly.
