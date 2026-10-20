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
   **Next stage: extract the policy page layout with heading, document and navigation slots.**
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
