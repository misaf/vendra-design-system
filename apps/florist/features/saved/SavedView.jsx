// StorefrontSaved: the page inside the storefront shell.
import React from 'react';
import * as DS from '../../shell/ds.js';
import {asList} from '../../shared/ui/as-list.js';
import {StorefrontSavedLayout} from './layouts/StorefrontSavedLayout/StorefrontSavedLayout.jsx';
import {StorefrontSavedRemovalNotice} from './organisms/StorefrontSavedRemovalNotice/StorefrontSavedRemovalNotice.jsx';
import {StorefrontSavedResults} from './organisms/StorefrontSavedResults/StorefrontSavedResults.jsx';
import {StorefrontSavedEmpty} from './molecules/StorefrontSavedEmpty/StorefrontSavedEmpty.jsx';
import {StorefrontProductAdded} from '../product/organisms/StorefrontProductAdded/StorefrontProductAdded.jsx';
import {Shell} from '../../shell/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontSavedLayout
          showResults={v.hasItems}
          showEmpty={v.noItems}
          heading={
            <DS.SectionHeader level="h1" eyebrow={v.countLabel} title={v.t?.hA} accent={v.t?.hB} />
          }
          notice={
            v.removedMessage ? (
              <StorefrontSavedRemovalNotice
                message={v.removedMessage}
                undo={{label: v.t?.undo, onClick: v.undoRemove}}
              />
            ) : null
          }
          results={
            v.hasItems ? (
              <StorefrontSavedResults
                products={asList(v.items)}
                labels={{photo: v.t?.photo, unsave: v.t?.unsave}}
              />
            ) : null
          }
          added={
            <StorefrontProductAdded
              open={v.addedOpen}
              onClose={v.closeAdded}
              lines={v.addedLines}
              sums={v.addedSums}
              checkout={{href: v.href?.bag, onClick: v.closeAdded}}
              undo={{label: v.t?.undoAdd, onClick: v.undoAdd}}
              labels={{
                title: v.t?.added,
                close: v.t?.dismiss,
                checkout: v.t?.checkout,
                continue: v.t?.keepShopping
              }}
            />
          }
          empty={
            v.noItems ? (
              <StorefrontSavedEmpty
                title={v.t?.emptyA}
                accent={v.t?.emptyB}
                body={v.t?.emptyP}
                browse={{href: v.href?.shop, label: v.t?.browse}}
              />
            ) : null
          }
        />
      }
      sticky={<></>}
    />
  );
}
