# Vendra — Design System

**Vendra** is a **multi-tenant platform for building florist websites**: each florist (tenant) gets a bilingual storefront — catalogue, bag, checkout, delivery zones, account and order tracking — powered by shared components and configured through admin data (products, currency, delivery rules, hours, contact). This design system is the shared visual + component layer every tenant storefront is built from.

The reference tenant shipped with the system is **Vendra Florist** (below). Its brand (logo, peony/stem palette, arch motif) is the *default theme*; other tenants keep the same components, layout rules and semantic tokens and swap brand assets + accent tokens.

**Source:** local codebase `Vendra Florist/` (attached folder — an existing design-system export: tokens, 47 React components, foundation cards, storefront compositions, fonts, logos, an OpenAPI spec in `uploads/`). All files were imported verbatim; only the window namespace was renamed to `VendraDesignSystem_f4f210`.

## Multi-tenancy notes
- **Theme by tokens only.** Components reference semantic tokens (`--accent`, `--surface-*`, `--text-*`, `--radius-arch`). A tenant theme overrides those in its own CSS scope; never fork component CSS.
- **Copy & settings come from data.** No component hard-codes copy, currency, phone or address — the templates read them from `templates/_shared/store-config.js`, `catalog.js` and `delivery.js`, standing in for per-tenant admin data / the API in `uploads/openapi-*.json`.
- **Tenant brand assets** replace `assets/logo-*`, `assets/social/*` and `assets/icons/*`; regenerate from `assets/logo-source.html` / `brand-export-source.html`.
- Admin screens are out of scope (separate framework).
- **No separate platform brand.** The Vendra Florist look *is* the system; Vendra itself has no logo or marketing identity here.

### Tenant themes
**Onboarding a new florist:** follow `guidelines/tenant-onboarding.md` (theme → brand assets → store data → copy → launch checks). Generate the theme with the **Theme builder** card (Brand group); `tokens/tenants/_template.css.txt` documents every line.

