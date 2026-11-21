import {vfStoredValue} from '../../platform/browser/environment.js';
import {vfCustomerState, vfRestoreCustomer} from '../customer/customer-draft.js';

// Persist after mount as well as updates: consumed handover links have already left the URL.
export function vfPersistSession(key, state) {
  try {
    const customer = vfCustomerState(state);
    sessionStorage.setItem(
      key,
      JSON.stringify({
        explicitDeliverySlots: true,
        customerId: state.customerId,
        customers: {
          ...state.customers,
          [state.customerId]: customer
        },
        bag: state.bag,
        priceChanges: state.priceChanges,
        ...customer
      })
    );
  } catch {}
}
export function vfReadSession(key) {
  let draft = {};
  try {
    draft = JSON.parse(vfStoredValue(key, true) || '{}') || {};
    // Older drafts could save an automatic slot even when the customer had chosen a day.
    if (!draft.explicitDeliverySlots) {
      for (const customer of [draft, ...Object.values(draft.customers || {})]) {
        if (customer?.delivery) customer.delivery.slot = null;
      }
    }
  } catch {}
  // Top-level lists from older sessions belong to the last customer in that tab.
  const owner = draft.customerId || 'guest';
  const customer = draft.customers?.[owner];
  if (Array.isArray(draft.saved) && !Array.isArray(customer?.saved)) {
    draft.customers = {
      ...draft.customers,
      [owner]: {
        ...(customer || vfRestoreCustomer(draft)),
        saved: draft.saved
      }
    };
  }
  return draft;
}

export function vfSessionCustomer(draft, customerId) {
  // Unowned legacy private data may be restored only to the guest it originally belonged to.
  return (
    draft.customers?.[customerId] || ((draft.customerId || 'guest') === customerId ? draft : {})
  );
}
