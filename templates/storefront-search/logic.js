// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {vfProductImage, vfProductSub, vfSearchProducts} from '../_shared/catalog.js';
import {vfShell} from '../_shared/navigation.js';
import {useLifecycle, usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
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
  const results = vfSearchProducts(page.state.q);
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
    hasResults: results.length > 0,
    noResults: !!q && !results.length,
    countLabel: C.resultCount(results.length),
    popular: pop.map(l => ({
      label: l,
      pick: () => {
        page.setState({
          q: l
        });
        page._report(l, 0);
      }
    })),
    results: results.map(p => ({
      ...S.productLink(p.id),
      image: vfProductImage(p, L),
      name: p.id,
      sub: vfProductSub(p, L),
      price: S.m(p.price)
    }))
  };
}
