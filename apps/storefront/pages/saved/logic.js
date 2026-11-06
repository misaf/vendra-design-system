// Page behavior. Edit here, then run npm --prefix apps/storefront run build.
import {vfCopy} from './copy.js';
import {
  VF_PRODUCTS,
  vfBagLine,
  vfLineDetail,
  vfLineQuantityMax,
  vfProductBadge,
  vfProductImage,
  vfProductSub,
  vfTokenText
} from '../../shared/domain/catalog.js';
import {vfShell} from '../../shared/services/navigation.js';
import {usePageLogic} from '../../shared/services/page-state.js';
import {useStorefrontPage} from '../../shared/services/page-lifecycle.js';
import {vfPageRoute} from '../../shared/services/routing.js';
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      ids: ['VF-8RD5WN', 'VF-4CJ6ZB', 'VF-9FA2KE'],
      removed: null,
      added: null
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
  const bag = st?.bag || [];
  const added = page.state.added;
  const C = vfCopy(S);
  const items = VF_PRODUCTS.filter(p => ids.includes(p.id));
  // A card's bag action: sold-out designs can't be added, designs with sizes choose one on the
  // product page (bag rows never edit sizes or extras), and the rest add one straight away.
  const bagAction = product => {
    const name = vfTokenText(product.id);
    if (product.inStock === false) return {kind: 'unavailable', label: C.soldOut};
    if (product.sizes)
      return {
        kind: 'size',
        label: C.chooseSize,
        ariaLabel: C.chooseSizeLabel.replace('{name}', name),
        href: S.productLink(product.id).href
      };
    const line = vfBagLine(product);
    const previousQty = bag.find(item => item.id === line.id)?.qty || 0;
    if (vfLineQuantityMax(line, bag) - previousQty <= 0)
      return {kind: 'unavailable', label: C.inBag};
    return {
      kind: 'add',
      label: C.add,
      ariaLabel: C.addLabel.replace('{name}', name),
      onAdd: () => {
        if (st) st.add(line, vfPageRoute(page.props).date, 'saved');
        page.setState({
          added: {
            id: line.id,
            previousQty,
            line: {
              image: vfProductImage(product, L),
              name: product.id,
              meta: vfLineDetail(product, null, [], L) + ' · × ' + S.n(1),
              total: S.m(line.unit)
            }
          }
        });
      }
    };
  };
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
    addedOpen: !!added,
    addedLines: added ? [added.line] : [],
    addedSums:
      added && st?.bag
        ? [
            {
              label: C.bagSubtotal.replace(
                '{count}',
                S.n(st.bag.reduce((count, line) => count + line.qty, 0))
              ),
              value: S.m(st.bag.reduce((sum, line) => sum + line.unit * line.qty, 0)),
              strong: true
            }
          ]
        : [],
    closeAdded: () => page.setState({added: null}),
    // Undo returns the bag line to what it was before this card added to it.
    undoAdd: () => {
      if (!added) return;
      if (st) {
        if (added.previousQty) st.setQty(added.id, added.previousQty);
        else st.remove(added.id);
      }
      page.setState({added: null});
    },
    items: items.map(p => ({
      ...S.productLink(p.id),
      images: [vfProductImage(p, L)],
      name: p.id,
      sub: vfProductSub(p, L),
      badge: vfProductBadge(p, L),
      price: S.m(p.price),
      stock: p.stock,
      action: bagAction(p),
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
