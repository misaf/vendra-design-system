# Vendra — Design System

**Vendra** is a multi-tenant platform for florist websites. Each florist (tenant) gets a bilingual English/Persian storefront: catalogue, bag, checkout, delivery zones, account and order tracking. This repo is the shared visual and component layer those storefronts are built from. The reference tenant, **Vendra Florist** (گل‌فروشی وندرا), supplies the default theme.

- **Repo:** [misaf/vendra-design-system](https://github.com/misaf/vendra-design-system) (`master`). Related: [vendra](https://github.com/misaf/vendra) (Laravel platform), [vendra-storefront-florist](https://github.com/misaf/vendra-storefront-florist) (tenant storefront), [vendra-web](https://github.com/misaf/vendra-web) (product site).
- **Scope:** the customer-facing storefront only. Admin screens live in a separate framework; the storefront reads products, currency, delivery rules, hours and contact details as data.
- **Rules and brand:** [guidelines/brand-guide.md](guidelines/brand-guide.md) covers voice, visual foundations, links vs buttons, routing, accessibility, payments and the release checklist.
- **Contributing:** [CONTRIBUTING.md](CONTRIBUTING.md): setup, the checks every change runs, and `npm run new:component -- Name` for a new component.

## Using the package

`@vendra/design-system` publishes only `dist/`, which the build generates and commits. Install a tagged commit from GitHub (`npm install github:misaf/vendra-design-system#v0.1.0`). React 18.2+, `react-aria-components` 1.21+ and `@internationalized/date` 3.12+ are peer dependencies, so your app and the components share one React Aria copy.

| Import | What it is |
|---|---|
| `@vendra/design-system` | 71 components (with `VendraProvider`) plus `format`, `dates`, `commerce`, `maps` and `ICON_SVGS`: ES modules with types; server-render safe and marked `'use client'` for React Server Components. |
| `@vendra/design-system/styles.css` | Fonts (with metric-matched local fallbacks, so the font swap doesn't shift the layout), tokens, base styles and every `ag-*` class. Load once in the root layout, and preload the body fonts your pages use (`fonts/jost-var-latin.woff2`, `fonts/vazirmatn-var-arabic.woff2`) with `<link rel="preload" as="font" type="font/woff2" crossorigin>`. |
| `@vendra/design-system/theme` | `tenantCss(slug, spec)`, `validate`, `checks` (the seven contrast checks), `tokens`, `designTokens`, `email`, `VENDRA` (default spec). |
| `@vendra/design-system/tenants/<slug>.css` | The sample tenants built from `tokens/tenants/*.json`. |
| `@vendra/design-system/tokens.json` | Every design token as W3C design tokens (DTCG JSON), for native apps and design tools. |
| `@vendra/design-system/tokens/tenants/<slug>.json` | The tokens a sample tenant changes, to merge over `tokens.json`. |

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

`commerce` holds the storefront rules as pure functions that take the tenant's data: delivery zones and days, totals with promo and balance discounts, the payment methods a store offers (`PAYMENT_METHODS`, `paymentOptions`: each is a feature the store turns on in its settings), the Checkout request and adapters from Vendra API records (`productFromApi`, `orderFromApi`…). The reference templates run on the same functions.

Wrap the app in `VendraProvider` with the page's locale. Components that name their own buttons (Dialog's close, Carousel's arrows, QuantityInput's −/+, DatePicker's calendar…) then use their English or Persian built-in wording (each component's own `messages.js`, so a component carries only its own words), and React Aria formats numbers and dates for that locale. Props still win; `messages` adds a language or changes wording. `navigate` (your router's push) makes the components' links navigate client-side:

```jsx
import {VendraProvider} from '@vendra/design-system';

<VendraProvider
  locale={tenant.locale === 'fa' ? 'fa-IR' : 'en-US'}
  navigate={router.push}
  messages={{fa: {Dialog: {close: 'بستن پنجره'}}}}
>
  <App />
</VendraProvider>
```

Components take all copy, prices, currency and contact details as props. Run `checks(spec)` in the admin theme editor so a florist can't save a theme the storefront would refuse.

## Tenant themes

- **Tokens only.** Components read semantic tokens (`--accent`, `--surface-*`, `--text-*`, `--radius-arch`). A tenant overrides them under `[data-tenant="<slug>"]`; never fork component CSS.
- **One JSON per tenant.** `tokens/tenants/<slug>.json` (four colours, five character choices, optional hand-set shades) builds into `<slug>.css` via `templates/_shared/tenant-theme.js`, the same generator as the Theme builder card. Shades are derived in OKLCH.
- **It overrides:** the palette ramps (`--petal/peony/ink/stem-*`), the semantic aliases, and the character tokens in `tokens/character.css` (display font, case, tracking, control and frame radii). Spacing, type scale, motion, focus ring, status colours and RTL rules are fixed.
- **Contrast:** `--accent` 4.5:1 with white text, `--text-accent` 4.5:1 on the page, `--border-input` 3:1, `--focus-ring-on-inverse` 3:1 on the inverse surface.
- **Samples:** `clay` (terracotta, squared controls, uppercase Jost) and `fern` (teal, pill controls, deliberately near the contrast limits). Preview with `?tenant=<slug>`.
- **Onboarding:** follow [guidelines/tenant-onboarding.md](guidelines/tenant-onboarding.md) and design the theme in `guidelines/theme-builder.html`.

## Overriding the styles

The package CSS sits in cascade layers, `vendra.tokens`, `vendra.base` and `vendra.components`, so your own CSS wins without specificity battles: anything unlayered (your stylesheets, tenant themes) overrides a component class, as does any layer declared after `vendra`. With Tailwind, declare the order before importing anything, so the preflight reset sits below the components and utilities above them:

```css
@layer theme, base, vendra, components, utilities;
@import '@vendra/design-system/styles.css';
@import 'tailwindcss';
```

Two rules stay `!important` on purpose: Persian text is never italic or letter-spaced. Load Leaflet's stylesheet (PlacesMap, LocationPicker) into the components' layer: `@import 'leaflet/dist/leaflet.css' layer(vendra.components);`. (The reference storefront declares Tailwind's layers first instead and keeps its page CSS in `vendra.components`, because that CSS was written against the components' specificity.)

## Design tokens for other platforms

`tokens.json` holds every token (colours, type, spacing, radii, shadows, motion, character) in the W3C design tokens format: `--peony-500` is `peony.500`, `--accent` is `accent.default`, and semantic tokens are aliases (`success.default` → `{leaf.700}`). A tenant changes only colours and character, so its tokens merge over the base file: the sample tenants ship as `tokens/tenants/<slug>.json`, and a theme from your database converts at runtime with `designTokens(tokens(spec).all)` from `@vendra/design-system/theme`.

Style Dictionary (4+) turns them into native code, for example Swift and Jetpack Compose:

```js
import StyleDictionary from 'style-dictionary';

await new StyleDictionary({
  source: ['node_modules/@vendra/design-system/dist/tokens/tokens.json', 'tenant.json'],
  platforms: {
    ios: {transformGroup: 'ios-swift', buildPath: 'ios/', files: [{destination: 'Tokens.swift', format: 'ios-swift/class.swift', options: {className: 'VendraTokens'}}]},
    android: {transformGroup: 'compose', buildPath: 'android/', files: [{destination: 'Tokens.kt', format: 'compose/object', options: {className: 'VendraTokens', packageName: 'com.vendra'}}]}
  }
}).buildAllPlatforms();
```

Later sources win, so the tenant file overrides the base colours (Style Dictionary logs each override as a collision). Sizes in `rem` become points/dp at 16 per rem.

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
npm ci                                   # first setup, at the repo root (templates is a workspace)
npm --prefix templates run dev           # Vite preview at http://127.0.0.1:5173/ with rebuilds
npm --prefix templates run build         # components, dist/, Tailwind, tenant CSS, generated template sections
npm --prefix templates run format        # Prettier
npm --prefix templates run check         # generated files current + formatting
npm --prefix templates test              # typecheck and unit tests
npm --prefix templates run test:e2e      # screenshot + axe checks of every card and storefront view
```

Where to edit storefront pages, Tailwind conventions and preview URLs: [templates/README.md](templates/README.md). Ownership and integration boundaries: [templates/MIGRATION.md](templates/MIGRATION.md). Working rules: [CLAUDE.md](CLAUDE.md).
