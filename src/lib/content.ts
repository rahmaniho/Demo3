import { fa } from "./fa";

export type Work = {
  id: string;
  num: string;
  title: string;
  accent: string;
  meta: string;
  category: string;
  year: string;
  src: string;
  aspect: string;
  span: string;
  row: string;
};

const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMG = {
  ines: px(7630665, 900, 1100),
  hayden: px(23879313, 800, 1000),
  roe: px(19615558, 1400, 950),
  light: px(30552590, 800, 1000),
  lior: px(13422346, 800, 1050),
  astor: px(36103802, 800, 1050),
  mara: px(30734121, 800, 1050),
  studio: px(7383644, 1800, 1100),
  saoirse: px(13921897, 900, 1150),
  keljune: px(5962786, 900, 1100),
  hands: px(30552600, 900, 900),
  eowyn: px(39166890, 900, 900),
  cassia: px(14242446, 900, 900),
  noor: px(36506157, 900, 900),
  studioLate: px(12616007, 1800, 1000),
  /* تصاویر ردیف نرخ‌نامه */
  tierSitting: px(1443388, 1000, 560),
  tierEditorial: px(11003631, 1000, 560),
  tierCampaign: px(19437732, 1000, 560),
  studioAlt: px(30332804, 1200, 800),
};

export const STUDIO = {
  latin: "karen.",
  persian: "کارن استودیو",
  photographer: "کارن کیانی",
  city: "تهران، ایران",
  address: "تهران، خیابان ولیعصر، بالاتر از پارک ساعی، کوچهٔ هفتم، پلاک ۲۴، طبقهٔ سوم",
  postalCode: "۱۹۶۷۷۱۳۴۵۶",
  email: "hello@karenstudio.ir",
  phone: "+98 912 345 6789",
  phoneFa: "۰۹۱۲ ۳۴۵ ۶۷۸۹",
  phoneHref: "tel:+989123456789",
  landlineFa: "۰۲۱‑۲۲۰۹۸۷۶۵",
  landlineHref: "tel:+982122098765",
  instagram: "https://instagram.com/karen.studio",
  behance: "https://behance.net/karenstudio",
  vimeo: "https://vimeo.com/karenstudio",
  tagline:
    "کارگاهی کوچک برای پرتره در قلب تهران. تحریریه، برند و جلسه‌های خصوصی — روی فیلم، با چاپ دستی و نورپردازی سینمایی.",
};

export const NAV = [
  { label: "کارها", href: "#features" },
  { label: "نمونه‌کارها", href: "#/portfolio" },
  { label: "نرخ‌نامه", href: "#pricing" },
  { label: "استودیو", href: "#about" },
];

export const SESSIONS = [
  {
    n: `۰۱ / تحریریه`,
    icon: "camera",
    title: "پرتره‌های تحریریه.",
    desc: "پرتره‌هایی در تراز مجله برای گزارش‌های مطبوعاتی، پرونده‌های شخصی و برندسازی فردی. آرام، سنجیده و هرگز شتاب‌زده.",
  },
  {
    n: `۰۲ / استودیو`,
    icon: "flash",
    title: "جلسه‌های کنترل‌شده در استودیو.",
    desc: "شکل‌دهی نور سینمایی در استودیویی ۱۸۰ متری در قلب تهران. همراهی کامل در انتخاب پوشاک و پیش‌نمایش ویرایش در محل.",
  },
  {
    n: `۰۳ / چهره‌نگار`,
    icon: "user",
    title: "چهره‌نگاره‌هایی که زنده‌اند.",
    desc: "نه آن چهره‌نگاره‌های فلورسنتیِ شبکه‌های اجتماعی. پرتره‌هایی سنجیده که شبیه یک انسان‌اند، نه قالب سازمانی.",
  },
  {
    n: `۰۴ / زوج‌ها`,
    icon: "heart",
    title: "زوج‌ها و لحظه‌های صمیمی.",
    desc: "جلسه‌های دوتایی که بیش از یک عکاسی، شبیه شبی دل‌نشین است که کسی آن را ثبت کرده باشد.",
  },
  {
    n: `۰۵ / برند`,
    icon: "store",
    title: "کمپین‌های برند.",
    desc: "پرترهٔ بنیان‌گذاران، لوک‌بوک‌ها و هویت بصری برای برندهای ایرانی که می‌خواهند عکاسی‌شان بوی کارگردانی هنری بدهد.",
  },
  {
    n: `۰۶ / آنالوگ`,
    icon: "film",
    title: "فیلم، به انتخابی آگاهانه.",
    desc: "فرمت متوسط هاسلبلاد و لایکای ۳۵ میلی‌متری. دانه‌ها فیلتر نیستند؛ خودِ نقره‌اند.",
  },
];

