// Run with: node templates/_tests/generation.test.cjs
// Exercise edits on a temporary copy, never on the maintained storefront.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-generation-'));
const templates = path.join(temp, 'templates');
const pages = ['home', 'shop', 'search', 'product', 'bag', 'checkout', 'site', 'track', 'faq'];

function pageValues(page) {
  const folder = path.join(templates, 'storefront-' + page);
  const filename = fs.readdirSync(folder).find(name => name.endsWith('.dc.html'));
  const html = fs.readFileSync(path.join(folder, filename), 'utf8');
  const script = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
  const context = {
    URL, URLSearchParams, console, setTimeout, clearTimeout,
    location: {pathname: '/', search: '', href: 'http://localhost/'},
    sessionStorage: {getItem: () => null},
    DCLogic: class {
      constructor(props) { this.props = props; this.state = {}; }
      setState(update) { Object.assign(this.state, update); }
    }
  };
  context.window = {React: {}, innerWidth: 390};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, '_ds_bundle.js'), 'utf8'), context);
  vm.runInContext(script + '\nthis.Page = Component;', context);
  const logic = new context.Page({lang: 'en', tenant: 'default', mobile: false});
  if (page === 'search') logic.state.q = 'ivory';
  return logic.renderVals();
}

try {
  for (const folder of ['_build', '_shared', '_runtime', ...fs.readdirSync(path.join(root, 'templates')).filter(folder=>folder.startsWith('storefront-'))]) {
    fs.cpSync(path.join(root, 'templates', folder), path.join(templates, folder), {recursive: true});
  }
  const config = path.join(templates, '_shared/store-config.js');
  fs.writeFileSync(config, fs.readFileSync(config, 'utf8')
    .replaceAll("en: 'Vendra Florist'", "en: 'Demo Flowers'")
    .replace("'+989129333034'", "'+989120000000'")
    .replace("'https://wa.me/989129333034'", "'https://wa.me/989120000000'"));
  const catalog = path.join(templates, '_shared/catalog.js');
  const navigation = path.join(templates, '_shared/navigation.js');
  fs.writeFileSync(navigation, fs.readFileSync(navigation, 'utf8').replace('phoneLabel: VF_STORE.phoneLabel', "phoneLabel: 'Shared navigation probe'"));
  fs.writeFileSync(catalog, fs.readFileSync(catalog, 'utf8').replace('price: 4_100_000', 'price: 4_200_000'));
  const delivery = path.join(templates, '_shared/delivery.js');
  fs.writeFileSync(delivery, fs.readFileSync(delivery, 'utf8')
    .replace('fee: 80_000', 'fee: 90_000').replace('= 5_000_000', '= 9_000_000'));
  const homeFile = path.join(templates, 'storefront-home/StorefrontHome.dc.html');
  fs.writeFileSync(homeFile, fs.readFileSync(homeFile, 'utf8')
    .replace('<!-- END PAGE CONTENT -->', '<p>Human-edited content survives generation.</p>\n<!-- END PAGE CONTENT -->'));

  const copy = path.join(templates, 'storefront-home/copy.js');
  fs.writeFileSync(copy, fs.readFileSync(copy, 'utf8').replace("heroA: 'Soft flowers,'", "heroA: 'Human title,'"));
  const logicFile = path.join(templates, 'storefront-home/logic.js');
  const originalLogic = fs.readFileSync(logicFile, 'utf8');
  fs.writeFileSync(logicFile, originalLogic.replace('...S,', "...S,\n      generationProbe: 'Adjacent behavior source',"));
  assert.notEqual(fs.readFileSync(logicFile, 'utf8'), originalLogic);
  const build = require(path.join(templates, '_build/generate.cjs'));
  fs.unlinkSync(logicFile);
  assert.throws(() => build.generate(), /Missing page logic source: storefront-home\/logic\.js/);
  fs.writeFileSync(logicFile, originalLogic.replace('...S,', "...S,\n      generationProbe: 'Adjacent behavior source',"));
  assert.throws(() => build.generate(true), /Generated files are stale/);
  build.generate();
  const {customCss} = require(path.join(templates, '_build/custom-css.cjs'));
  const originalCss = customCss(templates);
  const styles = path.join(templates, 'storefront-home/styles.css');
  fs.writeFileSync(styles, fs.readFileSync(styles, 'utf8').replace('padding:72px 24px', 'padding:80px 24px'));
  assert.notEqual(customCss(templates), originalCss, 'Adjacent page CSS edits must change the shared stylesheet');
  assert.ok(customCss(templates).includes('padding:80px 24px'));
  assert.equal(build.generate(), 0, 'Generation must be repeatable without another diff');
  build.generate(true);
  assert.ok(fs.readFileSync(homeFile, 'utf8').includes('Human-edited content survives generation.'));
  for (const page of ['home','shop','checkout','faq']) {
    const values=pageValues(page);
    assert.equal(values.t.brand,'Demo Flowers');
    assert.equal(values.phoneHref,'tel:+989120000000');
    assert.equal(values.phoneLabel,'Shared navigation probe');
    assert.equal(values.waHref,'https://wa.me/989120000000');
  }
  assert.equal(pageValues('home').t.eyebrow,'Demo Flowers');
  assert.equal(pageValues('checkout').payment.holder,'Demo Flowers');
  assert.equal(pageValues('home').t.heroA, 'Human title,');
  assert.equal(pageValues('home').generationProbe, 'Adjacent behavior source');
  assert.equal(pageValues('home').products[0].price, '4,200,000 Toman');
  assert.equal(pageValues('shop').items[0].price, '4,200,000 Toman');
  assert.equal(pageValues('search').results[0].price, '4,200,000 Toman');
  assert.equal(pageValues('product').unitPrice, '5,000,000 Toman');
  assert.equal(pageValues('bag').sums.at(-1).value, '8,490,000 Toman');
  assert.equal(pageValues('checkout').sums.at(-1).value, '8,490,000 Toman');
  assert.equal(pageValues('track').sums.at(-1).value, '8,490,000 Toman');
  assert.equal(pageValues('site').store.bag[0].unit, 5_000_000);
  assert.ok(pageValues('faq').groups[0].items[0].content.includes('90,000 Toman'));
  console.log('Passed shared-price and delivery propagation, editable-content preservation, stale-output detection and repeatable generation.');
} finally {
  fs.rmSync(temp, {recursive: true, force: true});
}
