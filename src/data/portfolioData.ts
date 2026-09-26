export interface PortfolioProject {
  id: string;
  title: string;
  urduTitle?: string;
  category: 'AI Videos' | 'AI Images' | 'Posters' | 'Thumbnails' | 'Social Media' | 'Educational';
  description: string;
  urduDescription?: string;
  thumbnailPlaceholderColor: string;
  mediaType: 'video' | 'image';
  // Users can replace this with their actual image URL e.g. "/images/my-project.jpg"
  imageSrc?: string;
  tags: string[];
  aspectRatio: '16/9' | '1/1' | '9/16' | '4/5';
}

export interface SkillItem {
  id: string;
  name: string;
  urduName?: string;
  category: 'AI & Generative' | 'Video & Media' | 'Design & Creative' | 'Content & Education';
  icon: string;
  description: string;
  focusLevel: 'Core Specialization' | 'Advanced' | 'Expert Focus' | 'Specialized';
  tools: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  urduTitle?: string;
  shortDesc: string;
  deliverables: string[];
  icon: string;
}

export const PERSONAL_INFO = {
  name: 'Muhammad Mustafa Nasiri',
  urduName: 'محمد مصطفیٰ ناصری',
  brand: 'Nasiri Production',
  urduBrand: 'ناصری پروڈکشن',
  location: 'Skardu, Gilgit-Baltistan, Pakistan',
  urduLocation: 'سکردو، گلگت بلتستان، پاکستان',
  headline: 'AI Content Creator | Digital Media Creator | Nasiri Production',
  roles: [
    'AI Content Creator',
    'Digital Media Creator',
    'AI Video Creator',
    'Social Media Content Creator',
    'Graphic/Poster & Thumbnail Creator',
    'Islamic & Educational Content Creator',
    'Media/Content Professional'
  ],
  heroIntroUrdu: 'میں AI، ڈیجیٹل میڈیا اور تخلیقی مواد کے ذریعے جدید انداز میں آئیڈیاز کو حقیقت میں تبدیل کرنے پر کام کرتا ہوں۔',
  aboutUrdu: 'میرا نام محمد مصطفیٰ ناصری ہے اور میرا تعلق سکردو، گلگت بلتستان سے ہے۔ مجھے Artificial Intelligence، ڈیجیٹل میڈیا، ویڈیو کریئیٹنگ، سوشل میڈیا اور تعلیمی و اسلامی مواد کی تیاری میں دلچسپی ہے۔ میں جدید AI ٹیکنالوجی کو تخلیقی اور مفید مقاصد کے لیے استعمال کرتے ہوئے مختلف ڈیجیٹل پروجیکٹس پر کام کرتا ہوں۔',
  nasiriProductionUrdu: 'ناصری پروڈکشن ایک ڈیجیٹل کریئیٹو برانڈ ہے جہاں AI ویڈیوز، سوشل میڈیا پوسٹرز، YouTube thumbnails اور مختلف ڈیجیٹل میڈیا پروجیکٹس پر کام کیا جاتا ہے۔',
  tagline: 'AI • Digital Media • Creative Content',
  contactPlaceholders: {
    email: 'EMAIL_HERE',
    phone: 'PHONE_HERE'
  }
};

