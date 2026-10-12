// Page behavior. Edit here, then run npm --prefix templates run build.
import React from 'react';
import {VFPage} from '../app/runtime.jsx';
import {vfCopy} from './copy.js';
import {VF_PRODUCTS, vfProductImage, vfProductSub} from '../_shared/catalog.js';
import {vfShell} from '../_shared/navigation.js';
export class Component extends VFPage {
  renderVals() {
    const S = vfShell.call(this, this.props, 'notfound');
    const L = S.lang;
    const C = vfCopy(S);
    return {
      ...S,
      t: {
        ...S.t,
        ...C
      },
      items: VF_PRODUCTS.slice(0, 4).map(p => ({
        ...S.productLink(p.id),
        images: [vfProductImage(p, L)],
        name: p.id,
        sub: vfProductSub(p, L),
        price: S.m(p.price)
      }))
    };
  }
}
