import {VF_DELIVERY} from '../delivery/delivery-draft.js';

export const vfEmptyCustomer = () => ({
  delivery: {...VF_DELIVERY},
  paymentDraft: {method: null, last4: '', ref: '', receiptAmount: null},
  order: null,
  lastOrder: null,
  orders: [],
  tracked: {}
});
// Signed out, the session keeps only the guest's own drafts and history: every signed-in
// customer's delivery details, payment drafts, orders and lookups leave with the account.
export const vfGuestCustomers = customers => (customers?.guest ? {guest: customers.guest} : {});
export const vfCustomerState = state => ({
  delivery: state.delivery,
  paymentDraft: state.paymentDraft,
  order: state.order,
  lastOrder: state.lastOrder,
  orders: state.orders,
  tracked: state.tracked,
  saved: state.saved
});

// Orders this customer opened with the tracking lookup, keyed by order number: 'buyer' when the
// mobile matched the sender's, 'recipient' when it matched only the recipient's.
function vfTrackedOrders(value) {
  return Object.fromEntries(
    Object.entries(value && typeof value === 'object' ? value : {}).filter(
      ([, viewer]) => viewer === 'buyer' || viewer === 'recipient'
    )
  );
}

export function vfRestoreCustomer(customer) {
  const {order, lastOrder, orders, delivery, paymentDraft, saved, tracked} = customer || {};
  return {
    delivery: {...VF_DELIVERY, ...delivery},
    paymentDraft: {
      method: paymentDraft?.method || null,
      last4: String(paymentDraft?.last4 || '')
        .replace(/\D/g, '')
        .slice(0, 4),
      receiptAmount: Number.isFinite(paymentDraft?.receiptAmount)
        ? paymentDraft.receiptAmount
        : null,
      ref: String(paymentDraft?.ref || '')
    },
    order: order || null,
    lastOrder: lastOrder || order || null,
    orders: [...(Array.isArray(orders) ? orders : []), lastOrder, order].filter(
      (entry, index, history) => entry && history.findIndex(item => item?.id === entry.id) === index
    ),
    saved,
    tracked: vfTrackedOrders(tracked)
  };
}
