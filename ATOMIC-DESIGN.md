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
| Templates | Layout and slots for page sections | Start from `templates/app/Shell.jsx`; extract layouts as pages migrate | UI layers; no account, catalog or payment persistence |
| Pages | Routed screens that supply content, state and actions | `templates/storefront-*/` | Layouts, UI layers and storefront services |

Classify by responsibility, not line count. Button can contain Icon and Spinner and still be a
basic action primitive. Keep tightly coupled parts in one folder (for example ChoiceGroup and
ChoiceTile). Do not split a React Aria widget just to make more layers. Components in one layer
may compose each other; avoid dependency cycles.

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
   Tabs and Stepper form the tab and step navigation batch: 27 molecule folders are now migrated.
   **Next stage: notices and tooltip molecules** (AnnouncementBar, OfflineNotice, Toast and Tooltip).
5. **Organisms.** Migrate substantial sections such as Gallery and OrderSummary. Extract shared
   header/footer sections from Shell with explicit props and callbacks.
6. **Templates and pages.** Separate layout slots from state, starting with product browsing,
   then bag/delivery, payment, account and the remaining information/display flows. Keep routed
   page names and the maintained `storefront-*` source folders.
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
