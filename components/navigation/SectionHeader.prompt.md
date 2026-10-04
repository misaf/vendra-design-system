Section title row: title + optional italic accent word, with actions on the same bottom-aligned line.
```jsx
const ref=React.useRef();const [s,setS]=React.useState({canPrev:false,canNext:true});
<SectionHeader eyebrow="Shop by" title="Every" accent="occasion" action={<Button variant="ghost" size="sm" iconEnd="arrow-right">See all</Button>}
  onPrev={()=>ref.current.scrollPrev()} onNext={()=>ref.current.scrollNext()} canPrev={s.canPrev} canNext={s.canNext}/>
<SnapScroller ref={ref} onScrollStateChange={setS} label="Occasions">…</SnapScroller>
```
Size: clamp(32px, 4vw, 48px); 34px under 768px.

## Usage
**Use when:** Title + optional link at the top of a page section.

**Don’t use when:** Don’t use as the page h1 on every section, or without content below it.
