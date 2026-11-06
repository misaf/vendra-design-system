# BlogCard

Journal tile: 4:5 arch image, eyebrow date, serif title, 3-line excerpt. Whole card is clickable via the title link.

```jsx
<BlogCard
  image={post.image}
  date="24 Sep 2026"
  title="A morning at the workbench"
  excerpt="Buckets arrive at seven…"
  onClick={open}
/>
```

## Usage

**Use when:** Journal posts in grids and “From the journal” rows.

**Don’t use when:** Don’t use for products (ProductCard) or category tiles (CategoryCard).
