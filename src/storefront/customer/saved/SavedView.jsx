// StorefrontSaved: the page inside the storefront shell.
import React from 'react';
import {SectionHeader} from '../../../design-system/components/SectionHeader/SectionHeader.jsx';
import {asList} from '../../shell/ui/as-list.js';
import {StorefrontSavedLayout} from './_components/StorefrontSavedLayout/StorefrontSavedLayout.jsx';
import {StorefrontSavedRemovalNotice} from './_components/StorefrontSavedRemovalNotice/StorefrontSavedRemovalNotice.jsx';
import {StorefrontSavedResults} from './_components/StorefrontSavedResults/StorefrontSavedResults.jsx';
import {StorefrontSavedEmpty} from './_components/StorefrontSavedEmpty/StorefrontSavedEmpty.jsx';
import {StorefrontProductAdded} from '../../catalog/product/_components/StorefrontProductAdded/StorefrontProductAdded.jsx';
import {Shell} from '../../shell/components/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontSavedLayout
          showResults={v.hasItems}
          showEmpty={v.noItems}
          heading={
            <SectionHeader level="h1" eyebrow={v.countLabel} title={v.t?.hA} accent={v.t?.hB} />
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
