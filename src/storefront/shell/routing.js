// Storefront path and query rules shared by navigation, metadata, and static export.
import {VF_PRODUCTS, VF_SAVED_IDS_PATTERN, vfFindProduct} from '../catalog/catalog.js';
import {VF_LINES_PATTERN, vfBagLine} from '../cart/cart-lines.js';
import {VF_SHOP_OCCASIONS} from '../catalog/categories.js';
import {VF_POST_MOVED} from '../content/journal-moved.js';
import {VF_SHOP_FILTERS} from '../catalog/shop-filters.js';
import {VF_POLICIES} from '../content/policy-documents.js';
import {VF_ACCOUNT_TABS} from '../customer/account-tabs.js';
import {VF_PAYMENT_RESULTS} from '../checkout/payments.js';
import {vfFeatures, vfLanguage} from '../store/store-config.js';
import {VF_CATEGORY_SLUGS} from '../catalog/product-categories.js';
import {vfAssetBase, vfLocation} from '../../platform/browser/environment.js';
import {LOCALES} from '../../design-system/utils/locales.js';

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
export const VF_ROUTE_EXTRA = {
  product: {
    id: 'VF-7K2M4Q',
    cat: 'boxes'
  },
  post: {
    post: 'morning-at-the-studio'
  }
};
// These legacy screen names still parse, without adding pages to navigation or static export.
const SCREENS = new Set([...VF_ROUTES, 'gifts', 'moment', 'custom', 'care']);
const ROUTE_LANGUAGES = Object.keys(LOCALES);
const SEGMENT = {product: 'id', post: 'post', moment: 'm', track: 'id', shop: 'cat', policy: 'id'};
const PATH_NAME = {post: 'journal'};
const REQUIRED = {product: 'id', post: 'post', moment: 'm'};
const SAFE = /^[\w:-]{1,40}$/;
const DIGITS = /^\d{1,40}$/;
const validSegment = (key, value) => SAFE.test(value) && (key !== 'm' || DIGITS.test(value));

export function vfAppBase() {
  const base = vfAssetBase();
  return /^(\/|\w+:)/.test(base) ? new URL(base, vfLocation()).pathname : '/';
}

function routeSuffix(pathname) {
  const root = vfAppBase();
  if (pathname === root || pathname === root + 'index.html') return '';
  if (!pathname.startsWith(root)) return null;
  const suffix = pathname.slice(root.length);
  return ROUTE_LANGUAGES.includes(suffix.split('/')[0]) ? suffix : null;
}

// Whether a URL is a local storefront page.
export function vfInApp(url) {
  try {
    const here = vfLocation();
    const target = new URL(url, here);
    return (
      target.origin === here.origin &&
      routeSuffix(target.pathname) != null &&
      !/\.\w+$/.test(target.pathname)
    );
  } catch {
    return false;
  }
}

function readPath(pathname) {
  const route = {view: 'notfound'};
  const suffix = routeSuffix(pathname);
  if (suffix == null) return route;
  let parts;
  try {
    parts = suffix.split('/').filter(Boolean).map(decodeURIComponent);
  } catch {
    return route;
  }
  if (parts[0] === 'index.html') parts.shift();
  if (ROUTE_LANGUAGES.includes(parts[0])) route.lang = parts.shift();
  const name = parts.shift();
  if (name == null) route.view = 'home';
  else if (name === 'journal' && parts.length) route.view = 'post';
  else if (SAFE.test(name) && SCREENS.has(name) && !PATH_NAME[name]) route.view = name;
  else return route;
  const key = SEGMENT[route.view];
  if (parts.length) {
    const value = parts.shift();
    if (!key || !validSegment(key, value) || parts.length) return {...route, view: 'notfound'};
    route[key] = value;
  }
  if (REQUIRED[route.view] && !route[REQUIRED[route.view]]) route.view = 'notfound';
  return route;
}

// Each path ends in a slash so the static host can serve its index.html.
export function vfRoutePath(route = {}) {
  const parts = [];
  if (ROUTE_LANGUAGES.includes(route.lang)) parts.push(route.lang);
  if (route.view && route.view !== 'home' && SAFE.test(route.view)) {
    parts.push(PATH_NAME[route.view] || route.view);
    const key = SEGMENT[route.view];
    const value = key == null || (key === 'cat' && route.cat === 'all') ? undefined : route[key];
    if (value != null && value !== '' && validSegment(key, String(value)))
      parts.push(String(value));
  }
  return vfAppBase() + parts.map(part => encodeURIComponent(part) + '/').join('');
}

