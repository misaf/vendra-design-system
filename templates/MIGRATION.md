# One maintained storefront

The separate storefront sandbox has been retired. Templates own page behavior,
copy and styling; design-system components continue to live in `components/`.

| Example or capability | Maintained home |
| --- | --- |
| Desktop, mobile and Clay previews | `previews/preview.html`, `mobile.html`, `preview-clay.html` |
| Emails, SMS and WhatsApp wording | `communications/` (standalone previews and rendering helpers) |
| Account addresses, profile and yearly reminders | `storefront-account/` and `_shared/account-data.js` |
| Per-phone local demo persistence and preferred language | `_shared/account-data.js`, `storefront-signin/` |
| Order detail, cancelled state and reorder at current prices | `storefront-track/`, `_shared/catalog.js` |
| Price range, availability, mobile filters and loading/failure states | `storefront-shop/` |
| Four payment methods, processing, failure and recovery | `storefront-checkout/` |
| Card configuration, bank prefix examples and Luhn checking | `_shared/payments.js` and `_shared/store-config.js` |
| Searchable journal, missing story, article blocks and related stories | `storefront-journal/`, `storefront-post/`, `_shared/translations/journal-content.js` |
| Wedding gallery, process and consultation fields | `storefront-weddings/` |
| Optional saved-item and inquiry API client | `_shared/integrations/api.js` |
| Optional analytics event wrapper | `_shared/integrations/analytics.js` |
| Launch manifest, robots and sitemap examples | `deployment/` |
| Formatting, dates, routing, navigation and responsive helpers | `../components/utils/` |

Shared page layouts, delivery, catalog, headers and footer already existed in the
templates and were reused. The old standalone React pages, sample-data wrappers
and debug panel were replaced by the maintained page sources and configuration.
No duplicate storefront application remains.

## Previewing states

Run `npm --prefix templates run dev` from the project root. Open
`http://localhost:5173/templates/storefront-site/StorefrontSite.dc.html`.
Use `?lang=en` or `?lang=fa`; add `&tenant=clay` for the second theme.

Useful route examples:

- `?lang=en&view=shop&min=2000000&max=4000000&stock=1`
- `?lang=fa&view=shop&demo=loading` or `&demo=error` (Retry restores results)
- `?lang=en&view=journal&demo=loading`
- `?lang=fa&view=post&post=missing-story`
- `?lang=en&view=track&id=VB-TEST-1` (cancelled sample)

The checkout page supports `demo=error` for its online payment simulation. In the
click-through site, fill the bag delivery form before opening checkout. An empty
bag redirects to the bag page. The default payment demo result, eligible COD
zones, currency, card/holder/Sheba and API base live in `_shared/store-config.js`.
After changing configuration, run `npm --prefix templates run build`.

`VF_PAYMENT.setPayCard({cardNumber, holderEn, holderFa, sheba})` normalizes digits,
looks up a sample bank prefix and sets `cardValid` using Luhn. The prefix list is
sample data; use your payment provider's maintained data in a consuming project.

## Integration boundaries

These are templates. Sign-in codes and payment results are simulated; reminders
are stored locally and do not schedule or send messages. WhatsApp links open only
when clicked. Communication renderers return strings; they do not send anything.

The default API base is empty. Setting it opts into requests through the client;
products need numeric `apiId` values to sync saved items. API failures retain
local saved items or form drafts. Authentication and payment services must be
provided by the consuming project. Analytics retain a small local log and use an
existing `dataLayer` or `gtag` if configured; event payloads omit contact details.

A signed-in demo account's saved language is used for processing examples. The
header language switch changes the current page independently. Communication
renderers accept `preferredLocale` and order locale explicitly.

The deployment files are publishing examples using `example.test`. Update paths,
domain, public catalog URLs and sitemap entries for the deployment. Place/link
the manifest deliberately; no service worker or offline cache is installed.
