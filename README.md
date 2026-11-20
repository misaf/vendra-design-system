# Vendra — Design System

**Vendra** is a multi-tenant platform for florist websites. Each florist (tenant) gets a bilingual English/Persian storefront: catalogue, bag, checkout, delivery zones, account and order tracking. This repo contains the Next.js storefront and its design system. The reference tenant, **Vendra Florist** (گل‌فروشی وندرا), supplies the default theme.

- **Repo:** [misaf/vendra-design-system](https://github.com/misaf/vendra-design-system) (`master`). Related: [vendra](https://github.com/misaf/vendra) (Laravel platform), [vendra-storefront-florist](https://github.com/misaf/vendra-storefront-florist) (tenant storefront), [vendra-web](https://github.com/misaf/vendra-web) (product site).
- **Scope:** the customer-facing storefront only. Admin screens live in a separate framework; the storefront reads products, currency, delivery rules, hours and contact details as data.
- **Live florist pilot:** [roadmap audit and release gates](./docs/PILOT-AUDIT.md).
- **Rules and brand:** [src/design-system/gallery/brand-guide.md](src/design-system/gallery/brand-guide.md) covers voice, visual foundations, links vs buttons, routing, accessibility, payments and the release checklist.
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md): setup, the checks every change runs, and `npm run new:component -- Name` for a new component.

## Using the storefront design system

The [storefront UI](./docs/UI.md) owns Button, Input, Dialog, DatePicker, and the shared tokens, themes, and fonts. Routes import the controls they use directly. The App Router layout loads the storefront component styles and shared tokens, and `VendraProvider` supplies the locale and client navigation. Run `npm run dev:gallery` and open `/guidelines/ui-gallery.html` to try the shared components in Clay and Fern.

Tenant themes are generated from `src/design-system/tokens/tenants/<slug>.json`. The storefront theme generator in `src/design-system/tokens/tenant-theme.js` exposes `tenantCss`, `validate`, `checks`, and the design token helpers. It validates slugs, settings, and contrast before generating CSS.

Storefront rules live with the capability that owns them. The [storefront architecture guide](./docs/STOREFRONT.md) maps delivery, pricing, checkout, and other capabilities to their folders. The guideline cards call the same rules through the `commerce` entry point.

Pass the store's IANA `timeZone` in the options for `deliveryDays` and as the fifth argument to `deliverySlots` so dates, cutoffs, and slot lead times follow the store clock. Omission uses the device time zone, and invalid zones throw `RangeError`. Opening hours follow the same clock. `openingStatus` gives the next opening or closing time, `hoursSummary` groups the week for display, and `hoursExceptions` lists upcoming special hours. The reference tenant sets `VF_STORE.timeZone` (`Asia/Tehran`) and `VF_STORE.hours` in `src/storefront/store/store-config.js`.

