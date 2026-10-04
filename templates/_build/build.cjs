// Refresh templates; build separate Tailwind and plain custom CSS. --check writes nothing.
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
  const output = path.join(temporary, 'tailwind.css');
  const cliFolder = path.join(root, 'node_modules/@tailwindcss/cli');
  const cliPackage = JSON.parse(fs.readFileSync(path.join(cliFolder, 'package.json'), 'utf8'));
  const cli = path.join(cliFolder, cliPackage.bin.tailwindcss);
  const result = spawnSync(process.execPath, [cli, '-i', '_shared/tailwind.css', '-o', output, '--minify'], {cwd: root, stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error('Tailwind compilation failed');
  const customEntry = fs.readFileSync(path.join(root, '_shared/custom.css'), 'utf8');
  const custom = customEntry.replace(/@import "\.\/([a-z-]+\.css)";/g, (_, file) =>
    '\n/* Source: _shared/' + file + ' */\n' + fs.readFileSync(path.join(root, '_shared', file), 'utf8'));
  if (/@(?:apply|theme|source|import)\b/.test(custom)) throw new Error('Custom CSS must contain plain CSS only.');
  for (const [file, css] of [['tailwind.css', fs.readFileSync(output, 'utf8')], ['custom.css', custom]]) {
    const target = path.join(root, '_runtime', file);
    const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
    if (check && css !== current) throw new Error(file + ' is stale. Run npm --prefix templates run build.');
    if (!check && css !== current) fs.writeFileSync(target, css);
  }
  console.log(check ? 'Tailwind, custom CSS and storefront templates are current.' : 'Built Tailwind and custom CSS; updated ' + count + ' template files.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  fs.rmSync(temporary, {recursive: true, force: true});
}
