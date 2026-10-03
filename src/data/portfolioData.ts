export type PortfolioCategory =
  | 'AI Videos'
  | 'YouTube Thumbnails'
  | 'Social Media Posters'
  | 'Islamic & Religious Designs'
  | 'AI Images'
  | 'Video Editing'
  | 'Graphic Design';

export interface PortfolioCategoryConfig {
  id: string;
  name: PortfolioCategory;
  urduName: string;
  description: string;
  urduDescription: string;
  icon: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  urduTitle?: string;
  category: PortfolioCategory;
  description: string;
  urduDescription?: string;
  mediaType: 'image' | 'video';
  imageSrc?: string; // Image file URL or Video thumbnail (e.g. /assets/portfolio/...)
  videoSrc?: string; // Direct video file URL (.mp4/.webm) or YouTube/Vimeo link
  projectUrl?: string; // External project link (YouTube, Behance, Facebook, etc.)
  tags?: string[];
  aspectRatio?: '16/9' | '1/1' | '9/16' | '4/5';
}

export interface SkillItem {
  id: string;
  name: string;
  urduName: string;
  description: string;
  icon: string;
  categoryLabel?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  urduTitle: string;
  shortDesc: string;
  urduDesc?: string;
  icon: string;
}

export interface MediaPlaceholderItem {
  id: string;
  title: string;
  urduTitle: string;
  type: 'Videos' | 'Reels' | 'Social Media Content' | 'Featured Media';
  description: string;
  icon: string;
  aspectRatio: string;
  imageSrc?: string;
  videoSrc?: string;
  gallery?: string[];
}

export interface SocialLinkItem {
  name: string;
  urduName: string;
  url: string;
  handle: string;
  icon: 'facebook' | 'youtube' | 'tiktok' | 'instagram' | 'whatsapp' | 'whatsapp-channel';
  color: string;
  description: string;
  isConfigured: boolean;
}

/* ==================================================
   CENTRALIZED PERSONAL & BRAND INFORMATION
   ================================================== */
export const PERSONAL_INFO = {
  name: 'Muhammad Mustafa Nasiri',
  urduName: 'محمد مصطفیٰ ناصری',
  brand: 'Nasiri Production',
  urduBrand: 'ناصری پروڈکشن',
  location: 'Skardu, Gilgit-Baltistan, Pakistan',
  urduLocation: 'سکردو، گلگت بلتستان، پاکستان',
  profileImagePath: 'assets/profile.jpg',
  roles: [
    'AI Content Creator',
    'Digital Media Creator',
    'AI Video Creator',
    'Social Media Content Creator',
    'Graphic / Poster / Thumbnail Creator',
    'Islamic & Educational Content Creator',
    'Video Editor',
    'AI Prompt Writer'
  ],
  heroIntroUrdu: 'میں AI Content Creation، Digital Media، AI Video، Graphic Design، Social Media Content اور Islamic & Educational Creative Work پر کام کرتا ہوں۔',
  heroIntroEnglish: 'Specializing in AI Content Creation, Digital Media, AI Video Generation, Graphic Design, Social Media Content, and Islamic & Educational Creative Work.',
  aboutUrdu: 'میرا نام محمد مصطفیٰ ناصری ہے اور میرا تعلق سکردو، گلگت بلتستان، پاکستان سے ہے۔ ناصری پروڈکشن (Nasiri Production) کے تحت میں AI Content Creation، ڈیجیٹل میڈیا پروڈکشن، ویڈیو ایڈیٹنگ، سوشل میڈیا گرافکس، یوٹیوب تھمبنیلز اور دینی و تعلیمی تخلیقی مواد پر پیشہ ورانہ کام کرتا ہوں۔',
  aboutEnglish: 'My name is Muhammad Mustafa Nasiri, based in Skardu, Gilgit-Baltistan, Pakistan. Under the brand Nasiri Production, I focus on AI Content Creation, digital media production, video editing, social media graphics, YouTube thumbnail design, and Islamic & educational creative content.',
  tagline: 'AI • Digital Media • Creative Content',
  phone: '03555677577',
  whatsapp: '03408816926',
  email: 'mustafanasiri345@gmail.com',
  telUrl: 'tel:03555677577',
  whatsappUrl: 'https://wa.me/923408816926',
  mailUrl: 'mailto:mustafanasiri345@gmail.com',
  copyright: '© 2026 Muhammad Mustafa Nasiri | Nasiri Production. All Rights Reserved.'
};

