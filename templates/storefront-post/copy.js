// Bilingual post copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  return {
    en: {
      back: 'Journal',
      meta: 'Seasonal · 28 Sep 2026 · 5 min read',
      title: 'What’s in season this autumn',
      lede: 'Chrysanthemums, dahlias and the last garden roses — and how to make them last on a warm windowsill.',
      ph: 'Autumn flowers photo',
      quote: 'Autumn flowers are sturdier than they look. Give them cool water and they’ll give you two weeks.',
      h2: 'Making them last',
      shopIt: 'Shop autumn bouquets',
      copy: 'Copy link',
      copied: 'Link copied',
      moreA: 'More from',
      moreB: 'the journal.',
      p1: ['By October the growers around Karaj are cutting the last of the summer roses, and the first chrysanthemums arrive in rust, cream and a dusty pink that suits the light this time of year.', 'Dahlias are the season’s showpiece: heavy heads, thousands of petals, and colours from burgundy to apricot. We pair them with rosehips and a little eucalyptus so the bouquet keeps its shape.'],
      p2: ['Trim every stem at an angle before it goes in the vase, and strip any leaves that would sit below the water. Change the water every two days, and keep the vase away from fruit and radiators.', 'Chrysanthemums will happily last two weeks. Dahlias are shorter-lived — five or six days — so enjoy them while they’re at their best.']
    },
    fa: {
      back: 'دفترچه',
      meta: 'فصلی · ۶ مهر ۱۴۰۵ · ۵ دقیقه مطالعه',
      title: 'گل‌های فصل پاییز',
      lede: 'داوودی، کوکب و آخرین رزهای باغی — و چطور روی طاقچه‌ای گرم بیشتر بمانند.',
      ph: 'عکس گل‌های پاییزی',
      quote: 'گل‌های پاییزی محکم‌تر از ظاهرشان هستند. آب خنک بدهید، دو هفته می‌مانند.',
      h2: 'چطور بیشتر بمانند',
      shopIt: 'خرید دسته‌گل پاییزی',
      copy: 'کپی پیوند',
      copied: 'پیوند کپی شد',
      moreA: 'بیشتر از',
      moreB: 'دفترچه.',
      p1: ['در مهر، باغدارهای اطراف کرج آخرین رزهای تابستان را می‌چینند و اولین داوودی‌ها با رنگ‌های زنگاری، شیری و صورتی گرفته از راه می‌رسند که به نور این فصل می‌آید.', 'کوکب ستاره فصل است: گل‌های سنگین، هزاران گلبرگ و رنگ‌هایی از شرابی تا زردآلویی. آن را با نسترن و کمی اکالیپتوس می‌بندیم تا دسته‌گل فرمش را نگه دارد.'],
      p2: ['پیش از گذاشتن در گلدان، هر ساقه را مورب کوتاه کنید و برگ‌هایی را که زیر آب می‌روند جدا کنید. هر دو روز آب را عوض کنید و گلدان را از میوه و بخاری دور نگه دارید.', 'داوودی به‌راحتی دو هفته می‌ماند. کوکب عمر کوتاه‌تری دارد — پنج یا شش روز — پس تا بهترین حالتش است لذت ببرید.']
    }
  }[S.lang];
}
