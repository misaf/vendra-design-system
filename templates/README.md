# Storefront maintenance

Start here when changing the official storefront. All storefront examples live here. See [Migration and feature map](MIGRATION.md) for account, payment, communications, previews and integration examples.

## Where to edit

| Change | File |
| --- | --- |
| A page's markup | That page's `Storefront*.dc.html` |
| Page state and behavior | `storefront-<page>/logic.js` |
| English/Persian page copy | `storefront-<page>/copy.js` |
| Shared navigation labels | [_shared/translations/shell.js](_shared/translations/shell.js) |
| Category and shop-occasion names, or shared article content | `_shared/translations/categories.js` and `journal-content.js` |
| Product codes, descriptions, prices, photos, occasions, box sizes or extras | [_shared/catalog.js](_shared/catalog.js) |
| Product placeholder artwork | `../assets/placeholders/product.svg` |
| Store name, address, hours, contact links or demo payment details | [_shared/store-config.js](_shared/store-config.js) |
| Delivery fees, cut-offs, delivery days, sold-out dates, time slots or free-delivery rules | [_shared/delivery.js](_shared/delivery.js) |
| Promo codes | [_shared/promotions.js](_shared/promotions.js) |
| Account balance: discount threshold and percent, top-up amounts and limits | `wallet` in [_shared/store-config.js](_shared/store-config.js); rules and history in [_shared/wallet.js](_shared/wallet.js) |
| Map tiles, attribution and starting view; the studio's own pin (`studio`) | `map` and `studio` in [_shared/store-config.js](_shared/store-config.js) |
| Delivery pin and saved-places maps, loading and formatting | [_shared/location.js](_shared/location.js), styles in `location.css`, copy in `translations/location.js` |
| Desktop header | [_shared/header-desktop.html](_shared/header-desktop.html) |
| Mobile header | [_shared/header-mobile.html](_shared/header-mobile.html) |
| Mobile menu layout | [_shared/mobile-menu.html](_shared/mobile-menu.html) |
| Footer: brand, tagline and social links, newsletter, Shop / Studio / Help / Visit columns, copyright and credit | [_shared/footer.html](_shared/footer.html); values from `footer` in `navigation.js` |
| Cookie consent banner (placed twice by `layout.html`: docked on desktop, above the phone tab bar) | [_shared/consent.html](_shared/consent.html) |
| Local preview server, automatic generation and reload | [_build/vite.config.mjs](_build/vite.config.mjs) |
| Pure Tailwind entry: token aliases and utility source scanning | [_shared/tailwind.css](_shared/tailwind.css) |
| Custom CSS entry point (plain CSS imports) | [_shared/custom.css](_shared/custom.css) |
| Shared shell classes | [_shared/shell.css](_shared/shell.css) |
| Named page-specific styles | `storefront-<page>/styles.css` |
| Shopping/form/information layout families, card alignment and mobile actions | [_shared/page-layouts.css](_shared/page-layouts.css) |
| FAQ, policy and contact widths, headings and spacing | [_shared/information-pages.css](_shared/information-pages.css) |
| Shared page layout | [_shared/layout.html](_shared/layout.html) |
| Shared menus, tabs, store links and shell values | [_shared/navigation.js](_shared/navigation.js) |
| Route registration, validation and URL helpers | [_shared/routing.js](_shared/routing.js) |
| Responsive state, heading focus, announcements and SEO | [_shared/page-lifecycle.js](_shared/page-lifecycle.js) |
| Storefront number and currency wrappers | [_shared/formatting.js](_shared/formatting.js) |
| Currency and number formatting | `../components/utils/format.js` (requires a design-system bundle rebuild) |
| Colors and fonts | `../tokens/` |
| Tenant themes (generated into `../tokens/tenants/<slug>.css` and the email palettes in `communications/email-templates.js`) | `../tokens/tenants/<slug>.json`; generator in [_shared/tenant-theme.js](_shared/tenant-theme.js) |

The catalog and delivery rules contain sample store data. Keep page copy in `storefront-<page>/copy.js`; shared navigation labels belong in `translations/shell.js`.

