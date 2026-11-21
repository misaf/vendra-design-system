// Page behavior. Edit here, then run npm run build.
import {
  vfAccountLocale,
  vfAccountPhone,
  vfClearPrivateSession,
  vfCustomerId
} from '../customer/account-data.js';
import {vfProductIds} from '../catalog/catalog.js';
import {
  vfLineItems,
  vfLineToken,
  vfAddCard,
  vfUndoCardAddition,
  vfLinesFromParam,
  vfSampleBag
} from '../cart/cart-lines.js';
import {
  vfLineQuantityMax,
  vfMergePriceChanges,
  vfReorderBag,
  vfRepriceLines
} from '../cart/cart-lines.js';
import {VF_DELIVERY} from '../delivery/delivery-draft.js';
import {mobile as vfMobile} from '../../design-system/utils/input.js';
import {VF_STORE, vfLanguage} from '../store/store-config.js';
import {vfCheckoutBlocked, vfCheckoutFallback} from '../checkout/checkout-guard.js';
import {
  vfCustomerState,
  vfEmptyCustomer,
  vfGuestCustomers,
  vfRestoreCustomer
} from '../customer/customer-draft.js';
import {vfPageTenant} from '../../platform/tenant/tenant.js';
import {
  VF_ROUTES,
  VF_ROUTE_EXTRA,
  vfAppBase,
  vfInApp,
  vfReadRoute,
  vfRouteUrl
} from '../shell/routing.js';
import {vfOnServer} from '../../platform/browser/environment.js';
import {useLifecycle, usePageLogic} from '../shell/page-state.js';
import {vfRuntime} from '../../platform/browser/runtime.js';
import {createSavedSync} from '../customer/saved/saved-sync.js';
import {vfPersistSession, vfReadSession, vfSessionCustomer} from './session-storage.js';

const VF_BAG0 = vfSampleBag();
// One session for the whole site, whichever page it was opened on.
const VF_SESSION = 'vendra-template:' + vfAppBase();

const vfCheckoutSnapshot = ({bag, delivery}) => JSON.stringify({bag, delivery});
// The account needs a signed-in phone; signed-out customers see sign-in instead.
function vfGuardRoute(state, r) {
  // Back from the bank, checkout always opens: it says what happened to the payment, even in a tab
  // that no longer holds the bag.
  if (r.view === 'checkout' && !r.paymentOrder && vfCheckoutBlocked(state))
    return vfCheckoutFallback(state, r.lang);
  if (r.view === 'account' && !vfAccountPhone()) return {lang: r.lang, view: 'signin'};
  return null;
}
// page_view for the shown route, once per address: the site changes routes in place, so a
// collector never sees these navigations. The path only (no query), so a search term, phone number
// or order code in the query never leaves; filters and steps within a page don't count again.
function vfReportPageView(page) {
  const key = page.state.route + ' ' + location.pathname;
  if (page._vfPageView === key) return;
  page._vfPageView = key;
  // The page's own language: <html lang> follows only once the new page has rendered.
  vfRuntime.track.event('page_view', {
    language: page.state.lang,
    page_type: page.state.route,
    page_path: location.pathname
  });
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
  if (vfOnServer()) return null;
  const value = history.state?.vfSearchReturn;
  if (typeof value !== 'string' || !vfInApp(value)) return null;
  const route = vfReadRoute(value);
  return route.view === 'search' ? null : route;
}
function vfSiteInitial(props, address = props.initialUrl) {
  const saved = vfReadSession(VF_SESSION);
  const customerId = vfCustomerId();
  const privateState = vfRestoreCustomer(vfSessionCustomer(saved, customerId));
  let route = vfReadRoute(address);
  if (route.view === 'home' && props.start) route = {...route, view: props.start};
  const handedLines = route.lines ? vfLinesFromParam(route.lines) : [];
  const handedIds = route.ids ? vfProductIds(route.ids.split(',')) : [];
  route = {...route, lines: undefined, ids: undefined};
  // A bag kept from an earlier visit is priced again from the current catalog; changed lines say so.
  const bag = vfRepriceLines(
    vfJoinLines(
      Array.isArray(saved.bag) ? saved.bag : handedLines.length ? [] : VF_BAG0,
      handedLines
    )
  );
  const initial = {
    ...privateState,
    customerId,
    customers: customerId === 'guest' ? vfGuestCustomers(saved.customers) : saved.customers || {},
    route: route.view,
    routeInfo: route,
    searchReturn: route.view === 'search' ? vfSearchReturnRoute() : null,
    lang: route.lang
      ? route.lang
      : vfLanguage(vfAccountLocale() || props.lang || VF_STORE.languages[0]),
    // The demo's sample bag and saved items stand in only when nothing was handed over.
    bag: bag.lines,
    priceChanges: vfMergePriceChanges(
      saved.priceChanges && typeof saved.priceChanges === 'object' ? saved.priceChanges : {},
      bag.changes,
      bag.lines
    ),
    saved: [
      ...new Set([
        ...(Array.isArray(privateState.saved)
          ? vfProductIds(privateState.saved)
          : handedIds.length || Array.isArray(saved.saved)
            ? []
            : ['VF-8RD5WN', 'VF-4CJ6ZB', 'VF-9FA2KE']),
        ...handedIds
      ])
    ],
    cardAddition: null,
    checkoutPending: false,
    checkoutErrors: null,
    checkoutNotice: null,
    announcement: ''
  };
  // Checkout without a bag or delivery details opens the step the customer needs straight away, as
  // the account opens sign-in (the build's prerendered checkout is that step for a first visit).
  const guarded = vfGuardRoute(initial, route);
  if (guarded) {
    route = vfReadRoute(vfRouteUrl(guarded));
    Object.assign(initial, {route: route.view, routeInfo: route});
  }
  return initial;
}
function previewAt(address) {
  const query = new URL(address, 'http://localhost').searchParams;
  const name = query.get('page');
  if (!VF_ROUTES.includes(name)) return null;
  return {name, lang: query.get('lang')};
}

// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function useStorefrontSession(props) {
  const page = usePageLogic(props, page => {
    page.state = vfSiteInitial(page.props);
    // Customers who signed out while this page was open.
    page._signedOut = new Set();
    page.savedSync = createSavedSync(page);

    page.syncCustomer = ({continueCheckout = false} = {}) => {
      const customerId = vfCustomerId(),
        current = page.state;
      if (customerId === current.customerId) return;
      const previous = vfCustomerState(current);
      let customers = {...current.customers, [current.customerId]: previous};
      if (customerId === 'guest') {
        // Checkouts these customers submitted may still answer; their completions are dropped.
        Object.keys(customers).forEach(id => id !== 'guest' && page._signedOut.add(id));
        customers = vfGuestCustomers(customers);
        vfClearPrivateSession();
      } else page._signedOut.delete(customerId);
      let next = vfRestoreCustomer(customers[customerId]);
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
      page.savedSync.reset();
      page.setState({
        ...next,
        saved: Array.isArray(next.saved) ? vfProductIds(next.saved) : [],
        integrationError: false,
        customerId,
        customers,
        cardAddition: null,
        checkoutNotice: null,
        checkoutErrors: null,
        announcement: ''
      });
      page.savedSync.load();
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
      const route = vfReadRoute(vfRouteUrl(candidate));
      const final = vfGuardRoute(page.state, route) || route;
      const url = vfRouteUrl(final);
      const previous = page.state.routeInfo;
      const searchReturn =
        final.view !== 'search'
          ? null
          : previous.view === 'search'
            ? page.state.searchReturn
            : previous;
      page._pendingSearch = searchReturn && {url, route: searchReturn};
      page.props.navigate?.(url, {
        replace,
        scroll: !(replace && final.view === 'search' && previous.view === 'search'),
        document: final.view === 'track' && !!final.id
      });
    };
    // Next.js commits the address first. Apply query-backed state from that address on push,
    // replace, Back, and Forward, using the same path as a direct visit.
    page.receiveAddress = address => {
      if (!page._restored || address === page._address) return;
      page._address = address;
      const route = vfReadRoute(address);
      const guarded = vfGuardRoute(page.state, route);
      if (guarded) {
        page.navigate(guarded, true);
        return;
      }
      const pending = page._pendingSearch;
      if (pending?.url === address) {
        history.replaceState(
          {...history.state, vfSearchReturn: vfRouteUrl(pending.route)},
          '',
          address
        );
        page._pendingSearch = null;
      }
      let handover = {};
      if (route.lines) {
        const {lines, changes} = vfRepriceLines(
          vfJoinLines(page.state.bag, vfLinesFromParam(route.lines))
        );
        handover = {
          bag: lines,
          priceChanges: vfMergePriceChanges(page.state.priceChanges, changes, lines)
        };
      }
      if (route.ids)
        page.savedSync.setSaved([
          ...new Set([...page.state.saved, ...vfProductIds(route.ids.split(','))])
        ]);
      page.setState({
        ...handover,
        route: route.view,
        routeInfo: route,
        searchReturn: route.view === 'search' ? vfSearchReturnRoute() : null,
        lang: route.lang || page.props.lang,
        preview: previewAt(address)
      });
      if (route.lines || route.ids) {
        vfPersistSession(VF_SESSION, page.state);
        page.navigate({...route, lines: undefined, ids: undefined}, true);
      }
    };
    page.restoreAddress = address => {
      if (page._restored) return;
      page._restored = true;
      page._address = address;
      const initial = vfSiteInitial(page.props, address);
      page.setState({...initial, ready: true, preview: previewAt(address)});
      if (initial.customerId === 'guest') vfClearPrivateSession();
      vfPersistSession(VF_SESSION, initial);
      page.savedSync.load();
      const requested = vfReadRoute(address);
      const canonical = vfRouteUrl(initial.routeInfo);
      if (
        initial.route !== requested.view ||
        requested.lines ||
        requested.ids ||
        (['product', 'post'].includes(requested.view) &&
          new URL(address, location.href).pathname !== new URL(canonical, location.href).pathname)
      )
        page.navigate(initial.routeInfo, true);
    };
  });
  useLifecycle(page, {
    didMount() {
      window.__vfSite = page;
      page._mounted = true;
      page.savedSync.load();
      page._customerChanged = event => {
        if (event.key === 'vf-account-phone' || event.key == null) page.syncCustomer();
      };
      window.addEventListener('storage', page._customerChanged);
      page._click = event => {
        const chat = event.target.closest?.('a[href]');
        if (chat && VF_STORE.whatsapp && chat.href.startsWith(VF_STORE.whatsapp))
          vfRuntime.track.event('contact_whatsapp');
      };
      document.addEventListener('click', page._click);
      if (page._restored) {
        vfPersistSession(VF_SESSION, page.state);
        vfReportPageView(page);
      }
    },
    didUpdate() {
      if (!page._restored) return;
      vfReportPageView(page);
      if (page.state.customerId !== vfCustomerId()) {
        page.syncCustomer();
        return;
      }
      vfPersistSession(VF_SESSION, page.state);
    },
    willUnmount() {
      page._mounted = false;
      page.savedSync.reset();
      window.removeEventListener('storage', page._customerChanged);
      document.removeEventListener('click', page._click);
      if (window.__vfSite === page) delete window.__vfSite;
    }
  });
  return vals(page);
}

