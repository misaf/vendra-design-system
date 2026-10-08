# RangeSlider

Dual-thumb price range. Accent fill between thumbs; mirrors in RTL. 44px thumb hit area.

```jsx
<RangeSlider
  min={0}
  max={10000000}
  step={100000}
  value={range}
  onChange={setRange}
  formatValue={v => money(v, lang)}
  labels={{min: 'Min price', max: 'Max price'}}
/>
```

## Usage

**Use when:** Price range filter in the shop.

**Don’t use when:** Don’t use where exact values matter (Input) or for single settings with few steps (ChoiceGroup).
