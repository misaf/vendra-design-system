import assert from 'node:assert/strict';
import vm from 'node:vm';
import {loadPage, openDeliveryWindow} from './page-script.mjs';

// A delivery choice and payment draft remain meaningful throughout the shopping journey.
for (const lang of ['en', 'fa']) {
  const plain = value => JSON.parse(JSON.stringify(value));
  const {logic: site, ctx: c} = loadPage('site', {lang});
  const same = vm.runInContext("vfBagLine(vfProduct('VF-7K2M4Q'), 'petite', [], 1)", c);
  const prepared = vm.runInContext("vfBagLine(vfProduct('VF-8RD5WN'))", c);
  const morning = new Date('2026-10-05T09:00:00+03:30');
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
  assert.equal(days('central', new Date('2026-10-05T19:00:00+03:30'), [same])[0].pastCutoff, true);

  const readRoute = vm.runInContext('vfReadRoute', c);
  const writeRoute = vm.runInContext('vfRouteUrl', c);
  const route = readRoute(`/${lang}/product/VF-7K2M4Q/?date=2026-10-06`);
  assert.equal(route.date, '2026-10-06');
  assert.equal(readRoute(writeRoute(route)).date, route.date);
  assert.equal(readRoute('/en/product/VF-7K2M4Q/?date=2026-02-31').date, '');
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
    site.setState({delivery: {...delivery, ...openDeliveryWindow(c, delivery, site.state.bag)}});
  };
  for (const lang of ['en', 'fa']) {
    const setup = (live = false) => {
      const {logic: site, ctx: c} = loadPage('site', {lang});
      const writes = [];
      let hydrate, rejectHydration;
      const write = id => new Promise((resolve, reject) => writes.push({id, resolve, reject}));
      c.vfRuntime.api = {
        live,
        saveItem: write,
        unsaveItem: write,
        loadSaved: () =>
          new Promise((resolve, reject) => {
            hydrate = resolve;
            rejectHydration = reject;
          })
      };
      c.window.addEventListener = c.document.addEventListener = () => {};
      site.lifecycle.didMount();
      const change = id => {
        const promise = site.renderVals().store.toggleSave(id);
        return {...writes.at(-1), promise};
      };
      return {site, change, hydrate, rejectHydration};
    };
    const a = 'VF-7K2M4Q',
      b = 'VF-3HX9TP';
    const {site, change} = setup();
    const fail = async id => {
      const action = change(id);
      action.reject(new Error('Offline'));
      await action.promise;
    };
    const succeed = async (id, result) => {
      const action = change(id);
      action.resolve(result);
      await action.promise;
    };
    await fail(a);
    await fail(b);
    assert.equal(site.renderVals().integrationError, true);
    await succeed(a, null);
    assert.equal(site.renderVals().integrationError, true, 'a local no-op is not server recovery');
    await succeed(a, {id: 803});
    assert.equal(
      site.renderVals().integrationError,
      true,
      'one product success keeps another product failure'
    );
    const last = change(b);
    assert.equal(site.renderVals().integrationError, true, 'pending retry keeps feedback');
    last.resolve(true);
    await last.promise;
    assert.equal(
      site.renderVals().integrationError,
      false,
      'last confirmed recovery clears feedback'
    );
    assert.equal(site.state.announcement, '', 'owned stale live announcement clears with recovery');
    // Even out-of-order adapter completions cannot replace feedback for newer intent.
    const oldFailure = change(a),
      newerSuccess = change(a);
    newerSuccess.resolve(true);
    await newerSuccess.promise;
    oldFailure.reject(new Error('Older failure'));
    await oldFailure.promise;
    assert.equal(site.renderVals().integrationError, false, 'stale failure cannot revive feedback');
    const oldSuccess = change(a),
      newerFailure = change(a);
    newerFailure.reject(new Error('Latest failure'));
    await newerFailure.promise;
    oldSuccess.resolve({id: 804});
    await oldSuccess.promise;
    assert.equal(
      site.renderVals().integrationError,
      true,
      'stale success cannot hide latest failure'
    );
    site.setState({announcement: 'Unrelated new announcement'});
    await succeed(a, true);
    assert.equal(site.renderVals().integrationError, false);
    assert.equal(site.state.announcement, 'Unrelated new announcement');
    const pendingFailure = change(a),
      localOnly = change(a);
    localOnly.resolve(null);
    await localOnly.promise;
    pendingFailure.reject(new Error('Earlier request failed'));
    await pendingFailure.promise;
    assert.equal(
      site.renderVals().integrationError,
      true,
      'newer no-op cannot suppress an older unresolved failure'
    );
    await succeed(a, true);
    const loading = setup(true);
    loading.rejectHydration(new Error('Initial load failed'));
    await flush();
    const recovery = loading.change(a);
    recovery.resolve({id: 805});
    await recovery.promise;
    assert.equal(
      loading.site.renderVals().integrationError,
      true,
      'write success cannot clear initial-load failure'
    );
    const pendingLoad = setup(true);
    const failedWrite = pendingLoad.change(a);
    failedWrite.reject(new Error('Write failed'));
    await failedWrite.promise;
    pendingLoad.hydrate([]);
    await flush();
    assert.equal(
      pendingLoad.site.renderVals().integrationError,
      true,
      'load success cannot clear a write failure'
    );
  }
  console.log(
    'Passed scoped saved-sync recovery, pending/no-op controls and stale response ownership.'
  );
  for (const lang of ['en', 'fa']) {
    const {logic: site, ctx: c} = loadPage('site', {lang});
    c.setTimeout = () => 0;
    readyDelivery(site, c);
    const {logic: checkout, ctx: cc} = loadPage('checkout', {lang, store: site.renderVals().store});
    cc.setTimeout = () => 0;
    let finish,
      calls = 0;
    cc.vfRuntime.api = {
      live: true,
      checkout: () => {
        calls++;
        return new Promise(resolve => (finish = resolve));
      }
    };
    checkout.renderVals().setMethod('cod');
    checkout.renderVals().submitOrder();
    assert.equal(site.state.checkoutPending, true);
    const pending = loadPage('checkout', {lang, store: site.renderVals().store}).logic;
    assert.equal(
      pending.renderVals().placeDisabled,
      true,
      'pending submission survives a page remount'
    );
    pending.renderVals().submitOrder();
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

    const {logic: retrySite, ctx: retryContext} = loadPage('site', {lang});
    readyDelivery(retrySite, retryContext);
    const retryCheckout = loadPage('checkout', {lang, store: retrySite.renderVals().store});
    retryCheckout.ctx.setTimeout = () => 0;
    const requests = [];
    retryCheckout.ctx.vfRuntime.api = {
      live: true,
      async checkout(request) {
        requests.push(plain(request));
        if (requests.length === 1) throw {kind: 'timeout'};
        return {number: 'VN-RETRIED'};
      }
    };
    const retryPage = retryCheckout.logic;
    retryPage.renderVals().setMethod('card');
    retryPage.renderVals().setLast4('1234');
    retryPage.renderVals().setRef('ORIGINAL-RECEIPT');
    const submit = retryPage.renderVals().submitOrder;
    const firstSubmission = submit();
    await submit();
    await firstSubmission;
    assert.equal(requests.length, 1, 'a second call before render does not submit again');
    assert.equal(retrySite.state.checkoutPending, false);
    assert.equal(retryPage.renderVals().unconfirmed, true);

    retryPage.renderVals().retry();
    assert.equal(retryPage.renderVals().unconfirmed, false);
    assert.equal(retryPage.renderVals().receiptLocked, true);
    assert.ok(retryPage.renderVals().methodOptions.every(option => option.disabled));
    retryPage.renderVals().setMethod('cod');
    retryPage.renderVals().setLast4('9999');
    retryPage.renderVals().setRef('CHANGED-RECEIPT');
    assert.equal(retryPage.state.method, 'card');
    assert.equal(retryPage.state.last4, '1234');
    assert.equal(retryPage.state.ref, 'ORIGINAL-RECEIPT');

    // The session may have newer bag and delivery data by the time the retry runs.
    retrySite.renderVals().store.setQty(retrySite.state.bag[0].id, 2);
    retrySite.renderVals().store.setDelivery({name: 'Another Recipient', date: '2000-01-01'});
    retryPage.props.store = retrySite.renderVals().store;
    await retryPage.renderVals().submitOrder();
    assert.equal(requests.length, 2);
    assert.equal(requests[0].paymentReference, '1234 ORIGINAL-RECEIPT');
    assert.deepEqual(requests[1], requests[0], 'the retry sends the original request');
    assert.equal(retryPage.renderVals().receiptLocked, false);
    assert.equal(retrySite.state.orders.length, 1);
    assert.equal(retrySite.state.orders[0].delivery.name, 'Recipient');
    assert.equal(retrySite.state.orders[0].lines[0].qty, 1);
    assert.equal(retrySite.state.bag[0].qty, 2, 'the original order leaves the newer bag intact');

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
    changed.logic.renderVals().submitOrder();
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
    confirmed.renderVals().submitOrder();
    assert.equal(receiptSite.state.order.ref, 'UPDATED-RECEIPT');
    assert.equal(receiptSite.state.bag.length, 0);

    const {logic: saved, ctx: sc} = loadPage('site', {lang});
    sc.window.addEventListener = () => {};
    sc.document.addEventListener = () => {};
    let hydrate;
    sc.vfRuntime.api = {
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
    const route = vm.runInContext('vfReadRoute', pc)(`/${lang}/account/?tab=balance&next=checkout`);
    assert.equal(route.next, 'checkout');
    assert.ok(vm.runInContext('vfRouteUrl', pc)(route).includes('next=checkout'));
    assert.equal(
      vm.runInContext('vfReadRoute', pc)('/en/account/?tab=balance&next=https://example.com').next,
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
  const {logic: site, ctx: sc} = loadPage('site', {lang});
  site.renderVals().store.setDelivery(openDeliveryWindow(sc, site.state.delivery, site.state.bag));
  const {logic: checkout, ctx: c} = loadPage('checkout', {lang, store: site.renderVals().store});
  c.setTimeout = () => 0;
  let submitted = 0;
  c.vfRuntime.api = {
    live: true,
    checkout: () => {
      submitted++;
      return Promise.resolve();
    }
  };
  // A live store offers online payment only through a connected gateway.
  vm.runInContext('VF_STORE', c).gateway = {en: 'Test Bank', fa: 'بانک آزمایشی'};
  c.sessionStorage.setItem = () => {
    throw new Error('Storage full');
  };
  checkout.renderVals().setMethod('online');
  checkout.renderVals().submitOrder();
  assert.equal(submitted, 0, 'a missing recovery record blocks the API submission too');
  assert.equal(checkout.state.payment, null);
  assert.ok(checkout.renderVals().paymentSaveError);
  c.vfRuntime.api.live = false;
  let saved;
  c.sessionStorage.setItem = (_, value) => (saved = JSON.parse(value));
  checkout.renderVals().submitOrder();
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
  const area = map => ({
    getItem: key => map.get(key) || null,
    setItem: (key, value) => map.set(key, value),
    removeItem: key => map.delete(key),
    key: index => [...map.keys()][index] ?? null,
    get length() {
      return map.size;
    }
  });
  c.localStorage = area(storage);
  c.sessionStorage = area(session);
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
  // Switching accounts without signing out keeps each customer's session apart.
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
  // Signing out leaves none of the signed-in customers' session data behind.
  vm.runInContext('vfAccountSignOut()', c);
  site.renderVals().store.syncCustomer();
  assert.equal(site.state.customerId, 'guest');
  assert.equal(site.state.orders.length, 0);
  assert.equal(site.state.delivery.address, '');
  assert.equal(site.state.paymentDraft.ref, '');
  assert.deepEqual(Object.keys(site.state.customers), ['guest']);
  site.renderVals().store.complete({...first, id: 'VN-31003', customerId: '09120000000'});
  assert.deepEqual(
    Object.keys(site.state.customers),
    ['guest'],
    'a late completion after sign-out keeps nothing of that customer'
  );
  site.lifecycle.didUpdate();
  assert.doesNotMatch([...session.values()].join('\n'), /Private address A|PRIVATE-A|VN-3100/);
  assert.deepEqual(Object.keys(new c.Logic({lang}).state.customers), ['guest']);
  login('09121111111');
  site.renderVals().store.complete({...first, id: 'VN-31004', customerId: '09120000000'});
  assert.equal(
    site.state.customers['09120000000'],
    undefined,
    'a signed-out customer stays out after another customer signs in'
  );
  login('09120000000');
  assert.equal(site.state.orders.length, 0, 'signing in again restores no session history');
  assert.equal(site.state.delivery.address, '');

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
  const d = {
    ...site.state.delivery,
    ...openDeliveryWindow(sc, site.state.delivery, site.state.bag)
  };
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
