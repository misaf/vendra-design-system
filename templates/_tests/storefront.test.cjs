// Run with: node templates/_tests/storefront.test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const {generate} = require('../_build/generate.cjs');
const {sharedLogic} = require('./page-script.cjs');
const {pageScript} = require('./page-script.cjs');
generate(true);
function context() {
  const history = [];
  const ctx = {
    URL,
    URLSearchParams,
    console,
    document: {getElementById: () => null},
    setTimeout,
    clearTimeout,
    location: {
      pathname: '/templates/app/',
      search: '',
      href: 'http://localhost/templates/app/'
    },
    history: {
      pushState: (_, __, url) => history.push(['push', url]),
      replaceState: (_, __, url) => history.push(['replace', url])
    },
    sessionStorage: {getItem: () => null, setItem: () => {}},
    DCLogic: class {
      constructor(props) {
        this.props = props;
        this.state = {};
      }
      setState(update, cb) {
        Object.assign(this.state, typeof update === 'function' ? update(this.state) : update);
        if (cb) cb();
      }
    }
  };
  ctx.window = {React: {}, innerWidth: 390, scrollTo: () => {}};
  vm.createContext(ctx);
  return {ctx, history};
}
const {ctx} = context();
vm.runInContext(
  sharedLogic + '\nthis.totals=vfTotals;this.errors=vfErrors;this.phone=vfPhone;',
  ctx
);
// A bag made at the shop counter travels in a link and comes back as the same lines, priced from
// the catalog; unknown and sold-out products, bad sizes and extras the product can't take drop out.
{
  const {ctx: c} = context();
  vm.runInContext(
    sharedLogic +
      '\nthis.line=vfBagLine;this.param=vfLinesParam;this.read=vfLinesFromParam;this.product=vfProduct;',
    c
  );
  const box = c.product('VF-7K2M4Q'),
    orchid = c.product('VF-8RD5WN');
  const plain = value => JSON.parse(JSON.stringify(value));
  const lines = [c.line(box, 'classic', ['card', 'vase'], 2), c.line(orchid, null, ['vase'], 1)];
  assert.equal(c.param(lines), 'VF-7K2M4Q.classic.card+vase.2,VF-8RD5WN...1');
  assert.equal(lines[1].addons.length, 0, 'the orchid takes no vase');
  const back = c.read(c.param(lines));
  assert.deepEqual(
    plain(back.map(line => [line.id, line.unit, line.qty])),
    plain(lines.map(line => [line.id, line.unit, line.qty]))
  );
  assert.equal(
    c.read('VF-NOPE00..card.1,VF-6MT3VY...1').length,
    0,
    'unknown and sold-out lines drop'
  );
  assert.equal(c.read('VF-7K2M4Q.huge..500')[0].qty, 99);
  assert.equal(c.read('VF-7K2M4Q.huge..500')[0].size, 'petite', 'an unknown size is the first');
  assert.equal(c.read('<script>').length, 0);
}
for (const [zone, fee] of [
  ['central', 80000],
  ['outer', 120000],
  ['alborz', 180000],
  ['tehran', 250000]
]) {
  assert.equal(ctx.totals([{unit: 1000000, qty: 2}], {zone}).fee, fee);
  assert.equal(
    ctx.totals([{unit: 2500000, qty: 2}], {zone}).fee,
    ['central', 'outer'].includes(zone) ? 0 : fee
  );
}
assert.equal(
  ctx.totals(
    [
      {unit: 4900000, qty: 1},
      {unit: 3400000, qty: 1}
    ],
    {zone: 'central'}
  ).total,
  8300000
);
assert.equal(ctx.phone('۰۹۱۲ ۳۴۵ ۶۷۸۹'), '09123456789');
assert.equal(ctx.phone('٠٩١٢٣٤٥٦٧٨٩'), '09123456789');
const sender = {sender: 'Buyer', senderPhone: '09121112233'};
assert.equal(
  Object.values(ctx.errors({name: '', phone: '0912', address: '', location: null})).filter(Boolean)
    .length,
  6,
  "recipient, pin, address and the sender's own name and mobile"
);
assert.equal(
  Object.values(
    ctx.errors({
      name: 'Sample',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      address: 'Unit 3',
      location: {lat: 35.83, lng: 50.96},
      ...sender
    })
  ).some(Boolean),
  false
);
// Without a map the pin isn't required, but the typed address must be a full one.
assert.deepEqual(
  {
    ...ctx.errors({
      name: 'Sample',
      phone: '09123456789',
      address: 'Unit',
      location: null,
      noMap: true,
      ...sender
    })
  },
  {
    name: false,
    phone: false,
    location: false,
    outside: false,
    address: true,
    cards: false,
    sender: false,
    senderPhone: false
  }
);
assert.equal(
  Object.values(
    ctx.errors({
      name: 'Sample',
      phone: '09123456789',
      address: '12 Golestan St, Karaj',
      location: null,
      noMap: true,
      ...sender
    })
  ).some(Boolean),
  false
);
assert.equal(
  ctx.errors({name: 'S', phone: '09123456789', address: 'U', location: {lat: 'x', lng: 50}})
    .location,
  true,
  'a broken pin is not a pin'
);
assert.equal(
  ctx.errors({
    ...sender,
    name: 'S',
    phone: '09123456789',
    address: 'U',
    location: {lat: 32.65, lng: 51.67}
  }).outside,
  true,
  'a pin beyond every zone is outside the delivery area'
);
// A bought handwritten card needs its message; a line without one does not.
vm.runInContext(
  'this.withCard=vfLineWithCard;this.hasCard=vfLineHasCard;this.zoneAt=vfZoneAt;this.slots=vfDeliverySlots;this.slot=vfDeliverySlot;this.cardText=vfCardMessages;this.sample=vfSampleBag;',
  ctx
);
const plain = {
  id: 'VF-9FA2KE',
  productId: 'VF-9FA2KE',
  size: null,
  addons: [],
  unit: 2200000,
  qty: 1,
  en: ['VF-9FA2KE', 'Bouquet · Garden roses · eucalyptus'],
  fa: ['VF-9FA2KE', 'دسته‌گل · رز باغی · اکالیپتوس']
};
const carded = ctx.withCard(plain);
assert.equal(carded.id, 'VF-9FA2KE-card');
assert.equal(carded.unit, 2350000);
assert.equal(carded.en[1], 'Bouquet · Garden roses · eucalyptus · Handwritten card');
assert.ok(ctx.hasCard(carded));
assert.equal(ctx.hasCard(plain), false);
// A line saved before products had codes (named, with a slug id) comes back titled by its code.
const legacy = ctx.withCard({
  id: 'ivory-classic-vase',
  unit: 5550000,
  qty: 1,
  en: ['Ivory ribbon box', 'Classic · 20 stems · Glass vase'],
  fa: ['باکس', 'کلاسیک · ۲۰ شاخه · گلدان شیشه‌ای']
});
assert.equal(legacy.id, 'VF-7K2M4Q-classic-card+vase', 'addons keep the product page order');
assert.equal(legacy.en[0], 'VF-7K2M4Q');
assert.equal(legacy.size, 'classic');
const base = {
  name: 'S',
  phone: '09123456789',
  address: 'U',
  location: {lat: 35.83, lng: 50.96},
  ...sender
};
assert.equal(ctx.errors(base, [plain]).cards, false);
assert.equal(ctx.errors(base, [carded]).cards, true);
assert.equal(ctx.errors(base, [{...carded, card: 'Love'}]).cards, false);
assert.ok(
  ctx.hasCard(ctx.sample()[0]) && ctx.sample()[0].card,
  'the sample bag pays for the card it writes'
);
assert.equal(ctx.cardText([{...carded, card: 'Love'}], {}, 'en'), '“\u2068Love\u2069”');
assert.equal(
  ctx.cardText([], {card: 'Old'}, 'en'),
  'Old',
  'older orders keep their order-wide message'
);
// The pin picks the smallest zone that reaches it.
assert.equal(ctx.zoneAt({lat: 35.8327, lng: 50.9654}), 'central');
assert.equal(ctx.zoneAt({lat: 35.8, lng: 50.86}), 'outer');
assert.equal(ctx.zoneAt({lat: 35.7, lng: 51.4}), 'tehran');
assert.equal(ctx.zoneAt({lat: 36.05, lng: 50.6}), 'alborz');
assert.equal(ctx.zoneAt(null), null);
// Today's slots close two hours before they end; the chosen slot falls forward to the next open one.
const afternoon = new Date(2026, 9, 6, 14, 30),
  iso = '2026-10-06';
