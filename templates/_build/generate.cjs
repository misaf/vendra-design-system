// Writes _runtime/tenant-slugs.js: the tenant themes the storefront accepts in ?tenant=, from
// tokens/tenants/*.json. Run from anywhere: node /path/to/templates/_build/generate.cjs [--check]
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

const tenantSlugs = require('./tenants.cjs').tenantSlugs();
const tenantSlugsFile = path.join(root, '_runtime', 'tenant-slugs.js');
const tenantSlugsModule =
  '// GENERATED from tokens/tenants/*.json by _build/generate.cjs — do not edit. Run npm --prefix templates run build.\n' +
  'export const VF_TENANT_SLUGS = ' +
  JSON.stringify(tenantSlugs) +
  ';\n';

function outputs() {
  return new Map([[tenantSlugsFile, tenantSlugsModule]]);
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

module.exports = {tenantSlugs, outputs, generate};
