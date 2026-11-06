// StorefrontHome: the page inside the storefront shell.
import React from 'react';
import {list} from '../app/runtime.js';
import {StorefrontHomeLayout} from '../app/layouts/StorefrontHomeLayout/StorefrontHomeLayout.jsx';
import {StorefrontHomeCategories} from '../app/organisms/StorefrontHomeCategories/StorefrontHomeCategories.jsx';
import {StorefrontHomeFeatured} from '../app/organisms/StorefrontHomeFeatured/StorefrontHomeFeatured.jsx';
import {StorefrontHomeOccasions} from '../app/organisms/StorefrontHomeOccasions/StorefrontHomeOccasions.jsx';
import {StorefrontHomeStudio} from '../app/organisms/StorefrontHomeStudio/StorefrontHomeStudio.jsx';
import {StorefrontHomeWeddings} from '../app/organisms/StorefrontHomeWeddings/StorefrontHomeWeddings.jsx';
import {StorefrontHomeJournal} from '../app/organisms/StorefrontHomeJournal/StorefrontHomeJournal.jsx';
import {StorefrontHomeNewsletter} from '../app/organisms/StorefrontHomeNewsletter/StorefrontHomeNewsletter.jsx';
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
            <StorefrontHomeNewsletter
              open={v.newsletter?.open}
              done={v.newsletter?.done}
              doneText={v.newsletter?.doneText}
              value={v.newsletter?.draft}
              error={v.newsletter?.error}
              sending={v.newsletter?.sending}
              onChange={v.newsletter?.setDraft}
              onSubmit={v.newsletter?.submit}
              labels={{
                title: v.t?.newsTitle,
                description: v.t?.newsBody,
                email: v.t?.newsLabel,
                sending: v.t?.newsSending,
                submit: v.t?.newsSubmit
              }}
            />
          }
        />
      }
      sticky={<></>}
    />
  );
}