assert.equal(
  ctx
    .slots(iso, afternoon)
    .map(x => x.closed)
    .join(),
  'true,true,false,false'
);
assert.equal(
  ctx
    .slots('2026-10-07', afternoon)
    .map(x => x.closed)
    .join(),
  'false,false,false,false',
  'other days keep every slot'
);
assert.equal(ctx.slot({zone: 'central', date: iso, slot: '08'}, afternoon), '16');
// The shop's delivery-day filter: same-day designs from today, the rest from tomorrow, never sold out or out of stock.
vm.runInContext('this.deliverable=vfDeliverableOn;this.product=vfProduct;', ctx);
const morning = new Date(2026, 9, 6, 9, 0),
  evening = new Date(2026, 9, 6, 19, 0);
assert.equal(ctx.deliverable(ctx.product('ivory'), '2026-10-06', morning), true);
assert.equal(ctx.deliverable(ctx.product('orchid'), '2026-10-06', morning), false);
assert.equal(ctx.deliverable(ctx.product('orchid'), '2026-10-07', morning), true);
assert.equal(
  ctx.deliverable(ctx.product('ivory'), '2026-10-06', evening),
  false,
  'today closes at the cut-off'
);
assert.equal(ctx.deliverable(ctx.product('ivory'), '2026-10-08', morning), false, 'sold-out day');
assert.equal(ctx.deliverable(ctx.product('bridal'), '2026-10-09', morning), false, 'out of stock');
assert.equal(ctx.slot({zone: 'central', date: '2026-10-07', slot: '08'}, afternoon), '08');
let parsed = 0;
for (const folder of fs
  .readdirSync(path.join(root, 'templates'))
  .filter(x => x.startsWith('storefront-'))) {
  const script = pageScript(folder);
  if (folder !== 'storefront-site')
    assert.ok(
      /<main\s+id="main"/.test(read('templates/' + folder + '/View.jsx')),
      folder + ' must expose the skip-link destination'
    );
  const {ctx: c, history} = context();
  vm.runInContext(sharedLogic, c);
  vm.runInContext(script + '\nthis.Logic=Component;', c);
  const logic = new c.Logic({lang: 'en', tenant: 'default'});
  const values = logic.renderVals();
  assert.ok(values);
  parsed++;
  if (['storefront-bag', 'storefront-checkout'].includes(folder))
    assert.equal(
      values.totalLabel,
      values.sums.at(-1).value,
      'Sticky action total must match the order summary'
    );
  if (folder === 'storefront-site') {
    // A bag and a shortlist handed over from the counter join the visitor's own, once.
    {
      const {ctx: hc, history: handHistory} = context();
      hc.location.search = '?lang=en&view=bag&lines=VF-8RD5WN...2';
      vm.runInContext(sharedLogic, hc);
      vm.runInContext(script + '\nthis.Logic=Component;', hc);
      const handed = new hc.Logic({lang: 'en', tenant: 'default'});
      assert.deepEqual(
        JSON.parse(JSON.stringify(handed.state.bag.map(line => [line.id, line.qty]))),
        [['VF-8RD5WN', 2]],
        'a fresh visitor gets only the handed-over bag'
      );
      assert.deepEqual(
        [...handHistory.at(-1)],
        ['replace', '?lang=en&view=bag'],
        'the link is dropped'
      );
      hc.location.search = '?lang=en&view=saved&ids=VF-3HX9TP,VF-NOPE00';
      const shortlisted = new hc.Logic({lang: 'en', tenant: 'default'});
      assert.deepEqual([...shortlisted.state.saved], ['VF-3HX9TP']);
    }
    logic.navigate('faq');
    assert.equal(logic.state.route, 'faq');
    assert.ok(history.at(-1)[1].includes('view=faq'));
    history.length = 0;
    logic.navigate('shop');
    assert.equal(logic.state.route, 'shop');
    assert.deepEqual(history[0], ['push', '?lang=en&view=shop']);
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
    assert.ok(values.href.shop.includes('view=shop'));
  }
  if (folder === 'storefront-faq') {
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
console.log(
  'Passed delivery fees, validation, Persian digits, history, checkout state, and all ' +
    parsed +
    ' template logic checks.'
);
// Exercise catalog navigation, URL restoration and the completed-order tracking snapshot.
function loadPage(name, props = {}, search = '') {
  const {ctx: c, history} = context();
  c.location.search = search;
  vm.runInContext(sharedLogic, c);
  vm.runInContext(pageScript('storefront-' + name) + '\nthis.Logic=Component;', c);
  return {logic: new c.Logic({lang: 'en', ...props}), ctx: c, history};
}
// Search queries round-trip independently of page state; their Close destination belongs to the
// history entry, not a single global "last page" that product exploration could overwrite.
for (const lang of ['en', 'fa']) {
  const {logic: site, ctx: c} = loadPage(
    'site',
    {lang},
    '?lang=' + lang + '&view=shop&cat=bouquets&filters=roses&sort=low'
  );
  const entries = [];
  for (const method of ['pushState', 'replaceState'])
    c.history[method] = (state, title, url) => {
      entries.push([method, url]);
      c.history.state = state;
      c.location.search = url;
    };
  site.navigate('search');
  const origin = c.history.state.vfSearchReturn;
  assert.ok(origin.includes('cat=bouquets'));
  assert.ok(origin.includes('filters=roses'));
  const query = lang === 'fa' ? ' ارکیده & + ' : ' Orchid & + ';
  site.navigate({view: 'search', lang, q: query}, true);
  assert.equal(entries.at(-1)[0], 'replaceState');
  assert.equal(c.history.state.vfSearchReturn, origin);
  assert.equal(site.state.routeInfo.q, query);
  assert.equal(new URLSearchParams(c.location.search).get('q'), query);
  const reloaded = new c.Logic({lang});
  assert.equal(reloaded.state.routeInfo.q, query);
  assert.equal(reloaded.renderVals().store.searchReturn.cat, 'bouquets');
  assert.equal(reloaded.renderVals().store.searchReturn.sort, 'low');
  c.history.state = {vfSearchReturn: 'https://example.com/'};
  assert.equal(new c.Logic({lang}).state.searchReturn, null);
  c.history.state = {vfSearchReturn: '?view=search&q=loop'};
  assert.equal(new c.Logic({lang}).state.searchReturn, null);

  const calls = [];
  const {logic: search, ctx: sc} = loadPage('search', {
    lang,
    routeInfo: {view: 'search', lang, q: query},
    store: {searchReturn: reloaded.state.searchReturn},
    go: (route, replace) => calls.push([route, replace])
  });
  sc.setTimeout = () => 0;
  assert.equal(search.renderVals().q, query);
  const close = new URLSearchParams(search.renderVals().closeHref);
  assert.equal(close.get('view'), 'shop');
  assert.equal(close.get('filters'), 'roses');
  assert.equal(close.get('lang'), lang);
  search.renderVals().setQ('VF-8RD5WN');
  assert.equal(calls.at(-1)[0].q, 'VF-8RD5WN');
  assert.equal(calls.at(-1)[1], true);
  search.renderVals().clearSearch();
  assert.equal(calls.at(-1)[0].q, '');
}
// Saved-products Undo preserves other changes, recovers the final item and ignores duplicates.
for (const lang of ['en', 'fa']) {
  const {logic: saved, ctx: c} = loadPage('saved', {lang});
  c.setTimeout = () => 0;
  const original = Array.from(saved.renderVals().items, item => item.name);
  saved.renderVals().items[0].remove();
  saved.renderVals().items[0].remove();
  const undo = saved.renderVals().undoRemove;
  undo();
  undo();
  assert.deepEqual(
    Array.from(saved.renderVals().items, item => item.name),
    original.slice(1)
  );
  saved.renderVals().items[0].remove();
  saved.renderVals().items[0].remove();
  assert.equal(saved.renderVals().noItems, true);
  saved.renderVals().undoRemove();
  assert.deepEqual(
    Array.from(saved.renderVals().items, item => item.name),
    original.slice(-1)
  );

  let ids = [...original];
  const store = {
    get saved() {
      return ids;
    },
    toggleSave(id) {
      ids = ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id];
    }
  };
  const {logic: routed, ctx: rc} = loadPage('saved', {lang, store});
  rc.setTimeout = () => 0;
  routed.renderVals().items[0].remove();
  ids.push('VF-7K2M4Q');
  routed.renderVals().undoRemove();
  assert.equal(new Set(ids).size, 4);
  assert.ok(ids.includes('VF-7K2M4Q'));
  assert.ok(ids.includes(original[0]));
  routed.renderVals().items[0].remove();
  ids.push('VF-7K2M4Q');
  routed.renderVals().undoRemove();
  assert.equal(ids.filter(id => id === 'VF-7K2M4Q').length, 1);
}

// Delayed page announcements respect focus received after they were scheduled.
{
  const {ctx: c} = context();
  const pending = [];
  let focused = 0;
  c.setTimeout = callback => pending.push(callback);
  c.document.querySelector = () => ({
    hasAttribute: () => true,
    focus: () => focused++
  });
  vm.runInContext(sharedLogic + '\nthis.nav=VF_NAV;', c);
  const active = (field, keep) => ({
    closest: selector => (selector === 'main' || keep ? {} : null),
    matches: () => field
  });
  // Focus may arrive after the heading move was queued, especially after opening payment.
  for (const element of [active(true, false), active(false, true)]) {
    c.document.activeElement = null;
    c.nav.focusHeading({preserveFocus: true});
    c.document.activeElement = element;
    pending.shift()();
    assert.equal(focused, 0);
  }
  c.document.activeElement = active(false, false);
  c.nav.focusHeading({preserveFocus: true});
  pending.shift()();
  assert.equal(focused, 1, 'ordinary navigation still focuses the heading');
  c.document.activeElement = active(true, false);
  c.nav.focusHeading();
  pending.shift()();
  assert.equal(focused, 2, 'the skip link can explicitly move focus');
}

// Both standalone and routed bags restore an exact line without duplicating it.
for (const lang of ['en', 'fa']) {
  const plain = value => JSON.parse(JSON.stringify(value));
  const {logic: bag, ctx: c} = loadPage('bag', {lang});
  c.setTimeout = () => 0;
  bag.renderVals().lines[0].setQty(2);
  const removed = plain(bag.state.lines[0]);
  bag.renderVals().lines[0].remove();
  bag.renderVals().lines[0].setQty(3);
  const remaining = plain(bag.state.lines[0]);
  const undo = bag.renderVals().undoRemove;
  undo();
  undo();
  assert.deepEqual(plain(bag.state.lines), [removed, remaining]);
  assert.equal(bag.renderVals().removedMessage, '');
  bag.renderVals().lines[0].remove();
  bag.renderVals().lines[0].remove();
  assert.equal(bag.renderVals().noItems, true);
  assert.ok(bag.renderVals().removedMessage.includes(remaining.token));
  bag.renderVals().undoRemove();
  assert.deepEqual(plain(bag.state.lines), [remaining]);

  const {logic: site} = loadPage('site', {lang});
  const first = plain(site.state.bag[0]);
  site.renderVals().store.remove(first.id);
  site.renderVals().store.setQty(site.state.bag[0].id, 4);
  const other = plain(site.state.bag[0]);
  site.renderVals().store.restoreLine(first, 0);
  site.renderVals().store.restoreLine(first, 0);
  assert.deepEqual(plain(site.state.bag), [first, other]);
}
// A shared quote round-trips through the router and initializes the product's choices, including
// subsequent links to the same product. Invalid choices use the catalog's normal fallback rules.
{
  const {ctx: c} = context();
  vm.runInContext(sharedLogic + '\nthis.read=vfReadRoute;this.params=vfRouteParams;', c);
  const route = c.read('?lang=en&view=product&id=VF-7K2M4Q&size=classic&addons=vase,card,vase');
  assert.equal(route.size, 'classic');
  assert.deepEqual(Array.from(route.addons), ['card', 'vase']);
  const restored = c.read(c.params(route));
  assert.equal(restored.size, route.size);
  assert.deepEqual(Array.from(restored.addons), ['card', 'vase']);
  const invalid = c.read('?view=product&id=VF-8RD5WN&size=huge&addons=vase,unknown');
  assert.equal(invalid.size, null);
  assert.deepEqual(Array.from(invalid.addons), []);
  const badSize = c.read('?view=product&id=VF-7K2M4Q&size=huge&addons=unknown');
  assert.equal(badSize.size, 'petite');
  assert.deepEqual(Array.from(badSize.addons), []);
  const {logic} = loadPage('product', {routeInfo: route});
  assert.equal(logic.state.size, 'classic');
  assert.deepEqual(Array.from(logic.state.addons), ['card', 'vase']);
  logic.lifecycle.didMount();
  logic.props = {...logic.props, routeInfo: {...route, size: 'generous', addons: []}};
  logic.renderVals();
  logic.lifecycle.didUpdate();
  assert.equal(logic.state.size, 'generous');
  assert.deepEqual(Array.from(logic.state.addons), []);
  logic.props = {...logic.props, routeInfo: {view: 'product', id: route.id}};
  logic.renderVals();
  logic.lifecycle.didUpdate();
  assert.equal(logic.state.size, 'petite');
  assert.deepEqual(Array.from(logic.state.addons), []);
}
for (const lang of ['en', 'fa']) {
  for (const id of ['VF-7K2M4Q', 'VF-3HX9TP', 'VF-8RD5WN', 'VF-4CJ6ZB', 'VF-9FA2KE', 'VF-6MT3VY']) {
    let added;
    const {logic} = loadPage('product', {
      lang,
      routeInfo: {view: 'product', id},
      store: {saved: [], add: line => (added = line)}
    });
    const v = logic.renderVals();
    const care = v.faq.find(item => item.id === 'care').content;
    assert.ok(care.trim(), 'Every product retains care instructions');
    assert.notEqual(care, v.t.desc, 'Care must not repeat the product description');
    assert.equal(v.t.careT, care, 'Product copy and the care accordion use the same advice');
    if (id === 'VF-8RD5WN') {
      assert.equal(
        care,
        lang === 'fa'
          ? 'وقتی ریشه‌ها نقره‌ای شدند آبیاری کنید و در نور غیرمستقیم نگه دارید.'
          : 'Water when the roots turn silver and keep in indirect light.'
      );
      assert.ok(!v.t.desc.includes(care), 'Orchid care is shown only in the care section');
    }
    v.add();
    if (id === 'VF-6MT3VY') {
      assert.equal(added, undefined);
      assert.equal(v.available, false);
      continue;
    }
    assert.equal(added.productId, id);
    assert.equal(added[lang][0], v.t.name);
    assert.equal(v.t.name, id, 'a product is titled by its code');
    assert.equal(
      added.unit,
      {
        'VF-7K2M4Q': 4100000,
        'VF-3HX9TP': 2800000,
        'VF-8RD5WN': 3400000,
        'VF-4CJ6ZB': 5200000,
        'VF-9FA2KE': 2200000
      }[id]
    );
    assert.equal(v.hasSizes, id === 'VF-7K2M4Q');
    // Page 2 of the shop shows every sample product (four per page).
    const listing = loadPage('shop', {lang, routeInfo: {view: 'shop', lang, page: 2}})
      .logic.renderVals()
      .items.find(item => item.name === v.t.name);
    assert.equal(v.unitPrice, listing.price, 'Default product price must match the listing');
    if (id === 'VF-7K2M4Q') {
      v.setSize(v.sizes[1].value);
      logic.renderVals().add();
      assert.equal(added.unit, 4900000, 'Classic surcharge remains selectable');
      logic.renderVals().setSize(logic.renderVals().sizes[2].value);
      logic.renderVals().add();
      assert.equal(added.unit, 6000000, 'Generous surcharge remains selectable');
      logic._productId = 'VF-8RD5WN';
      logic.lifecycle.didUpdate();
      assert.equal(
        logic.renderVals().unitPrice,
        listing.price,
        'Changing products resets to the starting price'
      );
    }
  }
  let next;
  const {logic: shop} = loadPage(
    'shop',
    {lang, go: r => (next = r)},
    '?view=shop&cat=bouquets&sort=low&filters=under3,same'
  );
  let v = shop.renderVals();
  assert.equal(v.items.length, 2);
  assert.ok(v.items[0].href.includes('id=VF-9FA2KE&cat=bouquets'));
  assert.equal(v.items[0].name, 'VF-9FA2KE');
  // Ready to send, Under 3M, Same day, Roses.
  v.chips[2].toggle();
  assert.ok(!next.filters.includes('same'));
  v.categories[2].pick();
  assert.equal(next.cat, 'boxes');
  const {logic: site, ctx: c} = loadPage('site', {lang});
  site.navigate({view: 'shop', cat: 'bouquets', sort: 'high', filters: ['roses', 'same'], lang});
  assert.equal(site.state.routeInfo.sort, 'high');
  assert.equal(site.state.routeInfo.filters.join(','), 'roses,same');
  site.renderVals().setLang(lang === 'en' ? 'fa' : 'en');
  assert.equal(site.state.routeInfo.cat, 'bouquets');
  site.navigate({view: 'product', id: 'unknown'});
  assert.equal(site.state.route, 'notfound');
  const lines = [
    {
      id: 'VF-9FA2KE',
      productId: 'VF-9FA2KE',
      unit: 2200000,
      qty: 2,
      image: 'assets/placeholders/product.svg',
      en: ['VF-9FA2KE', 'Bouquet · Garden roses'],
      fa: ['VF-9FA2KE', 'دسته‌گل · رز باغی']
    }
  ];
  const delivery = {
    name: 'Demo recipient',
    phone: '09120000000',
    address: 'Demo street 12',
    zone: 'tehran',
    slot: '16',
    sender: 'Demo sender',
    senderPhone: '09121112233'
  };
  let order;
  const {logic: checkout} = loadPage('checkout', {
    lang,
    store: {bag: lines, delivery, complete: o => (order = o)}
  });
  checkout.renderVals().setLast4('1234');
  checkout.renderVals().place();
  assert.ok(order.id.startsWith('VN-'));
  assert.equal(order.status, 'received');
  site.renderVals().store.complete(order);
  site.renderVals().store.add({...lines[0], qty: 1});
  assert.equal(site.state.order, null);
  assert.equal(site.state.lastOrder.id, order.id);
  site.renderVals().store.reorder(order);
  assert.equal(site.state.bag[0].qty, 2);
  assert.equal(site.state.delivery.name, 'Demo recipient');
  const {logic: track} = loadPage('track', {lang, store: site.renderVals().store});
  v = track.renderVals();
  assert.ok(v.t.orderNo.includes(order.id));
  assert.equal(v.current, 0);
  assert.equal(v.lines.length, 1);
  assert.equal(v.lines[0].name, lines[0][lang][0]);
  assert.ok(v.rows.some(r => r.value.includes('Demo recipient')));
  assert.equal(v.sums.at(-1).value, vm.runInContext('format', c).money(4650000, {lang}));
}
console.log(
  'Passed all product links/prices, URL filter restoration, language switching and completed-order tracking in English and Persian.'
);
// Recovery states are real navigation, and form errors retain a usable draft.
for (const lang of ['en', 'fa']) {
  const {logic: track} = loadPage('track', {lang, store: {saved: [], lastOrder: null}});
  assert.equal(track.renderVals().noOrder, true);
  const {logic: unknown} = loadPage('track', {
    lang,
    routeInfo: {view: 'track', id: 'wrong'},
    store: {
      saved: [],
      lastOrder: {
        id: 'VN-demo',
        status: 'received',
        lines: [],
        delivery: {
          zone: 'central',
          slot: '12',
          name: 'Demo',
          phone: '09120000000',
          address: 'Demo road'
        },
        totals: {sub: 0, fee: 0, total: 0},
        last4: '1234'
      }
    }
  });
  assert.equal(unknown.renderVals().noOrder, true);
  const {logic: saved} = loadPage('saved', {lang, store: {saved: []}});
  assert.equal(saved.renderVals().noItems, true);
  assert.ok(saved.renderVals().href.shop.includes('view=shop'));
  assert.equal(saved.renderVals().restore, undefined);
  const {logic: search} = loadPage('search', {lang});
  search.state.q = 'no-such-flower';
  assert.equal(search.renderVals().noResults, true);
  search.renderVals().clearSearch();
  assert.equal(search.renderVals().empty, true);
  const {logic: contact} = loadPage('contact', {lang});
  contact.state.msg = 'Demo message';
  contact.renderVals().send();
  assert.equal(contact.state.sent, false, 'a reply needs a mobile or an email');
  assert.ok(contact.renderVals().phoneErr);
  contact.state.email = 'bad';
  contact.renderVals().send();
  assert.ok(contact.renderVals().emailErr);
  assert.equal(contact.renderVals().phoneErr, undefined);
  contact.state.email = '';
  contact.state.phone = '0912 123 4567';
  contact.renderVals().send();
  assert.equal(contact.state.sent, true);
  contact.renderVals().editMessage();
  assert.equal(contact.state.sent, false);
  assert.equal(contact.state.msg, 'Demo message');
  const {logic: wedding} = loadPage('weddings', {lang});
  wedding.setState({name: 'Demo', phone: '1234567890'});
  wedding.renderVals().send();
  assert.equal(wedding.state.e2, true);
  assert.equal(wedding.state.sent, false);
  wedding.state.phone = '۰۹۱۲۰۰۰۰۰۰۰';
  wedding.renderVals().send();
  assert.equal(wedding.state.sent, true);
}
console.log(
  'Passed missing-order recovery, saved/search recovery, editable success states and mobile validation in both languages.'
);

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
  const copies = vm.runInContext(
    "['en','fa'].map(lang=>vfCopy({lang,fa:lang==='fa',m:value=>String(value),n:value=>String(value),t:{brand:'Demo',address:'Demo'}}))",
    c
  );
  assert.deepEqual(
    copyShape(copies[0]),
    copyShape(copies[1]),
    name + ' copy must have matching English and Persian structure'
  );
}
console.log('Passed recursive English/Persian copy parity, including nested labels and lists.');
// The template runtime reads values but cannot call functions: {{ handler('x') }} renders as nothing.
// Layout never branches on a JavaScript breakpoint: the shell and every view render all their
// structures and CSS picks one, so the first paint already matches the final layout.
for (const file of [
  'templates/app/Shell.jsx',
  ...fs
    .readdirSync(path.join(root, 'templates'))
    .filter(folder => folder.startsWith('storefront-'))
    .flatMap(folder => ['templates/' + folder + '/View.jsx', 'templates/' + folder + '/logic.js'])
    .filter(file => fs.existsSync(path.join(root, file)))
])
  assert.doesNotMatch(read(file), /\b(v|S)\.(mob|desk|compactShop)\b/, file);
