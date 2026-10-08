// Page behavior. Edit here, then run npm --prefix templates run build.
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
class Component extends DCLogic {
  state = vfSiteInitial(this.props);
  componentDidMount() {
    window.__vfSite = this;
    if (window.VF_API.live)
      window.VF_API.loadSaved()
        .then(saved => {
          if (saved)
            this.setState({
              saved
            });
        })
        .catch(() =>
          this.setState({
            integrationError: true
          })
        );
    this._pop = () => {
      const r = vfReadRoute();
      const guarded = vfGuardRoute(this.state, r);
      if (guarded) {
        this.navigate(guarded, true);
        return;
      }
      this.setState({
        route: r.view,
        routeInfo: r,
        lang: r.lang || this.props.lang || 'en'
      });
    };
    window.addEventListener('popstate', this._pop);
    const guarded = vfGuardRoute(this.state, {view: this.state.route, lang: this.state.lang});
    if (guarded) this.navigate(guarded, true);
  }
  componentDidUpdate() {
    try {
      const {bag, saved, delivery, order, lastOrder} = this.state;
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
  }
  componentWillUnmount() {
    window.removeEventListener('popstate', this._pop);
    if (window.__vfSite === this) delete window.__vfSite;
  }
  navigate(input, replace = false) {
    const candidate =
      typeof input === 'string'
        ? {
            lang: this.state.lang,
            view: input,
            ...VF_ROUTE_EXTRA[input]
          }
        : {
            lang: this.state.lang,
            ...input
          };
    let r = vfReadRoute(vfRouteParams(candidate));
    const guarded = vfGuardRoute(this.state, r);
    if (guarded) r = vfReadRoute(vfRouteParams(guarded));
    const url = vfRouteParams(r);
    if (url !== location.search) history[replace ? 'replaceState' : 'pushState']({}, '', url);
    this.setState({
      route: r.view,
      routeInfo: r,
      lang: r.lang || this.state.lang
    });
    window.scrollTo(0, 0);
  }
  renderVals() {
    const s = this.state,
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
      tenant: vfPageTenant(this.props),
      setLang: l =>
        this.navigate(
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
          if (this.state.announcement !== title)
            this.setState({
              announcement: title
            });
        },
        setDelivery: patch =>
          this.setState(p => ({
            delivery: {
              ...p.delivery,
              ...patch
            },
            order: null
          })),
        reorder: order =>
          this.setState({
            order: null,
            bag: vfReorderLines(order.lines),
            delivery: {
              ...order.delivery
            }
          }),
        complete: order =>
          this.setState({
            order,
            lastOrder: order,
            bag: [],
            delivery: {
              ...VF_DELIVERY
            }
          }),
        add: line =>
          this.setState(p => {
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
          this.setState(p => ({
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
          this.setState(p => ({
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
          this.setState(p => {
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
          this.setState(p => ({
            order: null,
            bag: p.bag.filter(x => x.id !== id)
          })),
        reset: () =>
          this.setState({
            order: null,
            bag: VF_BAG0
          }),
        clear: () =>
          this.setState({
            bag: []
          }),
        toggleSave: id => {
          const removing = this.state.saved.includes(id);
          this.setState(p => ({
            saved: removing ? p.saved.filter(x => x !== id) : [...p.saved, id]
          }));
          if (!removing)
            window.VF_TRACK.event('add_to_wishlist', {
              items: [window.VF_TRACK.item(vfProduct(id))]
            });
          return (removing ? window.VF_API.unsaveItem(id) : window.VF_API.saveItem(id)).catch(() =>
            this.setState({
              integrationError: true,
              announcement:
                this.state.lang === 'fa'
                  ? 'ذخیره در سرور انجام نشد؛ فهرست محلی حفظ شد.'
                  : 'Server sync failed; your local saved list is kept.'
            })
          );
        },
        setSaved: ids =>
          this.setState({
            saved: ids
          })
      },
      mobile: s.mobile != null ? s.mobile : !!this.props.mobile,
      // replace: refine the current page (e.g. shop filters) without adding a history entry.
      go: (r, replace) => this.navigate(r, !!replace)
    };
  }
}
