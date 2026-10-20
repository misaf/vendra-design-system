// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfAccountLocale, vfAccountPhone, vfCustomerId} from '../_shared/account-data.js';
import {
  vfLineItems,
  vfLineToken,
  vfLineQuantityMax,
  vfLineQuantityValid,
  vfAddCard,
  vfUndoCardAddition,
  vfLinesFromParam,
  vfProduct,
  vfProductIds,
  vfReorderBag,
  vfSampleBag
} from '../_shared/catalog.js';
import {VF_DELIVERY, vfErrors, vfDeliveryChanged, vfMobile} from '../_shared/delivery.js';
import {VF_STORE, vfLanguage} from '../_shared/store-config.js';
import {vfPageTenant} from '../_shared/page-lifecycle.js';
import {VF_ROUTES, VF_ROUTE_EXTRA, vfReadRoute, vfRouteParams} from '../_shared/routing.js';
import {loadPage, pageReady} from '../app/pages.js';
import {useLifecycle, usePageLogic} from '../_shared/page-state.js';
const VF_BAG0 = vfSampleBag();
const VF_SESSION = 'vendra-template:' + location.pathname;
// Checkout needs a bag and complete delivery details; otherwise send the customer back to the step they need.
function vfCheckoutBlocked(state) {
  return (
    !state.order &&
    (!state.bag.length ||
      Object.values(vfErrors(state.delivery, state.bag)).some(Boolean) ||
      vfDeliveryChanged(state.delivery, new Date(), state.bag) ||
      state.bag.some(line => !vfLineQuantityValid(line, state.bag)))
  );
}
function vfCheckoutFallback(state, lang) {
  return {
    lang,
    view: 'bag',
    step:
      state.bag.length && state.bag.every(line => vfLineQuantityValid(line, state.bag))
        ? 'delivery'
        : 'bag'
  };
}
// The account needs a signed-in phone; signed-out customers see sign-in instead.
function vfGuardRoute(state, r) {
  // Back from the bank, checkout always opens: it says what happened to the payment, even in a tab
  // that no longer holds the bag.
  if (r.view === 'checkout' && !r.paymentOrder && vfCheckoutBlocked(state))
    return vfCheckoutFallback(state, r.lang);
  if (r.view === 'account' && !vfAccountPhone()) return {lang: r.lang, view: 'signin'};
  return null;
}
// Shows a route at once when its page has loaded (page code may focus what it just rendered);
// otherwise once its code arrives, so the current page stays as it is (URL, scroll and all) in the
// meantime. Only the latest navigation is shown; a failed load shows the page's error.
function vfShowRoute(page, view, show) {
  const navigation = (page._navigation = (page._navigation || 0) + 1);
  if (pageReady(view)) return show();
  const latest = () => navigation === page._navigation && show();
  (loadPage(view) || Promise.resolve()).then(latest, latest);
}
// A bag with handed-over lines added; a line with the same product, size and extras is replaced.
function vfJoinLines(bag, lines) {
  if (!lines.length) return bag;
  const ids = new Set(lines.map(line => line.id));
  return [...bag.filter(line => !ids.has(line.id)), ...lines];
}
// The return page belongs to this search history entry, so Back/Forward and reloads keep its
// original context. Only an internal, validated route can be used as the close destination.
function vfSearchReturnRoute() {
  const value = history.state?.vfSearchReturn;
  if (typeof value !== 'string' || !value.startsWith('?')) return null;
  const route = vfReadRoute(value);
  return route.view === 'search' ? null : route;
}
const vfEmptyCustomer = () => ({
  delivery: {...VF_DELIVERY},
  paymentDraft: {method: null, last4: '', ref: '', receiptAmount: null},
  order: null,
  lastOrder: null,
  orders: []
});
const vfCustomerState = state => ({
  delivery: state.delivery,
  paymentDraft: state.paymentDraft,
  order: state.order,
  lastOrder: state.lastOrder,
  orders: state.orders
});
function vfSiteInitial(props) {
  let saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(VF_SESSION) || '{}') || {};
  } catch {}
  const customerId = vfCustomerId();
  // Unowned legacy private data may be restored only to the guest it originally belonged to.
  const privateState =
    saved.customers?.[customerId] ||
    (saved.customerId === customerId || (!saved.customerId && customerId === 'guest') ? saved : {});
  let route = vfReadRoute();
  if (route.view === 'home' && !new URLSearchParams(location.search).has('view') && props.start)
    route = {...route, view: props.start};
  // An old product link (?id=ivory) is rewritten with the product's category and code.
  if (route.view === 'product' && vfRouteParams(route) !== location.search)
    history.replaceState({}, '', vfRouteParams(route));
  // A bag or shortlist handed over from the shop counter joins this visitor's own, once: same lines
  // are replaced, and the link is dropped from the address so a reload doesn't add them again.
  const handedLines = route.lines ? vfLinesFromParam(route.lines) : [];
  const handedIds = route.ids ? vfProductIds(route.ids.split(',')) : [];
  if (route.lines || route.ids) {
    route = {...route, lines: undefined, ids: undefined};
    history.replaceState({}, '', vfRouteParams(route));
  }
  // Open sign-in straight away rather than flashing the account first.
  if (route.view === 'account' && !vfAccountPhone()) {
    route = vfReadRoute(vfRouteParams({lang: route.lang, view: 'signin'}));
    if (new URLSearchParams(location.search).has('view'))
      history.replaceState({}, '', vfRouteParams(route));
  }
  return {
    customerId,
    customers: saved.customers || {},
    route: route.view,
    routeInfo: route,
    searchReturn: route.view === 'search' ? vfSearchReturnRoute() : null,
    lang: new URLSearchParams(location.search).has('lang')
      ? route.lang
      : vfLanguage(vfAccountLocale() || props.lang || VF_STORE.languages[0]),
    // The demo's sample bag and saved items stand in only when nothing was handed over.
    bag: vfJoinLines(
      Array.isArray(saved.bag) ? saved.bag : handedLines.length ? [] : VF_BAG0,
      handedLines
    ),
    saved: [
      ...new Set([
        ...(Array.isArray(saved.saved)
          ? vfProductIds(saved.saved)
          : handedIds.length
            ? []
            : ['VF-8RD5WN', 'VF-4CJ6ZB', 'VF-9FA2KE']),
        ...handedIds
      ])
    ],
    delivery: {
      ...VF_DELIVERY,
      ...privateState.delivery
    },
    paymentDraft: {
      method: privateState.paymentDraft?.method || null,
      last4: String(privateState.paymentDraft?.last4 || '')
        .replace(/\D/g, '')
        .slice(0, 4),
      receiptAmount: Number.isFinite(privateState.paymentDraft?.receiptAmount)
        ? privateState.paymentDraft.receiptAmount
        : null,
      ref: String(privateState.paymentDraft?.ref || '')
    },
    cardAddition: null,
    checkoutPending: false,
    checkoutNotice: null,
    order: privateState.order || null,
    lastOrder: privateState.lastOrder || privateState.order || null,
    orders: [
      ...(Array.isArray(privateState.orders) ? privateState.orders : []),
      privateState.lastOrder,
      privateState.order
    ].filter(
      (order, index, orders) => order && orders.findIndex(item => item?.id === order.id) === index
    ),
    announcement: ''
  };
}
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = vfSiteInitial(page.props);
    page._savedEdits = new Map();
    page._savedLoading = false;
    page.syncCustomer = ({continueCheckout = false} = {}) => {
      const customerId = vfCustomerId(),
        current = page.state;
      if (customerId === current.customerId) return;
      const previous = vfCustomerState(current);
      const customers = {...current.customers, [current.customerId]: previous};
      let next = customers[customerId] || vfEmptyCustomer();
      if (current.customerId === 'guest' && customerId !== 'guest') {
        const claimed = previous.orders.filter(
          order => vfMobile(order.delivery?.senderPhone) === customerId
        );
        const claimedIds = new Set(claimed.map(order => order.id));
        next = {
          ...next,
          orders: [...claimed, ...next.orders].filter(
            (order, index, all) => all.findIndex(item => item.id === order.id) === index
          ),
          lastOrder: claimed[0] || next.lastOrder
        };
        customers.guest = {
          ...previous,
          orders: previous.orders.filter(order => !claimedIds.has(order.id)),
          order: claimedIds.has(previous.order?.id) ? null : previous.order,
          lastOrder: claimedIds.has(previous.lastOrder?.id) ? null : previous.lastOrder
        };
        if (continueCheckout) {
          next = {
            ...next,
            delivery: previous.delivery,
            paymentDraft: previous.paymentDraft,
            order: null
          };
          customers.guest = {
            ...customers.guest,
            delivery: {...VF_DELIVERY},
            paymentDraft: vfEmptyCustomer().paymentDraft
          };
        }
      }
      page.setState({
        ...next,
        customerId,
        customers,
        cardAddition: null,
        checkoutNotice: null,
        announcement: ''
      });
      const guarded = vfGuardRoute(page.state, {...page.state.routeInfo, view: page.state.route});
      if (guarded) page.navigate(guarded, true);
    };
    page.navigate = (input, replace = false) => {
      page.syncCustomer();
      const candidate =
        typeof input === 'string'
          ? {
              lang: page.state.lang,
              view: input,
              ...VF_ROUTE_EXTRA[input]
            }
          : {
              lang: page.state.lang,
              ...input
            };
      let r = vfReadRoute(vfRouteParams(candidate));
      const guarded = vfGuardRoute(page.state, r);
      if (guarded) r = vfReadRoute(vfRouteParams(guarded));
      const url = vfRouteParams(r);
      vfShowRoute(page, r.view, () => {
        const refiningSearch = replace && r.view === 'search' && page.state.route === 'search';
        const searchReturn =
          r.view !== 'search'
            ? null
            : page.state.route === 'search'
              ? page.state.searchReturn
              : {...page.state.routeInfo, view: page.state.route, lang: page.state.lang};
        if (url !== location.search)
          history[replace ? 'replaceState' : 'pushState'](
            searchReturn ? {vfSearchReturn: vfRouteParams(searchReturn)} : {},
            '',
            url
          );
        page.setState({
          route: r.view,
          routeInfo: r,
          searchReturn,
          lang: r.lang || page.state.lang
        });
        if (!refiningSearch) window.scrollTo(0, 0);
      });
    };
  });
  useLifecycle(page, {
    didMount() {
      window.__vfSite = page;
      if (window.VF_API.live) {
        page._savedLoading = true;
        window.VF_API.loadSaved()
          .then(saved => {
            if (saved) {
              const merged = new Set(saved);
              page._savedEdits.forEach((keep, id) => (keep ? merged.add(id) : merged.delete(id)));
              page.setState({saved: [...merged]});
            }
          })
          .catch(() =>
            page.setState({
              integrationError: true
            })
          )
          .finally(() => {
            page._savedLoading = false;
            page._savedEdits.clear();
          });
      }
      page._pop = () => {
        const r = vfReadRoute();
        const guarded = vfGuardRoute(page.state, r);
        if (guarded) {
          page.navigate(guarded, true);
          return;
        }
        vfShowRoute(page, r.view, () =>
          page.setState({
            route: r.view,
            routeInfo: r,
            searchReturn: r.view === 'search' ? vfSearchReturnRoute() : null,
            lang: r.lang || page.props.lang || 'en'
          })
        );
      };
      page._customerChanged = event => {
        if (event.key === 'vf-account-phone' || event.key == null) page.syncCustomer();
      };
      window.addEventListener('storage', page._customerChanged);
      window.addEventListener('popstate', page._pop);
      // Plain links to another view of the site (footer, policy and terms links) switch the view in
      // place, as React Aria links do; a new tab, a download or another page loads normally.
      page._click = event => {
        // Any way of opening the store's WhatsApp chat counts, wherever the link is.
        const chat = event.target.closest?.('a[href]');
        if (chat && VF_STORE.whatsapp && chat.href.startsWith(VF_STORE.whatsapp))
          window.VF_TRACK.event('contact_whatsapp');
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target.closest?.('a[href]');
        if (!link || link.hasAttribute('download')) return;
        if (link.target && link.target !== '_self') return;
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.hash)
          return;
        event.preventDefault();
        page.navigate(vfReadRoute(url.search));
      };
      document.addEventListener('click', page._click);
      const guarded = vfGuardRoute(page.state, {
        ...page.state.routeInfo,
        view: page.state.route,
        lang: page.state.lang
      });
      if (guarded) page.navigate(guarded, true);
    },
    didUpdate() {
      if (page.state.customerId !== vfCustomerId()) {
        page.syncCustomer();
        return;
      }
      try {
        const {bag, saved, delivery, order, lastOrder, orders, paymentDraft} = page.state;
        sessionStorage.setItem(
          VF_SESSION,
          JSON.stringify({
            customerId: page.state.customerId,
            customers: {
              ...page.state.customers,
              [page.state.customerId]: vfCustomerState(page.state)
            },
            bag,
            saved,
            delivery,
            order,
            lastOrder,
            orders,
            paymentDraft
          })
        );
      } catch {}
    },
    willUnmount() {
      window.removeEventListener('storage', page._customerChanged);
      window.removeEventListener('popstate', page._pop);
      document.removeEventListener('click', page._click);
      if (window.__vfSite === page) delete window.__vfSite;
    }
  });
  return vals(page);
}

