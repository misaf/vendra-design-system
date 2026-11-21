// VM harness for page hooks and stateful scenarios. Each context supplies its own React stub,
// browser globals and runtime state. The harness strips imports and exports so the page hooks can
// run against those stubs and tests can control the clock, storage and integration responses.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {tenantSlugs, tenantSpecs} from '../tools/build/tenants.mjs';

const templates = path.resolve(import.meta.dirname, '..');
const read = file => fs.readFileSync(path.join(templates, file), 'utf8');
const strip = code =>
  code
    .replace(/^import [^;]*;\n/gm, '')
    .replace(/^export (?=(?:async |const |function|class |let |var ))/gm, '');

// Runs a page's usePage(props) hook outside React: a stand-in for React's hooks keeps each hook's
// value between renders (effects don't run, as the logic tests never mounted pages), and
// Component(props) returns the page object (state, setState, props and its helpers) with
// renderVals() rendering the hook again. setState callbacks run at once, as the old test stub did.
const hooksHarness = `
const React = (() => {
  let slots = [], index = 0;
  const slot = make => (index in slots ? slots[index++] : (slots[index++] = make()));
  return {
    begin(next) { slots = next; index = 0; },
    useRef: initial => slot(() => ({current: initial})),
    useReducer: (reducer, initial) => slot(() => [initial, () => globalThis.__vfFlush()]),
    useState: initial => slot(() => {
      const box = [typeof initial === 'function' ? initial() : initial];
      box[1] = value => { box[0] = typeof value === 'function' ? value(box[0]) : value; };
      return box;
    }),
    useEffect: () => { index++; },
    useLayoutEffect: () => { index++; },
    useMemo: make => { index++; return make(); },
    useCallback: fn => { index++; return fn; }
  };
})();
`;
const componentHarness = hook => `
const __vfUsePageLogic = usePageLogic;
usePageLogic = (props, init) => (globalThis.__vfPage = __vfUsePageLogic(props, init));
class Component {
  constructor(props) {
    const slots = [];
    let page = null;
    const render = () => {
      React.begin(slots);
      return ${hook}(page ? page.props : props);
    };
    if (typeof vfSiteInitial === 'function') {
      props = {
        ...props,
        navigate(url, {replace}) {
          history[replace ? 'replaceState' : 'pushState']({}, '', url);
          page.receiveAddress(url);
        }
      };
    }
    globalThis.__vfFlush = () => page && page.done.splice(0).forEach(done => done());
    render();
    page = globalThis.__vfPage;
    if (typeof vfSiteInitial === 'function') {
      page.restoreAddress(location.pathname + location.search);
    }
    return new Proxy(page, {get: (target, key) => (key === 'renderVals' ? render : target[key])});
  }
}
`;

const routeFolders = {
  account: 'src/storefront/customer/account',
  cart: 'src/storefront/cart/bag',
  catalog: 'src/storefront/catalog/shop',
  checkout: 'src/storefront/checkout/order-checkout',
  contact: 'src/storefront/content/contact',
  counter: 'src/storefront/presentation',
  error: 'src/storefront/shell/error',
  faq: 'src/storefront/content/faq',
  home: 'src/storefront/catalog/home',
  journal: 'src/storefront/content/journal',
  notfound: 'src/storefront/shell/not-found',
  policy: 'src/storefront/content/policy',
  post: 'src/storefront/content/journal/post',
  product: 'src/storefront/catalog/product',
  saved: 'src/storefront/customer/saved',
  search: 'src/storefront/catalog/search',
  signin: 'src/storefront/customer/sign-in',
  tracking: 'src/storefront/orders/tracking',
  weddings: 'src/storefront/content/weddings'
};

function featureFiles(name) {
  if (name === 'site') {
    return {hook: 'useStorefrontSession', logic: 'useStorefrontSession.js'};
  }
  const slug = name;
  const title =
    {
      cart: 'Bag',
      catalog: 'Shop',
      counter: 'Presentation',
      notfound: 'NotFound',
      signin: 'SignIn',
      tracking: 'Track'
    }[slug] || slug[0].toUpperCase() + slug.slice(1);
  const hook = 'use' + title;
  const source = stem =>
    ['.tsx', '.jsx']
      .map(ext => stem + ext)
      .find(file => fs.existsSync(path.join(templates, routeFolders[name], file))) ?? stem + '.tsx';
  return {
    hook,
    logic: hook + '.js',
    view: source(title + 'View'),
    screen: source(title + 'Screen')
  };
}

