// dist/ as an app installs it: resolved through package.json "exports", imported in plain
// Node (no window, as on a server) and server-rendered with React.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {createRequire} = require('node:module');

const repo = path.resolve(__dirname, '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(repo, 'package.json'), 'utf8'));
// Inside templates/node_modules, so the package resolves react from there like a peer.
const app = fs.mkdtempSync(path.join(__dirname, '../node_modules/.vendra-package-test-'));

(async () => {
  try {
    const installed = path.join(app, 'node_modules', manifest.name);
    fs.mkdirSync(installed, {recursive: true});
    fs.cpSync(path.join(repo, 'dist'), path.join(installed, 'dist'), {recursive: true});
    fs.copyFileSync(path.join(repo, 'package.json'), path.join(installed, 'package.json'));
    const files = new Set(fs.readdirSync(path.join(repo, 'dist'), {recursive: true}).map(name => 'dist/' + name.split(path.sep).join('/')));

    // Every export target exists; only dist/ is published.
    assert.deepEqual(manifest.files, ['dist']);
    const targets = JSON.stringify(manifest.exports).match(/\.\/dist\/[^"]+/g);
    for (const target of targets.filter(t => !t.includes('*'))) assert.ok(files.has(target.slice(2)), target + ' is missing');
    for (const name of [...files].filter(name => name.endsWith('.js') && name.startsWith('dist/components/'))) {
      assert.ok(files.has(name.replace(/\.js$/, '.d.ts')), name + ' has no declarations');
    }

    fs.writeFileSync(path.join(app, 'app.mjs'), "export * as ds from '" + manifest.name + "';\nexport * as theme from '" + manifest.name + "/theme';\n");
    const {ds, theme} = await import(pathToFileURL(path.join(app, 'app.mjs')).href);
    const require_ = createRequire(path.join(app, 'app.cjs'));
    const React = require_('react');
    const {renderToString} = require_('react-dom/server');
    assert.equal(typeof globalThis.window, 'undefined');

    // Components: every one renders on the server.
    const components = Object.keys(ds).filter(name => /^[A-Z][a-z]/.test(name));
    assert.ok(components.length >= 45, 'only ' + components.length + ' components exported');
    const props = {Icon: {name: 'flower-2'}};
    const quiet = console.error, warn = console.warn;
    console.error = console.warn = () => {};
    try {
      for (const name of components) {
        assert.doesNotThrow(() => renderToString(React.createElement(ds[name], props[name] || {})), name + ' fails to server-render');
      }
    } finally { console.error = quiet; console.warn = warn; }
    const link = renderToString(React.createElement(ds.Button, {href: '/shop'}, 'Shop'));
    assert.match(link, /^<a href="\/shop" class="ag-btn ag-btn--primary ag-btn--md/);
    assert.ok(Object.keys(ds.ICON_SVGS).includes('flower-2'));
    // 'use client' leads every component module so Next.js treats them as client components.
    assert.match(fs.readFileSync(path.join(repo, 'dist/components/Button/Button.js'), 'utf8'), /^'use client';\n/);

    // Helpers.
    assert.equal(ds.format.money(4200000, {lang: 'en'}), '4,200,000 Toman');
    assert.equal(ds.format.money(4200000, {lang: 'fa'}), '۴٬۲۰۰٬۰۰۰ تومان');
    assert.equal(ds.format.money(100, {currency: 'GBP', currencies: {GBP: {rate: 0.5, dec: 2, sym: '£', en: 'GBP', fa: 'پوند'}}}), '£50.00');
    assert.deepEqual([...ds.dates.g2j(new Date(2026, 2, 21, 12))], [1405, 1, 1]);

    // Theme API, ESM and CommonJS.
    assert.equal(require_(manifest.name + '/theme').tenantCss, require_(path.join(installed, 'dist/theme.cjs')).tenantCss);
    const fern = JSON.parse(fs.readFileSync(path.join(repo, 'tokens/tenants/fern.json'), 'utf8'));
    const css = theme.tenantCss('fern', fern);
    assert.equal(css.replace(/\n {3}Sample tenant[^\n]*/, ''), fs.readFileSync(path.join(repo, 'tokens/tenants/fern.css'), 'utf8').replace(/\n {3}Sample tenant[^\n]*/, ''));
    assert.doesNotMatch(theme.tenantCss('fern', {...fern, description: '</style><script>alert(1)</script>'}), /<\/?(style|script)/);
    assert.throws(() => theme.tenantCss('fern"]{}*{x', fern), /slugs/);
    assert.throws(() => theme.tenantCss('fern', {...fern, colours: {...fern.colours, accent: 'red'}}), /colours\.accent/);
    const pale = {...fern, colours: {...fern.colours, accent: '#F4C2CF'}};
    assert.throws(() => theme.tenantCss('pale', pale), /fails contrast: White on accent button/);
    assert.match(theme.tenantCss('pale', pale, {allowFailing: true}), /^\[data-tenant="pale"\]\{/m);
    assert.equal(theme.checks(theme.VENDRA).filter(c => !c.pass).length, 0);

    // Styles: one file, fonts beside it, tenant files as published paths.
    const styles = fs.readFileSync(path.join(repo, 'dist/styles.css'), 'utf8');
    assert.doesNotMatch(styles, /@import|\.\.\/assets/);
    for (const [, font] of styles.matchAll(/url\('\.\/(fonts\/[^']+)'\)/g)) assert.ok(files.has('dist/' + font), font + ' is missing');
    for (const token of ['--accent:', '--control-h-md:', '.ag-btn {', '.ag-input {']) assert.ok(styles.includes(token), 'styles.css lacks ' + token);
    for (const name of fs.readdirSync(path.join(repo, 'tokens/tenants')).filter(n => n.endsWith('.css'))) assert.ok(files.has('dist/tenants/' + name));

    console.log('package tests passed (' + components.length + ' components server-rendered)');
  } finally {
    fs.rmSync(app, {recursive: true, force: true});
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