/* ==================================================
   THE EXACT 10 SKILLS (NO FAKE PERCENTAGES)
   ================================================== */
export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'ai-content-creation',
    name: 'AI Content Creation',
    urduName: 'اے آئی کنٹینٹ کریشن',
    description: 'Developing high-quality digital content combining generative AI text, imagery, and multi-modal creative workflows.',
    icon: 'Brain'
  },
  {
    id: 'ai-video-creation',
    name: 'AI Video Creation',
    urduName: 'اے آئی ویڈیو کریشن',
    description: 'Generating cinematic AI motion clips, visual scene sequences, and prompt-driven video compositions.',
    icon: 'Film'
  },
  {
    id: 'digital-media-creation',
    name: 'Digital Media Creation',
    urduName: 'ڈیجیٹل میڈیا کریشن',
    description: 'Producing coherent digital media assets, banners, audio-visual synchrony, and multi-platform materials.',
    icon: 'Tv'
  },
  {
    id: 'social-media-content-creation',
    name: 'Social Media Content Creation',
    urduName: 'سوشل میڈیا کنٹینٹ کریشن',
    description: 'Designing high-impact, audience-engaging visual content optimized for YouTube, Facebook, Instagram, and TikTok.',
    icon: 'Share2'
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    urduName: 'گرافک ڈیزائن',
    description: 'Crafting clean visual layouts, modern color palettes, typography hierarchy, and creative digital designs.',
    icon: 'Palette'
  },
  {
    id: 'youtube-thumbnail-design',
    name: 'YouTube Thumbnail Design',
    urduName: 'یوٹیوب تھمبنیل ڈیزائن',
    description: 'Engineering high-contrast, attention-grabbing thumbnails designed to maximize click-through rate (CTR).',
    icon: 'LayoutTemplate'
  },
  {
    id: 'social-media-poster-design',
    name: 'Social Media Poster Design',
    urduName: 'سوشل میڈیا پوسٹر ڈیزائن',
    description: 'Designing expressive digital posters for announcements, events, themes, and social campaigns in Urdu & English.',
    icon: 'Image'
  },
  {
    id: 'islamic-educational-content-creation',
    name: 'Islamic & Educational Content Creation',
    urduName: 'اسلامی و تعلیمی مواد سازی',
    description: 'Curating respectful, aesthetically inspiring Islamic reminders, moral teachings, and educational explainers.',
    icon: 'BookOpen'
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    urduName: 'ویڈیو ایڈیٹنگ',
    description: 'Post-production video pacing, clean cuts, audio balance, transitions, subtitles, and export optimization.',
    icon: 'Video'
  },
  {
    id: 'ai-prompt-writing',
    name: 'AI Prompt Writing',
    urduName: 'اے آئی پرامپٹ رائٹنگ',
    description: 'Formulating structured, precise natural language prompts to achieve reproducible, high-fidelity generative AI outputs.',
    icon: 'Terminal'
  }
];

