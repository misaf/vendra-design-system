// Page behavior. Edit here, then run npm --prefix templates run build.
import React from 'react';
import {VFPage} from '../app/runtime.jsx';
import {vfCopy} from './copy.js';
import {vfShell} from '../_shared/navigation.js';
export class Component extends VFPage {
  renderVals() {
    const S = vfShell.call(this, this.props, 'faq');
    const C = vfCopy(S);
    return {
      ...S,
      t: {
        ...S.t,
        ...C
      },
      groups: C.groups.map(([id, title, items]) => ({
        id: 'faq-' + id,
        title,
        open: id === 'delivery' ? 'zones' : undefined,
        items: items.map(([id, title, content]) => ({
          id,
          title,
          content
        }))
      }))
    };
  }
}
