# Storefront maintenance

Start here when changing the official storefront. The `ui_kits/storefront/` folder is a separate sandbox.

## Where to edit

| Change | File |
| --- | --- |
| A page's markup | That page's `Storefront*.dc.html` |
| Page state and behavior | `storefront-<page>/logic.js` |
| English/Persian page copy | `storefront-<page>/copy.js` |
| Shared navigation labels | [_shared/translations/shell.js](_shared/translations/shell.js) |
| Category names or shared article content | `_shared/translations/categories.js` and `journal-content.js` |
| Product names, prices, box sizes or extras | [_shared/catalog.js](_shared/catalog.js) |
| Product placeholder artwork | `../assets/placeholders/product.svg` |
| Store name, address, hours, contact links or demo payment details | [_shared/store-config.js](_shared/store-config.js) |
| Delivery fees, cut-offs, time slots or free-delivery rules | [_shared/delivery.js](_shared/delivery.js) |
| Desktop header | [_shared/header-desktop.html](_shared/header-desktop.html) |
| Mobile header | [_shared/header-mobile.html](_shared/header-mobile.html) |
| Mobile menu layout | [_shared/mobile-menu.html](_shared/mobile-menu.html) |
| Footer | [_shared/footer.html](_shared/footer.html) |
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
| Colors, fonts and tenant themes | `../tokens/` |

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

## Shared assets and exporting

All pages load the same assets. Page folders contain only their `Storefront*.dc.html` source.

- `_runtime/support.js`: shared generated upstream template runtime; replace it with an upstream build when upgrading.
- `_runtime/ds-base.js`: shared design-system asset loader. Its `base` resolves relative to this loader, not to a page.
- `_runtime/tailwind.css`: generated Tailwind utilities only, compiled from `_shared/tailwind.css`.
- `_runtime/custom.css`: separate generated plain CSS, assembled from `_shared/custom.css` and its imports.
- `../styles.css`: imports the shared design-system fonts, tokens, tenant themes and component styles.
- `../_ds_bundle.js` and `../assets/`: shared component bundle and images.

Pages reference `../_runtime/support.js` and `../_runtime/ds-base.js`; browsers can reuse the same cached files across pages. The loader adds each shared stylesheet and component bundle only once per document.

When exporting, include `_runtime/` alongside the selected `storefront-*` folders, and include the design-system root assets. Preserve their relative structure, or change `base` once in `_runtime/ds-base.js` to point to the exported design-system root. Exporting one page folder alone is insufficient.

HTML shell and page-logic sections still regenerate into each template because the template runtime consumes inline markup and logic. These generated sections are maintained in `_shared/`; the static JS and CSS assets are shared at runtime.

## Adding a page

Copy a similar `storefront-*` folder, rename its `.dc.html` file and change its `@template` metadata, editable content and page logic. Register its route in `_shared/routing.js` and menu label in `_shared/translations/shell.js`; add it to the menu in `_shared/navigation.js` if needed, then add its import and `start` option in `storefront-site/StorefrontSite.dc.html`. Run the build and checks above.

## Tailwind conventions

Tailwind CSS and its CLI are pinned to **4.3.3** in `package.json` and the lockfile. Use the local build; no Tailwind CDN script is needed.

- Utilities use the `tw:` prefix, for example `tw:flex tw:flex-col tw:gap-4`.
- Spacing numbers follow Vendra’s token scale: `tw:gap-5` means `--space-5` (24px), and `tw:gap-7` means `--space-7` (48px). They are not Tailwind’s default spacing numbers.
- Colors, fonts and line heights resolve from the current tenant and language wrapper. For example, `tw:bg-page`, `tw:text-body` and `tw:font-body` use existing semantic tokens.
- Prefer logical spacing such as `tw:ps-4` / `tw:pe-4` for RTL support. Write complete class names in source; do not construct them from string fragments.
- Keep repeated page patterns in readable named classes. `custom.css` imports `shell.css`, `information-pages.css`, `page-layouts.css` and page-specific `styles.css` files. These files use plain CSS and `vf-` class names, without `@apply` or Tailwind compilation.
- Preflight is omitted so existing design-system component styles keep their reset and defaults. Component CSS remains in `../components/components.css`.
- Edit maintained HTML and page content, then run `npm --prefix templates run build`. Do not edit the generated `_runtime/tailwind.css` or `_runtime/custom.css`. `run check` recompiles in a temporary folder and fails when the compiled stylesheet or generated template is stale.

`node templates/_build/generate.cjs` remains available for shared HTML/logic propagation only; it does not compile Tailwind. Use the full build after CSS or class changes.

## Storefront layout and image rules

`page-layouts.css` defines three page families: shopping (1240px), forms/checkout (1088px), and information (1088px). Use `vf-shopping`, `vf-form` or `vf-info` on the page's main element. The home hero, 420px sign-in form and 760px reading column are named exceptions. Heading sizes, mobile top spacing and Persian typography belong in the shared stylesheet.

Use `vf-product-grid` on product grids. Subgrid shares name, subtitle and price row heights without truncating copy. Prices in cards, search and the bag share a 16px weight and aligned numerals; narrow search rows move the price below the description. Bag line amounts are quantity totals, while their metadata retains the unit price.

Keep one primary action per mobile page. Product, bag and payment actions live above the mobile navigation bar; their desktop buttons remain in the content. Empty states keep their own action. Secondary messaging links use the quieter ghost variant.

All catalog products use the shared neutral 4:5 placeholder. Default product/category cards and small thumbnails use soft frames. Reserve arches for the home/wedding hero and main product image. Review English and Persian independently at 320px, 390px and desktop widths after changing copy or layout.

### Catalog navigation and demo orders

Product cards on home, shop, saved, search and recovery pages use each catalog ID.
`_shared/catalog.js` owns bilingual names, descriptions and prices. Ivory has three
sizes; other sample products use their catalog price. Unknown product IDs show the
not-found page; the previous `ivory-classic` link remains supported.

Shop URLs preserve `cat`, `sort=low|high` and comma-separated `filters=under3,same,roses`.
The template route helpers in `_shared/routing.js` validate these values; refresh,
Back and language switching retain selections. Home category cards link to these filters.

Demo checkout stores a received order with its own ID, items, totals, recipient,
delivery window and payment suffix in session storage. Tracking displays the last
completed order even after starting a new bag; Order again copies that order into
the bag. Closing the browser session clears this demo data. Standalone tracking
still has sample preview data. This template has no payment or fulfillment backend.

### Store details and recovery states

Edit `_shared/store-config.js` for the bilingual store name, address, hours,
phone, WhatsApp, Instagram and demo payment details. Run `npm --prefix templates run build`
to update every template. Shared navigation, contact, footer and checkout use this configuration.

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

Use `tw:` utilities in markup for standard layout and spacing. Use a descriptive
`vf-` class for custom presentation, such as `vf-product-breadcrumb` or
`vf-shop-category`. Put its plain CSS in the appropriate shared source file.
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
