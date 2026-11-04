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
   StorefrontHomeNewsletter now composes the controlled form and completion status; all seven home
   sections delegate composition to app organisms.
   Newsletter submit announcements now reference a label that survives conditional form removal.
   StorefrontProductGallery now composes gallery, fullscreen action and controlled lightbox.
   StorefrontProductHeading now composes code/copy action, category/badge, price/stock and description.
   StorefrontProductConfiguration now composes controlled size/add-on groups.
   StorefrontProductPurchase now composes total/hint, quantity, save and responsive add controls.
   StorefrontProductCare now composes delivery text, optional inquiry link and care/delivery accordion.
   StorefrontProductRecent now composes the recent heading, carousel and product cards.
   StorefrontProductAdded now composes the controlled bag-confirmation dialog and actions.
   StorefrontProductSticky now composes the live total and add action in Shell's sticky slot.
   StorefrontShopCategories now composes sidebar category buttons and compact chips.
   StorefrontShopSidebarFilters now composes controlled occasion/date/price/stock fields.
   StorefrontShopFilterDialog now composes controlled compact fields and Show/Clear actions.
   StorefrontShopToolbar now composes compact filters/sort, active filters, quick chips and result count.
   StorefrontShopResults now composes product cards, paging and loading/error/empty feedback.
   StorefrontBagItems now composes editable line items and stock warnings.
   StorefrontBagSummary now composes totals, free-delivery progress, promo and navigation actions.
   StorefrontBagSticky now composes total and continuation controls in Shell’s sticky slot.
   StorefrontBagFeedback now composes removal notices and empty-state recovery in separate slots.
   StorefrontBagProgress now composes responsive controlled progress indicators.
   StorefrontBagRecipient now composes recipient heading, saved addresses and name/phone fields.
   StorefrontBagLocation now composes delivery map/status, fallback zone and address controls.
   StorefrontBagSchedule now composes delivery scheduling and changed-window confirmation.
   StorefrontBagCards now composes per-item card messages/add controls and Undo feedback.
   StorefrontBagSender now composes sender heading/hint and controlled contact fields.
   StorefrontBagDeliveryIntro now composes validation feedback and the guest sign-in prompt.
   StorefrontCheckoutDeliveryReview now composes delivery details and edit navigation.
   StorefrontCheckoutMethods now composes payment-method choices, availability and wallet context.
   StorefrontCheckoutReceipt now composes receipt details and changed-amount confirmation.
   StorefrontCheckoutSubmission now composes submission actions and processing/failure feedback.
   StorefrontCheckoutNotices now composes retry-review and recovery-storage notices.
   StorefrontCheckoutProgress and StorefrontCheckoutHeading now compose progress and payment heading.
   StorefrontCheckoutBank now composes bank progress and payment status.
   StorefrontCheckoutConfirmation now composes success details, account offer and follow-up links.
   StorefrontCheckoutSummary and StorefrontCheckoutSticky now compose totals and compact submission.
   StorefrontAccountOrders now composes account order cards and tracking links.
   StorefrontAccountBalanceOverview now composes the wallet amount and eligibility status.
   StorefrontAccountTopUp now composes controlled amount/preset/payment controls and feedback.
   StorefrontAccountBalanceHistory now composes empty/populated wallet history.
   StorefrontAccountSaved now composes saved product cards and empty-state recovery.
   StorefrontAccountAddresses now composes the saved-address map, cards and add action.
   StorefrontAccountReminders now composes reminder rows, actions and feedback.
   StorefrontAccountProfile now composes controlled profile fields and save action.
   StorefrontAccountAddressEditor now composes controlled address fields and pin/fallback.
   StorefrontAccountReminderEditor now composes controlled reminder/date fields.
   StorefrontAccountEditorDialog now composes shared editor feedback, fields and actions.
   StorefrontAccountHeading now composes the account eyebrow and h1/accent.
   StorefrontAccountTabs now composes controlled pill tabs and the selected panel slot.
   StorefrontAccountSessionAction now composes the controlled sign-out button.
   StorefrontAccountFeedback now composes the persistent account status region.
   StorefrontAccountNotices now composes the page storage-error alert.
   StorefrontAccountBalancePanel now composes overview, top-up, checkout return and history.
   Account View now composes organisms directly without redundant single-child fragments.
   StorefrontSigninHeading now composes phone/code step headings and introductions.
   StorefrontSigninPhoneControls now composes the phone summary, input and send action.
   StorefrontSigninCodeControls now composes the code summary, input and verify action.
   StorefrontSigninResend now composes countdown/action and resend status.
   StorefrontSigninPolicies now composes the localized terms/privacy note.
   StorefrontSigninCompletion now composes success feedback and continuation actions.
   StorefrontSigninChangeNumber now composes the controlled return-to-phone action.
   Sign-in View now passes layout/completion elements directly without redundant fragments.
   StorefrontTrackLookup now composes the controlled order-number/mobile lookup form.
   StorefrontTrackHeading now composes the order eyebrow, accented title and status introduction.
   StorefrontTrackPendingNotice now composes the pending-payment alert.
   StorefrontTrackProgress now composes the tracking timeline card.
   StorefrontTrackDeliveryPhoto now composes the delivered-order photo figure.
   StorefrontTrackOrderDetails now composes the tracking details card.
   StorefrontTrackOrderActions now composes contact, repeat-order and lookup actions.
   Known-order repeat review now uses a button for keyboard/pointer parity.
   StorefrontTrackOrderSummary now composes the tracking summary card.
   StorefrontTrackReorderDialog now composes the controlled repeat-order review.
   Tracking View now passes layout/lookup/notice/photo/summary elements directly without redundant fragments.
   StorefrontSavedHeading now composes the saved-page count and accented heading.
   StorefrontSavedRemovalNotice now composes removal feedback and Undo.
   StorefrontSavedResults now composes saved-product cards within the layout grid.
   StorefrontSavedEmpty now composes empty-list messaging and the shop link.
   Saved View now passes layout/results/empty elements directly without redundant fragments.
   Search heading now composes its localized h1 through StorefrontSearchHeading.
   StorefrontSearchControls now composes the query field, close link and responsive row.
   StorefrontSearchPopular now composes the popular-term eyebrow and chips.
   StorefrontSearchResults now composes count/status and linked product rows.
   StorefrontSearchEmpty now composes zero-result status, messaging and recovery actions.
   Search View now passes its layout directly without a redundant fragment.
   StorefrontContactHeading now composes the contact eyebrow, accented title and introduction.
   StorefrontContactDetails now composes studio rows, contact actions, map and directions.
   StorefrontContactFormControls now composes validation summary, fields and send action.
   Shared Button now keeps pending announcements as text and guards activation/implicit submit.
   StorefrontContactCompletion now composes submission feedback and return-to-form action.
   StorefrontContactFeedback now composes API-failure messaging through the package danger Alert.
   Contact View now passes its layout directly without a redundant fragment.
   StorefrontWeddingsHeading now composes the weddings eyebrow, title, introduction and hero actions.
   StorefrontWeddingsHeroMedia now composes the localized hero arch placeholder.
   StorefrontWeddingsServices now composes ordered service cards from explicit records.
   StorefrontWeddingsStory now composes gallery and process content from explicit props.
   StorefrontWeddingsInquiryIntro now composes the localized inquiry heading and introduction.
   StorefrontWeddingsFormControls now composes validation, fields and the send action.
   StorefrontWeddingsCompletion now composes submission feedback and the return-to-form action.
   StorefrontWeddingsFeedback now composes API-failure messaging through the package danger Alert.
   Weddings View now passes layout/form/completion elements directly without redundant fragments.
   StorefrontFaqHeading now composes the FAQ eyebrow, accented title and introduction.
   StorefrontFaqQuestions now composes labelled category sections and Accordions from explicit groups.
   StorefrontFaqContact now composes the FAQ help card, contact actions and sample-content note.
   FAQ View now passes its layout directly without a redundant fragment.
   StorefrontPolicyHeading now composes the policy eyebrow, title, introduction and update metadata.
   StorefrontPolicyNavigation now composes the labelled policy list and links from explicit props.
   StorefrontPolicyNotice now composes the localized sample notice through the warning Alert.
   StorefrontPolicyContents now composes labelled section links from explicit props.
   StorefrontPolicyDocument now composes section headings, paragraphs and optional item lists.
   Policy View now passes its layout directly without a redundant fragment.
   StorefrontJournalHeading now composes the title and category controls from explicit props.
   StorefrontJournalSearch now composes the controlled search field from explicit props.
   StorefrontJournalEmpty now composes no-result feedback and the recovery action.
   StorefrontJournalLoading now composes the decorative skeleton and localized status.
   StorefrontJournalFeatured now composes the featured BlogCard from explicit story props.
   StorefrontJournalStories now composes ordered story cards inside the layout-owned grid.
   StorefrontJournalPagination now composes paging controls from explicit props.
   Journal View now passes its layout and conditional featured story directly without redundant fragments.
   StorefrontPostLoading now composes loading title, decorative skeleton and localized status.
   StorefrontPostMissing now composes missing-story feedback and the localized journal recovery link.
   StorefrontPostHeading now composes the article back link, metadata, title and introduction.
   StorefrontPostBlocks now composes ordered article blocks and normalized tip lists.
   StorefrontPostClassic now composes the classic image, paragraphs, quote and section heading.
   StorefrontPostActions now composes the controlled copy button and localized shop link.
   StorefrontPostSocial now composes the share/Instagram row from explicit props.
   StorefrontPostProducts now composes the ordered product recommendation grid.
   StorefrontPostRelated now composes the related-story heading and responsive card grid.
   Post View now passes its layout directly without a redundant fragment.
   StorefrontNotfoundMessage now composes the localized 404 heading and body through EmptyState.
   StorefrontNotfoundActions now composes localized home/search recovery links from explicit props.
   StorefrontNotfoundRecommendationHeading now composes the localized recommendation SectionHeader.
   StorefrontNotfoundProducts now composes ordered product cards inside the layout-owned grid.
   Not-found View now passes its layout directly without a redundant fragment.
   StorefrontErrorMessage now composes the localized 500 heading and body through EmptyState.
   StorefrontErrorActions now composes retry/home/phone recovery controls from explicit props.
   Error View now passes its layout directly without a redundant fragment.
   The stage-201 [composition audit](ATOMIC-DESIGN-AUDIT.md) inventories remaining content and boundaries.
   StorefrontShopHeading now composes the localized shop SectionHeader from explicit props.
   StorefrontProductBreadcrumbs now composes product navigation from explicit label/items props.
   StorefrontBagHeading now composes controlled bag/delivery h1 content from explicit props.
   StorefrontContactFormHeading now composes the persistent localized form h2 from an explicit title.
   StorefrontSiteCheckoutNotice now composes controlled checkout recovery messaging and its order link.
   StorefrontSiteIntegrationFeedback now composes the controlled sync-error Alert from an explicit message.
   StorefrontBagDeliveryLayout now owns recipient/location section placement from React-node slots.
   StorefrontCheckoutLayout now owns payment progress spacing; View retains controlled slot construction.
   Shop View now passes its layout directly while retaining sidebar/results grouping and empty sticky slot.
   Product View now passes layout/sticky/recent elements directly, preserving boundary/reset identity.
   Bag View now passes layout/items/summary/empty/sticky elements directly, preserving branch guards.
   Checkout View now passes layout and single-organism branches directly, retaining payment grouping.
   Site View now passes lazy route elements and live text directly, preserving coordinator infrastructure.
   App dependency checks now enforce UI import boundaries and detect missing modules and cycles.
   The package contract audit verifies packed consumers and records theme/API and CI coverage gaps.
   Theme ESM/CommonJS exports and types now share RAMPS/shade without changing the color math.
   Packed-consumer checks now exercise public assets/types and all root export bundles without aliases.
   The acceptance audit distinguishes current device/content checks from visual/hardware gaps.
   The Persian post mismatch is traced to stale Darwin separator baselines, now reviewed/refreshed.
   Dedicated touch/tablet checks now cover core shopping routes and normal-sticky reachability.
   **Next stage: extend touch/tablet browsing and recovery route coverage.**
7. **Finish.** Package UI folders are all layered. Resolve remaining composition and obsolete glue
   identified in the audit, then check package exports,
   tree shaking, types, English/Persian accessibility, screenshots and phone/tablet/TV flows.

Each batch gets a separate branch, local commit and pull request after its checks. Merge only when
requested. New package UI belongs in the classified layers; storefront composition belongs in app
organisms/molecules and layout templates. The remaining backlog is recorded in the composition audit.
Checkpoints describe completed work, not a promise that a folder move alone finishes a redesign.

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

**Sixty-sixth checkpoint verified:** StorefrontHomeNewsletter is extracted under
`templates/app/organisms/StorefrontHomeNewsletter/`. It receives explicit open/done/completion text,
draft/error/pending values, localized labels and change/submit callbacks. It composes heading,
labelled email form, pending button and focusable completion status. View maps props; home/shared
logic retains profile prefill, validation, request deduplication, API submission, tracking,
persistence and focus. Layout retains optional visibility, wrappers and band. IDs, noValidate,
email type/LTR/autocomplete, error wiring, button height/pending wording and completion role/tabindex
are preserved. All seven home sections now delegate composition to app organisms and the unused
View DS import is removed. No page model, new state/effects, styles, package exports or generated
files changed. Unit/type/package tests, production app build and generated/format/CSS checks pass.
Six focused desktop/mobile browser cases pass without retries, including demo completion/reload,
invalid-input focus and signed-in email prefill. Bilingual before/after probes exercise initial,
invalid, pending, failure and completion states; verify no request on invalid input, no duplicate
request while pending, failure draft/focus retention, successful retry, persistence/reload, form
removal on completion, touch/TV submission, tablet rotation and feature-disabled hiding. API calls
use a controlled promise stub; no external subscription is sent. Feature hiding uses a browser-only
store-config response fixture. Whole-page axe scans pass initial/invalid/pending/failure states.
Completion exposes an existing shared pending-button announcer defect in both pre-change and
post-change pages: its assertive log retains role=img nodes whose aria-labelledby references the
removed button. Newsletter-scoped completion axe checks pass; the full-page completion failure is
recorded rather than suppressed or claimed passing. Repair this shared announcement behavior next,
then resume product-gallery extraction. Full browser/device suites and external newsletter API
integration were not rerun. All 24 section screenshot pairs are byte-identical, verified against
actual PNG bytes: initial state at 390/768/1280/1920 pixels and invalid/pending/failure/completion
at 390/1280 pixels, all bilingual. A 62-pixel pending-control difference up to 7/255 recaptured
exactly with no source, baseline or tolerance changes. Representative Persian phone failure and
English desktop completion captures were visually inspected.

**Sixty-seventh checkpoint verified:** Newsletter pending announcements now retain an accessible
name after successful submission removes the form. The existing shared React Aria pending button
queues aria-labelledby references; the previous default pointed to the button that unmounts on
completion. StorefrontHomeNewsletter now supplies its existing button API with a persistent,
visually hidden submit-label span outside the conditional form. The reference survives completion,
while focus retention, pending interaction suppression, loading wording and existing form behavior
stay with the shared button/page logic. No shared package/dependency patch, CSS or generated-file
change is required. This fixes the newsletter call site; it does not claim all unrelated conditional
pending-button callers are repaired. Four new English/Persian desktop/mobile regression cases fail
before the fix with empty retained-announcement names and pass after it. They cover rejected
submission, draft/error focus, retry, pending duplicate prevention, completion focus/form removal,
retained announcement names before cleanup, full-page axe and reload persistence. All ten focused
home/newsletter browser cases pass without retries. Unit/type/package tests, production app build
and generated/format/CSS checks pass. Controlled API promises prevent external subscription calls.
The full browser/device suites and external newsletter API integration were not rerun.
All 24 before/after newsletter section screenshot pairs are byte-identical, verified against actual
PNG bytes: initial at 390/768/1280/1920 pixels and invalid/pending/failure/completion at 390/1280
pixels, all bilingual. The controlled probes additionally confirm zero full-page completion axe
findings after the fix versus the known announcer finding before it, alongside touch/TV submission,
rotation and feature hiding. No screenshot baselines/tolerances or shared pending implementation
changed. Representative Persian phone failure and English desktop completion captures were viewed.
Next: extract the product gallery section into a storefront organism.

**Sixty-eighth checkpoint verified:** StorefrontProductGallery is extracted under
`templates/app/organisms/StorefrontProductGallery/`. It receives explicit product code, gallery
images, viewer items/index, localized photo/fullscreen labels and slide formatter, plus gallery/
open/viewer/close callbacks. It composes Gallery, fullscreen action and controlled Lightbox. View
maps props; product logic retains photo mapping, selection, current-gallery-photo entry, closing
and route-change reset. The Gallery key remains the displayed product code. Layout retains grid
and gallery wrapper. Fragment order, aspect/image sizes, button styling/icon and labels are
preserved. No page model, new state/effects, styles, package exports or generated files changed.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Eight existing
Gallery/Lightbox component cases and two product fullscreen browser cases pass without retries.
They cover component dots, pointer swipe, RTL/keyboard movement, boundaries, close/focus and axe.
Bilingual before/after probes at 390/768/1280/1920 pixels additionally verify three labelled slides,
first-photo priority, second/third gallery-photo entry, reopening, mirrored keyboard navigation,
previous/next disabled boundaries, Escape and close-button focus restoration, touch/TV activation,
tablet rotation, no document overflow and full-page gallery/viewer axe checks. Desktop probes
navigate through the shop to another product and confirm gallery reset and first-photo entry.
The full browser/device suites and unrelated purchase/payment flows were not rerun.
All sixteen final screenshot pairs are byte-identical, checked from actual PNG bytes: gallery
composition and selected-photo fullscreen viewer at all four widths in both languages. Two gallery
captures initially differed around the fullscreen-control text (40/35 pixels, at most 2/255); focused
recaptures are exact with no source, baseline or tolerance changes. Representative Persian phone
viewer and English TV gallery captures were visually inspected.
Next: extract the product heading/price/stock section into a storefront organism.

**Sixty-ninth checkpoint verified:** StorefrontProductHeading is extracted under
`templates/app/organisms/StorefrontProductHeading/`. It receives explicit code, subtitle, badge,
unit-price label/value, stock descriptor, description, copy label and callback, composing the
heading/copy action, category/badge, price/availability and description. View maps props; product/
shared logic retains identity/localization, pricing, stock interpretation, clipboard fallback and
toast feedback. Layout retains details/sticky composition. The h1 ID, wrappers/order/classes,
typography, copy-button icon/variant, badge tone, price sizing/class and StockStatus composition
are preserved. No page model, new state/effects, browser APIs, styles, package exports or generated
files moved into the organism. Unit/type/package tests, production app build and generated/format/
CSS checks pass. Eight focused desktop/mobile browser cases pass without retries, covering product
identity/search, category context, ready badges and low/returning-stock wording. Bilingual probes
cover new, ready, low-stock, returning-stock and configured-price headings. They verify product-code
h1, content, stock/date wording, size-price updates and extras excluded from unit price; copy-code
success, rejected-clipboard legacy success/failure, code selection and toast feedback; touch/TV
activation, tablet rotation, no document overflow and full-page axe. Clipboard and legacy copy
commands are controlled browser stubs, leaving the real clipboard untouched. Accessibility probes
normalize page scroll after heading captures to avoid a breadcrumb clipped under the sticky header.
The full browser/device suites and unrelated purchase/payment flows were not rerun.
All 24 heading screenshot pairs are byte-identical, verified against actual PNG bytes: base headings
at 390/768/1280/1920 pixels and ready/low/returning/configured headings at 390/1280 pixels, all
bilingual. Representative Persian phone returning-stock and English desktop low-stock headings
were visually inspected. No screenshot baselines or tolerances changed.
Next: extract the product size/add-on configuration section into a storefront organism.

**Seventieth checkpoint verified:** StorefrontProductConfiguration is extracted under
`templates/app/organisms/StorefrontProductConfiguration/`. It receives explicit size/add-on
visibility, size options/value/change callback, add-on records with checked/toggle values and
localized legends. It composes ChoiceGroup/ChoiceTile and the add-on fieldset. View retains record
normalization and visibility; product/shared logic retains eligibility, selection/URL state,
reload, pricing, stock limits and bag configuration. Layout retains details/sticky composition.
Fragments, group/fieldset order/classes, three-column setting, native radio/checkbox semantics,
legends, option values and callbacks are preserved. No page model, new state/effects, browser APIs,
styles, package exports or generated files moved into the organism. Unit/type/package tests,
production app build and generated/format/CSS checks pass. Four focused desktop/mobile workflow
cases and four dedicated bilingual touch-phone/tablet purchase-panel cases pass without retries.
They cover quoted choices/reload, stock limits, readable size tiles and native touch selection.
Bilingual before/after probes cover initial/configured options at 390/768/1280/1920 pixels plus
no-size and restricted-add-on products at 390/1280 pixels. They verify group visibility/counts,
radio/checkbox state, URL serialization, reload persistence, unit price versus extras-inclusive
total, matching configured bag confirmation, reversible add-on toggles, touch/TV Space/Enter input,
tablet rotation, no document overflow and full-page axe. Accessibility scans normalize page scroll
after captures. Bag rows retain their existing quantity/remove behavior; configuration stays on
the product page. Full browser/device suites and unrelated payment flows were not rerun.
Twenty-two of 24 full details-panel screenshot pairs are byte-identical, checked against actual PNG
bytes. After one focused recapture, Persian TV base/configured captures retain 21/13 differing
pixels at just 1/255; an 11-pixel English desktop configured difference up to 2/255 recaptured
exactly. No baselines/tolerances changed. The bag probe was corrected to choose the visible
responsive purchase action rather than assume a viewport breakpoint; only unfinished cases resumed.
Representative Persian phone configured and English desktop restricted-option captures were viewed.
Next: extract the product purchase summary/actions into a storefront organism.

**Seventy-first checkpoint verified:** StorefrontProductPurchase is extracted under
`templates/app/organisms/StorefrontProductPurchase/`. It receives explicit summary label/total/hint,
controlled quantity value/max/labels/change callback, save label/active/click callback and add
label/disabled/click callback. View maps those records; product/shared logic retains quantities,
URL/reload state, pricing, saved state, stock limits, bag mutations and confirmation. The sticky
purchase action remains in its Shell slot. Fragments, markup order/classes, live-total semantics,
quantity minimum, responsive visibility and callbacks are preserved. No page model, new state,
effects, browser APIs, styles, package exports or generated files moved into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Six focused
desktop/mobile browser cases cover saved designs, stock messaging/limits and quoted purchase
configuration/reload. Bilingual before/after probes cover default/configured purchases at
390/768/1280/1920 pixels plus low-stock/unavailable products at 390/1280 pixels. They verify
quantity minimum/maximum, total updates, quantity URL/reload, save/unsave and persistence, matching
configured bag confirmation, exhausted-stock/unavailable disabled actions, native touch and TV
Space/Enter input, tablet rotation, no document overflow and full-page axe. Accessibility scans
normalize scroll after captures. An initial ArrowUp probe did not increment the quantity field in
the pre-change TV build; TV increment/decrement controls are verified with Enter instead. This
existing TV keyboard limitation remains outside the extraction. Full browser/device suites and
unrelated payment flows were not rerun. After one focused recapture, 22 of 24 full details-panel
screenshot pairs are byte-identical, checked against actual PNG bytes. English desktop default
retains 32 differing pixels up to 2/255; Persian TV default retains 21 pixels at 1/255. The focused
recapture also resolves a sticky-header scroll timing difference in the configured TV capture.
No baselines/tolerances changed. Representative Persian phone configured, English TV configured
and English desktop low-stock captures were viewed.
Next: extract the product delivery/care section into a storefront organism.

**Seventy-second checkpoint verified:** StorefrontProductCare is extracted under
`templates/app/organisms/StorefrontProductCare/`. It receives explicit delivery text, optional
inquiry href/label and localized accordion items. It composes the delivery message, conditional
WhatsApp link and Accordion with `care` initially expanded. Product View/logic retain delivery
eligibility/cutoff wording, care fallback, localization and inquiry URL generation. Accordion
retains its existing disclosure state. Fragments, order/classes, link target/rel and default panel
are preserved. No page model, new state/effects, browser APIs, commerce rules, styles, package
exports or generated files moved into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Four focused
bilingual product-panel browser cases at 390/768 pixels pass with native touch enabled. Bilingual
before/after probes cover default-care and delivery-expanded panels at 390/768/1280/1920 pixels,
plus product-specific care and disabled-WhatsApp configuration at 390/1280 pixels. They verify
care fallback versus custom advice, same-day versus checkout-window wording, inquiry name/code
URL/target/rel, omission without a configured destination, default panel and exclusive
open/close/reopen behavior, touch/TV Enter input, tablet rotation, no document overflow and
full-page axe. The disabled-WhatsApp case intercepts the store-config module in the browser;
no live store settings or external messages change. Full browser/device suites and unrelated
purchase/payment flows were not rerun. Twenty-three of 24 full details-panel screenshot pairs
are byte-identical, checked against actual PNG bytes. After one focused recapture, Persian TV
care still has a sticky-header overlay difference at rows 197–293 (68,686 pixels, up to 229/255),
outside the extracted section. Its bottom 500 pixels, containing delivery, inquiry and accordion,
are pixel-identical; all other pixels outside the header band also match. This full-panel capture
exception is retained rather than changing baselines/tolerances. Representative Persian phone
custom-care and both Persian TV care captures were viewed.
Next: extract the recently viewed product section into a storefront organism.

**Seventy-third checkpoint verified:** StorefrontProductRecent is extracted under
`templates/app/organisms/StorefrontProductRecent/`. It receives normalized product records,
localized heading/count/region/navigation/photo/save labels and an explicit carousel reset key.
It composes SectionHeader, CollectionCarousel and ProductCards, preserving the single/multiple
card image sizes, section/classes, ordering, four-card layout, compact peek and callbacks.
View retains visibility, normalization/count formatting and its product-keyed ErrorBoundary.
Product/shared logic retains browser history, current-product exclusion, deduplication, order/
limit, product/price/stock/image/link mapping and favorites. CollectionCarousel retains measured
overflow/navigation state and resets on product changes. No page model, new state/effects,
persistence, product rules, styles, package exports or generated files move into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. All twelve
focused recent-products browser cases pass without retries: bilingual 258/390/768/1280/1920-pixel
card/navigation checks and single-card cases. The spec enables native touch at narrow widths;
these are distinct from a full device suite. Bilingual before/after probes cover one/four cards
at 390/768/1280/1920 pixels and absent/corrupt history at 390/1280 pixels. They verify legacy ID
normalization, duplicate/invalid/current-product exclusion, order, count/region names, responsive
image sizes, overflow controls, reversible favorite callbacks, focused-card containment, product
link navigation, updated recent history/carousel reset, touch/TV Enter input, tablet rotation,
no document overflow and full-page axe. Four additional bilingual touch-phone/tablet probes
verify carousel reset on product navigation and browser Back. Full browser/device suites and unrelated checkout flows
were not rerun. All sixteen one/four-card section screenshot pairs are byte-identical, checked
against actual PNG bytes. Eight additional paired probes verify section absence for empty/corrupt
history. No visual baselines/tolerances changed or recaptures were needed. Representative Persian
phone four-card and English desktop single-card captures were viewed.
Next: extract the product added-to-bag dialog into a storefront organism.

**Seventy-fourth checkpoint verified:** StorefrontProductAdded is extracted under
`templates/app/organisms/StorefrontProductAdded/`. It receives explicit open/close, summary
lines/sums, checkout href/callback and localized title/close/checkout/continue labels. It composes
Dialog, OrderSummary and checkout/keep-shopping actions, preserving scaled 440px maximum width,
classes/order, checkout autofocus and link semantics. Product View/logic retain bag mutations,
configuration/quantity details, subtotal calculations, dialog state and checkout continuation.
Dialog retains modal isolation, dismissal and focus management. No page model, new state/effects,
browser APIs, persistence, commerce rules, styles, exports or generated files move into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Four focused
desktop/mobile browser cases cover bag-dialog summary, initial focus, keep-shopping restoration,
checkout navigation and quoted size/add-on purchase. Bilingual before/after probes cover default
and configured quantity-two dialogs at 390/768/1280/1920 pixels plus unavailable products at
390/1280 pixels. They verify initial closure, code/configuration/quantity/line total, bag count and
subtotal, checkout href/autofocus, Tab/Shift+Tab containment, keep-shopping/Escape/close-button
closure and opener focus restoration, repeated opening, touch/TV Enter input, tablet rotation,
matching bag navigation/content, unavailable-product closure, no document overflow and full-page
axe. Full browser/device suites and unrelated payment submission were not rerun.
All sixteen default/configured dialog screenshot pairs are byte-identical, verified against
actual PNG bytes. Four additional paired probes verify unavailable-product closure. No visual
baselines/tolerances changed or visual recaptures were needed. Representative Persian phone
default and English desktop configured captures were viewed.
Next: extract the product sticky purchase action into a storefront organism.

**Seventy-fifth checkpoint verified:** StorefrontProductSticky is extracted under
`templates/app/organisms/StorefrontProductSticky/`. It receives explicit summary label/total and
add label/disabled/click callback. It composes the live total and purchase button in the existing
Shell sticky slot, preserving root/child classes, order, status/atomic semantics, small price and
button styling. Product View/logic retain formatting, configuration/quantity state, pricing,
stock decisions, bag mutations and confirmation. Shell/layout/shared CSS retain positioning,
responsive visibility, bottom-bar measurement and focus offsets. No page model, new state/effects,
browser APIs, commerce rules, styles, exports or generated files move into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Four focused
bilingual native-touch tablet purchase/rotation/consent/focus cases and two dedicated touch-phone
short-landscape cases pass without retries. Bilingual before/after probes cover default/configured
bars at touch widths 390/768/1180 and hidden bars at non-touch desktop 1280/TV 1920, plus low-stock
and unavailable states at touch widths 390/1180. They verify live total/count semantics, quantity
increment/decrement updates, one visible responsive purchase action, minimum tap size, viewport
containment, measured bottom-bar height, tablet navigation hiding, matching bag confirmation,
opener focus restoration, exhausted-stock/unavailable disabled states, no document overflow and
full-page axe. Touch and desktop/TV inputs are verified separately. The extraction leaves product
configuration on the product page and existing bag quantity/remove controls intact. Full browser/
device suites and unrelated payment flows were not rerun. All twenty visible-bar screenshot
pairs are byte-identical, verified against actual PNG bytes; eight additional paired probes
verify desktop/TV hiding. No visual baselines/tolerances changed or recaptures were needed.
Representative Persian phone default, English wide-tablet default and Persian wide-tablet
unavailable captures were viewed.
Next: extract shop category navigation into a storefront organism.

**Seventy-sixth checkpoint verified:** StorefrontShopCategories is extracted under
`templates/app/organisms/StorefrontShopCategories/`. It receives normalized category records,
the category label and an explicit compact presentation flag. Sidebar mode composes the label
and selected/unselected native buttons; compact mode composes the named horizontal group and
Chips. Fragments, classes/order, button type, on/off rendering, pressed states, formatted counts,
compact labels and individual callbacks are preserved. View retains normalization and placement;
shop/shared logic retains eligible-category rules (including an active empty category), filtered
counts, selection/tracking, URL updates, paging reset, sorting and results. No page model, new
state/effects, browser APIs, commerce rules, styles, exports or generated files move into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Four focused
desktop/mobile category heading/visibility/empty-category cases and two bilingual native-touch
tablet shop/sorting rotation cases pass without retries. Bilingual before/after probes cover
initial/selected categories at 390/768/1280/1920 pixels plus filtered/empty categories at 390/1280.
They verify eligible order, localized names/counts, pressed state, hidden empty-category rules,
matching cumulative result pages, category URL and first-page reset, stock/occasion/sort retention,
reload persistence, selecting All, compact horizontal focus, touch/TV Enter input, tablet switch
to sidebar, no document overflow and full-page axe after interactions. Full browser/device suites
and unrelated checkout flows were not rerun. All 24 category-region screenshot pairs are
byte-identical, checked against actual PNG bytes. Desktop captures isolate the category label/
buttons; compact captures cover the horizontally scrolling group. No visual baselines/tolerances
changed or recaptures were needed. Representative Persian phone default/empty and English desktop
filtered captures were viewed.
Next: extract shop sidebar filters into a storefront organism.

**Seventy-seventh checkpoint verified:** StorefrontShopSidebarFilters is extracted under
`templates/app/organisms/StorefrontShopSidebarFilters/`. It receives explicit occasion, date,
price and stock descriptors: labels, options, controlled values, price bounds/step/formatter and
individual callbacks. It composes the occasion fieldset/Chips, Select, labelled RangeSlider and
Switch, preserving the wrapper/classes/order, legends, field IDs and label relationships.
View retains normalization/descriptor mapping; shop/shared logic retains delivery availability/
cutoffs, price rules, filtering, tracking/debounce, URL/paging, sorting and results. The compact
filter dialog remains in View. No page model, new state/effects, browser APIs, commerce rules,
styles, exports or generated files move into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Six focused
desktop/mobile occasion, delivery-day and clear-all browser cases pass without retries. Bilingual
before/after probes cover default/filtered controls at touch-tablet 1180, desktop 1280 and TV 1920,
price boundary values at desktop 1280, and hidden-sidebar/compact fallback at touch widths 390/768.
They verify selected occasion, controlled native slider values/formatted announcements, stock/date
initial state, label/hint relationships, touch range input and stepped values, RTL keyboard input,
one-step thumb separation and bounds, stock toggles, disabled sold-out delivery dates, date selection,
matching results, first-page reset, filter/sort URL retention, reload persistence, compact dialog
selection, tablet switch to sidebar, no document overflow and full-page axe before/after interactions.
TV uses Home/End for slider bounds and Space for the stock input. Full browser/device suites and
unrelated checkout flows were not rerun. Final element captures verify full dimensions and stock
control containment; viewport/full-page clips were replaced because they truncated or shifted the
sticky section. Eleven of fourteen final screenshot pairs are byte-identical, checked against
actual PNG bytes. Default/filtered English touch-tablet captures each retain seven pixels at 1/255;
default Persian desktop retains 47 edge pixels up to 2/255. Four additional paired probes verify
hidden-sidebar/compact fallback. No baselines/tolerances changed. Final Persian tablet default and
English TV filtered captures were viewed, including the complete stock control.
Next: extract the shop filter dialog into a storefront organism.

**Seventy-eighth checkpoint verified:** StorefrontShopFilterDialog is extracted under
`templates/app/organisms/StorefrontShopFilterDialog/`. It receives explicit open/close/clear,
title/show/clear labels and controlled occasion/date/price/stock descriptors. It composes Dialog,
scrolling fields and Show/Clear footer actions, preserving classes/order, legends, dialog-specific
IDs/label relationships, default close wording and callback semantics. View retains normalization/
descriptor mapping; shop/shared logic retains dialog state, availability/cutoffs, price rules,
filtering, tracking/debounce, live result labels, URL/paging, sorting and clear behavior. Dialog/
existing CSS retain focus trapping/restoration, dismissal, scrolling and action placement. No page
model, new state/effects, browser APIs, commerce rules, styles, exports or generated files move here.
Unit/type/package tests, production app build and generated/format/CSS checks pass. All six
bilingual native-touch filter-dialog layout regressions pass without retries at 390x844, 390x480
and 768x600: scrolled controls/actions, Clear/Show, Escape and opener restoration. Bilingual
before/after probes cover default/filtered dialogs at those same sizes, with separate top and
scrolled-bottom element captures. They verify initial values/pressed states/formatted slider
announcements, distinct dialog field IDs, focus wrap, stationary/reachable footer actions, minimum
tap height, stock visibility after scroll, price and occasion changes, disabled delivery dates,
date selection, live one-result label, Clear retaining the dialog, cleared values, category/sort
retention, first-page results, Show/Escape/close dismissal and focus restoration, reload, tablet
switch to sidebar, no document overflow and full-page axe. Four additional paired desktop/TV
1280/1920 probes verify the dialog stays closed, compact opener is hidden and only sidebar sliders
are accessible. Full browser/device suites and unrelated checkout flows were not rerun.
All 24 top/scrolled-bottom dialog screenshot pairs are byte-identical, checked against actual
PNG bytes. Focus containment after date selection waits for popup focus restoration. No visual baselines/tolerances changed. Persian
short-phone top/bottom and English tablet filtered-bottom captures were viewed.
Next: extract the shop results toolbar into a storefront organism.

**Seventy-ninth checkpoint verified:** StorefrontShopToolbar is extracted under
`templates/app/organisms/StorefrontShopToolbar/`. It receives explicit labels, a controlled sort
descriptor, normalized active/quick-filter records and open/clear/focus callbacks. It composes
compact filters/sort, FilterBar, quick chips, live result count and desktop sort, preserving
fragment structure, wrapper classes/order, pressed states and the `vf-shop-count` focus target.
View retains record mapping and the focus-scroll browser callback; shop/shared logic retains
filtering, sorting, tracking, dialog state, count labels, removal/clear semantics and URL/paging.
No page model, state/effects, browser APIs, commerce rules, styles or package exports move here.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Six focused
browser cases pass without retries: desktop/mobile clear/removal focus and bilingual native-touch
tablet sorting through rotation. Sixteen bilingual before/after probes cover default/filtered
states at touch widths 390/768, desktop 1280 and TV 1920. They verify counts, controlled sorting,
first-page reset, URL/reload persistence, quick-filter toggles, horizontal chip focus visibility,
clear focus/count/sort retention, compact dialog entry/Escape/opener restoration, tablet switch
to desktop sorting, no document overflow and full-page axe. TV controls use keyboard Enter;
full spatial navigation and the complete browser/device suites were not rerun.
Thirty-one of 32 toolbar-region screenshot pairs are byte-identical, checked against actual
PNG bytes. The default English desktop toolbar differs by eight pixels at 1/255 per channel.
No visual baselines/tolerances changed. Persian phone filtered and English desktop default
captures were viewed. Next: extract shop product results and feedback into a storefront organism.

