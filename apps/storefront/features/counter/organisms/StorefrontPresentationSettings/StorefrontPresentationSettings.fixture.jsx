import React from 'react';
import {StorefrontPresentationSettings} from './StorefrontPresentationSettings.jsx';

const copy = {
  en: {
    open: 'Open setup',
    edit: 'Open settings',
    limited: 'Open without optional capabilities',
    setupTitle: 'Set up display',
    settings: 'Display settings',
    setupIntro: 'Choose the designs for your display.',
    leave: 'Leave presentation',
    done: 'Done',
    startDisplay: 'Start display',
    startFullscreen: 'Start in fullscreen',
    savedCollections: 'Saved collections',
    savedName: 'Studio selection',
    deleteCollection: 'Delete collection',
    displayMode: 'Display mode',
    tablet: 'Tablet',
    tv: 'TV',
    displayCollection: 'Display collection',
    allDesigns: 'All designs',
    byCategory: 'By category',
    selectedDesigns: 'Selected designs',
    displayCategory: 'Display category',
    flowers: 'Flowers',
    boxes: 'Boxes',
    collectionSearch: 'Search designs',
    selectionCount: 'Selected',
    useShortlist: 'Use shortlist',
    previewCollection: 'Collection preview',
    emptyCollection: 'Choose at least one design',
    collectionName: 'Collection name',
    saveCollection: 'Save collection',
    displayLayout: 'Display layout',
    singlePhoto: 'Single photo',
    pairedPhotos: 'Paired photos',
    captions: 'Captions',
    photoOnly: 'Photo only',
    photoCode: 'Photo and code',
    photoPrice: 'Photo and price',
    slideTiming: 'Slide timing',
    seconds: 'seconds',
    showPrices: 'Show prices',
    readyOnly: 'Ready designs only',
    hideSoldOut: 'Hide sold-out designs',
    keepAwake: 'Keep screen awake',
    fullscreen: 'Fullscreen now',
    slideshow: 'Slideshow',
    slideshowHint: 'Advance through the selected designs.',
    configuration: 'Configuration transfer',
    configurationHint: 'Move display settings between devices.',
    configurationText: 'Configuration text',
    configurationError: 'The configuration could not be imported',
    exportSetup: 'Export configuration',
    importSetup: 'Import configuration',
    setupLink: 'Setup link',
    pinSet: 'A PIN is set',
    removePin: 'Remove PIN',
    pin: 'Display PIN',
    pinHint: 'Enter four digits',
    eligible: 'designs available'
  },
  fa: {
    open: 'باز کردن راه‌اندازی',
    edit: 'باز کردن تنظیمات',
    limited: 'نمایش بدون قابلیت‌های اختیاری',
    setupTitle: 'راه‌اندازی نمایش',
    settings: 'تنظیمات نمایش',
    setupIntro: 'طرح‌های نمایشگر را انتخاب کنید.',
    leave: 'خروج از نمایش',
    done: 'تمام',
    startDisplay: 'شروع نمایش',
    startFullscreen: 'شروع تمام‌صفحه',
    savedCollections: 'مجموعه‌های ذخیره‌شده',
    savedName: 'انتخاب استودیو',
    deleteCollection: 'حذف مجموعه',
    displayMode: 'حالت نمایش',
    tablet: 'تبلت',
    tv: 'تلویزیون',
    displayCollection: 'مجموعه نمایش',
    allDesigns: 'همه طرح‌ها',
    byCategory: 'بر اساس دسته',
    selectedDesigns: 'طرح‌های منتخب',
    displayCategory: 'دسته نمایش',
    flowers: 'گل‌ها',
    boxes: 'باکس‌ها',
    collectionSearch: 'جستجوی طرح‌ها',
    selectionCount: 'انتخاب‌شده',
    useShortlist: 'استفاده از انتخاب‌ها',
    previewCollection: 'پیش‌نمایش مجموعه',
    emptyCollection: 'حداقل یک طرح انتخاب کنید',
    collectionName: 'نام مجموعه',
    saveCollection: 'ذخیره مجموعه',
    displayLayout: 'چیدمان نمایش',
    singlePhoto: 'یک عکس',
    pairedPhotos: 'دو عکس',
    captions: 'زیرنویس‌ها',
    photoOnly: 'فقط عکس',
    photoCode: 'عکس و کد',
    photoPrice: 'عکس و قیمت',
    slideTiming: 'زمان اسلاید',
    seconds: 'ثانیه',
    showPrices: 'نمایش قیمت‌ها',
    readyOnly: 'فقط طرح‌های آماده',
    hideSoldOut: 'پنهان کردن طرح‌های تمام‌شده',
    keepAwake: 'روشن نگه داشتن صفحه',
    fullscreen: 'تمام‌صفحه اکنون',
    slideshow: 'نمایش اسلاید',
    slideshowHint: 'طرح‌های انتخاب‌شده به ترتیب نمایش داده می‌شوند.',
    configuration: 'انتقال تنظیمات',
    configurationHint: 'تنظیمات نمایش را بین دستگاه‌ها منتقل کنید.',
    configurationText: 'متن تنظیمات',
    configurationError: 'تنظیمات وارد نشد',
    exportSetup: 'خروجی تنظیمات',
    importSetup: 'ورود تنظیمات',
    setupLink: 'پیوند راه‌اندازی',
    pinSet: 'رمز تنظیم شده است',
    removePin: 'حذف رمز',
    pin: 'رمز نمایش',
    pinHint: 'چهار رقم وارد کنید',
    eligible: 'طرح در دسترس'
  }
};
const ids = ['VF-7K2M4Q', 'VF-3P8R1T'];
const image = {src: '/assets/placeholder.svg', alt: ''};