console.log('Passed: no view lays out from a JavaScript breakpoint.');

// Stock, delivery changes, address switching, repeat orders and the WhatsApp handoff preserve intent.
for (const lang of ['en', 'fa']) {
  const {logic: site, ctx: c} = loadPage('site', {lang});
  const low = vm.runInContext("vfBagLine(vfProduct('VF-9FA2KE'), null, [], 2)", c);
  site.renderVals().store.add(low);
  site.renderVals().store.add(low);
  assert.equal(
    site.state.bag.find(line => line.id === low.id).qty,
    2,
    'repeated adds respect stock'
  );
  site.renderVals().store.setQty(low.id, 99);
  assert.equal(site.state.bag.find(line => line.id === low.id).qty, 2, 'bag edits respect stock');
  const variant = vm.runInContext("vfBagLine(vfProduct('VF-9FA2KE'), null, ['card'], 1)", c);
  site.renderVals().store.add(variant);
  assert.ok(!site.state.bag.some(line => line.id === variant.id), 'variants share product stock');

  const {logic: bag, ctx: bc} = loadPage('bag', {lang});
  bc.setTimeout = () => 0;
  bag.setState({delivery: {...bag.state.delivery, date: '2000-01-01', slot: '08'}});
  let values = bag.renderVals();
  assert.equal(values.deliveryChanged, true);
  assert.ok(values.deliverySuggestion);
  values.next();
  assert.equal(
    bag.state.delivery.date,
    '2000-01-01',
    'continue does not silently accept a replacement'
  );
  values.confirmDelivery();
  assert.equal(bag.renderVals().deliveryChanged, false);
  assert.notEqual(bag.state.delivery.date, '2000-01-01');
  const address = {
    label: 'Office',
    line: 'Another street 42',
    recipient: 'Test',
    phone: '09120000000',
    zone: 'tehran'
  };
  bc.localStorage = {
    getItem: key =>
      key === 'vf-account-phone'
        ? '09120000000'
        : JSON.stringify({profile: {}, addresses: [address], reminders: []})
  };
  bag.setState({delivery: {...bag.state.delivery, location: {lat: 35.8352, lng: 50.975}}});
  bag.renderVals().savedAddresses[0].pick();
  assert.equal(bag.state.delivery.location, null, 'an unpinned address clears the earlier pin');
  assert.equal(bag.state.delivery.address, address.line);
  assert.ok(vm.runInContext('vfErrors', bc)(bag.state.delivery).location);

  const existing = site.state.bag.map(line => ({...line}));
  const old = {...low, unit: 1, qty: 1};
  const unavailable = vm.runInContext("vfBagLine(vfProduct('VF-6MT3VY'))", c);
  const order = {
    id: 'VN-TEST',
    lines: [old, unavailable],
    delivery: {...bag.state.delivery},
    totals: {sub: 1, total: 1, fee: 0, discount: 0},
    status: 'received'
  };
  site.renderVals().store.complete(order);
  existing.forEach(line => site.renderVals().store.add(line));
  let next;
  const {logic: track} = loadPage('track', {
    lang,
    store: site.renderVals().store,
    go: route => (next = route)
  });
  const before = JSON.stringify(site.state.bag);
  track.renderVals().reorder({button: 0, preventDefault() {}});
  values = track.renderVals();
  assert.equal(values.reorderOpen, true);
  assert.equal(
    JSON.stringify(site.state.bag),
    before,
    'opening repeat order keeps the current bag'
  );
  assert.ok(values.reorderChanges.some(message => message.includes('VF-6MT3VY')));
  assert.ok(values.reorderChanges.some(message => message.includes('VF-9FA2KE')));
  values.closeReorder();
  assert.equal(JSON.stringify(site.state.bag), before, 'cancelling leaves the bag intact');
  track.renderVals().setReorderMode('add');
  track.renderVals().confirmReorder();
  assert.equal(next, 'bag');
  assert.ok(
    site.state.bag.some(line => line.id === existing[0].id),
    'adding retains existing products'
  );
  site.renderVals().store.reorder(order, 'replace');
  assert.equal(site.state.bag.length, 1);
  assert.equal(site.state.bag[0].unit, low.unit, 'repeat order uses the current price');

  const merge = vm.runInContext('vfReorderBag', c);
  const currentCard = {...existing[0], card: 'Keep my current message'};
  const earlierCard = {...currentCard, card: 'Earlier order message'};
  assert.equal(merge([earlierCard], [currentCard], 'add')[0].card, currentCard.card);
  assert.equal(merge([earlierCard], [currentCard], 'replace')[0].card, earlierCard.card);
  assert.equal(
    merge([old], [{...low, qty: 99}], 'add')[0].qty,
    99,
    'adding a repeat order does not silently reduce an existing overstocked line'
  );
  let blockedRoute;
  const stale = loadPage('checkout', {
    lang,
    go: route => (blockedRoute = route),
    store: {bag: [low], delivery: {...bag.state.delivery, date: '2000-01-01'}}
  }).logic;
  stale.setState({last4: '1234'});
  stale.renderVals().place();
  assert.equal(blockedRoute.view, 'bag');
  assert.equal(
    blockedRoute.step,
    'delivery',
    'payment cannot submit a delivery choice that expired'
  );

  const d = {
    name: 'Recipient Test',
    phone: '09120000000',
    sender: 'Sender Test',
    senderPhone: '09121111111',
    address: 'Test street 12',
    zone: 'central',
    date: '2026-10-20',
    slot: '12',
    location: {lat: 35.8352, lng: 50.975}
  };
  const card = vm.runInContext("vfBagLine(vfProduct('VF-7K2M4Q'), 'classic', ['card'], 1)", c);
  card.card = 'A personal card message';
  const message = vm.runInContext('vfOrderMessage', c)([card], d, card.unit, lang);
  for (const detail of [
    card.token,
    d.name,
    d.phone,
    d.sender,
    d.senderPhone,
    d.address,
    lang === 'fa' ? 'مهر' : 'October',
    card.card,
    '35.8352'
  ])
    assert.ok(message.includes(detail), 'WhatsApp includes ' + detail);
}
console.log(
  'Passed stock limits, explicit delivery confirmation, unpinned addresses, repeat-order review and complete bilingual WhatsApp handoff.'
);

