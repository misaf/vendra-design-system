// StorefrontNotfound: the page inside the storefront shell.
import React from 'react';
import {list} from '../app/runtime.js';
import {StorefrontNotfoundLayout} from '../app/layouts/StorefrontNotfoundLayout/StorefrontNotfoundLayout.jsx';
import {StorefrontNotfoundMessage} from '../app/organisms/StorefrontNotfoundMessage/StorefrontNotfoundMessage.jsx';
import {StorefrontNotfoundActions} from '../app/organisms/StorefrontNotfoundActions/StorefrontNotfoundActions.jsx';
import {StorefrontNotfoundRecommendationHeading} from '../app/organisms/StorefrontNotfoundRecommendationHeading/StorefrontNotfoundRecommendationHeading.jsx';
import {StorefrontNotfoundProducts} from '../app/organisms/StorefrontNotfoundProducts/StorefrontNotfoundProducts.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontNotfoundLayout
            message={
              <StorefrontNotfoundMessage
                eyebrow={v.t?.code}
                title={v.t?.hA}
                accent={v.t?.hB}
                body={v.t?.hP}
              />
            }
            actions={
              <StorefrontNotfoundActions
                homeLabel={v.t?.home}
                homeHref={v.href?.home}
                searchLabel={v.t?.search}
                searchHref={v.href?.search}
              />
            }
            recommendationHeading={
              <StorefrontNotfoundRecommendationHeading title={v.t?.popA} accent={v.t?.popB} />
            }
            recommendations={
              <StorefrontNotfoundProducts
                products={list(v.items)}
                photoLabel={v.t?.photo}
                saveLabel={v.t?.save}
              />
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
