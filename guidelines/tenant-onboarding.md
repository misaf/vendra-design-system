# Tenant onboarding — new florist storefront

A florist gets the same storefront as every other Vendra tenant. Only the **theme**, **brand assets** and **store data** change. Work through these in order. Every item has a clear owner and a "done when" check.

## 1. Theme (designer · ~1 hour)
- [ ] Open the **Theme builder** card (Brand group, `guidelines/theme-builder.html`). Start from the Vendra or Clay preset.
- [ ] Set the accent, neutral, ink and footer colours from the florist's brand. Set the heading font, case, accent-word style, control shape and image frame.
- [ ] **Done when:** all seven contrast checks read *Pass*.
- [ ] Enter the slug (lowercase, hyphens, e.g. `rose-and-moss`) and click **Copy tenant CSS**.
- [ ] Paste it into `tokens/tenants/<slug>.css`. The reference for every line is `tokens/tenants/_template.css.txt`.
- [ ] Add `@import url('tokens/tenants/<slug>.css');` to `styles.css`, above `components/components.css`.
- [ ] Set `data-tenant="<slug>"` on `<html>`. Check Home, Product and Bag in **both EN and FA**.
- Own font? Add its `@font-face` to the tenant file and put the family first in `--font-display`. Keep `'Vazirmatn'` second so Persian still renders.

## 2. Brand assets (florist supplies · designer prepares)
Never ship a tenant with Vendra Florist's logo. Until the real files arrive, the store name renders in `--font-display` (the kit already does this when `data-tenant` is set).

| File | Size / format | Used in |
|---|---|---|
| Horizontal logo, EN + FA | PNG/SVG, transparent, ≥ 112 px tall | Emails (light background) |
| Horizontal logo, light version | Same | Footer on the inverse colour |
| Mark / monogram | Square, ≥ 512 px | Favicon, app icon, sign-in |
| Social share image, EN + FA | 1200 × 630 | `og:image` |
| App icons | 16, 32, 180, 192, 512, maskable 512 | `assets/icons/` |

- [ ] Regenerate the social images and icons from `assets/brand-export-source.html` with the tenant's logo and colours.

## 3. Store data (florist · entered in admin)
The storefront reads all of this as data (`templates/_shared/store-config.js`, `catalog.js` and `delivery.js` stand in for the admin API, `uploads/openapi-*.json`). No component has it hard-coded.
- [ ] **Store name** in EN and FA. **Contact:** phone, WhatsApp, Instagram, address (EN + FA), map pin, opening hours.
- [ ] **Currency:** one active currency (Toman, Rial, USD, EUR or AED).
- [ ] **Delivery:** zones per country, with fee, same-day cut-off, time slots and free-delivery threshold.
- [ ] **Categories:** choose from the 12 standard ones (Bouquets … Sympathy) and give each one a 4:5 photo.
- [ ] **Products:** EN + FA name and subtitle, price (or "on request"), sizes, add-ons, 3:4 photos.
- [ ] **Payment:** card-to-card number, holder name EN + FA, Sheba. Choose which zones allow cash on delivery.
- [ ] **Policies:** Shipping & delivery, Returns & refunds, Privacy, Terms, in EN and FA. **Done when:** no SAMPLE banners remain.
- [ ] **Return policy per category** (feeds the product JSON-LD).

## 4. Copy (florist + writer)
- [ ] Hero eyebrow, two-beat headline (second beat is the accent word), and one-line intro, in EN and FA. Follow *Content fundamentals* in `readme.md`: "we" and "you", sentence case, no emoji, Persian written natively.
- [ ] Announcement bar text (optional).

## 5. Launch checks
- [ ] Work through the *Storefront release checklist* in `readme.md`.
- [ ] Theme builder contrast checks pass, and the *Contrast* card in Colors still passes with `data-tenant` set.
- [ ] The Florist JSON-LD has the real address, pin and Instagram.
