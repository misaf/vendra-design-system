// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {VF_PRODUCTS, vfNormalizeToken, vfProductImage, vfProductSub} from '../_shared/catalog.js';
import {vfShell} from '../_shared/navigation.js';
import {VF_CATEGORY_COPY} from '../_shared/translations/categories.js';
import {useLifecycle, usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// The products a search finds. A product code, typed whole or in part (3 or more characters), finds
// its product; so do its kind and description.
function vfSearchProducts(text) {
  const q = text.trim().toLowerCase();
  const code = vfNormalizeToken(q);
  const byCode = p => code.length >= 3 && vfNormalizeToken(p.id).includes(code);
  const words = p =>
    ['en', 'fa']
      .map(l => vfProductSub(p, l) + ' ' + p[l].sub + ' ' + VF_CATEGORY_COPY[l][p.cat])
      .join(' ')
      .toLowerCase();
  return q ? VF_PRODUCTS.filter(p => byCode(p) || words(p).includes(q)) : [];
}
// Results update as the customer types; a search is reported once the typing settles.
const VF_SEARCH_SETTLE_MS = 1000;
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      q: ''
    };
    page._report = (text, delay) => {
      clearTimeout(page._searchTimer);
      if (!text.trim()) return;
      page._searchTimer = setTimeout(
        () =>
          window.VF_TRACK.event('search', {
            search_term: text,
            results: vfSearchProducts(text).length
          }),
        delay
      );
    };
  });
  useStorefrontPage(page);
  useLifecycle(page, {
    willUnmount() {
      clearTimeout(page._searchTimer);
    }
  });
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'search');
  const L = S.lang;
  const q = page.state.q.trim().toLowerCase();
  const C = vfCopy(S);
  const res = vfSearchProducts(page.state.q);
  const pop = C.popularTerms;
  return {
    ...S,
    t: {
      ...S.t,
      ...C,
      tryAgain: C.labels.tryAnotherSearch,
      browse: C.labels.browseTheShop
    },
    clearSearch: () => {
      page.setState({
        q: ''
      });
      S.focus('vf-q');
    },
    q: page.state.q,
    setQ: value => {
      page.setState({
        q: value
      });
      page._report(value, VF_SEARCH_SETTLE_MS);
    },
    empty: !q,
    hasResults: res.length > 0,
    noResults: !!q && !res.length,
    countLabel: C.resultCount(res.length),
    popular: pop.map(l => ({
      label: l,
      pick: () => {
        page.setState({
          q: l
        });
        page._report(l, 0);
      }
    })),
    results: res.map(p => ({
      ...S.productLink(p.id),
      image: vfProductImage(p, L),
      name: p.id,
      sub: vfProductSub(p, L),
      price: S.m(p.price)
    }))
  };
}
