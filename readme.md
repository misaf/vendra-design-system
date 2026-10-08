# Vendra — Design System

**Vendra** is a multi-tenant platform for florist websites. Each florist (tenant) gets a bilingual English/Persian storefront: catalogue, bag, checkout, delivery zones, account and order tracking. This repo is the shared visual and component layer those storefronts are built from. The reference tenant, **Vendra Florist** (گل‌فروشی وندرا), supplies the default theme.

- **Repo:** [misaf/vendra-design-system](https://github.com/misaf/vendra-design-system) (`master`). Related: [vendra](https://github.com/misaf/vendra) (Laravel platform), [vendra-storefront-florist](https://github.com/misaf/vendra-storefront-florist) (tenant storefront), [vendra-web](https://github.com/misaf/vendra-web) (product site).
- **Scope:** the customer-facing storefront only. Admin screens live in a separate framework; the storefront reads products, currency, delivery rules, hours and contact details as data.
- **Rules and brand:** [guidelines/brand-guide.md](guidelines/brand-guide.md) covers voice, visual foundations, links vs buttons, routing, accessibility, payments and the release checklist.

## Using the package

`@vendra/design-system` publishes only `dist/`, which the build generates and commits. Install a tagged commit from GitHub (`npm install github:misaf/vendra-design-system#v0.1.0`). React 18.2+ is a peer dependency.

| Import | What it is |
|---|---|
| `@vendra/design-system` | 50 components plus `format`, `dates`, `commerce` and `ICON_SVGS`: ES modules with types; server-render safe and marked `'use client'` for React Server Components. |
| `@vendra/design-system/styles.css` | Fonts, tokens, base styles and every `ag-*` class. Load once in the root layout. |
| `@vendra/design-system/theme` | `tenantCss(slug, spec)`, `validate`, `checks` (the seven contrast checks), `tokens`, `email`, `VENDRA` (default spec). |
| `@vendra/design-system/tenants/<slug>.css` | The sample tenants built from `tokens/tenants/*.json`. |

Tenants are data, not files: the platform stores each theme spec and the storefront renders it per request. `tenantCss` refuses unsafe slugs, invalid specs and failing contrast, so its output is safe for a `<style>` element. Fall back to the default theme when it throws:

```js
import '@vendra/design-system/styles.css';
import {tenantCss} from '@vendra/design-system/theme';

// tenant = {slug, locale, theme} from the platform API
function themeFor(tenant) {
  try { return tenantCss(tenant.slug, tenant.theme); } catch (error) { console.error(error); return ''; }
}

const css = themeFor(tenant);
const root = document.documentElement;
root.lang = tenant.locale;
root.dir = tenant.locale === 'fa' ? 'rtl' : 'ltr';
if (css) {
  root.dataset.tenant = tenant.slug;
  document.head.append(Object.assign(document.createElement('style'), {textContent: css}));
}
```

A server-rendered app does the same in its document template: put the CSS in a `<style>` element and set `lang`, `dir` and `data-tenant` on `<html>`.

`commerce` holds the storefront rules as pure functions that take the tenant's data: delivery zones and days, totals with promo and balance discounts, the Checkout request and adapters from Vendra API records (`productFromApi`, `orderFromApi`…). The reference templates run on the same functions.

Components take all copy, prices, currency and contact details as props. Run `checks(spec)` in the admin theme editor so a florist can't save a theme the storefront would refuse.

## Tenant themes

- **Tokens only.** Components read semantic tokens (`--accent`, `--surface-*`, `--text-*`, `--radius-arch`). A tenant overrides them under `[data-tenant="<slug>"]`; never fork component CSS.
- **One JSON per tenant.** `tokens/tenants/<slug>.json` (four colours, five character choices, optional hand-set shades) builds into `<slug>.css` via `templates/_shared/tenant-theme.js`, the same generator as the Theme builder card. Shades are derived in OKLCH.
- **It overrides:** the palette ramps (`--petal/peony/ink/stem-*`), the semantic aliases, and the character tokens in `tokens/character.css` (display font, case, tracking, control and frame radii). Spacing, type scale, motion, focus ring, status colours and RTL rules are fixed.
- **Contrast:** `--accent` 4.5:1 with white text, `--text-accent` 4.5:1 on the page, `--border-input` 3:1, `--focus-ring-on-inverse` 3:1 on the inverse surface.
- **Samples:** `clay` (terracotta, squared controls, uppercase Jost) and `fern` (teal, pill controls, deliberately near the contrast limits). Preview with `?tenant=<slug>`.
- **Onboarding:** follow [guidelines/tenant-onboarding.md](guidelines/tenant-onboarding.md) and design the theme in `guidelines/theme-builder.html`.

## Repo layout

| Path | Contents |
|---|---|
| `components/<Name>/` | One folder per component: `.jsx`, `.d.ts`, `.css`, `README.md`. Helpers in `components/utils/`. |
| `tokens/` | Fonts, colours, type, spacing, effects, base styles, `character.css`, `tenants/`. |
| `guidelines/` | Foundation and component cards (`@dsCard`), brand guide, Theme builder, tenant onboarding. |
| `templates/storefront-*` | 17 bilingual storefront pages plus `storefront-site`, the click-through router. The source of truth for the storefront. |
| `templates/_shared/` | Shared header/footer/menu, routing, SEO, catalogue, delivery rules, translations. |
| `templates/communications/`, `previews/`, `deployment/` | Email/SMS/WhatsApp examples, theme previews, robots and sitemap samples. |
| `templates/_vendor/` | Offline React and Babel (7.29.0, hash-verified) for the cards; the window namespace is `VendraDesignSystem`. |
| `templates/_runtime/`, `dist/` | Generated: never edit. |
| `assets/` | Logos, social images, app icons, fonts, placeholders. |
| `uploads/` | Storefront OpenAPI spec. |
| `styles.css` | Global CSS entry (imports only). `SKILL.md` is the Agent Skill entry. |

## Commands

```sh
npm --prefix templates ci                # first setup
npm --prefix templates run dev           # Vite preview at http://127.0.0.1:5173/ with rebuilds
npm --prefix templates run build         # components, dist/, Tailwind, tenant CSS, generated template sections
npm --prefix templates run format        # Prettier
npm --prefix templates run check         # generated files current + formatting
npm --prefix templates test              # typecheck and unit tests
npm --prefix templates run test:e2e      # screenshot + axe checks of every card and storefront view
```

Where to edit storefront pages, Tailwind conventions and preview URLs: [templates/README.md](templates/README.md). Ownership and integration boundaries: [templates/MIGRATION.md](templates/MIGRATION.md). Working rules: [CLAUDE.md](CLAUDE.md).
