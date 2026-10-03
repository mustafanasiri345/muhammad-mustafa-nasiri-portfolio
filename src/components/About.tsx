import { MapPin, Sparkles, Video, BookOpen, Brain, Palette } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function About() {
  const creativeFocusAreas = [
    {
      title: 'AI Content Creation',
      urdu: 'اے آئی مواد سازی',
      desc: 'Exploring prompt engineering, generative video models, and synthetic imagery workflows.',
      icon: Brain,
    },
    {
      title: 'Digital Media & Video',
      urdu: 'ڈیجیٹل میڈیا اور ویڈیو سازی',
      desc: 'Creating engaging video pacing, visual storytelling, and high-impact social media assets.',
      icon: Video,
    },
    {
      title: 'Graphic & Poster Design',
      urdu: 'گرافک و پوسٹر ڈیزائننگ',
      desc: 'High-CTR YouTube thumbnails, social banners, and expressive bilingual typography.',
      icon: Palette,
    },
    {
      title: 'Islamic & Educational Media',
      urdu: 'اسلامی و تعلیمی میڈیا',
      desc: 'Curating respectful, spiritually inspiring, and knowledge-driven digital visual content.',
      icon: BookOpen,
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#090d16]/75 backdrop-blur-[2px] border-y border-white/5 overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-10 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 left-10 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile & Identity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div className="mt-2 text-xl font-urdu text-amber-300 font-semibold">
            میرے بارے میں
          </div>
        </div>

        {/* Core Statement Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-amber-500/20 relative shadow-2xl">
            <div className="absolute -top-3 left-8 px-4 py-1 rounded bg-[#07090e] border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wider">
              PROFILE OVERVIEW
            </div>

            {/* Official Urdu Statement - exact information provided */}
            <div dir="rtl" className="mt-4 mb-6">
              <p className="font-urdu text-lg sm:text-xl md:text-2xl text-amber-100 font-normal leading-[2.4] text-right">
                {PERSONAL_INFO.aboutUrdu}
              </p>
            </div>

            {/* English Description without inventing extra facts */}
            <div className="pt-6 border-t border-white/10 text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
              <p>
                {PERSONAL_INFO.aboutEnglish}
              </p>
              <p className="text-slate-400 text-sm">
                I am committed to utilizing modern digital tools and artificial intelligence responsibly, creating educational, inspiring, and culturally meaningful content for online communities.
              </p>
            </div>

            {/* Location & Brand Details */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Location: <span className="text-white font-medium">{PERSONAL_INFO.location}</span></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span>Brand: <span className="text-amber-300 font-semibold">{PERSONAL_INFO.brand}</span> ({PERSONAL_INFO.urduBrand})</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Creative Focus Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creativeFocusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div 
                key={area.title}
                className="glass-panel glass-panel-hover rounded-xl p-6 border border-white/5 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-105 group-hover:bg-amber-400/20 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div dir="rtl" className="text-xs font-urdu text-amber-300/80 mb-1">
                    {area.urdu}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