export const SOCIAL_LINKS = [
  {
    name: 'YouTube',
    urduName: 'یوٹیوب',
    url: '#SOCIAL_LINK_HERE',
    handle: '@NasiriProduction',
    icon: 'youtube',
    color: '#FF0000',
    description: 'AI Videos, Documentaries & Educational Series'
  },
  {
    name: 'Facebook',
    urduName: 'فیس بک',
    url: '#SOCIAL_LINK_HERE',
    handle: 'Muhammad Mustafa Nasiri',
    icon: 'facebook',
    color: '#1877F2',
    description: 'Community Updates & Social Content'
  },
  {
    name: 'Instagram',
    urduName: 'انسٹاگرام',
    url: '#SOCIAL_LINK_HERE',
    handle: '@mustafa_nasiri',
    icon: 'instagram',
    color: '#E4405F',
    description: 'Visual Posters, AI Art & Behind the scenes'
  },
  {
    name: 'TikTok',
    urduName: 'ٹک ٹاک',
    url: '#SOCIAL_LINK_HERE',
    handle: '@nasiriproduction',
    icon: 'tiktok',
    color: '#00f2fe',
    description: 'Short-form AI Videos & Viral Clips'
  },
  {
    name: 'WhatsApp',
    urduName: 'واٹس ایپ',
    url: '#SOCIAL_LINK_HERE',
    handle: 'Direct Inquiries',
    icon: 'whatsapp',
    color: '#25D366',
    description: 'Fast Inquiries & Collaboration'
  }
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'ai-content',
    name: 'AI Content Creation',
    urduName: 'اے آئی مواد سازی',
    category: 'AI & Generative',
    icon: 'Brain',
    description: 'End-to-end creation of intelligent digital content leveraging advanced generative AI models.',
    focusLevel: 'Core Specialization',
    tools: ['Claude', 'Gemini', 'ChatGPT', 'AI Workflows']
  },
  {
    id: 'ai-video',
    name: 'AI Video Generation',
    urduName: 'اے آئی ویڈیو جنریشن',
    category: 'AI & Generative',
    icon: 'Film',
    description: 'Transforming script concepts into rich, cinematic generative video sequences and animations.',
    focusLevel: 'Core Specialization',
    tools: ['Runway Gen-3', 'Luma Dream Machine', 'Kling', 'Pika']
  },
  {
    id: 'ai-image',
    name: 'AI Image Generation',
    urduName: 'اے آئی تصویر سازی',
    category: 'AI & Generative',
    icon: 'Image',
    description: 'Crafting high-resolution visual assets, realistic portraits, and conceptual digital artwork.',
    focusLevel: 'Core Specialization',
    tools: ['Midjourney', 'Stable Diffusion', 'FLUX', 'DALL-E 3']
  },
  {
    id: 'prompt-eng',
    name: 'Prompt Engineering',
    urduName: 'پرامپٹ انجینئرنگ',
    category: 'AI & Generative',
    icon: 'Terminal',
    description: 'Synthesizing precise natural language instructions for image, video, and text generation outputs.',
    focusLevel: 'Advanced',
    tools: ['Context Crafting', 'Negative Prompts', 'Parameter Tuning', 'Multi-modal Prompts']
  },
  {
    id: 'video-content',
    name: 'Video Content',
    urduName: 'ویڈیو کنٹینٹ پروڈکشن',
    category: 'Video & Media',
    icon: 'Video',
    description: 'Post-production, pacing, transitions, and audio sync for cohesive storytelling videos.',
    focusLevel: 'Advanced',
    tools: ['Premiere Pro', 'CapCut Pro', 'DaVinci Resolve', 'Audio Mixing']
  },
  {
    id: 'social-media',
    name: 'Social Media Content',
    urduName: 'سوشل میڈیا کنٹینٹ',
    category: 'Content & Education',
    icon: 'Share2',
    description: 'Platform-optimized content strategies tailored for YouTube, Facebook, Instagram, and TikTok.',
    focusLevel: 'Expert Focus',
    tools: ['Trend Analytics', 'Engagement Hooks', 'Format Optimization']
  },
  {
    id: 'poster-design',
    name: 'Poster Design',
    urduName: 'پوسٹر ڈیزائننگ',
    category: 'Design & Creative',
    icon: 'Palette',
    description: 'Visual posters with bold typography, balanced hierarchy, and culturally resonant themes.',
    focusLevel: 'Specialized',
    tools: ['Photoshop', 'Canva Pro', 'Illustrator', 'Urdu Calligraphy Styling']
  },
  {
    id: 'thumbnail-design',
    name: 'YouTube Thumbnail Design',
    urduName: 'یوٹیوب تھمب نیل ڈیزائن',
    category: 'Design & Creative',
    icon: 'LayoutTemplate',
    description: 'High-CTR YouTube thumbnail compositions designed for maximum visual curiosity and clickability.',
    focusLevel: 'Advanced',
    tools: ['CTR Optimization', 'Color Contrast', 'Visual Hierarchy', 'Face Expression Staging']
  },
  {
    id: 'digital-media',
    name: 'Digital Media',
    urduName: 'ڈیجیٹل میڈیا پروڈکشن',
    category: 'Video & Media',
    icon: 'Tv',
    description: 'Comprehensive media production covering graphic banners, audio-visual synchrony, and distribution.',
    focusLevel: 'Expert Focus',
    tools: ['Brand Identity', 'Media Assets', 'Cross-Platform Formatting']
  },
  {
    id: 'educational-content',
    name: 'Educational Content',
    urduName: 'تعلیمی مواد',
    category: 'Content & Education',
    icon: 'GraduationCap',
    description: 'Structured, accessible educational explainers breaking down complex ideas into engaging visuals.',
    focusLevel: 'Specialized',
    tools: ['Visual Infographics', 'Conceptual Explainers', 'Urdu Scripting']
  },
  {
    id: 'islamic-content',
    name: 'Islamic Content',
    urduName: 'اسلامی مواد',
    category: 'Content & Education',
    icon: 'BookOpen',
    description: 'Thoughtful, respectful, and aesthetically inspiring digital Islamic media, reminders, and historical visuals.',
    focusLevel: 'Specialized',
    tools: ['Islamic Geometry', 'Quranic Verse Graphics', 'Spiritual Visual Reflections']
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-1',
    number: '01',
    title: 'AI Video Creation',
    urduTitle: 'اے آئی ویڈیو پروڈکشن',
    shortDesc: 'Cinematic AI-generated video sequences, conceptual reels, and synthetic motion graphics customized for your brand.',
    deliverables: [
      'High-definition AI-generated video clips',
      'Script-to-video workflow & motion directing',
      'Cinematic color grading & ambient sound design'
    ],
    icon: 'Film'
  },
  {
    id: 'srv-2',
    number: '02',
    title: 'AI Image Creation',
    urduTitle: 'اے آئی تصویر سازی',
    shortDesc: 'Bespoke conceptual artwork, realistic photo compositions, and tailored graphics created through precision generative AI prompts.',
    deliverables: [
      'Ultra high-resolution master graphics',
      'Custom art styles & character consistency',
      'Commercial quality digital illustrations'
    ],
    icon: 'Image'
  },
  {
    id: 'srv-3',
    number: '03',
    title: 'YouTube Thumbnail Design',
    urduTitle: 'یوٹیوب تھمب نیل ڈیزائن',
    shortDesc: 'Attention-grabbing, high-contrast thumbnails crafted to boost Click-Through Rate (CTR) and audience retention.',
    deliverables: [
      'High-impact visual composition',
      'Clean typography & vibrant highlights',
      'Mobile & desktop feed tested variants'
    ],
    icon: 'Tv'
  },
  {
    id: 'srv-4',
    number: '04',
    title: 'Social Media Poster Design',
    urduTitle: 'سوشل میڈیا پوسٹرز',
    shortDesc: 'Professional digital posters for announcements, campaigns, events, and thematic storytelling in both Urdu and English.',
    deliverables: [
      'Square, story & banner aspect ratios',
      'Bilingual Urdu/English typography pairing',
      'Consistent branded aesthetic'
    ],
    icon: 'Palette'
  },
  {
    id: 'srv-5',
    number: '05',
    title: 'Social Media Content',
    urduTitle: 'سوشل میڈیا مواد',
    shortDesc: 'Strategic digital assets designed to connect with target audiences across Facebook, YouTube, Instagram, and TikTok.',
    deliverables: [
      'Engaging visual carousels & infographics',
      'Audience-centric topic curation',
      'Brand continuity & tone matching'
    ],
    icon: 'Share2'
  },
  {
    id: 'srv-6',
    number: '06',
    title: 'Short Video Content',
    urduTitle: 'شارٹ فارم ویڈیوز',
    shortDesc: 'Fast-paced, high-retention vertical short videos optimized for YouTube Shorts, TikTok, and Instagram Reels.',
    deliverables: [
      'Vertical 9:16 layout format',
      'Dynamic captions & sound integration',
      'First 3-second hook construction'
    ],
    icon: 'Smartphone'
  },
  {
    id: 'srv-7',
    number: '07',
    title: 'AI Prompt Creation',
    urduTitle: 'اے آئی پرامپٹ انجینئرنگ',
    shortDesc: 'Engineered prompt frameworks and recipes to help creators and teams achieve repeatable, top-tier generative outputs.',
    deliverables: [
      'Detailed multi-stage prompt templates',
      'Style parameters & negative prompt banks',
      'Model-specific optimization guidance'
    ],
    icon: 'Terminal'
  },
  {
    id: 'srv-8',
    number: '08',
    title: 'Educational & Islamic Digital Content',
    urduTitle: 'تعلیمی و اسلامی ڈیجیٹل مواد',
    shortDesc: 'Authentic and beautifully curated digital presentations, infographics, and reflective media for learning and spiritual growth.',
    deliverables: [
      'Culturally resonant visual storytelling',
      'Nastaliq calligraphy and typographic finesse',
      'Educational series design & structuring'
    ],
    icon: 'BookOpen'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'Cinematic AI Heritage of Baltistan',
    urduTitle: 'بلتستان کا تاریخی ورثہ - اے آئی ویڈیو',
    category: 'AI Videos',
    description: 'An AI-generated cinematic visual journey exploring historical architectures, mountain landscapes, and cultural heritage of Baltistan.',
    urduDescription: 'سکردو اور بلتستان کے تاریخی مقامات اور ثقافت پر مبنی جدید اے آئی سنیمیٹک ویڈیو کانسیپٹ۔',
    thumbnailPlaceholderColor: 'from-amber-950 via-slate-900 to-black',
    mediaType: 'video',
    tags: ['AI Video', 'Runway', 'Baltistan', 'Cinematic'],
    aspectRatio: '16/9'
  },
  {
    id: 'proj-2',
    title: 'Islamic Calligraphy & Geometry Concept',
    urduTitle: 'اسلامی خطاطی و جیومیٹری پوسٹر',
    category: 'Posters',
    description: 'Intricate digital poster series merging traditional Islamic geometric patterns with modern dark minimalist typography.',
    urduDescription: 'جدید اور کلاسیکی انداز کا حسین امتزاج - باوقار اسلامی ڈیزائن۔',
    thumbnailPlaceholderColor: 'from-emerald-950 via-slate-900 to-black',
    mediaType: 'image',
    tags: ['Poster', 'Urdu Typography', 'Islamic Art', 'Graphic Design'],
    aspectRatio: '4/5'
  },
  {
    id: 'proj-3',
    title: 'High CTR AI Technology Explainer',
    urduTitle: 'اے آئی ٹیکنالوجی تھمب نیل ڈیزائن',
    category: 'Thumbnails',
    description: 'Engineered YouTube thumbnail designed with high visual contrast, bold facial expressions, and focal emphasis to maximize CTR.',
    urduDescription: 'یوٹیوب پر ناظرین کی توجہ حاصل کرنے کے لیے تیار کردہ ہائی سی ٹی آر تھمب نیل۔',
    thumbnailPlaceholderColor: 'from-red-950 via-slate-900 to-black',
    mediaType: 'image',
    tags: ['YouTube Thumbnail', 'CTR Design', 'Photoshop', 'AI Explainer'],
    aspectRatio: '16/9'
  },
  {
    id: 'proj-4',
    title: 'Hyper-Realistic Karakoram Explorer',
    urduTitle: 'قراقرم مہم جو - اے آئی پورٹریٹ آرٹ',
    category: 'AI Images',
    description: 'Advanced prompt-engineered character portrait series set against the majestic snow peaks of Skardu and K2.',
    urduDescription: 'جدید پرامپٹ انجینئرنگ کے ذریعے تیار کردہ حقیقت پسندانہ ڈیجیٹل پورٹریٹ آرٹ۔',
    thumbnailPlaceholderColor: 'from-sky-950 via-slate-900 to-black',
    mediaType: 'image',
    tags: ['AI Image', 'Midjourney', 'FLUX', 'Digital Art'],
    aspectRatio: '1/1'
  },
  {
    id: 'proj-5',
    title: 'Digital Ramadan Reflections Reel',
    urduTitle: 'رمضان المبارک خصوصی شارٹ ویڈیو',
    category: 'Educational',
    description: 'Vertical short-form educational video series sharing moral lessons, Quranic reflections, and peaceful atmospheric visuals.',
    urduDescription: 'تعلیمی اور اخلاقی پیغامات پر مشتمل دلکش شارٹ فارم ویڈیو سیریز۔',
    thumbnailPlaceholderColor: 'from-amber-900 via-stone-900 to-black',
    mediaType: 'video',
    tags: ['Educational', 'Islamic', 'Shorts', 'Urdu Voiceover'],
    aspectRatio: '9/16'
  },
  {
    id: 'proj-6',
    title: 'Nasiri Production Visual Campaign',
    urduTitle: 'ناصری پروڈکشن سوشل میڈیا مہم',
    category: 'Social Media',
    description: 'Unified social media branding series crafted for multi-platform distribution across Instagram, Facebook, and YouTube.',
    urduDescription: 'ناصری پروڈکشن کے لیے تیار کردہ کثیر الجہتی سوشل میڈیا تشہیری مواد۔',
    thumbnailPlaceholderColor: 'from-indigo-950 via-slate-900 to-black',
    mediaType: 'image',
    tags: ['Social Media', 'Brand Identity', 'Nasiri Production'],
    aspectRatio: '1/1'
  },
  {
    id: 'proj-7',
    title: 'Sci-Fi AI Futuristic World Concept',
    urduTitle: 'مستقبل کی دنیا - اے آئی ویڈیو تصور',
    category: 'AI Videos',
    description: 'Speculative conceptual AI video exploration of futuristic cities, robotics, and cybernetic digital environments.',
    urduDescription: 'اے آئی جنریٹو ٹیکنالوجی سے بنی جدید سائنسی اور تخیلاتی ویڈیو۔',
    thumbnailPlaceholderColor: 'from-purple-950 via-slate-900 to-black',
    mediaType: 'video',
    tags: ['AI Video', 'Sci-Fi', 'Luma AI', 'VFX'],
    aspectRatio: '16/9'
  },
  {
    id: 'proj-8',
    title: 'Weekly Islamic Friday Reminder Poster',
    urduTitle: 'جمعۃ المبارک ڈیجیٹل پوسٹر ڈیزائن',
    category: 'Posters',
    description: 'Elegantly typeset Friday greeting poster utilizing gold gradient flourishes and Urdu Nastaliq calligraphy.',
    urduDescription: 'سنہری نقوش اور نستعلیق خطاطی پر مبنی باوقار جمعہ مبارک پوسٹر۔',
    thumbnailPlaceholderColor: 'from-yellow-950 via-slate-900 to-black',
    mediaType: 'image',
    tags: ['Posters', 'Islamic Content', 'Urdu Typography'],
    aspectRatio: '4/5'
  },
  {
    id: 'proj-9',
    title: 'Mastering AI Tools Educational Guide',
    urduTitle: 'اے آئی ٹولز ماسٹری - تعلیمی تھمب نیل',
    category: 'Thumbnails',
    description: 'Vibrant clean thumbnail layout for an educational masterclass video on generative AI workflows in Urdu.',
    urduDescription: 'اردو میں اے آئی ٹیکنالوجی سکھانے والی ویڈیو کے لیے پرکشش تھمب نیل۔',
    thumbnailPlaceholderColor: 'from-blue-950 via-slate-900 to-black',
    mediaType: 'image',
    tags: ['Thumbnails', 'Educational', 'Canva Pro', 'High CTR'],
    aspectRatio: '16/9'
  }
];
