// Responsive sample journal photos. Relative paths also work under GitHub Pages' repo path.
export function vfJournalImage(asset) {
  if (!asset) return undefined;
  const base = (typeof window !== 'undefined' && window.VF_ASSET_BASE) || '../../';
  const src = /^(https?:|data:|\/)/.test(asset) ? asset : base + asset;
  if (asset.startsWith('assets/journal/') && asset.endsWith('.webp'))
    return {
      src,
      srcSet: src.replace(/\.webp$/, '-480.webp') + ' 480w, ' + src + ' 1200w',
      width: 1200,
      height: 900
    };
  return {
    src,
    ...(asset.startsWith('assets/categories/') ? {width: 640, height: 640} : {})
  };
}