export const vfCurrentUrl = () => vfLocation().pathname + vfLocation().search;

export function vfRouteOffered(view, features = vfFeatures()) {
  return (
    (view !== 'weddings' || features.weddings) &&
    (!['journal', 'post'].includes(view) || features.journal)
  );
}

// Read delivery days on both shop and product links.
function readRouteDate(query) {
  const value = query.get('date') || '';
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(value + 'T12:00:00') : null;
  const [year, month, day] = value.split('-').map(Number);
  return date &&
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
    ? value
    : '';
}

function readRoutePage(query) {
  const value = query.get('page') || '';
  return /^[1-9]\d{0,2}$/.test(value) ? +value : 1;
}

function writeRoutePage(route, query) {
  if (route.page > 1) query.set('page', route.page);
}

// Each entry describes the query state accepted and emitted by one screen.
const ROUTE_QUERY = {
  search: {
    read(route, query) {
      // Preserve trailing spaces while the customer is typing.
      route.q = query.get('q') || '';
    },
    write(route, query) {
      if (route.q) query.set('q', route.q);
    }
  },
  bag: {
    read(route, query) {
      route.step = query.get('step') === 'delivery' ? 'delivery' : 'bag';
      // Counter hand-over links import lines once.
      const lines = query.get('lines') || '';
      if (VF_LINES_PATTERN.test(lines)) route.lines = lines;
    },
    write(route, query) {
      if (route.step === 'delivery') query.set('step', 'delivery');
      if (route.lines) query.set('lines', route.lines);
    }
  },
  saved: {
    read(route, query) {
      const ids = query.get('ids') || '';
      if (VF_SAVED_IDS_PATTERN.test(ids)) route.ids = ids;
    },
    write(route, query) {
      if (route.ids) query.set('ids', route.ids);
    }
  },
  checkout: {
    read(route, query) {
      if (query.get('payment') !== 'return') return;
      const order = query.get('order') || '';
      const result = query.get('result');
      route.paymentOrder = /^[A-Za-z0-9][A-Za-z0-9-]{0,39}$/.test(order) ? order : '';
      // Live stores look up the order at the API. The result is for the simulated bank.
      route.paymentResult = VF_PAYMENT_RESULTS.includes(result) ? result : 'pending';
    },
    write(route, query) {
      if (!route.paymentOrder) return;
      query.set('payment', 'return');
      query.set('order', route.paymentOrder);
      query.set('result', route.paymentResult);
    }
  },
  account: {
    read(route, query, features) {
      const tab = query.get('tab');
      if (VF_ACCOUNT_TABS.includes(tab) && (tab !== 'reminders' || features.reminders))
        route.tab = tab;
      if (route.tab === 'balance' && query.get('next') === 'checkout') route.next = 'checkout';
    },
    write(route, query) {
      if (route.tab && route.tab !== 'orders') query.set('tab', route.tab);
      if (route.tab === 'balance' && route.next === 'checkout') query.set('next', 'checkout');
    }
  },
  signin: {
    read(route, query) {
      if (query.get('next') === 'delivery') route.next = 'delivery';
    },
    write(route, query) {
      if (route.next === 'delivery') query.set('next', 'delivery');
    }
  },
  product: {
    read(route, query) {
      // Resolve old slugs and differently cased codes to the catalog's product code.
      const product = vfFindProduct(route.id);
      if (!product) {
        route.view = 'notfound';
        return;
      }
      route.id = product.id;
      route.cat = product.cat;
      const qty = query.get('qty') || '';
      route.qty = /^[1-9]\d?$/.test(qty) ? +qty : 1;
      // Counter quotes carry the selected size and extras, validated against the catalog.
      if (query.has('size') || query.has('addons')) {
        const line = vfBagLine(product, query.get('size'), (query.get('addons') || '').split(','));
        route.size = line.size;
        route.addons = line.addons;
      }
      route.date = readRouteDate(query);
    },
    write(route, query) {
      if (route.date) query.set('date', route.date);
      if (route.qty > 1) query.set('qty', route.qty);
      if (route.size) query.set('size', route.size);
      if (route.addons?.length) query.set('addons', route.addons.join(','));
    }
  },
  shop: {
    read(route, query, features) {
      route.date = readRouteDate(query);
      if (route.cat && !VF_CATEGORY_SLUGS.includes(route.cat)) {
        route.view = 'notfound';
        return;
      }
      route.cat = route.cat || 'all';
      const sort = query.get('sort');
      route.sort = ['low', 'high'].includes(sort) ? sort : 'featured';
      const max = vfShopPriceMax();
      const price = (key, fallback) => {
        const value = query.get(key);
        return value !== null && Number.isFinite(+value)
          ? Math.max(0, Math.min(max, +value))
          : fallback;
      };
      route.min = price('min', 0);
      route.max = Math.max(route.min, price('max', max));
      route.stock = query.get('stock') === '1';
      route.filters = [
        ...new Set(
          (query.get('filters') || '')
            .split(',')
            .filter(id => VF_SHOP_FILTERS.includes(id))
            .filter(id => id !== 'same' || features.sameDay)
        )
      ].sort();
      const occasion = query.get('occasion');
      route.occasion = VF_SHOP_OCCASIONS.includes(occasion) ? occasion : 'all';
      route.page = readRoutePage(query);
    },
    write(route, query) {
      if (route.min > 0) query.set('min', route.min);
      if (route.max != null && route.max < vfShopPriceMax()) query.set('max', route.max);
      if (route.stock) query.set('stock', '1');
      if (['low', 'high'].includes(route.sort)) query.set('sort', route.sort);
      const filters = (route.filters || []).filter(id => VF_SHOP_FILTERS.includes(id));
      if (filters.length) query.set('filters', [...new Set(filters)].sort().join(','));
      if (VF_SHOP_OCCASIONS.includes(route.occasion)) query.set('occasion', route.occasion);
      if (route.date) query.set('date', route.date);
      writeRoutePage(route, query);
    }
  },
  journal: {
    read(route, query) {
      route.page = readRoutePage(query);
    },
    write: writeRoutePage
  }
};