// A delivery choice and payment draft remain meaningful throughout the shopping journey.
for (const lang of ['en', 'fa']) {
  const plain = value => JSON.parse(JSON.stringify(value));
  const {logic: site, ctx: c} = loadPage('site', {lang});
  const same = vm.runInContext("vfBagLine(vfProduct('VF-7K2M4Q'), 'petite', [], 1)", c);
  const prepared = vm.runInContext("vfBagLine(vfProduct('VF-8RD5WN'))", c);
  const morning = new Date(2026, 9, 5, 9);
  const days = vm.runInContext('vfDeliveryDays', c);
  const selected = vm.runInContext('vfDeliveryDate', c);
  const changed = vm.runInContext('vfDeliveryChanged', c);
  assert.equal(days('central', morning, [same])[0].iso, '2026-10-05');
  assert.equal(days('central', morning, [same, prepared])[0].iso, '2026-10-06');
  assert.equal(
    selected({zone: 'central', date: '2026-10-05', slot: '12'}, morning, [same, prepared]),
    '2026-10-06'
  );
  assert.equal(
    changed({zone: 'central', date: '2026-10-05', slot: '12'}, morning, [same, prepared]),
    true
  );
  assert.equal(days('central', new Date(2026, 9, 5, 19), [same])[0].pastCutoff, true);

  const readRoute = vm.runInContext('vfReadRoute', c);
  const writeRoute = vm.runInContext('vfRouteParams', c);
  const route = readRoute(`?view=product&lang=${lang}&id=VF-7K2M4Q&date=2026-10-06`);
  assert.equal(route.date, '2026-10-06');
  assert.equal(readRoute(writeRoute(route)).date, route.date);
  assert.equal(readRoute('?view=product&id=VF-7K2M4Q&date=2026-02-31').date, '');
  const {logic: product} = loadPage('product', {
    lang,
    routeInfo: route,
    store: site.renderVals().store
  });
  product.renderVals().add();
  assert.equal(
    site.state.delivery.date,
    route.date,
    'adding a product carries the requested delivery date'
  );

  const checkout = loadPage('checkout', {lang, store: site.renderVals().store}).logic;
  checkout.renderVals().setMethod('cod');
  checkout.renderVals().setLast4('۱۲۳۴');
  checkout.renderVals().setRef('TEST-REFERENCE');
  const draft = plain(site.state.paymentDraft);
  assert.deepEqual(draft, {
    method: 'cod',
    last4: '1234',
    ref: 'TEST-REFERENCE',
    receiptAmount: vm.runInContext('vfTotals', c)(site.state.bag, site.state.delivery).total
  });
  const returned = loadPage('checkout', {lang, store: site.renderVals().store}).logic.renderVals();
  assert.equal(returned.method, 'cod');
  assert.equal(returned.last4, draft.last4);
  assert.equal(returned.ref, draft.ref);
  assert.notEqual(returned.t.address, returned.footer.address);
  assert.equal(returned.footer.address, vm.runInContext('VF_STORE', c).address[lang]);
  assert.equal(returned.shellText.brand, vm.runInContext('VF_STORE', c).brand[lang]);
  let savedSession;
  c.sessionStorage.setItem = (key, value) => (savedSession = value);
  site.lifecycle.didUpdate();
  assert.deepEqual(JSON.parse(savedSession).paymentDraft, draft);
  site.renderVals().store.clear();
  assert.deepEqual(plain(site.state.paymentDraft), {
    method: null,
    last4: '',
    ref: '',
    receiptAmount: null
  });

  const {logic: bag, ctx: bc} = loadPage('bag', {lang});
  bc.setTimeout = () => 0;
  let v = bag.renderVals();
  assert.equal(v.freeDelivery, null, 'an unknown destination does not promise free shipping');
  assert.equal(v.sums.at(-1).label, lang === 'fa' ? 'جمع پیش از ارسال' : 'Total before delivery');
  assert.equal(v.sums.find(row => row.label === v.t.fee).value, v.t.feePending);
  const studio = vm.runInContext('VF_STORE.studio', bc);
  bag._update({location: studio});
  v = bag.renderVals();
  assert.equal(v.sums.find(row => row.label === v.t.fee).value, v.t.free);
  assert.ok(v.freeDelivery);
  assert.equal(v.zoneHint, '', 'mixed bags never promise same-day delivery in zone hints');
  bag._update({location: {lat: 35.6961, lng: 51.4231}});
  v = bag.renderVals();
  assert.equal(v.freeDelivery, null, 'Tehran never inherits a Karaj free-delivery promise');
  assert.notEqual(v.sums.find(row => row.label === v.t.fee).value, v.t.free);

  const before = plain(bag.state.lines);
  const cardLine = v.cardLines.find(line => line.noCard);
  cardLine.add();
  assert.ok(bag.renderVals().cardAddedMessage);
  bag.renderVals().undoCard();
  assert.deepEqual(
    plain(bag.state.lines),
    before,
    'undo removes only the newly added card and its charge'
  );

  const addCard = vm.runInContext('vfAddCard', c);
  const undoCard = vm.runInContext('vfUndoCardAddition', c);
  const withCard = vm.runInContext("vfBagLine(vfProduct('VF-7K2M4Q'), 'petite', ['card'], 2)", c);
  withCard.card = 'Keep this message';
  const initial = [withCard, same, prepared];
  const addition = addCard(initial, same.id);
  addition.lines.find(line => line.id === prepared.id).qty = 3;
  const restored = undoCard(addition.lines, addition.cardAddition);
  assert.deepEqual(
    plain(restored.slice(0, 2)),
    plain(initial.slice(0, 2)),
    'merged card additions preserve the earlier message and quantities'
  );
  assert.equal(
    restored.find(line => line.id === prepared.id).qty,
    3,
    'undo preserves unrelated edits'
  );
}
console.log(
  'Passed mixed-bag delivery dates, date handoff, payment drafts, provisional fees, card undo and isolated shell wording.'
);