export function Fixture({lang}) {
  const t = copy[lang];
  const [profile, setProfile] = React.useState(null);
  const [display, setDisplay] = React.useState({
    mode: 'tablet',
    layout: 'single',
    captionMode: 'code',
    slideSeconds: '6'
  });
  const [toggles, setToggles] = React.useState({
    showPrices: false,
    readyOnly: false,
    hideSoldOut: false,
    keepAwake: false,
    slideshow: false
  });
  const [fullscreen, setFullscreen] = React.useState({startChecked: false, checked: false});
  const [saved, setSaved] = React.useState([{value: 'studio', label: t.savedName}]);
  const [active, setActive] = React.useState('');
  const [mode, setMode] = React.useState('all');
  const [category, setCategory] = React.useState('flowers');
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [name, setName] = React.useState('');
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState(false);
  const [pin, setPin] = React.useState('');
  const [pinSet, setPinSet] = React.useState(false);
  const [action, setAction] = React.useState('');
  const limited = profile === 'limited';
  const eligible = limited ? [] : mode === 'selected' ? selected : ids;
  const formatNumber = value =>
    new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(value);
  const setDisplayField = field => value => setDisplay(current => ({...current, [field]: value}));
  return (
    <>
      <button type="button" onClick={() => setProfile('setup')}>
        {t.open}
      </button>
      <button type="button" onClick={() => setProfile('settings')}>
        {t.edit}
      </button>
      <button type="button" onClick={() => setProfile('limited')}>
        {t.limited}
      </button>
      <span data-test="action">{action}</span>
      <span data-test="display">{JSON.stringify(display)}</span>
      <span data-test="toggles">{JSON.stringify(toggles)}</span>
      <span data-test="fullscreen">{JSON.stringify(fullscreen)}</span>
      <span data-test="category">{category}</span>
      <StorefrontPresentationSettings
        open={!!profile}
        isSetup={profile === 'setup'}
        labels={t}
        homeHref="#home"
        formatNumber={formatNumber}
        canStartDisplay={eligible.length > 0}
        onClose={() => setProfile(null)}
        onStartDisplay={() => {
          setAction('start');
          setProfile(null);
        }}
        fullscreen={{
          ...fullscreen,
          available: !limited,
          onStartChange: checked => setFullscreen(current => ({...current, startChecked: checked})),
          onChange: checked => setFullscreen(current => ({...current, checked}))
        }}
        collections={{
          saved: limited ? [] : saved,
          active,
          onLoad: value => {
            setActive(value);
            setAction('load:' + value);
          },
          onDelete: () => {
            setSaved([]);
            setActive('');
            setAction('delete');
          },
          mode,
          onModeChange: setMode,
          category,
          onCategoryChange: setCategory,
          categories: [
            {value: 'flowers', label: t.flowers},
            {value: 'boxes', label: t.boxes}
          ],
          query,
          onQueryChange: setQuery,
          selectedCount: selected.length,
          products: ids
            .filter(id => id.includes(query.toUpperCase()))
            .map(id => ({
              id,
              image,
              selected: selected.includes(id),
              toggle: checked =>
                setSelected(current =>
                  checked ? [...current, id] : current.filter(value => value !== id)
                )
            })),
          canUseShortlist: !limited,
          onUseShortlist: () => {
            setMode('selected');
            setQuery('');
            setSelected([ids[0]]);
            setAction('shortlist');
          },
          preview: eligible.map(id => ({id, code: id, image})),
          eligibleCountLabel: formatNumber(eligible.length) + ' ' + t.eligible,
          name,
          onNameChange: setName,
          canSave: !!name.trim() && eligible.length > 0,
          onSave: () => setAction('save:' + name + ':' + eligible.join(','))
        }}
        display={{
          ...display,
          onModeChange: setDisplayField('mode'),
          onLayoutChange: setDisplayField('layout'),
          onCaptionChange: setDisplayField('captionMode'),
          onSlideSecondsChange: setDisplayField('slideSeconds')
        }}
        toggles={Object.fromEntries(
          Object.entries(toggles).map(([key, checked]) => [
            key,
            {
              checked,
              onChange: value => setToggles(current => ({...current, [key]: value}))
            }
          ])
        )}
        transfer={{
          text,
          onChange: setText,
          error,
          link: 'https://example.test/setup',
          onExport: () => {
            setText('fixture export');
            setError(false);
            setAction('export');
          },
          // This harness supplies an import error; production parsing stays in presentation logic.
          onImport: () => {
            setError(true);
            setAction('import');
          }
        }}
        pin={{
          isSet: pinSet,
          value: pin,
          onChange: setPin,
          onSave: () => {
            setPinSet(true);
            setAction('pin-save');
          },
          onRemove: () => {
            setPinSet(false);
            setPin('');
            setAction('pin-remove');
          }
        }}
      />
    </>
  );
}
