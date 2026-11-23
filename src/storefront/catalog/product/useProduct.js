// Page behavior. Edit here, then run npm run build.
import React from 'react';
import {vfSavedItems} from '../../customer/saved-items.js';
import {ToastQueue} from '../../../design-system/components/ToastRegion/ToastRegion.jsx';
import {vfCopy, vfProductHead} from './copy.js';
import {
  VF_ADDONS,
  VF_SIZES,
  vfProduct,
  vfProductBadge,
  vfProductImage,
  vfProductImages,
  vfProductSub
} from '../catalog.js';
import {vfRecentlyViewed, vfRememberViewed} from '../recently-viewed.js';
import {vfTokenText} from '../catalog.js';
import {vfProductQuote} from './quote.js';
import {VF_FA_DIGITS, VF_MONEY, vfSeparator} from '../../pricing/formatting.js';
import {vfShell} from '../../shell/shell-props.js';
import {vfPageRoute, vfRouteUrl} from '../../shell/routing.js';
import {vfFeatures} from '../../store/store-config.js';
import {VF_CATEGORY_COPY, VF_CATEGORY_ITEM} from '../categories.js';
import {usePageLogic} from '../../shell/page-state.js';
import {useStorefrontPage} from '../../shell/page-lifecycle.js';
import {vfSelectItem, vfShowList} from '../../../platform/browser/list-tracking.js';
import {vfRuntime} from '../../../platform/browser/runtime.js';

// A shared counter quote supplies validated choices through the product route.
function useProductSelection({product, lang, store, go}, route) {
  const [, refreshPreview] = React.useReducer(version => version + 1, 0);
  const selection = {size: route.size, addons: route.addons || [], qty: route.qty || 1};

  function select(patch) {
    const {line} = vfProductQuote(product, {...selection, ...patch}, store?.bag || []);
    const {size, addons, qty} = line;
    const next = {
      ...route,
      lang: lang === 'fa' ? 'fa' : 'en',
      view: 'product',
      id: product.id,
      cat: product.cat,
      size,
      addons,
      qty
    };
    if (go) {
      go(next, true);
      return;
    }

    // A standalone preview preserves its other parameters (?page=product, ?tenant=…).
    const query = new URLSearchParams(location.search);
    const canonical = new URL(vfRouteUrl(next), location.href);
    for (const key of ['size', 'addons', 'qty']) {
      if (canonical.searchParams.has(key)) query.set(key, canonical.searchParams.get(key));
      else query.delete(key);
    }
    const search = query.toString();
    history.replaceState(history.state, '', canonical.pathname + (search ? '?' + search : ''));
    refreshPreview();
  }

  return {selection, select};
}

export function useProduct(props) {
  const {product} = props;
  const route = vfPageRoute(props);
  const routeKey = JSON.stringify([product.id, route.size, route.addons, route.qty]);
  const {selection, select} = useProductSelection(props, route);
  const [confirmation, setConfirmation] = React.useState(null);
  if (confirmation && confirmation.routeKey !== routeKey) setConfirmation(null);

  const [toasts] = React.useState(() => new ToastQueue({maxVisibleToasts: 1}));
  React.useEffect(() => () => toasts.clear(), [routeKey, toasts]);

  const page = usePageLogic(props);
  useStorefrontPage(page);

  const viewedId = React.useRef(null);
  React.useEffect(() => {
    if (viewedId.current === product.id) return;
    viewedId.current = product.id;
    vfRememberViewed(product.id);
    vfRuntime.track.event('view_item', {
      items: [vfRuntime.track.item(product)],
      value: product.price
    });
  }, [product]);

  return vals(page, {
    selection,
    select,
    added: confirmation?.routeKey === routeKey ? confirmation.line : null,
    setAdded: line => setConfirmation(line ? {routeKey, line} : null),
    toasts
  });
}