A florist restyles its storefront by setting `data-tenant="<slug>"` on `<html>` (or any wrapper) and shipping one token file in `tokens/tenants/<slug>.css`. That file overrides:
- **Palette ramps:** `--petal-*` (neutrals), `--peony-*` (accent), `--ink-*` (text), `--stem-*` (brand dark). Components use these ramps directly too, so override every step.
- **Semantic aliases:** re-declare `--surface-*`, `--text-*`, `--accent*`, `--border-*` and `--shadow-*` in the same scope. CSS variables resolve where they're declared, so aliases inherited from `:root` would keep the default colours.
- **Character** (`tokens/character.css`): `--font-display` (a bundled family or the tenant's own `@font-face`), `--tracking-display`, `--display-case`, `--accent-font-style` / `--accent-font-weight` (the accent word in headings), `--radius-control` (buttons, tags, badges, steppers, pill tabs, language switch), `--button-case` + `--tracking-button`, `--radius-sm/md/lg` (inputs, cards, dialogs) and `--radius-arch` (image frames).
- **Fixed for everyone:** spacing, type scale, motion, focus ring, semantic status colours, layout, RTL rules.
- **Contrast:** `--accent` must hit 4.5:1 with white text, `--text-accent` 4.5:1 on `--surface-page`, `--border-input` 3:1, and `--focus-ring-on-inverse` 3:1 on `--surface-inverse` (a very light footer colour can fail it).
- **Logos:** the tenant supplies its own. Until it does, render the store name in `--font-display`, never the Vendra Florist PNGs (the templates render this name).

Sample: `tokens/tenants/clay.css` — terracotta accent, sand neutrals, olive inverse; uppercase Jost headings with upright terracotta accent words; 2px squared buttons, tags and inputs; uppercase tracked button labels; square image frames instead of the arch. Persian is unaffected by case and tracking (no case; letter-spacing is forced to 0). Compare it with the default in the *Tenant themes* card (Brand), or open `templates/storefront-site/StorefrontSite.dc.html?tenant=clay`.

---

## Reference tenant: Vendra Florist

**Vendra Florist** (Persian: **گل‌فروشی وندرا**) is a modern florist studio: hand-tied seasonal bouquets, dried arrangements and potted plants, sold in-store and online. The brand is **bilingual — English and Persian (فارسی)** — and every surface must work left-to-right and right-to-left.

> **Logo:** an arch mark (italic *V* inside a rounded-top arch; Persian: و) plus a wordmark — "Vendra" in Instrument Serif over "FLORIST" in spaced Jost caps (Persian: وندرا over گل‌فروشی, Vazirmatn). Two lockups: **horizontal** (`logo-horizontal*.png`) for the site header, emails and anything under 120px tall; **stacked** (`logo-stacked*.png`) for social, packaging, footer and print. The mark alone (`logo-mark*.png`) is for favicons, app icons and sizes under 40px. Colour: peony mark + ink name on light surfaces; `-light` versions (blush mark + petal name) on ink or stem. These are the Vendra Florist (default tenant) logos only — other tenants supply their own (see *Tenant themes*). Never recolour outside these, rotate, outline or add effects. Vector source: `assets/logo-source.html`; social images and app icons: `assets/brand-export-source.html`. Persian name: گل‌فروشی وندرا (confirmed).

**Original brief (from the source repo):** "Store florist with bohemia stylish; multi language (english, persian)".

## Store contact
- **Address:** Azimiyeh, Karaj, Alborz province, Iran (fa: ایران، استان البرز، کرج، عظیمیه)
- **Phone:** +98-9129333034 · `tel:+989129333034`
- **WhatsApp:** +989129333034 · https://wa.me/989129333034
- **Instagram:** @misaf1990
- **Map pin (SAMPLE):** 35.8390, 50.9770 — Azimiyeh, Karaj; replace with the exact studio location
- **Hours:** daily 08:00–22:00 (fa: همه‌روزه ۰۸:۰۰ تا ۲۲:۰۰)
- Phone numbers and handles always render LTR (`dir="ltr"`) inside Persian text.

## Scope
This system covers the **customer-facing storefront** only. Admin tasks (products, orders, currency, delivery rules, hours) are managed in a separate framework, so don't design admin screens here. The storefront reads those settings as data.

## Delivery rules
Rules are stored per country (`templates/_shared/delivery.js`) so more countries can be added later with their own zones, fees, currency and slots. **Current values are SAMPLES — replace with the real ones.**
**Iran (IR)** — fees in Toman; time slots 08–12, 12–16, 16–20 and 20–22 (the shop is open 08:00–22:00):
- **Karaj central** (Azimiyeh, Gohardasht, Mehrshahr…): 80,000; same day if ordered before 18:00
- **Karaj outer** (Fardis, Mohammadshahr, Kamalshahr): 120,000; same day before 16:00
- **Alborz province** (Hashtgerd, Nazarabad, Savojbolagh): 180,000; same day before 14:00
- **Tehran:** 250,000; same day before 12:00
- **Other provinces:** 150,000; plants only, sent by post in 3–5 days; fresh flowers blocked at checkout
- **Free delivery** in the Karaj zones for orders of 5,000,000 or more

## Product categories
Bouquets · Flower boxes · Arrangements · Roses · Luxury · Orchids · Houseplants · Gift sets · Bridal · Wedding car · Floral stands · Sympathy
(fa: دسته‌گل · باکس گل · گل‌آرایی · رز · لاکچری · ارکیده · گیاهان آپارتمانی · ست هدیه · دسته‌گل عروس · ماشین عروس · استند گل · ترحیم)

## Products
- **Storefront website** (e-commerce) — `templates/`. A reference composition; no existing UI was provided to recreate.

---

## CONTENT FUNDAMENTALS

**Voice:** a warm, unhurried florist talking across the counter. Poetic in headlines, plain and helpful in UI. Seasonal and fresh; short, confident sentences — never twee or rustic.

- **Person:** "we" for the studio, "you" for the customer. *"We write every card by hand."* Persian uses polite **شما**, never informal تو.
- **Casing:** sentence case everywhere (`Add to bag`, not `Add To Bag`). Only eyebrows / badges are UPPERCASE + tracked — and never in Persian (Persian has no case; letter-spacing breaks joining).
- **Headlines:** short, two beats, the second often in italic serif: *"Wild things, gathered."* · *"Dried & everlasting."* Persian: «گل‌های وحشی، دسته شده.»
- **Body:** concrete sensory detail over adjectives — stems, paper, twine, growers, morning. *"Hand-tied each morning from what the growers bring in."*
- **UI labels:** verbs, 1–3 words: `Add to bag`, `Place order`, `Keep browsing`. Bag, not cart.
- **Empty / error states:** gentle and human: *"Your bag is empty — for now."* · *"Enter a full postcode."* No exclamation marks, no blame.
- **Numbers:** Persian UI uses Persian digits (۱۲۳) and ٬ separators via `toLocaleString('fa-IR')`; prices in **Toman (تومان) by default**. The store has **one active currency**, which the admin can change (Toman, Rial, USD, EUR, AED through the shared formatter). Always format prices through a single `money()` helper — never hard-code "Toman" in copy. Label position: Persian labels always follow the number (۴٬۲۰۰٬۰۰۰ تومان); in English, symbol currencies go first ($42.00) and word currencies go after (4,200,000 Toman). Phone numbers & emails stay LTR inside RTL (`dir="ltr"` on the field).
- **Dates:** Dates in Persian use the Shamsi calendar with Persian digits. Show the other calendar alongside when a customer picks a date. Persian full dates read weekday، day month year («سه‌شنبه، ۷ مهر ۱۴۰۵») — build them with `dates.fullDate()`, never Intl weekday + year in one call.
- **Time ranges in Persian:** when a time range is written in Persian (۰۸:۰۰ تا ۲۲:۰۰), wrap each time in Unicode FSI/PDI marks (`\u2068 … \u2069`) so the order can't flip.
- **Emoji:** never. **Brand name:** "Vendra Florist" / «گل‌فروشی وندرا» in full; "Vendra" / «وندرا» alone is fine in running copy. Never "Boho" — that name is retired.
- **Unicode ornaments: none; use the em dash and middle dot (`Seasonal · 15 stems`) as separators.
- **Translation:** write each language natively, don't mirror sentence structure. Persian copy runs ~10–20% longer; layouts must allow it.

## VISUAL FOUNDATIONS

**Mood:** a modern flower studio — clean petal-white space, one confident peony pink, deep stem green. Fresh and crisp, not rustic.

- **Colour:** light mode only. Petal-white surfaces (`--petal-50` #FBF8F6 page, `--white` cards), green-black ink text (`--ink-900` #17211C). The single action accent is **peony** (`--peony-500` #C8405F) with white text; accent text on light surfaces uses `--text-accent` (peony-600). Secondary botanicals — leaf, blush, pollen, lilac — are for badges and status only. Deep stem green (`--stem-900`) for brand moments.
- **Type:** *Instrument Serif* display (400, tight 1.05, −0.015em tracking, italic for one accent word per heading) + *Jost* body (400/500). Persian glyphs fall through automatically to *Vazirmatn* (display at 500–600 and body) — one font stack serves both languages. Set `data-lang="fa"` (with `lang="fa" dir="rtl"`) on the root to switch Persian metrics: taller line-heights (body 1.9), zero tracking. No italics in Persian.
- **Spacing:** 4px base; sections breathe (96px between blocks, 72px hero padding). Max container 1240px, 24px gutter.
- **Signature motif — the rounded-top frame:** hero and product imagery sits in a tall frame with a 160px top radius and 8px bottom corners (`--radius-arch`) — a modern nod to Persian doorways, not a full boho arch. Use it for hero and product imagery only; everything else (journal, category, grids) uses soft 8px frames or full-bleed. At most one circle per collage.
- **Corners:** buttons, tags, steppers = pill. Inputs 4px. Cards 8px. Dialogs 16px.
- **Cards:** white fill + 1px `--border-subtle` hairline, no shadow (default); `sunken` petal-100 fill for summaries; `raised` soft shadow only for floating things.
- **Borders:** 1px hairlines in petal-200/300; ink (`--border-strong`) for selected / outlined emphasis.
- **Shadows:** ink-tinted, low and diffuse. Reserved for dialogs, toasts, floating icon buttons.
- **Backgrounds & imagery:** flat petal-white backgrounds; photos go full-bleed or inside an arch frame. Client photos were removed to save storage; all images use `assets/placeholder.svg` until replaced. Their look: soft natural daylight; blush, ivory, peach and peony-pink flowers with fresh greens; clean pale walls and marble; satin ribbons and paper wraps; plenty of negative space; square 1254px originals. New imagery should match — never cool, high-contrast or saturated. Crop to 4:5 for product and category tiles. Use the striped placeholder only when no photo exists.
- **Real studio product photos** (removed; placeholders in use) are shot differently from the category imagery: a deep dark studio backdrop (all placeholders are light petal; the arch shows `--petal-100` while photos load), cream and gold classical columns as plinths, saturated violet, blue, orchid-pink and crimson flowers, 3:4 portrait. Use them for product tiles and detail pages; keep the soft daylight category photos for category and marketing surfaces.
- **Transparency & blur:** only the sticky header (88% petal-50 + 10px blur) and the dialog overlay (ink 42% + 6px blur).
- **Motion:** gentle ease-out (`cubic-bezier(.22,.61,.36,1)`), 140/240/480ms. Fades and 12px rises; image zoom 1.04 on hover. No bounces, no springs, no parallax.
- **Hover:** peony fills deepen one step (peony-500→600); outlines fill with ink; ghosts get a petal-200 wash; links use `--accent-hover`.
- **Press:** translateY(1px) + one more step darker. **Focus:** 2px lilac ring, 2px offset; on `--surface-inverse` (footer, toast, announcement bar) add `.ag-on-inverse` so the ring switches to `--focus-ring-on-inverse` (lilac-300, 3:1).
- **Light only:** no dark mode. Use semantic tokens (`--surface-*`, `--text-*`) — tenant themes (`data-tenant`) depend on it.
- **Mobile first:** most customers arrive from Instagram on a phone. Breakpoints: mobile < 768px, tablet < 1100px. On mobile: 16px page gutters; a bottom tab bar (Home · Shop · WhatsApp · Bag) with safe-area padding; a sticky add-to-bag bar on product pages; horizontal snap-scrollers instead of wide grids; a 2-column product grid (12px column gap); display type at about half the desktop size (hero 48px, section titles 34px); every touch target at least 44px.
- **RTL:** all layout uses logical properties (`padding-inline`, `inset-inline-end`). Directional icons (arrows, chevrons) mirror via `.ag-flip-rtl` — the Icon component does this automatically.

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) line icons, bundled locally (`components/core/icon-svgs.js`, Lucide 0.460.0; no network — add new icons to that file) and rendered via CSS mask by the `Icon` component so they inherit `currentColor`. **Substitution flag:** no brand icon set was provided; Lucide's thin, rounded line style was picked to match the hand-made mood.
- **Style:** outline only, 2px stroke, 16–22px. Ink colour by default; peony (`--text-accent`) only for small value-prop icons.
- **Common glyphs:** flower-2, leaf, sprout, heart, shopping-bag, search, user, truck, gift, calendar, map-pin, arrow-right, chevron-down, x, plus, minus, check.
- **No** emoji, icon fonts, PNG icons or unicode glyph icons.

## Links vs buttons

- **Navigation is always `<a href>`**: header, menu, footer, product/category/blog cards, tab bar, "View all", "Back to shop". Middle-click, Ctrl/Cmd-click and "copy link" must work.
- **Actions are `<button>`**: add to bag, favourite, open search/menu, submit, change language or theme, sign out.
- Components: `Button`, `IconButton`, `CategoryCard`, `BottomTabBar` items and `ProductCard` take `href` and render `<a>`; without it they render a real `<button>`. Never put `onClick` on a `<div>`.
- **ProductCard**: the product name is the one link, stretched over the whole card (`::after`, inset 0). Its accessible name is `linkLabel` (default `name — price`). The favourite button sits above it (z-index 2). The whole card shows the focus ring (`:focus-within`, 8px radius). `onClick` goes on the link and is never `preventDefault`-ed inside the component.
- **Toast**: never the click target itself. Put the follow-up in `action` (`{label, href | onClick}`), e.g. "View bag".

## Routing & URLs

`components/utils/seo.js` → `window.VendraDesignSystem_f4f210.seo` (also `window.AG_SEO`).

- Scheme: `?lang=en|fa&view=<screen>&id=<productId>&cat=<category>&post=<postId>&m=<momentId>`. Home omits `view`.
- Screens: home, shop, product, bag, checkout, contact, search, gifts, moment, saved, track, custom, account, journal, post, care, faq. A storefront adds its own with `seo.register(...)` (the templates register weddings and policy).
- Every value read from the URL must match `/^[\w:-]{1,40}$/`; numeric ids (`m` by default, see `seo.setNumeric`) must be digits only. Anything else is dropped. An unknown view, or a product/post/moment with no valid id, becomes `notfound`.
- `routeParams(state)`, `readRoute(search)`, `hrefFor(state, screen, extra)`, `linkHandler(go)`. linkHandler lets modified clicks, middle clicks and `target=_blank` through, and otherwise calls `preventDefault` and moves within the site.
- History: `pushState` when the screen changes, `replaceState` when only the language (or an in-page filter) changes, and handle `popstate` for back/forward.
- `syncHead({title, description, image, url, locale, type, alternates:{en,fa}, noindex})` sets `<title>`, the meta description, `og:*`, `twitter:*`, the canonical link, hreflang en/fa/x-default, and robots.
- **noindex** (`noindex, follow`, no hreflang): bag, checkout, confirm, account, track, saved, search, notfound.
- **track** takes an optional `id` = order number (`?view=track&id=VN-10522`, SAFE pattern). With a known id it shows the order page (OrderDetail.jsx.txt); otherwise a not-found state (sign in / Your orders, WhatsApp). Always noindex.

## Accessibility (WCAG 2.2 AA)

- **Screen change**: move focus to the page's `h1` (`tabindex="-1"`; the ring is suppressed by `:where(h1,h2,h3,main)[tabindex="-1"]:focus`). The same applies to step changes (bag → payment, phone → code). Announce the new page title in the LiveRegion.
- **Validation**: on a failed submit, move focus to the first invalid field.
- **Field errors**: `<div class="ag-field">` → `<label for>` (label text only) → control → `<span id="{id}-hint" class="ag-field__hint">`. The control gets `aria-describedby="{id}-hint"` whenever there's a hint or error, plus `aria-invalid` and `aria-errormessage="{id}-hint"` when there's an error. The error never goes inside the label. ChoiceGroup does the same with `<fieldset><legend>` (`legend` prop) on the radiogroup. Checkbox and Radio take `hint`/`error` too.
- **Skip link**: `<SkipLink>` is the first element in the page, pointing to `#main` (the `<main>` element). It's hidden until focused, then shows as a pill on the inverse surface.
- **Live region**: one `<LiveRegion>` mounted at load (`role="status"`, polite, `.ag-sr-only`) for page changes, "Added to bag" and filter counts. Use assertive for failures only.
- **Focus**: all `.ag-*` controls and any plain `a`, `button`, `[role=button]`, `summary` or `[tabindex]` get `2px solid var(--focus-ring)` at a 2px offset on `:focus-visible`.
- **Dialog**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title. Focus moves inside on open (`initialFocus` selector, else the first control, else the close button). Tab and Shift+Tab stay inside, Esc closes, focus returns to the opener, and the page behind can't scroll.
- **Touch targets**: at least 44px (tab bar, stepper circles, footer and TOC links).
- **Contrast**: see the *Contrast* card in Colors. Every text token passes 4.5:1 on the surfaces it's used on. `--ink-500` / `--text-muted` (#59655E) passes on `--surface-muted`. Form-control edges (inputs, choice tiles, steppers, switch track, slider track) use `--border-input` #808B83 for 3:1; `--border-default` is for dividers only. Non-text accent indicators (active tab line, slider, current order step, saved heart) use `--text-accent`, because `--accent` gold is under 3:1 on cream — it is for button fills only. `--text-subtle` (about 2:1) is **decorative or disabled only, never readable copy**; placeholders now use `--text-muted`. `--warning` and `--info` are icon/border colours (3:1); the text beside them uses `--text-body`.

## Structured data

- `seo.productJsonLd(product, {url, lang, currency})` returns a Schema.org **Product** with name, description, image[], sku, brand, url and an **Offer**. The Offer has price, priceCurrency (the active currency from format.js; Toman isn't ISO 4217, so it's published as **IRR = Toman × 10**), availability (InStock/OutOfStock), itemCondition NewCondition, url and seller. It also gets `shippingDetails` (one OfferShippingDetails per `delivery.IR` zone: fee, region, same-day or 3–5 days) and `hasMerchantReturnPolicy` (from the consuming project’s return-policy configuration = `{default, byCat:{<category>:…}}`: fresh flowers default to **MerchantReturnNotPermitted** with no days/method/fees, and damaged or wrong orders are replaced under the Returns policy; houseplants and gift sets have a 3-day in-store window — SAMPLE values, confirm with the owner). Items priced "on request" (`price == null` or `onRequest`) output no Offer.
- `seo.storeJsonLd()` returns a **Florist** with name, logo, address (Azimiyeh, Karaj, Alborz, IR), telephone +989129333034, openingHours `Mo-Su 08:00-22:00`, geo (the sample pin; replace it with the real one) and sameAs `https://instagram.com/misaf1990`. It's output on home and contact.
- `seo.setJsonLd(id, data)` upserts or removes a `<script type="application/ld+json">`.
- **PCI DSS**: doesn't apply. Payment is card-to-card (customer bank → shop card), so no card data passes through or is stored by the storefront. Only the last 4 digits and the tracking number the customer types are sent, as a transfer reference.

## Storefront release checklist

- [ ] Product pages show price and availability; the default configuration's visible price equals the JSON-LD price (IRR = Toman × 10). Paid add-ons are never pre-selected.

- [ ] Every navigation is a real `<a href>` using the URL scheme above; back/forward, reload and deep links restore the screen.
- [ ] Unknown or invalid URLs show the 404 screen with `noindex, follow`; noindex screens are excluded from the sitemap.
- [ ] Each indexable screen has a unique title and description, a canonical link, hreflang en/fa/x-default and og/twitter tags.
- [ ] Product JSON-LD validates in the Rich Results Test; IRR prices = Toman × 10; the Florist JSON-LD has the real address and pin.
- [ ] Keyboard only: skip link, visible focus everywhere, dialog focus trap and return, focus moves to the h1 on screen change and to the first error on submit.
- [ ] Screen reader (VoiceOver and TalkBack, EN and FA): field errors are read with their field; page changes and "Added to bag" are announced.
- [ ] Contrast card passes; no `--text-subtle` used for copy.
- [ ] Persian: no italics, Persian digits, time ranges wrapped in FSI/PDI, mirrored layout.
- [ ] Persian dates read weekday، day month year; Esfand clamps to 29 in non-leap years.
- [ ] Policy pages (Shipping & delivery, Returns & refunds, Privacy, Terms) have the real text, with no SAMPLE banners; they're linked from the footer.
- [ ] Payment is card-to-card only: no card numbers are collected or logged.

## Index

**Entry & docs**
- `styles.css`: global CSS entry (imports only). Link this one file.
- `readme.md` (this file) and `SKILL.md` (Agent Skill entry).
- `guidelines/tenant-onboarding.md`: checklist for launching a new florist.

**Tokens** (`tokens/`)
- `fonts.css`: local `@font-face` for Instrument Serif, Jost and Vazirmatn (woff2 files in `assets/fonts/`).
- `colors.css`, `typography.css` (plus `[data-lang="fa"]` metrics), `spacing.css` (spacing, radii, layout), `effects.css` (shadows, motion, z-index), `base.css` (element defaults, focus, `.ag-display` / `.ag-eyebrow` / `.ag-accent-italic`).
- `character.css`: shape and voice tokens a tenant may override (`--radius-control`, `--button-case`, `--display-case`, `--accent-font-style`, `--accent-font-weight`).
- `tenants/clay.css`: sample tenant theme (`data-tenant="clay"`).
- `tenants/_template.css.txt`: annotated template for a new tenant (not imported).

**Components**
- `components/components.css`: component class styles (`.ag-*`).
- `components/{core,forms,navigation,feedback,commerce}/`: React primitives. Each has `.jsx`, `.d.ts` and `.prompt.md`, plus a `@dsCard` card per folder.

**Cards** (`guidelines/*.html`)
- **Colors:** ink, linen, clay, botanicals, semantic, surfaces, contrast.
- **Type:** display and body (Latin and Persian), eyebrow, scale.
- **Spacing:** spacing, radii, shadows, motion.
- **Brand:** logo, wordmark, arch, icons, imagery, photo brief, RTL, rules, **Tenant themes** (default vs Clay) and the **Theme builder** (interactive generator with contrast checks and a copyable tenant CSS file).

**Storefront examples**
- `templates/previews/`: bilingual desktop, mobile and Clay theme previews.
- `templates/communications/`: standalone email, SMS and WhatsApp examples.
- `templates/deployment/`: manifest, robots and sitemap publishing samples.
- Store configuration, local account data and optional API/analytics helpers live in `templates/_shared/`.
- See [Migration and feature map](templates/MIGRATION.md) for ownership, states and integration boundaries.

**Templates** (`templates/`, for consuming projects) — *source of truth for the storefront*
- **Shopping:** `storefront-home`, `-shop`, `-product`, `-bag`, `-checkout` (payment and confirmation), `-search`, `-saved`.
- **Orders & account:** `storefront-track`, `-signin` (phone + code), `-account` (orders, addresses, reminders, profile).
- **Content:** `storefront-weddings` (inquiry form), `-contact`, `-journal`, `-post`, `-policy` (shipping, returns or privacy), `-faq` (delivery, payment, gifting and care), `-notfound`.
- **Tweaks on every template:** `lang` (en/fa: RTL, Persian copy and digits, FSI-wrapped times), `tenant` (default/clay) and `mobile` (forces a 390px preview frame with the compact header, bottom tab bar, and a sticky add-to-bag bar on Product). Layouts also adapt automatically to narrow screens.
- **Per-page tweaks:** `frame` (Home, Shop), `step` (Checkout), `status` (Track), `tab` (Account), `doc` (Policy).
- **Click-through:** `storefront-site` wires all 17 templates together. The header, tab bar and main buttons navigate between pages; it has `lang`, `tenant`, `mobile` and `start` tweaks. It loads the sibling template folders (`../storefront-*/`), so copy the whole `templates/` folder with it. Each page takes an optional `go(route)` prop; without one, navigation links open the click-through site and pages work standalone.
- Shared headers, footer, navigation, catalog and delivery rules live in `templates/_shared/`. Page content and English/Persian copy stay with each page. Run `npm --prefix templates run build` to compile Tailwind and update generated template sections. All pages share runtime JS and compiled CSS from `templates/_runtime/`. See [Storefront maintenance](templates/README.md) for where to edit and how to check changes.
- `_vendor/`: offline React and Babel copies used by the cards.

**Assets & other**
- `assets/`: arch mark, horizontal and stacked lockups (EN/FA, `-light` for dark surfaces), `logo-source.html`, `brand-export-source.html`, social images (`social/`), app icons (`icons/`), placeholders (`placeholder.svg`, `placeholder-studio.svg`).
- `uploads/openapi-*.json`: storefront API spec (used by `api.js`).
- `thumbnail.html`: project tile.

## Components

All text comes in through props (no hard-coded copy). Numbers are passed pre-localized (Persian digits for fa). Images take `srcSet` + `sizes` (sizes only applies when srcSet is set) and load lazily. Motion respects `prefers-reduced-motion`. Each component's `.prompt.md` has usage and its `.d.ts` has every prop.

**core/**
- **Icon:** Lucide glyph via CSS mask. Inherits `currentColor`; arrows and chevrons mirror in RTL.
- **Button:** `primary` (accent fill, one per view), `secondary` (ink outline), `soft`, `ghost`. Sizes sm/md/lg; `iconStart`/`iconEnd`; `href` renders `<a>`.
- **IconButton:** ghost / outline (44px circle) / solid. `active`, `count`, `href`; add `ag-iconbtn--inverse` on dark surfaces.
- **Badge:** neutral, accent, sage, ochre, plum, danger, solid. Uppercase in EN, never in FA.
- **Tag:** filter chip; `selected` fills with ink; `onRemove`.
- **Card:** default (white + hairline), `sunken`, `raised`.
- **ArchFrame:** image window on `--radius-arch`.
  - `shape`: arch, circle or soft. `ratio`: 4/5, 3/4, 4/3, 1/1 or `fill`.
  - `tone="product"`: plain backdrop behind product photos while they load.
  - `size="thumb"`: 44–56px list thumbnail.
  - `ring`: border for hero collages. `zoomOnHover`: 1.04 zoom on hover.
- **SkipLink:** first element on the page, pointing to `#main`.
- **DetailList:** label/value rows (order details).

**forms/**
- **Input:** label, hint, error (wired with `aria-describedby`), `iconStart`, `multiline`.
- **Select:** same field pattern, with `options`.
- **Checkbox**, **Radio** (with `description`), **Switch**.
- **QuantityStepper:** pill −/+ with a `format` hook for Persian digits.
- **ChoiceTile** + **ChoiceGroup:** radio-like tiles in a `<fieldset>`, with roving focus.
- **RangeSlider:** two handles (or one), swaps sides in RTL.
- **DatePicker:** Shamsi/Gregorian toggle with year/month/day selects; shows the equivalent date in the other calendar.

**navigation/**
- **Tabs:** underline or pill style, roving tabindex.
- **LanguageSwitch:** EN / فا.
- **Accordion:** single or multiple panels open.
- **Stepper:** checkout steps; `compact` on phones.
- **BottomTabBar:** mobile Home · Shop · WhatsApp · Bag, with safe-area padding.
- **NavLink:** `header`, `footer` and `menu` styles.
- **MenuList:** titled list of NavLinks.
- **SectionHeader:** title + accent word, eyebrow, level h1–h3, action slot, prev/next arrows.
- **SnapScroller:** scroll-snap row (`perView`, `perViewMobile`); `ref.scrollPrev()`/`scrollNext()`.

**feedback/**
- **Dialog:** focus trap, Esc closes, returns focus, locks scroll.
- **Toast:** success, info, warning, danger. Follow-up actions go in `action`.
- **Tooltip**, **Skeleton**.
- **Alert:** neutral, warning, error (alias `danger`), success; `action` slot.
- **EmptyState:** icon disc, eyebrow, title + `titleAccent`, body, actions.
- **AnnouncementBar:** dismissible top strip.
- **LiveRegion:** one polite `role="status"` per page.

**commerce/**
- **ProductCard:** a stretched link over the whole card, a favourite button above it, badge, arch or soft frame, crossfade to the second photo on hover.
- **CategoryCard:** 4:5 tile with name and count.
- **BlogCard:** journal post card.
- **PaymentCard:** card-to-card transfer details.
- **LineItem:** `lg` bag row with stepper and remove, or `sm` summary row; `unavailable` and `busy` states.
- **Gallery:** product photo carousel.
- **OrderTimeline:** 5-step order status.
- **OrderSummary:** lines plus totals.
- **AddressCard**, **ReminderRow:** account tabs.

**Helpers** (not components; `components/utils/` unless noted)
- `format.js` → `.format`: `CURRENCIES`, `money()`, `num()`.
- `dates.js` → `.dates`: `j2g`, `g2j`, `fullDate`, `dayMonth`, `monthNames`, `iso`/`fromIso`, `digits`.
- `seo.js` → `.seo`: see *Routing & URLs* and *Structured data*.
- `templates/communications/email-templates.js` → `window.AG_EMAIL`: `render(event, customer, vars, order)`. Theme it with `vars.theme` = `'default'`, `'clay'` or the palette from `AG_EMAIL.themeFromCSS(el)`.
- The first three hang off `window.VendraDesignSystem_f4f210` (`.format`, `.dates`, `.seo`). Each also has an `AG_*` alias (`AG_FORMAT`, `AG_DATES`, `AG_SEO`).

### Intentional additions
These came from the source system, which authored a standard set plus:
- **Icon:** Lucide wrapper with RTL mirroring.
- **QuantityStepper**, **ProductCard** and **CategoryCard:** commerce needs.
- **LanguageSwitch:** the EN/FA requirement.

## Storefront Tailwind build

The official templates use Tailwind CSS 4.3.3 for layout utilities, mapped to Vendra’s semantic tokens. Shared component CSS and tenant tokens remain the design system’s source of truth. For installation, builds and editing conventions, see [Storefront maintenance](templates/README.md#tailwind-conventions).

For local preview commands and English/Persian URLs, see [Preview the website locally](templates/README.md#preview-the-website-locally).

For development, run `npm --prefix templates run dev` and open `http://127.0.0.1:5173/`. Vite rebuilds the shared templates and Tailwind CSS when source files change.
