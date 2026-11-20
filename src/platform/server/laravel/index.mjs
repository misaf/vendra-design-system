// @ts-check

import {responseError, VendraApiError} from './errors.mjs';
import {
  cartFromApi,
  collection,
  orderFromApi,
  productFromApi,
  quoteFromApi,
  scheduleFromApi
} from './resources.mjs';

export {VendraApiError};

/** @typedef {import('./openapi.generated').CheckoutInput} CheckoutInput */
/** @typedef {import('./openapi.generated').QuoteInput} QuoteInput */

/** @param {number} value */
function resourceId(value) {
  if (!Number.isSafeInteger(value) || value < 1)
    throw new TypeError('Expected a Laravel resource ID');
  return value;
}

/**
 * @param {{apiOrigin: string, fetch?: typeof fetch}} options
 */
export function createVendraApi({apiOrigin, fetch: fetchApi = fetch}) {
  const base = new URL(apiOrigin);
  if (
    !['https:', 'http:'].includes(base.protocol) ||
    base.username ||
    base.password ||
    base.pathname !== '/' ||
    base.search ||
    base.hash
  ) {
    throw new TypeError('Expected the Laravel API origin');
  }

  /**
   * @param {string} path
   * @param {RequestInit} [init]
   */
  async function request(path, init = {}) {
    const headers = new Headers(init.headers);
    headers.set('Accept', 'application/ld+json');
    if (init.body !== undefined) headers.set('Content-Type', 'application/json');

    const signal = AbortSignal.timeout(init.method === 'POST' ? 20_000 : 10_000);
    let response;
    let body;
    try {
      response = await fetchApi(new URL(path, base), {
        ...init,
        headers,
        signal,
        cache: 'no-store',
        redirect: 'error'
      });
      body = await response.text();
    } catch {
      throw new VendraApiError(signal.aborted ? 'timeout' : 'network');
    }

    /** @type {unknown} */
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      if (response.ok) throw new VendraApiError('invalid-response', response.status);
    }
    if (!response.ok) throw responseError(response.status, data);
    return data;
  }

  return {
    /** @param {string} code The exact Laravel product token. */
    async getProductByCode(code) {
      const {members, total} = collection(
        await request(`/api/catalog/products?${new URLSearchParams({token: code})}`)
      );
      if (total === 0 && members.length === 0) return null;
      if (total !== 1 || members.length !== 1) throw new VendraApiError('invalid-response');
      const product = productFromApi(members[0]);
      if (product.code !== code) throw new VendraApiError('invalid-response');
      return product;
    },

    /** @param {number} id */
    async getCart(id) {
      return cartFromApi(await request(`/api/sales/carts/${resourceId(id)}`));
    },

    /** @param {QuoteInput} input */
    async quoteDelivery(input) {
      return quoteFromApi(
        await request('/api/delivery/quotes', {
          method: 'POST',
          body: JSON.stringify(input)
        })
      );
    },

    async getDeliverySchedule() {
      return scheduleFromApi(await request('/api/delivery/schedule'));
    },

    /**
     * Call only after the caller has reviewed Laravel's checkout guarantees.
     * This forwards a caller-owned key and leaves recovery to the caller.
     * @param {CheckoutInput} input
     * @param {string} idempotencyKey
     */
    async submitCheckout(input, idempotencyKey) {
      if (!idempotencyKey.trim()) throw new TypeError('Checkout requires a submission key');
      return orderFromApi(
        await request('/api/sales/checkout', {
          method: 'POST',
          headers: {'Idempotency-Key': idempotencyKey},
          body: JSON.stringify(input)
        })
      );
    },

    /** @param {number} id Laravel's internal order resource ID. */
    async getOrder(id) {
      return orderFromApi(await request(`/api/sales/orders/${resourceId(id)}`));
    }
  };
}