Product images intentionally use one neutral 4:5 SVG placeholder. Cards, product views and order thumbnails read image paths from the catalog. For a real store, change each product's `image` path there and keep matching crops. Image paths resolve against the design-system root configured once in `_runtime/ds-base.js`.

## Editing a page

Open its `Storefront*.dc.html` file. Edit these clearly marked regions:

- `BEGIN PAGE CONTENT` / `END PAGE CONTENT`: the page's HTML inside the shared shell.
- `BEGIN PAGE STICKY CONTENT` / `END PAGE STICKY CONTENT`: page-specific content above the mobile tab bar.

Edit state, validation, filtering and event handlers in adjacent `logic.js`.
Edit English/Persian labels and content in adjacent `copy.js`, and custom styles
in `styles.css`.

The `@template` description and `data-props` also belong to the page. `storefront-site` is the page router; its imports are maintained directly and its behavior lives in adjacent `logic.js`.

Do not edit `GENERATED SHELL`, `GENERATED SHARED LOGIC`, `GENERATED PAGE LOGIC`
or `GENERATED PAGE COPY` sections. Their comments identify the maintained source
files. Generation preserves the editable HTML regions and page properties.

## Generate and check

From the repository root:

```sh
npm --prefix templates run build
npm --prefix templates test
git diff --check
```

To verify generated files without changing them:

```sh
npm --prefix templates run check
```

For the first build, install the locked development dependencies with `npm --prefix templates ci`. Node.js 20.19+ or 22.12+ is required. Exported templates use the checked-in compiled CSS and do not need npm in the browser. After generation, preview the affected page in English and Persian at desktop and mobile widths. Review the generated changes together with their source changes. The test command covers storefront logic, generation, shared asset paths and repeated-loader deduplication.

## Preview the website locally

Run these commands from the repository root. On a fresh checkout, install the locked development dependencies once:

```sh
npm --prefix templates ci
```

Start Vite:

```sh
npm --prefix templates run dev
```

