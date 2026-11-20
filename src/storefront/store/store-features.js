// The optional parts of a storefront; like its payment methods, a store turns each on by listing it:
// - promoCodes: the bag's promo-code field and its discount.
// - sameDay: delivery today, until each zone's cut-off (off: the first day is tomorrow).
// - weddings: the weddings and events page with its inquiry form.
// - journal: the journal and its posts.
// - reminders: yearly occasion reminders in the account.
// - newsletter: the email sign-up on the home page.
// Add-ons (and the handwritten card's message) follow the store's add-on list instead.
export const STORE_FEATURES = [
  'promoCodes',
  'sameDay',
  'weddings',
  'journal',
  'reminders',
  'newsletter'
];

// The store's feature list as {promoCodes: true, sameDay: false, …}, one key per STORE_FEATURES id;
// unknown ids are dropped.
export const storeFeatures = list =>
  Object.fromEntries(STORE_FEATURES.map(id => [id, (list || []).includes(id)]));
