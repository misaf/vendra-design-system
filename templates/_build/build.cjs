// Build the tenant list and themes, Tailwind and the pages' custom CSS, and dist/. --check writes nothing.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const check = process.argv.includes('--check');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-tailwind-'));
async function main() {
  try {
    require('./generate.cjs').generate(check);
    // Tenant themes are generated from JSON before anything reads them.
    for (const [target, content] of require('./tenants.cjs').tenantOutputs()) {
      const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
      if (check && content !== current)
        throw new Error(
          path.relative(path.dirname(root), target) +
            ' is stale. Run npm --prefix templates run build.'
        );
      if (!check && content !== current) fs.writeFileSync(target, content);
    }
    const {VF_STORE} = await import('../_shared/domain/store-config.js');
    const specs = {default: {}, ...require('./tenants.cjs').tenantSpecs()};
    if (!specs[VF_STORE.tenant]) throw new Error('Unknown store tenant: ' + VF_STORE.tenant);
    specs[VF_STORE.tenant] = {
      ...specs[VF_STORE.tenant],
      storeName: VF_STORE.brand,
      brand: {...specs[VF_STORE.tenant].brand, ...VF_STORE.brandAssets}
    };
    for (const [target, content] of require('./brand.cjs').brandOutputs(specs)) {
      const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
      if (check && current !== content) throw new Error(target + ' is stale. Run npm run build.');
      if (!check && current !== content) {
        fs.mkdirSync(path.dirname(target), {recursive: true});
        fs.writeFileSync(target, content);
      }
    }
    const output = path.join(temporary, 'tailwind.css');
    const cliFolder = path.dirname(require.resolve('@tailwindcss/cli/package.json'));
    const cliPackage = JSON.parse(fs.readFileSync(path.join(cliFolder, 'package.json'), 'utf8'));
    const cli = path.join(cliFolder, cliPackage.bin.tailwindcss);
    const result = spawnSync(
      process.execPath,
      [cli, '-i', '_shared/styles/tailwind.css', '-o', output, '--minify'],
      {cwd: root, stdio: 'inherit'}
    );
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error('Tailwind compilation failed');
    const custom = require('./custom-css.cjs').customCss(root);
    for (const [file, css] of [
      ['tailwind.css', fs.readFileSync(output, 'utf8')],
      ['custom.css', custom]
    ]) {
      const target = path.join(root, '_runtime', file);
      const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
      if (check && css !== current)
        throw new Error(file + ' is stale. Run npm --prefix templates run build.');
      if (!check && css !== current) fs.writeFileSync(target, css);
    }
    // The same sources → dist/, the @vendra/design-system package.
    require('./package.cjs').buildPackage(check);
    console.log(
      check
        ? 'Tailwind, custom CSS, tenant themes, the tenant list and dist/ are current.'
        : 'Built dist/, Tailwind, custom CSS and tenant themes.'
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    fs.rmSync(temporary, {recursive: true, force: true});
  }
}
main();