function pageScript(name) {
  const folder = name === 'site' ? 'src/storefront/session' : routeFolders[name];
  const parts = [];
  if (['home', 'journal', 'post'].includes(name))
    parts.push(read('src/storefront/content/journal-content.js'));
  if (fs.existsSync(path.join(templates, folder, 'copy.js'))) parts.push(read(folder + '/copy.js'));
  if (name === 'site')
    parts.push(
      read('src/storefront/checkout/checkout-guard.js'),
      read('src/storefront/customer/customer-draft.js'),
      read('src/storefront/customer/saved/saved-sync.js'),
      read('src/storefront/session/session-storage.js')
    );
  if (name === 'checkout') parts.push(read(folder + '/payment-recovery.js'));
  if (name === 'account')
    parts.push(read(folder + '/account-editor-actions.js'), read(folder + '/useAccountWallet.js'));
  if (name === 'counter')
    parts.push(
      ...[
        'presentation-settings.js',
        'display-rotation.js',
        'browsing-viewer.js',
        'camera-scanner.js'
      ].map(file => read(folder + '/' + file))
    );
  const files = featureFiles(name);
  const logic = read(folder + '/' + files.logic);
  // Pages that queue toasts get a minimal queue (the component's is React Aria's).
  if (logic.includes('ToastQueue'))
    parts.push(
      'class ToastQueue { constructor() { this.visibleToasts = []; } ' +
        'add(content) { this.visibleToasts = [{key: "t", content}]; return "t"; } ' +
        'close() { this.visibleToasts = []; } clear() { this.visibleToasts = []; } }'
    );
  parts.push(logic);
  return parts.map(strip).join('\n\n') + componentHarness(files.hook);
}

// Shared storefront modules, in load order, as one script whose declarations are
// globals, as page logic expects them in a vm context. The runtime (src/platform/browser/runtime.js) is
// installed at the end and exposed as the context's vfRuntime.
const sharedFiles = [
  'src/storefront/store/store-config.js',
  'src/storefront/store/brand.js',
  'src/storefront/delivery/delivery-draft.js',
  'src/storefront/delivery/delivery-schedule.js',
  'src/storefront/delivery/delivery-validation.js',
  'src/storefront/store/store-hours.js',
  'src/storefront/delivery/location.js',
  'src/storefront/pricing/promotions.js',
  'src/storefront/catalog/product-categories.js',
  'src/storefront/catalog/category-images.js',
  'src/storefront/content/journal-images.js',
  'src/storefront/catalog/sample-catalog.js',
  'src/storefront/catalog/catalog.js',
  'src/storefront/catalog/shop-filters.js',
  'src/storefront/catalog/recently-viewed.js',
  'src/storefront/cart/cart-lines.js',
  'src/storefront/shell/shell.js',
  'src/storefront/catalog/categories.js',
  'src/storefront/content/journal-moved.js',
  'src/storefront/content/policy-documents.js',
  'src/storefront/delivery/time.js',
  'src/storefront/checkout/order-message.js',
  'src/storefront/delivery/location-messages.js',
  'src/storefront/customer/account-data.js',
  'src/storefront/customer/account-tabs.js',
  'src/storefront/cart/laravel/selection-metadata.js',
  'src/storefront/orders/laravel/order-line.js',
  'src/storefront/orders/order-records.js',
  'src/storefront/customer/wallet.js',
  'src/storefront/checkout/payments.js',
  'src/storefront/checkout/payment-api.js',
  'src/platform/browser/integrations/api-errors.js',
  'src/platform/browser/integrations/request.js',
  'src/platform/browser/integrations/idempotency.js',
  'src/platform/browser/integrations/saved-items.js',
  'src/platform/browser/integrations/catalog-stock.js',
  'src/platform/browser/integrations/checkout.js',
  'src/platform/browser/integrations/inquiries.js',
  'src/platform/browser/integrations/leaflet.js',
  'src/platform/browser/integrations/newsletter.js',
  'src/platform/browser/integrations/api.js',
  'src/platform/browser/integrations/analytics.js',
  'src/platform/browser/integrations/runtime.js',
  'src/storefront/pricing/formatting.js',
  'src/storefront/shell/routing.js',
  'src/storefront/shell/structured-data.js',
  'src/storefront/shell/page-state.js',
  'src/platform/browser/list-tracking.js',
  'src/platform/tenant/tenant.js',
  'src/storefront/shell/page-metadata.js',
  'src/storefront/shell/page-lifecycle.js',
  'src/storefront/shell/navigation.js',
  'src/storefront/shell/consent.js',
  'src/storefront/shell/shell-props.js',
  'src/storefront/customer/saved-items.js'
];
// The package helpers and the routing / focus helpers the shared logic imports, each in its own scope.
const scoped = (name, ...files) =>
  'const ' +
  name +
  ' = (() => {\n' +
  files.map(file => strip(read(file))).join('\n') +
  '\nreturn ' +
  name +
  ';\n})();\n';
