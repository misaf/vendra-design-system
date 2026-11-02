// StorefrontPost: the page inside the storefront shell.
import React from 'react';
import {list} from '../app/runtime.js';
import {StorefrontPostLayout} from '../app/layouts/StorefrontPostLayout/StorefrontPostLayout.jsx';
import {StorefrontPostLoading} from '../app/organisms/StorefrontPostLoading/StorefrontPostLoading.jsx';
import {StorefrontPostMissing} from '../app/organisms/StorefrontPostMissing/StorefrontPostMissing.jsx';
import {StorefrontPostHeading} from '../app/organisms/StorefrontPostHeading/StorefrontPostHeading.jsx';
import {StorefrontPostBlocks} from '../app/organisms/StorefrontPostBlocks/StorefrontPostBlocks.jsx';
import {StorefrontPostClassic} from '../app/organisms/StorefrontPostClassic/StorefrontPostClassic.jsx';
import {StorefrontPostActions} from '../app/organisms/StorefrontPostActions/StorefrontPostActions.jsx';
import {StorefrontPostSocial} from '../app/organisms/StorefrontPostSocial/StorefrontPostSocial.jsx';
import {StorefrontPostProducts} from '../app/organisms/StorefrontPostProducts/StorefrontPostProducts.jsx';
import {StorefrontPostRelated} from '../app/organisms/StorefrontPostRelated/StorefrontPostRelated.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontPostLayout
            showArticle={v.hasPost}
            feedback={
              <>
                {v.loading ? (
                  <StorefrontPostLoading title={v.t?.title} message={v.migration?.loading} />
                ) : null}
                {v.missing ? (
                  <StorefrontPostMissing
                    title={v.migration?.missing}
                    backLabel={v.migration?.back}
                    journalHref={v.href?.journal}
                  />
                ) : null}
              </>
            }
            article={
              <>
                <StorefrontPostHeading
                  journalHref={v.href?.journal}
                  backLabel={v.t?.back}
                  meta={v.t?.meta}
                  title={v.t?.title}
                  intro={v.t?.lede}
                />
                {v.hasBlocks ? (
                  <StorefrontPostBlocks
                    blocks={list(v.blocks).map(block => ({
                      paragraph: block?.paragraph,
                      heading: block?.heading,
                      quote: block?.quote,
                      image: block?.image,
                      tips: block?.tips,
                      value: block?.value,
                      caption: block?.caption,
                      photo: block?.photo,
                      tipsItems: list(block?.value)
                    }))}
                  />
                ) : null}
                {v.hasClassic ? (
                  <StorefrontPostClassic
                    image={v.image}
                    paragraphsBefore={list(v.paras1)}
                    quote={v.t?.quote}
                    heading={v.t?.h2}
                    paragraphsAfter={list(v.paras2)}
                  />
                ) : null}
              </>
            }
            actions={
              <StorefrontPostActions
                copyLabel={v.copyLabel}
                onCopy={v.copy}
                shopLabel={v.t?.shopIt}
                shopHref={v.href?.shop}
              />
            }
            recommendations={
              <>
                <StorefrontPostSocial
                  whatsappLabel="WhatsApp"
                  whatsappHref={v.shareWa}
                  showInstagram={Boolean(v.instagram)}
                  instagramLabel="Instagram"
                  instagramHref={v.instagram?.url}
                />
                <StorefrontPostProducts products={list(v.storyProducts)} />
              </>
            }
            related={
              <StorefrontPostRelated
                title={v.t?.moreA}
                accent={v.t?.moreB}
                stories={list(v.related)}
              />
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
