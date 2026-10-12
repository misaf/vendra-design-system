// Page behavior. Edit here, then run npm --prefix templates run build.
import React from 'react';
import {VFPage} from '../app/runtime.jsx';
import {vfCopy} from './copy.js';
import {VF_PRODUCTS, vfProductImage, vfProductSub} from '../_shared/catalog.js';
import {vfShell} from '../_shared/navigation.js';
export class Component extends VFPage {
  state = {
    ids: ['VF-8RD5WN', 'VF-4CJ6ZB', 'VF-9FA2KE']
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'saved');
    const L = S.lang;
    const st = this.props.store;
    const ids = st ? st.saved : this.state.ids;
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
      items: items.map((p, i) => ({
        ...S.productLink(p.id),
        images: [vfProductImage(p, L)],
        name: p.id,
        sub: vfProductSub(p, L),
        badge: p[L].badge,
        price: S.m(p.price),
        remove: () => {
          st
            ? st.toggleSave(p.id)
            : this.setState({
                ids: ids.filter(x => x !== p.id)
              });
          S.focusAfterRemoval('.ag-product__fav', i);
        }
      }))
    };
  }
}
