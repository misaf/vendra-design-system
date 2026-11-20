// The sample data and the checkout request match the Vendra API spec (tests/fixtures/vendra-openapi.json):
// every field a sample record or request carries is a field of its schema, with the schema's type.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {VF_API_FAQ_CATEGORIES, VF_API_FAQS} from '../app/[locale]/(storefront)/faq/copy.js';
import {VF_API_ORDERS} from '../domain/account-data.js';
import {
  VF_API_PRODUCT_PRICES,
  VF_API_MULTIMEDIA,
  VF_API_PRODUCTS,
  vfApiRecord,
  vfSampleBag
} from '../domain/catalog.js';
import {
  VF_API_DELIVERY_ZONES,
  VF_API_DELIVERY_SCHEDULE,
  VF_DELIVERY,
  vfCheckoutRequest
} from '../domain/delivery.js';
import {VF_API_PRODUCT_CATEGORIES} from '../domain/product-categories.js';
const spec = JSON.parse(
  fs.readFileSync(new URL('./fixtures/vendra-openapi.json', import.meta.url), 'utf8')
);
const schemas = spec.components.schemas;

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

test('Sample catalog, delivery and orders match the API schemas', () => {
  expectSchema(VF_API_PRODUCT_CATEGORIES, 'ProductCategory');
  expectSchema(VF_API_PRODUCT_PRICES, 'ProductPrice');
  expectSchema(VF_API_MULTIMEDIA, 'Multimedia');
  expectSchema(VF_API_PRODUCTS, 'Product');
  expectSchema(VF_API_DELIVERY_ZONES, 'DeliveryZone');
  expectSchema(VF_API_DELIVERY_SCHEDULE, 'DeliverySchedule');
  expectSchema(VF_API_ORDERS, 'Order');
});

test('Sample FAQ records match the API schemas', () => {
  expectSchema(VF_API_FAQ_CATEGORIES, 'FaqCategory');
  expectSchema(VF_API_FAQS, 'Faq');
  for (const faq of VF_API_FAQS)
    assert.ok(
      VF_API_FAQ_CATEGORIES.some(category => category.id === faq.faqCategory.id),
      faq.slug.en
    );
});

test('Sample product references resolve', () => {
  // Every product's price, photos and category resolve to sample records.
  for (const product of VF_API_PRODUCTS) {
    assert.ok(vfApiRecord(VF_API_PRODUCT_PRICES, product.latestProductPrice), product.token);
    for (const iri of product.multimedia)
      assert.ok(vfApiRecord(VF_API_MULTIMEDIA, iri), product.token + ' ' + iri);
    assert.ok(
      VF_API_PRODUCT_CATEGORIES.some(category => category.id === product.productCategory.id),
      product.token
    );
  }
});

test('The checkout request matches the API schema', () => {
  // The checkout request carries exactly the Checkout fields.
  const request = vfCheckoutRequest(
    vfSampleBag(),
    {
      ...VF_DELIVERY,
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
});
