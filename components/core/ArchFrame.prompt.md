Arched image window — the brand's signature frame. Lazy-loads; zoom respects reduced motion.
```jsx
<ArchFrame src={p.image} alt="Wild Meadow bouquet" zoomOnHover />
<ArchFrame shape="circle" ring src={img} alt="" />
<ArchFrame shape="soft" ratio="4/3" placeholderLabel="Studio photo" />
```
Use `shape="soft"` only in dense grids. `ring` is for overlapping hero collages.

```jsx
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}><div>…text…</div><ArchFrame ratio="fill" minHeight="320px" src={img} alt=""/></div>
<ArchFrame tone="product" ratio="3/4" src={p.image} alt={p.name}/>
<ArchFrame size="thumb" src={p.image} alt="" style={{width:48}}/>
```

## Usage
**Use when:** Signature arched image window for hero, editorial and about images.

**Don’t use when:** Don’t use more than two per view, or for product grids (ProductCard already frames).
