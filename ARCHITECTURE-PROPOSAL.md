# Route-first florist architecture proposal

Consolidate the florist storefront into one Next.js app at the repository root. Put route-specific components, state, copy, and tests beside the route that uses them. Give shared UI, business rules, session state, and Laravel integration each a clear owner inside the app.

Today a checkout change can span a Next.js route, a screen, a view, a separate layout component, and storefront shell code. Shared controls also pass through `shell/ds.js`, which combines app-local components and workspace package exports. The proposed structure gives developers one starting point for a page and one place to fix a rule shared by multiple pages.

## Target structure

```text
vendra-design-system/
├── app/
│   ├── layout.tsx                       # Root document and persistent session provider
│   ├── not-found.tsx
│   └── [locale]/
│       ├── layout.tsx                   # Locale validation and locale-specific setup
│       ├── error.tsx
│       ├── (storefront)/
│       │   ├── layout.tsx               # Storefront header, footer, and navigation
│       │   ├── page.tsx                 # Home
│       │   ├── shop/
│       │   │   ├── page.tsx
│       │   │   ├── _components/ShopFilters.tsx
│       │   │   └── [category]/page.tsx
│       │   ├── product/[code]/
│       │   │   ├── page.tsx
│       │   │   └── ProductGallery.tsx
│       │   ├── search/page.tsx
│       │   ├── saved/page.tsx
│       │   ├── signin/page.tsx
│       │   ├── account/
│       │   │   ├── page.tsx
│       │   │   └── ProfileForm.tsx
│       │   ├── track/page.tsx
│       │   ├── journal/
│       │   │   ├── page.tsx
│       │   │   └── [post]/page.tsx
│       │   ├── contact/page.tsx
│       │   ├── weddings/page.tsx
│       │   ├── faq/page.tsx
│       │   └── policy/
│       │       ├── page.tsx
│       │       └── [document]/page.tsx
│       ├── (checkout)/
│       │   ├── layout.tsx               # Shared checkout header
│       │   ├── bag/
│       │   │   ├── page.tsx
│       │   │   └── DeliveryForm.tsx
│       │   └── checkout/
│       │       ├── page.tsx
│       │       ├── ReceiptFields.tsx
│       │       ├── useCheckout.ts
│       │       └── checkout.test.mjs
│       └── presentation/
│           ├── page.tsx
│           └── PresentationScreen.tsx
├── components/
│   ├── ui/                              # Reusable controls and provider
│   ├── StorefrontHeader.tsx
│   ├── StorefrontFooter.tsx
│   └── OrderSummaryCard.tsx             # Used by checkout and tracking
├── domain/                              # Shared cart, pricing, and delivery logic
├── session/                             # State shared across routes and locales
├── server/
│   ├── tenant.ts
│   └── vendra/                          # Laravel client, wire types, and response parsing
├── i18n/
├── styles/                              # Global styles, tokens, and themes
├── public/
├── tests/e2e/
├── guidelines/                          # Design-system gallery and guidance
├── tools/
├── .github/
├── next.config.mjs
├── package.json
└── package-lock.json
```

The tree shows the main ownership boundaries. File extensions are illustrative. Move existing modules in their current language and convert them separately when useful.

## File placement

- **Start at the route.** A page can handle parameters, initial data, and metadata, then render a nearby client component for interactive behavior. Keep small pages in `page.tsx`. Put helpers shared by sibling routes at their nearest common parent, such as `shop/_components/` for the shop index and category page.
- **Use route groups for real layout differences.** The storefront and checkout share different chrome. The group names stay out of URLs such as `/en/shop/` and `/en/checkout/`. Keep the session provider above `[locale]` so switching language preserves the active bag and checkout.
- **Keep reusable UI in one place.** Move shared controls into `components/ui/` and import them directly. Keep cross-route compositions such as the order summary in `components/`. Feature-specific UI stays with its route. The gallery should exercise the same controls the storefront uses.
- **Keep business rules and transport independent of rendering.** Pure storefront rules belong in `domain/`, persistent browser state in `session/`, and live Laravel transport and response validation in `server/vendra/`. The storefront supplies tenant, locale, and customer session context on the server. Laravel remains authoritative for pricing, inventory, delivery, and orders. Keep demo fixtures explicit.

## Migration sequence

1. **Prove the pattern with catalog.** Bring shop, category, and product code beside their routes. Consolidate their live requests behind one typed, tenant-aware server client. Exercise English and Persian, the Pages export, and a configured server with an HTTP fixture that checks tenant headers and catalog failure behavior.
2. **Move storefront UI and adopt real layouts.** Move controls, tokens, and themes into the app, update direct imports, and repoint the gallery, generator, styles, and dependency checks. Move the header and footer into the storefront layout and the checkout header into the checkout layout. Keep the session above both. Migrate account, tracking, content, and counter pages in reviewable groups.
3. **Move the app to the root after consumers are migrated.** Update npm scripts, CI working directories, TypeScript and lint paths, asset preparation, and Pages artifact paths together. Remove the workspace declarations and compatibility paths after the storefront, gallery, and tooling all use the new locations.

Exercise canonical URLs, existing fallback and legacy links, locale and direction, bag continuity, checkout recovery, and the offline counter during the migration. Compare the server and static-export builds, including the Pages base path. Use the order contract to track the backend gates for enabling live ordering. [Laravel order contract](apps/florist/ORDER-CONTRACT.md)
