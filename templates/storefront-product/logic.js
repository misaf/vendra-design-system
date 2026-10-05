// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    size: 'petite',
    addons: [],
    qty: 1,
    toast: null
  };
  renderVals() {
    const fa = this.props.lang === 'fa';
    const L = fa ? 'fa' : 'en';
    const S = vfShell.call(this, this.props, 'product');
    const s = this.state;
    const m = v => VF_MONEY(v, fa);
    const C = vfCopy(S);
    const id = vfPageRoute(this.props).id || 'ivory';
    const product = vfProduct(id === 'ivory-classic' ? 'ivory' : id);
    const base = product.price;
    const availableAddons = VF_ADDONS.filter(a => product.id !== 'orchid' || a[0] !== 'vase');
    const hasSizes = product.id === 'ivory';
    const sz = VF_SIZES.find(z => z[0] === s.size);
    const extra = availableAddons.filter(a => s.addons.includes(a[0])).reduce((t, a) => t + a[1], 0);
    const unit = base + (hasSizes ? sz[1] : 0) + extra;
    const total = unit * s.qty;
    return {
      ...S,
      t: {
        ...S.t,
        ...C,
        name: product[L][0],
        sub: product[L][1],
        badge: product[L][2] || C.labels.vendraFlowers,
        desc: VF_PRODUCT_DETAILS[product.id][fa ? 1 : 0],
        cat: VF_CATEGORY_COPY[L][product.cat],
        careT: product.id === 'orchid' ? VF_PRODUCT_DETAILS.orchid[fa ? 1 : 0] : C.careT,
        ship: product.same ? C.ship : C.labels.chooseYourDeliveryWindowAtCheckout
      },
      hasSizes,
      available: product.inStock !== false,unavailable:product.inStock===false,
      category: S.shopLink(product.cat),
      productImages: vfProductImages(product, L),
      unitPrice: m(base + (hasSizes ? sz[1] : 0)),
      sizes: VF_SIZES.map(z => ({
        label: fa ? z[3] : z[2],
        desc: (fa ? z[5] : z[4]) + ' · ' + (z[1] ? '+' + m(z[1]) : C.labels.base),
        on: s.size === z[0],
        pick: () => this.setState({
          size: z[0]
        })
      })),
      addons: availableAddons.map(a => {
        const on = s.addons.includes(a[0]);
        return {
          label: (fa ? a[3] : a[2]) + ' · +' + m(a[1]),
          on,
          toggle: () => this.setState({
            addons: on ? s.addons.filter(x => x !== a[0]) : [...s.addons, a[0]]
          })
        };
      }),
      qty: s.qty,
      setQty: q => this.setState({
        qty: q
      }),
      fmt: fa ? n => VF_FA_DIGITS(n) : n => String(n),
      qtyLabels: {
        dec: C.dec,
        inc: C.inc
      },
      addLabel: (product.inStock === false ? fa ? 'ناموجود' : 'Sold out' : C.add) + ' · ' + m(total),
      totalLabel: m(total),
      add: () => {
        if (product.inStock === false) return;
        const st = this.props.store;
        if (st) {
          const ad = availableAddons.filter(a => s.addons.includes(a[0]));
          st.add({
            image: product.image,
            productId: product.id,
            size: hasSizes ? s.size : null,
            addons: ad.map(a => a[0]),
            id: product.id + (hasSizes ? '-' + s.size : '') + (ad.length ? '-' + ad.map(a => a[0]).join('+') : ''),
            unit,
            qty: s.qty,
            en: [product.en[0], (hasSizes ? [sz[2], sz[4]] : [product.en[1]]).concat(ad.map(a => a[2])).join(' · ')],
            fa: [product.fa[0], (hasSizes ? [sz[3], sz[5]] : [product.fa[1]]).concat(ad.map(a => a[3])).join(' · ')]
          });
        }
        this.setState({
          toast: {
            qty: s.qty
          }
        });
        this._hideToastLater();
      },
      toast: s.toast && {
        message: product[L][0] + ' × ' + (fa ? VF_FA_DIGITS(s.toast.qty) : s.toast.qty),
        action: {
          label: C.viewBag,
          href: S.href.bag,
          onClick: S.go.bag
        },
        close: () => this._hideToast()
      },
      // Stay while the pointer or focus is on the toast; WCAG 2.2.1.
      holdToast: () => {
        this._toastHeld = true;
        clearTimeout(this._t);
      },
      releaseToast: e => {
        if (e && e.currentTarget && e.currentTarget.contains(e.relatedTarget)) return;
        this._toastHeld = false;
        this._hideToastLater();
      },
      faq: [{
        id: 'care',
        title: C.care,
        content: product.id === 'orchid' ? VF_PRODUCT_DETAILS.orchid[fa ? 1 : 0] : C.careT
      }, {
        id: 'delivery',
        title: C.del,
        content: C.delT
      }]
    };
  }
  _hideToastLater() {
    clearTimeout(this._t);
    if (!this._toastHeld) this._t = setTimeout(() => this._hideToast(), 6000);
  }
  _hideToast() {
    clearTimeout(this._t);
    this._toastHeld = false;
    if (this.state.toast) this.setState({
      toast: null
    });
  }
  // Gallery.jsx now makes its track focusable; until _ds_bundle.js is regenerated
  // from it (Claude Design self-check), do the same here. Remove after that.
  _focusableGallery() {
    setTimeout(() => document.querySelectorAll?.('.ag-gallery__track:not([tabindex])').forEach(track => { track.tabIndex = 0; }), 0);
  }
  componentDidMount() {
    this._productId = vfPageRoute(this.props).id;
    super.componentDidMount();
    this._focusableGallery();
  }
  componentDidUpdate() {
    super.componentDidUpdate();
    this._focusableGallery();
    const id = vfPageRoute(this.props).id;
    if (this._productId !== id) {
      this._productId = id;
      this.setState({
        size: 'petite',
        addons: [],
        qty: 1,
        toast: null
      });
    }
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    clearTimeout(this._t);
  }
}
