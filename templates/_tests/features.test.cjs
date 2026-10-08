// Product codes, delivery days, promo codes, shop occasions, recently viewed products and analytics consent.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const {sharedLogic} = require('../_build/generate.cjs');
const store = {};
const ctx = {
  URL,
  URLSearchParams,
  console,
  setTimeout,
  clearTimeout,
  location: {
    pathname: '/templates/storefront-site/StorefrontSite.dc.html',
    search: '',
    href: 'http://localhost/'
  },
  localStorage: {
    getItem: k => store[k] ?? null,
    setItem: (k, v) => {
      store[k] = String(v);
    }
  },
  sessionStorage: {getItem: () => null, setItem: () => {}},
  document: {getElementById: () => null},
  DCLogic: class {}
};
ctx.window = {React: {}, innerWidth: 1280};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'templates/_runtime/components.js'), 'utf8'), ctx);
for (const file of ['seo', 'page-focus'])
  vm.runInContext(fs.readFileSync(path.join(root, 'templates/_shared', file + '.js'), 'utf8'), ctx);
vm.runInContext(
  sharedLogic +
    '\nObject.assign(this, {vfLatin, vfPhone, vfNormalizeToken, VF_STORE, vfBalanceDiscountOn, vfBalanceDiscount, vfTopUpAmount, vfTopUpError, vfWalletOf, vfWalletChange, vfAccountLoad, VF_PRODUCTS, vfFindProduct, vfProductIds, vfLineToken, vfNormalizeToken, vfDeliveryDays, vfDeliveryDate, vfDeliveryWhen, vfPromoCheck, vfTotals, vfSummaryRows, vfValidLocation, vfPinLocation, vfLocationText, vfReadRoute, vfRouteParams, vfRecentlyViewed, vfRememberViewed});',
  ctx
);

// Persian and Arabic digits normalise in one place; a missing value is empty, not "undefined".
assert.equal(ctx.vfLatin('۰۹۱۲ ٣٤٥'), '0912 345');
assert.equal(ctx.vfLatin(undefined), '');
assert.equal(ctx.vfLatin(null), '');
assert.equal(ctx.vfPhone('(۰۹۱۲) ۳۴۵-۶۷۸۹'), '09123456789');
assert.equal(ctx.vfNormalizeToken('vf-۷k2m ۴q'), 'VF7K2M4Q');

// Delivery days: seven from today, the sample sold-out day, and today closing at the zone cut-off.
const morning = new Date(2026, 9, 5, 9, 0),
  evening = new Date(2026, 9, 5, 19, 0);
const days = ctx.vfDeliveryDays('central', morning);
assert.equal(days.length, 7);
assert.equal(days[0].iso, '2026-10-05');
assert.equal(days[2].soldOut, true);
assert.equal(days[0].pastCutoff, false);
assert.equal(ctx.vfDeliveryDays('central', evening)[0].pastCutoff, true);
assert.equal(
  ctx.vfDeliveryDays('tehran', new Date(2026, 9, 5, 13, 0))[0].pastCutoff,
  true,
  'Tehran closes at 12:00'
);
assert.equal(
  ctx.vfDeliveryDate({zone: 'central', date: ''}, evening),
  '2026-10-06',
  'after cut-off the first day is tomorrow'
);
assert.equal(
  ctx.vfDeliveryDate({zone: 'central', date: '2026-10-07'}, morning),
  '2026-10-05',
  'a sold-out choice falls back'
);
assert.equal(ctx.vfDeliveryDate({zone: 'central', date: '2026-10-08'}, morning), '2026-10-08');
assert.equal(
  ctx.vfDeliveryWhen({date: '2026-10-06', slot: '12'}, false),
  'Tue 6 October · 12:00–16:00'
);
assert.match(ctx.vfDeliveryWhen({date: '2026-10-06', slot: '12'}, true), /^سه‌شنبه، ۱۴ مهر · /);
assert.equal(
  ctx.vfDeliveryWhen({slot: '08'}, false),
  '08:00–12:00',
  'orders without a date show the slot'
);

