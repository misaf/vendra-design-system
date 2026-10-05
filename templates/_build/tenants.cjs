// Generate tokens/tenants/<slug>.css and the runtime tenant list from tokens/tenants/<slug>.json.
const fs = require('node:fs');
const path = require('node:path');
const theme = require('../_shared/tenant-theme.js');
const root = path.resolve(__dirname, '..');
const folder = path.resolve(root, '../tokens/tenants');

function tenantSpecs() {
  const specs = {};
  for (const file of fs.readdirSync(folder).filter(name => name.endsWith('.json')).sort()) {
    const slug = file.slice(0, -5);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Tenant file names must be lowercase slugs: ' + file);
    const label = 'tokens/tenants/' + file;
    let spec;
    try { spec = JSON.parse(fs.readFileSync(path.join(folder, file), 'utf8')); } catch (error) { throw new Error(label + ': ' + error.message); }
    specs[slug] = theme.validate(spec, label);
    const failing = theme.checks(spec).filter(check => !check.pass);
    if (failing.length) throw new Error(label + ' fails contrast: ' + failing.map(c => c.label + ' ' + c.ratio.toFixed(2) + ':1 (needs ' + c.min + ')').join('; '));
  }
  return specs;
}

// Map of absolute filename → content. Also lists stray generated CSS without a JSON source.
function tenantOutputs() {
  const specs = tenantSpecs(), result = new Map();
  for (const [slug, spec] of Object.entries(specs)) result.set(path.join(folder, slug + '.css'), theme.css(slug, spec));
  const orphans = fs.readdirSync(folder).filter(name => name.endsWith('.css') && !specs[name.slice(0, -4)]);
  if (orphans.length) throw new Error('Tenant CSS without a JSON source (tokens/tenants/): ' + orphans.join(', '));
  result.set(path.join(root, '_runtime/tenants.js'),
    '// GENERATED from tokens/tenants/*.json by npm --prefix templates run build.\nwindow.VF_TENANTS = ' + JSON.stringify(specs, null, 2) + ';\n');
  return result;
}

module.exports = {tenantSpecs, tenantOutputs};
