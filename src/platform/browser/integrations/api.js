// Vendra browser API client. An empty base enables demo mode.
import {vfAccountLocale} from '../../../storefront/customer/account-data.js';
import {VF_STORE} from '../../../storefront/store/store-config.js';
import {createRequest} from './request.js';
import {createIdempotentSubmission} from './idempotency.js';
import {createSavedItems} from './saved-items.js';
import {loadCatalogStock} from './catalog-stock.js';
import {createCheckoutMethods} from './checkout.js';
import {submitInquiry} from './inquiries.js';
import {subscribeToNewsletter} from './newsletter.js';

/** @returns {import('../runtime.js').VfApi} */
export function vfCreateApi() {
  const client = {
    base: VF_STORE.apiBase || '',
    setBase(base) {
      client.base = (base || '').replace(/\/$/, '');
    },
    get live() {
      return !!client.base;
    },
    // Order and inquiry submissions may need longer than reads.
    timeouts: {read: 10000, write: 20000}
  };
  const request = createRequest(client);
  const {idempotencyKey, submit} = createIdempotentSubmission(request);

  return Object.assign(client, {
    idempotencyKey,
    ...createSavedItems(client, request),
    loadStock: () => loadCatalogStock(client, request),
    ...createCheckoutMethods(client, request, submit),
    inquiry: body => submitInquiry(client, submit, body),
    newsletter: (email, name) => subscribeToNewsletter(client, request, email, name),
    // Communications use the account locale, falling back to the page language for guests.
    preferredLocale: () =>
      vfAccountLocale() || (document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fa')
  });
}
