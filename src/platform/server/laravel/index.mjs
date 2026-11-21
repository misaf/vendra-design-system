// @ts-check

import {productPriceReferenceId} from '../../../storefront/catalog/laravel/price.js';
import {reviewCartSelection} from '../../../storefront/cart/review.js';
import {createLaravelHttp} from '../laravel-http.ts';
import {isRecord, VendraApiError} from './errors.mjs';
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

/** @param {{apiOrigin: string} & Omit<Parameters<typeof createLaravelHttp>[0], 'base'>} options */
export function createVendraApi({apiOrigin, ...context}) {
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

  const {request} = createLaravelHttp({base: base.href, ...context});

  /** @param {unknown} data */
  async function readProduct(data) {
    const priceId = isRecord(data) ? productPriceReferenceId(data.latestProductPrice) : null;
    const price = priceId
      ? await request(`/api/catalog/product-prices/${priceId}`).catch(error => {
          if (error instanceof VendraApiError && error.kind === 'not-found') return null;
          throw error;
        })
      : null;
    return productFromApi(data, price);
  }

  /** @param {number} id */
  async function getCart(id) {
    return cartFromApi(await request(`/api/sales/carts/${resourceId(id)}`));
  }

  /** @param {number} id */
  async function getProductById(id) {
    try {
      const product = await readProduct(await request(`/api/catalog/products/${resourceId(id)}`));
      if (product.id !== id) throw new VendraApiError('invalid-response');
      return product;
    } catch (error) {
      if (error instanceof VendraApiError && error.kind === 'not-found') return null;
      throw error;
    }
  }

  return {
    /** @param {string} code The exact Laravel product token. */
    async getProductByCode(code) {
      const {members, total} = collection(
        await request(`/api/catalog/products?${new URLSearchParams({token: code})}`)
      );
      if (total === 0 && members.length === 0) return null;
      if (total !== 1 || members.length !== 1) throw new VendraApiError('invalid-response');
      const product = await readProduct(members[0]);
      if (product.code !== code) throw new VendraApiError('invalid-response');
      return product;
    },

    getCart,

    /** @param {number} id */
    async reviewCart(id) {
      const cart = await getCart(id);
      const productIds = new Set(
        cart.lines.filter(line => line.sellableType === 'product').map(line => line.sellableId)
      );
      const products = new Map(
        await Promise.all(
          [...productIds].map(async id => /** @type {const} */ ([id, await getProductById(id)]))
        )
      );
      return {
        ...cart,
        lines: cart.lines.map(line =>
          reviewCartSelection(line, products.get(line.sellableId) ?? null)
        )
      };
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
