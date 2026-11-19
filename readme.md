# Vendra — Design System

**Vendra** is a multi-tenant platform for florist websites. Each florist (tenant) gets a bilingual English/Persian storefront: catalogue, bag, checkout, delivery zones, account and order tracking. This repo contains the Next.js storefront and its design system. The reference tenant, **Vendra Florist** (گل‌فروشی وندرا), supplies the default theme.

- **Repo:** [misaf/vendra-design-system](https://github.com/misaf/vendra-design-system) (`master`). Related: [vendra](https://github.com/misaf/vendra) (Laravel platform), [vendra-storefront-florist](https://github.com/misaf/vendra-storefront-florist) (tenant storefront), [vendra-web](https://github.com/misaf/vendra-web) (product site).
- **Scope:** the customer-facing storefront only. Admin screens live in a separate framework; the storefront reads products, currency, delivery rules, hours and contact details as data.
- **Rules and brand:** [guidelines/brand-guide.md](guidelines/brand-guide.md) covers voice, visual foundations, links vs buttons, routing, accessibility, payments and the release checklist.
- **Contributing:** [CONTRIBUTING.md](CONTRIBUTING.md): setup, the checks every change runs, and `npm run new:component -- Name` for a new component.

## Using the storefront design system

The private [UI workspace](packages/ui/) owns Button, Input, Dialog, DatePicker, and the shared tokens, themes, and fonts. The storefront imports components through `apps/storefront/shell/ds.js`. The App Router layout loads the storefront component styles and shared tokens, and `VendraProvider` supplies the locale and client navigation. Run `npm run dev` and open `/guidelines/ui-gallery.html` to try the shared components in Clay and Fern.

Tenant themes are generated from `packages/ui/tokens/tenants/<slug>.json`. The storefront theme generator in `packages/ui/tokens/tenant-theme.js` exposes `tenantCss`, `validate`, `checks`, and the design token helpers. It validates slugs, settings, and contrast before generating CSS.

`commerce` holds the storefront rules as pure functions that take the tenant's data: delivery zones and days, totals with promo and balance discounts, the payment methods a store offers (`PAYMENT_METHODS`, `paymentOptions`: each is a feature the store turns on in its settings) and its other optional parts (`STORE_FEATURES`, `storeFeatures`: promo codes, same-day delivery, weddings, journal, reminders, newsletter), the Checkout request and adapters from Vendra API records (`productFromApi`, `orderFromApi`…). The reference templates run on the same functions. Pass the store's IANA `timeZone` in `commerce.deliveryDays` options and as the fifth argument of `commerce.deliverySlots` so dates, cut-offs and slot lead times use the store clock. Omission preserves device-local behavior; invalid zones throw `RangeError`. Opening hours follow the same clock: `commerce.openingStatus(hours, now, timeZone)` says whether the store is open and when that next changes, from weekly hours plus dated exceptions (holidays); `hoursSummary` groups the week for display and `hoursExceptions` lists special hours coming up. The sample store sets `VF_STORE.timeZone` (`Asia/Tehran`) and `VF_STORE.hours` in `apps/storefront/shared/domain/store-config.js`; `VF_DELIVERY_TIME_ZONE` follows it.

Wrap the app in `VendraProvider` with the page's locale. Components that name their own buttons (Dialog's close, Carousel's arrows, QuantityInput's −/+, DatePicker's calendar…) then use their English or Persian built-in wording (each component's own `messages.js`, so a component carries only its own words), and React Aria formats numbers and dates for that locale. Props still win; `messages` adds a language or changes wording. `navigate` (your router's push) makes the components' links navigate client-side:

```jsx
import {VendraProvider} from './ds.js';

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
- **One JSON per tenant.** `packages/ui/tokens/tenants/<slug>.json` (four colours, five character choices, optional hand-set shades) builds into `<slug>.css` via `packages/ui/tokens/tenant-theme.js`, the same generator as the Theme builder card. Shades are derived in OKLCH.
- **It overrides:** the palette ramps (`--petal/peony/ink/stem-*`), the semantic aliases, and the character tokens in `packages/ui/tokens/character.css` (display font, case, tracking, control and frame radii). Spacing, type scale, motion, focus ring, status colours and RTL rules are fixed.
- **Contrast:** `--accent` 4.5:1 with white text, `--text-accent` 4.5:1 on the page, `--border-input` 3:1, `--focus-ring-on-inverse` 3:1 on the inverse surface.
- **Samples:** `clay` (terracotta, squared controls, uppercase Jost) and `fern` (teal, pill controls, deliberately near the contrast limits). Preview with `?tenant=<slug>`.
- **Onboarding:** follow [guidelines/tenant-onboarding.md](guidelines/tenant-onboarding.md) and design the theme in `guidelines/theme-builder.html`.

## Overriding the styles

The design system CSS sits in cascade layers, `vendra.tokens`, `vendra.base` and `vendra.components`, so your own CSS wins without specificity battles: anything unlayered (your stylesheets, tenant themes) overrides a component class, as does any layer declared after `vendra`. With Tailwind, declare the order before importing anything, so the preflight reset sits below the components and utilities above them:

```css
@layer theme, base, vendra, components, utilities;
@import './design-system/styles.css';
@import 'tailwindcss';
```

Two rules stay `!important` on purpose: Persian text is never italic or letter-spaced. Load Leaflet's stylesheet (PlacesMap, LocationPicker) into the components' layer: `@import 'leaflet/dist/leaflet.css' layer(vendra.components);`. (The reference storefront declares Tailwind's layers first instead and keeps its page CSS in `vendra.components`, because that CSS was written against the components' specificity.)

## Design tokens for other platforms

`tokens.json` holds every token (colours, type, spacing, radii, shadows, motion, character) in the W3C design tokens format: `--peony-500` is `peony.500`, `--accent` is `accent.default`, and semantic tokens are aliases (`success.default` → `{leaf.700}`). A tenant changes only colours and character, so its tokens merge over the base file: the build writes sample tenant tokens to `packages/ui/tokens/design/tenants/<slug>.json`, and a theme from your database converts at runtime with `designTokens(tokens(spec).all)` from `packages/ui/tokens/tenant-theme.js`.

Style Dictionary (4+) turns them into native code, for example Swift and Jetpack Compose:

```js
import StyleDictionary from 'style-dictionary';

await new StyleDictionary({
  source: ['packages/ui/tokens/design/tokens.json', 'tenant.json'],
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
| `apps/storefront/design-system/` | Components, tokens, styles, and fonts compiled by the storefront. |
| `apps/storefront/design-system/components/` | [Atomic Design](ATOMIC-DESIGN.md): atoms, molecules and organisms, one named folder per component. Helpers in `components/utils/`. |
| `packages/ui/tokens/` | Fonts, colours, type, spacing, effects, base styles, `character.css`, `tenants/`. |
| `guidelines/` | Foundation and component cards (`@dsCard`), brand guide, Theme builder, tenant onboarding. |
| `apps/storefront/features/*` | Feature screens, state, bilingual copy, styles, and UI. |
| `apps/storefront/shell/` | Shared storefront UI, navigation shell, and commerce session. |
| `apps/storefront/app/[locale]/` | TypeScript routes and layouts for shop, checkout and counter in both languages. |
| `apps/storefront/build/` | Build helpers for prerendered routes, the sitemap, precompression, page CSS, and tenants. |
| `tools/` | Repo tooling: the build (`build.mjs`, which generates design tokens and tenant themes via `tenants.mjs`/`brand.mjs`), the component generator (`new-component.mjs`) and the Atomic Design and import checks (`atomic.mjs`, `app-dependencies.mjs`); `paths.mjs` names the design system folder. Run through the `npm --prefix apps/storefront` scripts. |
| `apps/storefront/shared/` | Routing, SEO, catalogue, delivery rules and shared helpers. |
| `apps/storefront/server/`, `i18n/`, `styles/` | Server route data and metadata, shared bilingual copy, and storefront CSS. |
| `packages/ui/`, `packages/vendra-api/` | Private workspace boundaries for shared components and tokens, and the typed Laravel client. |
| `apps/storefront/communications/`, `deployment/` | Email/SMS/WhatsApp examples, robots and sitemap samples. |
| `apps/storefront/_vendor/` | Offline React and Babel (7.29.0, hash-verified) for the cards; the window namespace is `VendraDesignSystem`. |
| `apps/storefront/_runtime/`, `packages/ui/tokens/design/` | Generated: never edit. |
| `assets/` | Storefront and brand assets: logos, social images, app icons, placeholders. |
| `uploads/` | Storefront OpenAPI spec. |
| `apps/storefront/design-system/styles.css` | Global CSS entry (imports only). `SKILL.md` is the Agent Skill entry. |

## Commands

```sh
npm ci                                   # first setup, at the repo root
npm run dev                             # Next.js development at http://localhost:3000/
npm --prefix apps/storefront run build   # design tokens, Tailwind, tenant CSS, generated template sections
npm --prefix apps/storefront run format  # Prettier
npm --prefix apps/storefront run check   # generated files current + formatting
npm --prefix apps/storefront test        # typecheck and unit tests
npm --prefix apps/storefront run test:e2e  # production storefront, then development fixtures/components
npm --prefix apps/storefront run test:e2e:build  # build once, then storefront/visual/accessibility/performance tests
npm --prefix apps/storefront run test:e2e:dev  # source fixtures, components, guidelines and gateway tests
```

Where to edit storefront pages, Tailwind conventions and preview URLs: [apps/storefront/README.md](apps/storefront/README.md). Preview states and integration boundaries: [Demo behavior](apps/storefront/README.md#demo-behavior). Working rules: [CLAUDE.md](CLAUDE.md).