/* ==================================================
   THE EXACT 9 SERVICES
   ================================================== */
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-1',
    number: '01',
    title: 'AI YouTube Thumbnail Design',
    urduTitle: 'اے آئی یوٹیوب تھمبنیل ڈیزائن',
    shortDesc: 'Attention-grabbing, high-contrast thumbnails crafted to boost Click-Through Rate (CTR) and audience retention.',
    urduDesc: 'یوٹیوب پر ناظرین کی توجہ فوری حاصل کرنے اور کلکس بڑھانے کے لیے جدید اور پرکشش تھمب نیلز۔',
    icon: 'LayoutTemplate'
  },
  {
    id: 'srv-2',
    number: '02',
    title: 'Social Media Poster Design',
    urduTitle: 'سوشل میڈیا پوسٹر ڈیزائن',
    shortDesc: 'Professional digital posters for announcements, campaigns, events, and thematic storytelling in both Urdu and English.',
    urduDesc: 'سوشل میڈیا پلیٹ فارمز کے لیے معیاری، باوقار اور دلکش ڈیجیٹل پوسٹرز کی تیاری۔',
    icon: 'Palette'
  },
  {
    id: 'srv-3',
    number: '03',
    title: 'AI Video Creation',
    urduTitle: 'اے آئی ویڈیو کریشن',
    shortDesc: 'Cinematic AI-generated video sequences, conceptual reels, and synthetic motion graphics customized for your brand.',
    urduDesc: 'جدید اے آئی ٹیکنالوجی سے بنی سنیمیٹک ویڈیوز، شارٹ ریلز اور بصری مواد۔',
    icon: 'Film'
  },
  {
    id: 'srv-4',
    number: '04',
    title: 'AI Content Creation',
    urduTitle: 'اے آئی کنٹینٹ کریشن',
    shortDesc: 'End-to-end intelligent content creation leveraging cutting-edge generative AI models and workflows.',
    urduDesc: 'جدید مصنوعی ذہانت (AI) کے ذریعے تخلیقی، مفید اور معلوماتی ڈیجیٹل مواد کی تیاری۔',
    icon: 'Brain'
  },
  {
    id: 'srv-5',
    number: '05',
    title: 'Video Editing',
    urduTitle: 'ویڈیو ایڈیٹنگ',
    shortDesc: 'Professional post-production, dynamic pacing, smooth cuts, sound design, and color grading for videos.',
    urduDesc: 'یوٹیوب، ریلز اور ڈاکومنٹری ویڈیوز کے لیے پروفیشنل ایڈیٹنگ اور آڈیو ویڈیو سنک۔',
    icon: 'Video'
  },
  {
    id: 'srv-6',
    number: '06',
    title: 'Islamic & Educational Content Creation',
    urduTitle: 'اسلامی و تعلیمی مواد سازی',
    shortDesc: 'Thoughtful, respectful, and aesthetically inspiring digital Islamic media, reminders, and educational lessons.',
    urduDesc: 'معیاری اسلامی و دینی پوسٹرز، اخلاقی پیغامات اور تعلیمی معلوماتی ویڈیوز کا تخلیقی کام۔',
    icon: 'BookOpen'
  },
  {
    id: 'srv-7',
    number: '07',
    title: 'Digital Media Production',
    urduTitle: 'ڈیجیٹل میڈیا پروڈکشن',
    shortDesc: 'Multi-platform digital media assets, visual branding identity, and cross-channel digital design suites.',
    urduDesc: 'ناصری پروڈکشن کے تحت سوشل چینلز کے لیے مکمل ڈیجیٹل میڈیا پیکیج۔',
    icon: 'Tv'
  },
  {
    id: 'srv-8',
    number: '08',
    title: 'Social Media Content Creation',
    urduTitle: 'سوشل میڈیا کنٹینٹ کریشن',
    shortDesc: 'Tailored content strategies and creative assets designed to engage audiences across Facebook, YouTube, TikTok, and Instagram.',
    urduDesc: 'مختلف سوشل پلیٹ فارمز پر ناظرین سے جڑنے اور فالوونگ بڑھانے کے لیے مستقل مواد۔',
    icon: 'Share2'
  },
  {
    id: 'srv-9',
    number: '09',
    title: 'Damaged Mobile Phone Buying',
    urduTitle: 'خراب موبائل فونز کی خریداری',
    shortDesc: 'We purchase damaged, faulty or non-working mobile phones at a reasonable price based on model and condition.',
    urduDesc: 'ہم ماڈل اور حالت کے مطابق مناسب قیمت پر خراب، فالٹی یا بند موبائل فونز خریدتے ہیں۔',
    icon: 'Smartphone'
  }
];

/* ==================================================
   THE EXACT 7 PORTFOLIO CATEGORIES
   ================================================== */
