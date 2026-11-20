# Vendra — Design System

**Vendra** is a multi-tenant platform for florist websites. Each florist (tenant) gets a bilingual English/Persian storefront: catalogue, bag, checkout, delivery zones, account and order tracking. This repo contains the Next.js storefront and its design system. The reference tenant, **Vendra Florist** (گل‌فروشی وندرا), supplies the default theme.

- **Repo:** [misaf/vendra-design-system](https://github.com/misaf/vendra-design-system) (`master`). Related: [vendra](https://github.com/misaf/vendra) (Laravel platform), [vendra-storefront-florist](https://github.com/misaf/vendra-storefront-florist) (tenant storefront), [vendra-web](https://github.com/misaf/vendra-web) (product site).
- **Scope:** the customer-facing storefront only. Admin screens live in a separate framework; the storefront reads products, currency, delivery rules, hours and contact details as data.
- **Live florist pilot:** [roadmap audit and release gates](./docs/PILOT-AUDIT.md).
- **Rules and brand:** [guidelines/brand-guide.md](./guidelines/brand-guide.md) covers voice, visual foundations, links vs buttons, routing, accessibility, payments and the release checklist.
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md): setup, the checks every change runs, and `npm run new:component -- Name` for a new component.

## Using the storefront design system

The [storefront UI](./docs/UI.md) owns Button, Input, Dialog, DatePicker, and the shared tokens, themes, and fonts. Routes import the controls they use directly. The App Router layout loads the storefront component styles and shared tokens, and `VendraProvider` supplies the locale and client navigation. Run `npm run dev` and open `/guidelines/ui-gallery.html` to try the shared components in Clay and Fern.

Tenant themes are generated from `ui/tokens/tenants/<slug>.json`. The storefront theme generator in `ui/tokens/tenant-theme.js` exposes `tenantCss`, `validate`, `checks`, and the design token helpers. It validates slugs, settings, and contrast before generating CSS.

`commerce` holds the storefront rules as pure functions that take the tenant's data: delivery zones and days, totals with promo and balance discounts, the payment methods a store offers (`PAYMENT_METHODS`, `paymentOptions`: each is a feature the store turns on in its settings) and its other optional parts (`STORE_FEATURES`, `storeFeatures`: promo codes, same-day delivery, weddings, journal, reminders, newsletter), the Checkout request and adapters from Vendra API records (`productFromApi`, `orderFromApi`…). The reference templates run on the same functions. Pass the store's IANA `timeZone` in `commerce.deliveryDays` options and as the fifth argument of `commerce.deliverySlots` so dates, cut-offs and slot lead times use the store clock. Omission preserves device-local behavior; invalid zones throw `RangeError`. Opening hours follow the same clock: `commerce.openingStatus(hours, now, timeZone)` says whether the store is open and when that next changes, from weekly hours plus dated exceptions (holidays); `hoursSummary` groups the week for display and `hoursExceptions` lists special hours coming up. The sample store sets `VF_STORE.timeZone` (`Asia/Tehran`) and `VF_STORE.hours` in `domain/store-config.js`; `VF_DELIVERY_TIME_ZONE` follows it.

