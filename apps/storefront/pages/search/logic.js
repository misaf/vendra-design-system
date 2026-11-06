// Page behavior. Edit here, then run npm --prefix apps/storefront run build.
import {vfCopy} from './copy.js';
import {vfProductImage, vfProductSub, vfSearchProducts} from '../../shared/domain/catalog.js';
import {vfShell} from '../../shared/services/navigation.js';
import {vfPageRoute, vfRouteUrl} from '../../shared/services/routing.js';
import {useLifecycle, usePageLogic} from '../../shared/services/page-state.js';
import {useStorefrontPage} from '../../shared/services/page-lifecycle.js';
import {vfSelectItem, vfViewList} from '../../shared/services/list-tracking.js';
import {vfRuntime} from '../../shared/platform/runtime.js';
// Results update as the customer types; a search (and the result list it shows) is reported once
// the typing settles. A query that arrives with the address (a link, a reload, Back/Forward) shows
// its results at once, so their list is reported at once too.
const VF_SEARCH_SETTLE_MS = 1000;
const vfSearchQuery = page => (page.props.go ? vfPageRoute(page.props).q || '' : page.state.q);
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      q: vfPageRoute(page.props).q || ''
    };
    // view_item_list once per query shown, whichever way it arrived.
    page._listResults = text => {
      const key = text.trim().toLowerCase();
      if (!key || key === page._listedQuery) return;
      page._listedQuery = key;
      vfViewList('search', vfSearchProducts(text));
    };
    page._report = (text, delay) => {
      clearTimeout(page._searchTimer);
      page._typedQuery = text;
      if (!text.trim()) return;
      page._searchTimer = setTimeout(() => {
        vfRuntime.track.event('search', {
          search_term: text,
          results: vfSearchProducts(text).length
        });
        page._listResults(text);
      }, delay);
    };
  });
  useStorefrontPage(page);
  useLifecycle(page, {
    didMount() {
      page._shownQuery = vfSearchQuery(page);
      page._listResults(page._shownQuery);
    },
    didUpdate() {
      const query = vfSearchQuery(page);
      if (query === page._shownQuery) return;
      page._shownQuery = query;
      // Typing reports when it settles (_report); a query from the address reports now.
      if (query !== page._typedQuery) page._listResults(query);
    },
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
    closeHref: vfRouteUrl({
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
    results: results.map((p, index) => ({
      ...S.productLink(p.id),
      select: vfSelectItem('search', p, index),
      image: vfProductImage(p, L),
      name: p.id,
      sub: vfProductSub(p, L),
      price: S.m(p.price)
    }))
  };
}
