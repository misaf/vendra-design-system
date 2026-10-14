# Vendra API alignment

The storefront's data contract is the Vendra backend API exported in `uploads/openapi-*.json` (API Platform, JSON-LD/Hydra, 42 endpoints). Sample data in `_shared/` is written as API responses, and one adapter per resource (in `components/utils/commerce.js`, also exported by the package) turns them into what the pages use, so a live store only swaps the source. `npm --prefix templates test` checks every sample record and the checkout request against the spec (`_tests/api-contract.test.cjs`).

Part A is the state of this repo. Part B lists what the backend doesn't provide yet; those changes belong in the vendra backend.

## A. Sample data and adapters (this repo)

| Resource | Sample data (schema) | Adapter | Fields kept outside the API record |
|---|---|---|---|
| Catalogue | `catalog.js`: `VF_API_PRODUCT_CATEGORIES`, `VF_API_PRODUCT_PRICES`, `VF_API_MULTIMEDIA`, `VF_API_PRODUCTS` | `vfProductFromApi` → `VF_PRODUCTS` | `VF_PRODUCT_EXTRAS` by `token`: occasions, sizes, add-ons, same-day, roses filter, badge, care, old slug (B8) |
| Delivery | `delivery.js`: `VF_API_DELIVERY_ZONES`, `VF_API_DELIVERY_SCHEDULE` | `vfZoneFromApi` → `VF_ZONES`, `VF_SLOTS` | `VF_DELIVERY_ZONE_EXTRAS` by zone id: key, same-day cut-off, distance centre; free-delivery and sold-out constants (B5, B6) |
| Orders | `account-data.js`: `VF_API_ORDERS` | `vfOrderFromApi`, `vfLineFromApi` | `VF_SAMPLE_ORDER_EXTRAS`: delivery details, payment method, preferred language (B17) |
| Checkout | built per order | `vfCheckoutRequest` → `VF_API.checkout` | everything in B4 |
| FAQ | `storefront-faq/copy.js`: `VF_API_FAQ_CATEGORIES`, `VF_API_FAQS` | `vfFaqGroups` | none; answers use delivery placeholders (below) |
| Journal, policies | `translations/journal-content.js`, `storefront-policy/copy.js` | waiting for B20–B21 | |

**Conventions the backend should accept**

- **Product code:** `Product.token` (e.g. `VF-7K2M4Q`) is the customer-facing code: the product's title, search key and URL id.
- **Currency:** `IRT` is Toman and `IRR` is Rial (1 Toman = 10 Rial). Sample amounts are Toman, with `minorAmount` equal to `amount`.
- **Slugs:** `slug.en` is the storefront's key and URL value; `slug.fa` is the Persian slug.
- **Slot times:** `DeliverySlot.startsAt`/`endsAt` are `"08:00"`; a slot's start hour is its key in the bag.
- **Order statuses:** `placed`, `arranging`, `ready`, `out_for_delivery`, `delivered`, `cancelled` (the storefront shows them as received, preparing, on the way, delivered, cancelled).
- **Line metadata:** `OrderLine.metadata` (and `CartLine.metadata`) carry `token`, `size`, comma-separated `addons` and `cardMessage`, as strings.
- **Checkout:** `gateway` is the payment method: `card`, `online`, `cod`, `wallet` or `whatsapp` (`commerce.PAYMENT_METHODS`); for card-to-card, `paymentReference` is the card's last 4 digits and the transfer reference, separated by a space. Several card messages go in `cardMessage` as `CODE: message` lines.
- **Text placeholders:** content text may contain `{fee:<zone>}`, `{cutoff:<zone>}` (zone keys `central`, `outer`, `alborz`, `tehran`) and `{freeDeliveryFrom}`; the storefront fills them from the delivery rules (`vfStoreText`), so fees in FAQ answers never go stale.
- **Photos:** `Multimedia.responsiveImages` maps `"<width>"` to a URL in the photo's own format and `"<format> <width>"` (`"avif 480"`, `"webp 960"`) to smaller formats; `Multimedia.customProperties` carries `width` and `height` in pixels, `placeholder` (a tiny blurred `data:image/…` URI) and the alt text as `alt_en` / `alt_fa`. `commerce.imageFromApi` turns a record into what `Picture` renders: AVIF and WebP for browsers that read them, the right width for the layout, and the blurred photo until it loads. A record with only `url` still works.
- **Order totals:** the discount is `itemsAmount + deliveryAmount - totalAmount` until `Order` reports it (B17).

## B. Backend requests (vendra)

