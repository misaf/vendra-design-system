// StorefrontSearch: the page inside the storefront shell.
import React from 'react';
import {list} from '../app/runtime.js';
import {StorefrontSearchLayout} from '../app/layouts/StorefrontSearchLayout/StorefrontSearchLayout.jsx';
import {StorefrontSearchHeading} from '../app/organisms/StorefrontSearchHeading/StorefrontSearchHeading.jsx';
import {StorefrontSearchControls} from '../app/organisms/StorefrontSearchControls/StorefrontSearchControls.jsx';
import {StorefrontSearchPopular} from '../app/organisms/StorefrontSearchPopular/StorefrontSearchPopular.jsx';
import {StorefrontSearchResults} from '../app/organisms/StorefrontSearchResults/StorefrontSearchResults.jsx';
import {StorefrontSearchEmpty} from '../app/organisms/StorefrontSearchEmpty/StorefrontSearchEmpty.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontSearchLayout
            heading={<StorefrontSearchHeading title={v.t?.label} />}
            controls={
              <StorefrontSearchControls
                query={{
                  label: v.t?.label,
                  placeholder: v.t?.ph,
                  value: v.q,
                  onChange: v.setQ
                }}
                close={{label: v.t?.close, href: v.closeHref}}
              />
            }
            popular={
              v.empty ? (
                <StorefrontSearchPopular title={v.t?.popular} terms={list(v.popular)} />
              ) : null
            }
            results={
              v.hasResults ? (
                <StorefrontSearchResults countLabel={v.countLabel} results={list(v.results)} />
              ) : null
            }
            empty={
              v.noResults ? (
                <StorefrontSearchEmpty
                  countLabel={v.countLabel}
                  title={v.t?.noneA}
                  accent={v.t?.noneB}
                  body={v.t?.noneP}
                  retry={{label: v.t?.tryAgain, onClick: v.clearSearch}}
                  browse={{label: v.t?.browse, href: v.href?.shop}}
                />
              ) : null
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