export const WORK: Work[] = [
  {
    id: "a1",
    num: "۰۱",
    title: "نازنین",
    accent: "دورهٔ ۱۴",
    meta: "تحریریه — برای مجلهٔ تندیس",
    category: "تحریریه",
    year: "۱۴۰۵",
    src: IMG.ines,
    aspect: "aspect-[4/5]",
    span: "md:col-span-7",
    row: "a",
  },
  {
    id: "a2",
    num: "۰۲",
    title: "سارا",
    accent: "کمپین",
    meta: "برند · لوک‌بوک پوشاک رها",
    category: "برند",
    year: "۱۴۰۴",
    src: IMG.hayden,
    aspect: "aspect-[4/5]",
    span: "md:col-span-5",
    row: "a",
  },
  {
    id: "b1",
    num: "۰۳",
    title: "رها",
    accent: "جلسهٔ ۰۲",
    meta: "تحریریه · گزارش برای مجلهٔ کرانه",
    category: "تحریریه",
    year: "۱۴۰۵",
    src: IMG.roe,
    aspect: "aspect-[4/3]",
    span: "md:col-span-8",
    row: "b",
  },
  {
    id: "b2",
    num: "۰۴",
    title: "مطالعهٔ نور",
    accent: "شمارهٔ ۳",
    meta: "شخصی — مجموعهٔ فیلم",
    category: "شخصی",
    year: "۱۴۰۴",
    src: IMG.light,
    aspect: "aspect-[3/4]",
    span: "md:col-span-4",
    row: "b",
  },
  {
    id: "c1",
    num: "۰۵",
    title: "لیلا",
    accent: "دورهٔ ۰۹",
    meta: "تحریریه · موسیقی — استودیو نوا",
    category: "تحریریه",
    year: "۱۴۰۴",
    src: IMG.lior,
    aspect: "aspect-[3/4]",
    span: "md:col-span-4",
    row: "c",
  },
  {
    id: "c2",
    num: "۰۶",
    title: "آوا",
    accent: "دونفره",
    meta: "خصوصی · زوج‌ها",
    category: "زوج‌ها",
    year: "۱۴۰۴",
    src: IMG.astor,
    aspect: "aspect-[3/4]",
    span: "md:col-span-4",
    row: "c",
  },
  {
    id: "c3",
    num: "۰۷",
    title: "مریم",
    accent: "بنیان‌گذار",
    meta: "برند · مطبوعات برای برند پوشاک رها",
    category: "برند",
    year: "۱۴۰۵",
    src: IMG.mara,
    aspect: "aspect-[3/4]",
    span: "md:col-span-4",
    row: "c",
  },
  {
    id: "d1",
    num: "۰۸",
    title: "استودیو",
    accent: "شمارهٔ ۱۴",
    meta: "پشت‌صحنه — فضای استودیو در تهران",
    category: "استودیو",
    year: "۱۴۰۵",
    src: IMG.studio,
    aspect: "aspect-[16/10]",
    span: "md:col-span-12",
    row: "d",
  },
  {
    id: "e1",
    num: "۰۹",
    title: "سپیده",
    accent: "جلد",
    meta: "تحریریه · جلد فصل‌نامهٔ تصویر",
    category: "تحریریه",
    year: "۱۴۰۳",
    src: IMG.saoirse,
    aspect: "aspect-[4/5]",
    span: "md:col-span-6",
    row: "e",
  },
  {
    id: "e2",
    num: "۱۰",
    title: "کیان و ژاله",
    accent: "جفت",
    meta: "خصوصی · زوج‌ها — جلسهٔ سالگرد",
    category: "زوج‌ها",
    year: "۱۴۰۳",
    src: IMG.keljune,
    aspect: "aspect-[4/5]",
    span: "md:col-span-6",
    row: "e",
  },
  {
    id: "f1",
    num: "۱۱",
    title: "دست‌ها",
    accent: "مطالعهٔ ۰۲",
    meta: "شخصی — مجموعهٔ جزئیات",
    category: "شخصی",
    year: "۱۴۰۳",
    src: IMG.hands,
    aspect: "aspect-square",
    span: "md:col-span-3",
    row: "f",
  },
  {
    id: "f2",
    num: "۱۲",
    title: "یاسمین",
    accent: "آنالوگ",
    meta: "شخصی — فیلم",
    category: "شخصی",
    year: "۱۴۰۳",
    src: IMG.eowyn,
    aspect: "aspect-square",
    span: "md:col-span-3",
    row: "f",
  },
  {
    id: "f3",
    num: "۱۳",
    title: "کتایون",
    accent: "نیمرخ",
    meta: "تحریریه · مطبوعات",
    category: "تحریریه",
    year: "۱۴۰۴",
    src: IMG.cassia,
    aspect: "aspect-square",
    span: "md:col-span-3",
    row: "f",
  },
  {
    id: "f4",
    num: "۱۴",
    title: "نور",
    accent: "کمپین",
    meta: "برند · لوک‌بوک",
    category: "برند",
    year: "۱۴۰۴",
    src: IMG.noor,
    aspect: "aspect-square",
    span: "md:col-span-3",
    row: "f",
  },
  {
    id: "g1",
    num: "۱۵",
    title: "استودیو، آخرِ بعدازظهر",
    accent: "شمارهٔ ۲۱",
    meta: "پشت‌صحنه — گوشهٔ نور طبیعی",
    category: "استودیو",
    year: "۱۴۰۵",
    src: IMG.studioLate,
    aspect: "aspect-[16/9]",
    span: "md:col-span-12",
    row: "g",
  },
];

