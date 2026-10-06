// Analytics — one wrapper for every tracked event. Names and params follow GA4 ecommerce, so GA4 / GTM / Matomo map them without changes.
// AG_TRACK.event(name, params). Keeps the last 50 in AG_TRACK.log for QA, and sends to window.dataLayer (GTM) or gtag
// only after the visitor accepts analytics in the consent banner (AG_TRACK.consent() === 'all').
// No personal data: never send names, phones, addresses or card messages. Every event carries language + currency.
(() => {
  if (window.VF_TRACK) return;
  const EVENTS = {
    view_item: 'Product page opened',
    add_to_cart: 'Added to bag',
    remove_from_cart: 'Removed from bag',
    view_cart: 'Bag opened',
    begin_checkout: 'Bag → payment step',
    add_payment_info: 'Pay / Place order pressed',
    purchase: 'Order placed',
    top_up: 'Account balance topped up',
    add_to_wishlist: 'Product saved',
    search: 'Search submitted',
    reminder_created: 'Occasion reminder saved',
    sign_up: 'First sign-in',
    login: 'Sign-in',
    language_switch: 'Header language changed',
    order_again: '“Order again” pressed',
    contact_whatsapp: 'WhatsApp link opened',
    generate_lead: 'Newsletter sign-up'
  };
  // The visitor's choice from the consent banner: 'all', 'essential', or '' before they choose.
  const KEY = 'vf-consent';
  const consent = () => {
    try {
      const value = localStorage.getItem(KEY);
      return ['all', 'essential'].includes(value) ? value : '';
    } catch (_) {
      return '';
    }
  };
  const setConsent = value => {
    try {
      localStorage.setItem(KEY, value);
    } catch (_) {}
    if (typeof window.gtag === 'function') window.gtag('consent', 'update', {analytics_storage: value === 'all' ? 'granted' : 'denied'});
  };
  const log = [];
  const ctx = () => ({
    language: document.documentElement?.lang || 'en',
    currency: VF_STORE.currency || 'IRT'
  });
  const item = (p, qty = 1, unit) => p ? {
    item_id: p.id,
    item_name: p.cat && VF_CATEGORY_ITEM.en[p.cat] ? VF_CATEGORY_ITEM.en[p.cat] + ' ' + p.id : p.id,
    item_category: p.cat,
    price: unit ?? p.price,
    quantity: qty
  } : null;
  const event = (name, params = {}) => {
    if (!EVENTS[name]) console.warn('AG_TRACK: unknown event', name);
    const e = {
      event: name,
      ...ctx(),
      ...params
    };
    log.push(e);
    if (log.length > 50) log.shift();
    if (consent() !== 'all') return;
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(e);else if (typeof window.gtag === 'function') window.gtag('event', name, params);
  };
  window.AG_TRACK = window.VF_TRACK = {
    event,
    item,
    EVENTS,
    log,
    consent,
    setConsent
  };
})();
