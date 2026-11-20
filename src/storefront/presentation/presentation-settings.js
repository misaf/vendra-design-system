export const VF_MAX_COLLECTIONS = 20;
export const VF_COLLECTION_NAME_LIMIT = 60;
export const VF_SETUP_TEXT_LIMIT = 12000;

// The counter settings, kept on this device (the shop's tablet). The PIN only keeps a curious
// customer out of the settings; it is stored on the tablet as it is.
const VF_PRESENTATION_SETTINGS = {
  displayMode: 'tablet',
  displayLayout: 'single',
  captionMode: 'code',
  slideSeconds: 10,
  displayCollection: 'all',
  displayCategory: 'all',
  displayIds: [],
  showPrices: true,
  readyOnly: false,
  hideSoldOut: false,
  keepAwake: true,
  slideshow: false,
  pin: ''
};
const VF_SETTING_CHOICES = {
  displayMode: ['tablet', 'tv'],
  displayLayout: ['single', 'pair'],
  captionMode: ['photo', 'code', 'price'],
  slideSeconds: [6, 10, 15],
  displayCollection: ['all', 'category', 'selected']
};

export function vfNormalizeSettings(saved, products) {
  const settings = Object.fromEntries(
    Object.entries(VF_PRESENTATION_SETTINGS).map(([key, fallback]) => {
      const value = saved?.[key];
      const choices = VF_SETTING_CHOICES[key];
      return [
        key,
        typeof value === typeof fallback && (!choices || choices.includes(value)) ? value : fallback
      ];
    })
  );
  const ids = Array.isArray(settings.displayIds) ? settings.displayIds : [];
  settings.displayIds = [...new Set(ids)].filter(id => products.some(product => product.id === id));
  if (
    settings.displayCategory !== 'all' &&
    !products.some(product => product.cat === settings.displayCategory)
  )
    settings.displayCategory = 'all';
  return settings;
}

export function vfPortableSettings(settings, products) {
  const normalized = vfNormalizeSettings(settings, products);
  return Object.fromEntries(Object.entries(normalized).filter(([key]) => key !== 'pin'));
}

export function vfParseSettings(text, products) {
  try {
    return vfNormalizeSettings(JSON.parse(text || '{}'), products);
  } catch {
    return vfNormalizeSettings({}, products);
  }
}

export function vfParseCollections(text, products) {
  try {
    const stored = JSON.parse(text || '[]');
    if (!Array.isArray(stored)) return [];
    return stored
      .slice(0, VF_MAX_COLLECTIONS)
      .filter(value => value && typeof value.name === 'string' && value.name.trim())
      .map(value => ({
        name: value.name.trim().slice(0, VF_COLLECTION_NAME_LIMIT),
        settings: vfPortableSettings(value.settings, products)
      }));
  } catch {
    return [];
  }
}

export function vfSerializeSetup(settings, products) {
  return JSON.stringify({version: 1, settings: vfPortableSettings(settings, products)});
}

export function vfSetupLink(address, lang, settings, products) {
  const url = new URL(address);
  url.search = new URLSearchParams({
    view: 'presentation',
    lang,
    display: vfSerializeSetup(settings, products)
  }).toString();
  url.hash = '';
  return url.href;
}

export function vfSharedSetup(address) {
  try {
    return new URL(address).searchParams.get('display')?.slice(0, VF_SETUP_TEXT_LIMIT) || '';
  } catch {
    return '';
  }
}

export function vfImportSetup(input, pin, products) {
  try {
    const text = input.trim();
    const value = JSON.parse(
      text.startsWith('{') ? text : new URL(text).searchParams.get('display')
    );
    if (
      value?.version !== 1 ||
      !value.settings ||
      typeof value.settings !== 'object' ||
      Array.isArray(value.settings)
    )
      return null;
    const portable = vfPortableSettings(value.settings, products);
    if (
      Object.entries(value.settings).some(
        ([key, value]) => key in portable && JSON.stringify(value) !== JSON.stringify(portable[key])
      )
    )
      return null;
    return {...portable, pin};
  } catch {
    return null;
  }
}
