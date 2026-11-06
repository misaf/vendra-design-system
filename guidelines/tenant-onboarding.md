# Tenant onboarding — new florist storefront

A florist gets the same storefront as every other Vendra tenant. Only the **theme**, **brand assets** and **store data** change. Work through these in order. Every item has a clear owner and a "done when" check.

## 1. Theme (designer · ~1 hour)
- [ ] Open the **Theme builder** card (Brand group, `guidelines/theme-builder.html`). In **Start from**, pick Vendra or an existing tenant.
- [ ] Set the accent, neutral, ink and footer colours from the florist's brand. Set the heading font, case, accent-word style, control shape and image frame. Every other shade is generated from those four colours.
- [ ] **Done when:** all seven contrast checks read *Pass*.
- [ ] Enter the slug (lowercase, hyphens, e.g. `rose-and-moss`) and click **Copy `<slug>.json`**.
- [ ] Save it as `packages/design-system/tokens/tenants/<slug>.json` and run `npm --prefix apps/storefront run build`. The build writes `packages/design-system/tokens/tenants/<slug>.css` and the tenant's email palette in `apps/storefront/communications/email-templates.js` (never edit either by hand) and refuses a theme that fails any of the seven checks.
- [ ] Preview it with `?tenant=<slug>` on any storefront URL. Check Home, Product and Bag in **both EN and FA**.
- [ ] For the florist's own deployment, set `tenant: '<slug>'` in `apps/storefront/shared/domain/store-config.js` and rebuild. The storefront then loads only `packages/design-system/tokens/tenants/<slug>.css`; nothing else needs editing (cards that compare tenants pick it up from the generated `packages/design-system/tokens/tenants.css`).

**The tenant JSON**
- `colours`: `accent`, `neutral`, `ink` and `footer`, each `#RRGGBB`.
- `character`: `headings` (`serif`, `sans`, `vazir`), `case` (`none`, `uppercase`), `accentWord` (`italic`, `upright`), `controls` (`pill`, `square`), `frame` (`arch`, `soft`, `square`).
- `overrides` (optional): a generated shade the designer wants to set by hand, for example `{"--border-input": "#847E70"}`. Only shade names are accepted (`--peony-*`, `--petal-*`, `--ink-*`, `--stem-*`, `--border-input`). Changing a base colour in the Theme builder drops the overrides tuned for it.
- `font` (optional): the florist's own brand font — see **Brand font** below.
- `description` (optional): one line, copied into the generated CSS.
- Other top-level fields (such as `brand`, below) are allowed and checked separately.

**Brand font**
Instrument Serif, Jost and Vazirmatn stay the built-in presets. A tenant with its own licensed typeface (Latin, Persian or both — for example Yekan Bakh, IRANSans, Dana or a licensed serif) adds a `font` object; no package change is needed:

```json
"font": {
  "family": "Yekan Bakh",
  "licence": "Commercial web licence, bought 2026-10 for rose-and-moss.ir",
  "files": {
    "latin": "assets/tenants/rose-and-moss/fonts/yekan-bakh-latin.woff2",
    "arabic": "assets/tenants/rose-and-moss/fonts/yekan-bakh-arabic.woff2"
  },
  "weight": "300 700",
  "body": false
}
```

- `family`: the CSS family name — letters, digits, spaces and hyphens, never a built-in name (`Instrument Serif`, `Jost`, `Vazirmatn` or their `Fallback` faces).
- `licence`: under which licence the files are served. Required: confirm the licence covers self-hosting on the florist's domain before adding a font.
- `files`: self-hosted **WOFF2** only, under `assets/` (keep them in `assets/tenants/<slug>/fonts/`), one per script: `latin`, `arabic` or both. Each gets its own `unicode-range`, so a page downloads only the scripts it shows. The build refuses a missing file or one that isn't WOFF2.
- `weight` (optional): one weight (`"400"`, the default) or a variable font's range (`"300 700"`), in hundreds.
- `body` (optional): `true` also sets body text in the brand font; by default it covers headings only.
- **Fallback:** `character.headings` still picks a preset, which follows the brand family in the stack. It renders whichever script the brand files leave out (Vazirmatn for Persian in every preset) and shows while the font loads (`font-display: swap`); choose the preset closest in shape. Emails use the preset, as mail clients don't load web fonts.
- The generated CSS starts with the font's `@font-face` rules. Prerendered pages of the florist's own deployment preload only the current language's file (English → `latin`, Persian → `arabic`).
- The seven contrast checks and the type scale are unchanged. Still check Home, Product and Bag in **both EN and FA**: a brand font with a larger or smaller x-height may need a different preset or weight.
- Apps that render stored themes with `tenantCss()` pass `assetBase` (default `/`, or e.g. `https://cdn.example.com/`) to say where `assets/` is served, and can add `fontPreloads(spec, lang, assetBase)` as `<link rel="preload" as="font" type="font/woff2" crossorigin>` tags.

**Validating a theme outside the build**
The package publishes these rules as a JSON Schema (draft 2020-12): `@vendra/design-system/theme.schema.json` (`node_modules/@vendra/design-system/dist/theme.schema.json`). The build generates it from the same `CHOICES` and shade names that `validate()` uses, so a package upgrade brings any new option with it; `schema()` in `@vendra/design-system/theme` returns the same object.
- A backend (for example Laravel with a PHP JSON Schema library) validates a theme against it before saving, and an admin form can build its fields and dropdowns from its `enum` lists.
- The schema accepts and rejects exactly what `validate()` does. It can't check contrast: run `checks()` (or `tenantCss()`, which refuses a failing theme) before a theme goes live.

