// Delivery days, promo codes, shop occasions and colours, recently viewed products and analytics consent.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const {sharedLogic} = require('../_build/generate.cjs');
const store = {};
const ctx = {URL, URLSearchParams, console, setTimeout, clearTimeout,
  location: {pathname: '/templates/storefront-site/StorefrontSite.dc.html', search: '', href: 'http://localhost/'},
  localStorage: {getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); }},
  sessionStorage: {getItem: () => null, setItem: () => {}},
  document: {getElementById: () => null}, DCLogic: class {}};
ctx.window = {React: {}, innerWidth: 1280};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, '_ds_bundle.js'), 'utf8'), ctx);
vm.runInContext(sharedLogic + '\nObject.assign(this, {vfDeliveryDays, vfDeliveryDate, vfDeliveryWhen, vfPromoCheck, vfTotals, vfSummaryRows, vfValidLocation, vfPinLocation, vfLocationText, vfReadRoute, vfRouteParams, vfRecentlyViewed, vfRememberViewed});', ctx);

// Delivery days: seven from today, the sample sold-out day, and today closing at the zone cut-off.
const morning = new Date(2026, 9, 5, 9, 0), evening = new Date(2026, 9, 5, 19, 0);
const days = ctx.vfDeliveryDays('central', morning);
assert.equal(days.length, 7);
assert.equal(days[0].iso, '2026-10-05');
assert.equal(days[2].soldOut, true);
assert.equal(days[0].pastCutoff, false);
assert.equal(ctx.vfDeliveryDays('central', evening)[0].pastCutoff, true);
assert.equal(ctx.vfDeliveryDays('tehran', new Date(2026, 9, 5, 13, 0))[0].pastCutoff, true, 'Tehran closes at 12:00');
assert.equal(ctx.vfDeliveryDate({zone: 'central', date: ''}, evening), '2026-10-06', 'after cut-off the first day is tomorrow');
assert.equal(ctx.vfDeliveryDate({zone: 'central', date: '2026-10-07'}, morning), '2026-10-05', 'a sold-out choice falls back');
assert.equal(ctx.vfDeliveryDate({zone: 'central', date: '2026-10-08'}, morning), '2026-10-08');
assert.equal(ctx.vfDeliveryWhen({date: '2026-10-06', slot: '12'}, false), 'Tue 6 October · 12:00–16:00');
assert.match(ctx.vfDeliveryWhen({date: '2026-10-06', slot: '12'}, true), /^سه‌شنبه، ۱۴ مهر · /);
assert.equal(ctx.vfDeliveryWhen({slot: '08'}, false), '08:00–12:00', 'orders without a date show the slot');

// Promo codes: case, spaces and Persian digits are ignored; minimums are enforced.
assert.equal(ctx.vfPromoCheck(' welcome 10 ', 100).promo.code, 'WELCOME10');
assert.equal(ctx.vfPromoCheck('WELCOME۱۰', 100).promo.code, 'WELCOME10');
assert.deepEqual({...ctx.vfPromoCheck('ROSES15', 3_000_000)}, {error: 'min', min: 4_000_000});
assert.deepEqual({...ctx.vfPromoCheck('NOPE', 3_000_000)}, {error: 'unknown'});
const lines = [{unit: 4_900_000, qty: 1}, {unit: 3_400_000, qty: 1}];
const totals = ctx.vfTotals(lines, {zone: 'central', promo: 'ROSES15'});
assert.equal(totals.discount, 1_245_000);
assert.equal(totals.total, 8_300_000 - 1_245_000, 'free Karaj delivery still counts the pre-discount subtotal');
assert.equal(ctx.vfTotals([{unit: 3_000_000, qty: 1}], {zone: 'central', promo: 'ROSES15'}).discount, 0, 'a code below its minimum gives nothing');
const rows = ctx.vfSummaryRows(totals, 'roses15', {sub: 'Subtotal', discount: 'Discount', fee: 'Delivery', free: 'Free', total: 'Total'}, v => String(v));
assert.deepEqual([...rows.map(r => r.label)], ['Subtotal', 'Discount · ROSES15', 'Delivery', 'Total']);
assert.equal(ctx.vfSummaryRows(ctx.vfTotals(lines, {zone: 'central'}), '', {sub: 'S', fee: 'F', free: '0', total: 'T'}, String).length, 3);

