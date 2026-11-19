// VM harness for page hooks and stateful scenarios. Each context supplies its own React stub,
// browser globals and runtime state. The harness strips imports and exports so the page hooks can
// run against those stubs and tests can control the clock, storage and integration responses.
import fs from 'node:fs';
import path from 'node:path';
import {tenantSlugs, tenantSpecs} from '../../../tools/tenants.mjs';

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

function featureFiles(folder) {
  if (folder === 'shell/session') {
    return {hook: 'useStorefrontSession', logic: 'useStorefrontSession.js'};
  }
  const slug = path.basename(folder);
  const name =
    {
      cart: 'Bag',
      catalog: 'Shop',
      counter: 'Presentation',
      notfound: 'NotFound',
      signin: 'SignIn',
      tracking: 'Track'
    }[slug] || slug[0].toUpperCase() + slug.slice(1);
  const hook = 'use' + name;
  return {hook, logic: hook + '.js', view: name + 'View.jsx', screen: name + 'Screen.jsx'};
}

function pageScript(folder) {
  const parts = [];
  if (['features/home', 'features/journal', 'features/post'].includes(folder))
    parts.push(read('i18n/journal-content.js'));
  if (fs.existsSync(path.join(templates, folder, 'copy.js'))) parts.push(read(folder + '/copy.js'));
  if (folder === 'features/checkout') parts.push(read(folder + '/payment-recovery.js'));
  const files = featureFiles(folder);
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

// The shared storefront logic (shared/), in load order, as one script whose declarations are
// globals, as page logic expects them in a vm context. The runtime (shared/platform/runtime.js) is
// installed at the end and exposed as the context's vfRuntime.
const sharedFiles = [
  'shared/domain/store-config.js',
  'shared/domain/brand.js',
  'shared/domain/delivery.js',
  'shared/domain/store-hours.js',
  'shared/domain/location.js',
  'shared/domain/promotions.js',
  'shared/domain/product-categories.js',
  'shared/domain/category-images.js',
  'shared/domain/journal-images.js',
  'shared/domain/catalog.js',
  'i18n/shell.js',
  'i18n/categories.js',
  'i18n/journal-moved.js',
  'i18n/time.js',
  'shared/domain/order-message.js',
  'i18n/location.js',
  'shared/domain/account-data.js',
  'shared/domain/wallet.js',
  'shared/domain/payments.js',
  'shared/domain/payment-api.js',
  'shared/services/integrations/api.js',
  'shared/services/integrations/analytics.js',
  'shared/services/integrations/runtime.js',
  'shared/domain/formatting.js',
  'shared/services/routing.js',
  'shared/services/structured-data.js',
  'shared/services/page-state.js',
  'shared/services/list-tracking.js',
  'shared/services/tenant.js',
  'shared/services/page-metadata.js',
  'shared/services/page-lifecycle.js',
  'shared/services/navigation.js'
];
// The package helpers and the routing / focus helpers the shared logic imports, each in its own scope.
const scoped = (name, file) =>
  'const ' + name + ' = (() => {\n' + strip(read(file)) + '\nreturn ' + name + ';\n})();\n';
const sharedLogic =
  hooksHarness +
  // utils/locales.js declares LOCALES, localeConfig and plural at the top level.
  strip(read('../../packages/ui/components/utils/locales.js')) +
  '\n' +
  scoped('commerce', 'shared/domain/commerce.js') +
  scoped('analytics', '../../packages/ui/components/utils/analytics.js') +
  scoped('dates', '../../packages/ui/components/utils/dates.js') +
  scoped('format', 'design-system/components/utils/format.js') +
  strip(read('shared/platform/runtime.js')) +
  strip(read('shared/platform/environment.js')) +
  scoped('VF_SEO', 'shared/services/seo.js') +
  scoped('VF_NAV', 'shared/services/page-focus.js') +
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

export {featureFiles, pageScript, sharedLogic};