**Eightieth checkpoint verified:** StorefrontShopResults is extracted under
`templates/app/organisms/StorefrontShopResults/`. It receives normalized product records, frame,
explicit content/paging visibility, paging data/callback, feedback flags/actions and localized
labels. It composes loading Skeleton/status, error Alert/retry, product cards/LoadMore and empty
feedback/clear without adding a wrapper or changing classes, card fields, first-two image priority,
links, announcements or order. View retains mapping; shop/shared logic retains result selection,
sorting, favorites, URL/paging, navigation/focus and retry/clear semantics. No page model, new
state/effects, browser APIs, commerce rules, styles or package exports move into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Four focused
desktop/mobile browser cases pass without retries: cumulative paging with new-card focus/URL/
reload and empty-category eligibility. Twenty bilingual before/after probes cover default results
at touch widths 390/768, desktop 1280 and TV 1920, plus empty/loading/error states at 390/1280.
They verify product order, paging links/counts, focus after pointer/touch paging, URL/reload,
favorite toggles/persistence, product navigation/back, touch tablet rotation, empty clear and error
retry recovery, hidden grid during feedback, loading status, no document overflow and full-page
axe. Keyboard Enter activates favorites/product links/recovery controls. The unchanged touch
baseline failed new-card focus after keyboard Enter on LoadMore; the normal touch/pointer path
and existing focused tests pass. This stage preserves that existing limitation. A scratch probe
initially used a nonexistent Skeleton class; it was corrected and unfinished cases resumed.
All 28 result-region/loaded-grid screenshot pairs are byte-identical, verified against PNG bytes.
Results captures include the existing toolbar and Shell overlays; no baselines/tolerances changed.
Persian phone default and desktop error/loading captures were viewed. The full browser/device
suite and TV spatial-arrow navigation were not rerun. Next: extract bag line items into a storefront
organism.

**Eighty-first checkpoint verified:** StorefrontBagItems is extracted under
`templates/app/organisms/StorefrontBagItems/`. It receives normalized line records, remove/quantity
labels and a quantity formatter. It composes large LineItems and stock-warning Alerts, preserving
the list/row classes/order, `data-vf-keep-focus`, configured metadata/card notes, prices, images,
unavailable state, quantity bounds and individual quantity/remove callbacks. View retains bag-step/
content visibility and normalization; bag/shared logic retains availability/shared-stock rules,
pricing, quantities, removal/Undo, persistence, totals and focus restoration. Undo notice and empty
state remain outside conditional contents. No page model, new state/effects, browser APIs, commerce
rules, styles or package exports move into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Eight focused
bilingual desktop/mobile browser cases pass without retries: stock bounds and configured-line Undo
without reverting another item, persistence, final removal and recovery. Twelve bilingual paired
before/after probes cover default lines at touch widths 390/768, desktop 1280 and TV 1920, plus
synthetic excess-quantity/unavailable lines at 390/1280. They verify configured notes/order, focus
marker, quantity changes, removal/Undo focus, other-line retention, persisted values, final-item
empty-state recovery, touch-tablet rotation, stock warnings, unavailable controls and Undo,
no document overflow and full-page axe. Touch uses taps; desktop/TV actions use keyboard Enter.
All 20 initial/quantity list screenshot pairs are byte-identical, verified against actual PNG bytes.
Persian phone default and desktop stock-warning captures were viewed. The scratch probe's initial
focus-marker assertion was corrected to React's existing string value `true`; no source changes
were needed for it. No baselines/tolerances changed. Full browser/device suites and TV spatial-arrow
navigation were not rerun. Next: extract the bag summary into a storefront organism.

**Eighty-second checkpoint verified:** StorefrontBagSummary is extracted under
`templates/app/organisms/StorefrontBagSummary/`. It receives summary title/rows/sums, optional
free-delivery descriptor, controlled promo descriptor, visible delivery/payment/back actions and
payment note. It composes Card/OrderSummary, Meter, PromoCodeField and navigation, preserving
fragment structure, classes/order, padding, promo ID, button variants/icons, back href and responsive
visibility. View retains content visibility/mapping; bag/shared logic retains pricing/discounts,
quote rules, promo validation/persistence, step state and delivery/payment validation/navigation.
Shared components retain promo focus/accessibility; sticky actions remain in Shell. No page model,
new state/effects, browser APIs, commerce rules, styles or package exports move into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Four focused
desktop/mobile browser cases pass without retries: promo discount continuity through checkout and
free-delivery progress. Eight bilingual before/after probes at touch widths 390/768, desktop 1280
and TV 1920 verify initial totals, invalid promo/error focus, normalized applied code/discount/focus,
delivery entry, promo hiding/retention, meter cap and below-threshold amount, payment validation
focus, back link, code removal/field focus/reload, tablet rotation, empty-summary removal, overflow
and full-page axe. Touch actions use taps; desktop/TV uses keyboard Enter. Five summary-region
captures per probe cover default, invalid, applied, delivery and below-threshold states.
Thirty-nine of 40 screenshot pairs are byte-identical, verified against actual PNG bytes. The
English tablet invalid-promo capture differs by five pixels at 1/255 per channel. No baselines/
tolerances changed. Persian phone invalid and desktop delivery/threshold captures were viewed.
The initial baseline map probe used a frozen clock; switching to the existing delivery test's
moving clock allowed map animation/quoting to complete. Full browser/device suites and TV spatial
arrow navigation were not rerun. Next: extract bag sticky actions into a storefront organism.

**Eighty-third checkpoint verified:** StorefrontBagSticky is extracted under
`templates/app/organisms/StorefrontBagSticky/`. It receives explicit total label/value and delivery/
payment descriptors with independent visibility, labels and callbacks. It composes the existing
compact total/Price and continuation buttons inside Shell's sticky slot, preserving wrapper
classes/order, price size/class, button variant/icon and labels. View retains content visibility
and descriptor mapping; bag/shared logic retains totals/discounts, stock eligibility, step state,
delivery/payment validation and navigation. Shell/existing CSS retain hiding/docking, height and
focus measurements. No page model, state/effects, browser APIs, commerce rules, styles or package
exports move into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Four focused
desktop/mobile browser cases pass without retries: promo continuity through checkout and payment
validation summary/focus. Twelve bilingual before/after probes cover compact touch widths 320/390
and short landscape 667x375, plus wider touch widths 768/1180 and TV 1920. They verify initial totals,
live quantity/promo updates, one reachable action with minimum tap height, delivery/payment labels,
validation focus, back/reload persistence, compact-breakpoint rotation, wider hiding, empty-bag bar
removal, no document overflow and full-page axe with populated/empty bags. Compact uses touch;
TV continuation uses keyboard Enter through the wider summary action. TV spatial-arrow navigation
and the full browser/device suites were not rerun. The TV probe waits for navigation layout/focus
to settle before keyboard activation; immediate activation failed on the unchanged baseline.
All 18 default/updated/delivery bar screenshot pairs are byte-identical, verified against actual
PNG bytes. Six additional paired probes verify wider hiding. Persian 320px updated and English
short-landscape delivery captures were viewed. No baselines/tolerances changed.
Next: extract bag feedback and recovery into a storefront organism.

**Eighty-fourth checkpoint verified:** StorefrontBagFeedback is extracted under
`templates/app/organisms/StorefrontBagFeedback/`. It receives an explicit removed/empty variant,
localized labels and action callback. It composes the removal Alert/Undo or empty-state recovery,
preserving wrapper classes, Undo ID/focus marker, button variants, empty h1/icon and content order.
View retains visibility and mounts the variants in the existing notice/empty layout slots, outside
conditional contents so final-item removal retains Undo. Bag/shared logic retains removed-line
data, Undo merging, reset/recovery behavior, persistence and focus restoration. The current empty
action restores the sample bag; this extraction forwards that callback. No page model, new state/
effects, browser APIs, commerce rules, styles or package exports move into the organism.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Four focused
bilingual desktop/mobile Undo cases pass without retries, including configured-line restoration,
other-item edits, persistence and final-item recovery. Eight bilingual before/after probes at touch
widths 390/768, desktop 1280 and TV 1920 verify initial absence, configured removal, Undo focus/marker,
retention of other edits, final-item notice plus empty h1/action, absent summary/sticky controls,
Undo restoration/focus, persisted empty state without stale Undo, tablet rotation, reset to sample
rows and reload persistence, no document overflow and full-page axe with empty/restored bags.
Touch uses taps; desktop/TV uses keyboard Enter. Full browser/device suites and TV spatial-arrow
navigation were not rerun.
All 32 notice/empty-region screenshot pairs are byte-identical, verified against actual PNG bytes.
Persian phone empty and English desktop removal captures were viewed. No baselines/tolerances
changed. Next: extract bag progress into a storefront organism.

**Eighty-fifth checkpoint verified:** StorefrontBagProgress is extracted under
`templates/app/organisms/StorefrontBagProgress/`. It receives explicit steps/current index,
completed-step callback, region/done labels and number/caption formatters. It composes compact
and wide Steppers, preserving wrappers/classes/order, CSS breakpoints and compact mode. View
retains visibility/mapping; bag/shared logic retains stage/URL state, localization and permitted
navigation. Shared Stepper retains ordered-list/current-step semantics and completed-step buttons.
No page model, new state/effects, browser APIs, commerce rules, styles or package exports move here.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Four focused
desktop/mobile transition/validation browser cases pass without retries. Eight bilingual paired
before/after probes at touch widths 390/768, desktop 1280 and TV 1920 verify one visible four-step
list, a single current step, no upcoming-step buttons, compact caption visibility, bag/delivery
state, completed-step return, URL/reload recovery, unchanged bag data, tablet compact/wide rotation,
empty-bag absence, no document overflow and full-page axe. Touch uses taps; desktop/TV navigation
uses keyboard Enter after page layout/focus settles. Full browser/device suites and TV spatial-arrow
navigation were not rerun.
All 16 bag/delivery progress screenshot pairs are byte-identical, verified against actual PNG bytes.
Persian phone delivery and English desktop delivery captures were viewed. No baselines/tolerances
changed. Next: extract bag recipient fields into a storefront organism.

**Eighty-sixth checkpoint verified:** StorefrontBagRecipient is extracted under
`templates/app/organisms/StorefrontBagRecipient/`. It receives a title, normalized saved-address
options/visibility/label and controlled name/phone descriptors with values, callbacks, errors and
labels. It composes the recipient h2, optional saved-address fieldset/chips and input grid as a
fragment inside the page-owned delivery section. Classes/order, title/input IDs, section label
relationship, required/error props, autocomplete, phone placeholder/direction and pressed states
are preserved. View retains mapping and surrounding delivery/map composition; bag/shared logic
retains eligibility/selection, recipient state, validation, persistence and pin/address updates.
No page model, new state/effects, browser APIs, commerce rules, styles or package exports move here.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Ten focused
desktop/mobile browser cases pass without retries: saved-address checkout, guest eligibility,
validation-summary focus and bilingual unpinned-address isolation. Twelve bilingual paired probes
cover guests at touch widths 390/768, desktop 1280 and TV 1920 plus seeded signed-in addresses at
390/1280. They verify required/type/direction/autocomplete semantics, section naming, unique title,
error-summary links/focus, invalid/cleared fields, typed English/Persian values and reload, tablet
rotation, address eligibility/pressed state, selected recipient/phone/address, null unpinned location,
no document overflow and full-page axe. Touch actions use taps; desktop/TV activation uses Enter.
Full browser/device suites and TV spatial-arrow navigation were not rerun.
Twenty-eight of 32 grid/saved-choice screenshot pairs are byte-identical, verified against PNG bytes.
Filled guest captures retain four small differences: English 390 (9 pixels), Persian 768 (14),
English 1280 (4) and English TV 1920 (18), all at 1/255 per channel. No baselines/tolerances changed.
Persian tablet errors and English desktop selected-address captures were viewed. Scratch probes
were corrected to scope shared classes to the recipient section and inspect native required
semantics; no source changes were needed for those probe errors.
Next: extract bag delivery location into a storefront organism.

**Eighty-seventh checkpoint verified:** StorefrontBagLocation is extracted under
`templates/app/organisms/StorefrontBagLocation/`. It receives explicit picker/zone/fallback/address
descriptors and composes LocationPicker, zone status, failed-map hint/Select and address Input as a
fragment. Classes/order, map/zone/address IDs, labels/status/errors, required/autocomplete settings
and every map adapter/lifecycle callback are preserved. View retains mapping and surrounding
recipient composition; bag/shared logic retains load/failure state, geolocation handling, location
updates, quoting/zone rules, fallback selection, validation, persistence and focus. No page model,
new state/effects, direct browser APIs, commerce rules, styles or package exports move here.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Eight of ten
focused desktop/mobile browser cases pass: required pin/order handoff, failed-map typed-address
checkout and bilingual unpinned saved-address isolation. Two existing zone-text cases fail because
they expect a same-day hint for the mixed sample bag; both reproduce on the unchanged baseline at
port 5174. Existing vfBagSameDay logic omits that hint when any line needs preparation. No test or
business-rule changes are included in this extraction.
Twelve bilingual paired probes cover map pending/error/pinned states at touch widths 390/768,
desktop 1280 and TV 1920, plus load-failure fallback at 390/1280. They verify pin-error summary focus,
touch pinning/keyboard map movement, numeric location, zone updates, cleared pin errors, full typed
address/zone selection in fallback, address/location/zone persistence, tablet rotation, overflow
and full-page axe. Map tiles are stubbed consistently. Full browser/device suites, live map tiles,
geolocation permission behavior and TV spatial-arrow navigation were not rerun.
Twenty-six of 32 pin/fallback screenshot pairs are byte-identical, verified against PNG bytes.
Four map captures differ by one pixel each (English desktop pending; English TV pending/error;
Persian TV pending). Selected fallback captures differ by 13 pixels in English desktop and five
in Persian desktop. All channel deltas
are 1/255. Persian phone pin error and desktop fallback captures were viewed. No baselines/
tolerances changed. Next: extract bag delivery scheduling into a storefront organism.

**Eighty-eighth checkpoint verified:** StorefrontBagSchedule is extracted under
`templates/app/organisms/StorefrontBagSchedule/`. It receives explicit title, preparation notice,
review descriptor and controlled day/slot descriptors with normalized options. It composes the
scheduling section/heading, preparation feedback, changed-window confirmation and ChoiceGroups,
preserving section/heading IDs, focusable review ID, classes/order, legends, tile sizes/widths,
descriptions and disabled states. View retains mapping; bag/shared logic retains preparation/zone/
cutoff rules, eligibility, date/slot state, persistence, changed-window detection/suggestion and
explicit confirmation/validation focus. No page model, new state/effects, browser APIs, commerce
rules, styles or package exports move here.
Unit/type/package tests, production app build and generated/format/CSS checks pass. All twelve
focused desktop/mobile browser cases pass without retries: bilingual mixed-bag eligibility,
cutoff/elapsed slots and changed-window confirmation through checkout. Eight bilingual paired
probes at touch widths 390/768, desktop 1280 and TV 1920 verify mixed preparation state/omitted
Today, same-day eligibility after removing the preparation item, seven days/four slots, day/time
selection, cutoff change and focused review without silently rewriting the chosen date, explicit
next-day confirmation, reload, tablet rotation, no document overflow and full-page axe. Touch uses
taps; desktop/TV uses Space for radio choices and Enter for actions. The scratch probe initially
assumed Today was disabled for mixed bags; it was corrected to the existing omission contract.
Full browser/device suites, the no-available-delivery branch and TV spatial-arrow navigation were
not rerun. The two prior baseline zone-hint assertion failures remain documented in stage 87.
Thirty-one of 32 scheduling screenshot pairs are byte-identical, verified against actual PNG bytes.
The Persian tablet selected-state capture differs by 35 pixels at 1/255 per channel. Persian phone
changed-window and English TV confirmed captures were viewed. No baselines/tolerances changed.
Next: extract bag gift-card messages into a storefront organism.

**Eighty-ninth checkpoint verified:** StorefrontBagCards is extracted under
`templates/app/organisms/StorefrontBagCards/`. It receives explicit labels, controlled card-addition
notice/Undo descriptor and normalized line records. It composes the cards section/heading/hint,
Undo Alert and per-line message/add controls, preserving section/heading/input/add IDs, labels,
accessible names, classes/order, textarea required/maxLength/rows, hints/errors, button styling and
independent hasCard/noCard flags. View retains visibility/mapping; bag/shared logic retains card
eligibility/configuration, pricing, add/Undo merging, message validation/persistence and focus.
No page model, new state/effects, browser APIs, commerce rules, styles or package exports move here.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Six focused
desktop/mobile browser cases pass without retries: purchased-message validation/card additions and
bilingual card Undo with pricing continuity. Eight bilingual paired probes at touch widths 390/768,
desktop 1280 and TV 1920 verify configured content, required/200-character/three-row props, add-card
focus, two message inputs, changed totals, error-summary link/focus, corrected messages, Undo
restoring the original second line and totals without reverting the first message, add-button focus,
reload persistence, tablet rotation, no document overflow and full-page axe. Touch uses taps;
desktop/TV actions use keyboard Enter. Full browser/device suites, hidden feature branch and TV
spatial-arrow navigation were not rerun; prior baseline zone-hint failures remain documented.
All 32 default/added/error/filled card-section screenshot pairs are byte-identical, verified against
actual PNG bytes. Persian phone error and English TV filled captures were viewed. No baselines/
tolerances changed. Next: extract bag sender fields into a storefront organism.

**Ninetieth checkpoint verified:** StorefrontBagSender is extracted under
`templates/app/organisms/StorefrontBagSender/`. It receives explicit title/hint labels and controlled
sender name/phone descriptors with values, callbacks, errors and labels. It composes the sender
section/heading/hint and grid, preserving section/heading/input IDs, classes/order, required/error
props, name autocomplete and shared PhoneInput keypad/direction/autocomplete/placeholder defaults.
View retains visibility/mapping; bag/shared logic retains sender state, signed-in prefill,
validation, persistence, customer isolation and error-summary focus. No page model, new state/
effects, browser APIs, commerce rules, styles or package exports move here.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Eight focused
desktop/mobile browser cases pass without retries: sender summary-link focus, signed-in saved-
address checkout/prefill and bilingual payment-draft persistence through delivery edits/reload.
Eight bilingual paired probes at touch widths 390/768, desktop 1280 and TV 1920 verify unique
heading/section naming, required/type/direction/autocomplete props, empty/error/filled fields,
summary links/focus, corrected English/Persian inputs, reload, bag/delivery round trips with values
retained, tablet rotation, no document overflow and full-page axe. Touch uses taps; desktop/TV
uses keyboard Enter after navigation layout/focus settles. Full browser/device suites and TV
spatial-arrow navigation were not rerun; prior baseline zone-hint failures remain documented.
Twenty-three of 24 default/error/filled sender-section screenshot pairs are byte-identical, verified
against actual PNG bytes. The Persian TV filled capture differs by four pixels at 1/255 per channel. Persian phone errors and English TV filled captures were viewed. No baselines/
tolerances changed. Next: extract bag delivery sign-in and validation feedback into a storefront
organism.

**Ninety-first checkpoint verified:** StorefrontBagDeliveryIntro is extracted under
`templates/app/organisms/StorefrontBagDeliveryIntro/`. It receives error records and an explicit
sign-in descriptor with visibility, prompt/label, href and callback. It composes ErrorSummary and
the guest prompt, preserving fragment order, `vf-errors` ID, classes, link semantics and button
styling/icon. View retains step visibility/mapping; bag/shared logic retains problems/validation,
guest eligibility, continuation/authentication and private draft/customer isolation. Shared
ErrorSummary retains accessible heading/list and target-focus behavior. The bag View's now-unused
DS import is removed after type checking identified it. No page model, new state/effects, browser
APIs, commerce rules, styles or package exports move here.
Final unit/type/package tests, production app build and generated/format/CSS checks pass. Eight
focused desktop/mobile browser cases pass without retries: error-summary focus, guest sign-in
return and bilingual customer-switch/private-data isolation. Eight bilingual paired probes at
touch widths 390/768, desktop 1280 and TV 1920 verify initial error absence, sign-in href/route,
guest recipient draft return, six-error summary/focus, all six target links/focus, four-error update,
tablet rotation, overflow and full-page axe. Eight additional paired fresh signed-in probes verify
prefilled sender phone and absence of guest prompt/initial errors. Touch uses taps; desktop/TV
activation uses Enter. Full browser/device suites and TV spatial-arrow navigation were not rerun;
prior baseline zone-hint failures remain documented.
All 24 prompt/full/reduced-summary screenshot pairs are byte-identical, verified against PNG bytes.
Persian phone full summary and English TV prompt captures were viewed. No baselines/tolerances
changed. Next: extract checkout delivery review into a storefront organism.

**Ninety-second checkpoint verified:** StorefrontCheckoutDeliveryReview is extracted under
`templates/app/organisms/StorefrontCheckoutDeliveryReview/`. It receives explicit title/edit labels,
edit href/callback and delivery detail rows. It composes the labelled section, Card, heading/edit
link and DetailList, preserving section/heading ID, classes/order, padding and edit styling/icon/
link semantics. View retains payment visibility/mapping; checkout/shared logic retains delivery
values/row formatting, edit/return navigation, drafts and payment/order behavior. No page model,
new state/effects, browser APIs, commerce rules, styles or package exports move here.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Eight focused
bilingual desktop/mobile browser cases pass without retries: delivery review edits and payment-
draft continuity through delivery edits/reload. Eight bilingual paired probes at touch widths
390/768, desktop 1280 and TV 1920 verify absence on the bag step, accessible review name/details,
edit href/minimum target height, delivery round trip, updated recipient/address, unchanged schedule/
totals, reload persistence, tablet rotation, no document overflow and full-page axe. Touch uses
taps; desktop/TV uses keyboard Enter. Full browser/device suites, bank/success visibility and TV
spatial-arrow navigation were not rerun; prior baseline zone-hint failures remain documented.
All 16 initial/edited review screenshot pairs are byte-identical, verified against actual PNG bytes.
Persian phone edited and English TV initial captures were viewed. No baselines/tolerances changed.
Next: extract checkout payment methods into a storefront organism.

**Ninety-third checkpoint verified:** StorefrontCheckoutMethods is extracted under
`templates/app/organisms/StorefrontCheckoutMethods/`. It receives explicit intro, controlled methods,
unavailable/wallet descriptors and payment notice. It composes RadioGroup/options, unavailable
contact Alert and wallet discount/top-up/remaining-balance context, preserving fragment order,
classes, group name/legend, labels/descriptions/disabled states and link/button semantics. View
retains mapping/normalized options; checkout/shared logic retains eligibility/zone rules, balance/
discount calculations, selection/draft persistence and top-up URLs. Receipt controls remain separate.
No page model, new state/effects, browser APIs, commerce rules, styles or package exports move here.
Unit/type/package tests, production app build and generated/format/CSS checks pass. Eight focused
desktop/mobile browser cases pass without retries: guest wallet disabling/description, top-up
savings hints and bilingual method/draft continuity through delivery edits/reload. Sixteen bilingual
paired probes cover guest choices at touch widths 390/768, desktop 1280 and TV 1920, plus wallet
and availability fixtures at 390/1280. They verify initial card selection, disabled guest wallet,
WhatsApp selection/reload, tablet rotation, selected wallet/balance context, top-up continuation
href, wallet/card switching, single-method chooser hiding, no-usable-method phone fallback and
card controls after restoring a usable method, no document overflow and full-page axe. Availability
fixtures mutate configuration only in isolated browser memory. Touch taps target radio labels;
the scratch probe initially targeted the hidden input wrapper and was corrected. Desktop/TV uses
Space for radios and Enter for actions. Full browser/device suites and TV spatial-arrow navigation
were not rerun; prior baseline zone-hint failures remain documented.
All 32 method/wallet/fallback screenshot pairs are byte-identical, verified against actual PNG bytes.
Persian phone guest options, English desktop wallet hint and Persian desktop fallback captures were
viewed. No baselines/tolerances changed. Next: extract checkout receipt details into a storefront
organism.

**Ninety-fourth checkpoint verified:** StorefrontCheckoutReceipt is extracted under
`templates/app/organisms/` with explicit change, card, Sheba, last-four and reference descriptors.
The organism preserves warning visibility independently of card visibility, warning/input IDs and
focus targets, PaymentCard props, optional Sheba direction/tooltip/copy, receipt grid classes,
numeric input mode/direction, maximum length and validation props. View maps data; checkout/shared
logic retains amount validation/confirmation, clipboard callbacks, digit normalization, errors,
drafts/persistence and order submission. No commerce rules, state/effects or browser APIs moved.
Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All ten focused
desktop/mobile browser cases pass without retries: bilingual changed-total confirmation blocking,
receipt-draft continuity through delivery edits/reload and English Sheba tooltip descriptions.
Eight bilingual paired probes at touch widths 390/768, desktop 1280 and TV 1920 verify invalid and
filled receipt fields, Persian digit normalization, changed-total focus/blocking/confirmation,
reload persistence, method hiding/restoration, tablet rotation, no document overflow and full-page
axe. Optional Sheba fixtures at 390/1280 verify bdi direction, tooltip descriptions and Sheba/card
copy callbacks using an isolated test clipboard. Configuration changes stay in browser memory.
Desktop tooltip hover stalled on the unchanged baseline in the scratch probe; explicit keyboard
focus passes on both versions. Existing focused tooltip hover tests pass. Full browser/device
suites and TV spatial-arrow navigation were not rerun; prior baseline zone-hint failures remain
documented. No baselines or tolerances changed.
All 36 card/invalid/filled/changed/Sheba screenshot pairs are byte-identical, verified against
actual PNG bytes. Persian phone warning, English tablet filled inputs, Persian desktop Sheba and
English TV payment-card captures were viewed. Next: extract checkout submission actions and
feedback into a storefront organism.

**Ninety-fifth checkpoint verified:** StorefrontCheckoutSubmission is extracted under
`templates/app/organisms/` with explicit WhatsApp, processing, failure, safety and place/back
props. Fragment order, external-link target/rel, processing status role, alert tones/icon,
responsive classes and button variants/sizes/icons/loading/disabled props are preserved. View
maps descriptors; checkout/shared logic retains readiness/receipt validation, submission,
deduplication, pending/error state, retries, method selection, URLs, navigation, gateway handling
and persistence. The compact action remains in Shell's separate sticky slot. Ownership and
edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 18 focused
mobile/desktop browser tests pass without retries: bilingual late-response bag integrity,
changed-receipt confirmation and reviewed WhatsApp URLs, plus card completion/account offer,
online bank return and declined-payment retry. Eight bilingual paired probes at touch widths
390/768, desktop 1280 and TV 1920 pass back/return continuity, WhatsApp URL/target/rel,
pending status/disabled controls with one request, preserved bag after rejection, explicit retry,
other-method recovery, retained receipt fields, successful completion and cleared bag. Tablet
rotation, settled-page axe and document overflow are checked. API promises are controlled only
in isolated browser memory; no external WhatsApp handoff is opened. The scratch TV probe needed
a settled delivery page before keyboard activation to avoid the existing delayed heading-focus
move; both versions pass with that wait. Full browser/device suites and TV spatial-arrow
navigation were not rerun; prior baseline zone-hint failures remain documented.

Of 32 tall payment-pane screenshot pairs, 27 are byte-identical. The five differences are English
phone idle/pending/failure and Persian tablet pending/failure. Inspected tall captures include
fixed-header/skip-link overlays at differing scroll positions; the first English phone render
also differs in text weights. CSS/font assets hash identically and a fresh English phone idle
repeat matches exactly. Diagnostic full-page clips did not reliably cover the requested region,
so they are excluded from visual evidence. Original comparisons remain recorded; no baselines or
tolerances changed.
Twelve direct element/action-row pairs for the two affected configurations are byte-identical:
safety notice, place/back row, WhatsApp link, processing status, failure Alert and retry row.
Their actual PNG bytes were checked; English phone failure/retry and Persian tablet
processing/actions captures were viewed. Next: extract checkout status notices into a storefront
organism.

**Ninety-sixth checkpoint verified:** StorefrontCheckoutNotices is extracted under
`templates/app/organisms/` with explicit review and saveError props. Both notices retain their
independent conditions and order, warning/danger tones, secondary review action and the
vf-payment-review ID/tabIndex focus target. The layout keeps notices outside payment visibility,
including bank-status transitions. View maps descriptors; checkout/shared logic retains retry
eligibility, expiry/stock/customer checks, recovery storage, error state, focus requests, clearing
pending records and review navigation. No rules, state/effects or browser APIs moved. Ownership
and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All eight focused
mobile/desktop browser tests pass without retries: bilingual durable recovery-record blocking and
successful recovery/reload, plus expired retry focus/blocking and return to delivery review.
Paired probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920. They
verify no notices initially, storage-error-only before redirect, warning-only after an expired
bank retry, storage-error-only during bank status and both notices together in the original DOM
order. Warning focus/tabIndex, no completed order, preserved method, bank visibility, action
navigation, delivery review and removal of the pending session record are checked. Tablet rotation,
document overflow and full-page axe are covered. Storage failure injection is restricted to
vf-online-payment keys in isolated browser contexts and restored before review navigation.
Full browser/device suites and TV spatial-arrow navigation were not rerun; prior baseline zone-hint
failures remain documented. No baselines or tolerances changed.
All 40 notice screenshot pairs are byte-identical, checked against actual PNG bytes. Persian
phone review, English phone storage error, Persian desktop bank error and English TV combined-state
review captures were viewed. Next: extract checkout progress and heading into a storefront organism.

**Ninety-seventh checkpoint verified:** StorefrontCheckoutProgress and
StorefrontCheckoutHeading are extracted under `templates/app/organisms/` with explicit
step/current/labels/formatters/optional callback and title/accent props. Progress shares compact
and wide Steppers across payment, bank and success, retaining breakpoint wrappers, ordered lists,
current/completed semantics, labels and compact captions. The payment-only spacing wrapper stays
in View; bank/success gain no wrapper and receive no navigation callback. Heading preserves the
h1/em, whitespace, spacing and accent classes. View/logic retain state visibility, current indices,
localized method wording, permitted navigation and focus effects. No state/effects, browser APIs
or payment rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All ten focused
mobile/desktop browser tests pass without retries: bilingual receipt continuity through delivery
edits/reload, card completion/account offer, paid bank return and declined-payment retry. Paired
probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920. They check payment
index 2, success index 3, four labeled steps, localized compact captions, two permitted payment
step buttons and no bank/success step buttons. Both completed steps return to the correct bag or
delivery stage, preserving address and receipt fields through continuation and restoring heading
focus. Card accent text and online/COD/WhatsApp headings, a single h1, payment-heading absence
during bank/success, bank-to-card recovery and completion are checked. Tablet rotation, settled
page axe and document overflow are covered. Bank flow uses the local demo; no external payment
or WhatsApp handoff is opened. Full browser/device suites and TV spatial-arrow navigation were
not rerun; prior baseline zone-hint failures remain documented. No baselines or tolerances changed.
All 56 payment-progress, card/online/COD/WhatsApp heading and bank/success progress screenshot pairs
are byte-identical, verified against actual PNG bytes. Persian phone payment/success captions,
English phone card heading, English desktop bank progress and Persian TV success progress were
viewed. Next: extract checkout bank status into a storefront organism.

**Ninety-eighth checkpoint verified:** StorefrontCheckoutBank is extracted under
`templates/app/organisms/` with explicit progress, payment and action descriptors. It composes
StorefrontCheckoutProgress and PaymentStatus in the original fragment order without adding a DOM
wrapper. Current index/formatters, status/amount/order/redirect/support props, recovery callbacks
and headingLevel 1 are preserved. Layout retains the bank wrapper and outside notices. View/logic
retain bank visibility, recovery records, redirect data, retry checks, method switching,
verification/completion and persistence. PaymentStatus retains redirect forms/timers, localized
copy, heading focus and result tracking. No rules, state/effects or browser APIs moved. Ownership
and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 14 focused
storefront browser tests pass without retries: paid bank return, declined-payment retry,
missing-record safety and bilingual durable-recovery/expired-retry flows across mobile/desktop.
All seven PaymentStatus component browser tests pass: POST/GET fields and automatic redirect,
failed/cancelled actions, pending/check behavior, heading focus, Persian wording and bilingual axe.
Paired probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920, comparing
failed, cancelled, pending-with-record, pending-without-record and bank progress. They check
single h1/focus, noninteractive progress, support tel links, preserved receipt fields after other
method, cancellation retry completion, check-again verifying/aria-busy then completion, clearing
recovery records, no duplicate-pay action for pending status and no order from an unknown return.
Tablet rotation, document overflow and settled-page axe are covered. Recovery fixtures restore
the actual prepayment local/tab session and use a stable numeric order ID for visual comparison.
The original route and checkout-snapshot guards remain in use. Only local demo bank returns are
opened. Full browser/device suites and TV spatial-arrow navigation were not rerun; prior baseline
zone-hint failures remain documented. No baselines or tolerances changed.
All eight paired behavior probes pass. Of 40 screenshot pairs, 39 are byte-identical. Persian TV
pending-with-record differs by 13 pixels with maximum channel delta 1/255, confined to the clock
icon (x476-535/y85-113 in the 1016x973 capture). Actual PNG bytes/deltas were checked and both
images were viewed. English phone missing-record, Persian phone cancelled, Persian tablet pending,
Persian desktop missing-record and English TV failed captures were also viewed. Next: extract
checkout confirmation into a storefront organism.

**Ninety-ninth checkpoint verified:** StorefrontCheckoutConfirmation is extracted under
`templates/app/organisms/` with explicit progress, heading, status, rows, account and links props.
It preserves noninteractive completion progress, h1/check/accent semantics, status Badge, details,
conditional account Card and track/shop actions in the original fragment order without adding a
wrapper. Classes, full-width detail/account wrappers, Card padding/variant and button variants/icons
are retained. Layout owns the success wrapper; View/logic retain completion state, copy/status,
detail formatting, account eligibility/prefill, destinations, orders and persistence. No state,
effects, browser APIs or commerce rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All eight focused
mobile/desktop browser tests pass without retries: card completion/account offer and tracking/sign-in
prefill, online completion and bilingual order-history persistence/lookup. Paired guest and signed-in
flows exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920. They check the single
focused h1, order eyebrow, payment Badge, recipient/sender/address/phone/reference/masked-card rows,
completion index 3 with no step buttons, guest-only account offer and sender-phone wording, tracking/
shop URLs, reload continuity, empty bag and a single persisted order. Guest links are activated to
tracking, shop and sign-in; the phone is prefilled without requesting a code. Tablet rotation,
document overflow and full-page axe are covered. Each flow places a local demo card order, then
normalizes its order/last-order/history ID together for deterministic visuals in an isolated context.
Card is selected explicitly for both customer states. Full browser/device suites and TV spatial-arrow
navigation were not rerun; prior baseline zone-hint failures remain documented. No baselines or
tolerances changed.
All guest/signed-in paired flows pass. All 48 heading/status/details/account/actions/signed-details
screenshot pairs are byte-identical, verified against actual PNG bytes. English phone heading,
Persian phone account offer, Persian tablet signed-in details, English desktop actions and Persian
TV heading captures were viewed. Next: extract checkout summary and sticky action into storefront
organisms.

**One hundredth checkpoint verified:** StorefrontCheckoutSummary and StorefrontCheckoutSticky
are extracted under `templates/app/organisms/` with explicit title/lines/sums and summary/place
props. Summary retains Card padding 20 and OrderSummary props. Sticky retains the total/caption/
price classes, Price size and primary button icon/loading/disabled props. View retains visibility,
formatting and validation/submission callbacks; logic retains totals, quote/payment rules and
pending/error state. Layout retains the summary column/sticky panel; Shell/BottomBar retain compact
docking, measurements and focus behavior. Checkout View now composes storefront organisms/layouts
and no longer imports package DS components directly. No rules, state/effects or browser APIs
moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 16 focused
mobile/desktop browser tests pass without retries: bilingual changed-receipt guards and late-response
bag integrity, promo totals carried to checkout, card completion and bilingual real-touch field
clearance above phone bars at 390x450. Paired probes exercise English/Persian at touch widths
390/768, desktop 1280 and TV 1920. They check two summary lines, summary/sticky total agreement,
phone-only compact visibility, invalid-receipt focus, changed-amount focus/blocking/confirmation,
updated totals, online/card label continuity and preserved card digits. Controlled API promises
verify pending loading/disabled controls with one request, retained summary after rejection,
explicit retry, one completed order with the updated quantity/total, empty bag and hidden summary/
sticky on completion. Repeat touch activation of the pending phone action does not add a request.
Tablet rotation, initial-page axe and document overflow are covered. API mutations stay in isolated
browser contexts. Full browser/device suites and TV spatial-arrow navigation were not rerun; prior
baseline zone-hint failures remain documented. No baselines or tolerances changed.
All eight paired probes pass. All 34 initial/updated/pending summary and phone card/updated/online/
pending/failed action screenshot pairs are byte-identical, verified against actual PNG bytes.
Persian phone online action, English phone pending action, Persian tablet updated summary and English
TV pending summary captures were viewed. Next: extract account orders into a storefront organism.

**One hundred and first checkpoint verified:** StorefrontAccountOrders is extracted under
`templates/app/organisms/` with explicit normalized order presentation records. It retains the
orders grid/body/number/meta/total classes, positional keys, LTR order numbers, Card padding 20,
Badge tone/text and secondary small tracking links. View retains tab visibility/list normalization;
account/shared logic retains history selection, customer isolation, status interpretation, localized
formatting, destinations and persistence. No state, effects, browser APIs or commerce rules moved.
Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 10 focused
mobile/desktop browser tests pass without retries: bilingual older-order reload/tracking, sign-out
and guest continuation/customer-switch isolation. Eight paired baseline/current probes exercise
English/Persian at touch widths 390/768, desktop 1280 and TV 1920. They compare sample-only history
and four explicit received/delivered/cancelled/unknown-status records, preserving IDs, text, order,
LTR direction and tracking destinations. Touch/keyboard tracking activation, tab continuity, reload,
tablet rotation, document overflow and full-page axe pass. Account logic continues to append sample
history; an empty presentation array is still rendered as an empty grid. Full browser/device suites
and TV spatial-arrow navigation were not rerun; prior baseline zone-hint failures remain documented.
No screenshot baselines or tolerances changed.

All eight paired probes pass. Of 40 sample/populated card screenshot pairs, 38 are byte-identical.
The English phone sample and received cards differ by 4 and 5 pixels respectively, each with maximum
channel delta 1/255, verified against actual PNG bytes and viewed side by side. Persian phone cancelled,
Persian tablet delivered, English desktop received and Persian TV fallback-status captures were also
viewed. Next: extract account balance overview into a storefront organism.

