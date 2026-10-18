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
              <CollectionCarousel
                total={list(v.categories).length}
                countLabel={v.t?.categoryCount(list(v.categories).length)}
                className="vf-home-category-circles vf-home-carousel"
                label={v.t?.categoriesLabel}
                perView={9}
                perViewMobile={3.15}
                itemMin="140px"
                gap="20px"
                arrows={true}
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
                      sizes="(max-width: 767px) 45vw, 140px"
                    />
                  </React.Fragment>
                ))}
              </CollectionCarousel>
            </section>
            {v.featured?.length ? (
              <section className="vf-home-featured tw:mx-auto tw:max-w-page tw:pt-8 tw:px-4 tw:md:px-gutter tw:pb-0">
                <div className="vf-home-featured-band tw:bg-accent-soft tw:rounded-md tw:p-4 tw:md:p-5 tw:min-[1024px]:p-7 tw:flex tw:flex-col tw:gap-5 tw:md:gap-6">
                  <DS.SectionHeader
                    eyebrow={v.t?.featEb}
                    title={v.t?.featA}
                    accent={v.t?.featB}
                    action={
                      <>
                        <DS.Button
                          variant="ghost"
                          iconEnd="arrow-right"
                          href={v.readyHref}
                          size="sm"
                          className="vf-home-featured-link tw:min-h-tap tw:md:hidden!"
                          aria-label={v.t?.featAllLabel}
                        >
                          <>{v.t?.featAllShort}</>
                        </DS.Button>
                        <DS.Button
                          variant="ghost"
                          iconEnd="arrow-right"
                          href={v.readyHref}
                          className="vf-home-featured-link tw:min-h-tap tw:max-md:hidden!"
                        >
                          <>{v.t?.featAll}</>
                        </DS.Button>
                      </>
                    }
                  />
                  <p className="tw:m-0 tw:-mt-3 tw:text-secondary tw:max-w-measure">
                    <>{v.t?.featText}</>
                  </p>
                  <CollectionCarousel
                    total={list(v.featured).length}
                    countLabel={v.t?.designCount(list(v.featured).length)}
                    className="vf-home-featured-products vf-home-product-carousel vf-home-carousel"
                    label={v.t?.featLabel}
                    perView={4}
                    perViewMobile={1.15}
                    itemMin="220px"
                    gap="20px"
                    arrows={true}
                    prevLabel={v.t?.featPrev}
                    nextLabel={v.t?.featNext}
                  >
                    {list(v.featured).map((p, $index) => (
                      <React.Fragment key={$index}>
                        <DS.ProductCard
                          images={p?.images}
                          sizes="(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 25vw"
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
                  </CollectionCarousel>
                </div>
              </section>
            ) : null}
            <section
              aria-labelledby="vf-home-occasions-title"
              className="vf-home-categories tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0"
            >
              <DS.SectionHeader id="vf-home-occasions-title" title={v.t?.catA} accent={v.t?.catB} />
              <p className="tw:m-0 tw:text-secondary tw:max-w-measure">{v.t?.catText}</p>
              <CollectionCarousel
                total={list(v.occasions).length}
                countLabel={v.t?.occasionCount(list(v.occasions).length)}
                className="vf-home-category-row vf-home-carousel"
                label={v.t?.catLabel}
                perView={4}
                perViewMobile={1.15}
                itemMin="220px"
                gap="20px"
                arrows={true}
                prevLabel={v.t?.catPrev}
                nextLabel={v.t?.catNext}
              >
                {list(v.occasions).map((c, $index) => (
                  <React.Fragment key={$index}>
                    <DS.CategoryCard
                      label={c?.label}
                      count={c?.count}
                      image={c?.image}
                      sizes="(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 25vw"
                      frame={v.frame}
                      aspect="1/1"
                      href={c?.href}
                    />
                  </React.Fragment>
                ))}
              </CollectionCarousel>
            </section>
            <section
              aria-labelledby="vf-home-studio-title"
              className="vf-home-arrivals tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-8 tw:px-gutter tw:pb-0"
            >
              <DS.SectionHeader
                id="vf-home-studio-title"
                eyebrow={v.t?.newEb}
                title={v.t?.newA}
                accent={v.t?.newB}
                action={
                  <DS.Button variant="ghost" iconEnd="arrow-right" href={v.href?.shop}>
                    {v.t?.newAll}
                  </DS.Button>
                }
              />
              <p className="tw:m-0 tw:text-secondary tw:max-w-measure">{v.t?.newText}</p>
              <CollectionCarousel
                total={list(v.products).length}
                countLabel={v.t?.designCount(list(v.products).length)}
                className="vf-home-product-row vf-home-product-carousel vf-home-carousel"
                label={v.t?.newLabel}
                perView={4}
                perViewMobile={1.15}
                itemMin="220px"
                gap="20px"
                arrows={true}
                prevLabel={v.t?.prev}
                nextLabel={v.t?.next}
              >
                {list(v.products).map((p, $index) => (
                  <React.Fragment key={$index}>
                    <DS.ProductCard
                      images={p?.images}
                      sizes="(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 25vw"
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
              </CollectionCarousel>
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
                  <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-4">
                    <DS.Button variant="primary" iconEnd="arrow-right" href={v.weddings?.href}>
                      <>{v.t?.wedCta}</>
                    </DS.Button>
                    <a
                      className="tw:text-on-inverse! tw:underline tw:underline-offset-4 tw:min-h-tap tw:inline-flex tw:items-center"
                      href={v.href?.contact}
                    >
                      {v.t?.customCta}
                    </a>
                  </div>
                </div>
              </section>
            ) : null}
            {v.posts?.length ? (
              <section
                aria-labelledby="vf-home-journal-title"
                className="vf-home-journal tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0"
              >
                <DS.SectionHeader
                  id="vf-home-journal-title"
                  eyebrow={v.t?.postEb}
                  title={v.t?.postA}
                  accent={v.t?.postB}
                  action={
                    <DS.Button variant="ghost" iconEnd="arrow-right" href={v.href?.journal}>
                      <>{v.t?.postAll}</>
                    </DS.Button>
                  }
                />
                <p className="tw:m-0 tw:text-secondary tw:max-w-measure">{v.t?.postText}</p>
                <CollectionCarousel
                  total={list(v.posts).length}
                  countLabel={v.t?.storyCount(list(v.posts).length)}
                  className="vf-home-journal-row vf-home-carousel"
                  label={v.t?.postLabel}
                  perView={3}
                  perViewMobile={1.15}
                  itemMin="240px"
                  gap="20px"
                  arrows={true}
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
                </CollectionCarousel>
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

// Page-specific composition: keep scrolling in the shared Carousel and expose how much there is
// to browse. The measured overflow state also handles small catalogues and viewport changes.
function CollectionCarousel({total, countLabel, perView, label, ...props}) {
  const [overflow, setOverflow] = React.useState(null);
  return (
    <div
      className="vf-home-collection"
      data-items={total}
      data-fits-row={total <= perView ? 'true' : undefined}
      data-overflow={overflow == null ? undefined : String(overflow)}
    >
      <span className="vf-home-collection-count" aria-hidden="true">
        {countLabel}
      </span>
      <DS.Carousel
        {...props}
        label={`${label} · ${countLabel}`}
        perView={perView}
        onScrollStateChange={({canPrev, canNext}) => setOverflow(canPrev || canNext)}
      />
    </div>
  );
}
