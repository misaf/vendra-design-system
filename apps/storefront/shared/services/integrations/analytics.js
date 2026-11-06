// Analytics: one wrapper for every tracked event, on the package's event contract
// (components/utils/analytics.js, `analytics.EVENTS`). VF_TRACK.event(name, params) keeps only that
// event's parameters, adds language and currency, keeps the last 50 in VF_TRACK.log for QA, and
// hands each event to the VF_TRACK.subscribe(listener) listeners only after the visitor accepts
// analytics in the consent banner (VF_TRACK.consent() === 'all'). Nothing is sent anywhere until a
// store subscribes a sender to its own backend. page_view and purchase also say where the visit came
// from (utm_* values and the referrer's host, analytics.attribution). Components report their events through
// VendraProvider's onEvent, which the shell points here.
import {analytics} from '../../../../../packages/design-system/components/utils/analytics.js';
import {VF_STORE} from '../../domain/store-config.js';
import {VF_CATEGORY_ITEM} from '../../translations/categories.js';
(() => {
  // Browser only: the build's prerender (app/entry-server.jsx) records and sends nothing.
  if (typeof window === 'undefined' || window.VF_TRACK) return;
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
  // Where this visit came from, read once from the landing address. A landing with utm_* values
  // replaces what the tab holds; otherwise the tab's first landing stands, so coming back from the
  // bank or a payment page doesn't count as a new source. The tab keeps it in sessionStorage only
  // while the visitor accepts analytics; until then it stays in memory, and no event leaves anyway.
  const CAMPAIGN_KEY = 'vf-attribution';
  const keepCampaign = value => {
    try {
      if (value) sessionStorage.setItem(CAMPAIGN_KEY, JSON.stringify(value));
      else sessionStorage.removeItem(CAMPAIGN_KEY);
    } catch {}
  };
  const storedCampaign = () => {
    try {
      const value = JSON.parse(sessionStorage.getItem(CAMPAIGN_KEY) || 'null');
      if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
      return Object.fromEntries(
        Object.entries(value).filter(
          ([key, text]) => analytics.ATTRIBUTION_KEYS.includes(key) && typeof text === 'string'
        )
      );
    } catch {
      return null;
    }
  };
  let landing = {};
  try {
    landing = analytics.attribution({
      search: location.search,
      referrer: document.referrer,
      host: location.hostname
    });
  } catch {}
  const tagged = Object.keys(landing).some(key => key !== 'referrer_host');
  let campaign = (!tagged && consent() === 'all' && storedCampaign()) || landing;
  keepCampaign(consent() === 'all' ? campaign : null);
  const attribution = () => ({...campaign});
  const setConsent = value => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    keepCampaign(value === 'all' ? campaign : null);
  };
  const log = [];
  const listeners = [];
  const subscribe = listener => {
    listeners.push(listener);
    return () => listeners.splice(listeners.indexOf(listener), 1);
  };
  const context = () => ({
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
    // The visit's source goes only with the events that take it (page_view, purchase).
    const source = Object.fromEntries(
      Object.entries(campaign).filter(([key]) => EVENTS[name]?.params.includes(key))
    );
    const built = analytics.event(name, {...context(), ...source, ...params}, dropped);
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
  // The store's own collector (VF_STORE.analyticsUrl, apps/storefront/API.md B31): events go in batches of
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
    attribution,
    subscribe
  };
})();