**One hundred and second checkpoint verified:** StorefrontAccountBalanceOverview is extracted
under `templates/app/organisms/` with explicit title, formatted amount and status props. It preserves
Card padding 24, the label/amount IDs and aria-labelledby relationship, amount typography, status
classes and fragment order without adding a wrapper. View retains balance-tab visibility and the
surrounding top-up/history composition; account/shared logic retains wallet reads, customer scope,
discount eligibility, formatting, mutations and persistence. No state, effects, browser APIs or
commerce rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. The 10 focused
mobile/desktop browser tests finish with nine passing initially and one passing on retry: bilingual
wallet top-up/checkout return, balance-discount payment and profile edits preserving newer wallet
data. The Persian desktop profile test initially timed out waiting for #main on page load, then
passed on retry and in an isolated rerun with retries disabled. Eight paired baseline/current probes
exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920. Initial sample balances,
99-million below-threshold balances and 109-million topped-up balances retain identical copy and
amounts across versions. The probes check the label relationship, invalid-input focus with unchanged
balance, touch/keyboard top-up activation, completion focus, eligibility transition, persisted wallet
value, reload/tab continuity, tablet rotation, document overflow and full-page axe. Sample accounts
are initially computed without a storage write; the below-threshold fixture explicitly saves a valid
per-phone account before reload. Full browser/device suites and TV spatial-arrow navigation were not
rerun; prior baseline zone-hint failures remain documented. No baselines or tolerances changed.

All eight paired probes pass. Of 24 initial/below-threshold/topped-up Card screenshot pairs, 23 are
byte-identical. The English phone below-threshold capture differs by four pixels with maximum channel
delta 1/255, verified against actual PNG bytes and viewed side by side. Persian phone topped-up,
Persian tablet below-threshold, English desktop topped-up and Persian TV initial captures were also
viewed. Next: extract account top-up controls into a storefront organism.

**One hundred and third checkpoint verified:** StorefrontAccountTopUp is extracted under
`templates/app/organisms/` with explicit title/quick-label/presets, amount/payment descriptors and
demo text. It preserves the section and heading/input/completion IDs, positional preset keys,
pressed state/callbacks, numeric LTR input props, loading/disabled primary banknote button, status
roles and completion focus target. View retains tab visibility, list normalization and the surrounding
checkout-return/history composition. Account/shared logic retains parsing/limits, validation/focus,
pending timer, customer scope, wallet changes, storage errors, analytics and persistence. No state,
effects, browser APIs or payment rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All six focused
mobile/desktop browser tests pass without retries: bilingual top-up/checkout return and top-up followed
by balance-discount payment. Eight paired baseline/current probes exercise English/Persian at touch
widths 390/768, desktop 1280 and TV 1920. They check numeric/LTR/autocomplete props, empty/min/max
validation, invalid-input focus, quick-preset pressed state, localized digits/separators, controlled
pending/disabled feedback and repeat activation without a second timer. Blocking only account storage
writes preserves the balance/input on failure; restoring writes and explicitly retrying adds ten
million once, focuses completion, clears the amount and persists the resulting balance/history after
reload. The 600ms demo timer is controlled only inside isolated probe contexts. Tablet rotation,
document overflow and full-page axe pass. Full browser/device suites and TV spatial-arrow navigation
were not rerun; prior baseline zone-hint failures remain documented. No baselines or tolerances changed.

All eight paired probes pass. Of 48 initial/empty/selected/pending/failed/done section screenshot
pairs, 37 are byte-identical. The other 11 differ by 2–29 pixels with maximum channel deltas 1–6/255,
verified against actual PNG bytes. English phone failure, Persian phone pending/failure, Persian tablet
empty validation, Persian desktop failure and Persian TV selected captures were viewed side by side.
Next: extract account balance history into a storefront organism.

**One hundred and fourth checkpoint verified:** StorefrontAccountBalanceHistory is extracted
under `templates/app/organisms/` with explicit title, empty/list visibility flags, empty text and
normalized entry records. It preserves the heading ID/section label, empty paragraph, list/row classes,
positional keys, label/date order, signed amount text and data-tone attributes without adding a
wrapper. View retains balance-tab visibility, normalization and surrounding overview/top-up/checkout-
return composition; account/shared logic retains wallet/customer scope, ordering, history mapping,
localized dates/amounts, bidi isolation and persistence. No state, effects, browser APIs or wallet
rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 10 focused
mobile/desktop browser tests pass without retries: bilingual top-up/checkout return, balance-discount
payment/history and guest continuation/customer-switch isolation. Eight paired baseline/current
probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920. They compare sample,
empty and mixed incoming/outgoing history, check section/heading relationships, empty/list visibility,
signed amounts and tones, isolated currency text/order numbers, and unchanged prior entries when a
real demo top-up inserts a new first entry. Reload and tab continuity retain all three entries; touch/
keyboard top-up activation, tablet rotation, document overflow and full-page axe pass. Fixtures save
valid per-phone accounts; the probe's initial Persian empty-copy expectation was corrected to the
existing source wording before continuing. The clock is reset immediately before top-up so dates
match between versions. Full browser/device suites and TV spatial-arrow navigation were not rerun;
prior baseline zone-hint failures remain documented. No baselines or tolerances changed.

All eight paired probes pass. All 32 sample/empty/mixed/added history screenshot pairs are
byte-identical, verified against actual PNG bytes. English phone empty/added, Persian phone mixed,
Persian tablet added, English desktop sample and Persian TV added captures were viewed.
Next: extract account saved products into a storefront organism.

**One hundred and fifth checkpoint verified:** StorefrontAccountSaved is extracted under
`templates/app/organisms/` with explicit populated/empty visibility flags, normalized product records,
labels and shop destination. It preserves grid/empty classes, positional keys, ProductCard content and
image/stock/badge props, accent badge/soft frame, favorite state/removal callbacks, product links and
heart empty-state/browse action without adding a wrapper. View retains saved-tab visibility and list
normalization; account/shared logic retains customer scope, favorite synchronization/persistence,
product mapping, availability, localized wording/formatting and destinations. No state, effects,
browser APIs or favorite/product rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 14 focused
mobile/desktop browser tests pass without retries: account/saved-page synchronization, bilingual
late saved-list hydration preserving newer actions, customer-switch isolation and saved-page
removal/undo. Eight paired baseline/current probes exercise English/Persian at touch widths 390/768,
desktop 1280 and TV 1920. They compare populated/single/empty states, initial content/destinations
and pressed favorites; activate product links to the matching detail page; remove products with focus
moving to the next favorite; and verify persistence/tab continuity and saved-page synchronization.
Removing the last product retains the empty state across reload, clears the saved page and allows
browse recovery to the shop. Touch/keyboard activation, tablet rotation, document overflow and
populated/empty full-page axe pass. Full browser/device suites and TV spatial-arrow navigation were
not rerun; prior baseline zone-hint failures remain documented. No baselines or tolerances changed.

All eight paired probes pass. All 24 populated/single/empty screenshot pairs are byte-identical,
verified against actual PNG bytes. English phone populated/empty, Persian phone single, Persian tablet
empty, English desktop populated and Persian TV single captures were viewed.
Next: extract account addresses into a storefront organism.

**One hundred and sixth checkpoint verified:** StorefrontAccountAddresses is extracted under
`templates/app/organisms/` with explicit map, normalized address records, labels and add descriptors.
It preserves the map ID/margin/height and loader/tiles/center/zoom/marker/failure props, grid classes,
positional keys, AddressCard content/default/edit/delete callbacks and add-button ID/type/classes.
View retains tab visibility and list normalization; account/shared logic retains customer scope,
location eligibility/formatting, map failure state, editor state/validation/focus, address mutations and
persistence. PlacesMap retains its map lifecycle. No state, effects, browser APIs or address rules
moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 14 focused
mobile/desktop browser tests pass without retries: map/editor pin entry, complete error summary,
bilingual storage-failure retry, saved-address delivery and unpinned-address isolation. Eight paired
baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920.
They check marker-to-editor entry, making Office default, editing Home and reload persistence,
deleting the default and promoting Home, deleting all addresses, add/cancel and focus return, hidden
map with no locations, and failed Leaflet-loader fallback with usable cards/editor. Tab continuity,
touch/keyboard activation, tablet rotation and document overflow pass. Full-page axe passes from the
page-top position for populated/empty/fallback states. An initial unchanged-baseline phone audit after
screenshot scrolling reported a target-size violation on one React Aria control; that scroll-position
result is retained separately and is not claimed fixed by this extraction. Full browser/device suites
and TV spatial-arrow navigation were not rerun; prior baseline zone-hint failures remain documented.
No baselines or tolerances changed.

All eight paired behavior probes pass. Of 40 map/initial/default/empty/fallback screenshot pairs,
38 are byte-identical. The Persian tablet and English TV maps differ in tile-background paint by
22,534 and 27,291 pixels respectively, each with maximum channel delta 14/255; actual PNG comparisons
and side-by-side inspection retain those original results. Separate map-only rechecks wait for all
rendered tile images to complete at full opacity; both resulting pairs are byte-identical, with no
CSS/opacity overrides. English phone map/initial/fallback, Persian phone default, English tablet empty,
Persian tablet and English TV original/rechecked maps, and Persian TV default captures were viewed.
Next: extract account reminders into a storefront organism.

**One hundred and seventh checkpoint verified:** StorefrontAccountReminders is extracted under
`templates/app/organisms/` with explicit add, empty/upcoming feedback, introduction, normalized
reminder records, shop destination and labels. It preserves wrapper/intro classes, add ID/plus icon,
neutral upcoming Alert and separator, positional keys, ReminderRow dates/occasion/channel/on/soon
props, toggle/edit/delete callbacks and shop links. View retains tab visibility and list normalization;
account/shared logic retains customer scope, calendar/date calculations, ordering/upcoming selection,
localized formatting, editor state/validation/focus, mutations and persistence. No state, effects,
browser APIs or reminder rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All eight focused
mobile/desktop browser tests pass without retries: bilingual reminder validation/save/reload/focus
return and customer-switch isolation. Eight paired baseline/current probes exercise English/Persian
at touch widths 390/768, desktop 1280 and TV 1920. They compare sample content and fixture upcoming/
active/paused/empty/added states, activate the upcoming shop link, toggle off/on with alert changes,
edit an existing name and retain it after reload, delete all reminders, validate an empty new name,
and add a new reminder that survives reload/tab changes. Calendar dates, alternate dates, channel/
occasion text, ordering and paused/send-link visibility remain equal across versions. The initial
probe expectation for existing-edit focus was corrected to the baseline's Edit opener; editing returns
to Edit, while deletion/addition return to Add. Touch/keyboard activation, tablet rotation, document
overflow and full-page axe at page top pass. Full browser/device suites and TV spatial-arrow navigation
were not rerun; earlier baseline accessibility/zone-hint limitations remain documented. No baselines
or tolerances changed.

All eight paired probes pass. All 40 upcoming/active/paused/empty/added screenshot pairs are
byte-identical, verified against actual PNG bytes. English phone active/paused/empty, Persian phone
upcoming, Persian tablet added, English desktop paused and Persian TV active captures were viewed.
Next: extract account profile controls into a storefront organism.

**One hundred and eighth checkpoint verified:** StorefrontAccountProfile is extracted under
`templates/app/organisms/` with explicit problems and name/phone/email/language/SMS/save descriptors.
It preserves the wrapper classes, summary/field IDs, name autocomplete, disabled LTR phone and hint,
email type/direction/error/hint, language options/hint, SMS switch and primary save action without
adding a wrapper. View retains tab visibility and descriptor mapping; account/shared logic retains
customer identity/scope, drafts/changed-field tracking, validation/focus, merging against newer account
data, save feedback, locale switching and persistence. No state, effects, browser APIs or profile
rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 14 focused
mobile/desktop browser tests pass without retries: profile persistence, bilingual storage-failure
retry, newer-wallet/account preservation and customer-switch isolation. Eight paired baseline/current
probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920. They check name
autocomplete, disabled/unchanged LTR phone, email type/direction, invalid-email field focus and summary
link navigation, error clearing, retained name/email/SMS drafts on storage failure, successful retry,
saved feedback and persisted values. Language selection changes only the preference until save,
then updates the page language and persists across reload; profile values and SMS state also survive
tab changes. Touch/keyboard activation, tablet rotation, document overflow and full-page axe at page
top for invalid/saved states pass. Storage blocking affects only account keys in isolated probe
contexts. Full browser/device suites and TV spatial-arrow navigation were not rerun; earlier baseline
accessibility/zone-hint limitations remain documented. No baselines or tolerances changed.

All eight paired probes pass. Of 48 phone/summary/email-error/storage/saved-name/language screenshot
pairs, 46 are byte-identical. Both phone language-field pairs differ by seven pixels each with maximum
channel delta 1/255, verified against actual PNG bytes and viewed side by side. English phone summary,
Persian tablet email error, English tablet storage feedback, English desktop phone and Persian TV
language captures were also viewed.
Next: extract account address editor fields into a storefront organism.

**One hundred and ninth checkpoint verified:** StorefrontAccountAddressEditor is extracted under
`templates/app/organisms/` with explicit label/zone/pin/address/recipient/phone descriptors. It preserves
field/map IDs, compact LocationPicker props/callbacks, independent map/fallback visibility, pin wrapper/
fallback classes, multiline address/error/autocomplete, recipient autocomplete and PhoneInput/error.
It returns a fragment so the existing dialog retains spacing. View retains address-branch visibility,
the shared dialog, storage alert, error summary and save/cancel actions; account/shared logic retains
drafts, location/zone rules, map/geolocation failure state, validation/focus, customer scope, mutations
and persistence. LocationPicker retains its map/geolocation lifecycle. No state, effects, browser APIs
or address rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 14 focused
mobile/desktop browser tests pass without retries: map/editor pin entry, complete error summary,
bilingual storage-failure retry, saved-address delivery and unpinned-address isolation. Eight paired
baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920.
They check blank-field validation with three focused-summary links, address-link focus, single missing-
pin focus/description, zone selection retained with pin changes, controlled geolocation failure and
error clearing on map movement, localized phone entry with tel/keypad/LTR/autocomplete semantics,
filled field parity, save/reopen/edit/reload, discarded cancellation drafts and opener focus return.
The selected zone and typed phone persist with valid coordinates. A failed Leaflet load retains typed-
address saving without a location; that address remains unpinned after reload. Tablet rotation with
the dialog open, document overflow and full-page axe for invalid/fallback dialogs and the settled
account pass. Geolocation denial and map failure are controlled only in isolated probe contexts.
Full browser/device suites and TV spatial-arrow navigation were not rerun; earlier baseline
accessibility/zone-hint limitations remain documented. No baselines or tolerances changed.

All eight paired probes pass. All 40 summary/pin-error/address/phone/fallback screenshot pairs are
byte-identical, verified against actual PNG bytes. English phone summary/pin-error/fallback, Persian
phone phone field, Persian tablet address, English desktop pin error and Persian TV fallback captures
were viewed.
Next: extract account reminder editor fields into a storefront organism.

**One hundred and tenth checkpoint verified:** StorefrontAccountReminderEditor is extracted
under `templates/app/organisms/` with explicit name/occasion/date/lead-time/channel descriptors.
It preserves name/date IDs, field order, errors, option/value/change props and DatePicker yearly/
language/disabled/hint/labels props. It returns a fragment so the shared dialog retains spacing.
View retains reminder-branch visibility, dialog, storage alert, error summary and save/cancel actions;
account/shared logic retains drafts, calendar/date rules, fixed/movable occasion dates, lead-time
conversion, validation/focus, customer scope, mutations and persistence. DatePicker retains calendar
interaction. No state, effects, browser APIs or reminder rules moved. Ownership and edit-location
documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All eight focused
mobile/desktop browser tests pass without retries: bilingual reminder validation/save/reload/focus
return and customer-switch isolation. Eight paired baseline/current probes exercise English/Persian
at touch widths 390/768, desktop 1280 and TV 1920. They check name validation/focus and summary target,
Gregorian February 28 selection and Shamsi/Gregorian round-trip month/day continuity, Nowruz's locked
month/day controls and fixed-date hint, Mother's Day's calculated/locked date and movable-date hint,
returning to editable anniversary dates, one-week lead time and WhatsApp channel selection. Account-
only storage failure retains the draft for retry; saving/reopening/editing/cancelling and reload retain
expected date/occasion/lead-time/channel values with opener focus return. The probe's initial calendar
button lookup was corrected to the existing radio roles exposed by React Aria's single-selection group.
Touch/keyboard activation, tablet rotation with the dialog open, document overflow and full-page axe
for invalid/movable-date dialogs and the settled account pass. Full browser/device suites and TV
spatial-arrow navigation were not rerun; earlier baseline accessibility/zone-hint limitations remain
documented. No baselines or tolerances changed.

All eight paired probes pass. Of 40 name-error/editable/fixed/movable/channel screenshot pairs,
28 are byte-identical. The remaining 12 differ by 3–170 pixels with maximum channel deltas 1–4/255,
verified against actual PNG bytes. English phone name-error/fixed, Persian phone channel, English
tablet editable, Persian tablet fixed/movable, Persian desktop editable and English desktop fixed
captures were viewed side by side; Persian phone and TV movable-date captures were also viewed.
Next: extract the shared account editor dialog into a storefront organism.

**One hundred and eleventh checkpoint verified:** StorefrontAccountEditorDialog is extracted
under `templates/app/organisms/` with explicit open/title/close, storage error, problems, save/cancel
labels/actions and field children. It preserves Dialog props, flex/gap wrappers, conditional danger
Alert, error-summary ID, field position and primary-save/ghost-cancel action order. It adds no wrapper
around supplied fields. View retains address/reminder branch selection and descriptor mapping;
account/shared logic retains drafts, validation/summary/field focus, save/error state, customer scope,
mutations and persistence. Dialog retains portal/dismissal/focus containment/opener restoration.
No state, effects, browser APIs or account rules moved. Current ownership/edit-location documentation
for both field organisms and the account layout is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 16 focused
mobile/desktop browser tests pass without retries: bilingual reminder validation/save/reload/focus,
address map/pin entry and error summaries, storage-failure retry and customer-switch isolation.
Eight paired baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV 1920. Both editor branches retain labelled titles, Tab/ShiftTab containment, save/cancel
variants, summary links/focus, storage-error feedback with retained drafts, successful retry and saved
values after reload. Cancel, Escape and Close discard drafts and restore their Add/Edit openers;
reopening clears old errors and uncommitted values. Tablet rotation with an open dialog retains width
containment; document overflow and full-page axe for invalid/storage-error dialogs and settled account
pass. One initial unchanged-baseline English tablet Close check did not restore Add focus; the same
assertion passes on an unchanged rerun and on the extracted version, with the original failure retained
separately. It is not claimed fixed by this extraction. Full browser/device suites and TV spatial-arrow
navigation were not rerun; earlier baseline accessibility/zone-hint limitations remain documented.
No baselines or tolerances changed.

All eight paired probes pass after that baseline recheck. All 48 address/reminder summary/storage/
actions screenshot pairs are byte-identical, verified against actual PNG bytes. English phone address
storage/reminder actions, Persian phone address summary, English tablet address actions, Persian
tablet reminder summary, Persian desktop reminder storage and Persian TV address actions were viewed.
Next: extract account heading into a storefront organism.

**One hundred and twelfth checkpoint verified:** StorefrontAccountHeading is extracted under
`templates/app/organisms/` with explicit eyebrow/title/accent text. It preserves eyebrow classes,
the title's trailing space, single h1, semantic em/accent classes and fragment order without adding
a wrapper. StorefrontAccountLayout retains the heading/header wrappers; View/logic retain localized
copy, visibility and navigation/focus behavior. No state, effects, browser APIs or account rules moved.
Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All eight focused
mobile/desktop browser tests pass without retries: bilingual older-order reload/tracking, profile
persistence and sign-out protection. Eight paired baseline/current probes exercise English/Persian at
touch widths 390/768, desktop 1280 and TV 1920. They check localized h1/accent content, a single main
h1, direct eyebrow/h1 children, exact heading markup across versions and after profile-tab activation
and reload, tablet rotation, document overflow and full-page axe. Full browser/device suites and TV
spatial-arrow navigation were not rerun; earlier baseline accessibility/zone-hint limitations remain
documented. No baselines or tolerances changed.

All eight paired probes pass. All eight heading screenshot pairs are byte-identical, verified against
actual PNG bytes. English/Persian phone, Persian tablet and English TV captures were viewed.
Next: extract account tab controls into a storefront organism.

**One hundred and thirteenth checkpoint verified:** StorefrontAccountTabs is extracted under
`templates/app/organisms/` with explicit items/value/change/label and selected-panel children.
It preserves the pill variant, scrolling list classes, panel class and child placement without
adding a wrapper. View retains panel visibility/mapping; account/shared logic retains eligibility,
allowed-tab selection/fallback, routing and state. Package Tabs retains ARIA links, roving focus and
RTL keyboard behavior; shared TV navigation retains edge handoff. No state, effects, browser APIs or
account rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 16 focused
mobile/desktop browser tests pass without retries: bilingual reminder validation, address editing,
saved-product parity, profile persistence, wallet return and sign-out protection. Eight paired
baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920.
They check selected-tab/panel ARIA linkage, one roving tab stop, mirrored arrows and Home/End, all six
panel branches, draft continuity, direct Profile routes/reload, invalid-tab fallback, tablet rotation,
document overflow and page-top axe. Initial unchanged-baseline TV probes assumed ordinary edge wrap
and then selection on focus; corrected assertions explicitly select the starting tab and verify the
existing spatial-navigation handoff at tab-row edges. No product behavior was changed to satisfy
those assumptions. TV verification covers these tab controls and edge handoff; full browser/device
and TV spatial-navigation suites were not rerun. Earlier baseline accessibility/zone-hint limitations
remain documented. No baselines or tolerances changed.

All eight paired probes pass. All 16 Orders/Profile tab-strip screenshot pairs are byte-identical,
verified against actual PNG bytes. English/Persian phone, Persian tablet, English desktop and Persian
TV captures were viewed. Next: extract account session action into a storefront organism.

**One hundred and fourteenth checkpoint verified:** StorefrontAccountSessionAction is extracted
under `templates/app/organisms/` with an explicit label and sign-out callback. It preserves the ghost
Button, leading log-out icon, label fragment and header placement without adding a wrapper.
View retains localized copy; account/shared logic retains session removal and home navigation.
Package Button retains semantics, focus and activation. No state, effects, browser APIs or session
rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All four focused
mobile/desktop browser tests pass without retries: sign-out protects account history/direct access
and profile changes persist. The initial browser launch failed before tests started because preview
arguments were forwarded incorrectly; the corrected launch and test run pass.
Eight paired baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV 1920. They verify the single localized enabled button, native type, normalized button markup,
touch activation or focused Enter/Space activation, session removal, navigation away from account,
protected history/direct account access and reload, tablet rotation, document overflow and page-top
axe. Markup comparison normalizes only React Aria's random per-page ID prefix; an initial raw-ID
comparison and its captures are retained separately. All eight normalized comparisons pass.
Full browser/device and TV spatial-arrow navigation suites were not rerun; earlier baseline
accessibility/zone-hint limitations remain documented. No baselines or tolerances changed.

All eight button screenshot pairs are byte-identical, verified against actual PNG bytes.
English/Persian phone, Persian tablet, English desktop and Persian TV captures were viewed.
Next: extract account feedback into a storefront organism.

**One hundred and fifteenth checkpoint verified:** StorefrontAccountFeedback is extracted under
`templates/app/organisms/` with an explicit notice. It preserves the always-mounted paragraph,
status role, text classes and notice fragment without adding a wrapper. View/layout retain feedback
placement after the tabs; account/shared logic retains localized messages, save-success feedback,
failure clearing, persistence and customer state. Page/editor error alerts retain their separate
owners. No state, effects, browser APIs or account rules moved. Ownership and edit-location
documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All six focused
mobile/desktop browser tests pass without retries: bilingual profile/address storage-failure retry
and profile persistence. Eight paired baseline/current probes exercise English/Persian at touch
widths 390/768, desktop 1280 and TV 1920. They check exact status markup, initial empty content,
successful profile-save feedback, storage-failure clearing with draft retention and error alert,
successful retry, the same mounted status element through saves and tab changes, tab continuity,
reload reset with persisted profile values, tablet rotation, document overflow and page-top axe.
Save/tab actions use touch or Enter/Space activation. Full browser/device and TV spatial-arrow
navigation suites and assistive-technology announcement testing were not rerun; earlier baseline
accessibility/zone-hint limitations remain documented. No baselines or tolerances changed.

All eight paired probes pass with identical status markup. All 16 saved/retry status screenshot
pairs are byte-identical, verified against actual PNG bytes. English/Persian phone, Persian tablet,
English desktop and Persian TV captures were viewed. Next: extract account notices into a storefront
organism.

**One hundred and sixteenth checkpoint verified:** StorefrontAccountNotices is extracted under
`templates/app/organisms/` with an explicit save error. It preserves the danger Alert and title
without adding a wrapper. View retains the exact `saveError && !formOpen` visibility condition;
View/layout retain notices placement before the tabs. Account/shared logic retains localized error
state, storage mutations and retry/clearing. StorefrontAccountEditorDialog retains editor alerts;
package Alert retains semantics and presentation. No state, effects, browser APIs or account rules
moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All six focused
mobile/desktop browser tests pass without retries: bilingual profile/address storage-failure retry
and profile persistence. Eight paired baseline/current probes exercise English/Persian at touch
widths 390/768, desktop 1280 and TV 1920. They check initial alert absence, a single danger page alert
before the tabs on profile-save failure, localized content and exact alert markup, empty success
status with retained drafts, successful retry/removal and persisted profile values. Editor storage
failure shows one dialog alert and no page alert; Escape clears errors, reopening starts clean, and
another failure/successful retry persists the changed address after reload and tab reselection.
Tablet rotation, document overflow and page-top/error-dialog axe pass. Actions use touch or
Enter/Space activation. Initial unchanged-baseline probes assumed immediate DOM adjacency before
the tabs and that the selected tab survived reloading the original Profile URL. Corrected probes
check document order across the existing inert template and explicitly reselect Addresses after
reload. Original failures/captures are retained separately; no product behavior changed for those
assumptions. Full browser/device and TV spatial-arrow navigation suites and assistive-technology
announcement testing were not run in this stage; earlier baseline accessibility/zone-hint limitations
remain documented. No baselines or tolerances changed.

All eight paired probes pass with identical page/editor alert markup. All 16 page/editor alert
screenshot pairs are byte-identical, verified against actual PNG bytes. English/Persian phone,
English tablet editor, Persian tablet page, English desktop and Persian TV captures were viewed.
Next: extract account balance panel composition into a storefront organism.

**One hundred and seventeenth checkpoint verified:** StorefrontAccountBalancePanel is extracted
under `templates/app/organisms/` with explicit overview, top-up, optional checkout-return and history
descriptors. It preserves the balance wrapper/classes, overview/top-up/return/history order and
secondary return link with leading arrow-left icon, reusing the three existing balance organisms.
View retains tab visibility, localized mapping, list normalization and return eligibility; conditional
return text is still read only when eligible. Account/shared logic retains wallet calculations,
validation/focus, timers, customer scope, storage/history and checkout destinations. No state,
effects, browser APIs or wallet rules moved. The now-unused package-component import is removed
from account View. Parent/child ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All ten focused
mobile/desktop browser tests pass without retries: bilingual waiting-checkout return with payment
drafts preserved, top-up followed by wallet payment/discount/history, and concurrent wallet/account
updates preserved during profile save. Eight paired baseline/current probes exercise English/Persian
at touch widths 390/768, desktop 1280 and TV 1920. They check exact panel markup after normalizing
React Aria's random per-page ID prefix, empty history, invalid amount/focus, preset pressed state,
pending disabled payment, completion focus, one persisted top-up/history entry, reload continuity,
optional return-link presence/absence/href/variant/activation, tablet rotation, document overflow and
page-top axe. Initial unchanged-baseline probes assumed an incomplete checkout could bypass delivery
entry and used Space to activate a native link. Corrected probes verify the existing delivery guard
and use Enter for links; original failures/captures are retained separately. Full waiting-checkout
continuity is covered by the focused tests. No product behavior changed for those fixture assumptions.
Full browser/device and TV spatial-arrow navigation suites were not rerun; earlier baseline
accessibility/zone-hint limitations remain documented. No baselines or tolerances changed.

All eight functional paired probes pass with identical normalized markup. Of 32 initial/invalid/
completion/return screenshot pairs, 29 are byte-identical. Persian phone initial/invalid/completion
captures differ by 47/9/9 pixels respectively, with maximum channel deltas 2/1/1 out of 255 and equal
dimensions; actual PNG bytes/pixels were checked and the captures inspected without a visible layout
shift. English phone initial/completion, all three differing Persian phone states, Persian tablet
invalid, English desktop return and Persian TV completion captures were viewed.
Next: simplify account View composition.

**One hundred and eighteenth checkpoint verified:** Account View now passes organisms directly
into Shell/layout slots and tab/editor branches. Fifteen redundant single-child fragments are
removed; the empty sticky-slot fragment remains. Existing conditions, descriptor mapping, list
normalization, branch order, callbacks and lazy conditional evaluation are preserved. No rendered
wrappers, state, effects, browser APIs or account rules changed. Layout ownership documentation is
updated. A normalized JSX AST comparison confirms the before/after trees match after ignoring
single-child fragments, formatting and source-position metadata; fragment count falls from 16 to 1.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 20 focused
mobile/desktop browser tests pass without retries: bilingual reminder validation/save/reload/focus,
profile/address storage-error retry, waiting-checkout wallet return, saved-product parity, mapped
address editing, profile persistence and sign-out protection. Eight paired baseline/current probes
exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920. All six selected tab
branches preserve normalized main markup, tab/panel ARIA linkage and a single panel. Profile drafts
survive tab switches; address/reminder editors open and Escape restores Add focus. Tablet rotation,
document overflow and page-top axe pass. Actions use touch or keyboard Enter. Markup normalization
removes React Aria's random per-page ID prefix and the two local preview origins in absolute image
URLs; the original raw-origin comparison failure and captures are retained separately. Full browser/
device and TV spatial-arrow navigation suites were not rerun; earlier baseline accessibility/
zone-hint limitations remain documented. No baselines or tolerances changed.

All eight paired probes pass. All 32 tab-strip/profile/editor-save screenshot pairs are byte-identical,
verified against actual PNG bytes. English/Persian phone profile, English tablet address save,
Persian tablet tabs, English desktop reminder save and Persian TV tabs captures were viewed.
Next: extract sign-in heading into a storefront organism.

**One hundred and nineteenth checkpoint verified:** StorefrontSigninHeading is extracted under
`templates/app/organisms/` with explicit title, accent and introduction text, shared by phone and
code steps. It preserves the single h1, title trailing space, semantic em/accent classes, intro
paragraph/classes and direct sibling order without adding a wrapper. View retains step visibility,
localized text mapping and code-message phone bidi isolates. Sign-in/shared logic retains validation,
focus, resend state, authentication, customer synchronization and checkout continuation. No state,
effects, browser APIs or sign-in rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All ten focused
mobile/desktop browser tests pass without retries: checkout sign-in/return, resend countdown,
simulated Android SMS autofill/completion, phone validation/focus and policy links. Eight paired
baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920.
They check exact phone/code/back heading and intro markup/text, a single main h1, semantic accent,
direct sibling placement, phone-number bidi isolates, invalid phone/code summaries and focus,
change-number retention, successful local demo completion and heading replacement, tablet rotation,
document overflow and page-top axe. Actions use touch or Enter/Space activation; custom probes stub
native credential retrieval and use the local demo sign-in logic. Full browser/device and TV
spatial-arrow navigation suites and assistive-technology announcement testing were not run in this
stage; earlier baseline accessibility/zone-hint limitations remain documented. No baselines or
tolerances changed.

All eight paired probes pass with identical heading/intro markup. All 24 phone/code/back heading-area
screenshot pairs are byte-identical, verified against actual PNG bytes. English phone initial,
Persian phone code, Persian tablet initial, English desktop code and Persian TV back captures were
viewed. Next: extract sign-in phone controls into a storefront organism.

**One hundred and twentieth checkpoint verified:** StorefrontSigninPhoneControls is extracted
under `templates/app/organisms/` with explicit problems, phone and send descriptors. It preserves
the error-summary/input IDs, placeholder, controlled label/value/change/error props and primary
large block send button, returning a fragment without adding a wrapper. View retains phone-step
visibility, localized mapping, heading and policy links. Sign-in/shared logic retains phone state,
validation, summary targets/focus, code transitions, resend, authentication and checkout continuation.
Package components retain field/error semantics and activation. No state, effects, browser APIs or
sign-in rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All ten focused
mobile/desktop browser tests pass without retries: checkout sign-in/return, resend countdown,
simulated Android SMS autofill/completion, phone validation/focus and policy links. Eight paired
baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920.
They check phone type/inputmode/direction/autocomplete/placeholder, button variant/size, empty and
invalid phone validation, error-summary links and focus, error clearing, Latin/Persian-digit entry,
code-step focus/message, change-number retention, successful local demo completion, tablet rotation,
document overflow and page-top axe. Full phone-step markup matches after normalizing React Aria's
random per-page ID prefix. Actions use touch, Enter or Space as appropriate; custom probes stub
native credential retrieval and use local demo sign-in logic. Full browser/device and TV spatial-arrow
navigation suites and assistive-technology announcement testing were not run in this stage; earlier
baseline accessibility/zone-hint limitations remain documented. No baselines or tolerances changed.

All eight paired probes pass. All 32 initial/invalid/typed/back phone-step screenshot pairs are
byte-identical, verified against actual PNG bytes. English phone invalid, Persian phone typed,
Persian tablet back, English desktop initial and Persian TV invalid captures were viewed.
Next: extract sign-in code controls into a storefront organism.

**One hundred and twenty-first checkpoint verified:** StorefrontSigninCodeControls is extracted
under `templates/app/organisms/` with explicit problems, code and verify descriptors. It preserves
the error-summary/input IDs, five-digit length, label/value/change/complete/error/hint props and
primary large block verify button, returning a fragment without adding a wrapper. View retains
code-step visibility, localized mapping, heading, resend feedback and change-number action.
Sign-in/shared logic retains code state, validation, summary targets/focus, verification, customer
synchronization and continuation. Package CodeInput retains digit cleaning, completion triggering
and Web OTP lifecycle. No state, effects, browser APIs or sign-in rules moved. Ownership and
edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All ten focused
mobile/desktop browser tests pass without retries: checkout sign-in/return, resend countdown,
simulated Android SMS autofill/completion, phone validation/focus and policy links. Eight paired
baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920.
They check code maxlength/inputmode/autocomplete/direction, verify variant/size, initial/invalid/
partial/reset control markup, summary links and focus, error clearing, mixed Latin/Persian-digit
cleaning without premature completion, resend clearing/focus, change-number reset, Latin/Persian
five-digit completion and checkout return. Tablet rotation, document overflow and page-top axe pass.
Control markup matches after normalizing React Aria's random per-page ID prefix. Actions use touch,
Enter or Space as appropriate; custom probes stub native credential retrieval and use local demo
sign-in logic. Full browser/device and TV spatial-arrow navigation suites and assistive-technology
announcement testing were not run in this stage; earlier baseline accessibility/zone-hint limitations
remain documented. No baselines or tolerances changed.

All eight functional paired probes pass. Of 32 initial/invalid/partial/reset control screenshot pairs,
31 are byte-identical. English desktop invalid differs at 13 pixels at the alert-icon edge (maximum
channel delta 21 out of 255), with equal dimensions and markup. Actual PNG bytes/pixels were checked;
both differing captures were viewed without a visible layout shift. English phone invalid, Persian
phone partial, Persian tablet reset and Persian TV initial captures were also viewed.
Next: extract sign-in resend controls into a storefront organism.

**One hundred and twenty-second checkpoint verified:** StorefrontSigninResend is extracted under
`templates/app/organisms/` with explicit seconds, resend callback and status text. It preserves the
wrapper/classes, package ResendCode props, child order and always-mounted status paragraph.
View retains code-step visibility and mapping; sign-in/shared logic retains wait configuration,
code/error reset, feedback state and code-field focus. Package ResendCode retains wall-clock timing,
visibility updates, interval cleanup, ready announcements, tracking and activation. No state,
effects, browser APIs or sign-in rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All ten focused
mobile/desktop browser tests pass without retries: checkout sign-in/return, resend countdown,
simulated Android SMS autofill/completion, phone validation/focus and policy links. Eight paired
baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920.
They check initial and halfway waits with no early action, countdown expiry, ready status, resend
code/error clearing and focus, feedback text, repeat wait/action, change-number unmount/remount reset
and successful local demo completion. Tablet rotation, document overflow and page-top axe pass.
Ready/feedback/ready-again markup matches after normalizing React Aria's random per-page ID prefix;
wait timing is checked independently rather than comparing moving countdown text. Actions use touch,
Enter or Space as appropriate; custom probes stub native credential retrieval and use local demo
sign-in logic. Full browser/device and TV spatial-arrow navigation suites and assistive-technology
announcement testing were not run in this stage; earlier baseline accessibility/zone-hint limitations
remain documented. No baselines or tolerances changed.

All eight paired probes pass. All 24 ready/feedback/ready-again screenshot pairs are byte-identical,
verified against actual PNG bytes. English phone ready-again, Persian phone feedback, Persian tablet
ready, English desktop feedback and Persian TV ready-again captures were viewed.
Next: extract sign-in policy links into a storefront organism.

**One hundred and twenty-third checkpoint verified:** StorefrontSigninPolicies is extracted under
`templates/app/organisms/` with explicit surrounding text and terms/privacy link descriptors.
It preserves the paragraph/classes, native anchors, underline classes, fragment/text spacing and
terms-before-privacy order without adding a wrapper. View retains phone-step visibility and localized
mapping; sign-in/shared logic retains destinations, and the shared shell/router retains interception,
same-document navigation, history and focus behavior. No state, effects, browser APIs, routing or
policy rules moved. Parent/phone-control ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All ten focused
mobile/desktop browser tests pass without retries: policy navigation, checkout sign-in/return,
resend countdown, simulated Android SMS autofill/completion and phone validation/focus. Eight paired
baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920.
They check exact localized note text/markup, accessible link names/order, native links without target
overrides, language/document destinations, Tab/ShiftTab order and touch/Enter activation for both
policies. Both policy views navigate within the same document; history returns to the original
sign-in checkout context. Validation retains the note, code entry hides it, change-number restores
it and demo completion hides it. Tablet rotation, document overflow and page-top axe pass. Custom
probes stub native credential retrieval and use local demo sign-in logic. Full browser/device and TV
spatial-arrow navigation suites and assistive-technology testing were not run in this stage; earlier
baseline accessibility/zone-hint limitations remain documented. No baselines or tolerances changed.

