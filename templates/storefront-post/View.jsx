// StorefrontPost: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontPostLayout} from '../app/layouts/StorefrontPostLayout/StorefrontPostLayout.jsx';
import {StorefrontPostLoading} from '../app/organisms/StorefrontPostLoading/StorefrontPostLoading.jsx';
import {StorefrontPostMissing} from '../app/organisms/StorefrontPostMissing/StorefrontPostMissing.jsx';
import {StorefrontPostHeading} from '../app/organisms/StorefrontPostHeading/StorefrontPostHeading.jsx';
import {StorefrontPostBlocks} from '../app/organisms/StorefrontPostBlocks/StorefrontPostBlocks.jsx';
import {StorefrontPostClassic} from '../app/organisms/StorefrontPostClassic/StorefrontPostClassic.jsx';
import {StorefrontPostActions} from '../app/organisms/StorefrontPostActions/StorefrontPostActions.jsx';
import {StorefrontPostSocial} from '../app/organisms/StorefrontPostSocial/StorefrontPostSocial.jsx';
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
                <div className="vf-product-grid tw:grid tw:gap-5 tw:mt-5 tw:grid-cols-2 tw:md:grid-cols-3">
                  {list(v.storyProducts).map((p, $index) => (
                    <React.Fragment key={$index}>
                      <DS.ProductCard
                        name={p?.name}
                        price={p?.price}
                        stock={p?.stock}
                        images={p?.images}
                        href={p?.href}
                        frame="soft"
                      />
                    </React.Fragment>
                  ))}
                </div>
              </>
            }
            related={
              <>
                <DS.SectionHeader title={v.t?.moreA} accent={v.t?.moreB} />
                <div className="vf-post-article-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))] tw:gap-y-7 tw:gap-x-5">
                  {list(v.related).map((r, $index) => (
                    <React.Fragment key={$index}>
                      <DS.BlogCard
                        frame="soft"
                        aspect="4/3"
                        title={r?.title}
                        image={r?.image}
                        excerpt={r?.excerpt}
                        meta={r?.meta}
                        href={r?.href}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </>
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
