# Picture

One photo at the width the layout shows it. ProductCard, Gallery, CategoryCard, BlogCard, ArchFrame, LineItem and OrderSummary all render their photos with it, so their `image` (ArchFrame: `src`) takes the same thing: a URL, or a photo object.

```jsx
// From the API: commerce.imageFromApi(multimediaRecord, lang)
const photo = {
  src: 'rose-960.jpg',
  srcSet: 'rose-480.jpg 480w, rose-960.jpg 960w',
  sources: [
    {type: 'image/avif', srcSet: 'rose-480.avif 480w, rose-960.avif 960w'},
    {type: 'image/webp', srcSet: 'rose-480.webp 480w, rose-960.webp 960w'}
  ],
  width: 1200,
  height: 1500,
  placeholder: 'data:image/webp;base64,…',
  alt: 'Ivory roses in a linen box'
};

<Picture image={photo} sizes="(max-width: 640px) 50vw, 25vw" />
<ProductCard images={[photo]} priority … />
```

- `sources` puts the photo in a `<picture>`: the browser takes AVIF, then WebP, and falls back to `srcSet`. The `<picture>` has `display: contents`, so the frame's CSS sizes the `<img>` as it would without it.
- `sizes` says how wide the layout shows the photo; each component sets it for its own layout (ProductCard: the 2/3/4-column grid, LineItem and OrderSummary: the thumbnail).
- `width` and `height` keep the space before the photo arrives, where the frame has no aspect ratio of its own.
- `placeholder` (a tiny blurred `data:image/…` URI) fills the frame until the photo loads, then goes, so a transparent PNG never shows it.
- Photos load lazily. Pass `priority` to the photos a page shows first: the product page's first photo (Gallery does this itself), and the first cards on home and shop. They load at once at high priority. Use it on two or three photos at most.
- `alt` overrides `image.alt`; without either the photo is decorative (`alt=""`).
- `commerce.imageFromApi` builds the object from an API Multimedia record (`templates/API.md` → Photos). A record with only a URL gives `{src}`.

## Usage

**Use when:** Any photo inside your own layout; the photo components already use it.

**Don’t use when:** Don’t use for icons (Icon) or the brand's framed photos (ArchFrame, which renders a Picture inside the arch).
