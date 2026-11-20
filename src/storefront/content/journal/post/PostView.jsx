// StorefrontPost: the page inside the storefront shell.
import React from 'react';
import {asList} from '../../../shell/ui/as-list.js';
import {StorefrontPostLayout} from './components/StorefrontPostLayout/StorefrontPostLayout.jsx';
import {StorefrontPostLoading} from './components/StorefrontPostLoading/StorefrontPostLoading.jsx';
import {StorefrontPostMissing} from './components/StorefrontPostMissing/StorefrontPostMissing.jsx';
import {StorefrontPostHeading} from './components/StorefrontPostHeading/StorefrontPostHeading.jsx';
import {StorefrontPostBlocks} from './components/StorefrontPostBlocks/StorefrontPostBlocks.jsx';
import {StorefrontPostClassic} from './components/StorefrontPostClassic/StorefrontPostClassic.jsx';
import {StorefrontPostActions} from './components/StorefrontPostActions/StorefrontPostActions.jsx';
import {StorefrontPostSocial} from './components/StorefrontPostSocial/StorefrontPostSocial.jsx';
import {StorefrontPostProducts} from './components/StorefrontPostProducts/StorefrontPostProducts.jsx';
import {StorefrontPostRelated} from './components/StorefrontPostRelated/StorefrontPostRelated.jsx';
import {Shell} from '../../../shell/components/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
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
                  blocks={asList(v.blocks).map(block => ({
                    paragraph: block?.paragraph,
                    heading: block?.heading,
                    quote: block?.quote,
                    image: block?.image,
                    tips: block?.tips,
                    value: block?.value,
                    caption: block?.caption,
                    photo: block?.photo,
                    tipsItems: asList(block?.value)
                  }))}
                />
              ) : null}
              {v.hasClassic ? (
                <StorefrontPostClassic
                  image={v.image}
                  paragraphsBefore={asList(v.paras1)}
                  quote={v.t?.quote}
                  heading={v.t?.h2}
                  paragraphsAfter={asList(v.paras2)}
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
              <StorefrontPostProducts products={asList(v.storyProducts)} />
            </>
          }
          related={
            <StorefrontPostRelated
              title={v.t?.moreA}
              accent={v.t?.moreB}
              stories={asList(v.related)}
            />
          }
        />
      }
      sticky={<></>}
    />
  );
}