// The delivery pin: rounded to six decimals, validated, and shown with each language's digits.
assert.deepEqual({...ctx.vfPinLocation({lat: 35.83271234567, lng: 50.96540987654})}, {lat: 35.832712, lng: 50.96541});
assert.equal(ctx.vfValidLocation({lat: 35.8, lng: 50.9}), true);
assert.equal(ctx.vfValidLocation({lat: 95, lng: 50.9}), false);
assert.equal(ctx.vfValidLocation(null), false);
assert.equal(ctx.vfLocationText({lat: 35.8327, lng: 50.9654}, false), '\u206835.83270, 50.96540\u2069');
assert.equal(ctx.vfLocationText({lat: 35.8327, lng: 50.9654}, true), '\u2068۳۵٫۸۳۲۷۰، ۵۰٫۹۶۵۴۰\u2069');

// Shop occasions round-trip through the URL; unknown ones fall back to all.
assert.equal(ctx.vfReadRoute('?view=shop&occasion=sympathy').occasion, 'sympathy');
assert.equal(ctx.vfReadRoute('?view=shop&occasion=halloween').occasion, 'all');
assert.match(ctx.vfRouteParams({view: 'shop', lang: 'en', cat: 'all', occasion: 'birthday'}), /occasion=birthday/);
assert.doesNotMatch(ctx.vfRouteParams({view: 'shop', lang: 'en', cat: 'all', occasion: 'all'}), /occasion/);

// Shop colours work the same way, and every sample product has a known colour.
assert.equal(ctx.vfReadRoute('?view=shop&color=red').color, 'red');
assert.equal(ctx.vfReadRoute('?view=shop&color=teal').color, 'all');
assert.match(ctx.vfRouteParams({view: 'shop', lang: 'en', cat: 'all', color: 'pink'}), /color=pink/);
assert.doesNotMatch(ctx.vfRouteParams({view: 'shop', lang: 'en', cat: 'all', color: 'all'}), /color/);
vm.runInContext('VF_PRODUCTS', ctx).forEach(p => assert.ok(p.colors.length && p.colors.every(c => vm.runInContext('VF_SHOP_COLORS', ctx).includes(c)), p.id + ' colours'));

// Analytics: events stay in the local log until the visitor allows visit counts.
const track = ctx.window.AG_TRACK;
ctx.window.dataLayer = [];
assert.equal(track.consent(), '');
track.event('search', {search_term: 'roses'});
track.setConsent('essential');
track.event('search', {search_term: 'roses'});
assert.equal(ctx.window.dataLayer.length, 0, 'nothing is sent before consent or with essential only');
track.setConsent('all');
track.event('generate_lead', {lead_source: 'newsletter'});
assert.equal(ctx.window.dataLayer.length, 1);
assert.equal(ctx.window.dataLayer[0].event, 'generate_lead');
assert.equal(track.log.length, 3, 'the local QA log keeps every event');
store['vf-consent'] = 'maybe';
assert.equal(track.consent(), '', 'an unknown stored choice asks again');

// Recently viewed: newest first, no repeats, at most eight, unknown ids dropped.
['ivory', 'orchid', 'ivory'].forEach(ctx.vfRememberViewed);
assert.deepEqual([...ctx.vfRecentlyViewed()], ['ivory', 'orchid']);
store['vendra-recently-viewed'] = '["gone","blush"]';
assert.deepEqual([...ctx.vfRecentlyViewed()], ['blush']);
store['vendra-recently-viewed'] = 'not json';
assert.deepEqual([...ctx.vfRecentlyViewed()], []);

console.log('Passed delivery days, promo codes, delivery pins, shop occasions and colours, recently viewed products and analytics consent.');
