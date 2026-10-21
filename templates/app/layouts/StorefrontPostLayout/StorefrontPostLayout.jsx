import React from 'react';

export function StorefrontPostLayout({
  feedback,
  showArticle,
  article,
  actions,
  recommendations,
  related
}) {
  return (
    <main id="main" tabIndex={-1} className="vf-info tw:mx-auto">
      {feedback}
      {showArticle ? (
        <div className="vf-reading tw:max-w-wide tw:mx-auto">
          <article className="vf-post-article tw:max-w-wide tw:my-0 tw:mx-auto tw:flex tw:flex-col tw:gap-5">
            {article}
            <div className="vf-post-actions tw:flex tw:gap-3 tw:flex-wrap tw:pt-2 tw:[border-top:1px_solid_var(--border-subtle)]">
              {actions}
            </div>
          </article>
          <section className="tw:mt-7">{recommendations}</section>
          <section className="vf-post-related tw:flex tw:flex-col tw:mt-9 tw:gap-5h">
            {related}
          </section>
        </div>
      ) : null}
    </main>
  );
}