function vals(page) {
  const s = page.state;
  return {
    ready: !!s.ready,
    preview: s.preview,
    restoreAddress: page.restoreAddress,
    receiveAddress: page.receiveAddress,
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
          href: vfRouteUrl({lang: s.lang, view: 'track', id: s.checkoutNotice.id})
        }
      : null,
    dismissCheckoutNotice: () => page.setState({checkoutNotice: null}),
    store: {
      customerId: s.customerId,
      syncCustomer: page.syncCustomer,
      bag: s.bag,
      priceChanges: s.priceChanges,
      // Prices the bag from the current catalog and returns what changed, so a step can stop and
      // show the new prices before the customer continues.
      reprice: () => {
        const {lines, changes} = vfRepriceLines(page.state.bag);
        if (changes.length)
          page.setState(current => ({
            order: null,
            bag: lines,
            priceChanges: vfMergePriceChanges(current.priceChanges, changes, lines)
          }));
        return changes;
      },
      // The customer has seen the new prices and continued.
      seenPrices: () =>
        Object.keys(page.state.priceChanges).length && page.setState({priceChanges: {}}),
      saved: s.saved,
      delivery: s.delivery,
      checkoutPending: s.checkoutPending,
      checkoutErrors: s.checkoutErrors,
      setCheckoutErrors: errors => page.setState({checkoutErrors: errors}),
      clearCheckoutBagError: () =>
        page.setState(current =>
          current.checkoutErrors?.bag
            ? {checkoutErrors: {...current.checkoutErrors, bag: ''}}
            : null
        ),
      beginCheckout: () => {
        if (page.state.checkoutPending) return false;
        page.setState({checkoutPending: true});
        return true;
      },
      endCheckout: () => page.setState({checkoutPending: false}),
      checkoutSnapshot: vfCheckoutSnapshot(s),
      orders: s.orders,
      paymentDraft: s.paymentDraft,
      setPaymentDraft: patch =>
        page.setState(current => ({paymentDraft: {...current.paymentDraft, ...patch}})),
      order: s.order,
      lastOrder: s.lastOrder,
      tracked: s.tracked,
      trackOrder: (id, viewer) =>
        page.setState(current => ({tracked: {...current.tracked, [id]: viewer}})),
      searchReturn: s.searchReturn,
      count: s.bag.reduce((a, l) => a + l.qty, 0),
      announce: title => {
        if (page.state.announcement !== title)
          page.setState({
            announcement: title
          });
      },
      setDelivery: patch =>
        page.setState(p => {
          const checkoutErrors = p.checkoutErrors;
          const deliveryErrors = Object.fromEntries(
            Object.entries(checkoutErrors?.delivery || {}).filter(
              ([key]) => !Object.hasOwn(patch, key)
            )
          );
          return {
            delivery: {...p.delivery, ...patch},
            checkoutErrors: checkoutErrors && {...checkoutErrors, delivery: deliveryErrors},
            order: null
          };
        }),
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
                    ...order.delivery,
                    date: '',
                    slot: null
                  }
          };
        }),
      complete: order =>
        page.setState(current => {
          const ownerId = order.customerId;
          if (ownerId && ownerId !== current.customerId) {
            // After sign-out nothing of that customer stays here, even once someone else signs
            // in; the order is the server's.
            if (current.customerId === 'guest' || page._signedOut.has(ownerId)) return null;
            const owner = current.customers[ownerId] || vfEmptyCustomer();
            if (owner.orders.some(previous => previous.id === order.id)) return null;
            return {
              customers: {
                ...current.customers,
                [ownerId]: {
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
            !order.checkoutSnapshot || order.checkoutSnapshot === vfCheckoutSnapshot(current);
          return {
            lastOrder: order,
            orders: [order, ...current.orders],
            ...(unchanged
              ? {
                  order,
                  checkoutNotice: null,
                  bag: [],
                  priceChanges: {},
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
      // listName names the list the line was added from (e.g. 'saved') for analytics.
      add: (line, date, listName) =>
        page.setState(p => {
          vfRuntime.track.event('add_to_cart', {
            items: [
              {
                // Analytics and the studio's reports know a product by its code.
                item_id: vfLineToken(line) || line.id,
                price: line.unit,
                quantity: line.qty,
                ...(listName ? {item_list_name: listName} : {})
              }
            ]
          });
          const ex = p.bag.find(x => x.id === line.id);
          return {
            order: null,
            ...(date && date !== p.delivery.date
              ? {delivery: {...p.delivery, date, slot: null}}
              : {}),
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
            vfRuntime.track.event('remove_from_cart', {
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
          vfRuntime.track.event('add_to_cart', {
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
          bag: VF_BAG0,
          priceChanges: {}
        }),
      clear: () =>
        page.setState({
          paymentDraft: {method: null, last4: '', ref: '', receiptAmount: null},
          cardAddition: null,
          bag: [],
          priceChanges: {}
        }),
      toggleSave: page.savedSync.toggle,
      setSaved: page.savedSync.setSaved
    },
    // replace: refine the current page (e.g. shop filters) without adding a history entry.
    go: (r, replace) => page.navigate(r, !!replace),
    // React Aria links: in-site URLs switch the view in place; anything else loads normally.
    routerNavigate: href => {
      const url = new URL(href, location.href);
      if (!vfInApp(url) || url.hash) return location.assign(url.href);
      page.navigate(vfReadRoute(url.href));
    }
  };
}
