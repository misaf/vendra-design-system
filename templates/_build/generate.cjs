// Writes _runtime/shared-logic.js: the shared storefront logic in _shared/, loaded once by the app as
// a classic script (its top-level declarations are globals the pages read by name).
// Run from anywhere: node /path/to/templates/_build/generate.cjs [--check]
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const sharedLogicFiles = [
  'store-config.js',
  'delivery.js',
  'location.js',
  'promotions.js',
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

// The tenant list the storefront accepts in ?tenant=.
const tenantSlugs = require('./tenants.cjs').tenantSlugs();
const tenantList =
  '// Source: tokens/tenants/*.json (generated)\nconst VF_TENANT_SLUGS = ' +
  JSON.stringify(tenantSlugs) +
  ';';

function sourceCode(file) {
  return (
    '// Source: templates/' + file + '\n' + fs.readFileSync(path.join(root, file), 'utf8').trimEnd()
  );
}

const sharedLogic =
  [tenantList, ...sharedLogicFiles.map(file => sourceCode('_shared/' + file))].join('\n\n') + '\n';
const sharedLogicFile = path.join(root, '_runtime', 'shared-logic.js');
const sharedLogicRuntime =
  '// GENERATED from templates/_shared/ by _build/generate.cjs — do not edit. Run npm --prefix templates run build.\n' +
  sharedLogic;

function outputs() {
  return new Map([[sharedLogicFile, sharedLogicRuntime]]);
}

function generate(check = false) {
  const stale = [];
  for (const [filename, content] of outputs()) {
    if (fs.existsSync(filename) && fs.readFileSync(filename, 'utf8') === content) continue;
    stale.push(path.relative(root, filename));
    if (!check) fs.writeFileSync(filename, content);
  }
  if (check && stale.length)
    throw new Error(
      'Generated files are stale. Run node templates/_build/generate.cjs:\n' + stale.join('\n')
    );
  return stale.length;
}

module.exports = {sharedLogic, outputs, generate};
