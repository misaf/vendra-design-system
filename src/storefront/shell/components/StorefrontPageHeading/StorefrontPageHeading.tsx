import React from 'react';
import type {ReactNode} from 'react';

const introClass = {
  page: 'vf-page-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty',
  info: 'vf-page-intro tw:m-0 tw:text-md tw:leading-body tw:text-secondary tw:text-pretty'
};

type PageHeadingProps = {
  level?: 'h1' | 'h2' | 'h3';
  eyebrow?: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  intro?: ReactNode;
  meta?: ReactNode;
  variant?: keyof typeof introClass;
};

export function StorefrontPageHeading({
  level: Heading = 'h1',
  eyebrow,
  title,
  accent,
  intro,
  meta,
  variant = 'page'
}: PageHeadingProps) {
  return (
    <>
      {eyebrow != null ? (
        <div className="vf-page-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
          {eyebrow}
        </div>
      ) : null}
      <Heading>
        {title}
        {accent != null ? (
          <>
            {' '}
            <em className="vf-page-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
              {accent}
            </em>
          </>
        ) : null}
      </Heading>
      {intro != null ? <p className={introClass[variant]}>{intro}</p> : null}
      {meta != null ? <div className="vf-page-meta tw:text-sm tw:text-quiet">{meta}</div> : null}
    </>
  );
}
