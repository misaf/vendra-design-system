// StorefrontSaved: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontSavedLayout} from '../app/layouts/StorefrontSavedLayout/StorefrontSavedLayout.jsx';
import {StorefrontSavedHeading} from '../app/organisms/StorefrontSavedHeading/StorefrontSavedHeading.jsx';
import {StorefrontSavedRemovalNotice} from '../app/organisms/StorefrontSavedRemovalNotice/StorefrontSavedRemovalNotice.jsx';
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
                  {list(v.items).map((p, $index) => (
                    <React.Fragment key={$index}>
                      <DS.ProductCard
                        images={p?.images}
                        name={p?.name}
                        subtitle={p?.sub}
                        price={p?.price}
                        stock={p?.stock}
                        badge={p?.badge}
                        badgeTone="accent"
                        frame="soft"
                        placeholder={v.t?.photo}
                        favLabel={v.t?.unsave}
                        favorite={true}
                        onFavorite={p?.remove}
                        href={p?.href}
                      />
                    </React.Fragment>
                  ))}
                </>
              ) : null
            }
            empty={
              v.noItems ? (
                <>
                  <DS.EmptyState
                    icon="heart"
                    title={v.t?.emptyA}
                    titleAccent={v.t?.emptyB}
                    body={v.t?.emptyP}
                  />
                  <DS.Button variant="primary" href={v.href?.shop}>
                    <>{v.t?.browse}</>
                  </DS.Button>
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
