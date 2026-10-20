import React from 'react';

export function StorefrontShopLayout({heading, sidebar, categories, results, filters}) {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="vf-shopping vf-shopping--shop tw:mx-auto tw:flex tw:flex-col tw:gap-6"
    >
      {heading}
      <div className="vf-shop-columns tw:flex tw:flex-wrap tw:gap-x-7 tw:gap-y-4 tw:items-start">
        <aside className="vf-shop-sidebar tw:max-lg:hidden tw:flex tw:flex-col tw:gap-1 vf-sticky-panel tw:[flex:1_1_240px] tw:max-w-sidebar">
          {sidebar}
        </aside>
        {categories}
        <section className="vf-shop-results tw:min-w-0 tw:flex tw:flex-col tw:gap-5 tw:[flex:999_1_480px]">
          {results}
        </section>
      </div>
      {filters}
    </main>
  );
}