export const PREVIEW = WORK.slice(0, 4);

export const CATEGORIES = ["همه", "تحریریه", "برند", "زوج‌ها", "شخصی", "استودیو"];

/* مبالغ به تومان ایران */
export const TIERS = [
  {
    name: "جلسه",
    tag: "۰۱ / استودیو",
    description: "جلسهٔ پرترهٔ متمرکز و تک‌موضوع در استودیوی تهران.",
    half: 4500000,
    full: 8000000,
    image: IMG.tierSitting,
    features: [
      "۱ سوژه، ۱ لوکیشن",
      "۳ تغییر پوشاک",
      "تا ۳۰ قاب ریتوش‌شده",
      "تحویل دیجیتال در ۷ روز کاری",
      "یک چاپ آرشیوی ۳۰×۴۰ سانتی‌متر",
    ],
    cta: "رزرو جلسه",
    highlight: false,
  },
  {
    name: "تحریریه",
    tag: "۰۲ / مجله",
    description: "برای گزارش‌های منتشرشده، پرونده‌های مطبوعاتی و روایت‌های برند.",
    half: 18000000,
    full: 32000000,
    image: IMG.tierEditorial,
    features: [
      "۱ تا ۲ سوژه، چند لوک",
      "استودیو کامل + تهیه‌کنندهٔ در محل",
      "تا ۸۰ قاب ریتوش‌شده",
      "پروفِ فیلم در ۲۴ ساعت، ویرایش کامل در ۷ روز کاری",
      "سه چاپ آرشیوی ۳۰×۴۰ سانتی‌متر",
      "مجوز استفادهٔ تحریریه‌ای در رسانه‌های داخلی",
    ],
    cta: "آغاز یک بریف",
    highlight: true,
  },
  {
    name: "کمپین",
    tag: "۰۳ / برند",
    description: "تولید چندروزهٔ برند و لوک‌بوک، از آغاز تا پایان.",
    half: 75000000,
    full: 125000000,
    image: IMG.tierCampaign,
    features: [
      "چند روز، چند لوک",
      "تیم کامل + کارگردانی هنری",
      "قاب‌های ریتوش‌شدهٔ نامحدود",
      "فیلم پشت‌صحنه",
      "مجوز استفادهٔ کامل در ایران",
      "مسئول تولید اختصاصی",
    ],
    cta: "گفت‌وگو با استودیو",
    highlight: false,
  },
];