// Promo codes: case, spaces and Persian digits are ignored; minimums are enforced.
assert.equal(ctx.vfPromoCheck(' welcome 10 ', 100).promo.code, 'WELCOME10');
assert.equal(ctx.vfPromoCheck('WELCOME۱۰', 100).promo.code, 'WELCOME10');
assert.deepEqual({...ctx.vfPromoCheck('ROSES15', 3_000_000)}, {error: 'min', min: 4_000_000});
assert.deepEqual({...ctx.vfPromoCheck('NOPE', 3_000_000)}, {error: 'unknown'});
const lines = [
  {unit: 4_900_000, qty: 1},
  {unit: 3_400_000, qty: 1}
];
const totals = ctx.vfTotals(lines, {zone: 'central', promo: 'ROSES15'});
assert.equal(totals.discount, 1_245_000);
assert.equal(
  totals.total,
  8_300_000 - 1_245_000,
  'free Karaj delivery still counts the pre-discount subtotal'
);
assert.equal(
  ctx.vfTotals([{unit: 3_000_000, qty: 1}], {zone: 'central', promo: 'ROSES15'}).discount,
  0,
  'a code below its minimum gives nothing'
);
const rows = ctx.vfSummaryRows(
  totals,
  'roses15',
  {sub: 'Subtotal', discount: 'Discount', fee: 'Delivery', free: 'Free', total: 'Total'},
  v => String(v)
);
assert.deepEqual(
  [...rows.map(r => r.label)],
  ['Subtotal', 'Discount · ROSES15', 'Delivery', 'Total']
);
assert.equal(
  ctx.vfSummaryRows(
    ctx.vfTotals(lines, {zone: 'central'}),
    '',
    {sub: 'S', fee: 'F', free: '0', total: 'T'},
    String
  ).length,
  3
);

// The delivery pin: rounded to six decimals, validated, and shown with each language's digits.
assert.deepEqual(
  {...ctx.vfPinLocation({lat: 35.83271234567, lng: 50.96540987654})},
  {lat: 35.832712, lng: 50.96541}
);
assert.equal(ctx.vfValidLocation({lat: 35.8, lng: 50.9}), true);
assert.equal(ctx.vfValidLocation({lat: 95, lng: 50.9}), false);
assert.equal(ctx.vfValidLocation(null), false);
assert.equal(
  ctx.vfLocationText({lat: 35.8327, lng: 50.9654}, false),
  '\u206835.83270, 50.96540\u2069'
);
assert.equal(
  ctx.vfLocationText({lat: 35.8327, lng: 50.9654}, true),
  '\u2068۳۵٫۸۳۲۷۰، ۵۰٫۹۶۵۴۰\u2069'
);

// Shop occasions round-trip through the URL; unknown ones fall back to all.
assert.equal(ctx.vfReadRoute('?view=shop&occasion=sympathy').occasion, 'sympathy');
assert.equal(ctx.vfReadRoute('?view=shop&occasion=halloween').occasion, 'all');
assert.match(
  ctx.vfRouteParams({view: 'shop', lang: 'en', cat: 'all', occasion: 'birthday'}),
  /occasion=birthday/
);
assert.doesNotMatch(
  ctx.vfRouteParams({view: 'shop', lang: 'en', cat: 'all', occasion: 'all'}),
  /occasion/
);

// "Show more" pages round-trip through the URL; anything but a small positive number is page 1.
assert.equal(ctx.vfReadRoute('?view=shop&page=2').page, 2);
for (const bad of ['0', '-1', '2.5', 'two', '1000'])
  assert.equal(ctx.vfReadRoute('?view=shop&page=' + bad).page, 1);
assert.match(ctx.vfRouteParams({view: 'shop', lang: 'en', cat: 'all', page: 3}), /page=3/);
assert.doesNotMatch(ctx.vfRouteParams({view: 'shop', lang: 'en', cat: 'all', page: 1}), /page/);

// Analytics: events stay in the local log until the visitor allows visit counts.
const track = ctx.window.AG_TRACK;
const sent = [];
const unsubscribe = track.subscribe(event => sent.push(event));
assert.equal(track.consent(), '');
track.event('search', {search_term: 'roses'});
track.setConsent('essential');
track.event('search', {search_term: 'roses'});
assert.equal(sent.length, 0, 'nothing is sent before consent or with essential only');
track.setConsent('all');
track.event('generate_lead', {lead_source: 'newsletter'});
assert.equal(sent.length, 1);
assert.equal(sent[0].event, 'generate_lead');
assert.equal(track.log.length, 3, 'the local QA log keeps every event');
unsubscribe();
track.event('search', {search_term: 'roses'});
assert.equal(sent.length, 1, 'an unsubscribed listener receives nothing');
store['vf-consent'] = 'maybe';
assert.equal(track.consent(), '', 'an unknown stored choice asks again');

// Recently viewed: newest first, no repeats, at most eight, unknown ids dropped.
['VF-7K2M4Q', 'VF-8RD5WN', 'ivory'].forEach(ctx.vfRememberViewed);
assert.deepEqual(
  [...ctx.vfRecentlyViewed()],
  ['VF-7K2M4Q', 'VF-8RD5WN'],
  'an old slug is remembered as its code'
);
store['vendra-recently-viewed'] = '["gone","blush"]';
assert.deepEqual(
  [...ctx.vfRecentlyViewed()],
  ['VF-9FA2KE'],
  'a list kept before codes is read as codes'
);
store['vendra-recently-viewed'] = 'not json';
assert.deepEqual([...ctx.vfRecentlyViewed()], []);

