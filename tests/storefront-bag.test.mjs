import assert from 'node:assert/strict';
import vm from 'node:vm';
import {loadPage, setAddress} from './page-script.mjs';

// Mount must persist a consumed handover before the visitor makes any state edit.
for (const lang of ['en', 'fa']) {
  for (const [view, handover] of [
    ['saved', 'ids=VF-3HX9TP'],
    ['bag', 'lines=VF-8RD5WN...2']
  ]) {
    const {logic: site, ctx: c} = loadPage('site', {lang}, `/${lang}/${view}/?${handover}`);
    let stored;
    c.sessionStorage.setItem = (_, value) => {
      stored = value;
    };
    c.sessionStorage.getItem = () => stored || null;
    c.vfRuntime.api = {live: false};
    c.window.addEventListener = c.document.addEventListener = () => {};
    site.lifecycle.didMount();
    assert.ok(stored, 'initial handover is saved on mount without an edit');
    setAddress(c, `/${lang}/${view}/`);
    const restored = new c.Logic({lang});
    const plain = value => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain(restored.state.saved), plain(site.state.saved));
    assert.deepEqual(plain(restored.state.bag), plain(site.state.bag));
    c.sessionStorage.setItem = () => {
      throw new Error('Storage full');
    };
    assert.doesNotThrow(
      () => site.lifecycle.didMount(),
      'blocked session storage does not crash mount'
    );
  }
}
console.log('Passed initial shortlist/bag handover persistence and blocked-storage mount.');

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

// A bag kept from an earlier visit is priced from the current catalog when it opens and again
// before delivery and payment; each changed line says so and the totals follow the new prices.
for (const lang of ['en', 'fa']) {
  const {logic: first, ctx: c} = loadPage('site', {lang}, `/${lang}/bag/`);
  const plain = value => JSON.parse(JSON.stringify(value));
  const money = value => vm.runInContext('VF_MONEY', c)(value, lang === 'fa');
  const current = plain(first.state.bag);
  const stale = current.map(line => ({...line, unit: line.unit - 100000}));
  c.sessionStorage.getItem = () => JSON.stringify({bag: stale});
  const site = new c.Logic({lang});
  assert.deepEqual(
    plain(site.state.bag).map(line => line.unit),
    current.map(line => line.unit),
    'a saved bag opens at the current prices'
  );
  assert.deepEqual(plain(site.state.priceChanges[current[0].id]), {
    from: stale[0].unit,
    to: current[0].unit
  });
  // Unseen price changes keep a direct checkout visit and an order on the bag.
  setAddress(c, `/${lang}/checkout/`);
  const direct = new c.Logic({lang});
  assert.equal(direct.state.route, 'bag');
  assert.equal(direct.state.routeInfo.step, 'bag', 'a direct checkout visit opens the bag notices');
  setAddress(c, `/${lang}/bag/`);
  let unseenRoute;
  const {logic: unseen} = loadPage('checkout', {
    lang,
    go: next => (unseenRoute = next),
    store: {
      bag: site.state.bag,
      priceChanges: site.state.priceChanges,
      delivery: {...site.state.delivery, date: '', slot: null}
    }
  });
  unseen.setState({last4: '1234'});
  unseen.renderVals().submitOrder();
  assert.equal(unseenRoute.step, 'bag', 'checkout shows unseen price changes in the bag first');
  let route;
  const {logic: bag, ctx: bc} = loadPage('bag', {
    lang,
    store: site.renderVals().store,
    go: next => (route = next)
  });
  const view = () => {
    bag.props.store = site.renderVals().store;
    return bag.renderVals();
  };
  bc.window.VF_TRACK = {event() {}, consent() {}};
  const announcePrices = bag._announcePrices;
  let announced = [];
  bag._announcePrices = changes => announcePrices((announced = changes));
  bag.lifecycle.didMount();
  assert.deepEqual(
    plain(announced),
    current.map((line, index) => ({id: line.id, from: stale[index].unit, to: line.unit})),
    'price changes made before the bag opened are announced on opening'
  );
  let values = view();
  assert.ok(values.lines[0].priceNotice.includes(money(stale[0].unit)));
  assert.ok(values.lines[0].priceNotice.includes(money(current[0].unit)));
  const subtotal = current.reduce((sum, line) => sum + line.unit * line.qty, 0);
  assert.equal(
    vm.runInContext('vfTotals', bc)(site.state.bag, site.state.delivery).sub,
    subtotal,
    'totals add up the current prices'
  );
  // The catalog changes while the bag is open: Continue stops beside the new price.
  vm.runInContext("vfProduct('" + current[1].productId + "').price += 50000", c);
  values.toDelivery();
  assert.equal(route, undefined, 'a new price keeps the customer on the bag');
  assert.equal(site.state.bag[1].unit, current[1].unit + 50000);
  values = view();
  assert.ok(values.lines[1].priceNotice.includes(money(current[1].unit + 50000)));
  assert.ok(values.lines[0].priceNotice, 'earlier notices stay until the customer continues');
  values.toDelivery();
  assert.deepEqual(plain(route), {view: 'bag', step: 'delivery'});
  assert.deepEqual(plain(site.state.priceChanges), {}, 'continuing clears the seen notices');
  // A change while the delivery form is open goes back to the bag before payment.
  vm.runInContext("vfProduct('" + current[1].productId + "').price -= 50000", c);
  view().next();
  assert.deepEqual(plain(route), {view: 'bag', step: 'bag'});
  assert.equal(site.state.bag[1].unit, current[1].unit);
  assert.ok(view().lines[1].priceNotice);
  // Checkout checks once more before placing the order.
  let checkoutRoute;
  const {logic: checkout, ctx: cc} = loadPage('checkout', {
    lang,
    go: next => (checkoutRoute = next),
    store: {
      bag: site.state.bag,
      delivery: {...site.state.delivery, date: '', slot: null}
    }
  });
  vm.runInContext("vfProduct('" + current[0].productId + "').price += 1000", cc);
  checkout.setState({last4: '1234'});
  checkout.renderVals().submitOrder();
  assert.equal(checkoutRoute.view, 'bag');
  assert.equal(checkoutRoute.step, 'bag', 'a changed price sends checkout back to the bag');
  setTimeout(
    () =>
      assert.ok(
        site.state.announcement.includes(money(current[1].unit)),
        'the price change is announced'
      ),
    200
  );
}
console.log('Passed bag repricing on opening, before delivery and before payment.');

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
  assert.ok(values.deliveryReview);
  assert.equal(values.slot, null);
  values.next();
  assert.equal(
    bag.state.delivery.date,
    '2000-01-01',
    'continue does not silently accept a replacement'
  );
  values.setSlot(values.slots.find(slot => !slot.off).value);
  assert.equal(bag.renderVals().deliveryReview, '');
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
  stale.renderVals().submitOrder();
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
