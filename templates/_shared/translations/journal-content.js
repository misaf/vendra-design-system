// Shared sample article content for journal and post pages.
const VF_POSTS = [{
  id: 'autumn',
  cat: 'seasonal',
  en: ['What’s in season this autumn', 'Chrysanthemums, dahlias and the last garden roses — and how to make them last.', '5 min read', '28 Sep 2026'],
  fa: ['گل‌های فصل پاییز', 'داوودی، کوکب و آخرین رزهای باغی — و چطور بیشتر بمانند.', '۵ دقیقه مطالعه', '۶ مهر ۱۴۰۵']
}, {
  id: 'care',
  cat: 'care',
  en: ['Five ways to keep a bouquet fresh', 'Clean vase, angled stems, cool room. The small habits that add days.', '3 min read', '12 Sep 2026'],
  fa: ['پنج راه برای تازه ماندن دسته‌گل', 'گلدان تمیز، ساقه مورب، اتاق خنک. عادت‌های کوچکی که روزها اضافه می‌کنند.', '۳ دقیقه مطالعه', '۲۱ شهریور ۱۴۰۵']
}, {
  id: 'bridal',
  cat: 'weddings',
  en: ['Choosing your bridal bouquet', 'Shape, scale and colour — a florist’s guide to the flowers you’ll hold all day.', '6 min read', '30 Aug 2026'],
  fa: ['انتخاب دسته‌گل عروس', 'فرم، اندازه و رنگ — راهنمای گل‌فروش برای گلی که تمام روز در دست دارید.', '۶ دقیقه مطالعه', '۸ شهریور ۱۴۰۵']
}, {
  id: 'orchids',
  cat: 'care',
  en: ['Orchids that bloom again', 'Light, water and patience: how to bring a phalaenopsis back into flower.', '4 min read', '16 Aug 2026'],
  fa: ['ارکیده‌ای که دوباره گل می‌دهد', 'نور، آب و حوصله: چطور فالانوپسیس دوباره گل بدهد.', '۴ دقیقه مطالعه', '۲۵ مرداد ۱۴۰۵']
}];
VF_POSTS.push(...[
  {
    "id": "morning-at-the-studio",
    "cat": "studio",
    "en": [
      "A morning at the Vendra workbench",
      "Buckets arrive at seven, the first bouquets leave by ten. Here’s how a day in the studio begins.",
      "4 min read",
      "24 Sep 2026"
    ],
    "fa": [
      "یک صبح پشت میز کار وندرا",
      "سطل‌های گل ساعت هفت می‌رسند و اولین دسته‌گل‌ها تا ده راهی می‌شوند. روز در استودیو این‌طور شروع می‌شود.",
      "4 دقیقه مطالعه",
      "۲ مهر ۱۴۰۵"
    ],
    "body": {
      "en": [
        [
          "p",
          "Most of what we sell each day didn’t exist the night before. Every bouquet is made the same morning, from stems that arrived only hours earlier."
        ],
        [
          "h",
          "Seven o’clock: the flowers arrive"
        ],
        [
          "p",
          "Roses, lisianthus, gypsophila and eucalyptus come in from the growers. Each stem is stripped, cut and given a long drink in cool water before anyone starts arranging."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "On mild days we take the workbench outside into the courtyard."
        ],
        [
          "h",
          "Nine o’clock: the first orders"
        ],
        [
          "p",
          "We read every card message before we start. A birthday bouquet and a sympathy piece need very different hands, even when they use the same flowers."
        ],
        [
          "quote",
          "We make every bouquet as if we were the one receiving it."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "Walk-in customers can choose stems from the buckets at the door and watch their bouquet being wrapped."
        ],
        [
          "tips",
          [
            "Same-day orders close at 18:00 for central Karaj",
            "Morning slots go first — order the night before if you can",
            "You can always ask us to use your favourite flower"
          ]
        ]
      ],
      "fa": [
        [
          "p",
          "بیشتر چیزهایی که هر روز می‌فروشیم، شب قبل وجود نداشتند. هر دسته‌گل همان صبح ساخته می‌شود، با گل‌هایی که فقط چند ساعت پیش رسیده‌اند."
        ],
        [
          "h",
          "ساعت هفت: گل‌ها می‌رسند"
        ],
        [
          "p",
          "رز، لیسیانتوس، عروس و اکالیپتوس از گلخانه‌ها می‌رسند. برگ‌های اضافه هر ساقه گرفته می‌شود، برش می‌خورد و پیش از شروع کار مدتی در آب خنک می‌ماند."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "روزهایی که هوا ملایم است، میز کار را به حیاط می‌بریم."
        ],
        [
          "h",
          "ساعت نه: اولین سفارش‌ها"
        ],
        [
          "p",
          "قبل از شروع، متن کارت هر سفارش را می‌خوانیم. دسته‌گل تولد و گل تسلیت، حتی با گل‌های یکسان، دست‌های متفاوتی می‌خواهند."
        ],
        [
          "quote",
          "هر دسته‌گل را طوری می‌سازیم که انگار خودمان قرار است آن را هدیه بگیریم."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "مشتری‌های حضوری می‌توانند گل‌ها را از سطل‌های دم در انتخاب کنند و بسته‌بندی دسته‌گلشان را تماشا کنند."
        ],
        [
          "tips",
          [
            "سفارش همان‌روز برای مرکز کرج تا ساعت ۱۸ ثبت می‌شود",
            "زمان‌های صبح زودتر پر می‌شوند — اگر می‌توانید شب قبل سفارش دهید",
            "همیشه می‌توانید بخواهید گل مورد علاقه‌تان را به کار ببریم"
          ]
        ]
      ]
    },
    "products": [
      "lavender",
      "blush",
      "ivory"
    ]
  },
  {
    "id": "flowers-for-friends",
    "cat": "occasions",
    "en": [
      "Flowers aren’t only for special days",
      "A thank-you, a new job, a friend who needs cheering up — why a small bouquet on an ordinary day often means the most.",
      "3 min read",
      "21 Sep 2026"
    ],
    "fa": [
      "گل فقط برای روزهای خاص نیست",
      "یک تشکر، کار جدید، دوستی که حالش گرفته — چرا یک دسته‌گل کوچک در یک روز معمولی بیشترین معنا را دارد.",
      "3 دقیقه مطالعه",
      "۳۰ شهریور ۱۴۰۵"
    ],
    "body": {
      "en": [
        [
          "p",
          "More and more of our customers buy flowers for no occasion at all: for a friend, a colleague, a neighbour, or simply for their own table."
        ],
        [
          "h",
          "Pick by personality, not by rule"
        ],
        [
          "p",
          "Sunflowers for the loud friend, soft pink roses for the gentle one, lilies for someone who loves a strong scent. There’s no wrong answer."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "A kraft-paper wrap keeps it relaxed and easy to carry."
        ],
        [
          "h",
          "Keep the message short"
        ],
        [
          "p",
          "Two or three words on the card are enough. “Thinking of you” works better than a paragraph."
        ],
        [
          "tips",
          [
            "Hand-tied bouquets in kraft paper are the easiest to carry",
            "Ask for a mix of one colour family for a calm look",
            "Add a small plant if they don’t own a vase"
          ]
        ]
      ],
      "fa": [
        [
          "p",
          "خیلی از مشتری‌هایمان بدون هیچ مناسبتی گل می‌خرند: برای دوست، همکار، همسایه یا فقط برای میز خودشان."
        ],
        [
          "h",
          "با شخصیت آدم‌ها انتخاب کنید، نه با قانون"
        ],
        [
          "p",
          "آفتابگردان برای دوست پرانرژی، رز صورتی ملایم برای دوست آرام، لیلیوم برای کسی که عطر قوی دوست دارد. جواب غلطی وجود ندارد."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "بسته‌بندی کاغذ کرافت، دسته‌گل را ساده و راحت برای حمل نگه می‌دارد."
        ],
        [
          "h",
          "پیام را کوتاه بنویسید"
        ],
        [
          "p",
          "دو سه کلمه روی کارت کافی است. «به یادتم» از یک پاراگراف بهتر کار می‌کند."
        ],
        [
          "tips",
          [
            "دسته‌گل دست‌بسته با کاغذ کرافت راحت‌ترین گزینه برای حمل است",
            "برای ظاهری آرام، ترکیبی از یک خانواده رنگی بخواهید",
            "اگر گلدان ندارند، یک گیاه کوچک اضافه کنید"
          ]
        ]
      ]
    },
    "products": [
      "blush"
    ]
  },
  {
    "id": "bouquet-last-longer",
    "cat": "care",
    "en": [
      "Five small habits that make a bouquet last a week",
      "Fresh water, a sharp cut and a cool corner — the simple things we tell every customer at the studio door.",
      "4 min read",
      "18 Sep 2026"
    ],
    "fa": [
      "پنج عادت کوچک که دسته‌گل را یک هفته تازه نگه می‌دارد",
      "آب تازه، برش تیز و گوشه‌ای خنک — نکته‌های ساده‌ای که به همه مشتری‌های استودیو می‌گوییم.",
      "4 دقیقه مطالعه",
      "۲۷ شهریور ۱۴۰۵"
    ],
    "body": {
      "en": [
        [
          "p",
          "Most bouquets fade early for the same few reasons: warm rooms, cloudy water and stems that can’t drink. The good news is that each of these takes less than a minute to fix."
        ],
        [
          "h",
          "1. Cut the stems on the diagonal"
        ],
        [
          "p",
          "Trim 2–3 cm off every stem with a sharp knife or secateurs, at an angle. It opens up more surface for water. Scissors crush the stem, so avoid them if you can."
        ],
        [
          "h",
          "2. Change the water every second day"
        ],
        [
          "p",
          "Empty the vase, rinse it and refill with cool water. Add the flower food sachet from your wrap the first time."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "Remove any leaves that sit below the waterline — they rot and cloud the water."
        ],
        [
          "h",
          "3. Keep them cool and out of the sun"
        ],
        [
          "p",
          "Radiators, sunny windowsills and fruit bowls all shorten a bouquet’s life. Ripening fruit releases a gas that makes petals drop."
        ],
        [
          "quote",
          "A cool hallway overnight can add two or three days to a bouquet."
        ],
        [
          "tips",
          [
            "Re-cut stems each time you change the water",
            "Take out any fading flower so it doesn’t age the rest",
            "Roses that droop early can revive in a deep, cool bath for an hour"
          ]
        ]
      ],
      "fa": [
        [
          "p",
          "بیشتر دسته‌گل‌ها به چند دلیل مشترک زود پژمرده می‌شوند: اتاق گرم، آب کدر و ساقه‌هایی که نمی‌توانند آب بنوشند. خبر خوب اینکه رفع هرکدام کمتر از یک دقیقه وقت می‌گیرد."
        ],
        [
          "h",
          "۱. ساقه‌ها را مورب ببرید"
        ],
        [
          "p",
          "۲ تا ۳ سانتی‌متر از انتهای هر ساقه را با چاقو یا قیچی باغبانی تیز، به‌صورت مورب ببرید تا سطح بیشتری برای جذب آب باز شود. قیچی معمولی ساقه را له می‌کند."
        ],
        [
          "h",
          "۲. یک روز در میان آب را عوض کنید"
        ],
        [
          "p",
          "گلدان را خالی کنید، بشویید و با آب خنک پر کنید. بار اول، پودر غذای گل همراه بسته‌بندی را اضافه کنید."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "برگ‌هایی را که زیر آب می‌مانند جدا کنید — می‌پوسند و آب را کدر می‌کنند."
        ],
        [
          "h",
          "۳. دور از آفتاب و گرما"
        ],
        [
          "p",
          "شوفاژ، لبه پنجره آفتابی و ظرف میوه عمر دسته‌گل را کوتاه می‌کنند. میوه در حال رسیدن گازی آزاد می‌کند که گلبرگ‌ها را می‌ریزد."
        ],
        [
          "quote",
          "یک شب در راهروی خنک می‌تواند دو سه روز به عمر دسته‌گل اضافه کند."
        ],
        [
          "tips",
          [
            "هر بار که آب را عوض می‌کنید، ساقه‌ها را دوباره ببرید",
            "گل پژمرده را جدا کنید تا بقیه را پیر نکند",
            "رزی که زود خم شده، با یک ساعت در آب خنک و عمیق دوباره سرحال می‌شود"
          ]
        ]
      ]
    },
    "products": [
      "lavender",
      "crimson"
    ]
  },
  {
    "id": "yalda-flowers",
    "cat": "occasions",
    "en": [
      "Flowers for Yalda night: deep reds and candlelight",
      "Pomegranate tones, anthuriums and roses for the longest night of the year — and how to order ahead.",
      "3 min read",
      "9 Sep 2026"
    ],
    "fa": [
      "گل برای شب یلدا: سرخ‌های عمیق و نور شمع",
      "رنگ‌های اناری، آنتوریوم و رز برای بلندترین شب سال — و اینکه چطور زودتر سفارش دهید.",
      "3 دقیقه مطالعه",
      "۱۸ شهریور ۱۴۰۵"
    ],
    "body": {
      "en": [
        [
          "p",
          "Yalda is our busiest night of winter. Families gather until late, and flowers sit at the centre of the sofreh beside pomegranates, watermelon and Hafez."
        ],
        [
          "h",
          "Colours that suit the night"
        ],
        [
          "p",
          "We build around crimson roses, red anthuriums and dark foliage, lifted with soft blush. They glow under warm lamps and candlelight."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "A low arrangement keeps faces visible across the table."
        ],
        [
          "h",
          "Order early"
        ],
        [
          "p",
          "Same-day slots fill up fast in the week before Yalda. We recommend ordering at least two days ahead and choosing the 16:00–20:00 window."
        ],
        [
          "tips",
          [
            "Pick a low box or vase for the sofreh",
            "Ask for a handwritten Hafez line on the card",
            "Keep the arrangement away from candles"
          ]
        ]
      ],
      "fa": [
        [
          "p",
          "یلدا شلوغ‌ترین شب زمستان ماست. خانواده‌ها تا دیروقت دور هم جمع می‌شوند و گل کنار انار، هندوانه و دیوان حافظ، وسط سفره می‌نشیند."
        ],
        [
          "h",
          "رنگ‌هایی که به این شب می‌آیند"
        ],
        [
          "p",
          "با رز سرخ، آنتوریوم قرمز و برگ‌های تیره کار می‌کنیم و کمی صورتی ملایم کنارشان می‌گذاریم. زیر نور گرم چراغ و شمع می‌درخشند."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "گل‌آرایی کوتاه، صورت‌ها را دو طرف سفره پنهان نمی‌کند."
        ],
        [
          "h",
          "زودتر سفارش دهید"
        ],
        [
          "p",
          "زمان‌های ارسال همان‌روز در هفته پیش از یلدا زود پر می‌شود. پیشنهاد می‌کنیم دست‌کم دو روز زودتر سفارش دهید و بازه ۱۶ تا ۲۰ را انتخاب کنید."
        ],
        [
          "tips",
          [
            "برای سفره، باکس یا گلدان کوتاه انتخاب کنید",
            "یک بیت حافظ روی کارت دست‌نویس بخواهید",
            "گل را از شمع دور نگه دارید"
          ]
        ]
      ]
    },
    "products": [
      "crimson",
      "ivory"
    ]
  },
  {
    "id": "bridal-bouquet-guide",
    "cat": "weddings",
    "en": [
      "Choosing a bridal bouquet that feels like you",
      "Cascading orchids or a loose garden gather? How we match the bouquet to the dress, the venue and the season.",
      "5 min read",
      "28 Aug 2026"
    ],
    "fa": [
      "انتخاب دسته‌گل عروس که شبیه خودتان باشد",
      "ارکیده آبشاری یا دسته‌گل آزاد باغی؟ چطور دسته‌گل را با لباس، سالن و فصل هماهنگ می‌کنیم.",
      "5 دقیقه مطالعه",
      "۶ شهریور ۱۴۰۵"
    ],
    "body": {
      "en": [
        [
          "p",
          "The bridal bouquet is in almost every photo of the day, so it should feel like part of the outfit rather than an accessory."
        ],
        [
          "h",
          "Start with the dress"
        ],
        [
          "p",
          "A simple silk dress can carry a bold cascade of orchids. A detailed lace gown usually looks best with something smaller and softer."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "White phalaenopsis orchids trail beautifully and hold up well in summer heat."
        ],
        [
          "h",
          "Think about the season"
        ],
        [
          "p",
          "Peonies and ranunculus are at their best in spring; roses, orchids and lisianthus are reliable all year."
        ],
        [
          "quote",
          "Book your consultation 6–8 weeks before the day, so we can source exactly the stems you love."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "Car flowers are built on the morning of the wedding and fixed with soft ties that won’t mark the paint."
        ],
        [
          "tips",
          [
            "Bring a photo of the dress and a fabric swatch",
            "Ask for a matching buttonhole and car flowers",
            "Keep the bouquet in water until you leave"
          ]
        ]
      ],
      "fa": [
        [
          "p",
          "دسته‌گل عروس تقریباً در همه عکس‌های آن روز هست، پس باید بخشی از لباس به نظر برسد، نه یک وسیله جانبی."
        ],
        [
          "h",
          "از لباس شروع کنید"
        ],
        [
          "p",
          "لباس ساده ساتن، ارکیده آبشاری پرحجم را خوب نشان می‌دهد. لباس پرکار و توری معمولاً با دسته‌گلی کوچک‌تر و لطیف‌تر زیباتر است."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "ارکیده فالانوپسیس سفید زیبا آویزان می‌شود و در گرمای تابستان هم دوام می‌آورد."
        ],
        [
          "h",
          "به فصل فکر کنید"
        ],
        [
          "p",
          "گل صد تومانی و آلاله در بهار بهترین حال را دارند؛ رز، ارکیده و لیسیانتوس در همه فصل‌ها قابل اعتمادند."
        ],
        [
          "quote",
          "مشاوره را ۶ تا ۸ هفته قبل از مراسم رزرو کنید تا دقیقاً همان گل‌هایی را که دوست دارید تهیه کنیم."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "گل ماشین صبح روز عروسی ساخته و با بست‌های نرم بسته می‌شود تا روی رنگ ماشین اثری نگذارد."
        ],
        [
          "tips",
          [
            "عکس لباس و تکه‌ای از پارچه را همراه بیاورید",
            "گل سینه داماد و گل ماشین هماهنگ بخواهید",
            "تا لحظه رفتن، دسته‌گل را در آب نگه دارید"
          ]
        ]
      ]
    },
    "products": [
      "orchid"
    ]
  },
  {
    "id": "orchid-care",
    "cat": "plants",
    "en": [
      "Orchid care: water less than you think",
      "Most orchids are lost to kindness. A simple weekly routine to keep yours flowering for months.",
      "3 min read",
      "14 Aug 2026"
    ],
    "fa": [
      "نگهداری ارکیده: کمتر از آنچه فکر می‌کنید آب دهید",
      "بیشتر ارکیده‌ها از محبت زیاد از بین می‌روند. یک برنامه ساده هفتگی تا ماه‌ها گل بدهد.",
      "3 دقیقه مطالعه",
      "۲۳ مرداد ۱۴۰۵"
    ],
    "body": {
      "en": [
        [
          "p",
          "Phalaenopsis orchids are among the easiest houseplants — as long as you resist watering them too often."
        ],
        [
          "h",
          "Water once a week"
        ],
        [
          "p",
          "Soak the pot in a bowl of room-temperature water for ten minutes, then let it drain completely. Never leave it standing in water."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "Silvery roots mean it’s time to water; green roots mean wait."
        ],
        [
          "h",
          "Bright, but not direct, light"
        ],
        [
          "p",
          "An east-facing window is ideal. Harsh afternoon sun scorches the leaves."
        ],
        [
          "tips",
          [
            "Don’t let water sit in the crown of the leaves",
            "Cut a finished flower spike just above a node to encourage a new one",
            "Feed with orchid fertiliser once a month"
          ]
        ]
      ],
      "fa": [
        [
          "p",
          "ارکیده فالانوپسیس از ساده‌ترین گیاهان آپارتمانی است — به شرط اینکه زیاد آبش ندهید."
        ],
        [
          "h",
          "هفته‌ای یک بار آب دهید"
        ],
        [
          "p",
          "گلدان را ده دقیقه در ظرفی از آب هم‌دمای اتاق بگذارید، بعد بگذارید کامل زهکشی شود. هرگز آن را در آب رها نکنید."
        ],
        [
          "img",
          "assets/placeholders/product.svg",
          "ریشه نقره‌ای یعنی وقت آب دادن است؛ ریشه سبز یعنی صبر کنید."
        ],
        [
          "h",
          "نور زیاد، اما غیرمستقیم"
        ],
        [
          "p",
          "پنجره رو به شرق بهترین جاست. آفتاب تند بعدازظهر برگ‌ها را می‌سوزاند."
        ],
        [
          "tips",
          [
            "نگذارید آب در مرکز برگ‌ها بماند",
            "شاخه گل تمام‌شده را کمی بالاتر از گره ببرید تا شاخه تازه بدهد",
            "ماهی یک بار کود مخصوص ارکیده بدهید"
          ]
        ]
      ]
    },
    "products": [
      "orchid"
    ]
  }
]);
const VF_JCATS = [['all', 'All', 'همه'], ['seasonal', 'Seasonal', 'فصلی'], ['care', 'Flower care', 'نگهداری'], ['weddings', 'Weddings', 'عروسی'], ['occasions','Occasions','مناسبت‌ها'], ['plants','Plants','گیاهان'], ['studio','Studio life','پشت صحنه']];
