import {vfErrors, vfDeliveryChanged} from '../delivery/delivery-validation.js';
import {vfLineQuantityValid} from '../cart/cart-lines.js';

// Checkout needs a bag and complete delivery details; otherwise send the customer back to the step they need.
export function vfCheckoutBlocked(state) {
  return (
    !state.order &&
    (!state.bag.length ||
      Object.values(vfErrors(state.delivery, state.bag)).some(Boolean) ||
      vfDeliveryChanged(state.delivery, new Date(), state.bag) ||
      Object.keys(state.priceChanges || {}).length > 0 ||
      state.bag.some(line => !vfLineQuantityValid(line, state.bag)))
  );
}
export function vfCheckoutFallback(state, lang) {
  return {
    lang,
    view: 'bag',
    step:
      state.bag.length &&
      !Object.keys(state.priceChanges || {}).length &&
      state.bag.every(line => vfLineQuantityValid(line, state.bag))
        ? 'delivery'
        : 'bag'
  };
}
