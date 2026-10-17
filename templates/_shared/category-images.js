// Locally stored demonstration category photography, independent of product stock.
const VF_CATEGORY_IMAGES = [
  'bouquets',
  'boxes',
  'orchids',
  'bridal',
  'rose-bouquets',
  'baskets',
  'plants',
  'dried',
  'wreaths',
  'table',
  'wedding-cars',
  'gifts'
];

export function vfCategoryImage(slug) {
  if (!VF_CATEGORY_IMAGES.includes(slug)) return undefined;
  const base = (typeof window !== 'undefined' && window.VF_ASSET_BASE) || '../../';
  const path = base + 'assets/categories/' + slug;
  return {
    src: path + '.webp',
    srcSet: path + '-240.webp 240w, ' + path + '.webp 640w',
    width: 640,
    height: 640
  };
}
