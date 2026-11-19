import React from 'react';

export function StorefrontJournalLayout({
  heading,
  search,
  feedback,
  featured,
  stories,
  pagination
}) {
  return (
    <main id="main" tabIndex={-1} className="vf-info vf-journal tw:mx-auto">
      <div className="vf-journal-header tw:flex tw:flex-col tw:gap-4h tw:mb-7">{heading}</div>
      <div className="vf-journal-search tw:mb-5">{search}</div>
      {feedback}
      {featured}
      <div className="vf-journal-article-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))] tw:gap-y-7 tw:gap-x-5">
        {stories}
      </div>
      {pagination}
    </main>
  );
}
