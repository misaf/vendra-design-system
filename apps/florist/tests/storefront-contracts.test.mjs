import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {generate} from '../build/generate.mjs';
import {
  context,
  featureFiles,
  loadPage,
  openDeliveryWindow,
  pageScript,
  setAddress,
  sharedLogic
} from './page-script.mjs';

const root = path.resolve(import.meta.dirname, '../../..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

generate(true);

// Pages may delegate their main landmark to a rendered app layout. An unused import must not
// satisfy the skip-link contract; only follow named JSX imports that the source renders.
function exposesMain(file, visited = new Set()) {
  if (visited.has(file)) return false;
  visited.add(file);
  const code = fs.readFileSync(file, 'utf8');
  if (/<main\s+id="main"/.test(code)) return true;
  for (const match of code.matchAll(/import\s*\{([^}]+)\}\s*from ['"]([^'"]+\.jsx)['"]/g)) {
    const importedFile = path.resolve(path.dirname(file), match[2]);
    const source = path.relative(root, importedFile).split(path.sep).join('/');
    if (!/^apps\/florist\/(?:shell|features\/[^/]+)\/layouts\//.test(source)) continue;
    for (const imported of match[1].split(',')) {
      const [name, localName = name] = imported.trim().split(/\s+as\s+/);
      if (new RegExp('<' + localName + '\\b').test(code) && exposesMain(importedFile, visited))
        return true;
    }
  }
  return false;
}

let parsed = 0;
for (const folder of [
  ...fs.readdirSync(path.join(root, 'apps/florist/features')).map(name => 'features/' + name),
  'shell/session'
]) {
  const script = pageScript(folder);
  if (folder !== 'shell/session')
    assert.ok(
      exposesMain(path.join(root, 'apps/florist', folder, featureFiles(folder).view)),
      folder + ' must expose the skip-link destination'
    );
  const {ctx: c, history} = context();
  vm.runInContext(sharedLogic, c);
  vm.runInContext(script + '\nthis.Logic=Component;', c);
  const logic = new c.Logic({lang: 'en', tenant: 'default'});
  const values = logic.renderVals();
  assert.ok(values);
  parsed++;
  if (['features/cart', 'features/checkout'].includes(folder))
    assert.equal(
      values.totalLabel,
      values.sums.at(-1).value,
      'Sticky action total must match the order summary'
    );
  if (folder === 'shell/session') {
    // A bag and a shortlist handed over from the counter join the visitor's own, once.
    {
      const {ctx: hc, history: handHistory} = context();
      setAddress(hc, '/en/bag/?lines=VF-8RD5WN...2');
      vm.runInContext(sharedLogic, hc);
      vm.runInContext(script + '\nthis.Logic=Component;', hc);
      const handed = new hc.Logic({lang: 'en', tenant: 'default'});
      assert.deepEqual(
        JSON.parse(JSON.stringify(handed.state.bag.map(line => [line.id, line.qty]))),
        [['VF-8RD5WN', 2]],
        'a fresh visitor gets only the handed-over bag'
      );
      assert.deepEqual([...handHistory.at(-1)], ['replace', '/en/bag/'], 'the link is dropped');
      setAddress(hc, '/en/saved/?ids=VF-3HX9TP,VF-NOPE00');
      const shortlisted = new hc.Logic({lang: 'en', tenant: 'default'});
      assert.deepEqual([...shortlisted.state.saved], ['VF-3HX9TP']);
    }
    logic.navigate('faq');
    assert.equal(logic.state.route, 'faq');
    assert.ok(history.at(-1)[1].endsWith('/en/faq/'));
    history.length = 0;
    logic.navigate('shop');
    assert.equal(logic.state.route, 'shop');
    assert.deepEqual(history[0], ['push', '/en/shop/']);
    logic.navigate({view: 'product', id: 'ivory-classic', lang: 'fa'});
    assert.equal(logic.state.route, 'product');
    assert.equal(
      logic.state.routeInfo.id,
      'VF-7K2M4Q',
      'an old slug opens the product by its code'
    );
    assert.equal(logic.state.routeInfo.cat, 'boxes');
    assert.equal(logic.state.lang, 'fa');
    logic.navigate({view: 'shop', lang: 'en'}, true);
    assert.equal(history.at(-1)[0], 'replace');
    logic.navigate({view: 'shop', date: '2026-10-09'});
    assert.ok(history.at(-1)[1].includes('date=2026-10-09'));
    logic.navigate({view: 'signin', next: 'delivery'});
    assert.equal(logic.state.routeInfo.next, 'delivery');
    assert.ok(history.at(-1)[1].includes('next=delivery'));
    logic.renderVals().go({view: 'shop'}, true);
    assert.equal(history.at(-1)[0], 'replace', 'go can refine without a new history entry');
    logic.navigate('checkout');
    assert.equal(logic.state.route, 'bag');
    assert.equal(
      logic.state.routeInfo.step,
      'delivery',
      'incomplete details return to the delivery step'
    );
    assert.ok(history.at(-1)[1].includes('step=delivery'));
    let store = logic.renderVals().store;
    store.setDelivery({
      name: 'Sample',
      phone: '09123456789',
      address: 'Sample address',
      location: {lat: 35.83, lng: 50.96},
      zone: 'central',
      sender: 'Buyer',
      senderPhone: '09121112233'
    });
    logic.navigate('checkout');
    assert.equal(logic.state.routeInfo.step, 'delivery', 'payment requires a chosen time');
    logic
      .renderVals()
      .store.setDelivery(openDeliveryWindow(c, logic.state.delivery, logic.state.bag));
    logic.navigate('checkout');
    assert.equal(logic.state.route, 'checkout');
    const originalBag = logic.state.bag;
    logic.setState({bag: []});
    logic.navigate('checkout');
    assert.equal(logic.state.route, 'bag');
    assert.equal(logic.state.routeInfo.step, 'bag', 'an empty bag returns to the bag');
    logic.setState({bag: originalBag});
    logic.navigate('checkout');
    // A card added from the delivery step joins the line's price and needs a message before checkout.
    store = logic.renderVals().store;
    store.addCard('VF-8RD5WN');
    const orchid = logic.state.bag.find(l => l.id === 'VF-8RD5WN-card');
    assert.equal(orchid.unit, 3550000);
    logic.navigate('checkout');
    assert.equal(logic.state.route, 'bag');
    logic.renderVals().store.setCard('VF-8RD5WN-card', 'With love');
    logic.navigate('checkout');
    assert.equal(logic.state.route, 'checkout');
    logic.renderVals().store.remove('VF-8RD5WN-card');
    logic.renderVals().store.add({...originalBag[1]});
    const totals = vm.runInContext('format', c).number(8300000, 'en');
    assert.equal(totals, '8,300,000');
    const order = {
      lines: logic.state.bag,
      delivery: logic.state.delivery,
      totals: {sub: 8300000, fee: 0, total: 8300000},
      last4: '1234'
    };
    logic.renderVals().store.complete(order);
    assert.equal(logic.state.bag.length, 0);
    assert.equal(logic.state.order.totals.total, 8300000);
    assert.equal(logic.state.order.delivery.name, 'Sample');
  } else {
    // Phone, tablet and desktop layouts come from CSS breakpoints, not a JavaScript flag.
    assert.ok(!('mob' in values) && !('desk' in values), 'no JavaScript layout breakpoint');
    assert.ok(values.href.shop.endsWith('/shop/'));
  }
  if (folder === 'features/faq') {
    const fa = new c.Logic({lang: 'fa', tenant: 'clay'}).renderVals();
    assert.equal(fa.dir, 'rtl');
    assert.equal(fa.tenant, 'clay');
    assert.equal(fa.groups.length, 3);
    assert.equal(
      fa.groups.reduce((n, g) => n + g.items.length, 0),
      9
    );
    assert.ok(fa.groups[0].items[0].content.includes('۸۰٬۰۰۰'));
  }
}
console.log('Passed history, checkout state, and all ' + parsed + ' template logic checks.');

// Compare nested labels and every list item; localized values may differ.
function copyShape(value, path = 'copy') {
  const kind = Array.isArray(value)
    ? 'array'
    : value !== null && typeof value === 'object'
      ? 'object'
      : 'value';
  const shape = [path + ':' + kind];
  if (kind === 'object' || kind === 'array') {
    for (const key of Object.keys(value).sort())
      shape.push(...copyShape(value[key], path + '.' + key));
  }
  return shape;
}
assert.notDeepEqual(
  copyShape({labels: {validation: {required: 'Required'}}}),
  copyShape({labels: {validation: {}}}),
  'Missing nested validation copy must be detected'
);
assert.notDeepEqual(
  copyShape({items: [{title: 'Title', body: 'Body'}]}),
  copyShape({items: [{title: 'Title'}]}),
  'Missing labels inside lists must be detected'
);
assert.notDeepEqual(
  copyShape({label: 'Text'}),
  copyShape({label: {text: 'Text'}}),
  'Object versus leaf mismatches must be detected'
);
for (const name of [
  'account',
  'bag',
  'checkout',
  'contact',
  'error',
  'faq',
  'home',
  'journal',
  'notfound',
  'policy',
  'post',
  'presentation',
  'product',
  'saved',
  'search',
  'shop',
  'signin',
  'track',
  'weddings'
]) {
  const {ctx: c} = loadPage(name);
  // Every configured language (VF_LOCALES), not only English and Persian, needs the full copy.
  const languages = vm.runInContext('Object.keys(VF_LOCALES)', c);
  assert.ok(languages.length >= 2, 'VF_LOCALES lists the storefront languages');
  const copies = vm.runInContext(
    "Object.keys(VF_LOCALES).map(lang=>vfCopy({lang,fa:lang==='fa',m:value=>String(value),n:value=>String(value),t:{brand:'Demo',address:'Demo'}}))",
    c
  );
  copies.forEach((copy, index) => {
    assert.ok(copy, name + ' copy covers ' + languages[index]);
    assert.deepEqual(
      copyShape(copy),
      copyShape(copies[languages.indexOf('en')]),
      name + ' ' + languages[index] + ' copy must match the English structure'
    );
  });
}
console.log(
  'Passed recursive copy parity for every configured language, including nested labels and lists.'
);
// The template runtime reads values but cannot call functions: {{ handler('x') }} renders as nothing.
// Layout never branches on a JavaScript breakpoint: the shell and every view render all their
// structures and CSS picks one, so the first paint already matches the final layout.
for (const file of ['shell', 'features'].flatMap(folder =>
  fs
    .readdirSync(path.join(root, 'apps/florist', folder), {recursive: true})
    .filter(
      file => /(?:\.jsx|(?:^|[\\/])use[A-Z]\w*\.js)$/.test(file) && !file.endsWith('.fixture.jsx')
    )
    .map(file => path.join('apps/florist', folder, file))
))
  assert.doesNotMatch(read(file), /\b(v|S)\.(mob|desk|compactShop)\b/, file);
console.log('Passed: no view lays out from a JavaScript breakpoint.');
