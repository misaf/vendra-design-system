// StorefrontHome: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontHomeLayout} from '../app/layouts/StorefrontHomeLayout/StorefrontHomeLayout.jsx';
import {StorefrontHomeCategories} from '../app/organisms/StorefrontHomeCategories/StorefrontHomeCategories.jsx';
import {StorefrontHomeFeatured} from '../app/organisms/StorefrontHomeFeatured/StorefrontHomeFeatured.jsx';
import {StorefrontHomeOccasions} from '../app/organisms/StorefrontHomeOccasions/StorefrontHomeOccasions.jsx';
import {StorefrontHomeStudio} from '../app/organisms/StorefrontHomeStudio/StorefrontHomeStudio.jsx';
import {StorefrontHomeWeddings} from '../app/organisms/StorefrontHomeWeddings/StorefrontHomeWeddings.jsx';
import {StorefrontHomeJournal} from '../app/organisms/StorefrontHomeJournal/StorefrontHomeJournal.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontHomeLayout
          showFeatured={!!v.featured?.length}
          showWeddings={!!v.weddings}
          showJournal={!!v.posts?.length}
          showNewsletter={!!v.newsletter}
          top={
            <StorefrontHomeCategories
              categories={list(v.categories)}
              labels={{
                title: v.t?.title,
                titleAccent: v.t?.titleAccent,
                count: v.t?.categoryCount(list(v.categories).length),
                region: v.t?.categoriesLabel,
                previous: v.t?.categoriesPrev,
                next: v.t?.categoriesNext
              }}
            />
          }
          featured={
            <StorefrontHomeFeatured
              products={list(v.featured)}
              frame={v.frame}
              allHref={v.readyHref}
              labels={{
                eyebrow: v.t?.featEb,
                title: v.t?.featA,
                accent: v.t?.featB,
                allAccessible: v.t?.featAllLabel,
                allShort: v.t?.featAllShort,
                all: v.t?.featAll,
                description: v.t?.featText,
                count: v.t?.designCount(list(v.featured).length),
                region: v.t?.featLabel,
                previous: v.t?.featPrev,
                next: v.t?.featNext,
                photo: v.t?.photo,
                save: v.t?.save
              }}
            />
          }
          occasions={
            <StorefrontHomeOccasions
              occasions={list(v.occasions)}
              frame={v.frame}
              labels={{
                title: v.t?.catA,
                accent: v.t?.catB,
                description: v.t?.catText,
                count: v.t?.occasionCount(list(v.occasions).length),
                region: v.t?.catLabel,
                previous: v.t?.catPrev,
                next: v.t?.catNext
              }}
            />
          }
          arrivals={
            <StorefrontHomeStudio
              products={list(v.products)}
              frame={v.frame}
              shopHref={v.href?.shop}
              labels={{
                eyebrow: v.t?.newEb,
                title: v.t?.newA,
                accent: v.t?.newB,
                all: v.t?.newAll,
                description: v.t?.newText,
                count: v.t?.designCount(list(v.products).length),
                region: v.t?.newLabel,
                previous: v.t?.prev,
                next: v.t?.next,
                photo: v.t?.photo,
                save: v.t?.save
              }}
            />
          }
          weddings={
            <StorefrontHomeWeddings
              weddingHref={v.weddings?.href}
              contactHref={v.href?.contact}
              labels={{
                eyebrow: v.t?.wedEb,
                title: v.t?.wedA,
                accent: v.t?.wedB,
                description: v.t?.wedText,
                wedding: v.t?.wedCta,
                contact: v.t?.customCta
              }}
            />
          }
          journal={
            <StorefrontHomeJournal
              posts={list(v.posts)}
              journalHref={v.href?.journal}
              labels={{
                eyebrow: v.t?.postEb,
                title: v.t?.postA,
                accent: v.t?.postB,
                all: v.t?.postAll,
                description: v.t?.postText,
                count: v.t?.storyCount(list(v.posts).length),
                region: v.t?.postLabel,
                previous: v.t?.postPrev,
                next: v.t?.postNext
              }}
            />
          }
          newsletter={
            <>
              <div className="tw:[flex:1_1_280px] tw:flex tw:flex-col tw:gap-2">
                <h2
                  id="vf-news-title"
                  className="tw:m-0 tw:font-display tw:font-medium tw:text-xl tw:tracking-display"
                >
                  <>{v.t?.newsTitle}</>
                </h2>
                <p className="tw:m-0 tw:text-sm tw:text-secondary tw:max-w-measure">
                  <>{v.t?.newsBody}</>
                </p>
              </div>
              {v.newsletter?.open ? (
                <form
                  onSubmit={v.newsletter?.submit}
                  noValidate
                  className="vf-home-newsletter-form tw:[flex:1_1_320px] tw:max-w-narrow tw:flex tw:flex-col tw:gap-2"
                >
                  <label
                    id="vf-news-email-label"
                    htmlFor="vf-news-email"
                    className="ag-field__label"
                  >
                    <>{v.t?.newsLabel}</>
                  </label>
                  <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-3">
                    <div className="tw:[flex:1_1_220px]">
                      <DS.Input
                        id="vf-news-email"
                        aria-labelledby="vf-news-email-label"
                        value={v.newsletter?.draft}
                        onChange={v.newsletter?.setDraft}
                        error={v.newsletter?.error}
                        type="email"
                        dir="ltr"
                        autoComplete="email"
                      />
                    </div>
                    <DS.Button
                      type="submit"
                      loading={v.newsletter?.sending}
                      loadingLabel={v.t?.newsSending}
                      className="tw:h-[48px]!"
                    >
                      <>{v.t?.newsSubmit}</>
                    </DS.Button>
                  </div>
                </form>
              ) : null}
              {v.newsletter?.done ? (
                <p
                  id="vf-news-done"
                  tabIndex={-1}
                  role="status"
                  className="tw:m-0 tw:text-sm tw:[flex:1_1_320px] tw:max-w-narrow"
                >
                  <>{v.newsletter?.doneText}</>
                </p>
              ) : null}
            </>
          }
        />
      }
      sticky={<></>}
    />
  );
}
