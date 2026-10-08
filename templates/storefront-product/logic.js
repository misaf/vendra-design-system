// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    size: 'petite',
    addons: [],
    qty: 1,
    added: null,
    toast: null
  };
  renderVals() {
    const fa = this.props.lang === 'fa';
    const L = fa ? 'fa' : 'en';
    const S = vfShell.call(this, this.props, 'product');
    const s = this.state;
    const m = v => VF_MONEY(v, fa);
    const C = vfCopy(S);
    const product = vfFindProduct(vfPageRoute(this.props).id) || VF_PRODUCTS[0];
    const base = product.price;
    const availableAddons = VF_ADDONS.filter(a => !(product.noAddons || []).includes(a[0]));
    const hasSizes = !!product.sizes;
    const sz = VF_SIZES.find(z => z[0] === s.size);
    const extra = availableAddons
      .filter(a => s.addons.includes(a[0]))
      .reduce((t, a) => t + a[1], 0);
    const unit = base + (hasSizes ? sz[1] : 0) + extra;
    const total = unit * s.qty;
    return {
      ...S,
      t: {
        ...S.t,
        ...C,
        // Products have no names: the code is the title and the category says what it is.
        name: product.id,
        sub: vfProductSub(product, L),
        badge: product[L].badge || C.labels.vendraFlowers,
        desc: VF_PRODUCT_DETAILS[product.id][fa ? 1 : 0],
        cat: VF_CATEGORY_COPY[L][product.cat],
        careT: product.care ? VF_PRODUCT_DETAILS[product.id][fa ? 1 : 0] : C.careT,
        ship: product.same ? C.ship : C.labels.chooseYourDeliveryWindowAtCheckout
      },
      hasSizes,
      // WhatsApp questions quote the code, here and in the menu's WhatsApp button.
      waHref: S.waWith(
        C.waAsk
          .replace(
            '{kind}',
            fa ? VF_CATEGORY_ITEM.fa[product.cat] : VF_CATEGORY_ITEM.en[product.cat].toLowerCase()
          )
          .replace('{code}', product.id)
      ),
      copyCode: () => {
        const done = ok => {
          this.setState({
            toast: {
              title: ok ? C.codeCopied.replace('{code}', vfTokenText(product.id)) : C.copyFailed
            }
          });
          this._hideToastLater();
        };
        // Without clipboard access, select the code and try the older copy command; the code stays selected either way.
        const fallback = () => {
          const el = document.getElementById('vf-product-code');
          let ok = false;
          if (el) {
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            try {
              ok = document.execCommand('copy');
            } catch {}
          }
          done(ok);
        };
        try {
          navigator.clipboard.writeText(product.id).then(() => done(true), fallback);
        } catch {
          fallback();
        }
      },
      // Saved products are shared with the Saved page and the account's Saved tab.
      fav: S.isFav(product.id, []),
      // Saving confirms with a toast that links to the saved list.
      toggleSave: () => {
        const saving = !S.isFav(product.id, []);
        S.toggleFav(product.id, [])();
        this.setState({
          toast: {
            title: saving ? C.savedTitle : C.unsavedTitle,
            saving
          }
        });
        this._hideToastLater();
      },
      recentLabel: C.recentA + ' ' + C.recentB,
      hasRecent: vfRecentlyViewed().some(x => x !== product.id),
      available: product.inStock !== false,
      unavailable: product.inStock === false,
      category: S.shopLink(product.cat),
      productImages: vfProductImages(product, L),
      unitPrice: m(base + (hasSizes ? sz[1] : 0)),
      sizes: VF_SIZES.map(z => ({
        label: fa ? z[3] : z[2],
        desc: (fa ? z[5] : z[4]) + ' · ' + (z[1] ? '+' + m(z[1]) : C.labels.base),
        on: s.size === z[0],
        pick: () =>
          this.setState({
            size: z[0]
          })
      })),
      addons: availableAddons.map(a => {
        const on = s.addons.includes(a[0]);
        return {
          label: (fa ? a[3] : a[2]) + ' · +' + m(a[1]),
          on,
          toggle: () =>
            this.setState({
              addons: on ? s.addons.filter(x => x !== a[0]) : [...s.addons, a[0]]
            })
        };
      }),
      qty: s.qty,
      setQty: q =>
        this.setState({
          qty: q
        }),
      fmt: fa ? n => VF_FA_DIGITS(n) : n => String(n),
      qtyLabels: {
        dec: C.dec,
        inc: C.inc
      },
      addLabel:
        (product.inStock === false ? (fa ? 'ناموجود' : 'Sold out') : C.add) + ' · ' + m(total),
      totalLabel: m(total),
      add: () => {
        if (product.inStock === false) return;
        const st = this.props.store;
        if (st) {
          const ad = availableAddons.filter(a => s.addons.includes(a[0]));
          st.add({
            image: product.image,
            productId: product.id,
            token: product.id,
            size: hasSizes ? s.size : null,
            addons: ad.map(a => a[0]),
            id:
              product.id +
              (hasSizes ? '-' + s.size : '') +
              (ad.length ? '-' + ad.map(a => a[0]).join('+') : ''),
            unit,
            qty: s.qty,
            en: [product.id, vfLineDetail(product, hasSizes ? sz : null, ad, 'en')],
            fa: [product.id, vfLineDetail(product, hasSizes ? sz : null, ad, 'fa')]
          });
        }
        // A small bag panel confirms what was added and offers the next step.
        this._hideToast();
        this.setState({
          added: {
            line: {
              image: vfProductImage(product, L).src,
              name: product.id,
              meta:
                vfLineDetail(
                  product,
                  hasSizes ? sz : null,
                  availableAddons.filter(a => s.addons.includes(a[0])),
                  L
                ) +
                ' · × ' +
                (fa ? VF_FA_DIGITS(s.qty) : s.qty),
              total: m(total)
            }
          }
        });
      },
      addedOpen: !!s.added,
      addedLines: s.added ? [s.added.line] : [],
      addedSums: (() => {
        const st = this.props.store;
        if (!st || !st.bag || !s.added) return [];
        const count = st.bag.reduce((n, l) => n + l.qty, 0);
        const sub = st.bag.reduce((n, l) => n + l.unit * l.qty, 0);
        return [
          {
            label: C.bagSubtotal.replace('{count}', fa ? VF_FA_DIGITS(count) : count),
            value: m(sub),
            strong: true
          }
        ];
      })(),
      closeAdded: () =>
        this.setState({
          added: null
        }),
      checkout: e => {
        this.setState({
          added: null
        });
        if (S.go.bag) S.go.bag(e);
      },
      toast: s.toast && {
        title: s.toast.title,
        action: s.toast.saving
          ? {
              label: C.viewSaved,
              href: S.href.saved,
              onClick: S.go.saved
            }
          : undefined,
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
      recent: vfRecentlyViewed()
        .filter(x => x !== product.id)
        .slice(0, 4)
        .map(vfProduct)
        .map(p => ({
          ...S.productLink(p.id),
          images: [vfProductImage(p, L)],
          name: p.id,
          sub: vfProductSub(p, L),
          price: m(p.price),
          fav: S.isFav(p.id, []),
          toggleFav: S.toggleFav(p.id, [])
        })),
      faq: [
        {
          id: 'care',
          title: C.care,
          content: product.care ? VF_PRODUCT_DETAILS[product.id][fa ? 1 : 0] : C.careT
        },
        {
          id: 'delivery',
          title: C.del,
          content: C.delT
        }
      ]
    };
  }
  _hideToastLater() {
    clearTimeout(this._t);
    if (!this._toastHeld) this._t = setTimeout(() => this._hideToast(), 6000);
  }
  _hideToast() {
    clearTimeout(this._t);
    this._toastHeld = false;
    if (this.state.toast)
      this.setState({
        toast: null
      });
  }
  _rememberProduct() {
    vfRememberViewed(vfPageRoute(this.props).id || VF_PRODUCTS[0].id);
  }
  componentDidMount() {
    this._productId = vfPageRoute(this.props).id;
    super.componentDidMount();
    this._rememberProduct();
  }
  componentDidUpdate() {
    super.componentDidUpdate();
    const id = vfPageRoute(this.props).id;
    if (this._productId !== id) {
      this._productId = id;
      this._rememberProduct();
      this.setState({
        size: 'petite',
        addons: [],
        qty: 1,
        added: null,
        toast: null
      });
    }
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    clearTimeout(this._t);
  }
}