All eight paired probes pass with identical policy-note markup. All 24 initial/invalid/back note
screenshot pairs are byte-identical, verified against actual PNG bytes. English phone initial,
Persian phone invalid, Persian tablet back, English desktop initial and Persian TV initial captures
were viewed. Next: extract sign-in completion into a storefront organism.

**One hundred and twenty-fourth checkpoint verified:** StorefrontSigninCompletion is extracted
under `templates/app/organisms/` with explicit title/accent/body, independent checkout/non-checkout
flags and checkout/account descriptors. It preserves check/accent EmptyState feedback with h1,
the action wrapper/classes, conditional branch order, primary checkout link with trailing arrow-right,
ghost account alternative and ordinary primary account link. It returns a fragment without adding
a wrapper. View retains completion visibility and localized mapping; sign-in/shared logic retains
customer naming, authentication/synchronization, eligibility, destinations and checkout callback.
Shared shell/router and package components retain navigation/focus and semantics. No state, effects,
browser APIs or sign-in rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All ten focused
mobile/desktop browser tests pass without retries: checkout sign-in/return, bilingual guest-draft
continuation/customer isolation, simulated Android SMS autofill/completion and phone validation.
Eight paired baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV 1920. Each checks ordinary/default-name and checkout/named completion, a single h1 with accent,
check/accent icon, hidden phone/code fields, action counts/order/variants/hrefs, authenticated account
access from both action branches, ordinary account reload and same-document account/checkout
navigation. Tablet rotation, document overflow and page-top axe pass. Completion markup matches
after normalizing React Aria's random per-page ID prefix. Actions use touch, Enter or Space as
appropriate; custom probes stub native credential retrieval and use local demo sign-in logic.
Full browser/device and TV spatial-arrow navigation suites and assistive-technology announcement
testing were not run in this stage; earlier baseline accessibility/zone-hint limitations remain
documented. No baselines or tolerances changed.

All eight functional paired probes pass. Of 32 ordinary/checkout completion/action screenshot pairs,
30 are byte-identical. English TV ordinary and Persian TV checkout each differ at 15 pixels with a
maximum channel delta of 2 out of 255 and equal dimensions/markup. Actual PNG bytes/pixels were
checked and both pairs viewed without a visible layout shift. English phone ordinary, Persian phone
checkout and Persian tablet checkout-actions captures were also viewed.
Next: extract sign-in change-number action into a storefront organism.

**One hundred and twenty-fifth checkpoint verified:** StorefrontSigninChangeNumber is extracted
under `templates/app/organisms/` with an explicit label and callback. It preserves the ghost Button,
leading arrow-left icon and label fragment without adding a wrapper. View retains code-step
visibility, localized copy and placement after resend controls. Sign-in/shared logic retains the
phone-step return, phone retention and code/resent reset; package Button retains semantics and
activation. No state, effects, browser APIs or sign-in rules moved. The now-unused package-component
import is removed from sign-in View. Parent/code-control ownership and edit-location documentation
are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All ten focused
mobile/desktop browser tests pass without retries: checkout sign-in/return, resend countdown,
simulated Android SMS autofill/completion, phone validation/focus and policy links. Eight paired
baseline/current probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920.
They check button name/type/variant, placement after resend controls, touch/Enter/Space activation
from partial, invalid and resent code states, Latin/Persian phone retention, code/resend-feedback
reset and restarted wait on reentry. Both baseline and extraction preserve the existing invalid-code
flag after changing the number and reentering code entry; editing the code clears that flag. This
behavior is verified unchanged, not claimed fixed. Demo completion hides the action and preserves
same-document checkout continuation. Tablet rotation, document overflow and page-top axe pass.
Action markup matches after normalizing React Aria's random per-page ID prefix. Custom probes stub
native credential retrieval and use local demo sign-in logic. Full browser/device and TV spatial-arrow
navigation suites and assistive-technology testing were not run in this stage; earlier baseline
accessibility/zone-hint limitations remain documented. No baselines or tolerances changed.

All eight paired probes pass. All 24 partial/invalid/resent action screenshot pairs are byte-identical,
verified against actual PNG bytes. English phone partial, Persian phone invalid, Persian tablet
resent, English desktop invalid and Persian TV partial captures were viewed.
Next: simplify sign-in View composition.

**One hundred and twenty-sixth checkpoint verified:** Sign-in View now passes its layout directly
to Shell and completion directly to the feedback slot. Two redundant single-child fragments are
removed; multi-child phone/code fragments and the empty sticky-slot fragment remain. Conditions,
descriptor mappings, callbacks, lazy conditional evaluation and slot/branch order are preserved.
No rendered wrappers, state, effects, browser APIs or sign-in rules changed. Layout ownership
documentation is updated. A normalized JSX AST comparison confirms before/after trees match after
ignoring single-child fragments, formatting and source-position metadata; fragment count falls
from 5 to 3.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 14 focused
mobile/desktop browser tests pass without retries: checkout sign-in/return, bilingual guest-draft
continuation/customer isolation, resend countdown, simulated Android SMS autofill/completion,
phone validation/focus and policy navigation. Eight paired baseline/current probes exercise English/
Persian at touch widths 390/768, desktop 1280 and TV 1920. They check phone entry, partial-code entry
without premature completion, ordinary/default-name and checkout/named completion, single h1/accent,
action counts/variants, authenticated account access, ordinary account reload and same-document
account/checkout continuation. Tablet rotation, document overflow and page-top axe pass. Form markup
matches after normalizing React Aria's random per-page ID prefix and moving countdown text; the wait
is independently checked as active within the configured minute. Actions use touch, Enter or Space
as appropriate; custom probes stub native credential retrieval and use local demo sign-in logic.
Full browser/device and TV spatial-arrow navigation suites and assistive-technology testing were not
run in this stage; earlier baseline accessibility/zone-hint and sign-in validation-state limitations
remain documented. No baselines or tolerances changed.

All eight functional paired probes pass. Of 32 phone/code/ordinary/checkout screenshot pairs,
31 are byte-identical. English TV checkout differs at 15 pixels with maximum channel delta 2 out of
255 and equal dimensions/markup. Actual PNG bytes/pixels were checked and both differing captures
viewed without a visible layout shift. English phone entry, Persian phone code, Persian tablet
checkout and English desktop ordinary captures were also viewed.
Next: extract tracking lookup into a storefront organism.

**One hundred and twenty-seventh checkpoint verified:** StorefrontTrackLookup is extracted under
`templates/app/organisms/` with explicit heading, failure, order-number, phone, submit and browse
descriptors. It preserves the native form/classes/onSubmit/noValidate, h1/accent trailing space and
intro, warning wrapper/focus target, required field IDs/native props, primary large block submit
with package-search icon and ghost shop link, without adding a wrapper. View retains lookup
visibility and localized mapping; tracking/shared logic retains drafts, validation/focus, order/mobile
normalization, number-and-mobile matching, failure clearing and matched-order navigation. No state,
effects, browser APIs or lookup rules moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass without retries: guest lookup, bilingual earlier-order reload,
pending card-payment tracking and bilingual reorder review/bag preservation. Eight paired baseline/
current probes exercise English/Persian at touch widths 390/768, desktop 1280 and TV 1920. They check
form/field/submit attributes, localized single h1, empty-field errors and first-invalid focus,
invalid-mobile focus, mismatched-order warning/focus, failure clearing, lowercase/whitespace and
Persian-digit order normalization, international-mobile variants and native Enter submission.
Successful lookup opens the matched order and focuses its heading; track-another clears fields/
errors and restores order-input focus. Same-document lookup and browse navigation, tablet draft
retention through rotation, document overflow and page-top axe pass. Form markup matches after
normalizing React Aria's random per-page ID prefix. Actions use touch, Enter or Space as appropriate.
Full browser/device and TV spatial-arrow navigation suites and assistive-technology testing were not
run in this stage; earlier baseline accessibility/zone-hint and sign-in validation-state limitations
remain documented. No baselines or tolerances changed.

All eight functional paired probes pass. Of 32 initial/empty/mismatch/reset form screenshot pairs,
29 are byte-identical. Persian tablet/desktop/TV empty-validation captures differ at 4/3/4 pixels
respectively, with maximum channel delta 1 out of 255 and equal dimensions/markup. Actual PNG bytes/
pixels were checked and all three differing pairs viewed without a visible layout shift. English
phone mismatch was also viewed. Next: extract tracking order heading into a storefront organism.

**One hundred and twenty-eighth checkpoint verified:** extracted StorefrontTrackHeading under
`templates/app/organisms/` with explicit eyebrow, title, accent and intro props. It preserves the
order eyebrow, single h1 with semantic em/accent and trailing space, status introduction, classes
and sibling order without adding a wrapper. View retains order visibility, localized mapping and
the pending-payment notice. Tracking logic retains order selection, status normalization/copy and
payment interpretation; no state, rules or browser effects moved. Ownership and edit-location
documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass without retries: guest lookup and heading focus, bilingual
older-order reload, pending card-payment tracking and bilingual repeat-order review/bag preservation.
Eight paired previous-commit/current probes exercise English/Persian at touch widths 390/768,
desktop 1280 and TV width 1920. They check received/preparing/on-the-way/delivered/cancelled headings,
card/WhatsApp pending notices, order number, one h1, semantic accent, introduction, card last-four/
contact display, status aliases and unknown-status fallback. Header markup matches after normalizing
React Aria's random per-page ID prefix. Tablet rotation, document containment and page-top axe pass.
The full browser/device and TV spatial-navigation suites and assistive-technology testing were not
run. No baselines or tolerances changed.

All eight paired functional probes pass. All 56 header screenshot pairs across five order states
and two pending-payment methods are byte-identical to the previous commit. Actual PNG bytes were
checked; no screenshot baselines or tolerances changed.
Next: extract tracking pending-payment notice into a storefront organism.

**One hundred and twenty-ninth checkpoint verified:** extracted StorefrontTrackPendingNotice
under `templates/app/organisms/` with explicit title/body props. It preserves the measure-width
wrapper, neutral package Alert, clock icon, status semantics and message body without adding markup.
View retains order/pending visibility and localized mapping; tracking logic retains payment-method/
status eligibility, localized message selection, last-four/contact formatting and bidi isolation.
No state, rules or browser effects moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass without retries: guest lookup and heading focus, bilingual
older-order reload, pending card-payment tracking and bilingual repeat-order review/bag preservation.
Eight paired previous-commit/current probes exercise English/Persian at touch widths 390/768,
desktop 1280 and TV width 1920. They verify neutral status/title/body markup, card last-four and
sender contact, recipient-phone fallback/default card method, bidi isolates, WhatsApp copy without
card details, absence for other methods and later/cancelled/refunded statuses, and restoration on
returning to pending WhatsApp. Track-another removes the order header and focuses the lookup field.
Tablet rotation, document containment and page-top axe pass. Header markup matches after normalizing
React Aria's random per-page ID prefix. All 32 card/WhatsApp/fallback/confirmed header screenshot
pairs are byte-identical to the previous commit; actual PNG bytes were checked. No baselines or
tolerances changed. The full browser/device and TV spatial-navigation suites and assistive-technology
testing were not run. Next: extract tracking progress timeline into a storefront organism.

**One hundred and thirtieth checkpoint verified:** extracted StorefrontTrackProgress under
`templates/app/organisms/` with explicit steps/current/status/label/doneLabel props. It preserves
the package Card with padding 24 and OrderTimeline, including the empty card when cancelled
progress renders nothing. View retains order visibility and mapping. Tracking logic retains status
normalization, current step, active/done/cancelled state and localized labels/times; package
OrderTimeline retains list/current/completed-step semantics and cancelled suppression. No state,
rules or browser effects moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass without retries: guest lookup and heading focus, bilingual
older-order reload, pending card-payment tracking and bilingual repeat-order review/bag preservation.
Eight paired previous-commit/current probes exercise English/Persian at touch widths 390/768,
desktop 1280 and TV width 1920. They check received/preparing/on-the-way/delivered/cancelled progress,
ordered-list label/five steps, current-step placement, completed/upcoming counts, localized hidden
done announcements, absent real-order sample times and the empty cancelled card. Arranging/ready,
out-for-delivery and refunded aliases match their canonical progress markup. Track-another removes
the details and focuses lookup. Tablet rotation, document containment and page-top axe pass.
Card markup matches after normalizing React Aria's random per-page ID prefix. The full browser/device
and TV spatial-navigation suites and assistive-technology testing were not run.

All eight paired functional probes pass. Of 40 progress-card screenshot pairs, 38 are byte-identical.
Persian phone preparing and English TV-width on-the-way captures differ at 5 and 6 pixels respectively,
with maximum channel delta 1 out of 255 and equal dimensions/markup. Actual PNG bytes/pixels were
checked and both differing pairs viewed without a visible layout shift. No baselines or tolerances
changed. Next: extract tracking delivery photo into a storefront organism.

**One hundred and thirty-first checkpoint verified:** extracted StorefrontTrackDeliveryPhoto
under `templates/app/organisms/` with explicit src/placeholderLabel/alt/caption props. It preserves
the figure/frame/caption classes, semantic figcaption and package ArchFrame with 4/5 ratio, soft
shape and product tone, without adding a wrapper. View retains order/delivered visibility and
localized mapping; tracking logic retains status interpretation and photo selection. Package
ArchFrame/Picture retain image loading and missing-source placeholder semantics. No state, rules or
browser effects moved. Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass without retries: guest lookup and heading focus, bilingual
older-order reload, pending card-payment tracking and bilingual repeat-order review/bag preservation.
Eight paired previous-commit/current probes exercise English/Persian at touch widths 390/768,
desktop 1280 and TV width 1920. They check missing-source placeholders, loaded URL photos, responsive
image objects and failed images using local intercepted fixtures. Localized alt/caption, figure
position between timeline/details cards, 4/5 soft/product frame, srcSet/dimensions, decoded images and
failed-image behavior match. Missing sources use the labeled placeholder; failed sources retain the
existing failed img/alt behavior and do not switch to that placeholder. The photo is absent for
received/preparing/on-the-way/cancelled/refunded orders and after returning to lookup, which focuses
the order-number field. Tablet rotation, document containment and page-top axe pass. Figure markup
matches after normalizing React Aria's random per-page ID prefix. All 32 screenshot pairs are
byte-identical; actual PNG bytes were checked. No baselines or tolerances changed. The full browser/
device and TV spatial-navigation suites and assistive-technology testing were not run.
Next: extract tracking order details into a storefront organism.

**One hundred and thirty-second checkpoint verified:** extracted StorefrontTrackOrderDetails
under `templates/app/organisms/` with an explicit rows prop. It preserves the sunken package Card
with padding 20 and DetailList without adding a wrapper. View retains order visibility and row
mapping; tracking/shared logic retain delivery, zone, schedule, recipient, gift-message and payment
formatting/localization. Package DetailList retains definition-list semantics, decorative icons and
wrapping. No state, rules or browser effects moved. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass without retries: guest lookup and heading focus, bilingual
older-order reload, pending card-payment tracking and bilingual repeat-order review/bag preservation.
Eight paired previous-commit/current probes exercise English/Persian at touch widths 390/768,
desktop 1280 and TV width 1920. They verify five ordered label/value rows, decorative icons, delivery
address/zone, nonempty schedule, recipient name/localized phone, single/multiple per-line gift
messages with bidi isolation, legacy order-wide message and no-message fallback. Card/default,
online, COD, WhatsApp, wallet and unknown payment methods retain labels and last-four masking rules.
Long unbroken addresses remain contained. Details persist through preparing/on-the-way/delivered/
cancelled states; track-another removes the card and focuses lookup. Tablet rotation, document/card
containment and page-top axe pass. Card markup matches after normalizing React Aria's random per-page
ID prefix. The first custom probe stopped on an incorrect SVG icon selector on the unchanged
baseline; correcting it to the package's masked-span icon produced eight passing paired probes.
All 32 screenshot pairs are byte-identical; actual PNG bytes were checked. No baselines or tolerances
changed. The full browser/device and TV spatial-navigation suites and assistive-technology testing
were not run. Next: extract tracking order actions into a storefront organism.

**One hundred and thirty-third checkpoint verified:** extracted StorefrontTrackOrderActions
under `templates/app/organisms/` with explicit nullable contact and controlled repeat/lookup
descriptors. It preserves the flex/wrap container, primary external contact link/icon/rel/target,
secondary repeat-order link/icon/href/callback and ghost lookup button/icon without adding markup.
View retains order/contact visibility and localized descriptor mapping; tracking/shared logic retain
order-specific URLs, repeat-order review/confirmation, bag changes and lookup reset/focus. Package
Button/shared routing retain activation/navigation behavior. No state, rules or browser effects moved.
Ownership and edit-location documentation are updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass without retries: guest lookup and heading focus, bilingual
older-order reload, pending card-payment tracking and bilingual repeat-order review/confirmation
with bag preservation. Eight paired previous-commit/current probes exercise English/Persian at touch
widths 390/768, desktop 1280 and TV width 1920. They check native link/button counts, variants, icons,
bag href, external-contact target/rel and decoded order-specific WhatsApp text without opening it.
Touch/pointer repeat-order review opens without navigation or bag changes; cancellation restores
repeat-link focus and preserves the bag. Desktop/TV-width Tab/Shift+Tab order, keyboard cancel/lookup,
lookup reset/focus, same-document continuity, cancelled-order actions, tablet rotation, containment
and page-top axe match. Action/dialog markup matches after normalizing React Aria's random ID prefix.
All 24 received/review/cancelled screenshot pairs are byte-identical; actual PNG bytes were checked.
No baselines or tolerances changed. Full browser/device and TV spatial-navigation suites and
assistive-technology testing were not run.

The first desktop paired probe exposed an existing keyboard limitation on the unchanged baseline:
Enter on the repeat-order link navigates to the bag instead of opening review. This reproduces in
both previous/current versions for both languages at desktop/TV widths; the bag is unchanged. The
probe records that behavior, returns through history and then verifies review via pointer activation.
This extraction preserves it. Next: fix keyboard repeat-order review activation, then resume tracking
summary extraction.

**One hundred and thirty-fourth checkpoint verified:** fixed keyboard repeat-order review.
A known-order repeat control previously combined a bag href with a click interceptor; Enter on
React Aria's Link could navigate to the bag instead of opening review. View now omits the href when
a review callback exists, so the existing package Button renders a native action button. Standalone
samples without an order/review callback retain the bag link. Tracking logic now opens review
without mouse-button/modifier/default-navigation interception. Review selection/confirmation and
bag reconciliation remain unchanged. Component ownership documentation is updated.

Added bilingual browser regressions that press Enter to open review without navigation or bag/
delivery changes, cancel with Escape and verify trigger focus, reopen with Space, then confirm with
Enter and verify only the repeated line's quantity changes. Same-document navigation and delivery
preservation are checked. Existing pointer review/replacement tests now use the button role. The
new tests reproduced the Enter failure in both languages before the fix. An initial post-fix run
had one English desktop retry; the test now waits for the seeded order and page focus/layout to
settle before sending keys. The final focused run with retries disabled passes all 16 mobile/desktop
cases: keyboard and pointer reorder, guest lookup, bilingual older-order reload and pending payment.
`npm test`, `npm run check`, the app production build and `git diff --check` pass.

Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Current known-order triggers are buttons without href; Enter and Space both open
review, cancellation restores focus and preserves the bag, and touch/pointer activation still works.
Lookup reset/focus, tablet rotation, containment, same-document continuity and page-top axe pass.
Four English standalone samples retain their anchor/bag href and Enter navigation. External contact
links are not activated. The full browser/device and TV spatial-navigation suites and assistive-
technology testing were not run.

Of 20 action/review/sample screenshot pairs, 12 are byte-identical. Six action captures differ only
within repeat-label glyph bounds (524–1150 pixels, maximum channel delta 229/255); two desktop dialog
captures differ at 108 radio-outline pixels each (maximum delta 37/255). All dimensions match. Actual
PNG bytes/pixels were checked, and representative phone action, desktop review and Persian TV-width
action captures were viewed. No styles, screenshot baselines or tolerances changed.
Next: extract tracking order summary into a storefront organism.

**One hundred and thirty-fifth checkpoint verified:** extracted StorefrontTrackOrderSummary
under `templates/app/organisms/` with explicit title/lines/sums props. It preserves the package Card
with padding 20 and OrderSummary without adding a wrapper. View retains order visibility and
localized prop mapping; tracking/shared logic retain order selection, line images/tokens/configuration,
quantities/card notes/prices and total/discount/balance formatting. Package OrderSummary retains
heading, line and definition-list semantics. StorefrontTrackLayout retains the responsive sticky
aside. No state, calculations or browser effects moved. Ownership/edit-location documentation is
updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 16 focused
mobile/desktop browser tests pass with retries disabled: guest lookup, bilingual older-order reload,
pending card-payment tracking, pointer repeat-order review/replacement and keyboard review/
cancellation/confirmation with bag preservation. Eight paired previous/current probes exercise
English/Persian at touch widths 390/768, desktop 1280 and TV width 1920. They verify heading/card
padding, line counts/quantities/prices, card notes and bidi isolates, paid/free delivery, promo and
balance discounts, subtotal/final values and strong-total semantics. Tall six-line summaries with
long notes disable fit-based stickiness; narrow phones keep their existing static aside, and fitting
wider panels retain sticky positioning. Summary visibility across preparing/on-the-way/delivered/
cancelled orders, lookup removal/focus, tablet rotation, containment and page-top axe pass.

Summary-card markup matches after normalizing only React Aria's random ID prefix and the different
local preview origins in absolute product-image URLs. Initial probe assumptions about phone sticky
positioning and preview origins were corrected; no application change was needed. All 32 paid/free/
discounted/tall summary screenshot pairs are byte-identical; actual PNG bytes were checked and the
Persian phone discounted capture viewed. No baselines or tolerances changed. The full browser/device
and TV spatial-navigation suites and assistive-technology testing were not run.
Next: extract tracking repeat-order review dialog into a storefront organism.

**One hundred and thirty-sixth checkpoint verified:** extracted StorefrontTrackReorderDialog
under `templates/app/organisms/` with explicit open/onClose/title/cancelLabel, confirm/choice,
intro/changes/empty descriptors. It preserves the package Dialog/footer, ghost cancel and controlled
confirmation button, add/replace RadioGroup, no-bag intro, warning list and unavailable-order message.
View maps localized copy, visibility, selection and confirmation descriptors and no longer imports
DS directly. Tracking/shared logic retain open/mode state, availability/price/stock reconciliation,
warning generation, bag mutations, analytics and navigation. Package Dialog/RadioGroup retain modal,
focus and selection semantics; layout feedback remains outside main. No state, reconciliation or
browser effects moved. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 16 focused
mobile/desktop browser tests pass with retries disabled: guest lookup, bilingual older-order reload,
pending card-payment tracking, pointer review/replacement and keyboard review/cancellation/
confirmation with bag preservation. Eight paired previous/current probes exercise English/Persian
at touch widths 390/768, desktop 1280 and TV width 1920. They verify modal naming, initial add mode,
add/replace radio selection and confirmation labels, price/stock/unavailable warnings, cancellation
without bag changes, opener focus, reset to add on reopening, no-radio empty-bag intro and explicit
replacement confirmation with repriced available items. Fully unavailable orders show their message
and disable confirmation; Escape, focus containment, tablet rotation, overflow and axe pass.
Modal markup matches after normalizing React Aria's random ID prefix and local preview origin.
The initial touch probe targeted the input covered by the radio label; it was corrected to tap the
visible label and to use the exact maintained Persian title. No application change was needed.
Full browser/device and TV spatial-navigation suites and assistive-technology testing were not run.

Of 32 changed-add/changed-replace/empty-bag/unavailable screenshot pairs, 30 are byte-identical.
English and Persian tablet changed-replace captures differ at 107 pixels each, with maximum channel
delta 2/255 and equal dimensions/markup. Actual PNG bytes/pixels were checked and both differing
pairs viewed without a visible layout shift. No baselines or tolerances changed.
Next: simplify tracking View composition.

**One hundred and thirty-seventh checkpoint verified:** simplified tracking View composition.
Removed five redundant single-child fragments around layout content, lookup, pending notice,
delivery photo and summary. Multi-child heading/details and the empty sticky-slot fragments remain
(eight fragments become three). Visibility, descriptor values, callbacks, feedback placement and
component order are unchanged. A normalized Babel syntax-tree comparison against HEAD before the
change, ignoring only positions/comments/whitespace and single-child fragment wrappers, confirms
structural equivalence before and after formatting. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 16 focused
mobile/desktop browser tests pass with retries disabled: guest lookup, bilingual older-order reload,
pending payment and pointer/keyboard repeat-order review/cancellation/confirmation with bag
preservation. Eight paired previous/current probes exercise English/Persian at touch widths 390/768,
desktop 1280 and TV width 1920. They cover initial lookup, empty validation/focus, failed matching/
warning focus, normalized Latin/Persian order/mobile submission, matched-order heading focus,
pending card details, delivered photo/finished timeline, review selection/cancellation/focus return,
lookup reset, same-document continuity and unchanged bag state. Tablet rotation, containment and
page-top axe pass. Main/dialog markup matches after normalizing only React Aria's random ID prefix
and local preview origins. Full browser/device and TV spatial-navigation suites and assistive-
technology testing were not run.

Of 32 initial lookup/pending/delivered/review screenshot pairs, 31 are byte-identical. The English
tablet pending capture differed only where an off-screen orchid thumbnail had not painted (2670
pixels). A separate repeat explicitly decoded and painted images before capture: all four tablet
state pairs then matched byte-for-byte with matching markup, and the painted pending capture was
viewed. Original and repeated captures remain separate. No styles, baselines or tolerances changed.
Next: extract saved-page heading into a storefront organism.

**One hundred and thirty-eighth checkpoint verified:** extracted StorefrontSavedHeading under
`templates/app/organisms/` with explicit eyebrow/title/accent props. It preserves the package
SectionHeader at h1 level, count eyebrow and semantic title accent without adding a wrapper.
View retains localized prop mapping; saved/shared logic retain list membership, count wording/locale
formatting, removal/Undo, persistence and focus. Package SectionHeader retains heading semantics;
StorefrontSavedLayout retains the heading wrapper. No state, calculations or browser effects moved.
Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass with retries disabled: bilingual additive removal/Undo and initial
saved-list loading integrity, account/saved-page synchronization and product-to-saved-list updates.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify one h1 and its semantic accent, three/two/one/zero counts, English
singular/plural and Persian digits, removal notice focus, final-item empty state, Undo restoration
and favorite-button focus. Count/list persistence after reload, product navigation/history without
full reload, tablet rotation, document containment and page-top axe pass. Heading markup matches
after normalizing React Aria's random per-page ID prefix. All 40 three/two/one/zero/Undo heading
screenshot pairs are byte-identical; actual PNG bytes were checked and the Persian phone zero-count
capture viewed. No baselines or tolerances changed. The full browser/device and TV spatial-navigation
suites and assistive-technology testing were not run.
Next: extract saved-page removal notice into a storefront organism.

**One hundred and thirty-ninth checkpoint verified:** extracted StorefrontSavedRemovalNotice
under `templates/app/organisms/` with explicit message and Undo label/callback props. It preserves
the notice wrapper, package Alert title/action slot, secondary Undo button, vf-saved-undo ID and
keep-focus attribute without adding markup. View retains removed-message visibility and localized
mapping; saved/shared logic retain last-removed state, additive restoration, persistence,
synchronization and focus. Package Alert/Button retain status/action semantics; layout keeps the
notice outside results/empty groups for final-item recovery. No state, mutations or browser effects
moved. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass with retries disabled: bilingual additive removal/Undo and initial
saved-list loading integrity, account/saved-page synchronization and product-to-saved-list updates.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify initial absence, localized notice copy including product-code bidi
isolates, neutral status semantics, one Undo ID/keep-focus attribute, button variant and focus after
each removal. Final-item recovery remains before the empty group. A new saved item added while Undo
is pending survives restoration of only the last removed item; earlier removals remain removed.
Notice clearing, restored favorite-button focus, reload persistence, same-document activation,
tablet rotation, containment and page-top axe pass. Notice markup matches after normalizing React
Aria's random ID prefix. The initial custom probe expected plain product codes; its expectation was
corrected to include the existing bidi isolates, without an application change.
All 32 first/second/final-removal/other-change screenshot pairs are byte-identical; actual PNG bytes
were checked and the Persian phone final-removal notice viewed. No baselines or tolerances changed.
Full browser/device and TV spatial-navigation suites and assistive-technology testing were not run.
Next: extract saved-page product results into a storefront organism.

**One hundred and fortieth checkpoint verified:** extracted StorefrontSavedResults under
`templates/app/organisms/` with explicit products and photo/unsave labels. It preserves product
order and indexed fragment keys, card images/name/subtitle/price/stock/badge, accent badge tone,
soft frame, favorite state, removal callback and product href without adding a DOM wrapper.
View retains results visibility, list normalization and localized mapping; saved/shared logic retain
selection/descriptors, saved membership, pricing, remove/Undo, persistence and focus. Package
ProductCard retains image/link/favorite semantics and layout retains the responsive grid. No state,
mutations or browser effects moved. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass with retries disabled: bilingual additive removal/Undo and initial
saved-list loading integrity, account/saved-page synchronization and product-to-saved-list updates.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify direct grid/card children, product ordering, soft media frames,
subtitles/prices, accent badges, product hrefs and pressed favorite actions. Removal focuses Undo;
restoration preserves prior removals and focuses the restored favorite. Product navigation/history,
reload persistence, final-item empty recovery, tablet rotation, containment and page-top axe pass.
Grid markup matches after normalizing React Aria's random ID prefix and local preview origins.
Images are explicitly decoded and painted before capture. All 32 three/two/one/Undo grid screenshot
pairs are byte-identical; actual PNG bytes were checked and the Persian phone two-product grid viewed.
No baselines or tolerances changed. Full browser/device and TV spatial-navigation suites and
assistive-technology testing were not run.
Next: extract saved-page empty state into a storefront organism.

**One hundred and forty-first checkpoint verified:** extracted StorefrontSavedEmpty under
`templates/app/organisms/` with explicit title/accent/body and browse href/label props. It preserves
the heart package EmptyState and primary browse link as siblings without adding a DOM wrapper.
View retains empty visibility and localized mapping and no longer imports DS directly; saved/shared
logic retain membership, removal/Undo, persistence and navigation values. Package EmptyState/Button
retain heading/icon/link semantics and layout retains centered placement with removal feedback
outside the empty wrapper. No state, mutations or browser effects moved. Ownership/edit-location
documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass with retries disabled: bilingual additive removal/Undo and initial
saved-list loading integrity, account/saved-page synchronization and product-to-saved-list updates.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They check populated-state absence, one page h1 plus the empty h2/accent/body,
decorative icon, direct sibling structure, primary shop link and localized destination. Empty-list
persistence after reload, shop navigation/history without full reload, final-item removal with Undo
outside the empty wrapper, restored-item/favorite focus, tablet rotation, containment and page-top
axe pass. Empty-wrapper markup matches after normalizing React Aria's random ID prefix. All 32
initial/browse-return/reloaded/final-removal screenshot pairs are byte-identical; actual PNG bytes
were checked. No baselines or tolerances changed. Full browser/device and TV spatial-navigation
suites and assistive-technology testing were not run.
Next: simplify saved-page View composition.

**One hundred and forty-second checkpoint verified:** simplified saved-page View composition by
removing three redundant single-child fragments around layout, results and empty content. The
empty sticky-slot fragment remains (four fragments become one). Visibility, descriptors, list
normalization, callbacks and ordering remain unchanged. Normalized Babel syntax trees match after
unwrapping only the redundant fragments; ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass with retries disabled: bilingual additive removal/Undo and initial
saved-list loading integrity, account/saved-page synchronization and product-to-saved-list updates.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Populated, removed, empty and restored states preserve localized counts,
removal/Undo focus and additive restoration, persistence, product navigation/history without full
reload, tablet rotation, containment and page-top axe results. Main markup matches after normalizing
only React Aria's random ID prefix and local preview origins. Images are explicitly decoded and
painted before capture. All 32 screenshot pairs are byte-identical; actual PNG bytes were checked
and the Persian phone empty state viewed. No styles, baselines or tolerances changed. Full
browser/device and TV spatial-navigation suites and assistive-technology testing were not run.
Next: extract search-page heading into a storefront organism.

**One hundred and forty-third checkpoint verified:** extracted StorefrontSearchHeading under
`templates/app/organisms/` with an explicit title prop. It preserves the display h1 and its child
without adding a wrapper. View retains localized mapping; search/shared logic retain matching,
query and language URL/history state, reporting, navigation and focus. Layout retains heading
placement. Inlining the extracted heading reproduces the previous View exactly. No state,
mutations or browser effects moved; ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 26 focused
mobile/desktop browser tests pass with retries disabled: bilingual product exploration and return
to filtered shop, query/language recovery and clearing without history churn, closing back to
entered delivery details, clear/Escape behavior, and readable codes/prices at touch widths 320/390/768.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify one localized display h1 and the searchbox accessible name across
popular, results and empty states, reload query persistence, product navigation/history without
full reload, empty recovery focus, tablet rotation, containment and page-top axe. Main markup
matches after sorting attributes, consistently mapping generated React Aria IDs and their references,
and normalizing local preview origins. Initial comparison attempts exposed attribute ordering and
generated ID-counter variability; the comparison was corrected without changing application code.
Images are explicitly decoded and painted before capture.
All 24 final screenshot pairs are byte-identical; actual PNG bytes were checked and the Persian
tablet result state viewed. No styles, baselines or tolerances changed. Full browser/device and TV
spatial-navigation suites and assistive-technology testing were not run.
Next: extract search-page query controls into a storefront organism.

**One hundred and forty-fourth checkpoint verified:** extracted StorefrontSearchControls under
`templates/app/organisms/` with explicit query (label, placeholder, value, onChange) and close
(label, href) descriptors. It preserves the controlled package SearchField, vf-q focus target,
secondary close IconButton/link, responsive row/input wrappers, classes and control order.
StorefrontSearchLayout now places a controls slot; View maps localized descriptors and callbacks.
Search/shared logic retain matching, URL/history updates, reporting, return context, navigation
and focus. Package components retain input, clear/Escape and link semantics. No state, mutations
or browser effects moved; ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 26 focused
mobile/desktop browser tests pass with retries disabled: bilingual product exploration and return
to filtered shop, query/language recovery and clearing without history churn, closing back to
entered delivery details, clear/Escape behavior, and readable codes/prices at touch widths 320/390/768.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify the localized heading and searchbox accessible name across popular,
results and empty states, reload query persistence, product navigation/history without full reload,
empty recovery focus, tablet rotation, containment and page-top axe. Main markup matches after
sorting attributes, consistently mapping generated React Aria IDs and their references, and
normalizing local preview origins. Images are explicitly decoded and painted before capture.
All 24 screenshot pairs are byte-identical; actual PNG bytes were checked and the Persian tablet
empty state viewed. No styles, baselines or tolerances changed. Full browser/device and TV
spatial-navigation suites and assistive-technology testing were not run.
Next: extract search-page popular terms into a storefront organism.

**One hundred and forty-fifth checkpoint verified:** extracted StorefrontSearchPopular under
`templates/app/organisms/` with explicit title and normalized terms (label, pick). It preserves
the eyebrow, wrapping chip row, indexed fragment keys, term order and package Chip callbacks
without adding a DOM wrapper. View retains empty-query visibility, localized title mapping and
list normalization; search/shared logic retain term descriptors, matching, URL/history updates,
reporting, navigation and focus. Layout retains slot placement. No state, mutations or browser
effects moved; ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 26 focused
mobile/desktop browser tests pass with retries disabled: bilingual product exploration and return
to filtered shop, query/language recovery and clearing without history churn, closing back to
entered delivery details, clear/Escape behavior, and readable codes/prices at touch widths 320/390/768.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Every localized term is activated by touch or Enter/Space, preserving query/URL
updates without history churn or full reload, chip absence while searching and Escape focus recovery.
Popular, picked-term results, exact-code results and empty states preserve localized headings and
searchbox names. Reload query persistence, product navigation/history, empty recovery focus, tablet
rotation, containment and page-top axe pass. Main markup matches after sorting attributes,
consistently mapping generated React Aria IDs and their references, and normalizing local preview
origins. Images are explicitly decoded and painted before capture.
All 32 screenshot pairs are byte-identical; actual PNG bytes were checked and the Persian tablet
popular state viewed. No styles, baselines or tolerances changed. Full browser/device and TV
spatial-navigation suites and assistive-technology testing were not run.
Next: extract search-page results into a storefront organism.

**One hundred and forty-sixth checkpoint verified:** extracted StorefrontSearchResults under
`templates/app/organisms/` with explicit countLabel and normalized result descriptors. It preserves
the count/status, result order, indexed fragment keys, product hrefs, soft thumbnail frames,
image alt/sizes, LTR product codes, localized subtitles, prices and responsive classes without
adding a DOM wrapper. View retains results visibility, count mapping and list normalization;
search/shared logic retain matching, image/link/subtitle/price descriptors, query and language
URL/history state, reporting, navigation and focus. Package ArchFrame/Price retain media and price
rendering; layout retains slot placement. No state, mutations or browser effects moved;
ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 26 focused
mobile/desktop browser tests pass with retries disabled: bilingual product exploration and return
to filtered shop, query/language recovery and clearing without history churn, closing back to
entered delivery details, clear/Escape behavior, and readable codes/prices at touch widths 320/390/768.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Popular, picked-term multiple results, exact-code single results and empty states
preserve localized headings/searchbox names, count/status semantics, LTR codes, product hrefs,
soft thumbnail frames/sizes, subtitles and prices. Every popular term preserves query/URL updates
without history churn or full reload and Escape focus recovery. Product links navigate by touch or
Enter; query recovery after reload/product history, empty recovery focus, tablet rotation,
containment and page-top axe pass. Main markup matches after sorting attributes, consistently
mapping generated React Aria IDs and their references, and normalizing local preview origins.
Images are explicitly decoded and painted before capture.
All 32 screenshot pairs preserve dimensions and layout; 30 are byte-identical. The Persian tablet
empty state's unchanged close outline differs by 31 pixels (maximum channel delta 2), and the
English TV-width single-result state's unchanged input corner differs by five pixels (maximum
delta 1). Actual PNG bytes and difference bounds were checked; both differing pairs and the Persian
tablet multiple-result state were viewed. No styles, baselines or tolerances changed. Full
browser/device and TV spatial-navigation suites and assistive-technology testing were not run.
Next: extract search-page empty state into a storefront organism.

