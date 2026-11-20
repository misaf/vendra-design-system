// Writes _runtime/tenant-slugs.js: the tenant themes the storefront accepts in ?tenant=, from
// tokens/tenants/*.json. Run from anywhere: node /path/to/build/generate.mjs [--check]
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {tenantSlugs, tenantSpecs} from '../tools/tenants.mjs';

const root = path.resolve(import.meta.dirname, '..');

const tenantSlugsFile = path.join(root, '_runtime', 'tenant-slugs.js');
const tenantSlugsModule =
  '// GENERATED from tokens/tenants/*.json by build/generate.mjs — do not edit. Run npm run build.\n' +
  'export const VF_TENANT_SLUGS = ' +
  JSON.stringify(tenantSlugs()) +
  ';\nexport const VF_TENANT_BRANDS = ' +
  JSON.stringify(
    Object.fromEntries(
      Object.entries(tenantSpecs()).map(([slug, spec]) => [slug, spec.brand || {}])
    )
  ) +
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
    throw new Error('Generated files are stale. Run node build/generate.mjs:\n' + stale.join('\n'));
  return stale.length;
}

export {generate};

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url)
  generate(process.argv.includes('--check'));
