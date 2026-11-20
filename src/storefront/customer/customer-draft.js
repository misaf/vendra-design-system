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
  tracked: state.tracked
});
