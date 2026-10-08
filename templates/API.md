# Vendra API alignment

The storefront's data contract is the Vendra backend API exported in `uploads/openapi-*.json` (API Platform, JSON-LD/Hydra, 42 endpoints). The templates run on local sample data in `_shared/`; that data should have the same shape as the API so a real store only swaps the source. Today only `_shared/integrations/api.js` calls the API (saved items, wishlists, inquiries, newsletter).

Part A is work in this repo. Part B lists what the backend doesn't provide yet; those changes belong in the vendra backend.

## A. Align the sample data with the spec (this repo)

| Sample data | API schema | Differences |
|---|---|---|
| `VF_PRODUCTS` (`catalog.js`) | `Product`, `ProductPrice`, `ProductCategory`, `Multimedia` | Local `id` is the code string (`VF-7K2M4Q`); API has integer `id`, `token`, localized `name`/`slug`/`description`. Local `price` is inline Toman; API prices are `ProductPrice` (`minorAmount`, `currency`, `formatted`). Local `cat` string vs `productCategory` reference. Local has no `inStock`/`quantity`/`availableSoon`. |
| `VF_ZONES`, `VF_SLOTS` (`delivery.js`) | `DeliveryZone`, `DeliverySchedule`, `DeliverySlot` | Local `km`/`fee`/`en`/`fa` vs `maxDistanceKm`/`feeAmount`/`currencyCode`/localized `name`; API has `requiresQuote`. Slots are `['08','12']` pairs vs `{id, name, startsAt, endsAt}`. |
| Sample orders (`account-data.js`, track) | `Order`, `OrderLine` | Map to `number`, `status`, `itemsAmount`, `deliveryAmount`, `totalAmount`, `lines[{name, quantity, unitAmount, lineAmount}]`. |
| Checkout state (`storefront-checkout`) | `Checkout` | Payload should be built from `cartToken`, `deliveryDate`, `deliverySlotId`, `addressId` or `latitude`/`longitude`, `recipientName`, `cardMessage`, `gateway`, `paymentReference`. |
| FAQ, journal, policy copy | `Faq`, `BlogPost`, `CustomPage` (+ categories) | Localized `name`/`description`, `slug`, `position`, `active`. |
| `seo.js` JSON-LD helpers | none | `productJsonLd`, `storeJsonLd` and `setJsonLd` target Google rich results, which the platform doesn't use, and no page calls them. Candidates for removal with their docs. |
| `api.js` comment | none | Mentions `PATCH /api/customers/me`, which the spec doesn't have. |

## B. Backend requests (vendra)

### Cart and checkout
1. **Cart writes.** Only `GET /api/sales/carts` exists. The storefront needs to create a cart and add, update and remove lines.
2. **Delivery quote result.** `POST /api/delivery/quotes` returns the same schema it receives (`latitude`, `longitude`, `currencyCode`). It should return the matched zone, fee, currency, same-day availability, or "outside the delivery area".
3. **Checkout result.** `POST /api/sales/checkout` returns the `Checkout` input. It should return the created order (`id`, `number`, totals) and any payment instructions or redirect URL.
4. **Checkout fields the storefront collects but can't send:** recipient phone; sender name and phone; address details a map can't show (unit, floor, plaque) or a typed address when the map fails; a card message per line (the spec has one `cardMessage`); promo code; pay from balance; size and add-ons per line. Also document the allowed `gateway` values (the storefront offers card-to-card, online, cash on delivery and balance).

### Delivery
5. **Zone rules:** same-day cut-off time per zone, the point distances are measured from, free-delivery threshold and the zones it applies to, product restrictions (for example plants only).
6. **Schedule:** sold-out dates, the lead time before a slot closes, and whether availability differs per zone.

### Catalogue
7. **Product code.** Confirm whether `token` is the customer-facing code (`VF-XXXXXX`) customers quote; the storefront uses it as the product's identity and URL.
8. **Product data the storefront shows:** occasions, sizes with their prices, available add-ons, same-day eligibility, badge (`New`), short description, care text. Say whether `options` / attributes are meant to carry these.
9. **Images:** `multimedia` is a list of references; the storefront needs the URL, alt text and responsive sizes embedded in the product response, not one request per image.
10. **Product filters:** price range, occasion, same-day, and sort by price (today: `inStock`, `categoryId`, `token`, `slug`, `search`, sorts by id/position/date).

### Customers and accounts
11. **Authentication.** The spec defines no security scheme, so orders, carts and wishlists are open to anyone. The storefront signs in with phone number + one-time code and needs a session.
12. **Profile:** `GET`/`PATCH /api/customers/me` (name, email, preferred language, SMS opt-in).
13. **Addresses:** CRUD. `Checkout.addressId` refers to addresses no endpoint returns.
14. **Reminders:** CRUD for yearly occasion reminders.
15. **Balance:** current balance and history.

### Orders
16. **Track by order number:** filter `GET /api/sales/orders` by `number` (the track page uses `?id=VN-10522`).
17. **Order detail:** a `status` enum with timestamps per step for the timeline, delivery date/slot/address, discount and balance amounts, delivery photo, cancellation.

### Store settings
18. **One endpoint for the tenant's settings:** store name, contact (phone, WhatsApp, Instagram), address and map pin, opening hours, active currency, announcement, theme spec (for `tenantCss`), card-to-card payment details, cash-on-delivery zones.

### Marketing
19. **Promo codes:** validate a code against a cart and return the discount.
