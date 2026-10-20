import React from 'react';

export function StorefrontWeddingsLayout({
  heading,
  heroMedia,
  services,
  story,
  inquiryIntro,
  inquiry,
  feedback
}) {
  return (
    <main id="main" tabIndex={-1} className="vf-info tw:mx-auto">
      <section className="vf-weddings-hero tw:grid tw:gap-7 tw:items-center tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
        <div className="vf-weddings-heading tw:flex tw:flex-col tw:gap-5">{heading}</div>
        {heroMedia}
      </section>
      <section className="vf-weddings-services tw:grid tw:mt-9 tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr))] tw:gap-4h">
        {services}
      </section>
      <section className="tw:mt-9">{story}</section>
      <section
        id="inquiry"
        className="vf-weddings-inquiry tw:grid tw:gap-7 tw:items-start tw:mt-9 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr))]"
      >
        <div className="tw:flex tw:flex-col tw:gap-4">{inquiryIntro}</div>
        {inquiry}
      </section>
      {feedback}
    </main>
  );
}