**One hundred and forty-seventh checkpoint verified:** extracted StorefrontSearchEmpty under
`templates/app/organisms/` with explicit countLabel/title/accent/body, retry (label, onClick) and
browse (label, href) props. It preserves the zero-result status/content siblings, search-x package
EmptyState, centered content and wrapping action row, primary retry button and secondary shop link
without adding a DOM wrapper. View retains no-result visibility/localized mapping and no longer
imports DS directly. Search/shared logic retain matching, counts, query/URL/history updates,
retry clearing/focus, reporting and navigation. Package EmptyState/Button retain heading/icon/action
semantics; layout retains slot placement. No state, mutations or browser effects moved;
ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 26 focused
mobile/desktop browser tests pass with retries disabled: bilingual product exploration and return
to filtered shop, query/language recovery and clearing without history churn, closing back to
entered delivery details, clear/Escape behavior, and readable codes/prices at touch widths 320/390/768.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They check no-result visibility, localized zero-count/status, h2/accent/body,
decorative icon, primary retry and secondary localized shop link. Retry by touch or Enter/Space
clears the query and focuses the searchbox. Reload preserves the no-result query; shop navigation/back
without full reload restores it. Popular terms, multiple/exact-code results, product navigation,
tablet rotation, containment and page-top axe pass. Main markup matches after sorting attributes,
consistently mapping generated React Aria IDs and references, and normalizing local preview origins.
The empty screenshot is taken after query reload; transition/recovery are checked separately.
Initial probes exposed navigation-dependent heading tabindex/focus timing outside the extracted
content; capture setup was corrected without changing application code or stripping focus attributes.
Images are explicitly decoded and painted before capture.
All eight empty-state screenshot pairs are byte-identical. Across all 32 pairs, 31 are byte-identical;
the unchanged English TV-width single-result input corner differs by five pixels (maximum channel
delta 1), with unchanged dimensions/layout. Actual PNG bytes and difference bounds were checked;
the differing pair and Persian tablet empty state were viewed. No styles, baselines or tolerances
changed. Full browser/device and TV spatial-navigation suites and assistive-technology testing
were not run.
Next: simplify search-page View composition.

**One hundred and forty-eighth checkpoint verified:** simplified search-page View composition by
removing the redundant single-child fragment around StorefrontSearchLayout. The empty Shell
sticky-slot fragment remains (two fragments become one). Visibility, localized descriptors,
callbacks, list normalization and slot order remain unchanged. Normalized Babel syntax trees
match after unwrapping only the redundant fragment, before and after formatting.
Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 26 focused
mobile/desktop browser tests pass with retries disabled: bilingual product exploration and return
to filtered shop, query/language recovery and clearing without history churn, closing back to
entered delivery details, clear/Escape behavior, and readable codes/prices at touch widths 320/390/768.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Popular, multiple-result, single-result and reloaded empty states preserve
localized headings/searchbox names, count/status semantics, product links/media/codes/prices,
empty h2/accent/body/icon and primary retry/secondary shop actions. Term activation by touch or
Enter/Space preserves query/URL updates without history churn; retry clears and focuses the field.
Reload query recovery, product/shop navigation without full reload and history return, tablet
rotation, containment and page-top axe pass. Main markup matches after sorting attributes,
consistently mapping generated React Aria IDs and references, and normalizing local preview origins.
Images are explicitly decoded and painted before capture.
All 32 screenshot pairs preserve dimensions/layout; 29 are byte-identical. The Persian tablet,
English desktop and English TV-width single-result screenshots each differ by five pixels at an
unchanged input corner (maximum channel delta 1). Actual PNG bytes and difference bounds were
checked and all differing pairs viewed. No styles, baselines or tolerances changed. Full
browser/device and TV spatial-navigation suites and assistive-technology testing were not run.
Next: extract contact-page heading into a storefront organism.

**One hundred and forty-ninth checkpoint verified:** extracted StorefrontContactHeading under
`templates/app/organisms/` with explicit eyebrow/title/accent/intro props. It preserves the original
eyebrow, spaced accented h1 and introduction as siblings with unchanged classes and no additional
wrapper. View retains localized mapping; contact/shared logic retain customer prefill, validation,
submission, map fallback, navigation and focus. Layout retains header placement/wrapper. No state,
mutations or browser effects moved; ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All eight focused
mobile/desktop browser tests pass with retries disabled: studio map/directions, reply-channel
validation and demo completion, multi-error summary/field links, signed-in prefill and guest fields.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They check one localized page h1, accent, eyebrow, introduction and direct
DIV/H1/P header children across initial, invalid, demo-complete and return-to-form states. Error
summary and message-link focus, completion-region focus, return-to-message focus and retained
name/email/message drafts pass with touch or Enter/Space actions. The demo API is checked before
completion; no message is sent. Tablet rotation, containment and page-top axe pass. Header markup
matches without normalization.
All 32 header screenshot pairs are byte-identical; actual PNG bytes were checked and the Persian
tablet return-to-form heading viewed. No styles, baselines or tolerances changed. Full-page visual,
full browser/device and TV spatial-navigation suites and assistive-technology testing were not run.
Next: extract contact-page studio details into a storefront organism.

**One hundred and fiftieth checkpoint verified:** extracted StorefrontContactDetails under
`templates/app/organisms/` with explicit rows, WhatsApp/phone/Instagram, map and directions
descriptors. It preserves the sunken details card, action order/classes, safe external-link
attributes, vf-contact-map target, map ErrorBoundary and original map props/callbacks without
adding a DOM wrapper. View maps availability/localized descriptors/callbacks; contact/shared logic
retain studio values, valid-location checks, channels, map loading/fallback and navigation.
Package components retain rendering/interaction semantics and layout retains the details wrapper
and responsive columns. No state, mutations or browser effects moved; ownership documentation
is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All eight focused
mobile/desktop browser tests pass with retries disabled: studio map/directions, reply-channel
validation and demo completion, multi-error summary/field links, signed-in prefill and guest fields.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920, each with a loaded map and a blocked Leaflet script. They check localized row
labels, phone/WhatsApp/Instagram/directions destinations and external-link protections, localized map
name/marker destination and studio tooltip. In fallback, the map disappears while address/actions/
directions remain; reply validation still focuses the phone and retains the message draft.
Tablet rotation, containment and page-top axe pass. Details markup matches after sorting attributes,
consistently mapping generated React Aria IDs and references, and normalizing local preview origins.
Map images are decoded before capture. The probe's initial marker-count and Persian tooltip
expectations were corrected to distinguish zoom controls and localized studio wording.
TV follow-up captures explicitly settle tile-image loading hints/decoding before markup comparison;
the original captures are retained. All 16 screenshot pairs preserve dimensions/layout; 14 are
byte-identical. Persian phone and desktop loaded-map captures each differ at one zoom-control-edge
pixel (maximum channel delta 1). Actual PNG bytes/difference bounds were checked; both differing
pairs and Persian phone fallback were viewed. All fallback screenshots are byte-identical and
all fallback markup omits the map while retaining rows/directions. No styles, baselines or tolerances
changed. Full-page visual, full browser/device and TV spatial-navigation suites and
assistive-technology testing were not run.
Next: extract contact-page form controls into a storefront organism.

**One hundred and fifty-first checkpoint verified:** extracted StorefrontContactFormControls under
`templates/app/organisms/` with explicit problems, name/phone/email/message descriptors and send
(label, onClick, busy). It preserves summary/field IDs, autocomplete, email type/direction, required
multiline message, hint/error wiring, field order, wrapper classes and large primary send button
with loading/disabled state. View retains not-sent visibility, localized descriptor/callback mapping
and heading/completion/feedback composition. Contact/shared logic retain prefill, reply-channel/
message validation, API submission, busy/errors, draft retention and focus. Package components
retain control semantics; layout retains form placement. No state, mutations or browser effects
moved; ownership documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All eight focused
mobile/desktop browser tests pass with retries disabled: studio map/directions, reply-channel
validation and demo completion, multi-error summary/field links, signed-in prefill and guest fields.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Initial, invalid, pending, failed and return-to-form controls preserve localized
names, field order/attributes, summary links and single phone/email validation focus. An in-browser
API stub verifies trimmed payloads, email as the reply alternative, disabled/loading submission,
failure draft retention, clearing feedback on edit, retry completion and retained name/email/message
with message focus on return. No external request is sent. Tablet rotation and containment pass.
Form-column markup matches after sorting attributes, consistently mapping generated React Aria
IDs/references and normalizing local preview origins.

Page-top axe passes in initial/invalid/pending/failed states. Returning to the form after mocked live
completion reproduces an existing serious role-img-alt warning in both versions: two React Aria
assertive-log announcement nodes reference the unmounted send button's ID. A five-second readiness
check confirms this is not a brief transition. The comparison records and requires the same warning
in both versions; it does not suppress the rule. Fix pending-submit announcement accessibility next,
then resume contact completion extraction.
All 40 form-column screenshot pairs preserve dimensions/layout; 34 are byte-identical. Six
invalid/pending captures differ by 4–22 field-edge pixels (maximum channel delta 1). Actual PNG
bytes and difference bounds were checked; representative English/Persian tablet and English TV
pairs were viewed. Desktop/TV follow-ups move the pointer outside the form to prevent hover-state
timing differences; original captures are retained. No styles, baselines or tolerances changed.
Full-page visual, full browser/device and TV spatial-navigation suites and assistive-technology
testing were not run.
Next: fix pending-submit announcement accessibility.

**One hundred and fifty-second checkpoint verified:** fixed pending-submit announcement accessibility
in the shared package Button. React Aria's isPending announcements reference the originating button
ID; removing that button after completion left unnamed role=img entries in its assertive log.
Button now uses its inline text loadingLabel status and owns pending interaction guards instead of
requesting ID-based pending announcements. It retains React Aria's action/link primitives, visible
label/spinner, accessible names, focusability while pending and native explicit-disabled behavior.
Activation callbacks are blocked while focus/hover callbacks remain available. Pending submit buttons
use type=button; a scoped form listener also blocks implicit submission from a single text field,
without blocking a different enabled submitter. The listener is removed on recovery/unmount.
Pending CSS selectors now use the existing loading class, preserving visual values and disabled
link styling. Package declarations/docs and generated dist output are updated.

