// StorefrontSearch: the page inside the storefront shell.
import React from 'react';
import {asList} from '../../../../shared/ui/as-list.js';
import {StorefrontSearchLayout} from './_components/StorefrontSearchLayout/StorefrontSearchLayout.jsx';
import {StorefrontSearchControls} from './_components/StorefrontSearchControls/StorefrontSearchControls.jsx';
import {StorefrontSearchPopular} from './_components/StorefrontSearchPopular/StorefrontSearchPopular.jsx';
import {StorefrontSearchResults} from './_components/StorefrontSearchResults/StorefrontSearchResults.jsx';
import {StorefrontSearchEmpty} from './_components/StorefrontSearchEmpty/StorefrontSearchEmpty.jsx';
import {Shell} from '../../../../components/storefront/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontSearchLayout
          heading={<h1 className="ag-display">{v.t?.label}</h1>}
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
              <StorefrontSearchPopular title={v.t?.popular} terms={asList(v.popular)} />
            ) : null
          }
          results={
            v.hasResults ? (
              <StorefrontSearchResults countLabel={v.countLabel} results={asList(v.results)} />
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
      }
      sticky={<></>}
    />
  );
}
