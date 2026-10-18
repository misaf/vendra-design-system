// StorefrontHome: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main id="main" tabIndex={-1} className="vf-shopping vf-shopping--home">
            <section className="vf-home-top tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-7 tw:px-gutter tw:pb-0">
              <DS.SectionHeader level="h1" title={v.t?.title} accent={v.t?.titleAccent} />
              <DS.Carousel
                className="vf-home-category-circles"
                label={v.t?.categoriesLabel}
                perView={9}
                perViewMobile={4.4}
                itemMin="96px"
                gap="20px"
                arrows={v.desk}
                prevLabel={v.t?.categoriesPrev}
                nextLabel={v.t?.categoriesNext}
              >
                {list(v.categories).map((c, $index) => (
                  <React.Fragment key={$index}>
                    <DS.CategoryCard
                      frame="circle"
                      label={c?.label}
                      href={c?.href}
                      image={c?.image}
                      sizes="(max-width: 640px) 22vw, 120px"
                    />
                  </React.Fragment>
                ))}
              </DS.Carousel>
            </section>
            {v.featured?.length ? (
              <section className="vf-home-featured tw:mx-auto tw:max-w-page tw:pt-8 tw:px-4 tw:md:px-gutter tw:pb-0">
                <div className="vf-home-featured-band tw:bg-accent-soft tw:rounded-md tw:p-4 tw:md:p-5 tw:min-[1024px]:p-7 tw:flex tw:flex-col tw:gap-5 tw:md:gap-6">
                  <DS.SectionHeader
                    eyebrow={v.t?.featEb}
                    title={v.t?.featA}
                    accent={v.t?.featB}
                    action={
                      <DS.Button
                        variant="ghost"
                        iconEnd="arrow-right"
                        href={v.readyHref}
                        size={v.mob ? 'sm' : 'md'}
                        className="vf-home-featured-link tw:min-h-tap"
                        aria-label={v.mob ? v.t?.featAllLabel : undefined}
                      >
                        <>{v.mob ? v.t?.featAllShort : v.t?.featAll}</>
                      </DS.Button>
                    }
                  />
                  <p className="tw:m-0 tw:-mt-3 tw:text-secondary tw:max-w-measure">
                    <>{v.t?.featText}</>
                  </p>
                  <ul className="vf-home-featured-grid tw:list-none tw:m-0 tw:p-0 tw:grid tw:grid-cols-2 tw:min-[1024px]:grid-cols-4 tw:gap-x-3 tw:md:gap-x-5 tw:gap-y-6">
                    {list(v.featured).map((p, $index) => (
                      <li key={$index}>
                        <DS.ProductCard
                          images={p?.images}
                          name={p?.name}
                          subtitle={p?.sub}
                          price={p?.price}
                          stock={p?.stock}
                          badge={p?.badge}
                          badgeTone="accent"
                          frame={v.frame}
                          placeholder={v.t?.photo}
                          favLabel={v.t?.save}
                          favorite={p?.fav}
                          onFavorite={p?.toggleFav}
                          href={p?.href}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ) : null}
            <section className="vf-home-categories tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0">
              <DS.SectionHeader title={v.t?.catA} accent={v.t?.catB} />
              <DS.Carousel
                className="vf-home-category-row"
                label={v.t?.catLabel}
                perView={4}
                perViewMobile={2.2}
                itemMin="150px"
                gap="20px"
                arrows={v.desk}
                prevLabel={v.t?.catPrev}
                nextLabel={v.t?.catNext}
              >
                {list(v.occasions).map((c, $index) => (
                  <React.Fragment key={$index}>
                    <DS.CategoryCard
                      label={c?.label}
                      count={c?.count}
                      frame={v.frame}
                      aspect="1/1"
                      href={c?.href}
                    />
                  </React.Fragment>
                ))}
              </DS.Carousel>
            </section>
            <section className="vf-home-arrivals tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-8 tw:px-gutter tw:pb-0">
              <DS.SectionHeader eyebrow={v.t?.newEb} title={v.t?.newA} accent={v.t?.newB} />
              <DS.Carousel
                className="vf-home-product-row"
                label={v.t?.newLabel}
                perView={4}
                perViewMobile={2.2}
                itemMin="200px"
                gap="20px"
                arrows={v.desk}
                prevLabel={v.t?.prev}
                nextLabel={v.t?.next}
              >
                {list(v.products).map((p, $index) => (
                  <React.Fragment key={$index}>
                    <DS.ProductCard
                      images={p?.images}
                      priority={$index < 2}
                      name={p?.name}
                      subtitle={p?.sub}
                      price={p?.price}
                      stock={p?.stock}
                      badge={p?.badge}
                      badgeTone="accent"
                      frame={v.frame}
                      placeholder={v.t?.photo}
                      favLabel={v.t?.save}
                      favorite={p?.fav}
                      onFavorite={p?.toggleFav}
                      href={p?.href}
                    />
                  </React.Fragment>
                ))}
              </DS.Carousel>
            </section>
            {v.weddings ? (
              <section
                aria-labelledby="vf-home-weddings-title"
                className="vf-home-weddings tw:mx-auto tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0"
              >
                <div className="vf-home-weddings-band tw:bg-inverse tw:text-on-inverse ag-on-inverse tw:rounded-md tw:p-6 tw:md:p-8 tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-x-8 tw:gap-y-5">
                  <div className="tw:[flex:1_1_320px] tw:max-w-prose tw:flex tw:flex-col tw:gap-3">
                    <div className="ag-eyebrow tw:text-inverse-quiet!">
                      <>{v.t?.wedEb}</>
                    </div>
                    <h2
                      id="vf-home-weddings-title"
                      className="tw:m-0 tw:font-display tw:font-medium tw:text-2xl tw:tracking-display"
                    >
                      <>{v.t?.wedA}</> <em className="vf-home-weddings-accent">{v.t?.wedB}</em>
                    </h2>
                    <p className="tw:m-0 tw:text-inverse-quiet tw:max-w-measure">
                      <>{v.t?.wedText}</>
                    </p>
                  </div>
                  <DS.Button variant="primary" iconEnd="arrow-right" href={v.weddings?.href}>
                    <>{v.t?.wedCta}</>
                  </DS.Button>
                </div>
              </section>
            ) : null}
            {v.posts?.length ? (
              <section className="vf-home-journal tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0">
                <DS.SectionHeader
                  eyebrow={v.t?.postEb}
                  title={v.t?.postA}
                  accent={v.t?.postB}
                  action={
                    <DS.Button variant="ghost" iconEnd="arrow-right" href={v.href?.journal}>
                      <>{v.t?.postAll}</>
                    </DS.Button>
                  }
                />
                <DS.Carousel
                  className="vf-home-journal-row"
                  label={v.t?.postLabel}
                  perView={3}
                  perViewMobile={1.2}
                  itemMin="240px"
                  gap="20px"
                  arrows={v.desk}
                  prevLabel={v.t?.postPrev}
                  nextLabel={v.t?.postNext}
                >
                  {list(v.posts).map((post, $index) => (
                    <React.Fragment key={$index}>
                      <DS.BlogCard
                        layout="stack"
                        frame="soft"
                        aspect="4/3"
                        headingLevel={3}
                        title={post?.title}
                        image={post?.image}
                        excerpt={post?.excerpt}
                        meta={post?.meta}
                        href={post?.href}
                      />
                    </React.Fragment>
                  ))}
                </DS.Carousel>
              </section>
            ) : null}
            {v.newsletter ? (
              <section
                aria-labelledby="vf-news-title"
                className="vf-home-newsletter tw:mx-auto tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0"
              >
                <div className="vf-home-newsletter-band tw:bg-sunken tw:rounded-md tw:p-6 tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-x-8 tw:gap-y-5">
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
                </div>
              </section>
            ) : null}
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
