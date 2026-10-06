// Store identity and contact details. Change these once, then run npm --prefix templates run build.
// Localized fields use {en, fa}; phone numbers and URLs remain left-to-right.
const VF_STORE = {
  tenant: 'default', // This store's theme: a slug from tokens/tenants/ (e.g. 'clay') or 'default'.
  currency: 'IRT',
  apiBase: '', // Empty keeps every integration in local demo mode.
  occasionDates: {mothers: []}, // Published ISO dates; otherwise dates helpers estimate.
  paymentDemo: {online: 'success', codZones: ['central', 'outer']},
  // Site-wide message above the header; null hides it. {freeDelivery} becomes the free-delivery threshold.
  announcement: {en: 'Free delivery in Karaj on orders over {freeDelivery}.', fa: 'ارسال رایگان در کرج برای سفارش‌های بالای {freeDelivery}.'},
  brand: {en: 'Vendra Florist', fa: 'گل‌فروشی وندرا'},
  // One or two sentences under the brand in the footer.
  tagline: {en: 'Hand-tied flowers from our Karaj studio, delivered across Karaj and Tehran.', fa: 'گل‌های دست‌بسته از استودیوی ما در کرج، با ارسال در کرج و تهران.'},
  address: {en: 'Azimiyeh, Karaj, Alborz', fa: 'ایران، استان البرز، کرج، عظیمیه'},
  studio: {lat: 35.8352, lng: 50.9750}, // The shop's front door, shown on the contact map and used for directions.
  hours: {en: 'Daily 08:00–22:00', fa: 'همه‌روزه \u2068۰۸:۰۰\u2069 تا \u2068۲۲:۰۰\u2069'},
  phone: '+989129333034',
  phoneLabel: '+98 912 933 3034',
  whatsapp: 'https://wa.me/989129333034',
  instagram: {url: 'https://instagram.com/misaf1990', label: '@misaf1990'},
  email: '', // Optional public email, shown in the footer; '' hides it.
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
  wallet: {discountFrom: 100_000_000, discountPercent: 5, topUps: [10_000_000, 50_000_000, 100_000_000], minTopUp: 1_000_000, maxTopUp: 500_000_000},
  payment: {cardNumber: '6221061072645437', holder: {en: 'Vendra Florist', fa: 'گل‌فروشی وندرا'}, bank: {en: 'Saman Bank', fa: 'بانک سامان'}}
};