Open [the storefront](http://127.0.0.1:5173/) or [the Persian storefront](http://127.0.0.1:5173/?lang=fa). Vite redirects to the click-through template and preserves the language query.

Vite builds Tailwind and shared template sections before serving the preview. Saving page content, shared HTML/logic or Tailwind source automatically rebuilds and reloads the browser. Asset and token changes also reload the preview. Keep the terminal running; press **Ctrl+C** to stop it. Port 5173 is fixed, so stop another process using that port before starting Vite.

Node.js **20.19+ or 22.12+** is required. Vite 8.3.2 is pinned in the lockfile. The small integration in `_build/vite.config.mjs` supports our dynamic `.dc.html` runtime and preloads the design-system bundle before the preview boots. Tailwind remains compiled through the existing CLI, giving Vite and exported templates the same shared CSS.

For a static export or a preview without Vite, rebuild explicitly:

```sh
npm --prefix templates run build
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open [English](http://127.0.0.1:8765/templates/storefront-site/StorefrontSite.dc.html?lang=en) or [Persian](http://127.0.0.1:8765/templates/storefront-site/StorefrontSite.dc.html?lang=fa). Static preview requires Python 3 and manual browser refresh after rebuilding. If its first load displays a design-system loading error, refresh once; Vite's preview preload avoids this startup race.

`npm --prefix templates run build` produces the shared export assets and generated templates; this project does not use `vite build` to package the custom template runtime.

## Browser tests

Playwright tests live in `_e2e/` and run against the Vite preview (an already running `npm run dev` is reused; otherwise Playwright starts one):

```sh
npm --prefix templates run test:e2e
```

They run on the installed Google Chrome (`channel: 'chrome'`), so `npx playwright install` is not needed. Each storefront test runs at 390px (`mobile` project) and 1280px (`desktop` project).

- `storefront.spec.mjs` runs axe (WCAG 2.2 A/AA) on every routed view in English and Persian, and checks `dir`/`lang`, horizontal overflow, that a first load leaves focus at the top while in-site navigation focuses the heading, the footer's on-inverse focus ring and the account tabs/tabpanel linkage.
- `states.spec.mjs` runs the same axe scan on states a first load never reaches: the mobile menu, the shop filter and account dialogs (open, labelled, holding focus), each account tab, expanded accordions, search results, an emptied bag, checkout's payment step and confirmation, the sign-in code screen, form validation (every `aria-invalid` field must point at visible error text) and the `?demo=loading|error` states.
- `pages.spec.mjs` compares full-page screenshots of every routed view in English and Persian at both widths, with the clock frozen at 2026-10-05 so relative dates stay put.
- `components.spec.mjs` exercises Tooltip (hover, bubble hover, Esc, focus), Tabs (arrow keys mirrored in RTL, Home/End, roving tabindex, `aria-controls`) and Toast (44px close button, on-inverse ring at 3:1) on `_e2e/fixtures/components.html`.
- `cards.spec.mjs` loads every `@dsCard` at its declared viewport, fails on runtime errors or a Vite error overlay, checks the Contrast card has no failing pairs for the default theme and every tenant in `tokens/tenants/`, and compares each card with its screenshot in `_e2e/__screenshots__/`.
- `tenants.spec.mjs` runs the seven Theme builder contrast checks against the default theme and every generated `tokens/tenants/*.css` file as the browser resolves it, checks a storefront downloads only its own tenant file (after `styles.css`, with no flash of the default colours even when the file is slow), and checks every **Start from** choice in the builder passes. A new tenant file is picked up automatically.

Screenshot baselines are per platform (`-darwin.png`, `-linux.png`) because font rendering differs. Comparisons use exact colours (`threshold: 0`) with up to 25 differing pixels for anti-aliasing; the default tolerance hid a whole drop shadow. After an intended visual change, review the diff in `_e2e/playwright-report/` and refresh the baselines:

```sh
npm --prefix templates run test:e2e:update
```

## Shared assets and exporting

All pages load the same assets. Page folders contain only their `Storefront*.dc.html` source.

- `_runtime/support.js`: shared generated upstream template runtime; replace it with an upstream build when upgrading.
- `_runtime/shared-logic.js`: generated from the `_shared/*.js` logic files (store config, catalog, delivery, routing, navigation, page lifecycle). Pages load it before `support.js`; never edit it.
- `../../components/utils/{seo,format,dates,nav}.js`: core helpers (`AG_SEO`, `AG_FORMAT`, `AG_DATES`, `AG_NAV`) that the shared logic calls on first render. They are also in `_ds_bundle.js`, but the bundle loads asynchronously after React, so `_build/generate.cjs` writes these four tags before `shared-logic.js` in every page head. Don't remove them, or pages log errors until the bundle arrives.
- `_runtime/ds-base.js`: shared design-system asset loader. Its `base` resolves relative to this loader, not to a page.
- `_runtime/tailwind.css`: generated Tailwind utilities only, compiled from `_shared/tailwind.css`.
- `_runtime/custom.css`: separate generated plain CSS, assembled from `_shared/custom.css` and its imports.
- `../styles.css`: imports the shared design-system fonts, tokens and component styles. `_runtime/ds-base.js` adds the active tenant's `../tokens/tenants/<slug>.css` after it (chosen by `tenant` in `_shared/store-config.js` or `?tenant=`).
- `../_ds_bundle.js` and `../assets/`: shared component bundle and images.

Pages reference `../_runtime/shared-logic.js`, `../_runtime/support.js` and `../_runtime/ds-base.js`; browsers can reuse the same cached files across pages. The loader adds each shared stylesheet and component bundle only once per document.

When exporting, include `_runtime/` alongside the selected `storefront-*` folders, and include the design-system root assets. Preserve their relative structure, or change `base` once in `_runtime/ds-base.js` to point to the exported design-system root. Exporting one page folder alone is insufficient.

HTML shell, page copy and page-logic sections still regenerate into each template because the template runtime consumes inline markup and logic. Shared logic does not: its top-level declarations load once as globals from `_runtime/shared-logic.js`, and each page's `GENERATED SHARED LOGIC` section is a single line, `const VFPage = vfPageClass(DCLogic);`, because the runtime only hands `DCLogic` to page logic.

## Adding a page

Copy a similar `storefront-*` folder, rename its `.dc.html` file and change its `@template` metadata, editable content and page logic. Register its route in `_shared/routing.js` and menu label in `_shared/translations/shell.js`; add it to the menu in `_shared/navigation.js` if needed, then add its import and `start` option in `storefront-site/StorefrontSite.dc.html`. Run the build and checks above.

## Tailwind conventions

Tailwind CSS and its CLI are pinned to **4.3.3** in `package.json` and the lockfile. Use the local build; no Tailwind CDN script is needed.

- Utilities use the `tw:` prefix, for example `tw:flex tw:flex-col tw:gap-4`.
- Spacing numbers follow Vendra’s token scale: `tw:gap-5` means `--space-5` (24px), and `tw:gap-7` means `--space-7` (48px). They are not Tailwind’s default spacing numbers.
- Layout tokens have named utilities — use them instead of arbitrary values: `tw:max-w-page` (`--container-max`), `tw:max-w-measure` (`--measure`, readable line length), `tw:px-gutter` (`--gutter`), `tw:h-header` / `tw:h-header-mobile`, `tw:min-h-tap` / `tw:h-tap` / `tw:w-tap` (`--tap-min`, 44px touch target), `tw:z-header` / `tw:z-tabbar` / `tw:z-overlay` / `tw:z-toast` / `tw:z-tooltip`, `tw:rounded-xs|sm|md|lg|pill|control` and `tw:shadow-sm|md|lg`.
- Colors, fonts and line heights resolve from the current tenant and language wrapper. For example, `tw:bg-page`, `tw:text-body` and `tw:font-body` use existing semantic tokens.
- Prefer logical spacing such as `tw:ps-4` / `tw:pe-4` for RTL support. Write complete class names in source; do not construct them from string fragments.
- Use Tailwind first for layout, spacing, sizing, typography, colors, borders and hover/responsive states. Add missing semantic tokens to the Tailwind theme rather than repeating CSS declarations. Use arbitrary values for exact template measurements and layouts that have no matching token.
- Keep custom CSS for contextual rules that are clearer as shared selectors: component internals, responsive heading families, Persian typography and keyboard focus. `custom.css` imports these plain CSS exceptions independently, without `@apply`. Page `styles.css` files may contain only a comment when utilities handle the entire page.
- Existing `vf-` classes also identify page sections for shared contextual rules and DOM hooks. A named class does not require a matching custom CSS rule.
- Use the `!` suffix only where a utility must override existing unlayered component or document styles, for example `tw:text-body!` on a brand link. Avoid blanket important utilities.
- Preflight is omitted so existing design-system component styles keep their reset and defaults. Component CSS remains in `../components/components.css`.
- Edit maintained HTML and page content, then run `npm --prefix templates run build`. Do not edit the generated `_runtime/tailwind.css` or `_runtime/custom.css`. `run check` recompiles in a temporary folder and fails when the compiled stylesheet, a generated template or a generated tenant theme is stale. The build also refuses a tenant JSON that fails any of the seven contrast checks.

`node templates/_build/generate.cjs` remains available for shared HTML/logic propagation only; it does not compile Tailwind. Use the full build after CSS or class changes.

## Storefront layout and image rules

`page-layouts.css` defines three page families: shopping (1240px), forms/checkout (1088px), and information (1088px). Use `vf-shopping`, `vf-form` or `vf-info` on the page's main element. The home hero, 420px sign-in form and 760px reading column are named exceptions. Heading sizes, mobile top spacing and Persian typography belong in the shared stylesheet.

Use `vf-product-grid` on product grids. Subgrid shares name, subtitle and price row heights without truncating copy. Prices in cards, search and the bag share a 16px weight and aligned numerals; narrow search rows move the price below the description. Bag line amounts are quantity totals, while their metadata retains the unit price.

Keep one primary action per mobile page. Product, bag and payment actions live above the mobile navigation bar; their desktop buttons remain in the content. Empty states keep their own action. Secondary messaging links use the quieter ghost variant.

All catalog products use the shared neutral 4:5 placeholder. Default product/category cards and small thumbnails use soft frames. Reserve arches for the home/wedding hero and main product image. Review English and Persian independently at 320px, 390px and desktop widths after changing copy or layout.

### Catalog navigation and demo orders

Products have no names. Each one is known by its unique code (its catalog `id`, e.g.
`VF-7K2M4Q`): the code is its title on cards, the product page, bag, checkout, orders,
emails, SMS and WhatsApp messages, and its category says what kind of product it is
("Flower box"), shown under the code. Search finds a product by its code, typed
in any case, with spaces or Persian digits. Product URLs carry the category and code:
`?view=product&id=VF-7K2M4Q&cat=boxes`.

`_shared/catalog.js` owns codes, bilingual descriptions and prices. Products with
`sizes: true` offer the three box sizes; `noAddons` and `care` cover per-product extras and
care text. Unknown codes show the not-found page. Old slug links (`?id=ivory`,
`ivory-classic`), saved lists and bag lines from before codes still resolve through each
product's `legacy` slug.

Order-confirmed, ready and on-the-way SMS and WhatsApp messages
(`communications/notifications.js`) list the order's codes: pass the order lines as `items`
(`[{code, qty}]`). More than three products show the first two and "+N more", so a Persian SMS
stays within two parts.

### Account balance

Signed-in customers top up their balance in the account's Balance tab (`?view=account&tab=balance`)
and can pay for an order from it at checkout. Paying from a balance of at least
`VF_STORE.wallet.discountFrom` (100,000,000 Toman) takes `discountPercent` (5%) off the products,
after any promo code; delivery is not discounted. The balance option is chosen by default when it
covers the order; when it doesn't, checkout says how much to top up and links to the Balance tab.
Below the discount line, checkout also says how much to top up to get the discount and what it
would save on this order.
Guests are asked to sign in. Each top-up and order payment is kept in the balance history.

In this template the balance is a demo kept in the browser with the account, and top-ups use a
simulated payment. A real store must hold the balance on its server, add top-ups only after the
payment provider confirms them, and take order payments there.

Shop URLs preserve `cat`, `sort=low|high`, comma-separated `filters=under3,same,roses`,
`occasion`, `min`/`max` price and `stock=1`.
The template route helpers in `_shared/routing.js` validate these values; refresh,
Back and language switching retain selections. Home category cards link to these filters.

Demo checkout stores a received order with its own ID, items, totals, recipient,
delivery window and payment suffix in session storage. Tracking displays the last
completed order even after starting a new bag; Order again copies that order into
the bag. Closing the browser session clears this demo data. Standalone tracking
still has sample preview data. This template has no payment or fulfillment backend.

### Store details and recovery states

Edit `_shared/store-config.js` for the bilingual store name, footer tagline, address, hours,
phone, WhatsApp, Instagram, optional public email and demo payment details. `credit` names who
built the storefront in the footer's bottom line (it links to GitHub; set it to `null` to hide it).
The copyright year is the current year, in the Persian calendar on Persian pages. Run `npm --prefix templates run build`
to update every template. Shared navigation, contact, footer and checkout use this configuration.

`announcement` is the bilingual message in the bar above the header (`null` hides it;
`{freeDelivery}` becomes the free-delivery threshold). Visitors can close it for the
session; changing the English text shows it again. Add `sheba` to the payment details
(through `VF_PAYMENT.setPayCard`) to show the Sheba number, with its info tooltip, at checkout.
Give a product an `images` list in `_shared/catalog.js` to fill its product page gallery.

### Florist features

- **Delivery day.** The bag offers `VF_DELIVERY_DAYS` days from today. Today closes at the
  zone's cut-off, and dates in `VF_SOLD_OUT_DATES` show as sold out. `VF_SAMPLE_SOLD_OUT_IN_DAYS`
  only exists for the demo; set it to `null` for a real store. Checkout and tracking show the day.
- **Promo codes.** `VF_PROMOS` in `_shared/promotions.js` (percent off, minimum subtotal). The
  applied code travels with the checkout details and shows as a discount line in every summary.
- **Shop by occasion.** Products list `occasions`; the shop filters by `?occasion=` and the home
  page links to each one. (Reminder dates on the account page are a separate list, `VF_OCCASIONS`.)
- **Active shop filters** show as removable tags with a Clear all button, and the phone Filters button
  counts them.
- **Recently viewed.** The product page remembers viewed products in this browser and lists them.
- **Delivery photo.** A delivered order shows the courier's photo (`order.deliveryPhoto`) on the
  tracking page; samples show a placeholder.
- **Delivery pin.** The bag shows a map with a pin fixed at its centre: customers drag or tap the
  map (or press arrow keys) to put the pin on the door, or use their current location, then type
  only the plaque, unit and floor. The pin is saved as `delivery.location` (`{lat, lng}`) with the
  order. The map is [Leaflet](https://leafletjs.com) 1.9.4, vendored in `_vendor/leaflet/` and
  loaded only on pages with a map (bag, account); tiles come from OpenStreetMap, whose tile server is meant for light
  use, so a busy store should point `VF_STORE.map.tiles` at a commercial or self-hosted tile
  service. If the map can't load, the delivery is marked `noMap` and a full typed address (6+
  characters) replaces the pin.
- **Saved addresses.** The account's Addresses tab maps every pinned address (each marker opens
  that address), and the address editor has the same centre pin as the bag; a pin is required
  unless the map fails to load. Addresses keep it as `location`. Signed-in customers can fill the
  bag's delivery from a saved address in one tap.
- **Saved products.** The product page has a save (heart) button, and the account has a Saved tab
  listing the customer's saved products; both share the list with the Saved page.
- **Policies.** Shipping & delivery, Returns & refunds, Privacy and Terms of use live on the policy
  page (`?view=policy&id=shipping|returns|privacy|terms`; the list is `VF_POLICIES` in `routing.js`).
  The footer's Help column and sign-in link to them. Fees, cut-offs, time slots, free delivery and
  pay-on-delivery areas are read from `delivery.js` and `store-config.js`, so the text stays current.
  The copy is sample text: have the florist's own policies checked before launch.
- **Home carousels.** Shop-by-occasion and new arrivals are snap carousels (arrows on desktop,
  swipe on phones).
- **Contact.** The contact page maps the studio from `studio` in `store-config.js` with a Get
  directions link (Google Maps). A message needs a valid mobile or an email so the studio can
  reply. Signed-in customers start with their saved name, mobile and email filled in.
- **Newsletter.** The footer has an email sign-up (`VF_API.newsletter`, which posts to
  `/api/marketing/newsletter-subscriptions`). Signed-in customers start with their saved email, and
  a finished sign-up is remembered in this browser (`vf-newsletter`).
- **Cookie consent.** A first visit shows a banner: bag, saved designs and sign-in are kept on the
  device either way, and visit counts are only sent once the visitor allows them. `AG_TRACK.event`
  always keeps its local QA log but pushes to `dataLayer` / `gtag` only when `AG_TRACK.consent()`
  is `'all'` (it also sends a `gtag('consent', 'update', …)`). The choice is stored as `vf-consent`;
  The close button makes no choice (nothing is sent) and hides the banner for this browser
  session (`vf-consent-dismissed` in session storage); the next visit asks again. Cookie settings in
  the footer asks again. End-to-end tests start with the choice made
  (`storageState` in the Playwright config); consent tests use `NO_CONSENT` from `helpers.mjs`.
- **Language.** The header has an EN / فا switch (on phones, one button for the other language).
  In the click-through site it switches in place; on a standalone page it opens that page in the
  site in the other language.

Every design-system component is used by at least one template; `npm --prefix templates test`
fails if one stops being used.

In the click-through site, tracking without a matching completed order offers a
shop link. Standalone tracking retains its sample preview. Empty saved lists
navigate to the shop; they do not create favorites. No-result searches offer a
new search with focus returned to the search field, plus a shop link.

Keyboard checks should cover Tab and Shift+Tab in the mobile menu, Escape and
focus return, product/filter activation, invalid-field focus, and the contact
and inquiry success/return actions. Check both languages. Form fields use a visible
focus ring and scroll spacing below the sticky header. Contact and inquiry forms
remain local demonstrations; connect their submit handlers to a backend when adapting the template.

### Keep Tailwind and custom CSS separate

Use `tw:` utilities in markup as the first choice for storefront presentation.
For example, a muted label uses `tw:text-sm tw:text-quiet`; a hover background
uses `tw:hover:bg-sunken`. Reserve plain CSS for rules that need shared contextual
selectors or component internals, such as `.vf-product-add .ag-btn`. Put those
exceptions in the appropriate shared or adjacent `styles.css` source file.
Static inline styles, embedded style tags and `style-hover` attributes have been
moved out of the storefront markup. Styles generated internally by design-system
components remain owned by those components.

The loader includes design-system styles, Tailwind utilities and custom CSS in that
order, and deduplicates all three. Export `_runtime/custom.css` alongside the other
shared runtime assets. The build assembles custom CSS independently from Tailwind,
and the check command verifies both outputs. Vite watches both source sets.

### Keep each page's sources together

```text
templates/
  storefront-product/
    StorefrontProduct.dc.html
    styles.css
    copy.js
    logic.js
  storefront-shop/
    StorefrontShop.dc.html
    styles.css
    copy.js
    logic.js
  _shared/
    custom.css
    shell.css
    page-layouts.css
    information-pages.css
    catalog.js
    delivery.js
    store-config.js
    formatting.js
    routing.js
    page-lifecycle.js
    navigation.js
    translations/
      shell.js
      categories.js
      time.js
      location.js
      journal-content.js
  _runtime/
    custom.css
    tailwind.css
```

Each page folder owns its markup, behavior (`logic.js`), plain custom CSS and bilingual copy.
`copy.js` exposes `vfCopy(S)` for English/Persian labels and content. Formatting
helpers may use shared money and delivery rules; validation decisions, filtering,
navigation and state changes stay in `logic.js`. The click-through site is a
composition entry with its own `logic.js`; it does not need separate copy or CSS.

Genuinely shared data, translations and layout rules stay in `_shared`. Product
names and descriptions stay with catalog data; store identity stays in
`store-config.js`. Journal and post include the shared `journal-content.js`.

`_shared/custom.css` explicitly imports each adjacent `styles.css` in cascade
order. The build produces one shared `_runtime/custom.css`. The generator reads
each adjacent `copy.js` into its template's `GENERATED PAGE COPY` region and
`logic.js` into `GENERATED PAGE LOGIC`. Edit
the source files, not generated sections or runtime assets.

Run `npm --prefix templates run build` after source edits, then `run check` and
`test`. Vite watches adjacent logic/copy/CSS files as well as shared sources. When adding
a page, provide its `logic.js`, `copy.js` and `styles.css`, and add the CSS import to the entry
file. Export generated HTML and shared runtime assets; browsers do not need the
logic/copy/CSS source files.

The test suite compares translation keys recursively, including nested labels and
every list item. English/Persian text and formatting functions may differ, but
their object keys and list structures must match.

### Shared behavior ownership

Keep route parsing and URL creation in `routing.js`, shell/menu values in
`navigation.js`, and mount/update/unmount behavior in `page-lifecycle.js`.
`formatting.js` wraps the core number/currency API for storefront callers. Shared
labels stay in `translations/shell.js`; page behavior stays in adjacent `logic.js`.

The generator assembles these files in dependency order: store configuration,
delivery, catalog, shared translations, formatting, routing, lifecycle, navigation.
They are embedded in the existing generated shared region; no additional browser
requests or dependencies are introduced. Run the build and checks after editing.