export const PORTFOLIO_CATEGORIES: PortfolioCategoryConfig[] = [
  {
    id: 'ai-videos',
    name: 'AI Videos',
    urduName: 'اے آئی ویڈیوز',
    description: 'Generative AI cinematic video sequences, concept shorts, and visual storytelling.',
    urduDescription: 'جدید اے آئی ٹیکنالوجی سے بنی سنیمیٹک اور تعلیمی ویڈیوز۔',
    icon: 'Film'
  },
  {
    id: 'youtube-thumbnails',
    name: 'YouTube Thumbnails',
    urduName: 'یوٹیوب تھمبنیلز',
    description: 'High-CTR YouTube thumbnail artworks engineered for contrast and high clickability.',
    urduDescription: 'یوٹیوب ویڈیوز کے لیے ہائی سی ٹی آر اور پرکشش تھمب نیل ڈیزائنز۔',
    icon: 'Tv'
  },
  {
    id: 'social-media-posters',
    name: 'Social Media Posters',
    urduName: 'سوشل میڈیا پوسٹرز',
    description: 'Expressive digital posters for social media distribution and campaigns.',
    urduDescription: 'سوشل میڈیا مہمات، اعلانات اور تھیمز کے لیے معیاری پوسٹرز۔',
    icon: 'Image'
  },
  {
    id: 'islamic-religious-designs',
    name: 'Islamic & Religious Designs',
    urduName: 'اسلامی و دینی ڈیزائنز',
    description: 'Spiritual, elegant Islamic geometry, Quranic verses, and sacred calligraphy art.',
    urduDescription: 'باوقار اسلامی خطاطی، قرآنی آیات اور دینی مناسبتوں پر مبنی ڈیزائنز۔',
    icon: 'BookOpen'
  },
  {
    id: 'ai-images',
    name: 'AI Images',
    urduName: 'اے آئی امیجز',
    description: 'Prompt-engineered ultra-realistic images, character portraits, and scenic artworks.',
    urduDescription: 'جدید پرامپٹ انجینئرنگ کے ذریعے تیار کردہ خوبصورت اے آئی تصاویر۔',
    icon: 'Sparkles'
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    urduName: 'ویڈیو ایڈیٹنگ',
    description: 'Professional cuts, pacing, transitions, and audio-visual post-production.',
    urduDescription: 'یوٹیوب، ریلز اور شارٹس کے لیے جدید ویڈیو ایڈیٹنگ کا کام۔',
    icon: 'Video'
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    urduName: 'گرافک ڈیزائن',
    description: 'Creative graphics, banners, flyers, typography, and visual branding.',
    urduDescription: 'بینرز، فلائرز اور ڈیجیٹل گرافکس کا پروفیشنل کام۔',
    icon: 'Palette'
  }
];

export const portfolioCategories = PORTFOLIO_CATEGORIES;

/* ==================================================
   CENTRALIZED PORTFOLIO DATA ITEMS
   Four real original projects inside Islamic & Religious Designs
   ================================================== */