## 2. Brand assets (florist supplies · designer prepares)
Until approved artwork arrives, omit the logo fields to show the localized store name. Add an optional `brand` object to `packages/design-system/tokens/tenants/<slug>.json` (see Clay for a complete example). Keep files under `assets/tenants/<slug>/`; paths start with `assets/` and are relative to the deployment root. The production build copies this folder.

| Field | Format / size | Use |
|---|---|---|
| `logo` | `{src, width, height, alt: {en, fa}}`; SVG preferred, or transparent PNG at least 112 px tall | Header; localized alt defaults to the store name |
| `logoMark` | Optional square image with the same fields, at least 512 × 512 | Compact header; falls back to `logo` |
| `logoOnDark` | Optional light artwork with the same fields | Dark footer; falls back to `logo`, then text |
| `shortName` | Optional `{en, fa}`, at most 12 characters each | Name under the installed app's icon; falls back to the full store name |
| `icons` | `favicon` (32 × 32 PNG), `apple` (180 × 180 PNG), `app192` (192 × 192 PNG), `app512` (512 × 512 PNG), `maskable` (512 × 512 PNG) plus an optional `favicon16` (16 × 16 PNG) | Browser tab and installed app; supply the complete set (without `favicon16`, browsers scale the 32 px icon) |
| `ogImage` | `{en, fa}` paths to 1200 × 630 PNG/JPEG images | Localized social previews |

For a deployment-specific override, set `VF_STORE.brandAssets` in `apps/storefront/shared/domain/store-config.js` using the same fields. It overrides that store's tenant assets; other tenant previews retain their own assets. `VF_STORE.brand` remains the localized text name.

- [ ] Prepare approved logo, compact mark and light footer artwork. Check contrast against the actual header and footer colours in both languages; transparent artwork must remain readable. Keep essential maskable artwork inside the central 80% circle.
- [ ] Export PNG icons in the sizes above (the build accepts prepared files; it does not resize them). `assets/brand-export-source.html` is a starting point. Supply localized social images.
- [ ] Run `npm run build`. The build checks asset references and logo dimensions, and generates `assets/tenants/<slug>/manifest-en.webmanifest` and `manifest-fa.webmanifest` (name, short name, the theme's page colour as `theme_color` and `background_color`, and the app icons). Never edit these manifests by hand. Omitted icons and social images use the shared defaults, so replace both before launch.
- [ ] Preview `?tenant=<slug>` in EN and FA at desktop and phone widths. Confirm logo proportions, text fallback, browser icon, manifest icon URLs and `og:image`. Logo bounds use `--brand-logo-height` (36px), `--brand-logo-mobile-height` (28px), `--brand-logo-footer-height` (56px) and `--brand-logo-width` (220px), without changing header height.

## 3. Store data (florist · entered in admin)
The storefront reads all of this as data (`apps/storefront/shared/domain/store-config.js`, `catalog.js` and `delivery.js` stand in for the admin API, `uploads/openapi-*.json`). No component has it hard-coded.
- [ ] **Store name** in EN and FA. **Contact:** phone, WhatsApp, Instagram, address (EN + FA), map pin, opening hours.
- [ ] **Currency:** one active currency. Toman and Rial are built in; for any other (USD, EUR, AED…) supply its rate per Toman in the store's `currencies` table and keep it current — `money()` throws for a currency without a rate.
- [ ] **Delivery:** zones per country, with fee, same-day cut-off, time slots and free-delivery threshold.
- [ ] **Categories:** choose from the 12 standard ones (Bouquets … Sympathy) and give each one a 4:5 photo.
- [ ] **Products:** EN + FA name and subtitle, price (or "on request"), sizes, add-ons, 3:4 photos.
- [ ] **Payment:** card-to-card number, holder name EN + FA, Sheba. Choose which zones allow cash on delivery.
- [ ] **Policies:** Shipping & delivery, Returns & refunds, Privacy, Terms, in EN and FA. **Done when:** no SAMPLE banners remain.

## 4. Copy (florist + writer)
- [ ] Hero eyebrow, two-beat headline (second beat is the accent word), and one-line intro, in EN and FA. Follow *Content fundamentals* in `brand-guide.md`: "we" and "you", sentence case, no emoji, Persian written natively.
- [ ] Announcement bar text (optional).

## 5. Launch checks
- [ ] Work through the *Storefront release checklist* in `brand-guide.md`.
- [ ] Theme builder contrast checks pass, and the *Contrast* card in Colors still passes with `data-tenant` set.
- [ ] `store-config.js` has the real address, map pin, hours and contact links.
- [ ] Claim the shop on **Neshan** and **Balad** (and Google Business Profile), with the same name (EN + FA), address, map pin, phone, WhatsApp and opening hours as `store-config.js`. The contact page, footer and Florist structured data all read that one block, so the listings match the site; "Get directions" opens the map pin in Neshan, Balad and Google Maps (Neshan and Balad first in Persian).