function vals(page, {selection, select, added, setAdded, toasts}) {
  const fa = page.props.lang === 'fa';
  const L = fa ? 'fa' : 'en';
  const savedItems = vfSavedItems(page);
  const S = vfShell(page, 'product');
  const m = v => VF_MONEY(v, fa);
  const C = vfCopy(S);
  const {product, details} = page.props;
  const base = product.price;
  const availableAddons = VF_ADDONS.filter(addon => !(product.noAddons || []).includes(addon.id));
  const hasSizes = !!product.sizes;
  const {line, remaining, total} = vfProductQuote(product, selection, page.props.store?.bag || []);
  const {qty: quantity} = line;
  const size = VF_SIZES.find(item => item.id === line.size);
  const care = product.care?.[L] || C.careT;
  const recent = vfRecentlyViewed()
    .filter(x => x !== product.id)
    .slice(0, 4)
    .map(vfProduct);
  vfShowList(page, 'recent', recent);
  page.head = vfProductHead(product, L, details.description?.paragraphs[0] ?? '');
  const showToast = content => {
    toasts.clear();
    toasts.add(content, {timeout: 10_000});
  };
  return {
    ...S,
    t: {
      ...S.t,
      ...C,
      // Products have no names: the code is the title and the category says what it is.
      name: product.id,
      sub: vfProductSub(product, L),
      badge: vfProductBadge(product, L) || C.labels.vendraFlowers,
      cat: VF_CATEGORY_COPY[L][product.cat],
      careT: care,
      ship:
        product.same && vfFeatures().sameDay ? C.ship : C.labels.chooseYourDeliveryWindowAtCheckout
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
        showToast({
          title: ok ? C.codeCopied.replace('{code}', vfTokenText(product.id)) : C.copyFailed
        });
      // Without clipboard access, select the code and try the older copy command; the code stays selected either way.
      const fallback = () => {
        const codeElement = document.getElementById('vf-product-code');
        let ok = false;
        if (codeElement) {
          const range = document.createRange();
          range.selectNodeContents(codeElement);
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
    fav: savedItems.ids.includes(product.id),
    // Saving confirms with a toast that links to the saved list.
    toggleSave: () => {
      const saving = !savedItems.ids.includes(product.id);
      savedItems.toggle(product.id);
      showToast({
        title: saving ? C.savedTitle : C.unsavedTitle,
        action: saving ? {label: C.viewSaved, href: S.href.saved} : undefined
      });
    },
    recentLabel: C.recentA + ' ' + C.recentB,
    productId: product.id,
    hasRecent: vfRecentlyViewed().some(x => x !== product.id),
    available: product.inStock !== false,
    stock: product.stock,
    // No more than the shop has left (nine at most, as before).
    qtyMax: Math.max(1, Math.min(9, remaining)),
    unavailable: product.inStock === false || remaining === 0,
    category: S.shopLink(product.cat),
    productImages: vfProductImages(product, L),
    details: size?.price ? {...details, price: m(base + size.price)} : details,
    unitPriceLabel: availableAddons.length ? C.priceBeforeExtras : C.priceEach,
    selectionTotalLabel: C.selectionTotal(quantity),
    totalHint: line.addons.length ? C.totalWithExtras : C.totalDelivery,
    sizes: VF_SIZES.map(item => ({
      label: item.name[L],
      desc: item.detail[L] + vfSeparator(L) + (item.price ? '+' + m(item.price) : C.labels.base),
      value: item.id
    })),
    size: line.size || VF_SIZES[0].id,
    setSize: id => select({size: id}),
    addons: availableAddons.map(addon => {
      const on = line.addons.includes(addon.id);
      return {
        label: addon.name[L] + ' · +' + m(addon.price),
        on,
        toggle: () =>
          select({
            addons: on ? line.addons.filter(x => x !== addon.id) : [...line.addons, addon.id]
          })
      };
    }),
    qty: quantity,
    setQty: q =>
      select({
        qty: q
      }),
    qtyLabels: {
      decrease: C.decrease,
      increase: C.increase,
      value: C.quantity
    },
    addLabel:
      remaining === 0 && product.inStock !== false
        ? C.stockInBag
        : product.inStock === false
          ? fa
            ? 'ناموجود'
            : 'Sold out'
          : C.add,
    totalLabel: m(total),
    add: () => {
      if (product.inStock === false || remaining === 0) return;
      const st = page.props.store;
      if (st) {
        st.add(line, vfPageRoute(page.props).date);
      }
      // A small bag panel confirms what was added and offers the next step.
      toasts.clear();
      setAdded({
        image: vfProductImage(product, L),
        name: product.id,
        meta: line[L][1] + ' · × ' + (fa ? VF_FA_DIGITS(quantity) : quantity),
        total: m(total)
      });
    },
    addedOpen: !!added,
    addedLines: added ? [added] : [],
    addedSums: (() => {
      const st = page.props.store;
      if (!st || !st.bag || !added) return [];
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
    closeAdded: () => setAdded(null),
    // Navigate before dismissing the dialog, which unmounts the link's press handler.
    checkout: event => {
      if (
        page.props.go &&
        event &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey
      ) {
        event.preventDefault();
        page.props.go({view: 'bag', lang: L});
      }
      setAdded(null);
    },
    toasts,
    recent: recent.map((p, index) => ({
      ...S.productLink(p.id),
      images: [vfProductImage(p, L)],
      name: p.id,
      sub: vfProductSub(p, L),
      price: m(p.price),
      stock: p.stock,
      fav: savedItems.ids.includes(p.id),
      toggleFav: () => savedItems.toggle(p.id),
      select: vfSelectItem('recent', p, index)
    })),
    faq: [
      {
        id: 'care',
        title: C.care,
        content: care
      },
      {
        id: 'delivery',
        title: C.del,
        content: C.delT
      }
    ]
  };
}
