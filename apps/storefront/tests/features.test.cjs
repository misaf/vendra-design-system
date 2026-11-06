// Product codes, delivery days, promo codes, shop occasions, recently viewed products and analytics consent.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../../..');
const {sharedLogic} = require('./page-script.cjs');
const store = {};
const ctx = {
  URL,
  URLSearchParams,
  console,
  setTimeout,
  clearTimeout,
  location: {
    pathname: '/apps/storefront/app/',
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
vm.runInContext(
  sharedLogic +
    '\nObject.assign(this, {vfLatin, vfPhone, vfNormalizeToken, VF_STORE, vfBalanceDiscountOn, vfBalanceDiscount, vfTopUpAmount, vfTopUpError, vfWalletOf, vfWalletChange, vfAccountLoad, VF_PRODUCTS, vfFindProduct, vfProductIds, vfLineToken, vfNormalizeToken, vfDeliveryDays, vfDeliveryDate, vfDeliveryWhen, vfPromoCheck, vfTotals, vfSummaryRows, vfValidLocation, vfPinLocation, vfLocationText, vfReadRoute, vfRouteUrl, vfRecentlyViewed, vfRememberViewed, vfShowList, vfReportLists, vfSelectItem, analytics});',
  ctx
);

// Persian and Arabic digits normalise in one place; a missing value is empty, not "undefined".
assert.equal(ctx.vfLatin('۰۹۱۲ ٣٤٥'), '0912 345');
assert.equal(ctx.vfLatin(undefined), '');
assert.equal(ctx.vfLatin(null), '');
assert.equal(ctx.vfPhone('(۰۹۱۲) ۳۴۵-۶۷۸۹'), '09123456789');
assert.equal(ctx.vfNormalizeToken('vf-۷k2m ۴q'), 'VF7K2M4Q');

// Delivery days: seven from today, the sample sold-out day, and today closing at the zone cut-off.
const morning = new Date('2026-10-05T09:00:00+03:30'),
  evening = new Date('2026-10-05T19:00:00+03:30');
const days = ctx.vfDeliveryDays('central', morning);
assert.equal(days.length, 7);
assert.equal(days[0].iso, '2026-10-05');
assert.equal(days[2].soldOut, true);
assert.equal(days[0].pastCutoff, false);
assert.equal(ctx.vfDeliveryDays('central', evening)[0].pastCutoff, true);
assert.equal(
  ctx.vfDeliveryDays('tehran', new Date('2026-10-05T13:00:00+03:30'))[0].pastCutoff,
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
assert.match(ctx.vfDeliveryWhen({date: '2026-10-06', slot: '12'}, true), /^سه‌شنبه، ۱۴ مهر، /);
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

// Each page has a path of its own: language, screen and the screen's one id, ending in a slash.
const paths = {
  '/apps/storefront/app/': {view: 'home'},
  '/apps/storefront/app/fa/': {view: 'home', lang: 'fa'},
  '/apps/storefront/app/en/shop/': {view: 'shop', lang: 'en', cat: 'all'},
  '/apps/storefront/app/fa/shop/boxes/': {view: 'shop', lang: 'fa', cat: 'boxes'},
  '/apps/storefront/app/en/product/VF-7K2M4Q/': {view: 'product', lang: 'en', id: 'VF-7K2M4Q'},
  '/apps/storefront/app/en/journal/': {view: 'journal', lang: 'en'},
  '/apps/storefront/app/en/journal/morning-at-the-studio/': {
    view: 'post',
    post: 'morning-at-the-studio'
  },
  '/apps/storefront/app/en/policy/privacy/': {view: 'policy', id: 'privacy'},
  '/apps/storefront/app/en/track/VB-10491/': {view: 'track', id: 'VB-10491'},
  '/apps/storefront/app/en/faq': {view: 'faq', lang: 'en'}
};
for (const [url, expected] of Object.entries(paths)) {
  const route = ctx.vfReadRoute(url);
  for (const [key, value] of Object.entries(expected))
    assert.equal(route[key], value, url + ' ' + key);
}
// Unknown screens, ids that don't exist, extra segments, a post addressed as its own screen and
// paths outside the app are not found; the language stays.
for (const url of [
  '/apps/storefront/app/en/nowhere/',
  '/apps/storefront/app/en/shop/boxes/extra/',
  '/apps/storefront/app/en/shop/not-a-category/',
  '/apps/storefront/app/en/product/',
  '/apps/storefront/app/en/product/VF-NOPE00/',
  '/apps/storefront/app/en/post/morning-at-the-studio/',
  '/apps/storefront/app/en/faq/extra/',
  '/apps/storefront/app/en/policy/nothing/',
  '/apps/storefront/app/en/product/%3Cscript%3E/',
  '/elsewhere/en/shop/'
])
  assert.equal(ctx.vfReadRoute(url).view, 'notfound', url);
assert.equal(ctx.vfReadRoute('/apps/storefront/app/fa/nowhere/').lang, 'fa');
// Writing a route gives the same path back, with only page state in the query.
for (const route of [
  {view: 'home', lang: 'en'},
  {view: 'shop', lang: 'fa', cat: 'all'},
  {view: 'shop', lang: 'en', cat: 'boxes', sort: 'low'},
  {view: 'product', lang: 'en', id: 'VF-7K2M4Q', cat: 'boxes', qty: 2},
  {view: 'post', lang: 'fa', post: 'morning-at-the-studio'},
  {view: 'bag', lang: 'en', step: 'delivery'}
])
  assert.equal(
    ctx.vfRouteUrl(ctx.vfReadRoute(ctx.vfRouteUrl(route))),
    ctx.vfRouteUrl(route),
    route.view
  );
assert.equal(ctx.vfRouteUrl({view: 'home', lang: 'en'}), '/apps/storefront/app/en/');
assert.equal(
  ctx.vfRouteUrl({view: 'shop', lang: 'fa', cat: 'all'}),
  '/apps/storefront/app/fa/shop/'
);
assert.equal(
  ctx.vfRouteUrl({view: 'product', lang: 'en', id: 'VF-7K2M4Q', cat: 'boxes'}),
  '/apps/storefront/app/en/product/VF-7K2M4Q/'
);
assert.equal(
  ctx.vfRouteUrl({view: 'post', lang: 'en', post: 'morning-at-the-studio'}),
  '/apps/storefront/app/en/journal/morning-at-the-studio/'
);
assert.equal(
  ctx.vfRouteUrl({view: 'bag', lang: 'en', step: 'delivery'}),
  '/apps/storefront/app/en/bag/?step=delivery'
);

// Shop occasions round-trip through the URL; unknown ones fall back to all.
assert.equal(ctx.vfReadRoute('/apps/storefront/app/shop/?occasion=sympathy').occasion, 'sympathy');
assert.equal(ctx.vfReadRoute('/apps/storefront/app/shop/?occasion=halloween').occasion, 'all');
assert.match(
  ctx.vfRouteUrl({view: 'shop', lang: 'en', cat: 'all', occasion: 'birthday'}),
  /occasion=birthday/
);
assert.doesNotMatch(
  ctx.vfRouteUrl({view: 'shop', lang: 'en', cat: 'all', occasion: 'all'}),
  /occasion/
);

// "Show more" pages round-trip through the URL; anything but a small positive number is page 1.
assert.equal(ctx.vfReadRoute('/apps/storefront/app/shop/?page=2').page, 2);
for (const bad of ['0', '-1', '2.5', 'two', '1000'])
  assert.equal(ctx.vfReadRoute('/apps/storefront/app/shop/?page=' + bad).page, 1);
assert.match(ctx.vfRouteUrl({view: 'shop', lang: 'en', cat: 'all', page: 3}), /page=3/);
assert.doesNotMatch(ctx.vfRouteUrl({view: 'shop', lang: 'en', cat: 'all', page: 1}), /page/);

// Analytics: events stay in the local log until the visitor allows visit counts.
const track = ctx.window.VF_TRACK;
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
// Only the contract's parameters leave (components/utils/analytics.js): a phone number, a card
// message or a mobile typed into search can't ride along by mistake.
const warn = console.warn;
const warnings = [];
console.warn = (...args) => warnings.push(args.join(' '));
track.event('purchase', {
  transaction_id: 'VN-1',
  value: 2400000,
  payment_type: 'online',
  phone: '09121234567',
  items: [{item_id: 'VF-7K2M4Q', price: 2400000, quantity: 1, card: 'Happy birthday, Shirin'}]
});
assert.deepEqual(JSON.parse(JSON.stringify(track.log.at(-1))), {
  event: 'purchase',
  language: 'en',
  currency: 'IRR',
  transaction_id: 'VN-1',
  value: 24000000,
  payment_type: 'online',
  items: [{item_id: 'VF-7K2M4Q', price: 24000000, quantity: 1}]
});
assert.deepEqual(warnings, ['VF_TRACK: purchase left out phone']);
// Toman isn't an ISO 4217 code (issue #241): reports carry Rial, 10 to the Toman, and only amounts
// change (a filter's value is its own).
track.event('filter', {filter_id: 'price', value: 500000, action: 'add'});
assert.equal(track.log.at(-1).value, 500000, 'a filter value is not an amount');
assert.equal(track.log.at(-1).currency, 'IRR');
track.event('order_placed', {
  transaction_id: 'VN-2',
  value: 1200000,
  payment_type: 'card',
  payment_status: 'pending',
  items: [{item_id: 'VF-7K2M4Q', price: 1200000, quantity: 1}]
});
assert.deepEqual(JSON.parse(JSON.stringify(track.log.at(-1))), {
  event: 'order_placed',
  language: 'en',
  currency: 'IRR',
  transaction_id: 'VN-2',
  value: 12000000,
  payment_type: 'card',
  payment_status: 'pending',
  items: [{item_id: 'VF-7K2M4Q', price: 12000000, quantity: 1}]
});
const {analytics} = ctx;
const usd = {currency: 'USD', currencies: ctx.VF_STORE.currencies};
assert.deepEqual(
  JSON.parse(
    JSON.stringify(
      analytics.inCurrency('purchase', {value: 2400000, items: [{price: 1250000}]}, usd)
    )
  ),
  {currency: 'USD', value: 24, items: [{price: 12.5}]},
  'another currency uses the tenant rate and decimals'
);
assert.equal(
  analytics.inCurrency('top_up', {value: 1000}, {currency: 'GBP', currencies: {}}).currency,
  'IRR',
  'a currency without a rate falls back to Rial'
);
assert.equal(analytics.inCurrency('top_up', {value: 1000}, {currency: 'IRR'}).value, 10000);
track.event('search', {search_term: '۰۹۱۲ ۱۲۳ ۴۵۶۷'});
assert.equal(track.log.at(-1).search_term, '(personal data)');
track.event('signed_up');
assert.equal(warnings.at(-1), 'VF_TRACK: unknown event signed_up');
console.warn = warn;
store['vf-consent'] = 'maybe';
assert.equal(track.consent(), '', 'an unknown stored choice asks again');

// The ecommerce funnel events (issue #115): each keeps only its own parameters, items keep their
// position in a list, and a page view carries the path without its query.
for (const name of ['page_view', 'view_item_list', 'select_item', 'add_shipping_info'])
  assert.ok(track.EVENTS[name], name + ' is in the contract');
const funnelWarnings = [];
console.warn = (...args) => funnelWarnings.push(args.join(' '));
track.event('page_view', {page_type: 'shop', page_path: '/shop/', q: '09121234567'});
assert.deepEqual(JSON.parse(JSON.stringify(track.log.at(-1))), {
  event: 'page_view',
  language: 'en',
  currency: 'IRR',
  page_type: 'shop',
  page_path: '/shop/'
});
track.event('add_shipping_info', {
  items: [{item_id: 'VF-7K2M4Q', price: 2400000, quantity: 1}],
  value: 2400000,
  shipping_tier: 'central',
  address: 'Valiasr St'
});
assert.equal(track.log.at(-1).shipping_tier, 'central');
assert.equal(track.log.at(-1).address, undefined, 'no address leaves with the delivery step');
assert.deepEqual(funnelWarnings, [
  'VF_TRACK: page_view left out q',
  'VF_TRACK: add_shipping_info left out address'
]);
console.warn = warn;

// Product lists: reported after the render that showed them, once per set of products; a list
// that grew ("Show more") reports only what it added; a card reports where it was opened from.
const [first, second, third] = ctx.VF_PRODUCTS;
const listPage = {};
const lists = () => track.log.filter(e => e.event === 'view_item_list');
const listCount = lists().length;
ctx.vfShowList(listPage, 'shop', [first, second]);
ctx.vfReportLists(listPage);
assert.equal(lists().length, listCount + 1);
assert.deepEqual(
  JSON.parse(JSON.stringify(lists().at(-1))),
  {
    event: 'view_item_list',
    language: 'en',
    currency: 'IRR',
    item_list_id: 'shop',
    item_list_name: 'Shop results',
    items: [track.item(first), track.item(second)].map((item, index) => ({
      ...item,
      price: item.price * 10,
      index
    }))
  },
  'items are product codes with their place in the list, priced in Rial'
);
assert.equal(lists().at(-1).items[0].item_id, first.id);
ctx.vfShowList(listPage, 'shop', [first, second]);
ctx.vfReportLists(listPage);
assert.equal(lists().length, listCount + 1, 'a re-render of the same list sends nothing');
ctx.vfShowList(listPage, 'shop', [first, second, third]);
ctx.vfReportLists(listPage);
assert.deepEqual(
  lists()
    .at(-1)
    .items.map(item => [item.item_id, item.index]),
  [[third.id, 2]],
  '"Show more" reports only the added products'
);
ctx.vfShowList(listPage, 'shop', [third, first]);
ctx.vfReportLists(listPage);
assert.equal(lists().at(-1).items.length, 2, 'a new order (sort, filter) reports the whole list');
ctx.vfReportLists(listPage);
ctx.vfShowList(listPage, 'shop', [third, first]);
ctx.vfReportLists(listPage);
assert.equal(lists().length, listCount + 4, 'a list that left the page counts when it comes back');
ctx.vfSelectItem('recent', second, 3)();
assert.deepEqual(JSON.parse(JSON.stringify(track.log.at(-1))), {
  event: 'select_item',
  language: 'en',
  currency: 'IRR',
  item_list_id: 'recent',
  item_list_name: 'Recently viewed',
  items: [{...track.item(second), price: second.price * 10, index: 3}]
});

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
