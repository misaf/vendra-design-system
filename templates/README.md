# Storefront maintenance

Start here when changing the official storefront. The `ui_kits/storefront/` folder is a separate sandbox.

## Where to edit

| Change | File |
| --- | --- |
| A page's content, English/Persian copy or behavior | That page's `Storefront*.dc.html` |
| Product names, prices, box sizes or extras | [_shared/catalog.js](_shared/catalog.js) |
| Product placeholder artwork | `../assets/placeholders/product.svg` |
| Delivery fees, cut-offs, time slots or free-delivery rules | [_shared/delivery.js](_shared/delivery.js) |
| Desktop header | [_shared/header-desktop.html](_shared/header-desktop.html) |
| Mobile header | [_shared/header-mobile.html](_shared/header-mobile.html) |
| Mobile menu layout | [_shared/mobile-menu.html](_shared/mobile-menu.html) |
| Footer | [_shared/footer.html](_shared/footer.html) |
| Local preview server, automatic generation and reload | [_build/vite.config.mjs](_build/vite.config.mjs) |
| Tailwind token aliases, source scanning and CSS entry point | [_shared/tailwind.css](_shared/tailwind.css) |
| FAQ, policy and contact widths, headings and spacing | [_shared/information-pages.css](_shared/information-pages.css) |
| Shared page layout | [_shared/layout.html](_shared/layout.html) |
| Shared navigation, menu labels, responsive behavior or focus | [_shared/storefront.js](_shared/storefront.js) |
| Currency and number formatting | `../components/utils/format.js` (requires a design-system bundle rebuild) |
| Colors, fonts and tenant themes | `../tokens/` |

The catalog and delivery rules contain sample store data. Keep page-specific translations with the page; shared navigation labels belong in `storefront.js`.

Product images intentionally use one neutral 4:5 SVG placeholder. Cards, product views and order thumbnails read image paths from the catalog. For a real store, change each product's `image` path there and keep matching crops. Image paths resolve against the design-system root configured once in `_runtime/ds-base.js`.

## Editing a page

Open its `Storefront*.dc.html` file. Edit these clearly marked regions:

- `BEGIN PAGE CONTENT` / `END PAGE CONTENT`: the page's HTML inside the shared shell.
- `BEGIN PAGE STICKY CONTENT` / `END PAGE STICKY CONTENT`: page-specific content above the mobile tab bar.
- `PAGE LOGIC`: the page's translations, state and event handlers.

The `@template` description and `data-props` also belong to the page. `storefront-site` is the page router; its imports and local logic are maintained directly.

Do not edit `GENERATED SHELL` or `GENERATED SHARED LOGIC` sections. Their comments identify the maintained source files. Generation preserves the editable regions and page properties.

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
- `_runtime/tailwind.css`: one generated stylesheet, compiled from `_shared/tailwind.css`.
- `../styles.css`: imports the shared design-system fonts, tokens, tenant themes and component styles.
- `../_ds_bundle.js` and `../assets/`: shared component bundle and images.

Pages reference `../_runtime/support.js` and `../_runtime/ds-base.js`; browsers can reuse the same cached files across pages. The loader adds each shared stylesheet and component bundle only once per document.

When exporting, include `_runtime/` alongside the selected `storefront-*` folders, and include the design-system root assets. Preserve their relative structure, or change `base` once in `_runtime/ds-base.js` to point to the exported design-system root. Exporting one page folder alone is insufficient.

HTML shell and page-logic sections still regenerate into each template because the template runtime consumes inline markup and logic. These generated sections are maintained in `_shared/`; the static JS and CSS assets are shared at runtime.

## Adding a page

Copy a similar `storefront-*` folder, rename its `.dc.html` file and change its `@template` metadata, editable content and page logic. Register its route and menu label in `_shared/storefront.js`, then add its import and `start` option in `storefront-site/StorefrontSite.dc.html`. Run the build and checks above.

## Tailwind conventions

Tailwind CSS and its CLI are pinned to **4.3.3** in `package.json` and the lockfile. Use the local build; no Tailwind CDN script is needed.

- Utilities use the `tw:` prefix, for example `tw:flex tw:flex-col tw:gap-4`.
- Spacing numbers follow Vendra’s token scale: `tw:gap-5` means `--space-5` (24px), and `tw:gap-7` means `--space-7` (48px). They are not Tailwind’s default spacing numbers.
- Colors, fonts and line heights resolve from the current tenant and language wrapper. For example, `tw:bg-page`, `tw:text-body` and `tw:font-body` use existing semantic tokens.
- Prefer logical spacing such as `tw:ps-4` / `tw:pe-4` for RTL support. Write complete class names in source; do not construct them from string fragments.
- Keep repeated page patterns in readable named classes. `information-pages.css` uses `@apply` and is compiled through the shared Tailwind entry point.
- Preflight is omitted so existing design-system component styles keep their reset and defaults. Component CSS remains in `../components/components.css`.
- Edit maintained HTML and page content, then run `npm --prefix templates run build`. Do not edit the generated `_runtime/tailwind.css`. `run check` recompiles in a temporary folder and fails when the compiled stylesheet or generated template is stale.

`node templates/_build/generate.cjs` remains available for shared HTML/logic propagation only; it does not compile Tailwind. Use the full build after CSS or class changes.