Two bilingual completion-announcement regression tests fail on the old implementation and pass
afterward. Added component coverage checks pending focus, inline status, pointer/Enter/Space
blocking, programmatic click, implicit form submission, another enabled submitter and recovery.
Added bilingual mobile/desktop contact tests use an in-browser API stub for pending completion,
return-to-form focus/drafts, failed retry and clean axe scans without external requests.
`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 76 selected
component interaction/accessibility tests and all 12 focused contact browser tests pass with retries
disabled. Initial concurrent test runs shared an artifact directory and produced trace-file errors;
final runs use isolated output folders and a list reporter.

Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920 across initial, invalid, pending, failed and return-to-form states. They verify
payload trimming, pending loading/disabled state, validation focus, failed-request drafts, retry
completion, retained edit values, tablet rotation and containment. Baseline axe reproduces the two
unnamed announcement nodes after completion/edit; current axe is clean in every captured state.
Form markup matches after generated React Aria ID mapping, attribute sorting and removal of the
old internal data-pending marker from the baseline comparison; pending styles now use the loading
class. Pointer position is stabilized before capture. No screenshot baselines or tolerances change.
All 40 form-column screenshot pairs preserve dimensions/layout; 34 are byte-identical. Six tablet/
desktop invalid/pending/edit captures differ by 2–53 pixels (maximum channel delta 26); actual PNG
bytes and bounds were checked, and representative Persian invalid and English pending pairs were
viewed. No screenshot baselines or tolerances changed. Full-page visual, full browser/device and TV
spatial-navigation suites and assistive-technology testing were not run.
Next: extract contact-page completion into a storefront organism.

**One hundred and fifty-third checkpoint verified:** extracted StorefrontContactCompletion under
`templates/app/organisms/` with explicit title/body and edit (label, onClick) props. It preserves the
vf-contact-success focus target, tabindex, named region, success Alert, secondary return-to-form
button and original wrappers/classes without adding a DOM wrapper. View retains sent visibility
and localized demo/live copy mapping; contact/shared logic retain submission outcomes, busy/errors,
draft retention, edit transitions and focus. Package Alert/Button retain feedback/action semantics;
layout retains form-column placement. No state, mutations or browser effects moved. Ownership
documentation now also records a separate branch, commit and PR per verified stage, with merges
only when requested.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop browser tests pass with retries disabled: pending live-stub completion/accessibility,
return-to-form focus/drafts and failure recovery, studio map/directions, reply-channel validation,
demo completion, multi-error summary/field links, signed-in prefill and guest fields.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They check completion absence initially/pending/failed, localized demo versus
live success title/body, named-region/tabindex/focus, secondary edit action, removed form fields,
retained name/email/message drafts and message focus on return. Live requests are stubbed in-browser;
no message is sent. Failed retry then completion, repeated editing, tablet rotation, containment
and page-top axe pass. Form-column markup matches after sorting attributes and consistently mapping
generated React Aria IDs/references; pointer position is stabilized before screenshots.
All 16 demo/live completion screenshot pairs are byte-identical. Across all 32 form-column pairs,
26 are byte-identical; six edit-state captures differ by 9–27 field-edge pixels (maximum channel
delta 1) with unchanged dimensions/layout. Actual PNG bytes and bounds were checked; Persian phone
live completion and representative English tablet edit pairs were viewed. No styles, screenshot
baselines or tolerances changed. Full-page visual, full browser/device and TV spatial-navigation
suites and assistive-technology testing were not run.
Next: extract contact-page feedback into a storefront organism.

**One hundred and fifty-fourth checkpoint verified:** extracted StorefrontContactFeedback under
`templates/app/organisms/` with an explicit message prop. It preserves the package danger Alert's
role, decorative icon, title and original markup without adding a wrapper. View retains API-error
visibility/message mapping and no longer imports DS directly. Contact/shared logic retain localized
failure wording, submission, busy/errors, drafts and clearing on edit/retry. Package Alert retains
announcement semantics; layout retains feedback placement after the columns. No state, mutations
or browser effects moved; ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop contact browser tests pass with retries disabled: pending completion/accessibility,
return-to-form focus/drafts and failure recovery, studio map/directions, reply-channel validation,
demo completion, multi-error summary/field links, signed-in prefill and guest fields.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They check initial/pending/success absence, localized role=alert/title, decorative
icon, direct placement after the columns, repeated failures and retained name/email/message drafts.
Editing clears feedback; retry clears it while pending and successful completion keeps it absent.
Recovery completion and return-to-message focus pass with touch or Enter/Space actions. Live
requests are stubbed in-browser; no message is sent. Tablet rotation, containment and page-top axe
pass. Feedback markup matches without normalization.
All 16 feedback screenshot pairs are byte-identical; actual PNG bytes were checked and the Persian
tablet retry alert viewed. No styles, baselines or tolerances changed. Full-page visual, full
browser/device and TV spatial-navigation suites and assistive-technology testing were not run.
Next: simplify contact-page View composition.

**One hundred and fifty-fifth checkpoint verified:** simplified contact-page View composition by
removing the redundant single-child fragment around StorefrontContactLayout. Four fragments become
three: the form's multi-child fragment, heading text fragment and empty Shell sticky-slot fragment
remain. Localized descriptors, availability, callbacks, conditional form/completion/feedback content
and slot order are unchanged. Normalized Babel syntax trees match after unwrapping only the
redundant fragment, before and after formatting. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and `git diff --check` pass. All 12 focused
mobile/desktop contact browser tests pass with retries disabled: pending completion/accessibility,
return-to-form focus/drafts and failure recovery, studio map/directions, reply-channel validation,
demo completion, multi-error summary/field links, signed-in prefill and guest fields.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They check initial/pending/failed completion absence, localized demo/live success
wording, named-region/tabindex/focus, secondary edit action, removed fields, failed retry then
completion, retained name/email/message drafts and message focus on return. Live requests are
stubbed in-browser; no message is sent. Tablet rotation, containment and page-top axe pass.
Form-column markup matches after sorting attributes and consistently mapping generated React Aria
IDs/references; pointer position is stabilized before screenshots.
All 16 completion screenshot pairs are byte-identical. Across all 32 form-column pairs, 29 are
byte-identical; three English edit-state captures differ by 9–23 field-edge pixels (maximum channel
delta 1) with unchanged dimensions/layout. Actual PNG bytes and bounds were checked; representative
English tablet edit pairs were viewed. No styles, baselines or tolerances changed. Full-page visual,
full browser/device and TV spatial-navigation suites and assistive-technology testing were not run.
Next: extract weddings-page heading into a storefront organism.

**One hundred and fifty-sixth checkpoint verified:** extracted StorefrontWeddingsHeading under app organisms
from the weddings View heading slot. Explicit eyebrow/title/accent/intro and plan/WhatsApp descriptors
preserve the original sibling structure, title spacing, classes, button styles and external-link
semantics. View retains localized copy, the inquiry anchor and WhatsApp availability. Layout keeps
hero placement; weddings/shared logic retain configuration, navigation, inquiry state, validation,
submission, drafts and focus. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass after syncing installed
dependencies to the lockfile (the initial run detected stale local Playwright/axe packages).
All six focused mobile/desktop browser tests pass with retries disabled: English/Persian plan-link
navigation without draft loss, and required-field summary/focus/accessibility.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920, each with configured and absent WhatsApp. They verify one h1, localized plan link,
anchor href, optional action count, external-link semantics, touch/Enter activation, retained name/
message drafts, tablet rotation, containment and page-top axe. No inquiry is submitted.
Heading markup matches after sorting attributes and consistently mapping generated React Aria IDs.
All 16 heading screenshot pairs are byte-identical; actual PNG bytes were checked and representative
English tablet and Persian phone captures viewed. No styles, baselines or tolerances changed.
Full-page visual, full browser/device and TV spatial-navigation suites and assistive-technology
testing were not run.
Next: extract weddings-page hero media into a storefront organism.

**One hundred and fifty-seventh checkpoint verified:** extracted StorefrontWeddingsHeroMedia under
app organisms from the weddings View hero-media slot. Its explicit placeholderLabel preserves the
existing ArchFrame's 4/5 ratio, default arch appearance, empty alt text and direct hero-child
structure without a new wrapper or photo source. View retains localized copy mapping; layout keeps
responsive hero placement; weddings/shared logic retain configuration, navigation, inquiry state,
validation, submission, drafts and focus. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. All six focused
mobile/desktop browser tests pass with retries disabled: English/Persian inquiry-anchor navigation
without draft loss, and required-field summary/focus/accessibility.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify the localized placeholder, ratio, arch classes, direct hero children,
absence of img/image-role semantics for the empty alt placeholder, touch/Enter inquiry navigation,
retained name/message drafts, tablet rotation, containment and page-top axe. No inquiry is submitted.
Hero markup matches after sorting attributes and consistently mapping generated React Aria IDs.
Seven of eight hero screenshot pairs are byte-identical. The Persian TV-width pair differs by
32 arch-edge pixels (maximum channel delta 1), with equal 1016-by-673 dimensions and matching markup.
Actual PNG bytes/bounds were checked; Persian TV baseline/current, Persian tablet and English desktop
captures were viewed. No styles, baselines or tolerances changed.
Full-page visual, full browser/device and TV spatial-navigation suites and assistive-technology
testing were not run.
Next: extract weddings-page services into a storefront organism.

**One hundred and fifty-eighth checkpoint verified:** extracted StorefrontWeddingsServices under
app organisms from the weddings View services slot. Explicit service records preserve card order,
keyed fragments, padding, decorative icons and title/description/price classes without a new wrapper.
View retains list normalization; weddings logic supplies localized service/pricing records and keeps
inquiry state, validation, submission, drafts and focus. Layout retains the responsive services grid.
Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six focused mobile/
desktop browser cases pass across two runs with retries disabled: English/Persian inquiry-anchor
navigation without draft loss, and required-field summary/focus/accessibility. The initial run had
five passes and one Chrome launch timeout before the page opened; that mobile validation case
passed in isolation. The stalled task-owned browser/worker was stopped; original logs are retained.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify card count/order/localized title/body/price, decorative icons, padding,
direct grid children, equal grid columns/card bounds, touch/Enter inquiry navigation, retained name/
message drafts, tablet rotation, containment and page-top axe. No inquiry is submitted.
Service-section markup matches after sorting attributes and consistently mapping generated React
Aria IDs. All eight service screenshot pairs are byte-identical; actual PNG bytes were checked and
representative Persian tablet and English desktop captures viewed. No styles, baselines or
tolerances changed. Full-page visual, full browser/device and TV spatial-navigation suites and
assistive-technology testing were not run.
Next: extract weddings-page story into a storefront organism.

**One hundred and fifty-ninth checkpoint verified:** extracted StorefrontWeddingsStory under app
organisms from the weddings View story slot. Explicit gallery/process titles, photo records and
steps preserve sibling structure, h2 levels, keyed fragments, image source/alt/lazy loading, ordered
list semantics and responsive classes without a new wrapper. View retains title mapping and list
normalization; weddings/shared logic supply photo/step descriptors and retain inquiry behavior.
Layout retains the story section and placement. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. All six focused mobile/
desktop browser tests pass with one worker and retries disabled: English/Persian inquiry-anchor
navigation without draft loss, and required-field summary/focus/accessibility.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify headings, three ordered image sources/localized numbered alts, initial
lazy-loading attributes and decoded images before capture, ordered process copy, direct section
children, equal grid columns/element bounds, touch/Enter inquiry navigation, retained name/message
drafts, tablet rotation, containment and page-top axe. No inquiry is submitted.
Story markup matches after sorting attributes and normalizing only the local preview origin in
image URLs; the first probe's origin-only mismatch and its captures are retained separately.
All eight story screenshot pairs are byte-identical; actual PNG bytes were checked and representative
Persian tablet and English desktop captures viewed. No styles, baselines or tolerances changed.
Full-page visual, full browser/device and TV spatial-navigation suites and assistive-technology
testing were not run.
Next: extract weddings-page inquiry introduction into a storefront organism.

**One hundred and sixtieth checkpoint verified:** extracted StorefrontWeddingsInquiryIntro under
app organisms from the weddings View inquiry-introduction slot. Explicit title/intro props preserve
the h2, paragraph, sibling structure and classes without a new wrapper. View retains localized copy
mapping; layout retains the inquiry anchor, introduction column and responsive placement. Weddings/
shared logic retain form state, validation, submission, drafts, navigation and focus. Ownership/
edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. All six focused mobile/
desktop browser tests pass with one worker and retries disabled: English/Persian inquiry-anchor
navigation without draft loss, and required-field summary/focus/accessibility.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify localized h2/paragraph content, direct inquiry-column children, one
inquiry anchor, equal grid columns/element bounds, touch/Enter inquiry navigation, retained name/
message drafts, tablet rotation, containment and page-top axe. No inquiry is submitted.
Introduction markup matches after sorting attributes. All eight introduction screenshot pairs are
byte-identical; actual PNG bytes were checked and representative Persian tablet and English desktop
captures viewed. No styles, baselines or tolerances changed. Full-page visual, full browser/device
and TV spatial-navigation suites and assistive-technology testing were not run.
Next: extract weddings-page form controls into a storefront organism.

**One hundred and sixty-first checkpoint verified:** extracted StorefrontWeddingsFormControls under
app organisms from the weddings View's conditional form slot. Explicit problems and name/email/
phone/event/guests/date/budget/message/send descriptors preserve the Card, field order, stable IDs,
required/autocomplete/type/direction attributes, date language/minimum, options, message hint/rows
and busy loading/disabled action. View retains descriptor mapping and form/completion visibility;
weddings/shared logic retain field state, date constraints, validation, API payloads, busy/error/
completion state, drafts and focus. Layout retains inquiry placement. Documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. All ten focused mobile/
desktop browser tests pass with one worker and retries disabled. New bilingual regression coverage
checks summary links/name focus, every field, event/budget selection, keyboard calendar selection,
complete localized request payloads, pending duplicate-click prevention, failed-send feedback, retry,
completion focus/accessibility, return-to-name focus and retained text/select/date values. Live
requests are stubbed locally; no inquiry is sent. Existing bilingual inquiry-anchor and validation
coverage also passes. The new test's initial exact calendar locator was corrected for the existing
accessible name that includes its field label; initial logs are retained separately.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify field contracts, Card padding, equal grid columns/field bounds,
touch/Enter anchor navigation, retained drafts, tablet rotation, containment and page-top axe.
Form markup matches after sorting attributes and consistently mapping generated React Aria IDs.
Seven original screenshot pairs are byte-identical. The English TV pair has sticky-header overlap
at different automatic scroll positions (48,732 differing pixels); markup and field bounds match.
A separate 1920-by-2200 paired capture fits the tall form without header overlap and is byte-identical;
original captures are retained. Actual PNG bytes/dimensions/bounds were checked, and Persian tablet,
English desktop, original TV pairs and corrected TV capture viewed. No styles, baselines or
tolerances changed. Full-page visual, full browser/device and TV spatial-navigation suites and
assistive-technology testing were not run.
Next: extract weddings-page completion into a storefront organism.

**One hundred and sixty-second checkpoint verified:** extracted StorefrontWeddingsCompletion under
app organisms from the weddings View's conditional completion slot. Explicit title/body/edit props
preserve the success region's stable ID, tabindex, accessible name, classes, success Alert and
secondary return-to-form action without a new wrapper. View retains visibility and localized demo/
live copy mapping; weddings/shared logic retain outcomes, busy/errors, drafts, edit transitions and
focus. Layout retains inquiry placement. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. All ten focused mobile/
desktop browser tests pass with one worker and retries disabled: bilingual inquiry-anchor/draft
retention, validation summary/focus, all-field date/select interaction and request payloads, pending
duplicate-click prevention, failed retry, completion accessibility and retained values on edit.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify initial/pending/failure absence, localized demo/live success wording,
named-region/tabindex/focus, direct inquiry placement, secondary edit action and absent fields during
completion. Demo and failed-live retry completion both return focus to name and retain name/phone/
email/guests/message drafts. Requests are stubbed locally; no inquiry is sent. Touch or Enter/Space
activation, tablet rotation, containment and page-top axe pass.
Completion markup matches after sorting attributes and consistently mapping generated React Aria
IDs. All 16 completion screenshot pairs are byte-identical; actual PNG bytes were checked and
representative Persian tablet demo and English phone live captures viewed. No styles, baselines or
tolerances changed. Full-page visual, full browser/device and TV spatial-navigation suites and
assistive-technology testing were not run.
Next: extract weddings-page API feedback into a storefront organism.

**One hundred and sixty-third checkpoint verified:** extracted StorefrontWeddingsFeedback under
app organisms from the weddings View feedback slot. Its explicit message prop preserves the package
danger Alert's original semantics and markup without a new wrapper. View retains visibility/message
mapping and no longer imports DS directly. Weddings/shared logic retain failure wording, requests,
busy/error/completion state, drafts, retry and focus. Layout retains feedback after the inquiry
section. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. All ten focused mobile/
desktop browser tests pass with one worker and retries disabled: bilingual inquiry-anchor/drafts,
validation summary/focus, date/select payloads, pending duplicate-click prevention, failed retry,
completion accessibility and retained values on edit.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify initial/pending/completion absence, localized role=alert/title,
decorative icon and direct placement after inquiry. Two failed requests retain name/phone/email/
guests/message drafts. Email editing clears feedback; retry clears it while pending; successful
completion and return-to-name focus keep it absent and preserve drafts. Requests are stubbed locally;
no inquiry is sent. Touch/Enter/Space activation, tablet rotation, containment and page-top axe pass.
Feedback markup matches without normalization. All 16 failure-alert screenshot pairs are
byte-identical; actual PNG bytes were checked and representative Persian phone retry and English
desktop first-failure captures viewed. No styles, baselines or tolerances changed. Full-page visual,
full browser/device and TV spatial-navigation suites and assistive-technology testing were not run.
Next: simplify weddings-page View composition.

**One hundred and sixty-fourth checkpoint verified:** simplified weddings-page View composition by
removing redundant single-child fragments around StorefrontWeddingsLayout, StorefrontWeddingsFormControls
and StorefrontWeddingsCompletion. Five fragments become two: the inquiry slot's multi-child fragment
and empty Shell sticky-slot fragment remain. Localized descriptors, availability, callbacks, list
normalization, conditional form/completion/feedback content and slot order are unchanged. Normalized
Babel syntax trees match after unwrapping only these three fragments, before and after formatting;
the whitespace-insensitive diff contains only their six delimiter removals. Documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. All ten focused mobile/
desktop browser tests pass with one worker and retries disabled: bilingual inquiry-anchor/draft
retention, validation summary/focus, full date/select payloads, pending duplicate-click prevention,
failed retry, completion accessibility and retained text/select/date values on edit.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify initial/pending/failure absence of completion, localized demo/live
wording, named-region/tabindex/focus, direct inquiry placement, secondary edit action and removed
fields. Demo and failed-live retry completion return focus to name and retain name/phone/email/
guests/message drafts. Requests are stubbed locally; no inquiry is sent. Touch/Enter/Space activation,
tablet rotation, containment and page-top axe pass.
Completion markup matches after sorting attributes and consistently mapping generated React Aria
IDs. All 16 completion screenshot pairs are byte-identical; actual PNG bytes were checked and
representative Persian tablet live and English desktop demo captures viewed. No styles, baselines
or tolerances changed. Full-page visual, full browser/device and TV spatial-navigation suites and
assistive-technology testing were not run.
Next: extract FAQ-page heading into a storefront organism.

**One hundred and sixty-fifth checkpoint verified:** extracted StorefrontFaqHeading under app
organisms from the FAQ View heading slot. Explicit eyebrow/title/accent/intro props preserve the
sibling structure, h1, title spacing, accent and introduction classes without a new wrapper. View
retains localized copy mapping; layout retains the page header and responsive placement. FAQ/shared
logic retain category/answer mapping, delivery-rule interpolation, navigation, locale, SEO and focus;
Accordion retains expansion behavior. Ownership/edit-location documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Five focused mobile/
desktop browser tests pass with one worker and retries disabled: recovery navigation to FAQ, printed
content without site chrome, and standalone desktop language switching. The suite intentionally skips
the duplicate mobile standalone-language case.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify localized eyebrow/title/accent/intro, one h1, direct header children,
language/direction and equal header/child bounds. Three question groups and default delivery
expansion remain; touch or Enter/Space closes/opens panels and preserves single expansion and
heading markup. Internal contact navigation preserves language. Tablet rotation, containment and
initial/expanded page-top axe pass.
Heading markup matches without normalization. All eight heading screenshot pairs are byte-identical;
actual PNG bytes were checked and representative Persian phone and English desktop captures viewed.
No styles, baselines or tolerances changed. Full-page visual, full browser/device and TV spatial-
navigation suites and assistive-technology testing were not run.
Next: extract FAQ-page question groups into a storefront organism.

**One hundred and sixty-sixth checkpoint verified:** extracted StorefrontFaqQuestions under app
organisms from the FAQ View questions slot. Explicit groups preserve category order, keyed fragments,
section classes, stable h2 IDs/aria-labelledby and Accordion items/default expansion/headingLevel=3
without a new wrapper. View retains list normalization; FAQ logic retains category/answer mapping
and delivery-rule interpolation. Accordion owns disclosure state and keyboard behavior; shared logic
retains navigation/locale/SEO/focus and layout retains column placement. Documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Five focused mobile/
desktop browser tests pass with one worker and retries disabled: FAQ recovery navigation, printing
without site chrome and standalone desktop language switching. The existing suite intentionally
skips the duplicate mobile standalone-language case.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify three labelled category sections, stable IDs, h2/h3 hierarchy, default
delivery expansion, single expansion within each group and independent expansion across groups.
Touch or Enter/Space toggles named region panels; desktop focus remains on the trigger. Initial and
expanded markup, relative element bounds and screenshots match. Contact navigation preserves
language; tablet rotation retains expansion; containment and page-top axe pass.
Component captures temporarily use a viewport height equal to list height plus 800 pixels to avoid
sticky-header overlap. List width/height are checked unchanged, then the original viewport is restored
for interaction checks. Markup comparison sorts attributes and consistently maps generated React
Aria IDs/references. All 16 initial/expanded screenshot pairs are byte-identical; actual PNG bytes
were checked and representative Persian tablet expanded and English desktop initial captures viewed.
No styles, baselines or tolerances changed. Full-page visual, full browser/device and TV spatial-
navigation suites and assistive-technology testing were not run.
Next: extract FAQ-page contact help into a storefront organism.

**One hundred and sixty-seventh checkpoint verified:** extracted StorefrontFaqContact under app
organisms from the FAQ View contact slot. Explicit title/body/note, contact and nullable WhatsApp
descriptors preserve Card padding, decorative icon, h2, answer text, primary/ghost actions, external
link attributes and the sibling sample-content note without a new wrapper. View retains localized
copy/link mapping and WhatsApp availability; layout retains aside placement/spacing. FAQ/shared
logic retain configuration, question mapping, navigation, locale, SEO and focus. Documentation is
updated and the unused View design-system import is removed.

`npm test`, `npm run check`, the app production build and diff checks pass. Five focused mobile/
desktop browser tests pass with one worker and retries disabled: FAQ recovery navigation, printing
without site chrome and standalone desktop language switching. The existing suite intentionally
skips the duplicate mobile standalone-language case.
Sixteen paired previous/current probes cover English/Persian, present/absent WhatsApp and touch
widths 390/768, desktop 1280 and TV width 1920. They verify heading/link names, card/note sibling
structure, WhatsApp availability and protected external-link attributes, language-preserving internal
contact navigation, accordion touch or Enter/Space controls, tablet rotation, containment and
page-top axe. Aside markup and relative bounds match without normalization. Fifteen of 16 original contact-help
screenshot pairs are byte-identical. Persian desktop without WhatsApp differs at 58 decorative-icon
pixels (maximum channel delta 50, equal 320×506 dimensions); the isolated repeat is byte-identical.
Original captures are retained. Actual PNG bytes were checked and representative captures viewed.
Component captures temporarily increase viewport height to aside height plus 1000 pixels to avoid
sticky-header overlap; aside width/height are checked unchanged before restoring interaction size.
No source styles, baselines or tolerances changed. Full-page visual, full browser/device and TV
spatial-navigation suites and assistive-technology testing were not run.
Next: simplify FAQ View composition.

**One hundred and sixty-eighth checkpoint verified:** simplified FAQ View composition by passing
StorefrontFaqLayout directly to Shell content. Removed only its redundant single-child fragment and
adjusted indentation. Localized heading/contact descriptors, WhatsApp availability, list normalization,
layout slots and the empty Shell sticky-slot fragment remain. Source comparison verifies the exact
fragment-delimiter removal after whitespace normalization. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Five focused mobile/
desktop browser tests pass with one worker and retries disabled: FAQ recovery navigation, printing
without site chrome and standalone desktop language switching. The existing suite intentionally
skips the duplicate mobile standalone-language case.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify one h1, three question groups, default delivery expansion, touch or
Enter/Space single expansion, language-preserving contact navigation, tablet rotation, containment
and expanded page-top axe. Initial/expanded main markup and relative bounds match; generated
React Aria IDs/references are mapped consistently and attributes sorted for comparison. All 16
initial/expanded screenshot pairs are byte-identical; actual PNG bytes were checked and representative
captures viewed. Capture height temporarily equals main height plus 800 pixels to avoid sticky-header
overlap, with unchanged main dimensions checked before restoring interaction size. The first probe
lost the current preview when the browser test runner shut its server down; the completed probe uses
an independently running preview. No source styles, baselines or tolerances changed. Full browser/
device, TV spatial-navigation and assistive-technology suites were not run.
Next: extract policy-page heading into a storefront organism.

**One hundred and sixty-ninth checkpoint verified:** extracted StorefrontPolicyHeading under app
organisms from the policy View heading slot. Explicit eyebrow/title/intro/updated props preserve
four sibling elements, h1, introduction and update metadata classes without adding a wrapper.
View retains localized/selected-document copy mapping; layout retains the header and responsive
placement. Policy/shared logic retain document selection/fallback, section mapping, Persian numbering,
routing, locale, SEO, focus and sticky measurements. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Ten focused mobile/
desktop browser tests pass with one worker and retries disabled: footer/policy switching, accessibility
statement and axe, live delivery wording, unknown policy routing and sign-in legal links.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Each opens shipping and switches through returns, privacy, terms and accessibility.
They verify four direct header children, one h1 matching the active policy, localized eyebrow/update
metadata, language/direction, section-anchor navigation, reload copy, tablet rotation, containment
and page-top axe. All 40 heading markup, relative-bound and PNG comparisons match without
normalization; actual screenshot bytes were checked and representative captures viewed.
An initial probe incorrectly expected client-navigation focus attributes to survive a full reload;
the corrected probe compares reload copy separately and preserves those attributes in paired markup.
No source styles, baselines or tolerances changed. Full-page visual, full browser/device, TV spatial-
navigation and assistive-technology suites were not run.
Next: extract policy-page navigation into a storefront organism.

**One hundred and seventieth checkpoint verified:** extracted StorefrontPolicyNavigation under app
organisms from the policy View navigation slot. Explicit label/links props preserve the labelled nav,
list structure, link order, keyed fragments, hrefs, aria-current, wrapping and classes without adding
a wrapper. View retains localized label mapping and list normalization. Shared navigation logic
retains link/current-state descriptors, routing, locale, SEO and focus; policy logic retains document
selection, section mapping and Persian numbering. Layout retains placement. Documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Ten focused mobile/
desktop browser tests pass with one worker and retries disabled: footer/policy switching, accessibility
statement and axe, live delivery wording, unknown policy routing and sign-in legal links.
Eight paired previous/current probes exercise English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Each opens shipping and switches through returns, privacy, terms and accessibility.
They verify the navigation accessible name, five list items/URLs, one current link, matching h1,
localized heading/update copy, language/direction, section anchors, reload copy, tablet rotation,
containment and page-top axe. All 40 navigation markup, relative-bound and PNG comparisons match
without normalization; actual screenshot bytes were checked and representative captures viewed.
No source styles, baselines or tolerances changed. Full-page visual, full browser/device, TV spatial-
navigation and assistive-technology suites were not run.
Next: extract policy-page sample notice into a storefront organism.

**One hundred and seventy-first checkpoint verified:** extracted StorefrontPolicyNotice under app
organisms from the policy View notice slot. Explicit title/body props preserve the package warning
Alert, its alert semantics, decorative icon and localized copy without adding a wrapper. View retains
localized mapping, layout retains notice placement/spacing and Alert retains presentation/accessibility.
Policy/shared logic retain selection, section mapping, numbering, routing, locale, SEO, focus and
sticky measurements. The unused View design-system import is removed; documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Ten focused mobile/
desktop browser tests pass with one worker and retries disabled: footer/policy switching, accessibility
statement and axe, live delivery wording, unknown policy routing and sign-in legal links.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify exact notice title/body, one warning alert, decorative icon and no
close action, then switch through all five policies and check unchanged notice markup. Reloads,
section-anchor navigation, tablet rotation, containment and page-top axe pass. Initial shipping and
changed accessibility notice markup, relative bounds and all 16 PNG pairs match without normalization;
actual screenshot bytes were checked and representative captures viewed. An initial probe assumed an
SVG icon; it was corrected to inspect the shared Icon's actual CSS-mask span. No source styles,
baselines or tolerances changed. Full-page visual, full browser/device, TV spatial-navigation and
assistive-technology suites were not run.
Next: extract policy-page table of contents into a storefront organism.

**One hundred and seventy-second checkpoint verified:** extracted StorefrontPolicyContents under app
organisms from the policy View tableOfContents slot. Explicit label/sections props preserve the named
navigation landmark, eyebrow, keyed section links, anchors and sticky-panel classes without a wrapper.
View retains localized label mapping/list normalization; policy logic retains section descriptors,
ordering and Persian numbering. Layout retains responsive placement and shared logic retains routing,
focus and sticky measurements. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Ten focused mobile/
desktop browser tests pass with one worker and retries disabled: footer/policy switching, accessibility
statement and axe, live delivery wording, unknown policy routing and sign-in legal links.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920 across shipping, returns, privacy, terms and accessibility. They verify the named
landmark, link count/order/text against section headings, localized numbering, stable section hrefs,
first/last anchor activation by touch or Enter, hash-preserving reload, tablet rotation, containment
and page-top axe. Raw contents markup, relative bounds and sticky fit/position/top match. All 40
contents screenshot pairs are byte-identical; actual PNG bytes were checked and representative
captures viewed. No source styles, baselines or tolerances changed. Full-page visual, full browser/
device, TV spatial-navigation and assistive-technology suites were not run.
Next: extract policy-page document sections into a storefront organism.

**One hundred and seventy-third checkpoint verified:** extracted StorefrontPolicyDocument under app
organisms from the policy View document slot. Explicit normalized section descriptors preserve IDs,
keyed fragments, numbered h2 headings, paragraphs, optional item lists, classes and scroll margins
without adding a wrapper. View retains section/paragraph/item list normalization and descriptor mapping;
policy logic retains selection/fallback, localized content, numbering and item availability. Layout
retains the document wrapper/placement; shared logic retains routing, locale, SEO, focus and sticky
measurements. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Ten focused mobile/
desktop browser tests pass with one worker and retries disabled: footer/policy switching, accessibility
statement and axe, live delivery wording, unknown policy routing and sign-in legal links.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920 across all five policies. They compare exact paragraph/item text and list counts
against bilingual source copy, including terms without lists and accessibility list-only sections.
Section IDs, h2/contents text, first/last anchors by touch or Enter, reload markup, tablet rotation,
containment and page-top axe pass. All 40 document markup, relative-bound and screenshot pairs match
without normalization; actual PNG bytes were checked and representative captures viewed. Component
capture height temporarily equals document height plus 800 pixels to avoid sticky-header overlap;
document width/height are checked unchanged before restoring interaction size. An initial probe
incorrectly required lists in every policy and paragraphs in every section; it now uses source copy
for those expectations. No source styles, baselines or tolerances changed. Full-page visual, full
browser/device, TV spatial-navigation and assistive-technology suites were not run.
Next: simplify policy View composition.

**One hundred and seventy-fourth checkpoint verified:** simplified policy View composition by passing
StorefrontPolicyLayout directly to Shell content. Removed only its redundant single-child fragment
and adjusted indentation. Localized descriptors, policy links, section/paragraph/item normalization,
item visibility mapping and the empty Shell sticky-slot fragment remain. Source comparison verifies
only fragment delimiters and whitespace changed; ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Ten focused mobile/
desktop browser tests pass with one worker and retries disabled: footer/policy switching, accessibility
statement and axe, live delivery wording, unknown policy routing and sign-in legal links.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Shipping and accessibility exercise paragraph/list and list-only content; exact
paragraph/item copy and list counts match bilingual source. Section IDs, h2/contents text, policy
switching, first/last anchors by touch or Enter, reload document markup, tablet rotation, containment
and page-top axe pass. All 16 main markup, relative-bound and screenshot pairs match without
normalization; actual PNG bytes were checked and representative captures viewed. Capture height
temporarily equals main height plus 800 pixels to avoid sticky-header overlap; main dimensions are
checked unchanged before restoring interaction size. No source styles, baselines or tolerances changed.
Full browser/device, TV spatial-navigation and assistive-technology suites were not run.
Next: extract journal-page heading into a storefront organism.

**One hundred and seventy-fifth checkpoint verified:** extracted StorefrontJournalHeading under app
organisms from the journal View heading slot. Explicit eyebrow/title/accent, categoriesLabel/categories
and onCategoryFocus props preserve SectionHeader h1, the named category group, keyed Chips,
selection/aria-pressed and callbacks without adding a wrapper. View retains localized mapping,
list normalization and focus-scroll behavior; journal logic retains filtering, selection callbacks,
page resets and URL navigation. Layout retains header placement; shared logic retains locale, SEO
and page focus. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing bilingual
compact-journal tests pass at 320/390/768 touch widths through the desktop project, plus two mobile/
desktop pagination tests; all use one worker and retries disabled. They cover category focus scrolling,
minimum touch targets, empty/clear, search/Escape, article navigation, pagination and first-page reset.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify two header siblings, one h1, named category group, eight ordered
localized labels, initial selection, last-chip touch or Enter/Space activation, focus visibility,
empty/clear/search recovery, article navigation, tablet rotation, containment and empty-state page-top
axe. Initial and empty-category header markup/relative bounds and all 16 PNG pairs match without
normalization; actual screenshot bytes were checked and representative captures viewed. No source
styles, baselines or tolerances changed. Full-page visual, full browser/device, TV spatial-navigation
and assistive-technology suites were not run.
Next: extract journal-page search controls into a storefront organism.

**One hundred and seventy-sixth checkpoint verified:** extracted StorefrontJournalSearch under app
organisms from the journal View search slot. Explicit label/value/onChange props preserve the package
controlled SearchField without adding a wrapper. View retains localized label/value/callback mapping;
journal logic retains query/category state, matching, first-page resets and navigation. SearchField
retains focus, clear/Escape behavior and accessibility; layout retains placement/spacing. Ownership
documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing bilingual
compact-journal tests pass at 320/390/768 touch widths through the desktop project, plus two mobile/
desktop pagination tests; all use one worker and retries disabled. They cover categories, search/Escape,
empty/clear, focus scrolling, article navigation, pagination and query reset from later pages.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify one search-slot child, accessible labels, empty/filled values, live
matching, focus retention, Escape, pointer/touch clear, no-match recovery, article navigation,
tablet rotation, containment and filled-state page-top axe. Initial/filled markup and relative bounds
match; generated React/React Aria IDs and references are mapped consistently and attributes sorted.
All 16 search screenshot pairs are byte-identical; actual PNG bytes were checked and representative
captures viewed. An initial probe matched both English clear actions; the completed probe scopes
empty-state recovery separately from the field clear button. No source styles, baselines or tolerances
changed. A separate desktop probe confirms an existing shared SearchField limitation in both versions:
programmatically focusing its tabindex=-1 clear button and pressing Enter leaves the query unchanged;
pointer/touch clear and Escape work. That shared control is unchanged in this extraction. Full-page
visual, full browser/device, TV spatial-navigation and assistive-technology suites were not run.
Next: extract journal-page empty feedback into a storefront organism.

**One hundred and seventy-seventh checkpoint verified:** extracted StorefrontJournalEmpty under app
organisms from the journal View noStories branch. Explicit title/clearLabel/onClear props preserve
the package EmptyState h2 and sibling recovery Button without a wrapper. View retains visibility and
localized/callback mapping; journal logic retains query/category matching and clear/reset behavior.
Layout retains feedback placement and shared logic retains locale, SEO and focus. Loading feedback
remains in View. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing bilingual
compact-journal tests pass at 320/390/768 touch widths through the desktop project, plus two mobile/
desktop pagination tests; all use one worker and retries disabled. They cover empty/clear, categories,
search/Escape, focus scrolling, article navigation, pagination and query reset from later pages.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify initial feedback absence, empty-category and unmatched-query h2/copy,
direct EmptyState/recovery-button sibling structure, touch or Enter/Space recovery, cleared query and
reset category, restored stories, search/Escape, article navigation, tablet rotation, containment and
query-empty page-top axe. Feedback markup and relative bounds match; generated React Aria IDs are
mapped consistently. All 16 category/query feedback PNG pairs are byte-identical; captures enclose
both sibling elements, actual bytes were checked and representative images viewed. No source styles,
baselines or tolerances changed. The stage-176 shared SearchField clear-button keyboard limitation
remains documented and unchanged. Full-page visual, full browser/device, TV spatial-navigation and
assistive-technology suites were not run.
Next: extract journal-page loading feedback into a storefront organism.

**One hundred and seventy-eighth checkpoint verified:** extracted StorefrontJournalLoading under app
organisms from the journal View loading branch. An explicit message prop preserves the package card
Skeleton and sibling status paragraph without a wrapper. View retains visibility/localized mapping;
journal logic retains loading demo state, story visibility and filtering. Layout retains feedback
placement; Skeleton retains reduced-motion presentation and shared logic retains locale, SEO and focus.
Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing bilingual
compact-journal tests pass at 320/390/768 touch widths through the desktop project, plus two mobile/
desktop pagination tests; all use one worker and retries disabled. They cover categories, empty/clear,
search/Escape, focus scrolling, article navigation, pagination and query reset from later pages.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify a single aria-hidden card Skeleton, its following localized role=status
paragraph, reduced-motion shimmer suppression and no stories during demo loading. Last-category
selection creates simultaneous empty/loading feedback; touch or Enter/Space selection and recovery,
category reset, tablet rotation, containment and combined-state page-top axe pass. Returning to the
normal journal removes skeleton/status and restores seven stories. Loading/combined main markup,
relative bounds and all 16 PNG pairs match; generated React/React Aria IDs/references are mapped
consistently and attributes sorted. Actual bytes were checked and representative captures viewed.
Capture height temporarily equals main height plus 800 pixels to avoid sticky-header overlap; main
dimensions are checked unchanged before restoring interaction size. No source styles, baselines or
tolerances changed. The stage-176 shared SearchField keyboard-clear limitation remains documented.
Full-page visual, full browser/device, TV spatial-navigation and assistive-technology suites were not run.
Next: extract journal-page featured story into a storefront organism.

**One hundred and seventy-ninth checkpoint verified:** extracted StorefrontJournalFeatured under app
organisms from the journal View featured branch. Explicit title/image/excerpt/meta/cta/href props
preserve the featured wrapper, wide BlogCard, arch frame and priority image. View retains visibility
and localized/story mapping; journal logic retains lead selection, filtering, image resolution,
localized metadata, pagination and article hrefs. Layout retains slot placement and BlogCard retains
presentation/link/image semantics. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing bilingual
compact-journal tests pass at 320/390/768 touch widths through the desktop project, plus two mobile/
desktop pagination tests; all use one worker and retries disabled. They cover category/search changes,
empty/clear, focus scrolling, article navigation, pagination and first-page resets.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Initial and flower-care-filtered leads match source title/excerpt/date/read-time,
article href, CTA, wide/arch structure, eager/high-priority image and empty alt. Touch or Enter/Space
changes the lead; article navigation preserves language. Later page, loading demo and empty category
hide the featured card. Tablet rotation, containment and filtered-state page-top axe pass. Initial/
filtered markup and relative bounds match; generated IDs/references and preview origins are normalized
consistently and attributes sorted. All 16 featured PNG pairs are byte-identical; actual bytes were
checked and representative captures viewed. Capture height temporarily equals card height plus 1000
pixels to avoid sticky-header overlap; card dimensions are checked unchanged before restoring size.
No source styles, baselines or tolerances changed. The stage-176 shared SearchField keyboard-clear
limitation remains documented. Full-page visual, full browser/device, TV spatial-navigation and
assistive-technology suites were not run.
Next: extract journal-page story grid into a storefront organism.

**One hundred and eightieth checkpoint verified:** extracted StorefrontJournalStories under app
organisms from the journal View stories slot. Explicit stories preserve ordered keyed BlogCards,
stacked layout, soft frames, 4/3 aspect and story props without adding a wrapper. View retains list
normalization; journal logic retains filters, pagination slices, mapping, localized metadata, image
resolution and article hrefs. Layout retains the responsive grid wrapper/placement and BlogCard
retains presentation/link/image semantics. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing bilingual
compact-journal tests pass at 320/390/768 touch widths through the desktop project, plus two mobile/
desktop pagination tests; all use one worker and retries disabled. They cover categories, search,
empty/clear, focus scrolling, article navigation, pagination and first-page resets.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. First/later-page card order, title/excerpt/read-time, article hrefs, stacked/soft
structure, 4/3 media, empty alt and no high fetch priority match source descriptors. Lazy attributes
are checked on fresh first-page and reloaded later-page loads before settlePage intentionally makes
images eager. Touch or Enter changes pages/opens a story; reload, language preservation, empty/loading
grid absence, tablet rotation, containment and later-page page-top axe pass. Initial/later markup and
relative bounds match with generated IDs/references and preview origins normalized consistently and
attributes sorted. All 16 grid PNG pairs are byte-identical; actual bytes were checked and representative
captures viewed. Capture height temporarily equals grid height plus 1000 pixels to avoid sticky-header
overlap; grid dimensions are checked unchanged before restoring size. An initial probe incorrectly
expected lazy attributes on reused image nodes after settlePage; the completed probe checks fresh loads.
No source styles, baselines or tolerances changed. The stage-176 shared SearchField keyboard-clear
limitation remains documented. Full-page visual, full browser/device, TV spatial-navigation and
assistive-technology suites were not run.
Next: extract journal-page pagination into a storefront organism.

**One hundred and eighty-first checkpoint verified:** extracted StorefrontJournalPagination under app
organisms from the journal View pagination slot. Explicit page/pageCount/href/onChange props preserve
the package Pagination and existing class/top margin without a wrapper. View retains paging mapping;
journal logic retains counts, clamping, slices, href generation, callbacks and first-page resets.
Pagination retains localized controls/digits, disabled/current states and single-page visibility.
Layout retains placement and shared logic retains routing, locale and focus. The unused View
design-system import is removed; ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing bilingual
compact-journal tests pass at 320/390/768 touch widths through the desktop project, plus two mobile/
desktop pagination tests; all use one worker and retries disabled. They cover categories, search,
empty/clear, focus scrolling, article navigation, pagination and first-page resets.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. They verify the named pagination landmark, localized digits, current-page markers,
first/last disabled controls and real localized page hrefs. Touch or Enter changes page; reload,
page=999 clamping, query/category first-page reset, single-result/empty/loading absence, tablet rotation,
containment and later-page page-top axe pass. First/last markup and relative bounds match with
generated React/React Aria IDs/references mapped consistently and attributes sorted. All 16 pagination
PNG pairs are byte-identical; actual bytes were checked and representative captures viewed. An initial
probe expected page=1 in hrefs; the completed probe honors the router's canonical URL without it.
No source styles, baselines or tolerances changed. The stage-176 shared SearchField keyboard-clear
limitation remains documented. Full-page visual, full browser/device, TV spatial-navigation and
assistive-technology suites were not run.
Next: simplify journal View composition.

**One hundred and eighty-second checkpoint verified:** simplified journal View composition by passing
StorefrontJournalLayout and its conditional featured story directly. Removed exactly three redundant
fragment pairs; retained the multi-child feedback fragment and empty sticky slot. Source comparison
ignoring formatting confirms all other tokens are preserved, including conditions, explicit props,
list normalization, paging callbacks and category focus scrolling. State, routing and layout ownership
remain unchanged; ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing bilingual
compact-journal tests pass at 320/390/768 touch widths through the desktop project, plus two mobile/
desktop pagination tests; all use one worker and retries disabled.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Initial, later-page, empty, loading and combined empty/loading main-content markup
and relative bounds match with generated IDs/references and preview origins normalized consistently
and attributes sorted. All 40 main-content PNG pairs are byte-identical; actual bytes were checked
and representative captures viewed. Capture height temporarily equals main height plus 1000 pixels;
main dimensions are checked unchanged before restoring size. Touch or keyboard pagination, reload,
query first-page reset, Escape recovery, category focus/selection, empty recovery, article navigation,
language preservation, tablet rotation, containment and initial page-top axe pass. No source styles,
baselines or tolerances changed. The stage-176 shared SearchField keyboard-clear limitation remains
documented. Full browser/device, TV spatial-navigation and assistive-technology suites were not run.
Next: extract post-page loading feedback into a storefront organism.

**One hundred and eighty-third checkpoint verified:** extracted StorefrontPostLoading under app
organisms from the post View loading branch. Explicit title/message props preserve the h1, decorative
card Skeleton and localized role=status paragraph as siblings without adding a wrapper. View retains
loading visibility and copy mapping; post logic retains article selection, loading/missing state and
content mapping. Layout retains feedback placement and controlled article visibility, while shared
logic retains routing, locale, SEO and focus. Source comparison confirms the View changed only by
replacing the loading branch and adding its import; the organism preserves the extracted markup.
Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Four existing bilingual
post-loading state tests pass through mobile/desktop projects with one worker and retries disabled.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Loading titles/status match source copy; the card skeleton remains aria-hidden,
reduced-motion shimmer is absent and article content is hidden. Loading and combined missing/loading
main-content markup and relative bounds match with generated IDs/references and preview origins
normalized consistently and attributes sorted. All 16 main-content PNG pairs are byte-identical;
actual bytes were checked and representative captures viewed. Capture height temporarily equals
main height plus 1000 pixels, asserting unchanged main dimensions before restoring size. Missing-story
recovery and normal article back links work by touch or Enter with language preserved; normal-route
recovery, history back, reload, tablet rotation, containment and loading page-top axe pass. An initial
probe used an ambiguous article selector that also matched related cards; the completed probe scopes
the reading article. No source styles, baselines or tolerances changed. Full browser/device,
TV spatial-navigation and assistive-technology suites were not run.
Next: extract post-page missing-story feedback into a storefront organism.

**One hundred and eighty-fourth checkpoint verified:** extracted StorefrontPostMissing under app
organisms from the post View missing branch. Explicit title/backLabel/journalHref props preserve
the level-one EmptyState heading and package Button recovery link as siblings without adding a
wrapper. View retains missing visibility and localized copy/link mapping; post/shared logic retains
article selection, loading/missing state, routing and navigation/focus. Layout retains feedback
placement and controlled article visibility. Source comparison confirms the View changed only by
replacing the missing branch and adding its import, with extracted markup preserved through explicit
props. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Four existing bilingual
post-loading regression tests pass through mobile/desktop projects with one worker and retries disabled.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Missing heading/recovery text match localized source copy; the recovery remains a
real link to the localized journal. Missing-only and combined missing/loading main-content markup
and relative bounds match with generated IDs/references and preview origins normalized consistently
and attributes sorted. All 16 main-content PNG pairs are byte-identical; actual bytes were checked
and representative captures viewed. Capture height temporarily equals main height plus 1000 pixels,
asserting unchanged main dimensions before restoring size. Touch or Enter recovery, locale preservation,
history back, reload, tablet rotation, containment and missing-state page-top axe pass. Missing feedback
is absent from normal classic/block articles; combined loading preserves its aria-hidden skeleton,
visible status and hidden article. No source styles, baselines or tolerances changed. Full browser/device,
TV spatial-navigation and assistive-technology suites were not run.
Next: extract the post-page article heading into a storefront organism.

**One hundred and eighty-fifth checkpoint verified:** extracted StorefrontPostHeading under app
organisms from the post View article slot. Explicit journalHref/backLabel/meta/title/intro props
preserve the native journal link with arrow icon, metadata, h1 and introduction as siblings without
adding a wrapper. View retains localized copy/link mapping; post logic retains article selection,
metadata formatting and block/classic mapping. Layout retains article visibility/placement/spacing;
shared page logic retains routing, locale, SEO and heading focus. Source comparison confirms the
View changed only by replacing the heading block and adding its import, with extracted markup
preserved through explicit props. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing mobile/
desktop browser tests pass with one worker and retries disabled: bilingual post-loading states and
home-to-article navigation.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Classic and block-based article headings match source title/intro/metadata,
localized back-label/href, icon size, native-link semantics and sibling order. Heading markup,
relative bounds and capture rectangles match with generated IDs/references and preview origins
normalized consistently and attributes sorted. All 16 heading PNG pairs are byte-identical; actual
bytes were checked and representative captures viewed. Captures use the union of the four heading
siblings without changing source styles or viewport height. Touch or Enter article/back navigation,
heading focus after client navigation, language preservation, browser back, reload, tablet rotation,
containment and classic-article page-top axe pass. Heading elements are absent in loading/missing
states. An initial probe assumed inline SVG icons; the completed probe checks the existing decorative
CSS-mask icon and its explicit 16px size. No source styles, baselines or tolerances changed. Full browser/
device, TV spatial-navigation and assistive-technology suites were not run.
Next: extract post-page block content into a storefront organism.

**One hundred and eighty-sixth checkpoint verified:** extracted StorefrontPostBlocks under app
organisms from the post View block branch. Explicit block records preserve ordered keyed paragraphs,
h2 headings, quotes, captioned Pictures and tip lists without adding a wrapper. View retains block
visibility, explicit descriptor mapping and outer/tip-list normalization; post logic retains article
selection, localized body flags/content, image resolution and captions. Layout retains article
placement/spacing and shared logic retains routing, locale, SEO and focus. Source comparison confirms
only the View block branch/import changed; presentation is identical apart from receiving normalized
records and tip items. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing mobile/
desktop browser tests pass with one worker and retries disabled: bilingual post-loading states and
home-to-article navigation. An initial extraction script stopped at an inner conditional and produced
incomplete JSX; formatting/type/build checks and one browser case caught it. The complete branch was
restored/extracted correctly and the entire focused validation set rerun successfully.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Studio and orchid-care block articles match source block type/order, paragraph/
heading/quote text, captions, image alt/src/sizes and tip-list order. Lazy image attributes are checked
on fresh and reloaded pages before settlePage intentionally makes images eager; no high fetch priority
is introduced. Block markup, relative bounds and capture rectangles match with generated IDs/references
and preview origins normalized consistently and attributes sorted. The initial phone studio capture
had 78 image pixels differing by tiny color values despite identical markup/bounds; three repeated
paired diagnostic captures matched exactly. The completed probe explicitly awaits image decode
before capture. All 16 block-content PNG pairs are byte-identical; actual bytes were checked and
representative captures viewed. Captures use the union of article body siblings at article height plus 1000 pixels, asserting unchanged article dimensions
before restoring size. Touch or Enter journal-back navigation, language preservation, browser back,
reload, tablet rotation, containment and studio-article page-top axe pass. Classic content remains
visible on classic articles and article content remains absent in loading/missing states. No source
styles, baselines or tolerances changed. Full browser/device, TV spatial-navigation and assistive-
technology suites were not run.
Next: extract post-page classic content into a storefront organism.

**One hundred and eighty-seventh checkpoint verified:** extracted StorefrontPostClassic under app
organisms from the post View classic branch. Explicit image/paragraphsBefore/quote/heading/
paragraphsAfter props preserve the priority soft 4/3 ArchFrame and copy wrapper with ordered keyed
paragraphs, quote and h2 without adding a wrapper. View retains classic visibility, localized copy/
image mapping and paragraph-list normalization; post logic retains article selection, classic/block
eligibility, localized copy and image resolution. Layout retains article placement/spacing and shared
logic retains routing, locale, SEO and focus. Source comparison confirms only the View classic branch/
import changed and the extracted markup is preserved through explicit props. Ownership documentation
is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing mobile/
desktop browser tests pass with one worker and retries disabled: bilingual post-loading states and
home-to-article navigation.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Autumn and care classic articles match the existing page-level bilingual
paragraphs, quote, h2 and sibling order; image src, empty alt, responsive sizes, eager loading, high
fetch priority and soft 4/3 frame are preserved. Classic markup, relative bounds and capture rectangles match with generated IDs/
references and preview origins normalized consistently and attributes sorted. All 16 classic-content
PNG pairs are byte-identical; actual bytes were checked and representative captures viewed. Captures
use the body-sibling union at article height plus 1000 pixels, asserting unchanged article dimensions
before restoring size and explicitly awaiting image decode. Touch or Enter journal-back navigation,
language preservation, browser back, reload, tablet rotation, containment and autumn-article page-top
axe pass. Classic content is absent from block articles, while block figures remain; article content
is absent in loading/missing states. No source styles, baselines or tolerances changed. Full browser/
device, TV spatial-navigation and assistive-technology suites were not run.
Next: extract post-page article actions into a storefront organism.

**One hundred and eighty-eighth checkpoint verified:** extracted StorefrontPostActions under app
organisms from the post View actions slot. Explicit copyLabel/onCopy/shopLabel/shopHref props
preserve the secondary copy button, primary shop link, small sizes and link/arrow icons as siblings
without adding a wrapper. View retains localized label/link/callback mapping; post logic retains
clipboard behavior, copied state, reset timing and unmount cleanup. Layout retains action placement,
wrapping, spacing and border; shared logic retains routing, locale and focus. Source comparison
confirms only the View actions branch/import changed and the extracted markup/callbacks are preserved
through explicit props. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing mobile/
desktop browser tests pass with one worker and retries disabled: bilingual post-loading states and
home-to-article navigation.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Classic/block article actions retain localized labels, button/link semantics,
variants/sizes, decorative icons and real localized shop hrefs. Action markup and relative bounds
match with generated IDs/references and preview origins normalized consistently and attributes sorted.
All 16 action PNG pairs are byte-identical; actual bytes were checked and representative captures
viewed. Touch, Enter and Space invoke copy; an injected clipboard stub records the current URL without
changing the user's clipboard. Copied/reset feedback and desktop button focus pass. Touch or Enter shop
navigation, language preservation, browser back, reload, tablet rotation, containment and classic-
article page-top axe pass. Actions remain absent from loading/missing states. Native clipboard
permissions/failures, full browser/device, TV spatial-navigation and assistive-technology suites were
not run. No source styles, baselines or tolerances changed.
Next: extract post-page social links into a storefront organism.

**One hundred and eighty-ninth checkpoint verified:** extracted StorefrontPostSocial under app
organisms from the post View recommendations slot. Explicit WhatsApp/Instagram labels and hrefs plus
showInstagram preserve the flex row/gap, ghost Buttons, exact brand labels and safe new-tab attributes.
View retains brand/link mapping and Instagram availability; post logic retains current-URL share
construction and shared navigation retains store Instagram data. Layout retains recommendation
placement and article visibility. Source comparison confirms only the View social row/import changed;
markup and truthiness are preserved through explicit props. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing mobile/
desktop browser tests pass with one worker and retries disabled: bilingual post-loading states and
home-to-article navigation.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Classic/block social rows retain exact brand labels, ghost-link semantics, encoded
current-URL WhatsApp payload, configured Instagram href, target=_blank and rel=noopener noreferrer.
Touch or Enter opens intercepted destination tabs with null window.opener; no external site is
contacted. A browser-context-only store override removes Instagram, and client navigation confirms
the WhatsApp-only row. Classic/block/absent-Instagram markup and relative bounds match with generated
IDs/references and plain/encoded preview origins normalized consistently and attributes sorted.
All 24 social-row PNG pairs are byte-identical; actual bytes were checked and representative captures
viewed. Reload, tablet rotation, containment and classic-article page-top axe pass; social rows remain
absent in loading/missing states. External service behavior, full browser/device, TV spatial-navigation
and assistive-technology suites were not run. No source styles, baselines or tolerances changed.
Next: extract post-page product recommendations into a storefront organism.

**One hundred and ninetieth checkpoint verified:** extracted StorefrontPostProducts under app
organisms from the post View recommendations slot. Explicit product records preserve ordered keyed
soft-frame ProductCards, name/price/stock/images/href props and the responsive two/three-column grid,
gap and top margin, including its empty wrapper. View retains list normalization; post logic retains
article product selection/order, fixed product-code names, localized price/stock/image descriptors
and product URLs. Layout retains recommendation section placement and article visibility; ProductCard
retains presentation/link/image/stock semantics. Source comparison confirms only the View product grid/
import changed and the extracted markup is preserved through explicit props. Ownership documentation
is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing mobile/
desktop browser tests pass with one worker and retries disabled: bilingual post-loading states and
home-to-article navigation.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Studio/orchid-care recommendations match source product order/codes, formatted
prices, stock-state presentation, image src/alt, soft frames and localized product/category hrefs.
Images remain lazy on fresh/reloaded pages before settlePage intentionally makes them eager, with no
high fetch priority. Grid columns, product touch/Enter navigation, language preservation, browser
back, reload, tablet rotation, containment and studio-article page-top axe pass. Grid markup and
relative bounds match with generated IDs/references and preview origins normalized consistently and
attributes sorted. All 16 populated-grid PNG pairs are byte-identical; actual bytes were checked and
representative captures viewed. Captures use grid height plus 1000 pixels, asserting unchanged grid
dimensions before restoring size and explicitly awaiting image decode. An initial desktop photo
capture differed within the middle card despite identical markup/bounds; three repeated diagnostic
pairs matched exactly with matching selected image resources. Desktop/TV captures additionally await
finite transitions after pointer movement. Empty classic grids retain
matching markup/dimensions; recommendation grids remain absent in loading/missing states. No source
styles, baselines or tolerances changed. Full browser/device, TV spatial-navigation and assistive-
technology suites were not run.
Next: extract post-page related stories into a storefront organism.

**One hundred and ninety-first checkpoint verified:** extracted StorefrontPostRelated under app
organisms from the post View related slot. Explicit title/accent/stories props preserve the localized
SectionHeader, ordered keyed soft 4/3 BlogCards, title/image/excerpt/meta/href props and responsive grid
as siblings without adding a wrapper. View retains heading mapping and list normalization; post logic
retains current-article exclusion, selection/order, localized metadata, image resolution and URLs.
Layout retains related-section placement and article visibility; SectionHeader/BlogCard retain heading,
image and link presentation. The unused View design-system import is removed. Source comparison
confirms only the related slot/imports changed and extracted markup is preserved through explicit
props. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing mobile/
desktop browser tests pass with one worker and retries disabled: bilingual post-loading states and
home-to-article navigation.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Classic/block related sections match source heading/accent, story exclusion/order,
title/excerpt/category/read-time metadata, localized article hrefs, soft 4/3 frames, image src, empty
alt and responsive sizes. Lazy attributes are checked on fresh/reloaded pages before settlePage makes
images eager; no high fetch priority is introduced. Related markup and relative bounds match with
generated IDs/references and preview origins normalized consistently and attributes sorted. All 16
related-section PNG pairs are byte-identical; actual bytes were checked and representative captures
viewed. Captures use related-section height plus 1000 pixels, asserting unchanged section dimensions
before restoring size and explicitly awaiting image decode/finite transitions after pointer movement.
Touch or Enter related-story navigation, language preservation, destination heading focus, browser
back, reload, tablet rotation, containment and classic-article page-top axe pass. Related sections
remain absent in loading/missing states. No source styles, baselines or tolerances changed. Full
browser/device, TV spatial-navigation and assistive-technology suites were not run.
Next: simplify post View composition.

**One hundred and ninety-second checkpoint verified:** simplified post View composition by passing
StorefrontPostLayout directly. Removed exactly one redundant outer fragment pair; retained the
multi-child feedback, article and recommendation fragments plus the empty sticky slot. Source
comparison ignoring formatting confirms all other tokens remain identical, including conditions,
explicit props, list/descriptor normalization, copy callbacks, Instagram availability and URLs.
State, routing and layout ownership remain unchanged; ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six existing mobile/
desktop browser tests pass with one worker and retries disabled: bilingual post-loading states and
home-to-article navigation.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Classic/block main-content markup and relative bounds match, with generated IDs/
references and plain/encoded preview origins normalized consistently and attributes sorted. The 16
main-content PNG pairs are compared exactly: 15 are byte-identical. The English 390px block article
retains 75 differing pixels, each at most one color level, with matching selected image resources.
An initial Persian phone block capture had 60,907 differing photo pixels (maximum channel delta 24);
that difference did not recur. Strict full-content visual parity remains unverified. Representative
captures were viewed. Capture height temporarily equals main height plus 1000 pixels, asserting
unchanged main dimensions before restoring size and awaiting image decode/finite transitions after
pointer movement.
Loading, missing and combined feedback markup/bounds also match with article/actions/recommendations/
related sections absent. Touch or keyboard related-story navigation, destination heading focus,
language preservation, browser back, reload, tablet rotation, containment, product navigation and
missing recovery pass. Copy feedback/current-URL payload/reset pass using an injected clipboard stub,
without changing the user's clipboard. Classic-article page-top axe passes. No source styles, baselines
or tolerances changed. Native clipboard permissions/failures, full browser/device, TV spatial-navigation
and assistive-technology suites were not run.
Next: extract not-found page messaging into a storefront organism.

**One hundred and ninety-third checkpoint verified:** extracted StorefrontNotfoundMessage under app
organisms from the not-found View message slot. Explicit eyebrow/title/accent/body props preserve the
flower EmptyState, localized 404 eyebrow, level-one heading/accent and body without adding a wrapper.
View retains localized copy mapping; shared routing/page logic retains invalid-route handling, locale,
SEO and heading focus. Layout retains centered message/actions placement and the main focus target.
Source comparison confirms only the message slot/import changed and EmptyState props/icon/heading
semantics are preserved. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six focused mobile/desktop
browser tests pass with one worker and retries disabled: bilingual not-found axe and invalid-policy
entry tests.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Direct and client-navigation invalid-policy messages match source 404/title/accent/
body copy, decorative icon, h1 hierarchy and language/direction. Message markup and relative bounds
match with generated IDs/references and preview origins normalized consistently and attributes sorted.
All 16 message PNG pairs are byte-identical; actual bytes were checked and representative captures
viewed. Touch or Enter home/search recovery, language preservation, invalid-product fallback,
recommendation product-code navigation, browser back, reload, tablet rotation, containment and
not-found page-top axe pass. Home-to-invalid-policy client navigation focuses the not-found h1.
The initial probe expected a focus reset between two routes already rendered as not-found and failed
on the baseline; the completed probe verifies entry from home instead. Its temporary test link is
removed before capture. No source styles, baselines or tolerances changed. Full-page visual, full
browser/device, TV spatial-navigation and assistive-technology suites were not run; the stage-192
full-post screenshot residual remains documented.
Next: extract not-found page recovery actions into a storefront organism.

**One hundred and ninety-fourth checkpoint verified:** extracted StorefrontNotfoundActions under app
organisms from the not-found View actions slot. Explicit homeLabel/homeHref/searchLabel/searchHref
props preserve primary/secondary Buttons, house/search icons and sibling structure without adding
a wrapper. View retains localized label/link mapping; shared routing/page logic retains destinations,
locale, navigation and focus. Layout retains action placement, centering, gap and wrapping. Source
comparison confirms only the actions slot/import changed and original link variants/icons/markup
are preserved through explicit props. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six focused mobile/desktop
browser tests pass with one worker and retries disabled: bilingual not-found axe and invalid-policy
entry tests.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Direct/invalid-policy recovery rows retain source labels, real localized home/search
hrefs, native link semantics, primary/secondary variants and decorative icons. Action markup and
relative bounds match with generated IDs/references and preview origins normalized consistently and
attributes sorted. All 16 action PNG pairs are byte-identical; actual bytes were checked and
representative captures viewed. Touch or Enter home/search recovery preserves the document and
language; home navigation focuses its h1 and search opens its field. Client entry from home into an
invalid policy focuses the not-found h1. Browser back, reload, invalid-product fallback, recommendation
product-code navigation, tablet rotation, containment and not-found page-top axe pass. Temporary
browser-only invalid-policy links are removed before capture. No source styles, baselines or tolerances
changed. Full-page visual, full browser/device, TV spatial-navigation and assistive-technology suites
were not run; the stage-192 full-post screenshot residual remains documented.
Next: extract the not-found recommendation heading into a storefront organism.

**One hundred and ninety-fifth checkpoint verified:** extracted
StorefrontNotfoundRecommendationHeading under app organisms from the not-found View recommendation
heading slot. Explicit title/accent props preserve the level-two SectionHeader, accent emphasis and
package markup without adding a wrapper. View retains localized copy mapping; layout retains section
placement, spacing and product grid. Not-found/shared logic retains product selection/descriptors,
routing, locale, SEO and focus. Source comparison confirms only the heading slot/import changed and
SectionHeader props/mapping are preserved. Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six focused mobile/desktop
browser tests pass with one worker and retries disabled: bilingual not-found axe and invalid-policy
entry tests.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Direct/invalid-policy recommendation headings retain source title/accent, h2
hierarchy/emphasis and the four-card recommendation grid. Heading markup and relative bounds match
with generated IDs/references and preview origins normalized consistently and attributes sorted.
All 16 heading PNG pairs are byte-identical; actual bytes were checked and representative captures
viewed. Touch or Enter home/search recovery preserves the document and language; home h1 focus,
search-field visibility, home-to-invalid-policy h1 focus, invalid-product fallback, recommendation
product-code navigation, browser back, reload, tablet rotation, containment and not-found page-top axe
pass. Temporary browser-only invalid-policy links are removed before capture. No source styles,
baselines or tolerances changed. Full-page visual, full browser/device, TV spatial-navigation and
assistive-technology suites were not run; the stage-192 full-post screenshot residual remains documented.
Next: extract not-found product recommendations into a storefront organism.

**One hundred and ninety-sixth checkpoint verified:** extracted StorefrontNotfoundProducts under app
organisms from the not-found View recommendations slot. Explicit products/photoLabel/saveLabel props
preserve ordered keyed soft-frame ProductCards, images/name/subtitle/price/stock/href and placeholder/
favorite-label props without adding a wrapper. View retains list normalization and label mapping;
not-found logic retains product selection/order, fixed product-code names, category/price/stock/image
descriptors and URLs. Layout retains section placement and the responsive grid; ProductCard retains
presentation/image/stock/link semantics. The unused View design-system import is removed. Source
comparison confirms only the recommendations slot/imports changed and card props/order are preserved.
Ownership documentation is updated.

`npm test`, `npm run check`, the app production build and diff checks pass. Six focused mobile/desktop
browser tests pass with one worker and retries disabled: bilingual not-found axe and invalid-policy
entry tests.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280
and TV width 1920. Direct/invalid-policy grids match all four source product codes/order, left-to-right
code direction, categories, formatted prices, stock-state presentation, image src/alt, soft frames and
localized product/category hrefs. Lazy attributes are checked on fresh/reloaded pages before settlePage
makes images eager; no high fetch priority is introduced. Grid markup and relative bounds match with
generated IDs/references and preview origins normalized consistently and attributes sorted. All 16 grid
PNG pairs are byte-identical; actual bytes were checked and representative captures viewed. Captures
use grid height plus 1000 pixels, asserting unchanged grid dimensions before restoring size and waiting
for image decode/finite transitions after pointer movement. Touch or Enter home/search/product recovery,
document/language preservation, home/invalid-policy h1 focus, search-field visibility, invalid-product
fallback, browser back, reload, tablet rotation, containment and not-found page-top axe pass. Temporary
browser-only invalid-policy links are removed before capture. No source styles, baselines or tolerances
changed. Full-page visual, full browser/device, TV spatial-navigation and assistive-technology suites
were not run; the stage-192 full-post screenshot residual remains documented.
Next: simplify not-found View composition.

**One hundred and ninety-seventh checkpoint verified:** simplified not-found View composition by
passing StorefrontNotfoundLayout directly to Shell content. Source comparison confirms that only the
redundant outer fragment and indentation changed; the explicit empty sticky slot, organism props,
list normalization and all ownership boundaries remain intact. Updated ownership documentation.

`npm test`, `npm run check`, the app production build and diff checks pass. Six focused mobile/desktop
browser tests pass with one worker and retries disabled: bilingual not-found axe and invalid-policy
entry tests. Eight paired previous/current probes cover English/Persian at touch widths 390/768,
desktop 1280 and TV width 1920. Direct and invalid-policy main markup and relative element bounds
match with generated IDs/references and preview origins normalized consistently and attributes sorted.
The completed comparisons produce 16 byte-identical main PNG pairs; representative captures viewed.
Product identity/order/descriptors, home/search/product recovery, same-document navigation, language,
home/invalid-policy h1 focus, search-field visibility, invalid-product fallback, back, reload, tablet
rotation, containment and page-top axe pass in the completed probes.

Initial probes stopped once on a loading timeout and once on desktop invalid-policy heading focus;
the desktop repeat passes without source changes. A strict screenshot attempt also differed in the
English 390 direct third-product photograph: 14,306 pixels, maximum channel delta 18; that case is
exact in the completion run. These intermittent observations remain recorded, so repeatable strict
full-content visual/focus parity is not established. No source styles, baselines or tolerances changed.
Full browser/device, TV spatial-navigation and assistive-technology suites were not run; the stage-192
full-post screenshot residual remains documented.

Next: extract error-page messaging into a storefront organism.

**One hundred and ninety-eighth checkpoint verified:** extracted StorefrontErrorMessage under app
organisms from the error View message slot. Explicit eyebrow/title/accent/body props preserve the
flower EmptyState, localized 500 code, level-one heading/accent and body without adding a wrapper.
View retains copy mapping and recovery controls; error logic retains reload and bidi-isolated phone
wording; shared logic retains routing/locale/SEO/focus and layout retains message/actions placement.
Source comparison confirms only the message slot/import changed and EmptyState composition is
preserved. Updated ownership documentation.

`npm test`, `npm run check`, the app production build and diff checks pass. Six focused mobile/desktop
browser tests pass with one worker and retries disabled: bilingual error axe and retry/home/phone
recovery tests. Eight paired previous/current probes cover English/Persian at touch widths 390/768,
desktop 1280 and TV width 1920. Direct and client-routed main markup and relative bounds match with
generated IDs/references and preview origins normalized consistently and attributes sorted. All 16
main PNG pairs are byte-identical; representative phone/tablet captures viewed. Probes verify source
copy, heading/accent/body, decorative icon, noindex, real retry document reload, home same-document
recovery, language preservation, home/error h1 focus, phone target and exact bidi-isolated wording,
back navigation, tablet rotation, containment and page-top axe. Temporary browser-only entry links
are removed before capture. No phone handler is invoked. No source styles, baselines or tolerances
changed. Standalone previews, full browser/device, TV spatial-navigation and assistive-technology
suites were not run. Earlier stage-192/197 intermittent visual/focus observations remain documented.

Next: extract error-page recovery actions into a storefront organism.

**One hundred and ninety-ninth checkpoint verified:** extracted StorefrontErrorActions under app
organisms from the error View actions slot. Explicit retryLabel/onRetry, homeLabel/homeHref and
phoneLabel/phoneHref props preserve the primary rotate retry button, secondary home link and ghost
phone link in order without adding a wrapper. View retains localized label/callback/URL mapping;
error logic retains reload and bidi-isolated phone wording; shared logic retains navigation/locale/
focus and layout retains action placement/wrapping. Removed the unused View design-system import.
Source comparison confirms only actions/imports changed and control props/order/children are preserved.
Updated ownership documentation.

`npm test`, `npm run check`, the app production build and diff checks pass. Six focused mobile/desktop
browser tests pass with one worker and retries disabled: bilingual error axe and retry/home/phone
recovery tests. Eight paired previous/current probes cover English/Persian at touch widths 390/768,
desktop 1280 and TV width 1920. Direct and client-routed main markup and relative bounds match with
generated IDs/references and preview origins normalized consistently and attributes sorted. All 16
main PNG pairs are byte-identical; representative phone/tablet captures viewed. Touch retry and
Enter/Space retry at desktop/TV widths produce real document reloads. Probes verify button/link
semantics, variants, decorative icons, source copy, noindex, home same-document recovery, language,
home/error h1 focus, native phone target and exact bidi-isolated wording, back, tablet rotation,
containment and page-top axe. Temporary browser-only entry links are removed before capture. No
phone handler is invoked. No source styles, baselines or tolerances changed. Standalone previews,
full browser/device, TV spatial-navigation and assistive-technology suites were not run. Earlier
stage-192/197 intermittent visual/focus observations remain documented.

Next: simplify error View composition.

**Two hundredth checkpoint verified:** simplified error View composition by passing
StorefrontErrorLayout directly to Shell content. Source comparison confirms only the redundant outer
fragment and indentation changed; all organism props, the explicit empty sticky slot and ownership
boundaries remain intact. Updated ownership documentation.

`npm test`, `npm run check`, the app production build and diff checks pass. Focused mobile/desktop
browser coverage includes bilingual error axe and retry/home/phone recovery. The initial run passed
five tests; Persian desktop timed out waiting for main before axe ran. Its isolated repeat passes
with retries disabled and no source changes. Eight paired probes cover English/Persian at touch
widths 390/768, desktop
1280 and TV width 1920. Direct and client-routed main markup and relative bounds match with generated
IDs/references and preview origins normalized consistently and attributes sorted. All 16 main PNG
pairs are byte-identical; representative phone/tablet captures viewed. Touch and desktop/TV-width
Enter/Space retry produce real document reloads. Probes verify native control semantics, variants,
decorative icons, source copy, noindex, home same-document recovery, locale, home/error h1 focus,
phone target/exact bidi-isolated wording, back, tablet rotation, containment and page-top axe.
Temporary browser-only entry links are removed before capture; no phone handler is invoked. No source
styles, baselines or tolerances changed. Standalone previews, full browser/device, TV spatial-navigation
and assistive-technology suites were not run. Earlier stage-192/197 intermittent visual/focus
observations remain documented.

Next: audit remaining View composition and migration boundaries.

**Two hundred and first checkpoint verified:** completed a source audit of remaining View composition
and migration boundaries, recorded in [ATOMIC-DESIGN-AUDIT.md](ATOMIC-DESIGN-AUDIT.md). All 20 Views
and a 400-file JS/JSX graph were inspected; no missing literal relative import targets or cycles were
found in that scope. All package UI folders are layered. App inventory is 21 layout folders, 143
organism folders (144 JSX files) and one molecule folder. Layouts retain placement; the seven shared
helper import edges from app UI lead to collection-carousel presentation and pure QR generation.

Remaining content candidates include shop heading, product breadcrumbs, bag headings, contact form
heading and site notices. Provider/router/announcements, reset boundaries, toast queues and offline
lifecycle retain valid page ownership. Bag delivery/checkout progress wrappers and branch fragments
need focused review with state/focus checks, rather than blanket removal. Existing tests enforce
package layer direction and delegated main landmarks, but not general app dependency/cycle rules.
The report enumerates evidence, confidence limits and follow-up order, and corrects stale flat-folder
backlog wording without declaring the migration complete.

`npm test`, `npm run check` and diff checks pass. Only four Markdown files changed; no runtime sources,
styles, baselines or tolerances changed. No new browser, visual, device, TV spatial-navigation or
assistive-technology validation was performed. Computed imports/globs, external dependencies, CSS and
type-declaration dependency graphs were outside the source-graph scan; historical observations remain
recorded in earlier checkpoints.

Next: extract the shop heading into a storefront organism.

**Two hundred and second checkpoint verified:** extracted StorefrontShopHeading under app organisms
from the shop View heading slot. Explicit eyebrow/title/accent props preserve the localized level-one
SectionHeader without adding a wrapper. View retains copy mapping; shop logic retains filters,
sorting, pagination, product selection and URLs; shared logic retains routing/locale/SEO/focus and
layout retains heading placement. Removed the unused View design-system import. Source comparison
confirms only the heading slot/imports changed; all other View content is preserved. Updated ownership
and roadmap documentation and audit progress while retaining the stage-201 inventory snapshot.

`npm test`, `npm run check`, the app production build and diff checks pass. Six focused mobile/desktop
browser tests pass with one worker and retries disabled: bilingual shop axe and occasion filtering.
Eight paired previous/current probes cover English/Persian at touch widths 390/768, desktop 1280 and
TV width 1920. Direct and client-routed heading markup/relative bounds match with generated IDs and
references normalized consistently and attributes sorted. All 16 heading PNG pairs are byte-identical;
representative phone/tablet captures viewed. Probes verify source eyebrow/title/accent, one h1,
client-navigation h1 focus and same-document/language preservation, filtered entry and reload with
occasion URL/two products, back/forward recovery, tablet rotation, containment and page-top axe.
Temporary browser-only entry links are removed before capture. No source styles, baselines or
tolerances changed. Full-page visuals, standalone previews, full browser/device, TV spatial-navigation
and assistive-technology suites were not run; earlier stage-192/197 observations remain documented.

Next: extract product breadcrumbs into a storefront organism.

**Two hundred and third checkpoint verified:** extracted StorefrontProductBreadcrumbs under app
organisms from the product View breadcrumb slot. Explicit label/items props preserve the localized
shop/category/current-product sequence and existing bottom spacing through Breadcrumb without adding
a wrapper. View retains item/label mapping; product/shared logic retains identity, category/shop URLs,
locale, navigation and focus; layout retains placement. Source comparison confirms only breadcrumb
slot/import changed; all other View content, recently viewed reset boundary and toast queue remain
intact. Updated ownership, roadmap and audit progress documentation.

`npm test`, `npm run check`, the app production build and diff checks pass. Six focused mobile/desktop
browser tests pass with one worker and retries disabled: bilingual product axe and breadcrumb
semantics. Eight paired previous/current probes cover English/Persian at touch widths 390/768,
desktop 1280 and TV width 1920. Direct first-product and client-routed second-product breadcrumbs
match markup/relative bounds with preview origins/generated IDs/references normalized consistently
and attributes sorted. All 16 breadcrumb PNG pairs are byte-identical; representative phone/tablet
captures viewed. Probes verify source category/shop labels, ordered list/items, current product code
with aria-current and no href, native shop/category URLs, decorative separators, localized touch/Enter
navigation, same-document shop recovery, shop/product h1 focus, back/reload, second-product identity,
tablet rotation, containment and page-top axe. Temporary browser-only entry links are removed before
capture. No source styles, baselines or tolerances changed. Full-page visuals, standalone previews,
full browser/device, TV spatial-navigation and assistive-technology suites were not run; earlier
stage-192/197 observations remain documented.

Next: extract controlled bag headings into a storefront organism.

**Two hundred and fourth checkpoint verified:** extracted StorefrontBagHeading under app organisms
from the bag View heading slot. Explicit showBag/showDelivery and bagTitle/bagAccent/deliveryTitle/
deliveryAccent props preserve independent conditional h1 branches, whitespace and accent classes
without adding a DOM wrapper or inferring step state. View retains the hasItems guard and visibility/
copy mapping; logic retains step/URL state, persistence, delivery validation and totals; shared logic
retains locale/focus and layout retains placement. Source comparison confirms only heading slot/import
changed, original branch markup is preserved and other View content remains intact. Updated ownership,
roadmap and audit progress documentation.

`npm test`, `npm run check`, the app production build and diff checks pass. Six focused mobile/desktop
browser tests pass with one worker and retries disabled: bilingual bag axe and bag/delivery step
navigation. Eight paired previous/current probes cover English/Persian at touch widths 390/768,
desktop 1280 and TV width 1920. Bag/delivery heading markup and relative bounds match with attributes
sorted; all 16 heading PNG pairs are byte-identical and representative phone/tablet captures viewed.
Probes verify source title/accent and one active h1, touch/Enter continuation, same-document and
language preservation, step URL changes, bag/delivery h1 focus, back/forward, delivery reload/recipient
visibility, tablet rotation, containment and delivery/bag page-top axe. Removing every line hides the
populated heading and leaves one empty-state h1; native Undo restores one bag heading and item.
A fixed morning clock keeps delivery eligibility consistent across previews. No source styles,
baselines or tolerances changed. Full-page visuals, standalone previews, full browser/device,
TV spatial-navigation and assistive-technology suites were not run; earlier stage-192/197 observations
remain documented.

Next: extract the contact form heading into a storefront organism.

**Two hundred and fifth checkpoint verified:** extracted StorefrontContactFormHeading under app
organisms from the contact View form slot. An explicit title prop preserves the h2 and its child
fragment without adding a wrapper. View maps localized copy and keeps the heading outside form/
completion branches; contact logic retains validation, drafts, submission, busy/errors and focus;
layout retains form-column placement. Source comparison confirms only form heading/import changed;
visibility branches, controls, completion, feedback and callbacks are preserved. Updated ownership,
roadmap and audit progress documentation. This stage starts from synchronized master after stage 204
and its dependencies were merged.

`npm test`, `npm run check`, the app production build and diff checks pass. Eight focused mobile/
desktop browser tests pass with one worker and retries disabled: bilingual contact axe, reply-channel/
demo completion and validation-summary focus. Eight paired previous/current probes cover English/
Persian at touch widths 390/768, desktop 1280 and TV width 1920. Form/completion/edit heading markup
and relative bounds match; all 24 heading PNG pairs are byte-identical and representative phone/tablet
captures viewed. The same h2 DOM node survives validation, completion and return-to-form. Probes
verify localized copy, one page h1, validation-summary focus, completion-region focus/name, hidden
form controls after completion, edit-to-message focus and retained name/email/message values, tablet
rotation, containment and completion/edit page-top axe. Probes assert demo mode, intercept inquiry
requests and observe zero such requests; no external message is sent. No source styles, baselines or
tolerances changed. Full-page visuals, live API submission/error flows, standalone previews, full
browser/device, TV spatial-navigation and assistive-technology suites were not run; earlier
stage-192/197 observations remain documented.

Next: extract the site checkout notice into a storefront organism.

**Two hundred and sixth checkpoint verified:** extracted StorefrontSiteCheckoutNotice under app
organisms from the site View checkout-notice block. Explicit title/actionLabel/actionHref/onDismiss
props preserve the informational Alert and secondary order link without adding a wrapper. Alert
retains polite status semantics, decorative icon and locale-derived dismissal wording. View retains
visibility and placement inside VendraProvider before PageBoundary; logic retains late-completion
ownership, newer-bag preservation, localized copy, URLs and dismissal state. Source comparison confirms
only checkout-notice block/import changed; provider, announcements, integration feedback, routing and
boundaries remain intact. Updated ownership, roadmap and audit progress documentation.

`npm test`, `npm run check`, the app production build and diff checks pass. Four focused mobile/
desktop browser tests pass with one worker and retries disabled: bilingual late checkout after newer
bag changes, using a stubbed checkout response. Eight paired previous/current probes cover English/
Persian at touch widths 390/768, desktop 1280 and TV width 1920. These rendering probes seed a local
notice for a known sample order and a newer quantity; the existing browser tests exercise the actual
late-response flow. Shown/recovered notice markup and relative bounds match with preview origins/
generated IDs/references normalized consistently and attributes sorted. All 16 notice PNG pairs are
byte-identical; representative phone/tablet captures viewed. Probes verify status/title/icon, native
localized tracking URL and secondary link, locale-derived dismissal name, touch/Enter recovery,
same-document navigation, tracking h1 focus, back recovery, tablet rotation, containment and page-top
axe. Touch/Enter dismissal and desktop/TV-width Space dismissal clear notice state; bag, customer
identity and delivery descriptors remain unchanged. No source styles, baselines or tolerances changed.
Full-page visuals, live checkout, full browser/device, TV spatial-navigation and assistive-technology
suites were not run; earlier stage-192/197 observations remain documented.

Next: extract site integration-error feedback into a storefront organism.

**Two hundred and seventh checkpoint verified:** extracted StorefrontSiteIntegrationFeedback under
app organisms from the site View integration-error block. An explicit message prop preserves the
danger Alert, interruptive role and decorative icon without a wrapper, action or dismissal control.
View retains visibility and placement inside VendraProvider before PageBoundary; logic retains
failure state, localized wording, announcements and local data. Source comparison confirms only
integration-feedback block/import changed; checkout notice, provider, announcements, routing and
boundaries remain intact. Updated ownership, roadmap and audit progress documentation.

`npm test`, `npm run check`, the app production build and diff checks pass. Eight focused mobile/
desktop browser tests pass with one worker and retries disabled: bilingual product axe and initial
saved-list loading with newer customer actions. Eight paired previous/current probes cover English/
Persian at touch widths 390/768, desktop 1280 and TV width 1920. Stubbed saved-list load rejection
shows the Alert; stubbed save rejection preserves the optimistic local saved item and localized
announcement. Product save-button focus is preserved across both failures. A locally seeded checkout
notice verifies sibling order/coexistence; clearing integration-error state hides only the error.
Bag, customer identity and delivery descriptors remain unchanged. Failed/coexisting Alert markup and
relative bounds match with preview origins/generated IDs/references normalized consistently and
attributes sorted. All 16 Alert PNG pairs are byte-identical; representative phone/tablet captures
viewed. Probes also verify localized role/title/icon, no actions, tablet rotation, containment and
page-top axe. No source styles, baselines or tolerances changed. Full-page visuals, live server
failures, full browser/device, TV spatial-navigation and assistive-technology suites were not run;
earlier stage-192/197 observations remain documented.

Next: move bag delivery-section placement into its layout.

**Two hundred and eighth checkpoint verified:** moved bag recipient/location section placement into
StorefrontBagDeliveryLayout with React-node recipient/location slots. The layout preserves the
section classes, recipient-before-location order and aria-labelledby relationship to vf-recipient-title
without another wrapper. It imports only React and owns no state, data, callbacks or effects. View
retains hasItems/onDelivery guards and every recipient/saved-address/map/zone/address descriptor and
callback; logic retains delivery behavior. Source comparison confirms wrapper/import changes only
and preserves child props/order and all other View content. Updated ownership, roadmap and audit
progress documentation, including recipient/location organism ownership notes.

`npm test`, `npm run check`, the app production build and diff checks pass. Eight focused mobile/
desktop browser tests pass with one worker and retries disabled: bilingual bag axe, bag/delivery
steps and pin validation/payment continuation. Eight paired previous/current probes cover English/
Persian at touch widths 390/768, desktop 1280 and TV width 1920. Initial/pinned recipient sections
match markup/relative bounds with preview origins/generated IDs/references normalized consistently
and attributes sorted. All 16 section PNG pairs are byte-identical; representative phone/tablet
captures viewed. Captures temporarily use section height plus 1000 pixels and assert unchanged
section dimensions before restoring the viewport. Probes verify bag-step absence, delivery heading
focus, section role/tag/heading relationship, field order, required-pin validation and map focus,
keyboard pin placement/coordinate status, error clearing, payment continuation, back/reload retained
name/phone/address values, tablet rotation, containment and page-top axe. Map tiles are stubbed.

Initial scratch probes used an overbroad section selector, then froze Date and prevented Leaflet's
pan animation from finishing on the baseline. Correcting the selector and using the advancing clock
from existing checkout tests completes these checks without application changes. No source styles,
baselines or tolerances changed. Full-page visuals, live map tiles/geolocation, map-load fallback,
saved-address selection, full browser/device, TV spatial-navigation and assistive-technology suites
were not run; earlier stage-192/197 observations remain documented.

Next: move checkout progress placement into its layout.

**Two hundred and ninth checkpoint verified:** moved the payment-only vf-checkout-steps spacing
wrapper from checkout View into StorefrontCheckoutLayout's showPayment branch. View retains the
paying guard, controlled steps/current/labels/formatters and navigation callback. Layout owns spacing
and placement; bank/success progress remains in its existing organisms. Source comparison confirms
only wrapper placement/indentation changed and all other View/layout content remains intact. Updated
layout/progress ownership, roadmap and audit progress documentation.

`npm test`, `npm run check`, the app production build and diff checks pass. Twelve focused mobile/
desktop browser tests pass with one worker and retries disabled: bilingual checkout axe and payment
draft continuity, plus English bank-return and card-confirmation flows. Eight paired previous/current
probes cover English/Persian at touch widths 390/768, desktop 1280 and TV width 1920. Initial/restored
payment progress markup and relative bounds match with preview origins/generated IDs/references
normalized consistently and attributes sorted. All 16 progress PNG pairs are byte-identical;
representative phone/tablet captures viewed. Probes verify the wrapper sits directly in main only
during payment, compact/wide ordered lists, four steps/current payment index, two permitted completed
step buttons, delivery-step navigation/focus, preserved address and receipt last4/reference after
return/reload, tablet rotation, containment and payment page-top axe. A local demo pay-on-delivery
confirmation hides the payment wrapper and retains noninteractive success Steppers at index three.
Map tiles are stubbed and an advancing morning clock keeps delivery/map timing consistent.
No source styles, baselines or tolerances changed. Full-page visuals, live payment gateways,
full browser/device, TV spatial-navigation and assistive-technology suites were not run; earlier
stage-192/197 observations remain documented.

Next: simplify shop View composition.

**Two hundred and tenth checkpoint verified:** simplified shop View composition by passing
StorefrontShopLayout directly to Shell content. Source comparison confirms only the redundant outer
fragment and indentation changed; sidebar/results multi-child groups, every controlled prop/callback
and the explicit empty sticky slot remain intact. Updated ownership, roadmap and audit progress.

`npm test`, `npm run check`, the app production build and diff checks pass. Eight focused mobile/
desktop browser tests pass with one worker and retries disabled: bilingual shop axe, occasion
filtering and clearing all filters. Eight paired previous/current probes cover English/Persian at
touch widths 390/768, desktop 1280 and TV width 1920. Direct/client-routed main markup and relative
element bounds match with preview origins (including image URLs), generated IDs/references normalized
consistently and attributes sorted. Probes verify source heading/h1, same-document client navigation,
heading focus and locale, filtered URL/reload with two products, back/forward recovery, tablet
rotation, containment and page-top axe.

The first normalized strict attempt stopped at English 768 routed photos: 90,330 pixels, maximum
channel delta 33. The full comparison completed all flows with 14/16 exact main PNG pairs; residuals
were English 768 routed photos (58,613 pixels, maximum delta 30) and English 1920 direct fourth-photo
capture (556,922 pixels, maximum delta 236, with the current capture showing a blank photo).
Original captures and pixel measurements were retained. Targeted repeats for both English widths
explicitly size the viewport to main height plus 1000 pixels, assert unchanged main dimensions,
await image decode and require matching selected resources with positive natural widths. All four
direct/routed repeat PNG pairs, markup and bounds are exact. This supports a capture-timing concern;
the initial differences remain recorded. Representative captures were viewed. Initial phone captures
include existing sticky shell chrome, and full unobscured/full-page visual acceptance is not claimed.
No source styles, baselines or tolerances changed. Full browser/device, TV spatial-navigation and
assistive-technology suites were not run; earlier stage-192/197 observations remain documented.

Next: simplify product View composition.

## Stage 211 checkpoint: product View composition

Removed four redundant fragments from the product View: Shell content, Shell sticky, related slot
and the single conditional recent organism. The details/feedback multi-child groups remain. Source
comparison after excluding fragments, the retained comment and whitespace confirms executable props,
callbacks, conditions and reset keys are unchanged. The recent-products ErrorBoundary and ToastRegion
stay in View; logic retains state, totals, history and purchase actions. Updated ownership and roadmap.

`npm test`, `npm run check`, the app production build and diff checks pass. Eight focused mobile/
desktop browser tests pass with one worker and retries disabled: recently viewed products,
product-to-shop breadcrumbs and English/Persian product axe scans. Paired previous/current probes
cover English/Persian at touch widths 390/768, desktop 1280 and TV width 1920, with direct and
client-routed product entries. Main markup (preview origins, encoded origins and generated IDs
normalized consistently), relative element bounds and all 16 main PNG pairs match. Captures await
image decoding with an enlarged viewport and unchanged main dimensions; representative captures
were viewed. Probes verify breadcrumb items/links/current code, locale/direction, same-document
navigation, heading focus, category/shop navigation, back/reload, tablet rotation, containment and
page-top axe. This is focused evidence, not full device, gallery/purchase, TV spatial-navigation or
assistive-technology acceptance; historical observations remain documented. No source styles,
baselines or tolerances changed.

Next: simplify bag View composition.

## Stage 212 checkpoint: bag View composition

Removed six redundant fragments around Shell content, the bag-items branch, summary, empty feedback
and Shell sticky grouping. The items slot and multi-child delivery branch retain their fragments.
Source comparison after excluding fragments/whitespace and the now-redundant nested sticky expression
container confirms all executable descriptors, callbacks and visibility conditions are unchanged.
Shell forwards sticky content into StorefrontBottomBar, which renders it directly without testing
node truthiness; empty-bag bottom-bar wrappers/navigation retain their ownership. Bag View/logic
retain line changes/undo, delivery inputs/validation, promo, totals and checkout actions.

`npm test`, `npm run check`, the app production build and diff checks pass. Eight focused mobile/
desktop browser tests pass with one worker and retries disabled: bag/delivery step separation,
required delivery pin/order continuity and bilingual bag axe. Paired English/Persian probes cover
touch widths 390/768, desktop 1280 and TV width 1920. Main markup/bounds match after consistent origin/generated-ID normalization and image decoding.
The initial full-main comparison has 14/16 exact bag/delivery PNG pairs. Persian 1280 bag differs
in 8,223 pixels (maximum channel delta 9, bounds 335/265 to 1063/380); delivery differs in 2,099
pixels (maximum delta 6, bounds 335/321 to 382/380), in product thumbnails. Original captures and
pixel measurements are retained. An unchanged-source targeted Persian desktop repeat has exact
bag/delivery PNGs, markup and bounds; this does not establish the cause of the initial differences
or repeatable full visual acceptance. Another
16 initial/pinned recipient/location-section PNG pairs, markup and bounds match. Probes verify
same-document step changes, heading focus, back/forward/reload, removing every item and Undo,
validation focus on the missing pin, keyboard pinning, checkout continuation, recipient/address
recovery, tablet rotation, containment and page-top axe. Map tiles are stubbed; no order is submitted
by the paired probes. Representative captures were viewed. The first scratch bag probe did not run
because its generated JavaScript marker contained a hyphen; correcting the marker allowed the probe
to execute. No product fix, screenshot tolerance or source style change was needed.

These are focused checks, not full saved-address, geolocation/map-fallback, promo/stock, TV navigation
or assistive-technology acceptance; historical observations remain documented.

Next: simplify checkout View composition.

## Stage 213 checkpoint: checkout View composition

Removed seven redundant fragments around Shell content, payment progress/heading/review/summary and
Shell sticky grouping. The multi-child payment fragment remains. Source comparison after excluding
fragments/whitespace, the nested sticky expression and optional heading parentheses confirms all
executable descriptors, callbacks and visibility conditions are unchanged. Checkout View/logic
retain payment/receipt state, retry/confirmation, persistence, gateway callbacks and order submission.
Bank/success branches and their guards remain intact; the Shell bottom-bar layout renders the sticky
node directly, so its wrappers/navigation persist when the payment action is absent.

`npm test`, `npm run check`, the app production build and diff checks pass. Fourteen focused mobile/
desktop browser tests pass with one worker and retries disabled: bilingual checkout axe and receipt
continuity after delivery edits/reload, plus demo card confirmation/account offer and online-bank
success/refusal/retry. Paired English/Persian probes cover touch widths 390/768, desktop 1280 and TV
width 1920. Initial/restored main markup and relative bounds match with preview origins, encoded
origins and generated IDs normalized consistently. Captures await image decoding and retain main
dimensions while sizing the viewport for the capture. The initial full-main comparison has 9/16 exact PNG pairs. Residuals are English 390 initial
(1,849 pixels, maximum channel delta 6) and restored (1,974 pixels, maximum 6), Persian 390 restored
(63 pixels, maximum 1), English 768 initial/restored (3,948 pixels each, maximum 6), and Persian 1280
initial/restored (3,948 pixels each, maximum 6). Differences are in product thumbnails and a few
phone stepper pixels; original captures and pixel bounds are retained. Unchanged-source targeted repeats of all four affected language/width cases have exact markup,
bounds and all eight initial/restored PNG pairs. This does not establish the initial differences'
cause or repeatable full visual acceptance.

Probes verify delivery-to-payment, permitted step controls, receipt/reference recovery through
editing and reload, localized progress, heading focus, tablet rotation, containment, page-top axe
and local demo pay-on-delivery confirmation with noninteractive completed progress. They explicitly
require VF_API.live=false before demo submission; map tiles are stubbed. Representative phone and
tablet captures were viewed. The initial scratch source verifier did not account for Prettier
removing optional heading parentheses and stopped before creating its browser probe; allowing those
parentheses made source parity pass and enabled the comparison. No app fix, source style, screenshot
tolerance or baseline changed.

These are focused checks, not full wallet/WhatsApp, duplicate-order, TV navigation or assistive-
technology acceptance; historical observations remain documented.

Next: simplify site View composition.

## Stage 214 checkpoint: site View composition

Removed twenty redundant fragments: nineteen single-page route branches and the live-announcement
text. The provider, LiveRegion, PageBoundary and Suspense remain mounted at the coordinator level.
All lazy page declarations, route guards, routeInfo/store/locale/navigation props, customer keys and
feedback placement remain unchanged. Source comparison excluding only fragments and whitespace
confirms parity. Site View/logic retain routing, loading/error recovery, announcements, customer
identity and shared customer state; page content remains delegated to page Views and organisms.

`npm test`, `npm run check`, the app production build and diff checks pass. Paired probes compare
English/Persian at touch widths 390/768, desktop 1280 and TV width 1920. All 48 PNG pairs and their
normalized markup/relative bounds match: sixteen full-main FAQ/policy route captures, sixteen
checkout-notice shown/recovered captures and sixteen integration-error failed/coexisting captures.
The route probe verifies initial focus, touch/keyboard client navigation, routed heading focus,
live-announcement updates, history, reload, shared-data preservation, tablet rotation, containment
and page-top axe. Notice probes also verify dismissal and recovery without losing newer bag data;
integration probes verify local saved state survives stubbed API failure. Representative phone and
Persian tablet captures were viewed. Map tiles and integration failures are stubbed; no external
order, payment or message is sent.

The initial full-main FAQ/contact comparison completed both phone languages with four exact PNG
pairs, then stopped on English 768 contact markup: an extra empty Leaflet zoom tile container was
present on only the baseline side. A scratch wait requiring every document tile container to have
children timed out on its first case; it did not establish stabilization. Initial captures/logs are
retained, and the contact-map comparison remains unresolved. The completed FAQ/policy comparison
is a separate route-composition check, not a resolution of the map observation. No app source style,
screenshot tolerance or baseline changed. These checks do not establish full map, TV navigation,
physical-device or assistive-technology acceptance; prior stage residuals remain documented.

The browser sweep selected 96 tests, using one worker and no retries: 92 passed, one mobile
invocation of a desktop-only focus test was skipped, and English mobile shop/checkout/account each
timed out waiting five seconds for the initial main landmark (before axe). All three passed on a
separate unchanged-source repeat after the paired probes ended. This yields 95 distinct passing
checks across the initial run and repeat, including every route's bilingual mobile/desktop axe,
customer isolation, delayed checkout/saved-state ownership, failed lazy-load recovery, background
preload failure, keeping the current page during loading and desktop initial/routed focus. The
initial loading failures remain observations; their cause and repeatability are not established.

Next: add app dependency/cycle checks with explicit allowances for valid UI helpers, including
negative cases for business-service imports, missing relative targets and cycles.

## Stage 215 checkpoint: app dependency and cycle enforcement

Added `templates/_build/app-dependencies.cjs` and its filesystem-based regression suite, wired into
`npm test` immediately after the package Atomic Design tests. The checker parses runtime JS/JSX
under components, app, shared helpers and storefront page folders (excluding fixtures/specs), then
follows literal relative JS/JSX dependencies, including referenced generated data. The current graph
contains 408 modules, with no missing targets, import cycles or boundary violations.

App layouts may import React and other layouts, retaining React-node slot composition. App molecules
may import React, the DS bridge, other molecules and the two reviewed UI helpers; app organisms may
also import other organisms. Molecules/organisms cannot import layouts; all app UI rejects page
coordinators, shared business modules and undeclared external packages. The DS bridge may target only classified
package sources. The collection-carousel helper may import React and the package Carousel; the QR
helper may import qrcode-generator. These helper dependencies are checked themselves, preventing
service imports from being hidden behind the allowances. Existing package layer rules also run on
relative edges in the graph. Computed imports fail in protected UI/bridge/helper sources.

Static imports, named/star re-exports and nested literal dynamic imports contribute graph edges.
Relative targets must be files, with exact, .js/.jsx and index.js/index.jsx resolution. Parse errors,
missing targets and cycles fail with source paths; cycle diagnostics include the dependency chain.
Thirty disposable-graph scenarios cover valid helpers/layers/resolution, direct/re-export/dynamic
service imports, helper/bridge/package bypasses, upward UI dependencies, external/absolute/bare
specifier bypasses, computed UI imports, missing modules, directory targets, generated/transitive
modules, malformed syntax, self/multi-module/UI cycles and an acyclic diamond. The first repository
run identified a referenced generated tenant-slugs module outside the seed folders; following
relative runtime dependencies now checks it too, with a regression for generated-module cycles.

`npm test`, `npm run check`, the app production build and diff checks pass. The full test command
executes the new checker alongside types, package layers, logic, exports/server rendering, bundle
budgets and existing contracts. Runtime code, styles, exports, dependencies and lockfiles are unchanged. This stage adds no browser or device acceptance evidence;
stage-214 loading/contact-map observations and historical visual/device residuals remain open.

The graph does not expand import.meta.glob, computed imports outside protected sources, CommonJS
require, aliases/absolute/external module bodies, CSS dependencies or type declarations. It checks
module dependencies, not runtime globals, state ownership or component props. The valid router glob
remains in the site coordinator, outside the protected app UI folders.

Next: audit final package export/type/tree-shaking contracts; device and assistive-technology
acceptance gaps remain a separate completion requirement.

## Stage 216 checkpoint: package contract audit

[PACKAGE-CONTRACT-AUDIT.md](PACKAGE-CONTRACT-AUDIT.md) records an enumerated checklist, evidence,
confidence limits and follow-up order. An actual 255-file npm tarball has the checked dist bytes;
a disposable packed consumer imports 93 root values, server-renders 72 components and compiles
strict public root/ESM-theme/CommonJS-theme consumers. Sixteen concrete public asset paths resolve,
and representative private paths are rejected. No-alias bundles cover all root values: full package
40,515 gzip bytes (40,960 budget), largest LocationPicker 12,566, all seven small components below
1,024, and an unused root import retains no package modules. Normal tests, checks and app build pass.

A confirmed theme contract asymmetry remains: CommonJS exposes RAMPS and shade, while ESM and both
declaration forms omit them. The thirteen declared theme values remain available through both
runtime forms. Removing existing CommonJS members could break external consumers; the internal
theme builder also consumes RAMPS. Automated tests additionally bypass actual packing, complete
public wildcard resolution and no-alias/lowercase-export bundle consumers. One-time packed checks
pass but do not close those persistent CI coverage gaps.

No runtime/package/declaration/generated outputs change in this stage. No new browser/device,
React-19/minimum-peer, registry-install or assistive-technology acceptance is claimed. Prior loading,
contact-map and historical visual/device residuals remain documented; migration completion is open.

Next: align theme export/type contracts while preserving existing CommonJS exports and internal
consumers, with explicit parity/type regression coverage. Then automate the packed-consumer checks.

## Stage 217 checkpoint: theme export/type parity

The generated ESM theme entry now also exports RAMPS and shade, matching all fifteen existing
CommonJS values. Both declaration forms add ShadeStep, ThemeRamp, RAMPS and shade, from the shared
source declaration. ShadeStep describes optional numeric lightness/shift/chroma/maxChroma controls;
ThemeRamp describes CSS custom-property base/step names for the four brand ramps. Absolute
lightness takes precedence over shift, as the existing implementation already does. The public
package README lists the additive exports. No CommonJS member is removed or color math changed.

Package tests compare complete ESM/CommonJS key sets and value identities, verify every exposed
ramp step against the default palette, and check zero/full lightness with zero chroma. Strict
public-package .mts/.cts fixtures compile positive uses and expected errors for invalid controls,
base tokens, ramp names and step keys. These run with the normal package test and are also exercised
when that test runs in the existing React-19 job. The new parity assertion failed against the
stage-216 output on RAMPS/shade, then passed after regeneration with the additive fix.

`npm test`, `npm run check`, the app production build and diff checks pass. An actual npm tarball
smoke verifies fifteen identical ESM/CommonJS values, strict positive/negative public import/require
types and byte-identical CommonJS output versus stage 216. The normal package test still covers all
72 server-rendered components and existing wording/theme/asset behavior. Root bundle budgets remain
unchanged (39.6 KB overall, largest LocationPicker 12.3 KB). The internal theme implementation,
CommonJS dist module, tenant CSS/token data, component root exports and app UI are unchanged.
No new React-19 installation, browser/device or assistive-technology acceptance is claimed.
The stage-216 audit remains a historical snapshot; its packed-consumer CI gaps and earlier
loading/contact-map/visual/device observations remain open.

Next: automate actual packed-consumer asset/type and no-alias tree-shaking regression checks,
including lowercase root exports, while retaining current package budgets.

## Stage 218 checkpoint: automated packed-consumer contracts

Package and size tests now use a shared disposable consumer extracted from an actual npm tarball,
created offline with lifecycle scripts disabled and a temporary npm cache. The helper checks that
all dist files are included, all payload bytes match the checkout and no source/tooling leaks into
the payload (apart from npm's package/README/license metadata). Consumers have their own package
scope and use installed workspace peers; both consumer and tar/cache directories are removed on
success or failure. The React-19 job's peer-app override remains supported.

The package test verifies root/theme ESM resolution points into the extracted package, resolves
all concrete public string/wildcard asset paths, rejects representative private subpaths, imports
and server-renders the package, and compiles every runtime root value plus a representative Persian
JSX consumer through public exports. Expected errors protect invalid variants and private layer
imports. Stage-217 strict import/require theme fixtures remain in the same compiler run. The size
test drops its dist alias, bundles all root exports including lowercase namespaces through the
packed exports map, checks module provenance, retains the existing budgets and requires an unused
root import to retain no package modules.

The first no-alias size run detected workspace self-resolution from a consumer without its own
package manifest. Giving the consumer a distinct package scope corrected the harness; explicit
root/theme resolution and bundled-module provenance assertions now guard against that fallback.
No product fix or budget increase was used to make the checks pass.

`npm test`, `npm run check`, the app production build and diff checks pass. The full test command
reports 72 server-rendered components, 93 typed root values and 16 public asset paths. All 93 root
exports bundle without aliases, the full package stays at 39.6 KB gzip under 40 KB, LocationPicker
remains largest at 12.3 KB under 15 KB, the seven small-component budgets pass and unused root imports
retain no package modules. The runtime graph and thirty dependency guard scenarios also pass.
Runtime/package/generated sources,
public exports, dependencies and lockfiles are unchanged. This is an offline packed-consumer test,
not a fresh registry/peer installation. No new React-19/minimum-peer, browser/device, TV navigation
or assistive-technology execution is claimed. Stage-216 findings 1/2 are addressed by stages 217/218
within their documented scopes; finding 3 and prior loading/contact-map/visual observations remain.

Next: audit remaining device, visual and accessibility acceptance evidence, distinguishing existing
checks, reproducible gaps and hardware/assistive-technology checks that still need execution.

## Stage 219 checkpoint: device, visual and accessibility evidence audit

[ACCEPTANCE-EVIDENCE.md](ACCEPTANCE-EVIDENCE.md) records an enumerated capability checklist, current
coverage, fresh production device checks, focused screenshot/axe results, historical observations
and follow-up order. The inventory has 1,569 registered tests; it is not a full-suite pass. Route
screenshots/axe use desktop Chromium at phone/desktop widths; dedicated touch/tablet/TV projects
exercise selected interactions. Content axe temporarily unsticks the bottom bar, so real sticky
reachability needs separate evidence. No physical-device or screen-reader acceptance is inferred.

The production touch-phone/tablet/TV device and remote suite passes 33 checks with eight planned
skips. Focused post/not-found screenshots and post/not-found/contact/error axe yield 22 passes and
two Persian-post screenshot failures: all sixteen axe cases and six screenshots pass. Both widths
show 1,303 differing comparator pixels in metadata text regions; separate unchanged-source repeats
fail identically, with matching initial/repeat actual RGBA buffers. Expected/actual dimensions match.
Root cause remains unestablished. Existing screenshot limits (threshold 0, 25 pixels), baselines and
source styles are retained. npm run check and the production runner's app build pass.

The audit makes no runtime, style, baseline,
screenshot-policy or test-config change. Historical post/shop/bag/checkout visual, loading/focus,
contact-map and shared clear-control observations remain documented with their confidence limits.

Next: diagnose the reproduced Persian post metadata visual mismatch before changing any
baseline or tolerance; then extend dedicated touch/tablet route and normal-sticky acceptance checks.

## Stage 220 checkpoint: Persian post metadata baseline correction

The stage-219 mismatch is a stale Darwin expectation, not a new rendering change. Darwin post
baselines last changed in bd7f880 at 2026-10-19 14:33 +03:30. Commit 646e5ab at 15:46 deliberately
changed Persian metadata from a raised dot to the Persian comma, because the dot beside Persian
digits can read as zero. The Linux baselines were updated afterward in de9203f and already show
commas. Source history and reviewed expected/actual crops establish the intended copy; the shared
formatter and post logic remain intact.

Only page-post-fa-mobile-darwin.png and page-post-fa-desktop-darwin.png are regenerated. Their RGBA
buffers exactly match the stable stage-219 actual captures. In disposable browser pages, replacing
only the four metadata commas with the former separators clears all 2,332 originally differing raw
pixels at each width. Whole diagnostic captures also differed in photographs; the experiment
supports the metadata cause without establishing new full-content image determinism. The initial
scratch attempt hit Node's default binary child-output buffer limit; increasing the scratch buffer
completed the comparison. No app change or screenshot-tolerance adjustment was needed.

A new browser regression checks exact English/Persian article and related-card metadata for both
classic autumn and block studio articles. Its eight mobile/desktop cases pass initially. The final
one-worker, no-retry run with updates disabled passes all 32 checks: eight post/not-found screenshots,
eight exact metadata cases and sixteen post/not-found/contact/error axe cases across both languages
and widths. Full npm tests,
formatting/CSS/generated-output checks and app production build pass. Linux/English baselines,
runtime sources, styles, generated output and dependencies are unchanged.

The stage-219 audit remains a historical snapshot with follow-up resolution recorded separately.
Older image/map/loading/focus observations and hardware/screen-reader acceptance remain open.

Next: add dedicated touch-phone/tablet route acceptance checks, including real sticky control
reachability for product/bag/checkout/contact before claiming complete device acceptance.

## Stage 221 checkpoint: dedicated touch core-route acceptance

Added device-routes.spec.mjs to the dedicated touch-phone/tablet projects, preserving existing
device/TV discovery. Sixteen bilingual cases cover product, bag/delivery validation, checkout and
contact. They require a touch-capable context and use taps for actions/fields/map pinning. Controls
are scrolled into view, then their entire box must fit the viewport without intersecting the shell,
and their center must hit the control/descendant. Taps use normal actionability, without force or
JavaScript clicks. Validation summaries and linked fields must already be focused and unobscured
before any corrective test scroll. Tablet interactions start at 1180×820, then key controls are
rechecked at 768×1024. Touch phone uses 390×844.

Flows verify add-to-bag dialog entry, bag→delivery heading focus and required-field recovery,
recipient/sender/map entry, checkout receipt/reference persistence through reload, reachable order
actions without submission, and contact invalid-email/message focus. Product inquiry and contact
map zoom targets receive explicit reachability checks. Map tiles are stubbed; invalid contact
submissions stop at validation and no checkout order/payment is submitted.

Content axe retains its established bottom-bar adjustment at the initial device viewport. A new
opt-in restoreBottomBar flag removes that temporary style in finally, preserving legacy defaults;
the new tests assert the original sticky positions before and after the scan and recheck controls.
Portrait tablet coverage here is geometry/reachability, not a second axe scan. No rule is excluded.
Exploratory scans with live bars at arbitrary scroll positions reported partially clipped targets
on contact/product and other boundary controls. Diagnostics show the map zoom target is 30×30 but
only 13.8px is unobscured at page top; scrolling it into view clears the finding. The inquiry link
also passes the target-size spacing alternative when fully in view. This is why content scans and
normal-sticky interaction geometry are explicit separate checks, rather than changing UI sizing
to satisfy a static clipped viewport.

The final sixteen new cases pass in both dev and production, with one worker and no retries.
Sixteen existing bilingual mobile/desktop core-route axe checks also pass, confirming the legacy
helper default. Full npm tests, npm run check, production build and diff checks pass. New cases use
reduced motion, essential-consent storage and a fixed morning clock. Runtime UI,
styles, baselines, generated output, package dependencies and lockfiles remain unchanged. This
covers selected core states with Chromium touch emulation; soft-keyboard occlusion, complete route/
state coverage, physical devices, TV and screen-reader acceptance are not established by this stage.
Older image/map/loading observations remain documented.

Next: extend dedicated touch/tablet coverage to browsing and recovery routes, retaining the
separation between content axe, real sticky reachability and physical-device acceptance.

## Stage 222 checkpoint: dedicated touch browsing and recovery

Added device-browsing.spec.mjs to the touch-phone/tablet projects. Sixteen English/Persian cases
cover filtered shop→search→product→back/reload→shop recovery, saved removal/undo including the empty
state and reload, missing-page→home navigation, and error retry→home navigation. Search asserts query
URL encoding, typing without history churn, touch clear with input focus, no-result persistence and
exact restoration of the originating filters/sort. Saved checks that undo restores only the latest
removal, moves focus to the correct control and persists the restored list. Recovery links assert
client-navigation heading focus; error retry asserts reload, retained locale/route, noindex and a
reachable telephone fallback without opening it. No external message, order or payment is triggered.

Extracted the unchanged stage-221 geometry/tap/content-scan helpers to device-helpers.mjs so both
suites use the same policy. Controls clear the normal sticky shell and receive center hit tests;
saved automatic focus is checked before corrective scrolling. Content axe temporarily adjusts the
bottom bar, restores it and rechecks sticky controls. Phone uses 390×844; tablet interactions/content
scans use 1180×820, with key-control reachability also checked at 768×1024. That portrait check is
geometry evidence, not a second axe scan. New tests use reduced motion, essential consent and an
advancing morning clock. Runtime UI/styles, generated files and screenshot baselines are unchanged.

Validation: the combined core/browsing suites pass all 32 cases in dev and production with one
worker and no retries. Full npm tests, formatting/type/build checks and production build pass.
This is selected Chromium touch-emulation coverage. Physical devices, soft keyboards, assistive
technology, complete route/state acceptance and older visual/map/loading observations remain open.

Next: extend dedicated touch/tablet acceptance to customer sign-in, account and order tracking,
using local demo state and preserving the same explicit device/geometry evidence boundaries.

## Stage 223 checkpoint: dedicated touch customer-route acceptance

Added device-customer.spec.mjs to touch-phone/tablet discovery. Twelve bilingual cases cover
sign-in, account profile and order tracking using local demo identity/orders. Sign-in checks empty
phone and incomplete-code errors, focus/reachability before corrective scrolling, change-number
retention with code reset, demo-code completion and account navigation with heading focus. Profile
checks invalid-email recovery, summary-link touch navigation, saved name/email persistence across
reload, sign-out, guarded history return and signed-out reload. Order lookup checks required-field
focus, mismatched-phone failure focus, retained order input, normalized international phone retry,
resolved order/heading focus, reload and return to lookup.

The shared stage-221/222 helper policy remains unchanged: real touch taps, full control geometry
and center hit testing with normal sticky bars, content axe with temporary bottom-bar adjustment
and restoration, and tablet portrait control reachability. Phone uses 390×844; tablet starts at
1180×820 and rechecks selected controls at 768×1024. Content scans cover incomplete sign-in code,
saved profile and resolved tracking at the initial viewport; portrait remains geometry evidence.
The initial exploratory run passed eight cases and failed four profile cases because the new test
incorrectly expected summary focus. Existing single-error profile policy focuses the email input;
the assertion now verifies that contract plus unobscured automatic focus before scrolling. No
runtime change was needed.

All twelve final cases pass in dev and production with one worker and no retries. Full npm tests,
formatting/generated-output/CSS checks and production build pass. Runtime UI, shared helpers,
styles, dependencies and screenshot baselines are unchanged. The demo accepts five digits locally;
these checks establish neither real SMS/WebOTP nor backend authentication/authorization. Account
editors, wallet, complete order states, physical-device/soft-keyboard/assistive-technology acceptance
and older visual/map/loading observations remain outside this stage.

Next: extend dedicated touch/tablet acceptance to editorial and help routes (journal/post, FAQ and
policy), preserving explicit content-scan, sticky reachability and physical-device evidence limits.

## Stage 224 checkpoint: touch editorial/help routes and phone policy anchors

Added device-editorial.spec.mjs to touch-phone/tablet discovery. Sixteen bilingual cases cover
journal pagination/reload/search reset, touch clear, empty-category recovery, article entry/reload/
return, FAQ disclosure open/close in each group with contact navigation, and policy switching,
contents anchors and reload. The unchanged shared device helpers check sticky-shell geometry,
center hit testing, content axe with bottom-bar restoration, and tablet portrait reachability.
Phone uses 390×844; tablet uses 1180×820 for interactions/content scans and 768×1024 for selected
control geometry. No WhatsApp action is activated. Selected articles use the journal featured story;
this does not cover every classic/block article, filter or FAQ answer.

Initial execution passed fourteen cases and failed the two phone policy cases: the contents link
updated the fragment, but its heading was obscured. After awaiting route-heading focus, a diagnostic
found the target heading at y=165px while elementFromPoint hit the sticky contents link above it.
The existing phone .vf-info-toc static rule lost to the shared .vf-sticky-panel[data-vf-fits] rule.
Strengthened only the compact-layout selector in information-pages.css so the contents panel stays
in document flow below 768px. Tablet/desktop side-by-side contents remain sticky when they fit.
Regression checks assert static phone/sticky landscape-tablet contents and require the destination
heading to be unobscured immediately after the anchor tap, without corrective test scrolling.

All sixteen final cases pass in dev and production with one worker and no retries. Four
policy screenshots and four policy axe checks pass at mobile/desktop sizes with baseline updates
disabled after two reviewed Darwin phone images are refreshed. Their original failures were 54
English/71 Persian comparator pixels; reapplying the old sticky positioning in disposable pages
reproduces both original baselines exactly. The fixed rendering changes small antialiasing details,
not content or layout dimensions. Desktop/Linux baselines are untouched; Linux was not run locally.
Full npm tests, generated-output/formatting/CSS checks and production build pass.
The CSS build regenerates custom.css; shared helpers and dependencies are unchanged. Physical
devices, soft keyboards, assistive technology, complete route/state acceptance and historical
visual/map/loading observations remain outside this stage.

Next: dedicated touch/tablet acceptance for weddings and presentation inquiry/shortlist flows,
without activating external inquiry or order actions; retain the documented evidence limits.

## Stage 225 checkpoint: touch weddings/presentation and native catalog names

Added device-specialist.spec.mjs to touch-phone/tablet discovery. Eight bilingual cases cover
wedding required-field summary/link focus, draft-preserving inquiry-anchor navigation and field
reachability without valid inquiry submission; and presentation seller-tools entry/close/focus
return, catalog entry/search focus, two-item shortlist comparison, removal, clear/undo and return
focus. Shortlists remain local customer-session state; no send/order handoff is activated.

The presentation is intentionally bare: its own sticky toolbar, one main, locale/direction and
horizontal overflow are checked instead of requiring storefront header/bottom bars. Existing
whole-control geometry and center hit tests are reused. Content axe scans the completed wedding
draft and restored presentation catalog at the initial viewport; controls are rechecked in tablet
portrait. Phone is 390×844, tablet starts at 1180×820 and rechecks at 768×1024. Physical touch,
soft keyboards, TV and assistive-technology acceptance are not established.

The initial exploratory run passed the four wedding cases but reported catalog label/name
mismatches in all four presentation cases. Tile aria-label strings duplicated caption state and
interrupted/reordered the visible code, price and Ready/Sold out words; flex spacing also lacked
text separators. Buttons now take their native name from the visible caption. The redundant photo
has empty alt text within that captioned control, and the full-screen action is exposed separately
through aria-description. Explicit text separators preserve word boundaries without changing flex
layout. State/selection ownership stays in logic, with openDescription passed to the catalog.
New cases compare every tile name to its visible text (case-insensitive for CSS-uppercase badges),
and existing name-based interaction checks are updated for the native names. No axe rule is excluded.

All eight final touch cases pass in dev and production with one worker and no retries. Ten existing
mobile/desktop presentation checks pass: sharing options, Ready/price naming, sold-out behavior,
stock refresh and quiet viewer behavior. Full npm tests, generated-output/formatting/CSS checks and
production build pass. Styles, generated files, package contracts, dependencies and screenshot
baselines are unchanged. Wedding valid submission/calendar/select coverage, presentation sharing/
order handoff, reload persistence, full device/state coverage and older observations are not closed.

Next: dedicated touch/tablet home/shop discovery and catalog filter/sort acceptance, preserving
explicit limits around physical-device, keyboard and assistive-technology evidence.

## Stage 226 checkpoint: dedicated touch home/shop catalog acceptance

Added device-catalog.spec.mjs to touch-phone/tablet discovery. Twelve bilingual cases cover home
category→shop→product→Back navigation, low/high price sorting, load-more with new-product focus,
reload persistence and first-page reset on sorting, and stock/quick-filter application/recovery.
The home path checks category/product identity and client-navigation heading focus. Sorting checks
actual displayed numeric prices in each locale and reload-preserved product order. Filters use the
phone dialog and landscape-tablet sidebar, check the five-design stock count, restore it on reload,
clear back to the focused result count, and toggle the two-design under-3M quick filter without
adding history entries. Phone dialog close restores focus to its opener; automatic focus targets
must be unobscured before any corrective test scrolling.

The unchanged shared helpers retain normal sticky-shell geometry, whole-control bounds/center
hit testing and touch taps. Content axe scans the home page and final shop states with the existing
temporary bottom-bar adjustment and restoration. Phone uses 390×844; tablet starts at 1180×820 and
rechecks selected controls at 768×1024. The sorting locator follows the visible desktop/compact
control across that resize. Portrait evidence is control geometry, not a second content scan.
An exploratory filter failure was an incorrectly scoped test has-locator, corrected without a UI
change. All twelve final cases pass in dev and production with one worker and no retries; full
npm tests, generated-output/formatting/CSS checks and production build pass. Runtime UI, shared
helpers, styles, dependencies, generated files and screenshot baselines are unchanged.

Together with stages 221–225, every registered route now has selected dedicated bilingual touch
coverage. This does not establish complete route/state/device acceptance: price-range gestures,
all category/filter combinations, physical devices, soft keyboards, assistive technology and
historical visual/map/loading observations remain open.

Next: refresh the acceptance coverage inventory and remaining-gap checklist across stages 221–226,
separating selected route coverage from complete flow, visual and physical-device acceptance.

## Stage 227 checkpoint: refreshed acceptance coverage inventory

Added [ACCEPTANCE-COVERAGE.md](ACCEPTANCE-COVERAGE.md), a current inventory and 19-route flow matrix
against stage-226 commit 15eb969. The frozen stage-219 audit and staged results remain intact and
link to this refresh. Discovery registers 1,737 invocations in 120 files: mobile/desktop 681 each,
touch-phone/tablet 49 each, TV 23, components 254. The six route suites contain 20 scenarios × two
languages × two dedicated touch projects = 80 executable cases. Their mobile/desktop registrations
skip by design; registration is not an executed pass count. Original device and hydration skips
remain explicit.

The matrix separates selected route/state assertions, content axe scans, sticky-control
geometry and tablet portrait rechecks. It records the bare presentation toolbar, programmatic
scrolling/text fill, essential consent, demo API/identity, stubbed maps and external-action limits.
All registered routes have selected coverage; this is not every initial route's axe result or
complete route/state/device acceptance. Visual inventory remains 152 page PNGs and 258 total PNGs;
no fresh full visual, hydration, original device/TV/offline or physical-device/AT result is inferred.
Historical image/map/loading/keyboard observations remain open rather than becoming current defects
or being declared resolved by later repeats.

Fresh combined production execution passes all 80 cases (40 per touch project), with two workers,
no skips, failures or retries; production build and npm run check pass. Combined dev/per-stage unit
results are prior evidence, not freshly rerun here. Only documentation changes; runtime, tests,
configuration, styles, generated files, dependencies and baselines remain unchanged.

Next: reproduce and scope the historical contact-map lifecycle/markup observation with focused
instrumentation before changing rendering, waits or baselines; retain the remaining visual,
hydration, platform and assistive-technology acceptance gates.

## Stage 228 checkpoint: contact-map lifecycle diagnosis

Added [CONTACT-MAP-EVIDENCE.md](CONTACT-MAP-EVIDENCE.md) and a focused lifecycle regression. Original
stage-214 routed PNG pairs at EN390/FA390/EN768 decode exactly equal (zero pixel/channel differences),
including the EN768 pair that failed strict markup equality. Current bilingual direct/routed traces
at 768×1000 reproduce the same childless zoom-13 level/scale(4) transform beside loaded zoom-15 tiles.
Vendored Leaflet prunes tiles separately from empty levels; those levels can persist until a later
level update. Requiring every tile container to have children is therefore not a readiness contract.
No PlacesMap/maps/loader source changed across the original stage-214 refactor. The exact scheduling
that made only one old side retain the level is not reconstructed; the sampled observation is scoped
as internal DOM variation with identical retained pixels, not a proven visual/component defect.

Four new dedicated phone/tablet bilingual cases check one live map/marker/control/tooltip, active
current-level tile readiness, completed zoom animation, centered marker, viewport enlargement and
rotation, zoom in/out, repeated client navigation/unload/remount, history and reload. Public Leaflet
hooks observe lifetime; tests do not constrain outgoing empty levels. Initial test-only zoom/focus
races are synchronized to observable animation and heading/paint completion without fixed sleeps.
All four final cases pass in dev/production with one worker and no retries; full npm tests, checks
and production build pass. No runtime/component/vendor/style/generated/dependency/baseline changes.

Discovery now registers 1,745 invocations in 121 files (mobile/desktop 683 each, phone/tablet 51 each,
TV 23, components 254). Stage-227 counts/results are explicitly preserved as a snapshot; this stage
adds four dedicated cases rather than claiming a freshly executed combined 84-case sweep. Real tile
network/error behavior, heap/observer leakage, every map state, full visual repeatability and
hardware/keyboard/AT acceptance remain unverified by these tests.

Next: diagnose historical shop photo/decode capture variation with targeted image instrumentation
and unchanged visual policy; retain the other acceptance gates and their evidence boundaries.

## Stage 229 checkpoint: shop image capture diagnosis

[SHOP-IMAGE-EVIDENCE.md](SHOP-IMAGE-EVIDENCE.md) records fresh RGBA verification of retained
stage-210 residuals and four exact historical decoded repeats. The wide original visibly contains
a blank fourth photo. Original failing captures lack selected-resource/decode/paint state, and the
repeat changed viewport preparation and decoding together, so the precise cause remains unproven.
No runtime correction or screenshot-policy/baseline change is justified by this evidence.

Four permanent English/Persian × 768/1920 capture diagnostics pass in dev and production, one worker
and no retries, covering direct entry, reload and real same-document home-to-shop navigation.
They attach ordinary-settled/explicitly-decoded image state plus consecutive exact main PNGs,
check positive natural/rendered dimensions, no placeholder, full opacity and unchanged main size,
and restore the viewport. These historical configurations run in desktop with touch at 768 and
TV mode at 1920; they are not a dedicated device acceptance sweep. Full npm test/check/build pass.
An exploratory hidden-header locator timeout was corrected to the visible studio shop action.

Discovery is 1,753 invocations/122 files (mobile/desktop 687 each, phone/tablet 51 each, TV 23,
components 254), including four new intentional mobile skips and four desktop executions. Earlier
route/map suites were not rerun. Historical residuals and broader visual/platform gates remain open.
Next: scope historical bag/checkout thumbnail capture differences with retained evidence and
unchanged visual policy.

## Stage 230 checkpoint: bag/checkout thumbnail capture diagnosis

[ORDER-THUMBNAIL-EVIDENCE.md](ORDER-THUMBNAIL-EVIDENCE.md) confirms the retained stage-212/213
pixel counts and ten exact historical targeted-repeat pairs. EN390 restored payment separates
125 progress-indicator pixels/max 1 from 1,849 thumbnail pixels/max 6; FA390 restored varies only in
63 progress-indicator pixels/max 1. Original captures already awaited decode, so a missing decode wait
is not an explanation. The specific original raster/resource state remains unproven.

Four new affected-combination cases (EN390, FA390, EN768, FA1280) check exact thumbnail captures
through bag, delivery, initial/restored payment and reload, with persisted address/receipt, real
step controls and same-document/focus checks. Shared capture code is extracted from the shop test;
its four exact full-main cases are retained. All eight final cases pass in dev/production, one
worker and no retries; full npm test/check/build pass. There are no runtime/baseline/policy changes.

An exploratory whole-main check found two/three phone-bag text pixels/max 1; those failures remain
recorded. Final order regressions isolate the requested thumbnails and do not claim full-main
exactness. Their 20 state captures contain 48 exact thumbnail pairs per target. Shop contributes
12 state captures/12 exact main pairs. Other route/map suites are not rerun.

Discovery is 1,761 invocations/123 files (mobile/desktop 691 each, phone/tablet 51 each, TV 23,
components 254). These historical configurations are not dedicated device or full state acceptance.
Next: audit stage-176 SearchField keyboard-clear behavior using actual keyboard reachability and
the intended clear/Escape contract. Other visual/platform gates and original residuals remain open.

## Stage 231 checkpoint: SearchField keyboard contract

[SEARCH-KEYBOARD-EVIDENCE.md](SEARCH-KEYBOARD-EVIDENCE.md) reproduces and explains stage-176's
forced-focus/Enter symptom: inherited press-start handling focuses the input before button keyup,
so that off-Tab button press does not complete. The documented keyboard path uses Escape in the
input. Runtime behavior and React Aria context are preserved; no extra Tab stop is introduced.

Two bilingual component cases verify actual Tab/Shift+Tab order, one Enter submit, nonempty/empty
Escape callback counts, pointer-clear callback counts and input focus. Eight journal/search route
cases exercise keyboard entry/navigation, live filtering, Enter continuity, Tab past clear and
Escape recovery from matched/empty-result queries at default mobile/desktop widths. The 390px
project is non-touch; this is not soft-keyboard or physical-device evidence. Fixture counters are
test-only. The component README corrects the callback/focus-order statement.

All 13 final development cases (eight route/five component, including bilingual axe) and eight
production route cases pass, one worker and no retries. Full npm test/check/build pass. Exploratory
wrong-result-selector/server-ownership setup failures are recorded separately. No runtime, style,
generated, dependency, baseline or visual-policy changes. Discovery is 1,771/124 files: mobile/
desktop 695 each, phone/tablet 51 each, TV 23, components 256. Older suites were not rerun.

The historical symptom is scoped to its forced-focus path. Supported keyboard clearing is verified;
AT activation, IME, physical/soft keyboards, other browsers and broader acceptance remain separate.
Next: investigate historical route loading/focus timeouts with explicit lifecycle diagnostics.

## Stage 232 checkpoint: route readiness and focus diagnostics

[ROUTE-LIFECYCLE-EVIDENCE.md](ROUTE-LIFECYCLE-EVIDENCE.md) inspects retained stage-200/214 traces:
`#main` is absent before axe, with 19–50 app-module requests unfinished when the failed assertion
completes. This substantiates module-readiness overruns without establishing why loading was slow.
The stage-197 scratch inactive-heading failure lacks a retained focus trace and remains unproven.

