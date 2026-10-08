// Refresh templates and the component bundle; build separate Tailwind and plain custom CSS. --check writes nothing.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const check = process.argv.includes('--check');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-tailwind-'));
try {
  // Update generated markup before Tailwind scans it, including removed classes.
  const count = require('./generate.cjs').generate(check);
  // Tenant themes are generated from JSON before anything reads them.
  for (const [target, content] of require('./tenants.cjs').tenantOutputs()) {
    const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
    if (check && content !== current) throw new Error(path.relative(path.dirname(root), target) + ' is stale. Run npm --prefix templates run build.');
    if (!check && content !== current) fs.writeFileSync(target, content);
  }
  const output = path.join(temporary, 'tailwind.css');
  const cliFolder = path.join(root, 'node_modules/@tailwindcss/cli');
  const cliPackage = JSON.parse(fs.readFileSync(path.join(cliFolder, 'package.json'), 'utf8'));
  const cli = path.join(cliFolder, cliPackage.bin.tailwindcss);
  const result = spawnSync(process.execPath, [cli, '-i', '_shared/tailwind.css', '-o', output, '--minify'], {cwd: root, stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error('Tailwind compilation failed');
  const custom = require('./custom-css.cjs').customCss(root);
  for (const [file, css] of [['tailwind.css', fs.readFileSync(output, 'utf8')], ['custom.css', custom]]) {
    const target = path.join(root, '_runtime', file);
    const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
    if (check && css !== current) throw new Error(file + ' is stale. Run npm --prefix templates run build.');
    if (!check && css !== current) fs.writeFileSync(target, css);
  }
  // components/**/*.{js,jsx} → _runtime/components.js, the bundle cards and pages load.
  // The format/date helpers also go to _runtime/helpers.js, a classic script pages load first.
  const {componentsBundle, helpersScript, target: bundle, helpersTarget} = require('./components.cjs');
  for (const [target, compiled] of [[bundle, componentsBundle()], [helpersTarget, helpersScript()]]) {
    const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
    if (check && compiled !== current) throw new Error(path.basename(target) + ' is stale. Run npm --prefix templates run build.');
    if (!check && compiled !== current) fs.writeFileSync(target, compiled);
  }
  // The same sources → dist/, the @vendra/design-system package.
  require('./package.cjs').buildPackage(check);
  console.log(check ? 'Tailwind, custom CSS, tenant themes, storefront templates, the component bundle and dist/ are current.' : 'Built components, dist/, Tailwind and custom CSS; updated ' + count + ' template files.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  fs.rmSync(temporary, {recursive: true, force: true});
}