export const portfolioItems: PortfolioProject[] = [
  /* 1. Islamic & Religious Designs */
  {
    id: 'islamic-design-1',
    title: 'مجلسِ عزا سے اقتباسات',
    urduTitle: 'مجلسِ عزا سے اقتباسات',
    category: 'Islamic & Religious Designs',
    description: 'مجلسِ عزا کے اہم دینی نکات اور منتخب اقتباسات کو معلوماتی اور خوبصورت انداز میں پیش کرنے کے لیے تیار کردہ ڈیزائن۔',
    urduDescription: 'مجلسِ عزا کے اہم دینی نکات اور منتخب اقتباسات کو معلوماتی اور خوبصورت انداز میں پیش کرنے کے لیے تیار کردہ ڈیزائن۔',
    mediaType: 'image',
    imageSrc: 'assets/majlis-01.jpg',
    tags: ['مجلسِ عزا', 'دینی پوسٹر', 'Nasiri Production', 'اسلامی ڈیزائن'],
    aspectRatio: '9/16'
  },
  {
    id: 'islamic-design-2',
    title: 'مجلسِ عزا — امام رضا علیہ السلام',
    urduTitle: 'مجلسِ عزا — امام رضا علیہ السلام',
    category: 'Islamic & Religious Designs',
    description: 'شہادتِ امام رضا علیہ السلام کی مناسبت سے تیار کردہ معلوماتی اور دینی مجلس پوسٹر۔',
    urduDescription: 'شہادتِ امام رضا علیہ السلام کی مناسبت سے تیار کردہ معلوماتی اور دینی مجلس پوسٹر۔',
    mediaType: 'image',
    imageSrc: 'assets/majlis-02.jpg',
    tags: ['امام رضا علیہ السلام', 'مجلسِ عزا', 'Nasiri Production', 'دینی پوسٹر'],
    aspectRatio: '9/16'
  },
  {
    id: 'islamic-design-3',
    title: 'خلاصۂ مجلسِ عزا',
    urduTitle: 'خلاصۂ مجلسِ عزا',
    category: 'Islamic & Religious Designs',
    description: 'مجلس کے اہم موضوعات، دینی نکات اور پیغام کو مختصر انداز میں پیش کرنے کے لیے تیار کیا گیا خلاصہ پوسٹر۔',
    urduDescription: 'مجلس کے اہم موضوعات، دینی نکات اور پیغام کو مختصر انداز میں پیش کرنے کے لیے تیار کیا گیا خلاصہ پوسٹر۔',
    mediaType: 'image',
    imageSrc: 'assets/majlis-03.jpg',
    tags: ['خلاصۂ مجلس', 'دینی نکات', 'Nasiri Production', 'اسلامی ڈیزائن'],
    aspectRatio: '9/16'
  },
  {
    id: 'islamic-design-4',
    title: 'اقتباساتِ مجلسِ عزا',
    urduTitle: 'اقتباساتِ مجلسِ عزا',
    category: 'Islamic & Religious Designs',
    description: 'مجلسِ عزا کے اہم پیغامات اور منتخب دینی نکات پر مشتمل معلوماتی ڈیزائن۔',
    urduDescription: 'مجلسِ عزا کے اہم پیغامات اور منتخب دینی نکات پر مشتمل معلوماتی ڈیزائن۔',
    mediaType: 'image',
    imageSrc: 'assets/majlis-04.jpg',
    tags: ['اقتباساتِ مجلس', 'دینی پیغامات', 'Nasiri Production', 'اسلامی ڈیزائن'],
    aspectRatio: '9/16'
  },

  /* 2. AI Videos */
  {
    id: 'ai-video-dead-phone',
    title: 'ڈیڈ موبائل فون — اے آئی ویڈیو اسٹوری',
    urduTitle: 'ڈیڈ موبائل فون — اے آئی ویڈیو',
    category: 'AI Videos',
    description: 'جدید اے آئی ٹیکنالوجی کے ذریعے تیار کردہ حقیقت پسندانہ اور معلوماتی موبائل فون ویڈیو اسٹوری۔',
    urduDescription: 'جدید اے آئی ٹیکنالوجی کے ذریعے تیار کردہ حقیقت پسندانہ اور معلوماتی موبائل فون ویڈیو اسٹوری۔',
    mediaType: 'video',
    imageSrc: 'assets/ai-video-dead-mobile-phone.jpg',
    videoSrc: 'assets/ai-video-dead-mobile-phone.mp4',
    tags: ['AI Video', 'Dead Mobile Phone', 'Nasiri Production', 'اے آئی ویڈیو'],
    aspectRatio: '16/9'
  },

  /* 3. YouTube Thumbnails */
  {
    id: 'youtube-thumbnail-1',
    title: 'یوٹیوب تھمب نیل ڈیزائن',
    urduTitle: 'یوٹیوب تھمب نیل ڈیزائن',
    category: 'YouTube Thumbnails',
    description: 'ہائی سی ٹی آر یوٹیوب تھمب نیل جو ناظرین کی توجہ حاصل کرنے اور کلکس بڑھانے کے لیے ڈیزائن کیا گیا ہے۔',
    urduDescription: 'ہائی سی ٹی آر یوٹیوب تھمب نیل جو ناظرین کی توجہ حاصل کرنے اور کلکس بڑھانے کے لیے ڈیزائن کیا گیا ہے۔',
    mediaType: 'image',
    imageSrc: 'assets/thumbnail-01.jpg',
    tags: ['YouTube Thumbnail', 'High CTR', 'Nasiri Production', 'تھمب نیل'],
    aspectRatio: '16/9'
  },

  /* 4. Social Media Posters */
  {
    id: 'social-poster-1',
    title: 'سوشل میڈیا پوسٹر 01',
    urduTitle: 'سوشل میڈیا پوسٹر 01',
    category: 'Social Media Posters',
    description: 'سوشل میڈیا پروموشنز اور تھیمز کے لیے پرکشش اور معلوماتی ڈیجیٹل پوسٹر ڈیزائن۔',
    urduDescription: 'سوشل میڈیا پروموشنز اور تھیمز کے لیے پرکشش اور معلوماتی ڈیجیٹل پوسٹر ڈیزائن۔',
    mediaType: 'image',
    imageSrc: 'assets/social-media-poster-01.jpg',
    tags: ['سوشل میڈیا پوسٹر', 'Digital Poster', 'Nasiri Production'],
    aspectRatio: '9/16'
  },
  {
    id: 'social-poster-2',
    title: 'سوشل میڈیا پوسٹر 02',
    urduTitle: 'سوشل میڈیا پوسٹر 02',
    category: 'Social Media Posters',
    description: 'جدید رنگوں اور متوازن ترتیب کے ساتھ تیار کردہ معیاری سوشل میڈیا پوسٹر۔',
    urduDescription: 'جدید رنگوں اور متوازن ترتیب کے ساتھ تیار کردہ معیاری سوشل میڈیا پوسٹر۔',
    mediaType: 'image',
    imageSrc: 'assets/social-media-poster-02.jpg',
    tags: ['سوشل میڈیا پوسٹر', 'Digital Art', 'Nasiri Production'],
    aspectRatio: '9/16'
  },

  /* 5. AI Images */
  {
    id: 'ai-image-1',
    title: 'اے آئی تخلیقی تصویر 01',
    urduTitle: 'اے آئی امیج 01',
    category: 'AI Images',
    description: 'جدید پرامپٹ انجینئرنگ کے ذریعے تیار کردہ حقیقت پسندانہ سنیمیٹک اے آئی تصویر۔',
    urduDescription: 'جدید پرامپٹ انجینئرنگ کے ذریعے تیار کردہ حقیقت پسندانہ سنیمیٹک اے آئی تصویر۔',
    mediaType: 'image',
    imageSrc: 'assets/ai-image-01.jpg',
    tags: ['AI Image', 'Generative Art', 'Nasiri Production', 'اے آئی تصویر'],
    aspectRatio: '1/1'
  },
  {
    id: 'ai-image-2',
    title: 'اے آئی تخلیقی تصویر 02',
    urduTitle: 'اے آئی امیج 02',
    category: 'AI Images',
    description: 'عمدہ تفصیلات اور ہائی ریزولوشن ویژول کے ساتھ تیار کردہ اے آئی آرٹ ورک۔',
    urduDescription: 'عمدہ تفصیلات اور ہائی ریزولوشن ویژول کے ساتھ تیار کردہ اے آئی آرٹ ورک۔',
    mediaType: 'image',
    imageSrc: 'assets/ai-image-02.jpg',
    tags: ['AI Image', 'Digital Artwork', 'Nasiri Production'],
    aspectRatio: '1/1'
  },
  {
    id: 'ai-image-3',
    title: 'اے آئی تخلیقی تصویر 03',
    urduTitle: 'اے آئی امیج 03',
    category: 'AI Images',
    description: 'سنیمیٹک لائٹنگ اور جدید کمپوزیشن پر مبنی معیاری اے آئی ڈیزائن۔',
    urduDescription: 'سنیمیٹک لائٹنگ اور جدید کمپوزیشن پر مبنی معیاری اے آئی ڈیزائن۔',
    mediaType: 'image',
    imageSrc: 'assets/ai-image-03.jpg',
    tags: ['AI Image', 'Prompt Engineering', 'Nasiri Production'],
    aspectRatio: '1/1'
  },

  /* 6. Graphic Design */
  {
    id: 'graphic-design-1',
    title: 'گرافک ڈیزائن — آرٹ ورک 01',
    urduTitle: 'گرافک ڈیزائن 01',
    category: 'Graphic Design',
    description: 'پروفیشنل برانڈنگ اور ڈیجیٹل لے آؤٹ کے لیے تیار کیا گیا تخلیقی گرافک ڈیزائن۔',
    urduDescription: 'پروفیشنل برانڈنگ اور ڈیجیٹل لے آؤٹ کے لیے تیار کیا گیا تخلیقی گرافک ڈیزائن۔',
    mediaType: 'image',
    imageSrc: 'assets/graphic-design-01.jpg',
    tags: ['Graphic Design', 'Branding', 'Nasiri Production', 'گرافک ڈیزائن'],
    aspectRatio: '1/1'
  },
  {
    id: 'graphic-design-2',
    title: 'گرافک ڈیزائن — آرٹ ورک 02',
    urduTitle: 'گرافک ڈیزائن 02',
    category: 'Graphic Design',
    description: 'جدید اردو و انگریزی ٹائپوگرافی کے امتزاج سے تیار کردہ برانڈ گرافک ڈیزائن۔',
    urduDescription: 'جدید اردو و انگریزی ٹائپوگرافی کے امتزاج سے تیار کردہ برانڈ گرافک ڈیزائن۔',
    mediaType: 'image',
    imageSrc: 'assets/graphic-design-02.jpg',
    tags: ['Graphic Design', 'Typography', 'Nasiri Production'],
    aspectRatio: '1/1'
  }
];