export function vfReadRoute(url = vfCurrentUrl()) {
  const {pathname, searchParams} = new URL(url, vfLocation());
  const route = readPath(pathname);
  const features = vfFeatures();
  if (route.lang) route.lang = vfLanguage(route.lang);
  if (!vfRouteOffered(route.view, features)) route.view = 'notfound';

  const demo = searchParams.get('demo');
  route.demo = ['loading', 'error'].includes(demo) ? demo : undefined;
  ROUTE_QUERY[route.view]?.read(route, searchParams, features);

  if (route.view === 'policy' && route.id && !VF_POLICIES.includes(route.id))
    route.view = 'notfound';
  // A retired article links back to its replacement.
  if (route.view === 'post' && Object.hasOwn(VF_POST_MOVED, route.post))
    route.post = VF_POST_MOVED[route.post];
  return route;
}

export function vfRouteUrl(route) {
  const path = vfRoutePath(route);
  const query = new URLSearchParams();
  if (route.demo) query.set('demo', route.demo);
  ROUTE_QUERY[route.view]?.write?.(route, query);
  const search = query.toString();
  return search ? path + '?' + search : path;
}
// The top of the shop's price filter: the dearest product, rounded up to the next 100,000.
function vfShopPriceMax() {
  return Math.ceil(Math.max(...VF_PRODUCTS.map(p => p.price)) / 100000) * 100000;
}
// The one address search engines should know a route by (its canonical URL, and with only `lang`
// changed its hreflang alternates): the language, the page and its id from the path, plus the query
// that changes what the page is about — a shop occasion and a journal page. Sorting, price, stock,
// quick filters, the delivery day, the shop's cumulative "Show more" pages, product choices, demos
// and every step or hand-over parameter are left out, and vfRouteUrl writes the rest in one order.
export function vfCanonicalRoute(route) {
  const canonical = {view: route.view, lang: route.lang};
  if (['product', 'policy', 'track'].includes(route.view) && route.id) canonical.id = route.id;
  if (route.view === 'post') canonical.post = route.post;
  if (route.view === 'shop') {
    canonical.cat = route.cat;
    canonical.occasion = route.occasion;
  }
  if (route.view === 'journal' && route.page > 1) canonical.page = route.page;
  return canonical;
}
// Whether a route is a refinement of an indexed page that search engines should not list (robots
// noindex, follow): a demo state, or a shop sorted, filtered by price, stock, quick filters or a
// delivery day, or narrowed by both a category and an occasion.
export function vfRouteRefined(route) {
  if (route.demo) return true;
  if (route.view !== 'shop') return false;
  return Boolean(
    ['low', 'high'].includes(route.sort) ||
    route.min > 0 ||
    (route.max != null && route.max < vfShopPriceMax()) ||
    route.stock ||
    route.filters?.length ||
    route.date ||
    (route.cat && route.cat !== 'all' && VF_SHOP_OCCASIONS.includes(route.occasion))
  );
}
export function vfPageRoute(props) {
  return props.routeInfo || vfReadRoute();
}
