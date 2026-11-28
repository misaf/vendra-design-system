import assert from 'node:assert/strict';
import vm from 'node:vm';
import {context, loadPage, sharedLogic} from './page-script.mjs';

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
  assert.ok(saved.renderVals().href.shop.endsWith('/shop/'));
  assert.equal(saved.renderVals().restore, undefined);
  const {logic: search} = loadPage('search', {lang});
  search.renderVals().setQ('no-such-flower');
  assert.equal(search.renderVals().noResults, true);
  search.renderVals().clearSearch();
  assert.equal(search.renderVals().empty, true);
  const {logic: contact} = loadPage('contact', {lang});
  contact.renderVals().setMsg('Demo message');
  await contact.renderVals().send();
  assert.equal(contact.renderVals().sent, false, 'a reply needs a mobile or an email');
  assert.ok(contact.renderVals().phoneErr);
  contact.renderVals().setEmail('bad');
  await contact.renderVals().send();
  assert.ok(contact.renderVals().emailErr);
  assert.equal(contact.renderVals().phoneErr, undefined);
  contact.renderVals().setEmail('');
  contact.renderVals().setPhone('0912 123 4567');
  await contact.renderVals().send();
  assert.equal(contact.renderVals().sent, true);
  contact.renderVals().editMessage();
  assert.equal(contact.renderVals().sent, false);
  assert.equal(contact.renderVals().msg, 'Demo message');
  const {logic: wedding} = loadPage('weddings', {lang});
  wedding.renderVals().setName('Demo');
  wedding.renderVals().setPhone('1234567890');
  await wedding.renderVals().send();
  assert.ok(wedding.renderVals().phoneErr);
  assert.equal(wedding.renderVals().sent, false);
  wedding.renderVals().setPhone('۰۹۱۲۰۰۰۰۰۰۰');
  await wedding.renderVals().send();
  assert.equal(wedding.renderVals().sent, true);
}
console.log(
  'Passed missing-order recovery, saved/search recovery, editable success states and mobile validation in both languages.'
);