export const PORTFOLIO_PROJECTS = portfolioItems;

/* ==================================================
   MEDIA SECTION DATA WITH UPLOADED ASSETS
   ================================================== */
export const MEDIA_PLACEHOLDERS: MediaPlaceholderItem[] = [
  {
    id: 'media-videos',
    title: 'Featured Videos',
    urduTitle: 'منتخب ویڈیوز',
    type: 'Videos',
    description: 'Long-form documentaries, AI video showcases, and educational explainers.',
    icon: 'Film',
    aspectRatio: '16/9',
    imageSrc: 'assets/ai-video-dead-mobile-phone.jpg',
    videoSrc: 'assets/ai-video-dead-mobile-phone.mp4'
  },
  {
    id: 'media-reels',
    title: 'Short Reels & Clips',
    urduTitle: 'شارٹ ریلز اور کلپس',
    type: 'Reels',
    description: 'High-energy vertical videos for YouTube Shorts, Instagram Reels, and TikTok.',
    icon: 'Smartphone',
    aspectRatio: '9/16'
  },
  {
    id: 'media-social',
    title: 'Social Media Content',
    urduTitle: 'سوشل میڈیا مواد',
    type: 'Social Media Content',
    description: 'Visual announcements, poster highlights, and engaging multi-platform posts.',
    icon: 'Share2',
    aspectRatio: '1/1',
    imageSrc: 'assets/social-media-content-01.jpg',
    gallery: ['assets/social-media-content-01.jpg', 'assets/social-media-content-02.jpg']
  },
  {
    id: 'media-featured',
    title: 'Nasiri Production Media',
    urduTitle: 'ناصری پروڈکشن میڈیا',
    type: 'Featured Media',
    description: 'Official releases, studio updates, and creative highlights from Skardu.',
    icon: 'Tv',
    aspectRatio: '16/9'
  }
];

