// @ts-check

import {isRecord, VendraApiError} from './errors.mjs';

/** @param {unknown} value */
function record(value) {
  if (!isRecord(value)) throw new VendraApiError('invalid-response');
  return value;
}

/** @param {unknown} value */
function list(value) {
  if (!Array.isArray(value)) throw new VendraApiError('invalid-response');
  return /** @type {unknown[]} */ (value);
}

/** @param {unknown} value */
function string(value) {
  if (typeof value !== 'string') throw new VendraApiError('invalid-response');
  return value;
}

/** @param {unknown} value */
function integer(value) {
  if (typeof value !== 'number' || !Number.isSafeInteger(value)) {
    throw new VendraApiError('invalid-response');
  }
  return value;
}

/** @param {unknown} value */
function boolean(value) {
  if (typeof value !== 'boolean') throw new VendraApiError('invalid-response');
  return value;
}

/** @param {unknown} value */
function translations(value) {
  const entries = Array.isArray(value) && value.length === 0 ? [] : Object.entries(record(value));
  return Object.fromEntries(entries.map(([language, text]) => [language, string(text)]));
}

/** @param {unknown} value */
export function collection(value) {
  const data = record(value);
  const members = list(data.member ?? data['hydra:member']);
  const total = integer(data.totalItems ?? data['hydra:totalItems']);
  return {members, total};
}

/** @param {unknown} value */
export function productFromApi(value) {
  const data = record(value);
  /** @satisfies {import('./openapi.generated').ProductResource} */
  const product = {
    id: integer(data.id),
    token: string(data.token),
    name: translations(data.name),
    slug: translations(data.slug),
    inStock: boolean(data.inStock)
  };
  if (!product.token) throw new VendraApiError('invalid-response');
  return {
    id: product.id,
    code: product.token,
    name: product.name,
    slug: product.slug,
    inStock: product.inStock
  };
}

/** @param {unknown} value */
function lineFromApi(value) {
  const data = record(value);
  const metadata = isRecord(data.metadata) ? data.metadata : {};
  /** @satisfies {import('./openapi.generated').CartLineResource} */
  const line = {
    id: integer(data.id),
    sellableType: string(data.sellableType),
    sellableId: integer(data.sellableId),
    quantity: integer(data.quantity)
  };
  return {
    ...line,
    productCode: typeof metadata.token === 'string' ? metadata.token : null,
    selectedAddOns:
      typeof metadata.addons === 'string'
        ? metadata.addons
            .split(',')
            .map(code => code.trim())
            .filter(Boolean)
        : []
  };
}

/** @param {unknown} value */
export function cartFromApi(value) {
  const data = record(value);
  /** @satisfies {Omit<import('./openapi.generated').CartResource, 'lines'>} */
  const cart = {
    id: integer(data.id),
    token: string(data.token),
    expiresAt: data.expiresAt == null ? null : string(data.expiresAt)
  };
  return {...cart, lines: list(data.lines).map(lineFromApi)};
}

/** @param {unknown} value */
export function quoteFromApi(value) {
  // The export describes the input here. The QuotedDelivery response has no reusable quote ID.
  const data = record(value);
  if (typeof data.distanceKm !== 'number' || !Number.isFinite(data.distanceKm)) {
    throw new VendraApiError('invalid-response');
  }
  return {
    zoneId: data.zoneId == null ? null : integer(data.zoneId),
    distanceKm: data.distanceKm,
    feeAmount: integer(data.feeAmount),
    currencyCode: string(data.currencyCode),
    requiresManualQuote: boolean(data.requiresQuote)
  };
}

/** @param {unknown} value @returns {import('./openapi.generated').ScheduleResource} */
export function scheduleFromApi(value) {
  const data = record(value);
  return {
    dates: list(data.dates).map(string),
    slots: list(data.slots).map(value => {
      const slot = record(value);
      return {
        id: integer(slot.id),
        name: translations(slot.name),
        startsAt: string(slot.startsAt),
        endsAt: string(slot.endsAt)
      };
    })
  };
}

/** @param {unknown} value */
export function orderFromApi(value) {
  const data = record(value);
  /** @satisfies {Omit<import('./openapi.generated').OrderResource, 'lines'>} */
  const order = {
    id: integer(data.id),
    number: string(data.number),
    status: string(data.status),
    currencyCode: string(data.currencyCode),
    itemsAmount: integer(data.itemsAmount),
    deliveryAmount: integer(data.deliveryAmount),
    totalAmount: integer(data.totalAmount),
    placedAt: data.placedAt == null ? null : string(data.placedAt)
  };
  if (!order.number) throw new VendraApiError('invalid-response');
  return {
    ...order,
    lines: list(data.lines).map(value => {
      const data = record(value);
      /** @satisfies {Pick<import('./openapi.generated').OrderLineResource, 'name' | 'unitAmount' | 'lineAmount'>} */
      const amounts = {
        name: string(data.name),
        unitAmount: integer(data.unitAmount),
        lineAmount: integer(data.lineAmount)
      };
      return {...lineFromApi(data), ...amounts};
    })
  };
}
