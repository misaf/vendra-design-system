# Carousel

Horizontal snap row for categories and occasions. Scrollbar hidden, focusable (arrow keys scroll), RTL-aware.

```jsx
<Carousel label="Categories" perView={5}>
  {cats.map(c => (
    <CategoryCard key={c.id} {...c} />
  ))}
</Carousel>
```

Pair with SectionHeader through `ref` (`scrollPrev` / `scrollNext`) and `onScrollStateChange` — see [SectionHeader](../SectionHeader/README.md). On mobile it bleeds into the 16px gutter and shows 2.3 items.

Three ways to pass items — all give one snap slot per item:

```jsx
<Carousel label="Occasions"><Tile/><Tile/>{extra.map(x=><Tile key={x.id}/>)}</Carousel>   // nested arrays / fragments are flattened
<Carousel label="Occasions" items={occasions} renderItem={o=><Tile {...o}/>}/>
<Carousel label="Occasions" itemAs="contents"><ul data-snap-group>…</ul></Carousel>        // no wrappers; direct children snap
```

Wrap a list in an element with `data-snap-group` to have it flattened too (the wrapper itself is dropped).

## Usage

**Use when:** Horizontal rows of products or categories on mobile.

**Don’t use when:** Don’t use for content everyone must see — items off-screen are often missed. Don’t autoplay.
