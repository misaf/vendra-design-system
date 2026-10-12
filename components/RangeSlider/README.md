# RangeSlider

Dual-thumb price range on React Aria's Slider. Accent fill between thumbs; mirrors in RTL (it follows the page's `lang`). 44px thumb hit area; pressing the track moves the nearest thumb. Screen readers read each thumb as `formatValue`.

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
