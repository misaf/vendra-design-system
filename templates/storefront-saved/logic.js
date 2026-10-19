// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {
  VF_PRODUCTS,
  vfProductBadge,
  vfProductImage,
  vfProductSub,
  vfTokenText
} from '../_shared/catalog.js';
import {vfShell} from '../_shared/navigation.js';
import {usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      ids: ['VF-8RD5WN', 'VF-4CJ6ZB', 'VF-9FA2KE'],
      removed: null
    };
  });
  useStorefrontPage(page);
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'saved');
  const L = S.lang;
  const st = page.props.store;
  const ids = st ? st.saved : page.state.ids;
  const C = vfCopy(S);
  const items = VF_PRODUCTS.filter(p => ids.includes(p.id));
  return {
    ...S,
    t: {
      ...S.t,
      ...C
    },
    hasItems: items.length > 0,
    noItems: !items.length,
    countLabel: C.designCount(items.length),
    removedMessage: page.state.removed
      ? C.removed.replace('{name}', vfTokenText(page.state.removed))
      : '',
    undoRemove: () => {
      const id = page.state.removed;
      if (!id) return;
      const store = page.props.store;
      const current = store ? store.saved : page.state.ids;
      const restored = current.includes(id) ? current : [...current, id];
      // Add only the removed code; never replace other saved changes with an earlier snapshot.
      if (store) {
        if (!current.includes(id)) store.toggleSave(id);
      } else page.setState({ids: restored});
      const index = VF_PRODUCTS.filter(product => restored.includes(product.id)).findIndex(
        product => product.id === id
      );
      page.setState({removed: null}, () => S.focusAfterRemoval('.ag-product__fav', index));
    },
    items: items.map(p => ({
      ...S.productLink(p.id),
      images: [vfProductImage(p, L)],
      name: p.id,
      sub: vfProductSub(p, L),
      badge: vfProductBadge(p, L),
      price: S.m(p.price),
      stock: p.stock,
      remove: () => {
        page.setState({removed: p.id}, () => document.getElementById('vf-saved-undo')?.focus());
        st
          ? st.toggleSave(p.id)
          : page.setState({
              ids: ids.filter(x => x !== p.id)
            });
      }
    }))
  };
}
