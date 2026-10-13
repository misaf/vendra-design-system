// Page behavior. Edit here, then run npm --prefix templates run build.
import {ToastQueue} from '../app/ds.js';
import {vfCopy} from './copy.js';
import {
  VF_ADDONS,
  VF_PRODUCTS,
  VF_PRODUCT_DETAILS,
  VF_SIZES,
  vfFindProduct,
  vfLineDetail,
  vfProduct,
  vfProductImage,
  vfProductImages,
  vfProductSub,
  vfRecentlyViewed,
  vfRememberViewed,
  vfTokenText
} from '../_shared/catalog.js';
import {VF_FA_DIGITS, VF_MONEY} from '../_shared/formatting.js';
import {vfShell} from '../_shared/navigation.js';
import {vfPageRoute} from '../_shared/routing.js';
import {VF_CATEGORY_COPY, VF_CATEGORY_ITEM} from '../_shared/translations/categories.js';
import {useLifecycle, usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.toasts = new ToastQueue({maxVisibleToasts: 1});
    page.state = {
      size: 'petite',
      addons: [],
      qty: 1,
      added: null
    };
    // One confirmation at a time; React Aria's region keeps it while the pointer or focus is on it.
    page._showToast = content => {
      page.toasts.clear();
      page.toasts.add(content, {timeout: 6000});
    };
    page._rememberProduct = () => {
      vfRememberViewed(vfPageRoute(page.props).id || VF_PRODUCTS[0].id);
    };
  });
  useStorefrontPage(page);
  useLifecycle(page, {
    didMount() {
      page._productId = vfPageRoute(page.props).id;
      page._rememberProduct();
    },
    didUpdate() {
      const id = vfPageRoute(page.props).id;
      if (page._productId !== id) {
        page._productId = id;
        page._rememberProduct();
        page.setState({
          size: 'petite',
          addons: [],
          qty: 1,
          added: null
        });
        page.toasts.clear();
      }
    },
    willUnmount() {
      page.toasts.clear();
    }
  });
  return vals(page);
}

function vals(page) {
  const fa = page.props.lang === 'fa';
  const L = fa ? 'fa' : 'en';
  const S = vfShell(page, 'product');
  const s = page.state;
  const m = v => VF_MONEY(v, fa);
  const C = vfCopy(S);
  const product = vfFindProduct(vfPageRoute(page.props).id) || VF_PRODUCTS[0];
  const base = product.price;
  const availableAddons = VF_ADDONS.filter(addon => !(product.noAddons || []).includes(addon.id));
  const hasSizes = !!product.sizes;
  const size = VF_SIZES.find(item => item.id === s.size);
  const chosenAddons = availableAddons.filter(addon => s.addons.includes(addon.id));
  const extra = chosenAddons.reduce((sum, addon) => sum + addon.price, 0);
  const unit = base + (hasSizes ? size.price : 0) + extra;
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
      const done = ok =>
        page._showToast({
          title: ok ? C.codeCopied.replace('{code}', vfTokenText(product.id)) : C.copyFailed
        });
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
      page._showToast({
        title: saving ? C.savedTitle : C.unsavedTitle,
        action: saving ? {label: C.viewSaved, href: S.href.saved} : undefined
      });
    },
    recentLabel: C.recentA + ' ' + C.recentB,
    hasRecent: vfRecentlyViewed().some(x => x !== product.id),
    available: product.inStock !== false,
    stock: product.stock,
    // No more than the shop has left (nine at most, as before).
    qtyMax: product.stock && product.stock.status === 'low' ? product.stock.count : 9,
    unavailable: product.inStock === false,
    category: S.shopLink(product.cat),
    productImages: vfProductImages(product, L),
    unitPrice: m(base + (hasSizes ? size.price : 0)),
    sizes: VF_SIZES.map(item => ({
      label: item.name[L],
      desc: item.detail[L] + ' · ' + (item.price ? '+' + m(item.price) : C.labels.base),
      value: item.id
    })),
    size: s.size,
    setSize: id => page.setState({size: id}),
    addons: availableAddons.map(addon => {
      const on = s.addons.includes(addon.id);
      return {
        label: addon.name[L] + ' · +' + m(addon.price),
        on,
        toggle: () =>
          page.setState({
            addons: on ? s.addons.filter(x => x !== addon.id) : [...s.addons, addon.id]
          })
      };
    }),
    qty: s.qty,
    setQty: q =>
      page.setState({
        qty: q
      }),
    qtyLabels: {
      dec: C.dec,
      inc: C.inc,
      value: C.quantity
    },
    addLabel:
      (product.inStock === false ? (fa ? 'ناموجود' : 'Sold out') : C.add) + ' · ' + m(total),
    totalLabel: m(total),
    add: () => {
      if (product.inStock === false) return;
      const st = page.props.store;
      if (st) {
        st.add({
          image: product.image,
          productId: product.id,
          token: product.id,
          size: hasSizes ? s.size : null,
          addons: chosenAddons.map(addon => addon.id),
          id:
            product.id +
            (hasSizes ? '-' + s.size : '') +
            (chosenAddons.length ? '-' + chosenAddons.map(addon => addon.id).join('+') : ''),
          unit,
          qty: s.qty,
          en: [product.id, vfLineDetail(product, hasSizes ? size : null, chosenAddons, 'en')],
          fa: [product.id, vfLineDetail(product, hasSizes ? size : null, chosenAddons, 'fa')]
        });
      }
      // A small bag panel confirms what was added and offers the next step.
      page.toasts.clear();
      page.setState({
        added: {
          line: {
            image: vfProductImage(product, L).src,
            name: product.id,
            meta:
              vfLineDetail(product, hasSizes ? size : null, chosenAddons, L) +
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
      const st = page.props.store;
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
      page.setState({
        added: null
      }),
    // Closes the panel; the link itself goes to the bag.
    checkout: () =>
      page.setState({
        added: null
      }),
    toasts: page.toasts,
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
        stock: p.stock,
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