/* ==================================================
   SOCIAL MEDIA PLATFORMS (NO FAKE URLS)
   ================================================== */
export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: 'Facebook',
    urduName: 'فیس بک',
    url: 'https://www.facebook.com/share/1BiPxpe72z/',
    handle: 'Mustafa Nasiri',
    icon: 'facebook',
    color: '#1877F2',
    description: 'Official Facebook profile for updates, community posts, and visual designs.',
    isConfigured: true
  },
  {
    name: 'YouTube',
    urduName: 'یوٹیوب',
    url: 'https://www.youtube.com/@Nasiriproduction96',
    handle: '@Nasiriproduction96',
    icon: 'youtube',
    color: '#FF0000',
    description: 'AI Videos, video editing workflows, and educational series.',
    isConfigured: true
  },
  {
    name: 'TikTok',
    urduName: 'ٹک ٹاک',
    url: 'https://www.tiktok.com/@nasiriproduction96?_r=1&_t=ZS-9ACT0IhJIlJ',
    handle: '@nasiriproduction96',
    icon: 'tiktok',
    color: '#00f2fe',
    description: 'Short-form creative video clips, AI motion experiments, and reels.',
    isConfigured: true
  },
  {
    name: 'Instagram',
    urduName: 'انسٹاگرام',
    url: 'https://www.instagram.com/mustafa.nasiri.9400?stkn=MXg3OWo3cHNueGRsdw==',
    handle: '@mustafa.nasiri.9400',
    icon: 'instagram',
    color: '#E4405F',
    description: 'High-resolution posters, thumbnails, and visual design highlights.',
    isConfigured: true
  },
  {
    name: 'WhatsApp',
    urduName: 'واٹس ایپ',
    url: 'https://wa.me/923408816926',
    handle: '03408816926',
    icon: 'whatsapp',
    color: '#25D366',
    description: 'Direct WhatsApp for project inquiries, collaborations, and discussions.',
    isConfigured: true
  },
  {
    name: 'WhatsApp Channel',
    urduName: 'واٹس ایپ چینل',
    url: 'https://whatsapp.com/channel/0029Vb2zu5y7IUYUJ3ttUi0h',
    handle: 'Nasiri Production Channel',
    icon: 'whatsapp-channel',
    color: '#25D366',
    description: 'Official WhatsApp Channel for announcements, design previews, and project updates.',
    isConfigured: true
  }
];
