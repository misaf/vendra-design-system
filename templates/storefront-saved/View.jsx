// StorefrontSaved: the page inside the storefront shell.
import React from 'react';
import {list} from '../app/runtime.js';
import {StorefrontSavedLayout} from '../app/layouts/StorefrontSavedLayout/StorefrontSavedLayout.jsx';
import {StorefrontSavedHeading} from '../app/organisms/StorefrontSavedHeading/StorefrontSavedHeading.jsx';
import {StorefrontSavedRemovalNotice} from '../app/organisms/StorefrontSavedRemovalNotice/StorefrontSavedRemovalNotice.jsx';
import {StorefrontSavedResults} from '../app/organisms/StorefrontSavedResults/StorefrontSavedResults.jsx';
import {StorefrontSavedEmpty} from '../app/organisms/StorefrontSavedEmpty/StorefrontSavedEmpty.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontSavedLayout
            showResults={v.hasItems}
            showEmpty={v.noItems}
            heading={
              <StorefrontSavedHeading eyebrow={v.countLabel} title={v.t?.hA} accent={v.t?.hB} />
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
                <>
                  <StorefrontSavedResults
                    products={list(v.items)}
                    labels={{photo: v.t?.photo, unsave: v.t?.unsave}}
                  />
                </>
              ) : null
            }
            empty={
              v.noItems ? (
                <>
                  <StorefrontSavedEmpty
                    title={v.t?.emptyA}
                    accent={v.t?.emptyB}
                    body={v.t?.emptyP}
                    browse={{href: v.href?.shop, label: v.t?.browse}}
                  />
                </>
              ) : null
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