Twelve bilingual default-mobile/desktop cases gate actual site/shop/notfound modules. They verify
initial readiness/first Tab, retained home while shop loads, latest FAQ navigation ownership after
stale shop completion, history heading focus, and delayed invalid-policy final-heading recovery.
Module release awaits ESM evaluation; no global timeout/retry or runtime behavior changes. JSON
state snapshots are retained. These are non-touch Chromium diagnostics, not latency/device proof.

All 12 new dev cases and a separate 16-case existing initial-route axe selection pass; a combined
28-case production selection passes, one worker and no retries. Full npm test/check/build pass.
No runtime/style/generated/dependency/baseline/visual-policy changes. Discovery is 1,783/125 files:
mobile/desktop 701 each, phone/tablet 51 each, TV 23, components 256. Earlier inventories remain
snapshots; other dedicated route/map/capture suites were not rerun. Original slow-load/focus causes
and broad performance/platform gates remain open despite successful controlled cases.

Next: refresh the acceptance matrix and prioritized remaining gaps using stages 228–232, retaining
historical observations and explicit evidence boundaries.

## Stage 233 checkpoint: acceptance matrix and priorities

The refreshed [current acceptance matrix](ACCEPTANCE-COVERAGE.md) reconciles stages 228–232 and
preserves the old snapshot/follow-ups in [coverage history](ACCEPTANCE-COVERAGE-HISTORY.md). Fresh
registration discovery is 1,783 dev invocations/125 files and 1,387 production/51 files; skips remain
explicit. The 19-route matrix separates supported flow assertions, historical explanations,
unresolved causes and physical/backend/platform exclusions.

