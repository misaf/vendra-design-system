// Store identity and contact details. Change these once, then run npm --prefix templates run build.
// Localized fields use {en, fa}; phone numbers and URLs remain left-to-right.
const VF_STORE = {
  currency: 'IRT',
  apiBase: '', // Empty keeps every integration in local demo mode.
  occasionDates: {mothers: []}, // Published ISO dates; otherwise dates helpers estimate.
  paymentDemo: {online: 'success', codZones: ['central', 'outer']},
  brand: {en: 'Vendra Florist', fa: 'گل‌فروشی وندرا'},
  address: {en: 'Azimiyeh, Karaj, Alborz', fa: 'ایران، استان البرز، کرج، عظیمیه'},
  hours: {en: 'Daily 08:00–22:00', fa: 'همه‌روزه \u2068۰۸:۰۰\u2069 تا \u2068۲۲:۰۰\u2069'},
  phone: '+989129333034',
  phoneLabel: '+98 912 933 3034',
  whatsapp: 'https://wa.me/989129333034',
  instagram: {url: 'https://instagram.com/misaf1990', label: '@misaf1990'},
  payment: {cardNumber: '6221061072645437', holder: {en: 'Vendra Florist', fa: 'گل‌فروشی وندرا'}, bank: {en: 'Saman Bank', fa: 'بانک سامان'}}
};
