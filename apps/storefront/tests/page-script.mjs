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
    {signin: 'SignIn', notfound: 'NotFound'}[slug] || slug[0].toUpperCase() + slug.slice(1);
  const hook = 'use' + name;
  return {hook, logic: hook + '.js', view: name + 'View.jsx', screen: name + 'Screen.jsx'};
}

function pageScript(folder) {
  const parts = [];
  if (['features/home', 'features/journal', 'features/post'].includes(folder))
    parts.push(read('shared/translations/journal-content.js'));
  if (fs.existsSync(path.join(templates, folder, 'copy.js'))) parts.push(read(folder + '/copy.js'));
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
  'domain/store-config.js',
  'domain/brand.js',
  'domain/delivery.js',
  'domain/store-hours.js',
  'domain/location.js',
  'domain/promotions.js',
  'domain/product-categories.js',
  'domain/category-images.js',
  'domain/journal-images.js',
  'domain/catalog.js',
  'translations/shell.js',
  'translations/categories.js',
  'translations/journal-moved.js',
  'translations/time.js',
  'domain/order-message.js',
  'translations/location.js',
  'domain/account-data.js',
  'domain/wallet.js',
  'domain/payments.js',
  'domain/payment-api.js',
  'services/integrations/api.js',
  'services/integrations/analytics.js',
  'services/integrations/runtime.js',
  'domain/formatting.js',
  'services/routing.js',
  'services/structured-data.js',
  'services/page-state.js',
  'services/list-tracking.js',
  'services/page-lifecycle.js',
  'services/navigation.js'
];
// The package helpers and the routing / focus helpers the shared logic imports, each in its own scope.
const scoped = (name, file) =>
  'const ' + name + ' = (() => {\n' + strip(read(file)) + '\nreturn ' + name + ';\n})();\n';
const sharedLogic =
  hooksHarness +
  // utils/locales.js declares LOCALES, localeConfig and plural at the top level.
  strip(read('design-system/components/utils/locales.js')) +
  '\n' +
  scoped('commerce', 'design-system/components/utils/commerce.js') +
  scoped('analytics', 'design-system/components/utils/analytics.js') +
  scoped('dates', 'design-system/components/utils/dates.js') +
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
  sharedFiles.map(file => strip(read('shared/' + file))).join('\n\n') +
  // Installs the integrations as shell/runtime.js does; tests stub them through this.vfRuntime.
  '\nvfInstallRuntime();\nthis.vfRuntime = vfRuntime;\n';

export {featureFiles, pageScript, sharedLogic};
