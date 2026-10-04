// Refresh storefront templates, then compile Tailwind. --check writes nothing.
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
  const css = fs.readFileSync(output, 'utf8');
  const target = path.join(root, '_runtime/tailwind.css');
  if (check) {
    if (!fs.existsSync(target) || css !== fs.readFileSync(target, 'utf8')) {
      throw new Error('Tailwind CSS is stale. Run npm --prefix templates run build.');
    }
  } else if (!fs.existsSync(target) || css !== fs.readFileSync(target, 'utf8')) {
    fs.writeFileSync(target, css);
  }
  console.log(check ? 'Tailwind and storefront templates are current.' : 'Built Tailwind; updated ' + count + ' template files.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  fs.rmSync(temporary, {recursive: true, force: true});
}
