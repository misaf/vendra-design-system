import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readDemoProduct} from '../src/demo/catalog.mjs';
import {context, loadPage, openDeliveryWindow, setAddress, sharedLogic} from './page-script.mjs';

// Search queries round-trip independently of page state; their Close destination belongs to the
// history entry, not a single global "last page" that product exploration could overwrite.
for (const lang of ['en', 'fa']) {
  const {logic: site, ctx: c} = loadPage(
    'site',
    {lang},
    '/' + lang + '/shop/bouquets/?filters=roses&sort=low'
  );
  const entries = [];
  for (const method of ['pushState', 'replaceState'])
    c.history[method] = (state, title, url) => {
      entries.push([method, url]);
      c.history.state = state;
      setAddress(c, url);
    };
  site.navigate('search');
  const origin = c.history.state.vfSearchReturn;
  assert.ok(origin.includes('/shop/bouquets/'));
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
  c.history.state = {vfSearchReturn: '/en/search/?q=loop'};
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
  const close = new URL(search.renderVals().closeHref, 'http://localhost');
  assert.equal(close.pathname, '/' + lang + '/shop/bouquets/');
  assert.equal(close.searchParams.get('filters'), 'roses');
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

// Saved cards add straight to the bag (tracked as the saved list), send designs with sizes to the
// product page, keep sold-out designs disabled, and Undo returns the bag line to its earlier state.
for (const lang of ['en', 'fa']) {
  let bag = [{id: 'VF-3HX9TP', qty: 1, unit: 1}];
  const calls = [];
  const store = {
    saved: ['VF-7K2M4Q', 'VF-3HX9TP', 'VF-6MT3VY', 'VF-8RD5WN'],
    get bag() {
      return bag;
    },
    add(line, date, listName) {
      calls.push(['add', line.id, listName]);
      const existing = bag.find(item => item.id === line.id);
      bag = existing
        ? bag.map(item => (item.id === line.id ? {...item, qty: item.qty + line.qty} : item))
        : [...bag, line];
    },
    setQty(id, qty) {
      calls.push(['setQty', id, qty]);
      bag = bag.map(item => (item.id === id ? {...item, qty} : item));
    },
    remove(id) {
      calls.push(['remove', id]);
      bag = bag.filter(item => item.id !== id);
    }
  };
  const {logic: saved} = loadPage('saved', {lang, store});
  const byName = () => Object.fromEntries(saved.renderVals().items.map(item => [item.name, item]));
  let items = byName();
  assert.equal(items['VF-7K2M4Q'].action.kind, 'size');
  assert.ok(items['VF-7K2M4Q'].action.href.includes('VF-7K2M4Q'));
  assert.equal(items['VF-6MT3VY'].action.kind, 'unavailable');
  assert.equal(items['VF-6MT3VY'].action.label, lang === 'fa' ? 'ناموجود' : 'Sold out');
  assert.equal(items['VF-8RD5WN'].action.kind, 'add');
  assert.ok(items['VF-8RD5WN'].action.ariaLabel.includes('VF-8RD5WN'));

  items['VF-8RD5WN'].action.onAdd();
  assert.deepEqual(calls.at(-1), ['add', 'VF-8RD5WN', 'saved']);
  let v = saved.renderVals();
  assert.equal(v.addedOpen, true);
  assert.equal(v.addedLines[0].name, 'VF-8RD5WN');
  assert.equal(v.addedSums.length, 1);
  v.undoAdd();
  assert.deepEqual(calls.at(-1), ['remove', 'VF-8RD5WN']);
  assert.equal(saved.renderVals().addedOpen, false);

  // A design already in the bag goes back to its earlier quantity, not out of the bag.
  byName()['VF-3HX9TP'].action.onAdd();
  assert.equal(bag.find(item => item.id === 'VF-3HX9TP').qty, 2);
  saved.renderVals().undoAdd();
  assert.deepEqual(calls.at(-1), ['setQty', 'VF-3HX9TP', 1]);
  assert.equal(bag.find(item => item.id === 'VF-3HX9TP').qty, 1);

  // Another customer signing in closes the confirmation; its Undo never touches their bag.
  byName()['VF-8RD5WN'].action.onAdd();
  store.customerId = 'someone-else';
  const count = calls.length;
  v = saved.renderVals();
  assert.equal(v.addedOpen, false);
  v.undoAdd();
  assert.equal(calls.length, count);
}

// A shared quote round-trips through the router and initializes the product's choices, including
// subsequent links to the same product. Invalid choices use the catalog's normal fallback rules.
{
  const {ctx: c} = context();
  vm.runInContext(sharedLogic + '\nthis.read=vfReadRoute;this.params=vfRouteUrl;', c);
  const route = c.read('/en/product/VF-7K2M4Q/?size=classic&addons=vase,card,vase');
  assert.equal(route.size, 'classic');
  assert.deepEqual(Array.from(route.addons), ['card', 'vase']);
  const restored = c.read(c.params(route));
  assert.equal(restored.size, route.size);
  assert.deepEqual(Array.from(restored.addons), ['card', 'vase']);
  const invalid = c.read('/en/product/VF-8RD5WN/?size=huge&addons=vase,unknown');
  assert.equal(invalid.size, null);
  assert.deepEqual(Array.from(invalid.addons), []);
  const badSize = c.read('/en/product/VF-7K2M4Q/?size=huge&addons=unknown');
  assert.equal(badSize.size, 'petite');
  assert.deepEqual(Array.from(badSize.addons), []);
  const {logic} = loadPage('product', {routeInfo: route});
  assert.equal(logic.renderVals().size, 'classic');
  assert.equal(logic.renderVals().addons.filter(addon => addon.on).length, 2);
  logic.lifecycle.didMount();
  logic.renderVals().add();
  assert.equal(logic.renderVals().addedOpen, true);
  logic.props = {...logic.props, routeInfo: {...route, size: 'generous', addons: []}};
  logic.renderVals();
  logic.lifecycle.didUpdate();
  assert.equal(logic.renderVals().size, 'generous');
  assert.equal(logic.renderVals().addedOpen, false);
  assert.ok(logic.renderVals().addons.every(addon => !addon.on));
  logic.props = {...logic.props, routeInfo: {view: 'product', id: route.id}};
  logic.renderVals();
  logic.lifecycle.didUpdate();
  assert.equal(logic.renderVals().size, 'petite');
  assert.ok(logic.renderVals().addons.every(addon => !addon.on));
}
for (const lang of ['en', 'fa']) {
  for (const id of ['VF-7K2M4Q', 'VF-3HX9TP', 'VF-8RD5WN', 'VF-4CJ6ZB', 'VF-9FA2KE', 'VF-6MT3VY']) {
    let added;
    const {logic} = loadPage('product', {
      lang,
      routeInfo: {view: 'product', id},
      store: {saved: [], add: line => (added = line)},
      go: routeInfo => {
        logic.props = {...logic.props, routeInfo};
      }
    });
    const v = logic.renderVals();
    const care = v.faq.find(item => item.id === 'care').content;
    assert.ok(care.trim(), 'Every product retains care instructions');
    assert.notEqual(
      care,
      v.details.description.paragraphs[0],
      'Care must not repeat the product description'
    );
    assert.equal(v.t.careT, care, 'Product copy and the care accordion use the same advice');
    if (id === 'VF-8RD5WN') {
      assert.equal(
        care,
        lang === 'fa'
          ? 'وقتی ریشه‌ها نقره‌ای شدند آبیاری کنید و در نور غیرمستقیم نگه دارید.'
          : 'Water when the roots turn silver and keep in indirect light.'
      );
      assert.ok(
        !v.details.description.paragraphs[0].includes(care),
        'Orchid care is shown only in the care section'
      );
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
    assert.equal(v.details.price, listing.price, 'Default product price must match the listing');
    if (id === 'VF-7K2M4Q') {
      v.setSize(v.sizes[1].value);
      logic.renderVals().add();
      assert.equal(added.unit, 4900000, 'Classic surcharge remains selectable');
      logic.renderVals().setSize(logic.renderVals().sizes[2].value);
      logic.renderVals().add();
      assert.equal(added.unit, 6000000, 'Generous surcharge remains selectable');
      logic.props = {
        ...logic.props,
        ...readDemoProduct('VF-8RD5WN', lang),
        routeInfo: {view: 'product', id: 'VF-8RD5WN'}
      };
      const changed = logic.renderVals();
      assert.equal(
        changed.details.price,
        loadPage('product', {
          lang,
          routeInfo: {view: 'product', id: 'VF-8RD5WN'}
        }).logic.renderVals().details.price,
        'Changing products restores the new product’s base price'
      );
    }
  }
  let next;
  const {logic: shop} = loadPage(
    'shop',
    {lang, go: r => (next = r)},
    '/en/shop/bouquets/?sort=low&filters=under3,same'
  );
  let v = shop.renderVals();
  assert.equal(v.items.length, 2);
  assert.ok(v.items[0].href.includes('/product/VF-9FA2KE/'));
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
    ...openDeliveryWindow(c, {zone: 'tehran'}, lines),
    sender: 'Demo sender',
    senderPhone: '09121112233'
  };
  let order;
  const {logic: checkout} = loadPage('checkout', {
    lang,
    store: {bag: lines, delivery, complete: o => (order = o)}
  });
  checkout.renderVals().setLast4('1234');
  checkout.renderVals().submitOrder();
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

for (const lang of ['en', 'fa']) {
  let route;
  const {logic: product, ctx: c} = loadPage('product', {
    lang,
    routeInfo: {view: 'product', id: 'VF-7K2M4Q', date: '2026-10-21'},
    go: (next, replace) => {
      route = next;
      assert.equal(replace, true);
      const read = vm.runInContext('vfReadRoute', c);
      const write = vm.runInContext('vfRouteUrl', c);
      product.props = {...product.props, routeInfo: read(write(next))};
    }
  });
  product.renderVals().setSize('generous');
  product
    .renderVals()
    .addons.find(addon => addon.label.includes(lang === 'fa' ? 'کارت' : 'Handwritten'))
    .toggle();
  product.renderVals().setQty(2);
  const encoded = vm.runInContext('vfRouteUrl', c)(route);
  const restored = vm.runInContext('vfReadRoute', c)(encoded);
  const reload = loadPage('product', {lang, routeInfo: restored}).logic.renderVals();
  assert.equal(reload.size, 'generous');
  assert.equal(reload.qty, 2);
  assert.ok(reload.addons.some(addon => addon.on));
  assert.equal(restored.date, '2026-10-21');
  assert.equal(vm.runInContext('vfReadRoute', c)('/en/product/VF-7K2M4Q/?qty=-1').qty, 1);
  assert.equal(vm.runInContext('vfReadRoute', c)('/en/product/VF-7K2M4Q/?qty=Infinity').qty, 1);
  const scarce = loadPage('product', {
    lang,
    routeInfo: {view: 'product', id: 'VF-9FA2KE', qty: 99}
  }).logic;
  assert.equal(scarce.renderVals().qty, 2, 'restored quantities still respect stock');
}
console.log('Passed product size, extras, quantity and delivery-date URL recovery.');
{
  const {logic: product, ctx: c} = loadPage('product', {}, '/en/?page=product');
  c.history.replaceState = (_, __, url) => setAddress(c, url);
  product.renderVals().setSize('generous');
  product.renderVals().setQty(2);
  assert.equal(new URLSearchParams(c.location.search).get('page'), 'product');
  const reloaded = new c.Logic({lang: 'en', ...readDemoProduct('VF-7K2M4Q', 'en')}).renderVals();
  assert.equal(reloaded.size, 'generous');
  assert.equal(reloaded.qty, 2, 'standalone template reloads preserve the same choices');
}
