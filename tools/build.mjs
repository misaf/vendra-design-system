// Build the tenant list and themes, Tailwind and the pages' custom CSS. --check writes nothing.
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {customCss} from '../apps/storefront/build/custom-css.mjs';
import {generate} from '../apps/storefront/build/generate.mjs';
import {brandOutputs} from './brand.mjs';
import {tenantOutputs, tenantSpecs} from './tenants.mjs';

const root = path.resolve(import.meta.dirname, '../apps/storefront');
const check = process.argv.includes('--check');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-tailwind-'));
async function main() {
  try {
    generate(check);
    // Tenant themes are generated from JSON before anything reads them.
    for (const [target, content] of tenantOutputs()) {
      const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
      if (check && content !== current)
        throw new Error(
          path.relative(path.resolve(root, '../..'), target) +
            ' is stale. Run npm --prefix apps/storefront run build.'
        );
      if (!check && content !== current) fs.writeFileSync(target, content);
    }
    const {VF_STORE} = await import('../apps/storefront/shared/domain/store-config.js');
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
    const output = path.join(temporary, 'tailwind.css');
    const cliFolder = path.dirname(
      fileURLToPath(import.meta.resolve('@tailwindcss/cli/package.json'))
    );
    const cliPackage = JSON.parse(fs.readFileSync(path.join(cliFolder, 'package.json'), 'utf8'));
    const cli = path.join(cliFolder, cliPackage.bin.tailwindcss);
    const result = spawnSync(
      process.execPath,
      [cli, '-i', 'styles/tailwind.css', '-o', output, '--minify'],
      {cwd: root, stdio: 'inherit'}
    );
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error('Tailwind compilation failed');
    const custom = customCss(root);
    for (const [file, css] of [
      ['tailwind.css', fs.readFileSync(output, 'utf8')],
      ['custom.css', custom]
    ]) {
      const target = path.join(root, '_runtime', file);
      const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
      if (check && css !== current)
        throw new Error(file + ' is stale. Run npm --prefix apps/storefront run build.');
      if (!check && css !== current) fs.writeFileSync(target, css);
    }
    console.log(
      check
        ? 'Tailwind, custom CSS, design tokens, tenant themes and the tenant list are current.'
        : 'Built Tailwind, custom CSS, design tokens and tenant themes.'
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    fs.rmSync(temporary, {recursive: true, force: true});
  }
}
await main();