const sharedLogic =
  hooksHarness +
  // utils/locales.js declares LOCALES, localeConfig and plural at the top level.
  strip(read('src/design-system/utils/locales.js')) +
  '\n' +
  strip(read('src/design-system/utils/input.js')) +
  '\n' +
  strip(read('src/design-system/utils/coordinates.js')) +
  '\n' +
  [
    'src/storefront/store/store-clock.js',
    'src/storefront/store/opening-hours.js',
    'src/storefront/delivery/delivery-window.js',
    'src/storefront/pricing/order-totals.js',
    'src/storefront/catalog/search-index.js',
    'src/storefront/delivery/delivery-zones.js',
    'src/storefront/catalog/pagination.js',
    'src/storefront/delivery/delivery-copy.js',
    'src/storefront/catalog/product-api.js',
    'src/storefront/orders/order-line-view.js',
    'src/storefront/orders/order-api.js',
    'src/storefront/store/store-features.js',
    'src/storefront/checkout/payment-options.js',
    'src/storefront/checkout/checkout-request.js'
  ]
    .map(file => strip(read(file)))
    .join('\n') +
  '\nconst pageItems = page, vfMobile = mobile;\n' +
  scoped('analytics', 'src/design-system/utils/analytics.js') +
  scoped('dates', 'src/design-system/utils/dates.js') +
  scoped('format', 'src/design-system/utils/format.js') +
  strip(read('src/platform/browser/runtime.js')) +
  strip(read('src/platform/browser/environment.js')) +
  scoped('VF_SEO', 'src/storefront/shell/seo.js') +
  scoped('VF_NAV', 'src/platform/browser/page-focus.js') +
  'const VF_TENANT_BRANDS = ' +
  JSON.stringify(
    Object.fromEntries(
      Object.entries(tenantSpecs()).map(([slug, spec]) => [slug, spec.brand || {}])
    )
  ) +
  ';\n' +
  'const VF_TENANT_SLUGS = ' +
  JSON.stringify(tenantSlugs()) +
  ';\n\n' +
  sharedFiles.map(file => strip(read(file))).join('\n\n') +
  // Install the same integrations as the Next.js entry point. Tests stub them through vfRuntime.
  '\nvfInstallRuntime();\nthis.vfRuntime = vfRuntime;\n';

// Sets the test page's address: a path under the app, with its query.
function setAddress(ctx, url) {
  const address = new URL(url, 'http://localhost/');
  ctx.location.pathname = address.pathname;
  ctx.location.search = address.search;
}
function openDeliveryWindow(ctx, delivery, lines) {
  const now = new Date();
  const deliveryDate = vm.runInContext('vfDeliveryDate', ctx);
  const deliverySlots = vm.runInContext('vfDeliverySlots', ctx);
  const date = deliveryDate(delivery, now, lines);
  const slot = deliverySlots(date, now).find(window => !window.closed).start;
  return {date, slot};
}
function context() {
  const history = [];
  const ctx = {
    URL,
    URLSearchParams,
    console,
    document: {getElementById: () => null},
    setTimeout,
    clearTimeout,
    location: {
      pathname: '/',
      search: '',
      href: 'http://localhost/'
    },
    history: {
      pushState: (_, __, url) => history.push(['push', url]),
      replaceState: (_, __, url) => history.push(['replace', url])
    },
    sessionStorage: {getItem: () => null, setItem: () => {}},
    DCLogic: class {
      constructor(props) {
        this.props = props;
        this.state = {};
      }
      setState(update, cb) {
        Object.assign(this.state, typeof update === 'function' ? update(this.state) : update);
        if (cb) cb();
      }
    }
  };
  ctx.window = {React: {}, innerWidth: 390, scrollTo: () => {}};
  vm.createContext(ctx);
  return {ctx, history};
}

function loadPage(name, props = {}, search = '') {
  const {ctx: c, history} = context();
  setAddress(c, search);
  vm.runInContext(sharedLogic, c);
  const feature = {bag: 'cart', shop: 'catalog', presentation: 'counter', track: 'tracking'}[name];
  vm.runInContext(pageScript(feature || name) + '\nthis.Logic=Component;', c);
  return {logic: new c.Logic({lang: 'en', ...props}), ctx: c, history};
}

export {
  context,
  featureFiles,
  loadPage,
  openDeliveryWindow,
  pageScript,
  routeFolders,
  setAddress,
  sharedLogic
};
