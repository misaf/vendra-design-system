# Vendra API alignment

The storefront's data contract is the Vendra backend API exported in `uploads/openapi-*.json` (API Platform, JSON-LD/Hydra, 42 endpoints). Sample data in `_shared/` is written as API responses, and one adapter per resource turns them into what the pages use, so a live store only swaps the source. `npm --prefix templates test` checks every sample record and the checkout request against the spec (`_tests/api-contract.test.cjs`).

Part A is the state of this repo. Part B lists what the backend doesn't provide yet; those changes belong in the vendra backend.

## A. Sample data and adapters (this repo)

| Resource | Sample data (schema) | Adapter | Fields kept outside the API record |
|---|---|---|---|
| Catalogue | `catalog.js`: `VF_API_PRODUCT_CATEGORIES`, `VF_API_PRODUCT_PRICES`, `VF_API_MULTIMEDIA`, `VF_API_PRODUCTS` | `vfProductFromApi` → `VF_PRODUCTS` | `VF_PRODUCT_EXTRAS` by `token`: occasions, sizes, add-ons, same-day, roses filter, badge, care, old slug (B8) |
| Delivery | `delivery.js`: `VF_API_DELIVERY_ZONES`, `VF_API_DELIVERY_SCHEDULE` | `vfZoneFromApi` → `VF_ZONES`, `VF_SLOTS` | `VF_DELIVERY_ZONE_EXTRAS` by zone id: key, same-day cut-off, distance centre; free-delivery and sold-out constants (B5, B6) |
| Orders | `account-data.js`: `VF_API_ORDERS` | `vfOrderFromApi`, `vfLineFromApi` | `VF_SAMPLE_ORDER_EXTRAS`: delivery details, payment method, preferred language (B17) |
| Checkout | built per order | `vfCheckoutRequest` → `VF_API.checkout` | everything in B4 |
| FAQ, journal, policies | page `copy.js`, `translations/journal-content.js` | not converted yet | |

**Conventions the backend should accept**

- **Product code:** `Product.token` (e.g. `VF-7K2M4Q`) is the customer-facing code: the product's title, search key and URL id.
- **Currency:** `IRT` is Toman and `IRR` is Rial (1 Toman = 10 Rial). Sample amounts are Toman, with `minorAmount` equal to `amount`.
- **Slugs:** `slug.en` is the storefront's key and URL value; `slug.fa` is the Persian slug.
- **Slot times:** `DeliverySlot.startsAt`/`endsAt` are `"08:00"`; a slot's start hour is its key in the bag.
- **Order statuses:** `placed`, `arranging`, `ready`, `out_for_delivery`, `delivered`, `cancelled` (the storefront shows them as received, preparing, on the way, delivered, cancelled).
- **Line metadata:** `OrderLine.metadata` (and `CartLine.metadata`) carry `token`, `size`, comma-separated `addons` and `cardMessage`, as strings.
- **Checkout:** `gateway` is `card`, `online`, `cod` or `wallet`; for card-to-card, `paymentReference` is the card's last 4 digits and the transfer reference, separated by a space. Several card messages go in `cardMessage` as `CODE: message` lines.
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
17. **Order detail:** document the `status` values above, with timestamps per step for the timeline, delivery date/slot/address, discount and balance amounts, delivery photo, cancellation.

### Store settings
18. **One endpoint for the tenant's settings:** store name, contact (phone, WhatsApp, Instagram), address and map pin, opening hours, active currency, announcement, theme spec (for `tenantCss`), card-to-card payment details, cash-on-delivery zones.

### Marketing
19. **Promo codes:** validate a code against a cart and return the discount.