### Cart and checkout
1. **Cart writes.** Only `GET /api/sales/carts` exists. The storefront needs to create a cart and add, update and remove lines.
2. **Delivery quote result.** `POST /api/delivery/quotes` returns the same schema it receives (`latitude`, `longitude`, `currencyCode`). It should return the matched zone, fee, currency, same-day availability, or "outside the delivery area".
3. **Checkout result.** `POST /api/sales/checkout` returns the `Checkout` input. It should return the created order (`id`, `number`, totals) and any payment instructions or redirect URL.
4. **Checkout fields the storefront collects but can't send:** recipient phone; sender name and phone; address details a map can't show (unit, floor, plaque) or a typed address when the map fails; a card message per line (the spec has one `cardMessage`); promo code; pay from balance; size and add-ons per line. Accept the `gateway` values and `paymentReference` format above.

### Delivery
5. **Zone rules:** same-day cut-off time per zone, the point distances are measured from, free-delivery threshold and the zones it applies to, product restrictions (for example plants only).
6. **Schedule:** sold-out dates, the lead time before a slot closes, and whether availability differs per zone.

### Catalogue
7. **Product code:** confirmed — `token` is the customer-facing code. Add a `token` lookup that also works for codes typed with spaces, lower case or Persian digits (the storefront normalises them).
8. **Product data the storefront shows:** occasions, sizes with their prices, available add-ons, same-day eligibility, badge (`New`), short description, care text. Say whether `options` / attributes are meant to carry these.
9. **Images:** `multimedia` is a list of references; the storefront needs each photo embedded in the product response (one request per photo is too slow), filled in as the Photos convention above describes: widths 320–1600 in the original format plus AVIF and WebP, the size, a blurred placeholder and alt text in both languages.
10. **Product filters:** price range, occasion, same-day, and sort by price (today: `inStock`, `categoryId`, `token`, `slug`, `search`, sorts by id/position/date).

### Customers and accounts
11. **Authentication.** The spec defines no security scheme, so orders, carts and wishlists are open to anyone. The storefront signs in with phone number + one-time code and needs a session. The code SMS should end with a line `@<the storefront's domain> #<code>` (e.g. `@shop.example #12345`) so Chrome on Android fills the code itself (Web OTP); the storefront waits 60 seconds before offering a new code, and a new code should replace the last one.
12. **Profile:** `GET`/`PATCH /api/customers/me` (name, email, preferred language, SMS opt-in).
13. **Addresses:** CRUD. `Checkout.addressId` refers to addresses no endpoint returns.
14. **Reminders:** CRUD for yearly occasion reminders.
15. **Balance:** current balance and history.

### Orders
16. **Track by order number:** filter `GET /api/sales/orders` by `number` (the track page uses `?id=VN-10522`).
17. **Order detail:** document the `status` values above, with timestamps per step for the timeline, delivery date/slot/address, discount and balance amounts, delivery photo, cancellation.

### Store settings
18. **One endpoint for the tenant's settings:** store name, contact (phone, WhatsApp, Instagram), address and map pin, opening hours, active currency, announcement, theme spec (for `tenantCss`), and the payment methods the store offers, in its order, each with its settings: the card for card-to-card (number, holder, bank, Sheba), the zones pay on delivery reaches, and whether online, balance and WhatsApp orders are on. The storefront has the shape as `VF_STORE.paymentMethods` (`commerce.PaymentMethod`). Also the optional parts the store runs, as a list of `commerce.STORE_FEATURES` ids (`promoCodes`, `sameDay`, `weddings`, `journal`, `reminders`, `newsletter`; `VF_STORE.features`), its languages with the default first (`VF_STORE.languages`), and which contact channels it has (WhatsApp, Instagram and email each optional).

### Marketing
19. **Promo codes:** validate a code against a cart and return the discount.

### Content
20. **Rich content for `BlogPost` and `CustomPage`.** Journal posts and policy pages are structured documents; `description` (a string or list of strings per language) can't hold them. Add to both:
    - `summary`: `{en, fa}` string — the line under the title on cards and at the top of the page.
    - `content`: `{en: Block[], fa: Block[]}`, where a block is one of `{type: "paragraph", text}`, `{type: "heading", text}`, `{type: "list", items: string[]}`, `{type: "quote", text}`, `{type: "tips", items: string[]}`, `{type: "image", url, alt, caption}`. Structured blocks keep HTML out of the storefront; text may use the placeholders above.
    - `publishedAt`: date-time of publication (journal cards show it in the Persian or Gregorian calendar). The storefront works out reading time from `content`.
