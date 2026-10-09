// The third-party packages components may import (react-aria-components, @internationalized/date),
// bundled for the browser runtime. The bundle holds only the names components import, reads React
// and ReactDOM from the page's globals, and puts the names on VendraDesignSystem.__vendor, where the
// compiled components read them (see compile in components.cjs). dist/ keeps the plain imports;
// tenant apps install these packages as dependencies of @vendra/design-system.
const path = require('node:path');
const {spawnSync} = require('node:child_process');

const VENDOR = ['react-aria-components', '@internationalized/date'];
const templates = path.resolve(__dirname, '..');

// {package: [names]} → the entry module the bundler starts from.
function entrySource(imports) {
  const lines = [],
    exposed = [];
  let index = 0;
  for (const name of Object.keys(imports).sort()) {
    const local = [...imports[name]].sort().map(item => [item, '__v' + index++]);
    lines.push(
      'import { ' +
        local.map(([item, alias]) => item + ' as ' + alias).join(', ') +
        ' } from ' +
        JSON.stringify(name) +
        ';'
    );
    exposed.push(
      JSON.stringify(name) +
        ': { ' +
        local.map(([item, alias]) => item + ': ' + alias).join(', ') +
        ' }'
    );
  }
  return (
    lines.join('\n') +
    '\nconst ns = (window.VendraDesignSystem = window.VendraDesignSystem || {});\n' +
    'ns.__vendor = { ' +
    exposed.join(', ') +
    ' };\n'
  );
}

// The classic-script bundle for these imports; '' when components import nothing from VENDOR.
// The build is synchronous, so the (asynchronous) bundler runs in a child process.
function vendorBundle(imports) {
  if (!Object.keys(imports).length) return '';
  const result = spawnSync(process.execPath, [__filename, JSON.stringify(imports)], {
    cwd: templates,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024
  });
  if (result.status !== 0)
    throw new Error('Bundling ' + Object.keys(imports).join(', ') + ' failed:\n' + result.stderr);
  return result.stdout;
}

async function bundleToStdout(imports) {
  const {rolldown} = require('rolldown');
  const entry = '\0vendor-entry';
  const bundle = await rolldown({
    input: entry,
    cwd: templates,
    external: ['react', 'react-dom'],
    transform: {define: {'process.env.NODE_ENV': '"production"'}},
    plugins: [
      {
        name: 'vendor-entry',
        resolveId: id => (id === entry ? id : null),
        load: id => (id === entry ? entrySource(imports) : null)
      }
    ]
  });
  const {output} = await bundle.generate({
    format: 'iife',
    globals: {react: 'window.React', 'react-dom': 'window.ReactDOM'},
    minify: true,
    comments: false
  });
  await bundle.close();
  // Like each component, a failing vendor bundle is recorded instead of stopping the page;
  // only the components that import from it fail.
  process.stdout.write(
    '// Bundled from ' +
      Object.keys(imports).sort().join(', ') +
      ' (MIT): only the names components import.\ntry {\n' +
      output[0].code +
      '} catch (e) { (window.VendraDesignSystem = window.VendraDesignSystem || {}).__vendorError = String((e && e.message) || e); }\n'
  );
}

if (require.main === module)
  bundleToStdout(JSON.parse(process.argv[2])).catch(error => {
    console.error(error);
    process.exit(1);
  });

module.exports = {VENDOR, vendorBundle, entrySource};
