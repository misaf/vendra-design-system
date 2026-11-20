# SectionHeader

Section title row: title + optional italic accent word, with actions on the same bottom-aligned line.

```jsx
const carouselRef = React.useRef();
const [scroll, setScroll] = React.useState({canPrev: false, canNext: true});

<SectionHeader
  eyebrow="Shop by"
  title="Every"
  accent="occasion"
  action={<Button variant="ghost" size="sm" iconEnd="arrow-right">See all</Button>}
  onPrev={() => carouselRef.current.scrollPrev()}
  onNext={() => carouselRef.current.scrollNext()}
  canPrev={scroll.canPrev}
  canNext={scroll.canNext}
/>
<Carousel ref={carouselRef} onScrollStateChange={setScroll} label="Occasions">…</Carousel>
```

The title size follows `level` (h1–h3) and steps down on phones.

## Usage

**Use when:** Title + optional link at the top of a page section.

**Don’t use when:** Don’t use as the page h1 on every section, or without content below it.
