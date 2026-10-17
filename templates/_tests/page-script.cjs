// A storefront page's copy and logic as one classic script, for running in a vm context that already
// holds the shared logic: module imports (React, the runtime, copy, journal content) are dropped
// and exports become plain declarations, as the browser sees them once imported.
const fs = require('node:fs');
const path = require('node:path');
const templates = path.resolve(__dirname, '..');
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
const componentHarness = `
const pageReady = () => true;
const loadPage = () => null;
const __vfUsePageLogic = usePageLogic;
usePageLogic = (props, init) => (globalThis.__vfPage = __vfUsePageLogic(props, init));
class Component {
  constructor(props) {
    const slots = [];
    let page = null;
    const render = () => {
      React.begin(slots);
      return usePage(page ? page.props : props);
    };
    globalThis.__vfFlush = () => page && page.done.splice(0).forEach(done => done());
    render();
    page = globalThis.__vfPage;
    return new Proxy(page, {get: (target, key) => (key === 'renderVals' ? render : target[key])});
  }
}
`;

function pageScript(folder) {
  const parts = [];
  if (['storefront-home', 'storefront-journal', 'storefront-post'].includes(folder))
    parts.push(read('_shared/translations/journal-content.js'));
  if (fs.existsSync(path.join(templates, folder, 'copy.js'))) parts.push(read(folder + '/copy.js'));
  const logic = read(folder + '/logic.js');
  // Pages that queue toasts get a minimal queue (the component's is React Aria's).
  if (logic.includes('ToastQueue'))
    parts.push(
      'class ToastQueue { constructor() { this.visibleToasts = []; } ' +
        'add(content) { this.visibleToasts = [{key: "t", content}]; return "t"; } ' +
        'close() { this.visibleToasts = []; } clear() { this.visibleToasts = []; } }'
    );
  parts.push(logic);
  return parts.map(strip).join('\n\n') + componentHarness;
}

// The shared storefront logic (_shared/), in load order, as one script whose declarations are
// globals, as page logic expects them in a vm context.
const sharedFiles = [
  'store-config.js',
  'delivery.js',
  'location.js',
  'promotions.js',
  'product-categories.js',
  'category-images.js',
  'catalog.js',
  'translations/shell.js',
  'translations/categories.js',
  'translations/time.js',
  'translations/location.js',
  'account-data.js',
  'wallet.js',
  'payments.js',
  'integrations/api.js',
  'integrations/analytics.js',
  'formatting.js',
  'routing.js',
  'page-state.js',
  'page-lifecycle.js',
  'navigation.js'
];
// The package helpers and the routing / focus helpers the shared logic imports, each in its own scope.
const scoped = (name, file) =>
  'const ' + name + ' = (() => {\n' + strip(read(file)) + '\nreturn ' + name + ';\n})();\n';
const sharedLogic =
  hooksHarness +
  scoped('commerce', '../components/utils/commerce.js') +
  scoped('analytics', '../components/utils/analytics.js') +
  scoped('dates', '../components/utils/dates.js') +
  scoped('format', '../components/utils/format.js') +
  scoped('VF_SEO', '_shared/seo.js') +
  scoped('VF_NAV', '_shared/page-focus.js') +
  'const VF_TENANT_SLUGS = ' +
  JSON.stringify(require('../_build/tenants.cjs').tenantSlugs()) +
  ';\n\n' +
  sharedFiles.map(file => strip(read('_shared/' + file))).join('\n\n') +
  '\n';

module.exports = {pageScript, strip, sharedLogic, sharedFiles};
