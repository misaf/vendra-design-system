// Storefront route registration, validation and links. Uses the core VF_SEO router.
import {
  VF_LINES_PATTERN,
  VF_PRODUCTS,
  VF_SAVED_IDS_PATTERN,
  vfBagLine,
  vfFindProduct
} from './catalog.js';
import {VF_SHOP_OCCASIONS} from './translations/categories.js';
import {VF_SEO} from './seo.js';
import {vfFeatures, vfLanguage} from './store-config.js';
import {VF_CATEGORY_SLUGS} from './product-categories.js';

// The shop's quick filters (?filters=), in the order the shop shows them.
export const VF_SHOP_FILTERS = ['ready', 'under3', 'same', 'roses'];
export const VF_ROUTES = [
  'account',
  'bag',
  'checkout',
  'contact',
  'error',
  'faq',
  'home',
  'journal',
  'notfound',
  'policy',
  'post',
  'presentation',
  'product',
  'saved',
  'search',
  'shop',
  'signin',
  'track',
  'weddings'
];
// Policy documents, opened as ?view=policy&id=<doc>; no id shows the first.
export const VF_POLICIES = ['shipping', 'returns', 'privacy', 'terms', 'accessibility'];
// Account tabs, in the order they appear.
export const VF_ACCOUNT_TABS = ['orders', 'balance', 'saved', 'addresses', 'reminders', 'profile'];
export const VF_ROUTE_EXTRA = {
  product: {
    id: 'VF-7K2M4Q',
    cat: 'boxes'
  },
  post: {
    post: 'morning-at-the-studio'
  }
};
// What the sample store's simulated bank answers: paid, cancelled at the bank, refused, or not
// confirmed yet.
export const VF_PAYMENT_RESULTS = ['paid', 'cancelled', 'failed', 'pending'];
// Keep template-only shopping parameters out of the core design-system router.
export function vfReadRoute(search = location.search) {
  VF_SEO.register(...VF_ROUTES);
  const route = VF_SEO.readRoute(search),
    query = new URLSearchParams(search),
    features = vfFeatures();
  // A language the store doesn't offer opens in its default one.
  if (route.lang) route.lang = vfLanguage(route.lang);
  // Pages the store has turned off don't exist.
  if (
    (route.view === 'weddings' && !features.weddings) ||
    (['journal', 'post'].includes(route.view) && !features.journal)
  )
    route.view = 'notfound';
  route.demo = ['loading', 'error'].includes(query.get('demo')) ? query.get('demo') : undefined;
  // Preserve the exact typed query, including trailing spaces while the customer is typing.
  if (route.view === 'search') route.q = query.get('q') || '';
  // The bag is two checkout steps: the bag itself, then delivery details (?view=bag&step=delivery).
  if (route.view === 'bag') route.step = query.get('step') === 'delivery' ? 'delivery' : 'bag';
  // A bag or a shortlist handed over from the shop counter (the presentation's QR code): the site adds
  // it to this visitor's bag or saved list once, then drops it from the address.
  if (route.view === 'bag' && VF_LINES_PATTERN.test(query.get('lines') || ''))
    route.lines = query.get('lines');
  if (route.view === 'saved' && VF_SAVED_IDS_PATTERN.test(query.get('ids') || ''))
    route.ids = query.get('ids');
  // Back from the bank's payment page (?view=checkout&payment=return&order=VN-…). The sample store's
  // simulated bank adds its answer as `result`; a live store asks the API for the payment instead.
  if (route.view === 'checkout' && query.get('payment') === 'return') {
    route.paymentOrder = /^VN-\d{1,16}$/.test(query.get('order') || '') ? query.get('order') : '';
    route.paymentResult = VF_PAYMENT_RESULTS.includes(query.get('result'))
      ? query.get('result')
      : 'pending';
  }
  // An account tab can be linked to (?view=account&tab=balance).
  if (
    route.view === 'account' &&
    VF_ACCOUNT_TABS.includes(query.get('tab')) &&
    (query.get('tab') !== 'reminders' || features.reminders)
  )
    route.tab = query.get('tab');
  // Sign-in started from checkout returns there (?view=signin&next=delivery).
  if (route.view === 'signin' && query.get('next') === 'delivery') route.next = 'delivery';
  // A product is addressed by its category and code (?view=product&id=VF-7K2M4Q&cat=boxes); an old slug
  // (?id=ivory) or a code typed in another case still opens it, and the link is written back in full.
  if (route.view === 'product') {
    const product = vfFindProduct(route.id);
    if (product) {
      route.id = product.id;
      route.cat = product.cat;
      // A counter quote opens with the same size and extras; catalog rules discard invalid choices.
      if (query.has('size') || query.has('addons')) {
        const line = vfBagLine(product, query.get('size'), (query.get('addons') || '').split(','));
        route.size = line.size;
        route.addons = line.addons;
      }
    } else route.view = 'notfound';
  }
  if (route.view === 'policy' && route.id && !VF_POLICIES.includes(route.id))
    route.view = 'notfound';
  // Keep the shopper's intended date on product links, including reloads and language changes.
  if (['shop', 'product'].includes(route.view)) {
    const value = query.get('date') || '';
    const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(value + 'T12:00:00') : null;
    const parts = value.split('-').map(Number);
    route.date =
      date &&
      date.getFullYear() === parts[0] &&
      date.getMonth() + 1 === parts[1] &&
      date.getDate() === parts[2]
        ? value
        : '';
  }
  if (route.view === 'shop') {
    route.cat = VF_CATEGORY_SLUGS.includes(route.cat) ? route.cat : 'all';
    route.sort = ['low', 'high'].includes(query.get('sort')) ? query.get('sort') : 'featured';
    const max = Math.ceil(Math.max(...VF_PRODUCTS.map(p => p.price)) / 100000) * 100000;
    const number = (key, fallback) => {
      const v = query.get(key);
      return v !== null && Number.isFinite(+v) ? Math.max(0, Math.min(max, +v)) : fallback;
    };
    route.min = number('min', 0);
    route.max = Math.max(route.min, number('max', max));
    route.stock = query.get('stock') === '1';
    route.filters = [
      ...new Set(
        (query.get('filters') || '')
          .split(',')
          .filter(id => VF_SHOP_FILTERS.includes(id))
          .filter(id => id !== 'same' || features.sameDay)
      )
    ].sort();
    route.occasion = VF_SHOP_OCCASIONS.includes(query.get('occasion'))
      ? query.get('occasion')
      : 'all';
    // An ISO delivery day (?date=2026-10-09); the shop ignores days that are not open.
    // How many "Show more" pages are open (?page=2 shows the first two pages).
    route.page = /^[1-9]\d{0,2}$/.test(query.get('page') || '') ? +query.get('page') : 1;
  }
  // A journal page (?view=journal&page=2).
  if (route.view === 'journal')
    route.page = /^[1-9]\d{0,2}$/.test(query.get('page') || '') ? +query.get('page') : 1;
  return route;
}
export function vfRouteParams(route) {
  const query = new URLSearchParams(VF_SEO.routeParams(route));
  if (route.demo) query.set('demo', route.demo);
  if (route.view === 'search' && route.q) query.set('q', route.q);
  if (route.view === 'bag' && route.step === 'delivery') query.set('step', 'delivery');
  if (route.view === 'bag' && route.lines) query.set('lines', route.lines);
  if (route.view === 'saved' && route.ids) query.set('ids', route.ids);
  if (route.view === 'product') {
    if (route.date) query.set('date', route.date);
    if (route.size) query.set('size', route.size);
    if (route.addons?.length) query.set('addons', route.addons.join(','));
  }
  if (route.view === 'signin' && route.next === 'delivery') query.set('next', 'delivery');
  if (route.view === 'checkout' && route.paymentOrder) {
    query.set('payment', 'return');
    query.set('order', route.paymentOrder);
    query.set('result', route.paymentResult);
  }
  if (route.view === 'account' && route.tab && route.tab !== 'orders') query.set('tab', route.tab);
  if (route.view === 'shop') {
    if (route.min > 0) query.set('min', route.min);
    const priceMax = Math.ceil(Math.max(...VF_PRODUCTS.map(p => p.price)) / 100000) * 100000;
    if (route.max != null && route.max < priceMax) query.set('max', route.max);
    if (route.stock) query.set('stock', '1');
    if (route.cat === 'all') query.delete('cat');
    if (['low', 'high'].includes(route.sort)) query.set('sort', route.sort);
    const filters = (route.filters || []).filter(id => VF_SHOP_FILTERS.includes(id));
    if (filters.length) query.set('filters', [...new Set(filters)].sort().join(','));
    if (VF_SHOP_OCCASIONS.includes(route.occasion)) query.set('occasion', route.occasion);
    if (route.date) query.set('date', route.date);
    if (route.page > 1) query.set('page', route.page);
  }
  if (route.view === 'journal' && route.page > 1) query.set('page', route.page);
  return '?' + query.toString();
}
export function vfPageRoute(props) {
  return props.routeInfo || vfReadRoute();
}
