import {notFound} from 'next/navigation';
import {Storefront} from '../../../../../storefront.jsx';
import exported from '../../../../../../_generated/pages.json';
import {VF_STORE} from '../../../../../../../shared/domain/store-config.js';

const fallback = '_fallback';
const {pages} = exported;

export function generateStaticParams() {
  return [
    ...Object.keys(pages).map(path => {
      const [lang, ...segments] = path.slice(0, -1).split('/');
      return {lang, segments};
    }),
    {lang: VF_STORE.languages[0], segments: [fallback]}
  ];
}

export default async function Page({params}) {
  const {lang, segments = []} = await params;
  if (!VF_STORE.languages.includes(lang)) notFound();
  if (segments.length === 1 && segments[0] === fallback)
    return (
      <Storefront>
        <meta name="robots" content="noindex, follow" />
        <noscript dangerouslySetInnerHTML={{__html: exported.fallback}} />
      </Storefront>
    );

  const page = pages[[lang, ...segments].join('/') + '/'];
  if (!page) notFound();
  const {html, tags, brandLinks} = page;
  return (
    <Storefront>
      <title>{tags.title}</title>
      {tags.meta
        .filter(({content}) => content != null && content !== '')
        .map(({key, name, content}) => (
          <meta key={name} {...{[key]: name, content}} />
        ))}
      {tags.links.map(({rel, hreflang, href}) => (
        <link key={hreflang || rel} rel={rel} hrefLang={hreflang} href={href} />
      ))}
      {tags.jsonLd && (
        <script
          type="application/ld+json"
          data-ag-seo=""
          dangerouslySetInnerHTML={{__html: tags.jsonLd}}
        />
      )}
      {brandLinks.map(link => (
        <link key={link.rel + (link.sizes || '')} {...link} />
      ))}
      <div id="vf-initial-page" suppressHydrationWarning dangerouslySetInnerHTML={{__html: html}} />
      <script
        dangerouslySetInnerHTML={{
          __html: "document.getElementById('vf-initial-page').inert = true;"
        }}
      />
    </Storefront>
  );
}
