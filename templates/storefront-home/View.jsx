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
            <section className="vf-home-band tw:mx-auto tw:max-w-page tw:pt-7 tw:px-gutter tw:pb-0 tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-x-8 tw:gap-y-4">
              <div className="tw:flex tw:flex-col tw:gap-3">
                <DS.SectionHeader level="h1" title={v.t?.heroA} accent={v.t?.heroB} />
                {v.delivery ? (
                  <>
                    <p className="vf-home-delivery tw:m-0 tw:flex tw:items-center tw:gap-2 tw:text-secondary">
                      <DS.Icon name="truck" size={18} />
                      <>{v.delivery}</>
                    </p>
                  </>
                ) : null}
              </div>
              <div className="tw:flex tw:gap-3 tw:flex-wrap">
                <DS.Button variant="primary" iconEnd="arrow-right" href={v.cta?.href}>
                  <>{v.cta?.label}</>
                </DS.Button>
                <DS.Button
                  variant="ghost"
                  iconStart="message-circle"
                  href={v.waHref}
                  target="_blank"
                >
                  <>{v.t?.wa}</>
                </DS.Button>
              </div>
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
            <section className="vf-home-categories tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0">
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
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
