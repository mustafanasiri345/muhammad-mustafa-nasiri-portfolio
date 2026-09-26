import { ArrowRight, Sparkles, Film, Image as ImageIcon, LayoutTemplate, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function NasiriProduction() {
  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const productionFeatures = [
    {
      icon: Film,
      title: 'AI Video Production',
      urdu: 'اے آئی ویڈیو پروجیکٹس',
      desc: 'Cinematic storytelling, pacing, and synthetic camera motion.'
    },
    {
      icon: LayoutTemplate,
      title: 'YouTube Thumbnails',
      urdu: 'یوٹیوب تھمب نیلز',
      desc: 'High-CTR visuals tested for mobile and desktop screens.'
    },
    {
      icon: ImageIcon,
      title: 'Social Media Posters',
      urdu: 'سوشل میڈیا پوسٹرز',
      desc: 'Expressive graphic compositions and bilingual Urdu layouts.'
    },
    {
      icon: Layers,
      title: 'Digital Media Projects',
      urdu: 'مختلف ڈیجیٹل میڈیا',
      desc: 'End-to-end creative multimedia solutions for audiences.'
    }
  ];

  return (
    <section id="nasiri-production" className="relative py-24 bg-gradient-to-b from-[#07090e] via-[#0a0f1d] to-[#07090e] border-y border-amber-500/20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Main Branded Showcase Box */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0d1424]/90 to-slate-950 border border-amber-400/30 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden">
          
          {/* Subtle watermark in background */}
          <div className="absolute right-0 bottom-0 select-none opacity-5 font-urdu text-[160px] text-amber-300 pointer-events-none -mr-10 -mb-20">
            ناصری
          </div>

          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            
            {/* Brand Monogram Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Creative Media Studio</span>
            </div>

            {/* Urdu Brand Title */}
            <div dir="rtl" className="mb-2">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-urdu text-amber-300 font-bold tracking-wide drop-shadow-lg">
                {PERSONAL_INFO.urduBrand}
              </h3>
            </div>

            {/* English Brand Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              {PERSONAL_INFO.brand}
            </h2>

            {/* Urdu Official Brand Description */}
            <div dir="rtl" className="w-full p-6 sm:p-7 rounded-2xl bg-black/40 border border-white/10 mb-8 shadow-inner">
              <p className="font-urdu text-lg sm:text-xl md:text-2xl text-amber-100 font-normal leading-[2.4] text-center">
                "{PERSONAL_INFO.nasiriProductionUrdu}"
              </p>
            </div>

            {/* English Description Companion */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl">
              <strong className="text-white">Nasiri Production</strong> is a forward-thinking digital creative brand founded by Muhammad Mustafa Nasiri, dedicated to crafting high-fidelity AI videos, social media posters, YouTube thumbnails, and cutting-edge multimedia projects.
            </p>

            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-10 text-left">
              {productionFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.title} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-amber-400/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-300 mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-white mb-0.5">{feat.title}</h4>
                    <div dir="rtl" className="text-[11px] font-urdu text-amber-400/90 mb-1">{feat.urdu}</div>
                    <p className="text-[11px] text-slate-400 leading-normal">{feat.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Explore Button */}
            <div>
              <button
                type="button"
                onClick={scrollToPortfolio}
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <span>Explore Nasiri Production</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
