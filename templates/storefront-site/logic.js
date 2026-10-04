// Page behavior. Edit here, then run npm --prefix templates run build.
const VF_BAG0 = vfSampleBag();
const VF_SESSION = 'vendra-template:' + location.pathname;
function vfSiteInitial(props) {
  let saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(VF_SESSION) || '{}') || {};
  } catch (e) {}
  const route = vfReadRoute();
  return {
    route: route.view === 'home' && !new URLSearchParams(location.search).has('view') ? props.start || 'home' : route.view,
    routeInfo: route,
    lang: route.lang || props.lang || 'en',
    tenant: null,
    mobile: null,
    bag: Array.isArray(saved.bag) ? saved.bag : VF_BAG0,
    saved: Array.isArray(saved.saved) ? saved.saved : ['orchid', 'crimson', 'blush'],
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
    this._pop = () => {
      const r = vfReadRoute();
      if (r.view === 'checkout' && !this.state.order && (!this.state.bag.length || Object.values(vfErrors(this.state.delivery)).some(Boolean))) {
        this.navigate({
          view: 'bag',
          lang: r.lang
        }, true);
        return;
      }
      this.setState({
        route: r.view,
        routeInfo: r,
        lang: r.lang || this.props.lang || 'en'
      });
    };
    window.addEventListener('popstate', this._pop);
    if (this.state.route === 'checkout' && !this.state.order && (!this.state.bag.length || Object.values(vfErrors(this.state.delivery)).some(Boolean))) this.navigate('bag', true);
  }
  componentDidUpdate() {
    try {
      const {
        bag,
        saved,
        delivery,
        order,
        lastOrder
      } = this.state;
      sessionStorage.setItem(VF_SESSION, JSON.stringify({
        bag,
        saved,
        delivery,
        order,
        lastOrder
      }));
    } catch (e) {}
  }
  componentWillUnmount() {
    window.removeEventListener('popstate', this._pop);
    if (window.__vfSite === this) delete window.__vfSite;
  }
  navigate(input, replace = false) {
    const candidate = typeof input === 'string' ? {
      lang: this.state.lang,
      view: input,
      ...VF_ROUTE_EXTRA[input]
    } : {
      lang: this.state.lang,
      ...input
    };
    let r = vfReadRoute(vfRouteParams(candidate));
    if (r.view === 'checkout' && !this.state.order && (!this.state.bag.length || Object.values(vfErrors(this.state.delivery)).some(Boolean))) r = {
      lang: r.lang,
      view: 'bag'
    };
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
      routeInfo: s.routeInfo,
      lang: s.lang,
      tenant: s.tenant || this.props.tenant || 'default',
      setLang: l => this.navigate({
        ...s.routeInfo,
        view: s.route,
        lang: l
      }, true),
      announcement: s.announcement,
      store: {
        bag: s.bag,
        saved: s.saved,
        delivery: s.delivery,
        order: s.order,
        lastOrder: s.lastOrder,
        count: s.bag.reduce((a, l) => a + l.qty, 0),
        announce: title => {
          if (this.state.announcement !== title) this.setState({
            announcement: title
          });
        },
        setDelivery: patch => this.setState(p => ({
          delivery: {
            ...p.delivery,
            ...patch
          },
          order: null
        })),
        reorder: order => this.setState({
          order: null,
          bag: order.lines.map(line => ({
            ...line
          })),
          delivery: {
            ...order.delivery
          }
        }),
        complete: order => this.setState({
          order,
          lastOrder: order,
          bag: [],
          delivery: {
            ...VF_DELIVERY
          }
        }),
        add: line => this.setState(p => {
          const ex = p.bag.find(x => x.id === line.id);
          return {
            order: null,
            bag: ex ? p.bag.map(x => x.id === line.id ? {
              ...x,
              qty: x.qty + line.qty
            } : x) : [...p.bag, line]
          };
        }),
        setQty: (id, q) => this.setState(p => ({
          order: null,
          bag: p.bag.map(x => x.id === id ? {
            ...x,
            qty: q
          } : x)
        })),
        remove: id => this.setState(p => ({
          order: null,
          bag: p.bag.filter(x => x.id !== id)
        })),
        reset: () => this.setState({
          order: null,
          bag: VF_BAG0
        }),
        clear: () => this.setState({
          bag: []
        }),
        toggleSave: id => this.setState(p => ({
          saved: p.saved.includes(id) ? p.saved.filter(x => x !== id) : [...p.saved, id]
        })),
        setSaved: ids => this.setState({
          saved: ids
        })
      },
      mobile: s.mobile != null ? s.mobile : !!this.props.mobile,
      go: r => this.navigate(r)
    };
  }
}
