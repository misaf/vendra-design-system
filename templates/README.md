# Storefront maintenance

Start here when changing the official storefront. The `ui_kits/storefront/` folder is a separate sandbox.

## Where to edit

| Change | File |
| --- | --- |
| A page's content, English/Persian copy or behavior | That page's `Storefront*.dc.html` |
| Product names, prices, box sizes or extras | [_shared/catalog.js](_shared/catalog.js) |
| Delivery fees, cut-offs, time slots or free-delivery rules | [_shared/delivery.js](_shared/delivery.js) |
| Desktop header | [_shared/header-desktop.html](_shared/header-desktop.html) |
| Mobile header | [_shared/header-mobile.html](_shared/header-mobile.html) |
| Mobile menu layout | [_shared/mobile-menu.html](_shared/mobile-menu.html) |
| Footer | [_shared/footer.html](_shared/footer.html) |
| Shared page layout | [_shared/layout.html](_shared/layout.html) |
| Shared navigation, menu labels, responsive behavior or focus | [_shared/storefront.js](_shared/storefront.js) |
| Currency and number formatting | `../components/utils/format.js` (requires a design-system bundle rebuild) |
| Colors, fonts and tenant themes | `../tokens/` |

The catalog and delivery rules contain sample store data. Keep page-specific translations with the page; shared navigation labels belong in `storefront.js`.

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
node templates/_build/generate.cjs
node templates/_tests/storefront.test.cjs
node templates/_tests/generation.test.cjs
git diff --check
```

To verify generated files without changing them:

```sh
node templates/_build/generate.cjs --check
```

No package install is needed. After generation, preview the affected page in English and Persian at desktop and mobile widths. Review the generated changes together with their source changes.

## Why portable pages contain copies

Each `storefront-*` folder still contains its own runtime files and generated shared sections so it can be exported as a portable template. These copies are outputs, not separate sources to maintain.

`_runtime/support.js` is a generated upstream runtime; replace it with an upstream build when upgrading. `_runtime/ds-base.js` is the maintained asset loader. The generation command copies both to every page folder.

## Adding a page

Copy a similar `storefront-*` folder, rename its `.dc.html` file and change its `@template` metadata, editable content and page logic. Register its route and menu label in `_shared/storefront.js`, then add its import and `start` option in `storefront-site/StorefrontSite.dc.html`. Run generation and the checks above.
