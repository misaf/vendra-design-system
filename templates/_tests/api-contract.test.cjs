// The sample data and the checkout request match the Vendra API spec (uploads/openapi-*.json):
// every field a sample record or request carries is a field of its schema, with the schema's type.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const {sharedLogic} = require('../_build/generate.cjs');

const specFile = fs.readdirSync(path.join(root, 'uploads')).find(f => /^openapi-.*\.json$/.test(f));
const spec = JSON.parse(fs.readFileSync(path.join(root, 'uploads', specFile), 'utf8'));
const schemas = spec.components.schemas;

const ctx = {
  URL,
  URLSearchParams,
  console,
  setTimeout,
  clearTimeout,
  location: {pathname: '/templates/storefront-site/StorefrontSite.dc.html', search: '', href: ''},
  localStorage: {getItem: () => null, setItem: () => {}},
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
    '\nObject.assign(this, {VF_API_PRODUCT_CATEGORIES, VF_API_PRODUCT_PRICES, VF_API_MULTIMEDIA, VF_API_PRODUCTS, VF_API_DELIVERY_ZONES, VF_API_DELIVERY_SCHEDULE, VF_API_ORDERS, VF_DELIVERY, vfSampleBag, vfCheckoutRequest, vfApiRecord});',
  ctx
);

const typeOf = value =>
  value === null
    ? 'null'
    : Array.isArray(value)
      ? 'array'
      : Number.isInteger(value)
        ? 'integer'
        : typeof value;

// Checks a value against a schema node; returns the problems found, each with its path.
function check(value, schema, where) {
  if (schema.$ref) return check(value, schemas[schema.$ref.split('/').pop()], where);
  const options = schema.anyOf || schema.oneOf;
  if (options) {
    const results = options.map(option => check(value, option, where));
    return results.some(problems => !problems.length) ? [] : results[0];
  }
  if (schema.type) {
    const allowed = [].concat(schema.type);
    const actual = typeOf(value);
    const ok = allowed.includes(actual) || (actual === 'integer' && allowed.includes('number'));
    if (!ok) return [`${where}: ${actual}, expected ${allowed.join(' | ')}`];
  }
  if (Array.isArray(value) && schema.items)
    return value.flatMap((item, index) => check(item, schema.items, `${where}[${index}]`));
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    if (schema.properties)
      return Object.entries(value).flatMap(([key, item]) =>
        key in schema.properties
          ? check(item, schema.properties[key], `${where}.${key}`)
          : [`${where}.${key}: not in the schema`]
      );
    if (schema.additionalProperties && typeof schema.additionalProperties === 'object')
      return Object.entries(value).flatMap(([key, item]) =>
        check(item, schema.additionalProperties, `${where}.${key}`)
      );
  }
  return [];
}

const expectSchema = (records, name) => {
  const problems = []
    .concat(records)
    .flatMap((record, index) => check(record, schemas[name], `${name}[${index}]`));
  assert.deepEqual(problems, [], `Sample ${name} records must match the API spec`);
};

expectSchema(ctx.VF_API_PRODUCT_CATEGORIES, 'ProductCategory');
expectSchema(ctx.VF_API_PRODUCT_PRICES, 'ProductPrice');
expectSchema(ctx.VF_API_MULTIMEDIA, 'Multimedia');
expectSchema(ctx.VF_API_PRODUCTS, 'Product');
expectSchema(ctx.VF_API_DELIVERY_ZONES, 'DeliveryZone');
expectSchema(ctx.VF_API_DELIVERY_SCHEDULE, 'DeliverySchedule');
expectSchema(ctx.VF_API_ORDERS, 'Order');

// Every product's price, photos and category resolve to sample records.
for (const product of ctx.VF_API_PRODUCTS) {
  assert.ok(ctx.vfApiRecord(ctx.VF_API_PRODUCT_PRICES, product.latestProductPrice), product.token);
  for (const iri of product.multimedia)
    assert.ok(ctx.vfApiRecord(ctx.VF_API_MULTIMEDIA, iri), product.token + ' ' + iri);
  assert.ok(
    ctx.VF_API_PRODUCT_CATEGORIES.some(category => category.id === product.productCategory.id),
    product.token
  );
}

// The checkout request carries exactly the Checkout fields.
const request = ctx.vfCheckoutRequest(
  ctx.vfSampleBag(),
  {
    ...ctx.VF_DELIVERY,
    name: 'Mina',
    location: {lat: 35.8352, lng: 50.975},
    date: '2026-10-10',
    slot: '16'
  },
  {method: 'card', last4: '1234', ref: '98765'}
);
expectSchema(request, 'Checkout');
assert.deepEqual(Object.keys(request).sort(), Object.keys(schemas.Checkout.properties).sort());
assert.equal(request.paymentReference, '1234 98765');
assert.equal(request.deliverySlotId, 3);
assert.equal(request.deliveryDate, '2026-10-10');
assert.equal(request.cardMessage, 'Happy birthday, Shirin.');
assert.equal(request.latitude, 35.8352);

console.log(
  'Passed: sample catalog, delivery, orders and the checkout request match the Vendra API spec.'
);