// Responses, receipts and storage failures must not overwrite newer customer intent.
(async () => {
  const plain = value => JSON.parse(JSON.stringify(value));
  const flush = () => new Promise(resolve => setImmediate(resolve));
  const readyDelivery = (site, c) => {
    const delivery = {
      ...site.state.delivery,
      name: 'Recipient',
      phone: '09120000000',
      sender: 'Sender',
      senderPhone: '09121111111',
      address: 'Street 12 unit 3',
      location: {lat: 35.8352, lng: 50.975}
    };
    delivery.date = vm.runInContext('vfDeliveryDate', c)(delivery, new Date(), site.state.bag);
    site.setState({delivery});
  };
  for (const lang of ['en', 'fa']) {
    const {logic: site, ctx: c} = loadPage('site', {lang});
    c.setTimeout = () => 0;
    readyDelivery(site, c);
    const {logic: checkout, ctx: cc} = loadPage('checkout', {lang, store: site.renderVals().store});
    cc.setTimeout = () => 0;
    let finish,
      calls = 0;
    cc.window.VF_API = {
      live: true,
      checkout: () => {
        calls++;
        return new Promise(resolve => (finish = resolve));
      }
    };
    checkout.renderVals().setMethod('cod');
    checkout.renderVals().place();
    assert.equal(site.state.checkoutPending, true);
    const pending = loadPage('checkout', {lang, store: site.renderVals().store}).logic;
    assert.equal(
      pending.renderVals().placeDisabled,
      true,
      'pending submission survives a page remount'
    );
    pending.renderVals().place();
    assert.equal(calls, 1);
    site.renderVals().store.setQty(site.state.bag[0].id, 2);
    site.renderVals().store.setDelivery({address: 'Newer street 24 unit 5'});
    site.renderVals().store.setPaymentDraft({ref: 'NEWER-DRAFT'});
    finish(null);
    await flush();
    assert.equal(site.state.checkoutPending, false);
    assert.equal(site.state.bag[0].qty, 2, 'late success keeps the new bag');
    assert.equal(site.state.delivery.address, 'Newer street 24 unit 5');
    assert.equal(site.state.paymentDraft.ref, 'NEWER-DRAFT');
    assert.equal(site.state.order, null);
    const first = plain(site.state.lastOrder);
    assert.equal(first.lines[0].qty, 1);
    assert.ok(site.renderVals().checkoutNotice.href.includes(first.id));
    site.renderVals().store.complete({
      ...first,
      id: 'VN-20002',
      checkoutSnapshot: site.renderVals().store.checkoutSnapshot
    });
    assert.equal(site.state.bag.length, 0, 'an unchanged submitted bag is cleared');
    assert.equal(site.state.orders.length, 2);
    site.renderVals().store.complete(first);
    assert.equal(site.state.orders.length, 2, 'repeated completion does not duplicate history');
    const accountOrders = loadPage('account', {
      lang,
      store: site.renderVals().store
    }).logic.renderVals().orders;
    assert.ok(accountOrders.some(order => order.id === first.id));
    const tracked = loadPage('track', {
      lang,
      store: site.renderVals().store,
      routeInfo: {view: 'track', id: first.id}
    }).logic.renderVals();
    assert.equal(tracked.hasOrder, true);
    let session;
    c.sessionStorage.setItem = (_, value) => (session = value);
    site.lifecycle.didUpdate();
    c.sessionStorage.getItem = () => session;
    assert.equal(new c.Logic({lang}).state.orders.length, 2, 'history survives a reload');

    const {logic: receiptSite, ctx: rc} = loadPage('site', {lang});
    rc.setTimeout = () => 0;
    readyDelivery(receiptSite, rc);
    const entered = loadPage('checkout', {lang, store: receiptSite.renderVals().store}).logic;
    entered.renderVals().setMethod('card');
    entered.renderVals().setLast4('1234');
    entered.renderVals().setRef('EARLIER-RECEIPT');
    const originalAmount = receiptSite.state.paymentDraft.receiptAmount;
    receiptSite.renderVals().store.setQty(receiptSite.state.bag[0].id, 2);
    const changed = loadPage('checkout', {lang, store: receiptSite.renderVals().store});
    changed.ctx.setTimeout = () => 0;
    assert.equal(changed.logic.renderVals().receiptChanged, true);
    changed.logic.renderVals().place();
    assert.equal(receiptSite.state.order, null, 'a changed amount needs explicit confirmation');
    assert.equal(changed.logic.state.ref, 'EARLIER-RECEIPT');
    changed.logic.renderVals().setRef('UPDATED-RECEIPT');
    assert.equal(
      changed.logic.renderVals().receiptChanged,
      true,
      'editing a reference does not silently confirm a changed total'
    );
    changed.logic.renderVals().confirmReceipt();
    assert.ok(receiptSite.state.paymentDraft.receiptAmount > originalAmount);
    const confirmed = loadPage('checkout', {lang, store: receiptSite.renderVals().store}).logic;
    assert.equal(confirmed.renderVals().receiptChanged, false, 'confirmation survives a remount');
    confirmed.renderVals().place();
    assert.equal(receiptSite.state.order.ref, 'UPDATED-RECEIPT');
    assert.equal(receiptSite.state.bag.length, 0);

    const {logic: saved, ctx: sc} = loadPage('site', {lang});
    sc.window.addEventListener = () => {};
    sc.document.addEventListener = () => {};
    let hydrate;
    sc.window.VF_API = {
      live: true,
      loadSaved: () => new Promise(resolve => (hydrate = resolve)),
      saveItem: () => Promise.resolve(),
      unsaveItem: () => Promise.resolve()
    };
    saved.lifecycle.didMount();
    const removed = saved.state.saved[0];
    await saved.renderVals().store.toggleSave('VF-7K2M4Q');
    await saved.renderVals().store.toggleSave(removed);
    hydrate([removed, 'VF-3HX9TP']);
    await flush();
    assert.ok(saved.state.saved.includes('VF-7K2M4Q'), 'late hydration keeps new saves');
    assert.ok(!saved.state.saved.includes(removed), 'late hydration keeps removals');
    assert.ok(saved.state.saved.includes('VF-3HX9TP'), 'unmodified server items still load');

    const {logic: profile, ctx: pc} = loadPage('account', {lang});
    pc.setTimeout = () => 0;
    const storage = new Map([['vf-account-phone', '09120000000']]);
    pc.localStorage = {
      getItem: key => storage.get(key) || null,
      setItem: () => {
        throw new Error('Storage unavailable');
      }
    };
    profile.renderVals().setProfile.name('Keep my input');
    profile.renderVals().saveProfile();
    assert.ok(profile.renderVals().saveError);
    assert.equal(profile.state.notice, '');
    assert.equal(profile.renderVals().profile.name, 'Keep my input');
    assert.equal(
      vm.runInContext("vfWalletChange('09120000000', 100000, {kind: 'topup'})", pc),
      null,
      'a failed wallet write cannot report success'
    );
    pc.localStorage.setItem = (key, value) => storage.set(key, value);
    profile.renderVals().saveProfile();
    assert.equal(profile.renderVals().saveError, '');
    assert.ok(profile.state.notice);
    assert.equal(vm.runInContext("vfAccountLoad('09120000000').profile.name", pc), 'Keep my input');
    const route = vm.runInContext(
      'vfReadRoute',
      pc
    )(`?view=account&tab=balance&next=checkout&lang=${lang}`);
    assert.equal(route.next, 'checkout');
    assert.ok(vm.runInContext('vfRouteParams', pc)(route).includes('next=checkout'));
    assert.equal(
      vm.runInContext('vfReadRoute', pc)('?view=account&tab=balance&next=https://example.com').next,
      undefined
    );
    const returning = loadPage('account', {
      lang,
      routeInfo: route,
      store: receiptSite.renderVals().store
    }).logic;
    assert.equal(
      returning.renderVals().checkoutReturn,
      false,
      'an empty bag has no checkout return'
    );
    returning.props.store = site.renderVals().store;
    returning.props.store.bag = [first.lines[0]];
    assert.equal(returning.renderVals().checkoutReturn, true);
  }
  console.log(
    'Passed checkout response isolation, receipt amount confirmation, order history, saved-list hydration, failed storage and top-up return routes.'
  );
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

// Account editors apply only the requested operation to the latest stored account.
for (const lang of ['en', 'fa']) {
  const {logic: account, ctx: c} = loadPage('account', {lang});
  c.setTimeout = () => 0;
  const storage = new Map([['vf-account-phone', '09120000000']]);
  c.localStorage = {
    getItem: key => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, value)
  };
  account.renderVals().setProfile.name('First edit');
  account.renderVals().saveProfile();
  const read = () => vm.runInContext("vfAccountLoad('09120000000')", c);
  const before = read().wallet.balance;
  account.renderVals().setProfile.name('New name');
  vm.runInContext("vfWalletChange('09120000000', 1000000, {kind: 'topup'})", c);
  const external = read();
  external.profile.email = 'newer@example.com';
  external.addresses.push({...external.addresses[0], id: 'new-address', isDefault: false});
  vm.runInContext('vfAccountSave', c)('09120000000', external);
  account.renderVals().saveProfile();
  assert.equal(
    read().wallet.balance,
    before + 1000000,
    'profile saves preserve newer wallet writes'
  );
  assert.equal(read().profile.name, 'New name');
  assert.equal(read().profile.email, 'newer@example.com', 'untouched profile fields stay current');
  assert.ok(read().addresses.some(address => address.id === 'new-address'));
  const reminder = account.renderVals().reminders[0];
  const updated = read();
  updated.reminders.push({...updated.reminders[0], id: 'new-reminder'});
  vm.runInContext('vfAccountSave', c)('09120000000', updated);
  reminder.toggle(false);
  assert.ok(
    read().reminders.some(item => item.id === 'new-reminder'),
    'reminder edits preserve concurrent additions'
  );
  assert.equal(read().wallet.balance, before + 1000000);
}
console.log('Passed account updates against newer wallet, profile, address and reminder data.');

for (const lang of ['en', 'fa']) {
  const {logic: site} = loadPage('site', {lang});
  const {logic: checkout, ctx: c} = loadPage('checkout', {lang, store: site.renderVals().store});
  c.setTimeout = () => 0;
  let submitted = 0;
  c.window.VF_API = {
    live: true,
    checkout: () => {
      submitted++;
      return Promise.resolve();
    }
  };
  c.sessionStorage.setItem = () => {
    throw new Error('Storage full');
  };
  checkout.renderVals().setMethod('online');
  checkout.renderVals().place();
  assert.equal(submitted, 0, 'a missing recovery record blocks the API submission too');
  assert.equal(checkout.state.payment, null);
  assert.ok(checkout.renderVals().paymentSaveError);
  c.window.VF_API.live = false;
  let saved;
  c.sessionStorage.setItem = (_, value) => (saved = JSON.parse(value));
  checkout.renderVals().place();
  assert.equal(checkout.state.payment.status, 'redirecting');
  assert.equal(saved.id, checkout.state.payment.record.id);
  assert.equal(checkout.renderVals().paymentSaveError, '');
  checkout.setState({payment: {...checkout.state.payment, status: 'failed'}});
  c.sessionStorage.setItem = () => {
    throw new Error('Storage full');
  };
  checkout.renderVals().payRetry();
  assert.equal(
    checkout.state.payment.status,
    'failed',
    'failed persistence also blocks retry redirection'
  );
}
console.log('Passed pending-payment persistence failures, recovery, and retry safeguards.');

for (const lang of ['en', 'fa']) {
  const {logic: site, ctx: c} = loadPage('site', {lang});
  c.setTimeout = () => 0;
  const storage = new Map(),
    session = new Map();
  c.localStorage = {
    getItem: key => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: key => storage.delete(key)
  };
  c.sessionStorage = {
    getItem: key => session.get(key) || null,
    setItem: (key, value) => session.set(key, value)
  };
  const login = phone => {
    vm.runInContext('vfAccountLogin', c)(phone, lang);
    site.renderVals().store.syncCustomer();
  };
  login('09120000000');
  const first = {
    id: 'VN-31001',
    customerId: '09120000000',
    method: 'cod',
    status: 'received',
    lines: site.state.bag,
    delivery: {...site.state.delivery, name: 'Customer A', senderPhone: '09120000000'},
    totals: {sub: 8450000, fee: 0, total: 8450000}
  };
  site.renderVals().store.complete(first);
  site.renderVals().store.setDelivery({address: 'Private address A'});
  site.renderVals().store.setPaymentDraft({last4: '1234', ref: 'PRIVATE-A'});
  vm.runInContext('vfAccountSignOut()', c);
  site.renderVals().store.syncCustomer();
  assert.equal(site.state.customerId, 'guest');
  assert.equal(site.state.orders.length, 0);
  assert.equal(site.state.delivery.address, '');
  assert.equal(site.state.paymentDraft.ref, '');
  login('09121111111');
  assert.equal(site.state.orders.length, 0, 'another customer cannot see earlier history');
  site.renderVals().store.complete({...first, id: 'VN-31002', customerId: '09120000000'});
  assert.equal(site.state.lastOrder, null, 'late completion stays with its original owner');
  assert.equal(site.state.customers['09120000000'].orders.length, 2);
  site.lifecycle.didUpdate();
  const reloaded = new c.Logic({lang});
  assert.equal(reloaded.state.customerId, '09121111111');
  assert.equal(reloaded.state.orders.length, 0);
  login('09120000000');
  assert.equal(site.state.orders.length, 2);
  assert.equal(site.state.delivery.address, 'Private address A');
  assert.equal(site.state.paymentDraft.ref, 'PRIVATE-A');

  const checkout = loadPage('checkout', {lang, store: site.renderVals().store});
  checkout.ctx.localStorage = c.localStorage;
  checkout.ctx.sessionStorage = {
    getItem: key => session.get(key) || null,
    setItem: (key, value) => session.set(key, value),
    removeItem: key => session.delete(key)
  };
  vm.runInContext('vfKeepPayment', checkout.ctx)({...first, method: 'online'});
  assert.equal(vm.runInContext('vfPendingPayment', checkout.ctx)(first.id).id, first.id);
  login('09121111111');
  assert.equal(
    vm.runInContext('vfPendingPayment', checkout.ctx)(first.id),
    null,
    'pending payments are customer-scoped'
  );
  vm.runInContext('vfAccountSignOut()', c);
  site.renderVals().store.syncCustomer();
  site.renderVals().store.setDelivery({name: 'Guest recipient', senderPhone: '09123333333'});
  site.renderVals().store.setPaymentDraft({ref: 'GUEST-CHECKOUT'});
  const bag = site.state.bag;
  vm.runInContext('vfAccountLogin', c)('09123333333', lang);
  site.renderVals().store.syncCustomer({continueCheckout: true});
  assert.equal(site.state.delivery.name, 'Guest recipient');
  assert.equal(site.state.paymentDraft.ref, 'GUEST-CHECKOUT');
  assert.equal(site.state.bag, bag, 'sign-in preserves the shared bag');
  vm.runInContext('vfAccountSignOut()', c);
  site.renderVals().store.syncCustomer();
  assert.equal(
    site.state.paymentDraft.ref,
    '',
    'claimed guest drafts do not reappear after sign-out'
  );
}
console.log(
  'Passed customer-isolated drafts, history, late completions, reloads and payment recovery.'
);

for (const lang of ['en', 'fa']) {
  let destination;
  const {logic: site, ctx: sc} = loadPage('site', {lang});
  const d = {...site.state.delivery};
  d.date = vm.runInContext('vfDeliveryDate', sc)(d, new Date(), site.state.bag);
  const {logic: checkout, ctx: c} = loadPage('checkout', {
    lang,
    store: site.renderVals().store,
    go: route => (destination = route)
  });
  c.setTimeout = () => 0;
  const record = {
    id: 'VN-41001',
    totals: {total: 8450000},
    customerId: 'guest',
    lines: site.state.bag,
    delivery: {...d, date: '2000-01-01'}
  };
  checkout.setState({payment: {status: 'failed', record}});
  checkout.renderVals().payRetry();
  assert.equal(checkout.state.payment.status, 'failed');
  assert.equal(checkout.renderVals().retryReview, true);
  checkout.renderVals().reviewRetry();
  assert.equal(destination.step, 'delivery');
  assert.equal(checkout.state.payment, null);
  checkout.setState({payment: {status: 'failed', record: {...record, delivery: d}}});
  checkout.renderVals().payRetry();
  assert.equal(checkout.state.payment.status, 'redirecting', 'a valid window can still retry');
  const unavailable = {
    ...record,
    delivery: d,
    lines: record.lines.map(line => ({...line, qty: 9999}))
  };
  checkout.setState({payment: {status: 'failed', record: unavailable}});
  checkout.renderVals().payRetry();
  assert.equal(checkout.state.payment.status, 'failed', 'stock changes prevent payment retries');
  checkout.renderVals().reviewRetry();
  assert.equal(destination.step, 'bag');
}
console.log('Passed payment-retry delivery and stock revalidation.');
