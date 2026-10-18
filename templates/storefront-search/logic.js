// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {vfProductImage, vfProductSub, vfSearchProducts} from '../_shared/catalog.js';
import {vfShell} from '../_shared/navigation.js';
import {vfPageRoute, vfRouteParams} from '../_shared/routing.js';
import {useLifecycle, usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// Results update as the customer types; a search is reported once the typing settles.
const VF_SEARCH_SETTLE_MS = 1000;
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      q: vfPageRoute(page.props).q || ''
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
  const route = vfPageRoute(page.props);
  const query = page.props.go ? route.q || '' : page.state.q;
  const q = query.trim().toLowerCase();
  const C = vfCopy(S);
  const results = vfSearchProducts(query);
  const pop = C.popularTerms;
  const change = (value, delay = VF_SEARCH_SETTLE_MS) => {
    if (page.props.go) page.props.go({...route, view: 'search', lang: L, q: value}, true);
    else page.setState({q: value});
    page._report(value, delay);
  };
  return {
    ...S,
    t: {
      ...S.t,
      ...C,
      tryAgain: C.labels.tryAnotherSearch,
      browse: C.labels.browseTheShop
    },
    clearSearch: () => {
      change('');
      S.focus('vf-q');
    },
    closeHref:
      (page.props.go ? '' : '../app/') +
      vfRouteParams({
        ...page.props.store?.searchReturn,
        view: page.props.store?.searchReturn?.view || 'home',
        lang: L
      }),
    q: query,
    setQ: change,
    empty: !q,
    hasResults: results.length > 0,
    noResults: !!q && !results.length,
    countLabel: C.resultCount(results.length),
    popular: pop.map(l => ({
      label: l,
      pick: () => change(l, 0)
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
