// The ways a store can take payment; each is a feature the store turns on by listing it. `id` is
// also the Checkout `gateway`:
// - online: the bank's payment page and back (PaymentStatus).
// - card: card-to-card transfer to the store's card {cardNumber, holder, bank, sheba?}; the customer
//   enters the last four digits of theirs.
// - cod: pay on delivery, in the delivery zones listed in `zones` (all zones when left out).
// - wallet: from the customer's account balance (signed in, balance covers the total).
// - whatsapp: the order is sent, and the studio confirms payment on WhatsApp.
export const PAYMENT_METHODS = ['online', 'card', 'cod', 'wallet', 'whatsapp'];

// The store's payment methods ({id, ...settings}, in the order it lists them; unknown ids are
// dropped) for this order, each with `available` and, when it can't be used, `reason`: 'zone' (pay
// on delivery doesn't reach the delivery zone), 'signIn' (no balance without an account) or
// 'balance' (the balance doesn't cover `total`).
export const paymentOptions = (methods, {zone = undefined, balance = null, total = 0} = {}) =>
  (methods || [])
    .filter(method => method && PAYMENT_METHODS.includes(method.id))
    .map(method => {
      const reason =
        method.id === 'cod' && method.zones && !method.zones.includes(zone)
          ? 'zone'
          : method.id === 'wallet' && balance == null
            ? 'signIn'
            : method.id === 'wallet' && balance < total
              ? 'balance'
              : null;
      return reason ? {...method, available: false, reason} : {...method, available: true};
    });

// The method to start with: `chosen` while it can be used; otherwise the balance when it covers the
// order (the customer's money is already there); otherwise the store's first usable method. null
// when none can be used for this order.
export const defaultPaymentMethod = (options, chosen) => {
  const usable = options.filter(option => option.available);
  const pick = id => usable.find(option => option.id === id);
  return (pick(chosen) || pick('wallet') || usable[0] || {id: null}).id;
};
