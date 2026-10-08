# Accordion

Disclosure list for FAQ, care and delivery info. 60px rows, hairline dividers, chevron rotates.

```jsx
<Accordion
  items={[
    {id: 'care', title: 'Flower care', content: 'Trim stems every 2 days.\nKeep away from fruit.'}
  ]}
  defaultOpenId="care"
/>
```

## Usage

**Use when:** FAQ, care instructions and product detail sections.

**Don’t use when:** Don’t hide essential info (price, delivery date) in a collapsed panel, or nest accordions.