// Product codes: one per product, never shared, matched however the customer types them.
const codes = ctx.VF_PRODUCTS.map(p => p.id);
assert.ok(
  codes.every(code => /^[A-Z0-9-]+$/.test(code || '')),
  'every product has a Latin code'
);
assert.equal(new Set(codes.map(ctx.vfNormalizeToken)).size, codes.length, 'codes are unique');
assert.equal(ctx.vfFindProduct('vf-7k2m4q').id, 'VF-7K2M4Q');
assert.equal(ctx.vfFindProduct(' VF 7K2M4Q ').id, 'VF-7K2M4Q');
assert.equal(ctx.vfFindProduct('VF-8RD۵WN').id, 'VF-8RD5WN', 'Persian digits match');
assert.equal(ctx.vfFindProduct('ivory').id, 'VF-7K2M4Q', 'old slugs still resolve');
assert.equal(ctx.vfFindProduct('VF-0000'), null);
assert.equal(ctx.vfFindProduct(''), null);
assert.deepEqual([...ctx.vfProductIds(['orchid', 'VF-8RD5WN', 'gone'])], ['VF-8RD5WN']);
assert.equal(
  ctx.vfLineToken({id: 'ivory-classic-card', productId: 'ivory'}),
  'VF-7K2M4Q',
  'older lines read the catalog'
);
assert.equal(ctx.vfLineToken({id: 'lavender'}), 'VF-3HX9TP');
assert.equal(
  ctx.vfLineToken({id: 'ivory', token: 'VF-OLD1'}),
  'VF-OLD1',
  'a line keeps the code it was ordered with'
);

// Account balance: the discount needs a balance of at least discountFrom, and comes off the products only.
const rules = ctx.VF_STORE.wallet;
assert.equal(ctx.vfBalanceDiscountOn(rules.discountFrom - 1), false);
assert.equal(ctx.vfBalanceDiscountOn(rules.discountFrom), true);
assert.equal(ctx.vfBalanceDiscountOn(null), false, 'guests have no balance');
assert.equal(
  ctx.vfBalanceDiscount(rules.discountFrom, 10_000_000),
  (10_000_000 * rules.discountPercent) / 100
);
const bag = [{id: 'VF-3HX9TP', productId: 'VF-3HX9TP', unit: 2_800_000, qty: 1}];
const plainTotals = ctx.vfTotals(bag, {zone: 'central'});
const balanceTotals = ctx.vfTotals(bag, {zone: 'central'}, 150_000_000);
assert.equal(balanceTotals.balanceDiscount, 140_000);
assert.equal(balanceTotals.total, plainTotals.total - 140_000, 'delivery is not discounted');
assert.equal(ctx.vfTotals(bag, {zone: 'central'}, 99_000_000).balanceDiscount, undefined);
assert.equal(
  ctx.vfTotals(bag, {zone: 'central', promo: 'WELCOME10'}, 150_000_000).balanceDiscount,
  Math.round(2_520_000 * 0.05),
  'after a promo code'
);
assert.equal(ctx.vfTopUpAmount('۵۰٬۰۰۰٬۰۰۰'), 50_000_000);
assert.equal(ctx.vfTopUpAmount(''), '');
assert.equal(ctx.vfTopUpError(''), 'empty');
assert.equal(ctx.vfTopUpError(rules.minTopUp - 1), 'min');
assert.equal(ctx.vfTopUpError(rules.maxTopUp + 1), 'max');
assert.equal(ctx.vfTopUpError(rules.minTopUp), '');
const before = ctx.vfWalletOf(ctx.vfAccountLoad('09120000001')).balance;
assert.equal(
  ctx.vfWalletOf(ctx.vfWalletChange('09120000001', 2_000_000, {kind: 'topup'})).balance,
  before + 2_000_000
);
assert.equal(
  ctx.vfWalletChange('09120000001', -(before + 2_000_001), {kind: 'order', order: 'VN-1'}),
  null,
  'a payment can’t overdraw the balance'
);
assert.equal(ctx.vfWalletOf(ctx.vfAccountLoad('09120000001')).history[0].amount, 2_000_000);
assert.equal(ctx.vfWalletOf({}).balance, 0, 'accounts from before balances start at zero');

console.log(
  'Passed account balance, product codes, delivery days, promo codes, delivery pins, shop occasions, recently viewed products and analytics consent.'
);
