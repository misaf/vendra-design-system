// Generate tenant data, themes and brand assets. --check writes nothing.
import fs from 'node:fs';
import path from 'node:path';
import {generate} from './generate.mjs';
import {brandOutputs} from './brand.mjs';
import {tenantOutputs, tenantSpecs} from './tenants.mjs';

const root = path.resolve(import.meta.dirname, '../..');
const check = process.argv.includes('--check');
async function main() {
  try {
    generate(check);
    // Tenant themes are generated from JSON before anything reads them.
    for (const [target, content] of tenantOutputs()) {
      const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
      if (check && content !== current)
        throw new Error(path.relative(root, target) + ' is stale. Run npm run build.');
      if (!check && content !== current) fs.writeFileSync(target, content);
    }
    const {VF_STORE} = await import('../../src/storefront/store/store-config.js');
    const specs = {default: {}, ...tenantSpecs()};
    if (!specs[VF_STORE.tenant]) throw new Error('Unknown store tenant: ' + VF_STORE.tenant);
    specs[VF_STORE.tenant] = {
      ...specs[VF_STORE.tenant],
      storeName: VF_STORE.brand,
      brand: {...specs[VF_STORE.tenant].brand, ...VF_STORE.brandAssets}
    };
    for (const [target, content] of brandOutputs(specs)) {
      const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
      if (check && current !== content) throw new Error(target + ' is stale. Run npm run build.');
      if (!check && current !== content) {
        fs.mkdirSync(path.dirname(target), {recursive: true});
        fs.writeFileSync(target, content);
      }
    }
    console.log(
      check
        ? 'Design tokens, tenant themes and the tenant list are current.'
        : 'Built design tokens and tenant themes.'
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
await main();
