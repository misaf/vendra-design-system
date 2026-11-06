import React from 'react';

export function StorefrontHomeLayout({
  top,
  featured,
  occasions,
  arrivals,
  weddings,
  journal,
  newsletter,
  showFeatured,
  showWeddings,
  showJournal,
  showNewsletter
}) {
  return (
    <main id="main" tabIndex={-1} className="vf-shopping vf-shopping--home">
      <section className="vf-home-top tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-7 tw:px-gutter tw:pb-0">
        {top}
      </section>
      {showFeatured ? (
        <section className="vf-home-featured tw:mx-auto tw:max-w-page tw:pt-8 tw:px-4 tw:md:px-gutter tw:pb-0">
          <div className="vf-home-featured-band tw:bg-accent-soft tw:rounded-md tw:p-4 tw:md:p-5 tw:min-[1024px]:p-7 tw:flex tw:flex-col tw:gap-5 tw:md:gap-6">
            {featured}
          </div>
        </section>
      ) : null}
      <section
        aria-labelledby="vf-home-occasions-title"
        className="vf-home-categories tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0"
      >
        {occasions}
      </section>
      <section
        aria-labelledby="vf-home-studio-title"
        className="vf-home-arrivals tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-8 tw:px-gutter tw:pb-0"
      >
        {arrivals}
      </section>
      {showWeddings ? (
        <section
          aria-labelledby="vf-home-weddings-title"
          className="vf-home-weddings tw:mx-auto tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0"
        >
          <div className="vf-home-weddings-band tw:bg-inverse tw:text-on-inverse ag-on-inverse tw:rounded-md tw:p-6 tw:md:p-8 tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-x-8 tw:gap-y-5">
            {weddings}
          </div>
        </section>
      ) : null}
      {showJournal ? (
        <section
          aria-labelledby="vf-home-journal-title"
          className="vf-home-journal tw:mx-auto tw:flex tw:flex-col tw:gap-6 tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0"
        >
          {journal}
        </section>
      ) : null}
      {showNewsletter ? (
        <section
          aria-labelledby="vf-news-title"
          className="vf-home-newsletter tw:mx-auto tw:max-w-page tw:pt-9 tw:px-gutter tw:pb-0"
        >
          <div className="vf-home-newsletter-band tw:bg-sunken tw:rounded-md tw:p-6 tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-x-8 tw:gap-y-5">
            {newsletter}
          </div>
        </section>
      ) : null}
    </main>
  );
}