21. **Journal extras on `BlogPost`:** `relatedProducts` as product references (the post page lists them under the article), and the cover photo embedded with URL and alt text (see 9).
22. **Policy placeholders.** Policy text lists live values: delivery zones with fees and cut-offs, time slots, delivery days, free-delivery and cash-on-delivery zones, store name, phone, address and hours. Either allow these placeholders in `content` (`{deliveryZones}`, `{slots}`, `{deliveryDays}`, `{freeDeliveryZones}`, `{codZones}`, `{brand}`, `{phone}`, `{address}`, `{hours}`; the storefront fills them), or expose the values through the store-settings endpoint (18) and let the admin write them out.

### Inquiries
23. **Phone-only messages.** `Inquiry.email` is a required string, but the contact form accepts a mobile number *or* an email so the studio can reply. Make `email` nullable when `phone` is given (the storefront sends `''` until then).
24. **Wedding inquiries** send their type, date, budget and guest count joined into `message`. Optional: add structured fields (or a `metadata` object) if the studio wants to filter them.
25. **Exchange rates for a non-Rial currency.** Prices are stored in Toman, and `money()` only knows the fixed Toman/Rial ratio; it refuses any other currency without a rate. If a store can switch its active currency to USD, EUR or AED, expose the rate per Toman (with its decimals, symbol and English/Persian names) and when it was last updated through the store-settings endpoint (18), so the storefront passes the tenant's own table instead of the sample rates in `store-config.js`.

### Not built yet (no data)
26. **Product reviews and ratings.** No endpoint or schema covers reviews, so the design system has no Rating component yet. If the store will show them: a `ProductReview` resource (product, customer display name, rating 1–5, text per language, created date, moderation status), and on `Product` an average rating and review count so cards and the product page don't fetch every review.
27. **Customer photo uploads.** `/api/content/multimedia` is the admin's library; customers can't upload. A custom-bouquet request or a card photo would need an authenticated upload endpoint (image types and size limit, returns a media reference) that an order line or inquiry can point to. The design system adds a file-upload component once this exists.
28. **A product's earlier price (sales).** `ProductPrice` holds one amount, and `Product.productPrices` is the price history, so the storefront can't tell a sale from a price change. To show a reduction, add a compare-at amount to `ProductPrice` (same currency and minor units, set only while the reduction runs, optionally with start and end dates). `Price` and `ProductCard` already take it as `compareAt`; `productFromApi` maps it to `product.compareAt` once the field exists.
29. **Trust seals.** The footer shows the store's eNamad and Samandehi seals, which only the store's own panels issue. Add them to the store-settings endpoint (18): a list of `{kind: "enamad" | "samandehi", href, image}`, holding the link and image URLs exactly as each panel gives them, so `TrustSeal` renders them as issued. The sample store's `trustSeals` in `store-config.js` stands in until then.
30. **Online payment through a gateway.** The storefront sends the customer to the bank's page and back (`PaymentStatus`); today the sample store simulates the bank. A real gateway needs:
    - **Checkout result (with 3):** for `gateway: "online"`, where to send the browser: `{url, method: "GET" | "POST", fields}` exactly as the gateway expects (a Zarinpal `StartPay` link, or a Shaparak form with its token), and the order `number`.
    - **The callback:** the gateway returns to the backend, which verifies with the bank once (a refresh or a second callback must not verify or charge again) and then redirects to the storefront's `?view=checkout&payment=return&order=<number>`.
    - **Payment status on `Order`:** `paymentStatus` (`awaiting`, `paid`, `cancelled`, `failed`, `unconfirmed`), the bank's tracking code (RRN) and the amount paid, readable by the customer who placed it (11). `unconfirmed` is money taken but not yet verified; the storefront tells the customer not to pay again.
    - **Pay again:** a new payment attempt for the same order after `cancelled` or `failed`, returning a new redirect, so a retry never creates a second order.
31. **Analytics events.** The storefront reports the events in `analytics.EVENTS` (`components/utils/analytics.js`): product views, bag changes, checkout steps, payment results, searches, filters, sign-in and more, each with only its listed parameters (product codes, amounts, counts; never names, phones, addresses or card messages), and only after the visitor accepts analytics. Add an endpoint that takes them in batches, `{events: [{event, language, currency, at, ...params}]}` as JSON (sent with `sendBeacon`, so it must accept a POST without auth headers or a CORS preflight), and set its URL as `VF_STORE.analyticsUrl` (or in the store settings, 18). Reports then come from the store's own data, with no outside analytics service.