function vals(page) {
  const s = page.state,
    is = {};
  VF_ROUTES.forEach(r => {
    is[r] = r === s.route;
  });
  return {
    is,
    integrationError: !!s.integrationError,
    integrationErrorText:
      s.lang === 'fa'
        ? 'همگام‌سازی انجام نشد؛ اطلاعات محلی حفظ شده است.'
        : 'Server sync failed; your local data is kept.',
    routeInfo: s.routeInfo,
    lang: s.lang,
    tenant: vfPageTenant(page.props),
    setLang: l =>
      page.navigate(
        {
          ...s.routeInfo,
          view: s.route,
          lang: l
        },
        true
      ),
    announcement: s.announcement,
    checkoutNotice: s.checkoutNotice
      ? {
          title:
            s.lang === 'fa'
              ? 'سفارش قبلی ثبت شد. تغییرات تازه سبد شما حفظ شده‌اند.'
              : 'Your earlier order was placed. Your newer bag changes are kept.',
          label: s.lang === 'fa' ? 'مشاهده سفارش' : 'View order',
          href: vfRouteParams({lang: s.lang, view: 'track', id: s.checkoutNotice.id})
        }
      : null,
    dismissCheckoutNotice: () => page.setState({checkoutNotice: null}),
    store: {
      customerId: s.customerId,
      syncCustomer: page.syncCustomer,
      bag: s.bag,
      saved: s.saved,
      delivery: s.delivery,
      checkoutPending: s.checkoutPending,
      beginCheckout: () => {
        if (page.state.checkoutPending) return false;
        page.setState({checkoutPending: true});
        return true;
      },
      endCheckout: () => page.setState({checkoutPending: false}),
      checkoutSnapshot: JSON.stringify({bag: s.bag, delivery: s.delivery}),
      orders: s.orders,
      paymentDraft: s.paymentDraft,
      setPaymentDraft: patch =>
        page.setState(current => ({paymentDraft: {...current.paymentDraft, ...patch}})),
      order: s.order,
      lastOrder: s.lastOrder,
      searchReturn: s.searchReturn,
      count: s.bag.reduce((a, l) => a + l.qty, 0),
      announce: title => {
        if (page.state.announcement !== title)
          page.setState({
            announcement: title
          });
      },
      setDelivery: patch =>
        page.setState(p => ({
          delivery: {
            ...p.delivery,
            ...patch
          },
          order: null
        })),
      reorder: (order, mode = 'replace') =>
        page.setState(current => {
          const bag = vfReorderBag(order.lines, current.bag, mode);
          return {
            order: null,
            paymentDraft: {method: null, last4: '', ref: '', receiptAmount: null},
            cardAddition: null,
            bag,
            delivery:
              mode === 'add' && current.bag.length
                ? current.delivery
                : {
                    ...order.delivery
                  }
          };
        }),
      complete: order =>
        page.setState(current => {
          if (order.customerId && order.customerId !== current.customerId) {
            const owner = current.customers[order.customerId] || vfEmptyCustomer();
            if (owner.orders.some(previous => previous.id === order.id)) return null;
            return {
              customers: {
                ...current.customers,
                [order.customerId]: {
                  ...owner,
                  order: null,
                  lastOrder: order,
                  orders: [order, ...owner.orders]
                }
              }
            };
          }
          // A late response belongs to the submitted checkout, not a bag edited since then.
          if (current.orders.some(previous => previous.id === order.id)) return null;
          const unchanged =
            !order.checkoutSnapshot ||
            order.checkoutSnapshot ===
              JSON.stringify({bag: current.bag, delivery: current.delivery});
          return {
            lastOrder: order,
            orders: [order, ...current.orders],
            ...(unchanged
              ? {
                  order,
                  checkoutNotice: null,
                  bag: [],
                  paymentDraft: {method: null, last4: '', ref: '', receiptAmount: null},
                  cardAddition: null,
                  delivery: {...VF_DELIVERY}
                }
              : {
                  order: null,
                  checkoutNotice: order
                })
          };
        }),
      add: (line, date) =>
        page.setState(p => {
          window.VF_TRACK.event('add_to_cart', {
            items: [
              {
                // Analytics and the studio's reports know a product by its code.
                item_id: vfLineToken(line) || line.id,
                price: line.unit,
                quantity: line.qty
              }
            ]
          });
          const ex = p.bag.find(x => x.id === line.id);
          return {
            order: null,
            ...(date ? {delivery: {...p.delivery, date}} : {}),
            bag: ex
              ? p.bag.map(x =>
                  x.id === line.id
                    ? {
                        ...x,
                        qty: Math.min(x.qty + line.qty, vfLineQuantityMax(line, p.bag))
                      }
                    : x
                )
              : vfLineQuantityMax(line, p.bag) > 0
                ? [...p.bag, {...line, qty: Math.min(line.qty, vfLineQuantityMax(line, p.bag))}]
                : p.bag
          };
        }),
      setQty: (id, q) =>
        page.setState(p => ({
          order: null,
          bag: p.bag.map(x =>
            x.id === id
              ? {
                  ...x,
                  qty: Math.max(1, Math.min(q, vfLineQuantityMax(x, p.bag)))
                }
              : x
          )
        })),
      // The message for a line's handwritten card.
      setCard: (id, card) =>
        page.setState(p => ({
          order: null,
          bag: p.bag.map(x =>
            x.id === id
              ? {
                  ...x,
                  card
                }
              : x
          )
        })),
      cardAddition: s.cardAddition,
      addCard: id =>
        page.setState(current => {
          const added = vfAddCard(current.bag, id);
          return added ? {order: null, bag: added.lines, cardAddition: added.cardAddition} : null;
        }),
      undoCard: () =>
        page.setState(current => ({
          order: null,
          bag: vfUndoCardAddition(current.bag, current.cardAddition),
          cardAddition: null
        })),
      remove: id =>
        page.setState(p => {
          const line = p.bag.find(x => x.id === id);
          if (line)
            window.VF_TRACK.event('remove_from_cart', {
              items: vfLineItems([line]),
              value: line.unit * line.qty
            });
          return {
            order: null,
            bag: p.bag.filter(x => x.id !== id)
          };
        }),
      // Undo restores the captured configuration and its original position, without repricing it.
      restoreLine: (line, index) =>
        page.setState(p => {
          if (p.bag.some(item => item.id === line.id)) return null;
          window.VF_TRACK.event('add_to_cart', {
            items: vfLineItems([line]),
            value: line.unit * line.qty
          });
          return {
            order: null,
            bag: [...p.bag.slice(0, index), line, ...p.bag.slice(index)]
          };
        }),
      reset: () =>
        page.setState({
          order: null,
          paymentDraft: {method: null, last4: '', ref: '', receiptAmount: null},
          cardAddition: null,
          bag: VF_BAG0
        }),
      clear: () =>
        page.setState({
          paymentDraft: {method: null, last4: '', ref: '', receiptAmount: null},
          cardAddition: null,
          bag: []
        }),
      toggleSave: id => {
        const removing = page.state.saved.includes(id);
        if (page._savedLoading) page._savedEdits.set(id, !removing);
        page.setState(p => ({
          saved: removing ? p.saved.filter(x => x !== id) : [...p.saved, id]
        }));
        if (!removing)
          window.VF_TRACK.event('add_to_wishlist', {
            items: [window.VF_TRACK.item(vfProduct(id))]
          });
        return (removing ? window.VF_API.unsaveItem(id) : window.VF_API.saveItem(id)).catch(() =>
          page.setState({
            integrationError: true,
            announcement:
              page.state.lang === 'fa'
                ? 'ذخیره در سرور انجام نشد؛ فهرست محلی حفظ شد.'
                : 'Server sync failed; your local saved list is kept.'
          })
        );
      },
      setSaved: ids => {
        if (page._savedLoading)
          new Set([...page.state.saved, ...ids]).forEach(id => {
            if (page.state.saved.includes(id) !== ids.includes(id))
              page._savedEdits.set(id, ids.includes(id));
          });
        page.setState({saved: ids});
      }
    },
    // replace: refine the current page (e.g. shop filters) without adding a history entry.
    go: (r, replace) => page.navigate(r, !!replace),
    // React Aria links: in-site URLs switch the view in place; anything else loads normally.
    routerNavigate: href => {
      const url = new URL(href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname)
        return location.assign(url.href);
      page.navigate(vfReadRoute(url.search));
    }
  };
}