export const ADDONS = [
  { code: "+A", name: "آرایش و مو", price: "از ۲٬۵۰۰٬۰۰۰ تومان", desc: "هنرمند در محل، تمام‌روز." },
  { code: "+B", name: "استایلیست و پوشاک", price: "از ۳٬۸۰۰٬۰۰۰ تومان", desc: "تهیه و بازگرداندن لباس‌ها در قیمت لحاظ شده." },
  { code: "+C", name: "ریتوش اضافه", price: "۳۵۰٬۰۰۰ تومان / تصویر", desc: "فراتر از تعداد توافق‌شده." },
  { code: "+D", name: "آرشیو فیلم", price: "۱٬۲۰۰٬۰۰۰ تومان", desc: "تبدیل نگاتیوها به دیجیتال و نگهداری آن‌ها." },
];

export const PROCESS = [
  {
    n: "۰۱",
    title: "برای ما بنویسید",
    desc: "بگویید کی هستید، پرتره برای چیست و چه ارجاع‌هایی را دوست دارید یا نمی‌پسندید.",
  },
  {
    n: "۰۲",
    title: "تماسِ پیش‌نور",
    desc: "گفت‌وگویی ویدیویی سی‌دقیقه‌ای برای هم‌راستایی در حال‌وهوا، پوشاک، مو و شکلِ روز جلسه.",
  },
  {
    n: "۰۳",
    title: "جلسه",
    desc: "نیم‌روز یا تمام‌روز در استودیو. آرام و گرم؛ هرگز بیش از هشت نفر سرِ صحنه.",
  },
  {
    n: "۰۴",
    title: "ویرایش",
    desc: "پروف‌های دست‌چین‌شده در ۲۴ ساعت. فایل‌های نهاییِ ریتوش‌شده تا هفت روز کاری. بدون فیلتر.",
  },
];

export const STATS = [
  { value: "۸ سال", label: "پشت دوربین" },
  { value: "۱٬۸۵۰+", label: "پرترهٔ ثبت‌شده" },
  { value: "۳۸", label: "گزارش مجله" },
  { value: "۱۸۰ م²", label: "استودیوی تهران" },
];

export type FooterLink = { label: string; href?: string; ltr?: boolean };
export type FooterColumn = { title: string; links: FooterLink[] };

export const FOOTER_LINKS: FooterColumn[] = [
  {
    title: "کار",
    links: [
      { label: "نمونه‌کارها", href: "#/portfolio" },
      { label: "جلسه‌ها", href: "#features" },
      { label: "نرخ‌نامه", href: "#pricing" },
      { label: "فضای استودیو", href: "#/portfolio" },
      { label: "مطبوعات", href: "#/portfolio" },
    ],
  },
  {
    title: "استودیو",
    links: [
      { label: "درباره", href: "#about" },
      { label: "کارن کیانی", href: "#about" },
      { label: "ژورنال", href: "#features" },
      { label: "فرایند", href: "#about" },
      { label: "تماس", href: "#contact" },
    ],
  },
  {
    title: "دیدار",
    links: [
      { label: "تهران، خیابان ولیعصر" },
      { label: "فقط با وقت قبلی" },
      { label: "شنبه تا چهارشنبه" },
      { label: STUDIO.phoneFa, ltr: true, href: STUDIO.phoneHref },
      { label: STUDIO.email, ltr: true, href: `mailto:${STUDIO.email}` },
    ],
  },
];

/** قالب‌بندی مبلغ تومانی با جداکنندهٔ هزارگان فارسی (٬) و ارقام فارسی */
export const price = (n: number) => fa(n.toLocaleString("en-US").replace(/,/g, "٬"));
