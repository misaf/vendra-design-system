// Visit attribution (components/utils/analytics.js `attribution`, shared/services/integrations/
// analytics.js): utm_* values and the referrer's host reach page_view and purchase, are cleaned like
// search terms, and are kept for the tab only while the visitor accepts analytics.
import assert from 'node:assert/strict';
import {analytics} from '../../../packages/design-system/components/utils/analytics.js';

const {attribution, event} = analytics;

// The landing query's utm_* values and the referrer's host; nothing else from either address.
assert.deepEqual(
  attribution({
    search:
      '?utm_source=instagram&utm_medium=social&utm_campaign=yalda&utm_content=bio&utm_term=roses&id=7',
    referrer: 'https://l.instagram.com/?u=https%3A%2F%2Fshop.example.test%2F&e=secret',
    host: 'shop.example.test'
  }),
  {
    source: 'instagram',
    medium: 'social',
    campaign: 'yalda',
    content: 'bio',
    term: 'roses',
    referrer_host: 'l.instagram.com'
  }
);
// The store's own pages (with or without www) aren't a referrer; a direct visit is {}.
assert.deepEqual(
  attribution({referrer: 'https://www.shop.example.test/en/shop/', host: 'shop.example.test'}),
  {}
);
assert.deepEqual(attribution(), {});
assert.deepEqual(attribution({referrer: 'not a url', host: 'shop.example.test'}), {});
assert.deepEqual(attribution({referrer: 'https://www.Google.com/search?q=flowers'}), {
  referrer_host: 'google.com'
});
// A phone number or email in a utm value never leaves as it is; long values are cut.
assert.equal(attribution({search: '?utm_term=0912 345 6789'}).term, '(personal data)');
assert.equal(attribution({search: '?utm_campaign=a%40b.test'}).campaign, '(personal data)');
assert.equal(attribution({search: '?utm_content=' + 'x'.repeat(300)}).content.length, 100);
assert.deepEqual(attribution({search: '?utm_source=%20%20'}), {}, 'blank values are left out');

// page_view and purchase take the attribution keys; other events drop them.
const campaign = {source: 'whatsapp', referrer_host: 'wa.me'};
assert.deepEqual(event('page_view', {page_type: 'home', ...campaign}), {
  event: 'page_view',
  page_type: 'home',
  ...campaign
});
assert.equal(event('purchase', {transaction_id: 'VB-1', ...campaign}).source, 'whatsapp');
const dropped = [];
assert.deepEqual(event('view_cart', {value: 1, ...campaign}, dropped), {
  event: 'view_cart',
  value: 1
});
assert.deepEqual(dropped.sort(), ['referrer_host', 'source']);

// The storefront's tracker, loaded fresh into a fake tab for each visit.
const storage = () => {
  const values = new Map();
  return {
    values,
    getItem: key => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key)
  };
};
let loads = 0;
async function visit({url, referrer = '', consent = '', session = storage()}) {
  const address = new URL(url);
  const local = storage();
  if (consent) local.setItem('vf-consent', consent);
  Object.assign(globalThis, {
    window: {},
    location: {search: address.search, hostname: address.hostname},
    document: {referrer, documentElement: {lang: 'en'}, addEventListener: () => {}},
    localStorage: local,
    sessionStorage: session
  });
  const {vfCreateTracker} = await import(
    '../shared/services/integrations/analytics.js?visit=' + ++loads
  );
  const track = vfCreateTracker();
  const sent = [];
  track.subscribe(built => sent.push(built));
  return {track, sent, session};
}
const shop = 'https://shop.example.test/en/';

{
  // Before consent: held in memory only, nothing stored or sent.
  const {track, sent, session} = await visit({
    url: shop + '?utm_source=instagram&utm_medium=social',
    referrer: 'https://l.instagram.com/'
  });
  assert.deepEqual(track.attribution(), {
    source: 'instagram',
    medium: 'social',
    referrer_host: 'l.instagram.com'
  });
  track.event('page_view', {page_type: 'home', page_path: '/en/'});
  assert.equal(sent.length, 0);
  assert.equal(session.values.has('vf-attribution'), false);
  assert.equal(track.log.at(-1).source, 'instagram', 'the local QA log shows it');
  // Accepting keeps it for the tab; the next page_view carries it.
  track.setConsent('all');
  assert.deepEqual(JSON.parse(session.getItem('vf-attribution')), track.attribution());
  track.event('page_view', {page_type: 'shop', page_path: '/en/shop/'});
  assert.equal(sent.at(-1).medium, 'social');
  track.event('add_to_cart', {value: 1});
  assert.equal(sent.at(-1).source, undefined, 'only page_view and purchase carry it');
  // Essential only: forgotten for the tab.
  track.setConsent('essential');
  assert.equal(session.values.has('vf-attribution'), false);
}

{
  // With consent, the tab's landing stands when the bank sends the visitor back…
  const session = storage();
  await visit({url: shop + '?utm_source=whatsapp', consent: 'all', session});
  const back = await visit({
    url: shop + 'checkout/?payment=return&order=VB-1',
    referrer: 'https://bank.example.test/pay',
    consent: 'all',
    session
  });
  assert.deepEqual(back.track.attribution(), {source: 'whatsapp'});
  back.track.event('purchase', {transaction_id: 'VB-1', value: 10});
  assert.equal(back.sent.at(-1).source, 'whatsapp');
  // …a direct first landing stays direct…
  const direct = storage();
  await visit({url: shop, consent: 'all', session: direct});
  const returned = await visit({
    url: shop + 'checkout/',
    referrer: 'https://bank.example.test/',
    consent: 'all',
    session: direct
  });
  assert.deepEqual(returned.track.attribution(), {});
  // …and a new tagged link replaces it.
  const again = await visit({url: shop + '?utm_source=sms', consent: 'all', session});
  assert.deepEqual(again.track.attribution(), {source: 'sms'});
  // Without consent, nothing stored earlier is read.
  const revoked = await visit({url: shop, consent: 'essential', session});
  assert.deepEqual(revoked.track.attribution(), {});
  assert.equal(session.values.has('vf-attribution'), false);
}

console.log('Passed: visit attribution reaches page_view and purchase, only with consent.');
