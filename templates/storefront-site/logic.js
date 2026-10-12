// Page behavior. Edit here, then run npm --prefix templates run build.
import React from 'react';
import {vfAccountLocale, vfAccountPhone} from '../_shared/account-data.js';
import {
  vfLineHasCard,
  vfLineToken,
  vfLineWithCard,
  vfProduct,
  vfProductIds,
  vfReorderLines,
  vfSampleBag
} from '../_shared/catalog.js';
import {VF_DELIVERY, vfErrors} from '../_shared/delivery.js';
import {vfPageTenant} from '../_shared/page-lifecycle.js';
import {VF_ROUTES, VF_ROUTE_EXTRA, vfReadRoute, vfRouteParams} from '../_shared/routing.js';
import {useLifecycle, usePageLogic} from '../_shared/page-state.js';
const VF_BAG0 = vfSampleBag();
const VF_SESSION = 'vendra-template:' + location.pathname;
// Checkout needs a bag and complete delivery details; otherwise send the customer back to the step they need.
function vfCheckoutBlocked(state) {
  return (
    !state.order &&
    (!state.bag.length || Object.values(vfErrors(state.delivery, state.bag)).some(Boolean))
  );
}
function vfCheckoutFallback(state, lang) {
  return {lang, view: 'bag', step: state.bag.length ? 'delivery' : 'bag'};
}
// The account needs a signed-in phone; signed-out customers see sign-in instead.
function vfGuardRoute(state, r) {
  if (r.view === 'checkout' && vfCheckoutBlocked(state)) return vfCheckoutFallback(state, r.lang);
  if (r.view === 'account' && !vfAccountPhone()) return {lang: r.lang, view: 'signin'};
  return null;
}
function vfSiteInitial(props) {
  let saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(VF_SESSION) || '{}') || {};
  } catch {}
  let route = vfReadRoute();
  if (route.view === 'home' && !new URLSearchParams(location.search).has('view') && props.start)
    route = {...route, view: props.start};
  // An old product link (?id=ivory) is rewritten with the product's category and code.
  if (route.view === 'product' && vfRouteParams(route) !== location.search)
    history.replaceState({}, '', vfRouteParams(route));
  // Open sign-in straight away rather than flashing the account first.
  if (route.view === 'account' && !vfAccountPhone()) {
    route = vfReadRoute(vfRouteParams({lang: route.lang, view: 'signin'}));
    if (new URLSearchParams(location.search).has('view'))
      history.replaceState({}, '', vfRouteParams(route));
  }
  return {
    route: route.view,
    routeInfo: route,
    lang: new URLSearchParams(location.search).has('lang')
      ? route.lang
      : vfAccountLocale() || props.lang || 'en',
    mobile: null,
    bag: Array.isArray(saved.bag) ? saved.bag : VF_BAG0,
    saved: Array.isArray(saved.saved)
      ? vfProductIds(saved.saved)
      : ['VF-8RD5WN', 'VF-4CJ6ZB', 'VF-9FA2KE'],
    delivery: {
      ...VF_DELIVERY,
      ...saved.delivery
    },
    order: saved.order || null,
    lastOrder: saved.lastOrder || saved.order || null,
    announcement: ''
  };
}
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = vfSiteInitial(page.props);
    page.navigate = (input, replace = false) => {
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
      if (url !== location.search) history[replace ? 'replaceState' : 'pushState']({}, '', url);
      page.setState({
        route: r.view,
        routeInfo: r,
        lang: r.lang || page.state.lang
      });
      window.scrollTo(0, 0);
    };
  });
  useLifecycle(page, {
    didMount() {
      window.__vfSite = page;
      if (window.VF_API.live)
        window.VF_API.loadSaved()
          .then(saved => {
            if (saved)
              page.setState({
                saved
              });
          })
          .catch(() =>
            page.setState({
              integrationError: true
            })
          );
      page._pop = () => {
        const r = vfReadRoute();
        const guarded = vfGuardRoute(page.state, r);
        if (guarded) {
          page.navigate(guarded, true);
          return;
        }
        page.setState({
          route: r.view,
          routeInfo: r,
          lang: r.lang || page.props.lang || 'en'
        });
      };
      window.addEventListener('popstate', page._pop);
      const guarded = vfGuardRoute(page.state, {view: page.state.route, lang: page.state.lang});
      if (guarded) page.navigate(guarded, true);
    },
    didUpdate() {
      try {
        const {bag, saved, delivery, order, lastOrder} = page.state;
        sessionStorage.setItem(
          VF_SESSION,
          JSON.stringify({
            bag,
            saved,
            delivery,
            order,
            lastOrder
          })
        );
      } catch {}
    },
    willUnmount() {
      window.removeEventListener('popstate', page._pop);
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
    store: {
      bag: s.bag,
      saved: s.saved,
      delivery: s.delivery,
      order: s.order,
      lastOrder: s.lastOrder,
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
      reorder: order =>
        page.setState({
          order: null,
          bag: vfReorderLines(order.lines),
          delivery: {
            ...order.delivery
          }
        }),
      complete: order =>
        page.setState({
          order,
          lastOrder: order,
          bag: [],
          delivery: {
            ...VF_DELIVERY
          }
        }),
      add: line =>
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
            bag: ex
              ? p.bag.map(x =>
                  x.id === line.id
                    ? {
                        ...x,
                        qty: x.qty + line.qty
                      }
                    : x
                )
              : [...p.bag, line]
          };
        }),
      setQty: (id, q) =>
        page.setState(p => ({
          order: null,
          bag: p.bag.map(x =>
            x.id === id
              ? {
                  ...x,
                  qty: q
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
      // Adds a handwritten card to a line, joining an identical line already in the bag.
      addCard: id =>
        page.setState(p => {
          const line = p.bag.find(x => x.id === id);
          if (!line || vfLineHasCard(line)) return null;
          const carded = vfLineWithCard(line),
            twin = p.bag.find(x => x.id === carded.id);
          return {
            order: null,
            bag: twin
              ? p.bag
                  .filter(x => x.id !== id)
                  .map(x =>
                    x === twin
                      ? {
                          ...x,
                          qty: x.qty + line.qty
                        }
                      : x
                  )
              : p.bag.map(x => (x === line ? carded : x))
          };
        }),
      remove: id =>
        page.setState(p => ({
          order: null,
          bag: p.bag.filter(x => x.id !== id)
        })),
      reset: () =>
        page.setState({
          order: null,
          bag: VF_BAG0
        }),
      clear: () =>
        page.setState({
          bag: []
        }),
      toggleSave: id => {
        const removing = page.state.saved.includes(id);
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
      setSaved: ids =>
        page.setState({
          saved: ids
        })
    },
    mobile: s.mobile != null ? s.mobile : !!page.props.mobile,
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
