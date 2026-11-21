import assert from 'node:assert/strict';
import {test} from 'node:test';
import {
  vfImportSetup,
  vfParseCollections,
  vfParseSettings,
  vfSerializeSetup,
  vfSetupLink,
  vfSharedSetup
} from './presentation-settings.js';

const products = [
  {id: 'first', cat: 'boxes'},
  {id: 'second', cat: 'bouquets'}
];

test('older device settings keep valid preferences and fill missing defaults', () => {
  const saved = vfParseSettings(
    '{"pin":"1234","showPrices":false,"captionMode":"old","displayIds":["second","missing","first","second"]}',
    products
  );
  assert.equal(saved.pin, '1234');
  assert.equal(saved.showPrices, false);
  assert.equal(saved.captionMode, 'code');
  assert.equal(saved.displayMode, 'tablet');
  assert.deepEqual(saved.displayIds, ['second', 'first']);
  assert.deepEqual(vfParseSettings('broken JSON', products), vfParseSettings('null', products));
});

test('version 1 setup text and links round-trip without private data', () => {
  const settings = {displayMode: 'tv', displayCategory: 'boxes', pin: '1234', order: ['private']};
  const address = 'https://example.com/store/?old=1#old';
  const text = vfSerializeSetup(settings, products);
  const link = vfSetupLink(address, 'fa', settings, products);
  assert.equal(vfSharedSetup(link), text);
  assert.equal(new URL(link).searchParams.get('lang'), 'fa');
  assert.equal(new URL(link).hash, '');
  assert.equal(JSON.parse(text).settings.pin, undefined);
  assert.equal(JSON.parse(text).settings.order, undefined);
  assert.deepEqual(vfImportSetup(link, '5678', products), vfImportSetup(text, '5678', products));
  assert.equal(vfImportSetup(text, '5678', products).pin, '5678');
  assert.equal(
    vfImportSetup('{"version":1,"settings":{"displayIds":["missing"]}}', '', products),
    null
  );
  assert.equal(vfImportSetup('{"version":2,"settings":{}}', '', products), null);
});

test('saved named collections keep their valid preferences and omit device PINs', () => {
  const [collection] = vfParseCollections(
    '[null,{"name":" "},{"name":" Window ","settings":{"pin":"1234","slideSeconds":15}}]',
    products
  );
  assert.equal(collection.name, 'Window');
  assert.equal(collection.settings.slideSeconds, 15);
  assert.equal(collection.settings.pin, undefined);
});