Wrap the app in `VendraProvider` with the page's locale. Components that name their own buttons (Dialog's close, Carousel's arrows, QuantityInput's −/+, DatePicker's calendar…) then use their English or Persian built-in wording (each component's own `messages.js`, so a component carries only its own words), and React Aria formats numbers and dates for that locale. Props still win; `messages` adds a language or changes wording. `navigate` (your router's push) makes the components' links navigate client-side:

```jsx
import {VendraProvider} from './src/design-system/components/VendraProvider/VendraProvider.jsx';

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
- **One JSON per tenant.** `src/design-system/tokens/tenants/<slug>.json` (four colours, five character choices, optional hand-set shades) builds into `<slug>.css` via `src/design-system/tokens/tenant-theme.js`, the same generator as the Theme builder card. Shades are derived in OKLCH.
- **It overrides:** the palette ramps (`--petal/peony/ink/stem-*`), the semantic aliases, and the character tokens in `src/design-system/tokens/character.css` (display font, case, tracking, control and frame radii). Spacing, type scale, motion, focus ring, status colours and RTL rules are fixed.
- **Contrast:** `--accent` 4.5:1 with white text, `--text-accent` 4.5:1 on the page, `--border-input` 3:1, `--focus-ring-on-inverse` 3:1 on the inverse surface.
- **Samples:** `clay` (terracotta, squared controls, uppercase Jost) and `fern` (teal, pill controls, deliberately near the contrast limits). Preview with `?tenant=<slug>`.
- **Onboarding:** follow [src/design-system/gallery/tenant-onboarding.md](src/design-system/gallery/tenant-onboarding.md) and design the theme in `/guidelines/theme-builder.html`.

## Overriding the styles

The design system CSS sits in cascade layers, `vendra.tokens`, `vendra.base` and `vendra.components`, so your own CSS wins without specificity battles: anything unlayered (your stylesheets, tenant themes) overrides a component class, as does any layer declared after `vendra`. With Tailwind, declare the order before importing anything, so the preflight reset sits below the components and utilities above them:

```css
@layer theme, base, vendra, components, utilities;
@import './src/design-system/storefront.css';
@import 'tailwindcss';
```

Two rules stay `!important` on purpose: Persian text is never italic or letter-spaced. Load Leaflet's stylesheet (PlacesMap, LocationPicker) into the components' layer: `@import 'leaflet/dist/leaflet.css' layer(vendra.components);`. (The reference storefront declares Tailwind's layers first instead and keeps its page CSS in `vendra.components`, because that CSS was written against the components' specificity.)

## Design tokens for other platforms

`tokens.json` holds every token (colours, type, spacing, radii, shadows, motion, character) in the W3C design tokens format: `--peony-500` is `peony.500`, `--accent` is `accent.default`, and semantic tokens are aliases (`success.default` → `{leaf.700}`). A tenant changes only colours and character, so its tokens merge over the base file: the build writes sample tenant tokens to `src/design-system/tokens/design/tenants/<slug>.json`, and a theme from your database converts at runtime with `designTokens(tokens(spec).all)` from `src/design-system/tokens/tenant-theme.js`.

Style Dictionary (4+) turns them into native code, for example Swift and Jetpack Compose:

```js
import StyleDictionary from 'style-dictionary';

await new StyleDictionary({
  source: ['src/design-system/tokens/design/tokens.json', 'tenant.json'],
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
| `src/app/` | Next.js routes, layouts, metadata, and global CSS. |
| `src/storefront/` | Business capabilities with their rules, screens, styles, copy, and tests. The `session/` folder coordinates state across routes, and `shell/` owns navigation and page layout. |
| `src/communications/` | Customer language selection, email, SMS, WhatsApp, and previews. |
| `src/design-system/` | Reusable controls, design tokens, tenant themes, fonts, and gallery. |
| `src/platform/` | Laravel transport, browser integrations, tenant resolution, and locale parsing. |
| `public/assets/` | Public storefront and brand media. |
| `tools/` | Build and export helpers, component scaffolding, and dependency checks. |
| `e2e/`, `tests/` | Browser journeys, visual baselines, repository checks, and integration fixtures. |
| `.generated/` | Generated storefront CSS and tenant data. The static demo builds to `.generated/export/`. |
| `docs/` | Contributor guides and API contract notes. |

## Commands

```sh
npm ci                                   # first setup, at the repo root
npm run dev                             # Next.js storefront at http://localhost:3000/
npm run dev:gallery                     # storefront and design-system previews
npm run build   # design tokens, tenant themes and brand assets
npm run format  # Prettier
npm run check   # generated files current + formatting
npm test        # typecheck and unit tests
npm run test:e2e  # production storefront, then development fixtures/components
npm run test:e2e:build  # build once, then storefront/visual/accessibility/performance tests
npm run test:e2e:dev  # source fixtures, components, guidelines and gateway tests
```

Where to edit storefront pages, Tailwind conventions and preview URLs: [docs/STOREFRONT.md](./docs/STOREFRONT.md). Preview states and integration boundaries: [Demo behavior](./docs/STOREFRONT.md#demo-behavior).

## License

The project's original software and documentation are available under the [MIT License](./LICENSE).
Bundled third-party assets retain their own license terms.

- Icons and maps ([Lucide](./src/design-system/components/Icon/LICENSE.lucide), [Feather-derived icons](./src/design-system/components/Icon/LICENSE.feather), and [Leaflet](./public/assets/licenses/leaflet.txt)).
- Fonts under the SIL Open Font License ([Instrument Serif](./public/assets/licenses/instrument-serif-OFL.txt), [Jost](./public/assets/licenses/jost-OFL.txt), and [Vazirmatn](./public/assets/licenses/vazirmatn-OFL.txt)).
