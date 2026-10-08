// Account balance rules and history. The limits and discount live in VF_STORE.wallet (store-config.js).
// Demo only: the balance is kept in this browser with the signed-in account. A real store must keep it on its
// server and change it only after a confirmed top-up payment or a placed order.

// {balance, history}; history is newest first: {id, kind: 'topup' | 'order', amount (negative for payments), at, order?}.
function vfWalletOf(account) {
  const wallet = account && account.wallet;
  return {
    balance: Math.max(0, Math.round(+(wallet && wallet.balance) || 0)),
    history: Array.isArray(wallet && wallet.history) ? wallet.history : []
  };
}

// The signed-in customer's balance, or null for a guest.
function vfWalletBalance() {
  const phone = vfAccountPhone();
  return phone ? vfWalletOf(vfAccountLoad(phone)).balance : null;
}

// Paying from a balance of at least discountFrom earns the balance discount.
function vfBalanceDiscountOn(balance) {
  return window.AG_COMMERCE.balanceDiscountOn(balance, VF_STORE.wallet);
}

// discountPercent of the products' price (after any promo code) when the balance earns it.
function vfBalanceDiscount(balance, products) {
  return window.AG_COMMERCE.balanceDiscount(balance, products, VF_STORE.wallet);
}

// A top-up amount, typed with any digits and separators; '' when nothing is typed.
function vfTopUpAmount(text) {
  const digits = vfLatin(text || '').replace(/\D/g, '');
  return digits ? +digits : '';
}

// 'empty' | 'min' | 'max' when a top-up can't go ahead, otherwise ''.
function vfTopUpError(amount) {
  const rules = VF_STORE.wallet;
  if (!amount) return 'empty';
  if (amount < rules.minTopUp) return 'min';
  if (amount > rules.maxTopUp) return 'max';
  return '';
}

// Adds a top-up (positive) or an order payment (negative) to the signed-in account and returns the account;
// null when a payment is more than the balance.
function vfWalletChange(phone, amount, entry) {
  const account = vfAccountLoad(phone);
  const wallet = vfWalletOf(account);
  const balance = wallet.balance + amount;
  if (balance < 0) return null;
  const record = {
    id: 'W' + Date.now().toString(36).toUpperCase(),
    amount,
    at: new Date().toISOString(),
    ...entry
  };
  const next = {...account, wallet: {balance, history: [record, ...wallet.history]}};
  vfAccountSave(phone, next);
  return next;
}
