# Storefront UI kit

Bilingual (English / Persian) e-commerce storefront for Vendra Florist.

> **Sandbox.** The official storefront is `templates/storefront-*`. This kit is a demo/playground and may lag behind; don't treat it as the spec.

> **Disclaimer:** no existing product UI, codebase or Figma was supplied. This kit is a *reference composition* of the design system, not a recreation of a shipped site. Replace once real screens exist.

Screens (click-through in `index.html`):
- **Home** — photo hero, value strip, 12-category grid (CategoryCard), featured grid
- **Shop** — a sticky category sidebar (`CategorySidebar.jsx.txt`) on desktop and tablet, showing product counts and a gold highlight on the active category, next to a 3-column grid (2 columns on tablet). On mobile the categories become swipeable chips. Clicking a category on Home opens the shop already filtered., sort Select, ProductCard grid
- **Product** — gallery, size Radios, add-on Checkboxes, QuantityStepper, Tabs, add-to-bag Toast
- **Bag / checkout** — line items, delivery form with validation, sunken summary Card → Payment → Confirmation (see below)

Toggle **EN / فا** in the header — sets `lang` + `dir` on `<html>`; the whole layout mirrors.

Files: `data.js.txt` (products + all copy in both languages, number/money formatters), `components/utils/dates.js` (Shamsi/Gregorian helpers), `Header.jsx.txt`, `Footer.jsx.txt`, `ProductGrid.jsx.txt`, `Home.jsx.txt`, `Shop.jsx.txt`, `Product.jsx.txt`, `Bag.jsx.txt`.

**Currency:** Toman by default. Open Tweaks → Store settings to switch the store currency the way an admin would. Conversion rates in `data.js.txt` are demo values.

## Mobile
The storefront is responsive: mobile under 768px, tablet under 1100px (`components/utils/responsive.js` → `useBP()`). `mobile.html` previews it in a 360px phone frame, with shortcuts to the order page, account, bag and weddings in EN and FA.
- **Header:** a menu drawer (nav, EN/فا, theme, WhatsApp), the logo centred, and search and bag buttons
- **Bottom tab bar** (`MobileNav.jsx.txt`): Home · Shop · WhatsApp · Bag
- **Home:** stacked hero, full-width buttons, categories in a horizontal snap-scroller, 2-column products
- **Shop:** sticky category chips that scroll sideways, plus the sort control; 2-column grid
- **Product:** stacked gallery, 1-column size options, a sticky add-to-bag bar showing the live total
- **Bag:** single column; tel/name/address inputs set the right mobile keyboards
- Touch targets are ≥44px; safe-area inset on the tab bar

## Account & orders
- **Account** (`Account.jsx.txt`, header person icon or the Account tab on mobile): sign in with a mobile number and a 5-digit texted code (any 5 digits work in the demo). Pill Tabs: Orders · Addresses · Reminders · Profile (arrow keys move between tabs).
  - **Orders:** OrderCard with a status Badge; its button is an `<a href>` to the order page — "Track order", or "View order" once delivered or cancelled.
  - **Addresses:** AddressCard grid plus a dashed "Add an address" tile. The Dialog form has label, zone (`delivery.IR.zones`), address, recipient and phone; address needs 6+ characters and phone 10+ digits. The first address becomes the default.
  - **Profile:** name, mobile (disabled — "You sign in with this number"), optional email with validation, **Account language** (فارسی / English), Save and Sign out.
  - **Account language** is the single source for all processing: SMS, WhatsApp, email, receipts, reminders. First sign-in saves the language they were browsing in. After sign-in (and on later visits without `?lang=`) the site opens in it. The header switch only changes the current view and never edits the account setting.
  - Account data is saved per phone number in localStorage, so it comes back after signing out and in again.
- **Order page** (`OrderDetail.jsx.txt`, `?view=track&id=<orderNo>`, noindex): eyebrow "Order {no}", an h1 by status (Order received. / On its way. / Delivered, with love. / Order cancelled.), OrderTimeline (5 steps), OrderSummary, and a sunken DetailList (address · zone, day · slot or post note, recipient, card message, card-to-card reference). Buttons: "Ask about this order" (WhatsApp with the order number) and "Order again". A back link to the account when signed in; an unknown id shows a not-found state (sign in / Your orders, WhatsApp). Try `?view=track&id=VB-TEST-1`.
- **Order again** adds the items at **today's** prices (base price + size + card via `AG_DATA.reorderLines`), never the price paid; sold-out items are skipped.
- **Status mapping:** `AG_DATA.orderStatus(apiStatus)` → step 0–4 or 'cancelled' (anything matching /cancel|refund/).
- Sample orders and addresses: `account-data.js.txt` (SAMPLE).

## Contact
- **Contact** (`Contact.jsx.txt`): three channel cards (WhatsApp highlighted in gold, phone, Instagram), a studio card with address, hours and Neshan/Google Maps buttons, and a message form (name, phone, topic, message) with a confirmation toast.
- The header nav is now Shop · Weddings · Journal · Contact; footer links route there too. The copy in `pages-data.js.txt` is SAMPLE text.

