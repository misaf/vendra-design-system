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

// The page base class the browser builds in app/runtime.jsx.
const vfPageLine = 'const VFPage = vfPageClass(DCLogic);';

function pageScript(folder) {
  const parts = [vfPageLine];
  if (['storefront-journal', 'storefront-post'].includes(folder))
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
  return parts.map(strip).join('\n\n');
}

// The shared storefront logic (_shared/), in load order, as one script whose declarations are
// globals, as page logic expects them in a vm context.
const sharedFiles = [
  'store-config.js',
  'delivery.js',
  'location.js',
  'promotions.js',
  'product-categories.js',
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
  'page-lifecycle.js',
  'navigation.js'
];
// The package helpers and the routing / focus helpers the shared logic imports, each in its own scope.
const scoped = (name, file) =>
  'const ' + name + ' = (() => {\n' + strip(read(file)) + '\nreturn ' + name + ';\n})();\n';
const sharedLogic =
  scoped('commerce', '../components/utils/commerce.js') +
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
