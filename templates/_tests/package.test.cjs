// dist/ as an app installs it: resolved through package.json "exports", imported in plain
// Node (no window, as on a server) and server-rendered with React.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {createRequire} = require('node:module');

const repo = path.resolve(__dirname, '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(repo, 'package.json'), 'utf8'));
// Inside the workspace's node_modules, so the package resolves react from there like a peer.
const app = fs.mkdtempSync(path.join(repo, 'node_modules/.vendra-package-test-'));

(async () => {
  try {
    const installed = path.join(app, 'node_modules', manifest.name);
    fs.mkdirSync(installed, {recursive: true});
    fs.cpSync(path.join(repo, 'dist'), path.join(installed, 'dist'), {recursive: true});
    fs.copyFileSync(path.join(repo, 'package.json'), path.join(installed, 'package.json'));
    const files = new Set(
      fs
        .readdirSync(path.join(repo, 'dist'), {recursive: true})
        .map(name => 'dist/' + name.split(path.sep).join('/'))
    );

    // Every export target exists; only dist/ is published.
    assert.deepEqual(manifest.files, ['dist']);
    // React Aria is a peer dependency, so the app and the components share one copy (one
    // RouterProvider / I18nProvider context); its range starts at the version the build tests with.
    const built = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
    assert.deepEqual(manifest.dependencies || {}, {}, 'the package has no bundled dependencies');
    for (const [name, version] of Object.entries(built.dependencies || {}))
      assert.equal(
        manifest.peerDependencies[name],
        '^' + version,
        name + ' peer range should start at the tested ' + version
      );
    const targets = JSON.stringify(manifest.exports).match(/\.\/dist\/[^"]+/g);
    for (const target of targets.filter(t => !t.includes('*')))
      assert.ok(files.has(target.slice(2)), target + ' is missing');
    for (const name of [...files].filter(
      name => name.endsWith('.js') && name.startsWith('dist/components/')
    )) {
      assert.ok(files.has(name.replace(/\.js$/, '.d.ts')), name + ' has no declarations');
    }

    fs.writeFileSync(
      path.join(app, 'app.mjs'),
      "export * as ds from '" +
        manifest.name +
        "';\nexport * as theme from '" +
        manifest.name +
        "/theme';\n"
    );
    const {ds, theme} = await import(pathToFileURL(path.join(app, 'app.mjs')).href);
    const require_ = createRequire(path.join(app, 'app.cjs'));
    const React = require_('react');
    const {renderToString} = require_('react-dom/server');
    assert.equal(typeof globalThis.window, 'undefined');

    // Components: every one renders on the server.
    // Components are the capitalised function exports (ToastQueue is a class, not a component;
    // MessagesContext is a React context).
    const components = Object.keys(ds).filter(
      name =>
        /^[A-Z][a-z]/.test(name) &&
        ds[name].$$typeof !== Symbol.for('react.context') &&
        !(
          typeof ds[name] === 'function' &&
          /^class\b/.test(Function.prototype.toString.call(ds[name]))
        )
    );
    assert.ok(components.length >= 45, 'only ' + components.length + ' components exported');
    const props = {Icon: {name: 'flower-2'}, ToastRegion: {queue: new ds.ToastQueue()}};
    // Parts that only exist inside their group render inside it.
    const groups = {ChoiceTile: 'ChoiceGroup', Radio: 'RadioGroup'};
    const element = name => {
      const part = React.createElement(ds[name], {value: 'a', ...(props[name] || {})});
      return groups[name]
        ? React.createElement(ds[groups[name]], {label: 'Group'}, part)
        : React.createElement(ds[name], props[name] || {});
    };
    const quiet = console.error,
      warn = console.warn;
    console.error = console.warn = () => {};
    try {
      for (const name of components) {
        assert.doesNotThrow(() => renderToString(element(name)), name + ' fails to server-render');
      }
    } finally {
      console.error = quiet;
      console.warn = warn;
    }
    // Design tokens for other platforms: W3C DTCG JSON whose aliases all resolve (a tenant's file
    // over the base one), and the runtime designTokens gives the same as the build.
    const baseTokens = JSON.parse(
      fs.readFileSync(path.join(repo, 'dist/tokens/tokens.json'), 'utf8')
    );
    const lookup = (tree, ref) => ref.split('.').reduce((node, key) => node && node[key], tree);
    const aliases = (tree, found = []) => {
      for (const node of Object.values(tree))
        if (node && typeof node === 'object')
          if ('$value' in node)
            JSON.stringify(node.$value).replace(/\{([\w.-]+)\}/g, (m, ref) => found.push(ref));
          else aliases(node, found);
      return found;
    };
    assert.deepEqual(lookup(baseTokens, 'peony.500'), {$type: 'color', $value: '#C8405F'});
    assert.deepEqual(lookup(baseTokens, 'success.default'), {$type: 'color', $value: '{leaf.700}'});
    assert.deepEqual(lookup(baseTokens, 'space.4'), {$type: 'dimension', $value: '1rem'});
    assert.equal(lookup(baseTokens, 'dur.fast').$value, '140ms');
    assert.equal(lookup(baseTokens, 'shadow.md').$value.offsetY, '8px');
    for (const ref of aliases(baseTokens))
      assert.ok(lookup(baseTokens, ref), 'tokens.json alias {' + ref + '} resolves');
    for (const name of fs.readdirSync(path.join(repo, 'dist/tokens/tenants'))) {
      const tenant = JSON.parse(
        fs.readFileSync(path.join(repo, 'dist/tokens/tenants', name), 'utf8')
      );
      const merged = {...baseTokens};
      for (const [group, entries] of Object.entries(tenant))
        merged[group] = {...merged[group], ...entries};
      for (const ref of aliases(tenant))
        assert.ok(lookup(merged, ref), name + ' alias {' + ref + '} resolves over tokens.json');
      const spec = JSON.parse(fs.readFileSync(path.join(repo, 'tokens/tenants', name), 'utf8'));
      assert.deepEqual(
        theme.designTokens(theme.tokens(spec).all),
        tenant,
        name + ' matches runtime'
      );
    }

    // Built-in wording follows VendraProvider's language; props and provider messages still win.
    const wording = (locale, messages, props = {}) =>
      renderToString(
        React.createElement(
          ds.VendraProvider,
          {locale, messages},
          React.createElement(ds.Alert, {title: 'Note', onClose: () => {}, ...props})
        )
      );
    assert.match(wording('en-US'), /aria-label="Dismiss"/);
    assert.match(wording('fa-IR'), /aria-label="بستن"/);
    assert.match(wording('fa-IR', null, {closeLabel: 'Hide'}), /aria-label="Hide"/);
    assert.match(wording('ar-AE', {ar: {Alert: {close: 'إغلاق'}}}), /aria-label="إغلاق"/);
    assert.match(wording('de-DE'), /aria-label="Dismiss"/);
    assert.deepEqual(
      Object.keys(ds.MESSAGES.fa).sort(),
      Object.keys(ds.MESSAGES.en).sort(),
      'MESSAGES.fa covers every component in MESSAGES.en'
    );
    for (const component of Object.keys(ds.MESSAGES.en))
      assert.deepEqual(
        Object.keys(ds.MESSAGES.fa[component]).sort(),
        Object.keys(ds.MESSAGES.en[component]).sort(),
        'MESSAGES.fa.' + component + ' has the same keys as English'
      );
    // The app's router reaches the components' links through VendraProvider (one React Aria copy).
    const routed = renderToString(
      React.createElement(
        ds.VendraProvider,
        {navigate: () => {}, useHref: href => '/store' + href},
        React.createElement(ds.Button, {href: '/shop'}, 'Shop')
      )
    );
    assert.match(routed, /href="\/store\/shop"/, 'VendraProvider useHref reaches Button links');
    const link = renderToString(React.createElement(ds.Button, {href: '/shop'}, 'Shop'));
    assert.match(link, /^<a class="ag-btn ag-btn--primary ag-btn--md"[^>]* href="\/shop"/);
    assert.ok(Object.keys(ds.ICON_SVGS).includes('flower-2'));
    // 'use client' leads every component module so React Server Components frameworks treat them as client components.
    assert.match(
      fs.readFileSync(path.join(repo, 'dist/components/Button/Button.js'), 'utf8'),
      /^'use client';\n/
    );

    // Helpers.
    assert.equal(ds.format.money(4200000, {lang: 'en'}), '4,200,000 Toman');
    assert.equal(ds.format.money(4200000, {lang: 'fa'}), '۴٬۲۰۰٬۰۰۰ تومان');
    assert.equal(
      ds.format.money(100, {
        currency: 'GBP',
        currencies: {GBP: {rate: 0.5, dec: 2, sym: '£', en: 'GBP', fa: 'پوند'}}
      }),
      '£50.00'
    );
    assert.deepEqual([...ds.dates.g2j(new Date(2026, 2, 21, 12))], [1405, 1, 1]);

    // Commerce rules run on a tenant's own data, passed in: no globals, no window.
    const {commerce} = ds;
    const zones = [
      commerce.zoneFromApi(
        {id: 7, name: {en: 'Centre', fa: 'مرکز'}, maxDistanceKm: 5, feeAmount: 90_000, position: 1},
        {7: {key: 'centre', cutoff: '17:00'}}
      )
    ];
    const studio = {lat: 35.7, lng: 51.4};
    assert.equal(commerce.zoneAt({lat: 35.71, lng: 51.41}, zones, studio), 'centre');
    assert.equal(commerce.zoneAt({lat: 36.5, lng: 51.4}, zones, studio), null);
    const rules = {
      freeDelivery: {threshold: 1_000_000, zones: ['centre']},
      promos: [{code: 'SPRING', percent: 20, min: 0}],
      wallet: {discountFrom: 5_000_000, discountPercent: 5}
    };
    assert.deepEqual(
      commerce.totals([{unit: 400_000, qty: 2}], {zone: zones[0], promo: 'spring '}, rules),
      {sub: 800_000, fee: 90_000, discount: 160_000, total: 730_000}
    );
    assert.equal(
      commerce.totals([{unit: 600_000, qty: 2}], {zone: zones[0], balance: 5_000_000}, rules).total,
      1_140_000
    );
    const days = commerce.deliveryDays('17:00', {days: 3}, new Date(2026, 9, 5, 18, 0));
    assert.deepEqual(
      days.map(day => [day.iso, day.pastCutoff]),
      [
        ['2026-10-05', true],
        ['2026-10-06', false],
        ['2026-10-07', false]
      ]
    );
    assert.equal(commerce.openDay(days), '2026-10-06');
    assert.equal(commerce.normalizeCode(' vf-7k2m ۴q '), 'VF7K2M4Q');
    // PhoneInput and CodeInput clean what is typed: Persian digits, spaces and dashes.
    let phoneValue;
    ds.PhoneInput({
      onChange: (typed, {number, mobile}) => (phoneValue = [number, mobile])
    }).props.onChange('۰۹۱۲ ۳۴۵-۶۷۸۹');
    assert.deepEqual(phoneValue, ['09123456789', true]);
    let codeValue, completed;
    const codeInput = ds.CodeInput({
      length: 5,
      value: '1234',
      onChange: code => (codeValue = code),
      onComplete: code => (completed = code)
    });
    assert.equal(codeInput.props.autoComplete, 'one-time-code');
    codeInput.props.onChange('۱۲۳۴۵۶ ');
    assert.equal(codeValue, '12345');
    assert.equal(completed, '12345');
    const letters = ['a', 'b', 'c', 'd', 'e'];
    assert.deepEqual(commerce.page(letters, 1, 2), {
      items: ['a', 'b'],
      page: 1,
      shown: 2,
      total: 5,
      hasMore: true
    });
    assert.deepEqual(commerce.page(letters, 3, 2).items, letters);
    assert.equal(commerce.page(letters, 'x', 2).page, 1);
    assert.deepEqual(commerce.page(['a', 'b'], 1, 2, 40), {
      items: ['a', 'b'],
      page: 1,
      shown: 2,
      total: 40,
      hasMore: true
    });
    assert.deepEqual(
      commerce
        .deliverySlots(
          '2026-10-05',
          [
            {start: '08', end: '12'},
            {start: '16', end: '20'}
          ],
          120,
          new Date(2026, 9, 5, 11, 0)
        )
        .map(slot => slot.closed),
      [true, false]
    );
    const line = commerce.lineFromApi(
      {
        sellableId: 5,
        name: 'VF-1',
        quantity: 2,
        unitAmount: 900_000,
        metadata: {token: 'VF-1', size: 'large', addons: 'card'}
      },
      {
        products: [{id: 'VF-1', apiId: 5, image: 'rose.jpg'}],
        sizes: [
          {
            id: 'large',
            price: 300_000,
            name: {en: 'Large', fa: 'بزرگ'},
            detail: {en: '30 stems', fa: '۳۰ شاخه'}
          }
        ],
        addons: [{id: 'card', price: 100_000, name: {en: 'Card', fa: 'کارت'}}],
        placeholder: 'none.svg',
        describe: (product, size, addons, lang) =>
          [size.name[lang], ...addons.map(addon => addon.name[lang])].join(' · ')
      }
    );
    assert.deepEqual(
      [line.id, line.qty, line.en[1], line.fa[1]],
      ['VF-1-large-card', 2, 'Large · Card', 'بزرگ · کارت']
    );
    assert.equal(commerce.isMobile('۰۹۱۲ ۳۴۵ ۶۷۸۹'), true);
    // One stored form for every way a mobile is typed; anything else is ''.
    for (const typed of [
      '09123456789',
      '9123456789',
      '+98 912 345 6789',
      '98-912-345-6789',
      '0098 (912) 345 6789',
      '۰۹۱۲.۳۴۵.۶۷۸۹',
      '٠٩١٢٣٤٥٦٧٨٩'
    ])
      assert.equal(commerce.mobile(typed), '09123456789', typed);
    for (const typed of [
      '',
      '0912345678',
      '021 1234 5678',
      '+1 912 345 6789',
      '0912abc3456789',
      '091234567890',
      '98912345678'
    ])
      assert.equal(commerce.mobile(typed), '', typed);

    // Theme API, ESM and CommonJS.
    assert.equal(
      require_(manifest.name + '/theme').tenantCss,
      require_(path.join(installed, 'dist/theme.cjs')).tenantCss
    );
    const fern = JSON.parse(fs.readFileSync(path.join(repo, 'tokens/tenants/fern.json'), 'utf8'));
    const css = theme.tenantCss('fern', fern);
    assert.equal(
      css.replace(/\n {3}Sample tenant[^\n]*/, ''),
      fs
        .readFileSync(path.join(repo, 'tokens/tenants/fern.css'), 'utf8')
        .replace(/\n {3}Sample tenant[^\n]*/, '')
    );
    assert.doesNotMatch(
      theme.tenantCss('fern', {...fern, description: '</style><script>alert(1)</script>'}),
      /<\/?(style|script)/
    );
    assert.throws(() => theme.tenantCss('fern"]{}*{x', fern), /slugs/);
    assert.throws(
      () => theme.tenantCss('fern', {...fern, colours: {...fern.colours, accent: 'red'}}),
      /colours\.accent/
    );
    const pale = {...fern, colours: {...fern.colours, accent: '#F4C2CF'}};
    assert.throws(() => theme.tenantCss('pale', pale), /fails contrast: White on accent button/);
    assert.match(theme.tenantCss('pale', pale, {allowFailing: true}), /^\[data-tenant="pale"\]\{/m);
    assert.equal(theme.checks(theme.VENDRA).filter(c => !c.pass).length, 0);

    // Styles: one file, fonts beside it, tenant files as published paths.
    const styles = fs.readFileSync(path.join(repo, 'dist/styles.css'), 'utf8');
    assert.doesNotMatch(styles, /@import|\.\.\/assets/);
    for (const [, font] of styles.matchAll(/url\('\.\/(fonts\/[^']+)'\)/g))
      assert.ok(files.has('dist/' + font), font + ' is missing');
    for (const token of ['--accent:', '--control-h-md:', '.ag-btn {', '.ag-input {'])
      assert.ok(styles.includes(token), 'styles.css lacks ' + token);
    for (const name of fs
      .readdirSync(path.join(repo, 'tokens/tenants'))
      .filter(n => n.endsWith('.css')))
      assert.ok(files.has('dist/tenants/' + name));

    console.log('package tests passed (' + components.length + ' components server-rendered)');
  } finally {
    fs.rmSync(app, {recursive: true, force: true});
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