## Shop filters
The sidebar (desktop and tablet) and the **Filters** sheet (mobile) hold:
- **Categories**, with counts
- **Price**: a two-handle range slider (100,000 Toman steps, up to the most expensive product), with the min and max shown in the store currency
- **Availability**: an "In stock only" switch

Every count updates live, and options with no matching products are dimmed. Active filters show as removable chips with "Clear all". The price bands and product colour tags in `filters-data.js.txt` are SAMPLES.

## Checkout, payment & states
`Checkout.jsx.txt` and `checkout-data.js.txt`. A 3-step indicator (Bag → Payment → Confirmed) runs across the flow.
- **Bag validation:** recipient, mobile number (09xxxxxxxxx; Persian digits are accepted) and address are required. Errors show on each field, with a summary above the checkout button.
- **Payment:** four methods:
  - online card through the Shaparak gateway, with a processing screen
  - card-to-card: a studio card panel with a copy button and a last-4-digits field
  - pay on delivery: Karaj zones only, and disabled with a reason elsewhere
  - confirm on WhatsApp: opens WhatsApp with the order already written out
- **Confirmation:** a full page showing the order number, the recipient, when it arrives, a payment status badge that depends on the method, item thumbnails, and buttons to track the order or keep shopping.
- **Payment failed:** explains that no money was taken or that the bank refunds within 72 hours, keeps the bag, and offers Try again, Choose another way to pay, and WhatsApp help.
- **Empty & error states:** empty bag, 404 page (any unknown route), and order lookup / order not found (footer “Track an order”). They share one `StateScreen` wrapper, which now renders the design-system `EmptyState` (with `eyebrow` and `tone`).
- **Tweaks → Demo states** switches the online payment result between success and failure, and jumps to the 404 page or the empty bag.
- The card number, bank and transfer-check times are SAMPLES.

## Journal (blog)
`Journal.jsx.txt` and `journal-data.js.txt`. Journal is in the header nav, the footer and a "From the journal" section on Home, which shows 3 cards and scrolls sideways on mobile.
- **Index:** filter tags by topic (Flower care, Occasions, Weddings, Plants), a large lead story, then a grid.
- **Post:** centred title, lead photo, a reading column about 680px wide, subheadings, pull quotes, wide images with captions, and a "Good to know" tips box. It also has share buttons (WhatsApp, Instagram, copy link), "Shop the flowers in this story" (a product grid) and "Keep reading".
- Body content is a simple list of blocks (`p`, `h`, `quote`, `img`, `tips`), so it can map cleanly to your CMS. There are 6 sample posts in EN and FA. Photos are placeholders (`assets/placeholder.svg`).

