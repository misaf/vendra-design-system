// Analytics: one wrapper for every tracked event, on the package's event contract
// (components/utils/analytics.js, `analytics.EVENTS`). VF_TRACK.event(name, params) keeps only that
// event's parameters, adds language and currency, keeps the last 50 in VF_TRACK.log for QA, and
// hands each event to the VF_TRACK.subscribe(listener) listeners only after the visitor accepts
// analytics in the consent banner (VF_TRACK.consent() === 'all'). Nothing is sent anywhere until a
// store subscribes a sender to its own backend. Components report their events through
// VendraProvider's onEvent, which the shell points here.
import {analytics} from '../../../components/utils/analytics.js';
import {VF_STORE} from '../store-config.js';
import {VF_CATEGORY_ITEM} from '../translations/categories.js';
(() => {
  if (window.VF_TRACK) return;
  const EVENTS = analytics.EVENTS;
  // The visitor's choice from the consent banner: 'all', 'essential', or '' before they choose.
  const KEY = 'vf-consent';
  const consent = () => {
    try {
      const value = localStorage.getItem(KEY);
      return ['all', 'essential'].includes(value) ? value : '';
    } catch {
      return '';
    }
  };
  const setConsent = value => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
  };
  const log = [];
  const listeners = [];
  const subscribe = listener => {
    listeners.push(listener);
    return () => listeners.splice(listeners.indexOf(listener), 1);
  };
  const ctx = () => ({
    language: document.documentElement?.lang || 'en',
    currency: VF_STORE.currency || 'IRT'
  });
  const item = (p, qty = 1, unit) =>
    p
      ? {
          item_id: p.id,
          item_name:
            p.cat && VF_CATEGORY_ITEM.en[p.cat] ? VF_CATEGORY_ITEM.en[p.cat] + ' ' + p.id : p.id,
          item_category: p.cat,
          price: unit ?? p.price,
          quantity: qty
        }
      : null;
  const event = (name, params = {}) => {
    const dropped = [];
    const built = analytics.event(name, {...ctx(), ...params}, dropped);
    if (!built) {
      console.warn('VF_TRACK: unknown event', name);
      return;
    }
    // A parameter outside the contract never leaves; say so while building the page.
    if (dropped.length) console.warn('VF_TRACK: ' + name + ' left out', dropped.join(', '));
    log.push(built);
    if (log.length > 50) log.shift();
    if (consent() !== 'all') return;
    listeners.forEach(listener => listener(built));
  };
  // The store's own collector (VF_STORE.analyticsUrl, templates/API.md B31): events go in batches of
  // up to 20, and whatever is waiting goes when the page is hidden, by sendBeacon so leaving the page
  // doesn't lose it. Only events that passed consent reach the queue.
  if (VF_STORE.analyticsUrl) {
    const queue = [];
    const flush = () => {
      if (!queue.length) return;
      const batch = JSON.stringify({events: queue.splice(0)});
      const body = new Blob([batch], {type: 'application/json'});
      if (!navigator.sendBeacon || !navigator.sendBeacon(VF_STORE.analyticsUrl, body))
        fetch(VF_STORE.analyticsUrl, {method: 'POST', body, keepalive: true}).catch(() => {});
    };
    subscribe(built => {
      queue.push({...built, at: new Date().toISOString()});
      if (queue.length >= 20) flush();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flush();
    });
  }
  window.VF_TRACK = {
    event,
    item,
    EVENTS,
    log,
    consent,
    setConsent,
    subscribe
  };
})();