Wrap the app in `VendraProvider` with the page's locale. Components that name their own buttons (Dialog's close, Carousel's arrows, QuantityInput's −/+, DatePicker's calendar…) then use their English or Persian built-in wording (each component's own `messages.js`, so a component carries only its own words), and React Aria formats numbers and dates for that locale. Props still win; `messages` adds a language or changes wording. `navigate` (your router's push) makes the components' links navigate client-side:

```jsx
import {VendraProvider} from './ui/components/VendraProvider/VendraProvider.jsx';

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
- **One JSON per tenant.** `ui/tokens/tenants/<slug>.json` (four colours, five character choices, optional hand-set shades) builds into `<slug>.css` via `ui/tokens/tenant-theme.js`, the same generator as the Theme builder card. Shades are derived in OKLCH.
- **It overrides:** the palette ramps (`--petal/peony/ink/stem-*`), the semantic aliases, and the character tokens in `ui/tokens/character.css` (display font, case, tracking, control and frame radii). Spacing, type scale, motion, focus ring, status colours and RTL rules are fixed.
- **Contrast:** `--accent` 4.5:1 with white text, `--text-accent` 4.5:1 on the page, `--border-input` 3:1, `--focus-ring-on-inverse` 3:1 on the inverse surface.
- **Samples:** `clay` (terracotta, squared controls, uppercase Jost) and `fern` (teal, pill controls, deliberately near the contrast limits). Preview with `?tenant=<slug>`.
- **Onboarding:** follow [guidelines/tenant-onboarding.md](./guidelines/tenant-onboarding.md) and design the theme in `guidelines/theme-builder.html`.

## Overriding the styles

The design system CSS sits in cascade layers, `vendra.tokens`, `vendra.base` and `vendra.components`, so your own CSS wins without specificity battles: anything unlayered (your stylesheets, tenant themes) overrides a component class, as does any layer declared after `vendra`. With Tailwind, declare the order before importing anything, so the preflight reset sits below the components and utilities above them:

```css
@layer theme, base, vendra, components, utilities;
@import './ui/storefront.css';
@import 'tailwindcss';
```

Two rules stay `!important` on purpose: Persian text is never italic or letter-spaced. Load Leaflet's stylesheet (PlacesMap, LocationPicker) into the components' layer: `@import 'leaflet/dist/leaflet.css' layer(vendra.components);`. (The reference storefront declares Tailwind's layers first instead and keeps its page CSS in `vendra.components`, because that CSS was written against the components' specificity.)

## Design tokens for other platforms

`tokens.json` holds every token (colours, type, spacing, radii, shadows, motion, character) in the W3C design tokens format: `--peony-500` is `peony.500`, `--accent` is `accent.default`, and semantic tokens are aliases (`success.default` → `{leaf.700}`). A tenant changes only colours and character, so its tokens merge over the base file: the build writes sample tenant tokens to `ui/tokens/design/tenants/<slug>.json`, and a theme from your database converts at runtime with `designTokens(tokens(spec).all)` from `ui/tokens/tenant-theme.js`.

Style Dictionary (4+) turns them into native code, for example Swift and Jetpack Compose:

```js
import StyleDictionary from 'style-dictionary';

await new StyleDictionary({
  source: ['ui/tokens/design/tokens.json', 'tenant.json'],
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
| `app/[locale]/` | Next.js routes with their screens, state, copy, styling and tests. |
| `ui/` | Reusable components, design tokens, themes, and fonts. |
| `components/storefront/` | Header, footer, checkout chrome and UI used across routes. |
| `domain/`, `session/` | Storefront rules and state shared across routes and locales. |
| `server/vendra/` | Laravel transport and response adapters. |
| `shared/`, `i18n/`, `styles/` | Browser helpers, translations, and global styles. |
| `guidelines/` | Design-system gallery, brand guide and theme builder. |
| `build/`, `next/`, `tools/` | Build and export helpers, component scaffolding and dependency checks. |
| `e2e/`, `tests/` | Browser journeys, smoke specs, visual baselines, unit and integration checks. The OpenAPI snapshot is in `tests/fixtures/`. |
| `assets/` | Public storefront and brand assets copied into the build. |
| `communications/`, `deployment/` | Communications templates and deployment examples. |
| `_runtime/`, `ui/tokens/design/` | Generated styles and tokens. |

## Commands

```sh
npm ci                                   # first setup, at the repo root
npm run dev                             # Next.js development at http://localhost:3000/
npm run build   # design tokens, Tailwind, tenant CSS, generated template sections
npm run format  # Prettier
npm run check   # generated files current + formatting
npm test        # typecheck and unit tests
npm run test:e2e  # production storefront, then development fixtures/components
npm run test:e2e:build  # build once, then storefront/visual/accessibility/performance tests
npm run test:e2e:dev  # source fixtures, components, guidelines and gateway tests
```

Where to edit storefront pages, Tailwind conventions and preview URLs: [docs/STOREFRONT.md](./docs/STOREFRONT.md). Preview states and integration boundaries: [Demo behavior](./docs/STOREFRONT.md#demo-behavior).
