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
   RadioGroup, Switch and Select. There are now 21 migrated atom folders.
   **Next stage: specialized form controls** (PhoneInput, CodeInput, QuantityInput, RangeSlider
   and ChoiceGroup with its ChoiceTile part).
4. **Molecules.** Migrate focused combinations such as SearchField, PromoCodeField and the smaller
   commerce cards. Reuse the atoms; extract repeated markup only when it has a clear shared role.
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