## Reminders, blog states, card settings
- **Reminders** (Account → Reminders tab, `Reminders.jsx.txt`):
  - Stored as `{cal, m, d}` (Shamsi or Gregorian) and edited with DatePicker (yearly). Old records with an ISO `date` are read as Gregorian.
  - Occasions: birthday, anniversary, Mother's Day, Valentine's, Nowruz, Yalda, other. Fixed occasions lock the date (Valentine's 14 Feb, Nowruz 1 Farvardin, Yalda 30 Azar).
  - **Mother's Day** moves every year (20 Jumada al-Thani), so its date is locked too: the store publishes the official date in `AG_DATA.occasionDates.mothers` (ISO list, admin data). Until a year is published, the Umm al-Qura estimate from `dates.nextHijri()` is used.
  - Rows use ReminderRow; "Send flowers" follows `AG_DATA.occasionDest` (gifts / moment screens — this kit falls back to the shop).
  - A navy "Coming up" banner for anything within 14 days, with a Send flowers button.
  - Each reminder has an on/off switch plus edit and delete; you choose how early (1 day, 3 days or 1 week before) and whether it comes by text or WhatsApp.
  - An empty state and an add/edit dialog. Picking a fixed occasion fills in its date.
- **Journal states:**
  - Shimmer placeholders while the index or a post loads.
  - Story search, with a "no match" state.
  - An empty topic ("Studio life"), with an Instagram button.
  - A "story has moved" page, with suggested stories.
- **Card-to-card** (Tweaks → Card-to-card (admin)):
  - Set the card number, the holder name in EN and FA, and an optional Sheba number.
  - The bank is detected from the card number's first 6 digits, and the number is checked with Luhn.
  - Checkout shows all of these, with copy buttons.
- **Tweaks → Demo states:** also switches journal loading to Slow and opens a missing blog post.

## Weddings & events
`Weddings.jsx.txt` has:
- a hero with bridal, orchid and wedding-car photos
- a recent-work gallery
- 3 packages (Intimate / Classic, highlighted in navy / Grand with a custom quote), priced in the store currency
- a 3-step "how it works"
- a consultation form (name, phone, event type, guests, date via DatePicker with minDate = today, budget, notes) with a confirmation toast

The package contents and prices are SAMPLES.

## Design-system components in use
Stepper (checkout), LineItem (bag — `unavailable` for sold-out rows; confirmation), Button `loading` (Pay / Place order), OrderTimeline / OrderSummary / DetailList (order page), AddressCard / ReminderRow (account), DatePicker (reminders, weddings), Tabs (account, product, reminders), ChoiceTile/ChoiceGroup (delivery slots), Alert (delivery note), PaymentCard (card-to-card), RangeSlider (price filter), BottomTabBar (mobile), NavLink/MenuList (header, mobile menu, footer), EmptyState (all empty/error screens), Skeleton (journal loading), BlogCard (journal grid), Accordion (product info on mobile), AnnouncementBar (top banner, dismissal remembered), Gallery (product photos on mobile once real extra photos exist).

## Backend (Vendra API v1.0.0)
`api.js` is a small client built from the OpenAPI docs. Set **Tweaks → Backend → API base URL**; while it's empty the store runs in demo mode and nothing is sent.
- **Saved items:** toggling the heart calls `POST /api/customers/saved-items` (`sellableType:'product'`, `sellableId`) and `DELETE /api/customers/saved-items/{id}`. On load, `GET /api/customers/wishlists` merges the default list. Products need a numeric `apiId` (from `GET /api/catalog/products`) before they sync; local saving still works in the browser.
- **Contact & wedding forms:** `POST /api/support/inquiries` (name, email, phone, message, occasion, preferredLocale → 204). A new optional email field was added; failures show an Alert.
- **Newsletter:** removed from the footer until the API has a subscribe endpoint.
- **Shop failure demo:** Tweaks → Demo states → Shop loading → Fails.

## Pricing
- Product defaults are the base configuration (Petite, no card) so the visible price matches the JSON-LD Offer. Paid add-ons are opt-in.

## Routing, focus and policies
- `components/utils/seo.js` handles URL ↔ state (`?lang&view&id&cat&post&m`), `<head>` sync and JSON-LD; it's also exposed as `window.VendraDesignSystem_f4f210.seo`. The kit registers its extra screens (weddings, about, policy).
- `components/utils/nav.js` provides `AG_NAV.href(route, id)` and `AG_NAV.link` for every internal `<a>`, plus `focusHeading()`, `focusFirstInvalid()` and `useHeadingFocus(step)`.
- `index.html` does pushState on screen changes, replaceState on language changes and popstate for back/forward. It focuses the h1 on every screen change and renders a SkipLink (→ `#main`) and a LiveRegion.
- `policies-data.js.txt` + `Policy.jsx.txt` give the long-form policy layout (`?view=policy&id=shipping|returns|privacy|terms`). **All policy text is SAMPLE placeholder copy.** `AG_DATA.admin.returnPolicy` (also SAMPLE) feeds `hasMerchantReturnPolicy`.

## Order notifications
- `notifications.js` (`window.AG_NOTIFY`) holds the SMS + WhatsApp wording for 8 events (received, paid, ready, onway, delivered, delayed, cancelled, reminder) in EN and FA. Preview: `notifications.html`.
- **Language:** every message uses the customer's **account language** (Profile → Account language, `profile.locale` / API `preferredLocale`). Guests use the page language at checkout. Missing → Persian.
- `AG_NOTIFY.render(event, record, vars, 'sms'|'wa')` → `{lang, dir, text, sms:{encoding, chars, parts}}`. Persian gets Persian digits; order IDs, links and phone numbers stay Latin.
- Domain `vendra.ir` and links in the preview are SAMPLES.

## Emails
- `email-templates.js` → `AG_EMAIL.render(event, customer, vars, order)`: confirmation, delivered, reminder. Table-based, inline styles, 600px, web-safe font fallbacks. Same language rule as SMS. Preview: `emails.html`.
- Pass `assetBase` (absolute URL of the hosted logo PNGs) and `unsubLink` (reminder emails).

## Launch files
- Icons: `assets/icons/` — favicon 16/32, apple-touch-icon 180, 192, 512, maskable 512. Linked from `index.html`, listed in `manifest.webmanifest`.
- Share images: `assets/social/og-default-en.png` / `-fa.png` (1200×630). Used for every page without its own photo; product and journal pages use their image.
- `sitemap.xml` — every public page in fa + en with hreflang pairs (SAMPLE domain vendra.ir; regenerate from live data on publish). `robots.txt` points to it.
- Analytics: `analytics.js` → `AG_TRACK.event(name, params)`, GA4 ecommerce names, pushed to `dataLayer` (GTM). No personal data.
  - Wired: view_item, add_to_cart, remove_from_cart, view_cart, begin_checkout, add_payment_info, purchase, add_to_wishlist, select_promotion, reminder_created, language_switch, order_again.
  - Defined, to wire with the real backend: search, sign_up, login, contact_whatsapp.

## Theme
- Light only. The header has no dark-mode switch and the site ignores the device's dark setting.
