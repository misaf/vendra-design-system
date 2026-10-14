// Store identity and contact details. Change these once, then run npm --prefix templates run build.
// Localized fields use {en, fa}; phone numbers and URLs remain left-to-right.
import {commerce} from '../../components/utils/commerce.js';

export const VF_STORE = {
  tenant: 'default', // This store's theme: a slug from tokens/tenants/ (e.g. 'clay') or 'default'.
  // The storefront's languages; the first is the default. With one, the language switch is hidden and
  // links in the other language open in this one.
  /** @type {('en' | 'fa')[]} */
  languages: ['en', 'fa'],
  // Optional parts of the storefront: each id turns one on; leave one out to turn it off (its page,
  // links and fields go with it). The ids: commerce.STORE_FEATURES in components/utils/commerce.js.
  // Add-ons and the handwritten card's message follow VF_ADDONS in catalog.js.
  /** @type {import('../../components/utils/commerce.js').StoreFeature[]} */
  features: ['promoCodes', 'sameDay', 'weddings', 'journal', 'reminders', 'newsletter'],
  currency: 'IRT', // The active currency: a key in `currencies`.
  // Units per 1 Toman (prices are stored in Toman). Toman and Rial are fixed; the others are SAMPLE
  // rates. A real store takes them from its own rate source and keeps them current.
  currencies: {
    IRT: {rate: 1, dec: 0, sym: '', en: 'Toman', fa: 'تومان'},
    IRR: {rate: 10, dec: 0, sym: '', en: 'Rial', fa: 'ریال'},
    USD: {rate: 1 / 100000, dec: 2, sym: '$', en: 'USD', fa: 'دلار'},
    EUR: {rate: 1 / 110000, dec: 2, sym: '€', en: 'EUR', fa: 'یورو'},
    AED: {rate: 1 / 27000, dec: 0, sym: '', en: 'AED', fa: 'درهم'}
  },
  // Products per "Show more" page in the shop. The sample uses 4 so paging shows with six products;
  // a real store usually shows 12–24 (the API's itemsPerPage).
  shopPageSize: 4,
  // Journal posts per page: the featured story and six more (the API's itemsPerPage).
  journalPageSize: 7,
  apiBase: '', // Empty keeps every integration in local demo mode.
  // Where analytics events go, after the visitor accepts them (templates/API.md B31); null sends nothing.
  analyticsUrl: null,
  occasionDates: {mothers: []}, // Published ISO dates; otherwise dates helpers estimate.
  // The simulated bank's answer to an online payment: paid, cancelled, failed or pending (VF_PAYMENT_RESULTS).
  paymentDemo: {online: 'paid'},
  // Site-wide message above the header; null hides it. {freeDelivery} becomes the free-delivery threshold.
  announcement: {
    en: 'Free delivery in Karaj on orders over {freeDelivery}.',
    fa: 'ارسال رایگان در کرج برای سفارش‌های بالای {freeDelivery}.'
  },
  brand: {en: 'Vendra Florist', fa: 'گل‌فروشی وندرا'},
  // One or two sentences under the brand in the footer.
  tagline: {
    en: 'Hand-tied flowers from our Karaj studio, delivered across Karaj and Tehran.',
    fa: 'گل‌های دست‌بسته از استودیوی ما در کرج، با ارسال در کرج و تهران.'
  },
  address: {en: 'Azimiyeh, Karaj, Alborz', fa: 'ایران، استان البرز، کرج، عظیمیه'},
  studio: {lat: 35.8352, lng: 50.975}, // The shop's front door, shown on the contact map and used for directions.
  hours: {en: 'Daily 08:00–22:00', fa: 'همه‌روزه \u2068۰۸:۰۰\u2069 تا \u2068۲۲:۰۰\u2069'},
  phone: '+989129333034',
  phoneLabel: '+98 912 933 3034',
  // Contact channels: null hides one (the phone is required). Without WhatsApp, its links, the tab
  // bar's chat button and the WhatsApp payment method go too.
  whatsapp: 'https://wa.me/989129333034',
  instagram: {url: 'https://instagram.com/misaf1990', label: '@misaf1990'},
  email: '', // Optional public email, shown in the footer; '' hides it.
  // Trust seals from the eNamad and Samandehi panels: paste each seal's link and image URL as the
  // panel gives them (`image: null` shows the seal's name instead). The sample store has none
  // issued, so it links to the issuers' own sites; [] hides the seals.
  trustSeals: [
    {kind: 'enamad', href: 'https://enamad.ir/', image: null},
    {kind: 'samandehi', href: 'https://samandehi.ir/', image: null}
  ],
  // Who built the storefront, credited in the footer's bottom line; null hides it.
  credit: {name: 'Misaf', url: 'https://github.com/misaf'},
  // Delivery pin map. OpenStreetMap's tile server is for light use: a busy store should switch
  // `tiles` to a commercial or self-hosted tile service. center is [latitude, longitude].
  map: {
    tiles: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    center: [35.8327, 50.9654],
    zoom: 13
  },
  // Account balance. Signed-in customers top up, then pay for orders from their balance. Paying from a
  // balance of at least `discountFrom` takes `discountPercent` off the products (not delivery). Amounts are in Toman.
  wallet: {
    discountFrom: 100_000_000,
    discountPercent: 5,
    topUps: [10_000_000, 50_000_000, 100_000_000],
    minTopUp: 1_000_000,
    maxTopUp: 500_000_000
  },
  // How this store takes payment: each entry turns one method on, and the checkout lists them in this
  // order and starts on the first one the order can use (the balance, when it covers the order). Leave one out to turn it off (the account's Balance tab goes with `wallet`). Methods and
  // their settings: commerce.PAYMENT_METHODS in components/utils/commerce.js.
  /** @type {import('../../components/utils/commerce.js').PaymentMethod[]} */
  paymentMethods: [
    {id: 'wallet'},
    {
      id: 'card',
      cardNumber: '6221061072645437',
      holder: {en: 'Vendra Florist', fa: 'گل‌فروشی وندرا'},
      bank: {en: 'Saman Bank', fa: 'بانک سامان'}
    },
    {id: 'online'},
    // Pay on delivery reaches these delivery zones only.
    {id: 'cod', zones: ['central', 'outer']},
    {id: 'whatsapp'}
  ]
};

// Each optional part of the storefront as on or off (vfFeatures().promoCodes…), read from
// VF_STORE.features each time.
export function vfFeatures() {
  return commerce.storeFeatures(VF_STORE.features);
}
// `lang` when the storefront offers it, otherwise its default language.
export function vfLanguage(lang) {
  return VF_STORE.languages.includes(lang) ? lang : VF_STORE.languages[0];
}
// The payment methods the store offers, in its order; WhatsApp orders need the store's WhatsApp.
export function vfPaymentMethods() {
  return VF_STORE.paymentMethods.filter(method => method.id !== 'whatsapp' || !!VF_STORE.whatsapp);
}