A fresh combined production run passes all 84 dedicated touch-route/map cases (42 phone/42 tablet,
21 EN/21 FA per project), two workers and no retries/skips. npm run check and inventory/link checks
pass. Other per-stage local results remain prior evidence; no fresh full local browser/visual or
combined-dev acceptance is implied. Runtime/test/config/baseline sources are unchanged.

Reviewed-head PR #88 Linux CI is now completed and failed: browser 1,508 pass/273 skip/2 fail;
production 1,188 pass/197 skip/2 fail. Both jobs fail only EN/FA mobile policy screenshots, including
retry. Logs show 76 route axe passes per job, 74 page screenshot passes per job, and 12 dev desktop
hydration passes. Unit and React 19 jobs pass. This is evidence on `592448d`, not a claim that this
stage's PR CI has completed. Original loading/focus causes and other residuals remain open.

Next: diagnose the Linux mobile policy expected/actual/diff artifacts and isolate layout versus
raster/baseline cause. Baselines/tolerances are not preapproved for refresh. Then proceed through
the matrix's visual, latency/focus, deeper-state and physical/integration priorities.

## Stage 234 checkpoint: Linux phone policy visual parity

[POLICY-LINUX-VISUAL-EVIDENCE.md](POLICY-LINUX-VISUAL-EVIDENCE.md) reviews both prior CI artifacts
and confirms that Linux expected images still represent the pre-stage-224 sticky-phone contents
rule. In the exact Linux AMD64 Playwright image, injecting only that old rule reproduces both
expected PNGs with zero raw pixel differences; removing it matches the common CI actuals exactly.

Refresh only the two Linux mobile policy baselines. No runtime/CSS/generated/test/config/dependency,
mask, threshold or retry changes; Darwin/desktop/other baselines remain intact. Eight focused
policy screenshot/axe cases pass per dev/production target on Linux and Darwin, one worker and no
retries or snapshot-update flag. Builds/check and source/baseline/document consistency pass.
The original CI run remains historical red; fresh broad PR CI is not implied by local results.

The Linux test VM is restored to its original stopped state/memory after isolated verification.
No new registrations: the stage-233 1,783 dev/1,387 production inventory remains valid. Full visual,
original latency/focus, deeper state, physical/AT and backend gates remain separate.
Next: update-disabled full-page comparisons on the reviewed head and explicit residual review.

## Stage 235 checkpoint: full-page comparison audit

[FULL-PAGE-VISUAL-EVIDENCE.md](FULL-PAGE-VISUAL-EVIDENCE.md) records 304 first-run comparisons of
all 76 default pages on Darwin/Linux in dev/production. Darwin has 66 pass/10 screenshot fail in
each target; Linux dev has 73 pass/two contact screenshot fail/one pre-capture readiness fail;
Linux production passes 76/76. Two workers, zero skips/retries; this is not an all-green result.

Three failed Linux dev cases pass separate serial reruns with snapshot updates disabled, without
erasing first-run failures or explaining their causes. Ten Darwin cases persist across targets.
Inspected text differs in cancelled order code and Persian separators; source commit `646e5ab`
intentionally changed those after all ten expectations' `bd7f880` capture. Full counterfactual/
image review is the next focused stage, not an automatic baseline refresh in this audit.

All 258 snapshot PNGs remain unchanged. No runtime/test/config/tolerance changes; builds/check and
baseline/document/inventory consistency pass. Discovery remains 1,783 dev/1,387 production. Linux
native task volumes are removed and VM restored. Default screenshots do not close historical block
articles, all payment states, touch/TV, real maps, backend or physical/AT acceptance.
Next: isolate/review the ten stale-text Darwin expectations and correct only supported baselines.

## Stage 236 checkpoint: Darwin content expectations

[DARWIN-CONTENT-VISUAL-EVIDENCE.md](DARWIN-CONTENT-VISUAL-EVIDENCE.md) isolates all ten stale
expectations. Old-content counterfactuals pass 10/10 against old baselines: cancelled order code,
Persian detail/blog separators, and the product total's separately changed literal. Complete
expected/current page pairs and decoded differences are reviewed. Only the ten Darwin PNGs change,
using retained stage-235 dev captures rather than adopting extra raster variation from new probes.

Darwin dev and production each pass all 76 default page comparisons, with two workers,
zero skips/retries and snapshot updates explicitly disabled.
No runtime/test/config/dependency/tolerance changes. The scratch counterfactual spec is removed;
registrations remain 1,783 dev/1,387 production. Linux first-run failures are not erased or rerun.
Next: controlled Linux development readiness/contact-map diagnosis; preserve remaining historical,
state, physical/AT and backend gates.

## Stage 237 checkpoint: Linux capture/readiness diagnosis

Stage 237 [diagnoses Linux capture/readiness symptoms](LINUX-CAPTURE-DIAGNOSTICS.md).
Fixed-clock CPU4 map probes reproduce the EN failure exactly and FA within one raw pixel; public
tooltip update restores both baselines exactly. FA callback instrumentation records a transient
1×1 viewport/font-loading phase measuring width98 instead of101, leaving the observed offset.
Six post controls show the four unfinished background modules can remain held while the post
renders; an active-post hold produces the old missing-main signature and recovers after release.
No source/policy/baseline changes; exact post scheduling cause and tiny-viewport origin remain open.
Next: test lifecycle-safe tooltip repositioning after later font loads, then a supported correction.

## Stage 238 checkpoint: permanent map label font readiness

Stage 238 [corrects map labels after later font loads](MAP-FONT-LOAD-EVIDENCE.md).
PlacesMap refreshes current tooltips on FontFaceSet loading completion and removes the listener
on unmount. Three new component regressions fail before the correction and pass afterward.
The Linux CPU4 capture again measures temporary narrow widths, then automatically recenters labels;
first/second PNGs differ from old baselines by only one low-amplitude zoom-control pixel each.
All 68 targeted browser cases pass across Darwin/Linux dev/production, with no retries/skips;
unit/check/build, unchanged snapshot hashes and discovery checks pass. Inventory is 1,786 dev /
1,387 production. Contact/lifecycle comparisons use snapshot updates disabled.
No baseline or screenshot-policy changes. The post readiness deadline and tiny-viewport attribution
remain separate. Next: isolate active post load/evaluation timing; retain broader acceptance gates.

## Stage 239 checkpoint: post evaluation readiness

Stage 239 [separates post HTTP completion from evaluation readiness](POST-EVALUATION-READINESS.md).
Four new bilingual default-project cases hold real post module evaluation after HTTP200, assert
the original helper's five-second missing-main deadline, then verify article/locale and first-load
focus recovery on release. The source module is changed only by test interception.
All 64 route lifecycle cases pass on Darwin/Linux dev/production, with one worker, no skips/retries
and snapshot updates disabled. Check/build, unchanged baseline hashes and discovery pass; inventory
is 1,790 dev / 1,391 production.
No runtime/policy/baseline changes. This establishes the waiting/recovery contract, not the original
unobserved scheduling cause. Next: explicit state/integrity acceptance mapping; retain old latency
and other acceptance residuals without adding speculative waits.

## Stage 240 checkpoint: state and integrity acceptance subset

Stage 240 [maps the state/integrity acceptance subset](STATE-INTEGRITY-ACCEPTANCE.md).
Sixteen explicit frontend invariants are linked to actual browser/unit assertions and residuals.
A four-case dev probe confirms F01: the named payment-failure axe fixture is redirected to delivery
and still passes axe. This is a coverage defect, separate from the working refused-payment path.
All 96 selected browser cases pass on Darwin dev/production, including distinct TV controls, with
no skips/retries or snapshot updates. Fresh unit/check/build and unchanged baseline/inventory
checks pass. The four F01 observations are separate diagnostics, not added to the 96 cases.
No runtime/test/baseline changes. True cross-tab concurrency, server idempotency and offline writes
remain unproved. Next: repair F01's payment-state setup and assert the intended state before axe.

## Stage 241 checkpoint: asserted payment states

Stage 241 [corrects the failed-payment state fixture](PAYMENT-STATE-FIXTURE-EVIDENCE.md).
Four pre-fix assertions fail because the old setup reaches delivery. The corrected fixture fills
valid delivery, exercises the local failed bank return and requires its heading/focus/retry state
before axe. Nearby payment step/errors/completion also gain explicit state assertions.
All 120 selected state/return-flow cases pass on Darwin/Linux dev/production with one worker,
no skips/retries and snapshot updates disabled. Check/build and consistency checks pass; all 258
baseline PNGs and 1,790 dev / 1,391 production registrations remain unchanged.
No application/baseline/policy changes or new registrations. F01 is closed for this fixture;
true two-tab behavior, repeated-submit UI, offline writes and other acceptance gaps remain open.
Next: shared-origin two-tab customer switch/pending-response coverage.

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
and migrated components do not import storefront code. App dependency checks also enforce UI/helper
boundaries and missing-module/cycle checks for the runtime graph. Browser fixture lookup and package
wording checks discover nested components.

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
