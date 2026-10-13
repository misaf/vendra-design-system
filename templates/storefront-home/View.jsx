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
            <section className="vf-home-hero tw:mx-auto tw:grid tw:items-center tw:max-w-page tw:py-8 tw:px-gutter tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))] tw:gap-8">
              <div className="tw:flex tw:flex-col tw:gap-5">
                <div className="vf-home-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
                  <>{v.t?.eyebrow}</>
                </div>
                <h1 className="vf-hero-title">
                  <>{v.t?.heroA} </>
                  <em className="vf-home-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                    <>{v.t?.heroB}</>
                  </em>
                </h1>
                <p className="vf-home-intro tw:text-secondary tw:m-0 tw:max-w-[44ch] tw:text-md tw:leading-body tw:text-pretty">
                  <>{v.t?.heroP}</>
                </p>
                <div className="tw:flex tw:gap-3 tw:flex-wrap">
                  <DS.Button variant="primary" size="lg" iconEnd="arrow-right" href={v.href?.shop}>
                    <>{v.t?.cta}</>
                  </DS.Button>
                  <DS.Button
                    variant="ghost"
                    size="lg"
                    iconStart="message-circle"
                    href={v.waHref}
                    target="_blank"
                  >
                    <>{v.t?.wa}</>
                  </DS.Button>
                </div>
              </div>
              <DS.ArchFrame ratio="4/5" placeholderLabel={v.t?.heroPh} alt="" />
            </section>
            <section className="vf-home-categories tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-5 tw:px-gutter tw:pb-0">
              <DS.SectionHeader eyebrow={v.t?.catEb} title={v.t?.catA} accent={v.t?.catB} />
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
                      href={c?.href}
                    />
                  </React.Fragment>
                ))}
              </DS.Carousel>
            </section>
            <section className="vf-home-arrivals tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0">
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
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
